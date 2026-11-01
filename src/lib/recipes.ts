import { type CollectionEntry, getCollection } from 'astro:content';
import type { CategorySlug } from '../data/categories';

export type Recipe = CollectionEntry<'recipes'>;

export function sortRecipes(recipes: Recipe[]): Recipe[] {
  return [...recipes].sort(
    (a, b) =>
      b.data.publishedAt.localeCompare(a.data.publishedAt) ||
      a.data.title.localeCompare(b.data.title, 'nl'),
  );
}

export async function getRecipes(): Promise<Recipe[]> {
  return sortRecipes(await getCollection('recipes'));
}

export async function getFeaturedRecipes(limit = 4): Promise<Recipe[]> {
  return (await getRecipes()).filter((recipe) => recipe.data.featured).slice(0, limit);
}

export async function getRecipesByCategory(category: CategorySlug): Promise<Recipe[]> {
  return (await getRecipes()).filter((recipe) => recipe.data.category === category);
}

export function recipeUrl(recipe: Recipe): string {
  return `/recepten/${recipe.id}/`;
}
