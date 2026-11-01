export const categories = [
  {
    slug: 'rund',
    title: 'Rund',
    description:
      'Rundvlees en vuur zijn een goede combinatie. Van een kort gegrilde bavette tot een stuk vlees dat urenlang rustig gaart.',
    introduction:
      'Bij rund draait het om de juiste hitte, een beetje geduld en weten wanneer je het vlees met rust laat. Hier vind je recepten voor zowel een snelle grillavond als een middag low & slow.',
    number: '01',
  },
  {
    slug: 'varken',
    title: 'Varken',
    description:
      'Van sappige procureur tot ribben met een mooie bark: varkensvlees leent zich voor alle kanten van de BBQ.',
    introduction:
      'Soms wil je langzaam garen tot het vlees uit elkaar valt. Soms juist een krokant randje boven gloeiende kolen. In deze categorie komen die twee werelden samen.',
    number: '02',
  },
  {
    slug: 'kip',
    title: 'Kip',
    description:
      'Kip van de barbecue hoeft niet droog of saai te zijn. Met de juiste bereiding blijft het vlees sappig en krijgt de buitenkant volop smaak.',
    introduction:
      'Denk aan goed gekruide dijen, een mooi geroosterd vel en marinades die niet alles overheersen. Toegankelijke recepten die toch genoeg ruimte bieden om te experimenteren.',
    number: '03',
  },
  {
    slug: 'vis',
    title: 'Vis',
    description:
      'Vis op de barbecue is vaak eenvoudiger dan je denkt. Een beetje rook, goede timing en niet te veel gedoe maken al een groot verschil.',
    introduction:
      'Van zalm op cederhout tot vis direct van het rooster: hier vind je gerechten die het karakter van de vis laten spreken, zonder dat je een ingewikkelde bereiding nodig hebt.',
    number: '04',
  },
  {
    slug: 'bijgerechten',
    title: 'Bijgerechten',
    description:
      'Een goede barbecue draait niet alleen om wat er in het midden van het rooster ligt. De bijgerechten maken de maaltijd compleet.',
    introduction:
      'Gegrilde groenten, aardappels, maïs en andere smaakmakers verdienen net zo goed aandacht. Vaak zijn het juist die eenvoudige gerechten die iedereen nog een keer opschept.',
    number: '05',
  },
  {
    slug: 'sauzen-en-rubs',
    title: 'Sauzen & rubs',
    description:
      'Soms zit het verschil in een goede rub, een simpele marinade of een saus die nét wat extra pit geeft.',
    introduction:
      'Van de eerste laag kruiden tot de laatste lepel saus aan tafel: met deze recepten breng je smaken samen en geef je vlees, vis en groenten je eigen draai.',
    number: '06',
  },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];

export function getCategory(slug: CategorySlug) {
  const category = categories.find((item) => item.slug === slug);
  if (!category) throw new Error(`Unknown category: ${slug}`);
  return category;
}
