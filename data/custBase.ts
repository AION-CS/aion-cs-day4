import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 1.4, and the worked example of Materi A4. What three measures reach and cost, under a small budget and strict data
 * protection. Every figure is a Case assumption (the brief gives the budget, the time and the data-protection limits, not these
 * numbers). The three figures the learner calculates:
 *
 *   F1  customers a usage-based offer can reach = customers × consent share × usable-data share
 *   F2  cost of the bonus rebate in the six months = members × annual value × rebate × (months ÷ 12)
 *   F3  cost per customer reached = (build + data-protection review) ÷ customers reached (F1)
 */
export const BASE = {
  customers: 1500,
  /** Average revenue per customer per year, €. */
  annualValue: 12000,
  /** Share of customers who agreed to usage analysis, %. */
  consent: 40,
  /** Of those, the share with twelve months of usable usage data, %. */
  usable: 75,
} as const;

export const MEASURES_L1 = bi({
  A: { name: t("Standard newsletter", "Standard-Newsletter"), cost: 12000, reach: BASE.customers },
  B: { name: t("Individual offers based on usage behaviour", "Individuelle Angebote auf Basis des Nutzungsverhaltens"), build: 36000, review: 9000 },
  C: { name: t("Bonus programme for existing customers", "Bonusprogramm für Bestandskunden"), memberShare: 50, rebate: 2, months: 6 },
});

/** Reach of measure B: only customers who agreed and have usable data. */
export const reachB = (customers = BASE.customers, consent = BASE.consent, usable = BASE.usable) => customers * (consent / 100) * (usable / 100);
/** Cost of C in the window: members × annual value × rebate × months ÷ 12. */
export const rebateCost = (customers: number, share: number, value: number, rebate: number, months: number) => customers * (share / 100) * value * (rebate / 100) * (months / 12);
/** Cost per customer reached. */
export const perCustomer = (cost: number, reached: number) => cost / reached;

export const FIG = {
  F1: reachB(),
  F2: rebateCost(BASE.customers, MEASURES_L1.C.memberShare, BASE.annualValue, MEASURES_L1.C.rebate, MEASURES_L1.C.months),
  F3: 0,
  members: BASE.customers * (MEASURES_L1.C.memberShare / 100),
  costB: MEASURES_L1.B.build + MEASURES_L1.B.review,
  perA: MEASURES_L1.A.cost / MEASURES_L1.A.reach,
};
FIG.F3 = perCustomer(FIG.costB, FIG.F1);

/** The three figures the learner enters in Block 1.4. */
export type FigureId = "F1" | "F2" | "F3";
export const FIGURE_IDS: FigureId[] = ["F1", "F2", "F3"];
export const FIGURES: Record<
  FigureId,
  {
    id: FigureId;
    label: string;
    question: string;
    answer: number;
    unit: string;
    /** The formula in words, with no numbers (CLAUDE.md #24). */
    formula: string;
    /** The material card that teaches it. */
    taughtIn: "A4";
    clue: string;
    /** Printed rows the numbers come from (CLAUDE.md #21). */
    sources: { label: string; value: string; target: string }[] | "figures";
  }
> = bi({
  F1: {
    id: "F1" as FigureId,
    label: t("F1 · Customers a usage-based offer (measure B) can reach", "F1 · Kunden, die ein nutzungsbasiertes Angebot (Maßnahme B) erreichen kann"),
    question: t(
      "How many customers can CloudTech send individual offers based on usage behaviour, given who agreed and who has usable data?",
      "Wie vielen Kunden kann CloudTech individuelle Angebote auf Basis des Nutzungsverhaltens senden, wenn man berücksichtigt, wer eingewilligt hat und bei wem nutzbare Daten vorliegen?",
    ),
    answer: FIG.F1,
    unit: t("customers", "Kunden"),
    formula: t(
      "Customers reached = the number of customers × the share who agreed to usage analysis × the share of those with usable usage data. Read each share as a fraction of one before you multiply.",
      "Erreichte Kunden = Anzahl der Kunden × Anteil, der der Nutzungsanalyse zugestimmt hat × Anteil davon mit nutzbaren Nutzungsdaten. Lesen Sie jeden Anteil vor dem Multiplizieren als Bruchteil von eins.",
    ),
    taughtIn: "A4" as const,
    clue: t(
      "Check that both percentages are read as fractions of one (40 out of 100, not 40) and that the second one applies only to the customers who agreed, not to all customers.",
      "Prüfen Sie, ob beide Prozentwerte als Bruchteil von eins gelesen werden (40 von 100, nicht 40) und ob der zweite nur für die Kunden gilt, die eingewilligt haben, nicht für alle Kunden.",
    ),
    sources: [
      { label: t("The customer base · customers on annual contracts", "Die Kundenbasis · Kunden mit Jahresverträgen"), value: t("1,500", "1.500"), target: "base-customers" },
      { label: t("The customer base · share who agreed to usage analysis", "Die Kundenbasis · Anteil mit Zustimmung zur Nutzungsanalyse"), value: t("40%", "40 %"), target: "base-consent" },
      { label: t("The customer base · share of those with usable usage data", "Die Kundenbasis · Anteil davon mit nutzbaren Nutzungsdaten"), value: t("75%", "75 %"), target: "base-usable" },
    ],
  },
  F2: {
    id: "F2" as FigureId,
    label: t("F2 · Cost of the bonus rebate (measure C) in the six months, €", "F2 · Kosten des Bonus-Rabatts (Maßnahme C) in den sechs Monaten, €"),
    question: t("What does the bonus programme's rebate cost CloudTech over its six months?", "Was kostet der Rabatt des Bonusprogramms CloudTech über die sechs Monate?"),
    answer: FIG.F2,
    unit: "€",
    formula: t(
      "Cost in the window = the number of members × the average annual revenue per customer × the rebate rate × the months of the window ÷ 12. The members are the customers who join, not all customers.",
      "Kosten im Zeitraum = Anzahl der Mitglieder × durchschnittlicher Jahresumsatz pro Kunde × Rabattsatz × Monate des Zeitraums ÷ 12. Mitglieder sind die Kunden, die teilnehmen, nicht alle Kunden.",
    ),
    taughtIn: "A4" as const,
    clue: t(
      "Check that only the customers who join are counted, that the rebate is read as a fraction of one, and that the annual revenue is scaled to the six months (months ÷ 12) instead of counted for a full year.",
      "Prüfen Sie, ob nur die teilnehmenden Kunden gezählt werden, ob der Rabatt als Bruchteil von eins gelesen wird und ob der Jahresumsatz auf die sechs Monate umgerechnet wird (Monate ÷ 12), statt ein ganzes Jahr zu zählen.",
    ),
    sources: [
      { label: t("The customer base · customers on annual contracts", "Die Kundenbasis · Kunden mit Jahresverträgen"), value: t("1,500", "1.500"), target: "base-customers" },
      { label: t("The customer base · average revenue per customer per year", "Die Kundenbasis · durchschnittlicher Jahresumsatz pro Kunde"), value: t("€12,000", "12.000 €"), target: "base-value" },
      { label: t("Measure C · share of customers who join", "Maßnahme C · Anteil der Kunden, die teilnehmen"), value: t("50%", "50 %"), target: "meas-C-share" },
      { label: t("Measure C · rebate on the annual fee", "Maßnahme C · Rabatt auf die Jahresgebühr"), value: t("2%", "2 %"), target: "meas-C-rebate" },
      { label: t("Measure C · months the programme runs", "Maßnahme C · Monate, die das Programm läuft"), value: "6", target: "meas-C-months" },
    ],
  },
  F3: {
    id: "F3" as FigureId,
    label: t("F3 · Cost per customer reached by measure B, €", "F3 · Kosten pro erreichtem Kunden bei Maßnahme B, €"),
    question: t("How much does measure B cost for each customer it reaches?", "Was kostet Maßnahme B für jeden Kunden, den sie erreicht?"),
    answer: FIG.F3,
    unit: "€",
    formula: t(
      "Cost per customer reached = (the build cost + the data-protection review) ÷ the customers reached (your own F1).",
      "Kosten pro erreichtem Kunden = (Entwicklungskosten + Datenschutzprüfung) ÷ erreichte Kunden (Ihr eigenes F1).",
    ),
    taughtIn: "A4" as const,
    clue: t(
      "Both costs of measure B belong in the total, and the divisor is the customers it reaches (your F1), not all customers.",
      "Beide Kosten von Maßnahme B gehören in die Summe, und der Teiler sind die Kunden, die sie erreicht (Ihr F1), nicht alle Kunden.",
    ),
    sources: [
      { label: t("Measure B · build cost", "Maßnahme B · Entwicklungskosten"), value: t("€36,000", "36.000 €"), target: "meas-B-build" },
      { label: t("Measure B · data-protection review", "Maßnahme B · Datenschutzprüfung"), value: t("€9,000", "9.000 €"), target: "meas-B-review" },
      { label: t("Your own F1 above", "Ihr eigenes F1 oben"), value: t("your figure", "Ihr Wert"), target: "fig-F1" },
    ],
  },
});

/** The figures a sentence about effect and feasibility may rest on: every value the calculations derive. */
export const FIG_DERIVED = [FIG.F1, FIG.members, FIG.F2, FIG.costB, FIG.F3];

/* ------------------------------------------------------------------ the risk of each measure */

export type MeasureLetter = "A" | "B" | "C";
export const LETTERS: MeasureLetter[] = ["A", "B", "C"];
export type RiskPickId = "noise" | "watched" | "discount" | "late";
export const RISK_PICKS: { id: RiskPickId; label: string; why: string }[] = bi([
  {
    id: "noise" as RiskPickId,
    label: t("Customers stop reading it, because it fits nobody in particular.", "Kunden lesen es nicht mehr, weil es niemandem im Besonderen passt."),
    why: t(
      "One message to all customers has full reach and no fit. The risk is not harm but being ignored (an acceptance problem).",
      "Eine Nachricht an alle Kunden hat volle Reichweite und keine Passung. Das Risiko ist nicht Schaden, sondern Ignoriertwerden (ein Akzeptanzproblem).",
    ),
  },
  {
    id: "watched" as RiskPickId,
    label: t("Customers feel watched, or withdraw the consent they gave.", "Kunden fühlen sich beobachtet oder ziehen ihre Einwilligung zurück."),
    why: t(
      "Individual offers use behaviour data. Where the offer is too close to what the customer did, it feels like being watched, and consent can be withdrawn at any time (a data-protection and acceptance problem).",
      "Individuelle Angebote nutzen Verhaltensdaten. Ist das Angebot zu nah an dem, was der Kunde getan hat, fühlt es sich an wie Beobachtung, und die Einwilligung kann jederzeit widerrufen werden (ein Datenschutz- und Akzeptanzproblem).",
    ),
  },
  {
    id: "discount" as RiskPickId,
    label: t("Customers get used to the discount and wait for the next one.", "Kunden gewöhnen sich an den Rabatt und warten auf den nächsten."),
    why: t(
      "A rebate is paid on every member, including those who would have stayed, and stopping it feels like a loss. It trains customers to wait for the next rebate.",
      "Ein Rabatt wird auf jedes Mitglied gezahlt, auch auf die, die geblieben wären, und ihn zu beenden fühlt sich wie ein Verlust an. Er bringt Kunden bei, auf den nächsten Rabatt zu warten.",
    ),
  },
  {
    id: "late" as RiskPickId,
    label: t("It cannot be built and running inside the six months.", "Es lässt sich nicht innerhalb der sechs Monate bauen und in Betrieb nehmen."),
    why: t("Not the main risk of any of the three: each can start inside the window.", "Nicht das Hauptrisiko einer der drei: Jede kann innerhalb des Zeitraums starten."),
  },
]);
export const RISK_TRUTH: Record<MeasureLetter, RiskPickId> = { A: "noise", B: "watched", C: "discount" };
export const RISK_CLUES: Record<MeasureLetter, string> = bi({
  A: t(
    "Who does a message for everyone fit? Think about what the customers in the touchpoint notes would do with it.",
    "Wem passt eine Nachricht für alle? Denken Sie daran, was die Kunden aus den Touchpoint-Notizen damit tun würden.",
  ),
  B: t(
    "What data does this measure use, and what happens to a customer who did not expect it to be used?",
    "Welche Daten nutzt diese Maßnahme, und was passiert mit einem Kunden, der nicht erwartet hat, dass sie genutzt werden?",
  ),
  C: t("Who receives the rebate, and what happens when it stops?", "Wer erhält den Rabatt, und was passiert, wenn er endet?"),
});

/** How the sentence in Block 1.4 must cite a figure. */
export const citesFigure = (amounts: number[]) => amounts.some((n) => FIG_DERIVED.some((d) => Math.abs(n - d) < 0.5));
