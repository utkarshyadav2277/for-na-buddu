@echo off
title Cheer Up Bachaa - Sunflower Garden
cd /d "%~dp0"
echo Starting Sunflower Garden...

:: Check if server is running on port 8000, if not start it in background
powershell -Command "if (-not (Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue)) { Start-Process python -ArgumentList 'server.py' -WindowStyle Hidden }"
timeout /t 1 >nul

:: Open cheer directly in user's browser
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" "http://localhost:8000/cheer/index.html"
    exit /b
)
if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" "http://localhost:8000/cheer/index.html"
    exit /b
)
start "" "http://localhost:8000/cheer/index.html"
