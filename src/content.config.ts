import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    email: z.string().email().optional(),
    jobs: z
      .array(
        z.object({
          title: z.string(),
          type: z.string(),
          href: z.string()
        })
      )
      .optional()
  })
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    date: z.coerce.date(),
    displayDate: z.string(),
    visual: z.enum([
      "aurora",
      "brew",
      "mesh",
      "lattice",
      "curve",
      "signal",
      "vault",
      "sieve",
      "rate"
    ]),
    draft: z.boolean().optional()
  })
});

export const collections = { pages, blog };
