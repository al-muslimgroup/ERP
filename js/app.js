/**
 * Al-Muslim Group Garments Factory Maintenance Machine ERP
 * Main Single Page Application (SPA) Controller & Router
 * Enhanced with Global Scroll & Focus State Preservation Engine (Zero Jitter, Zero Scroll Loss)
 */

import { state } from './state.js';
import { storage } from './db/storage.js';
import { authService } from './services/authService.js';
import { renderNavbar, initNavbarEvents } from './components/navbar.js';
import { renderSidebar, initSidebarEvents, updateSidebarActiveState } from './components/sidebar.js';
import { renderHomepageView, initHomepageEvents } from './components/homepageView.js';
import { renderLoginView, initLoginViewEvents } from './components/loginView.js';
import { renderDashboard, initDashboardEvents } from './components/dashboard.js';
import { renderInventoryTable, initInventoryTableEvents, syncInventorySelectionDOM } from './components/inventoryTable.js';
import { renderMachineModal, initMachineModalEvents } from './components/machineModal.js';
import { renderMachineDetails, initMachineDetailsEvents } from './components/machineDetails.js';
import { renderTransferModal, initTransferModalEvents } from './components/transferModal.js';
import { renderTransferDetailsModal, initTransferDetailsModalEvents } from './components/transferDetailsModal.js';
import { renderTransfersView, initTransfersViewEvents } from './components/transfersView.js';
import { renderTransferWorkflowBuilder, initTransferWorkflowBuilderEvents } from './components/transferWorkflowBuilder.js';
import { renderMasterDataView, initMasterDataEvents } from './components/masterDataView.js';
import { renderCustomFieldsMgr, initCustomFieldsEvents } from './components/customFieldsMgr.js';
import { renderExcelManagerView, initExcelManagerEvents } from './components/excelManagerView.js';
import { renderUserManagement, initUserManagementEvents } from './components/userManagement.js';
import { renderHomepageManagerView, initHomepageManagerEvents } from './components/homepageManagerView.js?v=3.8.5';
import { renderEmailConfigView, initEmailConfigEvents } from './components/emailConfigView.js';
import { renderExcelImportModal, initExcelImportEvents } from './components/excelImportModal.js';
import { renderReportsView, initReportsEvents } from './components/reportsView.js';
import { renderAuditLogsView, initAuditLogsEvents } from './components/auditLogsView.js';
import { renderNotificationsDrawer, initNotificationsDrawerEvents } from './components/notificationsDrawer.js?v=3.2.0';
import { renderSettingsView, initSettingsEvents } from './components/settingsView.js';
import { renderResourceLibraryView, initResourceLibraryEvents } from './components/resourceLibraryView.js';
import { renderColumnVisibilityModal, initColumnVisibilityEvents } from './components/columnVisibilityModal.js';
import { renderMachineHistoryView, initMachineHistoryEvents } from './components/machineHistoryView.js';
import { renderSparePartsManagementView, initSparePartsManagementEvents } from './components/sparePartsManagementView.js';
import { renderToolsManagementView, initToolsManagementEvents } from './components/toolsManagementView.js?v=4.4.5';
import { renderManpowerView, initManpowerEvents } from './components/manpowerView.js';
import { renderEtLabManagementView, initEtLabEvents, setEntActiveTab } from './components/etLabManagementView.js';
import { renderChangePasswordModal, initChangePasswordModalEvents } from './components/changePasswordModal.js?v=3.8.0';
import { renderStorageView, initStorageEvents } from './components/storageView.js';
import { renderPreventiveMaintenanceView, initPreventiveMaintenanceEvents } from './components/preventiveMaintenanceView.js?v=2.6.5';
import { smartStorageService } from './services/smartStorageService.js';
import { renderRelocateView, initRelocateViewEvents } from './components/relocateView.js?v=4.6.6';
import { renderQrCodeView, initQrCodeEvents } from './components/qrCodeView.js?v=4.6.6';
import { chatService } from './services/chatService.js';

/**
 * Captures all active scroll, viewport, and focused input states
 */
function captureAppState() {
  const container = document.getElementById('main-view-container');
  const sidebar = document.querySelector('.sidebar-menu');
  const pageView = document.querySelector('.page-view');
  const grid = document.querySelector('.excel-grid-container, .table-responsive, .history-content-area, .master-data-content, #reports-tab-content');
  const activeEl = document.activeElement;

  return {
    windowY: window.scrollY,
    windowX: window.scrollX,
    sidebarY: sidebar ? sidebar.scrollTop : 0,
    containerY: container ? container.scrollTop : 0,
    containerX: container ? container.scrollLeft : 0,
    pageViewY: pageView ? pageView.scrollTop : 0,
    pageViewX: pageView ? pageView.scrollLeft : 0,
    gridY: grid ? grid.scrollTop : 0,
    gridX: grid ? grid.scrollLeft : 0,
    focusedId: activeEl && activeEl.id ? activeEl.id : null,
    selectionStart: activeEl && typeof activeEl.selectionStart === 'number' ? activeEl.selectionStart : null,
    selectionEnd: activeEl && typeof activeEl.selectionEnd === 'number' ? activeEl.selectionEnd : null
  };
}

/**
 * Restores exact scroll, viewport, and focused input states with zero layout shifting
 */
function restoreAppState(saved) {
  if (!saved) return;

  const apply = () => {
    if (saved.windowY > 0 || saved.windowX > 0) {
      window.scrollTo(saved.windowX, saved.windowY);
      if (document.documentElement) document.documentElement.scrollTop = saved.windowY;
      if (document.body) document.body.scrollTop = saved.windowY;
    }

    const sidebar = document.querySelector('.sidebar-menu');
    if (sidebar && saved.sidebarY > 0) {
      sidebar.scrollTop = saved.sidebarY;
    }

    const container = document.getElementById('main-view-container');
    if (container) {
      if (saved.containerY > 0) container.scrollTop = saved.containerY;
      if (saved.containerX > 0) container.scrollLeft = saved.containerX;
    }

    const pageView = document.querySelector('.page-view');
    if (pageView) {
      if (saved.pageViewY > 0) pageView.scrollTop = saved.pageViewY;
      if (saved.pageViewX > 0) pageView.scrollLeft = saved.pageViewX;
    }

    const grid = document.querySelector('.excel-grid-container, .table-responsive, .history-content-area, .master-data-content, #reports-tab-content');
    if (grid) {
      if (saved.gridY > 0) grid.scrollTop = saved.gridY;
      if (saved.gridX > 0) grid.scrollLeft = saved.gridX;
    }

    if (saved.focusedId) {
      const el = document.getElementById(saved.focusedId);
      if (el && typeof el.focus === 'function' && document.activeElement !== el) {
        try {
          el.focus({ preventScroll: true });
          if (typeof saved.selectionStart === 'number' && typeof saved.selectionEnd === 'number' && typeof el.setSelectionRange === 'function') {
            el.setSelectionRange(saved.selectionStart, saved.selectionEnd);
          }
        } catch (e) { }
      }
    }
  };

  apply();
  requestAnimationFrame(apply);
}

class ERPApplication {
  init() {
    // Check saved theme
    const savedTheme = localStorage.getItem('al_muslim_theme');
    if (savedTheme === 'light') {
      document.body.classList.add('theme-light');
    }

    console.log('Starting Al-Muslim Group Garments Maintenance ERP Application...');
    this.render();
    this.bindEvents();

    // Global State & Event Subscriptions
    state.on('change:currentView', (view) => this.switchView(view));
    state.on('change:activeModal', () => this.renderModalsOnly());
    state.on('change:masterDataActiveTab', () => this.renderMainContent());
    state.on('filters:changed', () => this.renderMainContent());
    state.on('columns:changed', () => this.renderMainContent());
    state.on('inventory:updated', () => this.renderMainContent());
    state.on('change:agentPanelOpen', () => this.renderAgentPanel());

    window.addEventListener('erp:relocate-updated', () => {
      if (state.get('currentView') === 'relocate') {
        this.renderMainContent();
      }
    });

    // Selection changed handled in-place with instant DOM sync without destroying table DOM or resetting scroll
    state.on('selection:changed', (selList) => {
      try {
        syncInventorySelectionDOM(selList);
      } catch (e) {
        console.error('Error syncing inventory selection:', e);
      }
    });

    window.addEventListener('erp:notification', (e) => {
      this.showToast('🔔 ' + e.detail.title, e.detail.message, 'info');
      this.renderMainContent();
    });

    window.addEventListener('erp:fields-updated', () => {
      this.renderMainContent();
    });

    window.addEventListener('erp:excel-structure-updated', () => {
      this.renderMainContent();
    });

    window.addEventListener('erp:master-data-updated', () => {
      this.renderMainContent();
    });

    window.addEventListener('erp:et-lab-updated', () => {
      this.renderMainContent();
    });

    window.addEventListener('erp:storage-updated', () => {
      this.renderMainContent();
    });

    window.addEventListener('erp:preventive-maintenance-updated', () => {
      this.renderMainContent();
    });

    window.addEventListener('erp:audit-logs-updated', () => {
      this.renderMainContent();
    });

    window.__appLoaded = true;

    // Initialize Agent Chat Service (loads from localStorage + server)
    chatService.init().catch(e => console.warn('ChatService init notice:', e.message));

    // Ensure base URL reflects #dashboard or #login depending on active session
    if (typeof window !== 'undefined' && window.location) {
      const hash = window.location.hash ? window.location.hash.replace(/^#/, '').trim() : '';
      if (!hash) {
        try {
          const defaultHash = authService.isAuthenticated() ? 'dashboard' : 'login';
          window.history.replaceState({ view: defaultHash }, '', `#${defaultHash}`);
        } catch (_) { }
      }
    }

    console.log('Al-Muslim Group Garments Maintenance ERP loaded successfully.');
  }

  render() {
    try {
      const root = document.getElementById('app-root');
      if (!root) return;

      const currentUser = authService.getCurrentUser();
      let currentView = state.get('currentView') || (currentUser ? 'dashboard' : 'login');

      // Security Gate: Protect internal ERP shell from unauthenticated access
      if (!currentUser && currentView !== 'home' && currentView !== 'login') {
        state.set('currentView', 'login');
        return;
      }

      // 1. Standalone View: Public Homepage
      if (currentView === 'home') {
        root.innerHTML = `
          <div id="home-root-container">
            ${renderHomepageView()}
          </div>
          <div id="modal-layer">
            ${this.getActiveModalHtml()}
          </div>
          <div id="toast-root" class="toast-container"></div>
        `;
        initHomepageEvents();
        this.initModalEvents();
        return;
      }

      // 2. Standalone View: Dedicated Login & Password Recovery Page
      if (currentView === 'login') {
        root.innerHTML = `
          <div id="login-root-container">
            ${renderLoginView()}
          </div>
          <div id="modal-layer">
            ${this.getActiveModalHtml()}
          </div>
          <div id="toast-root" class="toast-container"></div>
        `;
        initLoginViewEvents();
        this.initModalEvents();
        return;
      }

      // 3. Authenticated ERP Shell Layout (Sidebar + Navbar + View)
      const savedState = captureAppState();

      root.innerHTML = `
        <div class="app-container">
          <!-- Sidebar Mobile Backdrop -->
          <div id="sidebar-backdrop" class="sidebar-backdrop"></div>

          <!-- Sidebar Navigation -->
          <div id="sidebar-container" style="display: flex;">
            ${renderSidebar()}
          </div>

          <!-- Main Content Layout -->
          <main class="app-main">
            <!-- Top Header Navigation with Role Switcher & User Guide -->
            <div id="navbar-container">
              ${renderNavbar()}
            </div>

            <!-- Active Page View Container (Always vertically scrollable with native high-contrast scrollbar) -->
            <div id="main-view-container" style="flex: 1; display: flex; flex-direction: column; min-height: 0; min-width: 0; overflow-y: auto; overflow-x: hidden;">
              ${this.getActiveViewHtml()}
            </div>
          </main>

          <!-- Modals & Drawers Container -->
          <div id="modal-layer">
            ${this.getActiveModalHtml()}
          </div>

          <!-- Toast Notifications Container -->
          <div id="toast-root" class="toast-container"></div>
        </div>
      `;

      window.__appLoaded = true;
      this.initComponentEvents();

      // Restore scroll and viewport positions
      restoreAppState(savedState);

    } catch (err) {
      console.error('Fatal render error:', err);
      if (typeof window.__showStartupError === 'function') {
        window.__showStartupError('Rendering Error', err.message);
      }
    }
  }

  /**
   * Fast, ultra-smooth view transition that preserves scroll & avoids layout shifts
   */
  switchView(newView) {
    try {
      // Security Gate: Redirect unauthenticated requests to login
      if (!authService.getCurrentUser() && newView !== 'home' && newView !== 'login') {
        newView = 'login';
        state.set('currentView', 'login');
      }

      // If entering or leaving standalone views (home or login), do full render
      const isStandaloneTarget = newView === 'home' || newView === 'login';
      const isCurrentlyStandalone = !document.getElementById('sidebar-container');

      if (isStandaloneTarget || isCurrentlyStandalone) {
        try {
          if (window.history && window.history.pushState) {
            window.history.pushState({ view: newView }, '', `#${newView}`);
          }
        } catch (e) { }
        this.render();
        return;
      }

      // 1. Update active sidebar item and parent accordion in-place
      updateSidebarActiveState(newView);
      // 2. Update navbar title & header
      this.renderNavbarOnly();
      // 3. Render main page content with clean scroll reset
      this.renderMainContent(false);

      // Sync browser history state smoothly
      try {
        if (window.history && window.history.pushState) {
          window.history.pushState({ view: newView }, '', `#${newView}`);
        }
      } catch (e) { }

    } catch (err) {
      console.error('Error during smooth view transition:', err);
      this.render();
    }
  }

  renderNavbarOnly() {
    try {
      const navContainer = document.getElementById('navbar-container');
      if (navContainer) {
        navContainer.innerHTML = renderNavbar();
        initNavbarEvents();
      }
    } catch (err) {
      console.error('Error rendering navbar:', err);
    }
  }

  renderMainContent(preserveScroll = true) {
    try {
      const container = document.getElementById('main-view-container');
      if (container) {
        const savedState = preserveScroll ? captureAppState() : null;
        container.innerHTML = this.getActiveViewHtml();
        this.initViewEvents();
        if (preserveScroll && savedState) {
          restoreAppState(savedState);
        } else {
          container.scrollTop = 0;
          container.scrollLeft = 0;
          const pv = container.querySelector('.page-view');
          if (pv) {
            pv.scrollTop = 0;
            pv.scrollLeft = 0;
          }
        }
      }
    } catch (err) {
      console.error('Error rendering main content view:', err);
    }
  }

  renderModalsOnly() {
    try {
      const modalLayer = document.getElementById('modal-layer');
      if (modalLayer) {
        modalLayer.innerHTML = this.getActiveModalHtml();
        this.initModalEvents();
      }
    } catch (err) {
      console.error('Error rendering modals:', err);
    }
  }

  getActiveViewHtml() {
    try {
      const currentView = state.get('currentView') || 'dashboard';

      // Check module access authorization
      const viewToModuleMap = {
        'dashboard': 'dashboard',
        'inventory': 'machines',
        'relocate': 'relocate',
        'qr-codes': 'machines',
        'transfers': 'transfers',
        'machine-history': 'machine_history',
        'preventive-maintenance': 'preventive_maintenance',
        'reports': 'reports',
        'transfer-workflows': 'transfer_workflows',
        'excel-manager': 'excel_manager',
        'custom-fields': 'custom_fields',
        'et-lab': 'et_lab',
        'spare-parts': 'spare_parts',
        'tools-management': 'tools_management',
        'storage': 'storage',
        'manpower': 'manpower',
        'master-data': 'master_data',
        'users': 'user_management',
        'homepage-manager': 'homepage_management',
        'email-config': 'email_config',
        'audit-logs': 'audit_logs',
        'settings': 'settings',
        'resource-library': 'document_library'
      };

      const requiredModule = viewToModuleMap[currentView];
      if (requiredModule && !authService.isModuleAllowed(requiredModule)) {
        return `
          <div class="page-view" style="display: flex; align-items: center; justify-content: center; min-height: 60vh;">
            <div style="background: var(--bg-surface); border: 1.5px solid rgba(239, 68, 68, 0.4); border-radius: var(--radius-xl); padding: 40px; text-align: center; max-width: 500px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
              <div style="font-size: 48px; margin-bottom: 14px;">🚫</div>
              <h2 style="font-size: 18px; font-weight: 800; color: #f87171; margin-bottom: 8px;">
                Access Denied: Module Restricted
              </h2>
              <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px;">
                Your account (<strong>${authService.getCurrentUser()?.username}</strong>) does not have permission to access the <strong>${currentView.toUpperCase()}</strong> module. Contact the system administrator to configure individual access permissions.
              </p>
              <button onclick="state.set('currentView', 'dashboard')" class="btn btn-primary btn-sm">
                Return to Dashboard
              </button>
            </div>
          </div>
        `;
      }

      switch (currentView) {
        case 'home':
          return renderHomepageView();
        case 'login':
          return renderLoginView();
        case 'dashboard':
          return renderDashboard();
        case 'inventory':
          return renderInventoryTable();
        case 'relocate':
          return renderRelocateView();
        case 'qr-codes':
          return renderQrCodeView();
        case 'transfers':
          return renderTransfersView();
        case 'machine-history':
          return renderMachineHistoryView();
        case 'preventive-maintenance':
          return renderPreventiveMaintenanceView();
        case 'transfer-workflows':
          return renderTransferWorkflowBuilder();
        case 'reports':
          return renderReportsView();
        case 'resource-library':
          return renderResourceLibraryView();
        case 'excel-manager':
          return renderExcelManagerView();
        case 'custom-fields':
          setTimeout(() => state.set('currentView', 'inventory'), 0);
          return renderInventoryTable();
        case 'et-lab':
          return renderEtLabManagementView();
        case 'spare-parts':
          setEntActiveTab('spare-parts');
          return renderEtLabManagementView();
        case 'tools-management':
          return renderToolsManagementView();
        case 'storage':
          return renderStorageView();
        case 'manpower':
          return renderManpowerView();
        case 'master-data':
          return renderMasterDataView();
        case 'users':
          return renderUserManagement();
        case 'homepage-manager':
          return renderHomepageManagerView();
        case 'email-config':
          return renderEmailConfigView();
        case 'audit-logs':
          return renderAuditLogsView();
        case 'settings':
          return renderSettingsView();
        default:
          return renderDashboard();
      }
    } catch (viewErr) {
      console.error('Component render error:', viewErr);
      return `
        <div style="padding: 30px; text-align: center; background: var(--bg-surface); border: 1px solid #ef4444; border-radius: var(--radius-lg); margin: 20px;">
          <div style="font-size: 32px; margin-bottom: 8px;">⚠️</div>
          <h3 style="color: #f87171; font-weight: 700; margin-bottom: 8px;">View Render Notice</h3>
          <p style="color: var(--text-secondary); font-size: 13px; margin-bottom: 14px;">An error occurred while loading this view: ${viewErr.message}</p>
          <button onclick="state.set('currentView', 'dashboard')" class="btn btn-primary btn-sm">Return to Dashboard</button>
        </div>
      `;
    }
  }

  getActiveModalHtml() {
    const activeModal = state.get('activeModal');
    switch (activeModal) {
      case 'change-password':
        return renderChangePasswordModal();
      case 'machine-form':
      case 'add-machine':
      case 'edit-machine':
        return renderMachineModal();
      case 'machine-details':
        return renderMachineDetails();
      case 'transfer-machine':
        return renderTransferModal();
      case 'transfer-details':
        return renderTransferDetailsModal();
      case 'import-excel':
        return renderExcelImportModal();
      case 'column-visibility':
        return renderColumnVisibilityModal();
      case 'notifications':
        return renderNotificationsDrawer();
      default:
        return '';
    }
  }

  initComponentEvents() {
    initNavbarEvents();
    initSidebarEvents();
    this.initViewEvents();
    this.initModalEvents();
  }

  initViewEvents() {
    const currentView = state.get('currentView') || 'dashboard';
    switch (currentView) {
      case 'dashboard':
        initDashboardEvents();
        break;
      case 'inventory':
        initInventoryTableEvents();
        break;
      case 'relocate':
        initRelocateViewEvents();
        break;
      case 'qr-codes':
        initQrCodeEvents();
        break;
      case 'transfers':
        initTransfersViewEvents();
        break;
      case 'machine-history':
        initMachineHistoryEvents();
        break;
      case 'preventive-maintenance':
        initPreventiveMaintenanceEvents();
        break;
      case 'transfer-workflows':
        initTransferWorkflowBuilderEvents();
        break;
      case 'reports':
        initReportsEvents();
        break;
      case 'resource-library':
        initResourceLibraryEvents();
        break;
      case 'excel-manager':
        initExcelManagerEvents();
        break;
      case 'custom-fields':
        initInventoryTableEvents();
        break;
      case 'et-lab':
      case 'spare-parts':
        initEtLabEvents();
        break;
      case 'tools-management':
        initToolsManagementEvents();
        break;
      case 'storage':
        initStorageEvents();
        break;
      case 'manpower':
        initManpowerEvents();
        break;
      case 'master-data':
        initMasterDataEvents();
        break;
      case 'users':
        initUserManagementEvents();
        break;
      case 'homepage-manager':
        initHomepageManagerEvents();
        break;
      case 'email-config':
        initEmailConfigEvents();
        break;
      case 'audit-logs':
        initAuditLogsEvents();
        break;
      case 'settings':
        initSettingsEvents();
        break;
    }
  }

  initModalEvents() {
    const activeModal = state.get('activeModal');
    switch (activeModal) {
      case 'change-password':
        initChangePasswordModalEvents();
        break;
      case 'machine-form':
      case 'add-machine':
      case 'edit-machine':
        initMachineModalEvents();
        break;
      case 'machine-details':
        initMachineDetailsEvents();
        break;
      case 'transfer-machine':
        initTransferModalEvents();
        break;
      case 'transfer-details':
        initTransferDetailsModalEvents();
        break;
      case 'import-excel':
        initExcelImportEvents();
        break;
      case 'column-visibility':
        initColumnVisibilityEvents();
        break;
      case 'notifications':
        initNotificationsDrawerEvents();
        break;
      case 'user-perms-modal':
      case 'reset-password-modal':
        initUserManagementEvents();
        break;
    }
  }

  bindEvents() {
    // 1. Global anchor navigation safety: intercept all unhandled href="#" or empty href clicks to prevent window scroll jumping
    window.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) {
        const href = link.getAttribute('href');
        if (!href || href === '#' || href === 'javascript:void(0)') {
          e.preventDefault();
        }
      }
    }, { capture: true });

    // 2. Escape key closes modals safely without modifying page scroll
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        state.set('activeModal', null);
        const appContainer = document.querySelector('.app-container');
        if (appContainer && appContainer.classList.contains('sidebar-mobile-open')) {
          appContainer.classList.remove('sidebar-mobile-open');
        }
      }
    });

    // 2.1 Mobile Sidebar Drawer Toggle & Backdrop Handlers
    document.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('#btn-mobile-sidebar-toggle');
      if (toggleBtn) {
        e.preventDefault();
        e.stopPropagation();
        const appContainer = document.querySelector('.app-container');
        if (appContainer) {
          appContainer.classList.toggle('sidebar-mobile-open');
        }
        return;
      }

      const closeBtn = e.target.closest('#btn-sidebar-mobile-close');
      if (closeBtn) {
        e.preventDefault();
        e.stopPropagation();
        const appContainer = document.querySelector('.app-container');
        if (appContainer) {
          appContainer.classList.remove('sidebar-mobile-open');
        }
        return;
      }

      const backdrop = e.target.closest('#sidebar-backdrop');
      if (backdrop) {
        e.preventDefault();
        e.stopPropagation();
        const appContainer = document.querySelector('.app-container');
        if (appContainer) {
          appContainer.classList.remove('sidebar-mobile-open');
        }
        return;
      }
    });

    // 2.2 Auto-close mobile drawer when window resized past mobile breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 992) {
        const appContainer = document.querySelector('.app-container');
        if (appContainer && appContainer.classList.contains('sidebar-mobile-open')) {
          appContainer.classList.remove('sidebar-mobile-open');
        }
      }
    });

    // 3. Browser Back / Forward & Hash Navigation Support
    window.addEventListener('popstate', (e) => {
      const targetView = (e.state && e.state.view) ? e.state.view : (window.location.hash ? window.location.hash.replace(/^#/, '').trim() : '');
      const viewToLoad = targetView || 'dashboard';
      state.set('currentView', viewToLoad);
      this.switchView(viewToLoad);
    });

    window.addEventListener('hashchange', () => {
      const h = window.location.hash ? window.location.hash.replace(/^#/, '').trim() : '';
      const viewToLoad = h || 'dashboard';
      state.set('currentView', viewToLoad);
      this.switchView(viewToLoad);
    });

    const resetSeedBtn = document.getElementById('btn-quick-seed');
    if (resetSeedBtn) {
      resetSeedBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all data back to the original demo dataset? All manual edits will be re-seeded.')) {
          storage.clearAll();
          window.location.reload();
        }
      });
    }
  }

  showToast(title, message, type = 'info') {
    const root = document.getElementById('toast-root');
    if (!root) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    `;

    root.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}

// Instantiate and initialize global app singleton
export const app = new ERPApplication();
if (typeof window !== 'undefined') {
  window.app = app;
}
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
