import { bi, t, tt } from "@/lib/lang";

/**
 * Route 2 (Level 3) data: the Transfer Project. CloudTech's Chief Customer Officer builds a long-term customer strategy that joins
 * psychology, data and strategy. Every figure below is a Case assumption (the plan gives the role, the situation and the constraints,
 * not numbers). `truth` / `accept` / model values are used only by the checks, the answer keys and the worked answers; they are never
 * printed to a learner.
 */

export const R2_BUDGET = 240000;
export const R2_MONTHS = 12;

export type ModelOption = { id: string; label: string };

/* ------------------------------------------------------------------ 3.1 · the target vision */

export type VisionId = "trusted" | "recommended" | "cheapest" | "everything" | "points";
export const VISIONS: { id: VisionId; label: string; detail: string; defends: boolean; why: string; rejected: string }[] = bi([
  {
    id: "trusted" as VisionId,
    label: t("The provider customers would choose again even if switching were easy", "Der Anbieter, für den sich Kunden wieder entscheiden würden, auch wenn ein Wechsel leicht wäre"),
    detail: t(
      "Customers feel safe with CloudTech, know who is looking after them and receive offers that fit them.",
      "Kunden fühlen sich bei CloudTech sicher, wissen, wer sich um sie kümmert, und erhalten Angebote, die zu ihnen passen.",
    ),
    defends: true,
    why: t(
      "It is an outcome in the customer's head and in their behaviour (choosing again), it needs the three levers of emotion, trust and relevance, and it can be observed in renewals.",
      "Es ist ein Ergebnis im Kopf des Kunden und in seinem Verhalten (sich wieder entscheiden), es braucht die drei Hebel Emotion, Vertrauen und Relevanz, und es lässt sich an Renewals beobachten.",
    ),
    rejected: "",
  },
  {
    id: "recommended" as VisionId,
    label: t("The provider customers recommend to peers in their industry", "Der Anbieter, den Kunden Kollegen in ihrer Branche empfehlen"),
    detail: t(
      "Customers are proud of the choice and would put their name to it in front of others.",
      "Kunden sind stolz auf die Wahl und würden vor anderen dafür ihren Namen hergeben.",
    ),
    defends: true,
    why: t(
      "A recommendation is a strong behaviour that follows from trust and standing. It defends as a vision, but it is harder to observe early than a renewal.",
      "Eine Empfehlung ist ein starkes Verhalten, das aus Vertrauen und Ansehen folgt. Sie trägt als Vision, ist aber früh schwerer zu beobachten als ein Renewal.",
    ),
    rejected: "",
  },
  {
    id: "cheapest" as VisionId,
    label: t("The cheapest cloud provider for Mittelstand companies", "Der günstigste Cloud-Anbieter für den Mittelstand"),
    detail: t("Win and keep customers on price.", "Kunden über den Preis gewinnen und halten."),
    defends: false,
    why: "",
    rejected: t(
      "A price position is easy to copy, invites the very comparison that hurts CloudTech today and says nothing about how customers feel.",
      "Eine Preisposition ist leicht zu kopieren, lädt genau den Vergleich ein, der CloudTech heute schadet, und sagt nichts darüber, wie sich Kunden fühlen.",
    ),
  },
  {
    id: "everything" as VisionId,
    label: t("Every customer gets a fully individual offer in real time, built from all the data we hold", "Jeder Kunde bekommt in Echtzeit ein vollständig individuelles Angebot, gebaut aus allen Daten, die wir haben"),
    detail: t("Maximum personalisation everywhere.", "Maximale Personalisierung überall."),
    defends: false,
    why: "",
    rejected: t(
      "A tactic, not an outcome. It needs data customers have not agreed to give, and personalising beyond what customers accept makes them feel watched.",
      "Eine Taktik, kein Ergebnis. Sie braucht Daten, denen Kunden nicht zugestimmt haben, und Personalisierung über das hinaus, was Kunden akzeptieren, lässt sie sich beobachtet fühlen.",
    ),
  },
  {
    id: "points" as VisionId,
    label: t("The provider with the most loyalty points earned per customer", "Der Anbieter mit den meisten gesammelten Loyalty-Punkten pro Kunde"),
    detail: t("Build the programme with the highest participation in points.", "Das Programm mit der höchsten Teilnahme an Punkten aufbauen."),
    defends: false,
    why: "",
    rejected: t(
      "It measures the reward, not the loyalty. Points can be earned by customers who plan to leave.",
      "Es misst die Belohnung, nicht die Loyalität. Punkte können auch Kunden sammeln, die gehen wollen.",
    ),
  },
]);
export const VISION_BY_ID = Object.fromEntries(VISIONS.map((v) => [v.id, v])) as Record<VisionId, (typeof VISIONS)[number]>;
export const MODEL_VISION: VisionId = "trusted";

/* ------------------------------------------------------------------ 3.2 · the three behaviour levers */

export type PhaseId = "onboarding" | "usage" | "renewal";
export const PHASE_IDS: PhaseId[] = ["onboarding", "usage", "renewal"];
export const PHASES: Record<PhaseId, { id: PhaseId; name: string; hint: string }> = bi({
  onboarding: { id: "onboarding" as PhaseId, name: t("Onboarding", "Onboarding"), hint: t("From signing to the 90-day review: the customer tests whether the promises hold.", "Von der Unterschrift bis zum 90-Tage-Review: Der Kunde prüft, ob die Versprechen halten.") },
  usage: { id: "usage" as PhaseId, name: t("Usage", "Nutzung"), hint: t("The long middle: the customer runs their business on the platform.", "Die lange Mitte: Der Kunde betreibt sein Geschäft auf der Plattform.") },
  renewal: { id: "renewal" as PhaseId, name: t("Renewal", "Renewal"), hint: t("The last 120 days of the term: the customer decides whether to stay.", "Die letzten 120 Tage der Laufzeit: Der Kunde entscheidet, ob er bleibt.") },
});

export type LeverKind = "emotion" | "trust" | "relevance";
export const LEVER_KINDS: LeverKind[] = ["emotion", "trust", "relevance"];

export type BehaviourLever = {
  id: LeverKind;
  name: string;
  hint: string;
  questions: ModelOption[];
  questionTruth: string;
  signals: ModelOption[];
  signalTruth: string;
  /** The phases in which the lever dominates. */
  phaseAccept: PhaseId[];
  why: string;
};

export const BEHAVIOUR_LEVERS: BehaviourLever[] = bi([
  {
    id: "emotion" as LeverKind,
    name: t("Emotion", "Emotion"),
    hint: t("How safe, recognised and looked after the customer feels.", "Wie sicher, anerkannt und umsorgt sich der Kunde fühlt."),
    questions: [
      { id: "em1", label: t("Do I feel safe, recognised and looked after with this provider?", "Fühle ich mich bei diesem Anbieter sicher, anerkannt und umsorgt?") },
      { id: "em2", label: t("Which package has the most features for the price?", "Welches Paket hat die meisten Funktionen für den Preis?") },
      { id: "em3", label: t("Where do I sign?", "Wo unterschreibe ich?") },
    ],
    questionTruth: "em1",
    signals: [
      { id: "ems1", label: t("Renewals happen on the auto-renew date with no conversation, and invitations to talk or to events go unanswered.", "Renewals laufen am Datum der automatischen Verlängerung ohne Gespräch, und Einladungen zu Gesprächen oder Veranstaltungen bleiben unbeantwortet.") },
      { id: "ems2", label: t("Customers open the monthly newsletter.", "Kunden öffnen den monatlichen Newsletter.") },
      { id: "ems3", label: t("Customers download the invoice each month.", "Kunden laden jeden Monat die Rechnung herunter.") },
    ],
    signalTruth: "ems1",
    phaseAccept: ["renewal", "usage"] as PhaseId[],
    why: t(
      "Feelings show as silence. A customer who feels nothing for the provider does not answer, does not come and does not argue: they leave quietly at the end of the term.",
      "Gefühle zeigen sich als Schweigen. Ein Kunde, der nichts für den Anbieter empfindet, antwortet nicht, kommt nicht und streitet nicht: Er geht still am Ende der Laufzeit.",
    ),
  },
  {
    id: "trust" as LeverKind,
    name: t("Trust", "Vertrauen"),
    hint: t("Whether the customer can rely on CloudTech's word, also when it costs CloudTech.", "Ob der Kunde sich auf das Wort von CloudTech verlassen kann, auch wenn es CloudTech etwas kostet."),
    questions: [
      { id: "tr1", label: t("Can I rely on them to do what they say, also when it costs them?", "Kann ich mich darauf verlassen, dass sie tun, was sie sagen, auch wenn es sie etwas kostet?") },
      { id: "tr2", label: t("How many users can the platform hold?", "Wie viele Nutzer fasst die Plattform?") },
      { id: "tr3", label: t("What is the price per gigabyte?", "Was kostet ein Gigabyte?") },
    ],
    questionTruth: "tr1",
    signals: [
      { id: "trs1", label: t("Customers ask for every promise in writing and want a second offer before they agree.", "Kunden wollen jedes Versprechen schriftlich und verlangen ein zweites Angebot, bevor sie zustimmen.") },
      { id: "trs2", label: t("Customers attend the yearly summit.", "Kunden besuchen den jährlichen Gipfel.") },
      { id: "trs3", label: t("Customers ask for a bigger discount.", "Kunden fragen nach einem größeren Rabatt.") },
    ],
    signalTruth: "trs1",
    phaseAccept: ["onboarding"] as PhaseId[],
    why: t(
      "Trust is built first, in the weeks when promises are tested: the go-live date, the first review. A customer who has to ask for everything in writing does not yet trust.",
      "Vertrauen entsteht zuerst, in den Wochen, in denen Versprechen geprüft werden: das Go-live-Datum, das erste Review. Ein Kunde, der alles schriftlich verlangen muss, vertraut noch nicht.",
    ),
  },
  {
    id: "relevance" as LeverKind,
    name: t("Relevance", "Relevanz"),
    hint: t("Whether what CloudTech sends and offers fits this customer's own situation, right now.", "Ob das, was CloudTech sendet und anbietet, zur eigenen Situation dieses Kunden passt, jetzt."),
    questions: [
      { id: "re1", label: t("Does this fit my business, as it is right now?", "Passt das zu meinem Geschäft, so wie es gerade ist?") },
      { id: "re2", label: t("Who else uses this?", "Wer nutzt das noch?") },
      { id: "re3", label: t("Is there a cheaper contract?", "Gibt es einen günstigeren Vertrag?") },
    ],
    questionTruth: "re1",
    signals: [
      { id: "res1", label: t("Customers reply “not for us” or ask to be taken off the list, and offers that are sent are ignored.", "Kunden antworten „nichts für uns“ oder bitten, aus dem Verteiler genommen zu werden, und gesendete Angebote werden ignoriert.") },
      { id: "res2", label: t("Customers renew without asking any questions.", "Kunden verlängern, ohne Fragen zu stellen.") },
      { id: "res3", label: t("Customers ask for a copy of the invoice.", "Kunden bitten um eine Kopie der Rechnung.") },
    ],
    signalTruth: "res1",
    phaseAccept: ["usage", "renewal"] as PhaseId[],
    why: t(
      "Relevance shows in how the customer treats what CloudTech sends. It is judged during use, when there is data about what they really do, and again at renewal.",
      "Relevanz zeigt sich darin, wie der Kunde mit dem umgeht, was CloudTech sendet. Sie wird in der Nutzung beurteilt, wenn es Daten darüber gibt, was er wirklich tut, und noch einmal beim Renewal.",
    ),
  },
]);
export const LEVER_BY_KIND = Object.fromEntries(BEHAVIOUR_LEVERS.map((l) => [l.id, l])) as Record<LeverKind, BehaviourLever>;

/* ------------------------------------------------------------------ 3.3 · the personalisation ladder */

export type LevelId = "l0" | "l1" | "l2" | "l3" | "l4";
export const LEVEL_IDS: LevelId[] = ["l0", "l1", "l2", "l3", "l4"];
export type Level = {
  id: LevelId;
  n: 0 | 1 | 2 | 3 | 4;
  name: string;
  what: string;
  data: string;
  /** Cost to build this level from nothing, for twelve months (each level needs the one below it), €. */
  cost: number;
  /** Illustrative response rate: the share of customers reached who act on the message, %. */
  rate: number;
  risk: string;
};
export const LEVELS: Level[] = bi([
  { id: "l0" as LevelId, n: 0 as const, name: t("One message for all", "Eine Nachricht für alle"), what: t("The same message to every customer and prospect.", "Dieselbe Nachricht an jeden Kunden und Interessenten."), data: t("No customer data.", "Keine Kundendaten."), cost: 6000, rate: 2, risk: t("Low. The risk is being ignored.", "Niedrig. Das Risiko ist, ignoriert zu werden.") },
  { id: "l1" as LevelId, n: 1 as const, name: t("By company facts", "Nach Unternehmensdaten"), what: t("Messages by industry, company size and contract tier.", "Nachrichten nach Branche, Unternehmensgröße und Vertragsstufe."), data: t("Company facts from the contract or the enquiry form.", "Unternehmensdaten aus dem Vertrag oder dem Anfrageformular."), cost: 24000, rate: 4, risk: t("Low. It uses facts the customer gave for this relationship.", "Niedrig. Es nutzt Angaben, die der Kunde für diese Beziehung gemacht hat.") },
  { id: "l2" as LevelId, n: 2 as const, name: t("By role and contract", "Nach Rolle und Vertrag"), what: t("Messages by the contact's role, the products bought and the term.", "Nachrichten nach der Rolle des Ansprechpartners, den gekauften Produkten und der Laufzeit."), data: t("Contact role, products and term: customers only.", "Rolle des Ansprechpartners, Produkte und Laufzeit: nur Kunden."), cost: 48000, rate: 6, risk: t("Low to mid. It needs care with named contacts, who are personal data.", "Niedrig bis mittel. Bei namentlich genannten Ansprechpartnern ist Sorgfalt nötig, denn sie sind personenbezogene Daten.") },
  { id: "l3" as LevelId, n: 3 as const, name: t("By consented usage", "Nach eingewilligter Nutzung"), what: t("Offers built from the customer's own usage, at the right moment.", "Angebote, die aus der eigenen Nutzung des Kunden gebaut werden, im richtigen Moment."), data: t("Usage data of customers who agreed to usage analysis and have twelve months of it.", "Nutzungsdaten von Kunden, die der Nutzungsanalyse zugestimmt haben und zwölf Monate davon haben."), cost: 75000, rate: 10, risk: t("Mid. Consent can be withdrawn, and an offer too close to what the customer did can feel like watching.", "Mittel. Die Einwilligung kann widerrufen werden, und ein Angebot zu nah an dem, was der Kunde getan hat, kann sich wie Beobachtung anfühlen.") },
  { id: "l4" as LevelId, n: 4 as const, name: t("Individual, in real time", "Individuell, in Echtzeit"), what: t("Every click and every use tracked across channels, an individual offer at once.", "Jeder Klick und jede Nutzung über alle Kanäle verfolgt, sofort ein individuelles Angebot."), data: t("Behaviour tracking of each person across channels. It needs a separate consent that CloudTech does not have.", "Verhaltens-Tracking jeder Person über Kanäle hinweg. Es braucht eine gesonderte Einwilligung, die CloudTech nicht hat."), cost: 190000, rate: 11, risk: t("High. It needs consent CloudTech does not hold, and customers who feel watched object.", "Hoch. Es braucht eine Einwilligung, die CloudTech nicht hat, und Kunden, die sich beobachtet fühlen, widersprechen.") },
]);
export const LEVEL_BY_ID = Object.fromEntries(LEVELS.map((l) => [l.id, l])) as Record<LevelId, Level>;

export type GroupId = "A" | "B" | "C";
export const GROUP_IDS: GroupId[] = ["A", "B", "C"];
export const GROUPS: Record<GroupId, { id: GroupId; name: string; size: number; unit: string; detail: string; holds: string; cap: LevelId; capWhy: string }> = bi({
  A: {
    id: "A" as GroupId,
    name: t("Customers who agreed to usage analysis and have twelve months of data", "Kunden, die der Nutzungsanalyse zugestimmt haben und zwölf Monate Daten haben"),
    size: 450,
    unit: t("customers", "Kunden"),
    detail: t("1,500 customers × 40% who agreed × 75% with usable data.", "1.500 Kunden × 40 %, die zugestimmt haben, × 75 % mit nutzbaren Daten."),
    holds: t(
      "CloudTech holds their contract, their contact roles and twelve months of usage data. They agreed to usage analysis.",
      "CloudTech hat deren Vertrag, deren Ansprechpartner-Rollen und zwölf Monate Nutzungsdaten. Sie haben der Nutzungsanalyse zugestimmt.",
    ),
    cap: "l3" as LevelId,
    capWhy: t(
      "They agreed to their usage being analysed, so consented usage data may be used. Nothing beyond it: tracking across channels needs another consent.",
      "Sie haben der Analyse ihrer Nutzung zugestimmt, also dürfen eingewilligte Nutzungsdaten verwendet werden. Mehr nicht: Tracking über Kanäle braucht eine weitere Einwilligung.",
    ),
  },
  B: {
    id: "B" as GroupId,
    name: t("All other customers (no consent to usage analysis, or too little data)", "Alle anderen Kunden (keine Zustimmung zur Nutzungsanalyse oder zu wenig Daten)"),
    size: 1050,
    unit: t("customers", "Kunden"),
    detail: t("The remaining 1,500 − 450 customers.", "Die übrigen 1.500 − 450 Kunden."),
    holds: t(
      "CloudTech holds their contract facts and contact roles. They did not agree to usage analysis, or have too little data.",
      "CloudTech hat deren Vertragsdaten und Ansprechpartner-Rollen. Sie haben der Nutzungsanalyse nicht zugestimmt oder haben zu wenig Daten.",
    ),
    cap: "l2" as LevelId,
    capWhy: t(
      "They did not agree to usage analysis, so their usage data may not be used for offers. Company and contract facts they gave under the contract may.",
      "Sie haben der Nutzungsanalyse nicht zugestimmt, also dürfen ihre Nutzungsdaten nicht für Angebote verwendet werden. Unternehmens- und Vertragsdaten, die sie im Rahmen des Vertrags gegeben haben, schon.",
    ),
  },
  C: {
    id: "C" as GroupId,
    name: t("Prospects in the pipeline", "Interessenten in der Pipeline"),
    size: 800,
    unit: t("prospects a year", "Interessenten pro Jahr"),
    detail: t("About 800 prospects a year, known only from an enquiry form and public company facts.", "Etwa 800 Interessenten pro Jahr, nur bekannt aus einem Anfrageformular und öffentlichen Unternehmensdaten."),
    holds: t(
      "CloudTech holds what they typed into the enquiry form and public company facts. They are not customers and have agreed to nothing.",
      "CloudTech hat, was sie ins Anfrageformular getippt haben, und öffentliche Unternehmensdaten. Sie sind keine Kunden und haben nichts zugestimmt.",
    ),
    cap: "l1" as LevelId,
    capWhy: t(
      "They are not customers yet. CloudTech holds only what they entered in an enquiry form and public company facts.",
      "Sie sind noch keine Kunden. CloudTech hat nur, was sie in ein Anfrageformular eingegeben haben, und öffentliche Unternehmensdaten.",
    ),
  },
});
export const levelIndex = (id: LevelId) => LEVEL_BY_ID[id].n;
export const responders = (group: GroupId, level: LevelId) => (GROUPS[group].size * LEVEL_BY_ID[level].rate) / 100;

/** The reference answer: each group as high as its data allows, but no higher. */
export const MODEL_LEVELS: Record<GroupId, LevelId> = { A: "l3", B: "l2", C: "l1" };

/* ------------------------------------------------------------------ 3.4 · the loyalty system */

export type SystemId = "points" | "review" | "contact" | "circle" | "refs" | "status" | "early";
export const SYSTEM_IDS: SystemId[] = ["points", "review", "contact", "circle", "refs", "status", "early"];
export type Depends = "people" | "process" | "rule" | "discount";
export type CostShape = "one-off" | "per event" | "per member";
export type Bucket = 1 | 2 | 3;
export type Criterion = "reach" | "depth" | "durability" | "scale";
export const CRITERIA: { id: Criterion; name: string; test: string; low: string; high: string }[] = bi([
  { id: "reach" as Criterion, name: t("Reach", "Reichweite"), test: t("How many customers does it touch?", "Wie viele Kunden erreicht es?"), low: t("Only some customers (members, opted-in, a size threshold).", "Nur einige Kunden (Mitglieder, mit Opt-in, eine Größenschwelle)."), high: t("Every customer who enters the process.", "Jeden Kunden, der in den Prozess eintritt.") },
  { id: "depth" as Criterion, name: t("Depth", "Tiefe"), test: t("How strongly does it change how one customer feels or behaves?", "Wie stark verändert es, wie ein Kunde fühlt oder sich verhält?"), low: t("A small nudge, or it acts on no need in the evidence.", "Ein kleiner Anstoß, oder es wirkt auf kein Bedürfnis in den Belegen."), high: t("It removes the reason the customer was leaving.", "Es beseitigt den Grund, warum der Kunde ging.") },
  { id: "durability" as Criterion, name: t("Durability", "Durability"), test: t("Does it still work when the reward stops or the person changes?", "Wirkt es noch, wenn die Belohnung endet oder die Person wechselt?"), low: t("It depends on a discount or on individual people.", "Es hängt von einem Rabatt oder von einzelnen Menschen ab."), high: t("It is built into the process or a rule.", "Es ist in den Prozess oder eine Regel eingebaut.") },
  { id: "scale" as Criterion, name: t("Scale", "Skalierung"), test: t("Does the cost per additional member fall as the group grows?", "Sinken die Kosten pro zusätzlichem Mitglied, wenn die Gruppe wächst?"), low: t("The cost repeats with every member.", "Die Kosten fallen bei jedem Mitglied wieder an."), high: t("A one-off cost that serves every member.", "Ein einmaliger Aufwand, der jedes Mitglied bedient.") },
]);

export type SystemBlock = {
  id: SystemId;
  name: string;
  what: string;
  kind: "bonus" | "service" | "community";
  depends: Depends;
  costShape: CostShape;
  /** True when it applies to every customer, false when only to some (members, opted-in customers). */
  reachAll: boolean;
  cost: number;
  weeks: number;
  /** The need it acts on, in words. */
  acts: string;
  model: Record<Criterion, Bucket>;
  note: string;
};

export const SYSTEMS: SystemBlock[] = bi([
  {
    id: "points" as SystemId,
    name: t("Points and rebate scheme", "Punkte- und Rabattprogramm"),
    what: t(
      "Members earn points on every euro spent and redeem them for a 2% rebate at renewal.",
      "Mitglieder sammeln Punkte auf jeden ausgegebenen Euro und lösen sie beim Renewal gegen 2 % Rabatt ein.",
    ),
    kind: "bonus" as const,
    depends: "discount" as Depends,
    costShape: "per member" as CostShape,
    reachAll: false,
    cost: 96000,
    weeks: 2,
    acts: t("The price. It leaves security, trust and relevance where they were.", "Den Preis. Sicherheit, Vertrauen und Relevanz lässt es, wo sie waren."),
    model: { reach: 2, depth: 1, durability: 1, scale: 1 } as Record<Criterion, Bucket>,
    note: t(
      "Cheap to start and fast, but it costs on every member, stops mattering the day it stops and trains customers to wait for the next rebate.",
      "Billig zu starten und schnell, aber es kostet bei jedem Mitglied, zählt nicht mehr, sobald es endet, und bringt Kunden bei, auf den nächsten Rabatt zu warten.",
    ),
  },
  {
    id: "review" as SystemId,
    name: t("Yearly value review for members", "Jährliches Value-Review für Mitglieder"),
    what: t(
      "Every member gets a yearly capacity and security review of their own setup: a one-page report and a 45-minute call.",
      "Jedes Mitglied erhält jährlich ein Kapazitäts- und Sicherheitsreview seines eigenen Setups: einen einseitigen Bericht und ein 45-Minuten-Gespräch.",
    ),
    kind: "service" as const,
    depends: "process" as Depends,
    costShape: "per event" as CostShape,
    reachAll: false,
    cost: 60000,
    weeks: 8,
    acts: t("How safe the customer feels and how well the service fits their setup.", "Wie sicher sich der Kunde fühlt und wie gut der Service zu seinem Setup passt."),
    model: { reach: 2, depth: 3, durability: 3, scale: 2 } as Record<Criterion, Bucket>,
    note: t(
      "A process step, so it happens whoever is on duty. It gives real use and a reason to talk. Each review takes engineer time, so scale is 2.",
      "Ein Prozessschritt, also geschieht es, wer auch immer Dienst hat. Es gibt echten Nutzen und einen Anlass zu reden. Jedes Review braucht Ingenieurzeit, deshalb ist die Skalierung 2.",
    ),
  },
  {
    id: "contact" as SystemId,
    name: t("Named contact and priority line", "Namentlicher Ansprechpartner und Prioritäts-Hotline"),
    what: t("Every member has a named person and a line that is answered first.", "Jedes Mitglied hat eine namentlich benannte Person und eine Leitung, die zuerst beantwortet wird."),
    kind: "service" as const,
    depends: "people" as Depends,
    costShape: "per member" as CostShape,
    reachAll: false,
    cost: 84000,
    weeks: 4,
    acts: t("Personal trust in the people who look after the customer.", "Persönliches Vertrauen in die Menschen, die sich um den Kunden kümmern."),
    model: { reach: 2, depth: 3, durability: 1, scale: 1 } as Record<Criterion, Bucket>,
    note: t(
      "Strong for the members it reaches and it works fast, but it depends on individual people and the cost repeats with every member.",
      "Stark für die Mitglieder, die es erreicht, und es wirkt schnell, aber es hängt von einzelnen Menschen ab, und die Kosten fallen bei jedem Mitglied wieder an.",
    ),
  },
  {
    id: "circle" as SystemId,
    name: t("Peer round tables and forum", "Peer-Round-Tables und Forum"),
    what: t(
      "Two round tables a year and an online forum for members, moderated by CloudTech.",
      "Zwei Round Tables im Jahr und ein Online-Forum für Mitglieder, von CloudTech moderiert.",
    ),
    kind: "community" as const,
    depends: "process" as Depends,
    costShape: "per event" as CostShape,
    reachAll: false,
    cost: 30000,
    weeks: 8,
    acts: t("Belonging: the customer meets others like them and is not alone with the problem.", "Zugehörigkeit: Der Kunde trifft andere wie ihn und ist mit dem Problem nicht allein."),
    model: { reach: 2, depth: 2, durability: 3, scale: 2 } as Record<Criterion, Bucket>,
    note: t(
      "Built into the calendar, so it lasts. Value grows with the group, but each round table is an event that costs.",
      "In den Kalender eingebaut, also hält es. Der Wert wächst mit der Gruppe, aber jeder Round Table ist ein Ereignis, das kostet.",
    ),
  },
  {
    id: "refs" as SystemId,
    name: t("Reference programme with named stories and peer calls", "Referenzprogramm mit namentlichen Geschichten und Peer-Gesprächen"),
    what: t(
      "Named customer stories, and a call with a comparable customer on request, offered to every prospect and every renewing customer.",
      "Namentlich genannte Kundengeschichten und auf Wunsch ein Gespräch mit einem vergleichbaren Kunden, angeboten jedem Interessenten und jedem verlängernden Kunden.",
    ),
    kind: "service" as const,
    depends: "process" as Depends,
    costShape: "per event" as CostShape,
    reachAll: true,
    cost: 30000,
    weeks: 6,
    acts: t("Trust: comparable customers who can be called and checked.", "Vertrauen: vergleichbare Kunden, die man anrufen und prüfen kann."),
    model: { reach: 3, depth: 2, durability: 3, scale: 2 } as Record<Criterion, Bucket>,
    note: t(
      "A step of the process, offered to everyone. Each call takes a reference customer's hour, so scale is 2.",
      "Ein Prozessschritt, jedem angeboten. Jedes Gespräch kostet eine Stunde eines Referenzkunden, deshalb ist die Skalierung 2.",
    ),
  },
  {
    id: "status" as SystemId,
    name: t("Partner status and named customer stories", "Partnerstatus und namentlich genannte Kundengeschichten"),
    what: t(
      "A “Partner since” badge and a published story that names the customer, for members who have been with CloudTech for three years.",
      "Ein Siegel „Partner seit“ und eine veröffentlichte Geschichte, die den Kunden nennt, für Mitglieder, die seit drei Jahren bei CloudTech sind.",
    ),
    kind: "community" as const,
    depends: "process" as Depends,
    costShape: "one-off" as CostShape,
    reachAll: false,
    cost: 24000,
    weeks: 6,
    acts: t("Status: recognition that is true and visible to outsiders.", "Status: Anerkennung, die wahr und für Außenstehende sichtbar ist."),
    model: { reach: 2, depth: 2, durability: 3, scale: 3 } as Record<Criterion, Bucket>,
    note: t(
      "A template built once. It reaches only long-standing members, and it recognises what is real.",
      "Eine Vorlage, einmal gebaut. Sie erreicht nur langjährige Mitglieder und erkennt an, was echt ist.",
    ),
  },
  {
    id: "early" as SystemId,
    name: t("Early access and a vote on the roadmap", "Früher Zugang und ein Stimmrecht zur Roadmap"),
    what: t(
      "Members try new features first and vote on what is built next, through a standing advisory circle.",
      "Mitglieder probieren neue Funktionen zuerst aus und stimmen über das ab, was als Nächstes gebaut wird, über einen ständigen Kundenbeirat.",
    ),
    kind: "community" as const,
    depends: "rule" as Depends,
    costShape: "one-off" as CostShape,
    reachAll: false,
    cost: 30000,
    weeks: 6,
    acts: t("Status and belonging: a say in what is built.", "Status und Zugehörigkeit: Mitsprache bei dem, was gebaut wird."),
    model: { reach: 2, depth: 2, durability: 3, scale: 3 } as Record<Criterion, Bucket>,
    note: t(
      "A rule built once. It gives standing and a voice, and reaches members only.",
      "Eine Regel, einmal gebaut. Sie gibt Ansehen und eine Stimme und erreicht nur Mitglieder.",
    ),
  },
]);
export const SYSTEM_BY_ID = Object.fromEntries(SYSTEMS.map((s) => [s.id, s])) as Record<SystemId, SystemBlock>;
export const SYSTEM_CHOOSE = 3;
export const isSystemic = (id: SystemId) => SYSTEM_BY_ID[id].depends === "process" || SYSTEM_BY_ID[id].depends === "rule";
export const DEPENDS_LABEL: Record<Depends, string> = bi({
  people: t("Individual people", "Einzelne Menschen"),
  process: t("The process", "Der Prozess"),
  rule: t("A rule", "Eine Regel"),
  discount: t("A discount that has to continue", "Ein Rabatt, der weiterlaufen muss"),
});
export const KIND_LABEL = bi({ bonus: t("Bonus", "Bonus"), service: t("Service", "Service"), community: t("Community", "Community") });
export const COST_SHAPE_LABEL: Record<CostShape, string> = bi({
  "one-off": t("one-off", "einmalig"),
  "per event": t("repeats with every event", "fällt bei jedem Ereignis wieder an"),
  "per member": t("repeats with every member", "fällt bei jedem Mitglied wieder an"),
});

/** The rule a rating must not contradict (Materi B3). A rating above the maximum is outlined by a Check. */
export function maxRating(id: SystemId, c: Criterion): Bucket {
  const s = SYSTEM_BY_ID[id];
  if (c === "reach") return s.reachAll ? 3 : 2;
  if (c === "durability") return s.depends === "people" || s.depends === "discount" ? 1 : 3;
  if (c === "scale") return s.costShape === "per member" ? 1 : s.costShape === "per event" ? 2 : 3;
  return 3;
}
export const systemModelTotal = (id: SystemId) => Object.values(SYSTEM_BY_ID[id].model).reduce((s, v) => s + v, 0);
export const MODEL_SYSTEMS: SystemId[] = ["refs", "review", "circle"];

/** The lever the learner's system serves most (Block 3.4). Judged, not checked. Labels are read when rendered. */
export const MAIN_LEVER_OPTIONS: { id: LeverKind; label: string }[] = LEVER_KINDS.map((id) => ({
  id,
  get label() {
    return LEVER_BY_KIND[id].name;
  },
}));

/* ------------------------------------------------------------------ 3.5 · risks of getting emotion and personalisation wrong */

export type RiskId = "overpersonal" | "accept" | "consent" | "urgency" | "discount" | "profile" | "competitor" | "delivery";
export const RISK_IDS: RiskId[] = ["overpersonal", "accept", "consent", "urgency", "discount", "profile", "competitor", "delivery"];

export type Risk = {
  id: RiskId;
  name: string;
  weAssume: string;
  mayBeTrue: string;
  /** True when it is a misjudgment of customer psychology or acceptance (what Block 3.5 asks for). */
  psychology: boolean;
  signals: ModelOption[];
  signalTruth: string;
  model: { likelihood: Bucket; impact: Bucket };
  why: string;
};

export const RISKS: Risk[] = bi([
  {
    id: "overpersonal" as RiskId,
    name: t("Over-personalisation: customers feel watched", "Über-Personalisierung: Kunden fühlen sich beobachtet"),
    weAssume: t("The more personal the offer, the better it works.", "Je persönlicher das Angebot, desto besser wirkt es."),
    mayBeTrue: t(
      "Beyond a point a personal message feels like surveillance. Customers react against it, object or withdraw their consent.",
      "Ab einem Punkt fühlt sich eine persönliche Nachricht wie Überwachung an. Kunden wehren sich, widersprechen oder ziehen ihre Einwilligung zurück.",
    ),
    psychology: true,
    signals: [
      { id: "ov1", label: t("Objections and opt-outs rise after personalised mails, while the open rate stays high.", "Widersprüche und Opt-outs steigen nach personalisierten Mails, während die Öffnungsrate hoch bleibt.") },
      { id: "ov2", label: t("Response rates to personalised mails rise.", "Die Response Rates auf personalisierte Mails steigen.") },
      { id: "ov3", label: t("More customers ask for the newsletter.", "Mehr Kunden bitten um den Newsletter.") },
    ],
    signalTruth: "ov1",
    model: { likelihood: 3 as Bucket, impact: 3 as Bucket },
    why: t(
      "Personalisation is the lever this day is about, and the reaction to it is the reaction least visible in a response rate.",
      "Personalisierung ist der Hebel, um den es an diesem Tag geht, und die Reaktion darauf ist die, die in einer Response Rate am wenigsten sichtbar ist.",
    ),
  },
  {
    id: "accept" as RiskId,
    name: t("Customers do not join or use the programme", "Kunden treten dem Programm nicht bei oder nutzen es nicht"),
    weAssume: t("Customers want a loyalty programme.", "Kunden wollen ein Loyalty-Programm."),
    mayBeTrue: t(
      "They see it as marketing. Nobody joins a programme that gives nothing they value.",
      "Sie sehen es als Marketing. Niemand tritt einem Programm bei, das nichts bietet, was er schätzt.",
    ),
    psychology: true,
    signals: [
      { id: "ac1", label: t("Fewer than one in five invited customers joins within two months.", "Weniger als jeder fünfte eingeladene Kunde tritt innerhalb von zwei Monaten bei.") },
      { id: "ac2", label: t("The invitation mail is opened often.", "Die Einladungs-Mail wird oft geöffnet.") },
      { id: "ac3", label: t("Many members redeem the rebate.", "Viele Mitglieder lösen den Rabatt ein.") },
    ],
    signalTruth: "ac1",
    model: { likelihood: 2 as Bucket, impact: 2 as Bucket },
    why: t(
      "A programme is built on the assumption that customers want it. Joining is the first behaviour that tests it.",
      "Ein Programm beruht auf der Annahme, dass Kunden es wollen. Der Beitritt ist das erste Verhalten, das sie prüft.",
    ),
  },
  {
    id: "consent" as RiskId,
    name: t("Consent fades: customers withdraw it", "Die Einwilligung schwindet: Kunden widerrufen sie"),
    weAssume: t("Once a customer has agreed, the agreement stays.", "Hat ein Kunde einmal zugestimmt, bleibt die Zustimmung bestehen."),
    mayBeTrue: t(
      "Consent can be withdrawn at any time, and every withdrawal removes the customer from the personalisation.",
      "Die Einwilligung kann jederzeit widerrufen werden, und jeder Widerruf nimmt den Kunden aus der Personalisierung.",
    ),
    psychology: true,
    signals: [
      { id: "cs1", label: t("The opt-in share falls month on month, or withdrawals rise after a mailing.", "Der Opt-in-Anteil sinkt von Monat zu Monat, oder Widerrufe steigen nach einem Versand.") },
      { id: "cs2", label: t("The number of customers with a consent record rises.", "Die Zahl der Kunden mit einem Einwilligungseintrag steigt.") },
      { id: "cs3", label: t("The data-protection FAQ is opened more often.", "Die Datenschutz-FAQ wird häufiger geöffnet.") },
    ],
    signalTruth: "cs1",
    model: { likelihood: 2 as Bucket, impact: 3 as Bucket },
    why: t(
      "The personalisation of the plan rests on a group that can leave at any moment.",
      "Die Personalisierung des Plans beruht auf einer Gruppe, die jederzeit gehen kann.",
    ),
  },
  {
    id: "urgency" as RiskId,
    name: t("False urgency damages trust", "Falsche Dringlichkeit beschädigt das Vertrauen"),
    weAssume: t("A deadline or a limit lifts the response.", "Eine Frist oder eine Begrenzung hebt die Reaktion."),
    mayBeTrue: t(
      "Customers check. A limit that is not real costs the trust of the customer who finds out, and it is a misleading claim (§ 5 UWG).",
      "Kunden prüfen nach. Eine Grenze, die nicht echt ist, kostet das Vertrauen des Kunden, der es herausfindet, und sie ist eine irreführende Angabe (§ 5 UWG).",
    ),
    psychology: true,
    signals: [
      { id: "ur1", label: t("Customers ask for the source of a deadline, and replies stop.", "Kunden fragen nach der Quelle einer Frist, und Antworten bleiben aus.") },
      { id: "ur2", label: t("Replies arrive faster before a deadline.", "Antworten kommen vor einer Frist schneller.") },
      { id: "ur3", label: t("Invoices are paid early.", "Rechnungen werden früh bezahlt.") },
    ],
    signalTruth: "ur1",
    model: { likelihood: 2 as Bucket, impact: 3 as Bucket },
    why: t(
      "It is tempting because it works in the short term. The cost arrives later, and it is the thing the plan is trying to build: trust.",
      "Es ist verlockend, weil es kurzfristig wirkt. Der Preis kommt später, und es ist genau das, was der Plan aufbauen will: Vertrauen.",
    ),
  },
  {
    id: "discount" as RiskId,
    name: t("Customers wait for the discount", "Kunden warten auf den Rabatt"),
    weAssume: t("A rebate builds loyalty.", "Ein Rabatt schafft Loyalität."),
    mayBeTrue: t(
      "It trains customers to wait for the next one, and it costs money on every member, including those who would have stayed.",
      "Er bringt Kunden bei, auf den nächsten zu warten, und kostet Geld bei jedem Mitglied, auch bei denen, die geblieben wären.",
    ),
    psychology: true,
    signals: [
      { id: "dd1", label: t("Customers ask for a rebate before they agree to renew.", "Kunden fragen nach einem Rabatt, bevor sie der Verlängerung zustimmen.") },
      { id: "dd2", label: t("The renewal rate rises in the month of a rebate.", "Die Renewal-Quote steigt im Monat eines Rabatts.") },
      { id: "dd3", label: t("Members redeem their points.", "Mitglieder lösen ihre Punkte ein.") },
    ],
    signalTruth: "dd1",
    model: { likelihood: 3 as Bucket, impact: 2 as Bucket },
    why: t(
      "It is the easy answer of a sales team under pressure, and it is the one that makes the offers look even more interchangeable.",
      "Es ist die einfache Antwort eines Vertriebsteams unter Druck, und sie lässt die Angebote noch austauschbarer wirken.",
    ),
  },
  {
    id: "profile" as RiskId,
    name: t("A past pattern is mistaken for a preference", "Ein vergangenes Muster wird für eine Präferenz gehalten"),
    weAssume: t("A customer who used a service wants more of it.", "Ein Kunde, der einen Service genutzt hat, will mehr davon."),
    mayBeTrue: t(
      "Usage reflects a project or a phase. The profile can be wrong or out of date, and the offer misses.",
      "Nutzung spiegelt ein Projekt oder eine Phase. Das Profil kann falsch oder veraltet sein, und das Angebot geht daneben.",
    ),
    psychology: true,
    signals: [
      { id: "pf1", label: t("Customers the model is most sure about reject its offers.", "Kunden, bei denen sich das Modell am sichersten ist, lehnen seine Angebote ab.") },
      { id: "pf2", label: t("The model's accuracy on old data is high.", "Die Genauigkeit des Modells auf alten Daten ist hoch.") },
      { id: "pf3", label: t("More customers accept offers in December.", "Mehr Kunden nehmen im Dezember Angebote an.") },
    ],
    signalTruth: "pf1",
    model: { likelihood: 3 as Bucket, impact: 2 as Bucket },
    why: t(
      "Behavioural targeting reads the past. The customer lives in the present.",
      "Behavioral Targeting liest die Vergangenheit. Der Kunde lebt in der Gegenwart.",
    ),
  },
  {
    id: "competitor" as RiskId,
    name: t("A competitor copies the programme within six months", "Ein Wettbewerber kopiert das Programm innerhalb von sechs Monaten"),
    weAssume: "—",
    mayBeTrue: "—",
    psychology: false,
    signals: [
      { id: "cp1", label: t("Customers quote the competitor's programme.", "Kunden zitieren das Programm des Wettbewerbers.") },
      { id: "cp2", label: t("The renewal talk takes longer.", "Das Renewal-Gespräch dauert länger.") },
      { id: "cp3", label: t("Reference calls go up.", "Referenzgespräche nehmen zu.") },
    ],
    signalTruth: "cp1",
    model: { likelihood: 2 as Bucket, impact: 2 as Bucket },
    why: t(
      "A real market risk, but not a misjudgment of the customer: nothing here is about what CloudTech assumed the customer feels.",
      "Ein echtes Marktrisiko, aber keine Fehleinschätzung des Kunden: Nichts hier betrifft das, was CloudTech über die Gefühle des Kunden annahm.",
    ),
  },
  {
    id: "delivery" as RiskId,
    name: t("The consent centre is delivered late", "Das Consent Centre wird zu spät geliefert"),
    weAssume: "—",
    mayBeTrue: "—",
    psychology: false,
    signals: [
      { id: "dl1", label: t("The consent centre misses its month-2 milestone.", "Das Consent Centre verfehlt seinen Meilenstein in Monat 2.") },
      { id: "dl2", label: t("The CRM is updated on Mondays.", "Das CRM wird montags aktualisiert.") },
      { id: "dl3", label: t("The opt-in share rises.", "Der Opt-in-Anteil steigt.") },
    ],
    signalTruth: "dl1",
    model: { likelihood: 2 as Bucket, impact: 2 as Bucket },
    why: t(
      "An execution risk of the plan, not a misjudgment of the customer's psychology.",
      "Ein Umsetzungsrisiko des Plans, keine Fehleinschätzung der Psychologie des Kunden.",
    ),
  },
]);
export const RISK_BY_ID = Object.fromEntries(RISKS.map((r) => [r.id, r])) as Record<RiskId, Risk>;
export const RISK_CHOOSE = 3;
export const MODEL_RISKS: RiskId[] = ["overpersonal", "consent", "accept"];

/* ------------------------------------------------------------------ 3.6 · architecture */

export type OwnerId = "cco" | "sales" | "marketing" | "cs" | "product" | "delivery" | "data" | "dpo";
export const OWNER_IDS: OwnerId[] = ["cco", "sales", "marketing", "cs", "product", "delivery", "data", "dpo"];
export const OWNERS: Record<OwnerId, { id: OwnerId; name: string; profile: string }> = bi({
  cco: { id: "cco" as OwnerId, name: t("Chief Customer Officer (you)", "Chief Customer Officer (Sie)"), profile: t("Decides across sales, marketing and customer success and answers to the board. Should hold few items, or the decisions queue up at one desk.", "Entscheidet über Vertrieb, Marketing und Customer Success hinweg und verantwortet sich gegenüber dem Board. Sollte wenige Punkte halten, sonst stauen sich die Entscheidungen an einem Schreibtisch.") },
  sales: { id: "sales" as OwnerId, name: t("Head of Sales", "Leitung Vertrieb"), profile: t("Owns the sales process, the offers and the sales team's targets.", "Verantwortet den Vertriebsprozess, die Angebote und die Ziele des Vertriebsteams.") },
  marketing: { id: "marketing" as OwnerId, name: t("Head of Marketing", "Leitung Marketing"), profile: t("Owns the messages, the newsletter, the website and the packaging of offers.", "Verantwortet die Botschaften, den Newsletter, die Website und die Paketierung der Angebote.") },
  cs: { id: "cs" as OwnerId, name: t("Head of Customer Success", "Leitung Customer Success"), profile: t("Owns the relationships with existing customers, the reviews and the events, and can ask customers to act as references.", "Verantwortet die Beziehungen zu Bestandskunden, die Reviews und die Veranstaltungen und kann Kunden bitten, als Referenz zu dienen.") },
  product: { id: "product" as OwnerId, name: t("Head of Product", "Leitung Produkt"), profile: t("Owns the product roadmap and decides which features customers try first.", "Verantwortet die Produkt-Roadmap und entscheidet, welche Funktionen Kunden zuerst ausprobieren.") },
  delivery: { id: "delivery" as OwnerId, name: t("Head of Delivery", "Leitung Delivery"), profile: t("Owns the engineers' time and the delivery plan.", "Verantwortet die Zeit der Ingenieure und den Lieferplan.") },
  data: { id: "data" as OwnerId, name: t("Head of Data and IT", "Leitung Daten und IT"), profile: t("Owns the CRM, the consent record, the data pipelines and the dashboards.", "Verantwortet das CRM, das Einwilligungsregister, die Datenpipelines und die Dashboards.") },
  dpo: { id: "dpo" as OwnerId, name: t("Data protection officer", "Datenschutzbeauftragter"), profile: t("Advises on data protection and monitors compliance. Must stay independent, so does not decide how data is used and should not own a measure that uses it.", "Berät zum Datenschutz und überwacht die Einhaltung. Muss unabhängig bleiben, entscheidet also nicht, wie Daten genutzt werden, und sollte keine Maßnahme besitzen, die sie nutzt.") },
});

export type ArchId = SystemId | "engine" | "foundation" | "dashboard";
export type ArchItem = { id: ArchId; name: string; what: string; cost: number; weeks: number; enabler: boolean };

export const ENABLERS: ArchId[] = ["foundation", "dashboard"];
export const FOUNDATION: ArchItem = bi({
  id: "foundation" as ArchId,
  name: t("Consent and data foundation", "Einwilligungs- und Datenfundament"),
  what: t(
    "An opt-in centre, a record of what each customer agreed to, a way to honour objections at once, and a data-protection review of every use of customer data.",
    "Ein Opt-in-Center, ein Register dessen, wozu jeder Kunde zugestimmt hat, ein Weg, Widersprüche sofort umzusetzen, und eine Datenschutzprüfung jeder Nutzung von Kundendaten.",
  ),
  cost: 42000,
  weeks: 8,
  enabler: true,
});
export const DASHBOARD: ArchItem = bi({
  id: "dashboard" as ArchId,
  name: t("Retention dashboard and early-warning signals", "Retention-Dashboard und Frühwarnsignale"),
  what: t(
    "Renewal, opt-in, objection and participation figures on one screen, read in a monthly review, so that a customer drifting away is seen while there is time.",
    "Renewal-, Opt-in-, Widerspruchs- und Teilnahmezahlen auf einem Bildschirm, gelesen in einem monatlichen Review, damit ein abwandernder Kunde gesehen wird, solange noch Zeit ist.",
  ),
  cost: 36000,
  weeks: 8,
  enabler: true,
});
export const engineCost = (levels: (LevelId | null)[]): number => {
  const chosen = levels.filter((l): l is LevelId => l !== null);
  return chosen.length ? Math.max(...chosen.map((l) => LEVEL_BY_ID[l].cost)) : 0;
};
export const engineLevel = (levels: (LevelId | null)[]): LevelId | null => {
  const chosen = levels.filter((l): l is LevelId => l !== null);
  if (!chosen.length) return null;
  return chosen.reduce((a, b) => (levelIndex(b) > levelIndex(a) ? b : a));
};
export const engineItem = (levels: (LevelId | null)[]): ArchItem | null => {
  const top = engineLevel(levels);
  if (!top) return null;
  const l = LEVEL_BY_ID[top];
  return {
    id: "engine",
    name: tt(`Personalisation engine (level ${l.n}: ${l.name.toLowerCase()})`, `Personalisierungs-Engine (Stufe ${l.n}: ${l.name})`),
    what: tt(
      `Built once for the highest level you chose in Block 3.3. Each level needs the one below it. ${l.data}`,
      `Einmal gebaut für die höchste Stufe, die Sie in Block 3.3 gewählt haben. Jede Stufe braucht die darunter. ${l.data}`,
    ),
    cost: l.cost,
    weeks: l.n <= 1 ? 4 : l.n === 2 ? 8 : 12,
    enabler: false,
  };
};

/** The items of the architecture grid: the learner's three system blocks, the personalisation engine (from 3.3), then the enablers. */
export function archItems(systems: (SystemId | null)[], levels: (LevelId | null)[]): ArchItem[] {
  const chosen = systems.filter((s): s is SystemId => s !== null);
  const out: ArchItem[] = chosen.map((id) => {
    const s = SYSTEM_BY_ID[id];
    return { id, name: s.name, what: s.what, cost: s.cost, weeks: s.weeks, enabler: false };
  });
  const eng = engineItem(levels);
  if (eng) out.push(eng);
  out.push(FOUNDATION, DASHBOARD);
  return out;
}
export const archName = (id: ArchId, levels: (LevelId | null)[] = []): string => {
  if (id === "foundation") return FOUNDATION.name;
  if (id === "dashboard") return DASHBOARD.name;
  if (id === "engine") return engineItem(levels)?.name ?? tt("Personalisation engine", "Personalisierungs-Engine");
  return SYSTEM_BY_ID[id].name;
};

/** Owners who defend for each item (reference answer). */
export const OWNER_ACCEPT: Record<ArchId, OwnerId[]> = {
  points: ["marketing", "cco"],
  review: ["delivery", "cs"],
  contact: ["cs", "delivery"],
  circle: ["cs", "marketing"],
  refs: ["cs", "marketing"],
  status: ["marketing"],
  early: ["product", "cco"],
  engine: ["data", "marketing"],
  foundation: ["data", "cco"],
  dashboard: ["data", "cs"],
};

export const MODEL_ARCH: ArchId[] = ["refs", "review", "circle", "engine", "foundation"];
export const MODEL_START: Partial<Record<ArchId, number>> = { foundation: 1, refs: 1, review: 3, circle: 3, engine: 4 };
export const MODEL_TRIGGER: Partial<Record<ArchId, string>> = bi({
  foundation: t(
    "If fewer than 80% of customers have a consent status recorded by month 3, the engine does not start and the opt-in centre is reviewed with the data-protection officer.",
    "Wenn bis Monat 3 weniger als 80 % der Kunden einen erfassten Einwilligungsstatus haben, startet die Engine nicht, und das Opt-in-Center wird mit dem Datenschutzbeauftragten überprüft.",
  ),
  refs: t(
    "If fewer than 60% of renewing customers have been offered a peer call by month 6, the programme is reviewed with the customer success lead and two more reference customers are recruited.",
    "Wenn bis Monat 6 weniger als 60 % der verlängernden Kunden ein Peer-Gespräch angeboten wurde, wird das Programm mit der Leitung Customer Success überprüft und zwei weitere Referenzkunden werden gewonnen.",
  ),
  review: t(
    "If fewer than 40% of members have taken up the yearly review by month 8, the report is shortened to one page and the call is made optional.",
    "Wenn bis Monat 8 weniger als 40 % der Mitglieder das jährliche Review genutzt haben, wird der Bericht auf eine Seite gekürzt und das Gespräch optional gemacht.",
  ),
  circle: t(
    "If fewer than 25 customers attend the first round table by month 5, the topic is changed and the invitation goes to the next 100 customers.",
    "Wenn bis Monat 5 weniger als 25 Kunden am ersten Round Table teilnehmen, wird das Thema geändert, und die Einladung geht an die nächsten 100 Kunden.",
  ),
  engine: t(
    "If more than 5 objections per 1,000 customers reach the marketing team in the first month of personalised offers, the sending pauses and the data-protection officer reviews the offers.",
    "Wenn im ersten Monat personalisierter Angebote mehr als 5 Widersprüche pro 1.000 Kunden beim Marketing eingehen, pausiert der Versand, und der Datenschutzbeauftragte prüft die Angebote.",
  ),
});

/* ------------------------------------------------------------------ 3.7 · the decision */

export type DecisionId = "commit" | "stage" | "wait";
export const DECISIONS: { id: DecisionId; label: string; detail: string; why: string; rejected: string }[] = bi([
  {
    id: "commit" as DecisionId,
    label: t("Commit now", "Jetzt festlegen"),
    detail: t("Fund the whole architecture and personalise for every customer group from month 1.", "Die gesamte Architektur finanzieren und ab Monat 1 für jede Kundengruppe personalisieren."),
    why: t(
      "It starts every effect as early as possible and it is the boldest answer. It defends only if almost everything in it can be undone.",
      "Es startet jede Wirkung so früh wie möglich und ist die mutigste Antwort. Es trägt nur, wenn sich fast alles darin rückgängig machen lässt.",
    ),
    rejected: t(
      "Most of the money is spent in the first months, on assumptions about how customers will react to being addressed personally that nobody has tested. Nothing tells you early that it is not working.",
      "Das meiste Geld wird in den ersten Monaten ausgegeben, auf Annahmen darüber, wie Kunden auf persönliche Ansprache reagieren, die niemand getestet hat. Nichts sagt Ihnen früh, dass es nicht funktioniert.",
    ),
  },
  {
    id: "stage" as DecisionId,
    label: t("Stage it, with a tripwire", "Staffeln, mit einem Tripwire"),
    detail: t(
      "Start with the customers who have consented and one benefit, set a tripwire for month 4, and widen the personalisation only if it is met.",
      "Mit den Kunden starten, die eingewilligt haben, und mit einem Vorteil, einen Tripwire für Monat 4 setzen und die Personalisierung nur ausweiten, wenn er erfüllt ist.",
    ),
    why: t(
      "It decides now, spends in steps and lets the customers' first reactions steer the rest. The tripwire turns unclear reactions into a defined trigger.",
      "Es entscheidet jetzt, gibt schrittweise aus und lässt die ersten Reaktionen der Kunden den Rest steuern. Der Tripwire macht unklare Reaktionen zu einem definierten Auslöser.",
    ),
    rejected: "",
  },
  {
    id: "wait" as DecisionId,
    label: t("Wait for more data", "Auf mehr Daten warten"),
    detail: t("Hold the budget and collect three more months of customer data before deciding.", "Das Budget zurückhalten und drei weitere Monate Kundendaten sammeln, bevor entschieden wird."),
    why: "",
    rejected: t(
      "Waiting is also a decision, and it lets renewals keep failing for three more months while the offers stay interchangeable. The brief asks for a decision before the data is clear.",
      "Warten ist auch eine Entscheidung, und sie lässt Renewals drei weitere Monate scheitern, während die Angebote austauschbar bleiben. Der Auftrag verlangt eine Entscheidung, bevor die Daten klar sind.",
    ),
  },
]);
export const MODEL_DECISION: DecisionId = "stage";

export type KpiId = "renewal" | "optin" | "talk" | "objection" | "mails";
export const KPIS: { id: KpiId; label: string; unit: string; baseline: number; better: "up" | "down"; behaviour: boolean }[] = bi([
  { id: "renewal" as KpiId, label: t("Renewal rate at the end of the term", "Renewal-Quote am Ende der Laufzeit"), unit: "%", baseline: 72, better: "up" as const, behaviour: true },
  { id: "optin" as KpiId, label: t("Customers who agreed to usage analysis (opt-in)", "Kunden, die der Nutzungsanalyse zugestimmt haben (Opt-in)"), unit: "%", baseline: 40, better: "up" as const, behaviour: true },
  { id: "talk" as KpiId, label: t("Customers who accept an invitation to a renewal talk", "Kunden, die eine Einladung zu einem Renewal-Gespräch annehmen"), unit: "%", baseline: 55, better: "up" as const, behaviour: true },
  { id: "objection" as KpiId, label: t("Objections to marketing messages per 1,000 customers per quarter", "Widersprüche gegen Marketing-Nachrichten pro 1.000 Kunden pro Quartal"), unit: t("per 1,000", "pro 1.000"), baseline: 14, better: "down" as const, behaviour: true },
  { id: "mails" as KpiId, label: t("Campaign emails sent per customer per quarter", "Versendete Kampagnen-E-Mails pro Kunde und Quartal"), unit: t("emails", "E-Mails"), baseline: 12, better: "up" as const, behaviour: false },
]);
export const KPI_BY_ID = Object.fromEntries(KPIS.map((k) => [k.id, k])) as Record<KpiId, (typeof KPIS)[number]>;
export const MODEL_TRIPWIRE = { kpi: "optin" as KpiId, threshold: 48, month: 4 };

export const R2_TXT = bi({
  baselineNote: t(
    "Baselines are Case assumptions from the last twelve months of CloudTech's own customer review.",
    "Die Baselines sind Case-Annahmen aus dem Kundenreview der letzten zwölf Monate von CloudTech selbst.",
  ),
  /** The board's challenge in Block 3.7. */
  boardChallenge: t(
    "It is month 4. The opt-in share has risen from 40% to 47%, but objections to marketing messages have doubled among the customers who opted in. The board asks what you do with the rest of the budget.",
    "Es ist Monat 4. Der Opt-in-Anteil ist von 40 % auf 47 % gestiegen, aber die Widersprüche gegen Marketing-Nachrichten haben sich bei den Kunden mit Opt-in verdoppelt. Das Board fragt, was Sie mit dem Rest des Budgets tun.",
  ),
});
