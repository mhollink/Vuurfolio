/** Flatten named ingredient groups for search and Recipe structured data. */
export function getIngredientItems(groups: readonly { title?: string, items: readonly string[] }[]): string[] {
  return groups.flatMap((group) => group.items);
}
