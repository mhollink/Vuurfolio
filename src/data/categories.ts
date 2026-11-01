export const categories = [
  { slug: 'rund', title: 'Rund', description: 'Van bavette tot brisket.', number: '01' },
  {
    slug: 'varken',
    title: 'Varken',
    description: 'Low & slow en krokante klassiekers.',
    number: '02',
  },
  { slug: 'kip', title: 'Kip', description: 'Sappig, kruidig en vol smaak.', number: '03' },
  { slug: 'vis', title: 'Vis', description: 'Licht, rokerig en verrassend.', number: '04' },
  {
    slug: 'bijgerechten',
    title: 'Bijgerechten',
    description: 'Alles wat je BBQ compleet maakt.',
    number: '05',
  },
  {
    slug: 'sauzen-en-rubs',
    title: 'Sauzen & rubs',
    description: 'De smaakmakers voor op het vuur.',
    number: '06',
  },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];

export function getCategory(slug: CategorySlug) {
  const category = categories.find((item) => item.slug === slug);
  if (!category) throw new Error(`Unknown category: ${slug}`);
  return category;
}
