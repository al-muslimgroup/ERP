/**
 * Al-Muslim Group Garments Factory Maintenance Machine ERP
 * Audit Trail & Activity Logging Service
 */

import { storage } from '../db/storage.js';
import { TABLE_NAMES } from '../db/schema.js';

class AuditService {
  /**
   * Safely normalize any log item (handling old corrupted or object actions)
   */
  _normalizeLog(log) {
    if (!log || typeof log !== 'object') {
      return {
        id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        action: 'UNKNOWN_ACTION',
        entity: 'SYSTEM',
        entityId: '',
        details: '',
        username: 'system',
        timestamp: new Date().toISOString()
      };
    }

    let actionStr = 'ACTIVITY';
    let entityStr = 'SYSTEM';
    let entityIdStr = '';
    let detailsStr = '';

    if (typeof log.action === 'string') {
      actionStr = log.action;
    } else if (typeof log.action === 'object' && log.action !== null) {
      actionStr = typeof log.action.action === 'string' ? log.action.action : 'TOOL_ACTIVITY';
      if (log.action.entity) entityStr = String(log.action.entity);
      if (log.action.targetId || log.action.entityId) entityIdStr = String(log.action.targetId || log.action.entityId);
      if (log.action.details) detailsStr = typeof log.action.details === 'string' ? log.action.details : JSON.stringify(log.action.details);
    }

    if (typeof log.entity === 'string') entityStr = log.entity;
    else if (log.entity != null) entityStr = String(log.entity);

    if (typeof log.entityId === 'string') entityIdStr = log.entityId;
    else if (log.entityId != null) entityIdStr = String(log.entityId);

    if (typeof log.details === 'string') detailsStr = log.details;
    else if (log.details != null) detailsStr = typeof log.details === 'object' ? JSON.stringify(log.details) : String(log.details);

    return {
      ...log,
      action: actionStr,
      entity: entityStr,
      entityId: entityIdStr,
      details: detailsStr,
      username: typeof log.username === 'string' ? log.username : (log.userId || 'system'),
      timestamp: log.timestamp || new Date().toISOString()
    };
  }

  /**
   * Retrieve and automatically normalize all logs from storage
   */
  _getNormalizedLogs() {
    const raw = storage.getTable(TABLE_NAMES.AUDIT_LOGS) || [];
    let needsSave = false;

    const normalized = raw.map(l => {
      const n = this._normalizeLog(l);
      if (typeof l.action === 'object' || typeof l.details === 'object' || !l.action) {
        needsSave = true;
      }
      return n;
    });

    if (needsSave) {
      try {
        storage.saveTable(TABLE_NAMES.AUDIT_LOGS, normalized);
      } catch (_) {}
    }

    return normalized;
  }

  log(action, entity, entityId, details, oldData = null, newData = null) {
    try {
      let act = action;
      let ent = entity;
      let entId = entityId;
      let det = details;
      let oData = oldData;
      let nData = newData;

      // Support single object parameter
      if (typeof action === 'object' && action !== null) {
        act = action.action || 'ACTIVITY';
        ent = action.entity || 'TOOL';
        entId = action.targetId || action.entityId || '';
        det = action.details || '';
        oData = action.oldData || null;
        nData = action.newData || null;
      }

      let user = null;
      try {
        const savedUserId = localStorage.getItem('al_muslim_active_user_id');
        if (savedUserId) {
          const users = storage.getTable(TABLE_NAMES.USERS) || [];
          user = users.find(u => u.id === savedUserId);
        }
      } catch (e) {}

      if (!user) {
        user = { id: 'sys', username: 'superadmin' };
      }

      const logEntry = {
        id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        userId: user.id,
        username: user.username,
        action: typeof act === 'string' ? act : String(act || 'ACTIVITY'),
        entity: typeof ent === 'string' ? ent : String(ent || 'SYSTEM'),
        entityId: typeof entId === 'string' ? entId : (entId != null ? String(entId) : ''),
        details: typeof det === 'string' ? det : (det != null ? String(det) : ''),
        oldData: oData,
        newData: nData,
        ip: '127.0.0.1',
        timestamp: new Date().toISOString()
      };

      storage.insert(TABLE_NAMES.AUDIT_LOGS, logEntry);
      
      // Notify components listening to audit log updates
      try {
        window.dispatchEvent(new CustomEvent('erp:audit-logs-updated', { detail: logEntry }));
      } catch (_) {}

    } catch (e) {
      console.error('Failed to log audit event:', e);
    }
  }

  /**
   * Determine the organizational module/category for a log item
   */
  getLogCategory(log) {
    const n = this._normalizeLog(log);
    const entity = (n.entity || '').toUpperCase();
    const action = (n.action || '').toUpperCase();

    // 1. Plant Hierarchy & Master Data
    if (['LINE', 'FLOOR', 'UNIT', 'GROUP', 'MACHINE_NAME', 'BRAND', 'MODEL', 'MASTER_DATA', 'MACHINE_STORAGE'].includes(entity) || 
        action.startsWith('MASTER_') || action.includes('STORAGE_')) {
      return { 
        id: 'MASTER_DATA', 
        label: 'Plant & Master Data', 
        icon: '🏢', 
        color: '#a855f7',
        bg: 'rgba(168, 85, 247, 0.15)',
        border: 'rgba(168, 85, 247, 0.4)'
      };
    }

    // 2. Machine Relocation & Transfers
    if (['TRANSFER', 'TRANSFER_WORKFLOW', 'RELOCATE'].includes(entity) || 
        action.includes('TRANSFER') || action.includes('RELOCAT') || action.includes('WORKFLOW')) {
      return { 
        id: 'TRANSFERS', 
        label: 'Transfers & Relocations', 
        icon: '🔄', 
        color: '#38bdf8',
        bg: 'rgba(56, 189, 248, 0.15)',
        border: 'rgba(56, 189, 248, 0.4)'
      };
    }

    // 3. Machines & Equipment Operations
    if (['MACHINE', 'MACHINE_HISTORY', 'INVENTORY', 'SPARE_PART', 'QR_CODE'].includes(entity) || 
        action.includes('MACHINE_') || action.includes('SPARE_') || action.includes('INVENTORY') || action.includes('QR_')) {
      return { 
        id: 'MACHINES', 
        label: 'Machine & Equipment', 
        icon: '🧵', 
        color: '#10b981',
        bg: 'rgba(16, 185, 129, 0.15)',
        border: 'rgba(16, 185, 129, 0.4)'
      };
    }

    // 4. Maintenance, Servicing & ENT Lab
    if (['SERVICE_REPAIR', 'PREVENTIVE_MAINTENANCE', 'ET_LAB', 'BOARD', 'TOOL'].includes(entity) || 
        action.includes('SERVICE') || action.includes('REPAIR') || action.includes('MAINTENANCE') || action.includes('ET_LAB') || action.includes('TOOL')) {
      return { 
        id: 'MAINTENANCE', 
        label: 'Maintenance & Service', 
        icon: '🛠️', 
        color: '#f59e0b',
        bg: 'rgba(245, 158, 11, 0.15)',
        border: 'rgba(245, 158, 11, 0.4)'
      };
    }

    // 5. Users, Roles & Security
    if (['USER', 'ROLE', 'AUTH', 'SESSION', 'PASSWORD'].includes(entity) || 
        action.includes('USER') || action.includes('LOGIN') || action.includes('PASSWORD') || action.includes('ROLE')) {
      return { 
        id: 'USERS', 
        label: 'Users & Security', 
        icon: '👥', 
        color: '#ec4899',
        bg: 'rgba(236, 72, 153, 0.15)',
        border: 'rgba(236, 72, 153, 0.4)'
      };
    }

    // 6. System & General Operations
    return { 
      id: 'SYSTEM', 
      label: 'System & Config', 
      icon: '⚙️', 
      color: '#94a3b8',
      bg: 'rgba(148, 163, 184, 0.15)',
      border: 'rgba(148, 163, 184, 0.3)'
    };
  }

  getLogs(filters = {}) {
    let logs = this._getNormalizedLogs();
    logs = [...logs].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    if (filters.category && filters.category !== 'ALL') {
      logs = logs.filter(l => this.getLogCategory(l).id === filters.category);
    }

    if (filters.actionType && filters.actionType !== 'ALL') {
      const at = filters.actionType.toUpperCase();
      logs = logs.filter(l => {
        const act = (l.action || '').toUpperCase();
        if (at === 'APPROVE') return act.includes('APPROV') || act.includes('ACCEPT');
        if (at === 'TRANSFER') return act.includes('TRANSFER') || act.includes('RELOCAT') || act.includes('MOVE');
        if (at === 'TOGGLE') return act.includes('TOGGL') || act.includes('STATUS');
        if (at === 'CREATE') return act.includes('CREATE') || act.includes('ADD') || act.includes('REGISTER');
        if (at === 'UPDATE') return act.includes('UPDATE') || act.includes('EDIT') || act.includes('CONFIG');
        if (at === 'DELETE') return act.includes('DELETE') || act.includes('REJECT') || act.includes('CANCEL') || act.includes('WIPE');
        return true;
      });
    }

    if (filters.action && filters.action !== 'ALL') {
      logs = logs.filter(l => (l.action || '').toLowerCase().includes(filters.action.toLowerCase()));
    }

    if (filters.username && filters.username !== 'ALL') {
      logs = logs.filter(l => (l.username || '').toLowerCase() === filters.username.toLowerCase());
    }

    if (filters.entity && filters.entity !== 'ALL') {
      logs = logs.filter(l => (l.entity || '').toUpperCase() === filters.entity.toUpperCase());
    }

    if (filters.startDate) {
      const s = new Date(filters.startDate).setHours(0, 0, 0, 0);
      logs = logs.filter(l => new Date(l.timestamp).getTime() >= s);
    }

    if (filters.endDate) {
      const e = new Date(filters.endDate).setHours(23, 59, 59, 999);
      logs = logs.filter(l => new Date(l.timestamp).getTime() <= e);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      logs = logs.filter(l => 
        (l.details && l.details.toLowerCase().includes(q)) || 
        (l.username && l.username.toLowerCase().includes(q)) ||
        (l.action && l.action.toLowerCase().includes(q)) ||
        (l.entity && l.entity.toLowerCase().includes(q)) ||
        (l.entityId && l.entityId.toLowerCase().includes(q))
      );
    }

    return logs;
  }

  /**
   * Get total log counts per category for KPI metrics
   */
  getCategoryCounts() {
    const all = this._getNormalizedLogs();
    const counts = {
      TOTAL: all.length,
      MASTER_DATA: 0,
      TRANSFERS: 0,
      MACHINES: 0,
      MAINTENANCE: 0,
      USERS: 0,
      SYSTEM: 0
    };

    all.forEach(l => {
      const cat = this.getLogCategory(l);
      if (counts[cat.id] !== undefined) {
        counts[cat.id]++;
      }
    });

    return counts;
  }

  /**
   * Export logs array to styled Excel workbook
   */
  exportLogsToExcel(logs) {
    if (typeof XLSX === 'undefined') {
      alert('Excel export library is not available.');
      return;
    }

    const data = (logs || []).map((l, index) => {
      const cat = this.getLogCategory(l);
      return {
        'SL': index + 1,
        'Timestamp': new Date(l.timestamp).toLocaleString(),
        'Category': cat.label,
        'User': l.username || 'System',
        'Action': (l.action || '').replace(/_/g, ' '),
        'Entity': l.entity || 'N/A',
        'Entity ID': l.entityId || 'N/A',
        'Action Details': l.details || '',
        'IP Address': l.ip || '127.0.0.1'
      };
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Audit Trail');
    
    // Auto column widths
    const colWidths = [
      { wch: 6 },  // SL
      { wch: 22 }, // Timestamp
      { wch: 24 }, // Category
      { wch: 16 }, // User
      { wch: 28 }, // Action
      { wch: 18 }, // Entity
      { wch: 24 }, // Entity ID
      { wch: 60 }, // Action Details
      { wch: 14 }  // IP Address
    ];
    ws['!cols'] = colWidths;

    XLSX.writeFile(wb, `Al_Muslim_ERP_Audit_Logs_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  /**
   * Clear all audit logs (Superadmin only)
   */
  clearAllLogs() {
    storage.saveTable(TABLE_NAMES.AUDIT_LOGS, []);
    this.log('AUDIT_LOGS_CLEARED', 'SYSTEM', 'ROOT', 'All previous system audit trail logs were wiped by Administrator.');
    try {
      window.dispatchEvent(new CustomEvent('erp:audit-logs-updated'));
    } catch (_) {}
  }
}

export const auditService = new AuditService();
