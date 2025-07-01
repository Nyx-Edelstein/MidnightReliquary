@echo off
REM Worldbuilding Integration - File Movement Script
REM Moves processed files from data-parsed to data and clears tracking file

echo Starting worldbuilding file movement process...

set "BASE_DIR=%~dp0"
set "PARSED_DIR=%BASE_DIR%data-parsed"
set "DATA_DIR=%BASE_DIR%data"
set "FILES_LIST=%BASE_DIR%files-to-move.txt"

REM Check if files-to-move.txt exists
if not exist "%FILES_LIST%" (
    echo No files-to-move.txt found. Nothing to process.
    pause
    exit /b 0
)

REM Check if file is empty
for %%R in ("%FILES_LIST%") do if %%~zR==0 (
    echo files-to-move.txt is empty. Nothing to process.
    pause
    exit /b 0
)

REM Count non-comment lines for status
set /a file_count=0
for /f "usebackq tokens=*" %%A in ("%FILES_LIST%") do (
    echo %%A | findstr /r "^[^#]" >nul
    if not errorlevel 1 set /a file_count+=1
)

if %file_count%==0 (
    echo No files to process (only comments found).
    pause
    exit /b 0
)

echo Found %file_count% files to move.
echo.

REM Process each file
set /a moved_count=0
set /a error_count=0

for /f "usebackq tokens=*" %%A in ("%FILES_LIST%") do (
    REM Skip comment lines
    echo %%A | findstr /r "^[^#]" >nul
    if not errorlevel 1 (
        call :move_file "%%A"
    )
)

echo.
echo Movement complete: %moved_count% files moved, %error_count% errors.

REM Cleanup duplicate files in data-parsed that exist in data (for IDE tracking compatibility)
echo.
echo Checking for duplicate files in data-parsed...

set /a cleanup_count=0
for %%F in ("%DATA_DIR%\*.md") do (
    if exist "%PARSED_DIR%\%%~nxF" (
        del /f /q "%PARSED_DIR%\%%~nxF" >nul 2>&1
        if not errorlevel 1 (
            echo   CLEANUP: Removed duplicate %%~nxF from data-parsed
            set /a cleanup_count+=1
        ) else (
            echo   ERROR: Failed to remove duplicate %%~nxF
        )
    )
)

if %cleanup_count% gtr 0 (
    echo Cleanup complete: %cleanup_count% duplicate files removed from data-parsed.
) else (
    echo No duplicate files found to cleanup.
)

REM Clear the files-to-move.txt for next iteration
echo # Files Processed - Ready for Movement > "%FILES_LIST%"
echo # This file tracks worldbuilding entries completed in current iteration >> "%FILES_LIST%"
echo # Format: filename.md (one per line, no path prefix) >> "%FILES_LIST%"
echo # Script will move from data-parsed/ to data/ and clear this list >> "%FILES_LIST%"
echo. >> "%FILES_LIST%"

echo files-to-move.txt cleared for next iteration.
echo.
pause
exit /b 0

:move_file
set "file=%~1"
set "source_path=%PARSED_DIR%\%file%"
set "dest_path=%DATA_DIR%\%file%"

echo Processing: %file%

if not exist "%source_path%" (
    echo   ERROR: Source file not found: %source_path%
    set /a error_count+=1
    goto :eof
)

if exist "%dest_path%" (
    echo   WARNING: Destination file exists, will be overwritten: %dest_path%
)

move "%source_path%" "%dest_path%" >nul 2>&1
if errorlevel 1 (
    echo   ERROR: Failed to move %file%
    set /a error_count+=1
) else (
    echo   SUCCESS: Moved %file%
    set /a moved_count+=1
)

goto :eof
