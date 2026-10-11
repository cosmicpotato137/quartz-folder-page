import { describe, expect, it } from "vitest";
import type { Root } from "hast";
import type { VNode } from "preact";
import type { QuartzComponentProps } from "@quartz-community/types";
import FolderContent from "../src/components/FolderContent";
import { FolderPage } from "../src/pageType";

const tree: Root = {
  type: "root",
  children: [
    {
      type: "element",
      tagName: "p",
      properties: {},
      children: [{ type: "text", value: "Hand-written folder page" }],
    },
  ],
};

function classNames(node: unknown): string[] {
  if (Array.isArray(node)) return node.flatMap(classNames);
  if (!node || typeof node !== "object" || !("props" in node)) return [];
  const props = (node as VNode<{ class?: string; children?: unknown }>).props;
  return [...(props.class ? [props.class] : []), ...classNames(props.children)];
}

function render(fileData: Record<string, unknown>, allFiles: Record<string, unknown>[]) {
  const Component = FolderContent();
  const props = {
    tree,
    fileData,
    allFiles,
    cfg: { locale: "en-US" },
    ctx: {},
  } as unknown as QuartzComponentProps;
  return classNames(Component(props));
}

function generate(files: Record<string, unknown>[]) {
  const content = files.map((data) => [tree, { data }]);
  return FolderPage({}).generate!({ content, cfg: {}, ctx: {} } as never);
}

describe("FolderContent", () => {
  const child = { slug: "notes/a", frontmatter: { title: "A" } };

  it.each(["notes/index.md", "notes/_index.md", "notes/notes.md"])(
    "renders only the markdown content for %s",
    (relativePath) => {
      const page = { slug: "notes/index", relativePath, frontmatter: {} };
      const classes = render(page, [page, child]);
      expect(classes).toContain("popover-hint");
      expect(classes).toContain("markdown-preview-view markdown-rendered");
      expect(classes).not.toContain("page-listing");
    },
  );

  it("renders the listing for a generated folder page", () => {
    const page = { slug: "notes/index", frontmatter: { title: "notes" }, folderListing: true };
    expect(render(page, [child])).toContain("page-listing");
  });
});

describe("FolderPage.generate", () => {
  it("only generates listing pages for folders without their own page", () => {
    const pages = generate([
      { slug: "docs/index", relativePath: "docs/index.md", frontmatter: { title: "Docs" } },
      { slug: "docs/one", relativePath: "docs/one.md", frontmatter: { title: "One" } },
      { slug: "notes/index", relativePath: "notes/notes.md", frontmatter: { title: "Notes" } },
      { slug: "notes/a", relativePath: "notes/a.md", frontmatter: { title: "A" } },
      { slug: "other/b", relativePath: "other/b.md", frontmatter: { title: "B" } },
    ]);
    expect(pages).toEqual([{ slug: "other/index", title: "other", data: { folderListing: true } }]);
  });

  it.each(["notes/index.md", "notes/notes.md"])("does not change the title of %s", (path) => {
    const frontmatter = { title: "index" };
    generate([{ slug: "notes/index", relativePath: path, frontmatter }]);
    expect(frontmatter.title).toBe("index");
  });
});
