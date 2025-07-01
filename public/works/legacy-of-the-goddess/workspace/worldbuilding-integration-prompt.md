# Worldbuilding Data Integration & Story Correlation Process

Your task is to perform comprehensive worldbuilding data integration with story correlation. Complete the following tasks in order, one at a time. After completing each task, return to this file and reinterpret the full text to ensure accuracy. Do not modify this file. Empty all context and working memory aside from the prompt in this file and necessary continuation information.

- Examine the `worldbuilding/data-parsed/` folder to identify unprocessed entries. If the folder is empty, your task is complete; immediately stop.

- **Archive Detection**: Scan for files marked as "archived" in their content or metadata. Report these files for deletion but do not process them further. Document all archived files in a list for user review.

- **Entry Selection**: Select 3-5 unprocessed entries from `data-parsed` for current iteration. Prioritize entries with the most cross-references or complex content first to maximize graph connectivity preservation.

For each selected entry, perform the following comprehensive processing:

## Story Correlation & Integration

- **Semantic Search**: Conduct comprehensive search across story content using entry name, related concepts, and cross-referenced terms:
  - Search character files in `../characters/` for relevant mentions
  - Search chapter summaries in `../summaries/` for related content
  - Cross-reference with indexes (`index-by-character.md`, `index-by-chapter.md`, `index-by-content.md`)
  - Search chapter content directly for the entry itself and closely related concepts

- **Story Integration Section**: Create new section documenting:
  - Summary of all story appearances with specific chapter citations
  - Character interactions and relationships involving this worldbuilding element
  - Plot relevance and narrative significance
  - Any conflicts between worldbuilding data and established story canon

## Content Processing & Enhancement

- **Canonical Reconciliation**: Apply SOURCE OF TRUTH PRIORITY ORDER:
  1. Preserve story canon where conflicts exist
  2. Retain unique worldbuilding details not present in story
  3. Note any contradictions requiring resolution and log contradictory entries in a file (`worldbulding-contradictions.md`)
  4. Mark outdated information clearly

- **Tag Optimization**: Improve searchability and categorization:
  - Add relevant, specific tags for better discoverability
  - Include thematic tags (political, supernatural, magical-systems, etc.)
  - Add character-relationship tags where applicable
  - Include location/geographic tags if relevant

- **Content Classification**:
  - **Full Entries**: Complete descriptions with story integration
  - **Stub Entries**: Mark clearly as "PLACEHOLDER - [Brief description of concept]" while preserving searchability
  - **Eclipsed Entries**: Identify content fully covered by character/summary data, preserve only unique details
  - **Data Cleanup**: Exercise discretion in cleaning up poorly formatted or low-quality entries.

- **Cross-Reference Validation**: Ensure all mentioned entities exist in worldbuilding system:
  - Verify cross-referenced entries are present or create stub entries
  - Update bidirectional references where needed
  - Maintain graph connectivity for concept traversal

## Special Processing Cases

- **Fae Entities**: Identify individual Fae entries for consolidation:
  - Extract unique details from each Fae entry
  - Aggregate information into master `Fae.md` file
  - Mark individual Fae files for deletion after consolidation
  - Preserve all cross-references in consolidated entry

- **Character Redundancy**: For entries eclipsed by character files:
  - Identify unique worldbuilding details not in character files
  - Preserve only non-redundant information
  - Cross-reference to character file for complete information
  - Mark redundant sections clearly

## Quality Assurance & Migration

- **Cross-Reference Integrity**: Validate all mentioned entities and relationships remain accessible for graph traversal during writing research

- **Searchability Verification**: Ensure processed entries maintain discoverability through improved tagging and categorization

- **In-Place Processing**: Edit entries directly within `data-parsed/` directory to optimize performance and eliminate file creation delays

- **Automated File Movement System**: Optimized workflow for processed file management:
  - Add completed filenames (without path) to `worldbuilding/files-to-move.txt`
  - User runs `move-processed-files.bat` (Windows) or `move-processed-files.sh` (Unix/Linux/macOS) to transfer files
  - Script automatically moves files from `data-parsed/` to `data/` and clears tracking file
  - Eliminates terminal permission bottlenecks and ensures reliable file management

- **Processing Documentation**: Provide iteration summary directly to user:
  - Brief summary of entries processed and key decisions
  - Any archived files identified for deletion
  - Notable canonical conflicts or cross-reference changes
  - List of completed files ready for movement via automated script

## Critical Requirements

- **Graph Preservation**: Maintain cross-reference network essential for concept traversal during writing
- **Story Priority**: Apply canonical authority hierarchy consistently
- **Stub Maintenance**: Preserve placeholder entries as searchable tokens while marking their status
- **Comprehensive Correlation**: Ensure thorough story integration for each entry
- **Batch Processing**: Limit to 3-5 entries per iteration for thoroughness

The goal is to create a comprehensive, story-integrated worldbuilding reference system that preserves conceptual relationships while prioritizing narrative canon and maintaining efficient searchability for writing support. This will take multiple iterations.

Process continues until `worldbuilding/data-parsed/` directory is empty, indicating completion of integration phase.
