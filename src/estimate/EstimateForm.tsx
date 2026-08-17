import { type FormEvent, useEffect, useMemo, useState } from "react";
import {
  estimateSteps,
  type EstimateAnswers,
  type EstimateField,
} from "./config";

const DRAFT_KEY = "prestige-questions-draft";

// Sólo para maquetación/pruebas. Cambiar a false o eliminar este bloque antes de publicar.
const SHOW_DEVELOPMENT_CONTROLS = true;

function getEntryState(): {
  answers: EstimateAnswers;
  step: number;
  hasEntry: boolean;
} {
  if (typeof window === "undefined") {
    return { answers: {}, step: 0, hasEntry: false };
  }

  const params = new URLSearchParams(window.location.search);
  const project = params.get("project") ?? undefined;
  const area = params.get("area") ?? undefined;
  const zip = params.get("zip") ?? undefined;

  return {
    answers: { servicesType: project, area, zip },
    step: project ? 1 : 0,
    hasEntry: params.has("project") || params.has("area") || params.has("zip"),
  };
}

function readDraft(): { answers: EstimateAnswers; step: number } {
  if (typeof window === "undefined") return { answers: {}, step: 0 };
  try {
    const saved = window.sessionStorage.getItem(DRAFT_KEY);
    return saved ? JSON.parse(saved) : { answers: {}, step: 0 };
  } catch {
    return { answers: {}, step: 0 };
  }
}

function validateField(field: EstimateField, value: string | undefined) {
  if (!value?.trim()) return "This field is required.";
  if (field.type === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
    return "Enter a valid email address.";
  }
  return undefined;
}

export default function EstimateForm() {
  const entry = useMemo(getEntryState, []);
  const draft = useMemo(readDraft, []);
  const initialState = entry.hasEntry ? entry : draft;
  const [answers, setAnswers] = useState<EstimateAnswers>(initialState.answers);
  const [stepIndex, setStepIndex] = useState(initialState.step ?? 0);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const step = estimateSteps[stepIndex];
  const isFinalStep = stepIndex === estimateSteps.length - 1;
  const progressPercentage = ((stepIndex + 1) / estimateSteps.length) * 100;
  const choiceField = step.fields.find((field) => field.type === "choice");

  useEffect(() => {
    window.sessionStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({ answers, step: stepIndex }),
    );
  }, [answers, stepIndex]);

  function setAnswer(id: EstimateField["id"], value: string) {
    setAnswers((current) => ({ ...current, [id]: value }));
    setErrors((current) => ({ ...current, [id]: undefined }));
  }

  function validateStep() {
    if (SHOW_DEVELOPMENT_CONTROLS) {
      setErrors({});
      return true;
    }

    const nextErrors: Partial<Record<string, string>> = {};
    step.fields.forEach((field) => {
      const error = validateField(field, answers[field.id]);
      if (error) nextErrors[field.id] = error;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goToPreviousStep() {
    setErrors({});
    setStepIndex((current) => Math.max(current - 1, 0));
  }

  function goToNextStep() {
    if (!validateStep()) return;
    setStepIndex((current) => Math.min(current + 1, estimateSteps.length - 1));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateStep()) return;

    if (!isFinalStep) {
      goToNextStep();
      return;
    }

    console.log("Estimate request", {
      ...answers,
      submittedAt: new Date().toISOString(),
    });
    window.sessionStorage.removeItem(DRAFT_KEY);
    setSubmitted(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative z-[3] flex h-full w-full flex-col items-center px-5 pb-8 pt-28 text-white md:px-8 md:pb-10 md:pt-30 gap-8"
    >
      <div className="container-full flex flex-col justify-center items-end">
        <div className="mb-2.25 flex items-center justify-between text-[16px] font-normal leading--[100%] text-white">
          <span className="sr-only">Form progress</span>
          <span className="ml-auto">
            {stepIndex + 1} / {estimateSteps.length}
          </span>
        </div>
        <div
          className="h-[9px] w-full overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-label={`Progress: step ${stepIndex + 1} of ${estimateSteps.length}`}
          aria-valuemin={1}
          aria-valuemax={estimateSteps.length}
          aria-valuenow={stepIndex + 1}
        >
          <div
            className="h-full rounded-full bg-secondary transition-[width] duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center w-full md:w-auto">
        {submitted ? (
          <div className="text-center" role="status">
            <h1 className="font-georgia text-[26px] text-secondary md:text-[32px]">
              Thank you
            </h1>
          </div>
        ) : (
          <article className="flex w-full flex-col items-center gap-8">
            <header className=" text-center ">
              <h1 className="font-georgia text-[24px] md:text-[32px] leading-[183%] md:leading-[137.5%] tracking-[-1.1px] text-secondary text-center font-normal">
                {step.title}
              </h1>
            </header>

            {choiceField ? (
              <fieldset className="w-full md:w-[380px]">
                <legend className="sr-only">{choiceField.label}</legend>
                <div className="grid gap-1.5 md:gap-2 w-full md:w-auto">
                  {choiceField.options?.map((option) => {
                    const selected = answers[choiceField.id] === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setAnswer(choiceField.id, option.value)}
                        className={`w-full rounded-lg border-[1.5px] p-6 text-center text-[14px] md:text-[16px] font-normal text-white transition leading-[100%] cursor-pointer ${
                          selected
                            ? "border-secondary bg-black/80 shadow-[0_18px_5px_0_rgba(0, 0, 0, 0.00), 0_11px_5px_0_rgba(0, 0, 0, 0.02), 0_6px_4px_0_rgba(0, 0, 0, 0.08), 0_3px_3px_0_rgba(0, 0, 0, 0.13), 0_1px_2px_0 rgba(0, 0, 0, 0.15)]"
                            : "border-white/20 bg-black/40 hover:border-white/60"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
                {errors[choiceField.id] && (
                  <p
                    role="alert"
                    className="mt-2 text-center text-xs text-secondary"
                  >
                    {errors[choiceField.id]}
                  </p>
                )}
              </fieldset>
            ) : (
              <div className="grid w-full gap-3">
                {step.fields.map((field) => (
                  <label key={field.id} className="grid gap-1">
                    <span className="sr-only">{field.label}</span>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      autoComplete={field.autocomplete}
                      value={answers[field.id] ?? ""}
                      onChange={(event) =>
                        setAnswer(field.id, event.target.value)
                      }
                      aria-invalid={Boolean(errors[field.id])}
                      aria-describedby={
                        errors[field.id] ? `${field.id}-error` : undefined
                      }
                      className="w-full rounded-lg border border-[#E3E3E3] bg-black/10 px-4 py-5.25 text-[15px] text-white outline-none placeholder:text-white/45 focus:border-secondary font-normal leading-[100%]"
                    />
                    {errors[field.id] && (
                      <span
                        id={`${field.id}-error`}
                        role="alert"
                        className="text-xs text-secondary"
                      >
                        {errors[field.id]}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            )}

            <button
              type="submit"
              className="py-[18px] px-12 bg-secondary rounded-[14px] flex justify-center items-center gap-2 text-[16px] leading-[100%] tracking-[1.44px] uppercase text-[#0A0A0A] font-medium transition-all duration-300 ease-in-out hover:translate-y-[-3px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isFinalStep ? "Submit" : "Next"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M15.575 9.24098C15.6735 9.24104 15.771 9.26051 15.8619 9.29826C15.9529 9.33601 16.0355 9.39131 16.1051 9.461C16.1747 9.53069 16.2299 9.61341 16.2676 9.70443C16.3052 9.79545 16.3245 9.89299 16.3245 9.99148C16.3244 10.09 16.3049 10.1875 16.2672 10.2785C16.2294 10.3694 16.1741 10.4521 16.1044 10.5217C16.0347 10.5913 15.952 10.6464 15.861 10.6841C15.77 10.7217 15.6725 10.741 15.574 10.741L15.575 9.24098ZM14.4445 9.99048L14.4445 9.24048L14.445 9.24048L14.4445 9.99048ZM9.42596 10.7405C9.22705 10.7405 9.03629 10.6615 8.89563 10.5208C8.75498 10.3802 8.67596 10.1894 8.67596 9.99048C8.67596 9.79157 8.75498 9.6008 8.89563 9.46015C9.03629 9.3195 9.22705 9.24048 9.42596 9.24048L9.42596 10.7405ZM9.41671 9.24048C9.61563 9.24048 9.80639 9.3195 9.94704 9.46015C10.0877 9.6008 10.1667 9.79157 10.1667 9.99048C10.1667 10.1894 10.0877 10.3802 9.94704 10.5208C9.80639 10.6615 9.61563 10.7405 9.41671 10.7405L9.41671 9.24048ZM3.99996 10.7405C3.80105 10.7405 3.61029 10.6615 3.46963 10.5208C3.32898 10.3802 3.24996 10.1894 3.24996 9.99048C3.24996 9.79157 3.32898 9.6008 3.46963 9.46015C3.61029 9.3195 3.80105 9.24048 3.99996 9.24048L3.99996 10.7405ZM15.574 10.741L15.5552 10.741L15.556 9.24098L15.575 9.24098L15.574 10.741ZM15.5552 10.741L15.3327 10.741L15.334 9.24098L15.556 9.24098L15.5552 10.741ZM15.3327 10.741L15.1107 10.741L15.1117 9.24098L15.334 9.24098L15.3327 10.741ZM15.1107 10.741L14.8882 10.7407L14.8895 9.24073L15.1117 9.24098L15.1107 10.741ZM14.8882 10.7407L14.6662 10.7405L14.6672 9.24048L14.8895 9.24073L14.8882 10.7407ZM14.6662 10.7405L14.444 10.7405L14.445 9.24048L14.6672 9.24048L14.6662 10.7405ZM14.4445 10.7405L9.42596 10.7405L9.42596 9.24048L14.4445 9.24048L14.4445 10.7405ZM9.41671 10.7405L3.99996 10.7405L3.99996 9.24048L9.41671 9.24048L9.41671 10.7405Z"
                  fill="black"
                />
                <path
                  d="M10.2224 3.77759L15.5164 9.07184C15.6383 9.19372 15.735 9.33841 15.801 9.49766C15.8669 9.65691 15.9009 9.82759 15.9009 9.99996C15.9009 10.1723 15.8669 10.343 15.801 10.5023C15.735 10.6615 15.6383 10.8062 15.5164 10.9281L10.2222 16.2221"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </article>
        )}
      </div>

      {SHOW_DEVELOPMENT_CONTROLS && !submitted && (
        <nav aria-label="Controles de desarrollo" className="flex gap-2">
          <button
            type="button"
            onClick={goToPreviousStep}
            disabled={stepIndex === 0}
            className="rounded border border-white/30 bg-black/25 px-3 py-1.5 text-[10px] text-white/80 transition hover:border-secondary disabled:cursor-not-allowed disabled:opacity-35"
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={goToNextStep}
            disabled={isFinalStep}
            className="rounded border border-white/30 bg-black/25 px-3 py-1.5 text-[10px] text-white/80 transition hover:border-secondary disabled:cursor-not-allowed disabled:opacity-35"
          >
            Next →
          </button>
        </nav>
      )}
    </form>
  );
}
