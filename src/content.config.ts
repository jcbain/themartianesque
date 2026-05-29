import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "*.md" }),
  schema: z.object({
    id: z.number().int().positive(),
    title: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    kind: z.enum(["blog", "trash"]).default("blog"),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
