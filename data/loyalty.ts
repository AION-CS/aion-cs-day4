import type { NeedId } from "@/data/needs";
import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 2.4. The simple loyalty concept a learner designs for CloudTech: a main type, two benefits from a menu with printed
 * costs, how customers join, and how the benefit lasts. The concept's cost is added to the three measures of Block 2.3 and the total is
 * held against the €180,000. Every figure is a Case assumption. The rules the concept is checked against are taught in Materi A5 and A7.
 */
export type LoyaltyType = "bonus" | "service" | "community";
export const LOYALTY_TYPES: { id: LoyaltyType; label: string; what: string; builds: string; lasts: string }[] = bi([
  {
    id: "bonus" as LoyaltyType,
    label: t("Bonus", "Bonus"),
    what: t(
      "The customer receives money or something that stands for money: a rebate, points, vouchers.",
      "Der Kunde erhält Geld oder etwas, das für Geld steht: einen Rabatt, Punkte, Gutscheine.",
    ),
    builds: t(
      "A reason to buy again soon. It does not change how the customer feels about CloudTech.",
      "Einen Grund, bald wieder zu kaufen. Es ändert nichts daran, wie der Kunde über CloudTech empfindet.",
    ),
    lasts: t(
      "Only while the reward continues. The cost repeats on every member, including those who would have stayed.",
      "Nur solange die Belohnung weiterläuft. Die Kosten fallen bei jedem Mitglied wieder an, auch bei denen, die geblieben wären.",
    ),
  },
  {
    id: "service" as LoyaltyType,
    label: t("Service", "Service"),
    what: t(
      "The customer receives help that fits them: a review, a named contact, a priority line.",
      "Der Kunde erhält Hilfe, die zu ihm passt: ein Review, einen namentlich benannten Ansprechpartner, eine Prioritäts-Hotline.",
    ),
    builds: t(
      "Trust and the feeling of being looked after, because the customer sees the use of it.",
      "Vertrauen und das Gefühl, umsorgt zu sein, weil der Kunde den Nutzen sieht.",
    ),
    lasts: t(
      "As long as the service is delivered. It costs per event or per member, but the customer would still want it if the discount disappeared.",
      "Solange der Service geliefert wird. Er kostet pro Ereignis oder pro Mitglied, aber der Kunde würde ihn auch ohne Rabatt noch wollen.",
    ),
  },
  {
    id: "community" as LoyaltyType,
    label: t("Community", "Community"),
    what: t(
      "The customer becomes part of a circle: round tables, a forum, recognition, a say in what is built.",
      "Der Kunde wird Teil eines Kreises: Round Tables, ein Forum, Anerkennung, ein Mitspracherecht bei dem, was gebaut wird.",
    ),
    builds: t(
      "Belonging and standing among peers. Members also help each other, so the value grows with the group.",
      "Zugehörigkeit und Ansehen unter Gleichgestellten. Die Mitglieder helfen einander auch, sodass der Wert mit der Gruppe wächst.",
    ),
    lasts: t(
      "It builds over years and is hard to copy. It needs a reason for people to take part.",
      "Sie wächst über Jahre und ist schwer zu kopieren. Sie braucht einen Grund, warum Menschen mitmachen.",
    ),
  },
]);

export type BenefitId = "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8";
export type Benefit = {
  id: BenefitId;
  name: string;
  type: LoyaltyType;
  what: string;
  /** Cost per member per year, €. */
  perMember: number;
  /** Needs it acts on (reference answer). */
  acts: NeedId[];
  note: string;
};

export const BENEFITS: Benefit[] = bi([
  { id: "b1" as BenefitId, name: t("2% rebate on the annual fee", "2 % Rabatt auf die Jahresgebühr"), type: "bonus" as LoyaltyType, what: t("A discount on the next invoice for every member.", "Ein Nachlass auf die nächste Rechnung für jedes Mitglied."), perMember: 240, acts: [] as NeedId[], note: t("Money. It acts on no need in the evidence, and it stops mattering the day it stops.", "Geld. Es wirkt auf kein Bedürfnis in den Belegen, und es zählt nicht mehr, sobald es endet.") },
  { id: "b2" as BenefitId, name: t("Points on every euro, redeemable for vouchers", "Punkte auf jeden Euro, einlösbar gegen Gutscheine"), type: "bonus" as LoyaltyType, what: t("Members earn points on spending and exchange them for vouchers.", "Mitglieder sammeln Punkte auf Ausgaben und tauschen sie gegen Gutscheine."), perMember: 180, acts: [] as NeedId[], note: t("Money in another form. Customers who plan to leave can collect points too.", "Geld in anderer Form. Auch Kunden, die gehen wollen, können Punkte sammeln.") },
  { id: "b3" as BenefitId, name: t("Named contact and priority line", "Namentlicher Ansprechpartner und Prioritäts-Hotline"), type: "service" as LoyaltyType, what: t("A named person and a line that is answered first.", "Eine namentlich benannte Person und eine Leitung, die zuerst beantwortet wird."), perMember: 150, acts: ["trust", "security"] as NeedId[], note: t("Strong, and it depends on individual people and costs per member.", "Stark, und es hängt von einzelnen Menschen ab und kostet pro Mitglied.") },
  { id: "b4" as BenefitId, name: t("Yearly capacity and security review", "Jährliches Kapazitäts- und Sicherheitsreview"), type: "service" as LoyaltyType, what: t("A one-page report and a 45-minute call about the member's own setup.", "Ein einseitiger Bericht und ein 45-Minuten-Gespräch zum eigenen Setup des Mitglieds."), perMember: 120, acts: ["security", "relevance"] as NeedId[], note: t("Fits the member and shows the risks CloudTech watches. Costs an engineer's time per review.", "Passt zum Mitglied und zeigt die Risiken, die CloudTech im Blick hat. Kostet pro Review Ingenieurzeit.") },
  { id: "b5" as BenefitId, name: t("Early access to new features and a vote on the roadmap", "Früher Zugang zu neuen Funktionen und ein Stimmrecht zur Roadmap"), type: "community" as LoyaltyType, what: t("Members try new features first and vote on what is built next.", "Mitglieder probieren neue Funktionen zuerst aus und stimmen darüber ab, was als Nächstes gebaut wird."), perMember: 30, acts: ["status", "belonging"] as NeedId[], note: t("Cheap, and it gives standing and a say. It reaches members only.", "Günstig, und es gibt Ansehen und Mitsprache. Es erreicht nur Mitglieder.") },
  { id: "b6" as BenefitId, name: t("Round tables and a peer forum", "Round Tables und ein Peer-Forum"), type: "community" as LoyaltyType, what: t("Two round tables a year and an online forum, moderated by CloudTech.", "Zwei Round Tables im Jahr und ein Online-Forum, von CloudTech moderiert."), perMember: 60, acts: ["belonging"] as NeedId[], note: t("Puts customers among peers. Value grows with the group.", "Bringt Kunden unter Gleichgestellte. Der Wert wächst mit der Gruppe.") },
  { id: "b7" as BenefitId, name: t("Partner status and a named customer story", "Partnerstatus und eine namentlich genannte Kundengeschichte"), type: "community" as LoyaltyType, what: t("A “Partner since” badge and a published story that names the customer.", "Ein Siegel „Partner seit“ und eine veröffentlichte Geschichte, die den Kunden nennt."), perMember: 20, acts: ["status"] as NeedId[], note: t("True recognition, visible to outsiders. Cheap.", "Echte Anerkennung, für Außenstehende sichtbar. Günstig.") },
  { id: "b8" as BenefitId, name: t("Extra storage included at renewal", "Zusätzlicher Speicher inklusive beim Renewal"), type: "bonus" as LoyaltyType, what: t("More storage at no charge for members who renew.", "Mehr Speicher ohne Aufpreis für Mitglieder, die verlängern."), perMember: 96, acts: [] as NeedId[], note: t("A discount in kind. Valued only for as long as it is given.", "Ein Rabatt in Sachleistung. Wird nur so lange geschätzt, wie er gewährt wird.") },
]);
export const BENEFIT_BY_ID = Object.fromEntries(BENEFITS.map((b) => [b.id, b])) as Record<BenefitId, Benefit>;
export const BENEFIT_CHOOSE = 2;

/** Members in the window and the set-up cost. Case assumption. */
export const MEMBERS = 600;
export const SETUP = 18000;
export const LOYALTY_MONTHS = 6;

/** Cost of the concept in the six months: set-up + members × per-member cost of the chosen benefits × months ÷ 12. */
export const loyaltyCost = (ids: BenefitId[]) => SETUP + MEMBERS * ids.reduce((s, id) => s + BENEFIT_BY_ID[id].perMember, 0) * (LOYALTY_MONTHS / 12);

export type EntryId = "in" | "auto" | "preticked";
export const ENTRIES: { id: EntryId; label: string; why: string; rejected: string }[] = bi([
  {
    id: "in" as EntryId,
    label: t(
      "Customers join by choice: a clear opt-in that they can withdraw at any time. The benefits use only what members agreed to share.",
      "Kunden treten freiwillig bei: ein klares Opt-in, das sie jederzeit zurücknehmen können. Die Vorteile nutzen nur, was Mitglieder zu teilen zugestimmt haben.",
    ),
    why: t(
      "Consent must be freely given, specific and withdrawable. Members who chose to join can be given benefits that use their data, and the rest are left alone.",
      "Eine Einwilligung muss freiwillig, bestimmt und widerrufbar sein. Mitgliedern, die sich fürs Mitmachen entschieden haben, kann man Vorteile geben, die ihre Daten nutzen, und alle anderen bleiben unberührt.",
    ),
    rejected: "",
  },
  {
    id: "auto" as EntryId,
    label: t(
      "Every customer is enrolled automatically, and usage data is used for the benefits from day one.",
      "Jeder Kunde wird automatisch aufgenommen, und Nutzungsdaten werden ab dem ersten Tag für die Vorteile verwendet.",
    ),
    why: "",
    rejected: t(
      "Using usage data of customers who have not agreed to it is the very measure that data protection rules out. Customers can also object at any time.",
      "Nutzungsdaten von Kunden zu verwenden, die nicht zugestimmt haben, ist genau die Maßnahme, die der Datenschutz ausschließt. Kunden können außerdem jederzeit widersprechen.",
    ),
  },
  {
    id: "preticked" as EntryId,
    label: t(
      "Customers are enrolled unless they untick a box in the next renewal form.",
      "Kunden werden aufgenommen, es sei denn, sie entfernen im nächsten Renewal-Formular ein Häkchen.",
    ),
    why: "",
    rejected: t(
      "A pre-ticked box is not consent (CJEU, Planet49, 2019): consent needs an active step. Enrolling by silence looks like consent and is not.",
      "Ein vorangekreuztes Kästchen ist keine Einwilligung (EuGH, Planet49, 2019): Eine Einwilligung braucht einen aktiven Schritt. Aufnahme durch Schweigen sieht aus wie eine Einwilligung und ist keine.",
    ),
  },
]);
export const MODEL_ENTRY: EntryId = "in";

export type HorizonId = "points" | "tenure" | "welcome";
export const HORIZONS: { id: HorizonId; label: string; why: string; rejected: string }[] = bi([
  {
    id: "tenure" as HorizonId,
    label: t(
      "What a member gets grows with each year of membership, for example a seat in the advisory circle in year three.",
      "Was ein Mitglied bekommt, wächst mit jedem Jahr der Mitgliedschaft, zum Beispiel ein Sitz im Kundenbeirat im dritten Jahr.",
    ),
    why: t(
      "Long-term retention: staying longer earns something a new customer cannot buy. It rewards the relationship, not a single purchase.",
      "Langfristige Retention: Länger zu bleiben bringt etwas, das ein Neukunde nicht kaufen kann. Es belohnt die Beziehung, nicht einen einzelnen Kauf.",
    ),
    rejected: "",
  },
  {
    id: "points" as HorizonId,
    label: t("Every purchase earns points, and the points reset each year.", "Jeder Kauf bringt Punkte, und die Punkte werden jedes Jahr zurückgesetzt."),
    why: "",
    rejected: t(
      "Short-term activation: it rewards the next purchase and starts again at zero. It does not build anything that lasts beyond the reward.",
      "Kurzfristige Aktivierung: Sie belohnt den nächsten Kauf und beginnt wieder bei null. Sie baut nichts auf, was über die Belohnung hinaus hält.",
    ),
  },
  {
    id: "welcome" as HorizonId,
    label: t("A one-time welcome gift when the customer joins.", "Ein einmaliges Willkommensgeschenk, wenn der Kunde beitritt."),
    why: "",
    rejected: t(
      "A one-off gift activates once and leaves nothing that grows. It is a joining incentive, not a reason to stay.",
      "Ein einmaliges Geschenk aktiviert einmal und hinterlässt nichts, was wächst. Es ist ein Beitrittsanreiz, kein Grund zu bleiben.",
    ),
  },
]);
export const MODEL_HORIZON: HorizonId = "tenure";

/** The model concept: two community benefits, opt-in, tenure. */
export const MODEL_TYPE: LoyaltyType = "community";
export const MODEL_BENEFITS: BenefitId[] = ["b5", "b6"];
export const MODEL_LOYALTY_COST = loyaltyCost(MODEL_BENEFITS);

/** How many of the chosen benefits are money-type (they stop mattering when the reward stops). */
export const bonusCount = (ids: BenefitId[]) => ids.filter((id) => BENEFIT_BY_ID[id].type === "bonus").length;
