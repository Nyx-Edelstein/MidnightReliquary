# Worldbuilding Integration - File Movement System

## Quick Setup

Four files have been created to optimize the worldbuilding integration workflow:

### 1. `files-to-move.txt`
- Tracks completed entries ready for movement
- Updated automatically by Fi during processing
- Format: one filename per line (no path prefix)
- Comments preserved for documentation

### 2. `move-processed-files.ps1` (PowerShell - Recommended for Windows)
- PowerShell script for Windows systems
- Moves files from `data-parsed/` to `data/`
- Automatically clears tracking file for next iteration
- Provides colored status updates and error handling

### 3. `move-processed-files.bat` (Windows Command Prompt)
- Batch script for traditional Windows command prompt
- Same functionality as PowerShell script
- Use if PowerShell execution is restricted

### 4. `move-processed-files.sh` (Unix/Linux/macOS)
- Shell script for Unix-based systems
- Cross-platform compatibility for non-Windows systems

## Usage Instructions

1. **During Integration**: Fi adds completed filenames to `files-to-move.txt`
2. **Between Iterations**: User runs appropriate script:
   - **PowerShell (Recommended)**: Right-click `move-processed-files.ps1` → "Run with PowerShell"
   - **Alternative**: `powershell -ExecutionPolicy Bypass -File "move-processed-files.ps1"`
   - **Command Prompt**: Double-click `move-processed-files.bat`
   - **Unix/Linux/macOS**: `chmod +x move-processed-files.sh && ./move-processed-files.sh`
3. **Automatic Cleanup**: Script moves files and clears tracking list
4. **Next Iteration**: Fi continues processing remaining entries

## Benefits

- **Eliminates Terminal Permission Issues**: No interactive terminal commands required
- **Reliable File Movement**: Consistent, tested script execution
- **Clear Status Tracking**: Visual confirmation of completed vs pending files
- **Error Handling**: Graceful handling of missing files or permission issues
- **Automated Cleanup**: Tracking file automatically reset for next iteration

## File Locations

All files located in: `public/works/legacy-of-the-goddess/worldbuilding/`

The integration process in `worldbuilding-integration-prompt.md` has been updated to reflect this optimized workflow.
