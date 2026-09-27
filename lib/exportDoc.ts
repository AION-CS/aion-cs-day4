import { FEELINGS } from "@/data/feelings";
import { LINES, TRIGGER_LABEL } from "@/data/triggers";
import { NEEDS, NEED_IDS } from "@/data/needs";
import { APPROACH_EMOTION_LABEL } from "@/data/approaches";
import { BASE, FIGURES, LETTERS, MEASURES_L1, RISK_PICKS } from "@/data/custBase";
import { INFO_BY_ID, OUTCOME_LABEL, STRENGTH_LABEL, TOUCHPOINTS } from "@/data/touchpoints";
import { BUDGET, DATA_LABEL, EFFORT_LABEL, MEASURE_BY_ID } from "@/data/measures";
import { BENEFIT_BY_ID, ENTRIES, HORIZONS, LOYALTY_TYPES, MEMBERS } from "@/data/loyalty";
import {
  BEHAVIOUR_LEVERS,
  DECISIONS,
  GROUPS,
  GROUP_IDS,
  KIND_LABEL,
  KPI_BY_ID,
  LEVEL_BY_ID,
  OWNERS,
  PHASES,
  R2_BUDGET,
  RISK_BY_ID,
  SYSTEM_BY_ID,
  VISION_BY_ID,
  archName,
  responders,
} from "@/data/route2";
import type { Criterion } from "@/data/route2";
import {
  archCost,
  archCostOf,
  archLeft,
  archList,
  benefitNeeds,
  coverage,
  funded,
  loyaltyCostOf,
  measureScore,
  ownPoints,
  ownStrength,
  planCost,
  planLeft,
  planOver,
  systemTotal,
  tallyOf,
  totalCost,
  totalResponders,
} from "@/lib/checks";
import { engineCost } from "@/data/route2";
import { euro, locale, num, tt } from "@/lib/lang";
import { parseAmount } from "@/lib/parseAmount";
import { COURSE } from "@/lib/routes";
import { esc } from "@/lib/svg";
import type { Persisted } from "@/store/useStore";

/**
 * Each exported document is built here as a self-contained HTML string (inline CSS + inline SVG). The on-screen "Preview of your ..."
 * renders this same body, so what the participant reads is what they download. It never prints answer keys, ticks, crosses or scores
 * (a measure's Effect × Acceptance × Scalability is the learner's own priority score, not a mark).
 */

const courseName = () => COURSE.course;

export const DOC_CSS = `
.doc{font-family:Georgia,Cambria,"Times New Roman",serif;color:#1F2328;background:#FFFEFA;line-height:1.5;font-size:14px}
.doc *{box-sizing:border-box}
.doc h1{font-size:22px;margin:0 0 4px;font-weight:600}
.doc h2{font-size:15px;margin:22px 0 8px;padding-bottom:4px;border-bottom:1px solid #D8D1BF;font-weight:600;letter-spacing:.01em}
.doc h3{font-size:13.5px;margin:14px 0 4px;font-weight:600}
.doc .meta{display:grid;grid-template-columns:auto 1fr;gap:2px 14px;margin:12px 0 4px;font-family:system-ui,sans-serif;font-size:12.5px}
.doc .meta dt{color:#59606A}.doc .meta dd{margin:0}
.doc .kicker{font-family:system-ui,sans-serif;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#8A5A0B}
.doc table{width:100%;border-collapse:collapse;font-size:12.5px;font-family:system-ui,sans-serif}
.doc th{text-align:left;font-weight:600;color:#59606A;border-bottom:1px solid #59606A;padding:4px 8px 4px 0;font-size:11px;letter-spacing:.04em;text-transform:uppercase}
.doc td{border-bottom:1px solid #ECE6D6;padding:6px 8px 6px 0;vertical-align:top}
.doc td.num{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}
.doc td.id{font-weight:700}
.doc table{table-layout:auto}.doc td,.doc th{overflow-wrap:anywhere}
.doc blockquote{margin:6px 0;padding:6px 12px;border-left:3px solid #D99A2B;background:#FBF0D6}
.doc .box{border:1px solid #D8D1BF;padding:8px 12px;margin:8px 0;background:#fff}
.doc .muted{color:#59606A}
.doc .tag{display:inline-block;border:1px dashed #A4472A;color:#A4472A;border-radius:99px;padding:0 8px;font-family:system-ui,sans-serif;font-size:11px;margin-left:6px}
.doc .foot{margin-top:26px;padding-top:8px;border-top:1px solid #59606A;font-family:system-ui,sans-serif;font-size:12px;color:#59606A}
.doc .legend{font-family:system-ui,sans-serif;font-size:11.5px;color:#59606A;margin:4px 0 0}
.doc svg{display:block;margin:8px 0}
@media print{.doc{font-size:12px}.doc h2{break-after:avoid}.doc table,.doc svg,.doc blockquote{break-inside:avoid}}
`;

const dateLabel = () => new Date().toLocaleDateString(locale() === "de-DE" ? "de-DE" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

function header(title: string, level: string, p: Persisted): string {
  return `
<div class="kicker">${esc(courseName())} · ${esc(COURSE.company)}</div>
<h1>${esc(title)}</h1>
<dl class="meta">
  <dt>${tt("Course", "Kurs")}</dt><dd>${esc(courseName())} · ${tt("Day", "Tag")} ${COURSE.day}</dd>
  <dt>${tt("Position", "Position")}</dt><dd>${esc(level)}</dd>
  <dt>${tt("Participant", "Teilnehmer")}</dt><dd>${esc(p.participant.name.trim() || "—")}</dd>
  <dt>${tt("Date", "Datum")}</dt><dd>${esc(dateLabel())}</dd>
</dl>`;
}

const para = (s: string) => `<blockquote>${esc(s.trim()) || "—"}</blockquote>`;
const cell = (s: string) => esc(s.trim()) || "—";

export function wrapDocument(title: string, body: string): string {
  return `<!doctype html>
<html lang="${tt("en", "de")}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<style>body{margin:0;background:#F3EFE4}.sheet{max-width:820px;margin:0 auto;padding:36px 40px;background:#FFFEFA}@media print{body{background:#fff}.sheet{padding:0;max-width:none}@page{margin:16mm}}${DOC_CSS}</style>
</head><body><div class="sheet"><div class="doc">${body}</div></div></body></html>`;
}

export function downloadHtml(filename: string, html: string) {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".html") ? filename : `${filename}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Opens the same document in a new window and prints it (no PDF library). Falls back to a hidden frame if pop-ups are blocked. */
export function printDocument(title: string, html: string) {
  const win = window.open("", "_blank");
  if (win) {
    win.document.open();
    win.document.write(html);
    win.document.close();
    win.document.title = title;
    win.focus();
    window.setTimeout(() => win.print(), 250);
    return;
  }
  const iframe = document.createElement("iframe");
  iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden";
  document.body.appendChild(iframe);
  const w = iframe.contentWindow;
  if (!w) return iframe.remove();
  w.document.open();
  w.document.write(html);
  w.document.close();
  window.setTimeout(() => {
    w.focus();
    w.print();
    window.setTimeout(() => iframe.remove(), 1000);
  }, 250);
}

/* ------------------------------------------------------------------ Route 1 · the Retention Plan */

const plural = (n: number, en1: string, enN: string, de1: string, deN: string) => tt(n === 1 ? en1 : enN, n === 1 ? de1 : deN);
const typeLabel = (id: string) => LOYALTY_TYPES.find((x) => x.id === id)?.label ?? id;

/** Bars of the learner's own tally: touchpoints (solid) and those followed by a customer leaving (dashed), as an inline SVG. */
function tallySvg(p: Persisted): string {
  const t = tallyOf(p.l1.tags);
  const W = 560;
  const rowH = 26;
  const rows = NEED_IDS.map((n, i) => {
    const y = 8 + i * rowH;
    const w = (t.count[n] / 6) * 220;
    const wd = (t.left[n] / 6) * 220;
    return `<text x="0" y="${y + 13}" font-size="11.5" fill="#1F2328" font-family="system-ui,sans-serif">${esc(NEEDS[n].short)}</text>
<rect x="90" y="${y}" width="${Math.max(w, 1.5).toFixed(1)}" height="14" fill="#2F5D62" stroke="#1F2328"/>
${t.left[n] > 0 ? `<rect x="${(90 + w).toFixed(1)}" y="${y}" width="${wd.toFixed(1)}" height="14" fill="#FBF0D6" stroke="#8A5A0B" stroke-dasharray="4 3"/>` : ""}
<text x="${(96 + w + wd).toFixed(1)}" y="${y + 12}" font-size="11.5" fill="#1F2328" font-family="system-ui,sans-serif">${t.count[n]} ${plural(t.count[n], "touchpoint", "touchpoints", "Touchpoint", "Touchpoints")} · ${t.left[n]} ${tt("left", "gegangen")}</text>`;
  }).join("\n");
  const H = 8 + NEED_IDS.length * rowH;
  const title = tt(
    "Touchpoints tagged with each need, and how many of them were followed by a customer leaving, as you tagged them",
    "Touchpoints je Bedürfnis, und wie viele davon von einer Kundenabwanderung gefolgt wurden, so wie Sie sie zugeordnet haben",
  );
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title>${rows}</svg>`;
}

export function retentionBody(p: Persisted): string {
  const { l1 } = p;
  const t = tallyOf(l1.tags);

  const sortRows = FEELINGS.map((f, i) => `<tr><td class="id">${i + 1}</td><td>${tt("“", "„")}${esc(f.quote)}${tt("”", "“")}</td><td>${l1.sort[f.id] ? esc(NEEDS[l1.sort[f.id]!].label) : "—"}</td></tr>`).join("");
  const sortNote = l1.sortReasoning ? `<p class="legend">${tt(`The reasoning for the sort was opened after ${l1.sortChecks} checks.`, `Die Begründung zur Zuordnung wurde nach ${l1.sortChecks} Prüfungen geöffnet.`)}</p>` : "";

  const trigRows = LINES.map((l, i) => `<tr><td class="id">${i + 1}</td><td class="muted">${esc(l.source)}</td><td>${tt("“", "„")}${esc(l.text)}${tt("”", "“")}</td><td>${l1.trig[l.id] ? esc(TRIGGER_LABEL[l1.trig[l.id]!]) : "—"}</td></tr>`).join("");
  const trigNote = l1.trigReasoning ? `<p class="legend">${tt(`The reasoning for the triggers was opened after ${l1.trigChecks} checks.`, `Die Begründung zu den Triggern wurde nach ${l1.trigChecks} Prüfungen geöffnet.`)}</p>` : "";
  const noSendList = l1.noSend.length
    ? `<ul>${l1.noSend.map((id) => `<li>${tt("Line", "Zeile")} ${LINES.findIndex((l) => l.id === id) + 1}: ${esc(LINES.find((l) => l.id === id)!.source)}</li>`).join("")}</ul>`
    : `<p class="muted">—</p>`;

  const appr = l1.appr
    .map(
      (a, i) =>
        `<h3>${tt("Approach", "Ansatz")} ${i + 1} · ${a.emotion ? esc(APPROACH_EMOTION_LABEL[a.emotion]) : "—"}${a.trigger ? ` · ${tt("trigger", "Trigger")}: ${esc(a.trigger === "none" ? tt("none", "keiner") : TRIGGER_LABEL[a.trigger])}` : ""}</h3>${para(a.text)}`,
    )
    .join("");

  const fig = (v: string) => (v.trim() ? esc(v.trim()) : "—");
  const figTable = `<table><thead><tr><th>${tt("Figure", "Kennzahl")}</th><th class="num">${tt("Your figure", "Ihre Zahl")}</th></tr></thead><tbody>
<tr><td class="id">F1 · ${esc(FIGURES.F1.label.replace("F1 · ", ""))}</td><td class="num">${fig(l1.figs.F1)}</td></tr>
<tr><td class="id">F2 · ${esc(FIGURES.F2.label.replace("F2 · ", ""))}</td><td class="num">${fig(l1.figs.F2)}</td></tr>
<tr><td class="id">F3 · ${esc(FIGURES.F3.label.replace("F3 · ", ""))}</td><td class="num">${fig(l1.figs.F3)}</td></tr></tbody></table>
<p class="legend">${tt(
    `As briefed (Case assumption): ${num(BASE.customers)} customers, average revenue ${euro(BASE.annualValue)} a year; ${BASE.consent}% agreed to usage analysis, ${BASE.usable}% of those have usable data. Measure A: ${euro(MEASURES_L1.A.cost)} for six months. Measure B: build ${euro(MEASURES_L1.B.build)}, review ${euro(MEASURES_L1.B.review)}. Measure C: ${MEASURES_L1.C.rebate}% rebate, ${MEASURES_L1.C.memberShare}% of customers join, ${MEASURES_L1.C.months} months.`,
    `Wie im Auftrag beschrieben (Case-Annahme): ${num(BASE.customers)} Kunden, durchschnittlicher Umsatz ${euro(BASE.annualValue)} im Jahr; ${BASE.consent} % haben der Nutzungsanalyse zugestimmt, ${BASE.usable} % davon haben nutzbare Daten. Maßnahme A: ${euro(MEASURES_L1.A.cost)} für sechs Monate. Maßnahme B: Aufbau ${euro(MEASURES_L1.B.build)}, Prüfung ${euro(MEASURES_L1.B.review)}. Maßnahme C: ${MEASURES_L1.C.rebate} % Rabatt, ${MEASURES_L1.C.memberShare} % der Kunden treten bei, ${MEASURES_L1.C.months} Monate.`,
  )}</p>`;
  const riskRows = LETTERS.map((l) => {
    const r = RISK_PICKS.find((x) => x.id === l1.risks[l]);
    return `<tr><td class="id">${l} · ${esc(l === "A" ? MEASURES_L1.A.name : l === "B" ? MEASURES_L1.B.name : MEASURES_L1.C.name)}</td><td>${cell(r?.label ?? "")}</td></tr>`;
  }).join("");

  const touchRows = TOUCHPOINTS.map((x) => `<tr><td class="id">${esc(x.label)}</td><td>${esc(x.moment)} · ${esc(x.stage)} · ${esc(OUTCOME_LABEL[x.outcome])}</td><td>${l1.tags[x.id] ? esc(NEEDS[l1.tags[x.id]!].label) : "—"}</td></tr>`).join("");
  const tallyRows = NEED_IDS.map((n) => {
    const pts = ownPoints(n, t);
    return `<tr><td class="id">${esc(NEEDS[n].label)}</td><td class="num">${t.count[n]}</td><td class="num">${t.left[n]}</td><td class="num">${pts}</td><td>${esc(STRENGTH_LABEL[ownStrength(n, t)])}</td></tr>`;
  }).join("");
  const tagNote = l1.tagReasoning ? `<p class="legend">${tt(`The reasoning for the tagging was opened after ${l1.tagChecks} checks.`, `Die Begründung zur Zuordnung der Touchpoints wurde nach ${l1.tagChecks} Prüfungen geöffnet.`)}</p>` : "";

  const patRows = l1.patterns
    .map((x, i) => `<tr><td class="id">${i + 1} · ${x.need ? esc(NEEDS[x.need].label) : "—"}</td><td>${cell(x.behaviour)}</td><td>${x.strength ? esc(STRENGTH_LABEL[x.strength]) : "—"}</td></tr>`)
    .join("");
  const infoList = l1.info.length ? `<ul>${l1.info.map((i) => `<li>${esc(INFO_BY_ID[i].label)}</li>`).join("")}</ul>` : `<p class="muted">—</p>`;

  const chosen = l1.chosen;
  const noneOfSix = tt("none of the six", "keines der sechs");
  const measureRows = chosen
    .map((id) => {
      const m = MEASURE_BY_ID[id];
      const aims = l1.aims[id];
      return `<tr><td class="id">${esc(m.name)}</td><td>${aims === undefined ? "—" : aims.length ? esc(aims.map((a) => NEEDS[a].short).join(", ")) : noneOfSix}</td><td class="num">${l1.eff[id] || "—"} × ${l1.acc[id] || "—"} × ${l1.sca[id] || "—"} = ${measureScore(l1, id) || "—"}</td><td class="num">${esc(euro(m.cost))} · ${m.weeks} ${tt("wk", "Wo.")}</td></tr>`;
    })
    .join("");
  const cov = coverage(l1);
  const covLine = cov.length
    ? tt(
        `Needs named in 2.2 that at least one chosen measure acts on: ${cov.filter((c) => c.covered).length} of ${cov.length}${cov.some((c) => !c.covered) ? ` (not reached by a measure: ${esc(cov.filter((c) => !c.covered).map((c) => NEEDS[c.need].short).join(", "))})` : ""}.`,
        `In 2.2 genannte Bedürfnisse, auf die mindestens eine gewählte Maßnahme wirkt: ${cov.filter((c) => c.covered).length} von ${cov.length}${cov.some((c) => !c.covered) ? ` (von keiner Maßnahme erreicht: ${esc(cov.filter((c) => !c.covered).map((c) => NEEDS[c.need].short).join(", "))})` : ""}.`,
      )
    : "";
  const cost = totalCost(chosen);
  const order = l1.order.filter((id) => chosen.includes(id));

  const benefits = l1.loyBenefits;
  const benefitRows = benefits.map((id) => `<tr><td class="id">${esc(BENEFIT_BY_ID[id].name)}</td><td>${esc(typeLabel(BENEFIT_BY_ID[id].type))}</td><td class="num">${euro(BENEFIT_BY_ID[id].perMember)}</td><td>${BENEFIT_BY_ID[id].acts.length ? esc(BENEFIT_BY_ID[id].acts.map((a) => NEEDS[a].short).join(", ")) : noneOfSix}</td></tr>`).join("");
  const named = l1.patterns.map((x) => x.need).filter((n): n is NonNullable<typeof n> => !!n);
  const reached = benefitNeeds(l1);
  const loyLine = named.length
    ? tt(
        `Needs named in 2.2 that the benefits act on: ${named.filter((n) => reached.includes(n)).length} of ${named.length}${named.some((n) => !reached.includes(n)) ? ` (not reached: ${esc(named.filter((n) => !reached.includes(n)).map((n) => NEEDS[n].short).join(", "))})` : ""}.`,
        `In 2.2 genannte Bedürfnisse, auf die die Vorteile wirken: ${named.filter((n) => reached.includes(n)).length} von ${named.length}${named.some((n) => !reached.includes(n)) ? ` (nicht erreicht: ${esc(named.filter((n) => !reached.includes(n)).map((n) => NEEDS[n].short).join(", "))})` : ""}.`,
      )
    : "";

  return `${header("Retention Plan", tt("Levels 1 and 2 · Knowledge and application", "Level 1 und 2 · Wissen und Anwendung"), p)}
<h2>${tt("The case", "Der Fall")}</h2>
<p>${tt(
    `CloudTech Solutions GmbH sells cloud hosting and managed IT to Mittelstand companies. Its offers look interchangeable and customers compare prices. Budget ${esc(euro(BUDGET))}, time 6 months, data protection critical. Evidence in the file: eight customer statements, eight sales lines, a customer base with three measures and twelve touchpoints.`,
    `CloudTech Solutions GmbH verkauft Cloud-Hosting und Managed IT an Mittelstandsunternehmen. Die Angebote wirken austauschbar, und Kunden vergleichen Preise. Budget ${esc(euro(BUDGET))}, Zeit 6 Monate, Datenschutz kritisch. Belege in der Akte: acht Kundenaussagen, acht Vertriebszeilen, eine Kundenbasis mit drei Maßnahmen und zwölf Touchpoints.`,
  )}</p>

<h2>${tt("Part 1 · Understand the emotional effect", "Teil 1 · Die emotionale Wirkung verstehen")}</h2>
<h3>${tt("1.1 · What customers said, sorted", "1.1 · Was Kunden gesagt haben, einsortiert")}</h3>
<table><thead><tr><th>#</th><th>${tt("Statement", "Aussage")}</th><th>${tt("Your tag", "Ihre Zuordnung")}</th></tr></thead><tbody>${sortRows}</tbody></table>${sortNote}
<h3>${tt("An emotional factor of my own, not in the statements", "Ein eigener emotionaler Faktor, der nicht in den Aussagen steht")}</h3>${para(l1.extraFactor)}
<h3>${tt("1.2 · The trigger in each sales line", "1.2 · Der Trigger in jeder Vertriebszeile")}</h3>
<table><thead><tr><th>#</th><th>${tt("Where", "Woher")}</th><th>${tt("Line", "Zeile")}</th><th>${tt("Your tag", "Ihre Zuordnung")}</th></tr></thead><tbody>${trigRows}</tbody></table>${trigNote}
<h3>${tt("Lines I would not send as they stand", "Zeilen, die ich so nicht senden würde")}</h3>${noSendList}
<h2>${tt("1.3 · Three approaches", "1.3 · Drei Ansätze")}</h2>
${appr}
<h2>${tt("1.4 · Weigh the three measures", "1.4 · Die drei Maßnahmen abwägen")}</h2>
${figTable}
<table><thead><tr><th>${tt("Measure", "Maßnahme")}</th><th>${tt("Main risk", "Hauptrisiko")}</th></tr></thead><tbody>${riskRows}</tbody></table>
${para(l1.sentence)}
<h2>${tt("1.5 · Coaching reflection", "1.5 · Coaching-Reflexion")}</h2>
<h3>${tt("Which of my choices assumed that facts, not feelings, would decide?", "Welche meiner Entscheidungen nahm an, dass Fakten und nicht Gefühle entscheiden?")}</h3>${para(l1.reflect.assume)}
<h3>${tt("Where could my personalisation tip into rejection?", "Wo könnte meine Personalisierung in Ablehnung kippen?")}</h3>${para(l1.reflect.tip)}
<h3>${tt("How would a strategic decision-maker prioritise?", "Wie würde ein strategischer Entscheider priorisieren?")}</h3>${para(l1.reflect.manager)}

<h2>${tt("Part 2 · Analyse and act", "Teil 2 · Analysieren und handeln")}</h2>
<h3>${tt("2.1 · The twelve touchpoints, as you tagged them", "2.1 · Die zwölf Touchpoints, so wie Sie sie zugeordnet haben")}</h3>
<table><thead><tr><th>Touchpoint</th><th>${tt("Where it stood", "Wo er stand")}</th><th>${tt("Need", "Bedürfnis")}</th></tr></thead><tbody>${touchRows}</tbody></table>${tagNote}
${tallySvg(p)}
<table><thead><tr><th>${tt("Need", "Bedürfnis")}</th><th class="num">Touchpoints</th><th class="num">${tt("Customers left", "Kunden gegangen")}</th><th class="num">${tt("Points", "Punkte")}</th><th>${tt("Strength", "Stärke")}</th></tr></thead><tbody>${tallyRows}</tbody></table>
<p class="legend">${tt(
    "Points = touchpoints + those followed by a customer leaving. 5 or more is High, 3 to 4 is Mid, 2 or fewer is Low. Counts follow your own tags.",
    "Punkte = Touchpoints + die, auf die ein Kunde ging. 5 oder mehr ist Hoch, 3 bis 4 ist Mittel, 2 oder weniger ist Niedrig. Die Zahlen folgen Ihren eigenen Zuordnungen.",
  )}</p>
<h2>${tt("2.2 · The four needs", "2.2 · Die vier Bedürfnisse")}</h2>
<table><thead><tr><th>${tt("Need", "Bedürfnis")}</th><th>${tt("What customers do, and why", "Was Kunden tun, und warum")}</th><th>${tt("Strength", "Stärke")}</th></tr></thead><tbody>${patRows}</tbody></table>
<h3>${tt("What the file does not tell you", "Was die Akte Ihnen nicht sagt")}</h3>${infoList}
<h3>${tt("The one question I would ask the customers who left", "Die eine Frage, die ich den abgewanderten Kunden stellen würde")}</h3>${para(l1.infoText)}
<h2>${tt("2.3 · Three measures, scored and ordered", "2.3 · Drei Maßnahmen, bewertet und geordnet")}</h2>
<table><thead><tr><th>${tt("Measure", "Maßnahme")}</th><th>${tt("Acts on", "Wirkt auf")}</th><th class="num">${tt("Effect × Acceptance × Scalability", "Wirkung × Akzeptanz × Skalierbarkeit")}</th><th class="num">${tt("Cost · weeks", "Kosten · Wochen")}</th></tr></thead><tbody>${measureRows || `<tr><td colspan="4">—</td></tr>`}</tbody></table>
<p class="legend">${tt(`Total cost of the three measures ${esc(euro(cost))} of the ${esc(euro(BUDGET))} budget.`, `Gesamtkosten der drei Maßnahmen ${esc(euro(cost))} vom Budget von ${esc(euro(BUDGET))}.`)} ${covLine}</p>
${chosen.length ? `<p class="legend">${chosen.map((id) => tt(`${esc(MEASURE_BY_ID[id].name)}: data used: ${esc(DATA_LABEL[MEASURE_BY_ID[id].data].toLowerCase())}; effort per additional customer: ${esc(EFFORT_LABEL[MEASURE_BY_ID[id].effort].toLowerCase())}`, `${esc(MEASURE_BY_ID[id].name)}: genutzte Daten: ${esc(DATA_LABEL[MEASURE_BY_ID[id].data])}; Aufwand je zusätzlichem Kunden: ${esc(EFFORT_LABEL[MEASURE_BY_ID[id].effort])}`)).join(" · ")}.</p>` : ""}
<h3>${tt("Priority order", "Prioritätsreihenfolge")}</h3>
<ol>${order.map((id) => `<li>${esc(MEASURE_BY_ID[id].name)}</li>`).join("") || "<li>—</li>"}</ol>
${para(l1.why)}
<h2>${tt("2.4 · The loyalty concept", "2.4 · Das Loyalty-Konzept")}</h2>
<p><strong>${tt("Main type:", "Haupttyp:")}</strong> ${l1.loyType ? esc(LOYALTY_TYPES.find((x) => x.id === l1.loyType)!.label) : "—"}</p>
<table><thead><tr><th>${tt("Benefit", "Vorteil")}</th><th>${tt("Type", "Typ")}</th><th class="num">${tt("Per member per year", "Pro Mitglied und Jahr")}</th><th>${tt("Acts on", "Wirkt auf")}</th></tr></thead><tbody>${benefitRows || `<tr><td colspan="4">—</td></tr>`}</tbody></table>
<p class="legend">${tt(`${esc(num(MEMBERS))} members assumed.`, `${esc(num(MEMBERS))} Mitglieder angenommen.`)} ${loyLine}</p>
<p><strong>${tt("How customers join:", "Wie Kunden beitreten:")}</strong> ${l1.loyEntry ? esc(ENTRIES.find((e) => e.id === l1.loyEntry)!.label) : "—"}</p>
<p><strong>${tt("How the benefit lasts:", "Wie der Vorteil anhält:")}</strong> ${l1.loyHorizon ? esc(HORIZONS.find((h) => h.id === l1.loyHorizon)!.label) : "—"}</p>
${para(l1.loyWhy)}
<p class="legend">${tt(
    `The concept costs ${esc(euro(loyaltyCostOf(l1)))} in six months. The whole plan (measures and concept) costs ${esc(euro(planCost(l1)))} of the ${esc(euro(BUDGET))} budget${planOver(l1) > 0 ? ` (${esc(euro(planOver(l1)))} over)` : ` (${esc(euro(planLeft(l1)))} left)`}.`,
    `Das Konzept kostet in sechs Monaten ${esc(euro(loyaltyCostOf(l1)))}. Der gesamte Plan (Maßnahmen und Konzept) kostet ${esc(euro(planCost(l1)))} vom Budget von ${esc(euro(BUDGET))}${planOver(l1) > 0 ? ` (${esc(euro(planOver(l1)))} darüber)` : ` (${esc(euro(planLeft(l1)))} übrig)`}.`,
  )}</p>

<div class="foot">${tt("Checks requested:", "Angeforderte Prüfungen:")} ${l1.checks}<br/>${tt("Generated", "Erstellt am")} ${esc(dateLabel())}.</div>`;
}

/* ------------------------------------------------------------------ Route 2 · the Strategy Memo */

/** The Level 3 memo. The on-screen live preview and the exported file are both built by this function. */
export function memoBody(p: Persisted): string {
  const { l1, r2 } = p;
  const name = p.participant.name.trim();

  const needs = l1.patterns.filter((x) => x.need).map((x) => NEEDS[x.need!].short);
  const situation =
    needs.length || l1.chosen.length
      ? `<blockquote><strong>${tt("Where Route 1 left off.", "Wo Route 1 stehen geblieben ist.")}</strong> ${tt("Needs you named:", "Bedürfnisse, die Sie genannt haben:")} ${esc(needs.join(", ") || "—")}. ${tt("Measures you chose:", "Maßnahmen, die Sie gewählt haben:")} ${esc(l1.chosen.map((id) => MEASURE_BY_ID[id].name).join(", ") || "—")}.</blockquote>`
      : `<p class="muted">${tt("Route 1 is not finished, so there is nothing to quote yet. Nothing is blocked.", "Route 1 ist nicht fertig, es gibt also noch nichts zu zitieren. Nichts ist gesperrt.")}</p>`;

  const v = r2.vision ? VISION_BY_ID[r2.vision] : null;

  const leverRows = BEHAVIOUR_LEVERS.map((l) => {
    const m = r2.levers[l.id];
    const q = l.questions.find((x) => x.id === m.question)?.label;
    const s = l.signals.find((x) => x.id === m.signal)?.label;
    return `<tr><td class="id">${esc(l.name)}</td><td>${cell(q ?? "")}</td><td>${cell(s ?? "")}</td><td>${m.phase ? esc(PHASES[m.phase].name) : "—"}</td><td>${cell(m.move)}</td></tr>`;
  }).join("");

  const levels = [r2.lvl.A, r2.lvl.B, r2.lvl.C];
  const ladderRows = GROUP_IDS.map((g) => {
    const l = r2.lvl[g];
    return `<tr><td class="id">${esc(GROUPS[g].name)}</td><td>${l ? esc(`${tt("Level", "Stufe")} ${LEVEL_BY_ID[l].n}: ${LEVEL_BY_ID[l].name}`) : "—"}</td><td class="num">${l ? num(responders(g, l), { maximumFractionDigits: 1 }) : "—"}</td></tr>`;
  }).join("");
  const engine = engineCost(levels);
  const totalR = totalResponders(r2);

  const crit: Criterion[] = ["reach", "depth", "durability", "scale"];
  const systemRows = r2.sys
    .map((id) => {
      const s = SYSTEM_BY_ID[id];
      return `<tr><td class="id">${esc(s.name)}</td><td>${esc(KIND_LABEL[s.kind])}</td>${crit.map((c) => `<td class="num">${r2.rate[`${id}.${c}`] || "—"}</td>`).join("")}<td class="num">${systemTotal(r2, id)} ${tt("of", "von")} 12</td></tr>`;
    })
    .join("");
  const mainLever = r2.mainLever ? BEHAVIOUR_LEVERS.find((l) => l.id === r2.mainLever)!.name : "—";

  const lmh = ["", tt("low", "niedrig"), tt("mid", "mittel"), tt("high", "hoch")];
  const riskRows = r2.risks
    .map((id) => {
      const r = RISK_BY_ID[id];
      const sig = r.signals.find((x) => x.id === r2.riskSignal[id])?.label;
      const lik = lmh[r2.riskLik[id] || 0] || "—";
      const imp = lmh[r2.riskImp[id] || 0] || "—";
      return `<tr><td class="id">${esc(r.name)}</td><td>${lik} / ${imp}</td><td>${cell(sig ?? "")}</td><td>${cell(r2.riskResponse[id] ?? "")}</td></tr>`;
    })
    .join("");

  const items = archList(r2);
  const fundedIds = funded(r2);
  const archRows = items
    .map((it) => {
      const on = !!r2.alloc[it.id];
      return `<tr><td class="id">${esc(archName(it.id, levels))}</td><td>${on ? tt("funded", "finanziert") : tt("not funded", "nicht finanziert")}</td><td class="num">${on ? esc(euro(archCostOf(r2, it.id))) : "—"}</td><td class="num">${on && r2.start[it.id] != null ? `${tt("month", "Monat")} ${r2.start[it.id]}` : "—"}</td><td>${on && r2.owner[it.id] ? esc(OWNERS[r2.owner[it.id]!].name) : "—"}</td><td>${on ? cell(r2.trigger[it.id] ?? "") : "—"}</td></tr>`;
    })
    .join("");
  const d = DECISIONS.find((x) => x.id === r2.decision);
  const k = r2.tripKpi ? KPI_BY_ID[r2.tripKpi] : null;
  const thr = parseAmount(r2.tripThreshold);
  const action = {
    "": "—",
    scale: tt("widen the personalisation anyway", "die Personalisierung trotzdem ausweiten"),
    adjust: tt("adjust one lever", "einen Hebel anpassen"),
    stop: tt("stop and reconsider", "anhalten und neu überlegen"),
  }[r2.tripAction];
  const unit = (u: string) => (u === "%" ? tt("%", " %") : ` ${u}`);

  return `${header("Strategy Memo", tt("Level 3 · Management decision", "Level 3 · Management-Entscheidung"), p)}
<p class="muted">${tt("To: the board", "An: das Board")} · ${tt("From:", "Von:")} ${esc(name || "Chief Customer Officer")}, CloudTech Solutions GmbH · ${tt("Budget", "Budget")} ${esc(euro(R2_BUDGET))} ${tt("over 12 months.", "über 12 Monate.")}</p>
<h2>${tt("1 · Situation", "1 · Ausgangslage")}</h2>
<p>${tt(
    "Competition is strong, customer retention is weak and the offers are interchangeable. The budget is limited, data protection sets hard limits and customer behaviour is not fully transparent.",
    "Der Wettbewerb ist stark, die Kundenbindung schwach und die Angebote sind austauschbar. Das Budget ist begrenzt, der Datenschutz setzt harte Grenzen, und das Kundenverhalten ist nicht vollständig transparent.",
  )}</p>
${situation}
<h2>${tt("2 · Target vision", "2 · Zielvision")}</h2>
<p><strong>${v ? esc(v.label) : "—"}</strong></p>${para(r2.visionText)}
<h2>${tt("3 · The three behaviour levers", "3 · Die drei Verhaltenshebel")}</h2>
<table><thead><tr><th>${tt("Lever", "Hebel")}</th><th>${tt("The customer's question", "Die Frage des Kunden")}</th><th>${tt("Signal it is missing", "Signal, dass er fehlt")}</th><th>${tt("Phase", "Phase")}</th><th>${tt("What our system does", "Was unser System tut")}</th></tr></thead><tbody>${leverRows}</tbody></table>
<h2>${tt("4 · How far we personalise", "4 · Wie weit wir personalisieren")}</h2>
<table><thead><tr><th>${tt("Group", "Gruppe")}</th><th>${tt("Level", "Stufe")}</th><th class="num">${tt("Responders", "Reagierende")}</th></tr></thead><tbody>${ladderRows}</tbody></table>
<p class="legend">${
    levels.some(Boolean)
      ? tt(
          `Responders in all ${num(totalR, { maximumFractionDigits: 1 })}; the engine for the highest level chosen costs ${esc(euro(engine))}${totalR > 0 ? `, ${esc(euro(engine / totalR))} per responder` : ""}. Response rates are illustrative (Case assumption).`,
          `Reagierende insgesamt ${num(totalR, { maximumFractionDigits: 1 })}; die Engine für die höchste gewählte Stufe kostet ${esc(euro(engine))}${totalR > 0 ? `, ${esc(euro(engine / totalR))} pro Reagierendem` : ""}. Die Response Rates sind beispielhaft (Case-Annahme).`,
        )
      : tt("Choose a level for each group in Block 3.3.", "Wählen Sie in Block 3.3 für jede Gruppe eine Stufe.")
  }</p>
${para(r2.weigh)}
<h2>${tt("5 · The loyalty system", "5 · Das Loyalty-System")}</h2>
<table><thead><tr><th>${tt("Building block", "Baustein")}</th><th>${tt("Kind", "Art")}</th><th class="num">${tt("Reach", "Reichweite")}</th><th class="num">${tt("Depth", "Tiefe")}</th><th class="num">Durability</th><th class="num">${tt("Scale", "Skalierung")}</th><th class="num">${tt("Total", "Summe")}</th></tr></thead><tbody>${systemRows || `<tr><td colspan="7">—</td></tr>`}</tbody></table>
<p><strong>${tt("Lever the system serves most:", "Hebel, den das System am meisten bedient:")}</strong> ${esc(mainLever)}</p>${para(r2.mainWhy)}
<h2>${tt("6 · Risk analysis: what if we misjudge the customer", "6 · Risikoanalyse: was, wenn wir den Kunden falsch einschätzen")}</h2>
<table><thead><tr><th>${tt("Risk", "Risiko")}</th><th>${tt("Likelihood / impact", "Wahrscheinlichkeit / Auswirkung")}</th><th>${tt("Early-warning signal", "Frühwarnsignal")}</th><th>${tt("Response", "Reaktion")}</th></tr></thead><tbody>${riskRows || `<tr><td colspan="4">—</td></tr>`}</tbody></table>
<h2>${tt("7 · The architecture", "7 · Die Architektur")}</h2>
<table><thead><tr><th>${tt("Item", "Punkt")}</th><th>Status</th><th class="num">${tt("Cost", "Kosten")}</th><th class="num">${tt("Start", "Start")}</th><th>Owner</th><th>Trigger</th></tr></thead><tbody>${archRows}</tbody></table>
<p class="legend">${tt(
    `Funded ${esc(euro(archCost(r2)))} of ${esc(euro(R2_BUDGET))} (${esc(euro(archLeft(r2)))} left) across ${fundedIds.length} item${fundedIds.length === 1 ? "" : "s"}.`,
    `Finanziert ${esc(euro(archCost(r2)))} von ${esc(euro(R2_BUDGET))} (${esc(euro(archLeft(r2)))} übrig) für ${fundedIds.length} ${fundedIds.length === 1 ? "Punkt" : "Punkte"}.`,
  )}</p>
${items.every((it) => r2.alloc[it.id]) ? "" : `<h3>${tt("Left out, and when we look again", "Weggelassen, und wann wir es wieder ansehen")}</h3>${para(r2.postponed)}<p><strong>${tt("Pickup point:", "Wiedervorlagepunkt:")}</strong> ${cell(r2.pickup)}</p>`}
<h2>${tt("8 · The decision", "8 · Die Entscheidung")}</h2>
<p><strong>${d ? esc(d.label) : "—"}</strong>${d ? ` — ${esc(d.detail)}` : ""}</p>
<h3>${tt("What this decision rests on", "Worauf diese Entscheidung beruht")}</h3>
<ol>${r2.assumptions.map((a) => `<li>${cell(a)}</li>`).join("")}</ol>
<h3>Tripwire</h3>
<p>${k ? esc(k.label) : "—"} ${tt("reaches", "erreicht")} <strong>${thr !== null && k ? `${num(thr)}${unit(k.unit)}` : "—"}</strong> ${tt("by month", "bis Monat")} ${r2.tripMonth ?? "—"} (${tt("today:", "heute:")} ${k ? `${num(k.baseline)}${unit(k.unit)}` : "—"}). ${tt("If it is missed:", "Wird er verfehlt:")} ${esc(action)}.</p>
<h3>${tt("If objections double in month 4", "Wenn sich die Widersprüche in Monat 4 verdoppeln")}</h3>${para(r2.challenge)}

<div class="foot">${tt("Checks requested:", "Angeforderte Prüfungen:")} ${r2.checks}<br/>${tt("Generated", "Erstellt am")} ${esc(dateLabel())}.</div>`;
}
