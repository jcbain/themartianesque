import { getCollection, type CollectionEntry } from "astro:content";
import { mapPostEntry } from "./mapPosts";

export function isPublishable(entry: CollectionEntry<"posts">) {
  return import.meta.env.DEV || !entry.data.draft;
}

export async function getAppPosts() {
  return (await getCollection("posts"))
    .filter(isPublishable)
    .sort((a, b) => b.data.id - a.data.id)
    .map(mapPostEntry);
}

export async function getAppPostStaticPaths() {
  return (await getCollection("posts"))
    .filter(isPublishable)
    .map((entry) => ({
      params: { id: String(entry.data.id) },
    }));
}
