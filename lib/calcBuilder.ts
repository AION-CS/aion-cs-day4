import { BASE, FIG, FIGURE_IDS, MEASURES_L1 } from "@/data/custBase";
import type { FigureId } from "@/data/custBase";
import { bi, t } from "@/lib/lang";
import { parseAmount } from "@/lib/parseAmount";

/**
 * The "automatic calculator" under a calculation question: the formula split into small labelled parts. The learner types each
 * part (a value read from a printed row); the result is computed live and can be copied into the answer field. On "Check",
 * every part is compared with the value it should hold, and a wrong part names the exact row and part of the row to read,
 * never the value itself. Expected values come from the same constants as the tables and the model answers (data/custBase.ts).
 */
export type CalcPart = {
  id: string;
  /** Short label shown above the input. */
  label: string;
  expected: number;
  /** Absolute tolerance; 0 for a value read straight off a table. */
  tolerance?: number;
  /** Where to read it, shown when the part is flagged: the row and which part of it, never the value. */
  clue: string;
};

export type CalcBuilder = {
  parts: CalcPart[];
  compute: (v: Record<string, number>) => number;
  /** The formula with the learner's values in place, for display. */
  show: (v: Record<string, string>) => string;
};

const n = (s: string) => (s === "" || s === undefined ? "▢" : s);

/** F1: customers reached by the usage-based offers. */
const reachBuilder: CalcBuilder = bi({
  parts: [
    { id: "customers", label: t("Customers on annual contracts", "Kunden mit Jahresverträgen"), expected: BASE.customers, clue: t("The customer base: customers on annual contracts. Not the prospects, and not only the customers who agreed.", "Die Kundenbasis: Kunden mit Jahresverträgen. Nicht die Interessenten und nicht nur die Kunden, die zugestimmt haben.") },
    { id: "consent", label: t("Share who agreed to usage analysis (%)", "Anteil, der der Nutzungsanalyse zugestimmt hat (%)"), expected: BASE.consent, clue: t("The customer base: the share who agreed to usage analysis. Type it as printed, as a percentage, not as a fraction.", "Die Kundenbasis: der Anteil, der der Nutzungsanalyse zugestimmt hat. Tippen Sie ihn wie gedruckt, als Prozentzahl, nicht als Bruch.") },
    { id: "usable", label: t("Share of those with usable data (%)", "Anteil davon mit nutzbaren Daten (%)"), expected: BASE.usable, clue: t("The customer base: the share of those with usable usage data. It applies only to the customers who agreed, and it is a different percentage from the first.", "Die Kundenbasis: der Anteil davon mit nutzbaren Nutzungsdaten. Er gilt nur für die Kunden, die zugestimmt haben, und ist eine andere Prozentzahl als die erste.") },
  ],
  compute: (v: Record<string, number>) => v.customers * (v.consent / 100) * (v.usable / 100),
  show: (v: Record<string, string>) => `${n(v.customers)} × ${n(v.consent)} % × ${n(v.usable)} %`,
}) as CalcBuilder;

/** F2: the cost of the rebate in the window. */
const rebateBuilder: CalcBuilder = bi({
  parts: [
    { id: "customers", label: t("Customers on annual contracts", "Kunden mit Jahresverträgen"), expected: BASE.customers, clue: t("The customer base: customers on annual contracts.", "Die Kundenbasis: Kunden mit Jahresverträgen.") },
    { id: "share", label: t("Share who join (%)", "Anteil, der beitritt (%)"), expected: MEASURES_L1.C.memberShare, clue: t("Measure C: the share of customers who join. Only members receive the rebate, so this is not the share who agreed to usage analysis.", "Maßnahme C: der Anteil der Kunden, die beitreten. Nur Mitglieder erhalten den Rabatt, das ist also nicht der Anteil, der der Nutzungsanalyse zugestimmt hat.") },
    { id: "value", label: t("Average revenue per customer per year (€)", "Durchschnittlicher Umsatz pro Kunde und Jahr (€)"), expected: BASE.annualValue, clue: t("The customer base: the average revenue per customer per year. It is a yearly figure, and it is scaled to the window by the months.", "Die Kundenbasis: der durchschnittliche Umsatz pro Kunde und Jahr. Es ist eine Jahreszahl, und sie wird über die Monate auf das Zeitfenster umgerechnet.") },
    { id: "rebate", label: t("Rebate on the annual fee (%)", "Rabatt auf die Jahresgebühr (%)"), expected: MEASURES_L1.C.rebate, clue: t("Measure C: the rebate on the annual fee, as a percentage. It multiplies the revenue, not the number of customers.", "Maßnahme C: der Rabatt auf die Jahresgebühr, als Prozentzahl. Er wird mit dem Umsatz multipliziert, nicht mit der Kundenzahl.") },
    { id: "months", label: t("Months the programme runs", "Monate, die das Programm läuft"), expected: MEASURES_L1.C.months, clue: t("Measure C: the months the programme runs. It is divided by 12, because the revenue figure is for a whole year.", "Maßnahme C: die Monate, die das Programm läuft. Sie werden durch 12 geteilt, weil die Umsatzzahl für ein ganzes Jahr gilt.") },
  ],
  compute: (v: Record<string, number>) => v.customers * (v.share / 100) * v.value * (v.rebate / 100) * (v.months / 12),
  show: (v: Record<string, string>) => `${n(v.customers)} × ${n(v.share)} % × ${n(v.value)} × ${n(v.rebate)} % × ${n(v.months)} ÷ 12`,
}) as CalcBuilder;

/** F3: cost per customer reached by measure B. */
const perCustomerBuilder: CalcBuilder = bi({
  parts: [
    { id: "build", label: t("Build cost of measure B (€)", "Aufbaukosten von Maßnahme B (€)"), expected: MEASURES_L1.B.build, clue: t("Measure B: the build cost. It is one of the two costs of B; the other is the data-protection review.", "Maßnahme B: die Aufbaukosten. Sie sind eine der zwei Kosten von B; die andere ist die Datenschutzprüfung.") },
    { id: "review", label: t("Data-protection review of measure B (€)", "Datenschutzprüfung von Maßnahme B (€)"), expected: MEASURES_L1.B.review, clue: t("Measure B: the data-protection review. It belongs in the total cost, because B cannot be sent without it.", "Maßnahme B: die Datenschutzprüfung. Sie gehört in die Gesamtkosten, weil B ohne sie nicht versendet werden kann.") },
    { id: "reached", label: t("Customers reached (your F1)", "Erreichte Kunden (Ihr F1)"), expected: FIG.F1, tolerance: 0.5, clue: t("Your answer to F1 above. If it does not match what the check expects, correct F1 first. It is the customers B reaches, not all customers.", "Ihre Antwort auf F1 oben. Passt sie nicht zu dem, was die Prüfung erwartet, korrigieren Sie zuerst F1. Es sind die Kunden, die B erreicht, nicht alle Kunden.") },
  ],
  compute: (v: Record<string, number>) => (v.build + v.review) / v.reached,
  show: (v: Record<string, string>) => `(${n(v.build)} + ${n(v.review)}) ÷ ${n(v.reached)}`,
}) as CalcBuilder;

export const FIGURE_BUILDERS: Record<FigureId, CalcBuilder> = { F1: reachBuilder, F2: rebateBuilder, F3: perCustomerBuilder };
export const figAnswer = (id: FigureId) => ({ F1: FIG.F1, F2: FIG.F2, F3: FIG.F3 })[id];
export { FIGURE_IDS };

/* ------------------------------------------------------------------ shared helpers */

export const partKey = (figure: string, part: string) => `${figure}.${part}`;

/** Parses every part of a builder; null for a part that is empty or unreadable. */
export function partValues(b: CalcBuilder, figure: string, parts: Record<string, string>): Record<string, number | null> {
  return Object.fromEntries(
    b.parts.map((p) => {
      const raw = (parts[partKey(figure, p.id)] ?? "").trim();
      return [p.id, raw ? parseAmount(raw) : null];
    }),
  );
}

/** The live result, or null while a part is missing. */
export function builderResult(b: CalcBuilder, figure: string, parts: Record<string, string>): number | null {
  const v = partValues(b, figure, parts);
  if (Object.values(v).some((x) => x === null)) return null;
  const r = b.compute(v as Record<string, number>);
  return Number.isFinite(r) ? Math.round(r * 1e6) / 1e6 : null;
}

/** Part keys ("F1.consent") whose entered value differs from what the row holds. Empty parts are not flagged. */
export function wrongParts(b: CalcBuilder, figure: string, parts: Record<string, string>): string[] {
  const v = partValues(b, figure, parts);
  return b.parts
    .filter((p) => {
      const x = v[p.id];
      return x !== null && Math.abs(x - p.expected) > (p.tolerance ?? 1e-9);
    })
    .map((p) => partKey(figure, p.id));
}

/** True when every part is filled and none is wrong. */
export function allPartsRight(b: CalcBuilder, figure: string, parts: Record<string, string>): boolean {
  const v = partValues(b, figure, parts);
  return Object.values(v).every((x) => x !== null) && wrongParts(b, figure, parts).length === 0;
}

/** The model part values, as strings, for the mentor fill. */
export function modelParts(builders: Partial<Record<string, CalcBuilder>>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [fid, b] of Object.entries(builders)) if (b) for (const p of b.parts) out[partKey(fid, p.id)] = String(p.expected);
  return out;
}

/** Part flags for every figure, from the learner's parts. */
export function figurePartFlags(parts: Record<string, string>): string[] {
  return FIGURE_IDS.flatMap((f) => wrongParts(FIGURE_BUILDERS[f], f, parts));
}
