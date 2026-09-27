import { bi, t } from "@/lib/lang";

/**
 * The home page's day intro (CLAUDE.md #27): what the day is about, the story that runs through the two routes, and "What's in it
 * for you" (WIIFM), the personal pay-off of each skill. Only facts the day's own material and cases state (CloudTech Solutions,
 * its 1,500 customers, interchangeable offers, the €180,000 and six months of Route 1, the twelve touchpoints, the €240,000 and
 * twelve months of Route 2).
 */
export const DAY_INTRO = bi({
  about: t(
    "Today is about how to win and keep customers by what they feel, not only by what you offer. You learn how the brain buys (feeling first, reasons second), four emotions that drive a purchase (security, trust, status and belonging), three triggers that move a decision (scarcity, social proof and authority) and when they turn into pressure, how behavioural targeting makes an offer fit and what data it may use, and how a loyalty programme can rest on benefit instead of reward. In the second half you stop designing measures and start designing a long-term strategy that joins psychology, data and money.",
    "Heute geht es darum, Kunden nicht nur mit dem zu gewinnen und zu halten, was Sie anbieten, sondern mit dem, was sie empfinden. Sie lernen, wie das Gehirn kauft (erst das Gefühl, dann die Gründe), vier Emotionen, die einen Kauf antreiben (Sicherheit, Vertrauen, Status und Zugehörigkeit), drei Trigger, die eine Entscheidung bewegen (Scarcity, Social Proof und Authority) und wann sie zu Druck werden, wie Behavioral Targeting ein Angebot passend macht und welche Daten es nutzen darf, und wie ein Loyalty-Programm auf Nutzen statt auf Belohnung beruhen kann. In der zweiten Hälfte entwerfen Sie keine Einzelmaßnahmen mehr, sondern eine langfristige Strategie, die Psychologie, Daten und Geld verbindet.",
  ),
  caseLine: t(
    "One case runs through the whole day: CloudTech Solutions GmbH, a German cloud and managed-IT provider with about 1,500 customers. Its retention is low, its offers look like everyone else's and customers compare prices at every renewal. Data protection is critical. In Route 1 you work with €180,000 and six months; in Route 2 you are the Chief Customer Officer with €240,000 and twelve months.",
    "Ein Fall zieht sich durch den ganzen Tag: die CloudTech Solutions GmbH, ein deutscher Cloud- und Managed-IT-Anbieter mit rund 1.500 Kunden. Seine Retention ist niedrig, seine Angebote sehen aus wie die aller anderen, und Kunden vergleichen bei jedem Renewal die Preise. Der Datenschutz ist kritisch. In Route 1 arbeiten Sie mit 180.000 € und sechs Monaten; in Route 2 sind Sie Chief Customer Officer mit 240.000 € und zwölf Monaten.",
  ),
  story: [
    {
      route: 1 as const,
      verb: t("Understand and apply", "Verstehen und anwenden"),
      question: t(
        "Which emotions make an offer more attractive, what does a measure reach and cost under strict data protection, where is CloudTech's sales process leaving customers cold, and which three measures and which loyalty concept fit inside €180,000 and six months?",
        "Welche Emotionen machen ein Angebot attraktiver, was erreicht und kostet eine Maßnahme unter strengem Datenschutz, wo lässt der Vertriebsprozess von CloudTech Kunden kalt, und welche drei Maßnahmen und welches Loyalty-Konzept passen in 180.000 € und sechs Monate?",
      ),
      output: t("the Retention Plan (Levels 1 and 2)", "dem Retention Plan (Level 1 und 2)"),
    },
    {
      route: 2 as const,
      verb: t("Decide", "Entscheiden"),
      question: t(
        "What is the long-term vision, how far do you personalise each group of customers, what loyalty system lasts beyond a bonus, and what do you decide before the data on customer behaviour is clear?",
        "Wie lautet die langfristige Vision, wie weit personalisieren Sie jede Kundengruppe, welches Loyalty-System hält länger als ein Bonus, und was entscheiden Sie, bevor die Daten zum Kundenverhalten klar sind?",
      ),
      output: t("the Strategy Memo (Level 3)", "dem Strategy Memo (Level 3)"),
    },
  ],
  wiifm: [
    {
      skill: t("Tell which emotion a customer is really talking about", "Erkennen, über welche Emotion ein Kunde wirklich spricht"),
      payoff: t(
        "“The safe choice”, “they know us by name”, “our own customers ask about their badge”: with four short tests you can hear whether a sentence is about security, trust, status or belonging. You can use it in any renewal talk, lost-deal review or customer survey.",
        "„Die sichere Wahl“, „sie kennen uns beim Namen“, „unsere eigenen Kunden fragen nach ihrem Siegel“: Mit vier kurzen Tests hören Sie, ob ein Satz von Sicherheit, Vertrauen, Status oder Zugehörigkeit handelt. Das hilft in jedem Renewal-Gespräch, jeder Lost-Deal-Analyse und jeder Kundenumfrage.",
      ),
      route: 1 as const,
    },
    {
      skill: t("Use a trigger without turning it into pressure", "Einen Trigger nutzen, ohne Druck daraus zu machen"),
      payoff: t(
        "Scarcity, social proof and authority work, and they stop working the moment a customer checks. You learn the three tests (true, checkable, respectful) and can apply them to your own emails, offers and websites before they go out.",
        "Scarcity, Social Proof und Authority wirken, und sie hören auf zu wirken, sobald ein Kunde nachprüft. Sie lernen die drei Tests (wahr, überprüfbar, respektvoll) und können sie auf Ihre eigenen E-Mails, Angebote und Websites anwenden, bevor sie hinausgehen.",
      ),
      route: 1 as const,
    },
    {
      skill: t("Put numbers on personalisation before you buy it", "Personalisierung vor dem Kauf mit Zahlen unterlegen"),
      payoff: t(
        "Only customers who agreed can be reached by usage-based offers, and each extra step up costs more for fewer extra responses. You can work out reach, cost and cost per customer for any campaign, and say in numbers why the most personal option is not always the best.",
        "Nutzungsbasierte Angebote erreichen nur Kunden, die eingewilligt haben, und jeder weitere Schritt nach oben kostet mehr für weniger zusätzliche Reaktionen. Sie können Reichweite, Kosten und Kosten pro Kunde für jede Kampagne ausrechnen und in Zahlen begründen, warum die persönlichste Variante nicht immer die beste ist.",
      ),
      route: 1 as const,
    },
    {
      skill: t("Read a customer journey as a list of unmet needs", "Eine Customer Journey als Liste unerfüllter Bedürfnisse lesen"),
      payoff: t(
        "Twelve touchpoints, six needs, one tally: you learn to rate which weakness costs most customers and to say what your evidence cannot tell you. That works for any set of complaints, exit notes or survey comments.",
        "Zwölf Touchpoints, sechs Bedürfnisse, eine Strichliste: Sie lernen zu bewerten, welche Schwäche die meisten Kunden kostet, und zu sagen, was Ihre Belege nicht verraten. Das funktioniert für jede Sammlung von Beschwerden, Exit-Notizen oder Umfragekommentaren.",
      ),
      route: 1 as const,
    },
    {
      skill: t("Choose measures by effect, acceptance and scalability", "Maßnahmen nach Wirkung, Akzeptanz und Skalierbarkeit auswählen"),
      payoff: t(
        "Effect times acceptance times scalability, held against a budget, works for any shortlist at work, and it builds data protection into the score instead of adding it at the end.",
        "Wirkung mal Akzeptanz mal Skalierbarkeit, gegen ein Budget gehalten, funktioniert für jede Shortlist im Berufsalltag, und es baut den Datenschutz in die Bewertung ein, statt ihn am Ende anzuhängen.",
      ),
      route: 1 as const,
    },
    {
      skill: t("Design a loyalty system that does not depend on a discount", "Ein Loyalty-System entwerfen, das nicht von einem Rabatt abhängt"),
      payoff: t(
        "You learn to ask whether a customer would still want a benefit if the discount stopped, and to test a concept for cost, consent and how long it lasts. That question helps in any team that is tempted to buy loyalty.",
        "Sie lernen zu fragen, ob ein Kunde einen Vorteil auch ohne Rabatt noch wollen würde, und ein Konzept auf Kosten, Einwilligung und Dauer zu prüfen. Diese Frage hilft in jedem Team, das versucht ist, Loyalität zu kaufen.",
      ),
      route: 2 as const,
    },
    {
      skill: t("Decide before the data is clear, with a tripwire", "Entscheiden, bevor die Daten klar sind, mit einem Tripwire"),
      payoff: t(
        "A staged decision with a metric, a threshold, a date and an action agreed in advance lets you commit without betting everything on an assumption, and to answer a board that asks what to do when the first result is mixed.",
        "Eine gestaffelte Entscheidung mit vorab vereinbarter Kennzahl, Schwelle, Frist und Maßnahme lässt Sie sich festlegen, ohne alles auf eine Annahme zu setzen, und ein Board beantworten, das fragt, was zu tun ist, wenn das erste Ergebnis gemischt ausfällt.",
      ),
      route: 2 as const,
    },
    {
      skill: t("Leave with two documents you can reuse", "Mit zwei Dokumenten gehen, die Sie wiederverwenden können"),
      payoff: t(
        "The Retention Plan and the Strategy Memo are yours: the first is a template for reading a customer journey and choosing measures under strict data protection, the second for defending a long-term customer strategy to a board.",
        "Der Retention Plan und das Strategy Memo gehören Ihnen: der erste ist eine Vorlage, um eine Customer Journey zu lesen und unter strengem Datenschutz Maßnahmen zu wählen, das zweite, um eine langfristige Kundenstrategie vor einem Board zu vertreten.",
      ),
      route: 2 as const,
    },
  ],
});
