"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { Bul, Diagram, Insight, Toggles } from "@/components/materi/kit";
import { NEEDS } from "@/data/needs";
import type { EmotionId, NeedId } from "@/data/needs";
import { strengthOf, STRENGTH_LABEL } from "@/data/touchpoints";
import { bi, euro, num, t, tt } from "@/lib/lang";
import { Gloss } from "@/lib/glossify";

/**
 * The interactive diagrams of Materi A (Route 1). Every one uses a worked-example company (Brenner Netzwerke GmbH), never CloudTech,
 * so the answer to a task block is never printed. Every control is followed by an always-visible "What this shows".
 * Text is bilingual: data through `bi(t(en, de))`, inline text through `tt(en, de)`.
 */

const NAMED = { ink: "#1F2328", ash: "#59606A", paper: "#FFFEFA", mist: "#ECE6D6", line: "#D8D1BF", amber: "#8A5A0B", gold: "#D99A2B", teal: "#0F6B6B", tealSoft: "#DFEEEB", rust: "#A4472A", data: "#2F5D62", grey: "#8B9098", soft: "#FBF0D6" };
const pc = () => tt("%", " %");

/* ------------------------------------------------------------------ A1 · feeling first, reasons second */

type Feel = "calm" | "uneasy";
const FACTS: { id: string; label: string; calm: string; uneasy: string }[] = bi([
  { id: "up", label: t("Uptime promise of 99.9%", "Uptime-Versprechen von 99,9 %"), calm: t("A strong promise, and it matches what they told me.", "Ein starkes Versprechen, und es passt zu dem, was man mir gesagt hat."), uneasy: t("A number in a brochure. Who checks it?", "Eine Zahl in einer Broschüre. Wer prüft sie?") },
  { id: "price", label: t("€9,000 a year", "9.000 € im Jahr"), calm: t("A fair price for what we get.", "Ein fairer Preis für das, was wir bekommen."), uneasy: t("More than we should pay for something every provider sells.", "Mehr, als wir für etwas zahlen sollten, das jeder Anbieter verkauft.") },
  { id: "term", label: t("36-month term", "Laufzeit von 36 Monaten"), calm: t("Stable: no surprises for three years.", "Stabil: drei Jahre keine Überraschungen."), uneasy: t("A trap: three years is a long time to be stuck.", "Eine Falle: Drei Jahre sind eine lange Zeit, um festzusitzen.") },
]);
const YES: Record<Feel, number> = { calm: 78, uneasy: 24 };

export function FeelFirst() {
  const uid = useId().replace(/:/g, "");
  const [feel, setFeel] = useState<Feel>("calm");
  const [showSaid, setShowSaid] = useState(false);
  const yes = YES[feel];
  const box = (x: number, title: string, sub: string, hot: boolean) => (
    <g>
      <rect x={x} y="14" width="168" height="74" rx="10" fill={hot ? NAMED.soft : NAMED.paper} stroke={hot ? NAMED.amber : NAMED.ash} strokeWidth={hot ? 2.4 : 1.4} />
      <text x={x + 84} y="40" textAnchor="middle" fontSize="13.5" fontWeight="700" fill={NAMED.ink}>{title}</text>
      <text x={x + 84} y="58" textAnchor="middle" fontSize="11.5" fill={NAMED.ash}>{sub}</text>
    </g>
  );
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 190" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("A purchase decision in three steps: the feeling, the reasons, the story", "Eine Kaufentscheidung in drei Schritten: das Gefühl, die Gründe, die Geschichte")}</title>
        <desc id={`${uid}-d`}>
          {tt(
            `The customer's first impression is ${feel}. The same three facts are then read as ${feel === "calm" ? "reasons to sign" : "reasons to wait"}. The chance of a yes is ${yes}% in this illustration.`,
            `Der erste Eindruck des Kunden ist ${feel === "calm" ? "ruhig" : "unruhig"}. Dieselben drei Fakten werden dann als ${feel === "calm" ? "Gründe zu unterschreiben" : "Gründe zu warten"} gelesen. Die Chance auf ein Ja beträgt in dieser Darstellung ${yes} %.`,
          )}
        </desc>
        <defs>
          <marker id={`${uid}-a`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill={NAMED.ash} />
          </marker>
        </defs>
        {box(6, tt("1 · First impression", "1 · Erster Eindruck"), feel === "calm" ? tt("calm, familiar", "ruhig, vertraut") : tt("uneasy, unsure", "unruhig, unsicher"), true)}
        {box(196, tt("2 · Reasons collected", "2 · Gründe gesammelt"), feel === "calm" ? tt("the facts support it", "die Fakten stützen es") : tt("the facts warn", "die Fakten warnen"), false)}
        {box(386, tt("3 · The story told", "3 · Die erzählte Geschichte"), tt("“I compared the terms”", "„Ich habe die Konditionen verglichen“"), false)}
        <line x1="176" x2="192" y1="51" y2="51" stroke={NAMED.ash} strokeWidth="2" markerEnd={`url(#${uid}-a)`} />
        <line x1="366" x2="382" y1="51" y2="51" stroke={NAMED.ash} strokeWidth="2" markerEnd={`url(#${uid}-a)`} />
        <text x="6" y="112" fontSize="11.5" fill={NAMED.ash}>{tt("a fraction of a second", "ein Sekundenbruchteil")}</text>
        <text x="196" y="112" fontSize="11.5" fill={NAMED.ash}>{tt("minutes to days", "Minuten bis Tage")}</text>
        <text x="386" y="112" fontSize="11.5" fill={NAMED.ash}>{tt("afterwards", "danach")}</text>
        <text x="6" y="140" fontSize="12.5" fontWeight="700" fill={NAMED.ink}>{tt("Chance the customer says yes (illustration)", "Chance, dass der Kunde Ja sagt (Darstellung)")}</text>
        <rect x="6" y="150" width="440" height="22" fill={NAMED.mist} stroke={NAMED.line} />
        <rect x="6" y="150" width={(440 * yes) / 100} height="22" fill={feel === "calm" ? NAMED.data : NAMED.grey} stroke={NAMED.ink} className="anim-grow-x" />
        <text x={6 + (440 * yes) / 100 + 8} y="166" fontSize="13" fontWeight="700" fill={NAMED.ink}>{`${yes}${pc()}`}</text>
      </svg>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <p className="smallcaps">{tt("The customer's first impression", "Der erste Eindruck des Kunden")}</p>
          <Toggles<Feel> label={tt("First impression", "Erster Eindruck")} value={feel} onChange={setFeel} options={[{ id: "calm", label: tt("Calm and familiar", "Ruhig und vertraut") }, { id: "uneasy", label: tt("Uneasy and unsure", "Unruhig und unsicher") }]} />
        </div>
        <div className="space-y-1.5">
          <p className="smallcaps">{tt("Ask the customer why", "Den Kunden nach dem Warum fragen")}</p>
          <Toggles<"reasons" | "said"> label={tt("What to show", "Was gezeigt wird")} value={showSaid ? "said" : "reasons"} onChange={(v) => setShowSaid(v === "said")} options={[{ id: "reasons", label: tt("How the facts are read", "Wie die Fakten gelesen werden") }, { id: "said", label: tt("What the customer will say", "Was der Kunde sagen wird") }]} />
        </div>
      </div>
      <ul className="grid gap-2 sm:grid-cols-3" aria-live="polite">
        {FACTS.map((f) => (
          <li key={f.id} className="rounded-lg border border-line bg-paper p-2.5 text-caption">
            <p className="smallcaps">{f.label}</p>
            <p className="mt-1 text-ink">{showSaid ? tt(`“I compared ${f.label.toLowerCase()} with the other offers.”`, `„Ich habe ${f.label} mit den anderen Angeboten verglichen.“`) : f[feel]}</p>
          </li>
        ))}
      </ul>
      <Insight>
        {feel === "calm"
          ? tt(`With a calm first impression the same three facts are read as three reasons to sign, and the chance of a yes is ${YES.calm}% in this illustration. `, `Bei ruhigem ersten Eindruck werden dieselben drei Fakten als drei Gründe zu unterschreiben gelesen, und die Chance auf ein Ja beträgt in dieser Darstellung ${YES.calm} %. `)
          : tt(`With an uneasy first impression the same three facts are read as three reasons to wait, and the chance of a yes falls to ${YES.uneasy}%. `, `Bei unruhigem ersten Eindruck werden dieselben drei Fakten als drei Gründe zu warten gelesen, und die Chance auf ein Ja sinkt auf ${YES.uneasy} %. `)}
        {showSaid
          ? tt(
              "Ask the customer why and they will name the facts: price, term, uptime. The reasons are true, and they were collected after the feeling had already decided what to look for. That is why a better fact list seldom changes a decision.",
              "Fragen Sie den Kunden nach dem Warum, und er nennt die Fakten: Preis, Laufzeit, Uptime. Die Gründe sind wahr, und sie wurden gesammelt, nachdem das Gefühl schon entschieden hatte, wonach zu suchen ist. Deshalb ändert eine bessere Faktenliste selten eine Entscheidung.",
            )
          : tt(
              "The facts did not change. Only the feeling in front of them did, and it decided which facts to notice and how to read them.",
              "Die Fakten haben sich nicht geändert. Nur das Gefühl davor hat sich geändert, und es entschied, welche Fakten bemerkt und wie sie gelesen werden.",
            )}
      </Insight>
      <p className="text-caption text-ash">{tt("The percentages are set for the teaching example (Case assumption), not measured.", "Die Prozentwerte sind für das Lehrbeispiel gesetzt (Case-Annahme), nicht gemessen.")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ A2 · worked sort: Brenner Netzwerke */

const BRENNER_FEELINGS: { id: string; quote: string; tag: EmotionId; test: string; why: string }[] = bi([
  {
    id: "w1",
    quote: t("Kastell publishes a live status page with every outage since 2019. When something fails I see it before my boss does.", "Kastell veröffentlicht eine Live-Statusseite mit jedem Ausfall seit 2019. Wenn etwas ausfällt, sehe ich es vor meinem Chef."),
    tag: "security" as EmotionId,
    test: t("Is the point that something bad is prevented or covered?", "Geht es darum, dass etwas Schlimmes verhindert oder abgedeckt wird?"),
    why: t("The customer can see problems before anyone asks them about it. The feeling is being protected from being caught out.", "Der Kunde sieht Probleme, bevor ihn jemand darauf anspricht. Das Gefühl ist, davor geschützt zu sein, überrascht zu werden."),
  },
  {
    id: "w2",
    quote: t("Kastell's engineer rang me when a delivery slipped by two days, before I had noticed. That is how I know I can rely on them.", "Der Ingenieur von Kastell rief mich an, als eine Lieferung sich um zwei Tage verschob, bevor ich es bemerkt hatte. So weiß ich, dass ich mich auf sie verlassen kann."),
    tag: "trust" as EmotionId,
    test: t("Is the customer judging whether the provider keeps its word?", "Beurteilt der Kunde, ob der Anbieter sein Wort hält?"),
    why: t("The customer names reliability: bad news brought early, without being asked. The provider behaves as it promised.", "Der Kunde nennt Verlässlichkeit: schlechte Nachrichten früh, ohne gefragt zu werden. Der Anbieter verhält sich, wie er es versprochen hat."),
  },
  {
    id: "w3",
    quote: t("We were the first customer they invited into the advisory circle. My CEO mentioned it at our own supplier day.", "Wir waren der erste Kunde, den sie in den Kundenbeirat eingeladen haben. Mein Geschäftsführer hat es auf unserem eigenen Lieferantentag erwähnt."),
    tag: "status" as EmotionId,
    test: t("Is it valued for how others see the customer?", "Wird es dafür geschätzt, wie andere den Kunden sehen?"),
    why: t("The invitation is used in front of other people. The value lies in how it makes the customer look.", "Die Einladung wird vor anderen Menschen genutzt. Der Wert liegt darin, wie sie den Kunden aussehen lässt."),
  },
  {
    id: "w4",
    quote: t("At their user group I sat next to the IT head of another packaging company. We still swap notes every month.", "In ihrer Nutzergruppe saß ich neben dem IT-Leiter eines anderen Verpackungsunternehmens. Wir tauschen uns noch jeden Monat aus."),
    tag: "belonging" as EmotionId,
    test: t("Is the point being among others like them?", "Geht es darum, unter Gleichgesinnten zu sein?"),
    why: t("The customer found peers with the same problems. The value is the circle, not how it looks to outsiders.", "Der Kunde fand Gleichgesinnte mit denselben Problemen. Der Wert ist der Kreis, nicht, wie er auf Außenstehende wirkt."),
  },
  {
    id: "w5",
    quote: t("Their contract names the two data centres and states that no data leaves Germany. Our auditor ticked it off in one line.", "Ihr Vertrag nennt die zwei Rechenzentren und legt fest, dass keine Daten Deutschland verlassen. Unser Prüfer hat es in einer Zeile abgehakt."),
    tag: "security" as EmotionId,
    test: t("Is the point that something bad is prevented or covered?", "Geht es darum, dass etwas Schlimmes verhindert oder abgedeckt wird?"),
    why: t("A written protection that the customer's auditor can check. The feeling is that nobody can be blamed for the choice.", "Ein schriftlicher Schutz, den der Prüfer des Kunden kontrollieren kann. Das Gefühl ist, dass niemand für die Wahl beschuldigt werden kann."),
  },
  {
    id: "w6",
    quote: t("Kastell told us plainly that the migration would take six weeks, not four. It took six.", "Kastell sagte uns klar, dass die Migration sechs Wochen dauern würde, nicht vier. Sie dauerte sechs."),
    tag: "trust" as EmotionId,
    test: t("Is the customer judging whether the provider keeps its word?", "Beurteilt der Kunde, ob der Anbieter sein Wort hält?"),
    why: t("An honest estimate, then kept. Integrity is one of the three parts of trust.", "Eine ehrliche Schätzung, dann eingehalten. Integrität ist einer der drei Teile des Vertrauens."),
  },
]);
const EMOTION_STYLE: Record<EmotionId, string> = {
  security: "border-signal/50 bg-signalSoft text-signal",
  trust: "border-accent/50 bg-accentSoft text-accent",
  status: "border-ash/50 bg-mist text-ink",
  belonging: "border-rust/40 bg-rustSoft text-rust",
};

export function EmotionSortExample() {
  const [sel, setSel] = useState<string>("w1");
  const [seen, setSeen] = useState<string[]>(["w1"]);
  const r = BRENNER_FEELINGS.find((x) => x.id === sel)!;
  const pick = (id: string) => {
    setSel(id);
    setSeen((s) => (s.includes(id) ? s : [...s, id]));
  };
  return (
    <Diagram label={tt("Worked example · customers of Brenner Netzwerke say why a competitor, Kastell, felt better (Case assumption, read-only)", "Durchgerechnetes Beispiel · Kunden von Brenner Netzwerke sagen, warum ein Wettbewerber, Kastell, sich besser anfühlte (Case-Annahme, nur lesen)")}>
      <ol className="grid gap-2 sm:grid-cols-2">
        {BRENNER_FEELINGS.map((h) => {
          const on = h.id === sel;
          const opened = seen.includes(h.id);
          return (
            <li key={h.id}>
              <button
                type="button"
                onClick={() => pick(h.id)}
                aria-pressed={on}
                className={clsx("flex min-h-[48px] w-full flex-col items-start gap-1 rounded-lg border bg-paper px-3 py-2 text-left text-caption transition-colors", on ? "border-accent bg-accentSoft ring-2 ring-gold" : "border-line hover:border-ash")}
              >
                <span className="text-ink">{tt(`“${h.quote}”`, `„${h.quote}“`)}</span>
                {opened && <span className={clsx("pill", EMOTION_STYLE[h.tag])}>{NEEDS[h.tag].label}</span>}
              </button>
            </li>
          );
        })}
      </ol>
      <div className="mt-3 space-y-1 rounded-lg border border-line bg-paper p-3 text-caption" aria-live="polite">
        <p className="smallcaps">
          {tt("Emotion:", "Emotion:")} <span className="text-accent">{NEEDS[r.tag].label}</span>
        </p>
        <p>
          <span className="font-semibold text-ink">{tt("The test question. ", "Die Testfrage. ")}</span>
          {r.test}
        </p>
        <p>
          <span className="font-semibold text-ink">{tt("Why. ", "Warum. ")}</span>
          {r.why}
        </p>
      </div>
      <Insight className="mt-3">
        {tt(
          `Each customer names a fact (a status page, a phone call, a badge) but the sentence is about a feeling: protected, able to rely, seen, not alone. Customers seldom say “I felt secure”. They say what happened, and the feeling is in what they chose to tell. Two pairs are easy to confuse: security and trust (protected from a bad outcome, or a promise kept), status and belonging (seen from outside, or inside a circle). You have opened ${seen.length} of 6.`,
          `Jeder Kunde nennt einen Fakt (eine Statusseite, einen Anruf, ein Siegel), aber der Satz handelt von einem Gefühl: geschützt, sich verlassen können, gesehen, nicht allein. Kunden sagen selten „Ich fühlte mich sicher“. Sie sagen, was passiert ist, und das Gefühl steckt in dem, was sie zu erzählen wählten. Zwei Paare werden leicht verwechselt: Sicherheit und Vertrauen (vor einem schlechten Ausgang geschützt oder ein Versprechen gehalten), Status und Zugehörigkeit (von außen gesehen oder innerhalb eines Kreises). Sie haben ${seen.length} von 6 geöffnet.`,
        )}
      </Insight>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A3 · the trigger checker */

type TrigKind = "scarcity" | "proof" | "authority";
const trigLabel = (k: TrigKind): string => ({ scarcity: "Scarcity", proof: "Social Proof", authority: "Authority" })[k];
const CHECK_LINES: { id: string; kind: TrigKind; source: string; text: string; tests: boolean[]; notes: string[]; before: number; after: number }[] = bi([
  {
    id: "c1",
    kind: "scarcity" as TrigKind,
    source: t("Brenner proposal", "Angebot von Brenner"),
    text: t("We take four migrations a quarter, because each one gets a named engineer. One slot is open for the second quarter.", "Wir übernehmen vier Migrationen pro Quartal, weil jede einen namentlich benannten Ingenieur bekommt. Für das zweite Quartal ist ein Platz frei."),
    tests: [true, true, true],
    notes: [
      t("The limit follows from a real rule: one named engineer per migration.", "Die Grenze folgt aus einer echten Regel: ein benannter Ingenieur pro Migration."),
      t("The customer can ask for the project plan.", "Der Kunde kann den Projektplan anfordern."),
      t("It gives the customer a reason for the deadline that they can weigh.", "Sie gibt dem Kunden einen Grund für die Frist, den er abwägen kann."),
    ],
    before: 60,
    after: 72,
  },
  {
    id: "c2",
    kind: "scarcity" as TrigKind,
    source: t("Kastell web banner", "Web-Banner von Kastell"),
    text: t("“Only 3 licences left at this price!” The counter is reset every night.", "„Nur noch 3 Lizenzen zu diesem Preis!“ Der Zähler wird jede Nacht zurückgesetzt."),
    tests: [false, false, false],
    notes: [
      t("The limit is not real: the counter resets.", "Die Grenze ist nicht echt: Der Zähler wird zurückgesetzt."),
      t("Nobody outside can see the stock.", "Niemand von außen kann den Bestand sehen."),
      t("A customer who found out would feel manipulated.", "Ein Kunde, der es herausfände, würde sich manipuliert fühlen."),
    ],
    before: 60,
    after: 22,
  },
  {
    id: "c3",
    kind: "proof" as TrigKind,
    source: t("Brenner proposal", "Angebot von Brenner"),
    text: t("Nine packaging firms in Bavaria run on our platform. Two have agreed to take your call; their names and numbers are on page 3.", "Neun Verpackungsfirmen in Bayern laufen auf unserer Plattform. Zwei haben zugesagt, Ihren Anruf entgegenzunehmen; ihre Namen und Nummern stehen auf Seite 3."),
    tests: [true, true, true],
    notes: [
      t("The firms exist and use the platform.", "Die Firmen existieren und nutzen die Plattform."),
      t("Named and reachable: the customer can call.", "Namentlich genannt und erreichbar: Der Kunde kann anrufen."),
      t("It treats the customer as someone who will check.", "Es behandelt den Kunden als jemanden, der nachprüft."),
    ],
    before: 60,
    after: 78,
  },
  {
    id: "c4",
    source: t("Kastell brochure", "Broschüre von Kastell"),
    kind: "proof" as TrigKind,
    text: t("“Thousands of companies trust us.” No names, no numbers, no date.", "„Tausende Unternehmen vertrauen uns.“ Keine Namen, keine Zahlen, kein Datum."),
    tests: [false, false, true],
    notes: [
      t("“Thousands” is not backed by anything the customer can see.", "„Tausende“ wird von nichts gestützt, was der Kunde sehen kann."),
      t("Nothing to look up.", "Nichts zum Nachschlagen."),
      t("It does not pressure the customer; it is only empty.", "Es setzt den Kunden nicht unter Druck; es ist nur leer."),
    ],
    before: 60,
    after: 40,
  },
  {
    id: "c5",
    kind: "authority" as TrigKind,
    source: t("Brenner offer", "Angebot von Brenner"),
    text: t("Our data centre is certified to ISO/IEC 27001. The certificate number and the auditor's name are printed on page 5.", "Unser Rechenzentrum ist nach ISO/IEC 27001 zertifiziert. Die Zertifikatsnummer und der Name des Auditors stehen auf Seite 5."),
    tests: [true, true, true],
    notes: [
      t("A real certificate of a named standard.", "Ein echtes Zertifikat eines benannten Standards."),
      t("The customer can ask the auditor.", "Der Kunde kann den Auditor fragen."),
      t("It gives the customer what they need to defend the choice.", "Es gibt dem Kunden, was er braucht, um die Wahl zu verteidigen."),
    ],
    before: 60,
    after: 74,
  },
  {
    id: "c6",
    kind: "authority" as TrigKind,
    source: t("Kastell flyer", "Flyer von Kastell"),
    text: t("“Approved by leading experts.” No expert is named.", "„Von führenden Experten geprüft.“ Kein Experte wird genannt."),
    tests: [false, false, false],
    notes: [
      t("Nobody is named, so nothing can be true or false.", "Niemand wird genannt, also kann nichts wahr oder falsch sein."),
      t("The customer cannot ask anyone.", "Der Kunde kann niemanden fragen."),
      t("It asks the customer to defer to nobody in particular.", "Es verlangt vom Kunden, sich niemand Bestimmtem zu fügen."),
    ],
    before: 60,
    after: 30,
  },
]);
const testNames = () => [tt("True", "Wahr"), tt("Checkable", "Prüfbar"), tt("Respectful", "Respektvoll")];

export function TriggerChecker() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSel] = useState("c1");
  const [checked, setChecked] = useState(false);
  const [seen, setSeen] = useState<string[]>(["c1"]);
  const l = CHECK_LINES.find((x) => x.id === sel)!;
  const passes = l.tests.filter(Boolean).length;
  const value = checked ? l.after : l.before;
  const pick = (id: string) => {
    setSel(id);
    setSeen((s) => (s.includes(id) ? s : [...s, id]));
  };
  return (
    <div className="space-y-3">
      <ol className="grid gap-2 sm:grid-cols-2">
        {CHECK_LINES.map((c) => {
          const on = c.id === sel;
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => pick(c.id)}
                aria-pressed={on}
                className={clsx("flex min-h-[48px] w-full flex-col items-start gap-1 rounded-lg border bg-paper px-3 py-2 text-left text-caption transition-colors", on ? "border-accent bg-accentSoft ring-2 ring-gold" : "border-line hover:border-ash")}
              >
                <span className="smallcaps">{c.source}</span>
                <span className="text-ink">{c.text}</span>
                {seen.includes(c.id) && <span className="pill border-line bg-mist text-ink">{trigLabel(c.kind)}</span>}
              </button>
            </li>
          );
        })}
      </ol>
      <div className="rounded-lg border border-line bg-paper p-3.5 text-caption" aria-live="polite">
        <p className="smallcaps">
          {trigLabel(l.kind)} · {tt(`passes ${passes} of 3 tests`, `besteht ${passes} von 3 Tests`)}
        </p>
        <ul className="mt-1.5 space-y-1">
          {testNames().map((n, i) => (
            <li key={i}>
              <span className={clsx("mr-1.5 font-semibold", l.tests[i] ? "text-signal" : "text-rust")}>{l.tests[i] ? tt("● passes", "● besteht") : tt("○ fails", "○ besteht nicht")}</span>
              <span className="font-semibold text-ink">{n}. </span>
              {l.notes[i]}
            </li>
          ))}
        </ul>
      </div>
      <svg viewBox="0 0 560 84" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("How much the customer believes Brenner's word, before and after checking", "Wie sehr der Kunde dem Wort von Brenner glaubt, vor und nach dem Nachprüfen")}</title>
        <desc id={`${uid}-d`}>
          {tt(
            `The line passes ${passes} of 3 tests. The customer's belief in the provider's word is ${l.before} before checking and ${l.after} after, on a scale of 100. Shown now: ${checked ? "after" : "before"}.`,
            `Die Zeile besteht ${passes} von 3 Tests. Der Glaube des Kunden an das Wort des Anbieters ist ${l.before} vor dem Nachprüfen und ${l.after} danach, auf einer Skala von 100. Jetzt gezeigt: ${checked ? "danach" : "davor"}.`,
          )}
        </desc>
        <text x="6" y="18" fontSize="12.5" fontWeight="700" fill={NAMED.ink}>{checked ? tt("After the customer checks the line", "Nachdem der Kunde die Zeile geprüft hat") : tt("Before the customer checks the line", "Bevor der Kunde die Zeile prüft")}</text>
        <rect x="6" y="28" width="500" height="24" fill={NAMED.mist} stroke={NAMED.line} />
        <rect x="6" y="28" width={(500 * value) / 100} height="24" fill={l.after >= l.before ? NAMED.data : NAMED.grey} stroke={NAMED.ink} className="anim-grow-x" />
        <line x1="306" x2="306" y1="24" y2="56" stroke={NAMED.rust} strokeWidth="1.8" strokeDasharray="5 4" />
        <text x="310" y="72" fontSize="11.5" fill={NAMED.rust}>{tt("starting level 60", "Ausgangswert 60")}</text>
        <text x={6 + (500 * value) / 100 + 8} y="46" fontSize="13" fontWeight="700" fill={NAMED.ink}>{value}</text>
      </svg>
      <div className="space-y-1.5">
        <p className="smallcaps">{tt("Let the customer check", "Den Kunden prüfen lassen")}</p>
        <Toggles<"before" | "after"> label={tt("Before or after checking", "Vor oder nach dem Nachprüfen")} value={checked ? "after" : "before"} onChange={(v) => setChecked(v === "after")} options={[{ id: "before", label: tt("Before they check", "Vor dem Nachprüfen") }, { id: "after", label: tt("After they check", "Nach dem Nachprüfen") }]} />
      </div>
      <Insight>
        {passes === 3
          ? tt(
              `This line passes all three tests, so checking helps it: the customer's belief in the provider's word rises from ${l.before} to ${l.after}. A trigger that survives a check is worth more after the check than before. `,
              `Diese Zeile besteht alle drei Tests, das Nachprüfen hilft ihr also: Der Glaube des Kunden an das Wort des Anbieters steigt von ${l.before} auf ${l.after}. Ein Trigger, der ein Nachprüfen übersteht, ist nach der Prüfung mehr wert als davor. `,
            )
          : tt(
              `This line fails ${3 - passes} of 3 tests. Before the check it works as well as any other line (${l.before}). After the check the customer's belief drops to ${l.after}. `,
              `Diese Zeile besteht ${3 - passes} von 3 Tests nicht. Vor der Prüfung wirkt sie so gut wie jede andere Zeile (${l.before}). Nach der Prüfung sinkt der Glaube des Kunden auf ${l.after}. `,
            )}
        {passes < 3 && l.kind === "scarcity" ? tt("A limit that is not real is also a misleading claim (§ 5 UWG). ", "Eine Grenze, die nicht echt ist, ist zudem eine irreführende Angabe (§ 5 UWG). ") : ""}
        {passes < 3
          ? tt("The trigger did its work for a moment and cost trust for good, which is the thing loyalty is built from.", "Der Trigger tat für einen Moment seine Wirkung und kostete dauerhaft Vertrauen, woraus Loyalität gebaut ist.")
          : tt(`You have opened ${seen.length} of 6.`, `Sie haben ${seen.length} von 6 geöffnet.`)}
      </Insight>
      <p className="text-caption text-ash">{tt("The belief scores are set for the teaching example (Case assumption), not measured.", "Die Glaubenswerte sind für das Lehrbeispiel gesetzt (Case-Annahme), nicht gemessen.")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ A4 · the personalisation ladder (Brenner) */

export const BRENNER = { customers: 2000, value: 9000, consent: 30, usable: 80, track: 20 };
const BR_LEVELS: { n: number; name: string; uses: string; needs: string; rate: number; cost: number; reach: number }[] = bi([
  { n: 0, name: t("One message for all", "Eine Nachricht für alle"), uses: t("No customer data.", "Keine Kundendaten."), needs: t("Nothing to agree to.", "Nichts, dem man zustimmen müsste."), rate: 2, cost: 5000, reach: BRENNER.customers },
  { n: 1, name: t("By company facts", "Nach Unternehmensdaten"), uses: t("Industry, size and contract tier from the contract.", "Branche, Größe und Vertragsstufe aus dem Vertrag."), needs: t("Nothing beyond the contract.", "Nichts über den Vertrag hinaus."), rate: 3.5, cost: 20000, reach: BRENNER.customers },
  { n: 2, name: t("By role and contract", "Nach Rolle und Vertrag"), uses: t("The contact's role, the products bought and the term.", "Die Rolle des Ansprechpartners, die gekauften Produkte und die Laufzeit."), needs: t("Nothing beyond the contract; named contacts are personal data.", "Nichts über den Vertrag hinaus; namentlich genannte Ansprechpartner sind personenbezogene Daten."), rate: 5, cost: 40000, reach: BRENNER.customers },
  { n: 3, name: t("By consented usage", "Nach eingewilligter Nutzung"), uses: t("The customer's own usage data.", "Die eigenen Nutzungsdaten des Kunden."), needs: t("The customer has agreed to usage analysis and has twelve months of data.", "Der Kunde hat der Nutzungsanalyse zugestimmt und hat zwölf Monate Daten."), rate: 9, cost: 65000, reach: BRENNER.customers * (BRENNER.consent / 100) * (BRENNER.usable / 100) },
  { n: 4, name: t("Individual, in real time", "Individuell, in Echtzeit"), uses: t("Every click and use across channels.", "Jeder Klick und jede Nutzung über alle Kanäle."), needs: t("A separate consent to tracking, which only some customers give.", "Eine gesonderte Einwilligung zum Tracking, die nur einige Kunden geben."), rate: 10, cost: 160000, reach: BRENNER.customers * (BRENNER.track / 100) },
]);
const MOMENTS = bi([
  { id: "batch" as const, label: t("On the batch date", "Am Stichtag des Batch-Versands"), factor: 1 },
  { id: "review" as const, label: t("After the quarterly review", "Nach dem Quartalsreview"), factor: 1.4 },
  { id: "incident" as const, label: t("Two weeks after an incident", "Zwei Wochen nach einem Incident"), factor: 0.4 },
]);

export function PersonalisationLadder() {
  const uid = useId().replace(/:/g, "");
  const [lvl, setLvl] = useState(2);
  const [mom, setMom] = useState<(typeof MOMENTS)[number]["id"]>("batch");
  const l = BR_LEVELS[lvl];
  const m = MOMENTS.find((x) => x.id === mom)!;
  const resp = (x: (typeof BR_LEVELS)[number]) => x.reach * (x.rate / 100) * m.factor;
  const r = resp(l);
  const l2 = BR_LEVELS[2];
  const maxReach = BRENNER.customers;
  const maxResp = Math.max(...BR_LEVELS.map(resp), 1);
  const S = (v: number, max: number) => (v / max) * 380;
  const cust = tt("customers", "Kunden");
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 180" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt(`Reach and responders at level ${l.n} of the personalisation ladder`, `Reichweite und Reagierende auf Stufe ${l.n} der Personalisierungsleiter`)}</title>
        <desc id={`${uid}-d`}>
          {tt(
            `Level ${l.n}, ${l.name}: it reaches ${Math.round(l.reach)} of ${BRENNER.customers} customers at a response rate of ${l.rate}%, sent ${m.label.toLowerCase()}, so ${Math.round(r)} respond. It costs ${euro(l.cost)} for twelve months.`,
            `Stufe ${l.n}, ${l.name}: Sie erreicht ${Math.round(l.reach)} von ${BRENNER.customers} Kunden bei einer Response Rate von ${l.rate} %, gesendet ${m.label}, also reagieren ${Math.round(r)}. Sie kostet ${euro(l.cost)} für zwölf Monate.`,
          )}
        </desc>
        <text x="4" y="24" fontSize="13" fontWeight="700" fill={NAMED.ink}>{tt("Reach", "Reichweite")}</text>
        <rect x="120" y="8" width="380" height="24" fill={NAMED.mist} stroke={NAMED.line} />
        <rect x="120" y="8" width={S(l.reach, maxReach)} height="24" fill={NAMED.data} stroke={NAMED.ink} className="anim-grow-x" />
        <text x="124" y="25" fontSize="12.5" fontWeight="700" fill={NAMED.paper}>{S(l.reach, maxReach) > 90 ? `${num(Math.round(l.reach))} ${cust}` : ""}</text>
        {S(l.reach, maxReach) <= 90 && <text x={124 + S(l.reach, maxReach)} y="25" fontSize="12.5" fontWeight="700" fill={NAMED.ink}>{`${num(Math.round(l.reach))} ${cust}`}</text>}
        <text x="4" y="66" fontSize="13" fontWeight="700" fill={NAMED.ink}>{tt("Responders", "Reagierende")}</text>
        <rect x="120" y="50" width="380" height="24" fill={NAMED.mist} stroke={NAMED.line} />
        <rect x="120" y="50" width={S(r, maxResp)} height="24" fill={NAMED.gold} stroke={NAMED.ink} className="anim-grow-x" />
        {S(r, maxResp) > 240 ? (
          <text x={120 + S(r, maxResp) - 6} y="67" textAnchor="end" fontSize="12.5" fontWeight="700" fill={NAMED.ink}>{tt(`${Math.round(r)} respond (${l.rate}% of those reached)`, `${Math.round(r)} reagieren (${num(l.rate)} % der Erreichten)`)}</text>
        ) : (
          <text x={124 + S(r, maxResp)} y="67" fontSize="12.5" fontWeight="700" fill={NAMED.ink}>{tt(`${Math.round(r)} respond (${l.rate}% of those reached)`, `${Math.round(r)} reagieren (${num(l.rate)} % der Erreichten)`)}</text>
        )}
        <text x="4" y="108" fontSize="13" fontWeight="700" fill={NAMED.ink}>{tt("Cost", "Kosten")}</text>
        <text x="120" y="108" fontSize="13" fontWeight="700" fill={NAMED.ink}>{tt(`${euro(l.cost)} for twelve months · ${euro(l.cost / Math.max(r, 1))} for each responder`, `${euro(l.cost)} für zwölf Monate · ${euro(l.cost / Math.max(r, 1))} je Reagierendem`)}</text>
        <text x="4" y="140" fontSize="12" fill={NAMED.ash}>{tt(`Base of comparison: level 2 reaches ${num(Math.round(l2.reach))} customers and ${Math.round(resp(l2))} respond.`, `Vergleichsbasis: Stufe 2 erreicht ${num(Math.round(l2.reach))} Kunden, und ${Math.round(resp(l2))} reagieren.`)}</text>
        <text x="4" y="160" fontSize="11.5" fill={NAMED.ash}>{tt(`bars: reach against ${num(2000)} customers · responders against the best level for this moment`, `Balken: Reichweite gegen ${num(2000)} Kunden · Reagierende gegen die beste Stufe für diesen Zeitpunkt`)}</text>
      </svg>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <p className="smallcaps">{tt("Level of personalisation", "Stufe der Personalisierung")}</p>
          <Toggles<string> label={tt("Level", "Stufe")} value={String(lvl)} onChange={(v) => setLvl(Number(v))} options={BR_LEVELS.map((x) => ({ id: String(x.n), label: `${tt("Level", "Stufe")} ${x.n}` }))} />
        </div>
        <div className="space-y-1.5">
          <p className="smallcaps">{tt("When the message is sent", "Wann die Nachricht gesendet wird")}</p>
          <Toggles<(typeof MOMENTS)[number]["id"]> label={tt("Moment", "Zeitpunkt")} value={mom} onChange={setMom} options={MOMENTS.map((x) => ({ id: x.id, label: x.label }))} />
        </div>
      </div>
      <Insight>
        {tt(
          `Level ${l.n} (${l.name.toLowerCase()}) reaches ${num(Math.round(l.reach))} of ${num(BRENNER.customers)} customers. `,
          `Stufe ${l.n} (${l.name}) erreicht ${num(Math.round(l.reach))} von ${num(BRENNER.customers)} Kunden. `,
        )}
        {l.n === 3
          ? tt(
              `Only the ${BRENNER.consent}% who agreed to usage analysis, and only ${BRENNER.usable}% of them with enough data, can be reached: ${BRENNER.customers} × ${BRENNER.consent}% × ${BRENNER.usable}% = ${Math.round(l.reach)}. Each responds at ${l.rate}%, so ${Math.round(r)} respond, ${r < resp(l2) ? "fewer than at level 2" : "more than at level 2"}: a better fit for fewer people. `,
              `Erreicht werden können nur die ${BRENNER.consent} %, die der Nutzungsanalyse zugestimmt haben, und nur ${BRENNER.usable} % davon mit genug Daten: ${num(BRENNER.customers)} × ${BRENNER.consent} % × ${BRENNER.usable} % = ${Math.round(l.reach)}. Jeder reagiert mit ${num(l.rate)} %, also reagieren ${Math.round(r)}, ${r < resp(l2) ? "weniger als auf Stufe 2" : "mehr als auf Stufe 2"}: besserer Zuschnitt für weniger Menschen. `,
            )
          : l.n === 4
            ? tt(
                `Only the ${BRENNER.track}% who gave a separate consent to tracking can be reached, so ${Math.round(l.reach)} customers, for the highest cost on the ladder. `,
                `Erreicht werden können nur die ${BRENNER.track} %, die eine gesonderte Einwilligung zum Tracking gegeben haben, also ${Math.round(l.reach)} Kunden, für die höchsten Kosten auf der Leiter. `,
              )
            : tt("Nothing beyond the contract is needed, so everybody is in reach. ", "Es wird nichts über den Vertrag hinaus gebraucht, also sind alle erreichbar. ")}
        {tt(
          `Sent ${m.label.toLowerCase()}, the same message gets ${m.factor} times the response (an illustration). The answer is not to use the top level for everybody: it is to use each level for the customers whose data allows it, and to choose the moment as carefully as the level.`,
          `Gesendet ${m.label}, erhält dieselbe Nachricht das ${num(m.factor)}-Fache an Response (eine Darstellung). Die Antwort ist nicht, für alle die oberste Stufe zu nutzen: Sie ist, jede Stufe für die Kunden zu nutzen, deren Daten es erlauben, und den Zeitpunkt so sorgfältig zu wählen wie die Stufe.`,
        )}
      </Insight>
      <div className="rounded-lg border border-line bg-paper p-3.5 text-caption" aria-live="polite">
        <p className="smallcaps">{tt("Level", "Stufe")} {l.n} · {l.name}</p>
        <p className="mt-1">
          <span className="font-semibold text-ink">{tt("It uses. ", "Sie nutzt. ")}</span>
          <Gloss>{l.uses}</Gloss>
        </p>
        <p className="mt-1">
          <span className="font-semibold text-ink">{tt("What the customer must have agreed. ", "Wozu der Kunde zugestimmt haben muss. ")}</span>
          <Gloss>{l.needs}</Gloss>
        </p>
      </div>
      <p className="text-caption text-ash">{tt(`Case assumption: Brenner Netzwerke has ${num(BRENNER.customers)} customers; response rates and the effect of the moment are illustrations, not measurements.`, `Case-Annahme: Brenner Netzwerke hat ${num(BRENNER.customers)} Kunden; Response Rates und die Wirkung des Zeitpunkts sind Darstellungen, keine Messungen.`)}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ A5 · loyalty programme types, and the endowed progress effect */

type LoyType = "bonus" | "service" | "community";
const LOY: { id: LoyType; name: string; cost: number; with: number; without: number; builds: string; lasts: string }[] = bi([
  { id: "bonus" as LoyType, name: t("Bonus", "Bonus"), cost: 270, with: 88, without: 35, builds: t("A reason to buy again soon.", "Ein Grund, bald wieder zu kaufen."), lasts: t("Only while the reward continues, and it is paid on every member.", "Nur solange die Belohnung weiterläuft, und sie wird bei jedem Mitglied bezahlt.") },
  { id: "service" as LoyType, name: t("Service", "Service"), cost: 130, with: 90, without: 70, builds: t("Trust and the feeling of being looked after.", "Vertrauen und das Gefühl, umsorgt zu sein."), lasts: t("As long as the service is delivered; the customer sees its use.", "Solange der Service geliefert wird; der Kunde sieht seinen Nutzen.") },
  { id: "community" as LoyType, name: t("Community", "Community"), cost: 50, with: 89, without: 80, builds: t("Belonging and standing among peers.", "Zugehörigkeit und Ansehen unter Gleichgesinnten."), lasts: t("It grows with the group and is hard for a competitor to copy.", "Sie wächst mit der Gruppe und ist für einen Wettbewerber schwer zu kopieren.") },
]);

export function LoyaltyTypes() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSel] = useState<LoyType>("bonus");
  const [stops, setStops] = useState(false);
  const cur = LOY.find((x) => x.id === sel)!;
  const S = (v: number) => (v / 100) * 300;
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 214" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Members who renew, and the cost per member, for three types of loyalty programme", "Mitglieder, die verlängern, und die Kosten pro Mitglied für drei Typen von Loyalty-Programmen")}</title>
        <desc id={`${uid}-d`}>
          {LOY.map((x) => tt(`${x.name}: ${stops ? x.without : x.with}% of members renew when the benefit ${stops ? "stops" : "continues"}; ${euro(x.cost)} per member per year`, `${x.name}: ${stops ? x.without : x.with} % der Mitglieder verlängern, wenn der Vorteil ${stops ? "endet" : "weiterläuft"}; ${euro(x.cost)} pro Mitglied und Jahr`)).join(". ")}
        </desc>
        <text x="4" y="16" fontSize="12.5" fontWeight="700" fill={NAMED.ink}>{stops ? tt("Members who still renew after the benefit stops", "Mitglieder, die nach dem Ende des Vorteils noch verlängern") : tt("Members who renew while the benefit continues", "Mitglieder, die verlängern, solange der Vorteil weiterläuft")}</text>
        {LOY.map((x, i) => {
          const y = 28 + i * 40;
          const v = stops ? x.without : x.with;
          const on = x.id === sel;
          return (
            <g key={x.id}>
              <text x="4" y={y + 18} fontSize="13" fontWeight={on ? 800 : 700} fill={NAMED.ink}>{x.name}</text>
              <rect x="100" y={y} width="300" height="26" fill={NAMED.mist} stroke={NAMED.line} />
              <rect x="100" y={y} width={S(v)} height="26" fill={x.id === "bonus" ? NAMED.grey : NAMED.data} stroke={NAMED.ink} className="anim-grow-x" />
              <text x={100 + S(v) + 8} y={y + 18} fontSize="13" fontWeight="700" fill={NAMED.ink}>{`${v}${pc()}`}</text>
              {on && <rect x="0" y={y - 3} width="556" height="32" fill="none" stroke={NAMED.gold} strokeWidth="2" rx="4" />}
            </g>
          );
        })}
        <text x="4" y="160" fontSize="12.5" fontWeight="700" fill={NAMED.ink}>{tt("Cost per member per year", "Kosten pro Mitglied und Jahr")}</text>
        {LOY.map((x, i) => (
          <g key={x.id}>
            <text x={4 + i * 186} y="184" fontSize="13" fill={NAMED.ink}>{x.name}</text>
            <text x={4 + i * 186} y="202" fontSize="13" fontWeight="700" fill={NAMED.ink}>{euro(x.cost)}</text>
          </g>
        ))}
      </svg>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <p className="smallcaps">{tt("Read a type", "Einen Typ lesen")}</p>
          <Toggles<LoyType> label={tt("Type", "Typ")} value={sel} onChange={setSel} options={LOY.map((x) => ({ id: x.id, label: x.name }))} />
        </div>
        <div className="space-y-1.5">
          <p className="smallcaps">{tt("The benefit", "Der Vorteil")}</p>
          <Toggles<"on" | "off"> label={tt("The benefit", "Der Vorteil")} value={stops ? "off" : "on"} onChange={(v) => setStops(v === "off")} options={[{ id: "on", label: tt("Continues", "Läuft weiter") }, { id: "off", label: tt("Stops in year three", "Endet im dritten Jahr") }]} />
        </div>
      </div>
      <Insight>
        {stops
          ? tt(
              `When the benefit stops, ${cur.without}% of ${cur.name.toLowerCase()} members still renew, against ${cur.with}% while it continued. ${cur.id === "bonus" ? `The drop is ${cur.with - cur.without} points: the reward was the reason. ` : `The drop is only ${cur.with - cur.without} points: the customers valued the thing itself. `}`,
              `Wenn der Vorteil endet, verlängern noch ${cur.without} % der Mitglieder des Typs ${cur.name}, gegenüber ${cur.with} %, solange er weiterlief. ${cur.id === "bonus" ? `Der Rückgang beträgt ${cur.with - cur.without} Punkte: Die Belohnung war der Grund. ` : `Der Rückgang beträgt nur ${cur.with - cur.without} Punkte: Die Kunden schätzten die Sache selbst. `}`,
            )
          : tt(
              `While the benefit continues, all three types keep about ${LOY.map((x) => x.with).join("%, ")}% of members, so a first year cannot tell them apart. `,
              `Solange der Vorteil weiterläuft, behalten alle drei Typen etwa ${LOY.map((x) => x.with).join(" %, ")} % der Mitglieder, ein erstes Jahr kann sie also nicht unterscheiden. `,
            )}
        {tt(
          `${cur.name} costs ${euro(cur.cost)} per member per year and builds: ${cur.builds.toLowerCase()} It lasts: ${cur.lasts.toLowerCase()} Switch to “Stops in year three” to see the difference that matters.`,
          `${cur.name} kostet ${euro(cur.cost)} pro Mitglied und Jahr und baut auf: ${cur.builds} Es hält: ${cur.lasts} Schalten Sie auf „Endet im dritten Jahr“, um den Unterschied zu sehen, auf den es ankommt.`,
        )}
      </Insight>
      <p className="text-caption text-ash">{tt("The percentages and costs are set for the teaching example (Case assumption), not measured.", "Die Prozentwerte und Kosten sind für das Lehrbeispiel gesetzt (Case-Annahme), nicht gemessen.")}</p>
    </div>
  );
}

export function EndowedProgress() {
  const uid = useId().replace(/:/g, "");
  const [card, setCard] = useState<"a" | "b">("a");
  const need = card === "a" ? 8 : 10;
  const given = card === "a" ? 0 : 2;
  const done = card === "a" ? 19 : 34;
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 130" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{card === "a" ? tt("Loyalty card A: eight stamps, none given", "Treuekarte A: acht Stempel, keiner vergeben") : tt("Loyalty card B: ten stamps, two given", "Treuekarte B: zehn Stempel, zwei vergeben")}</title>
        <desc id={`${uid}-d`}>{tt(`Both cards need eight purchases. Card ${card.toUpperCase()} has ${need} spaces and ${given} already stamped. About ${done}% of customers completed it.`, `Beide Karten brauchen acht Käufe. Karte ${card.toUpperCase()} hat ${need} Felder, davon ${given} schon abgestempelt. Etwa ${done} % der Kunden füllten sie vollständig.`)}</desc>
        {Array.from({ length: need }, (_, i) => {
          const pre = i < given;
          const x = 14 + i * 50;
          return (
            <g key={i}>
              <circle cx={x + 18} cy="34" r="19" fill={pre ? NAMED.soft : NAMED.paper} stroke={pre ? NAMED.amber : NAMED.ink} strokeWidth={pre ? 2.4 : 1.6} strokeDasharray={pre ? undefined : "5 4"} />
              <text x={x + 18} y="39" textAnchor="middle" fontSize="13" fontWeight="700" fill={pre ? NAMED.amber : NAMED.ash}>{pre ? "●" : String(i + 1 - given)}</text>
            </g>
          );
        })}
        <text x="14" y="76" fontSize="12" fill={NAMED.ash}>{given > 0 ? tt("amber = already stamped · dashed = still to be earned", "bernstein = schon abgestempelt · gestrichelt = noch zu verdienen") : tt("dashed = still to be earned", "gestrichelt = noch zu verdienen")}</text>
        <text x="14" y="98" fontSize="12.5" fontWeight="700" fill={NAMED.ink}>{tt("Customers who completed the card", "Kunden, die die Karte vollständig füllten")}</text>
        <rect x="14" y="104" width="400" height="18" fill={NAMED.mist} stroke={NAMED.line} />
        <rect x="14" y="104" width={(400 * done) / 100} height="18" fill={card === "a" ? NAMED.grey : NAMED.data} stroke={NAMED.ink} className="anim-grow-x" />
        <text x={14 + (400 * done) / 100 + 8} y="118" fontSize="13" fontWeight="700" fill={NAMED.ink}>{`${done}${pc()}`}</text>
      </svg>
      <div className="space-y-1.5">
        <p className="smallcaps">{tt("Choose a card", "Eine Karte wählen")}</p>
        <Toggles<"a" | "b"> label={tt("Card", "Karte")} value={card} onChange={setCard} options={[{ id: "a", label: tt("A · 8 stamps, none given", "A · 8 Stempel, keiner vergeben") }, { id: "b", label: tt("B · 10 stamps, 2 already given", "B · 10 Stempel, 2 schon vergeben") }]} />
      </div>
      <Insight>
        {card === "a"
          ? tt("Card A asks for eight purchases from a standing start: about 19% of customers completed it (Nunes and Drèze 2006, a car-wash study). ", "Karte A verlangt acht Käufe aus dem Stand: Etwa 19 % der Kunden füllten sie vollständig (Nunes und Drèze 2006, eine Studie an einer Autowaschanlage). ")
          : tt("Card B asks for eight purchases too, but two of its ten spaces are already stamped: about 34% completed it. ", "Karte B verlangt ebenfalls acht Käufe, aber zwei ihrer zehn Felder sind schon abgestempelt: Etwa 34 % füllten sie vollständig. ")}
        {tt(
          "Both cards need the same eight purchases. The only difference is that progress already seems to be made. It is a cheap tool to start a customer moving, and it belongs to short-term activation: it does not give the customer a reason to stay in year three.",
          "Beide Karten brauchen dieselben acht Käufe. Der einzige Unterschied ist, dass schon Fortschritt gemacht scheint. Es ist ein billiges Werkzeug, einen Kunden in Bewegung zu setzen, und gehört zur kurzfristigen Aktivierung: Es gibt dem Kunden keinen Grund, im dritten Jahr zu bleiben.",
        )}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ A6 · worked tagging (Brenner) and strength */

const BRENNER_TOUCH: { id: string; need: NeedId; text: string; key: string; alt: NeedId; altWhy: string }[] = bi([
  {
    id: "x1",
    need: "relevance" as NeedId,
    text: t("The renewal letter offered a package with 500 GB more storage than the customer had ever used. Reply: “Somebody sent us the standard letter.”", "Der Renewal-Brief bot ein Paket mit 500 GB mehr Speicher, als der Kunde je genutzt hatte. Antwort: „Jemand hat uns den Standardbrief geschickt.“"),
    key: t("500 GB more storage than the customer had ever used", "500 GB mehr Speicher, als der Kunde je genutzt hatte"),
    alt: "timing" as NeedId,
    altWhy: t("The letter would not have fitted at any time. The problem is the content, not the moment.", "Der Brief hätte zu keiner Zeit gepasst. Das Problem ist der Inhalt, nicht der Zeitpunkt."),
  },
  {
    id: "x2",
    need: "trust" as NeedId,
    text: t("The onboarding plan promised a review after 30 days. It took 64. The customer stopped attending: “Your plan and your calendar disagree.”", "Der Onboarding-Plan versprach ein Review nach 30 Tagen. Es dauerte 64. Der Kunde kam nicht mehr: „Ihr Plan und Ihr Kalender widersprechen sich.“"),
    key: t("promised a review after 30 days. It took 64", "versprach ein Review nach 30 Tagen. Es dauerte 64"),
    alt: "timing" as NeedId,
    altWhy: t("The review was late, but the complaint is the broken promise, not a message that arrived at a bad moment.", "Das Review war spät, aber die Beschwerde ist das gebrochene Versprechen, nicht eine Nachricht, die im falschen Moment kam."),
  },
  {
    id: "x3",
    need: "security" as NeedId,
    text: t("After a night-time outage the customer read about it in a forum. Brenner's mail arrived the next morning. “We had no answer for our own customers.”", "Nach einem nächtlichen Ausfall las der Kunde in einem Forum davon. Die Mail von Brenner kam am nächsten Morgen. „Wir hatten keine Antwort für unsere eigenen Kunden.“"),
    key: t("read about it in a forum", "las in einem Forum davon"),
    alt: "trust" as NeedId,
    altWhy: t("The decisive words are about being left exposed during the problem, not about a promise that was broken.", "Die entscheidenden Worte handeln davon, während des Problems schutzlos gelassen zu werden, nicht von einem gebrochenen Versprechen."),
  },
  {
    id: "x4",
    need: "timing" as NeedId,
    text: t("The renewal offer arrived the day after the customer's server room flooded. “Do you think this is the week to ask?”", "Das Renewal-Angebot kam am Tag nach der Überflutung des Serverraums des Kunden. „Glauben Sie, das ist die Woche, um zu fragen?“"),
    key: t("the day after the customer's server room flooded", "am Tag nach der Überflutung des Serverraums des Kunden"),
    alt: "security" as NeedId,
    altWhy: t("The flood matters, but the customer objects to the moment the offer arrived, not to how the flood was handled.", "Die Überflutung zählt, aber der Kunde beanstandet den Zeitpunkt, zu dem das Angebot kam, nicht, wie die Überflutung behandelt wurde."),
  },
  {
    id: "x5",
    need: "belonging" as NeedId,
    text: t("A customer asked for a contact at another logistics firm on the platform. Nobody could help. “I would like to meet the others.”", "Ein Kunde bat um einen Kontakt bei einer anderen Logistikfirma auf der Plattform. Niemand konnte helfen. „Ich würde gern die anderen kennenlernen.“"),
    key: t("I would like to meet the others", "Ich würde gern die anderen kennenlernen"),
    alt: "trust" as NeedId,
    altWhy: t("The customer does not doubt the provider's word. They ask for peers.", "Der Kunde zweifelt nicht am Wort des Anbieters. Er fragt nach Gleichgesinnten."),
  },
  {
    id: "x6",
    need: "status" as NeedId,
    text: t("A ten-year customer got the same welcome pack as a new one. “Ten years, and nobody noticed.”", "Ein Kunde seit zehn Jahren bekam dasselbe Willkommenspaket wie ein neuer. „Zehn Jahre, und niemand hat es bemerkt.“"),
    key: t("Ten years, and nobody noticed", "Zehn Jahre, und niemand hat es bemerkt"),
    alt: "relevance" as NeedId,
    altWhy: t("The pack is generic, but the decisive words are about recognition of the relationship, not about fit.", "Das Paket ist generisch, aber die entscheidenden Worte handeln von der Anerkennung der Beziehung, nicht von Passung."),
  },
]);

function Marked({ text, mark }: { text: string; mark: string }) {
  const i = text.indexOf(mark);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-gold/40 px-0.5 font-semibold text-ink">{mark}</mark>
      {text.slice(i + mark.length)}
    </>
  );
}

export function TouchpointExample() {
  const [sel, setSel] = useState("x1");
  const [seen, setSeen] = useState<string[]>(["x1"]);
  const w = BRENNER_TOUCH.find((x) => x.id === sel)!;
  const b = NEEDS[w.need];
  const alt = NEEDS[w.alt];
  const pick = (id: string) => {
    setSel(id);
    setSeen((s) => (s.includes(id) ? s : [...s, id]));
  };
  return (
    <Diagram label={tt("Worked example · six touchpoints from Brenner Netzwerke, another provider (Case assumption, read-only)", "Durchgerechnetes Beispiel · sechs Touchpoints von Brenner Netzwerke, einem anderen Anbieter (Case-Annahme, nur lesen)")}>
      <ol className="grid gap-2 sm:grid-cols-2">
        {BRENNER_TOUCH.map((n, i) => {
          const on = n.id === sel;
          const opened = seen.includes(n.id);
          return (
            <li key={n.id}>
              <button
                type="button"
                onClick={() => pick(n.id)}
                aria-pressed={on}
                className={clsx("flex min-h-[48px] w-full flex-col items-start gap-1 rounded-lg border bg-paper px-3 py-2 text-left text-caption transition-colors", on ? "border-accent bg-accentSoft ring-2 ring-gold" : "border-line hover:border-ash")}
              >
                <span className="smallcaps">{`Touchpoint ${i + 1}`}</span>
                <span className="text-ink">{n.text}</span>
                {opened && <span className="pill border-signal/50 bg-signalSoft text-signal">{NEEDS[n.need].short}</span>}
              </button>
            </li>
          );
        })}
      </ol>
      <div className="mt-3 space-y-1.5 rounded-lg border border-line bg-paper p-3 text-caption" aria-live="polite">
        <p className="smallcaps">
          {tt("Need:", "Bedürfnis:")} <span className="text-accent">{b.label}</span>
        </p>
        <p>
          <span className="font-semibold text-ink">{tt("The words that give it away. ", "Die Worte, die es verraten. ")}</span>
          <Marked text={w.text} mark={w.key} />
        </p>
        <p>
          <span className="font-semibold text-ink">{tt("The test question. ", "Die Testfrage. ")}</span>
          {b.test}
        </p>
        <p>
          <span className="font-semibold text-ink">{tt(`Why not ${alt.short}? `, `Warum nicht ${alt.short}? `)}</span>
          {w.altWhy}
        </p>
      </div>
      <Insight className="mt-3">
        {tt(
          `Each touchpoint is settled by one phrase, the highlighted one, and by asking the test question of the need it points to. The tempting alternative is always a neighbour: a late review looks like bad timing and is a broken promise; a generic pack looks like poor fit and is a missing thank-you. When two fit, the pair tests above decide. You have opened ${seen.length} of 6.`,
          `Jeder Touchpoint wird durch eine Formulierung entschieden, die hervorgehobene, und dadurch, die Testfrage des Bedürfnisses zu stellen, auf das sie zeigt. Die verlockende Alternative ist immer ein Nachbar: Ein spätes Review sieht nach schlechtem Timing aus und ist ein gebrochenes Versprechen; ein generisches Paket sieht nach schlechter Passung aus und ist ein fehlender Dank. Wenn zwei passen, entscheiden die Paar-Tests oben. Sie haben ${seen.length} von 6 geöffnet.`,
        )}
      </Insight>
    </Diagram>
  );
}

const B10: { id: NeedId; tp: number; left: number }[] = [
  { id: "trust", tp: 3, left: 3 },
  { id: "relevance", tp: 4, left: 1 },
  { id: "security", tp: 2, left: 2 },
  { id: "belonging", tp: 1, left: 0 },
];

export function StrengthExample() {
  const uid = useId().replace(/:/g, "");
  const [by, setBy] = useState<"count" | "points">("count");
  const [sel, setSel] = useState<NeedId>("trust");
  const rows = B10.map((r) => ({ ...r, points: r.tp + r.left })).sort((a, b) => (by === "points" ? b.points - a.points || b.tp - a.tp : b.tp - a.tp));
  const cur = B10.find((r) => r.id === sel)!;
  const pts = cur.tp + cur.left;
  const rank = (k: "count" | "points") => [...B10].map((r) => ({ id: r.id, v: k === "points" ? r.tp + r.left : r.tp })).sort((a, b) => b.v - a.v).map((r) => NEEDS[r.id].short);
  const S = (v: number) => 130 + (v / 8) * 380;
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 180" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Strength of four needs in Brenner's ten reviewed touchpoints", "Stärke von vier Bedürfnissen in Brenners zehn geprüften Touchpoints")}</title>
        <desc id={`${uid}-d`}>{rows.map((r) => tt(`${NEEDS[r.id].short}: ${r.tp} touchpoints, ${r.left} customers left, ${r.points} points, ${STRENGTH_LABEL[strengthOf(r.points)]}`, `${NEEDS[r.id].short}: ${r.tp} Touchpoints, ${r.left} Kunden gegangen, ${r.points} Punkte, ${STRENGTH_LABEL[strengthOf(r.points)]}`)).join(". ")}</desc>
        {rows.map((r, i) => {
          const y = 8 + i * 36;
          const on = r.id === sel;
          const s = strengthOf(r.points);
          return (
            <g key={r.id}>
              <text x="4" y={y + 20} fontSize="13.5" fontWeight={on ? 800 : 700} fill={NAMED.ink}>{NEEDS[r.id].short}</text>
              <rect x={S(0)} y={y + 4} width={S(r.tp) - S(0)} height="22" fill={NAMED.data} stroke={NAMED.ink} className="anim-grow-x" />
              {by === "points" && r.left > 0 && <rect x={S(r.tp)} y={y + 4} width={S(r.left) - S(0)} height="22" fill={NAMED.soft} stroke={NAMED.amber} strokeWidth="1.6" strokeDasharray="4 3" />}
              <text x={S(by === "points" ? r.points : r.tp) + 6} y={y + 20} fontSize="12.5" fontWeight="700" fill={NAMED.ink}>{by === "points" ? `${r.points} ${tt("pts", "Pkt.")} · ${STRENGTH_LABEL[s]}` : `${r.tp} touchpoints`}</text>
              {on && <rect x="0" y={y} width="556" height="30" fill="none" stroke={NAMED.gold} strokeWidth="2" rx="4" />}
            </g>
          );
        })}
        <text x={S(0)} y="172" fontSize="11.5" fill={NAMED.ash}>{tt("solid = touchpoints · dashed amber = of those, a customer left (added in “points”)", "durchgezogen = Touchpoints · gestrichelt bernstein = davon ging ein Kunde (in „Punkten“ dazugerechnet)")}</text>
      </svg>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <p className="smallcaps">{tt("Rank the needs by", "Bedürfnisse ordnen nach")}</p>
          <Toggles<"count" | "points"> label={tt("Ranking basis", "Grundlage der Rangfolge")} value={by} onChange={setBy} options={[{ id: "count", label: tt("Touchpoints only", "Nur Touchpoints") }, { id: "points", label: tt("Touchpoints + customers who left (points)", "Touchpoints + abgewanderte Kunden (Punkte)") }]} />
        </div>
        <div className="space-y-1.5">
          <p className="smallcaps">{tt("Read one need", "Ein Bedürfnis lesen")}</p>
          <Toggles<NeedId> label={tt("Need", "Bedürfnis")} value={sel} onChange={setSel} options={B10.map((r) => ({ id: r.id, label: NEEDS[r.id].short }))} />
        </div>
      </div>
      <Insight>
        {tt(
          `${NEEDS[sel].short}: ${cur.tp} touchpoint${cur.tp > 1 ? "s" : ""} + ${cur.left} customer${cur.left === 1 ? "" : "s"} who left = ${pts} points, which is ${STRENGTH_LABEL[strengthOf(pts)]}. `,
          `${NEEDS[sel].short}: ${cur.tp} Touchpoint${cur.tp > 1 ? "s" : ""} + ${cur.left} ${cur.left === 1 ? "Kunde" : "Kunden"}, die gegangen ${cur.left === 1 ? "ist" : "sind"} = ${pts} Punkte, das ist ${STRENGTH_LABEL[strengthOf(pts)]}. `,
        )}
        {by === "count"
          ? tt(`Counting touchpoints only, the order is ${rank("count").join(", ")}: Relevance comes first because it appears most often.`, `Zählt man nur Touchpoints, ist die Reihenfolge ${rank("count").join(", ")}: Relevanz steht vorn, weil sie am häufigsten vorkommt.`)
          : tt(
              `Adding the customers who left, the order is ${rank("points").join(", ")}: Trust moves above Relevance, because all three of its touchpoints ended with a customer leaving and only one of Relevance's did. A need that costs customers is stronger than one that only annoys them, even when it is not more frequent.`,
              `Rechnet man die abgewanderten Kunden dazu, ist die Reihenfolge ${rank("points").join(", ")}: Vertrauen rückt über Relevanz, weil alle drei seiner Touchpoints damit endeten, dass ein Kunde ging, bei Relevanz nur einer. Ein Bedürfnis, das Kunden kostet, ist stärker als eines, das sie nur ärgert, auch wenn es nicht häufiger ist.`,
            )}
      </Insight>
      <div className="rounded-lg border border-line bg-paper p-3.5 text-caption">
        <p className="smallcaps">{tt("The rule", "Die Regel")}</p>
        <Bul
          items={[
            tt("Points = number of touchpoints with the need + number of those followed by a customer leaving.", "Punkte = Zahl der Touchpoints mit dem Bedürfnis + Zahl derer, auf die ein Kunde ging."),
            tt("5 or more points is High, 3 to 4 is Mid, 2 or fewer is Low.", "5 oder mehr Punkte sind Hoch, 3 bis 4 Mittel, 2 oder weniger Niedrig."),
            tt("The four needs with the most touchpoints are the central ones. Break a tie with the customers who left.", "Die vier Bedürfnisse mit den meisten Touchpoints sind die zentralen. Entscheiden Sie einen Gleichstand mit den abgewanderten Kunden."),
          ]}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ A7 · scoring: Brenner's three measures */

type BM = { id: string; name: string; cost: number; weeks: number; needs: string; data: "none" | "consented"; dataLabel: string; effort: "semi" | "auto"; effortLabel: string; eff: 1 | 2 | 3; acc: 1 | 2 | 3 };
const BM_TXT = bi({
  p: { name: t("Peer call programme", "Peer-Call-Programm"), needs: t("Two customers agree to be named.", "Zwei Kunden stimmen einer Nennung zu."), dataLabel: t("No customer data", "Keine Kundendaten"), effortLabel: t("A call per extra customer", "Ein Anruf pro zusätzlichem Kunden") },
  q: { name: t("Usage-based offers, opt-in only", "Nutzungsbasierte Angebote, nur mit Opt-in"), needs: t("A data-protection review; reaches 480 customers.", "Eine Datenschutzprüfung; erreicht 480 Kunden."), dataLabel: t("Usage data of customers who agreed", "Nutzungsdaten von Kunden, die zugestimmt haben"), effortLabel: t("Nothing once built", "Nichts, sobald gebaut") },
  r: { name: t("3% rebate for members", "3 % Rabatt für Mitglieder"), needs: t("Nothing: it can start at once.", "Nichts: Er kann sofort starten."), dataLabel: t("No customer data", "Keine Kundendaten"), effortLabel: t("Nothing once built", "Nichts, sobald gebaut") },
});
const bmStart = (): BM[] => [
  { id: "p", name: BM_TXT.p.name, cost: 20000, weeks: 6, needs: BM_TXT.p.needs, data: "none", dataLabel: BM_TXT.p.dataLabel, effort: "semi", effortLabel: BM_TXT.p.effortLabel, eff: 3, acc: 3 },
  { id: "q", name: BM_TXT.q.name, cost: 30000, weeks: 12, needs: BM_TXT.q.needs, data: "consented", dataLabel: BM_TXT.q.dataLabel, effort: "auto", effortLabel: BM_TXT.q.effortLabel, eff: 2, acc: 2 },
  { id: "r", name: BM_TXT.r.name, cost: 72000, weeks: 1, needs: BM_TXT.r.needs, data: "none", dataLabel: BM_TXT.r.dataLabel, effort: "auto", effortLabel: BM_TXT.r.effortLabel, eff: 1, acc: 3 },
];
const BUD_B = 100000;
const CAP: Record<BM["data"], 1 | 2 | 3> = { none: 3, consented: 2 };
const SCA: Record<BM["effort"], 1 | 2 | 3> = { semi: 2, auto: 3 };

export function ScoreExample() {
  const uid = useId().replace(/:/g, "");
  // Only the numbers are state; names and labels are read from the active language on every render.
  const [nums, setNums] = useState<Record<string, { eff: 1 | 2 | 3; acc: 1 | 2 | 3 }>>({ p: { eff: 3, acc: 3 }, q: { eff: 2, acc: 2 }, r: { eff: 1, acc: 3 } });
  const rows = bmStart().map((r) => ({ ...r, ...nums[r.id] }));
  const [inc, setInc] = useState<string[]>(["p", "q", "r"]);
  const [noteId, setNoteId] = useState<string | null>(null);
  const cycle = (id: string, f: "eff" | "acc") => {
    const r = rows.find((x) => x.id === id);
    if (!r) return;
    const next = ((r[f] % 3) + 1) as 1 | 2 | 3;
    if (f === "acc" && next > CAP[r.data]) {
      setNoteId(id);
      setNums({ ...nums, [id]: { ...nums[id], acc: 1 } });
      return;
    }
    setNoteId(null);
    setNums({ ...nums, [id]: { ...nums[id], [f]: next } });
  };
  const noteRow = noteId ? rows.find((x) => x.id === noteId) : undefined;
  const note = noteRow
    ? tt(
        `${noteRow.name}: the data it uses (${noteRow.dataLabel.toLowerCase()}) caps acceptance at ${CAP[noteRow.data]}, so the score goes back to 1.`,
        `${noteRow.name}: Die Daten, die sie nutzt (${noteRow.dataLabel}), deckeln die Akzeptanz bei ${CAP[noteRow.data]}, der Wert springt also auf 1 zurück.`,
      )
    : "";
  const toggle = (id: string) => setInc((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  const scored = rows.map((r) => ({ ...r, sca: SCA[r.effort], score: r.eff * r.acc * SCA[r.effort] }));
  const chosen = scored.filter((r) => inc.includes(r.id));
  const total = chosen.reduce((s, r) => s + r.cost, 0);
  const over = total - BUD_B;
  const lowest = [...chosen].sort((a, b) => a.score - b.score)[0];
  const S = (v: number) => 8 + (v / (BUD_B * 1.5)) * 544;
  let acc = 0;
  const segs = chosen.map((r) => {
    const s = { r, from: acc, to: acc + r.cost };
    acc += r.cost;
    return s;
  });
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[40rem] border-collapse text-caption">
          <caption className="sr-only">{tt("Three measures of Brenner Netzwerke scored on effect, acceptance and scalability", "Drei Maßnahmen von Brenner Netzwerke, bewertet nach Wirkung, Akzeptanz und Skalierbarkeit")}</caption>
          <thead>
            <tr className="bg-mist text-left text-micro uppercase text-ash">
              <th className="px-3 py-2">{tt("In the plan", "Im Plan")}</th>
              <th className="px-3 py-2">{tt("Measure", "Maßnahme")}</th>
              <th className="px-3 py-2">{tt("Cost · weeks", "Kosten · Wochen")}</th>
              <th className="px-3 py-2">{tt("Effect", "Wirkung")}</th>
              <th className="px-3 py-2">{tt("Acceptance (cap)", "Akzeptanz (Deckel)")}</th>
              <th className="px-3 py-2">{tt("Scalability", "Skalierbarkeit")}</th>
              <th className="px-3 py-2 text-right">{tt("Score", "Wert")}</th>
            </tr>
          </thead>
          <tbody>
            {scored.map((r) => (
              <tr key={r.id} className={clsx("border-t border-line align-top", !inc.includes(r.id) && "opacity-60")}>
                <td className="px-3 py-2">
                  <input type="checkbox" checked={inc.includes(r.id)} onChange={() => toggle(r.id)} aria-label={tt(`Include ${r.name}`, `${r.name} einbeziehen`)} className="h-5 w-5 accent-[#8A5A0B]" />
                </td>
                <td className="px-3 py-2">
                  <span className="font-semibold">{r.name}</span>
                  <br />
                  <span className="text-ash">{r.needs}</span>
                  <br />
                  <span className="text-ash">{tt("Data:", "Daten:")} {r.dataLabel}</span>
                </td>
                <td className="tnum px-3 py-2">
                  {euro(r.cost)} · {r.weeks} {tt("wk", "Wo.")}
                </td>
                <td className="px-3 py-2">
                  <button type="button" onClick={() => cycle(r.id, "eff")} className="btn-ghost btn-sm min-w-[3rem]" aria-label={tt(`Effect of ${r.name}: ${r.eff}. Click to change.`, `Wirkung von ${r.name}: ${r.eff}. Zum Ändern klicken.`)}>
                    {r.eff}
                  </button>
                </td>
                <td className="px-3 py-2">
                  <button type="button" onClick={() => cycle(r.id, "acc")} className="btn-ghost btn-sm min-w-[3rem]" aria-label={tt(`Acceptance of ${r.name}: ${r.acc}, at most ${CAP[r.data]}. Click to change.`, `Akzeptanz von ${r.name}: ${r.acc}, höchstens ${CAP[r.data]}. Zum Ändern klicken.`)}>
                    {r.acc}
                  </button>
                  <span className="ml-1.5 text-ash">{tt("max", "max.")} {CAP[r.data]}</span>
                </td>
                <td className="tnum px-3 py-2">
                  {r.sca}
                  <span className="ml-1.5 text-ash">{r.effortLabel.toLowerCase()}</span>
                </td>
                <td className="tnum px-3 py-2 text-right font-bold">{r.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && (
        <p role="status" className="rounded-md border border-gold bg-accentSoft px-3 py-2 text-caption text-ink">
          {note}
        </p>
      )}
      <svg viewBox="0 0 560 84" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt(`Budget check against ${euro(BUD_B)}`, `Budgetprüfung gegen ${euro(BUD_B)}`)}</title>
        <desc id={`${uid}-d`}>{tt(`${chosen.length} measures in the plan cost ${euro(total)} against a budget of ${euro(BUD_B)}${over > 0 ? `, ${euro(over)} over` : ""}.`, `${chosen.length} Maßnahmen im Plan kosten ${euro(total)} bei einem Budget von ${euro(BUD_B)}${over > 0 ? `, ${euro(over)} darüber` : ""}.`)}</desc>
        <defs>
          <pattern id={`${uid}-over`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="7" height="7" fill={NAMED.soft} />
            <line x1="0" y1="0" x2="0" y2="7" stroke={NAMED.amber} strokeWidth="2.8" />
          </pattern>
        </defs>
        <rect x={S(0)} y="22" width={S(BUD_B * 1.5) - S(0)} height="30" fill={NAMED.mist} stroke={NAMED.line} />
        {segs.map(({ r, from, to }, i) => (
          <g key={r.id}>
            <rect x={S(from)} y="22" width={S(to) - S(from)} height="30" fill={i % 2 ? NAMED.grey : NAMED.data} stroke={NAMED.ink} />
            <text x={S(from) + (S(to) - S(from)) / 2} y="42" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={NAMED.paper}>{r.name.split(" ")[0]}</text>
          </g>
        ))}
        {over > 0 && <rect x={S(BUD_B)} y="22" width={S(total) - S(BUD_B)} height="30" fill={`url(#${uid}-over)`} stroke={NAMED.amber} strokeWidth="1.6" />}
        <line x1={S(BUD_B)} x2={S(BUD_B)} y1="12" y2="62" stroke={NAMED.ink} strokeWidth="2.2" />
        <text x={S(BUD_B)} y="9" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={NAMED.ink}>{`Budget ${euro(BUD_B)}`}</text>
        <text x="8" y="78" fontSize="12" fill={NAMED.ash}>{tt(`Plan ${euro(total)}`, `Plan ${euro(total)}`)}</text>
        {over > 0 && <text x="552" y="78" textAnchor="end" fontSize="12.5" fontWeight="700" fill={NAMED.amber}>{tt(`${euro(over)} over`, `${euro(over)} darüber`)}</text>}
      </svg>
      <Insight>
        {over > 0
          ? tt(
              `The plan costs ${euro(total)}, which is ${euro(over)} over the ${euro(BUD_B)} budget. The rule is to leave out the measure with the lowest score, which here is ${lowest ? `“${lowest.name}” with ${lowest.score}` : "none"}. `,
              `Der Plan kostet ${euro(total)}, das sind ${euro(over)} über dem Budget von ${euro(BUD_B)}. Die Regel ist, die Maßnahme mit dem niedrigsten Wert wegzulassen, hier ${lowest ? `„${lowest.name}“ mit ${lowest.score}` : "keine"}. `,
            )
          : tt(`The plan costs ${euro(total)} and fits the ${euro(BUD_B)} budget with ${euro(-over)} to spare. `, `Der Plan kostet ${euro(total)} und passt mit ${euro(-over)} Reserve in das Budget von ${euro(BUD_B)}. `)}
        {tt(
          `The score multiplies three numbers, so a 1 in any of them pulls it down hard. Acceptance cannot be pushed above what the data allows: try to raise it on the usage-based offers and it snaps back. Scalability is not judged either: a call for every extra customer scores 2, a message that costs nothing once built scores 3.`,
          `Der Wert multipliziert drei Zahlen, eine 1 in einer davon zieht ihn also stark nach unten. Die Akzeptanz kann nicht über das hinaus erhöht werden, was die Daten erlauben: Versuchen Sie es bei den nutzungsbasierten Angeboten, und sie springt zurück. Auch die Skalierbarkeit wird nicht beurteilt: Ein Anruf für jeden zusätzlichen Kunden ergibt 2, eine Nachricht, die nach dem Bau nichts mehr kostet, ergibt 3.`,
        )}
      </Insight>
    </div>
  );
}

type BB = { id: string; name: string; type: LoyType; per: number; acts: string };
const bbAll = (): BB[] =>
  bi([
    { id: "line", name: t("Priority line with a named contact", "Prioritäts-Hotline mit namentlichem Ansprechpartner"), type: "service" as LoyType, per: 140, acts: t("Trust, security", "Vertrauen, Sicherheit") },
    { id: "review", name: t("Yearly capacity and security review", "Jährliches Kapazitäts- und Sicherheitsreview"), type: "service" as LoyType, per: 100, acts: t("Security, relevance", "Sicherheit, Relevanz") },
    { id: "round", name: t("Round table with peers", "Round Table mit Gleichgesinnten"), type: "community" as LoyType, per: 50, acts: t("Belonging", "Zugehörigkeit") },
    { id: "rebate", name: t("5% rebate on the annual fee", "5 % Rabatt auf die Jahresgebühr"), type: "bonus" as LoyType, per: 270, acts: t("No need", "Kein Bedürfnis") },
  ]);
const BB_MEMBERS = 400;
const BB_SETUP = 12000;
const typeName = (x: LoyType) => ({ bonus: tt("bonus", "Bonus"), service: tt("service", "Service"), community: tt("community", "Community") })[x];

export function LoyaltyExample() {
  const [ids, setIds] = useState<string[]>(["round", "review"]);
  const toggle = (id: string) => setIds((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length >= 2 ? c : [...c, id]));
  const all = bbAll();
  const chosen = all.filter((b) => ids.includes(b.id));
  const perYear = chosen.reduce((s, b) => s + b.per, 0);
  const cost = BB_SETUP + BB_MEMBERS * perYear * 0.5;
  const bonuses = chosen.filter((b) => b.type === "bonus").length;
  const types = [...new Set(chosen.map((b) => b.type))];
  return (
    <div className="space-y-3">
      <p className="text-caption text-ash">{tt(`Brenner Netzwerke expects ${BB_MEMBERS} members in the first year and a set-up cost of ${euro(BB_SETUP)}. Choose two benefits (a third is refused: remove one first).`, `Brenner Netzwerke erwartet im ersten Jahr ${BB_MEMBERS} Mitglieder und Aufbaukosten von ${euro(BB_SETUP)}. Wählen Sie zwei Vorteile (ein dritter wird abgelehnt: Entfernen Sie zuerst einen).`)}</p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {all.map((b) => {
          const on = ids.includes(b.id);
          return (
            <li key={b.id}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => toggle(b.id)}
                className={clsx("flex min-h-[48px] w-full flex-col items-start rounded-lg border px-3 py-2 text-left text-caption", on ? "border-accent bg-accentSoft ring-2 ring-gold" : "border-line bg-paper hover:border-ash")}
              >
                <span className="font-semibold text-ink">
                  {on ? "☑ " : "☐ "}
                  {b.name}
                </span>
                <span className="text-ash">
                  {typeName(b.type)} · {euro(b.per)} {tt("per member per year", "pro Mitglied und Jahr")} · {tt("acts on:", "wirkt auf:")} {b.acts}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="rounded-lg border border-line bg-paper p-3.5 text-caption" aria-live="polite">
        <p className="smallcaps">{tt("The four tests, applied to your two", "Die vier Tests, angewandt auf Ihre zwei")}</p>
        <ul className="mt-1.5 space-y-1">
          <li>
            <span className="font-semibold text-ink">{tt("Type test. ", "Typ-Test. ")}</span>
            {chosen.length === 0 ? tt("Choose a benefit.", "Wählen Sie einen Vorteil.") : tt(`The benefits are of the type ${types.map(typeName).join(" and ")}. The main type of the concept must be one of them.`, `Die Vorteile sind vom Typ ${types.map(typeName).join(" und ")}. Der Haupttyp des Konzepts muss einer davon sein.`)}
          </li>
          <li>
            <span className="font-semibold text-ink">{tt("Benefit test. ", "Vorteils-Test. ")}</span>
            {chosen.length < 2
              ? tt("Choose two benefits.", "Wählen Sie zwei Vorteile.")
              : bonuses >= 2
                ? tt("Both are money: the concept would fall apart the day the discount stopped.", "Beide sind Geld: Das Konzept fiele an dem Tag auseinander, an dem der Rabatt endet.")
                : bonuses === 1
                  ? tt("One is money. That is allowed, if the other would still be wanted without a discount.", "Einer ist Geld. Das ist erlaubt, wenn der andere auch ohne Rabatt noch gewollt würde.")
                  : tt("None is money: both would still be wanted if the discount disappeared.", "Keiner ist Geld: Beide würden noch gewollt, wenn der Rabatt wegfiele.")}
          </li>
          <li>
            <span className="font-semibold text-ink">{tt("Cost. ", "Kosten. ")}</span>
            {euro(BB_SETUP)} {tt("set-up", "Aufbau")} + {BB_MEMBERS} {tt("members", "Mitglieder")} × {euro(perYear)} × 6 ÷ 12 = <strong className="tnum">{euro(cost)}</strong> {tt("for six months.", "für sechs Monate.")}
          </li>
        </ul>
      </div>
      <Insight>
        {chosen.length < 2
          ? tt("Choose two benefits to see what the concept costs and which tests it passes. ", "Wählen Sie zwei Vorteile, um zu sehen, was das Konzept kostet und welche Tests es besteht. ")
          : tt(
              `The concept costs ${euro(cost)} for six months. ${bonuses >= 2 ? "Both benefits are bonuses, so the cost repeats on every member and buys nothing that lasts. " : "The two benefits reach different needs, and neither is a discount on every member. "}`,
              `Das Konzept kostet ${euro(cost)} für sechs Monate. ${bonuses >= 2 ? "Beide Vorteile sind Boni, die Kosten fallen also bei jedem Mitglied wieder an und kaufen nichts, was hält. " : "Die zwei Vorteile erreichen verschiedene Bedürfnisse, und keiner ist ein Rabatt für jedes Mitglied. "}`,
            )}
        {tt(
          "Notice that the rebate is the most expensive benefit per member and acts on none of the needs in the evidence: it is the discount trap in a single row.",
          "Beachten Sie, dass der Rabatt der teuerste Vorteil pro Mitglied ist und auf keines der Bedürfnisse in den Belegen wirkt: Er ist die Rabattfalle in einer einzigen Zeile.",
        )}
      </Insight>
    </div>
  );
}
