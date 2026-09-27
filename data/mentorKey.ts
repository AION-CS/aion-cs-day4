import { bi, t } from "@/lib/lang";
import type { ApproachTrigger } from "@/data/approaches";
import { FEELINGS } from "@/data/feelings";
import type { FeelingId } from "@/data/feelings";
import { FAILING_LINES, LINES } from "@/data/triggers";
import type { LineId, TriggerId } from "@/data/triggers";
import type { EmotionId, NeedId } from "@/data/needs";
import { FIG, RISK_TRUTH } from "@/data/custBase";
import type { MeasureLetter, RiskPickId } from "@/data/custBase";
import { TOUCHPOINTS, TRUTH_COUNTS, TRUTH_LEFT, strengthOf, strengthPoints } from "@/data/touchpoints";
import type { InfoId, Strength, TouchId } from "@/data/touchpoints";
import { MEASURE_BY_ID, MODEL_MEASURES, scalabilityOf } from "@/data/measures";
import type { MeasureId } from "@/data/measures";
import { MODEL_BENEFITS, MODEL_ENTRY, MODEL_HORIZON, MODEL_TYPE } from "@/data/loyalty";
import {
  BEHAVIOUR_LEVERS,
  MODEL_ARCH,
  MODEL_LEVELS,
  MODEL_RISKS,
  MODEL_START,
  MODEL_SYSTEMS,
  MODEL_TRIGGER,
  MODEL_TRIPWIRE,
  MODEL_VISION,
  OWNER_ACCEPT,
  RISK_BY_ID,
  SYSTEM_BY_ID,
} from "@/data/route2";
import type { ArchId, Criterion, LeverKind, LevelId, GroupId, OwnerId, PhaseId, RiskId, SystemId, VisionId } from "@/data/route2";

/**
 * Every model answer of the day, in one file. "Fill all model answers" in the mentor bar enters these, so that after one fill every
 * route's missing list is empty and every export downloads at once. The answer keys (lib/answerKey.ts) and the worked answers
 * (lib/mentorGuide.ts) read the same constants, so the three cannot drift apart. A convenience for facilitators, not security.
 *
 * The free text of a model answer is bilingual (`t(en, de)` inside `bi(...)`): in German, "Fill all model answers" enters German
 * text. Stored ids and figures stay the English constants.
 */
export const MENTOR_PASSCODE = "muchson123";

/* ------------------------------------------------------------------ Route 1 */

const feelingTags = Object.fromEntries(FEELINGS.map((f) => [f.id, f.truth])) as Record<FeelingId, EmotionId>;
const lineTags = Object.fromEntries(LINES.map((l) => [l.id, l.truth])) as Record<LineId, TriggerId>;
const touchTags = Object.fromEntries(TOUCHPOINTS.map((p) => [p.id, p.truth])) as Record<TouchId, NeedId>;

const patternDefs: { need: NeedId; behaviour: ReturnType<typeof t> }[] = [
  {
    need: "trust" as NeedId,
    behaviour: t(
      "When a promise is not kept or a prospect asks for someone to call, customers lose confidence and leave or stop attending, because they cannot check that CloudTech does what it says.",
      "Wenn ein Versprechen nicht gehalten wird oder ein Interessent nach jemandem zum Anrufen fragt, verlieren Kunden das Vertrauen und gehen oder kommen nicht mehr, weil sie nicht prüfen können, ob CloudTech tut, was es sagt.",
    ),
  },
  {
    need: "relevance" as NeedId,
    behaviour: t(
      "When they receive letters, newsletters or upsell mails that ignore what they bought, customers complain or ask to be taken off the list, because the message could have gone to anybody.",
      "Wenn sie Briefe, Newsletter oder Upsell-Mails bekommen, die ignorieren, was sie gekauft haben, beschweren sich Kunden oder bitten, aus dem Verteiler genommen zu werden, weil die Nachricht an jeden hätte gehen können.",
    ),
  },
  {
    need: "security" as NeedId,
    behaviour: t(
      "When something breaks or they ask where their data is, customers feel exposed and leave or complain, because CloudTech cannot tell them fast and clearly that they are protected.",
      "Wenn etwas ausfällt oder sie fragen, wo ihre Daten liegen, fühlen sich Kunden schutzlos und gehen oder beschweren sich, weil CloudTech ihnen nicht schnell und klar sagen kann, dass sie geschützt sind.",
    ),
  },
  {
    need: "belonging" as NeedId,
    behaviour: t(
      "When they ask to meet other customers and find no place to do it, customers complain but stay for now, because they want a circle of peers that CloudTech does not offer.",
      "Wenn sie andere Kunden treffen möchten und keinen Ort dafür finden, beschweren sich Kunden, bleiben aber vorerst, weil sie einen Kreis von Gleichgesinnten wollen, den CloudTech nicht bietet.",
    ),
  },
];

export const KEY_L1 = bi({
  sort: feelingTags,
  extraFactor: t(
    "A public downtime record that anyone can read before signing, updated live. It serves security: the customer can see how the provider behaves when things go wrong, without having to take its word for it.",
    "Ein öffentliches Ausfallprotokoll, das jeder vor der Unterschrift lesen kann, live aktualisiert. Es dient der Sicherheit: Der Kunde sieht, wie der Anbieter sich verhält, wenn etwas schiefgeht, ohne dessen Wort glauben zu müssen.",
  ),
  trig: lineTags,
  noSend: FAILING_LINES as LineId[],
  approaches: [
    {
      emotion: "trust" as EmotionId,
      trigger: "proof" as ApproachTrigger,
      text: t(
        "We will offer every prospect a call with a comparable, named customer before the proposal, so that the customer feels the choice is backed by someone like them, because trust is built from people the customer can check and not from claims about ourselves.",
        "Wir bieten jedem Interessenten vor dem Angebot ein Gespräch mit einem vergleichbaren, namentlich genannten Kunden an, damit der Kunde spürt, dass die Wahl von jemandem wie ihm getragen wird, denn Vertrauen entsteht aus Menschen, die der Kunde prüfen kann, und nicht aus Behauptungen über uns selbst.",
      ),
    },
    {
      emotion: "security" as EmotionId,
      trigger: "none" as ApproachTrigger,
      text: t(
        "We will write the data location, the restore time and the liability cover into every offer, so that the customer feels protected and can show it to their board, because the fear of a bad outcome weighs more than a discount.",
        "Wir schreiben Datenstandort, Wiederherstellungszeit und Haftungsdeckung in jedes Angebot, damit der Kunde sich geschützt fühlt und es seinem Vorstand zeigen kann, denn die Angst vor einem schlechten Ausgang wiegt schwerer als ein Rabatt.",
      ),
    },
    {
      emotion: "belonging" as EmotionId,
      trigger: "none" as ApproachTrigger,
      text: t(
        "We will invite customers to two round tables a year with peers from their industry, so that the customer feels part of a circle and not a ticket number, because people stay where they are among others like them.",
        "Wir laden Kunden zweimal im Jahr zu Round Tables mit Kollegen aus ihrer Branche ein, damit der Kunde sich als Teil eines Kreises fühlt und nicht als Ticketnummer, denn Menschen bleiben dort, wo sie unter ihresgleichen sind.",
      ),
    },
  ],
  figs: { F1: String(FIG.F1), F2: String(FIG.F2), F3: String(FIG.F3) },
  sentence: t(
    "Measure B reaches only 450 of the 1,500 customers, at €100 for each one reached, because only 40% agreed to usage analysis and 75% of those have usable data. The bonus programme would cost €90,000 in six months, half the budget, and most of it goes to customers who would have stayed. With a small budget and strict data protection I would fund B first, for the customers who agreed, and leave the newsletter as it is.",
    "Maßnahme B erreicht nur 450 der 1.500 Kunden, bei 100 € für jeden erreichten Kunden, weil nur 40 % der Nutzungsanalyse zugestimmt haben und 75 % davon nutzbare Daten haben. Das Bonusprogramm würde in sechs Monaten 90.000 € kosten, die Hälfte des Budgets, und der größte Teil geht an Kunden, die ohnehin geblieben wären. Bei kleinem Budget und strengem Datenschutz würde ich B zuerst für die Kunden finanzieren, die zugestimmt haben, und den Newsletter lassen, wie er ist.",
  ),
  risks: RISK_TRUTH as Record<MeasureLetter, RiskPickId>,
  reflect: {
    assume: t(
      "I assumed that a better offer text would win customers back, so I first looked for the features CloudTech should mention. In the statements the strongest reasons were about protection and being known, not about features.",
      "Ich nahm an, dass ein besserer Angebotstext Kunden zurückgewinnt, und suchte zuerst nach den Funktionen, die CloudTech nennen sollte. In den Aussagen ging es bei den stärksten Gründen um Schutz und darum, gekannt zu werden, nicht um Funktionen.",
    ),
    tip: t(
      "My usage-based approach tips into rejection where an offer is too close to what the customer just did, or arrives without a reason for using their data. Customers who did not agree would feel watched and could object.",
      "Mein nutzungsbasierter Ansatz kippt in Ablehnung, wo ein Angebot zu nah an dem liegt, was der Kunde gerade getan hat, oder ohne Grund für die Nutzung seiner Daten kommt. Kunden, die nicht zugestimmt haben, würden sich beobachtet fühlen und könnten widersprechen.",
    ),
    manager: t(
      "A strategic decision-maker would fund first what reaches every customer and needs no personal data, such as the references and the review, and would add the usage-based offers only for customers who agreed, staged, with a check on objections.",
      "Ein strategischer Entscheider würde zuerst finanzieren, was jeden Kunden erreicht und keine personenbezogenen Daten braucht, etwa die Referenzen und das Review, und die nutzungsbasierten Angebote nur für Kunden ergänzen, die zugestimmt haben, gestaffelt und mit einer Kontrolle der Widersprüche.",
    ),
  },
  tags: touchTags,
  patterns: patternDefs.map((r) => {
    const pts = strengthPoints(TRUTH_COUNTS[r.need], TRUTH_LEFT[r.need]);
    return { ...r, strength: strengthOf(pts) as Strength };
  }),
  info: ["renewed", "consent", "next"] as InfoId[],
  infoText: t(
    "For the customers who left, what did they expect CloudTech to know about them at renewal that it did not, in their own words?",
    "Was haben die Kunden, die gegangen sind, beim Renewal von CloudTech erwartet zu wissen über sie, was es nicht wusste, in ihren eigenen Worten?",
  ),
  chosen: MODEL_MEASURES,
  aims: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_BY_ID[id].targets])) as Record<string, NeedId[]>,
  eff: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_BY_ID[id].model.effect])),
  acc: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_BY_ID[id].model.acceptance])),
  sca: Object.fromEntries(MODEL_MEASURES.map((id) => [id, scalabilityOf(id)])),
  order: ["refs", "review", "usage"] as MeasureId[],
  why: t(
    "The references go first: trust is the strongest need, in three touchpoints and two lost customers, and they reach every customer and need no data. The review is second: it replaces a discount with a benefit and reaches everyone. The usage-based offers come third: they fit the customer, but only for the 450 who can be reached. Refs and review score 18, the offers 12. Together they cost €129,000 of the €180,000, and the loyalty concept fits in the rest.",
    "Die Referenzen kommen zuerst: Vertrauen ist das stärkste Bedürfnis, in drei Touchpoints und bei zwei verlorenen Kunden, und sie erreichen jeden Kunden und brauchen keine Daten. Das Review ist zweites: Es ersetzt einen Rabatt durch einen Vorteil und erreicht alle. Die nutzungsbasierten Angebote kommen drittens: Sie passen zum Kunden, aber nur für die 450, die erreichbar sind. Referenzen und Review erreichen 18, die Angebote 12. Zusammen kosten sie 129.000 € der 180.000 €, und das Loyalty-Konzept passt in den Rest.",
  ),
  loyType: MODEL_TYPE,
  loyBenefits: MODEL_BENEFITS,
  loyEntry: MODEL_ENTRY,
  loyHorizon: MODEL_HORIZON,
  loyWhy: t(
    "A customer stays for the circle and the say in what is built, not for a discount: if the round tables and the early access stopped, they would miss them, and a rebate they would not. Belonging was not reached by any of the three measures, and status stands behind the early access. Members join by choice, and what they get grows with each year they stay.",
    "Ein Kunde bleibt wegen des Kreises und der Mitsprache bei dem, was gebaut wird, nicht wegen eines Rabatts: Wenn die Round Tables und der frühe Zugang endeten, würde er sie vermissen, einen Rabatt nicht. Zugehörigkeit wurde von keiner der drei Maßnahmen erreicht, und Status steht hinter dem frühen Zugang. Mitglieder treten freiwillig bei, und was sie bekommen, wächst mit jedem Jahr, das sie bleiben.",
  ),
});

/* ------------------------------------------------------------------ Route 2 */

const leverMove: Record<LeverKind, ReturnType<typeof t>> = {
  emotion: t(
    "Every customer is invited to a yearly conversation with a named person from customer success, before the renewal talk, whoever the account is with. It is a step of the renewal process.",
    "Jeder Kunde wird vor dem Renewal-Gespräch zu einem jährlichen Gespräch mit einer namentlich genannten Person aus dem Customer Success eingeladen, egal, bei wem der Account liegt. Es ist ein Schritt des Renewal-Prozesses.",
  ),
  trust: t(
    "Every onboarding plan carries dates the customer can see, and a missed date triggers a call from the Head of Delivery within one working day. It is a rule of the process, not a favour of one engineer.",
    "Jeder Onboarding-Plan enthält Termine, die der Kunde sehen kann, und ein verpasster Termin löst innerhalb eines Werktags einen Anruf der Leitung Delivery aus. Es ist eine Regel des Prozesses, keine Gefälligkeit eines einzelnen Ingenieurs.",
  ),
  relevance: t(
    "Every message to a customer is chosen by what CloudTech knows about them and may use: their tier, their products and, if they agreed, their usage. Nothing goes to everyone unless it is a plain notice.",
    "Jede Nachricht an einen Kunden wird danach gewählt, was CloudTech über ihn weiß und nutzen darf: seine Vertragsstufe, seine Produkte und, wenn er zugestimmt hat, seine Nutzung. Nichts geht an alle, außer einer schlichten Mitteilung.",
  ),
};

export const KEY_R2 = bi({
  vision: MODEL_VISION as VisionId,
  visionText: t(
    "In twelve months a customer says: “CloudTech knows my business, tells me the truth and looks after me”, and shows it by renewing without asking for a discount, answering invitations and agreeing to share usage data. We would see it in the renewal rate and in the opt-in share.",
    "In zwölf Monaten sagt ein Kunde: „CloudTech kennt mein Geschäft, sagt mir die Wahrheit und kümmert sich um mich“, und zeigt es, indem er ohne Rabattforderung verlängert, auf Einladungen antwortet und der Weitergabe von Nutzungsdaten zustimmt. Wir würden es an der Renewal-Quote und am Opt-in-Anteil sehen.",
  ),
  levers: Object.fromEntries(
    BEHAVIOUR_LEVERS.map((l) => [
      l.id,
      {
        question: l.questionTruth,
        signal: l.signalTruth,
        phase: l.phaseAccept[0],
        move: leverMove[l.id],
      },
    ]),
  ) as unknown as Record<LeverKind, { question: string; signal: string; phase: PhaseId; move: ReturnType<typeof t> }>,
  levels: MODEL_LEVELS as Record<GroupId, LevelId>,
  weigh: t(
    "Group A goes to level 3 because those 450 customers agreed to usage analysis, and it adds 18 responders over level 2 (45 against 27). Group B stays at level 2 and the prospects at level 1, because their data allows no more. Level 4 would cost €190,000, €115,000 more than level 3, for one more point of response, and it needs a consent CloudTech does not hold.",
    "Gruppe A geht auf Stufe 3, weil diese 450 Kunden der Nutzungsanalyse zugestimmt haben, und sie bringt 18 Reagierende mehr als Stufe 2 (45 gegen 27). Gruppe B bleibt auf Stufe 2 und die Interessenten auf Stufe 1, weil ihre Daten nicht mehr erlauben. Stufe 4 würde 190.000 € kosten, 115.000 € mehr als Stufe 3, für einen Punkt mehr Response, und sie braucht eine Einwilligung, die CloudTech nicht hat.",
  ),
  systems: MODEL_SYSTEMS as SystemId[],
  rate: Object.fromEntries(MODEL_SYSTEMS.flatMap((id) => (["reach", "depth", "durability", "scale"] as Criterion[]).map((c) => [`${id}.${c}`, SYSTEM_BY_ID[id].model[c]]))) as Record<string, number>,
  mainLever: "trust" as LeverKind,
  mainWhy: t(
    "Trust was the strongest need in Route 1: three touchpoints and two lost customers. The reference programme answers it for every prospect and every renewing customer, it is a step of the process and it works whoever is on duty.",
    "Vertrauen war das stärkste Bedürfnis in Route 1: drei Touchpoints und zwei verlorene Kunden. Das Referenzprogramm beantwortet es für jeden Interessenten und jeden verlängernden Kunden, es ist ein Schritt des Prozesses und wirkt, wer auch immer Dienst hat.",
  ),
  risks: MODEL_RISKS as RiskId[],
  riskLik: Object.fromEntries(MODEL_RISKS.map((id) => [id, RISK_BY_ID[id].model.likelihood])) as Record<string, number>,
  riskImp: Object.fromEntries(MODEL_RISKS.map((id) => [id, RISK_BY_ID[id].model.impact])) as Record<string, number>,
  riskSignal: Object.fromEntries(MODEL_RISKS.map((id) => [id, RISK_BY_ID[id].signalTruth])) as Record<string, string>,
  riskResponse: {
    overpersonal: t(
      "If objections to marketing messages rise above 20 per 1,000 customers in a quarter, or double in the first month of personalised offers, we pause the offers for that group and the data-protection officer reviews them within two weeks.",
      "Wenn die Widersprüche gegen Marketing-Nachrichten in einem Quartal über 20 pro 1.000 Kunden steigen oder sich im ersten Monat personalisierter Angebote verdoppeln, pausieren wir die Angebote für diese Gruppe, und der Datenschutzbeauftragte prüft sie innerhalb von zwei Wochen.",
    ),
    consent: t(
      "If the opt-in share falls for two months in a row, or more than 5% of members withdraw in one month, we stop new personalised sends and interview ten customers who withdrew within three weeks.",
      "Wenn der Opt-in-Anteil zwei Monate in Folge sinkt oder mehr als 5 % der Mitglieder in einem Monat widerrufen, stoppen wir neue personalisierte Sendungen und befragen innerhalb von drei Wochen zehn Kunden, die widerrufen haben.",
    ),
    accept: t(
      "If fewer than one in five invited customers has joined by month 3, we change the invitation and the first benefit, and interview ten customers who did not join.",
      "Wenn bis Monat 3 weniger als jeder fünfte eingeladene Kunde beigetreten ist, ändern wir die Einladung und den ersten Vorteil und befragen zehn Kunden, die nicht beigetreten sind.",
    ),
  } as Record<string, ReturnType<typeof t>>,
  arch: MODEL_ARCH as ArchId[],
  start: MODEL_START as Record<string, number>,
  owner: Object.fromEntries(MODEL_ARCH.map((id) => [id, OWNER_ACCEPT[id][0]])) as Record<string, OwnerId>,
  trigger: MODEL_TRIGGER as Record<string, string>,
  postponed: t(
    "The retention dashboard (€36,000) is left out. The five funded items cost €237,000 of the €240,000, and the dashboard would take the plan to €273,000. Until then the renewal rate, the opt-in share and the objections are read from the CRM by hand in the monthly review.",
    "Das Retention-Dashboard (36.000 €) bleibt draußen. Die fünf finanzierten Punkte kosten 237.000 € der 240.000 €, und das Dashboard würde den Plan auf 273.000 € bringen. Bis dahin werden Renewal-Quote, Opt-in-Anteil und Widersprüche im monatlichen Review von Hand aus dem CRM gelesen.",
  ),
  pickup: t(
    "If the manual monthly review takes more than 2 days or misses a figure by month 6, we fund the dashboard from the next budget round.",
    "Wenn das manuelle monatliche Review mehr als 2 Tage braucht oder bis Monat 6 eine Kennzahl verfehlt, finanzieren wir das Dashboard aus der nächsten Budgetrunde.",
  ),
  decision: "stage" as const,
  assumptions: [
    t(
      "Customers who agreed to usage analysis welcome offers that fit their use. This is wrong if objections among them rise above 20 per 1,000 in the first quarter.",
      "Kunden, die der Nutzungsanalyse zugestimmt haben, begrüßen Angebote, die zu ihrer Nutzung passen. Das ist falsch, wenn die Widersprüche unter ihnen im ersten Quartal über 20 pro 1.000 steigen.",
    ),
    t(
      "Customers value a service or a circle more than a rebate. This is wrong if fewer than one in five invited customers joins within two months.",
      "Kunden schätzen einen Service oder einen Kreis mehr als einen Rabatt. Das ist falsch, wenn weniger als jeder fünfte eingeladene Kunde innerhalb von zwei Monaten beitritt.",
    ),
    t(
      "Consent stays once it is given, if it is honoured at once. This is wrong if the opt-in share falls for two months in a row.",
      "Die Einwilligung bleibt bestehen, wenn sie einmal gegeben ist und sofort beachtet wird. Das ist falsch, wenn der Opt-in-Anteil zwei Monate in Folge sinkt.",
    ),
  ],
  tripKpi: MODEL_TRIPWIRE.kpi,
  tripThreshold: String(MODEL_TRIPWIRE.threshold),
  tripMonth: MODEL_TRIPWIRE.month,
  tripAction: "adjust" as const,
  challenge: t(
    "I would go back to the tripwire and the objection figures before spending more. The opt-in share is rising, so consent still works, and the objections show that the offers come too close to what customers did. I keep the review and the round tables, pause the usage-based offers for the customers who objected, and change one lever: how often and how the offers are worded. I would interview five of the customers who objected within two weeks and report to the board what they say.",
    "Ich würde zum Tripwire und zu den Widerspruchszahlen zurückgehen, bevor ich mehr ausgebe. Der Opt-in-Anteil steigt, die Einwilligung funktioniert also noch, und die Widersprüche zeigen, dass die Angebote zu nah an dem liegen, was Kunden getan haben. Ich behalte das Review und die Round Tables, pausiere die nutzungsbasierten Angebote für die Kunden, die widersprochen haben, und ändere einen Hebel: wie oft und wie die Angebote formuliert sind. Ich würde innerhalb von zwei Wochen fünf der Kunden befragen, die widersprochen haben, und dem Board berichten, was sie sagen.",
  ),
});

// `MODEL_TRIGGER` is itself bilingual (read when used); `bi()` above would freeze its current language, so it is attached lazily.
Object.defineProperty(KEY_R2, "trigger", { get: () => MODEL_TRIGGER as Record<string, string>, enumerable: true, configurable: true });
