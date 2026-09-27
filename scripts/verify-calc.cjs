/**
 * Re-derives every figure and every rule the day rests on, from the same data files the site uses, and compares them with the
 * results briefed in the README. Run: npm run verify:calc. A failed line prints FAIL and the process exits with code 1.
 *
 * The data files are TypeScript with "@/" imports, so a tiny loader transpiles them on the fly (no test framework, no extra dependency).
 */
const path = require("path");
const fs = require("fs");
const Module = require("module");
const ts = require(path.join(process.cwd(), "node_modules", "typescript"));

const root = process.cwd();
const origResolve = Module._resolveFilename;
Module._resolveFilename = function (request, ...rest) {
  if (request.startsWith("@/")) {
    const base = path.join(root, request.slice(2));
    for (const ext of [".ts", ".tsx", "/index.ts"]) if (fs.existsSync(base + ext)) return base + ext;
  }
  return origResolve.call(this, request, ...rest);
};
require.extensions[".ts"] = function (module, filename) {
  const out = ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } });
  module._compile(out.outputText, filename);
};

let failed = 0;
const ok = (name, cond, detail = "") => {
  console.log(`${cond ? "ok  " : "FAIL"}  ${name}${detail ? "  " + detail : ""}`);
  if (!cond) failed++;
};
const eq = (name, a, b) => ok(name, JSON.stringify(a) === JSON.stringify(b), `got ${JSON.stringify(a)}, want ${JSON.stringify(b)}`);

const cust = require("@/data/custBase");
const feelings = require("@/data/feelings");
const trig = require("@/data/triggers");
const touch = require("@/data/touchpoints");
const measures = require("@/data/measures");
const loyalty = require("@/data/loyalty");
const r2 = require("@/data/route2");
const key = require("@/data/mentorKey");
const checks = require("@/lib/checks");
const calc = require("@/lib/calcBuilder");
const appr = require("@/data/approaches");

console.log("\nBlock 1.4 · reach, rebate and cost per customer");
eq("F1 = 1,500 × 40% × 75% = 450", cust.FIG.F1, 450);
eq("members = 750", cust.FIG.members, 750);
eq("F2 = 750 × 12,000 × 2% × 6/12 = 90,000", Math.round(cust.FIG.F2), 90000);
eq("cost of B = 45,000", cust.FIG.costB, 45000);
eq("F3 = 45,000 / 450 = 100", cust.FIG.F3, 100);
eq("newsletter per customer = 8", cust.FIG.perA, 8);
eq("builder F1", calc.FIGURE_BUILDERS.F1.compute({ customers: 1500, consent: 40, usable: 75 }), 450);
eq("builder F2", Math.round(calc.FIGURE_BUILDERS.F2.compute({ customers: 1500, share: 50, value: 12000, rebate: 2, months: 6 })), 90000);
eq("builder F3", calc.FIGURE_BUILDERS.F3.compute({ build: 36000, review: 9000, reached: 450 }), 100);
ok("model parts give no wrong part", ["F1", "F2", "F3"].every((f) => calc.wrongParts(calc.FIGURE_BUILDERS[f], f, calc.modelParts(calc.FIGURE_BUILDERS)).length === 0));
ok("a sentence citing 450 is accepted", checks.citesCalcFigure("Measure B reaches only 450 customers."));
ok("a sentence citing only the base is not", !checks.citesCalcFigure("There are 1,500 customers and revenue is €12,000."));
ok("the model sentence cites a figure", checks.citesCalcFigure(key.KEY_L1.sentence));
ok("figMatches accepts 90,000 and 90.000", checks.figMatches("90,000", 90000) && checks.figMatches("90.000", 90000));
eq("risk truth", cust.RISK_TRUTH, { A: "noise", B: "watched", C: "discount" });

console.log("\nBlock 1.1 and 1.2 · feelings and triggers");
eq("feeling counts", feelings.FEELING_TRUTH_COUNTS, { security: 2, trust: 2, status: 2, belonging: 2 });
eq("model sort holds 8 of 8", checks.sortHolds(key.KEY_L1.sort), { holds: 8, placed: 8 });
eq("eight sales lines, two per trigger", ["scarcity", "proof", "authority", "none"].map((t) => trig.LINES.filter((l) => l.truth === t).length), [2, 2, 2, 2]);
eq("model trigger tags hold 8 of 8", checks.trigHolds(key.KEY_L1.trig), { holds: 8, placed: 8 });
eq("three lines fail the tests", trig.FAILING_LINES.length, 3);
eq("model no-send picks all fail", checks.noSendHolds(key.KEY_L1.noSend), { holds: 3, chosen: 3 });
ok("every model approach is distinct and reasoned", new Set(key.KEY_L1.approaches.map((a) => a.emotion)).size === 3 && key.KEY_L1.approaches.every((a) => appr.hasBecause(a.text) && a.text.length >= appr.APPROACH_MIN));

console.log("\nBlocks 2.1 and 2.2 · the touchpoints");
eq("twelve touchpoints", touch.TOUCHPOINTS.length, 12);
eq("counts", touch.TRUTH_COUNTS, { security: 2, trust: 3, status: 1, belonging: 2, relevance: 3, timing: 1 });
eq("customers left", touch.TRUTH_LEFT, { security: 1, trust: 2, status: 1, belonging: 0, relevance: 1, timing: 1 });
const strengths = Object.fromEntries(Object.keys(touch.TRUTH_COUNTS).map((n) => [n, touch.strengthOf(touch.strengthPoints(touch.TRUTH_COUNTS[n], touch.TRUTH_LEFT[n]))]));
eq("strength by the rule", strengths, { security: "mid", trust: "high", status: "low", belonging: "low", relevance: "mid", timing: "low" });
const tally = checks.tallyOf(key.KEY_L1.tags);
eq("own tally of the model tags = the reference counts", tally.count, touch.TRUTH_COUNTS);
eq("central needs are the four with 2+ touchpoints", Object.keys(touch.TRUTH_COUNTS).filter((n) => checks.isCentral(n, tally)).sort(), ["belonging", "relevance", "security", "trust"]);
const l1 = { ...key.KEY_L1 };
const pc = checks.patternCheck(l1);
eq("model patterns: 4 needs and 4 ratings hold", [pc.need, pc.strength], [4, 4]);
eq("model tags hold 12 of 12", checks.tagHolds(key.KEY_L1.tags), { holds: 12, placed: 12 });
eq("model information picks all useful", checks.infoHolds(key.KEY_L1.info), { holds: 3, chosen: 3 });

console.log("\nBlock 2.3 · the measures (effect × acceptance × scalability, budget 180,000, 6 months)");
const scores = Object.fromEntries(measures.MEASURES.map((m) => [m.id, measures.modelScore(m.id)]));
eq("scores", scores, { refs: 18, partner: 6, usage: 12, rules: 9, transparency: 12, review: 18, rebate: 9, tracking: 9, news: 9 });
eq("model three cost 129,000", measures.MODEL_COST, 129000);
eq("the four that work cost 165,000", measures.WORKING_FOUR_COST, 165000);
ok("the four that work plus the model concept exceed the budget", measures.WORKING_FOUR_COST + loyalty.MODEL_LOYALTY_COST > measures.BUDGET);
ok("the model three plus the model concept fit the budget", measures.MODEL_COST + loyalty.MODEL_LOYALTY_COST <= measures.BUDGET, `(${measures.MODEL_COST + loyalty.MODEL_LOYALTY_COST})`);
eq("every model acceptance holds", key.KEY_L1.chosen.every((id) => checks.acceptHolds(id, key.KEY_L1.acc[id])), true);
eq("every model scalability holds", key.KEY_L1.chosen.every((id) => checks.scaleHolds(id, key.KEY_L1.sca[id])), true);
eq("every model aim holds", key.KEY_L1.chosen.every((id) => checks.aimsHold(id, key.KEY_L1.aims[id])), true);
ok("acceptance 3 on tracking without opt-in is flagged", !checks.acceptHolds("tracking", 3));
ok("acceptance 3 on usage offers is flagged, 2 is not", !checks.acceptHolds("usage", 3) && checks.acceptHolds("usage", 2));
ok("a decoy with aims chosen does not hold", !checks.aimsHold("rebate", ["trust"]));
ok("a decoy with no aims holds", checks.aimsHold("rebate", []));
eq("no order inversions in the model order", checks.orderInversions(l1).length, 0);
eq("the model measures cover trust, relevance and security", checks.coverage(l1).map((c) => [c.need, c.covered]), [["trust", true], ["relevance", true], ["security", true], ["belonging", false]]);

console.log("\nBlock 2.4 · the loyalty concept");
eq("model concept costs 45,000", loyalty.MODEL_LOYALTY_COST, 45000);
eq("plan total 174,000", measures.MODEL_COST + loyalty.MODEL_LOYALTY_COST, 174000);
const l1model = { ...key.KEY_L1, chosen: key.KEY_L1.chosen };
eq("model concept: nothing flagged", checks.loyaltyFlags(l1model), []);
eq("a bonus type is flagged", checks.loyaltyFlags({ ...l1model, loyType: "bonus" }).includes("type"), true);
eq("two bonuses are flagged", checks.loyaltyFlags({ ...l1model, loyBenefits: ["b1", "b2"] }).includes("benefits"), true);
eq("opt-out is flagged", checks.loyaltyFlags({ ...l1model, loyEntry: "preticked" }).includes("entry"), true);
eq("points that reset are flagged", checks.loyaltyFlags({ ...l1model, loyHorizon: "points" }).includes("horizon"), true);
eq("model plan is inside the budget", checks.planOver(l1model), 0);
eq("model benefits reach belonging and status", checks.benefitNeeds(l1model).sort(), ["belonging", "status"]);

console.log("\nRoute 2 · vision, levers, ladder, system, risks, architecture, decision");
eq("model vision defends", r2.VISION_BY_ID[key.KEY_R2.vision].defends, true);
const r2s = {
  vision: key.KEY_R2.vision,
  levers: key.KEY_R2.levers,
  lvl: key.KEY_R2.levels,
  sys: key.KEY_R2.systems,
  rate: key.KEY_R2.rate,
  risks: key.KEY_R2.risks,
  riskSignal: key.KEY_R2.riskSignal,
  alloc: Object.fromEntries(key.KEY_R2.arch.map((id) => [id, true])),
  start: key.KEY_R2.start,
  tripKpi: key.KEY_R2.tripKpi,
  tripThreshold: key.KEY_R2.tripThreshold,
};
eq("model levers: 9 of 9", checks.leversHold(r2s).holds, 9);
eq("model ladder: no group above its data limit", checks.ladderFlags(r2s), []);
eq("level 4 for a group is flagged", checks.ladderFlags({ lvl: { A: "l4", B: null, C: null } }), ["A"]);
eq("model responders 45 + 63 + 32 = 140", checks.totalResponders(r2s), 140);
eq("model engine costs 75,000", r2.engineCost(Object.values(key.KEY_R2.levels)), 75000);
ok("model ratings respect the printed limits", r2.MODEL_SYSTEMS.every((id) => ["reach", "depth", "durability", "scale"].every((c) => r2.SYSTEM_BY_ID[id].model[c] <= r2.maxRating(id, c))));
ok("every system block's model ratings respect its limits", r2.SYSTEMS.every((s) => ["reach", "depth", "durability", "scale"].every((c) => s.model[c] <= r2.maxRating(s.id, c))));
eq("system totals", Object.fromEntries(r2.SYSTEMS.map((s) => [s.id, r2.systemModelTotal(s.id)])), { points: 5, review: 10, contact: 7, circle: 9, refs: 10, status: 10, early: 10 });
eq("model system: all three process or rule blocks", checks.systemicCount(r2.MODEL_SYSTEMS), 3);
eq("model system: no bonus", checks.bonusSystems(r2.MODEL_SYSTEMS), 0);
eq("model ratings: none flagged", checks.ratingFlags(r2s), []);
eq("model risks are all psychology risks", checks.psychologyCount(r2.MODEL_RISKS), 3);
eq("two decoy risks are not psychology", r2.RISKS.filter((r) => !r.psychology).length, 2);
eq("model signals: none flagged", checks.signalFlags(r2s), []);
const archCost = checks.archCost(r2s);
eq("model architecture costs 237,000", archCost, 237000);
ok("model architecture fits 240,000", archCost <= r2.R2_BUDGET);
ok("adding the dashboard would exceed the budget", archCost + r2.DASHBOARD.cost > r2.R2_BUDGET, `(${archCost + r2.DASHBOARD.cost})`);
eq("model sequence: consent first and budget hold", (({ baseline, budget }) => [baseline, budget])(checks.seqRules(r2s)), [true, true]);
eq("a foundation that starts late is flagged", checks.seqRules({ ...r2s, start: { ...r2s.start, foundation: 5 } }).baseline, false);
eq("model tripwire: nothing flagged", checks.tripFlags(r2s), []);
eq("the activity metric is flagged", checks.tripFlags({ tripKpi: "mails", tripThreshold: "20" }).includes("kpi"), true);
eq("a threshold at the baseline is flagged", checks.tripFlags({ tripKpi: "optin", tripThreshold: "40" }).includes("threshold"), true);
eq("an objections threshold above the baseline is flagged", checks.tripFlags({ tripKpi: "objection", tripThreshold: "20" }).includes("threshold"), true);
ok("every model owner is an accepted owner", key.KEY_R2.arch.every((id) => r2.OWNER_ACCEPT[id].includes(key.KEY_R2.owner[id])));
ok("every model trigger names a number", key.KEY_R2.arch.every((id) => /\d/.test(key.KEY_R2.trigger[id])));
ok("no model owner is the data-protection officer", key.KEY_R2.arch.every((id) => key.KEY_R2.owner[id] !== "dpo"));

console.log("\nMateri B6 regret table (Brenner, € thousand)");
const pay = { commit: [260, 70, -140], stage: [180, 70, -20], wait: [-40, -40, -40] };
const best = [0, 1, 2].map((j) => Math.max(...Object.values(pay).map((p) => p[j])));
const worst = Object.fromEntries(Object.entries(pay).map(([k, p]) => [k, Math.max(...p.map((v, j) => best[j] - v))]));
eq("worst regret", worst, { commit: 120, stage: 80, wait: 300 });
const ev = (p, q) => ((1 - q) / 2) * (p[0] + p[1]) + q * p[2];
ok("commit and stage cross at 25%", Math.abs(ev(pay.commit, 0.25) - ev(pay.stage, 0.25)) < 1e-9);
ok("stage beats commit above 25%, commit beats stage below", ev(pay.stage, 0.4) > ev(pay.commit, 0.4) && ev(pay.commit, 0.2) > ev(pay.stage, 0.2));

console.log("\nMateri A4 worked example (Brenner)");
eq("reach 480", 2000 * 0.3 * 0.8, 480);
eq("rebate for four months 72,000", Math.round(2000 * 0.4 * 9000 * 0.03 * (4 / 12)), 72000);
eq("cost per reached customer 75", (30000 + 6000) / 480, 75);

console.log(failed ? `\n${failed} check(s) FAILED` : "\nAll checks passed.");
process.exit(failed ? 1 : 0);
