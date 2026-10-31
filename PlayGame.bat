@echo off
title Purrfect Sweet Dreams Launcher
cd /d "%~dp0"
echo Starting game server and opening browser...
powershell -Command "if (-not (Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue)) { Start-Process python -ArgumentList 'server.py' -WindowStyle Hidden }"
timeout /t 1 >nul
if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" "http://localhost:8000"
    exit /b
)
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" "http://localhost:8000"
    exit /b
)
start "" "http://localhost:8000"
