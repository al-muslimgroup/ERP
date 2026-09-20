/**
 * Al-Muslim Group Garments Factory Maintenance Machine ERP
 * High-Performance Storage Engine with Fast In-Memory Indexes & Persistence
 */

import { INITIAL_DATA } from './initialData.js';
import { TABLE_NAMES, DEFAULT_SETTINGS, SCHEMA_VERSION, DEFAULT_PERMISSION_PRESETS } from './schema.js';
import * as firebaseSync from './firebaseSync.js';

const STORAGE_KEY_PREFIX = 'al_muslim_erp_';

function getApiEndpoint(path) {
  if (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:') {
    return 'http://localhost:3030' + path;
  }
  return path;
}

// Canonical map to normalize legacy machine name IDs
const DUPLICATE_ID_MAP = {
  'mac-1788870296741-262': 'mn-1788869247076-glop', // Double Needle Auto -> Double Needle Machine
  'mac-1788870296741-927': 'mn-1788869247118-qyw5', // Over Lock Mechine -> Over Lock Machine
  'mac-1788870296741-484': 'mn-1788869247492-lklr', // Zipper Joint -> Zipper Joint Machine
  'mac-1788870296741-259': 'mn-1788869247176-2gzf', // Multi Needle Chain Stitch -> Multi Needle Chain Stitch Machine
  'mac-1788870296741-196': 'mn-1788869247141-kx1a', // Chain Stitch -> Chain Stitch Machine
  'mac-1788870296741-404': 'mn-1788869247061-9dsy', // Vertical Bedoly -> Vertical Machine
  'mac-1788870296742-5':   'mn-1788869247572-yzvd', // Sleeve Joint -> Sleeve Joint Machine
  'mac-1788870296742-799': 'mn-1788869248254-ez5p', // Snap Button Hydrolic -> Snap Button Machine
  'mac-1788870296742-855': 'mn-1788869247076-glop', // Double Needle Manual -> Double Needle Machine
  'mac-1788870296742-252': 'mn-1788869247100-2uyc', // Feed of The Arm-Brother -> Feed of The Arm Machine
  'mac-1788870296742-285': 'mn-1788869247100-2uyc', // Feed of The Arm-Narrow -> Feed of The Arm Machine
  'mac-1788870296742-208': 'mn-1788869247738-cne3', // Loop Attach -> Loop Attach Machine
  'mac-1788870296742-973': 'mn-1788869247100-2uyc', // Feed of The Arm-AGM -> Feed of The Arm Machine
  'mac-1788870296742-664': 'mn-1788869247100-2uyc', // Feed of The Arm -> Feed of The Arm Machine
  'mac-1788870296742-107': 'mn-1788869247243-7wlt', // Botton Hole -> Button Hole Machine
  'mac-1788870296741-340': 'mn-1788869247205-his3'  // Bartack -> Bar tak Machine
};
const duplicateIdMap = DUPLICATE_ID_MAP;

class StorageEngine {
  constructor() {
    this.data = {};
    this.indexes = {
      machineBySerial: new Map(),
      machinesByLine: new Map(),
      machinesByUnit: new Map(),
      machinesByFloor: new Map(),
      machinesByName: new Map(),
      machinesByBrand: new Map(),
      machinesByModel: new Map(),
      machinesByStatus: new Map()
    };
    this.isInitialized = false;
    this._isPersisting = false;
    this._hasPendingPersist = false;
    this._unloadRegistered = false;
    this._suppressServerPersist = false;
    this._isCloudConnected = true;
    this._cloudPersistDebounces = {};
  }

  init() {
    if (this.isInitialized) return;

    try {
      this._suppressServerPersist = true;
      this.loadFromStorage();

      // If localStorage had no machines, seed from INITIAL_DATA in memory
      if (!this.data[TABLE_NAMES.MACHINES] || this.data[TABLE_NAMES.MACHINES].length === 0) {
        this.resetToInitialData(false);
      }

      this.rebuildAllIndexes();
      this.isInitialized = true;
      this._suppressServerPersist = false;

      // Register unload flush handler to guarantee zero data loss
      if (!this._unloadRegistered && typeof window !== 'undefined') {
        this._unloadRegistered = true;
        window.addEventListener('beforeunload', () => this.flushImmediate());
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'hidden') this.flushImmediate();
        });
      }

      // Synchronize immediately with server persistent database (single source of truth)
      this.syncWithServerDatabase();
      console.log('ERP Storage Engine initialized (v' + SCHEMA_VERSION + '). Total machines:', this.data[TABLE_NAMES.MACHINES]?.length || 0);
    } catch (err) {
      console.warn('LocalStorage error, falling back to memory seed:', err);
      this._suppressServerPersist = true;
      this.resetToInitialData(false);
      this.rebuildAllIndexes();
      this.isInitialized = true;
      this._suppressServerPersist = false;
      this.syncWithServerDatabase();
    }
  }

  resetToInitialData(persistToServer = false) {
    this.data = {
      [TABLE_NAMES.GROUPS]: JSON.parse(JSON.stringify(INITIAL_DATA.groups)),
      [TABLE_NAMES.UNITS]: JSON.parse(JSON.stringify(INITIAL_DATA.units)),
      [TABLE_NAMES.FLOORS]: JSON.parse(JSON.stringify(INITIAL_DATA.floors)),
      [TABLE_NAMES.LINES]: JSON.parse(JSON.stringify(INITIAL_DATA.lines)),
      [TABLE_NAMES.CATEGORIES]: JSON.parse(JSON.stringify(INITIAL_DATA.categories)),
      [TABLE_NAMES.MACHINE_NAMES]: JSON.parse(JSON.stringify(INITIAL_DATA.machine_names)),
      [TABLE_NAMES.BRANDS]: JSON.parse(JSON.stringify(INITIAL_DATA.brands)),
      [TABLE_NAMES.MODELS]: JSON.parse(JSON.stringify(INITIAL_DATA.models)),
      [TABLE_NAMES.CUSTOM_FIELDS]: JSON.parse(JSON.stringify(INITIAL_DATA.custom_fields)),
      [TABLE_NAMES.EXCEL_STRUCTURES]: JSON.parse(JSON.stringify(INITIAL_DATA.excel_structures || [])),
      [TABLE_NAMES.IMPORT_HISTORY]: JSON.parse(JSON.stringify(INITIAL_DATA.import_history || [])),
      [TABLE_NAMES.USERS]: JSON.parse(JSON.stringify(INITIAL_DATA.users)),
      [TABLE_NAMES.ROLES]: JSON.parse(JSON.stringify(INITIAL_DATA.roles || [])),
      [TABLE_NAMES.MACHINES]: INITIAL_DATA.generateInitialMachines(),
      [TABLE_NAMES.APPROVAL_REQUESTS]: JSON.parse(JSON.stringify(INITIAL_DATA.approval_requests)),
      [TABLE_NAMES.TRANSFERS]: JSON.parse(JSON.stringify(INITIAL_DATA.transfers)),
      [TABLE_NAMES.TRANSFER_REQUESTS]: JSON.parse(JSON.stringify(INITIAL_DATA.transfer_requests || [])),
      [TABLE_NAMES.TRANSFER_WORKFLOWS]: JSON.parse(JSON.stringify(INITIAL_DATA.transfer_workflows || [])),
      [TABLE_NAMES.MACHINE_HISTORY]: INITIAL_DATA.generateInitialHistory ? INITIAL_DATA.generateInitialHistory() : [],
      [TABLE_NAMES.SPARE_PARTS]: INITIAL_DATA.generateInitialSpareParts ? INITIAL_DATA.generateInitialSpareParts() : [],
      [TABLE_NAMES.SPARE_PARTS_MASTER]: JSON.parse(JSON.stringify(INITIAL_DATA.spare_parts_master || [])),
      [TABLE_NAMES.ET_BOARDS]: INITIAL_DATA.generateInitialEtBoards ? INITIAL_DATA.generateInitialEtBoards() : [],
      [TABLE_NAMES.ET_BOARD_HISTORY]: INITIAL_DATA.generateInitialEtHistory ? INITIAL_DATA.generateInitialEtHistory() : [],
      [TABLE_NAMES.ET_COMPANIES]: JSON.parse(JSON.stringify(INITIAL_DATA.et_companies || [])),
      [TABLE_NAMES.ET_CATEGORIES]: JSON.parse(JSON.stringify(INITIAL_DATA.et_categories || [])),
      [TABLE_NAMES.EMPLOYEES]: JSON.parse(JSON.stringify(INITIAL_DATA.employees || [])),
      [TABLE_NAMES.TOOLS_MASTER]: JSON.parse(JSON.stringify(INITIAL_DATA.tools_master || [])),
      [TABLE_NAMES.ACCESSORIES_MASTER]: JSON.parse(JSON.stringify(INITIAL_DATA.accessories_master || [])),
      [TABLE_NAMES.TOOL_ALLOCATIONS]: INITIAL_DATA.generateInitialToolAllocations ? INITIAL_DATA.generateInitialToolAllocations() : [],
      [TABLE_NAMES.TOOL_CHANGE_HISTORY]: JSON.parse(JSON.stringify(INITIAL_DATA.tool_change_history || [])),
      [TABLE_NAMES.AUDIT_LOGS]: JSON.parse(JSON.stringify(INITIAL_DATA.audit_logs)),
      [TABLE_NAMES.NOTIFICATIONS]: JSON.parse(JSON.stringify(INITIAL_DATA.notifications)),
      [TABLE_NAMES.SETTINGS]: JSON.parse(JSON.stringify(DEFAULT_SETTINGS)),
      [TABLE_NAMES.STORAGE_MASTER]: JSON.parse(JSON.stringify(INITIAL_DATA.storage_master || [])),
      [TABLE_NAMES.STORAGE_CORRECTION_RULES]: JSON.parse(JSON.stringify(INITIAL_DATA.storage_correction_rules || [])),
      [TABLE_NAMES.PREVENTIVE_CONFIG]: JSON.parse(JSON.stringify(INITIAL_DATA.preventive_config || [])),
      [TABLE_NAMES.PREVENTIVE_MAINTENANCE]: INITIAL_DATA.generateInitialPreventiveMaintenance ? INITIAL_DATA.generateInitialPreventiveMaintenance() : [],
      [TABLE_NAMES.RELOCATE_SESSIONS]: [],
      [TABLE_NAMES.RELOCATION_HISTORY]: [],
      [TABLE_NAMES.RELOCATION_APPROVALS]: [],
      [TABLE_NAMES.DOCUMENTS]: [],
      [TABLE_NAMES.PERMISSION_PRESETS]: JSON.parse(JSON.stringify(DEFAULT_PERMISSION_PRESETS || []))
    };

    Object.values(TABLE_NAMES).forEach(table => {
      try {
        localStorage.setItem(STORAGE_KEY_PREFIX + table, JSON.stringify(this.data[table] || []));
      } catch (_) {}
    });
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'version', SCHEMA_VERSION);
      localStorage.setItem(STORAGE_KEY_PREFIX + 'last_saved', new Date().toISOString());
    } catch (_) {}

    if (persistToServer) {
      this.persistToServerDatabase();
    }
    this.rebuildAllIndexes();
  }

  loadFromStorage() {
    Object.values(TABLE_NAMES).forEach(table => {
      const stored = localStorage.getItem(STORAGE_KEY_PREFIX + table);
      if (stored) {
        try {
          this.data[table] = JSON.parse(stored);
        } catch (e) {
          this.data[table] = [];
        }
      } else {
        this.data[table] = [];
      }
    });

    if (!this.data[TABLE_NAMES.SETTINGS] || Object.keys(this.data[TABLE_NAMES.SETTINGS]).length === 0) {
      this.data[TABLE_NAMES.SETTINGS] = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
    }

    if (!this.data[TABLE_NAMES.EXCEL_STRUCTURES] || this.data[TABLE_NAMES.EXCEL_STRUCTURES].length === 0) {
      this.data[TABLE_NAMES.EXCEL_STRUCTURES] = JSON.parse(JSON.stringify(INITIAL_DATA.excel_structures || []));
      this.saveTable(TABLE_NAMES.EXCEL_STRUCTURES);
    }

    if (!this.data[TABLE_NAMES.MACHINE_HISTORY] || this.data[TABLE_NAMES.MACHINE_HISTORY].length === 0) {
      this.data[TABLE_NAMES.MACHINE_HISTORY] = INITIAL_DATA.generateInitialHistory ? INITIAL_DATA.generateInitialHistory() : [];
      this.saveTable(TABLE_NAMES.MACHINE_HISTORY);
    }

    if (!this.data[TABLE_NAMES.SPARE_PARTS] || this.data[TABLE_NAMES.SPARE_PARTS].length === 0) {
      this.data[TABLE_NAMES.SPARE_PARTS] = INITIAL_DATA.generateInitialSpareParts ? INITIAL_DATA.generateInitialSpareParts() : [];
      this.saveTable(TABLE_NAMES.SPARE_PARTS);
    }

    if (!this.data[TABLE_NAMES.STORAGE_MASTER] || this.data[TABLE_NAMES.STORAGE_MASTER].length === 0) {
      this.data[TABLE_NAMES.STORAGE_MASTER] = JSON.parse(JSON.stringify(INITIAL_DATA.storage_master || []));
      this.saveTable(TABLE_NAMES.STORAGE_MASTER);
    }

    if (!this.data[TABLE_NAMES.STORAGE_CORRECTION_RULES] || this.data[TABLE_NAMES.STORAGE_CORRECTION_RULES].length === 0) {
      this.data[TABLE_NAMES.STORAGE_CORRECTION_RULES] = JSON.parse(JSON.stringify(INITIAL_DATA.storage_correction_rules || []));
      this.saveTable(TABLE_NAMES.STORAGE_CORRECTION_RULES);
    } else {
      // Normalize and sanitize field keys, stripping legacy assetId and sl (Sl. No. is purely automatic in software)
      this.data[TABLE_NAMES.EXCEL_STRUCTURES].forEach(struct => {
        if (struct.columns) {
          struct.columns = struct.columns.filter(c => 
            c.systemField !== 'assetId' && c.fieldKey !== 'assetId' && c.fieldKey !== 'asset_id' &&
            c.systemField !== 'sl' && c.fieldKey !== 'sl' && c.fieldKey !== 'sl_no'
          );
          struct.columns.forEach((c, idx) => {
            if (!c.fieldKey || c.systemField) {
              if (c.systemField === 'machineName' || c.fieldKey === 'machineName') c.fieldKey = 'machine_name';
              else if (c.systemField === 'brand' || c.fieldKey === 'brand') c.fieldKey = 'machine_brand';
              else if (c.systemField === 'model' || c.fieldKey === 'model') c.fieldKey = 'machine_model';
              else if (c.systemField === 'serialNumber' || c.fieldKey === 'serialNumber') c.fieldKey = 'machine_serial';
              else if (c.systemField === 'unit' || c.fieldKey === 'unit') c.fieldKey = 'unit_factory';
              else if (c.systemField === 'status' || c.fieldKey === 'status') c.fieldKey = 'machine_status';
              else if (c.systemField === 'remarks' || c.fieldKey === 'remarks') c.fieldKey = 'remarks';
              else if (!c.fieldKey) c.fieldKey = c.systemField || `col_${idx + 1}`;
            }
            c.order = idx + 1;
          });
        }
      });
      this.saveTable(TABLE_NAMES.EXCEL_STRUCTURES);
    }

    if (!this.data[TABLE_NAMES.TRANSFER_WORKFLOWS] || this.data[TABLE_NAMES.TRANSFER_WORKFLOWS].length === 0) {
      this.data[TABLE_NAMES.TRANSFER_WORKFLOWS] = JSON.parse(JSON.stringify(INITIAL_DATA.transfer_workflows || []));
      this.saveTable(TABLE_NAMES.TRANSFER_WORKFLOWS);
    }

    if (!this.data[TABLE_NAMES.TRANSFER_REQUESTS] || this.data[TABLE_NAMES.TRANSFER_REQUESTS].length === 0) {
      this.data[TABLE_NAMES.TRANSFER_REQUESTS] = JSON.parse(JSON.stringify(INITIAL_DATA.transfer_requests || []));
      this.saveTable(TABLE_NAMES.TRANSFER_REQUESTS);
    }

    if (!this.data[TABLE_NAMES.IMPORT_HISTORY] || this.data[TABLE_NAMES.IMPORT_HISTORY].length === 0) {
      this.data[TABLE_NAMES.IMPORT_HISTORY] = JSON.parse(JSON.stringify(INITIAL_DATA.import_history || []));
      this.saveTable(TABLE_NAMES.IMPORT_HISTORY);
    }

    if (!this.data[TABLE_NAMES.ROLES] || this.data[TABLE_NAMES.ROLES].length === 0) {
      this.data[TABLE_NAMES.ROLES] = JSON.parse(JSON.stringify(INITIAL_DATA.roles || []));
      this.saveTable(TABLE_NAMES.ROLES);
    }

    if (!this.data[TABLE_NAMES.SPARE_PARTS_MASTER] || this.data[TABLE_NAMES.SPARE_PARTS_MASTER].length === 0) {
      this.data[TABLE_NAMES.SPARE_PARTS_MASTER] = JSON.parse(JSON.stringify(INITIAL_DATA.spare_parts_master || []));
      this.saveTable(TABLE_NAMES.SPARE_PARTS_MASTER);
    }

    if (!this.data[TABLE_NAMES.EMPLOYEES] || this.data[TABLE_NAMES.EMPLOYEES].length === 0) {
      this.data[TABLE_NAMES.EMPLOYEES] = JSON.parse(JSON.stringify(INITIAL_DATA.employees || []));
      this.saveTable(TABLE_NAMES.EMPLOYEES);
    } else {
      let changedEmp = false;
      (INITIAL_DATA.employees || []).forEach(seed => {
        if (!this.data[TABLE_NAMES.EMPLOYEES].some(e => e.id === seed.id || e.cardNumber === seed.cardNumber)) {
          this.data[TABLE_NAMES.EMPLOYEES].push(JSON.parse(JSON.stringify(seed)));
          changedEmp = true;
        }
      });
      if (changedEmp) this.saveTable(TABLE_NAMES.EMPLOYEES);
    }

    if (!this.data[TABLE_NAMES.TOOLS_MASTER] || this.data[TABLE_NAMES.TOOLS_MASTER].length === 0) {
      this.data[TABLE_NAMES.TOOLS_MASTER] = JSON.parse(JSON.stringify(INITIAL_DATA.tools_master || []));
      this.saveTable(TABLE_NAMES.TOOLS_MASTER);
    } else {
      let changedTool = false;
      (INITIAL_DATA.tools_master || []).forEach(seed => {
        if (!this.data[TABLE_NAMES.TOOLS_MASTER].some(t => t.id === seed.id || t.code === seed.code || t.name === seed.name)) {
          this.data[TABLE_NAMES.TOOLS_MASTER].push(JSON.parse(JSON.stringify(seed)));
          changedTool = true;
        }
      });
      if (changedTool) this.saveTable(TABLE_NAMES.TOOLS_MASTER);
    }

    if (!this.data[TABLE_NAMES.ACCESSORIES_MASTER] || this.data[TABLE_NAMES.ACCESSORIES_MASTER].length === 0) {
      this.data[TABLE_NAMES.ACCESSORIES_MASTER] = JSON.parse(JSON.stringify(INITIAL_DATA.accessories_master || []));
      this.saveTable(TABLE_NAMES.ACCESSORIES_MASTER);
    } else {
      let changedAcc = false;
      (INITIAL_DATA.accessories_master || []).forEach(seed => {
        if (!this.data[TABLE_NAMES.ACCESSORIES_MASTER].some(a => a.id === seed.id || a.code === seed.code || a.name === seed.name)) {
          this.data[TABLE_NAMES.ACCESSORIES_MASTER].push(JSON.parse(JSON.stringify(seed)));
          changedAcc = true;
        }
      });
      if (changedAcc) this.saveTable(TABLE_NAMES.ACCESSORIES_MASTER);
    }

    if (!this.data[TABLE_NAMES.ET_BOARDS] || this.data[TABLE_NAMES.ET_BOARDS].length === 0) {
      this.data[TABLE_NAMES.ET_BOARDS] = INITIAL_DATA.generateInitialEtBoards ? INITIAL_DATA.generateInitialEtBoards() : [];
      this.saveTable(TABLE_NAMES.ET_BOARDS);
    }

    if (!this.data[TABLE_NAMES.ET_BOARD_HISTORY] || this.data[TABLE_NAMES.ET_BOARD_HISTORY].length === 0) {
      this.data[TABLE_NAMES.ET_BOARD_HISTORY] = INITIAL_DATA.generateInitialEtHistory ? INITIAL_DATA.generateInitialEtHistory() : [];
      this.saveTable(TABLE_NAMES.ET_BOARD_HISTORY);
    }

    if (!this.data[TABLE_NAMES.ET_COMPANIES] || this.data[TABLE_NAMES.ET_COMPANIES].length === 0) {
      this.data[TABLE_NAMES.ET_COMPANIES] = JSON.parse(JSON.stringify(INITIAL_DATA.et_companies || []));
      this.saveTable(TABLE_NAMES.ET_COMPANIES);
    }

    if (!this.data[TABLE_NAMES.ET_CATEGORIES] || this.data[TABLE_NAMES.ET_CATEGORIES].length === 0) {
      this.data[TABLE_NAMES.ET_CATEGORIES] = JSON.parse(JSON.stringify(INITIAL_DATA.et_categories || []));
      this.saveTable(TABLE_NAMES.ET_CATEGORIES);
    }

    if (!Array.isArray(this.data[TABLE_NAMES.RELOCATE_SESSIONS])) {
      this.data[TABLE_NAMES.RELOCATE_SESSIONS] = [];
    }
    if (!Array.isArray(this.data[TABLE_NAMES.RELOCATION_HISTORY])) {
      this.data[TABLE_NAMES.RELOCATION_HISTORY] = [];
    }
    if (!Array.isArray(this.data[TABLE_NAMES.RELOCATION_APPROVALS])) {
      this.data[TABLE_NAMES.RELOCATION_APPROVALS] = [];
    }

    if (!Array.isArray(this.data[TABLE_NAMES.PERMISSION_PRESETS]) || this.data[TABLE_NAMES.PERMISSION_PRESETS].length === 0) {
      this.data[TABLE_NAMES.PERMISSION_PRESETS] = JSON.parse(JSON.stringify(DEFAULT_PERMISSION_PRESETS || []));
      this.saveTable(TABLE_NAMES.PERMISSION_PRESETS);
    } else {
      // Ensure all standard system demo presets exist and are up to date
      let changedPresets = false;
      (DEFAULT_PERMISSION_PRESETS || []).forEach(seed => {
        const existingIdx = this.data[TABLE_NAMES.PERMISSION_PRESETS].findIndex(p => 
          p.id === seed.id || 
          p.code === seed.code ||
          (seed.code === 'MAINTENANCE_MANAGER' && (p.code === 'MANAGER' || p.id === 'preset_manager'))
        );
        if (existingIdx === -1) {
          this.data[TABLE_NAMES.PERMISSION_PRESETS].push(JSON.parse(JSON.stringify(seed)));
          changedPresets = true;
        } else {
          const existing = this.data[TABLE_NAMES.PERMISSION_PRESETS][existingIdx];
          if (existing.isSystem) {
            existing.id = seed.id;
            existing.code = seed.code;
            existing.name = seed.name;
            existing.accessLevel = seed.accessLevel;
            existing.description = seed.description;
            existing.icon = seed.icon;
            existing.badgeColor = seed.badgeColor;
            changedPresets = true;
          }
        }
      });
      if (changedPresets) {
        this.saveTable(TABLE_NAMES.PERMISSION_PRESETS);
      }
    }

    // Auto-migrate existing users to default permission presets
    const currentUsers = this.data[TABLE_NAMES.USERS] || [];
    let usersMigrated = false;
    currentUsers.forEach(u => {
      const uRole = (u.role || '').toUpperCase();
      if (!u.presetId || u.presetId === 'preset-super-admin' || u.presetId === 'preset-admin' || u.presetId === 'preset-maintenance-user') {
        if (uRole === 'SUPER_ADMIN' || u.username === 'superadmin') {
          u.presetId = 'preset_super_admin';
          u.presetName = 'Super Admin';
        } else if (uRole === 'ADMIN') {
          u.presetId = 'preset_admin';
          u.presetName = 'Admin';
        } else {
          u.presetId = 'preset_maintenance_user';
          u.presetName = 'Maintenance User';
        }
        usersMigrated = true;
      }
    });
    if (usersMigrated) {
      this.saveTable(TABLE_NAMES.USERS);
    }

    // Auto-migrate legacy storage_master machine names to canonical names
    const currentSM = this.data[TABLE_NAMES.STORAGE_MASTER] || [];
    let smMigrated = false;
    const smAliasMap = {
      'plain machine 1-needle': 'Plane Machine',
      'plain machine': 'Plane Machine',
      'overlock 4-thread': 'Over Lock Machine',
      'overlock 5-thread': 'Over Lock Machine',
      'flatlock cylinder bed': 'Flat Lock Machine',
      'bar tack machine': 'Bar tak Machine',
      'feed off the arm': 'Feed of The Arm Machine'
    };
    currentSM.forEach(it => {
      if (it && it.category === 'MACHINE' && it.machineName) {
        const lower = it.machineName.trim().toLowerCase();
        if (smAliasMap[lower]) {
          it.machineName = smAliasMap[lower];
          smMigrated = true;
        }
      }
    });
    if (smMigrated) {
      this.saveTable(TABLE_NAMES.STORAGE_MASTER);
    }

    // Auto-migrate legacy/duplicate machine IDs to canonical 76 machine types
    const duplicateIdMap = {
      'mac-1788870296741-262': 'mn-1788869247076-glop', // Double Needle Auto -> Double Needle Machine
      'mac-1788870296741-927': 'mn-1788869247118-qyw5', // Over Lock Mechine -> Over Lock Machine
      'mac-1788870296741-484': 'mn-1788869247492-lklr', // Zipper Joint -> Zipper Joint Machine
      'mac-1788870296741-259': 'mn-1788869247176-2gzf', // Multi Needle Chain Stitch -> Multi Needle Chain Stitch Machine
      'mac-1788870296741-196': 'mn-1788869247141-kx1a', // Chain Stitch -> Chain Stitch Machine
      'mac-1788870296741-404': 'mn-1788869247061-9dsy', // Vertical Bedoly -> Vertical Machine
      'mac-1788870296742-5':   'mn-1788869247572-yzvd', // Sleeve Joint -> Sleeve Joint Machine
      'mac-1788870296742-799': 'mn-1788869248254-ez5p', // Snap Button Hydrolic -> Snap Button Machine
      'mac-1788870296742-855': 'mn-1788869247076-glop', // Double Needle Manual -> Double Needle Machine
      'mac-1788870296742-252': 'mn-1788869247100-2uyc', // Feed of The Arm-Brother -> Feed of The Arm Machine
      'mac-1788870296742-285': 'mn-1788869247100-2uyc', // Feed of The Arm-Narrow -> Feed of The Arm Machine
      'mac-1788870296742-208': 'mn-1788869247738-cne3', // Loop Attach -> Loop Attach Machine
      'mac-1788870296742-973': 'mn-1788869247100-2uyc', // Feed of The Arm-AGM -> Feed of The Arm Machine
      'mac-1788870296742-664': 'mn-1788869247100-2uyc', // Feed of The Arm -> Feed of The Arm Machine
      'mac-1788870296742-107': 'mn-1788869247243-7wlt', // Botton Hole -> Button Hole Machine
      'mac-1788870296741-340': 'mn-1788869247205-his3'  // Bartack -> Bar tak Machine
    };

    let currentMachines = this.data[TABLE_NAMES.MACHINES] || [];
    const hasMockMachines = currentMachines.some(m => m && m.serialNumber && String(m.serialNumber).startsWith('JK-PM-'));
    if (hasMockMachines || currentMachines.length < 500) {
      currentMachines = INITIAL_DATA.generateInitialMachines();
      this.data[TABLE_NAMES.MACHINES] = currentMachines;
      try {
        localStorage.setItem(STORAGE_KEY_PREFIX + TABLE_NAMES.MACHINES, JSON.stringify(currentMachines));
      } catch (_) {}
    }

    let macsMigrated = false;
    currentMachines.forEach(m => {
      if (m && duplicateIdMap[m.machineNameId]) {
        m.machineNameId = duplicateIdMap[m.machineNameId];
        macsMigrated = true;
      }
    });
    if (macsMigrated) {
      this.saveTable(TABLE_NAMES.MACHINES);
    }

    // Deduplicate MACHINE_NAMES table: strip duplicates and ensure canonical 76
    const duplicateIds = new Set(Object.keys(duplicateIdMap));
    const currentMN = this.data[TABLE_NAMES.MACHINE_NAMES] || [];
    const uniqueMN = [];
    const seenMN = new Set();
    currentMN.forEach(mn => {
      if (mn && mn.name && !duplicateIds.has(mn.id)) {
        const norm = mn.name.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
        if (!seenMN.has(norm)) {
          seenMN.add(norm);
          uniqueMN.push(mn);
        }
      }
    });
    if (uniqueMN.length !== currentMN.length) {
      this.data[TABLE_NAMES.MACHINE_NAMES] = uniqueMN;
      this.saveTable(TABLE_NAMES.MACHINE_NAMES);
    }

    // Ensure Surma Floor (SU) exists under Pacific Blue (unt-2) if missing in current local storage
    const currentFloors = this.data[TABLE_NAMES.FLOORS] || [];
    const hasSurma = currentFloors.some(f => (f.code && f.code.toUpperCase() === 'SU') || (f.name && f.name.toLowerCase().includes('surma')));
    if (!hasSurma && currentFloors.some(f => f.unitId === 'unt-2')) {
      const surmaFloor = { id: 'flr-20', unitId: 'unt-2', name: 'Surma Floor', code: 'SU', building: 'Denim Plant', status: 'ACTIVE' };
      currentFloors.push(surmaFloor);
      this.saveTable(TABLE_NAMES.FLOORS);

      const currentLines = this.data[TABLE_NAMES.LINES] || [];
      if (!currentLines.some(l => l.floorId === 'flr-20' && l.name.toUpperCase() === 'SU-A')) {
        currentLines.push({ id: 'lin-23', floorId: 'flr-20', name: 'SU-A', code: 'SU-A', supervisor: 'Md. Enamul Haque', status: 'ACTIVE' });
      }
      if (!currentLines.some(l => l.floorId === 'flr-20' && l.name.toUpperCase() === 'SU-IDLE')) {
        currentLines.push({ id: 'lin-idl-20', floorId: 'flr-20', name: 'SU-Idle', code: 'SU-Idle', supervisor: 'Standby / Maintenance Pool', status: 'ACTIVE' });
      }
      this.saveTable(TABLE_NAMES.LINES);
    }

    // Ensure standard process sections (Size Set, Eyelet, APW Room) exist in database records for active floors
    const activeLinesList = this.data[TABLE_NAMES.LINES] || [];
    const activeFloorsList = this.data[TABLE_NAMES.FLOORS] || [];
    let linesAdded = 0;

    const targetFloorCodes = ['JA', 'BG', 'SU'];
    targetFloorCodes.forEach(fCode => {
      const floor = activeFloorsList.find(f => (f.code || '').toUpperCase() === fCode);
      if (floor) {
        // Clean up obsolete separate Eyelet / APW Room or Ironing lines for this floor
        for (let i = activeLinesList.length - 1; i >= 0; i--) {
          const l = activeLinesList[i];
          if (l.floorId === floor.id) {
            const upper = (l.name || '').toUpperCase();
            if (upper === `${fCode}-EYELET` || upper === `${fCode}-APW ROOM` || upper === `${fCode}-IRONING` || upper.endsWith('-IRONING')) {
              activeLinesList.splice(i, 1);
              linesAdded++;
            }
          }
        }

        const requiredSections = [
          { name: `${fCode}-Size Set`, code: `${fCode}-Size Set`, supervisor: 'Line Master (Size Set)' },
          { name: `${fCode}-Eyelet & APW Room`, code: `${fCode}-Eyelet & APW Room`, supervisor: 'Eyelet & APW Room Specialist' }
        ];

        requiredSections.forEach(sec => {
          const exists = activeLinesList.some(l => 
            l.floorId === floor.id && 
            (l.name.toUpperCase() === sec.name.toUpperCase() || (l.code && l.code.toUpperCase() === sec.code.toUpperCase()))
          );
          if (!exists) {
            activeLinesList.push({
              id: 'lin-' + floor.id + '-' + sec.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
              floorId: floor.id,
              name: sec.name,
              code: sec.code,
              supervisor: sec.supervisor,
              status: 'ACTIVE'
            });
            linesAdded++;
          }
        });
      }
    });

    if (linesAdded > 0) {
      this.saveTable(TABLE_NAMES.LINES);
      console.log(`[Database Store] Synchronized ${linesAdded} line records (Size Set, Eyelet & APW Room) to database.`);
    }

    if (!this.data[TABLE_NAMES.PREVENTIVE_CONFIG] || this.data[TABLE_NAMES.PREVENTIVE_CONFIG].length < 20) {
      this.data[TABLE_NAMES.PREVENTIVE_CONFIG] = JSON.parse(JSON.stringify(INITIAL_DATA.preventive_config || []));
      this.saveTable(TABLE_NAMES.PREVENTIVE_CONFIG);
    }

    if (!this.data[TABLE_NAMES.PREVENTIVE_MAINTENANCE] || this.data[TABLE_NAMES.PREVENTIVE_MAINTENANCE].length === 0) {
      this.data[TABLE_NAMES.PREVENTIVE_MAINTENANCE] = INITIAL_DATA.generateInitialPreventiveMaintenance ? INITIAL_DATA.generateInitialPreventiveMaintenance() : [];
      this.saveTable(TABLE_NAMES.PREVENTIVE_MAINTENANCE);
    }
  }

  saveTable(table) {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + table, JSON.stringify(this.data[table] || []));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'version', SCHEMA_VERSION);
      localStorage.setItem(STORAGE_KEY_PREFIX + 'last_saved', new Date().toISOString());
    } catch (err) {
      console.error('Failed to save table to localStorage:', table, err);
    }
    if (this._autoPersistDebounce) clearTimeout(this._autoPersistDebounce);
    this._autoPersistDebounce = setTimeout(() => {
      this.persistToServerDatabase();
    }, 150);

    // Debounced Firebase single-table cloud persistence
    if (this._cloudPersistDebounces && this._cloudPersistDebounces[table]) {
      clearTimeout(this._cloudPersistDebounces[table]);
    }
    if (!this._cloudPersistDebounces) this._cloudPersistDebounces = {};
    this._cloudPersistDebounces[table] = setTimeout(() => {
      firebaseSync.saveTableToFirestore(table, this.data[table]).then(ok => {
        if (ok) {
          this._isCloudConnected = true;
          this.updateStatusBadge('saved');
        }
      }).catch(() => {});
    }, 600);
  }

  saveAll() {
    Object.values(TABLE_NAMES).forEach(table => {
      try {
        localStorage.setItem(STORAGE_KEY_PREFIX + table, JSON.stringify(this.data[table] || []));
      } catch (_) {}
    });
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'version', SCHEMA_VERSION);
      localStorage.setItem(STORAGE_KEY_PREFIX + 'last_saved', new Date().toISOString());
    } catch (_) {}
    return this.persistToServerDatabase();
  }

  applyIncomingDatabaseRecords(serverRecs, sourceName = 'Persistent Store') {
    if (!serverRecs || typeof serverRecs !== 'object') return false;
    let updated = false;

    Object.keys(serverRecs).forEach(tbl => {
      if (Array.isArray(serverRecs[tbl])) {
        if (serverRecs[tbl].length > 0) {
          if (tbl === TABLE_NAMES.FLOORS || tbl === TABLE_NAMES.UNITS || tbl === TABLE_NAMES.GROUPS || tbl === TABLE_NAMES.LINES || tbl === TABLE_NAMES.MACHINE_NAMES || tbl === TABLE_NAMES.PREVENTIVE_CONFIG || tbl === TABLE_NAMES.MACHINES || tbl === TABLE_NAMES.USERS) {
            // Persistent database is authoritative source of truth for machines, users, hierarchy & config
            if (tbl === TABLE_NAMES.MACHINE_NAMES) {
              const seen = new Set();
              const cleanRecs = [];
              const dupIds = new Set(Object.keys(duplicateIdMap));
              serverRecs[tbl].forEach(m => {
                if (m && m.name && !dupIds.has(m.id)) {
                  const norm = m.name.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
                  if (!seen.has(norm)) {
                    seen.add(norm);
                    cleanRecs.push(m);
                  }
                }
              });
              this.data[tbl] = cleanRecs;
            } else if (tbl === TABLE_NAMES.MACHINES) {
              // Real factory machines list from Cloud Firestore or Persistent Store
              const incoming = serverRecs[tbl] || [];
              const hasMock = incoming.some(m => m && m.serialNumber && String(m.serialNumber).startsWith('JK-PM-'));
              if (hasMock && (this.data[tbl]?.length >= 500)) {
                console.warn('[Database Store] ⚠️ Blocked incoming mock machines from replacing real factory machines.');
                return;
              }
              const cleanMachines = incoming
                .filter(m => !(m && m.serialNumber && String(m.serialNumber).startsWith('JK-PM-')))
                .map(m => {
                  if (m && duplicateIdMap[m.machineNameId]) {
                    return { ...m, machineNameId: duplicateIdMap[m.machineNameId] };
                  }
                  return m;
                });
              if (cleanMachines.length >= 500 || !this.data[tbl] || this.data[tbl].length === 0) {
                this.data[tbl] = cleanMachines;
              }
            } else {
              this.data[tbl] = serverRecs[tbl];
            }
          } else {
            // Intelligently merge by record ID so newly added items are not wiped out
            const localList = (this.data[tbl] || []).filter(item => {
              if (item && item.serialNumber && String(item.serialNumber).startsWith('JK-PM-')) return false;
              return true;
            });
            const mergedMap = new Map();
            localList.forEach(item => { if (item && item.id) mergedMap.set(item.id, item); });
            serverRecs[tbl].forEach(sItem => { if (sItem && sItem.id) mergedMap.set(sItem.id, sItem); });
            let merged = Array.from(mergedMap.values());

            // If storage_master, auto-migrate alias machine names
            if (tbl === TABLE_NAMES.STORAGE_MASTER) {
              const smAliasMap = {
                'plain machine 1-needle': 'Plane Machine',
                'plain machine': 'Plane Machine',
                'overlock 4-thread': 'Over Lock Machine',
                'overlock 5-thread': 'Over Lock Machine',
                'flatlock cylinder bed': 'Flat Lock Machine',
                'bar tack machine': 'Bar tak Machine',
                'feed off the arm': 'Feed of The Arm Machine'
              };
              merged.forEach(it => {
                if (it && it.category === 'MACHINE' && it.machineName) {
                  const lower = it.machineName.trim().toLowerCase();
                  if (smAliasMap[lower]) {
                    it.machineName = smAliasMap[lower];
                  }
                }
              });
            }

            this.data[tbl] = merged;
          }

          try {
            localStorage.setItem(STORAGE_KEY_PREFIX + tbl, JSON.stringify(this.data[tbl]));
          } catch (_) {}
          updated = true;
        } else if (tbl === TABLE_NAMES.MACHINE_NAMES || tbl === TABLE_NAMES.MODELS || tbl === TABLE_NAMES.BRANDS) {
          if (Array.isArray(this.data[tbl]) && this.data[tbl].length > 0) {
            this.data[tbl] = [];
            try {
              localStorage.setItem(STORAGE_KEY_PREFIX + tbl, JSON.stringify([]));
            } catch (_) {}
            updated = true;
          }
        }
      }
    });

    if (updated) {
      this.rebuildAllIndexes();
      this.updateStatusBadge('saved');
      console.log(`[Database Store] ✅ Synchronized with ${sourceName}. Total machines: ${this.data[TABLE_NAMES.MACHINES]?.length || 0}, Total lines: ${this.data[TABLE_NAMES.LINES]?.length || 0}`);

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('erp:master-data-updated'));
        window.dispatchEvent(new CustomEvent('erp:storage-updated'));
        window.dispatchEvent(new CustomEvent('erp:inventory-updated'));
        if (window.state && typeof window.state.emit === 'function') {
          window.state.emit('inventory:updated');
        }
      }
    }
    return updated;
  }

  async syncWithServerDatabase() {
    // 1. Google Cloud Firestore sync
    try {
      const cloudData = await firebaseSync.fetchAllFromFirestore();
      if (cloudData && typeof cloudData === 'object') {
        const hasCloudMachines = Array.isArray(cloudData[TABLE_NAMES.MACHINES]) && cloudData[TABLE_NAMES.MACHINES].length > 0;
        if (hasCloudMachines) {
          this._isCloudConnected = true;
          this.applyIncomingDatabaseRecords(cloudData, 'Google Cloud Firestore');
        } else if (Array.isArray(this.data[TABLE_NAMES.MACHINES]) && this.data[TABLE_NAMES.MACHINES].length > 0) {
          console.log('[Firebase Sync] Cloud database is new, uploading initial factory records...');
          firebaseSync.saveAllToFirestore(this.data).then(ok => {
            if (ok) {
              this._isCloudConnected = true;
              this.updateStatusBadge('saved');
            }
          }).catch(() => {});
        }
      } else if (Array.isArray(this.data[TABLE_NAMES.MACHINES]) && this.data[TABLE_NAMES.MACHINES].length > 0) {
        firebaseSync.saveAllToFirestore(this.data).then(ok => {
          if (ok) {
            this._isCloudConnected = true;
            this.updateStatusBadge('saved');
          }
        }).catch(() => {});
      }
    } catch (cloudErr) {
      console.warn('[Database Store] Firebase cloud check note:', cloudErr.message);
    }

    // 2. Local Node.js server sync
    try {
      const url = getApiEndpoint('/api/db/records');
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.status === 'ok' && data.records && typeof data.records === 'object') {
          const serverRecs = data.records;
          const hasServerData = Array.isArray(serverRecs.machines) && serverRecs.machines.length > 0;
          if (hasServerData) {
            this.applyIncomingDatabaseRecords(serverRecs, 'Local Server (data/erp_database.json)');
          } else {
            await this.persistToServerDatabase();
          }
        }
      }
    } catch (e) {
      // 3. Static database fallback for GitHub Pages & static web hosts
      try {
        const staticRes = await fetch('data/erp_database.json?v=' + Date.now(), { cache: 'no-store' });
        if (staticRes.ok) {
          const staticData = await staticRes.json();
          if (staticData && Array.isArray(staticData.machines) && staticData.machines.length > 0) {
            this.applyIncomingDatabaseRecords(staticData, 'Static Factory Database (data/erp_database.json)');
          }
        }
      } catch (_) {}
      console.info('[Database Store] Local node server offline or on static host.');
    }
  }

  async persistToServerDatabase() {
    if (this._suppressServerPersist) return { status: 'suppressed' };
    if (!this.data || !Array.isArray(this.data[TABLE_NAMES.MACHINES]) || this.data[TABLE_NAMES.MACHINES].length === 0) {
      return { status: 'skipped' };
    }

    if (this._autoPersistDebounce) {
      clearTimeout(this._autoPersistDebounce);
      this._autoPersistDebounce = null;
    }

    if (this._activePersistPromise) {
      this._hasPendingPersist = true;
      try {
        await this._activePersistPromise;
      } catch (_) {}
      if (this._hasPendingPersist) {
        return this.persistToServerDatabase();
      }
      return { status: 'ok' };
    }

    this._hasPendingPersist = false;
    this.updateStatusBadge('saving');

    this._activePersistPromise = (async () => {
      // Async trigger Firebase Cloud Firestore save in parallel
      firebaseSync.saveAllToFirestore(this.data).then(ok => {
        if (ok) {
          this._isCloudConnected = true;
          this.updateStatusBadge('saved');
        }
      }).catch(() => {});

      try {
        const payload = JSON.stringify(this.data);
        const url = getApiEndpoint('/api/db/records');
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload
        });

        if (res.ok) {
          const result = await res.json().catch(() => ({}));
          this.updateStatusBadge('saved', result);
          console.log(`[Database Store] ✅ Saved to persistent server database: data/erp_database.json (${result.machinesCount || this.data[TABLE_NAMES.MACHINES]?.length || 0} machines, ${result.linesCount || this.data[TABLE_NAMES.LINES]?.length || 0} lines)`);
          return result;
        } else {
          // If local server returned 404/error (e.g. GitHub Pages), check if cloud connected
          if (this._isCloudConnected) {
            this.updateStatusBadge('saved');
            return { status: 'ok', cloud: true };
          }
          this.updateStatusBadge('error');
          console.warn(`[Database Store] ⚠️ Persistence server returned status: ${res.status}`);
          return { status: 'error', code: res.status };
        }
      } catch (err) {
        if (this._isCloudConnected) {
          this.updateStatusBadge('saved');
          return { status: 'ok', cloud: true };
        }
        this.updateStatusBadge('offline');
        console.warn('[Database Store] ⚠️ Persistence offline / network note:', err.message);
        return { status: 'offline', error: err.message };
      } finally {
        this._activePersistPromise = null;
      }
    })();

    const finalResult = await this._activePersistPromise;
    if (this._hasPendingPersist) {
      return this.persistToServerDatabase();
    }
    return finalResult;
  }

  flushImmediate() {
    if (this._suppressServerPersist) return;
    if (!this.data || !Array.isArray(this.data[TABLE_NAMES.MACHINES]) || this.data[TABLE_NAMES.MACHINES].length === 0) {
      return;
    }

    try {
      const payload = JSON.stringify(this.data);
      const url = getApiEndpoint('/api/db/records');
      if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon(url, blob);
      } else if (typeof fetch === 'function') {
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true
        }).catch(() => {});
      }
    } catch (_) {}
  }

  updateStatusBadge(status, details = null) {
    if (typeof document === 'undefined') return;
    const statusEl = document.getElementById('nav-db-status');
    if (!statusEl) return;

    if (status === 'saving') {
      statusEl.style.borderColor = 'rgba(245, 158, 11, 0.5)';
      statusEl.style.background = 'rgba(245, 158, 11, 0.12)';
      statusEl.style.color = '#fbbf24';
      statusEl.title = 'Syncing changes to Google Cloud Firestore...';
      statusEl.innerHTML = '<span style="font-size: 12px; line-height: 1;">☁️</span><span class="db-status-text">Syncing...</span>';
    } else if (status === 'saved' || status === 'synced') {
      statusEl.style.borderColor = 'rgba(56, 189, 248, 0.4)';
      statusEl.style.background = 'rgba(56, 189, 248, 0.15)';
      statusEl.style.color = '#38bdf8';
      statusEl.title = 'Google Cloud Firestore Synchronized (maint-dept-erp)';
      statusEl.innerHTML = '<span style="font-size: 12px; line-height: 1;">☁️</span><span class="db-status-text">Cloud Synced</span>';
    } else if (status === 'error' || status === 'offline') {
      statusEl.style.borderColor = 'rgba(239, 68, 68, 0.4)';
      statusEl.style.background = 'rgba(239, 68, 68, 0.15)';
      statusEl.style.color = '#f87171';
      statusEl.title = 'Offline / LocalStorage mode';
      statusEl.innerHTML = '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#ef4444;box-shadow:0 0 6px #ef4444;"></span><span class="db-status-text">Local Only</span>';
    }
  }

  rebuildAllIndexes() {
    this.indexes.machineBySerial.clear();
    this.indexes.machinesByLine.clear();
    this.indexes.machinesByUnit.clear();
    this.indexes.machinesByFloor.clear();
    this.indexes.machinesByName.clear();
    this.indexes.machinesByBrand.clear();
    this.indexes.machinesByModel.clear();
    this.indexes.machinesByStatus.clear();

    const machines = this.data[TABLE_NAMES.MACHINES] || [];
    machines.forEach(mc => {
      if (mc.serialNumber) {
        this.indexes.machineBySerial.set(mc.serialNumber.trim().toUpperCase(), mc);
      }

      this._addToIndexMap(this.indexes.machinesByLine, mc.lineId, mc);
      this._addToIndexMap(this.indexes.machinesByUnit, mc.unitId, mc);
      this._addToIndexMap(this.indexes.machinesByFloor, mc.floorId, mc);
      this._addToIndexMap(this.indexes.machinesByName, mc.machineNameId, mc);
      this._addToIndexMap(this.indexes.machinesByBrand, mc.brandId, mc);
      this._addToIndexMap(this.indexes.machinesByModel, mc.modelId, mc);
      this._addToIndexMap(this.indexes.machinesByStatus, mc.status, mc);
    });
  }

  _addToIndexMap(map, key, item) {
    if (!key) return;
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(item);
  }

  getTable(tableName) {
    return this.data[tableName] || [];
  }

  setTable(tableName, items) {
    this.data[tableName] = items || [];
    this.saveTable(tableName);
    if (tableName === TABLE_NAMES.MACHINES) {
      this.rebuildAllIndexes();
    }
    return this.data[tableName];
  }

  getItem(tableName, id) {
    const table = this.data[tableName] || [];
    return table.find(item => item.id === id) || null;
  }

  insert(tableName, item) {
    if (!this.data[tableName]) {
      this.data[tableName] = [];
    }

    if (!item.id) {
      item.id = `${tableName.substring(0, 3)}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }

    item.createdAt = item.createdAt || new Date().toISOString();
    item.updatedAt = new Date().toISOString();

    this.data[tableName].push(item);
    this.saveTable(tableName);

    if (tableName === TABLE_NAMES.MACHINES) {
      this.rebuildAllIndexes();
    }

    return item;
  }

  insertMany(tableName, items) {
    if (!this.data[tableName]) {
      this.data[tableName] = [];
    }

    const now = new Date().toISOString();
    items.forEach(item => {
      if (!item.id) {
        item.id = `${tableName.substring(0, 3)}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      }
      item.createdAt = item.createdAt || now;
      item.updatedAt = now;
      this.data[tableName].push(item);
    });

    this.saveTable(tableName);

    if (tableName === TABLE_NAMES.MACHINES) {
      this.rebuildAllIndexes();
    }

    return items;
  }

  update(tableName, id, updates) {
    const table = this.data[tableName] || [];
    const index = table.findIndex(item => item.id === id);
    if (index === -1) return null;

    table[index] = {
      ...table[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.saveTable(tableName);

    if (tableName === TABLE_NAMES.MACHINES) {
      this.rebuildAllIndexes();
    }

    return table[index];
  }

  delete(tableName, id) {
    const table = this.data[tableName] || [];
    const index = table.findIndex(item => item.id === id);
    if (index === -1) return false;

    const removed = table.splice(index, 1)[0];
    this.saveTable(tableName);

    if (tableName === TABLE_NAMES.MACHINES) {
      this.rebuildAllIndexes();
    }

    return removed;
  }

  // Fast Index Lookups
  findMachineBySerial(serial) {
    if (!serial) return null;
    return this.indexes.machineBySerial.get(serial.trim().toUpperCase()) || null;
  }

  // Export full DB backup as JSON
  exportBackup() {
    return JSON.stringify({
      version: '1.1.0',
      exportedAt: new Date().toISOString(),
      system: 'Al-Muslim Group Maintenance Department ERP',
      data: this.data
    }, null, 2);
  }

  // Restore DB from JSON backup
  importBackup(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.data) throw new Error('Invalid backup schema');
      this.data = parsed.data;
      this.saveAll();
      this.rebuildAllIndexes();
      return { success: true, count: this.data[TABLE_NAMES.MACHINES]?.length || 0 };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
}

export const storage = new StorageEngine();
storage.init();
