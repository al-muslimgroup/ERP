# Al-Muslim Group — Garments Factory Maintenance Machine Inventory ERP System

A modern, responsive, web-based **Garments Factory Maintenance Machine Inventory ERP System** for managing machine inventory across multiple factories, units, floors, and production lines under **Al-Muslim Group**.

---

## 🌟 Key Features

### 1. Multi-Unit Factory Hierarchy
- **Group**: Al-Muslim Group
- **Units / Factories**:
  - AKM Knitwear Ltd.
  - Pacific Blue (Jeans Wear) Ltd.
  - Al-Muslim Apparels Ltd.
  - Al-Muslim Garments Accessories Ltd.
- **Floors**: Jamuna, Buriganga, Padma, Titas, Surma, Tista, Sample, Model Line (ETP), Pilot, 5th Floor, etc.
- **Production Lines**: JA-A to Z, JAF-A, JAF-C, JAC-B, etc.
- **Machines**: Overlock (JUKI MO-6800), Plain Lockstitch (JUKI DDL-9000C, Brother S-7200C), Interlock/Flatlock (Yamato VG2700, Pegasus W500PV), Multi-Needle Waistband (Kansai Special DLR-1508P), Bartackers (Brother KE-430FS, JUKI LK-1900BN), Buttonholers (JUKI LBH-1790AN), and more.

### 2. Excel-Like Dynamic Machine Inventory Grid
- **Frozen Columns**: Checkbox, Serial Number, and Machine Name pinned on left during horizontal scrolling.
- **Sticky Table Header**: Header pinned during vertical scrolling.
- **Inline Cell Editing**: Double-click on Status, Remarks, RPM, Gauge, Motor Type, or dynamic custom fields to edit in-place with instant database updates.
- **Multi-Sort & Dynamic Filtering**: Instant search across serial numbers, models, brands, and cascading Unit &rarr; Floor &rarr; Line filters.
- **Multi-Row Selection & Bulk Operations**: Bulk change status, bulk transfer lines, bulk archive, and bulk Excel export.
- **Column Visibility Manager**: Customize which columns appear on screen.

### 3. Dynamic Custom Fields Engine
- Administrators can add new technical parameters (e.g. *Motor HP*, *Voltage*, *RPM*, *Gauge*, *Bed Type*, *Lubrication System*, *Asset Barcode*) without writing a single line of code.
- Custom fields automatically appear in:
  - Add / Edit Machine Forms
  - Excel Grid Columns (with inline editing & sorting)
  - Table Multi-Filters & Global Search
  - Machine Details Specification Sheet
  - Dynamic Excel Template Download (`.xlsx`)
  - Excel Import Parser & Validation Engine
  - Excel Exporter (`.xlsx`)
  - Corporate Branded PDF Reports

### 4. Strict Role-Based Access Control (RBAC) & Backend Scoping
- **Super Admin**: Full unrestricted access across all units and administrative settings.
- **Admin**: Chief Maintenance Engineer (manages inventory, approves requests, exports reports).
- **Maintenance Manager**: Unit-level manager (AKM Knitwear).
- **Maintenance User (Scoped)**: Confined strictly to assigned Units, Floors, and Lines (e.g. *AKM Knitwear Ltd. &rarr; 5th Floor &rarr; Lines JA-A & JA-B*).
  - *Enforced at the SQL query and API layer: Cannot query, view, edit, or import machines outside their assigned scope.*
- **Viewer**: Read-only compliance auditor.

### 5. Multi-Stage Approval Workflow
- When restricted maintenance users modify or add machines, the system generates an **Approval Request** with status `PENDING`.
- Admins review requests in the **Approval Center** with a **Side-by-Side Visual Diff Table** highlighting Old Values (red) vs Proposed New Values (green).
- Admin actions: **Approve** (commits official changes to live database), **Reject**, or **Request Revision** with remarks.

### 6. Excel Import & Export Engine
- **Download Dynamic Template**: Generates an `.xlsx` template formatted with current master data and dynamic custom fields.
- **Pre-Import Validation**: Validates required fields, checks unit/floor/line integrity, and detects duplicate serial numbers before importing.
- **Summary Metrics**: Total Rows, Valid Rows, Invalid Rows, and Duplicate Rows breakdown.
- **Excel Export**: Exports filtered data into `.xlsx` spreadsheets.

### 7. Corporate Branded PDF Reports
- Generates formatted printable landscape PDF documents featuring **Al-Muslim Group branding**, **Maintenance Department metadata**, filter parameters, serial numbers, locations, mechanical specifications, and authorized signature section.

---

## 🚀 Getting Started

### 1. Start Server
Run the Windows startup batch script:
```cmd
start.bat
```
Or run directly with `agy-node`:
```cmd
agy-node server/index.js
```

### 2. Access the Application
Open your browser and navigate to:
```
http://localhost:3030
```

---

## 🔑 Pre-Configured Demo Accounts (1-Click Switcher in UI)

| Username | Password | Role | Assigned Location Scope |
| :--- | :--- | :--- | :--- |
| `superadmin` | `admin123` | **Super Admin** | Unrestricted (All 4 Units) |
| `admin` | `admin123` | **Admin** | Unrestricted (Chief Engineer) |
| `manager` | `admin123` | **Maintenance Manager** | AKM Knitwear Ltd. |
| `user_akm` | `user123` | **Maintenance User** | **AKM Knitwear &rarr; 5th Floor &rarr; Lines JA-A & JA-B** |
| `viewer` | `user123` | **Viewer** | Read-only compliance access |

---

## 📂 Project Architecture

```
ERP/
├── package.json               # Project manifest
├── start.bat                  # One-click Windows startup script
├── README.md                  # System documentation
├── data/
│   └── erp_inventory.db       # Native SQLite database
├── server/
│   ├── index.js               # Main HTTP REST server entrypoint
│   ├── config.js              # Server configuration & constants
│   ├── db/
│   │   ├── schema.js          # SQLite DDL schema & indexes
│   │   ├── database.js        # node:sqlite DatabaseSync wrapper
│   │   └── seed.js            # Al-Muslim Group demo dataset
│   ├── middleware/
│   │   ├── auth.js            # Token authentication & session
│   │   └── rbac.js            # Granular Unit/Floor/Line scoping middleware
│   ├── routes/
│   │   ├── auth.js            # Authentication endpoints
│   │   ├── machines.js        # Machine inventory CRUD & dynamic custom fields
│   │   ├── masterData.js      # Units, Floors, Lines, Brands, Models
│   │   ├── customFields.js    # Dynamic custom fields builder
│   │   ├── approvals.js       # Approval workflow & side-by-side diffs
│   │   ├── transfers.js       # Machine location transfers
│   │   ├── users.js           # User management & permission matrix
│   │   ├── reports.js         # Report metrics & missing info audit
│   │   ├── auditLogs.js       # Searchable audit trail
│   │   ├── notifications.js   # In-app notifications
│   │   ├── settings.js        # System settings & approval policies
│   │   └── io.js              # Excel template, import validation & commit
│   ├── utils/
│   │   └── audit.js           # Audit logger utility
│   ├── verify_system.js       # System automated verification suite
│   └── test_workflow.js       # End-to-end approval lifecycle test
└── public/
    ├── index.html             # Core Single Page Application (SPA)
    ├── css/
    │   └── app.css            # Excel table styling, freeze panes & print layout
    └── js/
        ├── app.js             # Main SPA controller & router
        ├── api.js             # REST API client
        ├── state.js           # Global reactive state store
        ├── utils/
        │   ├── helpers.js     # Status badges, QR/Barcode SVG, toasts
        │   ├── excelExport.js # Client/Server Excel generator (SheetJS)
        │   └── pdfExport.js   # Corporate branded PDF generator
        └── components/
            ├── navbar.js      # Top header with 1-click role switcher
            ├── sidebar.js     # Navigation sidebar
            ├── landingPage.js  # Public portal
            ├── dashboard.js   # KPI cards & Chart.js visualizations
            ├── inventoryTable.js # Excel-like table with frozen columns
            ├── machineModal.js   # Add/Edit machine modal
            ├── machineDetails.js # Specs drawer with QR code & timeline
            ├── transferModal.js  # Machine transfer dialog
            ├── approvalCenter.js # Visual diff approval center
            ├── masterDataView.js # Plant hierarchy tree & CRUD
            ├── customFieldsMgr.js# Dynamic custom fields builder
            ├── userManagement.js # Granular RBAC & scoping matrix
            ├── excelImportModal.js# Excel import wizard & validator
            ├── reportsView.js    # Reports suite with PDF/Excel export
            ├── auditLogsView.js  # Searchable audit trail
            ├── settingsView.js   # System settings & policies
            └── notifications.js  # Notification drawer
```

---

## 📄 License
Enterprise Software — Built for **Al-Muslim Group Maintenance & Engineering Department**.
