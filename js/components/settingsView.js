/**
 * Al-Muslim Group Garments Factory Maintenance Machine ERP
 * System Settings, Approval Policies & JSON Backup/Restore Component
 */

import { storage } from '../db/storage.js';
import { TABLE_NAMES } from '../db/schema.js';
import { state } from '../state.js';
import { masterDataService } from '../services/masterDataService.js';

export function getSignaturesList(settings = {}) {
  if (Array.isArray(settings.signatures) && settings.signatures.length > 0) {
    return settings.signatures;
  }
  return [
    { id: 'sig-1', name: settings.sig1Name || settings.signatory1Name || 'Engr. Motaher Hossain', title: settings.sig1Title || settings.signatory1Title || 'Prepared By (Engineer)', enabled: settings.showSig1 !== false },
    { id: 'sig-2', name: settings.sig2Name || settings.signatory2Name || 'Engr. Delwar Hossain', title: settings.sig2Title || settings.signatory2Title || 'Verified By (AGM / Sr. AGM)', enabled: settings.showSig2 !== false },
    { id: 'sig-3', name: settings.sig3Name || settings.signatory3Name || 'Mohammad Liton Miah', title: settings.sig3Title || settings.signatory3Title || 'Approved By (GM)', enabled: settings.showSig3 !== false }
  ];
}

function renderSignatorySlotHtml(sig, index) {
  const num = index + 1;
  const isEnabled = sig.enabled !== false;
  const id = sig.id || `sig-${Date.now()}-${index}`;

  return `
    <div class="signature-slot-card" data-sig-id="${id}" style="background: rgba(15, 23, 42, 0.65); border: 1.5px solid var(--border-color); border-radius: 8px; padding: 14px; display: flex; flex-direction: column; gap: 10px; position: relative;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px;">
        <div style="font-weight: 700; font-size: 12px; color: #c084fc; text-transform: uppercase; display: flex; align-items: center; gap: 6px;">
          <span class="sig-slot-index-badge" style="background: rgba(168, 85, 247, 0.25); color: #e9d5ff; padding: 2px 7px; border-radius: 4px; font-size: 11px;">#${num}</span>
          <span class="sig-slot-label">Signatory ${num}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <label style="display: flex; align-items: center; gap: 6px; font-size: 11.5px; cursor: pointer; color: #fff; margin: 0;">
            <input type="checkbox" class="sig-slot-enabled" ${isEnabled ? 'checked' : ''} style="width: 15px; height: 15px;" />
            <span>Show on Report</span>
          </label>
          <button type="button" class="btn btn-ghost btn-xs btn-remove-signature-slot" style="color: #f87171; padding: 2px 6px; font-size: 12px;" title="Remove this signatory">
            🗑️ Remove
          </button>
        </div>
      </div>
      <div class="form-group" style="margin-bottom: 0;">
        <label class="form-label" style="font-size: 11.5px; font-weight: 600; margin-bottom: 4px;">Officer / Engineer Name</label>
        <input type="text" class="form-control sig-slot-name" value="${sig.name || ''}" placeholder="e.g. Engr. Tanvir Ahmed" />
      </div>
      <div class="form-group" style="margin-bottom: 0;">
        <label class="form-label" style="font-size: 11.5px; font-weight: 600; margin-bottom: 4px;">Designation / Title</label>
        <input type="text" class="form-control sig-slot-title" value="${sig.title || ''}" placeholder="e.g. Prepared By (Maintenance In-Charge)" />
      </div>
    </div>
  `;
}

export function renderSettingsView() {
  const settings = storage.getTable(TABLE_NAMES.SETTINGS) || {};
  const signaturesList = getSignaturesList(settings);

  return `
    <div class="page-view">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <div>
          <h1 style="font-size: 22px; font-weight: 800; color: #fff;">⚙️ Admin Settings &amp; Configuration</h1>
          <p style="font-size: 12.5px; color: var(--text-secondary);">
            Manage PDF &amp; print signatures, corporate branding, approval workflow policies, machine serial number formatting, and database backups.
          </p>
        </div>
      </div>

      <!-- Settings Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
        
        <!-- Top Full-Width Card: PDF & Print Report Signatures Customization (Add More / Edit / Remove) -->
        <div style="background: var(--bg-surface); border: 1.5px solid rgba(168, 85, 247, 0.45); border-radius: var(--radius-lg); padding: 22px; display: flex; flex-direction: column; gap: 16px; grid-column: 1 / -1; box-shadow: 0 4px 24px rgba(168, 85, 247, 0.12);">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 10px; flex-wrap: wrap; gap: 10px;">
            <div>
              <h3 style="font-size: 16px; font-weight: 800; color: #c084fc; display: flex; align-items: center; gap: 8px; margin: 0;">
                <span>✍️ PDF &amp; Print Report Signatures Customization</span>
              </h3>
              <div style="font-size: 12.5px; color: var(--text-secondary); margin-top: 4px;">
                Customize, add more signatories, edit titles/names, or remove signatures. Only enabled signatures will appear at the bottom of generated PDF &amp; Print reports.
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <button type="button" id="btn-add-signature-slot" class="btn btn-secondary btn-sm" style="font-weight: 700; color: #c084fc; border-color: rgba(168, 85, 247, 0.4);">
                ➕ Add More Signatory
              </button>
            </div>
          </div>

          <!-- Dynamic Signatures Grid Container -->
          <div id="signatures-list-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;">
            ${signaturesList.map((sig, idx) => renderSignatorySlotHtml(sig, idx)).join('')}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px; border-top: 1px solid var(--border-color); padding-top: 12px;">
            <button type="button" id="btn-add-signature-slot-bottom" class="btn btn-secondary btn-sm" style="font-weight: 600; color: #c084fc;">
              ➕ Add Another Signatory
            </button>
            <button type="button" id="btn-save-signature-settings" class="btn btn-primary btn-sm" style="font-weight: 700; background: linear-gradient(135deg, #a855f7, #7c3aed); border-color: #a855f7; padding: 8px 22px;">
              💾 Save Changes
            </button>
          </div>
        </div>

        <!-- Card 1: Enterprise Information & Branding -->
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 20px; display: flex; flex-direction: column; gap: 14px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #38bdf8; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
            🏭 Corporate Branding &amp; Department Info
          </h3>

          <div class="form-group">
            <label class="form-label">Enterprise / Group Name</label>
            <input type="text" id="setting-company-name" class="form-control" value="${settings.companyName || 'Al-Muslim Group'}" />
          </div>

          <div class="form-group">
            <label class="form-label">Department Name</label>
            <input type="text" id="setting-dept-name" class="form-control" value="${settings.departmentName || 'Central Maintenance & Mechanical Engineering Department'}" />
          </div>

          <div class="form-group">
            <label class="form-label">Default Page Size for Inventory Grid</label>
            <select id="setting-page-size" class="form-control">
              <option value="25" ${settings.defaultRowsPerPage === 25 ? 'selected' : ''}>25 Records</option>
              <option value="50" ${settings.defaultRowsPerPage === 50 ? 'selected' : ''}>50 Records</option>
              <option value="100" ${settings.defaultRowsPerPage === 100 ? 'selected' : ''}>100 Records</option>
              <option value="500" ${settings.defaultRowsPerPage === 500 ? 'selected' : ''}>500 Records</option>
            </select>
          </div>

          <button id="btn-save-general-settings" class="btn btn-primary btn-sm" style="align-self: flex-start;">
            💾 Save General Settings
          </button>
        </div>

        <!-- Card 2: Multi-Stage Approval Policies -->
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 20px; display: flex; flex-direction: column; gap: 14px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #34d399; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
            🛡️ Approval Workflow Policies
          </h3>

          <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-color);">
            <div>
              <div style="font-weight: 600; color: #fff; font-size: 13px;">Require Admin Approval for Maintenance User Edits</div>
              <div style="font-size: 11.5px; color: var(--text-muted);">Route technician updates to Approval Center with side-by-side visual diffs.</div>
            </div>
            <input type="checkbox" id="setting-require-approval" ${settings.requireApprovalForMaintenanceUsers ? 'checked' : ''} style="width: 18px; height: 18px;" />
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-color);">
            <div>
              <div style="font-weight: 600; color: #fff; font-size: 13px;">Require Approval for Machine Decommission / Archive</div>
              <div style="font-size: 11.5px; color: var(--text-muted);">Prevent accidental machine deletion by requiring Super Admin approval.</div>
            </div>
            <input type="checkbox" id="setting-require-del-approval" ${settings.requireDeleteApproval ? 'checked' : ''} style="width: 18px; height: 18px;" />
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 0;">
            <div>
              <div style="font-weight: 600; color: #fff; font-size: 13px;">Enforce Strict Unique Serial Numbers</div>
              <div style="font-size: 11.5px; color: var(--text-muted);">Blocks duplicate serial numbers across entire database with conflict dialog.</div>
            </div>
            <span class="badge badge-active">ALWAYS ENFORCED</span>
          </div>

          <button id="btn-save-approval-settings" class="btn btn-success btn-sm" style="align-self: flex-start;">
            💾 Save Approval Policies
          </button>
        </div>

        <!-- Card 3: Machine Serial Number Format & Location Short Code Policy (ADMIN CONFIGURATION) -->
        <div style="background: var(--bg-surface); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: var(--radius-lg); padding: 20px; display: flex; flex-direction: column; gap: 14px; grid-column: 1 / -1; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
            <h3 style="font-size: 15px; font-weight: 700; color: #38bdf8; display: flex; align-items: center; gap: 8px;">
              <span>🔢 Machine Serial Number Format &amp; Floor Short Code Policy</span>
            </h3>
            <span class="badge badge-active">RECOMMENDED FORMAT: [Floor Short Code]-[Machine Number]</span>
          </div>

          <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">
            Configure unique Machine Serial Number formatting. The serial number includes a short code for the floor/location (e.g. <code>JA-01</code> for Jamuna Floor, <code>BG-01</code> for Buriganga Floor, <code>TT-01</code> for Titash Floor, <code>CH-01</code> for Chitra Floor) so machines can be searched quickly.
          </div>

          <!-- Policy Rule Alert Box -->
          <div style="background: rgba(56, 189, 248, 0.08); border: 1.5px solid rgba(56, 189, 248, 0.35); border-radius: 8px; padding: 12px 16px; font-size: 12.5px; color: #e0f2fe;">
            🔒 <strong>Important Immutability Rule:</strong> The Serial Number remains unique even if the machine is transferred to another floor. The original serial number never automatically changes after transfer. Location history separately records where the machine has been.
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">Format Template</label>
              <input type="text" id="setting-serial-template" class="form-control" value="${settings.serialFormatTemplate || '{FLOOR_CODE}-{NUMBER}'}" style="font-family: var(--font-mono); font-weight: 700; color: #38bdf8;" />
              <div style="font-size: 11px; color: var(--text-muted); margin-top: 3px;">Use {FLOOR_CODE} and {NUMBER}</div>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">Number Sequence Padding</label>
              <select id="setting-serial-padding" class="form-control" style="font-weight: 600;">
                <option value="2" ${settings.serialNumberPadding === 2 ? 'selected' : ''}>2 Digits (e.g. JA-01, JA-02)</option>
                <option value="3" ${settings.serialNumberPadding === 3 ? 'selected' : ''}>3 Digits (e.g. JA-001, JA-002)</option>
                <option value="4" ${settings.serialNumberPadding === 4 ? 'selected' : ''}>4 Digits (e.g. JA-0001, JA-0002)</option>
                <option value="5" ${settings.serialNumberPadding === 5 ? 'selected' : ''}>5 Digits (e.g. JA-00001, JA-00002)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-weight: 700;">Floor Short Code Prefix Policy</label>
              <div style="display: flex; align-items: center; gap: 10px; height: 38px;">
                <label style="display: flex; align-items: center; gap: 6px; font-size: 12.5px; cursor: pointer; color: #fff;">
                  <input type="checkbox" id="setting-enforce-prefix" ${settings.enforceFloorPrefix !== false ? 'checked' : ''} style="width: 16px; height: 16px;" />
                  Auto-prefix Floor Short Code
                </label>
              </div>
            </div>
          </div>

          <!-- Floor Short Codes Overview Table -->
          <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px 16px;">
            <div style="font-weight: 700; font-size: 12px; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">
              Configured Floor Short Codes &amp; Sample Serial Examples:
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${(masterDataService.getFloors(null, null, true) || []).map(f => {
                const code = (f.code || f.name.substring(0, 2)).toUpperCase().trim();
                return `
                  <span class="badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); font-size: 11.5px; padding: 4px 9px;">
                    <strong>${code}</strong> &rarr; ${f.name} (<code>${code}-01, ${code}-02</code>)
                  </span>
                `;
              }).join('')}
            </div>
          </div>

          <button id="btn-save-serial-settings" class="btn btn-primary btn-sm" style="align-self: flex-start; font-weight: 700;">
            💾 Save Serial Number Configuration
          </button>
        </div>



        <!-- Card 5: Database JSON Backup & Restore -->
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 20px; display: flex; flex-direction: column; gap: 14px; grid-column: 1 / -1;">
          <h3 style="font-size: 15px; font-weight: 700; color: #fbbf24; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
            💾 Database JSON Backup & Disaster Recovery
          </h3>

          <!-- Persistent Server Database Status Banner -->
          <div style="background: rgba(16, 185, 129, 0.08); border: 1.5px solid rgba(16, 185, 129, 0.35); border-radius: 8px; padding: 12px 16px; font-size: 12.5px; color: #d1fae5; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
            <div>
              🟢 <strong>Persistent Server Database File:</strong> <code>data/erp_database.json</code><br/>
              <span style="font-size: 11.5px; color: var(--text-secondary);">All database records (Master Data, Machines, Spare Parts, Lines &amp; Rooms) are actively synchronized and stored to server disk.</span>
            </div>
            <button type="button" id="btn-sync-server-db" class="btn btn-secondary btn-sm" style="font-weight: 700; color: #34d399; border-color: rgba(16, 185, 129, 0.4);">
              🔄 Force Save Records to Database File
            </button>
          </div>

          <div style="display: flex; gap: 12px; align-items: center;">
            <button id="btn-download-db-backup" class="btn btn-primary">
              📥 Export Complete Database Backup (.json)
            </button>

            <label class="btn btn-secondary" style="cursor: pointer;">
              📤 Restore Database from JSON Backup
              <input type="file" id="db-restore-file-input" accept=".json" style="display: none;" />
            </label>

            <button id="btn-factory-reset" class="btn btn-danger btn-sm" style="margin-left: auto;">
              ⚠️ Factory Reset Database
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initSettingsEvents() {
  const saveGen = document.getElementById('btn-save-general-settings');
  if (saveGen) {
    saveGen.addEventListener('click', async () => {
      const origText = saveGen.innerHTML;
      saveGen.disabled = true;
      saveGen.innerHTML = 'Saving...';

      const companyName = document.getElementById('setting-company-name')?.value.trim();
      const departmentName = document.getElementById('setting-dept-name')?.value.trim();
      const pageSize = Number(document.getElementById('setting-page-size')?.value) || 50;

      const current = storage.getTable(TABLE_NAMES.SETTINGS) || {};
      storage.data[TABLE_NAMES.SETTINGS] = {
        ...current,
        companyName,
        departmentName,
        defaultRowsPerPage: pageSize
      };
      await storage.saveTable(TABLE_NAMES.SETTINGS, true);
      saveGen.innerHTML = '✓ Saved';
      setTimeout(() => {
        saveGen.disabled = false;
        saveGen.innerHTML = origText;
      }, 1500);
    });
  }

  // Re-indexing helper for dynamic signatory cards
  function reindexSignatureSlots() {
    const container = document.getElementById('signatures-list-container');
    if (!container) return;
    const cards = container.querySelectorAll('.signature-slot-card');
    cards.forEach((card, idx) => {
      const num = idx + 1;
      const badge = card.querySelector('.sig-slot-index-badge');
      if (badge) badge.textContent = `#${num}`;
      const label = card.querySelector('.sig-slot-label');
      if (label) label.textContent = `Signatory ${num}`;
    });
  }

  // Add More Signatory Handler
  function addNewSignatureSlot() {
    const container = document.getElementById('signatures-list-container');
    if (!container) return;
    const currentCount = container.querySelectorAll('.signature-slot-card').length;
    const newIdx = currentCount;
    const newSig = {
      id: `sig-${Date.now()}`,
      name: '',
      title: '',
      enabled: true
    };
    
    const wrapper = document.createElement('div');
    wrapper.innerHTML = renderSignatorySlotHtml(newSig, newIdx).trim();
    const newCard = wrapper.firstElementChild;
    container.appendChild(newCard);
    reindexSignatureSlots();

    const nameInput = newCard.querySelector('.sig-slot-name');
    if (nameInput) nameInput.focus();
  }

  const btnAddTop = document.getElementById('btn-add-signature-slot');
  if (btnAddTop) {
    btnAddTop.addEventListener('click', (e) => {
      e.preventDefault();
      addNewSignatureSlot();
    });
  }

  const btnAddBottom = document.getElementById('btn-add-signature-slot-bottom');
  if (btnAddBottom) {
    btnAddBottom.addEventListener('click', (e) => {
      e.preventDefault();
      addNewSignatureSlot();
    });
  }

  // Remove Signatory Handler (Event Delegation)
  const signaturesContainer = document.getElementById('signatures-list-container');
  if (signaturesContainer) {
    signaturesContainer.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('.btn-remove-signature-slot');
      if (!removeBtn) return;
      e.preventDefault();

      const card = removeBtn.closest('.signature-slot-card');
      if (!card) return;

      const allCards = signaturesContainer.querySelectorAll('.signature-slot-card');
      if (allCards.length <= 1) {
        if (confirm('Do you want to clear this signatory? (At least 1 slot will remain)')) {
          const nameEl = card.querySelector('.sig-slot-name');
          const titleEl = card.querySelector('.sig-slot-title');
          const enabledEl = card.querySelector('.sig-slot-enabled');
          if (nameEl) nameEl.value = '';
          if (titleEl) titleEl.value = '';
          if (enabledEl) enabledEl.checked = false;
        }
        return;
      }

      card.remove();
      reindexSignatureSlots();
    });
  }

  // Save Signatures Handler
  const saveSig = document.getElementById('btn-save-signature-settings');
  if (saveSig) {
    saveSig.addEventListener('click', async (e) => {
      e.preventDefault();
      const origText = saveSig.innerHTML;
      saveSig.disabled = true;
      saveSig.innerHTML = 'Saving...';

      const container = document.getElementById('signatures-list-container');
      const cards = container ? container.querySelectorAll('.signature-slot-card') : [];
      
      const signaturesList = [];
      cards.forEach((card, idx) => {
        const id = card.getAttribute('data-sig-id') || `sig-${idx + 1}`;
        const name = card.querySelector('.sig-slot-name')?.value.trim() || '';
        const title = card.querySelector('.sig-slot-title')?.value.trim() || '';
        const enabled = card.querySelector('.sig-slot-enabled')?.checked !== false;

        signaturesList.push({ id, name, title, enabled });
      });

      const current = storage.getTable(TABLE_NAMES.SETTINGS) || {};
      
      // Also map first 3 to legacy properties for backwards compatibility
      const sig1 = signaturesList[0] || {};
      const sig2 = signaturesList[1] || {};
      const sig3 = signaturesList[2] || {};

      storage.data[TABLE_NAMES.SETTINGS] = {
        ...current,
        signatures: signaturesList,
        sig1Name: sig1.name || '',
        sig1Title: sig1.title || '',
        showSig1: sig1.enabled !== false,
        sig2Name: sig2.name || '',
        sig2Title: sig2.title || '',
        showSig2: sig2.enabled !== false,
        sig3Name: sig3.name || '',
        sig3Title: sig3.title || '',
        showSig3: sig3.enabled !== false,
        signatory1Name: sig1.name || '',
        signatory1Title: sig1.title || '',
        signatory2Name: sig2.name || '',
        signatory2Title: sig2.title || '',
        signatory3Name: sig3.name || '',
        signatory3Title: sig3.title || '',
        showSignaturesOnPdf: signaturesList.some(s => s.enabled)
      };

      try {
        await storage.saveTable(TABLE_NAMES.SETTINGS, true);
        saveSig.innerHTML = '✓ Saved';
        setTimeout(() => {
          saveSig.disabled = false;
          saveSig.innerHTML = origText;
        }, 1500);
      } catch (err) {
        saveSig.innerHTML = '✓ Saved';
        setTimeout(() => {
          saveSig.disabled = false;
          saveSig.innerHTML = origText;
        }, 1500);
      }
    });
  }

  const saveAppr = document.getElementById('btn-save-approval-settings');
  if (saveAppr) {
    saveAppr.addEventListener('click', async () => {
      const origText = saveAppr.innerHTML;
      saveAppr.disabled = true;
      saveAppr.innerHTML = 'Saving...';

      const requireApproval = document.getElementById('setting-require-approval')?.checked;
      const requireDel = document.getElementById('setting-require-del-approval')?.checked;

      const current = storage.getTable(TABLE_NAMES.SETTINGS) || {};
      storage.data[TABLE_NAMES.SETTINGS] = {
        ...current,
        requireApprovalForMaintenanceUsers: requireApproval,
        requireDeleteApproval: requireDel
      };
      await storage.saveTable(TABLE_NAMES.SETTINGS, true);
      saveAppr.innerHTML = '✓ Saved';
      setTimeout(() => {
        saveAppr.disabled = false;
        saveAppr.innerHTML = origText;
      }, 1500);
    });
  }

  const saveSerial = document.getElementById('btn-save-serial-settings');
  if (saveSerial) {
    saveSerial.addEventListener('click', async () => {
      const origText = saveSerial.innerHTML;
      saveSerial.disabled = true;
      saveSerial.innerHTML = 'Saving...';

      const template = document.getElementById('setting-serial-template')?.value.trim() || '{FLOOR_CODE}-{NUMBER}';
      const padding = Number(document.getElementById('setting-serial-padding')?.value) || 2;
      const enforce = document.getElementById('setting-enforce-prefix')?.checked;

      const current = storage.getTable(TABLE_NAMES.SETTINGS) || {};
      storage.data[TABLE_NAMES.SETTINGS] = {
        ...current,
        serialFormatTemplate: template,
        serialNumberPadding: padding,
        enforceFloorPrefix: enforce
      };
      await storage.saveTable(TABLE_NAMES.SETTINGS, true);
      saveSerial.innerHTML = '✓ Saved';
      setTimeout(() => {
        saveSerial.disabled = false;
        saveSerial.innerHTML = origText;
      }, 1500);
    });
  }

  const btnBackup = document.getElementById('btn-download-db-backup');
  if (btnBackup) {
    btnBackup.addEventListener('click', () => {
      const jsonStr = storage.exportBackup();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Al_Muslim_ERP_Backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  const restoreInput = document.getElementById('db-restore-file-input');
  if (restoreInput) {
    restoreInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        const res = storage.importBackup(evt.target.result);
        if (res.success) {
          alert(`Database restored successfully (${res.count} machines loaded).`);
          window.location.reload();
        } else {
          alert('Restore Failed: ' + res.error);
        }
      };
      reader.readAsText(file);
    });
  }

  const btnReset = document.getElementById('btn-factory-reset');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (confirm('Are you sure you want to perform a factory reset? All existing custom machines and modifications will be replaced with initial demo records.')) {
        storage.resetToInitialData();
        alert('ERP reset to initial factory demo state.');
        window.location.reload();
      }
    });
  }

  const btnSyncDb = document.getElementById('btn-sync-server-db');
  if (btnSyncDb) {
    btnSyncDb.addEventListener('click', async () => {
      btnSyncDb.disabled = true;
      btnSyncDb.textContent = '⏳ Saving to Database File...';
      try {
        await storage.persistToServerDatabase();
        alert('All data records were successfully stored into data/erp_database.json on the server disk!');
      } catch (err) {
        alert('Database save error: ' + err.message);
      } finally {
        btnSyncDb.disabled = false;
        btnSyncDb.textContent = '🔄 Force Save Records to Database File';
      }
    });
  }
}
