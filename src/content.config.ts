import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "*.md" }),
  schema: z.object({
    id: z.number().int().positive(),
    title: z.string(),
    pubDate: z.coerce.date(),
  }),
});

export const collections = { posts };
