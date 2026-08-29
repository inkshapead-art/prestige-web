export type FieldType = "choice" | "text" | "email" | "tel";
export type StepLayout = "list" | "grid" | "form";

export type EstimateOption = {
  label: string;
  value: string;
  description?: string;
};

export type EstimateField = {
  id: "servicesType" | "area" | "name" | "email" | "phone";
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
export const estimateSteps: EstimateStep[] = [
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

export type EstimateAnswers = Partial<
  Record<EstimateField["id"] | "zip", string>
>;
