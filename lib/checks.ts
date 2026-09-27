import { FEELINGS } from "@/data/feelings";
import { FIG, citesFigure } from "@/data/custBase";
import { LINES, LINE_BY_ID } from "@/data/triggers";
import { NEED_IDS } from "@/data/needs";
import type { NeedId } from "@/data/needs";
import { INFO_BY_ID, TOUCHPOINTS, TOUCH_IDS, TOUCH_BY_ID, strengthOf, strengthPoints } from "@/data/touchpoints";
import type { InfoId, Strength } from "@/data/touchpoints";
import { ACCEPT_CAP, BUDGET, MEASURE_BY_ID, scalabilityOf } from "@/data/measures";
import type { MeasureId } from "@/data/measures";
import { BENEFIT_BY_ID, HORIZONS, ENTRIES, MEMBERS, bonusCount, loyaltyCost } from "@/data/loyalty";
import {
  BEHAVIOUR_LEVERS,
  GROUPS,
  KPI_BY_ID,
  LEVELS,
  LEVEL_BY_ID,
  R2_BUDGET,
  RISK_BY_ID,
  SYSTEM_BY_ID,
  VISION_BY_ID,
  archItems,
  isSystemic,
  levelIndex,
  maxRating,
  responders,
} from "@/data/route2";
import type { ArchId, Criterion, GroupId, LevelId, RiskId, SystemId } from "@/data/route2";
import { extractAmounts, parseAmount } from "@/lib/parseAmount";
import type { L1State, R2State, SortMap, TagMap, TrigMap } from "@/store/useStore";

/* ------------------------------------------------------------------ Block 1.1 and 1.2 */

/** How many placed statements hold. Never says which: with four bins, naming the wrong ones would name the answer. */
export function sortHolds(sort: SortMap): { holds: number; placed: number } {
  let holds = 0;
  let placed = 0;
  for (const f of FEELINGS) {
    const t = sort[f.id];
    if (t === null || t === undefined) continue;
    placed++;
    if (t === f.truth) holds++;
  }
  return { holds, placed };
}

export function trigHolds(trig: TrigMap): { holds: number; placed: number } {
  let holds = 0;
  let placed = 0;
  for (const l of LINES) {
    const t = trig[l.id];
    if (t === null || t === undefined) continue;
    placed++;
    if (t === l.truth) holds++;
  }
  return { holds, placed };
}

/** Of the lines the learner would not send as they stand, how many really fail at least one of the three tests. */
export function noSendHolds(noSend: string[]): { holds: number; chosen: number } {
  return { holds: noSend.filter((id) => LINE_BY_ID[id as keyof typeof LINE_BY_ID] && !LINE_BY_ID[id as keyof typeof LINE_BY_ID].holdsUp).length, chosen: noSend.length };
}

/* ------------------------------------------------------------------ Block 1.4 */

/** The figure checked against the learner's entry: 0.5 of rounding at most. */
export function figMatches(entered: string, answer: number): boolean {
  const v = parseAmount(entered);
  return v !== null && Math.abs(v - answer) < 0.5;
}

/** A sentence about effect and feasibility must rest on a figure the calculations derive. */
export function citesCalcFigure(text: string): boolean {
  return citesFigure(extractAmounts(text));
}
export const FIG_VALUES = FIG;

/* ------------------------------------------------------------------ Block 2.1 and 2.2 */

export function tagHolds(tags: TagMap): { holds: number; placed: number } {
  let holds = 0;
  let placed = 0;
  for (const id of TOUCH_IDS) {
    const t = tags[id];
    if (t === null || t === undefined) continue;
    placed++;
    if (t === TOUCH_BY_ID[id].truth) holds++;
  }
  return { holds, placed };
}

export type Tally = { count: Record<NeedId, number>; left: Record<NeedId, number>; tagged: number };

/** The learner's own tally: how many touchpoints they tagged with each need, and how many of those were followed by a customer leaving. */
export function tallyOf(tags: TagMap): Tally {
  const count = Object.fromEntries(NEED_IDS.map((n) => [n, 0])) as Record<NeedId, number>;
  const left = { ...count };
  let tagged = 0;
  for (const p of TOUCHPOINTS) {
    const t = tags[p.id];
    if (!t) continue;
    tagged++;
    count[t]++;
    if (p.outcome === "left") left[t]++;
  }
  return { count, left, tagged };
}
export const allTagged = (tags: TagMap) => TOUCH_IDS.every((id) => !!tags[id]);

/** Points from the learner's own tally, and the strength they give. */
export const ownPoints = (n: NeedId, t: Tally) => strengthPoints(t.count[n], t.left[n]);
export const ownStrength = (n: NeedId, t: Tally): Strength => strengthOf(ownPoints(n, t));

/** A need is one of the four central ones when its count reaches the fourth-highest count (a tie can admit more than four). */
export function isCentral(n: NeedId, t: Tally): boolean {
  const sorted = [...NEED_IDS].map((x) => t.count[x]).sort((a, c) => c - a);
  const cutoff = sorted[3];
  return t.count[n] > 0 && t.count[n] >= cutoff;
}

/** The four needs the learner should name, ordered by their own points. */
export function ownTopFour(t: Tally): NeedId[] {
  return [...NEED_IDS].filter((n) => isCentral(n, t)).sort((a, c) => ownPoints(c, t) - ownPoints(a, t) || t.count[c] - t.count[a]).slice(0, 4);
}

export type PatternCheck = { need: number; strength: number; filled: number; rowsNeed: boolean[]; rowsStrength: boolean[] };
export function patternCheck(l1: L1State): PatternCheck {
  const t = tallyOf(l1.tags);
  const central = l1.patterns.map((p) => !!p.need && isCentral(p.need, t));
  const distinct = l1.patterns.map((p, i) => !!p.need && l1.patterns.findIndex((q) => q.need === p.need) === i);
  const rn = central.map((v, i) => v && distinct[i]);
  const rowsStrength = l1.patterns.map((p) => !!p.need && !!p.strength && p.strength === ownStrength(p.need, t));
  return {
    need: rn.filter(Boolean).length,
    strength: rowsStrength.filter(Boolean).length,
    filled: l1.patterns.filter((p) => p.need && p.strength).length,
    rowsNeed: rn,
    rowsStrength,
  };
}

/** The information items the learner picked that would change what CloudTech does. */
export function infoHolds(info: InfoId[]): { holds: number; chosen: number } {
  return { holds: info.filter((i) => INFO_BY_ID[i].useful).length, chosen: info.length };
}

/* ------------------------------------------------------------------ Block 2.3 */

const sameSet = <T,>(a: T[], b: T[]) => a.length === b.length && a.every((x) => b.includes(x));
export { sameSet };

/**
 * The aims a learner names for a measure hold when they contain the measure's main target and nothing outside its real targets.
 * A measure with no real target (a rebate, a newsletter) holds only when its aims are empty.
 */
export function aimsHold(id: MeasureId, aims: NeedId[]): boolean {
  const truth = MEASURE_BY_ID[id].targets;
  if (truth.length === 0) return aims.length === 0;
  return aims.includes(truth[0]) && aims.every((a) => truth.includes(a));
}
/** Acceptance may not exceed what the data the measure uses allows (Materi A7). */
export const acceptHolds = (id: MeasureId, v: number) => v <= ACCEPT_CAP[MEASURE_BY_ID[id].data];
/** Scalability follows the printed effort per additional customer. */
export const scaleHolds = (id: MeasureId, v: number) => v === scalabilityOf(id);

export const measureScore = (l1: L1State, id: MeasureId) => (l1.eff[id] || 0) * (l1.acc[id] || 0) * (l1.sca[id] || 0);
export const measureScored = (l1: L1State, id: MeasureId) => !!l1.eff[id] && !!l1.acc[id] && !!l1.sca[id];
export const totalCost = (ids: MeasureId[]) => ids.reduce((s, id) => s + MEASURE_BY_ID[id].cost, 0);

/** The four needs of the learner's own file, and whether the chosen measures reach them (by what each measure really acts on). */
export function coverage(l1: L1State): { need: NeedId; covered: boolean }[] {
  const named = l1.patterns.map((p) => p.need).filter((n): n is NeedId => !!n);
  return named.map((n) => ({ need: n, covered: l1.chosen.some((id) => MEASURE_BY_ID[id].targets.includes(n)) }));
}

/** Pairs where a lower score sits above a higher one in the learner's order. */
export function orderInversions(l1: L1State): { high: MeasureId; low: MeasureId }[] {
  const out: { high: MeasureId; low: MeasureId }[] = [];
  const ord = l1.order.filter((id) => l1.chosen.includes(id));
  for (let i = 0; i < ord.length; i++)
    for (let j = i + 1; j < ord.length; j++) if (measureScored(l1, ord[i]) && measureScored(l1, ord[j]) && measureScore(l1, ord[i]) < measureScore(l1, ord[j])) out.push({ high: ord[j], low: ord[i] });
  return out;
}

/* ------------------------------------------------------------------ Block 2.4 */

export const loyaltyCostOf = (l1: L1State) => (l1.loyBenefits.length ? loyaltyCost(l1.loyBenefits) : 0);
/** The three measures and the loyalty concept, held against the €180,000. */
export const planCost = (l1: L1State) => totalCost(l1.chosen) + loyaltyCostOf(l1);
export const planOver = (l1: L1State) => Math.max(0, planCost(l1) - BUDGET);
export const planLeft = (l1: L1State) => BUDGET - planCost(l1);

/** The needs the chosen benefits act on, by what each benefit really does. */
export function benefitNeeds(l1: L1State): NeedId[] {
  return [...new Set(l1.loyBenefits.flatMap((id) => BENEFIT_BY_ID[id].acts))];
}

/** The parts of the loyalty concept the last check outlines: "type", "benefits", "entry", "horizon". */
export function loyaltyFlags(l1: L1State): string[] {
  const out: string[] = [];
  if (l1.loyType && (l1.loyType === "bonus" || (l1.loyBenefits.length > 0 && !l1.loyBenefits.some((id) => BENEFIT_BY_ID[id].type === l1.loyType)))) out.push("type");
  if (l1.loyBenefits.length >= 2 && bonusCount(l1.loyBenefits) >= 2) out.push("benefits");
  if (l1.loyEntry && !ENTRIES.find((e) => e.id === l1.loyEntry)!.why) out.push("entry");
  if (l1.loyHorizon && !HORIZONS.find((h) => h.id === l1.loyHorizon)!.why) out.push("horizon");
  return out;
}
export { MEMBERS };

/* ------------------------------------------------------------------ Route 2 */

/** 3.1: the vision must be one that defends. */
export const visionHolds = (r2: R2State) => !!r2.vision && VISION_BY_ID[r2.vision].defends;

/** 3.2: how many of the nine picks hold (a question, a signal and a phase for each of the three levers). */
export function leversHold(r2: R2State): { holds: number; total: number; rows: Record<string, { question: boolean; signal: boolean; phase: boolean }> } {
  let holds = 0;
  const rows: Record<string, { question: boolean; signal: boolean; phase: boolean }> = {};
  for (const l of BEHAVIOUR_LEVERS) {
    const m = r2.levers[l.id];
    const q = m.question === l.questionTruth;
    const s = m.signal === l.signalTruth;
    const p = !!m.phase && l.phaseAccept.includes(m.phase);
    rows[l.id] = { question: q, signal: s, phase: p };
    holds += Number(q) + Number(s) + Number(p);
  }
  return { holds, total: BEHAVIOUR_LEVERS.length * 3, rows };
}

/** 3.3: the groups whose chosen level goes beyond the data the group allows. */
export function ladderFlags(r2: R2State): GroupId[] {
  return (Object.keys(GROUPS) as GroupId[]).filter((g) => {
    const l = r2.lvl[g];
    return !!l && levelIndex(l) > levelIndex(GROUPS[g].cap);
  });
}
export const ladderPlaced = (r2: R2State) => (Object.keys(GROUPS) as GroupId[]).filter((g) => !!r2.lvl[g]).length;
export const totalResponders = (r2: R2State) => (Object.keys(GROUPS) as GroupId[]).reduce((s, g) => s + (r2.lvl[g] ? responders(g, r2.lvl[g] as LevelId) : 0), 0);
export { LEVELS, LEVEL_BY_ID };

/** 3.4: the ratings that exceed what the printed facts of the building block allow. */
export function ratingFlags(r2: R2State): string[] {
  const out: string[] = [];
  for (const s of r2.sys)
    for (const c of ["reach", "depth", "durability", "scale"] as Criterion[]) {
      const v = r2.rate[`${s}.${c}`] || 0;
      if (v > maxRating(s, c)) out.push(`${s}.${c}`);
    }
  return out;
}
export const systemRated = (r2: R2State, id: SystemId) => (["reach", "depth", "durability", "scale"] as Criterion[]).every((c) => !!r2.rate[`${id}.${c}`]);
export const systemTotal = (r2: R2State, id: SystemId) => (["reach", "depth", "durability", "scale"] as Criterion[]).reduce((s, c) => s + (r2.rate[`${id}.${c}`] || 0), 0);
export const systemicCount = (ids: SystemId[]) => ids.filter(isSystemic).length;
export const bonusSystems = (ids: SystemId[]) => ids.filter((id) => SYSTEM_BY_ID[id].kind === "bonus").length;

/** 3.5: risks that are misjudgments of customer psychology, and signals that are not the early warning. */
export const psychologyCount = (risks: RiskId[]) => risks.filter((r) => RISK_BY_ID[r].psychology).length;
export function signalFlags(r2: R2State): string[] {
  return r2.risks.filter((id) => r2.riskSignal[id] && r2.riskSignal[id] !== RISK_BY_ID[id].signalTruth).map((id) => `${id}.signal`);
}
export const hasNumber = (t: string) => /\d/.test(t);

/** 3.6 */
export const learnerLevels = (r2: R2State) => [r2.lvl.A, r2.lvl.B, r2.lvl.C];
export const archList = (r2: R2State) => archItems(r2.sys, learnerLevels(r2));
export const archIds = (r2: R2State): ArchId[] => archList(r2).map((i) => i.id);
export const funded = (r2: R2State): ArchId[] => archIds(r2).filter((id) => r2.alloc[id]);
export const archCostOf = (r2: R2State, id: ArchId) => archList(r2).find((i) => i.id === id)?.cost ?? 0;
export const archCost = (r2: R2State) => funded(r2).reduce((s, id) => s + archCostOf(r2, id), 0);
export const archOver = (r2: R2State) => Math.max(0, archCost(r2) - R2_BUDGET);
export const archLeft = (r2: R2State) => R2_BUDGET - archCost(r2);

/**
 * The two rules of Materi B5 that the learner's sequence is checked against: the consent and data foundation is funded and starts no
 * later than the first other item (consent first), and the total is inside the budget.
 */
export function seqRules(r2: R2State): { baseline: boolean; budget: boolean; hasFoundation: boolean } {
  const f = funded(r2);
  const hasFoundation = f.includes("foundation");
  const others = f.filter((id) => id !== "foundation");
  const fStart = r2.start.foundation;
  const firstOther = Math.min(...others.map((id) => r2.start[id] ?? 99));
  const baseline = hasFoundation && fStart != null && (others.length === 0 || fStart <= firstOther);
  return { baseline, budget: archOver(r2) === 0 && f.length > 0, hasFoundation };
}

/** 3.7: a tripwire whose metric is a customer behaviour and whose threshold is better than the baseline. */
export function tripFlags(r2: R2State): string[] {
  const out: string[] = [];
  if (r2.tripKpi && !KPI_BY_ID[r2.tripKpi].behaviour) out.push("kpi");
  if (r2.tripKpi && r2.tripThreshold.trim()) {
    const v = parseAmount(r2.tripThreshold);
    const k = KPI_BY_ID[r2.tripKpi];
    if (v !== null && (k.better === "up" ? v <= k.baseline : v >= k.baseline)) out.push("threshold");
  }
  return out;
}
