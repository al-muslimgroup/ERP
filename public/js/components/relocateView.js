/**
 * Al-Muslim Group Garments Factory Maintenance Machine ERP
 * Machine Inventory -> Relocate View Component
 * Mobile-First Physical Verification, QR Scan, Auto-Idle Identification & Reconciliation System
 */

import { storage } from '../db/storage.js';
import { TABLE_NAMES } from '../db/schema.js';
import { authService } from '../services/authService.js';
import { masterDataService } from '../services/masterDataService.js';
import { relocateService } from '../services/relocateService.js';
import { notificationService } from '../services/notificationService.js';
import { renderQrScannerModal, initQrScannerModalEvents } from './qrScannerModal.js?v=4.6.7';
import { state } from '../state.js';

let activeTab = 'scan'; // 'scan' | 'idle' | 'approvals' | 'history'
let pendingScanMachine = null; // Machine object pending confirmation in modal
let manualSearchModalOpen = false;
let completeModalOpen = false;
let editingScanItem = null; // Item being edited in modal
let scannedListSearch = ''; // Search query on scanned machines
let scannedListFilter = 'ALL'; // 'ALL' | 'CORRECT' | 'LINE_MISMATCH' | 'FLOOR_MISMATCH'
let kpisCollapsedOnMobile = (typeof window !== 'undefined' && window.innerWidth <= 768); // Default to compact on mobile to maximize card feed area

export function renderRelocateView() {
  const activeSession = relocateService.getActiveSession();
  const pendingApprovals = relocateService.getPendingApprovals();
  const idleMachines = relocateService.getIdleMachines();
  const allSessions = relocateService.getAllSessions();

  return `
    <div class="page-view relocate-view-root" id="relocate-page-root">
      
      <!-- Top Title & Navigation Bar -->
      <div class="relocate-top-nav-card">
        <div class="relocate-title-area">
          <div class="relocate-title-icon">
            📍
          </div>
          <div class="relocate-title-text-group">
            <h1 class="relocate-main-title">
              Machine Relocate &amp; Verification
            </h1>
            <div class="relocate-sub-title">
              QR Scan &bull; Auto-Idle Detection &bull; Location Reconciliation
            </div>
          </div>
        </div>

        <!-- Horizontal Swipeable Pill Tabs -->
        <div class="relocate-tabs-bar">
          <button type="button" class="btn-relocate-tab ${activeTab === 'scan' ? 'active' : ''}" data-tab="scan">
            📷 ${activeSession ? 'Active Scan' : 'New Session'}
          </button>
          <button type="button" class="btn-relocate-tab ${activeTab === 'idle' ? 'active' : ''}" data-tab="idle">
            💤 Idle <span class="relocate-tab-badge badge-idle">${idleMachines.length}</span>
          </button>
          <button type="button" class="btn-relocate-tab ${activeTab === 'approvals' ? 'active' : ''}" data-tab="approvals">
            ⏳ Approvals <span class="relocate-tab-badge ${pendingApprovals.length > 0 ? 'badge-alert' : 'badge-idle'}">${pendingApprovals.length}</span>
          </button>
          <button type="button" class="btn-relocate-tab ${activeTab === 'history' ? 'active' : ''}" data-tab="history">
            📜 History
          </button>
          <button type="button" id="btn-relocate-goto-qr-codes" class="btn-relocate-tab" style="margin-left: auto; border: 1.5px solid #38bdf8; color: #38bdf8; background: rgba(56, 189, 248, 0.12); font-weight: 800;" title="Open QR Code & Label Studio">
            🏁 QR Code &amp; Label Studio
          </button>
        </div>
      </div>

      <!-- Tab Content Area -->
      <div id="relocate-tab-content-area" class="relocate-tab-content-area">
        ${renderActiveTabContent(activeSession, pendingApprovals, idleMachines, allSessions)}
      </div>

      <!-- Sticky Bottom Dock for Active Scanning on Mobile (Thumbs-First) -->
      ${activeSession && activeTab === 'scan' ? `
        <div class="relocate-mobile-action-dock">
          <button type="button" id="btn-dock-scan-qr" class="dock-btn-scan">
            <span class="dock-btn-icon">📷</span>
            <span class="dock-btn-label">Scan QR</span>
          </button>
          <button type="button" id="btn-dock-manual-search" class="dock-btn-search">
            <span class="dock-btn-icon">🔎</span>
            <span class="dock-btn-label">Search</span>
          </button>
          <button type="button" id="btn-dock-complete" class="dock-btn-complete" title="Complete &amp; Reconcile">
            <span class="dock-btn-icon">🏁</span>
            <span class="dock-btn-label">Finish</span>
          </button>
        </div>
      ` : ''}

      <!-- Dynamic Modals Container (Rendered as Bottom Sheets on Mobile) -->
      <div id="relocate-modal-container">
        ${renderConfirmationModal()}
        ${renderManualSearchModal()}
        ${renderReconciliationModal(activeSession)}
        ${renderEditScanModal(activeSession)}
      </div>

      <!-- Dedicated Scanner Modal Container (Prevents overwriting session modals) -->
      <div id="relocate-scanner-slot"></div>

    </div>

    <!-- Scoped Mobile Responsive Styles -->
    <style>
      .relocate-view-root {
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        height: 100%;
        overflow-y: auto;
        box-sizing: border-box;
        font-family: var(--font-main);
      }

      .relocate-top-nav-card {
        background: var(--bg-surface);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-md);
        padding: 12px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
      }

      .relocate-title-area {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .relocate-title-icon {
        font-size: 22px;
        background: rgba(56, 189, 248, 0.12);
        border: 1.5px solid #38bdf8;
        border-radius: 10px;
        width: 38px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .relocate-main-title {
        font-size: 16px;
        font-weight: 800;
        color: #fff;
        margin: 0;
        line-height: 1.2;
      }

      .relocate-sub-title {
        font-size: 11px;
        color: #38bdf8;
        margin-top: 2px;
      }

      .relocate-tabs-bar {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      .btn-relocate-tab {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: var(--text-secondary);
        font-weight: 700;
        font-size: 12px;
        padding: 7px 14px;
        border-radius: 20px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        transition: all 0.2s ease;
        white-space: nowrap;
      }

      .btn-relocate-tab:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
      }

      .btn-relocate-tab.active {
        background: #0284c7;
        border-color: #38bdf8;
        color: #fff;
        box-shadow: 0 2px 8px rgba(2, 132, 199, 0.4);
      }

      .relocate-tab-badge {
        font-size: 10px;
        font-weight: 800;
        padding: 2px 6px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.15);
      }

      .relocate-tab-badge.badge-alert {
        background: #ef4444;
        color: #fff;
      }

      .relocate-tab-content-area {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }

      /* Desktop & Base Grid */
      .relocate-kpi-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
      }

      .relocate-kpi-box {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-sm);
        padding: 10px 12px;
        text-align: center;
      }

      .relocate-kpi-val {
        font-size: 22px;
        font-weight: 900;
        margin-top: 2px;
      }

      /* Mobile Sticky Dock - Hidden on Desktop */
      .relocate-mobile-action-dock {
        display: none;
      }

      /* Bottom Sheet Modal Styles on Mobile */
      @media (max-width: 768px) {
        .relocate-view-root {
          padding: 8px 10px 145px 10px !important;
          height: auto !important;
          min-height: 100% !important;
          overflow-y: visible !important;
        }

        .relocate-desktop-actions {
          display: none !important;
        }

        .relocate-scanned-feed-wrap {
          min-height: auto !important;
          overflow: visible !important;
          margin-bottom: 24px !important;
        }

        .relocate-scanned-list {
          overflow-y: visible !important;
          max-height: none !important;
          padding: 8px 8px 145px 8px !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 10px !important;
        }

        .relocate-top-nav-card {
          padding: 10px 12px;
          flex-direction: column;
          align-items: stretch;
          gap: 10px;
        }

        .relocate-main-title {
          font-size: 15px;
        }

        .relocate-sub-title {
          font-size: 10.5px;
        }

        /* Swipeable horizontal tab bar */
        .relocate-tabs-bar {
          overflow-x: auto;
          flex-wrap: nowrap;
          white-space: nowrap;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 2px;
          width: 100%;
        }

        .relocate-tabs-bar::-webkit-scrollbar {
          display: none;
        }

        .btn-relocate-tab {
          flex-shrink: 0;
          padding: 6px 12px;
          font-size: 11.5px;
        }

        /* 2x2 grid for KPIs on mobile */
        .relocate-kpi-grid {
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .relocate-kpi-box {
          padding: 8px 10px;
        }

        .relocate-kpi-val {
          font-size: 20px;
        }

        /* Fixed Mobile Sticky Action Dock */
        .relocate-mobile-action-dock {
          display: flex;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          padding: 10px 14px max(10px, env(safe-area-inset-bottom, 10px));
          background: rgba(11, 17, 32, 0.96);
          backdrop-filter: blur(14px);
          border-top: 1.5px solid rgba(56, 189, 248, 0.4);
          box-shadow: 0 -8px 25px rgba(0, 0, 0, 0.75);
          gap: 8px;
          align-items: center;
        }

        .dock-btn-scan {
          flex: 2;
          min-height: 48px;
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          border: 1.5px solid #38bdf8;
          border-radius: 12px;
          color: #fff;
          font-weight: 800;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          box-shadow: 0 4px 14px rgba(2, 132, 199, 0.5);
          cursor: pointer;
        }

        .dock-btn-search {
          flex: 1;
          min-height: 48px;
          background: rgba(255, 255, 255, 0.08);
          border: 1.5px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: #e2e8f0;
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
        }

        .dock-btn-complete {
          width: 48px;
          min-width: 48px;
          min-height: 48px;
          background: rgba(5, 150, 105, 0.25);
          border: 1.5px solid #34d399;
          border-radius: 12px;
          color: #34d399;
          font-size: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .dock-btn-complete .dock-btn-label {
          font-size: 9px;
          font-weight: 800;
          margin-top: -2px;
        }

        /* Bottom Sheet for Modals */
        .modal-overlay {
          padding: 0 !important;
          align-items: flex-end !important;
          background: rgba(0, 0, 0, 0.8) !important;
        }

        .modal-dialog {
          max-width: 100% !important;
          width: 100% !important;
          max-height: 90vh !important;
          border-radius: 20px 20px 0 0 !important;
          margin: 0 !important;
          box-shadow: 0 -10px 35px rgba(0, 0, 0, 0.8) !important;
          border: 1px solid rgba(56, 189, 248, 0.4) !important;
          border-bottom: none !important;
          padding-bottom: max(16px, env(safe-area-inset-bottom, 16px)) !important;
        }

        .modal-body {
          padding: 14px 16px !important;
        }

        /* 16px font to stop iOS auto-zoom */
        .modal-dialog input,
        .modal-dialog select,
        .modal-dialog textarea,
        .form-control {
          font-size: 16px !important;
          min-height: 44px;
        }
      }
    </style>
  `;
}

function renderActiveTabContent(activeSession, pendingApprovals, idleMachines, allSessions) {
  switch (activeTab) {
    case 'scan':
      return activeSession ? renderLiveScanView(activeSession) : renderSessionSetupView();
    case 'idle':
      return renderIdleMachinesTab(idleMachines);
    case 'approvals':
      return renderApprovalsTab(pendingApprovals);
    case 'history':
      return renderHistoryTab(allSessions);
    default:
      return renderSessionSetupView();
  }
}

// ─────────────────────────────────────────────────────────────
// 1. SESSION SETUP VIEW (Before Scan Begins)
// ─────────────────────────────────────────────────────────────
function renderSessionSetupView() {
  const units = masterDataService.getUnits();
  const floors = [];
  const lines = [];

  return `
    <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px 20px; display: flex; flex-direction: column; gap: 14px; max-width: 680px; margin: 0 auto; width: 100%; box-sizing: border-box;">
      
      <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px;">
        <h2 style="font-size: 16px; font-weight: 800; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
          <span>📋</span> Start New Verification &amp; Relocation Session
        </h2>
        <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px; line-height: 1.4;">
          Select target Unit and Floor to start. The system takes an instant snapshot of all machines registered on this floor for physical verification and auto-idle classification.
        </p>
      </div>

      <form id="form-start-relocate-session" style="display: flex; flex-direction: column; gap: 14px;">
        
        <!-- Target Unit -->
        <div class="form-group">
          <label class="form-label" style="font-weight: 700; font-size: 12.5px; color: #38bdf8;">Factory Unit: <span class="req">*</span></label>
          <select id="relocate-sel-unit" class="form-control" required style="font-size: 15px; font-weight: 600;">
            <option value="" selected disabled>-- Select Factory Unit --</option>
            ${units.map(u => `<option value="${u.id}">${u.name}</option>`).join('')}
          </select>
        </div>

        <!-- Target Floor -->
        <div class="form-group">
          <label class="form-label" style="font-weight: 700; font-size: 12.5px; color: #38bdf8;">Production Floor: <span class="req">*</span></label>
          <select id="relocate-sel-floor" class="form-control" required style="font-size: 15px; font-weight: 700;">
            <option value="" selected disabled>-- Select Production Floor --</option>
            ${units.map(u => {
              const uFloors = masterDataService.getFloors(u.id);
              if (uFloors.length === 0) return '';
              return `<optgroup label="${u.name}">
                ${uFloors.map(f => `<option value="${f.id}" data-unit-id="${u.id}">${f.name} (${f.code || f.name})</option>`).join('')}
              </optgroup>`;
            }).join('')}
          </select>
        </div>

        <!-- Scan Entire Floor Toggle -->
        <div style="background: rgba(56, 189, 248, 0.08); border: 1.5px solid rgba(56, 189, 248, 0.25); border-radius: 10px; padding: 12px 14px;">
          <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; user-select: none;">
            <input type="checkbox" id="chk-scan-entire-floor" checked style="width: 20px; height: 20px; margin-top: 2px; accent-color: #38bdf8; flex-shrink: 0;" />
            <div>
              <strong style="color: #fff; font-size: 13.5px; display: block;">Scan Entire Floor (Recommended)</strong>
              <span style="font-size: 11.5px; color: #cbd5e1; line-height: 1.4; display: block; margin-top: 2px;">
                Audits all active lines on this floor simultaneously. Any machine not found in running lines will be identified as <strong>Idle</strong>.
              </span>
            </div>
          </label>
        </div>

        <!-- Specific Lines Selector -->
        <div id="relocate-lines-section" style="display: none; flex-direction: column; gap: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <label class="form-label" style="font-weight: 700; font-size: 12px; color: #cbd5e1; margin: 0;">Target Specific Lines:</label>
            <div style="display: flex; gap: 8px;">
              <button type="button" id="btn-lines-select-all" class="btn btn-ghost btn-sm" style="font-size: 11px; padding: 2px 8px; color: #38bdf8;">Select All</button>
              <button type="button" id="btn-lines-deselect-all" class="btn btn-ghost btn-sm" style="font-size: 11px; padding: 2px 8px; color: #94a3b8;">Deselect All</button>
            </div>
          </div>
          
          <div id="relocate-lines-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 8px; max-height: 180px; overflow-y: auto; padding: 6px; background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
            <div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 12px; padding: 12px; text-align: center;">
              Please select a Factory Unit and Production Floor to view available lines.
            </div>
          </div>
        </div>

        <!-- Notes / Purpose -->
        <div class="form-group">
          <label class="form-label" style="font-size: 12px; color: var(--text-muted);">Verification Purpose / Notes (Optional):</label>
          <input type="text" id="relocate-session-notes" class="form-control" placeholder="e.g. Weekly Line Physical Audit, Layout Rearrangement" />
        </div>

        <!-- Start Button -->
        <button type="submit" id="btn-start-relocate-session" class="btn btn-primary" style="font-weight: 800; font-size: 15px; padding: 14px 20px; min-height: 48px; margin-top: 6px; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); border: 1.5px solid #38bdf8; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4); border-radius: 10px;">
          🚀 Take Snapshot &amp; Start Physical Verification
        </button>

      </form>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// 2. LIVE SCAN VIEW (Active Session)
// ─────────────────────────────────────────────────────────────
function renderScannedItemsList(session) {
  if (!session || !session.scanned || session.scanned.length === 0) {
    return `
      <div style="text-align: center; padding: 36px 16px; color: var(--text-muted);">
        <div style="font-size: 38px; margin-bottom: 8px;">📦</div>
        <div style="font-weight: 800; font-size: 14px; color: #fff;">No machines scanned yet</div>
        <div style="font-size: 12px; margin-top: 4px; color: #94a3b8;">
          Tap <strong>Scan QR</strong> or <strong>Search</strong> to verify machines on this floor.
        </div>
      </div>
    `;
  }

  let filtered = session.scanned.slice().reverse();

  if (scannedListFilter && scannedListFilter !== 'ALL') {
    filtered = filtered.filter(s => s.matchType === scannedListFilter);
  }

  if (scannedListSearch && scannedListSearch.trim()) {
    const q = scannedListSearch.trim().toLowerCase();
    filtered = filtered.filter(s => 
      (s.serialNumber && s.serialNumber.toLowerCase().includes(q)) ||
      (s.machineNameStr && s.machineNameStr.toLowerCase().includes(q)) ||
      (s.brandStr && s.brandStr.toLowerCase().includes(q)) ||
      (s.modelStr && s.modelStr.toLowerCase().includes(q)) ||
      (s.scannedLineId && s.scannedLineId.toLowerCase().includes(q)) ||
      (s.remarks && s.remarks.toLowerCase().includes(q))
    );
  }

  if (filtered.length === 0) {
    return `
      <div style="text-align: center; padding: 30px 16px; color: var(--text-muted);">
        <div style="font-size: 28px; margin-bottom: 6px;">🔍</div>
        <div style="font-weight: 700; font-size: 13px; color: #cbd5e1;">No matching scanned machines</div>
        <div style="font-size: 11.5px; margin-top: 3px;">Try clearing your search query or filter pills.</div>
      </div>
    `;
  }

  return filtered.map((s, idx) => {
    const isVerified = s.matchType === 'CORRECT';
    const isLineMove = s.matchType === 'LINE_MISMATCH';
    const targetLine = masterDataService.getLineById(s.scannedLineId);
    const borderColor = isVerified ? 'rgba(52, 211, 153, 0.4)' : (isLineMove ? 'rgba(56, 189, 248, 0.4)' : 'rgba(251, 191, 36, 0.5)');
    const timeStr = s.scannedAt ? new Date(s.scannedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

    return `
      <div class="scanned-machine-card" data-scan-id="${s.scanId}" style="background: var(--bg-card); border: 1.5px solid ${borderColor}; border-radius: 10px; padding: 12px; display: flex; flex-direction: column; gap: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.25);">
        
        <!-- Header: Serial, Badge, Time -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
          <div style="min-width: 0; flex: 1;">
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
              <span style="font-family: var(--font-mono); font-size: 15px; font-weight: 900; color: #38bdf8; letter-spacing: 0.3px;">${s.serialNumber}</span>
              <span class="badge ${isVerified ? 'badge-active' : (isLineMove ? 'badge-idle' : 'badge-breakdown')}" style="font-size: 10.5px; font-weight: 800; padding: 2px 7px;">
                ${s.evalResult?.icon || '•'} ${s.evalResult?.label || s.matchType}
              </span>
            </div>
            <div style="font-size: 13px; font-weight: 700; color: #fff; margin-top: 3px; word-break: break-word;">${s.machineNameStr}</div>
            <div style="font-size: 11.5px; color: var(--text-secondary);">${s.brandStr || ''} &bull; ${s.modelStr || ''}</div>
          </div>
          
          <div style="text-align: right; flex-shrink: 0;">
            <span style="font-size: 11px; color: #64748b; font-family: var(--font-mono); display: block;">${timeStr}</span>
            <span style="font-size: 10px; color: #38bdf8; font-weight: 800;">#${session.scanned.length - idx}</span>
          </div>
        </div>

        <!-- Location Information -->
        <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 8px 10px; font-size: 12px; display: flex; flex-direction: column; gap: 4px;">
          <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
            <span style="color: #94a3b8; font-size: 11px;">Prev:</span>
            <span style="color: #cbd5e1; font-weight: 600;">${s.previousFloorStr} / ${s.previousLineStr}</span>
            <span style="color: #38bdf8; font-weight: 900;">➔</span>
            <span style="color: #94a3b8; font-size: 11px;">Scanned at:</span>
            <strong style="color: #34d399; font-weight: 800;">${targetLine?.name || s.scannedLineId}</strong>
          </div>
          ${s.needleQuantity ? `
            <div style="font-size: 11.5px; color: #e2e8f0; display: flex; align-items: center; gap: 6px;">
              <span>🪡 Needles: <strong style="color: #38bdf8;">${s.needleQuantity}</strong></span>
            </div>
          ` : ''}
          ${s.remarks ? `
            <div style="font-size: 11px; color: #94a3b8; font-style: italic;">
              💬 "${s.remarks}"
            </div>
          ` : ''}
        </div>

        <!-- Action Buttons: Edit & Delete (Large, touch-friendly) -->
        <div style="display: flex; justify-content: flex-end; align-items: center; gap: 8px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 6px;">
          <button type="button" class="btn btn-secondary btn-sm btn-edit-scan" data-scan-id="${s.scanId}" style="min-height: 38px; padding: 6px 14px; font-size: 12px; font-weight: 800; display: inline-flex; align-items: center; gap: 5px; color: #38bdf8; border-color: rgba(56,189,248,0.4);">
            ✏️ Edit
          </button>
          <button type="button" class="btn btn-ghost btn-sm btn-delete-scan" data-scan-id="${s.scanId}" data-serial="${s.serialNumber}" style="min-height: 38px; padding: 6px 14px; font-size: 12px; font-weight: 800; display: inline-flex; align-items: center; gap: 5px; color: #f87171; border: 1px solid rgba(239,68,68,0.3); background: rgba(239,68,68,0.08);">
            🗑️ Delete
          </button>
        </div>

      </div>
    `;
  }).join('');

  return cardsHtml + `
    <!-- Extra bottom clearance spacer so the last card is 100% visible above mobile fixed action dock -->
    <div style="height: 130px; width: 100%; flex-shrink: 0;" class="mobile-dock-spacer" aria-hidden="true"></div>
  `;
}

function renderLiveScanView(session) {
  const metrics = relocateService.getReconciliationMetrics(session);
  const unt = masterDataService.getUnitById(session.unitId);
  const flr = masterDataService.getFloorById(session.floorId);

  const totalCount = session.scanned.length;
  const verifiedCount = session.scanned.filter(s => s.matchType === 'CORRECT').length;
  const lineMoveCount = session.scanned.filter(s => s.matchType === 'LINE_MISMATCH').length;
  const floorMoveCount = session.scanned.filter(s => s.matchType === 'FLOOR_MISMATCH').length;

  return `
    <div style="display: flex; flex-direction: column; gap: 10px; flex: 1; min-height: 0;">
      
      <!-- Session Header & Quick Info -->
      <div style="background: var(--bg-card); border: 1.5px solid rgba(56, 189, 248, 0.35); border-radius: var(--radius-md); padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <span class="badge badge-active" style="font-size: 11px; padding: 4px 8px; font-weight: 800; display: inline-flex; align-items: center; gap: 4px;">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #34d399; box-shadow: 0 0 6px #34d399;"></span>
            LIVE
          </span>
          <span style="font-family: var(--font-mono); font-size: 13px; font-weight: 800; color: #38bdf8;">${session.id}</span>
          <span style="color: var(--text-muted); font-size: 12px;">&bull;</span>
          <span style="font-size: 12.5px; font-weight: 700; color: #fff;">${flr?.name || session.floorId} (${unt?.name || session.unitId})</span>
          <span style="font-size: 11px; color: #94a3b8;">(${session.isFullFloor ? 'Full Floor' : `${session.lineIds.length} Lines`})</span>
        </div>

        <div style="display: flex; gap: 8px; align-items: center;">
          <button type="button" id="btn-cancel-relocate-session" class="btn btn-ghost btn-sm" style="color: #f87171; font-size: 11.5px; border: 1px solid rgba(239, 68, 68, 0.3); padding: 6px 10px;">
            ✕ Cancel
          </button>
          <button type="button" id="btn-open-complete-modal" class="btn btn-primary btn-sm" style="font-weight: 800; font-size: 12px; background: #059669; border-color: #34d399; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.3); padding: 6px 12px;">
            🏁 Reconcile &amp; Finish
          </button>
        </div>
      </div>

      <!-- Mobile Quick Stats Accordion Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 2px 4px;">
        <span style="font-size: 12px; font-weight: 800; color: #cbd5e1; display: flex; align-items: center; gap: 6px;">
          📊 Session Statistics (${metrics.scannedTotal}/${metrics.expectedTotal})
        </span>
        <button type="button" id="btn-toggle-kpi-mobile" class="btn btn-ghost btn-sm" style="font-size: 11px; padding: 2px 8px; color: #38bdf8; font-weight: 700;">
          ${kpisCollapsedOnMobile ? '▼ Expand Counters' : '▲ Collapse Counters'}
        </button>
      </div>

      <!-- Live Counters Header (Compact 1-line strip when collapsed on mobile, full grid when expanded) -->
      ${kpisCollapsedOnMobile ? `
        <div class="relocate-kpi-compact-strip" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 8px 10px; text-align: center;">
          <div style="border-right: 1px solid rgba(255,255,255,0.08);">
            <div style="font-size: 9.5px; color: #94a3b8; text-transform: uppercase; font-weight: 700;">Target</div>
            <div style="font-size: 15px; font-weight: 900; color: #fff;">${metrics.expectedTotal}</div>
          </div>
          <div style="border-right: 1px solid rgba(255,255,255,0.08);">
            <div style="font-size: 9.5px; color: #34d399; text-transform: uppercase; font-weight: 700;">Verified</div>
            <div style="font-size: 15px; font-weight: 900; color: #34d399;">${metrics.scannedTotal}</div>
          </div>
          <div style="border-right: 1px solid rgba(255,255,255,0.08);">
            <div style="font-size: 9.5px; color: #38bdf8; text-transform: uppercase; font-weight: 700;">Idle</div>
            <div style="font-size: 15px; font-weight: 900; color: #38bdf8;">${metrics.idleCount}</div>
          </div>
          <div>
            <div style="font-size: 9.5px; color: #fbbf24; text-transform: uppercase; font-weight: 700;">Pending</div>
            <div style="font-size: 15px; font-weight: 900; color: #fbbf24;">${metrics.pendingRelocationCount}</div>
          </div>
        </div>
      ` : `
        <div id="relocate-kpi-container" style="display: flex; flex-direction: column; gap: 10px;">
          <div class="relocate-kpi-grid">
            <div class="relocate-kpi-box" style="border-left: 3px solid #94a3b8;">
              <div style="font-size: 10.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Expected Snapshot</div>
              <div class="relocate-kpi-val" style="color: #fff;">${metrics.expectedTotal}</div>
            </div>
            <div class="relocate-kpi-box" style="border-left: 3px solid #34d399; border-color: rgba(52, 211, 153, 0.3);">
              <div style="font-size: 10.5px; font-weight: 700; color: #34d399; text-transform: uppercase;">Scanned &amp; Verified</div>
              <div class="relocate-kpi-val" style="color: #34d399;">${metrics.scannedTotal}</div>
            </div>
            <div class="relocate-kpi-box" style="border-left: 3px solid #38bdf8; border-color: rgba(56, 189, 248, 0.3);">
              <div style="font-size: 10.5px; font-weight: 700; color: #38bdf8; text-transform: uppercase;">Idle (Unscanned)</div>
              <div class="relocate-kpi-val" style="color: #38bdf8;">${metrics.idleCount}</div>
            </div>
            <div class="relocate-kpi-box" style="border-left: 3px solid #fbbf24; border-color: rgba(251, 191, 36, 0.3);">
              <div style="font-size: 10.5px; font-weight: 700; color: #fbbf24; text-transform: uppercase;">Pending Relocate</div>
              <div class="relocate-kpi-val" style="color: #fbbf24;">${metrics.pendingRelocationCount}</div>
            </div>
          </div>

          <!-- Line Breakdown Progress Bars -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 8px 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 11px; font-weight: 700; color: #fff;">Line Scan Progress:</span>
              <span style="font-size: 10.5px; color: var(--text-muted);">${metrics.lineBreakdown.length} Lines Targeted</span>
            </div>
            <div style="display: flex; gap: 8px; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; padding-bottom: 2px;">
              ${metrics.lineBreakdown.map(lb => {
                const isFinished = lb.scanned >= lb.expected && lb.expected > 0;
                return `
                  <div style="flex-shrink: 0; min-width: 105px; background: rgba(0,0,0,0.25); border: 1px solid ${isFinished ? '#34d399' : 'rgba(255,255,255,0.08)'}; border-radius: 6px; padding: 4px 8px; font-size: 11px;">
                    <div style="display: flex; justify-content: space-between; font-weight: 700;">
                      <span style="color: ${isFinished ? '#34d399' : '#fff'};">${lb.lineName}</span>
                      <span style="color: ${isFinished ? '#34d399' : '#38bdf8'}; font-family: var(--font-mono); margin-left: 6px;">${lb.scanned} / ${lb.expected}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      `}

      <!-- Primary Action Buttons (Desktop inline controls, hidden on mobile in favor of bottom dock) -->
      <div class="relocate-desktop-actions" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <button type="button" id="btn-open-camera-scanner" class="btn btn-primary" style="font-size: 14px; font-weight: 800; padding: 12px 18px; display: flex; align-items: center; justify-content: center; gap: 8px; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); border: 1.5px solid #38bdf8; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.4);">
          <span style="font-size: 20px;">📷</span> Scan QR Code
        </button>
        <button type="button" id="btn-open-manual-search" class="btn btn-secondary" style="font-size: 14px; font-weight: 800; padding: 12px 18px; display: flex; align-items: center; justify-content: center; gap: 8px; border: 1.5px solid rgba(255,255,255,0.2);">
          <span style="font-size: 18px;">🔎</span> Manual Search
        </button>
      </div>

      <!-- Feed of Scanned Machines in Current Session -->
      <div class="relocate-scanned-feed-wrap" style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); display: flex; flex-direction: column; flex: 1;">
        
        <!-- Filter & Search Toolbar (Sticky, Mobile Optimized) -->
        <div style="padding: 10px 12px; background: rgba(15, 23, 42, 0.95); border-bottom: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 8px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 13px; font-weight: 800; color: #fff;">
                Scanned Machines
              </span>
              <span style="background: #0284c7; color: #fff; font-size: 11px; font-weight: 800; padding: 2px 7px; border-radius: 12px; font-family: var(--font-mono);">
                ${totalCount}
              </span>
            </div>

            <button type="button" id="btn-feed-quick-scan" class="btn btn-primary btn-sm" style="font-size: 11.5px; font-weight: 800; padding: 5px 10px; display: inline-flex; align-items: center; gap: 4px; background: #0284c7; border: 1px solid #38bdf8;">
              📷 Scan Next
            </button>
          </div>

          <!-- Realtime Search Input -->
          <div style="position: relative;">
            <input 
              type="text" 
              id="inp-scanned-filter-query" 
              class="form-control" 
              placeholder="🔍 Search scanned by serial, name, or line..." 
              value="${scannedListSearch}"
              style="padding: 8px 32px 8px 12px; font-size: 13px; min-height: 38px; border-radius: 8px; background: #090d16; border-color: rgba(56,189,248,0.3); color: #fff;"
            />
            ${scannedListSearch ? `
              <button type="button" id="btn-clear-scanned-filter" style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #94a3b8; font-size: 14px; cursor: pointer; padding: 4px;">✕</button>
            ` : ''}
          </div>

          <!-- Filter Pills -->
          <div style="display: flex; gap: 6px; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; padding-bottom: 2px;">
            <button type="button" class="btn-scan-filter-pill ${scannedListFilter === 'ALL' ? 'active' : ''}" data-filter="ALL" style="flex-shrink: 0; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 14px; border: 1px solid ${scannedListFilter === 'ALL' ? '#38bdf8' : 'rgba(255,255,255,0.15)'}; background: ${scannedListFilter === 'ALL' ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.04)'}; color: ${scannedListFilter === 'ALL' ? '#38bdf8' : '#cbd5e1'}; cursor: pointer;">
              All (${totalCount})
            </button>
            <button type="button" class="btn-scan-filter-pill ${scannedListFilter === 'CORRECT' ? 'active' : ''}" data-filter="CORRECT" style="flex-shrink: 0; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 14px; border: 1px solid ${scannedListFilter === 'CORRECT' ? '#34d399' : 'rgba(255,255,255,0.15)'}; background: ${scannedListFilter === 'CORRECT' ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.04)'}; color: ${scannedListFilter === 'CORRECT' ? '#34d399' : '#cbd5e1'}; cursor: pointer;">
              ✓ Verified (${verifiedCount})
            </button>
            <button type="button" class="btn-scan-filter-pill ${scannedListFilter === 'LINE_MISMATCH' ? 'active' : ''}" data-filter="LINE_MISMATCH" style="flex-shrink: 0; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 14px; border: 1px solid ${scannedListFilter === 'LINE_MISMATCH' ? '#38bdf8' : 'rgba(255,255,255,0.15)'}; background: ${scannedListFilter === 'LINE_MISMATCH' ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.04)'}; color: ${scannedListFilter === 'LINE_MISMATCH' ? '#38bdf8' : '#cbd5e1'}; cursor: pointer;">
              ⚠️ Line Move (${lineMoveCount})
            </button>
            ${floorMoveCount > 0 ? `
              <button type="button" class="btn-scan-filter-pill ${scannedListFilter === 'FLOOR_MISMATCH' ? 'active' : ''}" data-filter="FLOOR_MISMATCH" style="flex-shrink: 0; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 14px; border: 1px solid ${scannedListFilter === 'FLOOR_MISMATCH' ? '#fbbf24' : 'rgba(255,255,255,0.15)'}; background: ${scannedListFilter === 'FLOOR_MISMATCH' ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.04)'}; color: ${scannedListFilter === 'FLOOR_MISMATCH' ? '#fbbf24' : '#cbd5e1'}; cursor: pointer;">
                ⏳ Inter-Floor (${floorMoveCount})
              </button>
            ` : ''}
          </div>

        </div>

        <!-- Scanned Items List -->
        <div id="relocate-scanned-items-container" class="relocate-scanned-list">
          ${renderScannedItemsList(session)}
        </div>

      </div>

    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// 3. CONFIRMATION MODAL FOR SCANNED MACHINE (Mobile Bottom Sheet)
// ─────────────────────────────────────────────────────────────
function renderConfirmationModal() {
  if (!pendingScanMachine) return '';

  const session = relocateService.getActiveSession();
  if (!session) return '';

  const lines = masterDataService.getLines(session.floorId);
  const initialLineId = pendingScanMachine.lineId && lines.some(l => l.id === pendingScanMachine.lineId)
    ? pendingScanMachine.lineId
    : (lines[0]?.id || '');

  const evalResult = relocateService.evaluateLocation(session, pendingScanMachine, initialLineId);

  return `
    <div class="modal-overlay" id="modal-confirm-scan-overlay" style="z-index: 10040;">
      <div class="modal-dialog" style="max-width: 480px; width: 95%;">
        
        <!-- Drag Handle for Mobile Sheet Affordance -->
        <div style="width: 40px; height: 4px; background: rgba(255,255,255,0.25); border-radius: 2px; margin: 8px auto 0 auto;"></div>

        <div class="modal-header" style="padding: 10px 16px;">
          <div class="modal-title" style="display: flex; align-items: center; gap: 8px;">
            <span>📋 Confirm Machine Verification</span>
          </div>
          <button type="button" id="btn-close-confirm-modal" class="btn btn-ghost btn-sm" style="font-size: 16px; width: 36px; height: 36px; border-radius: 50%;">✕</button>
        </div>

        <form id="form-confirm-scan-machine" class="modal-body" style="display: flex; flex-direction: column; gap: 12px; padding: 14px 16px;">
          
          <!-- Machine Spec Summary Card -->
          <div style="background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 12px; display: flex; flex-direction: column; gap: 5px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 16px; font-family: var(--font-mono); font-weight: 900; color: #fff;">${pendingScanMachine.serialNumber}</span>
                <span style="font-size: 11px; font-family: var(--font-mono); font-weight: 800; background: rgba(56,189,248,0.15); border: 1px solid #38bdf8; border-radius: 4px; padding: 1px 6px; color: #38bdf8;" title="Permanent Unique Machine ID">
                  ${pendingScanMachine.permanentMachineId || pendingScanMachine.id}
                </span>
              </div>
              <span class="badge ${evalResult.badgeClass}" style="font-size: 11px;">${evalResult.icon} ${evalResult.label}</span>
            </div>
            <div style="font-size: 13.5px; font-weight: 700; color: #fff;">${pendingScanMachine.machineNameStr}</div>
            <div style="font-size: 12px; color: var(--text-secondary);">${pendingScanMachine.brandStr} &bull; ${pendingScanMachine.modelStr} &bull; Status: <strong style="color: #34d399;">${pendingScanMachine.status || 'ACTIVE'}</strong></div>
            <div style="font-size: 11.5px; color: var(--text-muted); border-top: 1px solid rgba(255,255,255,0.06); padding-top: 6px; margin-top: 4px; display: flex; justify-content: space-between;">
              <span>Registered Location: <strong style="color: #cbd5e1;">${pendingScanMachine.floorStr} / ${pendingScanMachine.lineStr}</strong></span>
              <span style="color: #38bdf8; font-weight: 700;">${pendingScanMachine.unitStr}</span>
            </div>
          </div>

          <!-- Physical Line Selection -->
          <div class="form-group">
            <label class="form-label" style="font-weight: 700; font-size: 12px; color: #38bdf8;">Physical Line Where Machine is Located: <span class="req">*</span></label>
            <select id="confirm-scanned-line" class="form-control" required style="font-weight: 700; font-size: 15px; min-height: 44px;">
              ${lines.map(l => `<option value="${l.id}" ${l.id === initialLineId ? 'selected' : ''}>${l.name}</option>`).join('')}
            </select>
          </div>

          <!-- Needle Quantity Field (Mandatory per spec) -->
          <div class="form-group">
            <label class="form-label" style="font-weight: 700; font-size: 12px; color: #38bdf8;">Needle Quantity: <span style="font-weight: normal; color: var(--text-muted);">(if applicable)</span></label>
            <input type="number" id="confirm-needle-quantity" class="form-control" placeholder="e.g. 1, 2, 4" min="0" value="${pendingScanMachine.needleQuantity || ''}" style="font-size: 16px; min-height: 44px;" />
          </div>

          <!-- Remarks -->
          <div class="form-group">
            <label class="form-label" style="font-size: 11.5px; color: var(--text-muted);">Verification Remarks (Optional):</label>
            <input type="text" id="confirm-scan-remarks" class="form-control" placeholder="e.g. In working condition, needle threader aligned" style="font-size: 15px;" />
          </div>

          <!-- Location Alert Notice -->
          <div id="confirm-location-alert" style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 6px; padding: 8px 12px; font-size: 11.5px; color: #cbd5e1; line-height: 1.4;">
            ${evalResult.description}
          </div>

          <!-- Bottom Action Buttons -->
          <div class="modal-footer" style="padding: 0; margin-top: 6px; display: flex; gap: 8px;">
            <button type="button" id="btn-cancel-confirm-scan" class="btn btn-secondary" style="flex: 1; min-height: 44px; font-weight: 700;">Cancel</button>
            <button type="submit" id="btn-submit-confirm-scan" class="btn btn-primary" style="flex: 2; min-height: 44px; font-weight: 800; font-size: 14px; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); border-color: #38bdf8;">
              ✓ Confirm &amp; Add Machine
            </button>
          </div>

        </form>

      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// 3b. EDIT SCANNED MACHINE MODAL (Mobile Bottom Sheet)
// ─────────────────────────────────────────────────────────────
function renderEditScanModal(session) {
  if (!editingScanItem || !session) return '';

  const lines = masterDataService.getLines(session.floorId);
  const currentTargetLineId = editingScanItem.scannedLineId || '';

  return `
    <div class="modal-overlay" id="modal-edit-scan-overlay" style="z-index: 10045;">
      <div class="modal-dialog" style="max-width: 480px; width: 95%;">
        
        <!-- Drag Handle for Mobile Sheet Affordance -->
        <div style="width: 40px; height: 4px; background: rgba(255,255,255,0.25); border-radius: 2px; margin: 8px auto 0 auto;"></div>

        <div class="modal-header" style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1);">
          <div class="modal-title" style="display: flex; align-items: center; gap: 8px;">
            <span>✏️ Edit Scanned Machine</span>
          </div>
          <button type="button" id="btn-close-edit-scan-modal" class="btn btn-ghost btn-sm" style="font-size: 16px; width: 36px; height: 36px; border-radius: 50%;">✕</button>
        </div>

        <form id="form-edit-scan-machine" class="modal-body" style="display: flex; flex-direction: column; gap: 12px; padding: 14px 16px;">
          
          <!-- Machine Header Info -->
          <div style="background: rgba(0,0,0,0.35); border: 1px solid rgba(56,189,248,0.25); border-radius: 10px; padding: 12px; display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-family: var(--font-mono); font-size: 16px; font-weight: 900; color: #38bdf8;">${editingScanItem.serialNumber}</span>
              <span class="badge ${editingScanItem.evalResult?.badgeClass || 'badge-idle'}" style="font-size: 10px;">${editingScanItem.evalResult?.label || editingScanItem.matchType}</span>
            </div>
            <div style="font-size: 13.5px; font-weight: 700; color: #fff;">${editingScanItem.machineNameStr}</div>
            <div style="font-size: 11.5px; color: var(--text-secondary);">${editingScanItem.brandStr || ''} &bull; ${editingScanItem.modelStr || ''}</div>
            <div style="font-size: 11px; color: var(--text-muted); border-top: 1px solid rgba(255,255,255,0.06); padding-top: 4px; margin-top: 2px;">
              Original Location: <strong style="color: #cbd5e1;">${editingScanItem.previousFloorStr} / ${editingScanItem.previousLineStr}</strong>
            </div>
          </div>

          <!-- Target Line Dropdown -->
          <div class="form-group">
            <label class="form-label" style="font-weight: 700; font-size: 12px; color: #38bdf8;">Assigned Physical Line: <span class="req">*</span></label>
            <select id="edit-scanned-line" class="form-control" required style="font-weight: 700; font-size: 15px; min-height: 44px;">
              ${lines.map(l => `<option value="${l.id}" ${l.id === currentTargetLineId ? 'selected' : ''}>${l.name}</option>`).join('')}
            </select>
          </div>

          <!-- Needle Quantity -->
          <div class="form-group">
            <label class="form-label" style="font-weight: 700; font-size: 12px; color: #38bdf8;">Needle Quantity:</label>
            <input type="number" id="edit-needle-quantity" class="form-control" min="0" value="${editingScanItem.needleQuantity || ''}" placeholder="e.g. 1, 2, 4" style="font-size: 16px; min-height: 44px;" />
          </div>

          <!-- Remarks -->
          <div class="form-group">
            <label class="form-label" style="font-size: 11.5px; color: var(--text-muted);">Remarks / Verification Notes:</label>
            <input type="text" id="edit-scan-remarks" class="form-control" value="${editingScanItem.remarks || ''}" placeholder="e.g. Needle threader aligned, Line re-allocated" style="font-size: 15px;" />
          </div>

          <!-- Footer Actions -->
          <div class="modal-footer" style="padding: 0; margin-top: 6px; display: flex; gap: 8px;">
            <button type="button" id="btn-cancel-edit-scan" class="btn btn-secondary" style="flex: 1; min-height: 44px; font-weight: 700;">Cancel</button>
            <button type="submit" id="btn-submit-edit-scan" class="btn btn-primary" style="flex: 2; min-height: 44px; font-weight: 800; font-size: 14px; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); border-color: #38bdf8;">
              💾 Save Changes
            </button>
          </div>

        </form>

      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// 4. MANUAL SEARCH MODAL (Mobile Bottom Sheet)
// ─────────────────────────────────────────────────────────────
function renderManualSearchModal() {
  if (!manualSearchModalOpen) return '';

  return `
    <div class="modal-overlay" id="modal-manual-search-overlay" style="z-index: 10030;">
      <div class="modal-dialog" style="max-width: 520px; width: 95%; max-height: 85vh; display: flex; flex-direction: column;">
        
        <div style="width: 40px; height: 4px; background: rgba(255,255,255,0.25); border-radius: 2px; margin: 8px auto 0 auto;"></div>

        <div class="modal-header" style="padding: 10px 16px;">
          <div class="modal-title" style="display: flex; align-items: center; gap: 8px;">
            <span>🔎 Manual Machine Search</span>
          </div>
          <button type="button" id="btn-close-manual-search-modal" class="btn btn-ghost btn-sm" style="font-size: 16px; width: 36px; height: 36px; border-radius: 50%;">✕</button>
        </div>

        <div class="modal-body" style="padding: 12px 16px; display: flex; flex-direction: column; gap: 10px; flex: 1; overflow-y: auto;">
          <div class="form-group">
            <input
              type="text"
              id="inp-manual-search-query"
              class="form-control"
              placeholder="Search Serial, Machine Name, Model (e.g. JA-01)..."
              autofocus
              style="font-size: 16px; min-height: 46px; padding: 10px 14px; font-weight: 700; color: #38bdf8;"
            />
          </div>

          <!-- Search Results List -->
          <div id="manual-search-results-list" style="display: flex; flex-direction: column; gap: 6px; min-height: 180px; max-height: 380px; overflow-y: auto;">
            <div style="text-align: center; padding: 30px 10px; color: var(--text-muted); font-size: 12px;">
              Type a Serial Number or Machine Name above to search inventory.
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// 5. RECONCILIATION & FINALIZATION MODAL (Mobile Bottom Sheet)
// ─────────────────────────────────────────────────────────────
function renderReconciliationModal(session) {
  if (!completeModalOpen || !session) return '';

  const metrics = relocateService.getReconciliationMetrics(session);

  return `
    <div class="modal-overlay" id="modal-reconciliation-overlay" style="z-index: 10060;">
      <div class="modal-dialog" style="max-width: 540px; width: 95%; max-height: 90vh; display: flex; flex-direction: column;">
        
        <div style="width: 40px; height: 4px; background: rgba(255,255,255,0.25); border-radius: 2px; margin: 8px auto 0 auto;"></div>

        <div class="modal-header" style="border-bottom: 1px solid rgba(255,255,255,0.1); padding: 10px 16px;">
          <div class="modal-title" style="display: flex; align-items: center; gap: 8px;">
            <span>🏁 Reconcile &amp; Complete Session</span>
          </div>
          <button type="button" id="btn-close-reconciliation-modal" class="btn btn-ghost btn-sm" style="font-size: 16px; width: 36px; height: 36px; border-radius: 50%;">✕</button>
        </div>

        <div class="modal-body" style="padding: 14px 16px; display: flex; flex-direction: column; gap: 12px; overflow-y: auto;">
          
          <div style="background: rgba(14, 165, 233, 0.08); border: 1px solid rgba(14, 165, 233, 0.25); border-radius: 8px; padding: 10px 12px; font-size: 12px; color: #e2e8f0; line-height: 1.4;">
            Completing this session updates physical locations and classifies unscanned machines on this floor as <strong>IDLE</strong>.
          </div>

          <!-- Summary Metric 2x2 Grid -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div style="background: rgba(255,255,255,0.04); border-radius: 6px; padding: 8px 10px; border-left: 3px solid #94a3b8;">
              <div style="font-size: 10.5px; color: var(--text-muted);">Snapshot Total</div>
              <div style="font-size: 18px; font-weight: 800; color: #fff;">${metrics.expectedTotal}</div>
            </div>
            <div style="background: rgba(255,255,255,0.04); border-radius: 6px; padding: 8px 10px; border-left: 3px solid #34d399;">
              <div style="font-size: 10.5px; color: #34d399;">Scanned &amp; Verified</div>
              <div style="font-size: 18px; font-weight: 800; color: #34d399;">${metrics.verifiedCount}</div>
            </div>
            <div style="background: rgba(255,255,255,0.04); border-radius: 6px; padding: 8px 10px; border-left: 3px solid #38bdf8;">
              <div style="font-size: 10.5px; color: #38bdf8;">Line Move (Same Floor)</div>
              <div style="font-size: 18px; font-weight: 800; color: #38bdf8;">${metrics.lineRelocationCount}</div>
            </div>
            <div style="background: rgba(255,255,255,0.04); border-radius: 6px; padding: 8px 10px; border-left: 3px solid #fbbf24;">
              <div style="font-size: 10.5px; color: #fbbf24;">Inter-Floor Approvals</div>
              <div style="font-size: 18px; font-weight: 800; color: #fbbf24;">${metrics.pendingRelocationCount}</div>
            </div>
          </div>

          <!-- Automated Idle Action Banner -->
          <div style="background: rgba(239, 68, 68, 0.08); border: 1.5px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 10px 12px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span style="font-size: 16px;">💤</span>
              <strong style="color: #f87171; font-size: 13px;">${metrics.idleCount} Machines Auto-Classified as IDLE</strong>
            </div>
            <div style="font-size: 11.5px; color: #cbd5e1; line-height: 1.4;">
              These ${metrics.idleCount} machines were registered on this floor but were not scanned in running lines. They will automatically be marked <strong>IDLE</strong>.
            </div>
          </div>

          <!-- Final Notes -->
          <div class="form-group">
            <label class="form-label" style="font-size: 11.5px; color: var(--text-muted);">Session Notes / Sign-off (Optional):</label>
            <input type="text" id="final-reconciliation-notes" class="form-control" placeholder="e.g. Audit verified by supervisor" style="font-size: 15px;" />
          </div>

          <div class="modal-footer" style="padding: 0; display: flex; gap: 8px; margin-top: 4px;">
            <button type="button" id="btn-cancel-reconciliation" class="btn btn-secondary" style="flex: 1; min-height: 44px; font-weight: 700;">Back</button>
            <button type="button" id="btn-confirm-complete-session" class="btn btn-primary" style="flex: 2; min-height: 44px; background: #059669; border-color: #34d399; font-weight: 800; font-size: 13.5px;">
              ✓ Finalize &amp; Reconcile
            </button>
          </div>

        </div>

      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// 6. IDLE MACHINES TAB
// ─────────────────────────────────────────────────────────────
function renderIdleMachinesTab(idleMachines) {
  return `
    <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 12px 16px; display: flex; flex-direction: column; gap: 10px; flex: 1; min-height: 0;">
      
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px;">
        <div>
          <h2 style="font-size: 15px; font-weight: 800; color: #fff; margin: 0;">
            💤 Factory Idle Machines (${idleMachines.length})
          </h2>
          <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">
            Machines on standby, awaiting line allocation, or unlocated in active lines
          </div>
        </div>
      </div>

      <div style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 6px;">
        ${idleMachines.length === 0 ? `
          <div style="text-align: center; padding: 40px; color: var(--text-muted);">
            No idle machines recorded in system.
          </div>
        ` : idleMachines.map(m => `
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <span style="font-family: var(--font-mono); font-weight: 800; color: #38bdf8; font-size: 13.5px;">${m.serialNumber}</span>
                <span style="font-size: 12.5px; font-weight: 700; color: #fff;">${m.machineNameStr}</span>
                <span style="font-size: 11px; color: var(--text-secondary);">${m.brandStr} / ${m.modelStr}</span>
              </div>
              <div style="font-size: 11px; color: var(--text-muted); margin-top: 3px; display: flex; gap: 10px; flex-wrap: wrap;">
                <span>Location: <strong style="color: #cbd5e1;">${m.floorStr} / ${m.lineStr}</strong></span>
                <span>Last Verified: <strong style="color: #38bdf8;">${m.lastVerifiedDate ? new Date(m.lastVerifiedDate).toLocaleDateString() : 'Never'}</strong></span>
                ${m.remarks ? `<span>Note: <em>${m.remarks}</em></span>` : ''}
              </div>
            </div>
            <div>
              <span class="badge badge-idle" style="font-size: 10.5px; font-weight: 800;">IDLE</span>
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// 7. PENDING APPROVALS TAB
// ─────────────────────────────────────────────────────────────
function renderApprovalsTab(pendingApprovals) {
  const isAdmin = authService.isAdmin() || authService.hasPermission('RELOCATE_APPROVE');

  return `
    <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 12px 16px; display: flex; flex-direction: column; gap: 10px; flex: 1; min-height: 0;">
      
      <div>
        <h2 style="font-size: 15px; font-weight: 800; color: #fff; margin: 0;">
          ⏳ Inter-Floor Relocation Approvals (${pendingApprovals.length})
        </h2>
        <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">
          Machines scanned on a different floor requiring management authorization
        </div>
      </div>

      <div style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;">
        ${pendingApprovals.length === 0 ? `
          <div style="text-align: center; padding: 40px; color: var(--text-muted);">
            No pending inter-floor relocation approvals.
          </div>
        ` : pendingApprovals.map(a => {
    const prevFlr = masterDataService.getFloorById(a.previousFloorId);
    const prevLin = masterDataService.getLineById(a.previousLineId);
    const destFlr = masterDataService.getFloorById(a.destFloorId);
    const destLin = masterDataService.getLineById(a.destLineId);

    return `
            <div style="background: var(--bg-surface); border: 1.5px solid rgba(251, 191, 36, 0.4); border-radius: 8px; padding: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
              <div style="flex: 1; min-width: 240px;">
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                  <span style="font-family: var(--font-mono); font-weight: 900; color: #38bdf8; font-size: 14px;">${a.serialNumber}</span>
                  <span style="font-size: 13px; font-weight: 700; color: #fff;">${a.machineNameStr}</span>
                  <span style="font-size: 11px; color: var(--text-secondary);">${a.brandStr} / ${a.modelStr}</span>
                </div>
                <div style="display: flex; gap: 8px; align-items: center; margin-top: 6px; font-size: 11.5px; flex-wrap: wrap;">
                  <span style="color: #f87171;">Previous: <strong>${prevFlr?.name || a.previousFloorId} / ${prevLin?.name || a.previousLineId}</strong></span>
                  <span>&rarr;</span>
                  <span style="color: #34d399;">Destination: <strong>${destFlr?.name || a.destFloorId} / ${destLin?.name || a.destLineId}</strong></span>
                </div>
                <div style="font-size: 10.5px; color: var(--text-muted); margin-top: 4px;">
                  Session: <strong>${a.sessionId}</strong> &bull; Requested by: <strong>${a.requestedBy}</strong> on ${new Date(a.requestedAt).toLocaleDateString()}
                </div>
              </div>

              ${isAdmin ? `
                <div style="display: flex; gap: 6px; width: 100%; justify-content: flex-end;">
                  <button type="button" class="btn btn-danger btn-sm btn-reject-relocation" data-id="${a.id}" style="min-height: 38px; font-size: 11.5px; padding: 6px 14px; flex: 1;">
                    ✕ Reject
                  </button>
                  <button type="button" class="btn btn-primary btn-sm btn-approve-relocation" data-id="${a.id}" style="min-height: 38px; font-size: 11.5px; padding: 6px 16px; background: #059669; border-color: #34d399; flex: 1;">
                    ✓ Approve Move
                  </button>
                </div>
              ` : `
                <span class="badge badge-idle">Pending Admin Review</span>
              `}
            </div>
          `;
  }).join('')}
      </div>

    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// 8. RELOCATION HISTORY TAB
// ─────────────────────────────────────────────────────────────
function renderHistoryTab(allSessions) {
  const historyList = relocateService.getRelocationHistory();

  return `
    <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 12px 16px; display: flex; flex-direction: column; gap: 10px; flex: 1; min-height: 0;">
      
      <div>
        <h2 style="font-size: 15px; font-weight: 800; color: #fff; margin: 0;">
          📜 Physical Verification &amp; Relocation Audit History
        </h2>
        <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">
          Chronological record of physical verification sessions and machine movements
        </div>
      </div>

      <!-- Past Sessions Summary -->
      <div style="display: flex; flex-direction: column; gap: 6px; max-height: 180px; overflow-y: auto;">
        <div style="font-size: 11.5px; font-weight: 700; color: #38bdf8;">Past Scan Sessions (${allSessions.length}):</div>
        ${allSessions.length === 0 ? `
          <div style="color: var(--text-muted); font-size: 11.5px;">No verification sessions completed yet.</div>
        ` : allSessions.map(s => {
    const flr = masterDataService.getFloorById(s.floorId);
    return `
            <div style="background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 8px 10px; font-size: 11.5px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="color: #38bdf8; font-family: var(--font-mono);">${s.id}</strong> &bull; Floor: <strong>${flr?.name || s.floorId}</strong> &bull; ${new Date(s.startedAt).toLocaleDateString()}
              </div>
              <div>
                <span class="badge ${s.status === 'COMPLETED' ? 'badge-active' : (s.status === 'IN_PROGRESS' ? 'badge-idle' : 'badge-danger')}" style="font-size: 10px;">
                  ${s.status}
                </span>
              </div>
            </div>
          `;
  }).join('')}
      </div>

      <!-- Machine Movement Audit Table (Responsive Scroll) -->
      <div style="flex: 1; overflow-y: auto; margin-top: 6px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 8px;">
        <div style="font-size: 11.5px; font-weight: 700; color: #fff; margin-bottom: 6px;">Machine Movement Log (${historyList.length}):</div>
        ${historyList.length === 0 ? `
          <div style="color: var(--text-muted); font-size: 11.5px; padding: 20px; text-align: center;">No individual machine relocation events logged yet.</div>
        ` : `
          <div style="overflow-x: auto; -webkit-overflow-scrolling: touch;">
            <table class="table" style="width: 100%; min-width: 540px; font-size: 11.5px;">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Serial</th>
                  <th>From Location</th>
                  <th>To Location</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Approved By</th>
                </tr>
              </thead>
              <tbody>
                ${historyList.map(h => {
    const prevFlr = masterDataService.getFloorById(h.previousFloorId);
    const prevLin = masterDataService.getLineById(h.previousLineId);
    const newFlr = masterDataService.getFloorById(h.newFloorId);
    const newLin = masterDataService.getLineById(h.newLineId);

    return `
                    <tr>
                      <td>${new Date(h.date).toLocaleDateString()}</td>
                      <td style="font-family: var(--font-mono); font-weight: 700; color: #38bdf8;">${h.serialNumber}</td>
                      <td>${prevFlr?.name || h.previousFloorId} / ${prevLin?.name || h.previousLineId}</td>
                      <td>${newFlr?.name || h.newFloorId} / ${newLin?.name || h.newLineId}</td>
                      <td>${h.approvalType}</td>
                      <td><span class="badge ${h.status === 'APPROVED' ? 'badge-active' : 'badge-danger'}" style="font-size: 10px;">${h.status}</span></td>
                      <td>${h.approvedBy}</td>
                    </tr>
                  `;
  }).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>

    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// EVENT HANDLERS & CONTROLLERS
// ─────────────────────────────────────────────────────────────
export function initRelocateViewEvents() {
  const root = document.getElementById('relocate-page-root');
  if (!root) return;

  const refreshView = () => {
    const container = document.getElementById('main-view-container');
    if (container) {
      container.innerHTML = renderRelocateView();
      initRelocateViewEvents();
    }
  };

  // 1. Tab Switching
  root.querySelectorAll('.btn-relocate-tab').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      pendingScanMachine = null;
      manualSearchModalOpen = false;
      completeModalOpen = false;
      activeTab = btn.getAttribute('data-tab');
      refreshView();
    });
  });

  // 2. Cascading Setup Unit -> Floor -> Lines
  const selUnit = root.querySelector('#relocate-sel-unit');
  const selFloor = root.querySelector('#relocate-sel-floor');
  const linesContainer = root.querySelector('#relocate-lines-container');
  const chkFullFloor = root.querySelector('#chk-scan-entire-floor');
  const linesSection = root.querySelector('#relocate-lines-section');

  if (chkFullFloor && linesSection) {
    chkFullFloor.addEventListener('change', () => {
      linesSection.style.display = chkFullFloor.checked ? 'none' : 'flex';
    });
  }

  const btnSelectAll = root.querySelector('#btn-lines-select-all');
  const btnDeselectAll = root.querySelector('#btn-lines-deselect-all');
  if (btnSelectAll && linesContainer) {
    btnSelectAll.addEventListener('click', () => {
      linesContainer.querySelectorAll('.relocate-line-check').forEach(c => c.checked = true);
    });
  }
  if (btnDeselectAll && linesContainer) {
    btnDeselectAll.addEventListener('click', () => {
      linesContainer.querySelectorAll('.relocate-line-check').forEach(c => c.checked = false);
    });
  }

  if (selUnit && selFloor) {
    selUnit.addEventListener('change', () => {
      const unitId = selUnit.value;
      if (!unitId) return;
      const floors = masterDataService.getFloors(unitId);
      selFloor.disabled = false;
      if (floors.length === 0) {
        selFloor.innerHTML = '<option value="" selected disabled>-- No Floors Registered For This Unit --</option>';
      } else {
        selFloor.innerHTML = '<option value="" selected disabled>-- Select Production Floor --</option>' +
          floors.map(f => `<option value="${f.id}" data-unit-id="${unitId}">${f.name}</option>`).join('');
      }
      selFloor.value = '';
      if (linesContainer) {
        linesContainer.innerHTML = '<div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 12px; padding: 12px; text-align: center;">Please select a Production Floor to view available lines.</div>';
      }
    });
  }

  if (selFloor) {
    selFloor.addEventListener('change', () => {
      const floorId = selFloor.value;
      const opt = selFloor.options[selFloor.selectedIndex];
      const optUnitId = opt?.getAttribute('data-unit-id');
      if (optUnitId && selUnit && selUnit.value !== optUnitId) {
        selUnit.value = optUnitId;
      }

      if (linesContainer) {
        if (!floorId) {
          linesContainer.innerHTML = '<div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 12px; padding: 12px; text-align: center;">Please select a Production Floor to view available lines.</div>';
          return;
        }
        const lines = masterDataService.getLines(floorId);
        if (lines.length === 0) {
          linesContainer.innerHTML = '<div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 12px; padding: 12px; text-align: center;">No production lines registered on this floor.</div>';
          return;
        }
        linesContainer.innerHTML = lines.map(l => `
          <label style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #cbd5e1; cursor: pointer; background: rgba(255,255,255,0.03); padding: 8px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
            <input type="checkbox" class="relocate-line-check" value="${l.id}" checked style="accent-color: #38bdf8; width: 16px; height: 16px;" />
            <span style="font-weight: 600;">${l.name}</span>
          </label>
        `).join('');
      }
    });
  }

  // 3. Start Session Submit
  const formStart = root.querySelector('#form-start-relocate-session');
  if (formStart) {
    formStart.addEventListener('submit', (e) => {
      e.preventDefault();
      const unitId = root.querySelector('#relocate-sel-unit')?.value;
      const floorId = root.querySelector('#relocate-sel-floor')?.value;
      const isFullFloor = root.querySelector('#chk-scan-entire-floor')?.checked;
      const lineChecks = root.querySelectorAll('.relocate-line-check:checked');
      const lineIds = Array.from(lineChecks).map(c => c.value);
      const notes = root.querySelector('#relocate-session-notes')?.value || '';

      if (!unitId) {
        notificationService.notifyWarning('Factory Unit Required', 'Please select a Factory Unit before starting the session.');
        root.querySelector('#relocate-sel-unit')?.focus();
        return;
      }

      if (!floorId) {
        notificationService.notifyWarning('Production Floor Required', 'Please select a Production Floor before starting the session.');
        root.querySelector('#relocate-sel-floor')?.focus();
        return;
      }

      if (!isFullFloor && lineIds.length === 0) {
        notificationService.notifyWarning('Line Selection Required', 'Please select at least one production line or check "Scan Entire Floor".');
        return;
      }

      try {
        relocateService.startSession({
          unitId,
          floorId,
          lineIds,
          isFullFloor,
          notes
        });
        activeTab = 'scan';
        refreshView();
      } catch (err) {
        notificationService.notifyError('Start Session Error', 'Error starting session: ' + err.message);
      }
    });
  }

  // 4. Cancel Session Button
  const btnCancelSession = root.querySelector('#btn-cancel-relocate-session');
  if (btnCancelSession) {
    btnCancelSession.addEventListener('click', () => {
      const active = relocateService.getActiveSession();
      if (!active) return;
      if (!confirm(`Cancel active physical scan session ${active.id}?`)) return;
      relocateService.cancelSession(active.id, 'User cancelled');
      refreshView();
    });
  }

  // Open Camera Scanner helper
  const openCameraScanner = () => {
    const slot = document.getElementById('relocate-scanner-slot') || document.getElementById('relocate-modal-container');
    if (slot) {
      slot.innerHTML = renderQrScannerModal();
      initQrScannerModalEvents({
        onScanSuccess: (decodedText) => {
          slot.innerHTML = '';
          handleMachineIdentified(decodedText);
        },
        onManualSearchRequest: () => {
          slot.innerHTML = '';
          manualSearchModalOpen = true;
          refreshView();
        },
        onClose: () => {
          slot.innerHTML = '';
        }
      });
    }
  };

  // 5. Camera Scanner Buttons (Inline + Sticky Mobile Dock + Setup Location Scan)
  const btnScanQr = root.querySelector('#btn-open-camera-scanner');
  const btnDockScanQr = root.querySelector('#btn-dock-scan-qr');
  const btnScanLocSetup = root.querySelector('#btn-scan-loc-setup');
  if (btnScanQr) btnScanQr.addEventListener('click', openCameraScanner);
  if (btnDockScanQr) btnDockScanQr.addEventListener('click', openCameraScanner);
  if (btnScanLocSetup) btnScanLocSetup.addEventListener('click', openCameraScanner);

  // 6. Manual Search Buttons (Inline + Sticky Mobile Dock)
  const openManualSearch = () => {
    manualSearchModalOpen = true;
    refreshView();
  };
  const btnManualSearch = root.querySelector('#btn-open-manual-search');
  const btnDockManualSearch = root.querySelector('#btn-dock-manual-search');
  if (btnManualSearch) btnManualSearch.addEventListener('click', openManualSearch);
  if (btnDockManualSearch) btnDockManualSearch.addEventListener('click', openManualSearch);

  // Handle Manual Search Input
  const manualSearchInput = root.querySelector('#inp-manual-search-query');
  const manualSearchResults = root.querySelector('#manual-search-results-list');
  const closeManualModalBtn = root.querySelector('#btn-close-manual-search-modal');

  if (closeManualModalBtn) {
    closeManualModalBtn.addEventListener('click', () => {
      manualSearchModalOpen = false;
      refreshView();
    });
  }

  const manualSearchOverlay = root.querySelector('#modal-manual-search-overlay');
  if (manualSearchOverlay) {
    manualSearchOverlay.addEventListener('click', (e) => {
      if (e.target === manualSearchOverlay) {
        manualSearchModalOpen = false;
        refreshView();
      }
    });
  }

  if (manualSearchInput && manualSearchResults) {
    manualSearchInput.addEventListener('input', () => {
      const q = manualSearchInput.value.trim().toLowerCase();
      if (!q) {
        manualSearchResults.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-muted);">Type to search machines.</div>';
        return;
      }

      const allMachines = storage.getTable(TABLE_NAMES.MACHINES) || [];
      const mnMap = new Map(storage.getTable(TABLE_NAMES.MACHINE_NAMES).map(x => [x.id, x.name]));
      const brdMap = new Map(storage.getTable(TABLE_NAMES.BRANDS).map(x => [x.id, x.name]));
      const mdlMap = new Map(storage.getTable(TABLE_NAMES.MODELS).map(x => [x.id, x.name]));
      const flrMap = new Map(storage.getTable(TABLE_NAMES.FLOORS).map(x => [x.id, x.name]));
      const linMap = new Map(storage.getTable(TABLE_NAMES.LINES).map(x => [x.id, x.name]));

      const matches = allMachines.filter(m => {
        if (!m) return false;
        const s = (m.serialNumber || '').toLowerCase();
        const permId = (m.permanentMachineId || '').toLowerCase();
        const mn = (mnMap.get(m.machineNameId) || '').toLowerCase();
        const mdl = (mdlMap.get(m.modelId) || '').toLowerCase();
        return s.includes(q) || permId.includes(q) || mn.includes(q) || mdl.includes(q);
      }).slice(0, 15);

      if (matches.length === 0) {
        manualSearchResults.innerHTML = '<div style="text-align: center; padding: 20px; color: #f87171;">No matching machines found.</div>';
        return;
      }

      manualSearchResults.innerHTML = matches.map(m => `
        <div class="manual-search-item" data-id="${m.id}" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px 12px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: all 0.2s ease;">
          <div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-family: var(--font-mono); font-weight: 800; color: #38bdf8; font-size: 13.5px;">${m.serialNumber}</span>
              ${m.permanentMachineId ? `<span style="font-size: 10px; font-family: var(--font-mono); background: rgba(56,189,248,0.15); color: #38bdf8; padding: 1px 4px; border-radius: 3px;">${m.permanentMachineId}</span>` : ''}
            </div>
            <div style="font-size: 12.5px; color: #fff; font-weight: 600;">${mnMap.get(m.machineNameId) || 'Machine'}</div>
            <div style="font-size: 11px; color: var(--text-muted);">${brdMap.get(m.brandId) || ''} &bull; ${mdlMap.get(m.modelId) || ''} &bull; Floor: ${flrMap.get(m.floorId) || ''} / ${linMap.get(m.lineId) || ''}</div>
          </div>
          <button type="button" class="btn btn-primary btn-sm" style="font-size: 11.5px; padding: 6px 12px; min-height: 36px;">Select &rarr;</button>
        </div>
      `).join('');

      manualSearchResults.querySelectorAll('.manual-search-item').forEach(item => {
        item.addEventListener('click', () => {
          const mId = item.getAttribute('data-id');
          manualSearchModalOpen = false;
          handleMachineIdentified(mId);
        });
      });
    });
  }

  // 7. Confirmation Modal Events
  const confirmCloseBtn = root.querySelector('#btn-close-confirm-modal');
  const confirmCancelBtn = root.querySelector('#btn-cancel-confirm-scan');
  const confirmOverlay = root.querySelector('#modal-confirm-scan-overlay');
  const confirmForm = root.querySelector('#form-confirm-scan-machine');
  const scannedLineSelect = root.querySelector('#confirm-scanned-line');

  const closeConfirmModal = () => {
    pendingScanMachine = null;
    refreshView();
  };

  if (confirmCloseBtn) confirmCloseBtn.addEventListener('click', closeConfirmModal);
  if (confirmCancelBtn) confirmCancelBtn.addEventListener('click', closeConfirmModal);
  if (confirmOverlay) {
    confirmOverlay.addEventListener('click', (e) => {
      if (e.target === confirmOverlay) {
        closeConfirmModal();
      }
    });
  }

  // Dynamic feedback when line selection changes in confirmation modal
  if (scannedLineSelect && pendingScanMachine) {
    scannedLineSelect.addEventListener('change', () => {
      const session = relocateService.getActiveSession();
      if (!session || !pendingScanMachine) return;
      const evalRes = relocateService.evaluateLocation(session, pendingScanMachine, scannedLineSelect.value);
      const alertEl = root.querySelector('#confirm-location-alert');
      if (alertEl) {
        alertEl.innerHTML = evalRes.description;
      }
    });
  }

  if (confirmForm) {
    confirmForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const session = relocateService.getActiveSession();
      if (!session || !pendingScanMachine) return;

      const currentMachine = pendingScanMachine;
      const scannedLineId = root.querySelector('#confirm-scanned-line')?.value;
      const needleQuantity = root.querySelector('#confirm-needle-quantity')?.value;
      const remarks = root.querySelector('#confirm-scan-remarks')?.value;

      try {
        const result = relocateService.recordScan(session.id, currentMachine.id, {
          scannedLineId,
          needleQuantity,
          remarks
        });

        // Clear pending machine and re-render the view so the newly added machine is immediately in the DOM
        pendingScanMachine = null;
        refreshView();

        if (result && result.duplicate) {
          notificationService.notifyWarning('Duplicate Scan', result.message);
        } else {
          notificationService.notifySuccess('Scan Recorded', `Machine [${currentMachine.serialNumber}] verified at line!`);
        }

        // Scroll the newly scanned machine card into view and highlight it with a glowing border
        setTimeout(() => {
          const scanId = result.scanRecord?.scanId;
          const newCard = scanId ? document.querySelector(`.scanned-machine-card[data-scan-id="${scanId}"]`) : null;
          if (newCard) {
            newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            newCard.style.outline = '2.5px solid #38bdf8';
            newCard.style.boxShadow = '0 0 24px rgba(56, 189, 248, 0.7)';
            setTimeout(() => {
              newCard.style.outline = '';
              newCard.style.boxShadow = '';
            }, 3000);
          }
        }, 120);

      } catch (err) {
        notificationService.notifyError('Scan Failed', 'Error recording scan: ' + (err.message || err));
      }
    });
  }

  // 7b. Edit Scanned Machine Modal Events
  const editCloseBtn = root.querySelector('#btn-close-edit-scan-modal');
  const editCancelBtn = root.querySelector('#btn-cancel-edit-scan');
  const editOverlay = root.querySelector('#modal-edit-scan-overlay');
  const editForm = root.querySelector('#form-edit-scan-machine');

  const closeEditModal = () => {
    editingScanItem = null;
    refreshView();
  };

  if (editCloseBtn) editCloseBtn.addEventListener('click', closeEditModal);
  if (editCancelBtn) editCancelBtn.addEventListener('click', closeEditModal);
  if (editOverlay) {
    editOverlay.addEventListener('click', (e) => {
      if (e.target === editOverlay) closeEditModal();
    });
  }

  if (editForm) {
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const session = relocateService.getActiveSession();
      if (!session || !editingScanItem) return;

      const scannedLineId = root.querySelector('#edit-scanned-line')?.value;
      const needleQuantity = root.querySelector('#edit-needle-quantity')?.value;
      const remarks = root.querySelector('#edit-scan-remarks')?.value;

      try {
        const result = relocateService.updateScan(session.id, editingScanItem.scanId, {
          scannedLineId,
          needleQuantity,
          remarks
        });

        const sn = result.updatedScan.serialNumber;
        editingScanItem = null;
        notificationService.notifySuccess('Scan Updated', `Updated verification details for [${sn}].`);
        refreshView();
      } catch (err) {
        notificationService.notifyError('Update Failed', 'Error updating scan: ' + (err.message || err));
      }
    });
  }

  // Helper to bind Edit & Delete action buttons on each scanned machine card
  const attachCardActionListeners = () => {
    root.querySelectorAll('.btn-edit-scan').forEach(btn => {
      btn.addEventListener('click', () => {
        const scanId = btn.getAttribute('data-scan-id');
        const session = relocateService.getActiveSession();
        if (!session) return;
        const item = session.scanned.find(s => s.scanId === scanId);
        if (item) {
          editingScanItem = item;
          refreshView();
        }
      });
    });

    root.querySelectorAll('.btn-delete-scan').forEach(btn => {
      btn.addEventListener('click', () => {
        const scanId = btn.getAttribute('data-scan-id');
        const serial = btn.getAttribute('data-serial');
        const session = relocateService.getActiveSession();
        if (!session) return;

        const confirmed = confirm(`Are you sure you want to remove machine [${serial}] from this session?\nIt will be restored to unscanned / idle status.`);
        if (!confirmed) return;

        try {
          relocateService.removeScan(session.id, scanId);
          notificationService.notifyWarning('Scan Removed', `Machine [${serial}] removed from session.`);
          refreshView();
        } catch (err) {
          notificationService.notifyError('Remove Failed', 'Error removing scan: ' + (err.message || err));
        }
      });
    });
  };

  attachCardActionListeners();

  // 7c. Scanned Feed Live Filter & Search Events
  const inpScannedFilter = root.querySelector('#inp-scanned-filter-query');
  if (inpScannedFilter) {
    inpScannedFilter.addEventListener('input', (e) => {
      scannedListSearch = e.target.value;
      const container = root.querySelector('#relocate-scanned-items-container');
      const session = relocateService.getActiveSession();
      if (container && session) {
        container.innerHTML = renderScannedItemsList(session);
        attachCardActionListeners();
      }
    });
  }

  const btnClearFilter = root.querySelector('#btn-clear-scanned-filter');
  if (btnClearFilter) {
    btnClearFilter.addEventListener('click', () => {
      scannedListSearch = '';
      refreshView();
    });
  }

  root.querySelectorAll('.btn-scan-filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      scannedListFilter = btn.getAttribute('data-filter') || 'ALL';
      refreshView();
    });
  });

  const btnFeedQuickScan = root.querySelector('#btn-feed-quick-scan');
  if (btnFeedQuickScan) {
    btnFeedQuickScan.addEventListener('click', openCameraScanner);
  }

  const btnToggleKpiMobile = root.querySelector('#btn-toggle-kpi-mobile');
  if (btnToggleKpiMobile) {
    btnToggleKpiMobile.addEventListener('click', () => {
      kpisCollapsedOnMobile = !kpisCollapsedOnMobile;
      refreshView();
    });
  }

  // 8. Open Complete Scan Modal (Header + Sticky Mobile Dock)
  const openCompleteModal = () => {
    completeModalOpen = true;
    refreshView();
  };
  const btnOpenComplete = root.querySelector('#btn-open-complete-modal');
  const btnDockComplete = root.querySelector('#btn-dock-complete');
  if (btnOpenComplete) btnOpenComplete.addEventListener('click', openCompleteModal);
  if (btnDockComplete) btnDockComplete.addEventListener('click', openCompleteModal);

  const btnCloseComplete = root.querySelector('#btn-close-reconciliation-modal');
  const btnCancelComplete = root.querySelector('#btn-cancel-reconciliation');
  const btnConfirmComplete = root.querySelector('#btn-confirm-complete-session');
  const reconOverlay = root.querySelector('#modal-reconciliation-overlay');

  const closeCompleteModal = () => {
    completeModalOpen = false;
    refreshView();
  };

  if (btnCloseComplete) btnCloseComplete.addEventListener('click', closeCompleteModal);
  if (btnCancelComplete) btnCancelComplete.addEventListener('click', closeCompleteModal);
  if (reconOverlay) {
    reconOverlay.addEventListener('click', (e) => {
      if (e.target === reconOverlay) {
        closeCompleteModal();
      }
    });
  }

  if (btnConfirmComplete) {
    btnConfirmComplete.addEventListener('click', () => {
      const active = relocateService.getActiveSession();
      if (!active) return;
      const notes = root.querySelector('#final-reconciliation-notes')?.value || '';

      try {
        relocateService.completeSession(active.id, notes);
        completeModalOpen = false;
        activeTab = 'history';
        notificationService.notifySuccess('Verification Finalized', `Session ${active.id} reconciled successfully!`);
        refreshView();
      } catch (err) {
        notificationService.notifyError('Completion Error', 'Error completing session: ' + err.message);
      }
    });
  }

  // 9. Relocation Approval / Reject Buttons
  root.querySelectorAll('.btn-approve-relocation').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      try {
        relocateService.approveRelocation(id);
        notificationService.notifySuccess('Relocation Approved', 'Machine inventory location updated!');
        refreshView();
      } catch (err) {
        notificationService.notifyError('Approval Failed', 'Error approving relocation: ' + err.message);
      }
    });
  });

  root.querySelectorAll('.btn-reject-relocation').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const reason = prompt('Please enter rejection reason:', 'Physical move not approved');
      if (!reason) return;
      try {
        relocateService.rejectRelocation(id, reason);
        notificationService.notifyWarning('Relocation Rejected', 'Machine location kept at original.');
        refreshView();
      } catch (err) {
        notificationService.notifyError('Rejection Failed', 'Error rejecting relocation: ' + err.message);
      }
    });
  });

  // Direct Shortcut to QR Code & Label Studio
  const btnGotoQr = root.querySelector('#btn-relocate-goto-qr-codes');
  if (btnGotoQr) {
    btnGotoQr.addEventListener('click', (e) => {
      e.preventDefault();
      state.set('currentView', 'qr-codes');
      if (typeof window.app !== 'undefined' && typeof window.app.switchView === 'function') {
        window.app.switchView('qr-codes');
      }
    });
  }

  // Helper when QR is scanned or search item selected
  function handleMachineIdentified(identifier) {
    const session = relocateService.getActiveSession();

    // 1. Check if scanned code is a Location QR (Unit + Floor)
    const locResult = relocateService.parseLocationQr(identifier);
    if (locResult.isLocationQr) {
      if (!session) {
        // Setup view: auto-select Unit and Floor!
        const selUnit = root.querySelector('#relocate-sel-unit');
        const selFloor = root.querySelector('#relocate-sel-floor');
        if (selUnit) {
          selUnit.value = locResult.unitId;
          const floors = masterDataService.getFloors(locResult.unitId);
          if (selFloor) {
            selFloor.innerHTML = floors.map(f => `<option value="${f.id}" ${f.id === locResult.floorId ? 'selected' : ''}>${f.name}</option>`).join('');
            selFloor.value = locResult.floorId;
            selFloor.dispatchEvent(new Event('change'));
          }
        }
        notificationService.notifySuccess('Location Detected', `Auto-selected ${locResult.locationTag} (${locResult.unitName} - ${locResult.floorName})!`);
        return;
      } else {
        // Active session: check if checkpoint matches session floor
        if (session.floorId === locResult.floorId) {
          notificationService.notifySuccess('Location Checkpoint Verified', `Scanned ${locResult.locationTag} for active session.`);
        } else {
          notificationService.notifyError('Location Mismatch', `Scanned ${locResult.locationTag} (${locResult.floorName}), but active session is on floor ${session.floorId}.`);
        }
        return;
      }
    }

    // 2. Machine QR / Identifier Scan
    if (!session) {
      const peekMachine = relocateService.lookupMachine(identifier);
      if (peekMachine) {
        notificationService.notifyInfo('Machine Identified', `[${peekMachine.serialNumber} - ${peekMachine.machineNameStr}] registered at ${peekMachine.floorStr} / ${peekMachine.lineStr}. Please start session first.`);
      } else {
        notificationService.notifyWarning('Session Required', 'Please start a verification session or scan a Location QR before scanning machines.');
      }
      return;
    }

    const machine = relocateService.lookupMachine(identifier);
    if (!machine) {
      notificationService.notifyError('Not Found', `Machine not found for identifier: "${identifier}". Please verify Serial Number or QR tag.`);
      return;
    }

    // Check duplicate
    const isAlreadyScanned = session.scanned.some(s => s.machineId === machine.id);
    if (isAlreadyScanned) {
      notificationService.notifyWarning('Already Scanned', `Machine [${machine.serialNumber}] was already recorded in this session.`);
      return;
    }

    // Open confirmation modal
    pendingScanMachine = machine;
    refreshView();
  }
}
