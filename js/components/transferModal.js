/**
 * Al-Muslim Group Garments Factory Maintenance Machine ERP
 * Machine Transfer Request Creation Modal Component
 * 
 * Flow:
 * 1. User enters Machine Serial Number (e.g. JA-01)
 * 2. System automatically loads all machine details (Name, Type, Brand, Model, Current Location [Locked], Status, History, Specs)
 * 3. User selects New Location / Floor from dropdown
 * 4. User uploads Supporting Document (PDF, JPG, PNG, Excel) with preview & remove/replace
 * 5. Submit Transfer Request (Status: Pending) -> Admin Review -> Approve / Reject
 */

import { storage } from '../db/storage.js';
import { TABLE_NAMES } from '../db/schema.js';
import { machineService } from '../services/machineService.js';
import { masterDataService } from '../services/masterDataService.js';
import { workflowService } from '../services/workflowService.js';
import { transferService } from '../services/transferService.js';
import { historyService } from '../services/historyService.js';
import { authService } from '../services/authService.js';
import { notificationService } from '../services/notificationService.js';
import { state } from '../state.js';

let attachedDocuments = [];
let serialSearchQuery = '';

export function renderTransferModal() {
  let activeMachineId = state.get('activeMachineId');
  const allMachines = storage.getTable(TABLE_NAMES.MACHINES) || [];

  const machine = activeMachineId ? machineService.getEnrichedMachine(activeMachineId) : null;
  const groups = masterDataService.getGroups();
  const defaultGroupId = machine?.groupId || groups[0]?.id || 'grp-1';
  const units = masterDataService.getUnits(defaultGroupId);
  const defaultUnitId = machine?.unitId || units[0]?.id;
  const floors = masterDataService.getFloors(defaultUnitId);
  const defaultFloorId = machine?.floorId || floors[0]?.id;
  const lines = masterDataService.getLines(defaultFloorId);

  // Machine Lifetime History count for verification card
  const historyRecords = machine?.serialNumber ? historyService.getMachineHistory(machine.serialNumber) : [];
  const locationChangesCount = historyRecords.filter(h => h.actionType === 'TRANSFER_MACHINE' || h.type === 'LOCATION_CHANGE').length;
  const servicesCount = historyRecords.filter(h => h.type === 'SERVICE_REPAIR' || h.actionType === 'SERVICE').length;
  const sparePartsCount = historyRecords.filter(h => h.type === 'SPARE_PART_REPLACEMENT').length;

  const currentGroupName = machine?.group?.name || groups.find(g => g.id === machine?.groupId)?.name || '';
  const currentPath = machine ? `${currentGroupName ? currentGroupName + ' > ' : ''}${machine.unit?.name || 'Unit'} > ${machine.floor?.name || 'Floor'} > ${machine.line?.name || 'Line'}` : 'Not Selected';
  const currentFloorName = machine?.floor?.name || 'Current Floor';

  return `
    <div class="modal-overlay" id="modal-transfer-overlay">
      <div class="modal-dialog modal-dialog-lg" style="max-width: 880px; max-height: 90vh; display: flex; flex-direction: column; min-height: 0;">
        
        <!-- Modal Header -->
        <div class="modal-header" style="background: var(--bg-card); border-bottom: 1px solid var(--border-color); padding: 16px 22px;">
          <div class="modal-title" style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 20px;">🔄</span>
            <div>
              <div style="font-size: 16px; font-weight: 800; color: #fff;">Initiate Machine Transfer Request</div>
              <div style="font-size: 11px; color: #38bdf8; font-weight: 600;">Zero-Manual-Entry &bull; Auto-Filled Machine Passport &bull; Management Approval Routing</div>
            </div>
          </div>
          <button id="btn-close-transfer-modal" class="btn btn-ghost btn-sm" style="font-size: 18px;">✕</button>
        </div>

        <form id="form-transfer-request" class="modal-body" style="padding: 20px 24px; display: flex; flex-direction: column; gap: 18px; overflow-y: auto; flex: 1; min-height: 0;">
          
          <!-- STEP 1: SEARCH MACHINE SERIAL NUMBER -->
          <div style="background: var(--bg-surface); border: 1.5px solid var(--primary); border-radius: var(--radius-lg); padding: 16px 18px; box-shadow: 0 4px 20px rgba(0,0,0,0.25);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <div style="font-size: 12.5px; font-weight: 800; color: #38bdf8; text-transform: uppercase; display: flex; align-items: center; gap: 6px;">
                <span>🔍 1. Search Machine by Serial Number Only</span>
              </div>
              ${machine ? '<span class="badge badge-active" style="font-size: 10.5px;">Machine Loaded</span>' : '<span class="badge" style="background: rgba(148, 163, 184, 0.2); color: #94a3b8; font-size: 10.5px;">Awaiting Input</span>'}
            </div>

            <!-- Serial Search Input & Dropdown -->
            <div style="position: relative;">
              <div style="display: flex; gap: 10px;">
                <div style="position: relative; flex: 1;">
                  <input 
                    type="text" 
                    id="inp-transfer-search-serial" 
                    class="form-control" 
                    placeholder="Enter or search Machine Serial Number (e.g. 5369, 76, JK-01)..." 
                    value="${machine?.serialNumber || ''}" 
                    style="font-size: 14px; font-weight: 700; color: #fff; background: rgba(0,0,0,0.4); border: 1px solid rgba(56, 189, 248, 0.5); padding-left: 36px; padding-right: ${machine ? '75px' : '12px'};"
                    autocomplete="off"
                  />
                  <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 16px; opacity: 0.6;">🧵</span>
                  ${machine ? `
                    <button type="button" id="btn-clear-transfer-machine" title="Clear and search another machine" style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.35); color: #f87171; font-size: 11px; cursor: pointer; padding: 3px 8px; border-radius: 4px; font-weight: 700;">✕ Clear</button>
                  ` : ''}
                </div>
                <button type="button" id="btn-search-serial-trigger" class="btn btn-primary" style="font-weight: 700;">
                  Find Machine
                </button>
              </div>

              <!-- Floating Serial Suggestions Dropdown -->
              <div id="transfer-serial-suggestions" style="display: none; position: absolute; left: 0; right: 0; top: 100%; z-index: 1000; background: #0f172a; border: 1px solid #38bdf8; border-radius: var(--radius-md); max-height: 220px; overflow-y: auto; box-shadow: 0 10px 30px rgba(0,0,0,0.7); margin-top: 4px;"></div>
            </div>

            <!-- AUTO-LOADED MACHINE DETAILS CARD (User verifies, does not manually type) -->
            ${machine ? `
              <div style="margin-top: 14px; background: rgba(2, 132, 199, 0.08); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: var(--radius-md); padding: 14px 16px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
                  <div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="font-size: 15px; font-weight: 800; color: #fff;">${machine.machineName?.name || 'Sewing Machine'}</span>
                      <span class="badge" style="background: rgba(2, 132, 199, 0.3); color: #38bdf8; font-family: var(--font-mono); font-weight: 800; font-size: 12px; border: 1px solid rgba(56, 189, 248, 0.4);">
                        ${machine.serialNumber}
                      </span>
                      <span class="badge ${machine.status === 'ACTIVE' ? 'badge-active' : 'badge-idle'}" style="font-size: 10px;">
                        ${machine.status}
                      </span>
                    </div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
                      <strong>Brand &amp; Model:</strong> ${machine.brand?.name || '—'} &bull; ${machine.model?.name || '—'} | 
                      <strong>Type:</strong> ${machine.machineName?.categoryName || 'Standard Machine'}
                    </div>
                  </div>

                  <!-- Lock Current Location Tag -->
                  <div style="text-align: right;">
                    <div style="font-size: 10px; font-weight: 700; color: #fbbf24; text-transform: uppercase;">
                      🔒 Current Location (Locked &bull; Read Only)
                    </div>
                    <div style="font-size: 13.5px; font-weight: 800; color: #fff; margin-top: 2px;">
                      ${currentPath}
                    </div>
                  </div>
                </div>

                <!-- Specs & History Verification Strip -->
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 11px;">
                  <div>
                    <span style="color: var(--text-muted);">Asset Tag:</span> <strong style="color: #fff;">${machine.customFields?.assetTag || machine.id}</strong>
                  </div>
                  <div>
                    <span style="color: var(--text-muted);">Motor / Voltage:</span> <strong style="color: #fff;">${machine.customFields?.motorType || 'Servo 220V'}</strong>
                  </div>
                  <div>
                    <span style="color: var(--text-muted);">Past Transfers:</span> <strong style="color: #38bdf8;">${locationChangesCount} recorded</strong>
                  </div>
                  <div>
                    <span style="color: var(--text-muted);">Service / Repairs:</span> <strong style="color: #34d399;">${servicesCount + sparePartsCount} events</strong>
                  </div>
                </div>
              </div>
            ` : `
              <div style="margin-top: 14px; background: rgba(15, 23, 42, 0.45); border: 1.5px dashed rgba(56, 189, 248, 0.25); border-radius: var(--radius-md); padding: 18px 20px; text-align: center;">
                <div style="font-size: 26px; margin-bottom: 4px; opacity: 0.85;">🔍</div>
                <div style="font-size: 13.5px; font-weight: 700; color: #f8fafc;">Awaiting Machine Serial Input</div>
                <div style="font-size: 11.5px; color: var(--text-secondary); margin-top: 4px; max-width: 480px; margin-left: auto; margin-right: auto; line-height: 1.5;">
                  Please enter or search a Machine Serial Number above (e.g. <strong>5369</strong>, <strong>76</strong>) or click <strong>Find Machine</strong> to load passport and current location.
                </div>
              </div>
            `}
          </div>

          <!-- STEP 2: SELECT NEW LOCATION / FLOOR (GROUP -> UNIT -> FLOOR -> LINE) -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 16px 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <div style="font-size: 12.5px; font-weight: 800; color: #34d399; text-transform: uppercase; display: flex; align-items: center; gap: 6px;">
                <span>📍 2. Select Requested New Location (Group &rarr; Unit &rarr; Floor &rarr; Line)</span>
              </div>
              <span class="badge badge-active" style="font-size: 10px;">4-Tier Plant Hierarchy</span>
            </div>

            <!-- Route Visualizer Banner -->
            <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 10px 14px; margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between; gap: 10px;">
              <div style="flex: 1;">
                <div style="font-size: 10px; color: #f87171; font-weight: 700; text-transform: uppercase;">Current Location</div>
                <div style="font-size: 12.5px; font-weight: 800; color: #fff; line-height: 1.4;">${machine ? currentPath : '<span style="color: #94a3b8; font-style: italic; font-weight: 500;">(Awaiting Machine Serial Input)</span>'}</div>
              </div>
              <div style="font-size: 20px; color: #38bdf8; font-weight: 800;">➔</div>
              <div style="flex: 1; text-align: right;">
                <div style="font-size: 10px; color: #34d399; font-weight: 700; text-transform: uppercase;">Transfer To (Destination Path)</div>
                <div id="transfer-target-path-preview" style="font-size: 12.5px; font-weight: 800; color: #34d399; line-height: 1.4;">Select Destination Below</div>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label" style="font-size: 12px; font-weight: 700; color: #fff;">1. Destination Group <span class="req">*</span></label>
                <select id="transfer-dest-group" class="filter-select" required>
                  ${groups.map(g => `<option value="${g.id}" ${defaultGroupId === g.id ? 'selected' : ''}>${g.name}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" style="font-size: 12px; font-weight: 700; color: #fff;">2. Destination Factory / Unit <span class="req">*</span></label>
                <select id="transfer-dest-unit" class="filter-select" required>
                  ${units.map(u => `<option value="${u.id}" ${defaultUnitId === u.id ? 'selected' : ''}>${u.name}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" style="font-size: 12px; font-weight: 700; color: #fff;">3. Destination Floor <span class="req">*</span></label>
                <select id="transfer-dest-floor" class="filter-select" required>
                  ${floors.map(f => `<option value="${f.id}" ${defaultFloorId === f.id ? 'selected' : ''}>${f.name}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" style="font-size: 12px; font-weight: 700; color: #fff;">4. Destination Production Line <span class="req">*</span></label>
                <select id="transfer-dest-line" class="filter-select" required>
                  ${lines.map(l => `<option value="${l.id}">${l.name}</option>`).join('')}
                </select>
              </div>

              <div class="form-group full-width">
                <label class="form-label" style="font-size: 12px; font-weight: 700; color: #fff;">Transfer Reason / Order Reference <span class="req">*</span></label>
                <input type="text" id="transfer-reason" class="form-control" placeholder="e.g. Line re-balancing for jacket production order" required />
              </div>

              <div class="form-group full-width">
                <label class="form-label" style="font-size: 12px; font-weight: 700; color: #fff;">Remarks / Setup Instructions (Optional)</label>
                <textarea id="transfer-remarks" class="form-control" rows="2" placeholder="e.g. Requires 380V heavy line setup, attachment folder pre-installed"></textarea>
              </div>
            </div>
          </div>

          <!-- STEP 3: UPLOAD SUPPORTING DOCUMENT (PDF, JPG, PNG, EXCEL) -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 16px 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <div>
                <div style="font-size: 12.5px; font-weight: 800; color: #fbbf24; text-transform: uppercase; display: flex; align-items: center; gap: 6px;">
                  <span>📎 3. Upload Supporting / Transfer Document</span>
                </div>
                <div style="font-size: 11.5px; color: var(--text-secondary); margin-top: 2px;">
                  Attach transfer sanction, management approval letter, or gate pass request.
                </div>
              </div>
              <span class="badge" style="background: rgba(251, 191, 36, 0.15); color: #fbbf24; font-size: 10.5px;">
                PDF &bull; JPG &bull; PNG &bull; EXCEL
              </span>
            </div>

            <!-- Upload Drop Zone -->
            <div id="transfer-doc-dropzone" style="border: 2px dashed #38bdf8; border-radius: var(--radius-md); padding: 20px; text-align: center; background: rgba(56, 189, 248, 0.04); cursor: pointer; transition: all 0.2s;">
              <div style="font-size: 30px; margin-bottom: 4px;">📂</div>
              <div style="font-size: 13px; font-weight: 700; color: #fff;">
                Click or Drag &amp; Drop to Upload Supporting Document
              </div>
              <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">
                Supported formats: <strong>PDF (.pdf)</strong>, <strong>Images (.jpg, .jpeg, .png)</strong>, <strong>Excel (.xlsx, .xls)</strong>
              </div>
              <input type="file" id="inp-transfer-document" accept=".pdf,.png,.jpg,.jpeg,.xlsx,.xls" multiple style="display: none;" />
            </div>

            <!-- Uploaded Files Preview & Replace Card -->
            <div id="transfer-attached-docs-list" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
              ${renderAttachedDocsHtml()}
            </div>
          </div>
        </form>

        <!-- Modal Footer -->
        <div class="modal-footer" style="background: var(--bg-card); border-top: 1px solid var(--border-color); padding: 14px 22px; display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 11.5px; color: var(--text-muted);">
            Requester: <strong style="color: #38bdf8;">${authService.getCurrentUser()?.name || 'User'}</strong> &bull; Status will be: <strong style="color: #fbbf24;">Pending Admin Approval</strong>
          </div>
          <div style="display: flex; gap: 10px;">
            <button type="button" id="btn-cancel-transfer" class="btn btn-secondary">Cancel</button>
            <button type="submit" form="form-transfer-request" id="btn-submit-transfer-request" class="btn btn-primary" style="font-weight: 800; padding: 8px 20px;">
              🚀 Submit Transfer Request
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAttachedDocsHtml() {
  if (attachedDocuments.length === 0) {
    return `
      <div style="font-size: 11.5px; color: var(--text-muted); font-style: italic; text-align: center; padding: 6px;">
        No supporting documents uploaded yet. (You may upload permission letters or transfer approvals).
      </div>
    `;
  }

  return attachedDocuments.map((doc, idx) => {
    let icon = '📄';
    if (doc.type?.includes('image') || doc.name?.match(/\.(jpg|jpeg|png)$/i)) icon = '🖼️';
    else if (doc.name?.match(/\.(xlsx|xls)$/i)) icon = '📊';

    return `
      <div style="background: var(--bg-surface); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: var(--radius-md); padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 20px;">${icon}</span>
          <div>
            <div style="font-size: 12.5px; font-weight: 700; color: #fff;">${doc.name}</div>
            <div style="font-size: 11px; color: var(--text-secondary); margin-top: 1px;">
              Size: ${doc.size} &bull; Ready for submission
            </div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <button type="button" class="btn btn-ghost btn-sm btn-replace-doc" data-idx="${idx}" title="Replace this document" style="font-size: 11.5px; color: #38bdf8;">
            🔄 Replace
          </button>
          <button type="button" class="btn btn-ghost btn-sm btn-remove-doc" data-idx="${idx}" title="Remove document" style="color: #f87171; font-size: 14px;">
            🗑️
          </button>
        </div>
      </div>
    `;
  }).join('');
}

export function initTransferModalEvents() {
  const overlay = document.getElementById('modal-transfer-overlay');
  const closeBtn = document.getElementById('btn-close-transfer-modal');
  const cancelBtn = document.getElementById('btn-cancel-transfer');

  const closeModal = () => {
    attachedDocuments = [];
    state.set('activeMachineId', null);
    state.set('activeModal', null);
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  // Live Serial Number Search & Autocomplete
  const inpSerial = document.getElementById('inp-transfer-search-serial');
  const btnFindSerial = document.getElementById('btn-search-serial-trigger');
  const btnClearSerial = document.getElementById('btn-clear-transfer-machine');
  const suggestionsBox = document.getElementById('transfer-serial-suggestions');
  const allMachines = storage.getTable(TABLE_NAMES.MACHINES) || [];

  const updateSelectedMachine = (foundMachine) => {
    if (foundMachine) {
      state.set('activeMachineId', foundMachine.id);
    } else {
      state.set('activeMachineId', null);
    }
    // Re-render modal with auto-loaded machine details
    const modalLayer = document.getElementById('modal-layer');
    if (modalLayer) {
      modalLayer.innerHTML = renderTransferModal();
      initTransferModalEvents();
      const updatedInp = document.getElementById('inp-transfer-search-serial');
      if (updatedInp) {
        if (!foundMachine) {
          updatedInp.focus({ preventScroll: true });
        }
      }
    }
  };

  if (btnClearSerial) {
    btnClearSerial.addEventListener('click', (e) => {
      e.stopPropagation();
      updateSelectedMachine(null);
    });
  }

  const performSearch = (rawVal) => {
    const q = (rawVal || '').trim().toLowerCase();
    if (!q) {
      notificationService.warning('Please enter a Machine Serial Number first.');
      if (inpSerial) inpSerial.focus({ preventScroll: true });
      return;
    }

    const exactMatch = allMachines.find(m => 
      (m.serialNumber && m.serialNumber.toString().toLowerCase() === q) ||
      (m.permanentMachineId && m.permanentMachineId.toLowerCase() === q) ||
      (m.id && m.id.toLowerCase() === q)
    );

    if (exactMatch) {
      if (suggestionsBox) suggestionsBox.style.display = 'none';
      updateSelectedMachine(exactMatch);
      notificationService.success(`Machine ${exactMatch.serialNumber} loaded successfully.`);
      return;
    }

    const partialMatch = allMachines.find(m => 
      (m.serialNumber && m.serialNumber.toString().toLowerCase().includes(q)) ||
      (m.permanentMachineId && m.permanentMachineId.toLowerCase().includes(q))
    );

    if (partialMatch) {
      if (suggestionsBox) suggestionsBox.style.display = 'none';
      updateSelectedMachine(partialMatch);
      notificationService.success(`Machine ${partialMatch.serialNumber} loaded successfully.`);
      return;
    }

    notificationService.warning(`Machine with serial number "${rawVal}" not found.`);
  };

  if (inpSerial) {
    if (!state.get('activeMachineId')) {
      // Only autofocus on desktop — on mobile this triggers keyboard-slam jitter
      if (window.innerWidth > 768) {
        setTimeout(() => inpSerial.focus({ preventScroll: true }), 50);
      }
    }

    if (suggestionsBox) {
      inpSerial.addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        if (!q) {
          suggestionsBox.style.display = 'none';
          return;
        }

        const matches = allMachines.filter(m => 
          (m.serialNumber && m.serialNumber.toString().toLowerCase().includes(q)) ||
          (m.id && m.id.toLowerCase().includes(q)) ||
          (m.permanentMachineId && m.permanentMachineId.toLowerCase().includes(q))
        ).slice(0, 8);

        if (matches.length === 0) {
          suggestionsBox.innerHTML = `
            <div style="padding: 10px 14px; font-size: 12px; color: var(--text-muted); text-align: center;">
              No machines matching serial '${e.target.value}'.
            </div>
          `;
          suggestionsBox.style.display = 'block';
          return;
        }

        suggestionsBox.innerHTML = matches.map(m => {
          const enriched = machineService.getEnrichedMachine(m.id);
          const loc = enriched?.floor?.name || m.floor || 'Floor';
          return `
            <div class="serial-suggest-item" data-id="${m.id}" style="padding: 8px 14px; border-bottom: 1px solid rgba(255,255,255,0.06); cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: background 0.15s;">
              <div>
                <div style="font-weight: 800; color: #38bdf8; font-size: 13px; font-family: monospace;">${m.serialNumber}</div>
                <div style="font-size: 11px; color: var(--text-secondary);">${enriched?.machineName?.name || m.lineName || 'Machine'} (${enriched?.brand?.name || ''})</div>
              </div>
              <span class="badge" style="background: rgba(255,255,255,0.08); font-size: 10.5px;">📍 ${loc}</span>
            </div>
          `;
        }).join('');

        suggestionsBox.style.display = 'block';

        suggestionsBox.querySelectorAll('.serial-suggest-item').forEach(el => {
          el.addEventListener('click', () => {
            const id = el.getAttribute('data-id');
            const m = allMachines.find(x => x.id === id);
            if (m) {
              suggestionsBox.style.display = 'none';
              updateSelectedMachine(m);
            }
          });
          el.addEventListener('mouseenter', () => {
            el.style.background = 'rgba(2, 132, 199, 0.25)';
          });
          el.addEventListener('mouseleave', () => {
            el.style.background = 'transparent';
          });
        });
      });
    }

    if (btnFindSerial) {
      btnFindSerial.addEventListener('click', () => {
        performSearch(inpSerial.value);
      });
    }

    inpSerial.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch(inpSerial.value);
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('#inp-transfer-search-serial') && !e.target.closest('#transfer-serial-suggestions')) {
        if (suggestionsBox) suggestionsBox.style.display = 'none';
      }
    });
  }

  // 4-Tier Cascading Location Change Handlers (Group -> Unit -> Floor -> Line)
  const groupSelect = document.getElementById('transfer-dest-group');
  const unitSelect = document.getElementById('transfer-dest-unit');
  const floorSelect = document.getElementById('transfer-dest-floor');
  const lineSelect = document.getElementById('transfer-dest-line');
  const targetPathPreview = document.getElementById('transfer-target-path-preview');

  const updateTargetPathPreview = () => {
    if (targetPathPreview) {
      const gName = groupSelect && groupSelect.selectedIndex >= 0 ? groupSelect.options[groupSelect.selectedIndex]?.text : '';
      const uName = unitSelect && unitSelect.selectedIndex >= 0 ? unitSelect.options[unitSelect.selectedIndex]?.text : '';
      const fName = floorSelect && floorSelect.selectedIndex >= 0 ? floorSelect.options[floorSelect.selectedIndex]?.text : '';
      const lName = lineSelect && lineSelect.selectedIndex >= 0 ? lineSelect.options[lineSelect.selectedIndex]?.text : '';
      const path = [gName, uName, fName, lName].filter(Boolean).join(' > ');
      targetPathPreview.innerText = path || 'Select Destination Location';
    }
  };

  if (groupSelect && unitSelect) {
    groupSelect.addEventListener('change', () => {
      const units = masterDataService.getUnits(groupSelect.value);
      if (units.length > 0) {
        unitSelect.innerHTML = units.map(u => `<option value="${u.id}">${u.name}</option>`).join('');
      } else {
        unitSelect.innerHTML = '<option value="">No units under this group</option>';
      }
      unitSelect.dispatchEvent(new Event('change'));
    });
  }

  if (unitSelect && floorSelect) {
    unitSelect.addEventListener('change', () => {
      const floors = masterDataService.getFloors(unitSelect.value);
      if (floors.length > 0) {
        floorSelect.innerHTML = floors.map(f => `<option value="${f.id}">${f.name}</option>`).join('');
      } else {
        floorSelect.innerHTML = '<option value="">No floors under this unit</option>';
      }
      floorSelect.dispatchEvent(new Event('change'));
    });
  }

  if (floorSelect && lineSelect) {
    floorSelect.addEventListener('change', () => {
      const lines = masterDataService.getLines(floorSelect.value);
      if (lines.length > 0) {
        lineSelect.innerHTML = lines.map(l => `<option value="${l.id}">${l.name}</option>`).join('');
      } else {
        lineSelect.innerHTML = '<option value="">No lines under this floor</option>';
      }
      updateTargetPathPreview();
    });
  }

  if (lineSelect) {
    lineSelect.addEventListener('change', () => {
      updateTargetPathPreview();
    });
  }

  updateTargetPathPreview();

  // Document Upload Dropzone & FileReader
  const dropzone = document.getElementById('transfer-doc-dropzone');
  const fileInput = document.getElementById('inp-transfer-document');
  const docsList = document.getElementById('transfer-attached-docs-list');

  const refreshDocsUI = () => {
    if (docsList) {
      docsList.innerHTML = renderAttachedDocsHtml();
      bindDocActionButtons();
    }
  };

  const handleFiles = (files) => {
    Array.from(files).forEach(f => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        attachedDocuments.push({
          name: f.name,
          size: `${Math.round(f.size / 1024)} KB`,
          type: f.type || 'application/octet-stream',
          dataUrl: ev.target.result,
          uploadedAt: new Date().toISOString()
        });
        refreshDocsUI();
      };
      reader.readAsDataURL(f);
    });
  };

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      handleFiles(e.target.files);
    });

    // Drag & Drop
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.background = 'rgba(56, 189, 248, 0.15)';
    });
    dropzone.addEventListener('dragleave', () => {
      dropzone.style.background = 'rgba(56, 189, 248, 0.04)';
    });
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.background = 'rgba(56, 189, 248, 0.04)';
      if (e.dataTransfer.files?.length) {
        handleFiles(e.dataTransfer.files);
      }
    });
  }

  const bindDocActionButtons = () => {
    document.querySelectorAll('.btn-remove-doc').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = Number(btn.getAttribute('data-idx'));
        attachedDocuments.splice(idx, 1);
        refreshDocsUI();
      });
    });

    document.querySelectorAll('.btn-replace-doc').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = Number(btn.getAttribute('data-idx'));
        attachedDocuments.splice(idx, 1);
        if (fileInput) fileInput.click();
      });
    });
  };

  bindDocActionButtons();

  // Submit Request Form — Async, confirmed cloud write before closing modal
  const form = document.getElementById('form-transfer-request');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

      // 1. Disable button + show saving spinner (prevents double-submit)
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:6px;"><span style="display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin 0.7s linear infinite;"></span>Submitting to Cloud...</span>';
      }

      let machineId = state.get('activeMachineId');
      const allM = storage.getTable(TABLE_NAMES.MACHINES) || [];

      if (!machineId) {
        const inpS = document.getElementById('inp-transfer-search-serial')?.value.trim().toLowerCase();
        if (inpS) {
          const matched = allM.find(m =>
            (m.serialNumber && m.serialNumber.toString().toLowerCase() === inpS) ||
            (m.permanentMachineId && m.permanentMachineId.toLowerCase() === inpS) ||
            (m.id && m.id.toLowerCase() === inpS)
          );
          if (matched) machineId = matched.id;
        }
      }

      if (!machineId) {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalBtnText; }
        notificationService.warning('Please enter or select a valid Machine Serial Number first.');
        const inpS = document.getElementById('inp-transfer-search-serial');
        if (inpS) inpS.focus({ preventScroll: true });
        return;
      }

      const destGroupId = groupSelect?.value || 'grp-1';
      const destUnitId = unitSelect?.value;
      const destFloorId = floorSelect?.value;
      const destLineId = lineSelect?.value;
      const reason = document.getElementById('transfer-reason')?.value?.trim() || 'Production Line Rebalancing';
      const remarks = document.getElementById('transfer-remarks')?.value?.trim() || '';

      if (!destGroupId || !destUnitId || !destFloorId || !destLineId) {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalBtnText; }
        notificationService.warning('Please select the Target Destination Factory/Unit, Floor, and Production Line.');
        return;
      }

      try {
        // 2. Await confirmed cloud write (throws CloudSaveError if Firestore write fails)
        const createdRequest = await transferService.createTransferRequest({
          machineId,
          destGroupId,
          destUnitId,
          destFloorId,
          destLineId,
          reason,
          remarks,
          documents: attachedDocuments
        });

        // 3. Only close modal and update UI AFTER cloud confirmation
        notificationService.success(`✅ Transfer Request #${createdRequest.requestNumber} submitted and saved to cloud.`, 'Transfer Request Created');
        attachedDocuments = [];
        closeModal();
        state.emit('inventory:updated');

      } catch (err) {
        // 4. Keep modal open on failure — re-enable button, show error
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }

        if (err.name === 'CloudSaveError') {
          notificationService.error(err.message || '❌ Cloud Save Failed: Transfer request was not saved to the cloud.');
        } else {
          notificationService.error('Transfer Request Error: ' + err.message);
        }
      }
    });
  }
}
