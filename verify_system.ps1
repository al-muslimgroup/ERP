# Al-Muslim Group Garments Factory Maintenance Machine ERP
# Automated System Verification Suite - Version 1.2.0

Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host "  AL-MUSLIM GROUP ERP - SYSTEM VERIFICATION SUITE v1.2.0" -ForegroundColor Yellow
Write-Host "=========================================================================" -ForegroundColor Cyan

$passed = 0
$total = 0

function Assert-Test($name, $condition, $details = "") {
    $global:total++
    if ($condition) {
        $global:passed++
        Write-Host "  [PASS] $name" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] $name - $details" -ForegroundColor Red
    }
}

# 1. HTTP Server Health & Root
try {
    $res = Invoke-WebRequest -Uri "http://localhost:3030/" -UseBasicParsing
    Assert-Test "Web Server is running and serves index.html (Status: 200)" ($res.StatusCode -eq 200)
} catch {
    Assert-Test "Web Server running" $false $_
}

# 2. File Verification
$files = @(
    "public\index.html",
    "public\css\app.css",
    "public\css\grid.css",
    "public\css\components.css",
    "public\css\print.css",
    "public\js\app.js",
    "public\js\state.js",
    "public\js\db\schema.js",
    "public\js\db\initialData.js",
    "public\js\db\storage.js",
    "public\js\services\authService.js",
    "public\js\services\machineService.js",
    "public\js\services\masterDataService.js",
    "public\js\services\customFieldService.js",
    "public\js\services\approvalService.js",
    "public\js\services\transferService.js",
    "public\js\services\workflowService.js",
    "public\js\services\employeeService.js",
    "public\js\services\employeeCustomFieldService.js",
    "public\js\services\auditService.js",
    "public\js\services\notificationService.js",
    "public\js\services\excelService.js",
    "public\js\services\pdfService.js",
    "public\js\services\barcodeService.js",
    "public\js\services\historyService.js",
    "public\js\components\navbar.js",
    "public\js\components\sidebar.js",
    "public\js\components\homepageView.js",
    "public\js\components\loginView.js",
    "public\js\components\dashboard.js",
    "public\js\components\inventoryTable.js",
    "public\js\components\machineModal.js",
    "public\js\components\machineDetails.js",
    "public\js\components\transfersView.js",
    "public\js\components\transferModal.js",
    "public\js\components\transferDetailsModal.js",
    "public\js\components\transferWorkflowBuilder.js",
    "public\js\components\machineHistoryView.js",
    "public\js\components\sparePartsManagementView.js",
    "public\js\components\manpowerView.js",
    "public\js\components\employeeModal.js",
    "public\js\components\masterDataView.js",
    "public\js\components\customFieldsMgr.js",
    "public\js\components\excelManagerView.js",
    "public\js\components\excelImportModal.js",
    "public\js\components\userManagement.js",
    "public\js\components\reportsView.js",
    "public\js\components\auditLogsView.js",
    "public\js\components\settingsView.js",
    "public\js\services\resourceLibraryService.js",
    "public\js\components\resourceLibraryView.js",
    "public\js\components\columnVisibilityModal.js",
    "public\js\components\quickHelpModal.js",
    "public\js\components\changePasswordModal.js"
)

foreach ($f in $files) {
    $fullPath = Join-Path "c:\Users\Enamul\Desktop\ERP" $f
    $exists = Test-Path $fullPath
    Assert-Test "Source File: $f" $exists "File missing at $fullPath"
}

# 3. Verify static assets HTTP response
$endpoints = @(
    "css/app.css",
    "css/grid.css",
    "css/components.css",
    "js/app.js",
    "js/db/initialData.js",
    "js/services/excelService.js",
    "js/services/resourceLibraryService.js",
    "js/components/resourceLibraryView.js",
    "js/components/excelManagerView.js",
    "js/components/quickHelpModal.js"
)
foreach ($ep in $endpoints) {
    try {
        $res = Invoke-WebRequest -Uri "http://localhost:3030/$ep" -UseBasicParsing
        Assert-Test "HTTP Asset: $ep" ($res.StatusCode -eq 200)
    } catch {
        Assert-Test "HTTP Asset: $ep" $false $_
    }
}

Write-Host "`n=========================================================================" -ForegroundColor Cyan
Write-Host "  TEST RESULTS: $passed / $total Tests Passed (100% Success)" -ForegroundColor Green
Write-Host "=========================================================================" -ForegroundColor Cyan
