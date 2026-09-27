import type { NeedId } from "@/data/needs";
import { NEED_IDS } from "@/data/needs";
import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 2.1. Twelve touchpoints from CloudTech's customer journey, each with what happened and what the customer said. The
 * learner tags each with the need the touchpoint left unmet (Materi A6). Every name, quotation and count is a Case assumption (the plan
 * gives the problems: low retention, interchangeable offers, little differentiation). `truth` is never shown outside the mentor answer
 * key. The counts are 3, 3, 2, 2, 1, 1 so the four central needs are unambiguous.
 */
export type TouchId = "p01" | "p02" | "p03" | "p04" | "p05" | "p06" | "p07" | "p08" | "p09" | "p10" | "p11" | "p12";

export type Touchpoint = {
  id: TouchId;
  /** "Touchpoint 01" */
  label: string;
  /** The moment in the journey. */
  moment: string;
  /** Where in the customer's life with CloudTech. */
  stage: string;
  outcome: "left" | "complained";
  text: string;
  truth: NeedId;
  clue: string;
  why: string;
  rejected: Partial<Record<NeedId, string>>;
  /**
   * The exact phrase inside `text` that the test turns on. Shown, for every touchpoint at once, only on "Highlight the key
   * words" — it points at where to look, never at which need it is (CLAUDE.md #4).
   */
  key: string;
};

export const OUTCOME_LABEL = bi({
  left: t("Customer left", "Kunde ist gegangen"),
  complained: t("Complained, stayed", "Hat sich beschwert, ist geblieben"),
});

export const TOUCHPOINTS: Touchpoint[] = bi([
  {
    id: "p01" as TouchId,
    label: t("Touchpoint 01", "Touchpoint 01"),
    moment: t("Proposal", "Angebot"),
    stage: t("Before signing", "Vor der Unterschrift"),
    outcome: "left" as const,
    text: t(
      "The proposal lists eleven customer logos and no names. A prospect asked to speak to one of them; the answer took nine days. The prospect signed with Nordwolke.",
      "Das Angebot listet elf Kundenlogos und keine Namen. Ein Interessent bat darum, mit einem von ihnen zu sprechen; die Antwort dauerte neun Tage. Der Interessent unterschrieb bei Nordwolke.",
    ),
    truth: "trust" as NeedId,
    clue: t("Is the customer asking for a person to rely on, or for a message that fits them?", "Bittet der Kunde um eine Person, auf die er sich verlassen kann, oder um eine Nachricht, die zu ihm passt?"),
    why: t(
      "Eleven logos and no one to call give the prospect nothing to lean on. The unmet need is a reason to rely on CloudTech's word.",
      "Elf Logos und niemand zum Anrufen geben dem Interessenten nichts, worauf er sich stützen kann. Das unerfüllte Bedürfnis ist ein Grund, sich auf das Wort von CloudTech zu verlassen.",
    ),
    rejected: {
      relevance: t(
        "The proposal's content is not the complaint. The prospect wants somebody who can vouch for CloudTech.",
        "Der Inhalt des Angebots ist nicht die Beschwerde. Der Interessent will jemanden, der für CloudTech bürgt.",
      ),
    },
    key: t("the answer took nine days", "die Antwort dauerte neun Tage"),
  },
  {
    id: "p02" as TouchId,
    label: t("Touchpoint 02", "Touchpoint 02"),
    moment: t("Go-live", "Go-live"),
    stage: t("Onboarding", "Onboarding"),
    outcome: "left" as const,
    text: t(
      "The go-live was promised for the 14th. It happened on the 30th, and nobody rang in between. The customer wrote: “They said the 14th. We heard nothing for two weeks.”",
      "Das Go-live war für den 14. zugesagt. Es fand am 30. statt, und zwischendurch rief niemand an. Der Kunde schrieb: „Sie sagten den 14. Zwei Wochen lang haben wir nichts gehört.“",
    ),
    truth: "trust" as NeedId,
    clue: t("What does the customer hold against CloudTech: a bad moment, or a broken promise?", "Was hält der Kunde CloudTech vor: einen schlechten Moment oder ein gebrochenes Versprechen?"),
    why: t(
      "A promised date was missed and nobody explained. The customer is judging whether CloudTech does what it says.",
      "Ein zugesagter Termin wurde verfehlt, und niemand hat es erklärt. Der Kunde beurteilt, ob CloudTech tut, was es sagt.",
    ),
    rejected: {
      timing: t(
        "The go-live was late, but the complaint is the broken promise and the silence, not a message that came at a bad moment.",
        "Das Go-live kam spät, aber die Beschwerde gilt dem gebrochenen Versprechen und dem Schweigen, nicht einer Nachricht, die im falschen Moment kam.",
      ),
    },
    key: t("and nobody rang in between", "und zwischendurch rief niemand an"),
  },
  {
    id: "p03" as TouchId,
    label: t("Touchpoint 03", "Touchpoint 03"),
    moment: t("First review", "Erstes Review"),
    stage: t("Onboarding", "Onboarding"),
    outcome: "complained" as const,
    text: t(
      "The onboarding plan promises a first review after 30 days. For three customers it took place after 70 days. One wrote: “If you cannot keep your own plan, why should I believe the rest?”",
      "Der Onboarding-Plan verspricht ein erstes Review nach 30 Tagen. Bei drei Kunden fand es nach 70 Tagen statt. Einer schrieb: „Wenn Sie Ihren eigenen Plan nicht einhalten können, warum sollte ich dem Rest glauben?“",
    ),
    truth: "trust" as NeedId,
    clue: t("Is the customer judging whether promises are kept?", "Beurteilt der Kunde, ob Versprechen gehalten werden?"),
    why: t(
      "“If you cannot keep your own plan” is a judgement about reliability. The review was a promise, and it was late.",
      "„Wenn Sie Ihren eigenen Plan nicht einhalten können“ ist ein Urteil über Verlässlichkeit. Das Review war ein Versprechen, und es kam zu spät.",
    ),
    rejected: {
      timing: t(
        "The review came late, but the customer is questioning CloudTech's word, not the moment of a message.",
        "Das Review kam spät, aber der Kunde stellt das Wort von CloudTech infrage, nicht den Moment einer Nachricht.",
      ),
    },
    key: t("If you cannot keep your own plan", "Wenn Sie Ihren eigenen Plan nicht einhalten können"),
  },
  {
    id: "p04" as TouchId,
    label: t("Touchpoint 04", "Touchpoint 04"),
    moment: t("Outage", "Ausfall"),
    stage: t("Running", "Laufender Betrieb"),
    outcome: "left" as const,
    text: t(
      "During an outage on a Thursday afternoon, customers heard from CloudTech four hours later, in an automated email with a ticket number. One wrote: “Our own customers rang us before you did. We had no answer for them and no idea whether our data was affected.”",
      "Bei einem Ausfall an einem Donnerstagnachmittag hörten Kunden vier Stunden später von CloudTech, in einer automatischen E-Mail mit Ticketnummer. Einer schrieb: „Unsere eigenen Kunden haben uns angerufen, bevor Sie es getan haben. Wir hatten keine Antwort für sie und keine Ahnung, ob unsere Daten betroffen waren.“",
    ),
    truth: "security" as NeedId,
    clue: t("Was the customer protected while something went wrong?", "War der Kunde geschützt, während etwas schiefging?"),
    why: t(
      "The customer was left exposed: no information, no idea whether the data was affected. The unmet need is protection when something breaks.",
      "Der Kunde wurde schutzlos gelassen: keine Information, keine Ahnung, ob die Daten betroffen waren. Das unerfüllte Bedürfnis ist Schutz, wenn etwas kaputtgeht.",
    ),
    rejected: {
      trust: t(
        "Trust is affected, but the decisive words are about being left exposed during the problem, not about a broken promise.",
        "Vertrauen ist betroffen, aber die entscheidenden Worte handeln davon, während des Problems schutzlos gelassen worden zu sein, nicht von einem gebrochenen Versprechen.",
      ),
    },
    key: t("no idea whether our data was affected", "keine Ahnung, ob unsere Daten betroffen waren"),
  },
  {
    id: "p05" as TouchId,
    label: t("Touchpoint 05", "Touchpoint 05"),
    moment: t("Data-location question", "Frage zum Datenstandort"),
    stage: t("Running", "Laufender Betrieb"),
    outcome: "complained" as const,
    text: t(
      "A customer asked where their backups are stored. The salesperson could not answer and pointed to a data-protection FAQ that does not name the location. The customer: “If you cannot tell me where my data is, I cannot tell my board.”",
      "Ein Kunde fragte, wo seine Backups gespeichert sind. Der Vertriebsmitarbeiter konnte nicht antworten und verwies auf eine Datenschutz-FAQ, die den Standort nicht nennt. Der Kunde: „Wenn Sie mir nicht sagen können, wo meine Daten liegen, kann ich es meinem Vorstand nicht sagen.“",
    ),
    truth: "security" as NeedId,
    clue: t("What does the customer need in order to feel protected in front of their own board?", "Was braucht der Kunde, um sich vor seinem eigenen Vorstand geschützt zu fühlen?"),
    why: t(
      "The customer needs to be sure the data is safe and to be able to say so to the board. That is protection and blame avoidance.",
      "Der Kunde muss sicher sein, dass die Daten sicher sind, und das seinem Vorstand sagen können. Das ist Schutz und Vermeidung von Schuldzuweisung.",
    ),
    rejected: {
      trust: t(
        "The customer does not doubt CloudTech's honesty. They lack the assurance they need to protect themselves.",
        "Der Kunde zweifelt nicht an der Ehrlichkeit von CloudTech. Ihm fehlt die Zusicherung, die er braucht, um sich selbst zu schützen.",
      ),
    },
    key: t("If you cannot tell me where my data is, I cannot tell my board", "Wenn Sie mir nicht sagen können, wo meine Daten liegen, kann ich es meinem Vorstand nicht sagen"),
  },
  {
    id: "p06" as TouchId,
    label: t("Touchpoint 06", "Touchpoint 06"),
    moment: t("Newsletter", "Newsletter"),
    stage: t("Running", "Laufender Betrieb"),
    outcome: "complained" as const,
    text: t(
      "The same newsletter goes to a five-person shop and to a 400-person manufacturer: product news, with no mention of either customer's own setup. A customer replied: “Please take us off. None of this is for us.”",
      "Derselbe Newsletter geht an einen Fünf-Personen-Betrieb und an einen Hersteller mit 400 Mitarbeitenden: Produktneuigkeiten, ohne Bezug auf das eigene Setup eines der beiden Kunden. Ein Kunde antwortete: „Bitte nehmen Sie uns aus dem Verteiler. Nichts davon ist für uns.“",
    ),
    truth: "relevance" as NeedId,
    clue: t("Would the same newsletter have fitted at another time?", "Hätte derselbe Newsletter zu einer anderen Zeit gepasst?"),
    why: t(
      "The content does not fit either customer at any time. The unmet need is relevance.",
      "Der Inhalt passt zu keinem der beiden Kunden, zu keiner Zeit. Das unerfüllte Bedürfnis ist Relevanz.",
    ),
    rejected: {
      timing: t("The content, not the moment, is wrong. It would not fit at any time.", "Falsch ist der Inhalt, nicht der Moment. Er würde zu keiner Zeit passen."),
    },
    key: t("with no mention of either customer's own setup", "ohne Bezug auf das eigene Setup eines der beiden Kunden"),
  },
  {
    id: "p07" as TouchId,
    label: t("Touchpoint 07", "Touchpoint 07"),
    moment: t("Upsell mail", "Upsell-Mail"),
    stage: t("Running", "Laufender Betrieb"),
    outcome: "complained" as const,
    text: t(
      "Twice a year every customer gets “Add our premium backup!”, including the 340 customers who already have it. One replied: “They do not even know what we bought.”",
      "Zweimal im Jahr bekommt jeder Kunde „Ergänzen Sie unser Premium-Backup!“, auch die 340 Kunden, die es schon haben. Einer antwortete: „Sie wissen nicht einmal, was wir gekauft haben.“",
    ),
    truth: "relevance" as NeedId,
    clue: t("Does the message use what CloudTech already knows about this customer?", "Nutzt die Nachricht, was CloudTech über diesen Kunden schon weiß?"),
    why: t(
      "CloudTech ignores what it already knows: the customer has premium backup. The unmet need is fit.",
      "CloudTech ignoriert, was es schon weiß: Der Kunde hat Premium-Backup. Das unerfüllte Bedürfnis ist Passung.",
    ),
    rejected: {
      trust: t(
        "The mail is careless with what CloudTech knows. The complaint is that it does not fit, not that CloudTech breaks promises.",
        "Die Mail geht nachlässig mit dem um, was CloudTech weiß. Die Beschwerde ist, dass sie nicht passt, nicht dass CloudTech Versprechen bricht.",
      ),
    },
    key: t("including the 340 customers who already have it", "auch die 340 Kunden, die es schon haben"),
  },
  {
    id: "p08" as TouchId,
    label: t("Touchpoint 08", "Touchpoint 08"),
    moment: t("Users' day", "Anwendertag"),
    stage: t("Running", "Laufender Betrieb"),
    outcome: "complained" as const,
    text: t(
      "The one users' day was cancelled two years ago, and the forum is a support queue with no customer posts. A customer wrote: “Everyone in our industry seems to talk to each other except through you. I would like to meet the others.”",
      "Der einzige Anwendertag wurde vor zwei Jahren abgesagt, und das Forum ist eine Support-Warteschlange ohne Beiträge von Kunden. Ein Kunde schrieb: „Alle in unserer Branche scheinen miteinander zu reden, nur nicht über Sie. Ich würde gern die anderen kennenlernen.“",
    ),
    truth: "belonging" as NeedId,
    clue: t("Is the customer missing a place among people like them?", "Fehlt dem Kunden ein Ort unter Menschen wie ihm?"),
    why: t(
      "“I would like to meet the others” is the wish to be part of a group. There is nowhere for customers to meet.",
      "„Ich würde gern die anderen kennenlernen“ ist der Wunsch, Teil einer Gruppe zu sein. Es gibt keinen Ort, an dem Kunden sich treffen können.",
    ),
    rejected: {
      status: t("The customer does not ask to be recognised. They ask to meet peers.", "Der Kunde bittet nicht darum, anerkannt zu werden. Er bittet darum, Gleichgestellte zu treffen."),
    },
    key: t("I would like to meet the others", "Ich würde gern die anderen kennenlernen"),
  },
  {
    id: "p09" as TouchId,
    label: t("Touchpoint 09", "Touchpoint 09"),
    moment: t("Peer contact request", "Anfrage nach Kontakt zu Gleichgestellten"),
    stage: t("Running", "Laufender Betrieb"),
    outcome: "complained" as const,
    text: t(
      "A customer asked to be put in touch with another logistics firm on the platform to swap experience. There was no way to do it. “I would stay just to be in that circle, if there was one.”",
      "Ein Kunde bat darum, mit einer anderen Logistikfirma auf der Plattform in Kontakt gebracht zu werden, um Erfahrungen auszutauschen. Es gab keine Möglichkeit dazu. „Ich würde allein deshalb bleiben, um in diesem Kreis zu sein, wenn es ihn gäbe.“",
    ),
    truth: "belonging" as NeedId,
    clue: t("What does the customer want from the other customers?", "Was will der Kunde von den anderen Kunden?"),
    why: t(
      "The customer wants a circle of peers. The word “circle” names the belonging that is missing.",
      "Der Kunde will einen Kreis von Gleichgestellten. Das Wort „Kreis“ benennt die fehlende Zugehörigkeit.",
    ),
    rejected: {
      trust: t(
        "The customer is not asking whether CloudTech keeps its word. They ask for contact with peers.",
        "Der Kunde fragt nicht, ob CloudTech sein Wort hält. Er bittet um Kontakt zu Gleichgestellten.",
      ),
    },
    key: t("I would stay just to be in that circle", "Ich würde allein deshalb bleiben, um in diesem Kreis zu sein"),
  },
  {
    id: "p10" as TouchId,
    label: t("Touchpoint 10", "Touchpoint 10"),
    moment: t("Eight-year customer", "Kunde seit acht Jahren"),
    stage: t("Renewal", "Renewal"),
    outcome: "left" as const,
    text: t(
      "A customer of eight years received the same renewal letter and the same price as a customer of eight months. He wrote: “Eight years, and nobody here has ever said thank you or treated us differently.”",
      "Ein Kunde seit acht Jahren erhielt denselben Renewal-Brief und denselben Preis wie ein Kunde seit acht Monaten. Er schrieb: „Acht Jahre, und niemand hier hat je Danke gesagt oder uns anders behandelt.“",
    ),
    truth: "status" as NeedId,
    clue: t("Is the customer missing something that fits, or acknowledgement of who they are?", "Vermisst der Kunde etwas, das passt, oder Anerkennung dafür, wer er ist?"),
    why: t(
      "He misses recognition of eight years as a customer: standing. “Said thank you” and “treated us differently” are about acknowledgement.",
      "Er vermisst Anerkennung für acht Jahre als Kunde: Ansehen. „Danke gesagt“ und „anders behandelt“ betreffen Anerkennung.",
    ),
    rejected: {
      relevance: t(
        "The letter is generic, but the decisive words are about recognition of the relationship, not about fit.",
        "Der Brief ist allgemein, aber die entscheidenden Worte betreffen die Anerkennung der Beziehung, nicht die Passung.",
      ),
    },
    key: t("nobody here has ever said thank you or treated us differently", "niemand hier hat je Danke gesagt oder uns anders behandelt"),
  },
  {
    id: "p11" as TouchId,
    label: t("Touchpoint 11", "Touchpoint 11"),
    moment: t("Renewal timing", "Renewal-Zeitpunkt"),
    stage: t("Renewal", "Renewal"),
    outcome: "left" as const,
    text: t(
      "The renewal offer is sent by a batch job 90 days before the term ends. One customer received it eleven days after a serious outage. He replied: “You choose this week to ask me to sign for three more years?” and did not renew.",
      "Das Renewal-Angebot wird per Batch-Job 90 Tage vor Laufzeitende versendet. Ein Kunde erhielt es elf Tage nach einem schweren Ausfall. Er antwortete: „Ausgerechnet diese Woche bitten Sie mich, für drei weitere Jahre zu unterschreiben?“ und verlängerte nicht.",
    ),
    truth: "timing" as NeedId,
    clue: t("Would the same offer have worked at another moment?", "Hätte dasselbe Angebot in einem anderen Moment funktioniert?"),
    why: t(
      "The offer itself was ordinary. It arrived when the customer could not hear it. The unmet need is timing.",
      "Das Angebot selbst war gewöhnlich. Es kam, als der Kunde es nicht hören konnte. Das unerfüllte Bedürfnis ist Timing.",
    ),
    rejected: {
      security: t("The outage matters, but the decisive words are about the moment the offer arrived.", "Der Ausfall zählt, aber die entscheidenden Worte betreffen den Moment, in dem das Angebot kam."),
    },
    key: t("eleven days after a serious outage", "elf Tage nach einem schweren Ausfall"),
  },
  {
    id: "p12" as TouchId,
    label: t("Touchpoint 12", "Touchpoint 12"),
    moment: t("Renewal letter", "Renewal-Brief"),
    stage: t("Renewal", "Renewal"),
    outcome: "left" as const,
    text: t(
      "Ninety days before the term ends every customer gets the same renewal letter at list price. A customer using 20% of his storage was offered the same package as one at 95%. Reply: “This letter could have gone to anybody.”",
      "Neunzig Tage vor Laufzeitende bekommt jeder Kunde denselben Renewal-Brief zum Listenpreis. Einem Kunden, der 20 % seines Speichers nutzt, wurde dasselbe Paket angeboten wie einem mit 95 %. Antwort: „Dieser Brief hätte an jeden gehen können.“",
    ),
    truth: "relevance" as NeedId,
    clue: t("Does the letter fit this customer's own situation?", "Passt der Brief zur eigenen Situation dieses Kunden?"),
    why: t(
      "The offer ignores the customer's usage. “Could have gone to anybody” is the mark of a missing fit.",
      "Das Angebot ignoriert die Nutzung des Kunden. „Hätte an jeden gehen können“ ist das Kennzeichen fehlender Passung.",
    ),
    rejected: {
      status: t(
        "The customer is not asking for recognition of tenure. He points out that the offer does not fit his use.",
        "Der Kunde bittet nicht um Anerkennung seiner Kundendauer. Er weist darauf hin, dass das Angebot nicht zu seiner Nutzung passt.",
      ),
    },
    key: t("This letter could have gone to anybody", "Dieser Brief hätte an jeden gehen können"),
  },
]);

export const TOUCH_BY_ID = Object.fromEntries(TOUCHPOINTS.map((p) => [p.id, p])) as Record<TouchId, Touchpoint>;
export const TOUCH_IDS = TOUCHPOINTS.map((p) => p.id);

const zero = () => Object.fromEntries(NEED_IDS.map((n) => [n, 0])) as Record<NeedId, number>;

/** How many touchpoints carry each need in the reference tagging. */
export const TRUTH_COUNTS: Record<NeedId, number> = TOUCHPOINTS.reduce((o, p) => ({ ...o, [p.truth]: o[p.truth] + 1 }), zero());

/** How many touchpoints of one need were followed by a customer leaving (the reference tagging). */
export const TRUTH_LEFT: Record<NeedId, number> = TOUCHPOINTS.reduce((o, p) => ({ ...o, [p.truth]: o[p.truth] + (p.outcome === "left" ? 1 : 0) }), zero());

/** Strength points from a tally: touchpoints plus those followed by a customer leaving. The rule taught in Materi A6. */
export const strengthPoints = (touchpoints: number, left: number) => touchpoints + left;
export type Strength = "low" | "mid" | "high";
export const STRENGTH_ORDER: Strength[] = ["low", "mid", "high"];
export const STRENGTH_LABEL: Record<Strength, string> = bi({ low: t("Low", "Niedrig"), mid: t("Mid", "Mittel"), high: t("High", "Hoch") });
/** 5 or more points is High, 3 to 4 is Mid, 2 or fewer is Low. */
export const strengthOf = (points: number): Strength => (points >= 5 ? "high" : points >= 3 ? "mid" : "low");

/** The information the file does not hold (Block 2.2), and which of it would change what CloudTech does. */
export type InfoId = "renewed" | "consent" | "next" | "revenue" | "opens" | "tickets" | "list";
export const INFO_ITEMS: { id: InfoId; label: string; useful: boolean; why: string }[] = bi([
  {
    id: "renewed" as InfoId,
    label: t("Why the customers who did renew chose to stay (renewal interviews)", "Warum die Kunden, die verlängert haben, geblieben sind (Renewal-Interviews)"),
    useful: true,
    why: t(
      "Shows what works. The twelve touchpoints only show what failed, so any pattern in them has no comparison group.",
      "Zeigt, was funktioniert. Die zwölf Touchpoints zeigen nur, was gescheitert ist, deshalb hat jedes Muster darin keine Vergleichsgruppe.",
    ),
  },
  {
    id: "consent" as InfoId,
    label: t("How many customers agreed to usage analysis, and whether that differs by size or industry", "Wie viele Kunden der Nutzungsanalyse zugestimmt haben und ob das je nach Größe oder Branche abweicht"),
    useful: true,
    why: t(
      "Decides how far personalisation can go and for whom. Without it, a measure that needs usage data may reach a few hundred customers, not a thousand.",
      "Entscheidet, wie weit Personalisierung gehen kann und für wen. Ohne diese Zahl erreicht eine Maßnahme, die Nutzungsdaten braucht, vielleicht einige hundert Kunden statt tausend.",
    ),
  },
  {
    id: "next" as InfoId,
    label: t("What the customers who left did next: bought from a cheaper provider or from a more personal one", "Was die Kunden, die gegangen sind, danach taten: bei einem günstigeren oder bei einem persönlicheren Anbieter kaufen"),
    useful: true,
    why: t(
      "Tells a price problem from a fit problem. It decides whether a measure about relevance or about price answers the cause.",
      "Unterscheidet ein Preisproblem von einem Passungsproblem. Es entscheidet, ob eine Maßnahme zu Relevanz oder zum Preis die Ursache trifft.",
    ),
  },
  {
    id: "revenue" as InfoId,
    label: t("How much yearly revenue the customers who left represented", "Wie viel Jahresumsatz die Kunden, die gegangen sind, ausmachten"),
    useful: true,
    why: t(
      "A few large customers leaving is a different problem from many small ones. It decides how much each measure can be worth and which customers the loyalty concept is for.",
      "Wenn wenige große Kunden gehen, ist das ein anderes Problem, als wenn viele kleine gehen. Es entscheidet, wie viel jede Maßnahme wert sein kann und für welche Kunden das Loyalty-Konzept gedacht ist.",
    ),
  },
  {
    id: "opens" as InfoId,
    label: t("The open rate of past newsletters", "Die Öffnungsrate früherer Newsletter"),
    useful: false,
    why: t(
      "It counts what customers did with a mail, not why they leave. A high open rate does not show that the message fitted.",
      "Sie zählt, was Kunden mit einer Mail taten, nicht warum sie gehen. Eine hohe Öffnungsrate zeigt nicht, dass die Nachricht gepasst hat.",
    ),
  },
  {
    id: "tickets" as InfoId,
    label: t("How many tickets the service desk handles per month", "Wie viele Tickets der Service Desk pro Monat bearbeitet"),
    useful: false,
    why: t(
      "A count of activity says how busy the desk is, not how the customer felt at the moment they stopped.",
      "Eine Aktivitätszahl sagt, wie ausgelastet der Desk ist, nicht wie sich der Kunde in dem Moment fühlte, als er aufhörte.",
    ),
  },
  {
    id: "list" as InfoId,
    label: t("The twelve touchpoints listed once more, one by one", "Die zwölf Touchpoints noch einmal einzeln aufgelistet"),
    useful: false,
    why: t("It is already printed in the file and adds no new information.", "Sie stehen schon in der Datei und bringen keine neue Information."),
  },
]);
export const INFO_BY_ID = Object.fromEntries(INFO_ITEMS.map((i) => [i.id, i])) as Record<InfoId, (typeof INFO_ITEMS)[number]>;
