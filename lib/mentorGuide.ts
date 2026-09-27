import { NEEDS } from "@/data/needs";
import { BASE, FIG, MEASURES_L1 } from "@/data/custBase";
import type { FigureId } from "@/data/custBase";
import { TRUTH_COUNTS, TRUTH_LEFT, STRENGTH_LABEL, strengthOf, strengthPoints } from "@/data/touchpoints";
import { BUDGET, MEASURE_BY_ID, MODEL_COST, MODEL_MEASURES, WORKING_FOUR_COST, modelScore, scalabilityOf, ACCEPT_CAP } from "@/data/measures";
import type { MeasureId } from "@/data/measures";
import { BENEFIT_BY_ID, MEMBERS, MODEL_BENEFITS, MODEL_LOYALTY_COST, SETUP } from "@/data/loyalty";
import { KEY_L1, KEY_R2 } from "@/data/mentorKey";
import {
  CRITERIA,
  FOUNDATION,
  DASHBOARD,
  GROUPS,
  GROUP_IDS,
  LEVEL_BY_ID,
  LEVER_BY_KIND,
  MODEL_LEVELS,
  R2_BUDGET,
  RISK_BY_ID,
  SYSTEM_BY_ID,
  archName,
  engineCost,
  responders,
} from "@/data/route2";
import type { ArchId, LeverKind, RiskId, SystemId } from "@/data/route2";
import { euro } from "@/lib/lang";

/**
 * Mentor-only worked answers for every task question the answer keys (lib/answerKey.ts) do not already cover: the numeric fields,
 * with every step of the calculation written out with its numbers, and the free-text answers, with the model text and what a good
 * answer must contain. Shown only after the mentor bar is unlocked, never exported. Numbers are computed from the same constants as
 * the tables, the calculators and the answer checks, so they cannot drift from the model answers.
 */
export type WorkedStep = { label: string; calc: string; result: string };
export type MentorGuide = {
  title: string;
  /** The model answer, as a learner would enter it. */
  answer: string;
  /** For a calculation: each step with its numbers, in order. */
  steps?: WorkedStep[];
  /** Why the answer is what it is, in one or two sentences a mentor can say out loud. */
  why?: string;
  /** For free text: what an acceptable answer must contain. */
  lookFor?: string[];
  /** Typical wrong answers, with the number they produce where there is one. */
  pitfalls?: string[];
};

const n = (v: number) => (Math.round(v * 100) / 100).toLocaleString("en-US");

/* ------------------------------------------------------------------ Block 1.4 · the figures */

export function figureGuide(id: FigureId): MentorGuide {
  const { customers, annualValue, consent, usable } = BASE;
  const C = MEASURES_L1.C;
  if (id === "F1")
    return {
      title: "1.4 · F1 Customers measure B can reach",
      answer: n(FIG.F1),
      steps: [
        { label: "Read the consent share as a fraction of one", calc: `${consent}% ÷ 100`, result: (consent / 100).toFixed(2) },
        { label: "Customers who agreed", calc: `${n(customers)} × ${(consent / 100).toFixed(2)}`, result: n(customers * (consent / 100)) },
        { label: "Read the usable-data share as a fraction of one", calc: `${usable}% ÷ 100`, result: (usable / 100).toFixed(2) },
        { label: "Of those, with usable data = customers reached", calc: `${n(customers * (consent / 100))} × ${(usable / 100).toFixed(2)}`, result: n(FIG.F1) },
      ],
      why: "Only customers who agreed to usage analysis can receive usage-based offers, and of those only the ones with twelve months of data can be profiled. Two filters, one after the other.",
      pitfalls: [
        `Forgetting to divide by 100 (40 and 75 instead of 0.40 and 0.75): ${n(customers * consent * usable)}.`,
        `Only the consent filter: ${n(customers * (consent / 100))}.`,
        `Only the usable-data filter: ${n(customers * (usable / 100))}.`,
        `Adding the two shares instead of multiplying: ${n(customers * (consent / 100 + usable / 100))}.`,
      ],
    };
  if (id === "F2")
    return {
      title: "1.4 · F2 Cost of the bonus rebate in six months",
      answer: n(FIG.F2),
      steps: [
        { label: "Members = customers × the share who join", calc: `${n(customers)} × ${C.memberShare}%`, result: n(FIG.members) },
        { label: "Members' annual revenue", calc: `${n(FIG.members)} × ${n(annualValue)}`, result: euro(FIG.members * annualValue) },
        { label: "Rebate for a full year = revenue × the rebate rate", calc: `${n(FIG.members * annualValue)} × ${C.rebate}%`, result: euro(FIG.members * annualValue * (C.rebate / 100)) },
        { label: "Scale to the window = × months ÷ 12", calc: `${n(FIG.members * annualValue * (C.rebate / 100))} × ${C.months} ÷ 12`, result: euro(FIG.F2) },
      ],
      why: "The rebate is paid on the members' revenue, not on all customers', and the revenue figure is for a year while the programme runs half of one. Half of the €180,000 budget goes to a discount.",
      pitfalls: [
        `The full year for the members (no months ÷ 12): ${n(FIG.members * annualValue * (C.rebate / 100))}. The same number appears if the six months are counted for all 1,500 customers, so ask which mistake it is.`,
        `Multiplying by 6 instead of 6 ÷ 12: ${n(FIG.members * annualValue * (C.rebate / 100) * C.months)}.`,
        `Rebate as 2 instead of 0.02: ${n(FIG.members * annualValue * C.rebate * (C.months / 12))}.`,
      ],
    };
  return {
    title: "1.4 · F3 Cost per customer reached by measure B",
    answer: n(FIG.F3),
    steps: [
      { label: "Total cost of B = build + data-protection review", calc: `${n(MEASURES_L1.B.build)} + ${n(MEASURES_L1.B.review)}`, result: euro(FIG.costB) },
      { label: "Customers reached (your own F1)", calc: "from F1", result: n(FIG.F1) },
      { label: "Cost per customer reached", calc: `${n(FIG.costB)} ÷ ${n(FIG.F1)}`, result: euro(FIG.F3) },
      { label: "For comparison: the newsletter per customer", calc: `${n(MEASURES_L1.A.cost)} ÷ ${n(MEASURES_L1.A.reach)}`, result: euro(FIG.perA) },
    ],
    why: `Measure B fits each customer it reaches, and it reaches few: ${euro(FIG.F3)} each, against ${euro(FIG.perA)} for the newsletter. Fit is bought with reach and with money.`,
    pitfalls: [
      `Dividing by all customers: ${n(FIG.costB / customers)}.`,
      `Only the build cost: ${n(MEASURES_L1.B.build / FIG.F1)}.`,
      `Dividing by the 600 who agreed instead of the 450 with usable data: ${n(FIG.costB / (customers * (BASE.consent / 100)))}.`,
    ],
  };
}

export function extraFactorGuide(): MentorGuide {
  return {
    title: "1.1 · An emotional factor of your own",
    answer: KEY_L1.extraFactor,
    why: "Level 1 starts by collecting factors. A good extra factor is one the statements do not give, and the learner says which of the four emotions it serves.",
    lookFor: ["A factor that is not one of the eight statements.", "The emotion it serves (security, trust, status or belonging), named in the words of the test."],
    pitfalls: ["A rewording of one of the eight statements.", "A feature (“faster servers”) with no feeling attached."],
  };
}

export function sentenceGuide(): MentorGuide {
  return {
    title: "1.4 · Effect against feasibility",
    answer: KEY_L1.sentence,
    why: "The sentence weighs what each measure gives against what it needs: reach and cost of B, the size of the rebate, the data-protection limit. It quotes a figure from the calculations and names the measure funded first.",
    lookFor: [
      `At least one figure from the calculation (${n(FIG.F1)}, ${n(FIG.members)}, ${n(FIG.F2)}, ${n(FIG.costB)} or ${n(FIG.F3)}).`,
      "A first choice, with the reason (small budget, strict data protection).",
      "The limit that decides it: consent for B, the cost of the rebate for C.",
    ],
    pitfalls: ["“B is best because it is personal”: no figure, and it ignores that only 450 customers can be reached.", "Choosing C because customers like discounts, without the €90,000."],
  };
}

export function approachGuide(i: number): MentorGuide {
  const a = KEY_L1.approaches[i];
  return {
    title: `1.3 · Approach ${i + 1} (${NEEDS[a.emotion].label})`,
    answer: a.text,
    why: "An approach states what the provider does, what the customer feels because of it, and why that works for that emotion, in a form that could be tried and seen.",
    lookFor: [
      "One emotion from A2, different from the other two approaches.",
      "A concrete action (“we will …”), not a wish.",
      "The feeling the customer should have, and a reason (“so that … because …”).",
      "If a trigger is used, that it passes the three tests of A3.",
    ],
    pitfalls: ["“We will improve the customer experience”: no action, no emotion.", "Three approaches on the same emotion, which cannot be told apart."],
  };
}

export function reflectGuide(k: "assume" | "tip" | "manager"): MentorGuide {
  const q = { assume: "Which of my choices assumed that facts, not feelings, would decide?", tip: "Where could my personalisation tip into rejection?", manager: "How would a strategic decision-maker prioritise?" }[k];
  return {
    title: `1.5 · ${q}`,
    answer: KEY_L1.reflect[k],
    why: "A reflection is honest when it names something the learner actually did in Blocks 1.1 to 1.4, not a general virtue.",
    lookFor: ["A specific thing from this task (a sort, an approach, a figure).", "What would change in their next conversation or plan."],
    pitfalls: ["“I should listen more”: true of everyone and tied to nothing they did."],
  };
}

/* ------------------------------------------------------------------ Block 2.2 */

export function behaviourGuide(i: number): MentorGuide {
  const p = KEY_L1.patterns[i];
  const need = NEEDS[p.need];
  const pts = strengthPoints(TRUTH_COUNTS[p.need], TRUTH_LEFT[p.need]);
  return {
    title: `2.2 · Need ${i + 1}: ${need.label}`,
    answer: `${p.behaviour} (Strength: ${STRENGTH_LABEL[p.strength]})`,
    steps: [
      { label: "Touchpoints tagged with the need", calc: need.short, result: String(TRUTH_COUNTS[p.need]) },
      { label: "Of those, followed by a customer leaving", calc: "from the twelve touchpoints", result: String(TRUTH_LEFT[p.need]) },
      { label: "Points = touchpoints + left", calc: `${TRUTH_COUNTS[p.need]} + ${TRUTH_LEFT[p.need]}`, result: String(pts) },
      { label: "5 or more High, 3 to 4 Mid, 2 or fewer Low", calc: `${pts}`, result: STRENGTH_LABEL[strengthOf(pts)] },
    ],
    why: "The rating is the rule applied to the learner's own tally. If their tags differ from the reference, their points differ and the rating follows their evidence.",
    lookFor: ["What customers do (visible behaviour) and the need behind it (“because …”).", "Behaviour from the touchpoints, not a general statement about customers."],
    pitfalls: ["Describing only the need (“they want security”) with no behaviour.", "Rating Belonging High because it is a central need: both of its touchpoints only produced a complaint."],
  };
}

export function infoTextGuide(): MentorGuide {
  return {
    title: "2.2 · The one question you would ask the customers who left",
    answer: KEY_L1.infoText,
    why: "The best question is about the customer's expectation at the moment of leaving, and it is answered by the customers, not by CloudTech's own records.",
    lookFor: ["A question addressed to the customer.", "About what they expected or felt, not about CloudTech's activity.", "Something that would change the need tackled or the measure funded."],
    pitfalls: ["“Would you like a discount?”: a suggestion, not a question that finds a cause."],
  };
}

/* ------------------------------------------------------------------ Block 2.3 and 2.4 */

export function scoreGuide(id: MeasureId): MentorGuide {
  const m = MEASURE_BY_ID[id];
  const s = scalabilityOf(id);
  return {
    title: `2.3 · Scores for ${m.name}`,
    answer: `Effect ${m.model.effect}, acceptance ${m.model.acceptance}, scalability ${s}: ${modelScore(id)}`,
    steps: [
      { label: "Effect (from the need it acts on and how many it reaches)", calc: m.model.note, result: String(m.model.effect) },
      { label: "Acceptance (capped by the data it uses)", calc: `${m.data}: at most ${ACCEPT_CAP[m.data]}`, result: String(m.model.acceptance) },
      { label: "Scalability (by the effort per additional customer)", calc: `${m.effort}`, result: String(s) },
      { label: "Score = effect × acceptance × scalability", calc: `${m.model.effect} × ${m.model.acceptance} × ${s}`, result: String(modelScore(id)) },
    ],
    why: m.verdict,
    pitfalls: ["Effect is judged from the learner's own tally, so a different score is fine if their evidence differs. Acceptance and scalability are not judged: the printed data and effort decide, and the Check outlines a score that breaks the rule."],
  };
}

export function whyGuide(): MentorGuide {
  return {
    title: "2.3 · Why the first priority goes first",
    answer: KEY_L1.why,
    steps: [
      { label: "Model measures and their scores", calc: MODEL_MEASURES.map((id) => `${MEASURE_BY_ID[id].name} ${modelScore(id)}`).join("; "), result: "18, 18, 12" },
      { label: "Cost of the three", calc: MODEL_MEASURES.map((id) => n(MEASURE_BY_ID[id].cost)).join(" + "), result: euro(MODEL_COST) },
      { label: "Budget left for the loyalty concept", calc: `${n(BUDGET)} − ${n(MODEL_COST)}`, result: euro(BUDGET - MODEL_COST) },
      { label: "All four that work", calc: "30,000 + 54,000 + 45,000 + 36,000", result: `${euro(WORKING_FOUR_COST)}, so ${euro(WORKING_FOUR_COST + MODEL_LOYALTY_COST - BUDGET)} over once the concept is added` },
    ],
    why: "With ties on the score, the order is decided by where customers are being lost and how fast each measure acts. The answer must say so.",
    lookFor: ["The order and a reason for it, with a score or a need named.", "The total cost against €180,000.", "What was left out, or a reason nothing had to be."],
    pitfalls: ["“It has the highest score” when two measures tie."],
  };
}

export function loyaltyCostGuide(): MentorGuide {
  const perYear = MODEL_BENEFITS.reduce((s, id) => s + BENEFIT_BY_ID[id].perMember, 0);
  return {
    title: "2.4 · What the concept costs, and the whole plan",
    answer: `${euro(MODEL_LOYALTY_COST)} for the model concept, ${euro(MODEL_COST + MODEL_LOYALTY_COST)} for the plan, ${euro(BUDGET - MODEL_COST - MODEL_LOYALTY_COST)} left`,
    steps: [
      { label: "Per-member cost of the two benefits per year", calc: MODEL_BENEFITS.map((id) => `${BENEFIT_BY_ID[id].name.split(" ")[0]} ${BENEFIT_BY_ID[id].perMember}`).join(" + "), result: `€${perYear}` },
      { label: "For all members for a year", calc: `${MEMBERS} × ${perYear}`, result: euro(MEMBERS * perYear) },
      { label: "For the six months of the window", calc: `${n(MEMBERS * perYear)} × 6 ÷ 12`, result: euro((MEMBERS * perYear) / 2) },
      { label: "Plus the one-off set-up", calc: `${n((MEMBERS * perYear) / 2)} + ${n(SETUP)}`, result: euro(MODEL_LOYALTY_COST) },
      { label: "Plus the three measures", calc: `${n(MODEL_COST)} + ${n(MODEL_LOYALTY_COST)}`, result: euro(MODEL_COST + MODEL_LOYALTY_COST) },
      { label: "Left of the €180,000", calc: `${n(BUDGET)} − ${n(MODEL_COST + MODEL_LOYALTY_COST)}`, result: euro(BUDGET - MODEL_COST - MODEL_LOYALTY_COST) },
    ],
    why: "The concept is paid from the same €180,000 as the measures. The per-member costs are yearly, so they are scaled to six months, and the set-up is paid once. At 600 members, benefits above about €110 per member per year do not fit next to the three model measures.",
    pitfalls: [
      `Forgetting to scale to six months: ${n(MEMBERS * perYear + SETUP)} for the concept.`,
      `Forgetting the set-up: ${n((MEMBERS * perYear) / 2)}.`,
    ],
  };
}

export function loyWhyGuide(): MentorGuide {
  return {
    title: "2.4 · Why a customer stays for the benefit, not for a discount",
    answer: KEY_L1.loyWhy,
    why: "The test is whether the customer would still want it if the discount disappeared. A good answer says what the customer would miss, names the need it answers and says how it lasts.",
    lookFor: ["What the customer would miss if the benefit stopped.", "A need from Block 2.2 that the benefit answers, ideally one the three measures leave uncovered.", "How the concept lasts (tenure) and how customers join (opt-in)."],
    pitfalls: ["“Customers like being rewarded”: describes a bonus.", "A benefit list with no reason."],
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function visionTextGuide(): MentorGuide {
  return {
    title: "3.1 · The vision in your own words",
    answer: KEY_R2.visionText,
    why: "A vision says what customers will feel and do, so that it can be seen. It names at least one behaviour and one way of noticing it.",
    lookFor: ["What a customer says or feels about CloudTech.", "What the customer does (renews without a discount, answers, shares data).", "How CloudTech would notice (a metric or an observable)."],
    pitfalls: ["A tactic (“we will personalise everything”) with no customer in it.", "A vision with no behaviour, so nobody could tell whether it came true."],
  };
}

export function moveGuide(k: LeverKind): MentorGuide {
  const l = LEVER_BY_KIND[k];
  return {
    title: `3.2 · What the system does for ${l.name}`,
    answer: KEY_R2.levers[k].move,
    why: l.why,
    lookFor: ["A step of the process or a rule, not an action by one person.", "Something that answers the customer's question of the lever."],
    pitfalls: ["“The account manager should be more empathetic”: an individual intervention, not a system move."],
  };
}

export function weighGuide(): MentorGuide {
  const rows = GROUP_IDS.map((g) => ({ g, r: responders(g, MODEL_LEVELS[g]), l: LEVEL_BY_ID[MODEL_LEVELS[g]] }));
  const total = rows.reduce((s, r) => s + r.r, 0);
  const cost = engineCost(Object.values(MODEL_LEVELS));
  const aL2 = responders("A", "l2");
  return {
    title: "3.3 · Why not the top level for everyone",
    answer: KEY_R2.weigh,
    steps: [
      ...rows.map((r) => ({ label: `Group ${r.g} at level ${r.l.n}: customers × response rate`, calc: `${n(GROUPS[r.g].size)} × ${r.l.rate}%`, result: n(r.r) })),
      { label: "Responders in all", calc: rows.map((r) => n(r.r)).join(" + "), result: n(total) },
      { label: "Cost: each level needs the one below, so you pay for the highest used", calc: `level 3`, result: euro(cost) },
      { label: "Cost per responder", calc: `${n(cost)} ÷ ${n(total)}`, result: euro(cost / total) },
      { label: "What level 3 adds for Group A over level 2", calc: `${n(responders("A", "l3"))} − ${n(aL2)} responders for ${n(cost)} − ${n(LEVEL_BY_ID.l2.cost)}`, result: `${n(responders("A", "l3") - aL2)} for ${euro(cost - LEVEL_BY_ID.l2.cost)}` },
      { label: "Level 4 over level 3", calc: `${n(LEVEL_BY_ID.l4.cost)} − ${n(cost)} for ${LEVEL_BY_ID.l4.rate}% instead of ${LEVEL_BY_ID.l3.rate}%`, result: `${euro(LEVEL_BY_ID.l4.cost - cost)} more, and it needs a consent CloudTech does not hold` },
    ],
    why: "Personalisation is limited first by the data a group allows and only then by cost. The top level needs a consent CloudTech does not have, and the last steps up the ladder buy few extra responders for a lot of money.",
    lookFor: ["The data limit of at least one group (consent, or no customer data for prospects).", "A figure from the table (a cost, a number of responders, a rate).", "That a lower level for a group is a choice, and the reason (cost against extra responders)."],
    pitfalls: ["“Personalise as far as possible”: ignores that the data does not allow it.", "A reason with no number, which the missing list flags."],
  };
}

export function ratingGuide(id: SystemId): MentorGuide {
  const s = SYSTEM_BY_ID[id];
  return {
    title: `3.4 · Ratings for ${s.name}`,
    answer: CRITERIA.map((c) => `${c.name} ${s.model[c.id]}`).join(", "),
    steps: CRITERIA.map((c) => ({
      label: `${c.name}: ${c.test}`,
      calc: c.id === "reach" ? (s.reachAll ? "applies to every customer" : "applies to some customers (members, opted-in)") : c.id === "durability" ? `depends on: ${s.depends}` : c.id === "scale" ? `cost shape: ${s.costShape}` : "how strongly it changes one customer",
      result: String(s.model[c.id]),
    })),
    why: s.note,
    pitfalls: ["A rating above what the printed facts allow is outlined by the Check: reach 3 for a members-only block, durability above 1 for a people or discount block, scale 3 for a per-event or per-member cost."],
  };
}

export function mainWhyGuide(): MentorGuide {
  return {
    title: "3.4 · The lever the system serves most",
    answer: `Trust. ${KEY_R2.mainWhy}`,
    why: "The best answer names the need or the lever the evidence of Route 1 shows as strongest, and says why the chosen blocks act on it and last.",
    lookFor: ["A lever of the three (emotion, trust, relevance) and the need from Route 1 behind it.", "Why the blocks last or reach everyone."],
    pitfalls: ["Naming the cheapest or the fastest block."],
  };
}

export function riskResponseGuide(id: RiskId): MentorGuide {
  const r = RISK_BY_ID[id];
  return {
    title: `3.5 · Response to “${r.name}”`,
    answer: KEY_R2.riskResponse[id] ?? "If the signal appears in 3 customers within a month, we interview them within 2 weeks and change one lever.",
    why: r.why,
    lookFor: ["A number, a date and an action.", "A signal that appears before the loss is final."],
    pitfalls: ["“Monitor closely”: no number, no action."],
  };
}

export function triggerGuide(id: ArchId): MentorGuide {
  return {
    title: `3.6 · Trigger for ${archName(id, Object.values(KEY_R2.levels))}`,
    answer: KEY_R2.trigger[id] ?? "If the item's own metric misses its threshold by month 3, review it with its owner.",
    why: "A trigger has a metric, a number, a date and an action.",
    lookFor: ["A number.", "A date or month.", "What happens if it is missed."],
    pitfalls: ["A goal with no number (“improve the take-up”)."],
  };
}

export function postponedGuide(): MentorGuide {
  const items = KEY_R2.arch;
  const levels = Object.values(KEY_R2.levels);
  const cost = (id: ArchId) => (id === "foundation" ? FOUNDATION.cost : id === "dashboard" ? DASHBOARD.cost : id === "engine" ? engineCost(levels) : SYSTEM_BY_ID[id as SystemId].cost);
  const total = items.reduce((s, id) => s + cost(id), 0);
  return {
    title: "3.6 · What you leave out, and the pickup point",
    answer: `${KEY_R2.postponed} Pickup: ${KEY_R2.pickup}`,
    steps: [
      { label: "Funded items", calc: items.map((id) => `${archName(id, levels).split(" (")[0]} ${n(cost(id))}`).join(" + "), result: euro(total) },
      { label: "Budget left", calc: `${n(R2_BUDGET)} − ${n(total)}`, result: euro(R2_BUDGET - total) },
      { label: "Adding the dashboard would give", calc: `${n(total)} + ${n(DASHBOARD.cost)}`, result: `${euro(total + DASHBOARD.cost)}: ${euro(total + DASHBOARD.cost - R2_BUDGET)} over` },
    ],
    why: "Postponing is a decision: name the item, say why, and give the number and the date at which you look again.",
    lookFor: ["An item named, not “some measures”.", "The reason (budget, weakest evidence, something else covers it for now).", "A pickup point with a number and a date."],
    pitfalls: ["Trimming every item a little instead of leaving one out."],
  };
}

export function assumptionGuide(i: number): MentorGuide {
  return {
    title: `3.7 · Assumption ${i + 1}`,
    answer: KEY_R2.assumptions[i],
    why: "Each assumption is about how customers will react, and names the sign that it is wrong.",
    lookFor: ["A statement about customer behaviour.", "The sign that would show it is wrong (a number or an observable)."],
    pitfalls: ["An assumption about CloudTech's own readiness, which is not a customer reaction."],
  };
}

export function challengeGuide(): MentorGuide {
  return {
    title: "3.7 · The board's challenge",
    answer: KEY_R2.challenge,
    why: "The answer goes back to the tripwire and the objection figures, keeps what the numbers support and changes one lever. It neither defends the plan blindly nor drops it.",
    lookFor: ["Reference to the tripwire or the objections.", "One lever changed, not the whole plan.", "A way to find out why (interviews, a date)."],
    pitfalls: ["Continuing to personalise as planned. Cancelling everything."],
  };
}
