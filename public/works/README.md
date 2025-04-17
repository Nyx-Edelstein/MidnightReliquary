# Works Directory

This directory contains all the creative writing works. Each work should have its own subdirectory.

## Structure

\`\`\`
works/
  work-name/
    meta.json       # Contains title, description, etc.
    chapters/
      1.html        # Chapter 1
      2.html        # Chapter 2
      ...
\`\`\`

The `meta.json` file should have the following structure:

\`\`\`json
{
  "title": "Work Title",
  "description": "A description of the work",
  "lastUpdated": "2023-04-15",
  "nextUpdate": "2023-04-29"
}
\`\`\`

Each chapter HTML file should contain only the content of the chapter, not the full HTML document.
