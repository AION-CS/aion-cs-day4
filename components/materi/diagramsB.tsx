"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { Bul, Insight, Toggles } from "@/components/materi/kit";
import { bi, euro, euroSigned, num, t, tt } from "@/lib/lang";
import { Gloss } from "@/lib/glossify";

/**
 * The interactive diagrams of Materi B (Route 2). Every one uses a worked-example company (Brenner Netzwerke), never CloudTech's
 * options from the task menus, so the answer to a block is never printed. Numbers are Case assumptions.
 * Text is bilingual: data through `bi(t(en, de))`, inline text through `tt(en, de)`.
 */

const C = { ink: "#1F2328", ash: "#59606A", paper: "#FFFEFA", mist: "#ECE6D6", line: "#D8D1BF", amber: "#8A5A0B", gold: "#D99A2B", teal: "#0F6B6B", tealSoft: "#DFEEEB", rust: "#A4472A", data: "#2F5D62", grey: "#8B9098", soft: "#FBF0D6" };
const pc = () => tt("%", " %");

/* ------------------------------------------------------------------ B1 · the ladder of intervention */

type Level = "argument" | "interaction" | "process" | "structure";
const LADDER: { id: Level; name: string; what: string; example: string; stays: number; cost: string; leaves: string }[] = bi([
  {
    id: "argument" as Level,
    name: t("Argument", "Argument"),
    what: t("What the seller says: the pitch, the offer's wording, a limited-time line.", "Was der Verkäufer sagt: der Pitch, die Formulierung des Angebots, eine Zeile mit Fristsetzung."),
    example: t("Brenner adds “only 3 slots left” to every proposal.", "Brenner setzt „nur noch 3 Plätze frei“ in jedes Angebot."),
    stays: 10,
    cost: t("Repeats with every conversation.", "Fällt bei jedem Gespräch wieder an."),
    leaves: t("It leaves with the person who says it, and it stops working the day a customer checks.", "Es geht mit der Person, die es sagt, und es wirkt nicht mehr, sobald ein Kunde nachprüft."),
  },
  {
    id: "interaction" as Level,
    name: t("Interaction", "Interaktion"),
    what: t("How a person behaves with a customer: a named contact, a personal call.", "Wie sich eine Person gegenüber einem Kunden verhält: ein namentlicher Ansprechpartner, ein persönlicher Anruf."),
    example: t("One named account manager rings each large customer every quarter.", "Ein namentlich genannter Account Manager ruft jeden Großkunden jedes Quartal an."),
    stays: 25,
    cost: t("Repeats with every customer and every person.", "Fällt bei jedem Kunden und jeder Person wieder an."),
    leaves: t("It leaves with the person. The customer's trust was in that manager, not in Brenner.", "Es geht mit der Person. Das Vertrauen des Kunden galt diesem Manager, nicht Brenner."),
  },
  {
    id: "process" as Level,
    name: t("Process", "Prozess"),
    what: t("How the customer journey is built: the steps every customer goes through, whoever is on duty.", "Wie die Customer Journey gebaut ist: die Schritte, die jeder Kunde durchläuft, wer auch immer Dienst hat."),
    example: t("Every customer gets a yearly review and a peer round-table invitation, booked by the system.", "Jeder Kunde erhält ein jährliches Review und eine Einladung zu einem Peer-Round-Table, vom System gebucht."),
    stays: 80,
    cost: t("A one-off set-up, then a small cost per customer.", "Ein einmaliger Aufbau, dann geringe Kosten pro Kunde."),
    leaves: t("It stays. The step happens because the process demands it, not because someone remembers.", "Er bleibt. Der Schritt geschieht, weil der Prozess es verlangt, nicht weil sich jemand erinnert."),
  },
  {
    id: "structure" as Level,
    name: t("Structure", "Struktur"),
    what: t("The rules and defaults that decide what the process does: consent rules, targets, what is reviewed each month.", "Die Regeln und Voreinstellungen, die entscheiden, was der Prozess tut: Einwilligungsregeln, Ziele, was jeden Monat geprüft wird."),
    example: t("A consent record decides who may receive which message, and a monthly review reads the objections.", "Ein Einwilligungsregister entscheidet, wer welche Nachricht erhalten darf, und ein monatliches Review liest die Widersprüche."),
    stays: 95,
    cost: t("A one-off set-up and a standing routine.", "Ein einmaliger Aufbau und eine feste Routine."),
    leaves: t("It stays. The rule applies to every customer and a new colleague inherits it.", "Sie bleibt. Die Regel gilt für jeden Kunden, und ein neuer Kollege übernimmt sie."),
  },
]);

export function InterventionLadder() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSel] = useState<Level>("process");
  const [gone, setGone] = useState(false);
  const cur = LADDER.find((l) => l.id === sel)!;
  const x = (i: number) => 20 + i * 132;
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 230" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Four levels of intervention and how much of the effect stays", "Vier Ebenen des Eingriffs und wie viel der Wirkung bleibt")}</title>
        <desc id={`${uid}-d`}>{LADDER.map((l) => (gone ? tt(`${l.name}: ${l.stays}% of the effect stays when the person leaves`, `${l.name}: ${l.stays} % der Wirkung bleiben, wenn die Person geht`) : tt(`${l.name}: full effect while the person stays`, `${l.name}: volle Wirkung, solange die Person bleibt`))).join(". ")}</desc>
        <line x1="10" x2="550" y1="196" y2="196" stroke={C.ash} strokeWidth="1.5" />
        {LADDER.map((l, i) => {
          const h = 40 + i * 30;
          const eff = gone ? l.stays : 100;
          const on = l.id === sel;
          return (
            <g key={l.id}>
              <rect x={x(i)} y={196 - h} width="112" height={h} rx="6" fill={C.mist} stroke={on ? C.amber : C.line} strokeWidth={on ? 2.6 : 1.4} />
              <rect x={x(i)} y={196 - (h * eff) / 100} width="112" height={(h * eff) / 100} rx="6" fill={C.data} opacity="0.9" className="anim-grow-y" />
              <text x={x(i) + 56} y={196 - h - 8} textAnchor="middle" fontSize="13" fontWeight="700" fill={C.ink}>{l.name}</text>
              <text x={x(i) + 56} y="214" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={C.ink}>{tt(`${eff}% stays`, `${eff} % bleiben`)}</text>
            </g>
          );
        })}
      </svg>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <p className="smallcaps">{tt("Read a level", "Eine Ebene lesen")}</p>
          <Toggles<Level> label={tt("Level", "Ebene")} value={sel} onChange={setSel} options={LADDER.map((l) => ({ id: l.id, label: l.name }))} />
        </div>
        <div className="space-y-1.5">
          <p className="smallcaps">{tt("The person who runs it", "Die Person, die es betreibt")}</p>
          <Toggles<"stays" | "leaves"> label={tt("Person", "Person")} value={gone ? "leaves" : "stays"} onChange={(v) => setGone(v === "leaves")} options={[{ id: "stays", label: tt("Stays", "Bleibt") }, { id: "leaves", label: tt("Leaves the company", "Verlässt das Unternehmen") }]} />
        </div>
      </div>
      <Insight>
        {gone
          ? tt(
              `When the person leaves, ${cur.name.toLowerCase()} keeps ${cur.stays}% of its effect (an illustration). ${cur.leaves} A lever at the process or structure level is what you can still count on next year.`,
              `Wenn die Person geht, behält die Ebene ${cur.name} ${cur.stays} % ihrer Wirkung (eine Darstellung). ${cur.leaves} Ein Hebel auf der Ebene von Prozess oder Struktur ist das, worauf Sie auch nächstes Jahr noch zählen können.`,
            )
          : tt(
              "While the person stays, every level works. The difference shows only when they leave, which is the test of durability. Switch it and compare the bars.",
              "Solange die Person bleibt, wirkt jede Ebene. Der Unterschied zeigt sich erst, wenn sie geht, und das ist der Test der Durability. Schalten Sie um und vergleichen Sie die Balken.",
            )}
      </Insight>
      <div className="rounded-lg border border-line bg-paper p-3.5 text-caption" aria-live="polite">
        <p className="smallcaps">{cur.name}</p>
        <p className="mt-1">
          <Gloss>{cur.what}</Gloss>
        </p>
        <p className="mt-1">
          <span className="font-semibold text-ink">{tt("Brenner's example. ", "Beispiel von Brenner. ")}</span>
          {cur.example}
        </p>
        <p className="mt-1 text-ash">
          <span className="font-semibold text-ink">{tt("Cost shape. ", "Kostenform. ")}</span>
          {cur.cost}
        </p>
      </div>
      <p className="text-caption text-ash">{tt("The percentages are set for the teaching example (Case assumption), not measured.", "Die Prozentwerte sind für das Lehrbeispiel gesetzt (Case-Annahme), nicht gemessen.")}</p>
    </div>
  );
}

/** The decision loop of B1: see, decide, act, learn. A static picture with no controls. */
export function ControlLoop() {
  const uid = useId().replace(/:/g, "");
  const steps = [
    { t: tt("See", "Sehen"), s: tt("Read customer behaviour", "Kundenverhalten lesen") },
    { t: tt("Decide", "Entscheiden"), s: tt("Choose the lever", "Den Hebel wählen") },
    { t: tt("Act", "Handeln"), s: tt("Run it in the process", "Im Prozess umsetzen") },
    { t: tt("Learn", "Lernen"), s: tt("Compare with the tripwire", "Mit dem Tripwire vergleichen") },
  ];
  return (
    <svg viewBox="0 0 560 150" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
      <title id={`${uid}-t`}>{tt("The decision loop: see, decide, act, learn", "Der Entscheidungskreislauf: sehen, entscheiden, handeln, lernen")}</title>
      <desc id={`${uid}-d`}>{tt("Four steps in a loop: read the customers' behaviour, choose the lever, run it through the process, compare with the tripwire, and start again.", "Vier Schritte im Kreislauf: das Verhalten der Kunden lesen, den Hebel wählen, ihn über den Prozess umsetzen, mit dem Tripwire vergleichen und von vorn beginnen.")}</desc>
      <defs>
        <marker id={`${uid}-a`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill={C.ash} />
        </marker>
      </defs>
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={6 + i * 140} y="24" width="122" height="66" rx="10" fill={i % 2 ? C.tealSoft : C.soft} stroke={i % 2 ? C.teal : C.amber} strokeWidth="1.8" />
          <text x={67 + i * 140} y="50" textAnchor="middle" fontSize="16" fontWeight="700" fill={C.ink}>{s.t}</text>
          <text x={67 + i * 140} y="72" textAnchor="middle" fontSize="11" fill={C.ash}>{s.s}</text>
          {i < 3 && <line x1={130 + i * 140} x2={144 + i * 140} y1="57" y2="57" stroke={C.ash} strokeWidth="2" markerEnd={`url(#${uid}-a)`} />}
        </g>
      ))}
      <path d="M528 92 C 528 130, 40 130, 40 96" fill="none" stroke={C.ash} strokeWidth="2" strokeDasharray="5 4" markerEnd={`url(#${uid}-a)`} />
      <text x="284" y="132" textAnchor="middle" fontSize="11.5" fill={C.ash}>{tt("the result becomes the next signal", "das Ergebnis wird zum nächsten Signal")}</text>
    </svg>
  );
}

/* ------------------------------------------------------------------ B1 · testing a vision */

const VISIONS_B: { id: string; label: string; tests: boolean[]; notes: string[] }[] = bi([
  {
    id: "v1",
    label: t("The provider customers choose again even when switching is easy.", "Der Anbieter, für den sich Kunden wieder entscheiden, auch wenn ein Wechsel leicht ist."),
    tests: [true, true, true],
    notes: [
      t("It is about what customers feel and do: they choose again.", "Es geht darum, was Kunden fühlen und tun: Sie entscheiden sich wieder."),
      t("Renewals without a discount, answered invitations and shared data show it.", "Renewals ohne Rabatt, beantwortete Einladungen und geteilte Daten zeigen es."),
      t("Whatever the tactic (service, community, personalisation), the vision still makes sense.", "Welche Taktik auch immer (Service, Community, Personalisierung), die Vision ergibt weiter Sinn."),
    ],
  },
  {
    id: "v2",
    label: t("The cheapest network provider in Bavaria.", "Der günstigste Netzwerkanbieter in Bayern."),
    tests: [false, true, false],
    notes: [
      t("It is a price position, not a customer outcome.", "Es ist eine Preisposition, kein Kundenergebnis."),
      t("Win rates on price comparisons would show it.", "Gewinnquoten bei Preisvergleichen würden es zeigen."),
      t("It only makes sense while nobody undercuts, and it leans on one lever, the price.", "Es ergibt nur Sinn, solange niemand unterbietet, und es stützt sich auf einen Hebel, den Preis."),
    ],
  },
  {
    id: "v3",
    label: t("Every customer gets a fully individual offer in real time.", "Jeder Kunde bekommt in Echtzeit ein vollständig individuelles Angebot."),
    tests: [false, false, false],
    notes: [
      t("It is a tactic, not an outcome.", "Es ist eine Taktik, kein Ergebnis."),
      t("The number of offers sent shows activity, not what customers do.", "Die Zahl gesendeter Angebote zeigt Aktivität, nicht, was Kunden tun."),
      t("It stops making sense the day the data or the consent is missing.", "Es ergibt keinen Sinn mehr, sobald die Daten oder die Einwilligung fehlen."),
    ],
  },
  {
    id: "v4",
    label: t("The most loyalty points earned per customer.", "Die meisten gesammelten Loyalty-Punkte pro Kunde."),
    tests: [false, false, true],
    notes: [
      t("It measures a reward, not how customers feel.", "Es misst eine Belohnung, nicht, wie Kunden fühlen."),
      t("Points are earned by customers who plan to leave too.", "Punkte sammeln auch Kunden, die gehen wollen."),
      t("It would survive a change of tactic, and it would still measure the wrong thing.", "Es überstünde einen Wechsel der Taktik und würde trotzdem das Falsche messen."),
    ],
  },
]);
const vtest = () => [tt("An outcome in the customer, not a tactic or a price", "Ein Ergebnis im Kunden, keine Taktik und kein Preis"), tt("Seen in customer behaviour", "Im Kundenverhalten sichtbar"), tt("Survives a change of tactic", "Übersteht einen Wechsel der Taktik")];

export function VisionTest() {
  const [sel, setSel] = useState("v1");
  const v = VISIONS_B.find((x) => x.id === sel)!;
  const passes = v.tests.filter(Boolean).length;
  return (
    <div className="space-y-3">
      <ol className="grid gap-2 sm:grid-cols-2">
        {VISIONS_B.map((x) => (
          <li key={x.id}>
            <button
              type="button"
              aria-pressed={x.id === sel}
              onClick={() => setSel(x.id)}
              className={clsx("min-h-[48px] w-full rounded-lg border bg-paper px-3 py-2 text-left text-caption transition-colors", x.id === sel ? "border-accent bg-accentSoft ring-2 ring-gold" : "border-line hover:border-ash")}
            >
              {x.label}
            </button>
          </li>
        ))}
      </ol>
      <div className="rounded-lg border border-line bg-paper p-3.5 text-caption" aria-live="polite">
        <p className="smallcaps">{tt(`Passes ${passes} of 3 tests`, `Besteht ${passes} von 3 Tests`)}</p>
        <ul className="mt-1.5 space-y-1">
          {vtest().map((n, i) => (
            <li key={i}>
              <span className={clsx("mr-1.5 font-semibold", v.tests[i] ? "text-signal" : "text-rust")}>{v.tests[i] ? tt("● passes", "● besteht") : tt("○ fails", "○ besteht nicht")}</span>
              <span className="font-semibold text-ink">{n}. </span>
              {v.notes[i]}
            </li>
          ))}
        </ul>
      </div>
      <Insight>
        {passes === 3
          ? tt(
              "Only one of the four passes all three tests. It is the only one that says what customers will feel and do, so the strategy has something to be measured against. ",
              "Nur eine der vier besteht alle drei Tests. Sie ist die einzige, die sagt, was Kunden fühlen und tun werden, sodass die Strategie etwas hat, woran sie gemessen werden kann. ",
            )
          : tt(`This vision passes ${passes} of 3. `, `Diese Vision besteht ${passes} von 3. `)}
        {passes < 3
          ? tt("A vision that is really a tactic or a price position cannot tell you whether the strategy worked: it can only tell you that the tactic ran.", "Eine Vision, die in Wahrheit eine Taktik oder eine Preisposition ist, kann Ihnen nicht sagen, ob die Strategie gewirkt hat: Sie kann Ihnen nur sagen, dass die Taktik lief.")
          : tt("The other three each name a tactic, a price or a reward, and each would be easy to achieve while customers still leave.", "Die anderen drei nennen jeweils eine Taktik, einen Preis oder eine Belohnung, und jede wäre leicht zu erreichen, während Kunden trotzdem gehen.")}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B2 · personalisation against effort and data protection */

const LV = bi([
  { n: 0, name: t("One message for all", "Eine Nachricht für alle"), rate: 2, cost: 5000 },
  { n: 1, name: t("By company facts", "Nach Unternehmensdaten"), rate: 3.5, cost: 20000 },
  { n: 2, name: t("By role and contract", "Nach Rolle und Vertrag"), rate: 5, cost: 40000 },
  { n: 3, name: t("By consented usage", "Nach eingewilligter Nutzung"), rate: 9, cost: 65000 },
  { n: 4, name: t("Individual, real time", "Individuell, in Echtzeit"), rate: 10, cost: 160000 },
]);
const GR = bi([
  { id: "a", name: t("Customers who agreed to usage analysis", "Kunden, die der Nutzungsanalyse zugestimmt haben"), size: 480, cap: 3, holds: t("They agreed and have twelve months of data.", "Sie haben zugestimmt und haben zwölf Monate Daten.") },
  { id: "b", name: t("Other customers", "Andere Kunden"), size: 1520, cap: 2, holds: t("Only contract facts and roles; no consent to usage analysis.", "Nur Vertragsdaten und Rollen; keine Einwilligung zur Nutzungsanalyse.") },
  { id: "c", name: t("Prospects a year", "Interessenten pro Jahr"), size: 600, cap: 1, holds: t("Only an enquiry form and public company facts.", "Nur ein Anfrageformular und öffentliche Unternehmensdaten.") },
]);

export function PersonalisationTrade() {
  const [pick, setPick] = useState<Record<string, number>>({ a: 3, b: 2, c: 1 });
  const set = (g: string, n: number) => setPick((p) => ({ ...p, [g]: n }));
  const resp = (g: (typeof GR)[number]) => (g.size * LV[pick[g.id]].rate) / 100;
  const total = GR.reduce((s, g) => s + resp(g), 0);
  const top = Math.max(...GR.map((g) => pick[g.id]));
  const cost = LV[top].cost;
  const over = GR.filter((g) => pick[g.id] > g.cap);
  const aAtCap = (g: (typeof GR)[number]) => (g.size * LV[g.cap].rate) / 100;
  const stepA = (GR[0].size * (LV[3].rate - LV[2].rate)) / 100;
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {GR.map((g) => (
          <div key={g.id} className={clsx("space-y-1.5 rounded-lg border border-line bg-paper p-3", pick[g.id] > g.cap && "is-flagged")}>
            <p className="text-caption font-semibold text-ink">
              {g.name} <span className="font-normal text-ash">· {num(g.size)}</span>
            </p>
            <p className="text-caption text-ash">{g.holds}</p>
            <Toggles<string> label={tt(`Level for ${g.name}`, `Stufe für ${g.name}`)} value={String(pick[g.id])} onChange={(v) => set(g.id, Number(v))} options={LV.map((l) => ({ id: String(l.n), label: `${tt("Level", "Stufe")} ${l.n} · ${num(Math.round(((g.size * l.rate) / 100) * 10) / 10)}` }))} />
            {pick[g.id] > g.cap && (
              <p className="text-caption text-ink">
                <span className="smallcaps mr-1 text-accent">{tt("Beyond the data", "Über die Daten hinaus")}</span>
                {tt(`This group has not agreed to what level ${pick[g.id]} uses. Nothing is blocked here, but it would not be lawful in practice.`, `Diese Gruppe hat dem nicht zugestimmt, was Stufe ${pick[g.id]} nutzt. Hier ist nichts gesperrt, aber in der Praxis wäre es nicht rechtmäßig.`)}
              </p>
            )}
          </div>
        ))}
      </div>
      <p className="text-micro normal-case tracking-normal text-ash">{tt("The number on each button is how many customers of the group would respond at that level (size × response rate, an illustration).", "Die Zahl auf jeder Taste ist, wie viele Kunden der Gruppe auf dieser Stufe reagieren würden (Größe × Response Rate, eine Darstellung).")}</p>
      <Insight>
        {tt(
          `Your choice gets ${num(Math.round(total * 10) / 10)} responders in all, at the cost of the highest level used, level ${top}: ${euro(cost)} (${euro(cost / Math.max(total, 1))} for each responder). `,
          `Ihre Wahl bringt insgesamt ${num(Math.round(total * 10) / 10)} Reagierende, zu den Kosten der höchsten genutzten Stufe, Stufe ${top}: ${euro(cost)} (${euro(cost / Math.max(total, 1))} je Reagierendem). `,
        )}
        {over.length > 0
          ? tt(
              `${over.length === 1 ? "One group goes" : `${over.length} groups go`} beyond the data it has agreed to: the extra responders are not available in practice. `,
              `${over.length === 1 ? "Eine Gruppe geht" : `${over.length} Gruppen gehen`} über die Daten hinaus, denen ${over.length === 1 ? "sie" : "sie"} zugestimmt ${over.length === 1 ? "hat" : "haben"}: Die zusätzlichen Reagierenden sind in der Praxis nicht verfügbar. `,
            )
          : tt(
              `Every group is inside its data limit. Compare with putting each group at its limit: ${num(Math.round(GR.reduce((s, g) => s + aAtCap(g), 0) * 10) / 10)} responders. `,
              `Jede Gruppe liegt innerhalb ihrer Datengrenze. Vergleichen Sie damit, jede Gruppe an ihre Grenze zu setzen: ${num(Math.round(GR.reduce((s, g) => s + aAtCap(g), 0) * 10) / 10)} Reagierende. `,
            )}
        {tt(
          `Going from level 2 to level 3 for the consenting group adds ${num(Math.round(stepA * 10) / 10)} responders for ${euro(LV[3].cost - LV[2].cost)} more: ${euro((LV[3].cost - LV[2].cost) / stepA)} for each extra responder. Level 4 adds one more point of response for ${euro(LV[4].cost - LV[3].cost)} more, and it needs a consent nobody has given.`,
          `Von Stufe 2 auf Stufe 3 für die einwilligende Gruppe zu gehen, bringt ${num(Math.round(stepA * 10) / 10)} Reagierende für ${euro(LV[3].cost - LV[2].cost)} mehr: ${euro((LV[3].cost - LV[2].cost) / stepA)} je zusätzlichem Reagierendem. Stufe 4 bringt einen Punkt mehr Response für ${euro(LV[4].cost - LV[3].cost)} mehr und braucht eine Einwilligung, die niemand gegeben hat.`,
        )}
      </Insight>
      <p className="text-caption text-ash">{tt(`Case assumption: Brenner Netzwerke has ${num(2000)} customers (480 agreed and have data) and about 600 prospects a year. Costs are for twelve months; each level needs the one below it.`, `Case-Annahme: Brenner Netzwerke hat ${num(2000)} Kunden (480 haben zugestimmt und haben Daten) und etwa 600 Interessenten pro Jahr. Die Kosten gelten für zwölf Monate; jede Stufe braucht die darunter.`)}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ B3 · system blocks profile (Brenner) */

type Crit = "reach" | "depth" | "durability" | "scale";
type EL = { id: string; name: string; kind: string; depends: string; cost: string; reach: string; r: Record<Crit, 1 | 2 | 3>; why: Record<Crit, string> };
const EL_BLOCKS: EL[] = bi([
  {
    id: "review",
    name: t("Yearly value review for members", "Jährliches Value-Review für Mitglieder"),
    kind: t("Service", "Service"),
    depends: t("The process", "Der Prozess"),
    cost: t("Repeats with every event", "Fällt bei jedem Ereignis wieder an"),
    reach: t("Members only", "Nur Mitglieder"),
    r: { reach: 2, depth: 3, durability: 3, scale: 2 },
    why: {
      reach: t("Only members get a review, so it does not touch every customer. Reach is at most 2.", "Nur Mitglieder bekommen ein Review, es erreicht also nicht jeden Kunden. Die Reichweite ist höchstens 2."),
      depth: t("It fits the member's own setup and shows the risks watched for them. A strong effect where it applies.", "Es passt zum eigenen Setup des Mitglieds und zeigt die Risiken, die für es beobachtet werden. Eine starke Wirkung, wo es gilt."),
      durability: t("It is a step of the process, so it happens whoever is on duty.", "Es ist ein Prozessschritt, also geschieht es, wer auch immer Dienst hat."),
      scale: t("Each review takes engineer time, so the cost repeats with every event. Scale is at most 2.", "Jedes Review braucht Ingenieurzeit, die Kosten fallen also bei jedem Ereignis wieder an. Die Skalierung ist höchstens 2."),
    },
  },
  {
    id: "contact",
    name: t("Named contact and priority line", "Namentlicher Ansprechpartner und Prioritäts-Hotline"),
    kind: t("Service", "Service"),
    depends: t("Individual people", "Einzelne Menschen"),
    cost: t("Repeats with every member", "Fällt bei jedem Mitglied wieder an"),
    reach: t("Members only", "Nur Mitglieder"),
    r: { reach: 2, depth: 3, durability: 1, scale: 1 },
    why: {
      reach: t("Members only. Reach is at most 2.", "Nur Mitglieder. Die Reichweite ist höchstens 2."),
      depth: t("A person the customer knows removes the trust gap directly. A strong effect where it applies.", "Eine Person, die der Kunde kennt, beseitigt die Vertrauenslücke direkt. Eine starke Wirkung, wo es gilt."),
      durability: t("It depends on individuals. When the contact leaves, the customer's trust leaves too. Durability is 1.", "Es hängt von einzelnen Menschen ab. Wenn der Ansprechpartner geht, geht auch das Vertrauen des Kunden. Durability ist 1."),
      scale: t("Every additional member needs additional hours. Scale is 1.", "Jedes zusätzliche Mitglied braucht zusätzliche Stunden. Die Skalierung ist 1."),
    },
  },
  {
    id: "circle",
    name: t("Peer round tables", "Peer-Round-Tables"),
    kind: t("Community", "Community"),
    depends: t("The process", "Der Prozess"),
    cost: t("Repeats with every event", "Fällt bei jedem Ereignis wieder an"),
    reach: t("Members only", "Nur Mitglieder"),
    r: { reach: 2, depth: 2, durability: 3, scale: 2 },
    why: {
      reach: t("Members only. Reach is at most 2.", "Nur Mitglieder. Die Reichweite ist höchstens 2."),
      depth: t("It answers belonging well, and it does not change what a customer thinks about the service. A medium effect.", "Es beantwortet Zugehörigkeit gut und ändert nicht, was ein Kunde über den Service denkt. Eine mittlere Wirkung."),
      durability: t("It is in the calendar and the group carries it, so it lasts.", "Es steht im Kalender, und die Gruppe trägt es, also hält es."),
      scale: t("Each round table is an event that costs, but one more member costs little. Scale is 2.", "Jeder Round Table ist ein Ereignis, das kostet, aber ein weiteres Mitglied kostet wenig. Die Skalierung ist 2."),
    },
  },
  {
    id: "rebate",
    name: t("5% rebate for members", "5 % Rabatt für Mitglieder"),
    kind: t("Bonus", "Bonus"),
    depends: t("A discount that has to continue", "Ein Rabatt, der weiterlaufen muss"),
    cost: t("Repeats with every member", "Fällt bei jedem Mitglied wieder an"),
    reach: t("Members only", "Nur Mitglieder"),
    r: { reach: 2, depth: 1, durability: 1, scale: 1 },
    why: {
      reach: t("Members only. Reach is at most 2.", "Nur Mitglieder. Die Reichweite ist höchstens 2."),
      depth: t("It changes the price, not why the customer was leaving. A small nudge.", "Er ändert den Preis, nicht, warum der Kunde ging. Ein kleiner Anstoß."),
      durability: t("It stops mattering the day it stops, and customers learn to wait for it.", "Er zählt nicht mehr, sobald er endet, und Kunden lernen, darauf zu warten."),
      scale: t("The cost is paid on every member, including those who would have stayed. Scale is 1.", "Die Kosten fallen bei jedem Mitglied an, auch bei denen, die geblieben wären. Die Skalierung ist 1."),
    },
  },
]);
const critName = (c: Crit) => ({ reach: tt("Reach", "Reichweite"), depth: tt("Depth", "Tiefe"), durability: "Durability", scale: tt("Scale", "Skalierung") })[c];
const critQ = (c: Crit) =>
  ({
    reach: tt("How many customers does it touch?", "Wie viele Kunden erreicht es?"),
    depth: tt("How strongly does it change how one customer feels or behaves?", "Wie stark verändert es, wie ein Kunde fühlt oder sich verhält?"),
    durability: tt("Does it still work when the reward stops or the person changes?", "Wirkt es noch, wenn die Belohnung endet oder die Person wechselt?"),
    scale: tt("Does the cost per additional member fall as the group grows?", "Sinken die Kosten pro zusätzlichem Mitglied, wenn die Gruppe wächst?"),
  })[c];
const CRIT_KEYS: Crit[] = ["reach", "depth", "durability", "scale"];
const DOTS = ["●○○", "●●○", "●●●"];

export function SystemProfile() {
  const [sel, setSel] = useState<{ id: string; c: Crit }>({ id: "review", c: "durability" });
  const block = EL_BLOCKS.find((l) => l.id === sel.id)!;
  const total = (l: EL) => Object.values(l.r).reduce((s, v) => s + v, 0);
  const best = [...EL_BLOCKS].sort((a, b) => total(b) - total(a))[0];
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[38rem] border-collapse text-caption">
          <caption className="sr-only">{tt("Four building blocks of Brenner Netzwerke rated on reach, depth, durability and scale", "Vier Bausteine von Brenner Netzwerke, bewertet nach Reichweite, Tiefe, Durability und Skalierung")}</caption>
          <thead>
            <tr className="bg-mist text-left text-micro uppercase text-ash">
              <th className="px-3 py-2">{tt("Block · what it depends on · cost", "Baustein · wovon er abhängt · Kosten")}</th>
              {CRIT_KEYS.map((c) => (
                <th key={c} className="px-2 py-2 text-center">
                  {critName(c)}
                </th>
              ))}
              <th className="px-2 py-2 text-right">{tt("Total", "Summe")}</th>
            </tr>
          </thead>
          <tbody>
            {EL_BLOCKS.map((l) => (
              <tr key={l.id} className="border-t border-line align-top">
                <td className="px-3 py-2">
                  <span className="font-semibold">{l.name}</span>
                  <br />
                  <span className="text-ash">
                    {l.kind} · {l.depends} · {l.cost} · {l.reach}
                  </span>
                </td>
                {CRIT_KEYS.map((c) => {
                  const on = sel.id === l.id && sel.c === c;
                  return (
                    <td key={c} className="px-1 py-1.5 text-center">
                      <button
                        type="button"
                        onClick={() => setSel({ id: l.id, c })}
                        aria-pressed={on}
                        aria-label={tt(`${l.name}, ${critName(c)}: ${l.r[c]} of 3. Select to read why.`, `${l.name}, ${critName(c)}: ${l.r[c]} von 3. Wählen, um den Grund zu lesen.`)}
                        className={clsx("min-h-[40px] min-w-[3.6rem] rounded-md border px-2 text-body tracking-widest transition-colors", on ? "border-accent bg-accentSoft ring-2 ring-gold" : "border-line bg-paper hover:border-ash")}
                      >
                        {DOTS[l.r[c] - 1]}
                      </button>
                    </td>
                  );
                })}
                <td className="tnum px-2 py-2 text-right font-bold">{total(l)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rounded-lg border border-line bg-paper p-3.5 text-caption" aria-live="polite">
        <p className="smallcaps">
          {block.name} · {critName(sel.c)}: {tt(`${block.r[sel.c]} of 3`, `${block.r[sel.c]} von 3`)}
        </p>
        <p className="mt-1">
          <span className="font-semibold text-ink">{tt("The test. ", "Der Test. ")}</span>
          {critQ(sel.c)}
        </p>
        <p className="mt-1">
          <span className="font-semibold text-ink">{tt("Why this rating. ", "Warum diese Bewertung. ")}</span>
          {block.why[sel.c]}
        </p>
      </div>
      <Insight>
        {tt(
          `The highest total is “${best.name}” with ${total(best)} of 12, and it is a ${best.kind.toLowerCase()} block that depends on ${best.depends.toLowerCase()}. The rebate totals only ${total(EL_BLOCKS[3])}: its rating is low on depth, durability and scale, because it changes the price and not the reason customers leave. The named contact is the strongest in a single relationship (3) and totals only ${total(EL_BLOCKS[1])}, because it depends on a person and its cost repeats with every member.`,
          `Die höchste Summe hat „${best.name}“ mit ${total(best)} von 12, und es ist ein Baustein der Art ${best.kind}, der von ${best.depends} abhängt. Der Rabatt kommt nur auf ${total(EL_BLOCKS[3])}: Seine Bewertung ist niedrig bei Tiefe, Durability und Skalierung, weil er den Preis ändert und nicht den Grund, warum Kunden gehen. Der namentliche Ansprechpartner ist in einer einzelnen Beziehung am stärksten (3) und kommt nur auf ${total(EL_BLOCKS[1])}, weil er von einer Person abhängt und seine Kosten bei jedem Mitglied wieder anfallen.`,
        )}
      </Insight>
      <div className="rounded-lg border border-line bg-paper p-3.5 text-caption">
        <p className="smallcaps">{tt("Limits a rating must respect", "Grenzen, die eine Bewertung beachten muss")}</p>
        <Bul
          items={[
            tt("Reach: a block that applies only to members, to opted-in customers or above a size threshold cannot be 3.", "Reichweite: Ein Baustein, der nur für Mitglieder, für Kunden mit Opt-in oder ab einer Größenschwelle gilt, kann nicht 3 sein."),
            tt("Durability: a block that depends on individual people or on a discount that has to continue cannot be more than 1. One that is a process step or a rule can be 3.", "Durability: Ein Baustein, der von einzelnen Menschen oder von einem weiterlaufenden Rabatt abhängt, kann nicht mehr als 1 sein. Einer, der ein Prozessschritt oder eine Regel ist, kann 3 sein."),
            tt("Scale: a cost that repeats with every member is 1. A cost that repeats with every event is at most 2. A one-off cost can be 3.", "Skalierung: Ein Aufwand, der bei jedem Mitglied wieder anfällt, ist 1. Ein Aufwand, der bei jedem Ereignis wieder anfällt, ist höchstens 2. Ein einmaliger Aufwand kann 3 sein."),
          ]}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ B4 · risk matrix (Brenner) */

const EL_RISKS = bi([
  { id: "r1", name: t("Personal offers feel like surveillance", "Persönliche Angebote fühlen sich wie Überwachung an"), l: 3, i: 3, assume: t("The more personal the offer, the better it works.", "Je persönlicher das Angebot, desto besser wirkt es."), maybe: t("Beyond a point a personal message makes the customer wonder how the sender knows. Customers object or withdraw consent.", "Ab einem Punkt lässt eine persönliche Nachricht den Kunden fragen, woher der Absender das weiß. Kunden widersprechen oder ziehen die Einwilligung zurück."), signal: t("Objections rise after personalised mails while the open rate stays high.", "Widersprüche steigen nach personalisierten Mails, während die Öffnungsrate hoch bleibt."), response: t("If objections exceed 15 per 1,000 customers in a quarter, pause the offers for that group and rewrite them with the data-protection officer within three weeks.", "Wenn die Widersprüche in einem Quartal 15 pro 1.000 Kunden übersteigen, die Angebote für diese Gruppe pausieren und sie innerhalb von drei Wochen mit dem Datenschutzbeauftragten neu formulieren.") },
  { id: "r2", name: t("Customers do not join the programme", "Kunden treten dem Programm nicht bei"), l: 2, i: 2, assume: t("Customers want a loyalty programme.", "Kunden wollen ein Loyalty-Programm."), maybe: t("They see it as marketing, and join only if it gives something they value.", "Sie sehen es als Marketing und treten nur bei, wenn es etwas bietet, was sie schätzen."), signal: t("Fewer than one in five invited customers joins within two months.", "Weniger als jeder fünfte eingeladene Kunde tritt innerhalb von zwei Monaten bei."), response: t("If fewer than 25% of invited members have joined by month 4, change the invitation and interview eight customers who did not join.", "Wenn bis Monat 4 weniger als 25 % der eingeladenen Mitglieder beigetreten sind, die Einladung ändern und acht Kunden befragen, die nicht beigetreten sind.") },
  { id: "r3", name: t("Consent fades: customers withdraw it", "Die Einwilligung schwindet: Kunden widerrufen sie"), l: 2, i: 3, assume: t("Once given, consent stays.", "Einmal gegeben, bleibt die Einwilligung."), maybe: t("Consent can be withdrawn at any time, and each withdrawal removes the customer from the personalisation.", "Die Einwilligung kann jederzeit widerrufen werden, und jeder Widerruf nimmt den Kunden aus der Personalisierung."), signal: t("The opt-in share falls month on month.", "Der Opt-in-Anteil sinkt von Monat zu Monat."), response: t("If the opt-in share falls by more than 3 points in one month, pause new personalised sends and ask the data-protection officer to review the last mailing.", "Wenn der Opt-in-Anteil in einem Monat um mehr als 3 Punkte sinkt, neue personalisierte Sendungen pausieren und den Datenschutzbeauftragten bitten, den letzten Versand zu prüfen.") },
  { id: "r4", name: t("Customers wait for the rebate", "Kunden warten auf den Rabatt"), l: 3, i: 2, assume: t("A rebate builds loyalty.", "Ein Rabatt schafft Loyalität."), maybe: t("It trains customers to wait for the next one, and it is paid on customers who would have stayed.", "Er bringt Kunden bei, auf den nächsten zu warten, und wird auch bei Kunden gezahlt, die geblieben wären."), signal: t("Customers ask for a rebate before they renew.", "Kunden fragen nach einem Rabatt, bevor sie verlängern."), response: t("If more than 25% of renewing customers ask for a rebate first, stop the rebate and move the money to the review.", "Wenn mehr als 25 % der verlängernden Kunden zuerst nach einem Rabatt fragen, den Rabatt stoppen und das Geld in das Review verlagern.") },
  { id: "r5", name: t("A false limit is found out", "Eine falsche Grenze fliegt auf"), l: 1, i: 3, assume: t("A limit lifts the response.", "Eine Grenze hebt die Reaktion."), maybe: t("Customers check. A limit that is not real costs trust (and is a misleading claim, § 5 UWG).", "Kunden prüfen nach. Eine Grenze, die nicht echt ist, kostet Vertrauen (und ist eine irreführende Angabe, § 5 UWG)."), signal: t("A customer asks for the source of a deadline and the answer takes days.", "Ein Kunde fragt nach der Quelle einer Frist, und die Antwort dauert Tage."), response: t("If a limit cannot be sourced within two days, take it out of the offer.", "Wenn eine Grenze nicht binnen zwei Tagen belegt werden kann, sie aus dem Angebot nehmen.") },
]);

export function RiskMatrix() {
  const [sel, setSel] = useState<string>("r1");
  const r = EL_RISKS.find((x) => x.id === sel)!;
  const cellRisks = (l: number, i: number) => EL_RISKS.filter((x) => x.l === l && x.i === i);
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <div className="flex items-center text-micro font-semibold uppercase text-ash [writing-mode:vertical-rl] rotate-180">{tt("Impact if it happens →", "Auswirkung, wenn es eintritt →")}</div>
        <div>
          <div className="grid grid-cols-3 gap-1" role="group" aria-label={tt("Likelihood by impact grid", "Raster nach Wahrscheinlichkeit und Auswirkung")}>
            {[3, 2, 1].flatMap((imp) =>
              [1, 2, 3].map((lik) => {
                const here = cellRisks(lik, imp);
                const hot = lik * imp >= 6;
                return (
                  <div key={`${lik}-${imp}`} className={clsx("flex min-h-[64px] flex-wrap content-center items-center justify-center gap-1 rounded-md border p-1", hot ? "border-rust/40 bg-rustSoft" : lik * imp >= 3 ? "border-line bg-accentSoft/50" : "border-line bg-mist/60")}>
                    {here.map((x) => (
                      <button key={x.id} type="button" onClick={() => setSel(x.id)} aria-pressed={sel === x.id} aria-label={tt(`${x.name}. Likelihood ${x.l}, impact ${x.i}.`, `${x.name}. Wahrscheinlichkeit ${x.l}, Auswirkung ${x.i}.`)} className={clsx("min-h-[40px] min-w-[40px] rounded-full border-2 px-2 text-caption font-bold", sel === x.id ? "border-ink bg-ink text-paper" : "border-ink bg-paper text-ink")}>
                        {x.id.slice(1)}
                      </button>
                    ))}
                    {here.length === 0 && <span className="text-micro text-ash/60">{hot ? tt("act now", "jetzt handeln") : ""}</span>}
                  </div>
                );
              }),
            )}
          </div>
          <div className="mt-1 text-center text-micro font-semibold uppercase text-ash">{tt("Likelihood → (low, mid, high)", "Wahrscheinlichkeit → (niedrig, mittel, hoch)")}</div>
        </div>
      </div>
      <ol className="grid gap-1.5 sm:grid-cols-2">
        {EL_RISKS.map((x) => (
          <li key={x.id}>
            <button type="button" onClick={() => setSel(x.id)} aria-pressed={sel === x.id} className={clsx("flex min-h-[40px] w-full items-center gap-2 rounded-md border px-2 py-1 text-left text-caption", sel === x.id ? "border-accent bg-accentSoft" : "border-line bg-paper hover:border-ash")}>
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-micro font-bold text-paper">{x.id.slice(1)}</span>
              {x.name}
            </button>
          </li>
        ))}
      </ol>
      <div className="space-y-1.5 rounded-lg border border-line bg-paper p-3.5 text-caption" aria-live="polite">
        <p className="smallcaps">
          {r.name} · {tt("likelihood", "Wahrscheinlichkeit")} {r.l} · {tt("impact", "Auswirkung")} {r.i} · {tt("score", "Wert")} {r.l * r.i}
        </p>
        <p>
          <span className="font-semibold text-ink">{tt("We assume. ", "Wir nehmen an. ")}</span>
          {r.assume}
        </p>
        <p>
          <span className="font-semibold text-ink">{tt("It may be true that. ", "Es kann sein, dass. ")}</span>
          {r.maybe}
        </p>
        <p>
          <span className="font-semibold text-ink">{tt("Early signal. ", "Frühsignal. ")}</span>
          {r.signal}
        </p>
        <p>
          <span className="font-semibold text-ink">{tt("Response with a trigger. ", "Reaktion mit einem Trigger. ")}</span>
          {r.response}
        </p>
      </div>
      <Insight>
        {r.l * r.i >= 6
          ? tt(
              `Risk ${r.id.slice(1)} scores ${r.l * r.i} and sits in the shaded top-right zone. It needs a signal you can see early and a trigger with a number now, not after the first customers have left.`,
              `Risiko ${r.id.slice(1)} hat den Wert ${r.l * r.i} und liegt in der schattierten Zone oben rechts. Es braucht jetzt ein Signal, das Sie früh sehen können, und einen Trigger mit einer Zahl, nicht erst, nachdem die ersten Kunden gegangen sind.`,
            )
          : tt(
              `Risk ${r.id.slice(1)} scores ${r.l * r.i}. It is worth a note and a signal, and it does not need a budget line yet. Notice that it is still written as an assumption about the customer, and that its response contains a number.`,
              `Risiko ${r.id.slice(1)} hat den Wert ${r.l * r.i}. Es verdient einen Vermerk und ein Signal und braucht noch keine Budgetzeile. Beachten Sie, dass es weiter als Annahme über den Kunden formuliert ist und dass seine Reaktion eine Zahl enthält.`,
            )}
        {tt(" A risk of misjudgment is always “we assume the customer …”. A competitor copying the programme or a late delivery is a different kind of risk.", " Ein Risiko der Fehleinschätzung lautet immer „Wir nehmen an, der Kunde …“. Ein Wettbewerber, der das Programm kopiert, oder eine verspätete Lieferung ist ein Risiko anderer Art.")}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B5 · architecture (Brenner) */

const E_MONTHS = [1, 2, 3, 4, 5, 6, 7, 8];
const E_ITEMS = bi([
  { id: "found", name: t("Consent and data foundation", "Einwilligungs- und Datenfundament"), cost: 30000, start: 1, owner: t("Head of Data and IT", "Leitung Daten und IT"), ownerWhy: t("Owns the CRM and the consent record, so can change what is recorded without asking anyone else. The data protection officer reviews it and does not own it.", "Verantwortet das CRM und das Einwilligungsregister und kann daher ändern, was erfasst wird, ohne jemand anderen zu fragen. Der Datenschutzbeauftragte prüft es und besitzt es nicht."), startWhy: t("Month 1: consent first. Nothing that uses customer data can start before it is recorded who agreed to what.", "Monat 1: Einwilligung zuerst. Nichts, was Kundendaten nutzt, kann starten, bevor festgehalten ist, wer wozu zugestimmt hat."), trigger: t("If fewer than 70% of customers have a consent status by month 2, the personalisation engine does not start.", "Wenn bis Monat 2 weniger als 70 % der Kunden einen Einwilligungsstatus haben, startet die Personalisierungs-Engine nicht."), trigWhy: t("It names a number (70%), a date (month 2) and an action (the engine waits).", "Er nennt eine Zahl (70 %), ein Datum (Monat 2) und eine Aktion (die Engine wartet).") },
  { id: "review", name: t("Yearly value review", "Jährliches Value-Review"), cost: 40000, start: 4, owner: t("Head of Customer Success", "Leitung Customer Success"), ownerWhy: t("Owns the customer relationships and can book the reviews.", "Verantwortet die Kundenbeziehungen und kann die Reviews buchen."), startWhy: t("Month 4: it needs a template and engineer time, and it does not use data beyond the contract.", "Monat 4: Es braucht eine Vorlage und Ingenieurzeit und nutzt keine Daten über den Vertrag hinaus."), trigger: t("If fewer than 30% of members have booked the review by month 7, replace the call with a short written report.", "Wenn bis Monat 7 weniger als 30 % der Mitglieder das Review gebucht haben, das Gespräch durch einen kurzen schriftlichen Bericht ersetzen."), trigWhy: t("A number, a date and an action.", "Eine Zahl, ein Datum und eine Aktion.") },
  { id: "circle", name: t("Peer round tables", "Peer-Round-Tables"), cost: 20000, start: 5, owner: t("Head of Customer Success", "Leitung Customer Success"), ownerWhy: t("Holds the relationships and can invite customers.", "Hält die Beziehungen und kann Kunden einladen."), startWhy: t("Month 5: the invitation list comes from members, who joined by choice.", "Monat 5: Die Einladungsliste kommt von Mitgliedern, die freiwillig beigetreten sind."), trigger: t("If fewer than 15 customers attend the first round table by month 7, change the topic and invite the next 80.", "Wenn bis Monat 7 weniger als 15 Kunden am ersten Round Table teilnehmen, das Thema ändern und die nächsten 80 einladen."), trigWhy: t("A number, a date and an action.", "Eine Zahl, ein Datum und eine Aktion.") },
  { id: "engine", name: t("Personalisation engine, level 2", "Personalisierungs-Engine, Stufe 2"), cost: 40000, start: 3, owner: t("Head of Marketing", "Leitung Marketing"), ownerWhy: t("Owns the messages and the sending, and works from the consent record.", "Verantwortet die Botschaften und den Versand und arbeitet mit dem Einwilligungsregister."), startWhy: t("Month 3: it uses data, so it starts after the consent foundation is in place.", "Monat 3: Sie nutzt Daten, startet also, nachdem das Einwilligungsfundament steht."), trigger: t("If objections exceed 12 per 1,000 customers in the first month of sending, pause the sending for the group with the most objections.", "Wenn die Widersprüche im ersten Versandmonat 12 pro 1.000 Kunden übersteigen, den Versand für die Gruppe mit den meisten Widersprüchen pausieren."), trigWhy: t("A behavioural metric, a number, a period and an action.", "Eine Verhaltenskennzahl, eine Zahl, ein Zeitraum und eine Aktion.") },
]);
const E_BUDGET = 150000;

export function ArchitectureExample() {
  const [sel, setSel] = useState<string>("found");
  const it = E_ITEMS.find((x) => x.id === sel)!;
  const total = E_ITEMS.reduce((s, x) => s + x.cost, 0);
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[40rem] border-collapse text-caption">
          <caption className="sr-only">{tt("Brenner's architecture: four items over eight months with owner and cost", "Brenners Architektur: vier Punkte über acht Monate mit Owner und Kosten")}</caption>
          <thead>
            <tr className="bg-mist text-left text-micro uppercase text-ash">
              <th className="px-3 py-2">{tt("Item · owner · cost", "Punkt · Owner · Kosten")}</th>
              {E_MONTHS.map((m) => (
                <th key={m} className="px-1 py-2 text-center">
                  M{m}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {E_ITEMS.map((x) => (
              <tr key={x.id} className={clsx("border-t border-line align-top", sel === x.id && "bg-accentSoft/60")}>
                <td className="px-3 py-1.5">
                  <button type="button" onClick={() => setSel(x.id)} aria-pressed={sel === x.id} className="min-h-[40px] text-left">
                    <span className="font-semibold">{x.name}</span>
                    <br />
                    <span className="text-ash">
                      {x.owner} · {euro(x.cost)}
                    </span>
                  </button>
                </td>
                {E_MONTHS.map((m) => (
                  <td key={m} className="px-1 py-1.5 text-center">
                    <span className={clsx("inline-block h-6 w-full min-w-[1.6rem] rounded border text-micro leading-6", m === x.start ? "border-ink bg-ink font-bold text-paper" : m > x.start ? "border-signal/40 bg-signalSoft text-signal" : "border-line bg-paper text-ash/40")}>
                      {m === x.start ? "▶" : m > x.start ? "·" : ""}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-caption text-ash">
        {tt(
          `Total ${euro(total)} of the ${euro(E_BUDGET)} budget. Left open: a retention dashboard (${euro(30000)}), postponed. Pickup point: if the monthly review by hand takes more than two days or misses a figure by month 6.`,
          `Summe ${euro(total)} vom Budget von ${euro(E_BUDGET)}. Offen gelassen: ein Retention-Dashboard (${euro(30000)}), zurückgestellt. Wiedervorlagepunkt: wenn das monatliche Review von Hand mehr als zwei Tage braucht oder bis Monat 6 eine Kennzahl verfehlt.`,
        )}
      </p>
      <div className="space-y-1.5 rounded-lg border border-line bg-paper p-3.5 text-caption" aria-live="polite">
        <p className="smallcaps">{it.name}</p>
        <p>
          <span className="font-semibold text-ink">Owner: {it.owner}. </span>
          {it.ownerWhy}
        </p>
        <p>
          <span className="font-semibold text-ink">{tt(`Starts in month ${it.start}. `, `Startet in Monat ${it.start}. `)}</span>
          {it.startWhy}
        </p>
        <p>
          <span className="font-semibold text-ink">Trigger. </span>
          {tt(`“${it.trigger}”`, `„${it.trigger}“`)} <span className="text-ash">{it.trigWhy}</span>
        </p>
      </div>
      <Insight>
        {tt(
          `The consent foundation starts in month 1 and everything that uses customer data comes after it, so nothing runs on an unrecorded agreement. Every item has one owner who can change it without asking anyone else, and a trigger that carries a number, a date and an action. The four items cost ${euro(total)}; the ${euroSigned(E_BUDGET - total)} that is left is not spread thinly: the dashboard is postponed with a pickup point instead.`,
          `Das Einwilligungsfundament startet in Monat 1, und alles, was Kundendaten nutzt, kommt danach, sodass nichts auf einer nicht erfassten Zustimmung läuft. Jeder Punkt hat einen Owner, der ihn ändern kann, ohne jemand anderen zu fragen, und einen Trigger mit einer Zahl, einem Datum und einer Aktion. Die vier Punkte kosten ${euro(total)}; die übrigen ${euroSigned(E_BUDGET - total)} werden nicht dünn verteilt: Stattdessen wird das Dashboard mit einem Wiedervorlagepunkt zurückgestellt.`,
        )}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B6 · regret table (Brenner) */

const STRATS = bi([
  { id: "commit", name: t("Commit now", "Jetzt festlegen"), pay: [260, 70, -140] },
  { id: "stage", name: t("Stage it, with a tripwire", "Staffeln, mit einem Tripwire"), pay: [180, 70, -20] },
  { id: "wait", name: t("Wait for more data", "Auf mehr Daten warten"), pay: [-40, -40, -40] },
]);
const scen = () => [tt("Customers welcome it", "Kunden begrüßen es"), tt("Reactions are mixed", "Reaktionen sind gemischt"), tt("Customers push back", "Kunden wehren sich")];

export function RegretTable() {
  const [q, setQ] = useState(20);
  const [regret, setRegret] = useState(false);
  const [sc, setSc] = useState<0 | 1 | 2>(2);
  const best = [0, 1, 2].map((j) => Math.max(...STRATS.map((s) => s.pay[j])));
  const reg = STRATS.map((s) => s.pay.map((v, j) => best[j] - v));
  const maxReg = reg.map((r) => Math.max(...r));
  const pq = q / 100;
  const pOther = (1 - pq) / 2;
  const ev = STRATS.map((s) => pOther * s.pay[0] + pOther * s.pay[1] + pq * s.pay[2]);
  const bestEv = ev.indexOf(Math.max(...ev));
  const bestMinimax = maxReg.indexOf(Math.min(...maxReg));
  const cell = (i: number, j: number) => (regret ? reg[i][j] : STRATS[i].pay[j]);
  // the estimate at which commit and stage have the same expected result
  const a = (s: (typeof STRATS)[number]) => (s.pay[0] + s.pay[1]) / 2 - s.pay[2];
  const cross = Math.round((((STRATS[0].pay[0] + STRATS[0].pay[1]) / 2 - (STRATS[1].pay[0] + STRATS[1].pay[1]) / 2) / (a(STRATS[0]) - a(STRATS[1]))) * 100);
  const sign = (n: number) => (n > 0 && !regret ? "+" : "");
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[34rem] border-collapse text-caption">
          <caption className="sr-only">{regret ? tt("Regret of three strategies in three customer reactions, in thousand euros over twelve months", "Regret dreier Strategien bei drei Kundenreaktionen, in Tausend Euro über zwölf Monate") : tt("Net result of three strategies in three customer reactions, in thousand euros over twelve months", "Nettoergebnis dreier Strategien bei drei Kundenreaktionen, in Tausend Euro über zwölf Monate")}</caption>
          <thead>
            <tr className="bg-mist text-left text-micro uppercase text-ash">
              <th className="px-3 py-2">{regret ? "Regret" : tt("Net result", "Nettoergebnis")} {tt("(€ thousand, 12 months)", "(T€, 12 Monate)")}</th>
              {scen().map((s, j) => (
                <th key={j} className="px-2 py-2 text-center">
                  <button type="button" onClick={() => setSc(j as 0 | 1 | 2)} aria-pressed={sc === j} className={clsx("rounded px-1.5 py-1 font-semibold uppercase", sc === j && "bg-accentSoft text-accent ring-1 ring-gold")}>
                    {s}
                  </button>
                </th>
              ))}
              <th className="px-2 py-2 text-right">{regret ? tt("Worst regret", "Schlimmster Regret") : tt("Expected", "Erwartet")}</th>
            </tr>
          </thead>
          <tbody>
            {STRATS.map((s, i) => (
              <tr key={s.id} className="border-t border-line">
                <td className="px-3 py-2 font-semibold">{s.name}</td>
                {[0, 1, 2].map((j) => (
                  <td key={j} className={clsx("tnum px-2 py-2 text-center", sc === j && "bg-accentSoft/60 font-bold", !regret && cell(i, j) === best[j] && "underline decoration-2 underline-offset-4")}>
                    {sign(cell(i, j))}
                    {cell(i, j)}
                  </td>
                ))}
                <td className="tnum px-2 py-2 text-right font-bold">{regret ? maxReg[i] : `${ev[i] >= 0 ? "+" : "−"}${Math.abs(Math.round(ev[i]))}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <p className="smallcaps">{tt("Show", "Anzeigen")}</p>
          <Toggles<"pay" | "regret"> label={tt("Show", "Anzeigen")} value={regret ? "regret" : "pay"} onChange={(v) => setRegret(v === "regret")} options={[{ id: "pay", label: tt("Net result", "Nettoergebnis") }, { id: "regret", label: tt("Regret (best in the column minus yours)", "Regret (Bestwert der Spalte minus Ihrer)") }]} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="q-slider" className="smallcaps block">
            {tt("Your estimate that customers push back:", "Ihre Schätzung, dass Kunden sich wehren:")} {q}{pc()}
          </label>
          <input id="q-slider" type="range" min={0} max={60} step={5} value={q} onChange={(e) => setQ(Number(e.target.value))} className="range-accent" />
          <p className="text-micro normal-case tracking-normal text-ash">{tt("The other two reactions share the rest equally.", "Die anderen beiden Reaktionen teilen sich den Rest gleichmäßig.")}</p>
        </div>
      </div>
      <Insight>
        {tt(
          `Without any estimate of the odds, the strategy with the smallest worst regret is “${STRATS[bestMinimax].name}” (${maxReg[bestMinimax]}). With your estimate of ${q}% for pushback, the highest expected result is “${STRATS[bestEv].name}”. `,
          `Ohne jede Schätzung der Wahrscheinlichkeiten ist die Strategie mit dem kleinsten schlimmsten Regret „${STRATS[bestMinimax].name}“ (${maxReg[bestMinimax]}). Mit Ihrer Schätzung von ${q} % für Widerstand ist das höchste erwartete Ergebnis „${STRATS[bestEv].name}“. `,
        )}
        {q < cross
          ? tt(`Below about ${cross}% the bold move pays more on average; the staged start gives up some upside to insure against the bad case.`, `Unter etwa ${cross} % zahlt sich der mutige Schritt im Schnitt mehr aus; der gestaffelte Start gibt etwas Aufwärtspotenzial auf, um sich gegen den schlechten Fall abzusichern.`)
          : tt(`From about ${cross}% the staged start overtakes the bold one on average as well, because the tripwire caps what a pushback costs.`, `Ab etwa ${cross} % überholt der gestaffelte Start den mutigen auch im Schnitt, weil der Tripwire begrenzt, was ein Widerstand kostet.`)}
        {tt(` Waiting is the worst under every reading (${maxReg[2]} worst regret): the customers keep leaving while you wait.`, ` Warten ist bei jeder Lesart das Schlechteste (${maxReg[2]} schlimmster Regret): Die Kunden gehen weiter, während Sie warten.`)}
      </Insight>
      <div className="rounded-lg border border-line bg-paper p-3.5 text-caption">
        <p className="smallcaps">{tt("A tripwire in four parts", "Ein Tripwire in vier Teilen")}</p>
        <Bul
          items={[
            tt("A metric of customer behaviour, not an activity count.", "Eine Kennzahl des Kundenverhaltens, keine Aktivitätszählung."),
            tt("A threshold that is better than today's baseline.", "Ein Schwellenwert, der besser ist als die heutige Baseline."),
            tt("A date early enough to still act on it.", "Ein Datum, das früh genug ist, um noch zu handeln."),
            tt("An action agreed in advance: widen, adjust or stop.", "Eine vorab vereinbarte Aktion: ausweiten, anpassen oder anhalten."),
          ]}
        />
      </div>
      <p className="text-caption text-ash">{tt("Values are Case assumptions for a different company (Brenner Netzwerke), in € thousand.", "Die Werte sind Case-Annahmen für ein anderes Unternehmen (Brenner Netzwerke), in Tausend Euro.")}</p>
    </div>
  );
}
