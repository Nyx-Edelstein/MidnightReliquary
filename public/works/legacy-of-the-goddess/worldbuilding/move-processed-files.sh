#!/bin/bash
# Worldbuilding Integration - File Movement Script (Unix/Linux/macOS)
# Moves processed files from data-parsed to data and clears tracking file

echo "Starting worldbuilding file movement process..."

BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PARSED_DIR="$BASE_DIR/data-parsed"
DATA_DIR="$BASE_DIR/data"
FILES_LIST="$BASE_DIR/files-to-move.txt"

# Check if files-to-move.txt exists
if [[ ! -f "$FILES_LIST" ]]; then
    echo "No files-to-move.txt found. Nothing to process."
    read -p "Press Enter to continue..."
    exit 0
fi

# Check if file is empty
if [[ ! -s "$FILES_LIST" ]]; then
    echo "files-to-move.txt is empty. Nothing to process."
    read -p "Press Enter to continue..."
    exit 0
fi

# Count non-comment lines for status
file_count=$(grep -c "^[^#]" "$FILES_LIST" 2>/dev/null || echo 0)

if [[ $file_count -eq 0 ]]; then
    echo "No files to process (only comments found)."
    read -p "Press Enter to continue..."
    exit 0
fi

echo "Found $file_count files to move."
echo

# Process each file
moved_count=0
error_count=0

while IFS= read -r line; do
    # Skip comment lines
    if [[ ! "$line" =~ ^# ]]; then
        filename="$line"
        
        echo "Processing: $filename"
        
        source_path="$PARSED_DIR/$filename"
        dest_path="$DATA_DIR/$filename"
        
        if [[ ! -f "$source_path" ]]; then
            echo "  ERROR: Source file not found: $source_path"
            ((error_count++))
            continue
        fi
        
        if [[ -f "$dest_path" ]]; then
            echo "  WARNING: Destination file exists, will be overwritten: $dest_path"
        fi
        
        if mv "$source_path" "$dest_path" 2>/dev/null; then
            echo "  SUCCESS: Moved $filename"
            ((moved_count++))
        else
            echo "  ERROR: Failed to move $filename"
            ((error_count++))
        fi
    fi
done < "$FILES_LIST"

echo
echo "Movement complete: $moved_count files moved, $error_count errors."

# Cleanup duplicate files in data-parsed that exist in data (for IDE tracking compatibility)
echo
echo "Checking for duplicate files in data-parsed..."

cleanup_count=0
for data_file in "$DATA_DIR"/*.md; do
    if [[ -f "$data_file" ]]; then
        filename=$(basename "$data_file")
        parsed_duplicate="$PARSED_DIR/$filename"
        
        if [[ -f "$parsed_duplicate" ]]; then
            if rm -f "$parsed_duplicate" 2>/dev/null; then
                echo "  CLEANUP: Removed duplicate $filename from data-parsed"
                ((cleanup_count++))
            else
                echo "  ERROR: Failed to remove duplicate $filename"
            fi
        fi
    fi
done

if [[ $cleanup_count -gt 0 ]]; then
    echo "Cleanup complete: $cleanup_count duplicate files removed from data-parsed."
else
    echo "No duplicate files found to cleanup."
fi

# Clear the files-to-move.txt for next iteration
cat > "$FILES_LIST" << 'EOF'
# Files Processed - Ready for Movement
# This file tracks worldbuilding entries completed in current iteration
# Format: filename.md (one per line, no path prefix)
# Script will move from data-parsed/ to data/ and clear this list

EOF

echo "files-to-move.txt cleared for next iteration."
echo
read -p "Press Enter to continue..."
