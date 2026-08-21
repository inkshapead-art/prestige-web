# Architecture Guide & Template: Multilingual Support & Dynamic Routing in Astro

This guide evaluates the current i18n and dynamic routing setup in the **Prestige Web** project, diagnoses the dynamic typing issue in the **Solutions** section, and provides a clear architectural blueprint to solve it using the **Component Registry Pattern**.

---

## 1. Current Architecture Evaluation

### Multilingual Support (i18n)
* **Location**: `src/i18n/es.ts` and `src/i18n/en.ts`
* **Mechanism**: Static TypeScript dictionary exports (`es`, `en`).
* **Evaluation**: Excellent and lightweight approach for Astro SSG (Static Site Generation). Content is imported directly at build time without runtime fetch overhead.

### Dynamic Routing
* **Location**: `src/pages/[lang]/solutions/[solution]/index.astro`
* **Mechanism**: Astro `getStaticPaths()` mapping `[lang]` (`es`, `en`) and `[solution]` (`business-funding`, `credit-optimization`, etc.).
* **Evaluation**: Follows official Astro best practices for static route generation.

---

## 2. The Problem Analysis

### Why Static Typing Fails Across Dynamic Routes

In your dynamic route `src/pages/[lang]/solutions/[solution]/index.astro`, all dynamic solution pages share the same component tree:

```astro
<Layout lang={lang} t={t}>
  <Hero content={solutionData.hero} />
  <Stadistics content={solutionData.statistics} />
  <Information content={solutionData.information} />
  <Fundable content={solutionData.fundable} />
</Layout>
```

Currently, `Hero.astro` and `Stadistics.astro` infer props from a single hardcoded solution key:

```typescript
type Translations = typeof import("../../i18n/en").default;
type HeroContent = Translations["solutions"]["business-consulting"]["hero"];
```

### The Conflict:
1. **Hero Section**: Requires 2 custom cards per solution page. Each page has completely different card layouts, texts, and embedded inline SVGs/graphics.
2. **Statistics Section**: Requires 1 custom card/graphic per solution page.
3. **TypeScript Error**: Standard dynamic routes expect all dynamic pages to consume the *exact same prop interface*. Forcing 5 different card structures into one object leads to broken typing, missing properties, or bloated translation files.

---

## 3. Recommended Solution: Component Registry Pattern

The most efficient solution in Astro is to **decouple text translations from visual card components**:

> **Best Practice**: Keep pure localized strings (`title`, `description`, `button`) in `src/i18n/es.ts` & `src/i18n/en.ts`.
> Place complex UI cards (with SVGs, specific layout math, and custom sub-components) inside standalone Astro components.
> Use a **Registry Component** inside `Hero.astro` and `Stadistics.astro` to map the `solution` slug to its corresponding card component.

```
src/pages/[lang]/solutions/[solution]/index.astro
 ├── Hero.astro
 │    ├── Text Column (Common from i18n)
 │    └── HeroCardsRegistry.astro
 │         ├── (solution == 'business-funding')  => BusinessFundingHeroCards.astro
 │         ├── (solution == 'credit-optimization') => CreditOptimizationHeroCards.astro
 │         └── (other solutions...)             => ...
 └── Stadistics.astro
      ├── Text Column (Common from i18n)
      └── StatsCardRegistry.astro
           ├── (solution == 'business-funding')  => BusinessFundingStatsCard.astro
           └── ...
```

---

## 4. Step-by-Step Implementation Template

### Step 1: Update the i18n Schema Structure

Keep translation files focused on common text elements for the page:

```typescript
// src/i18n/en.ts (and es.ts)
export default {
  solutions: {
    "business-funding": {
      hero: {
        title: 'Access Business <br/> Capital <span class="text-secondary">Without Guesswork</span>',
        description: "We help established businesses secure strategic funding...",
        button: { label: "Schedule My Meeting", href: "#" },
      },
      statistics: {
        title: 'Funding Built <span class="text-secondary">Around Your Business</span>',
        description: "We identify funding opportunities based on your business profile.",
        items: ["Business Lines of Credit", "SBA Loans"],
        button: { label: "Schedule My Meeting", href: "#" },
      },
      // ...
    },
    // ... other solutions
  }
};
```

---

### Step 2: Create Solution Hero Card Components

Create specialized card set components for each solution under `src/components/solutions/hero-cards/`:

```astro
<!-- src/components/solutions/hero-cards/BusinessFundingHeroCards.astro -->
---
import type { Language } from "../../../types/language.type";

interface Props {
  lang: Language;
}

const { lang } = Astro.props;
---

<div class="grid grid-cols-2 gap-4 w-full max-w-xl">
  <!-- Card 1 for Business Funding -->
  <div class="p-6 bg-surface rounded-xl border border-border">
    <svg class="w-8 h-8 text-primary" viewBox="0 0 24 24"><!-- SVG Icon 1 --></svg>
    <h3 class="text-lg font-bold mt-2">
      {lang === 'es' ? 'Capital Directo' : 'Direct Capital'}
    </h3>
    <p class="text-sm text-muted">
      {lang === 'es' ? 'Acceso rápido a fondos' : 'Fast access to business funds'}
    </p>
  </div>

  <!-- Card 2 for Business Funding -->
  <div class="p-6 bg-surface rounded-xl border border-border">
    <svg class="w-8 h-8 text-secondary" viewBox="0 0 24 24"><!-- SVG Icon 2 --></svg>
    <h3 class="text-lg font-bold mt-2">
      {lang === 'es' ? 'Aprobación En 48h' : '48h Approval'}
    </h3>
    <p class="text-sm text-muted">
      {lang === 'es' ? 'Evaluación sin fricción' : 'Frictionless evaluation'}
    </p>
  </div>
</div>
```

---

### Step 3: Create the Hero Cards Registry

```astro
<!-- src/components/solutions/hero-cards/HeroCardsRegistry.astro -->
---
import BusinessFundingHeroCards from "./BusinessFundingHeroCards.astro";
import CreditOptimizationHeroCards from "./CreditOptimizationHeroCards.astro";
import type { Language } from "../../../types/language.type";

interface Props {
  solution: string;
  lang: Language;
}

const { solution, lang } = Astro.props;

const HERO_CARDS_MAP: Record<string, any> = {
  "business-funding": BusinessFundingHeroCards,
  "credit-optimization": CreditOptimizationHeroCards,
  // Add remaining solution mappings here
};

const CardsComponent = HERO_CARDS_MAP[solution];
---

{CardsComponent ? <CardsComponent lang={lang} /> : null}
```

---

### Step 4: Refactor `Hero.astro` to Accept `solution` & `lang`

```astro
<!-- src/sections/Solutions/Hero.astro -->
---
import Button from "../../components/Button.astro";
import HeroCardsRegistry from "../../components/solutions/hero-cards/HeroCardsRegistry.astro";
import { BUTTON_COLOR_CLASSES } from "../../constants/buttonClasses";
import type { Language } from "../../types/language.type";

interface Props {
  content: {
    title: string;
    description: string;
    button: {
      label: string;
      href: string;
    };
  };
  solution: string;
  lang: Language;
}

const { content, solution, lang } = Astro.props;
---

<section class="w-full flex justify-center items-center relative overflow-hidden bg-[#000800]">
  <div class="container-full flex justify-between items-center z-10 py-16 gap-8">
    <!-- Common Text Left Column -->
    <div class="flex flex-col justify-center items-start gap-10 max-w-lg">
      <div class="flex flex-col justify-center items-start gap-6">
        <h1 set:html={content.title} class="title text-white" />
        <p class="paragraph text-white" set:html={content.description} />
      </div>

      <Button
        text={content.button.label}
        textClass={BUTTON_COLOR_CLASSES.text1}
        extraBtnClass={BUTTON_COLOR_CLASSES.bg1}
        href={content.button.href}
      />
    </div>

    <!-- Dynamic Hero Cards Right Column -->
    <HeroCardsRegistry solution={solution} lang={lang} />
  </div>
</section>
```

---

### Step 5: Refactor `[solution]/index.astro`

```astro
<!-- src/pages/[lang]/solutions/[solution]/index.astro -->
---
import en from "../../../../i18n/en";
import es from "../../../../i18n/es";
import Layout from "../../../../layouts/Layout.astro";
import type { Language } from "../../../../types/language.type";
import Hero from "../../../../sections/Solutions/Hero.astro";
import Stadistics from "../../../../sections/Solutions/Stadistics.astro";
import Information from "../../../../sections/Solutions/Information.astro";
import Fundable from "../../../../sections/Home/Fundable.astro";

export function getStaticPaths() {
  const solutions = [
    "business-funding",
    "credit-optimization",
    "lender-ready-growth-system",
    "flow-optimization",
    "business-consulting",
  ];
  const languages: Language[] = ["es", "en"];

  return languages.flatMap((lang) =>
    solutions.map((solution) => ({
      params: { lang, solution },
    }))
  );
}

const { lang, solution } = Astro.params as { lang: Language; solution: string };
const translations = { es, en };
const t = translations[lang];
const solutionData = (t.solutions as Record<string, any>)[solution] ?? {};
---

<Layout lang={lang} t={t}>
  <Hero content={solutionData.hero} solution={solution} lang={lang} />
  <Stadistics content={solutionData.statistics} solution={solution} lang={lang} />
  <Information content={solutionData.information} />
  <Fundable content={solutionData.fundable} />
</Layout>
```

---

## 5. Architectural Benefits Summary

1. **Strict Type Safety**: `Hero.astro` relies on a clean, predictable `content` interface (`title`, `description`, `button`) that applies uniformly to all pages.
2. **Encapsulated Component Complexity**: Each solution card set gets its own `.astro` component with full freedom over SVGs, card grids, and layout variations.
3. **Instant Development Speed**: You don't have to manage complex TypeScript union objects inside `es.ts` / `en.ts`. Adding a new solution only requires creating its card component and registering it in `HeroCardsRegistry.astro`.
