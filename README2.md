# Hero cards — integración

Estas son las **10 cards de Hero** (5 soluciones × 2 cards) resueltas con 6 componentes
reutilizables en vez de 10-15 archivos casi idénticos. El preview que viste arriba en el
chat es exactamente esta misma data — ya está en código, no es solo mockup.

## 1. Copiar los archivos

Copia la carpeta `src/` completa dentro de tu proyecto, respetando las rutas (ningún
archivo se sobreescribe si ya tienes `src/types/language.type.ts`, en ese caso solo
ignora el que te mando):

```
src/types/language.type.ts                          (puede que ya lo tengas)
src/types/solutionCards.type.ts
src/data/heroCardsConfig.ts
src/components/solutions/CardShell.astro
src/components/solutions/HeroCardsPanel.astro
src/components/solutions/icons/CheckIcon.astro
src/components/solutions/icons/ArrowUpIcon.astro
src/components/solutions/widgets/DonutWidget.astro
src/components/solutions/widgets/GaugeWidget.astro  
src/components/solutions/widgets/BarListWidget.astro
src/components/solutions/widgets/BadgeProgressWidget.astro
src/components/solutions/widgets/ChecklistWidget.astro
src/components/solutions/widgets/LineChartWidget.astro
src/components/solutions/widgets/WidgetRegistry.astro
```

## 2. Sobre los SVG — no necesitas pasarme ninguno

Todo lo que ves (donuts, gauge, línea, checkmarks, flecha) **se genera con código**, no
son archivos de imagen:

- **Donut / anillo**: es un `<circle>` de SVG al que le pongo `pathLength="100"` — un
  truco que hace que `stroke-dasharray` funcione directo en porcentajes (30 = 30%,
  sin calcular circunferencias a mano). Cada segmento es un círculo más, apilado.
- **Gauge (medidor semicircular)**: mismo truco pero con un `<path>` de arco en vez de
  círculo completo, más un punto (`<circle>`) que se posiciona con trigonometría simple
  calculada en el frontmatter del componente (en build time, no en el navegador).
- **Línea (Cash Flow)**: un `<polyline>` cuyos puntos se calculan a partir de un array
  de números (0–100) que tú defines en la config.
- **Check y flecha**: dos iconos SVG genéricos y reutilizables
  (`icons/CheckIcon.astro`, `icons/ArrowUpIcon.astro`) que uso en todas las cards que
  los necesitan.

Solo necesitarías pasarme un SVG si en algún momento quieres un ícono de marca
específico (el logo, un ícono ilustrado a medida, etc.) — para gráficos y checks
genéricos no hace falta, se generan solos a partir de la data.

## 3. Cómo funciona el multilenguaje

Cada texto en `heroCardsConfig.ts` es un objeto `{ en: "...", es: "..." }` (tipo
`Bilingual`). Los widgets reciben un prop `lang` y hacen `label[lang]` internamente.
No toca tu `i18n/en.ts` / `i18n/es.ts` — es un archivo de datos separado, específico
para las cards, tal como se planteó en la guía original (texto puro en `i18n`,
componentes complejos aparte).

Si prefieres tener todo centralizado en `i18n/es.ts` / `i18n/en.ts`, puedes mover el
contenido de `heroCardsConfig.ts` ahí después — la estructura de tipos es la misma,
solo cambia dónde vive el archivo.

## 4. Cómo se usa — un solo componente, `solution` como prop

`HeroCardsPanel.astro` ya resuelve todo: recibe `solution` y `lang`, busca su config en
`heroCardsConfig.ts`, elige los widgets correctos por `WidgetRegistry` y los pinta.

Dentro de tu `Hero.astro` actual, solo necesitas envolver la imagen en un contenedor
`relative` y meter el panel adentro:

```astro
---
import HeroCardsPanel from "../../components/solutions/HeroCardsPanel.astro";
// ...tus imports actuales
const { content, solution, lang } = Astro.props;
---

<section class="w-full flex justify-center items-center relative overflow-hidden bg-[#000800]">
  <div class="container-full flex justify-between items-center z-10 py-16 gap-8">
    <div class="flex flex-col justify-center items-start gap-10 max-w-lg">
      <!-- tu columna de texto igual que ya la tienes -->
    </div>

    <!-- contenedor relative que envuelve la foto -->
    <div class="relative shrink-0">
      <img src="/images/solutions/hero-person.jpg" alt="" class="rounded-2xl" />
      <HeroCardsPanel solution={solution} lang={lang} />
    </div>
  </div>
</section>
```

Y en `[solution]/index.astro` no cambia nada respecto a lo que ya armamos antes — sigues
pasando `solution={solution} lang={lang}` a `Hero.astro`.

## 5. Posicionamiento — es literalmente el mismo para las 5 páginas

Dentro de `HeroCardsPanel.astro` hay exactamente dos números que controlan todo:

```astro
<div class="absolute -left-6 top-10 pointer-events-auto">   <!-- card grande -->
<div class="absolute -right-6 bottom-8 pointer-events-auto"> <!-- card chica -->
```

No hay posición por solución — cambias estos dos valores una vez y las 5 páginas se
mueven juntas, tal como lo describiste. Si quieres afinar el resultado visual, ajusta
solo estos dos `class` (y los anchos `w-[248px]` / `w-[224px]` en `CardShell.astro` si
las quieres más grandes o chicas).

## 6. Por qué no da error de tipos

`Hero.astro` / `Stadistics.astro` siguen recibiendo un `content` con la forma fija
(`title`, `description`, `button`) para las 5 soluciones — eso es lo que TypeScript
valida y nunca cambia. Las cards viven aparte, en `heroCardsConfig.ts`, tipadas con
`SolutionHeroCards` (un `primary` y un `secondary`, cada uno con su `widget` +
`data` propio). Agregar una solución nueva es agregar una entrada a ese objeto — cero
componentes nuevos, cero types rotos.

## 7. Qué puedo ajustar si me pasas más info

- Colores exactos por marca/paleta (ahora mismo uso negro `#111`, dorado `#C9A24B`,
  verde `#1E7A4C` y `#0B3B24`, sacados de tus capturas).
- Tamaños de card / tipografía — son clases de Tailwind, se ajustan directo.
- Si alguna solución necesita un widget que no está en la lista (los 6 tipos:
  `donut`, `gauge`, `barList`, `badgeProgress`, `checklist`, `lineChart`), me dices cuál
  y armamos el séptimo widget sin tocar nada de lo demás.
