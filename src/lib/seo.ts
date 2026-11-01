import { getCategory } from '../data/categories';
import { getIngredientItems } from './ingredients';
import type { Recipe } from './recipes';
import { recipeUrl } from './recipes';

export function recipeStructuredData(recipe: Recipe, site: URL) {
  const { data } = recipe;
  const url = new URL(recipeUrl(recipe), site).toString();
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      name: data.title,
      description: data.description,
      mainEntityOfPage: url,
      ...(data.image ? { image: [new URL(data.image, site).toString()] } : {}),
      author: { '@type': 'Organization', name: 'BBQ Recepten' },
      datePublished: data.publishedAt,
      ...(data.updatedAt ? { dateModified: data.updatedAt } : {}),
      prepTime: `PT${data.prepMinutes}M`,
      cookTime: `PT${data.cookMinutes}M`,
      totalTime: `PT${data.prepMinutes + data.cookMinutes}M`,
      recipeYield: data.servings,
      recipeCategory: getCategory(data.category).title,
      keywords: data.tags.join(', '),
      recipeIngredient: getIngredientItems(data.ingredients),
      recipeInstructions: data.steps.map((text, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        text,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site.toString() },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Recepten',
          item: new URL('/recepten/', site).toString(),
        },
        { '@type': 'ListItem', position: 3, name: data.title, item: url },
      ],
    },
  ];
}

export function recipeListStructuredData(recipes: Recipe[], site: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: recipes.map((recipe, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: new URL(recipeUrl(recipe), site).toString(),
    })),
  };
}
