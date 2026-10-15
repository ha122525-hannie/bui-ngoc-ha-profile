@echo off
title BUI NGOC HA - Web Profile Local Launcher
echo ====================================================
echo  Khoi dong Website Profile Sinh Vien BUI NGOC HA...
echo ====================================================
python run.py
if %ERRORLEVEL% NEQ 0 (
    echo Python khong co san trong PATH, thu goi python3...
    python3 run.py
)
pause
