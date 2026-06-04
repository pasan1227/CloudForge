"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";

type Budget = "explore" | "25k" | "50k" | "100k" | "200k";
type Discipline = "engineering" | "growth" | "brand" | "strategy";

interface ContactState {
  name: string;
  email: string;
  company: string;
  budget: Budget | "";
  disciplines: Discipline[];
  message: string;
}

type Errors = Partial<Record<keyof ContactState, string>>;

type Status = "idle" | "submitting" | "success" | "error";

const initial: ContactState = {
  name: "",
  email: "",
  company: "",
  budget: "",
  disciplines: [],
  message: "",
};

const budgetOptions: { value: Budget; label: string }[] = [
  { value: "explore", label: "Exploring" },
  { value: "25k", label: "$25k+" },
  { value: "50k", label: "$50k+" },
  { value: "100k", label: "$100k+" },
  { value: "200k", label: "$200k+" },
];

const disciplineOptions: { value: Discipline; label: string }[] = [
  { value: "engineering", label: "Engineering" },
  { value: "growth", label: "Growth" },
  { value: "brand", label: "Brand" },
  { value: "strategy", label: "Strategy" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(state: ContactState): Errors {
  const errs: Errors = {};
  if (!state.name.trim()) errs.name = "Tell us who we're talking to.";
  if (!state.email.trim()) errs.email = "We'll need an email to reply.";
  else if (!EMAIL_RE.test(state.email)) errs.email = "That doesn't look right.";
  if (!state.message.trim() || state.message.trim().length < 20) {
    errs.message = "A few sentences, at least. We promise to read it.";
  }
  if (state.disciplines.length === 0) {
    errs.disciplines = "Pick at least one — you can always change your mind.";
  }
  return errs;
}

export default function ContactForm() {
  const [state, setState] = useState<ContactState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState<Partial<Record<keyof ContactState, boolean>>>({});

  const updateField = <K extends keyof ContactState>(
    key: K,
    value: ContactState[K]
  ): void => {
    setState((s) => ({ ...s, [key]: value }));
    if (touched[key]) {
      setErrors((e) => {
        const next = { ...e };
        const local = validate({ ...state, [key]: value });
        if (local[key]) next[key] = local[key];
        else delete next[key];
        return next;
      });
    }
  };

  const onBlur = (key: keyof ContactState): void => {
    setTouched((t) => ({ ...t, [key]: true }));
    const errs = validate(state);
    setErrors((e) => ({ ...e, [key]: errs[key] }));
  };

  const toggleDiscipline = (d: Discipline): void => {
    const next = state.disciplines.includes(d)
      ? state.disciplines.filter((x) => x !== d)
      : [...state.disciplines, d];
    updateField("disciplines", next);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const errs = validate(state);
    setErrors(errs);
    setTouched({
      name: true,
      email: true,
      company: true,
      budget: true,
      disciplines: true,
      message: true,
    });
    if (Object.keys(errs).length > 0) return;
    setStatus("submitting");
    // Simulate submission — in production this would POST to a route handler.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div
        className="rounded-3xl glass-strong p-10 text-center"
        role="status"
        aria-live="polite"
      >
        <div
          aria-hidden="true"
          className="mx-auto grid place-items-center size-14 rounded-2xl bg-gradient-to-br from-teal-300 to-cyan-400 text-ink-950 font-display text-2xl"
        >
          ✓
        </div>
        <h3 className="mt-6 font-display text-3xl tracking-tight">
          Thanks, {state.name.split(" ")[0] || "friend"}.
        </h3>
        <p className="mt-3 text-mist-300">
          Your note landed. We&apos;ll write back within one working day — usually
          much sooner.
        </p>
      </div>
    );
  }

  const fieldClass = (key: keyof ContactState): string =>
    [
      "w-full rounded-2xl bg-surface-1 ring-hairline px-4 py-3.5 text-mist-50 placeholder:text-mist-500",
      "focus:outline-none focus:ring-2 focus:ring-teal-300 transition",
      errors[key] ? "ring-2 ring-coral-400" : "",
    ].join(" ");

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-3xl glass-strong p-8 sm:p-10">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          id="name"
          label="Your name"
          error={touched.name ? errors.name : undefined}
        >
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={state.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateField("name", e.target.value)
            }
            onBlur={() => onBlur("name")}
            className={fieldClass("name")}
            placeholder="Maya Okafor"
            aria-invalid={Boolean(errors.name && touched.name)}
            aria-describedby={errors.name ? "name-err" : undefined}
          />
        </Field>

        <Field
          id="email"
          label="Email"
          error={touched.email ? errors.email : undefined}
        >
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={state.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateField("email", e.target.value)
            }
            onBlur={() => onBlur("email")}
            className={fieldClass("email")}
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email && touched.email)}
            aria-describedby={errors.email ? "email-err" : undefined}
          />
        </Field>
      </div>

      <Field className="mt-5" id="company" label="Company (optional)">
        <input
          id="company"
          type="text"
          autoComplete="organization"
          value={state.company}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateField("company", e.target.value)
          }
          className={fieldClass("company")}
          placeholder="Lumen Bank"
        />
      </Field>

      <fieldset className="mt-7">
        <legend className="text-sm text-mist-300">
          What kind of help are you after?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {disciplineOptions.map((d) => {
            const active = state.disciplines.includes(d.value);
            return (
              <button
                key={d.value}
                type="button"
                aria-pressed={active}
                onClick={() => toggleDiscipline(d.value)}
                onBlur={() => onBlur("disciplines")}
                className={[
                  "rounded-full px-4 py-2 text-sm transition",
                  active
                    ? "bg-mist-50 text-ink-950"
                    : "bg-surface-1 text-mist-200 ring-hairline hover:text-mist-50",
                ].join(" ")}
              >
                {d.label}
              </button>
            );
          })}
        </div>
        {touched.disciplines && errors.disciplines ? (
          <p id="disciplines-err" className="mt-2 text-sm text-coral-300">
            {errors.disciplines}
          </p>
        ) : null}
      </fieldset>

      <fieldset className="mt-7">
        <legend className="text-sm text-mist-300">Budget (optional)</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {budgetOptions.map((b) => {
            const active = state.budget === b.value;
            return (
              <button
                key={b.value}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  updateField("budget", active ? "" : b.value)
                }
                className={[
                  "rounded-full px-4 py-2 text-sm transition",
                  active
                    ? "bg-mist-50 text-ink-950"
                    : "bg-surface-1 text-mist-200 ring-hairline hover:text-mist-50",
                ].join(" ")}
              >
                {b.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <Field
        className="mt-7"
        id="message"
        label="The brief"
        hint="A paragraph is plenty. What are you trying to do, by when, and what does winning look like?"
        error={touched.message ? errors.message : undefined}
      >
        <textarea
          id="message"
          rows={6}
          value={state.message}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            updateField("message", e.target.value)
          }
          onBlur={() => onBlur("message")}
          className={`${fieldClass("message")} min-h-[10rem] resize-y`}
          placeholder="We're a 12-person fintech preparing for a Series A and we'd like…"
          aria-invalid={Boolean(errors.message && touched.message)}
          aria-describedby={errors.message ? "message-err" : "message-hint"}
        />
      </Field>

      <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-xs text-mist-400">
          We&apos;ll never share your details. Reply within one working day.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className={[
            "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium tracking-tight transition",
            "bg-gradient-to-br from-teal-300 to-cyan-400 text-ink-950",
            "shadow-[0_18px_40px_-12px_color-mix(in_srgb,var(--teal-400)_45%,transparent)]",
            "disabled:opacity-70 disabled:cursor-not-allowed hover:brightness-105",
          ].join(" ")}
        >
          {status === "submitting" ? (
            <>
              <Spinner />
              Sending…
            </>
          ) : (
            <>
              Send brief <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

function Field({ id, label, hint, error, className = "", children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm text-mist-300 mb-2">
        {label}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-2 text-xs text-mist-400">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-err`} className="mt-2 text-sm text-coral-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-4 rounded-full border-2 border-ink-900/30 border-t-ink-900 animate-spin"
    />
  );
}
