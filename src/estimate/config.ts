export type FieldType = "choice" | "text" | "email" | "tel";
export type StepLayout = "list" | "grid" | "form";

export type EstimateOption = {
  label: string;
  value: string;
  description?: string;
};

export type EstimateField = {
  id:
    | "servicesType"
    | "area"
    | "name"
    | "email"
    | "phone"
    | "businessAge"
    | "firstName"
    | "lastName"
    | "capitalNeeded"
    | "monthlyRevenue"
    | "businessBankAccount"
    | "businessIndustry"
    | "businessName"
    | "creditScore";
  label: string;
  placeholder?: string;
  type: FieldType;
  autocomplete?: string;
  options?: EstimateOption[];
};

export type EstimateStep = {
  id: string;
  title: string;
  description?: string;
  layout: StepLayout;
  fields: EstimateField[];
};

// Edita este archivo para cambiar las preguntas, opciones y textos del funnel.
export const estimateStepsUS: EstimateStep[] = [
  {
    id: "services",
    title: "What type of service do you need?",
    description: "Choose what type of project you need.",
    layout: "list",
    fields: [
      {
        id: "servicesType",
        label: "Service type",
        type: "choice",
        options: [
          {
            label: "Business Funding",
            value: "Business Funding",
            description: "For homes and residential properties.",
          },
          {
            label: "Business Consulting",
            value: "Business Consulting",
            description: "For industrial facilities and projects.",
          },
          {
            label: "Credit Optimization",
            value: "Credit Optimization",
            description: "For industrial facilities and projects.",
          },
          {
            label: "Business loans, SBA, BLOC, BUSINESS CREDIT CARD",
            value: "Business loans, SBA, BLOC, BUSINESS CREDIT CARD",
            description: "For industrial facilities and projects.",
          },
        ],
      },
    ],
  },
  {
    id: "contact",
    title: "How can we contact you?",
    description: "Share your name and email address.",
    layout: "form",
    fields: [
      {
        id: "name",
        label: "Full name",
        placeholder: "Full name",
        type: "text",
        autocomplete: "name",
      },
    ],
  },
  {
    id: "phone",
    title: "What is your phone number?",
    description: "We will contact you to discuss your project.",
    layout: "form",
    fields: [
      {
        id: "phone",
        label: "Mobile number",
        placeholder: "Mobile number",
        type: "tel",
        autocomplete: "tel",
      },
    ],
  },
];

export const estimateStepsEs: EstimateStep[] = [
  {
    id: "step-1",
    title: "¿Cuándo comenzó tu negocio?", //[cite: 9]
    layout: "list",
    fields: [
      {
        id: "businessAge",
        label: "Antigüedad del negocio",
        type: "choice",
        options: [
          {
            label: "Actualmente no tengo un negocio",
            value: "Actualmente no tengo un negocio",
          }, //[cite: 9]
          { label: "Menos de 6 meses", value: "Menos de 6 meses" }, //[cite: 9]
          { label: "6 a 12 meses", value: "6 a 12 meses" }, //[cite: 9]
          { label: "1 a 2 años", value: "1 a 2 años" }, //[cite: 9]
          { label: "2 a 5 años", value: "2 a 5 años" }, //[cite: 9]
          { label: "5 a 10 años", value: "5 a 10 años" }, //[cite: 9]
          { label: "Más de 10 años", value: "Más de 10 años" }, //[cite: 9]
        ],
      },
    ],
  },
  {
    id: "step-2",
    title: "¿Cuál es tu nombre?", //[cite: 9]
    layout: "form",
    fields: [
      {
        id: "firstName",
        label: "Nombre",
        placeholder: "Nombre", //[cite: 9]
        type: "text",
        autocomplete: "given-name",
      },
      {
        id: "lastName",
        label: "Apellido",
        placeholder: "Apellido", //[cite: 9]
        type: "text",
        autocomplete: "family-name",
      },
    ],
  },
  {
    id: "step-3",
    title: "¿Cuál es tu correo electrónico?", //[cite: 9]
    layout: "form",
    fields: [
      {
        id: "email",
        label: "Correo electrónico",
        placeholder: "nombre@correo.com", //[cite: 9]
        type: "email",
        autocomplete: "email",
      },
    ],
  },
  {
    id: "step-4",
    title: "¿Cuál es el mejor número para comunicarnos contigo?", //[cite: 11]
    layout: "form",
    fields: [
      {
        id: "phone",
        label: "Número telefónico",
        placeholder: "US 000 000 0000", //[cite: 11]
        type: "tel",
        autocomplete: "tel",
      },
    ],
  },
  {
    id: "step-5",
    title: "¿Cuánto capital necesitas?", //[cite: 11]
    layout: "list",
    fields: [
      {
        id: "capitalNeeded",
        label: "Capital necesario",
        type: "choice",
        options: [
          { label: "Aún no lo sé", value: "Aún no lo sé" }, //[cite: 11]
          { label: "$10,000 a $24,999", value: "$10,000 a $24,999" }, //[cite: 11]
          { label: "$25,000 a $49,999", value: "$25,000 a $49,999" }, //[cite: 11]
          { label: "$50,000 a $99,999", value: "$50,000 a $99,999" }, //[cite: 11]
          { label: "$100,000 a $249,999", value: "$100,000 a $249,999" }, //[cite: 11]
          { label: "$250,000 a $499,999", value: "$250,000 a $499,999" }, //[cite: 11]
          { label: "$500,000 o más", value: "$500,000 o más" }, //[cite: 11]
        ],
      },
    ],
  },
  {
    id: "step-6",
    title: "¿Cuáles son tus ingresos mensuales?", //[cite: 11]
    description:
      "Si no estás seguro del número exacto, tu mejor estimación está bien.", //[cite: 11]
    layout: "form",
    fields: [
      {
        id: "monthlyRevenue",
        label: "Ingresos mensuales",
        placeholder: "$0.00", //[cite: 11]
        type: "text",
      },
    ],
  },
  {
    id: "step-7",
    title: "¿Operas desde una cuenta bancaria comercial?", //[cite: 13]
    layout: "list",
    fields: [
      {
        id: "businessBankAccount",
        label: "Cuenta bancaria comercial",
        type: "choice",
        options: [
          { label: "Sí", value: "Sí" }, //[cite: 13]
          { label: "No", value: "No" }, //[cite: 13]
        ],
      },
    ],
  },
  {
    id: "step-8",
    title: "¿A qué se dedica tu negocio?", //[cite: 13]
    layout: "list",
    fields: [
      {
        id: "businessIndustry",
        label: "Industria del negocio",
        type: "choice",
        options: [
          { label: "Construcción", value: "Construcción" }, //[cite: 13]
          {
            label: "Restaurante o alimentos",
            value: "Restaurante o alimentos",
          }, //[cite: 13]
          {
            label: "Flipping o bienes raíces",
            value: "Flipping o bienes raíces",
          }, //[cite: 13]
          { label: "Retail o e-commerce", value: "Retail o e-commerce" }, //[cite: 13]
          {
            label: "Servicios profesionales",
            value: "Servicios profesionales",
          }, //[cite: 13]
          { label: "Salud o bienestar", value: "Salud o bienestar" }, //[cite: 13]
          { label: "Otro", value: "Otro" }, //[cite: 13]
        ],
      },
    ],
  },
  {
    id: "step-9",
    title: "¿Cuál es el nombre de tu negocio?", //[cite: 13]
    layout: "form",
    fields: [
      {
        id: "businessName",
        label: "Nombre de tu negocio",
        placeholder: "Nombre de tu negocio", //[cite: 13]
        type: "text",
      },
    ],
  },
  {
    id: "step-10",
    title: "¿Cuál es tu puntaje de crédito personal?", //[cite: 15]
    layout: "list",
    fields: [
      {
        id: "creditScore",
        label: "Puntaje de crédito personal",
        type: "choice",
        options: [
          { label: "Menos de 580", value: "Menos de 580" }, //[cite: 15]
          { label: "580 a 649", value: "580 a 649" }, //[cite: 15]
          { label: "650 a 699", value: "650 a 699" }, //[cite: 15]
          { label: "700 a 749", value: "700 a 749" }, //[cite: 15]
          { label: "750 o más", value: "750 o más" }, //[cite: 15]
          { label: "No estoy seguro", value: "No estoy seguro" }, //[cite: 15]
        ],
      },
    ],
  },
];

export const estimateSteps: EstimateStep[] = estimateStepsEs;

export type EstimateAnswers = Partial<
  Record<EstimateField["id"] | "zip", string>
>;
