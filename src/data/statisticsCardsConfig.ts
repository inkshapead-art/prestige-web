import type { StatisticsCardsConfig } from "../types/statisticsCards.type";

/**
 * Configuration for Statistics section cards across all 5 solution pages.
 * Modify or add data here to populate each card dynamically,
 * or customize the corresponding Astro card component directly in:
 * src/components/solutions/statistics/
 */
export const statisticsCardsConfig: StatisticsCardsConfig = {
  "business-funding": {
    title: {
      en: "Cash Flow",
      es: "Flujo de caja",
    },
    subtitle: {
      en: "Weekly",
      es: "Semanal",
    },
    days: [
      { label: { en: "Mon", es: "Lun" } },
      { label: { en: "Tue", es: "Mar" } },
      { label: { en: "Wed", es: "Mie" } },
      { label: { en: "Thu", es: "Jue" } },
      { label: { en: "Fri", es: "Vie" } },
    ],
  },

  "credit-optimization": {
    title: {
      en: "Credit Score",
      es: "Puntaje de crédito",
    },
    subtitle: {
      en: "Good",
      es: "Bueno",
    },
  },

  "lender-ready-growth-system": {
    title: {
      en: "Ready",
      es: "Listo",
    },
    subtitle: {
      en: "Review",
      es: "Revisión",
    },
  },

  "flow-optimization": {
    title: {
      en: "Cash Flow Efficiency",
      es: "Eficiencia de flujo",
    },
    subtitle: {
      en: "Net Cash Flow",
      es: "Flujo de caja neto",
    },
  },

  "business-consulting": {
    title: {
      en: "Growth Projection",
      es: "Proyección de crecimiento",
    },
  },
};
