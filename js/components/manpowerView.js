/**
 * Al-Muslim Group Garments Factory Maintenance Machine ERP
 * Comprehensive Manpower & Workforce Management View Component
 * 
 * Clean, Simple & User-Friendly Workflow:
 * 1. Active Manpower — Dedicated list of active workforce
 * 2. Inactive Manpower — Inactive / Resigned / On-Leave workforce with 1-click reactivate
 * 3. Employee Transfer — Historical relocation & movement ledger
 * 4. Leave Records — Active and past employee leaves & attendance
 * 5. Custom Fields — Admin dynamic field configuration
 */

import { storage } from '../db/storage.js';
import { TABLE_NAMES } from '../db/schema.js';
import { employeeService, DEPARTMENTS, DESIGNATIONS, LEAVE_TYPES } from '../services/employeeService.js';
import { employeeCustomFieldService } from '../services/employeeCustomFieldService.js';
import { masterDataService } from '../services/masterDataService.js';
import { excelService } from '../services/excelService.js';
import { authService } from '../services/authService.js';
import { notificationService } from '../services/notificationService.js';
import { state } from '../state.js';
import { renderEmployeeModal, initEmployeeModalEvents } from './employeeModal.js';

let activeManpowerTab = 'active'; // 'active', 'inactive', 'transfers', 'leaves', 'custom-fields'
let activeCustomFieldModal = null; // { type: 'ADD'|'EDIT', field: Object }

// Multi-Filter State
let filterState = {
  search: '',
  department: 'ALL',
  designation: 'ALL',
  unitId: 'ALL',
  floorId: 'ALL'
};

export function renderManpowerView() {
  const requestedTab = state.get('manpowerActiveTab');
  if (requestedTab) {
    activeManpowerTab = requestedTab;
  } else {
    state.set('manpowerActiveTab', activeManpowerTab);
  }

  const stats = employeeService.getManpowerStats();
  const isAdmin = authService.isAdmin();

  // Active employees list
  const activeEmployees = employeeService.getAllEmployees({
    ...filterState,
    status: 'ACTIVE'
  });

  // Inactive employees list (Includes INACTIVE, ON_LEAVE, TERMINATED)
  const allFiltered = employeeService.getAllEmployees(filterState);
  const inactiveEmployees = allFiltered.filter(e => e.status !== 'ACTIVE');

  const transfers = employeeService.getEmployeeTransfers();
  const leaves = employeeService.getEmployeeLeaves();
  const customFields = employeeCustomFieldService.getAllFields();

  return `
    <div class="page-view" style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 100%; height: 100%; overflow: hidden; box-sizing: border-box; padding: 12px 20px;">
      
      <!-- Top Title Bar (Fixed Height) -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 12px 18px; display: flex; justify-content: space-between; align-items: center; flex-wrap: nowrap; gap: 14px; flex-shrink: 0; overflow-x: auto; scrollbar-width: none;">
        <div style="min-width: 0;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 22px;">👥</span>
            <h1 style="font-size: 18px; font-weight: 800; color: #fff; margin: 0; white-space: nowrap;">
              Manpower Management
            </h1>
            <span class="badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); font-size: 11px; padding: 2px 8px; white-space: nowrap;">
              ${stats.total} Total Workforce
            </span>
          </div>
          <p style="font-size: 11.5px; color: var(--text-secondary); margin-top: 2px; margin-bottom: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            Manage plant mechanics, technicians, line supervisors, floor allocations, and leave rosters.
          </p>
        </div>

        <div style="display: flex; gap: 8px; flex-shrink: 0; align-items: center;">
          <button id="btn-manpower-add-emp" class="btn btn-primary btn-sm" style="font-weight: 700; background: linear-gradient(135deg, #0284c7, #0369a1); box-shadow: 0 2px 10px rgba(2, 132, 199, 0.35); white-space: nowrap;">
            ➕ Add Employee
          </button>
          <button id="btn-manpower-import-excel" class="btn btn-secondary btn-sm" style="font-weight: 700; white-space: nowrap;">
            📥 Excel Import
          </button>
          <button id="btn-manpower-export-excel" class="btn btn-secondary btn-sm" style="font-weight: 700; white-space: nowrap;">
            📤 Excel Export (.xlsx)
          </button>
        </div>
      </div>

      <!-- Navigation Tabs (Clean Button Pills, Fixed Height) -->
      <div id="manpower-nav-tabs-bar" style="display: flex; gap: 8px; border-bottom: 2px solid var(--border-color); padding-bottom: 6px; flex-wrap: nowrap; flex-shrink: 0; overflow-x: auto; scrollbar-width: none; height: 38px; align-items: center;">
        <button class="btn btn-sm ${activeManpowerTab === 'active' ? 'btn-primary' : 'btn-ghost'}" data-manpower-tab="active" style="font-size: 12.5px; font-weight: 700; white-space: nowrap;">
          🟢 Active Manpower (${stats.active})
        </button>
        <button class="btn btn-sm ${activeManpowerTab === 'inactive' ? 'btn-primary' : 'btn-ghost'}" data-manpower-tab="inactive" style="font-size: 12.5px; font-weight: 700; white-space: nowrap;">
          🔴 Inactive Manpower (${stats.inactive + stats.onLeave})
        </button>
        <button class="btn btn-sm ${activeManpowerTab === 'transfers' ? 'btn-primary' : 'btn-ghost'}" data-manpower-tab="transfers" style="font-size: 12.5px; font-weight: 700; white-space: nowrap;">
          🔄 Employee Transfer (${transfers.length})
        </button>
        <button class="btn btn-sm ${activeManpowerTab === 'leaves' ? 'btn-primary' : 'btn-ghost'}" data-manpower-tab="leaves" style="font-size: 12.5px; font-weight: 700; white-space: nowrap;">
          🏖️ Leave Records (${leaves.length})
        </button>
        ${isAdmin ? `
          <button class="btn btn-sm ${activeManpowerTab === 'custom-fields' ? 'btn-primary' : 'btn-ghost'}" data-manpower-tab="custom-fields" style="font-size: 12.5px; font-weight: 700; white-space: nowrap; color: ${activeManpowerTab === 'custom-fields' ? '#fff' : '#fbbf24'};">
            ⚙️ Custom Fields (${customFields.length})
          </button>
        ` : ''}
      </div>

      <!-- Active Tab Content (Scrollable flex 1) -->
      <div id="manpower-tab-container" style="display: flex; flex-direction: column; gap: 14px; flex: 1; min-height: 0; overflow-y: auto;">
        ${renderActiveTabContent({ stats, activeEmployees, inactiveEmployees, transfers, leaves, customFields, isAdmin })}
      </div>

      <!-- Employee Modal Layer -->
      ${renderEmployeeModal()}

      <!-- Custom Field Designer Modal (if open) -->
      ${renderCustomFieldDesignerModal()}

    </div>
  `;
}

function renderActiveTabContent({ stats, activeEmployees, inactiveEmployees, transfers, leaves, customFields, isAdmin }) {
  switch (activeManpowerTab) {
    case 'active':
      return renderEmployeeListTable({
        title: '🟢 Active Workforce Roster',
        subtitle: 'Currently active and operational personnel deployed across factory lines',
        employees: activeEmployees,
        isInactiveView: false
      });
    case 'inactive':
      return renderEmployeeListTable({
        title: '🔴 Inactive / On-Leave / Resigned Workforce',
        subtitle: 'Inactive, suspended, on-leave, or resigned personnel. Click Activate (▶️) to restore to Active status.',
        employees: inactiveEmployees,
        isInactiveView: true
      });
    case 'transfers':
      return renderEmployeeTransfersTab(transfers);
    case 'leaves':
      return renderEmployeeLeavesTab(leaves);
    case 'custom-fields':
      return renderCustomFieldsTab(customFields);
    default:
      return renderEmployeeListTable({
        title: '🟢 Active Workforce Roster',
        subtitle: 'Currently active and operational personnel',
        employees: activeEmployees,
        isInactiveView: false
      });
  }
}

// ---------------------------------------------------------------------------
// 1. ACTIVE & INACTIVE EMPLOYEE TABLE
// ---------------------------------------------------------------------------
function renderEmployeeListTable({ title, subtitle, employees, isInactiveView }) {
  const units = masterDataService.getUnits(null, true);
  const floors = masterDataService.getFloors(filterState.unitId !== 'ALL' ? filterState.unitId : null, null, true);

  const flrMap = new Map((storage.getTable(TABLE_NAMES.FLOORS) || []).map(x => [x.id, x.name]));
  const untMap = new Map((storage.getTable(TABLE_NAMES.UNITS) || []).map(x => [x.id, x.name]));
  const linMap = new Map((storage.getTable(TABLE_NAMES.LINES) || []).map(x => [x.id, x.name]));

  return `
    <div style="display: flex; flex-direction: column; gap: 14px;">
      
      <!-- Search & Filters Toolbar -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px 18px; display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
          
          <!-- Prominent Instant Search -->
          <div style="flex: 1.5; min-width: 240px;">
            <input 
              type="text" 
              id="mp-filter-search" 
              class="form-control" 
              placeholder="🔍 Search by Card #, Name, Department, Phone, ID..." 
              value="${filterState.search}" 
              style="font-size: 13px;"
            />
          </div>

          <!-- Department Filter -->
          <div style="flex: 1; min-width: 160px;">
            <select id="mp-filter-dept" class="filter-select" style="font-size: 12.5px;">
              <option value="ALL">All Departments</option>
              ${DEPARTMENTS.map(d => `<option value="${d}" ${filterState.department === d ? 'selected' : ''}>${d}</option>`).join('')}
            </select>
          </div>

          <!-- Designation Filter -->
          <div style="flex: 1; min-width: 160px;">
            <select id="mp-filter-desig" class="filter-select" style="font-size: 12.5px;">
              <option value="ALL">All Designations</option>
              ${DESIGNATIONS.map(d => `<option value="${d}" ${filterState.designation === d ? 'selected' : ''}>${d}</option>`).join('')}
            </select>
          </div>

          <!-- Unit / Factory Filter -->
          <div style="flex: 1; min-width: 140px;">
            <select id="mp-filter-unit" class="filter-select" style="font-size: 12.5px;">
              <option value="ALL">All Factories / Units</option>
              ${units.map(u => `<option value="${u.id}" ${filterState.unitId === u.id ? 'selected' : ''}>${u.name}</option>`).join('')}
            </select>
          </div>

          <!-- Floor Filter -->
          <div style="flex: 1; min-width: 140px;">
            <select id="mp-filter-floor" class="filter-select" style="font-size: 12.5px;">
              <option value="ALL">All Floors</option>
              ${floors.map(f => `<option value="${f.id}" ${filterState.floorId === f.id ? 'selected' : ''}>${f.name}</option>`).join('')}
            </select>
          </div>

          <!-- Reset Button -->
          <button id="btn-mp-reset-filters" class="btn btn-ghost btn-sm" style="font-weight: 700; color: #f87171; font-size: 12px;" title="Reset all filters">
            ↺ Reset
          </button>
        </div>
      </div>

      <!-- Employee Table Container -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); overflow-x: auto;">
        
        <div style="padding: 14px 18px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div>
            <h3 style="margin: 0; font-size: 15px; font-weight: 800; color: #fff;">${title}</h3>
            <p style="margin: 2px 0 0 0; font-size: 12px; color: var(--text-muted);">${subtitle}</p>
          </div>
          <span style="font-size: 12px; color: #38bdf8; font-weight: 700;">
            ${employees.length} record(s) listed
          </span>
        </div>

        <table class="excel-grid-table" style="margin: 0; width: 100%;">
          <thead>
            <tr>
              <th style="width: 45px; text-align: center;">SL</th>
              <th style="width: 110px;">Card #</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Floor / Unit</th>
              <th style="text-align: center;">Joining Date</th>
              <th style="text-align: center; width: 110px;">Status</th>
              <th style="text-align: center; width: 160px;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${employees.length === 0 ? `
              <tr>
                <td colspan="9" style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
                  <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
                  <div style="font-size: 15px; font-weight: 700; color: #fff;">No employees found</div>
                  <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
                    ${isInactiveView ? 'Zero inactive employees. All registered personnel are currently Active!' : 'No active employees matched your search query or filters.'}
                  </div>
                </td>
              </tr>
            ` : employees.map((emp, idx) => {
              const isActive = emp.status === 'ACTIVE';
              const floorName = flrMap.get(emp.floorId) || emp.floorName || '';
              const unitName = untMap.get(emp.unitId) || emp.unitName || '';
              const lineName = linMap.get(emp.lineId) || emp.lineName || '';
              const locationStr = unitName || floorName ? `${unitName}${floorName ? ' • ' + floorName : ''}${lineName ? ' (' + lineName + ')' : ''}` : (emp.workingArea || '—');

              const statusBadge = isActive ? 'badge-active' : (emp.status === 'ON_LEAVE' ? 'badge-maint' : 'badge-breakdown');

              return `
                <tr style="background: ${!isActive ? 'rgba(239, 68, 68, 0.03)' : 'transparent'};">
                  <td style="text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 12px;">${idx + 1}</td>
                  
                  <!-- Employee / Card Number -->
                  <td style="font-family: var(--font-mono); font-weight: 800; color: #38bdf8; font-size: 13px;">
                    #${emp.cardNumber || emp.id}
                  </td>

                  <!-- Name -->
                  <td>
                    <div style="font-weight: 700; color: ${isActive ? '#fff' : 'var(--text-muted)'}; font-size: 13.5px;">
                      ${emp.name}
                    </div>
                    ${emp.phone ? `<div style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono); margin-top: 2px;">📞 ${emp.phone}</div>` : ''}
                  </td>

                  <!-- Department -->
                  <td>
                    <span style="background: rgba(255,255,255,0.06); padding: 3px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">
                      ${emp.department || 'General'}
                    </span>
                  </td>

                  <!-- Designation -->
                  <td style="font-size: 12.5px; color: var(--text-secondary); font-weight: 600;">
                    ${emp.designation || 'Technician'}
                  </td>

                  <!-- Floor / Unit -->
                  <td style="font-size: 12px; color: #fff;">
                    ${locationStr}
                  </td>

                  <!-- Joining Date -->
                  <td style="text-align: center; font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary);">
                    ${emp.joinDate || '—'}
                  </td>

                  <!-- Status -->
                  <td style="text-align: center;">
                    <span class="badge ${statusBadge}" style="font-size: 10.5px;">
                      ${emp.status}
                    </span>
                  </td>

                  <!-- Actions -->
                  <td style="text-align: center;">
                    <div style="display: flex; gap: 5px; justify-content: center; align-items: center;">
                      
                      <!-- View / ID Badge -->
                      <button class="btn btn-ghost btn-xs btn-emp-card" data-emp-id="${emp.id}" title="View Details &amp; Digital ID Card" style="padding: 4px 7px; font-size: 13px;">
                        👁️
                      </button>

                      <!-- Edit -->
                      <button class="btn btn-secondary btn-xs btn-emp-edit" data-emp-id="${emp.id}" title="Edit Employee Profile" style="padding: 4px 7px; font-size: 13px;">
                        ✏️
                      </button>

                      <!-- Transfer -->
                      <button class="btn btn-secondary btn-xs btn-emp-transfer" data-emp-id="${emp.id}" title="Transfer / Relocate Employee" style="padding: 4px 7px; font-size: 13px;">
                        🔄
                      </button>

                      <!-- Activate / Deactivate Toggle -->
                      ${isInactiveView ? `
                        <button class="btn btn-success btn-xs btn-emp-quick-toggle" data-emp-id="${emp.id}" data-target-status="ACTIVE" title="Reactivate to Active" style="padding: 4px 8px; font-size: 11px; font-weight: 700;">
                          ▶️ Activate
                        </button>
                        <button class="btn btn-ghost btn-xs btn-emp-delete" data-emp-id="${emp.id}" title="Delete Record" style="color: #f87171; padding: 4px 7px; font-size: 13px;">
                          🗑️
                        </button>
                      ` : `
                        <button class="btn btn-ghost btn-xs btn-emp-quick-toggle" data-emp-id="${emp.id}" data-target-status="INACTIVE" title="Deactivate / Move to Inactive" style="color: #f87171; padding: 4px 8px; font-size: 11px; font-weight: 700; border: 1px solid rgba(239,68,68,0.3);">
                          ⏸️ Deactivate
                        </button>
                      `}

                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>

        <div style="padding: 12px 18px; font-size: 12px; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color);">
          <span>Showing <strong>${employees.length}</strong> workforce records</span>
          <span>⚡ Deactivated employees automatically appear under Inactive Manpower</span>
        </div>

      </div>

    </div>
  `;
}

// ---------------------------------------------------------------------------
// 2. EMPLOYEE TRANSFERS TAB
// ---------------------------------------------------------------------------
function renderEmployeeTransfersTab(transfers) {
  return `
    <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); overflow-x: auto;">
      <div style="padding: 16px 20px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h3 style="margin: 0; font-size: 15px; font-weight: 800; color: #fff;">🔄 Employee Movement &amp; Relocation Ledger</h3>
          <p style="margin: 2px 0 0 0; font-size: 12px; color: var(--text-muted);">Historical records of inter-floor, unit, and department relocations</p>
        </div>
      </div>

      <table class="excel-grid-table" style="margin: 0; width: 100%;">
        <thead>
          <tr>
            <th style="width: 45px; text-align: center;">SL</th>
            <th>Transfer Date</th>
            <th>Employee</th>
            <th>Source Location</th>
            <th>Destination Location</th>
            <th>Transfer Reason</th>
            <th>Authorized By</th>
          </tr>
        </thead>
        <tbody>
          ${transfers.length === 0 ? `
            <tr>
              <td colspan="7" style="text-align: center; padding: 35px; color: var(--text-muted);">
                No employee transfers recorded yet.
              </td>
            </tr>
          ` : transfers.map((tr, idx) => `
            <tr>
              <td style="text-align: center; color: var(--text-muted);">${idx + 1}</td>
              <td style="font-family: var(--font-mono); font-size: 12px; color: #38bdf8;">${tr.transferDate || '—'}</td>
              <td style="font-weight: 700; color: #fff;">
                ${tr.employeeName} <span style="font-family: var(--font-mono); color: var(--text-muted); font-size: 11px;">[#${tr.cardNumber}]</span>
              </td>
              <td style="font-size: 12px; color: #f87171;">
                ${tr.fromLocation?.locationPath || '—'} (${tr.fromLocation?.department || '—'})
              </td>
              <td style="font-size: 12px; color: #34d399; font-weight: 600;">
                &rarr; ${tr.toLocation?.locationPath || '—'} (${tr.toLocation?.department || '—'})
              </td>
              <td style="font-size: 12px; color: #fff;">${tr.reason || '—'}</td>
              <td style="font-size: 11.5px; color: var(--text-muted);">${tr.transferredBy || 'Admin'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// 3. LEAVE MANAGEMENT TAB
// ---------------------------------------------------------------------------
function renderEmployeeLeavesTab(leaves) {
  return `
    <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); overflow-x: auto;">
      <div style="padding: 16px 20px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h3 style="margin: 0; font-size: 15px; font-weight: 800; color: #fff;">🏖️ Employee Leave Records &amp; Attendance</h3>
          <p style="margin: 2px 0 0 0; font-size: 12px; color: var(--text-muted);">Active leaves automatically synchronize employee status</p>
        </div>
      </div>

      <table class="excel-grid-table" style="margin: 0; width: 100%;">
        <thead>
          <tr>
            <th style="width: 45px; text-align: center;">SL</th>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th style="text-align: center;">Days</th>
            <th>Reason</th>
            <th style="text-align: center;">Status</th>
            <th style="text-align: center; width: 100px;">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${leaves.length === 0 ? `
            <tr>
              <td colspan="9" style="text-align: center; padding: 35px; color: var(--text-muted);">
                No employee leave records found.
              </td>
            </tr>
          ` : leaves.map((lv, idx) => `
            <tr>
              <td style="text-align: center; color: var(--text-muted);">${idx + 1}</td>
              <td style="font-weight: 700; color: #fff;">
                ${lv.employeeName} <span style="font-family: var(--font-mono); color: var(--text-muted); font-size: 11px;">[#${lv.cardNumber}]</span>
              </td>
              <td style="font-size: 12px; color: #38bdf8; font-weight: 600;">${lv.leaveType}</td>
              <td style="font-family: var(--font-mono); font-size: 12px;">${lv.startDate}</td>
              <td style="font-family: var(--font-mono); font-size: 12px;">${lv.endDate}</td>
              <td style="text-align: center; font-weight: 700; color: #fbbf24;">${lv.totalDays}d</td>
              <td style="font-size: 12px; color: var(--text-secondary);">${lv.reason || '—'}</td>
              <td style="text-align: center;">
                <span class="badge badge-active" style="font-size: 10px;">APPROVED</span>
              </td>
              <td style="text-align: center;">
                <button class="btn btn-ghost btn-xs btn-delete-leave" data-leave-id="${lv.id}" title="Cancel Leave" style="color: #f87171;">
                  ✕ Cancel
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// 4. CUSTOM FIELDS TAB
// ---------------------------------------------------------------------------
function renderCustomFieldsTab(customFields) {
  return `
    <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 14px; margin-bottom: 16px;">
        <div>
          <h3 style="margin: 0; font-size: 16px; font-weight: 800; color: #fff;">⚙️ Manpower Custom Parameters Configuration</h3>
          <p style="margin: 2px 0 0 0; font-size: 12px; color: var(--text-muted);">Dynamic fields for NID, blood group, skill grades, and enterprise HR tracking</p>
        </div>
        <button id="btn-add-custom-field" class="btn btn-primary btn-sm" style="font-weight: 700;">
          ➕ Add Custom Field
        </button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px;">
        ${customFields.map(cf => `
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <div style="font-weight: 800; font-size: 13.5px; color: #fff;">${cf.label}</div>
                <div style="font-family: var(--font-mono); font-size: 11px; color: #38bdf8; margin-top: 2px;">CODE: ${cf.code}</div>
              </div>
              <span class="badge ${cf.status === 'ACTIVE' ? 'badge-active' : 'badge-idle'}" style="font-size: 10px;">${cf.status}</span>
            </div>

            <div style="font-size: 11.5px; color: var(--text-secondary); margin-top: 10px;">
              <div><strong>Type:</strong> ${cf.type}</div>
              <div><strong>Required:</strong> ${cf.required ? 'Yes' : 'No'}</div>
            </div>

            <div style="display: flex; gap: 6px; justify-content: flex-end; margin-top: 12px; border-top: 1px solid var(--border-color); padding-top: 8px;">
              <button class="btn btn-ghost btn-xs btn-cf-edit" data-cf-id="${cf.id}">✏️ Edit</button>
              <button class="btn btn-ghost btn-xs btn-cf-toggle" data-cf-id="${cf.id}" style="color: #fbbf24;">
                ${cf.status === 'ACTIVE' ? '⏸️ Disable' : '▶️ Enable'}
              </button>
              <button class="btn btn-ghost btn-xs btn-cf-delete" data-cf-id="${cf.id}" style="color: #f87171;">🗑️ Delete</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderCustomFieldDesignerModal() {
  if (!activeCustomFieldModal) return '';
  const isEdit = activeCustomFieldModal.type === 'EDIT';
  const cf = isEdit ? activeCustomFieldModal.field : { type: 'TEXT', status: 'ACTIVE', showInFilter: true, showInTable: true };

  return `
    <div class="modal-overlay active" id="modal-cf-designer-overlay">
      <div class="modal-card" style="max-width: 500px;">
        <div class="modal-header" style="border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
          <h3 style="margin: 0; font-size: 16px; font-weight: 800; color: #fff;">
            ${isEdit ? 'Edit Custom Parameter' : 'Create Custom Parameter'}
          </h3>
          <button class="btn btn-ghost btn-sm" id="btn-close-cf-modal">✕</button>
        </div>

        <form id="form-cf-designer-submit" style="padding-top: 14px; display: flex; flex-direction: column; gap: 12px;">
          <div class="form-group">
            <label class="form-label" style="font-size: 12px; font-weight: 700; color: #fff;">Field Label *</label>
            <input type="text" id="inp-cf-label" class="form-control" value="${cf.label || ''}" required placeholder="e.g. National ID / NID" />
          </div>

          <div class="form-group">
            <label class="form-label" style="font-size: 12px; font-weight: 700; color: #fff;">Field Type *</label>
            <select id="inp-cf-type" class="filter-select">
              <option value="TEXT" ${cf.type === 'TEXT' ? 'selected' : ''}>Text Input</option>
              <option value="NUMBER" ${cf.type === 'NUMBER' ? 'selected' : ''}>Numeric</option>
              <option value="DATE" ${cf.type === 'DATE' ? 'selected' : ''}>Date Picker</option>
              <option value="DROPDOWN" ${cf.type === 'DROPDOWN' ? 'selected' : ''}>Dropdown Select</option>
              <option value="BOOLEAN" ${cf.type === 'BOOLEAN' ? 'selected' : ''}>Yes / No Toggle</option>
            </select>
          </div>

          <div class="form-group" id="cf-options-group" style="display: ${cf.type === 'DROPDOWN' ? 'block' : 'none'};">
            <label class="form-label" style="font-size: 12px; font-weight: 700; color: #fff;">Options (comma-separated)</label>
            <input type="text" id="inp-cf-options" class="form-control" value="${(cf.options || []).join(', ')}" placeholder="e.g. Grade A, Grade B, Grade C" />
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 14px;">
            <button type="button" id="btn-cancel-cf-modal" class="btn btn-secondary">Cancel</button>
            <button type="submit" class="btn btn-primary" style="font-weight: 700;">💾 Save Parameter</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function initManpowerEvents() {
  const refreshView = () => {
    const view = document.getElementById('main-view-container');
    if (view) {
      view.innerHTML = renderManpowerView();
      initManpowerEvents();
    }
  };

  // 1. Tab Switching (In-Place, Zero-Jump)
  document.querySelectorAll('[data-manpower-tab]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      activeManpowerTab = btn.getAttribute('data-manpower-tab');
      state.set('manpowerActiveTab', activeManpowerTab);

      // Update button classes in-place
      document.querySelectorAll('[data-manpower-tab]').forEach(b => {
        if (b.getAttribute('data-manpower-tab') === activeManpowerTab) {
          b.classList.remove('btn-ghost');
          b.classList.add('btn-primary');
        } else {
          b.classList.remove('btn-primary');
          b.classList.add('btn-ghost');
        }
      });

      // Update tab container in-place
      const container = document.getElementById('manpower-tab-container');
      if (container) {
        const stats = employeeService.getManpowerStats();
        const activeEmployees = employeeService.getActiveEmployees();
        const inactiveEmployees = employeeService.getInactiveEmployees();
        const transfers = employeeService.getTransfers();
        const leaves = employeeService.getLeaveRecords();
        const customFields = employeeCustomFieldService.getAllFields();
        const isAdmin = authService.isAdmin();

        container.innerHTML = renderActiveTabContent({ stats, activeEmployees, inactiveEmployees, transfers, leaves, customFields, isAdmin });
        initManpowerEvents();
      } else {
        refreshView();
      }
    });
  });

  // 2. Top Action Buttons
  const btnAdd = document.getElementById('btn-manpower-add-emp');
  if (btnAdd) {
    btnAdd.addEventListener('click', (e) => {
      e.stopPropagation();
      state.set('activeEmployeeModal', { type: 'ADD' });
      refreshView();
    });
  }

  const btnImport = document.getElementById('btn-manpower-import-excel');
  if (btnImport) {
    btnImport.addEventListener('click', (e) => {
      e.stopPropagation();
      state.set('activeEmployeeModal', { type: 'IMPORT' });
      refreshView();
    });
  }

  const btnExport = document.getElementById('btn-manpower-export-excel');
  if (btnExport) {
    btnExport.addEventListener('click', (e) => {
      e.stopPropagation();
      notificationService.withLoading(btnExport, async () => {
        const data = employeeService.exportManpowerData(filterState);
        await excelService.exportToExcel(data, `AlMuslim_Manpower_Roster_${new Date().toISOString().split('T')[0]}.xlsx`);
      }, 'Exporting Workforce...', 'Manpower roster exported to Excel successfully!');
    });
  }

  // 3. Quick Status Toggle (Active <-> Inactive)
  document.querySelectorAll('.btn-emp-quick-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const empId = btn.getAttribute('data-emp-id');
      const targetStatus = btn.getAttribute('data-target-status');
      try {
        employeeService.updateEmployee(empId, { status: targetStatus });
        notificationService.success(`Employee status updated to ${targetStatus}`);
        refreshView();
      } catch (err) {
        notificationService.error('Failed to update status: ' + err.message);
      }
    });
  });

  // 4. Row Action Handlers
  document.querySelectorAll('.btn-emp-card').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const empId = btn.getAttribute('data-emp-id');
      state.set('activeEmployeeModal', { type: 'ID_CARD', employeeId: empId });
      refreshView();
    });
  });

  document.querySelectorAll('.btn-emp-transfer').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const empId = btn.getAttribute('data-emp-id');
      state.set('activeEmployeeModal', { type: 'TRANSFER', employeeId: empId });
      refreshView();
    });
  });

  document.querySelectorAll('.btn-emp-edit').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const empId = btn.getAttribute('data-emp-id');
      state.set('activeEmployeeModal', { type: 'EDIT', employeeId: empId });
      refreshView();
    });
  });

  document.querySelectorAll('.btn-emp-delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const empId = btn.getAttribute('data-emp-id');
      const emp = employeeService.getEmployeeById(empId);
      if (!emp) return;

      const confirmed = await notificationService.confirm({
        title: 'Delete Employee Record',
        message: `Are you sure you want to delete <strong>${emp.name}</strong> [#${emp.cardNumber}]? This action cannot be undone.`,
        icon: '🗑️',
        confirmText: 'Delete Employee',
        isDestructive: true
      });

      if (confirmed) {
        employeeService.deleteEmployee(empId);
        notificationService.success(`Deleted record for ${emp.name}`);
        refreshView();
      }
    });
  });

  // 5. Delete Leave
  document.querySelectorAll('.btn-delete-leave').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-leave-id');
      const confirmed = await notificationService.confirm({
        title: 'Cancel Leave Record',
        message: 'Are you sure you want to cancel this leave record?',
        icon: '🏖️',
        confirmText: 'Cancel Leave',
        isDestructive: true
      });

      if (confirmed) {
        employeeService.deleteLeave(id);
        notificationService.success('Leave record cancelled');
        refreshView();
      }
    });
  });

  // 6. Search & Filter Listeners (Instant Search on Input)
  const inpSearch = document.getElementById('mp-filter-search');
  if (inpSearch) {
    inpSearch.addEventListener('input', (e) => {
      filterState.search = e.target.value;
      refreshView();
    });
  }

  const selDept = document.getElementById('mp-filter-dept');
  if (selDept) {
    selDept.addEventListener('change', (e) => {
      filterState.department = e.target.value;
      refreshView();
    });
  }

  const selDesig = document.getElementById('mp-filter-desig');
  if (selDesig) {
    selDesig.addEventListener('change', (e) => {
      filterState.designation = e.target.value;
      refreshView();
    });
  }

  const selUnit = document.getElementById('mp-filter-unit');
  if (selUnit) {
    selUnit.addEventListener('change', (e) => {
      filterState.unitId = e.target.value;
      filterState.floorId = 'ALL';
      refreshView();
    });
  }

  const selFloor = document.getElementById('mp-filter-floor');
  if (selFloor) {
    selFloor.addEventListener('change', (e) => {
      filterState.floorId = e.target.value;
      refreshView();
    });
  }

  const btnReset = document.getElementById('btn-mp-reset-filters');
  if (btnReset) {
    btnReset.addEventListener('click', (e) => {
      e.stopPropagation();
      filterState = {
        search: '',
        department: 'ALL',
        designation: 'ALL',
        unitId: 'ALL',
        floorId: 'ALL'
      };
      refreshView();
    });
  }

  // 7. Custom Field Handlers
  const btnAddCf = document.getElementById('btn-add-custom-field');
  if (btnAddCf) {
    btnAddCf.addEventListener('click', (e) => {
      e.stopPropagation();
      activeCustomFieldModal = { type: 'ADD' };
      refreshView();
    });
  }

  document.querySelectorAll('.btn-cf-edit').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-cf-id');
      const field = employeeCustomFieldService.getAllFields().find(f => f.id === id);
      if (field) {
        activeCustomFieldModal = { type: 'EDIT', field };
        refreshView();
      }
    });
  });

  document.querySelectorAll('.btn-cf-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-cf-id');
      employeeCustomFieldService.toggleFieldStatus(id);
      notificationService.success('Custom field status updated');
      refreshView();
    });
  });

  document.querySelectorAll('.btn-cf-delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-cf-id');
      const field = employeeCustomFieldService.getAllFields().find(f => f.id === id);
      if (!field) return;

      const confirmed = await notificationService.confirm({
        title: 'Delete Custom Parameter',
        message: `Delete custom parameter <strong>${field.label}</strong>?`,
        icon: '⚙️',
        confirmText: 'Delete Field',
        isDestructive: true
      });

      if (confirmed) {
        employeeCustomFieldService.deleteField(id);
        notificationService.success(`Deleted parameter '${field.label}'`);
        refreshView();
      }
    });
  });

  const btnCloseCfModal = document.getElementById('btn-close-cf-modal');
  const btnCancelCfModal = document.getElementById('btn-cancel-cf-modal');
  const closeCfModal = () => {
    activeCustomFieldModal = null;
    refreshView();
  };
  if (btnCloseCfModal) btnCloseCfModal.addEventListener('click', closeCfModal);
  if (btnCancelCfModal) btnCancelCfModal.addEventListener('click', closeCfModal);

  // Type change in CF Modal
  const inpCfType = document.getElementById('inp-cf-type');
  const optsGroup = document.getElementById('cf-options-group');
  if (inpCfType && optsGroup) {
    inpCfType.addEventListener('change', () => {
      optsGroup.style.display = inpCfType.value === 'DROPDOWN' ? 'block' : 'none';
    });
  }

  // Submit CF Form
  const formCf = document.getElementById('form-cf-designer-submit');
  if (formCf) {
    formCf.addEventListener('submit', (e) => {
      e.preventDefault();
      const label = document.getElementById('inp-cf-label')?.value?.trim();
      const type = document.getElementById('inp-cf-type')?.value;
      const rawOpts = document.getElementById('inp-cf-options')?.value || '';
      const options = rawOpts.split(',').map(s => s.trim()).filter(Boolean);

      if (!label) return;

      if (activeCustomFieldModal.type === 'EDIT') {
        employeeCustomFieldService.updateField(activeCustomFieldModal.field.id, { label, type, options });
        notificationService.success(`Updated parameter '${label}'`);
      } else {
        employeeCustomFieldService.createField({ label, type, options });
        notificationService.success(`Created parameter '${label}'`);
      }

      activeCustomFieldModal = null;
      refreshView();
    });
  }

  // 8. Bind Employee Modal Events (Add, Edit, Transfer, Leave, ID Card, Import)
  initEmployeeModalEvents(() => {
    state.set('activeEmployeeModal', null);
    refreshView();
  });
}
