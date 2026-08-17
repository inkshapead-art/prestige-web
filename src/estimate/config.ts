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
            label: "Service 1",
            value: "service-1",
            description: "For homes and residential properties.",
          },
          {
            label: "Service 2",
            value: "service-2",
            description: "For businesses, offices, and commercial spaces.",
          },
          {
            label: "Service 3",
            value: "service-3",
            description: "For industrial facilities and projects.",
          },
          {
            label: "Service 4",
            value: "service-4",
            description: "For industrial facilities and projects.",
          },
          {
            label: "Service 5",
            value: "service-5",
            description: "For industrial facilities and projects.",
          },
          {
            label: "Service 6",
            value: "service-6",
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
