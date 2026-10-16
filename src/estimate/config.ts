export type FieldType = "choice" | "select" | "text" | "email" | "tel";
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
    | "businessRegistration"
    | "capitalPurpose"
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
    id: "contact-registration",
    title: "Completa tus datos",
    layout: "form",
    fields: [
      {
        id: "name",
        label: "Nombre completo",
        placeholder: "Tu nombre y apellido",
        type: "text",
        autocomplete: "name",
      },
      {
        id: "phone",
        label: "Teléfono / WhatsApp",
        placeholder: "Teléfono / WhatsApp",
        type: "tel",
        autocomplete: "tel",
      },
      {
        id: "email",
        label: "Correo electrónico",
        placeholder: "tu@correo.com",
        type: "email",
        autocomplete: "email",
      },
      {
        id: "businessRegistration",
        label: "¿Tu negocio está registrado?",
        type: "select",
        options: [
          { label: "Sí, tengo una LLC", value: "Sí, tengo una LLC" },
          {
            label: "Sí, Corporación (S-Corp / C-Corp)",
            value: "Sí, Corporación (S-Corp / C-Corp)",
          },
          {
            label: "Sí, propietario único",
            value: "Sí, propietario único",
          },
          {
            label: "Todavía no tengo negocio",
            value: "Todavía no tengo negocio",
          },
        ],
      },
    ],
  },
  {
    id: "business-age",
    title: "¿Hace cuánto opera tu negocio?",
    layout: "list",
    fields: [
      {
        id: "businessAge",
        label: "Antigüedad del negocio",
        type: "choice",
        options: [
          { label: "Menos de 6 meses", value: "Menos de 6 meses" },
          { label: "6 a 12 meses", value: "6 a 12 meses" },
          { label: "1 a 2 años", value: "1 a 2 años" },
          { label: "Más de 2 años", value: "Más de 2 años" },
        ],
      },
    ],
  },
  {
    id: "capital-needed",
    title: "¿Cuánto capital necesitas?",
    layout: "list",
    fields: [
      {
        id: "capitalNeeded",
        label: "Capital necesario",
        type: "choice",
        options: [
          { label: "Menos de $50,000", value: "Menos de $50,000" },
          { label: "$50,000 - $100,000", value: "$50,000 - $100,000" },
          { label: "$100,000 - $150,000", value: "$100,000 - $150,000" },
          { label: "Más de $150,000", value: "Más de $150,000" },
        ],
      },
    ],
  },
  {
    id: "credit-score",
    title: "¿Cómo está tu crédito personal?",
    layout: "list",
    fields: [
      {
        id: "creditScore",
        label: "Puntaje de crédito personal",
        type: "choice",
        options: [
          { label: "Excelente (720+)", value: "Excelente (720+)" },
          { label: "Bueno (680-719)", value: "Bueno (680-719)" },
          { label: "Regular (620-679)", value: "Regular (620-679)" },
          { label: "Por debajo de 620", value: "Por debajo de 620" },
          { label: "No lo sé", value: "No lo sé" },
        ],
      },
    ],
  },
  {
    id: "capital-purpose",
    title: "¿Para qué usarías el capital?",
    layout: "list",
    fields: [
      {
        id: "capitalPurpose",
        label: "Uso del capital",
        type: "choice",
        options: [
          { label: "Expansión", value: "Expansión" },
          { label: "Inventario o equipos", value: "Inventario o equipos" },
          { label: "Marketing", value: "Marketing" },
          {
            label: "Flujo de efectivo / nómina",
            value: "Flujo de efectivo / nómina",
          },
          { label: "Refinanciar deudas", value: "Refinanciar deudas" },
          { label: "Otro", value: "Otro" },
        ],
      },
    ],
  },
];
export const estimateSteps: EstimateStep[] = estimateStepsEs;

export type EstimateAnswers = Partial<
  Record<EstimateField["id"] | "zip", string>
>;
