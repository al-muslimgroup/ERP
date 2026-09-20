/**
 * Full Database Synchronization Script for Google Cloud Firestore
 * Al-Muslim Group Maintenance ERP System
 */

const fs = require('fs');
const path = require('path');
const sf = require('../serverFirebase');

const DB_FILE = path.join(__dirname, '..', 'data', 'erp_database.json');

async function runFullSync() {
  console.log('========================================================================');
  console.log('  STARTING FULL CLOUD FIRESTORE SYNCHRONIZATION');
  console.log('========================================================================');

  if (!fs.existsSync(DB_FILE)) {
    console.error('❌ Database file not found:', DB_FILE);
    process.exit(1);
  }

  const raw = fs.readFileSync(DB_FILE, 'utf8');
  const dbData = JSON.parse(raw);
  const tables = Object.keys(dbData);

  console.log(`Loaded ${tables.length} tables from data/erp_database.json`);

  const ready = await sf.checkFirestoreReady();
  if (!ready) {
    console.error('❌ Firestore connection check failed. Ensure serviceAccountKey.json is valid and network is up.');
    process.exit(1);
  }
  console.log('✅ Google Cloud Firestore connection verified and ready.\n');

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    const data = dbData[table];
    const itemCount = Array.isArray(data) ? data.length : (data ? 1 : 0);
    const byteSize = Buffer.byteLength(JSON.stringify(data ?? []));
    const kbSize = (byteSize / 1024).toFixed(1);

    process.stdout.write(`[${i + 1}/${tables.length}] Syncing "${table}" (${itemCount} items, ${kbSize} KB)... `);

    try {
      const ok = await sf.uploadTableToFirestore(table, data);
      if (ok) {
        console.log('✅ DONE');
        successCount++;
      } else {
        console.log('❌ FAILED (Server returned false)');
        failCount++;
      }
    } catch (err) {
      console.log(`❌ ERROR: ${err.message}`);
      failCount++;
    }
  }

  console.log('\n========================================================================');
  console.log(`  SYNC SUMMARY: ${successCount} PASSED, ${failCount} FAILED OUT OF ${tables.length} TABLES`);
  console.log('========================================================================\n');

  if (failCount > 0) {
    process.exit(1);
  }
}

runFullSync().catch(err => {
  console.error('Fatal error during sync:', err);
  process.exit(1);
});
