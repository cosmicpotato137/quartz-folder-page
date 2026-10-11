---
"@quartz-community/folder-page": major
---

A folder's own markdown page now replaces the generated folder page entirely. When a folder has an `index.md` (or `_index.md`) or a page named after the folder (e.g. `notes/notes.md`), that page is rendered as written, like any other content page. Folders without their own page still get a generated listing page, unchanged.

Breaking: folder `index.md` pages no longer show the folder listing or item count below their content, and their title is no longer filled in from the folder name when the frontmatter has none. Remove the `index.md` to get the generated listing back, or set `title` in its frontmatter.
