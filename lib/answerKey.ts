import { FEELINGS } from "@/data/feelings";
import { NEEDS } from "@/data/needs";
import { LINES, TRIGGER_LABEL } from "@/data/triggers";
import { LETTERS, RISK_PICKS, RISK_TRUTH } from "@/data/custBase";
import { INFO_ITEMS, STRENGTH_LABEL, TOUCHPOINTS, TRUTH_COUNTS, TRUTH_LEFT, strengthOf, strengthPoints } from "@/data/touchpoints";
import { BUDGET, MEASURES, MODEL_COST, MODEL_MEASURES, WORKING_FOUR_COST, modelScore, scalabilityOf } from "@/data/measures";
import { BENEFITS, ENTRIES, HORIZONS, LOYALTY_TYPES, MODEL_BENEFITS, MODEL_ENTRY, MODEL_HORIZON, MODEL_LOYALTY_COST, MODEL_TYPE } from "@/data/loyalty";
import {
  BEHAVIOUR_LEVERS,
  DECISIONS,
  GROUPS,
  GROUP_IDS,
  KPIS,
  LEVELS,
  LEVEL_BY_ID,
  MODEL_DECISION,
  MODEL_LEVELS,
  MODEL_RISKS,
  MODEL_SYSTEMS,
  MODEL_TRIPWIRE,
  MODEL_VISION,
  OWNERS,
  OWNER_ACCEPT,
  PHASES,
  RISKS,
  SYSTEMS,
  VISIONS,
  responders,
  systemModelTotal,
  archName,
  engineCost,
} from "@/data/route2";
import type { ArchId, LevelId } from "@/data/route2";
import { euro } from "@/lib/lang";

/**
 * Mentor-only answer keys for the exercises where the learner picks from fixed options. Each key gives the expected answer and a
 * reason per option, including why each rejected option is rejected, plus a teaching note wherever more than one answer defends.
 * Never exported and never shown to a learner.
 */
export type AnswerKeyOption = { label: string; expected: boolean; why: string };
export type AnswerKeyBlock = { title: string; expected: string; options: AnswerKeyOption[]; teachingNote?: string };

/* ------------------------------------------------------------------ Route 1 */

export function feelingKey(): AnswerKeyBlock {
  return {
    title: "Block 1.1 · Security, Trust, Status or Belonging",
    expected: FEELINGS.map((f, i) => `${i + 1} → ${NEEDS[f.truth].label}`).join(" · "),
    options: FEELINGS.flatMap((f, i) => [
      { label: `Statement ${i + 1} → ${NEEDS[f.truth].label}`, expected: true, why: f.why },
      ...(Object.entries(f.rejected) as [keyof typeof NEEDS, string][]).map(([e, why]) => ({ label: `Statement ${i + 1} → ${NEEDS[e].label}`, expected: false, why })),
    ]),
    teachingNote:
      "Two per emotion. The pairs learners swap are Security and Trust (statements 1 to 4) and Status and Belonging (statements 5 to 8). Send them to the pair tests in A2 before you say which is right: ask what is being judged (a bad outcome prevented, or a promise kept) and who is looking (outsiders, or peers).",
  };
}

export function triggerKey(): AnswerKeyBlock {
  return {
    title: "Block 1.2 · The trigger of each line",
    expected: LINES.map((l, i) => `${i + 1} → ${TRIGGER_LABEL[l.truth]}`).join(" · "),
    options: LINES.flatMap((l, i) => [
      { label: `Line ${i + 1} → ${TRIGGER_LABEL[l.truth]}`, expected: true, why: l.why },
      ...(Object.entries(l.rejected) as [keyof typeof TRIGGER_LABEL, string][]).map(([t, why]) => ({ label: `Line ${i + 1} → ${TRIGGER_LABEL[t]}`, expected: false, why })),
    ]),
    teachingNote:
      "Lines 5 and 6 are the ones to argue about. Line 5 (the ISO certificate) is a plain fact and a credential at once: it counts as Authority because the certificate is used to make the customer feel safe. If a learner files it as Not a trigger, ask what the sentence is doing for the customer. Lines 7 and 8 are the plain terms: nothing in them moves a feeling.",
  };
}

export function noSendKey(): AnswerKeyBlock {
  return {
    title: "Block 1.2 · Which lines would not be sent as they stand",
    expected: LINES.filter((l) => !l.holdsUp).map((l) => `Line ${LINES.indexOf(l) + 1}`).join(", "),
    options: LINES.map((l, i) => ({
      label: `Line ${i + 1} (${TRIGGER_LABEL[l.truth]})`,
      expected: !l.holdsUp,
      why: l.holdsUp ? "Passes the three tests: it is true, the customer can check it, and the customer would feel respected." : (l.fails ?? ""),
    })),
    teachingNote:
      "The check reports how many of the lines the learner chose really fail. The three that fail are the hollow versions of scarcity, social proof and authority. Ask a learner who removes line 1 or 3 which of the three tests it fails: it names a real limit or named customers a prospect can call.",
  };
}

export function riskPickKey(): AnswerKeyBlock {
  return {
    title: "Block 1.4 · The main risk of each measure",
    expected: LETTERS.map((l) => `${l} → ${RISK_PICKS.find((r) => r.id === RISK_TRUTH[l])!.label}`).join(" · "),
    options: LETTERS.flatMap((l) =>
      RISK_PICKS.map((r) => ({
        label: `Measure ${l} → ${r.label}`,
        expected: RISK_TRUTH[l] === r.id,
        why: RISK_TRUTH[l] === r.id ? r.why : r.id === "late" ? r.why : `This is the risk of a different measure (${LETTERS.filter((x) => RISK_TRUTH[x] === r.id).join(", ")}).`,
      })),
    ),
    teachingNote: "Each measure has one dominant risk. A: acceptance (nobody reads it). B: data protection and acceptance together (the customer who feels watched). C: the discount trap. Cost is also a risk of C, but it is the effect of the same cause.",
  };
}

export function touchKey(): AnswerKeyBlock {
  return {
    title: "Block 2.1 · The need in each touchpoint",
    expected: TOUCHPOINTS.map((p) => `${p.label.replace("Touchpoint ", "")} → ${NEEDS[p.truth].short}`).join(" · "),
    options: TOUCHPOINTS.flatMap((p) => [
      { label: `${p.label} → ${NEEDS[p.truth].label}`, expected: true, why: p.why },
      ...(Object.entries(p.rejected) as [keyof typeof NEEDS, string][]).map(([n, why]) => ({ label: `${p.label} → ${NEEDS[n].label}`, expected: false, why })),
    ]),
    teachingNote: `Expected counts: ${Object.keys(NEEDS).map((n) => `${NEEDS[n as keyof typeof NEEDS].short} ${TRUTH_COUNTS[n as keyof typeof NEEDS]}`).join(", ")}. The pairs learners swap most are Trust and Timing (touchpoints 02, 03 against 11), Relevance and Timing (06, 07, 12 against 11) and Relevance and Status (10 against 12). Send them to the pair tests in A6 before you say which is right.`,
  };
}

export function patternKey(): AnswerKeyBlock {
  const rows = (Object.keys(NEEDS) as (keyof typeof NEEDS)[]).map((n) => {
    const pts = strengthPoints(TRUTH_COUNTS[n], TRUTH_LEFT[n]);
    return { n, pts, s: strengthOf(pts) };
  });
  return {
    title: "Block 2.2 · The four needs and their strength",
    expected: rows
      .filter((r) => TRUTH_COUNTS[r.n] >= 2)
      .map((r) => `${NEEDS[r.n].short} (${TRUTH_COUNTS[r.n]} touchpoints + ${TRUTH_LEFT[r.n]} left = ${r.pts} → ${STRENGTH_LABEL[r.s]})`)
      .join(" · "),
    options: rows.map((r) => ({
      label: `${NEEDS[r.n].label}: ${TRUTH_COUNTS[r.n]} touchpoints, ${TRUTH_LEFT[r.n]} left`,
      expected: TRUTH_COUNTS[r.n] >= 2,
      why:
        TRUTH_COUNTS[r.n] >= 2
          ? `Central: one of the four most frequent. ${r.pts} points is ${STRENGTH_LABEL[r.s]}.${r.n === "belonging" ? " No customer left after these touchpoints, so it is Low even though it is a central need." : ""}`
          : `Appears in ${TRUTH_COUNTS[r.n]} touchpoint, so it is not among the four most frequent. ${r.n === "status" || r.n === "timing" ? "The customer who left after it deserves a watch, not a place in the top four." : ""}`,
    })),
    teachingNote:
      "The check compares the learner's four needs and ratings with the learner's own tally, not with this table, so a learner who tagged a touchpoint differently can still be right. If their tally matches the reference tags, the answer is Trust High, Relevance Mid, Security Mid, Belonging Low. Ask a learner who calls Belonging ‘High’ what happened to those two customers: both complained and stayed.",
  };
}

export function infoKey(): AnswerKeyBlock {
  return {
    title: "Block 2.2 · What the file does not tell you",
    expected: INFO_ITEMS.filter((i) => i.useful).map((i) => i.label).join(" · "),
    options: INFO_ITEMS.map((i) => ({ label: i.label, expected: i.useful, why: i.why })),
    teachingNote: "Any two or three of the four useful items defend. The three that do not are counts of activity or already in the file. Do not accept “newsletter open rate” without asking what an open says about how the customer felt (nothing).",
  };
}

export function measureKey(): AnswerKeyBlock {
  return {
    title: "Block 2.3 · The three measures",
    expected: `${MODEL_MEASURES.map((id) => MEASURES.find((m) => m.id === id)!.name).join(", ")} (scores ${MODEL_MEASURES.map((id) => modelScore(id)).join(", ")}; ${euro(MODEL_COST)})`,
    options: MEASURES.map((m) => ({
      label: `${m.name}: ${m.model.effect} × ${m.model.acceptance} × ${scalabilityOf(m.id)} = ${modelScore(m.id)}`,
      expected: MODEL_MEASURES.includes(m.id),
      why: `${m.model.note} ${m.verdict}`,
    })),
    teachingNote: `The budget forces the choice: the four measures that work cost ${euro(WORKING_FOUR_COST)}, and with the loyalty concept of Block 2.4 (${euro(MODEL_LOYALTY_COST)} for the model) the plan would be ${euro(WORKING_FOUR_COST + MODEL_LOYALTY_COST)} against ${euro(BUDGET)}. The usage-based offers and the incident and data-location pack tie at 12; either defends as the third measure if the learner says what they leave out and which need is then uncovered (the model keeps the offers because the plan asks for personalisation and the review already reaches Security). Effect is judged from the learner's own tally, so accept a different score if it is explained by their evidence. Acceptance and scalability follow the printed rules: a Check outlines any score that breaks them.`,
  };
}

export function orderKey(): AnswerKeyBlock {
  return {
    title: "Block 2.3 · The priority order",
    expected: "References, then the value review (both 18), then the usage-based offers (12)",
    options: [
      { label: "References first", expected: true, why: "Trust is the strongest need (three touchpoints, two lost customers), it reaches every customer and it needs no data. Six weeks to a first effect." },
      { label: "Value review second", expected: true, why: "The same score. It replaces a discount with a benefit and reaches every customer. Eight weeks." },
      { label: "Usage-based offers third", expected: true, why: "Score 12: it fits the customer, but only the 450 who agreed can be reached, and it needs twelve weeks and a review before the first send." },
    ],
    teachingNote: "The two 18s can be swapped if a reason is stated (the review is the deeper change, the references are the faster one). What is not defensible is an order that puts a lower score above a higher one with no reason, which is what the app's check flags.",
  };
}

export function loyaltyTypeKey(): AnswerKeyBlock {
  return {
    title: "Block 2.4 · The main type",
    expected: `${LOYALTY_TYPES.find((t) => t.id === MODEL_TYPE)!.label} (Service also defends)`,
    options: LOYALTY_TYPES.map((t) => ({
      label: t.label,
      expected: t.id !== "bonus",
      why: t.id === "bonus" ? "A bonus alone is the reward the brief warns against: it costs on every member and stops mattering when it stops." : t.builds,
    })),
    teachingNote: "The check outlines a Bonus type, and a type that none of the two chosen benefits belongs to (a Community type with two service benefits). Community fits the model because belonging was uncovered by the three measures; Service fits if the learner chose the review and a named contact.",
  };
}

export function loyaltyBenefitsKey(): AnswerKeyBlock {
  return {
    title: "Block 2.4 · The two benefits",
    expected: `${MODEL_BENEFITS.map((id) => BENEFITS.find((b) => b.id === id)!.name).join(" and ")} (${euro(MODEL_LOYALTY_COST)} with the set-up)`,
    options: BENEFITS.map((b) => ({
      label: `${b.name} (${b.type}, €${b.perMember} per member per year)`,
      expected: MODEL_BENEFITS.includes(b.id),
      why: `${b.note}${b.acts.length ? ` Acts on ${b.acts.map((a) => NEEDS[a].short).join(" and ")}.` : " Acts on none of the six needs."}`,
    })),
    teachingNote: "The check outlines a pair of two bonus-type benefits. The budget does the rest: the three model measures cost €129,000, so €51,000 is left, of which €18,000 is the set-up. At 600 members over six months only about €110 per member per year fits, so the service benefits (€120 and €150) and every bonus do not fit unless a measure is dropped. Accept any two benefits that reach at least two of the four needs.",
  };
}

export function entryKey(): AnswerKeyBlock {
  return {
    title: "Block 2.4 · How customers join",
    expected: ENTRIES.find((e) => e.id === MODEL_ENTRY)!.label,
    options: ENTRIES.map((e) => ({ label: e.label, expected: e.id === MODEL_ENTRY, why: e.id === MODEL_ENTRY ? e.why : e.rejected })),
    teachingNote: "Only the opt-in defends. The two others look like consent and are not: the pre-ticked box is the case decided by the CJEU in 2019 (Planet49), and automatic enrolment uses data the customer has not agreed to share. This is the point where a learner with a marketing background usually needs the correction.",
  };
}

export function horizonKey(): AnswerKeyBlock {
  return {
    title: "Block 2.4 · How the benefit lasts",
    expected: HORIZONS.find((h) => h.id === MODEL_HORIZON)!.label,
    options: HORIZONS.map((h) => ({ label: h.label, expected: h.id === MODEL_HORIZON, why: h.id === MODEL_HORIZON ? h.why : h.rejected })),
    teachingNote: "Short-term activation and long-term retention are the two ends the coaching round names. Points that reset and a welcome gift both activate; only a benefit that grows with tenure gives a customer a reason to be here in year three.",
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function visionKey(): AnswerKeyBlock {
  return {
    title: "Block 3.1 · The target vision",
    expected: `${VISIONS.find((v) => v.id === MODEL_VISION)!.label} (the recommendation vision also defends)`,
    options: VISIONS.map((v) => ({ label: v.label, expected: v.defends, why: v.defends ? v.why : v.rejected })),
    teachingNote: "Three tests of a vision (Materi B1): it is an outcome in the customer, not a tactic; it can be seen in behaviour; and it survives a change of tactic. Vision 4 fails the first, vision 3 the second and third, vision 5 the second.",
  };
}

export function leverKey(): AnswerKeyBlock {
  return {
    title: "Block 3.2 · The three behaviour levers",
    expected: BEHAVIOUR_LEVERS.map((l) => `${l.name}: ${l.phaseAccept.map((p) => PHASES[p].name).join(" or ")}`).join(" · "),
    options: BEHAVIOUR_LEVERS.flatMap((l) => [
      { label: `${l.name}: the customer's question`, expected: true, why: l.questions.find((q) => q.id === l.questionTruth)!.label },
      { label: `${l.name}: the signal`, expected: true, why: l.signals.find((s) => s.id === l.signalTruth)!.label },
      { label: `${l.name}: the phase`, expected: true, why: `${l.phaseAccept.map((p) => PHASES[p].name).join(" or ")}. ${l.why}` },
    ]),
    teachingNote: "Two phases defend for Emotion (Renewal, Usage) and Relevance (Usage, Renewal); Trust is built in Onboarding. The check reports how many of the nine picks hold and never which ones. The decoy signals are activity or unrelated behaviour (opening a newsletter, downloading an invoice): none of them shows that the customer feels anything.",
  };
}

export function ladderKey(): AnswerKeyBlock {
  const rows = GROUP_IDS.map((g) => ({ g, l: LEVEL_BY_ID[MODEL_LEVELS[g]], r: responders(g, MODEL_LEVELS[g]) }));
  const total = rows.reduce((s, r) => s + r.r, 0);
  return {
    title: "Block 3.3 · How far to personalise each group",
    expected: rows.map((r) => `Group ${r.g}: level ${r.l.n} (${r.r} responders)`).join(" · ") + ` · ${total} in all, at ${euro(engineCost(Object.values(MODEL_LEVELS)))}`,
    options: GROUP_IDS.flatMap((g) =>
      LEVELS.map((l) => ({
        label: `Group ${g} → level ${l.n} (${l.name})`,
        expected: l.id === MODEL_LEVELS[g],
        why:
          l.n > Number(GROUPS[g].cap.slice(1))
            ? `Beyond the data this group allows. ${GROUPS[g].capWhy}`
            : l.id === MODEL_LEVELS[g]
              ? `The highest level the data allows. ${GROUPS[g].capWhy} ${responders(g, l.id)} responders.`
              : `Inside the data limit, but a lower level than the group allows: ${responders(g, l.id)} responders, so some fit is left unused.`,
      })),
    ),
    teachingNote:
      "The check flags a group that is above its data limit. A level below the limit is not flagged: it is a cost decision. Level 2 for Group A defends if the learner cites the marginal cost: level 3 adds 18 responders (45 against 27) for €27,000 more, about €1,500 for each extra responder. Level 4 fails on data (no separate consent) and on cost (€190,000 for one more point of response).",
  };
}

export function systemKey(): AnswerKeyBlock {
  return {
    title: "Block 3.4 · The three building blocks",
    expected: MODEL_SYSTEMS.map((id) => SYSTEMS.find((s) => s.id === id)!.name).join(", "),
    options: SYSTEMS.map((s) => ({
      label: `${s.name}: ${systemModelTotal(s.id)} of 12`,
      expected: MODEL_SYSTEMS.includes(s.id),
      why: s.note,
    })),
    teachingNote:
      "The check requires at least two of the three to be process or rule building blocks, and reports how many of them are bonuses. The named contact is the deepest in a single relationship but scores 7 because it depends on people and its cost repeats with every member; the points scheme scores 5 and is the discount the plan warns against. The status and early-access blocks score 10 and defend as alternatives, especially if the learner argues that belonging is already covered elsewhere.",
  };
}

export function riskKey(): AnswerKeyBlock {
  return {
    title: "Block 3.5 · The three risks",
    expected: `${MODEL_RISKS.map((id) => RISKS.find((r) => r.id === id)!.name).join("; ")} (any three of the six psychology risks defend)`,
    options: RISKS.map((r) => ({
      label: `${r.name}${r.psychology ? "" : " (not a psychology risk)"}`,
      expected: r.psychology,
      why: r.why,
    })),
    teachingNote: "The check counts how many chosen risks are misjudgments of customer psychology or acceptance. The two that are not (a competitor copying the programme, the consent centre delivered late) are real risks that belong in the market analysis and the governance of the plan.",
  };
}

export function ownerKey(ids: ArchId[], levels: (LevelId | null)[]): AnswerKeyBlock {
  return {
    title: "Block 3.6 · Owners",
    expected: ids.map((id) => `${archName(id, levels)}: ${OWNER_ACCEPT[id].map((o) => OWNERS[o].name).join(" or ")}`).join(" · "),
    options: ids.map((id) => ({
      label: archName(id, levels),
      expected: true,
      why: `Owner test: who can change it without asking anyone else? ${OWNER_ACCEPT[id].map((o) => `${OWNERS[o].name} (${OWNERS[o].profile})`).join(" Or: ")}`,
    })),
    teachingNote: "Accept an alternative owner if the learner can name what that person can change. Push back on more than two items for the Chief Customer Officer, and on the data protection officer as the owner of an item that uses data: the officer advises and monitors and must stay independent, so owning the measure would be a conflict of interest.",
  };
}

export function decisionKey(): AnswerKeyBlock {
  return {
    title: "Block 3.7 · The decision",
    expected: DECISIONS.find((d) => d.id === MODEL_DECISION)!.label,
    options: DECISIONS.map((d) => ({ label: d.label, expected: d.id === MODEL_DECISION, why: d.id === MODEL_DECISION ? d.why : d.rejected })),
    teachingNote: "“Commit now” defends only if the learner can say what in the plan can be undone; most of the money is spent in the first months. “Wait” is the one to refuse: the brief asks for a decision before the data is clear, and Materi B6 shows waiting has the largest regret under every reading.",
  };
}

export function tripKey(): AnswerKeyBlock {
  const k = KPIS.find((x) => x.id === MODEL_TRIPWIRE.kpi)!;
  return {
    title: "Block 3.7 · The tripwire",
    expected: `${k.label} reaches ${MODEL_TRIPWIRE.threshold}${k.unit === "%" ? "%" : ` ${k.unit}`} by month ${MODEL_TRIPWIRE.month}, otherwise adjust one lever`,
    options: KPIS.map((x) => ({
      label: `${x.label} (baseline ${x.baseline}${x.unit === "%" ? "%" : ` ${x.unit}`})`,
      expected: x.behaviour,
      why: x.behaviour ? `A customer behaviour. The threshold must be ${x.better === "up" ? "above" : "below"} ${x.baseline}.` : "An activity count: it says how much CloudTech sent, not how the customers behaved, and it could push the team to send more, which raises the risk of over-personalisation.",
    })),
    teachingNote: "Any of the four behaviour metrics defends. The check flags a threshold that is not better than the baseline printed in the block, and the activity metric. The objections metric is the guard against over-personalisation: its threshold must be below 14.",
  };
}

