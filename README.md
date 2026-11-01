# BBQ Recepten

Een statische receptenwebsite, zonder backend, database of CMS. Recepten zijn JSON5 bestanden die tijdens de build
worden gevalideerd en omgezet naar HTML.

## Starten

Vereisten: Node.js 24 en PNPM 11.28.9 (via Corepack of eigen installatie).

```bash
corepack enable
pnpm install
pnpm dev
```

Open http://localhost:4321.

```bash
pnpm check    # TypeScript + Astro diagnostics
pnpm test     # Unit tests
pnpm build    # Statische site in dist/ + smoke test van routes
pnpm preview  # Gebouwde site lokaal bekijken
```

**Let op:** dit starterpakket bevat nog geen `pnpm-lock.yaml`. Draai `pnpm install` en commit de gegenereerde lockfile
voordat je de GitHub Actions CI gebruikt (`--frozen-lockfile`).

## Recept publiceren

1. Voeg `src/content/recipes/mijn-recept.json5` toe; de bestandsnaam wordt de slug van `/recepten/mijn-recept/`.
2. Vul de velden in volgens de voorbeelden; `pnpm check` of `pnpm build` controleert de inhoud. Zonder afbeelding is
   `image` optioneel.
3. Plaats eventuele echte foto's in `public/images/recipes/` en voeg bijvoorbeeld
   `image: '/images/recipes/mijn-recept.jpg'` toe.
4. Push de wijzigingen. Na een succesvolle build publiceer je de inhoud van `dist/` op je statische webserver.
   Configureer hiervoor apart een deploymentstap.

`JSON5` ondersteunt commentaar, ongequote propertynamen en trailing comma's. Nieuwe recepten mogen geen executable HTML
of JavaScript bevatten. Instructies staan als losse teksten in `steps`; ingrediënten staan in één of meer groepen:

```json5
ingredients: [
  { title: 'Voor de marinade', items: ['5 el ketjap manis', '3 teentjes knoflook'] },
  { title: 'Voor de saus', items: ['100 g pindakaas', '150 ml water'] },
],
```

Elke groep heeft minimaal één ingrediënt. Bij meerdere groepen is `title` verplicht. Bij precies één groep mag je
`title` weglaten; de pagina toont dan alleen de algemene kop **Ingrediënten**. De losse ingrediënten worden voor
zoeken en Schema.org automatisch in dezelfde volgorde samengevoegd.

## Projectstructuur

- `src/content/recipes`: bronbestanden met recepten
- `src/content.config.ts`: datamodel en Zod-validatie
- `src/loaders`: JSON5-integratie met Astro Content Collections
- `src/data`: gedeelde lijst met categorieën
- `src/lib`: ophalen, sorteren en formatteren van recepten, SEO helperfuncties
- `src/components/layout`: navigatie en footer
- `src/components/home`: herbruikbare homepage-secties
- `src/components/recipe`: kaart, afbeelding/fallback, ingrediënten, stappen, feiten en zoeklijst
- `src/components/ui`: eenvoudige UI-bouwblokken
- `src/layouts`: documentlayout en metadata
- `src/pages`: statische routes, waaronder dynamische routes met `getStaticPaths()`
- `src/styles`: design tokens en basisstijlen
- `public/images/recipes`: onbewerkte afbeeldingen, direct geserveerd

## SEO

- Alle `/recepten/[slug]/` en `/categorie/[slug]/` pagina's worden statisch gegenereerd.
- `@astrojs/sitemap` genereert `dist/sitemap-index.xml` en de bijbehorende sitemap(s).
- `/robots.txt` verwijst naar de sitemap.
- Iedere pagina heeft een eigen titel, omschrijving en canonieke URL.
- Receptdetails hebben Schema.org `Recipe` en `BreadcrumbList` JSON-LD.
- Verzamellijsten hebben Schema.org `ItemList` JSON-LD.
- Receptfoto's zijn optioneel voor deze site. Google vereist een echte foto van het gerecht voor **Recipe rich-result**
  geschiktheid. Gebruik geen generieke placeholder in de `image` metadata.
