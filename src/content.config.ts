import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['active', 'stable', 'archived']),
    year: z.number().int(),
    ongoing: z.boolean().default(false),
    tech: z.array(z.string()).default([]),
    url: z.url().optional(),
    linkLabel: z.string().optional(),
    blurb: z.string(),
    version: z.string().optional(),
    order: z.number().int().optional(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    edited: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    excerpt: z.string(),
    draft: z.boolean().default(false),
    location: z.string().optional(),
  }),
});

export const collections = { projects, writing };
