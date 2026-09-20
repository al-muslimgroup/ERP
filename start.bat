@echo off
title Al-Muslim Group Maintenance Machine ERP System
echo =========================================================================
echo    AL-MUSLIM GROUP - GARMENTS FACTORY MAINTENANCE MACHINE ERP
echo =========================================================================
echo.
echo Starting web server on http://localhost:3030 ...
echo.

where node >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Using Node.js runtime...
    node "%~dp0server.js"
) else (
    echo Using PowerShell HttpListener runtime...
    powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1" -Port 3030
)

pause
