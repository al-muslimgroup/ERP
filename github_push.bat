@echo off
title Push Updates to GitHub Pages (maint-dept/ERP)
echo =========================================================================
echo    AL-MUSLIM GROUP - ERP GITHUB PAGES SYNC ^& DEPLOYMENT HELPER
echo =========================================================================
echo.

echo [1/3] Mirroring all latest files from public/ to root...
powershell -NoProfile -Command "Copy-Item -Path '%~dp0public\*' -Destination '%~dp0' -Recurse -Force"
if %ERRORLEVEL% equ 0 (
    echo [OK] Files synced to repository root successfully.
) else (
    echo [WARN] Could not mirror all files. Continuing...
)
echo.

echo [2/3] Checking Git installation...
where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [NOTICE] Git command-line tool is not detected in PATH.
    echo.
    echo You have 2 easy options to update https://maint-dept.github.io/ERP/:
    echo.
    echo OPTION A (Web Browser - No installation required):
    echo   1. Open: https://github.com/maint-dept/ERP
    echo   2. Click "Add file" -^> "Upload files"
    echo   3. Drag ^& drop these folders/files from this folder:
    echo      - index.html
    echo      - js (folder)
    echo      - css (folder)
    echo      - lib (folder)
    echo      - public (folder)
    echo   4. Click "Commit changes"
    echo.
    echo OPTION B (Install Git for 1-Click automatic updates):
    echo   1. Download and install Git from: https://git-scm.com/download/win
    echo   2. Run this script (github_push.bat) again!
    echo.
    pause
    exit /b 0
)

echo [3/3] Git found! Deploying latest updates to GitHub...
if not exist "%~dp0.git" (
    echo Initializing local git repository...
    git init
    git branch -M main
    git remote add origin https://github.com/maint-dept/ERP.git
)

git add .
git commit -m "Update ERP system and Firebase cloud synchronization"
git push origin main

echo.
echo =========================================================================
echo  Synchronization complete! 
echo  Your GitHub Pages site will update in 1-2 minutes:
echo  https://maint-dept.github.io/ERP/
echo =========================================================================
echo.
pause
