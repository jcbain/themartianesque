import type { CollectionEntry } from "astro:content";

export function mapPostEntry(entry: CollectionEntry<"posts">) {
  return {
    id: entry.data.id,
    title: entry.data.title,
    date: entry.data.pubDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    wordCount: entry.body.trim().split(/\s+/).length,
    content: entry.body.trim(),
    tags: entry.data.tags,
  };
}
