@echo off
chcp 65001 >nul
title SkinCare Web Client

cd /d "%~dp0web-client"

echo Current folder:
cd
echo.

npm run dev

pause