import type { SolutionHeroCards } from "../types/solutionCards.type.ts";

/**
 * One entry per solution slug (must match the [solution] route param).
 * Each solution has exactly two cards: `primary` (larger, top-left) and
 * `secondary` (compact, bottom-right). Swap `widget` to any of the six
 * registered types without touching any component code — see
 * src/components/solutions/widgets/WidgetRegistry.astro for the list.
 */
export const heroCardsConfig: Record<string, SolutionHeroCards> = {
  "business-funding": {
    primary: {
      widget: "donut",
      title: { en: "Capital Use Plan", es: "Plan de Uso de Capital" },
      data: {
        layout: "side",
        centerValue: "$750K",
        segments: [
          {
            label: { en: "Expansion", es: "Expansión" },
            percent: 50,
            color: "#000800",
          },
          {
            label: { en: "Equipment", es: "Equipamiento" },
            percent: 25,
            color: "#D3AE6A",
          },
          {
            label: { en: "Hiring", es: "Contratación" },
            percent: 15,
            color: "#006836",
          },
          {
            label: { en: "Marketing", es: "Marketing" },
            percent: 10,
            color: "#002D15",
          },
        ],
      },
    },
    secondary: {
      widget: "badgeProgress",
      title: { en: "Funding Potential", es: "Potencial de Financiamiento" },
      data: {
        bigValue: "$750,000",
        progressPercent: 80,
        statusText: {
          en: "High Approval Potential",
          es: "Alto Potencial de Aprobación",
        },
      },
    },
  },

  "credit-optimization": {
    primary: {
      widget: "barList",
      title: { en: "Credit Optimization", es: "Optimización de Crédito" },
      data: {
        rows: [
          {
            label: { en: "Personal Credit", es: "Crédito Personal" },
            statusText: { en: "Optimized", es: "Optimizado" },
            percent: 70,
            color: "#002D15",
          },
          {
            label: { en: "Business Credit", es: "Crédito Empresarial" },
            statusText: { en: "Optimized", es: "Optimizado" },
            percent: 70,
            color: "#D3AE6A",
          },
          {
            label: { en: "Lender Confidence", es: "Confianza del Prestamista" },
            statusText: { en: "High", es: "Alta" },
            percent: 70,
            color: "#000800",
          },
        ],
      },
    },
    secondary: {
      widget: "gauge",
      title: {
        en: "Business Credit Score",
        es: "Puntaje de Crédito Empresarial",
      },
      data: {
        value: 785,
        min: 300,
        max: 850,
        statusLabel: { en: "Excellent", es: "Excelente" },
        callout: {
          text: {
            en: "High lending potential. <br/> Strong profile. More options.",
            es: "Alto potencial de préstamo. <br/> Perfil sólido. Más opciones.",
          },
        },
      },
    },
  },

  "lender-ready-growth-system": {
    primary: {
      widget: "gauge",
      title: { en: "Lender Confidence", es: "Confianza del Prestamista" },
      data: {
        value: 92,
        valueSuffix: "%",
        statusLabel: {
          en: "High Approval Potential",
          es: "Alto Potencial de Aprobación",
        },
        callout: {
          text: {
            en: "Well-prepared businesses get <br/> better terms and faster <br/> approvals.",
            es: "Los negocios bien preparados <br/> obtienen mejores términos y <br/> aprobaciones más rápidas.",
          },
        },
      },
    },
    secondary: {
      widget: "checklist",
      title: {
        en: "Lender Checklist",
        es: "Lista de Verificación del Prestamista",
      },
      data: {
        items: [
          {
            label: {
              en: "Strong Credit Profile",
              es: "Perfil de Crédito Sólido",
            },
          },
          { label: { en: "Clean Financials", es: "Finanzas en Orden" } },
          {
            label: {
              en: "Consistent Cash Flow",
              es: "Flujo de Caja Consistente",
            },
          },
          {
            label: {
              en: "Clear Business Structure",
              es: "Estructura Empresarial Clara",
            },
          },
          {
            label: {
              en: "Growth Plan in Place",
              es: "Plan de Crecimiento Establecido",
            },
          },
        ],
      },
    },
  },

  "flow-optimization": {
    primary: {
      widget: "donut",
      title: { en: "Cash Flow Health", es: "Salud del Flujo de Caja" },
      data: {
        layout: "stacked",
        centerValue: "85%",
        centerSubLabel: { en: "Healthy", es: "Saludable" },
        segments: [
          {
            label: { en: "Incoming", es: "Ingresos" },
            percent: 55,
            displayValue: "$280,000",
            color: "#000800",
          },
          {
            label: { en: "Outgoing", es: "Egresos" },
            percent: 27,
            displayValue: "$135,000",
            color: "#D3AE6A",
          },
          {
            label: { en: "Net Cash Flow", es: "Flujo de Caja Neto" },
            percent: 18,
            displayValue: "$145,000",
            color: "#006836",
          },
        ],
      },
    },
    secondary: {
      widget: "lineChart",
      title: { en: "Cash Flow Overview", es: "Resumen de Flujo de Caja" },
      data: {
        valueLabel: { en: "Net Cash Flow", es: "Flujo de Caja Neto" },
        bigValue: "$145,000",
        badgeText: "+18%",
        series: [
          [22, 34, 44, 56, 66, 76, 88],
          [10, 16, 22, 28, 34, 42, 50],
        ],
        colors: ["#006836", "#D3AE6A"],
      },
    },
  },

  "business-consulting": {
    primary: {
      widget: "donut",
      title: { en: "Capital Use Plan", es: "Plan de Uso de Capital" },
      data: {
        layout: "side",
        centerValue: "100%",
        segments: [
          {
            label: { en: "Profitability", es: "Rentabilidad" },
            percent: 38,
            color: "#111111",
          },
          {
            label: { en: "Cash Flow", es: "Flujo de Caja" },
            percent: 32,
            color: "#D3AE6A",
          },
          {
            label: { en: "Efficiency", es: "Eficiencia" },
            percent: 20,
            color: "#006836",
          },
          {
            label: { en: "Stability", es: "Estabilidad" },
            percent: 10,
            color: "#002D15",
          },
        ],
      },
    },
    secondary: {
      widget: "checklist",
      title: { en: "Financial Roadmap", es: "Hoja de Ruta Financiera" },
      data: {
        items: [
          {
            label: { en: "Growth Strategy", es: "Estrategia de Crecimiento" },
            description: {
              en: "Plan for scalable growth",
              es: "Planifica un crecimiento escalable",
            },
          },
          {
            label: { en: "Financial Planning", es: "Planificación Financiera" },
            description: {
              en: "Budget, forecast and plan ahead",
              es: "Presupuesta, proyecta y planifica con anticipación",
            },
          },
          {
            label: { en: "Risk Management", es: "Gestión de Riesgos" },
            description: {
              en: "Protect your business and profits",
              es: "Protege tu negocio y tus ganancias",
            },
          },
          {
            label: { en: "Long-Term Value", es: "Valor a Largo Plazo" },
            description: {
              en: "Build equity and increase value",
              es: "Genera patrimonio y aumenta el valor",
            },
          },
        ],
      },
    },
  },
};
