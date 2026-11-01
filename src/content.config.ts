import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';
import { categories } from './data/categories';
import { json5RecipesLoader } from './loaders/json5-recipes';

const recipeSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(20).max(240),
  category: z.enum(
    categories.map((category) => category.slug) as [
      (typeof categories)[number]['slug'],
      ...(typeof categories)[number]['slug'][],
    ],
  ),
  publishedAt: z.iso.date(),
  updatedAt: z.iso.date().optional(),
  featured: z.boolean().default(false),
  difficulty: z.enum(['Makkelijk', 'Gemiddeld', 'Uitdagend']),
  prepMinutes: z.number().int().nonnegative(),
  cookMinutes: z.number().int().nonnegative(),
  servings: z.number().int().positive(),
  temperatureC: z.number().int().positive().optional(),
  image: z
    .string()
    .regex(/^\/images\/recipes\/[a-zA-Z0-9/_-]+\.(?:jpg|jpeg|png|webp|avif)$/)
    .optional(),
  tags: z.array(z.string().min(1)).default([]),
  ingredients: z.array(z.string().min(2)).min(1),
  steps: z.array(z.string().min(10)).min(1),
});

const recipes = defineCollection({
  loader: json5RecipesLoader('src/content/recipes'),
  schema: recipeSchema,
});

export const collections = { recipes };
