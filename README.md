# @quartz-community/folder-page

Automatically generates a page listing the contents of every folder that doesn't have its own page.

### Folders with their own page

If a folder already has a markdown page, either `index.md` (or `_index.md`) or a page with the same name as the folder (the Obsidian "Folder Notes" convention, e.g. `notes/notes.md`), that page is used as the folder page as-is. Its content is rendered like any other page, with no folder listing, item count, or generated title. The options below only apply to generated folder pages.

## Installation

```bash
npx quartz plugin add github:quartz-community/folder-page
```

## Usage

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/folder-page
    enabled: true
```

For advanced use cases, you can override in TypeScript:

```ts title="quartz.ts (override)"
import * as ExternalPlugin from "./.quartz/plugins";

ExternalPlugin.FolderPage({
  showFolderCount: true,
  showSubfolders: true,
  prefixFolders: false,
});
```

## Configuration

| Option            | Type      | Default     | Description                                                                            |
| ----------------- | --------- | ----------- | -------------------------------------------------------------------------------------- |
| `showFolderCount` | `boolean` | `undefined` | Whether to show the number of items in the folder.                                     |
| `showSubfolders`  | `boolean` | `undefined` | Whether to show subfolders in the listing.                                             |
| `sort`            | `SortFn`  | `undefined` | A function to sort the pages in the folder.                                            |
| `prefixFolders`   | `boolean` | `false`     | Whether to prefix generated folder page titles with "Folder: " (e.g. "Folder: notes"). |

## Development

To build locally:

```bash
npm install
npm run build
```

The built `dist/` folder is committed so Quartz can use it as-is when installing the plugin from git, without
installing dependencies or building. Run `npm run build` and commit `dist/` along with any source change; CI fails if
they are out of sync.

## Documentation

See the [Quartz documentation](https://quartz.jzhao.xyz/plugins/FolderPage) for more information.

## License

MIT
