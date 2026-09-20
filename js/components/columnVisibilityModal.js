/**
 * Al-Muslim Group Garments Factory Maintenance Machine ERP
 * Column Visibility Manager Modal Component
 */

import { customFieldService } from '../services/customFieldService.js';
import { state } from '../state.js';

export function renderColumnVisibilityModal() {
  const visibleCols = state.get('visibleColumns') || new Set();
  const customFields = customFieldService.getActiveFields();

  const standardCols = [
    { key: 'machineName', label: 'Machine Name' },
    { key: 'brand', label: 'Machine Brand' },
    { key: 'model', label: 'Machine Model' },
    { key: 'serialNumber', label: 'Machine Serial Number' },
    { key: 'group', label: 'Group / Conglomerate' },
    { key: 'unit', label: 'Unit / Factory' },
    { key: 'floor', label: 'Floor' },
    { key: 'line', label: 'Line' },
    { key: 'running', label: 'Running Quantity' },
    { key: 'usable_idle', label: 'Usable Idle Quantity' },
    { key: 'repairable_idle', label: 'Repairable Idle Quantity' },
    { key: 'total_quantity', label: 'Total Quantity' },
    { key: 'status', label: 'Machine Status' },
    { key: 'remarks', label: 'Remarks / Notes' },
    { key: 'actions', label: 'Action Menu (⋮ Actions)' }
  ];

  const optionalCols = [
    { key: 'purchase_date', label: 'Purchase Date' },
    { key: 'installation_date', label: 'Installation Date' },
    { key: 'supplier_name', label: 'Supplier / Vendor' },
    { key: 'country_of_origin', label: 'Country of Origin' },
    { key: 'machine_capacity', label: 'Machine Capacity / RPM' }
  ];

  return `
    <div class="modal-overlay" id="modal-column-vis-overlay">
      <div class="modal-dialog" style="max-width: 580px;">
        <div class="modal-header">
          <div class="modal-title">
            <span>👁️ Customize Columns (Columns ▾)</span>
          </div>
          <button id="btn-close-colvis-modal" class="btn btn-ghost btn-sm" style="font-size: 18px;">✕</button>
        </div>

        <div class="modal-body">
          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">
            Choose which columns to display on the Machine Inventory table. Your selection is automatically remembered.
          </div>

          <h4 style="font-size: 12px; font-weight: 700; color: #38bdf8; text-transform: uppercase; margin-bottom: 8px;">
            Core Machine Columns
          </h4>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-bottom: 14px;">
            ${standardCols.map(c => `
              <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; cursor: pointer; padding: 3px 0;">
                <input type="checkbox" class="colvis-check" data-col="${c.key}" ${visibleCols.has(c.key) ? 'checked' : ''} />
                <span>${c.label}</span>
              </label>
            `).join('')}
          </div>

          <h4 style="font-size: 12px; font-weight: 700; color: #a78bfa; text-transform: uppercase; margin-bottom: 8px; border-top: 1px solid var(--border-color); padding-top: 10px;">
            Optional Specification Columns
          </h4>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-bottom: 14px;">
            ${optionalCols.map(c => `
              <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; cursor: pointer; padding: 3px 0;">
                <input type="checkbox" class="colvis-check" data-col="${c.key}" ${visibleCols.has(c.key) ? 'checked' : ''} />
                <span>${c.label}</span>
              </label>
            `).join('')}
          </div>

          ${customFields.length > 0 ? `
            <h4 style="font-size: 12px; font-weight: 700; color: #34d399; text-transform: uppercase; margin-bottom: 8px; border-top: 1px solid var(--border-color); padding-top: 10px;">
              Custom Fields
            </h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
              ${customFields.map(cf => `
                <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; cursor: pointer; padding: 3px 0;">
                  <input type="checkbox" class="colvis-check" data-col="${cf.code}" ${visibleCols.has(cf.code) ? 'checked' : ''} />
                  <span>${cf.label}</span>
                </label>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <div class="modal-footer" style="display: flex; justify-content: space-between;">
          <button id="btn-colvis-reset-default" class="btn btn-secondary btn-sm">↺ Reset to Default</button>
          <button id="btn-close-colvis-done" class="btn btn-primary btn-sm">Done &amp; Save</button>
        </div>
      </div>
    </div>
  `;
}

export function initColumnVisibilityEvents() {
  const overlay = document.getElementById('modal-column-vis-overlay');
  const closeBtn = document.getElementById('btn-close-colvis-modal');
  const doneBtn = document.getElementById('btn-close-colvis-done');

  const closeModal = () => state.set('activeModal', null);

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (doneBtn) doneBtn.addEventListener('click', closeModal);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  const resetDefaultBtn = document.getElementById('btn-colvis-reset-default');
  if (resetDefaultBtn) {
    resetDefaultBtn.addEventListener('click', () => {
      const defaultCols = [
        'sl', 'select', 'machineName', 'brand', 'model', 'serialNumber',
        'unit', 'floor', 'line', 'running', 'usable_idle', 'repairable_idle',
        'total_quantity', 'status', 'actions'
      ];
      state.state.visibleColumns = new Set(defaultCols);
      try {
        localStorage.setItem('erp_visible_columns_v3', JSON.stringify(defaultCols));
      } catch (e) {}
      state.emit('columns:changed', defaultCols);
      closeModal();
    });
  }

  document.querySelectorAll('.colvis-check').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const col = e.target.getAttribute('data-col');
      if (col) {
        state.toggleColumnVisibility(col);
      }
    });
  });
}
