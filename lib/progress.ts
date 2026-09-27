import { MATERIALS } from "@/data/materialIndex";
import { APPROACH_MIN, hasBecause } from "@/data/approaches";
import { FEELING_IDS } from "@/data/feelings";
import { LINE_IDS } from "@/data/triggers";
import { TOUCH_IDS } from "@/data/touchpoints";
import { LETTERS } from "@/data/custBase";
import { BENEFIT_CHOOSE } from "@/data/loyalty";
import { CHOOSE } from "@/data/measures";
import { BEHAVIOUR_LEVERS, GROUP_IDS, RISK_CHOOSE, SYSTEM_CHOOSE } from "@/data/route2";
import { archIds, archOver, citesCalcFigure, funded, hasNumber, planOver, systemRated } from "@/lib/checks";
import type { RouteNo } from "@/lib/routes";
import { parseAmount } from "@/lib/parseAmount";
import type { Persisted } from "@/store/useStore";

export type TaskBlockId = "b11" | "b12" | "b13" | "b14" | "b15" | "b21" | "b22" | "b23" | "b24" | "b31" | "b32" | "b33" | "b34" | "b35" | "b36" | "b37";

const len = (t: string) => t.trim().length;
export const MIN_SENTENCE = 40;
export const MIN_LINE = 30;

/** Which task blocks are complete. Complete means filled in, never correct. */
export function taskBlocks(p: Persisted): Record<TaskBlockId, boolean> {
  const { l1, r2 } = p;
  const apprOk = l1.appr.every((a, i) => !!a.emotion && !!a.trigger && len(a.text) >= APPROACH_MIN && hasBecause(a.text) && l1.appr.findIndex((g) => g.emotion === a.emotion) === i);
  const patternsOk =
    l1.patterns.every((x, i) => !!x.need && !!x.strength && len(x.behaviour) >= MIN_SENTENCE && l1.patterns.findIndex((g) => g.need === x.need) === i) &&
    l1.info.length >= 2 &&
    len(l1.infoText) >= 20;
  const measuresOk =
    l1.chosen.length === CHOOSE &&
    l1.chosen.every((id) => l1.aims[id] !== undefined && !!l1.eff[id] && !!l1.acc[id] && !!l1.sca[id]) &&
    l1.order.length === CHOOSE &&
    l1.chosen.every((id) => l1.order.includes(id)) &&
    len(l1.why) >= 60;
  const loyaltyOk =
    !!l1.loyType && l1.loyBenefits.length === BENEFIT_CHOOSE && !!l1.loyEntry && !!l1.loyHorizon && len(l1.loyWhy) >= 60 && planOver(l1) === 0;
  const f = funded(r2);
  const items = archIds(r2);
  const archOk =
    f.length > 0 &&
    archOver(r2) === 0 &&
    f.every((id) => r2.start[id] != null && !!r2.owner[id] && len(r2.trigger[id] ?? "") >= 20 && hasNumber(r2.trigger[id] ?? "")) &&
    (items.every((id) => r2.alloc[id]) || (len(r2.postponed) >= MIN_LINE && len(r2.pickup) >= 15 && hasNumber(r2.pickup)));
  return {
    b11: FEELING_IDS.every((id) => l1.sort[id] !== null) && len(l1.extraFactor) >= MIN_LINE,
    b12: LINE_IDS.every((id) => l1.trig[id] !== null) && l1.noSend.length >= 1,
    b13: apprOk,
    b14: (["F1", "F2", "F3"] as const).every((k) => parseAmount(l1.figs[k]) !== null) && len(l1.sentence) >= MIN_SENTENCE && citesCalcFigure(l1.sentence) && LETTERS.every((k) => !!l1.risks[k]),
    b15: len(l1.reflect.assume) >= MIN_LINE && len(l1.reflect.tip) >= MIN_LINE && len(l1.reflect.manager) >= MIN_LINE,
    b21: TOUCH_IDS.every((id) => l1.tags[id] !== null),
    b22: patternsOk,
    b23: measuresOk,
    b24: loyaltyOk,
    b31: !!r2.vision && len(r2.visionText) >= 60,
    b32: BEHAVIOUR_LEVERS.every((l) => !!r2.levers[l.id].question && !!r2.levers[l.id].signal && !!r2.levers[l.id].phase && len(r2.levers[l.id].move) >= MIN_LINE),
    b33: GROUP_IDS.every((g) => !!r2.lvl[g]) && len(r2.weigh) >= 60 && hasNumber(r2.weigh),
    b34:
      r2.sys.length === SYSTEM_CHOOSE &&
      r2.sys.every((id) => systemRated(r2, id)) &&
      !!r2.mainLever &&
      len(r2.mainWhy) >= 40,
    b35:
      r2.risks.length === RISK_CHOOSE &&
      r2.risks.every((id) => !!r2.riskLik[id] && !!r2.riskImp[id] && !!r2.riskSignal[id] && len(r2.riskResponse[id] ?? "") >= MIN_LINE && hasNumber(r2.riskResponse[id] ?? "")),
    b36: archOk,
    b37:
      !!r2.decision &&
      r2.assumptions.every((a) => len(a) >= MIN_LINE) &&
      !!r2.tripKpi &&
      parseAmount(r2.tripThreshold) !== null &&
      !!r2.tripMonth &&
      !!r2.tripAction &&
      len(r2.challenge) >= 60,
  };
}

const BLOCKS_OF: Record<RouteNo, TaskBlockId[]> = {
  1: ["b11", "b12", "b13", "b14", "b15", "b21", "b22", "b23", "b24"],
  2: ["b31", "b32", "b33", "b34", "b35", "b36", "b37"],
};

/** Dossier progress for one route: its cards marked read + its task blocks completed. */
export function dossierProgress(p: Persisted, route: RouteNo): { done: number; total: number } {
  const block = route === 1 ? "A" : "B";
  const cards = MATERIALS.filter((m) => m.block === block);
  const read = cards.filter((m) => p.ui.sectionsRead[m.id]).length;
  const tb = taskBlocks(p);
  const done = BLOCKS_OF[route].filter((b) => tb[b]).length;
  return { done: read + done, total: cards.length + BLOCKS_OF[route].length };
}
