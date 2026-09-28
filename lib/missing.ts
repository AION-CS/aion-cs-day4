import { APPROACH_MIN, hasBecause } from "@/data/approaches";
import { FEELINGS } from "@/data/feelings";
import { LINES } from "@/data/triggers";
import { NEEDS } from "@/data/needs";
import { TOUCHPOINTS } from "@/data/touchpoints";
import { LETTERS } from "@/data/custBase";
import { BENEFIT_CHOOSE } from "@/data/loyalty";
import { BUDGET, CHOOSE, MEASURE_BY_ID } from "@/data/measures";
import { BEHAVIOUR_LEVERS, GROUPS, GROUP_IDS, R2_BUDGET, RISK_BY_ID, RISK_CHOOSE, SYSTEM_BY_ID, SYSTEM_CHOOSE, archName } from "@/data/route2";
import { archIds, archOver, citesCalcFigure, funded, hasNumber, planCost, planOver, systemRated } from "@/lib/checks";
import { MIN_LINE, MIN_SENTENCE, isOptionalBlock } from "@/lib/progress";
import { parseAmount } from "@/lib/parseAmount";
import { euro, tt } from "@/lib/lang";
import type { Persisted } from "@/store/useStore";

/** DOM ids the missing list points at. One place, so the list and the UI cannot drift. */
export const IDS = {
  participant: "participant-strip",
  feeling: (id: string) => `feeling-${id}`,
  extraFactor: "extra-factor",
  line: (id: string) => `line-${id}`,
  noSend: "nosend-field",
  appr: (i: number) => `appr-${i}`,
  figure: (id: string) => `fig-${id}`,
  sentence: "sentence-field",
  riskPick: (l: string) => `riskpick-${l}`,
  reflect: (k: string) => `reflect-${k}`,
  touch: (id: string) => `touch-${id}`,
  pattern: (i: number) => `pattern-${i}`,
  info: "info-field",
  infoText: "info-text",
  measurePick: "measure-pick",
  measure: (id: string) => `measure-${id}`,
  order: "order-field",
  why: "why-field",
  loyType: "loy-type",
  loyBenefits: "loy-benefits",
  loyEntry: "loy-entry",
  loyHorizon: "loy-horizon",
  loyWhy: "loy-why",
  planTotal: "plan-total",
  exportL1: "export-l1l2",
  // Route 2
  vision: "vision-field",
  visionText: "vision-text",
  lever: (k: string) => `lever-${k}`,
  level: (g: string) => `level-${g}`,
  weigh: "weigh-field",
  sysPick: "sys-pick",
  sys: (id: string) => `sys-${id}`,
  mainLever: "main-lever",
  mainWhy: "main-why",
  riskPickR2: "risk-pick",
  risk: (id: string) => `risk-${id}`,
  arch: (id: string) => `arch-${id}`,
  archTotal: "arch-total",
  postponed: "postponed-field",
  pickup: "pickup-field",
  decision: "decision-field",
  assumption: (i: number) => `assumption-${i}`,
  trip: "trip-field",
  challenge: "challenge-field",
  exportR2: "export-l3",
} as const;

export type MissingEntry = { id: string; label: string };

export function participantMissing(p: Persisted): MissingEntry[] {
  return p.participant.name.trim() ? [] : [{ id: IDS.participant, label: tt("Your full name is needed for the file name.", "Ihr vollständiger Name wird für den Dateinamen gebraucht.") }];
}

/** Everything still missing from the Retention Plan (Route 1), each with the element to jump to. */
export function l1Missing(p: Persisted): MissingEntry[] {
  const out = participantMissing(p);
  const { l1 } = p;
  const e = (id: string, label: string) => out.push({ id, label });
  for (const f of FEELINGS)
    if (l1.sort[f.id] === null)
      e(IDS.feeling(f.id), tt(`Block 1.1: “${f.quote.slice(0, 44)}…” is not sorted as Security, Trust, Status or Belonging.`, `Block 1.1: „${f.quote.slice(0, 44)}…“ ist nicht als Sicherheit, Vertrauen, Status oder Zugehörigkeit einsortiert.`));
  if (l1.extraFactor.trim().length < MIN_LINE)
    e(IDS.extraFactor, tt(`Block 1.1: add one emotional factor of your own that is not in the statements (at least ${MIN_LINE} characters).`, `Block 1.1: Ergänzen Sie einen eigenen emotionalen Faktor, der nicht in den Aussagen steht (mindestens ${MIN_LINE} Zeichen).`));
  if (!isOptionalBlock("b12")) {
    for (const l of LINES)
      if (l1.trig[l.id] === null) e(IDS.line(l.id), tt(`Block 1.2: “${l.text.slice(0, 44)}…” has no trigger chosen.`, `Block 1.2: Für „${l.text.slice(0, 44)}…“ ist kein Trigger gewählt.`));
    if (l1.noSend.length < 1) e(IDS.noSend, tt("Block 1.2: choose the lines you would not send as they stand.", "Block 1.2: Wählen Sie die Zeilen, die Sie so nicht senden würden."));
  }
  if (!isOptionalBlock("b13"))
    l1.appr.forEach((a, i) => {
      if (!a.emotion) e(IDS.appr(i), tt(`Block 1.3: approach ${i + 1} has no emotion chosen.`, `Block 1.3: Für Ansatz ${i + 1} ist keine Emotion gewählt.`));
      else if (l1.appr.findIndex((g) => g.emotion === a.emotion) !== i)
        e(IDS.appr(i), tt(`Block 1.3: approach ${i + 1} repeats an emotion. Use a different one for each.`, `Block 1.3: Ansatz ${i + 1} wiederholt eine Emotion. Nutzen Sie für jeden eine andere.`));
      if (!a.trigger) e(IDS.appr(i), tt(`Block 1.3: approach ${i + 1} has no trigger choice (or “no trigger”).`, `Block 1.3: Für Ansatz ${i + 1} fehlt die Trigger-Wahl (oder „kein Trigger“).`));
      const txt = a.text.trim();
      if (!txt) e(IDS.appr(i), tt(`Block 1.3: approach ${i + 1} is empty.`, `Block 1.3: Ansatz ${i + 1} ist leer.`));
      else if (txt.length < APPROACH_MIN) e(IDS.appr(i), tt(`Block 1.3: approach ${i + 1} needs at least ${APPROACH_MIN} characters.`, `Block 1.3: Ansatz ${i + 1} braucht mindestens ${APPROACH_MIN} Zeichen.`));
      else if (!hasBecause(txt)) e(IDS.appr(i), tt(`Block 1.3: approach ${i + 1} gives no reason. Add “so that … because …”.`, `Block 1.3: Ansatz ${i + 1} nennt keinen Grund. Ergänzen Sie „damit … weil …“.`));
    });
  for (const f of ["F1", "F2", "F3"] as const) if (parseAmount(l1.figs[f]) === null) e(IDS.figure(f), tt(`Block 1.4: ${f} has no figure.`, `Block 1.4: Für ${f} fehlt eine Zahl.`));
  const s = l1.sentence.trim();
  if (!s) e(IDS.sentence, tt("Block 1.4: the sentence on effect and feasibility is empty.", "Block 1.4: Der Satz zu Wirkung und Machbarkeit ist leer."));
  else if (s.length < MIN_SENTENCE) e(IDS.sentence, tt(`Block 1.4: the sentence needs at least ${MIN_SENTENCE} characters.`, `Block 1.4: Der Satz braucht mindestens ${MIN_SENTENCE} Zeichen.`));
  else if (!citesCalcFigure(s)) e(IDS.sentence, tt("Block 1.4: the sentence states no figure from your calculations.", "Block 1.4: Der Satz nennt keine Zahl aus Ihren Berechnungen."));
  for (const l of LETTERS) if (!l1.risks[l]) e(IDS.riskPick(l), tt(`Block 1.4: measure ${l} has no main risk chosen.`, `Block 1.4: Für Maßnahme ${l} ist kein Hauptrisiko gewählt.`));
  const rf: [keyof typeof l1.reflect, string][] = [
    ["assume", tt("which of your choices assumed that facts, not feelings, would decide", "welche Ihrer Entscheidungen annahm, dass Fakten und nicht Gefühle entscheiden")],
    ["tip", tt("where your personalisation could tip into rejection", "wo Ihre Personalisierung in Ablehnung kippen könnte")],
    ["manager", tt("how a strategic decision-maker would prioritise", "wie ein strategischer Entscheider priorisieren würde")],
  ];
  if (!isOptionalBlock("b15"))
    for (const [k, what] of rf)
      if (l1.reflect[k].trim().length < MIN_LINE) e(IDS.reflect(k), tt(`Block 1.5: say ${what} (at least ${MIN_LINE} characters).`, `Block 1.5: Sagen Sie, ${what} (mindestens ${MIN_LINE} Zeichen).`));
  for (const x of TOUCHPOINTS)
    if (l1.tags[x.id] === null) e(IDS.touch(x.id), tt(`Block 2.1: ${x.label} (${x.moment}) has no need.`, `Block 2.1: Für ${x.label} (${x.moment}) ist kein Bedürfnis gewählt.`));
  if (!isOptionalBlock("b22")) {
    l1.patterns.forEach((x, i) => {
      if (!x.need) e(IDS.pattern(i), tt(`Block 2.2: need ${i + 1} has none chosen.`, `Block 2.2: Für Bedürfnis ${i + 1} ist keines gewählt.`));
      else if (l1.patterns.findIndex((g) => g.need === x.need) !== i)
        e(IDS.pattern(i), tt(`Block 2.2: need ${i + 1} repeats “${NEEDS[x.need].short}”. Name four different needs.`, `Block 2.2: Bedürfnis ${i + 1} wiederholt „${NEEDS[x.need].short}“. Nennen Sie vier verschiedene Bedürfnisse.`));
      if (x.behaviour.trim().length < MIN_SENTENCE)
        e(IDS.pattern(i), tt(`Block 2.2: need ${i + 1} needs what customers do and why (at least ${MIN_SENTENCE} characters).`, `Block 2.2: Bedürfnis ${i + 1} braucht, was Kunden tun und warum (mindestens ${MIN_SENTENCE} Zeichen).`));
      if (!x.strength) e(IDS.pattern(i), tt(`Block 2.2: need ${i + 1} has no strength rating.`, `Block 2.2: Für Bedürfnis ${i + 1} fehlt die Stärke.`));
    });
    if (l1.info.length < 2) e(IDS.info, tt("Block 2.2: choose at least two things the file does not tell you.", "Block 2.2: Wählen Sie mindestens zwei Dinge, die die Akte Ihnen nicht sagt."));
    if (l1.infoText.trim().length < 20)
      e(IDS.infoText, tt("Block 2.2: write the one question you would ask the customers who left (at least 20 characters).", "Block 2.2: Schreiben Sie die eine Frage, die Sie den abgewanderten Kunden stellen würden (mindestens 20 Zeichen)."));
  }
  if (!isOptionalBlock("b23")) {
    if (l1.chosen.length !== CHOOSE) e(IDS.measurePick, tt(`Block 2.3: choose exactly ${CHOOSE} measures (you have ${l1.chosen.length}).`, `Block 2.3: Wählen Sie genau ${CHOOSE} Maßnahmen (Sie haben ${l1.chosen.length}).`));
    for (const id of l1.chosen) {
      const name = MEASURE_BY_ID[id].name;
      if (l1.aims[id] === undefined) e(IDS.measure(id), tt(`Block 2.3: “${name}” has no need it acts on (or “none”).`, `Block 2.3: Für „${name}“ ist kein Bedürfnis genannt, auf das sie wirkt (oder „keines“).`));
      if (!l1.eff[id] || !l1.acc[id] || !l1.sca[id])
        e(IDS.measure(id), tt(`Block 2.3: “${name}” is not fully scored (effect, acceptance, scalability).`, `Block 2.3: „${name}“ ist nicht vollständig bewertet (Wirkung, Akzeptanz, Skalierbarkeit).`));
    }
    if (l1.chosen.length === CHOOSE) {
      if (l1.order.length !== CHOOSE || !l1.chosen.every((id) => l1.order.includes(id)))
        e(IDS.order, tt("Block 2.3: put your three measures in a priority order.", "Block 2.3: Bringen Sie Ihre drei Maßnahmen in eine Prioritätsreihenfolge."));
      if (l1.why.trim().length < 60) e(IDS.why, tt("Block 2.3: say why your first priority goes first (at least 60 characters).", "Block 2.3: Sagen Sie, warum Ihre erste Priorität an erster Stelle steht (mindestens 60 Zeichen)."));
    }
  }
  if (!l1.loyType) e(IDS.loyType, tt("Block 2.4: choose the main type of your loyalty concept.", "Block 2.4: Wählen Sie den Haupttyp Ihres Loyalty-Konzepts."));
  if (l1.loyBenefits.length !== BENEFIT_CHOOSE)
    e(IDS.loyBenefits, tt(`Block 2.4: choose exactly ${BENEFIT_CHOOSE} benefits (you have ${l1.loyBenefits.length}).`, `Block 2.4: Wählen Sie genau ${BENEFIT_CHOOSE} Vorteile (Sie haben ${l1.loyBenefits.length}).`));
  if (!l1.loyEntry) e(IDS.loyEntry, tt("Block 2.4: choose how customers join.", "Block 2.4: Wählen Sie, wie Kunden beitreten."));
  if (!l1.loyHorizon) e(IDS.loyHorizon, tt("Block 2.4: choose how the benefit lasts.", "Block 2.4: Wählen Sie, wie der Vorteil anhält."));
  if (l1.loyWhy.trim().length < 60)
    e(IDS.loyWhy, tt("Block 2.4: say why a customer stays for the benefit and not for a discount (at least 60 characters).", "Block 2.4: Sagen Sie, warum ein Kunde wegen des Vorteils bleibt und nicht wegen eines Rabatts (mindestens 60 Zeichen)."));
  if (planOver(l1) > 0)
    e(
      IDS.planTotal,
      tt(
        `Block 2.4: the three measures and the loyalty concept cost ${euro(planCost(l1))}, ${euro(planOver(l1))} over the ${euro(BUDGET)} budget. Leave one out or choose a cheaper benefit.`,
        `Block 2.4: Die drei Maßnahmen und das Loyalty-Konzept kosten ${euro(planCost(l1))}, das sind ${euro(planOver(l1))} über dem Budget von ${euro(BUDGET)}. Lassen Sie eine weg oder wählen Sie einen günstigeren Vorteil.`,
      ),
    );
  return out;
}

/** Everything still missing from the Strategy Memo (Route 2). */
export function r2Missing(p: Persisted): MissingEntry[] {
  const out = participantMissing(p);
  const { r2 } = p;
  const e = (id: string, label: string) => out.push({ id, label });
  if (!r2.vision) e(IDS.vision, tt("Block 3.1: choose your target vision.", "Block 3.1: Wählen Sie Ihre Zielvision."));
  if (r2.visionText.trim().length < 60)
    e(IDS.visionText, tt("Block 3.1: say in your own words what a customer will say and do in twelve months (at least 60 characters).", "Block 3.1: Sagen Sie in eigenen Worten, was ein Kunde in zwölf Monaten sagen und tun wird (mindestens 60 Zeichen)."));
  if (!isOptionalBlock("b32"))
    for (const l of BEHAVIOUR_LEVERS) {
      const m = r2.levers[l.id];
      if (!m.question) e(IDS.lever(l.id), tt(`Block 3.2: ${l.name} has no customer's question chosen.`, `Block 3.2: Für ${l.name} ist keine Kundenfrage gewählt.`));
      if (!m.signal) e(IDS.lever(l.id), tt(`Block 3.2: ${l.name} has no signal chosen.`, `Block 3.2: Für ${l.name} ist kein Signal gewählt.`));
      if (!m.phase) e(IDS.lever(l.id), tt(`Block 3.2: ${l.name} has no phase chosen.`, `Block 3.2: Für ${l.name} ist keine Phase gewählt.`));
      if (m.move.trim().length < MIN_LINE)
        e(IDS.lever(l.id), tt(`Block 3.2: say what your system does for ${l.name.toLowerCase()} (at least ${MIN_LINE} characters).`, `Block 3.2: Sagen Sie, was Ihr System für ${l.name} tut (mindestens ${MIN_LINE} Zeichen).`));
    }
  if (!isOptionalBlock("b33")) {
    for (const g of GROUP_IDS)
      if (!r2.lvl[g])
        e(IDS.level(g), tt(`Block 3.3: group ${g} (${GROUPS[g].name.split(" (")[0].toLowerCase()}) has no level of personalisation chosen.`, `Block 3.3: Für Gruppe ${g} (${GROUPS[g].name.split(" (")[0]}) ist keine Stufe der Personalisierung gewählt.`));
    const w = r2.weigh.trim();
    if (w.length < 60)
      e(IDS.weigh, tt("Block 3.3: say why you do not personalise every group as far as possible (at least 60 characters).", "Block 3.3: Sagen Sie, warum Sie nicht jede Gruppe so weit wie möglich personalisieren (mindestens 60 Zeichen)."));
    else if (!hasNumber(w)) e(IDS.weigh, tt("Block 3.3: your reasoning names no number. Quote a figure from the table.", "Block 3.3: Ihre Begründung nennt keine Zahl. Zitieren Sie eine Zahl aus der Tabelle."));
  }
  if (r2.sys.length !== SYSTEM_CHOOSE) e(IDS.sysPick, tt(`Block 3.4: choose exactly ${SYSTEM_CHOOSE} building blocks (you have ${r2.sys.length}).`, `Block 3.4: Wählen Sie genau ${SYSTEM_CHOOSE} Bausteine (Sie haben ${r2.sys.length}).`));
  for (const id of r2.sys)
    if (!systemRated(r2, id)) e(IDS.sys(id), tt(`Block 3.4: “${SYSTEM_BY_ID[id].name}” is not rated on all four tests.`, `Block 3.4: „${SYSTEM_BY_ID[id].name}“ ist nicht in allen vier Tests bewertet.`));
  if (!r2.mainLever) e(IDS.mainLever, tt("Block 3.4: name the lever (emotion, trust or relevance) your system serves most.", "Block 3.4: Nennen Sie den Hebel (Emotion, Vertrauen oder Relevanz), den Ihr System am meisten bedient."));
  if (r2.mainWhy.trim().length < 40) e(IDS.mainWhy, tt("Block 3.4: say why (at least 40 characters).", "Block 3.4: Sagen Sie, warum (mindestens 40 Zeichen)."));
  if (!isOptionalBlock("b35")) {
    if (r2.risks.length !== RISK_CHOOSE) e(IDS.riskPickR2, tt(`Block 3.5: choose exactly ${RISK_CHOOSE} risks (you have ${r2.risks.length}).`, `Block 3.5: Wählen Sie genau ${RISK_CHOOSE} Risiken (Sie haben ${r2.risks.length}).`));
    for (const id of r2.risks) {
      const name = RISK_BY_ID[id].name;
      if (!r2.riskLik[id] || !r2.riskImp[id]) e(IDS.risk(id), tt(`Block 3.5: “${name}” has no likelihood or impact.`, `Block 3.5: „${name}“ hat keine Wahrscheinlichkeit oder Auswirkung.`));
      if (!r2.riskSignal[id]) e(IDS.risk(id), tt(`Block 3.5: “${name}” has no early-warning signal chosen.`, `Block 3.5: Für „${name}“ ist kein Frühwarnsignal gewählt.`));
      const txt = (r2.riskResponse[id] ?? "").trim();
      if (txt.length < MIN_LINE) e(IDS.risk(id), tt(`Block 3.5: “${name}” needs a response (at least ${MIN_LINE} characters).`, `Block 3.5: „${name}“ braucht eine Reaktion (mindestens ${MIN_LINE} Zeichen).`));
      else if (!hasNumber(txt)) e(IDS.risk(id), tt(`Block 3.5: the response to “${name}” names no number. Say when you act.`, `Block 3.5: Die Reaktion auf „${name}“ nennt keine Zahl. Sagen Sie, wann Sie handeln.`));
    }
  }
  if (!isOptionalBlock("b36")) {
    const f = funded(r2);
    const levels = [r2.lvl.A, r2.lvl.B, r2.lvl.C];
    if (f.length === 0) e(IDS.archTotal, tt("Block 3.6: fund at least one item.", "Block 3.6: Finanzieren Sie mindestens einen Punkt."));
    if (archOver(r2) > 0) e(IDS.archTotal, tt(`Block 3.6: the funded items are ${euro(archOver(r2))} over the ${euro(R2_BUDGET)} budget.`, `Block 3.6: Die finanzierten Punkte liegen ${euro(archOver(r2))} über dem Budget von ${euro(R2_BUDGET)}.`));
    for (const id of f) {
      const name = archName(id, levels);
      if (r2.start[id] == null) e(IDS.arch(id), tt(`Block 3.6: “${name}” has no start month.`, `Block 3.6: „${name}“ hat keinen Startmonat.`));
      if (!r2.owner[id]) e(IDS.arch(id), tt(`Block 3.6: “${name}” has no owner.`, `Block 3.6: „${name}“ hat keinen Owner.`));
      const txt = (r2.trigger[id] ?? "").trim();
      if (txt.length < 20) e(IDS.arch(id), tt(`Block 3.6: “${name}” needs a trigger (at least 20 characters).`, `Block 3.6: „${name}“ braucht einen Trigger (mindestens 20 Zeichen).`));
      else if (!hasNumber(txt)) e(IDS.arch(id), tt(`Block 3.6: the trigger of “${name}” names no number.`, `Block 3.6: Der Trigger von „${name}“ nennt keine Zahl.`));
    }
    if (!archIds(r2).every((id) => r2.alloc[id])) {
      if (r2.postponed.trim().length < MIN_LINE) e(IDS.postponed, tt("Block 3.6: say what you leave out and why.", "Block 3.6: Sagen Sie, was Sie weglassen und warum."));
      if (r2.pickup.trim().length < 15 || !hasNumber(r2.pickup))
        e(IDS.pickup, tt("Block 3.6: give the pickup point: the number and the date at which you look at it again.", "Block 3.6: Nennen Sie den Wiedervorlagepunkt: die Zahl und das Datum, zu dem Sie es wieder ansehen."));
    }
  }
  if (!r2.decision) e(IDS.decision, tt("Block 3.7: choose your decision.", "Block 3.7: Wählen Sie Ihre Entscheidung."));
  r2.assumptions.forEach((a, i) => {
    if (a.trim().length < MIN_LINE) e(IDS.assumption(i), tt(`Block 3.7: assumption ${i + 1} is missing (at least ${MIN_LINE} characters).`, `Block 3.7: Annahme ${i + 1} fehlt (mindestens ${MIN_LINE} Zeichen).`));
  });
  if (!r2.tripKpi) e(IDS.trip, tt("Block 3.7: choose the metric of your tripwire.", "Block 3.7: Wählen Sie die Kennzahl Ihres Tripwires."));
  if (parseAmount(r2.tripThreshold) === null) e(IDS.trip, tt("Block 3.7: give the tripwire a threshold.", "Block 3.7: Geben Sie dem Tripwire einen Schwellenwert."));
  if (!r2.tripMonth) e(IDS.trip, tt("Block 3.7: give the tripwire a month.", "Block 3.7: Geben Sie dem Tripwire einen Monat."));
  if (!r2.tripAction) e(IDS.trip, tt("Block 3.7: say what you do if the tripwire is missed.", "Block 3.7: Sagen Sie, was Sie tun, wenn der Tripwire verfehlt wird."));
  if (r2.challenge.trim().length < 60) e(IDS.challenge, tt("Block 3.7: answer the board's challenge (at least 60 characters).", "Block 3.7: Beantworten Sie die Rückfrage des Boards (mindestens 60 Zeichen)."));
  return out;
}
