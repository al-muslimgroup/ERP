/**
 * Firebase Firestore Cloud Synchronization Engine
 * Al-Muslim Group Maintenance Department ERP
 * 
 * Provides automated cloud synchronization, multi-device backup,
 * and chunked document storage for tables exceeding 600KB.
 */

import { FIREBASE_CONFIG } from './firebaseConfig.js';

const CHUNK_SIZE_BYTES = 550 * 1024; // 550 KB safety limit per Firestore document (Firestore limit is 1MB)
const COLLECTION_NAME = 'erp_tables';

let firestoreDb = null;
let firestoreModule = null;
let isFirebaseReady = false;
let isConnecting = false;

/**
 * Dynamically load Firebase SDK from Google official CDN with graceful fallback
 */
export async function getFirestoreInstance() {
  if (firestoreDb && firestoreModule) {
    return { db: firestoreDb, fs: firestoreModule };
  }

  if (isConnecting) {
    // Wait for in-flight initialization
    let attempts = 0;
    while (isConnecting && attempts < 30) {
      await new Promise(r => setTimeout(r, 100));
      attempts++;
    }
    if (firestoreDb && firestoreModule) {
      return { db: firestoreDb, fs: firestoreModule };
    }
  }

  isConnecting = true;
  try {
    const { initializeApp, getApps, getApp } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js');
    const fsMod = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js');

    const app = getApps().length > 0 ? getApp() : initializeApp(FIREBASE_CONFIG);
    firestoreDb = fsMod.getFirestore(app);
    firestoreModule = fsMod;
    isFirebaseReady = true;
    console.log('[Firebase Sync] ✅ Connected to Firebase project:', FIREBASE_CONFIG.projectId);
    return { db: firestoreDb, fs: firestoreModule };
  } catch (err) {
    console.warn('[Firebase Sync] ⚠️ Cloud connection unavailable (will use Local/Node persistence):', err.message);
    return null;
  } finally {
    isConnecting = false;
  }
}

/**
 * Save an individual table to Firestore, chunking if necessary
 */
export async function saveTableToFirestore(tableName, records) {
  try {
    const fb = await getFirestoreInstance();
    if (!fb) return false;

    if (tableName === 'machines' && Array.isArray(records)) {
      const hasMock = records.some(m => m && m.serialNumber && String(m.serialNumber).startsWith('JK-PM-'));
      if (hasMock || records.length < 500) {
        console.warn('[Firebase Sync] 🚫 Blocked attempt to write mock or incomplete machines dataset to Firestore.');
        return false;
      }
    }

    const { db, fs } = fb;
    const cleanRecords = JSON.parse(JSON.stringify(records ?? []));
    const jsonStr = JSON.stringify(cleanRecords);
    const sizeBytes = new Blob([jsonStr]).size;

    if (sizeBytes < CHUNK_SIZE_BYTES) {
      // Normal single document write
      const docRef = fs.doc(db, COLLECTION_NAME, tableName);
      await fs.setDoc(docRef, {
        isChunked: false,
        updatedAt: new Date().toISOString(),
        itemCount: Array.isArray(cleanRecords) ? cleanRecords.length : (cleanRecords ? 1 : 0),
        data: cleanRecords,
        rawJson: jsonStr
      });
      return true;
    }

    // Table exceeds chunk size limit - split across chunks
    if (Array.isArray(records)) {
      const totalItems = records.length;
      const chunks = [];
      let currentChunk = [];
      let currentChunkSize = 0;

      for (const item of records) {
        const itemSize = new Blob([JSON.stringify(item)]).size;
        if (currentChunkSize + itemSize > CHUNK_SIZE_BYTES && currentChunk.length > 0) {
          chunks.push(currentChunk);
          currentChunk = [item];
          currentChunkSize = itemSize;
        } else {
          currentChunk.push(item);
          currentChunkSize += itemSize;
        }
      }
      if (currentChunk.length > 0) chunks.push(currentChunk);

      // Save each chunk
      for (let i = 0; i < chunks.length; i++) {
        const chunkDocRef = fs.doc(db, COLLECTION_NAME, `${tableName}__chunk_${i}`);
        await fs.setDoc(chunkDocRef, {
          table: tableName,
          chunkIndex: i,
          totalChunks: chunks.length,
          data: chunks[i],
          updatedAt: new Date().toISOString()
        });
      }

      // Save manifest doc
      const manifestDocRef = fs.doc(db, COLLECTION_NAME, tableName);
      await fs.setDoc(manifestDocRef, {
        isChunked: true,
        chunksCount: chunks.length,
        totalItems: totalItems,
        updatedAt: new Date().toISOString()
      });
      return true;
    }

    return false;
  } catch (err) {
    console.warn(`[Firebase Sync] Failed to save table ${tableName} to Firestore:`, err.message);
    return false;
  }
}

/**
 * Fetch all tables from Firestore, reassembling chunks
 */
export async function fetchAllFromFirestore() {
  try {
    const fb = await getFirestoreInstance();
    if (!fb) return null;

    const { db, fs } = fb;
    const colRef = fs.collection(db, COLLECTION_NAME);
    const snap = await fs.getDocs(colRef);

    if (snap.empty) {
      console.log('[Firebase Sync] Firestore database is currently empty.');
      return null;
    }

    const rawDocs = new Map();
    snap.forEach(docSnap => {
      rawDocs.set(docSnap.id, docSnap.data());
    });

    const assembledTables = {};

    for (const [docId, docData] of rawDocs.entries()) {
      // Skip chunk documents during first pass
      if (docId.includes('__chunk_')) continue;

      if (docData && docData.isChunked) {
        // Reassemble chunked table
        const chunksCount = docData.chunksCount || 0;
        let mergedList = [];
        for (let i = 0; i < chunksCount; i++) {
          const chunkDoc = rawDocs.get(`${docId}__chunk_${i}`);
          if (chunkDoc && Array.isArray(chunkDoc.data)) {
            mergedList = mergedList.concat(chunkDoc.data);
          }
        }
        assembledTables[docId] = mergedList;
      } else if (docData && docData.rawJson) {
        try {
          assembledTables[docId] = JSON.parse(docData.rawJson);
        } catch (_) {
          if (docData.data !== undefined) assembledTables[docId] = docData.data;
        }
      } else if (docData && docData.data !== undefined) {
        assembledTables[docId] = docData.data;
      }
    }

    const tableNames = Object.keys(assembledTables);
    if (tableNames.length === 0) return null;

    console.log(`[Firebase Sync] ✅ Loaded ${tableNames.length} tables from Google Cloud Firestore.`);
    return assembledTables;
  } catch (err) {
    console.warn('[Firebase Sync] Error reading from Firestore:', err.message);
    return null;
  }
}

/**
 * Save all tables to Firestore in managed concurrent batches
 */
export async function saveAllToFirestore(allData) {
  try {
    const fb = await getFirestoreInstance();
    if (!fb) return false;

    if (!allData || typeof allData !== 'object') return false;

    const tables = Object.keys(allData);
    let successCount = 0;

    // Process in batches of 4 to avoid browser network queue congestion
    for (let i = 0; i < tables.length; i += 4) {
      const batch = tables.slice(i, i + 4);
      await Promise.all(batch.map(async tbl => {
        const ok = await saveTableToFirestore(tbl, allData[tbl]);
        if (ok) successCount++;
      }));
    }

    console.log(`[Firebase Sync] ☁️ Successfully synchronized ${successCount}/${tables.length} tables to Cloud Firestore.`);
    return true;
  } catch (err) {
    console.warn('[Firebase Sync] Error in saveAllToFirestore:', err.message);
    return false;
  }
}
