# Story Indexing Process

Your task is to create a comprehensive index system for the Legacy of the Goddess story analysis. Complete the following tasks in order, one at a time. After completing each task, return to this file and reinterpret the full text to ensure accuracy. Do not modify this file. Empty all context and working memory aside from the prompt in this file and necessary continuation information. You are now stateless.

- Load existing workspace context from `meta.md` and any referenced workspace files to understand the story analysis framework and processing principles.

- Examine all files in the `summaries` folder to understand the scope and structure of chapter summaries. Identify the naming patterns and confirm which chapters have been processed.

- Examine all files in the `characters` folder to understand character documentation scope and structure.

- Read the `misc\open-questions.md` and `misc\writing-style-prompt.md` files to understand the analytical framework.

- Examine `index\meta-index.md` as the primary starting point file containing:
  - Brief overview of the story (2-3 sentences)
  - Navigation guide to other index files
  - Links to key analytical resources (open questions, writing style guide)
  - Summary statistics (total chapters processed, character count, key themes)
  - Quick reference to major story arcs and turning points

- Examine `index\index-by-character.md` mapping every character to chapters they appear in:
  - Alphabetical character list with brief role description (1 sentence max)
  - For each character, list all chapter files where they appear
  - Include character importance indicators (main character, recurring, minor)
  - Cross-reference major character relationships and conflicts
  - Ensure accuracy and address any errors in summarization

- Examine `index\index-by-chapter.md` listing every chapter with meta-summaries:
  - Chronological chapter list with high-level summaries (2-3 sentences each)
  - Chapter type classifications (revelation, action, political, supernatural, etc.)
  - Key events and turning points in each chapter
  - Major characters introduced or developed in each chapter
  - Links to full chapter summaries

- Examine `index\index-by-content.md` organizing major plot elements, themes, and concepts:
  - Major plot arcs and their progression across chapters
  - Supernatural/magical systems and their development
  - Political developments and kingdom management themes
  - Character relationship dynamics and evolution
  - Recurring themes and symbolic elements
  - Mystery/question resolution tracking
  - For each content area, reference relevant characters and chapters

- Perform quality assurance:
  - CRITICAL: Verify information accuracy, some summaries may be incomplete, incorrect, or factually wrong. Spot check, double check, cross reference summaries and chapter files, and employ any other strategies to increase the accuracy of the index while maintaining a hard-limit of 300 lines per index file (this can be accomplished by just reading the files rather than running a script). It is imperative that there are no gross factual inaccuracies in the index.
  - CHARACTER PERSPECTIVE VERIFICATION: Select 3-6 characters across different importance levels (main protagonists, major recurring, supporting, minor) and attempt to write scenes from their viewpoints using comprehensive information from character files, chapter summaries, and index entries. This method forces deep cross-referencing and reveals subtle factual errors that surface-level reading might miss. Any inconsistencies discovered during this process must be investigated and corrected. Ensure the results are in line with the writing style prompt, the character's files, and all known information from the story.
  - Verify all index files cross-reference correctly
  - Ensure no chapters or characters are missing from indices
  - Confirm all major plot elements are captured
  - Check that the meta-index provides effective navigation
  - Validate that content organization enables efficient story research

The goal is to create a comprehensive reference system that allows quick location of any story element, character development, or thematic content across the entire analyzed work. This may require multiple passes. Do your best to achieve the output with the understanding that it may take multiple iterations until the process is complete.
