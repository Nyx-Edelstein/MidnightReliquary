# Worldbuilding Integration - File Movement Script (PowerShell)
# Moves processed files from data-parsed to data and clears tracking file

Write-Host "Starting worldbuilding file movement process..." -ForegroundColor Green

$BaseDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ParsedDir = Join-Path $BaseDir "data-parsed"
$DataDir = Join-Path $BaseDir "data"
$FilesList = Join-Path $BaseDir "files-to-move.txt"

# Check if files-to-move.txt exists
if (-not (Test-Path $FilesList)) {
    Write-Host "No files-to-move.txt found. Nothing to process." -ForegroundColor Yellow
    Read-Host "Press Enter to continue"
    exit 0
}

# Check if file is empty
if ((Get-Item $FilesList).Length -eq 0) {
    Write-Host "files-to-move.txt is empty. Nothing to process." -ForegroundColor Yellow
    Read-Host "Press Enter to continue"
    exit 0
}

# Get non-comment lines for processing
$filesToMove = Get-Content $FilesList | Where-Object { $_ -notmatch "^#" -and $_.Trim() -ne "" }

if ($filesToMove.Count -eq 0) {
    Write-Host "No files to process (only comments found)." -ForegroundColor Yellow
    Read-Host "Press Enter to continue"
    exit 0
}

Write-Host "Found $($filesToMove.Count) files to move." -ForegroundColor Cyan
Write-Host

# Process each file
$movedCount = 0
$errorCount = 0

foreach ($filename in $filesToMove) {
    $filename = $filename.Trim()
    Write-Host "Processing: $filename" -ForegroundColor White
    
    $sourcePath = Join-Path $ParsedDir $filename
    $destPath = Join-Path $DataDir $filename
    
    if (-not (Test-Path $sourcePath)) {
        Write-Host "  ERROR: Source file not found: $sourcePath" -ForegroundColor Red
        $errorCount++
        continue
    }
    
    if (Test-Path $destPath) {
        Write-Host "  WARNING: Destination file exists, will be overwritten: $destPath" -ForegroundColor Yellow
    }
    
    try {
        Move-Item -Path $sourcePath -Destination $destPath -Force
        Write-Host "  SUCCESS: Moved $filename" -ForegroundColor Green
        $movedCount++
    }
    catch {
        Write-Host "  ERROR: Failed to move $filename - $($_.Exception.Message)" -ForegroundColor Red
        $errorCount++
    }
}

Write-Host
Write-Host "Movement complete: $movedCount files moved, $errorCount errors." -ForegroundColor Cyan

# Cleanup duplicate files in data-parsed that exist in data (for IDE tracking compatibility)
Write-Host
Write-Host "Checking for duplicate files in data-parsed..." -ForegroundColor Cyan

$dataFiles = Get-ChildItem -Path $DataDir -Filter "*.md" | Select-Object -ExpandProperty Name
$cleanupCount = 0

foreach ($dataFile in $dataFiles) {
    $parsedDuplicate = Join-Path $ParsedDir $dataFile
    if (Test-Path $parsedDuplicate) {
        try {
            Remove-Item -Path $parsedDuplicate -Force
            Write-Host "  CLEANUP: Removed duplicate $dataFile from data-parsed" -ForegroundColor Yellow
            $cleanupCount++
        }
        catch {
            Write-Host "  ERROR: Failed to remove duplicate $dataFile - $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

if ($cleanupCount -gt 0) {
    Write-Host "Cleanup complete: $cleanupCount duplicate files removed from data-parsed." -ForegroundColor Cyan
} else {
    Write-Host "No duplicate files found to cleanup." -ForegroundColor Green
}

# Clear the files-to-move.txt for next iteration
$headerContent = @"
# Files Processed - Ready for Movement
# This file tracks worldbuilding entries completed in current iteration
# Format: filename.md (one per line, no path prefix)
# Script will move from data-parsed/ to data/ and clear this list

"@

Set-Content -Path $FilesList -Value $headerContent

Write-Host "files-to-move.txt cleared for next iteration." -ForegroundColor Green
Write-Host
Read-Host "Press Enter to continue"
