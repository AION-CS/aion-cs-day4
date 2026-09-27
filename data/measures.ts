import type { NeedId } from "@/data/needs";
import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 2.3. Nine measures CloudTech could fund inside €180,000 and six months, together with the loyalty concept of Block 2.4.
 * Costs, weeks and dependencies are Case assumptions. What each measure changes is described as a mechanism, never with the need's name,
 * so the learner has to match them (Materi A7). `targets` and the model scores are used only by the answer keys, the worked answers and
 * the checks; they are never printed to a learner.
 *
 * The three scores are taught in Materi A7:
 *   Effect       judged from the learner's own tally (a guide is printed)
 *   Acceptance   capped by the data the measure uses (a Check outlines a score above the cap)
 *   Scalability  follows the printed effort per additional customer (a Check outlines a score that does not follow it)
 */
export type MeasureId = "refs" | "partner" | "usage" | "rules" | "transparency" | "review" | "rebate" | "tracking" | "news";

export const BUDGET = 180000;
export const MONTHS = 6;

/** What data a measure uses: it caps how well customers can accept it. */
export type DataClass = "none" | "company" | "consented" | "beyond";
export const DATA_LABEL: Record<DataClass, string> = bi({
  none: t("No customer data", "Keine Kundendaten"),
  company: t("Company facts the customer already gave under the contract", "Unternehmensdaten, die der Kunde im Rahmen des Vertrags schon gegeben hat"),
  consented: t("Usage data only for customers who agreed to share it", "Nutzungsdaten nur von Kunden, die der Weitergabe zugestimmt haben"),
  beyond: t("Usage or behaviour data the customers have not agreed to share for this purpose", "Nutzungs- oder Verhaltensdaten, deren Weitergabe für diesen Zweck die Kunden nicht zugestimmt haben"),
});
export const ACCEPT_CAP: Record<DataClass, 1 | 2 | 3> = { none: 3, company: 3, consented: 2, beyond: 1 };

/** What one more customer costs: it decides the scalability score. */
export type Effort = "manual" | "semi" | "auto";
export const EFFORT_LABEL: Record<Effort, string> = bi({
  manual: t("A person's time for every additional customer", "Die Zeit eines Menschen für jeden zusätzlichen Kunden"),
  semi: t("A small standard step (a template, a call) for every additional customer", "Ein kleiner Standardschritt (eine Vorlage, ein Anruf) für jeden zusätzlichen Kunden"),
  auto: t("Nothing more once it is built", "Nichts mehr, sobald es gebaut ist"),
});
export const EFFORT_SCORE: Record<Effort, 1 | 2 | 3> = { manual: 1, semi: 2, auto: 3 };

export type Measure = {
  id: MeasureId;
  name: string;
  /** What it is, in one or two sentences. */
  what: string;
  /** What it changes in the customer, as a mechanism (no need name). */
  mechanism: string;
  /** What has to be true for it to work. */
  needs: string;
  cost: number;
  /** Weeks until the first effect on a live customer. */
  weeks: number;
  data: DataClass;
  effort: Effort;
  /** True when it reaches every customer, false when only part of them. */
  reachAll: boolean;
  /** Needs it really acts on (reference answer). */
  targets: NeedId[];
  /** Model scores 1 to 3, with the reason. */
  model: { effect: 1 | 2 | 3; acceptance: 1 | 2 | 3; note: string };
  verdict: string;
};

export const MEASURES: Measure[] = bi([
  {
    id: "refs" as MeasureId,
    name: t("Customer reference programme", "Kunden-Referenzprogramm"),
    what: t(
      "Six customers agree to be named. Each has a one-page story and takes calls from prospects and renewing customers who ask to speak to a peer.",
      "Sechs Kunden stimmen zu, genannt zu werden. Jeder hat eine einseitige Geschichte und nimmt Anrufe von Interessenten und verlängernden Kunden entgegen, die mit einem Gleichgestellten sprechen wollen.",
    ),
    mechanism: t(
      "Puts comparable companies in front of the customer, who can put their own questions to them before having to take CloudTech's word.",
      "Stellt dem Kunden vergleichbare Unternehmen gegenüber, denen er eigene Fragen stellen kann, bevor er CloudTech beim Wort nehmen muss.",
    ),
    needs: t("Six customers agree to be named. Two have already said yes.", "Sechs Kunden stimmen einer Nennung zu. Zwei haben schon zugesagt."),
    cost: 30000,
    weeks: 6,
    data: "none" as DataClass,
    effort: "semi" as Effort,
    reachAll: true,
    targets: ["trust"] as NeedId[],
    model: {
      effect: 3 as 1 | 2 | 3,
      acceptance: 3 as 1 | 2 | 3,
      note: t(
        "Trust is in three touchpoints and two of them cost a customer. Every prospect and renewing customer can use it. It uses no customer data.",
        "Vertrauen steckt in drei Touchpoints, und zwei davon haben einen Kunden gekostet. Jeder Interessent und jeder verlängernde Kunde kann sie nutzen. Sie nutzt keine Kundendaten.",
      ),
    },
    verdict: t(
      "A model measure: acts on the strongest need, reaches everyone and needs no data. Each extra call takes a customer's hour, so scalability is 2.",
      "Eine Modellmaßnahme: Sie wirkt auf das stärkste Bedürfnis, erreicht alle und braucht keine Daten. Jeder weitere Anruf kostet eine Kundenstunde, deshalb ist die Skalierbarkeit 2.",
    ),
  },
  {
    id: "partner" as MeasureId,
    name: t("Named consulting partner", "Namentlich benannter Beratungspartner"),
    what: t(
      "A named engineer stays the contact from go-live through the 30-day and 90-day reviews, for every customer with a contract above €40,000.",
      "Ein namentlich benannter Ingenieur bleibt vom Go-live bis zu den Reviews nach 30 und 90 Tagen der Ansprechpartner, für jeden Kunden mit einem Vertrag über 40.000 €.",
    ),
    mechanism: t(
      "Lets the customer know and test the people who look after them, and makes CloudTech's promises visible on dates the customer can see.",
      "Lässt den Kunden die Menschen kennenlernen und testen, die sich um ihn kümmern, und macht die Versprechen von CloudTech an Terminen sichtbar, die der Kunde sehen kann.",
    ),
    needs: t("Half an engineer for every 25 customers, taken from delivery capacity.", "Ein halber Ingenieur für je 25 Kunden, aus der Delivery-Kapazität genommen."),
    cost: 96000,
    weeks: 4,
    data: "none" as DataClass,
    effort: "manual" as Effort,
    reachAll: false,
    targets: ["trust", "belonging"] as NeedId[],
    model: {
      effect: 2 as 1 | 2 | 3,
      acceptance: 3 as 1 | 2 | 3,
      note: t(
        "Trust is in three touchpoints, but only the large customers are covered, so effect is 2. Each extra customer takes a person's time, so it does not scale.",
        "Vertrauen steckt in drei Touchpoints, aber nur die großen Kunden werden abgedeckt, deshalb ist die Wirkung 2. Jeder weitere Kunde braucht die Zeit eines Menschen, deshalb skaliert es nicht.",
      ),
    },
    verdict: t(
      "Sound and fast, and the dearest per customer. It scores 6 because a person's time cannot be scaled.",
      "Solide und schnell, und pro Kunde die teuerste. Sie erreicht 6, weil sich die Zeit eines Menschen nicht skalieren lässt.",
    ),
  },
  {
    id: "usage" as MeasureId,
    name: t("Usage-based offers for customers who opted in", "Nutzungsbasierte Angebote für Kunden mit Opt-in"),
    what: t(
      "Offers built from the customer's own usage: storage, load, backup needs. Sent only to customers who agreed to usage analysis and have twelve months of data.",
      "Angebote, die aus der eigenen Nutzung des Kunden gebaut werden: Speicher, Auslastung, Backup-Bedarf. Nur an Kunden gesendet, die der Nutzungsanalyse zugestimmt haben und zwölf Monate Daten haben.",
    ),
    mechanism: t(
      "Makes the offer fit the customer's own situation, using only what they agreed to share.",
      "Lässt das Angebot zur eigenen Situation des Kunden passen und nutzt nur, was er zu teilen zugestimmt hat.",
    ),
    needs: t(
      "The customers' agreement (40% so far), twelve months of usable data, and a data-protection review before the first send.",
      "Die Zustimmung der Kunden (bisher 40 %), zwölf Monate nutzbare Daten und eine Datenschutzprüfung vor dem ersten Versand.",
    ),
    cost: 45000,
    weeks: 12,
    data: "consented" as DataClass,
    effort: "auto" as Effort,
    reachAll: false,
    targets: ["relevance", "timing"] as NeedId[],
    model: {
      effect: 2 as 1 | 2 | 3,
      acceptance: 2 as 1 | 2 | 3,
      note: t(
        "Relevance is in three touchpoints, but only 450 of the 1,500 customers can be reached, so effect is 2. Usage data the customer agreed to share caps acceptance at 2.",
        "Relevanz steckt in drei Touchpoints, aber nur 450 der 1.500 Kunden lassen sich erreichen, deshalb ist die Wirkung 2. Nutzungsdaten, deren Weitergabe der Kunde zugestimmt hat, begrenzen die Akzeptanz auf 2.",
      ),
    },
    verdict: t(
      "A model measure: the offer fits, once built it costs nothing per customer, and it stays inside what customers agreed to.",
      "Eine Modellmaßnahme: Das Angebot passt, ist es gebaut, kostet es pro Kunde nichts, und es bleibt innerhalb dessen, dem Kunden zugestimmt haben.",
    ),
  },
  {
    id: "rules" as MeasureId,
    name: t("Event-based renewal rules", "Ereignisbasierte Renewal-Regeln"),
    what: t(
      "Rules in the CRM: no renewal mail within 30 days of an open incident, and the renewal talk starts 120 days before the term ends, after the last quarterly review.",
      "Regeln im CRM: keine Renewal-Mail innerhalb von 30 Tagen nach einem offenen Incident, und das Renewal-Gespräch beginnt 120 Tage vor Laufzeitende, nach dem letzten Quartalsreview.",
    ),
    mechanism: t(
      "Moves the message to a moment the customer can hear it, using contract and ticket data CloudTech already holds under the contract.",
      "Verschiebt die Nachricht auf einen Moment, in dem der Kunde sie hören kann, und nutzt Vertrags- und Ticketdaten, die CloudTech im Rahmen des Vertrags schon hat.",
    ),
    needs: t("A CRM rule and one approval by the customer success lead.", "Eine CRM-Regel und eine Freigabe durch die Leitung Customer Success."),
    cost: 18000,
    weeks: 5,
    data: "company" as DataClass,
    effort: "auto" as Effort,
    reachAll: true,
    targets: ["timing"] as NeedId[],
    model: {
      effect: 1 as 1 | 2 | 3,
      acceptance: 3 as 1 | 2 | 3,
      note: t(
        "Its need appears in one touchpoint of twelve, so effect is 1. It reaches every customer and once built costs nothing per customer.",
        "Ihr Bedürfnis steckt in einem Touchpoint von zwölf, deshalb ist die Wirkung 1. Sie erreicht jeden Kunden und kostet, ist sie gebaut, pro Kunde nichts.",
      ),
    },
    verdict: t(
      "A sound measure that is cheap and fast, but the need it answers is rare in this evidence. It scores 9.",
      "Eine solide Maßnahme, billig und schnell, aber das Bedürfnis, das sie beantwortet, ist in diesen Belegen selten. Sie erreicht 9.",
    ),
  },
  {
    id: "transparency" as MeasureId,
    name: t("Incident and data-location pack", "Paket für Incident und Datenstandort"),
    what: t(
      "A public status page, a named incident lead who rings affected customers within 60 minutes of a serious outage, and a one-page statement of where data and backups are stored.",
      "Eine öffentliche Statusseite, eine namentlich benannte Incident-Leitung, die betroffene Kunden innerhalb von 60 Minuten nach einem schweren Ausfall anruft, und eine einseitige Erklärung, wo Daten und Backups liegen.",
    ),
    mechanism: t(
      "Makes the worst case smaller and visible: the customer knows where the data is and hears first from CloudTech when something breaks.",
      "Macht den schlimmsten Fall kleiner und sichtbar: Der Kunde weiß, wo die Daten liegen, und hört zuerst von CloudTech, wenn etwas kaputtgeht.",
    ),
    needs: t(
      "An incident lead on a rota and a statement approved by the data-protection officer.",
      "Eine Incident-Leitung im Bereitschaftsplan und eine vom Datenschutzbeauftragten freigegebene Erklärung.",
    ),
    cost: 36000,
    weeks: 6,
    data: "none" as DataClass,
    effort: "semi" as Effort,
    reachAll: true,
    targets: ["security"] as NeedId[],
    model: {
      effect: 2 as 1 | 2 | 3,
      acceptance: 3 as 1 | 2 | 3,
      note: t(
        "Security is in two touchpoints, and one of them cost a customer. It reaches everyone. Each incident call takes a person's hour, so scalability is 2.",
        "Sicherheit steckt in zwei Touchpoints, und einer davon hat einen Kunden gekostet. Sie erreicht alle. Jeder Incident-Anruf kostet eine Stunde eines Menschen, deshalb ist die Skalierbarkeit 2.",
      ),
    },
    verdict: t(
      "A sound measure that just misses: the same score as the usage-based offers, and the budget forces one of the four that work to go.",
      "Eine solide Maßnahme, die knapp verfehlt: dieselbe Bewertung wie die nutzungsbasierten Angebote, und das Budget zwingt dazu, eine der vier funktionierenden wegzulassen.",
    ),
  },
  {
    id: "review" as MeasureId,
    name: t("Value-added service review instead of discounts", "Service-Review mit Mehrwert statt Rabatten"),
    what: t(
      "Every customer gets a yearly capacity and security review of their own setup, as a one-page report and a 45-minute call, in place of price concessions.",
      "Jeder Kunde erhält ein jährliches Kapazitäts- und Sicherheitsreview seines eigenen Setups, als einseitigen Bericht und 45-Minuten-Gespräch, anstelle von Preiszugeständnissen.",
    ),
    mechanism: t(
      "Gives the customer something of real use that fits their own setup, and shows them the risks CloudTech is watching for them.",
      "Gibt dem Kunden etwas von echtem Nutzen, das zu seinem eigenen Setup passt, und zeigt ihm die Risiken, die CloudTech für ihn im Auge behält.",
    ),
    needs: t("A report template and engineer time: about two hours per customer.", "Eine Berichtsvorlage und Ingenieurzeit: etwa zwei Stunden pro Kunde."),
    cost: 54000,
    weeks: 8,
    data: "company" as DataClass,
    effort: "semi" as Effort,
    reachAll: true,
    targets: ["relevance", "security"] as NeedId[],
    model: {
      effect: 3 as 1 | 2 | 3,
      acceptance: 3 as 1 | 2 | 3,
      note: t(
        "Relevance is in three touchpoints and the review reaches every customer, so effect is 3. It uses only setup and contract facts the customer already gave.",
        "Relevanz steckt in drei Touchpoints, und das Review erreicht jeden Kunden, deshalb ist die Wirkung 3. Es nutzt nur Setup- und Vertragsdaten, die der Kunde schon gegeben hat.",
      ),
    },
    verdict: t(
      "A model measure: it replaces a discount with a benefit, acts on a need seen three times and reaches everyone.",
      "Eine Modellmaßnahme: Sie ersetzt einen Rabatt durch einen Nutzen, wirkt auf ein Bedürfnis, das dreimal auftrat, und erreicht alle.",
    ),
  },
  {
    id: "rebate" as MeasureId,
    name: t("Renewal rebate of 2%", "Renewal-Rabatt von 2 %"),
    what: t(
      "2% off the annual fee for every customer who joins a bonus scheme, for the first six months.",
      "2 % Nachlass auf die Jahresgebühr für jeden Kunden, der einem Bonusprogramm beitritt, für die ersten sechs Monate.",
    ),
    mechanism: t(
      "Lowers the price. It does not change whether the customer feels safe, trusts CloudTech or finds the offer fitting.",
      "Senkt den Preis. Es ändert nichts daran, ob sich der Kunde sicher fühlt, CloudTech vertraut oder das Angebot passend findet.",
    ),
    needs: t(
      "Nothing: it can start at once. The margin falls on every member, including those who would have stayed.",
      "Nichts: Es kann sofort starten. Die Marge sinkt bei jedem Mitglied, auch bei denen, die geblieben wären.",
    ),
    cost: 90000,
    weeks: 1,
    data: "none" as DataClass,
    effort: "auto" as Effort,
    reachAll: false,
    targets: [] as NeedId[],
    model: {
      effect: 1 as 1 | 2 | 3,
      acceptance: 3 as 1 | 2 | 3,
      note: t(
        "It acts on none of the six needs. It is accepted (a discount always is) and scales, and still comes out at 9.",
        "Sie wirkt auf keines der sechs Bedürfnisse. Sie wird akzeptiert (ein Rabatt immer) und skaliert, und kommt trotzdem nur auf 9.",
      ),
    },
    verdict: t(
      "Rejected: it answers no need in the evidence, pays on customers who would have stayed and uses half the budget.",
      "Abgelehnt: Sie beantwortet kein Bedürfnis in den Belegen, zahlt für Kunden, die geblieben wären, und verbraucht das halbe Budget.",
    ),
  },
  {
    id: "tracking" as MeasureId,
    name: t("Behaviour-based offers for all customers, without opt-in", "Verhaltensbasierte Angebote für alle Kunden, ohne Opt-in"),
    what: t(
      "Track every customer's usage and clicks and send individual offers to all 1,500 from day one, on the basis of “legitimate interest”.",
      "Nutzung und Klicks jedes Kunden erfassen und ab dem ersten Tag individuelle Angebote an alle 1.500 senden, auf Grundlage des „berechtigten Interesses“.",
    ),
    mechanism: t(
      "Makes offers fit each customer's behaviour, without asking the customer first.",
      "Lässt Angebote zum Verhalten jedes Kunden passen, ohne den Kunden vorher zu fragen.",
    ),
    needs: t(
      "A data-protection review that may not approve it. Customers can object at any time.",
      "Eine Datenschutzprüfung, die es vielleicht nicht freigibt. Kunden können jederzeit widersprechen.",
    ),
    cost: 60000,
    weeks: 10,
    data: "beyond" as DataClass,
    effort: "auto" as Effort,
    reachAll: true,
    targets: ["relevance"] as NeedId[],
    model: {
      effect: 3 as 1 | 2 | 3,
      acceptance: 1 as 1 | 2 | 3,
      note: t(
        "It would fit and it would reach everyone, but data the customers have not agreed to share for this purpose caps acceptance at 1.",
        "Sie würde passen und alle erreichen, aber Daten, deren Weitergabe für diesen Zweck die Kunden nicht zugestimmt haben, begrenzen die Akzeptanz auf 1.",
      ),
    },
    verdict: t(
      "Rejected: data protection. Customers who feel watched object, and every objection removes the customer from the measure.",
      "Abgelehnt: Datenschutz. Kunden, die sich beobachtet fühlen, widersprechen, und jeder Widerspruch nimmt den Kunden aus der Maßnahme.",
    ),
  },
  {
    id: "news" as MeasureId,
    name: t("Monthly product newsletter", "Monatlicher Produkt-Newsletter"),
    what: t("A monthly newsletter with product news to all 1,500 customers.", "Ein monatlicher Newsletter mit Produktneuigkeiten an alle 1.500 Kunden."),
    mechanism: t(
      "Adds more of the same message. It does not fit any customer's own situation.",
      "Fügt mehr von derselben Nachricht hinzu. Sie passt zu keiner eigenen Situation eines Kunden.",
    ),
    needs: t("Content time from marketing. No approval needed.", "Redaktionszeit aus dem Marketing. Keine Freigabe nötig."),
    cost: 12000,
    weeks: 2,
    data: "none" as DataClass,
    effort: "auto" as Effort,
    reachAll: true,
    targets: [] as NeedId[],
    model: {
      effect: 1 as 1 | 2 | 3,
      acceptance: 3 as 1 | 2 | 3,
      note: t(
        "It acts on none of the six needs. More generic mail makes the fit problem worse.",
        "Sie wirkt auf keines der sechs Bedürfnisse. Mehr allgemeine Post verschärft das Passungsproblem.",
      ),
    },
    verdict: t(
      "Rejected: it answers no need and repeats the very thing customers complain about in touchpoints 06 and 07.",
      "Abgelehnt: Sie beantwortet kein Bedürfnis und wiederholt genau das, worüber sich Kunden in den Touchpoints 06 und 07 beschweren.",
    ),
  },
]);

export const MEASURE_BY_ID = Object.fromEntries(MEASURES.map((m) => [m.id, m])) as Record<MeasureId, Measure>;
export const MEASURE_IDS = MEASURES.map((m) => m.id);
export const CHOOSE = 3;

export const scalabilityOf = (id: MeasureId): 1 | 2 | 3 => EFFORT_SCORE[MEASURE_BY_ID[id].effort];
export const acceptCapOf = (id: MeasureId): 1 | 2 | 3 => ACCEPT_CAP[MEASURE_BY_ID[id].data];

export const modelScore = (id: MeasureId) => {
  const m = MEASURE_BY_ID[id];
  return m.model.effect * m.model.acceptance * scalabilityOf(id);
};

/** The rules taught in Materi A7, in one place. */
export const RULES = bi({
  acceptance: t(
    "Acceptance: at most 3 if the measure uses no customer data or only facts the customer already gave under the contract; at most 2 if it uses usage data only for customers who agreed to share it; 1 if it goes beyond what the customer agreed.",
    "Akzeptanz: höchstens 3, wenn die Maßnahme keine Kundendaten oder nur Angaben nutzt, die der Kunde im Rahmen des Vertrags schon gegeben hat; höchstens 2, wenn sie Nutzungsdaten nur von Kunden nutzt, die der Weitergabe zugestimmt haben; 1, wenn sie über das hinausgeht, dem der Kunde zugestimmt hat.",
  ),
  scale: t(
    "Scalability: 3 if an additional customer costs nothing more once it is built, 2 if it takes a small standard step, 1 if it takes a person's time.",
    "Skalierbarkeit: 3, wenn ein zusätzlicher Kunde nichts mehr kostet, sobald die Maßnahme gebaut ist; 2, wenn er einen kleinen Standardschritt braucht; 1, wenn er die Zeit eines Menschen braucht.",
  ),
  effect: t(
    "Effect: start from the need it acts on: 3 if it appears in three or more of your touchpoints, 2 if in two, 1 if in one or none. Take one off (never below 1) if the measure reaches only part of the customers.",
    "Wirkung: Gehen Sie von dem Bedürfnis aus, auf das sie wirkt: 3, wenn es in drei oder mehr Ihrer Touchpoints vorkommt, 2, wenn in zwei, 1, wenn in einem oder keinem. Ziehen Sie eins ab (nie unter 1), wenn die Maßnahme nur einen Teil der Kunden erreicht.",
  ),
});

/**
 * The reference answer: the three measures with the highest model score that act on different needs. Their total cost fits the budget
 * with the loyalty concept; all four that work do not.
 */
export const MODEL_MEASURES: MeasureId[] = ["refs", "review", "usage"];
export const MODEL_COST = MODEL_MEASURES.reduce((s, id) => s + MEASURE_BY_ID[id].cost, 0);
export const WORKING_FOUR: MeasureId[] = ["refs", "review", "usage", "transparency"];
export const WORKING_FOUR_COST = WORKING_FOUR.reduce((s, id) => s + MEASURE_BY_ID[id].cost, 0);

export const BUCKET_LABEL: Record<1 | 2 | 3, string> = bi({ 1: t("Low (1)", "Niedrig (1)"), 2: t("Mid (2)", "Mittel (2)"), 3: t("High (3)", "Hoch (3)") });
