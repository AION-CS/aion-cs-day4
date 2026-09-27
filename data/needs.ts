import { bi, t } from "@/lib/lang";

/**
 * The four emotions of a purchase (Materi A2: security, trust, status, belonging) and the six needs a sales process can leave unmet
 * (Materi A6: the four emotions plus relevance and timing). One place, so the material, the sort (Block 1.1), the approaches (1.3),
 * the touchpoint tagging (2.1), the four needs (2.2), the measures (2.3), the answer keys and the exports read the same definitions.
 * A test question never says which statement belongs where.
 */
export type EmotionId = "security" | "trust" | "status" | "belonging";
export const EMOTION_IDS: EmotionId[] = ["security", "trust", "status", "belonging"];

export type NeedId = EmotionId | "relevance" | "timing";
export const NEED_IDS: NeedId[] = ["security", "trust", "status", "belonging", "relevance", "timing"];

export type Need = {
  id: NeedId;
  label: string;
  short: string;
  /** What it means for a customer, in plain words. */
  means: string;
  /** What a customer typically says or does. Practitioner observation, not a quotation from a study. */
  sounds: string;
  /** The one question that tests whether a statement or a touchpoint shows this need. */
  test: string;
  /** What answers it, in words (Materi A7). */
  answeredBy: string;
  /** What does not answer it. */
  notAnsweredBy: string;
};

export const NEEDS: Record<NeedId, Need> = bi({
  security: {
    id: "security" as NeedId,
    label: t("Security", "Sicherheit"),
    short: t("Security", "Sicherheit"),
    means: t(
      "The customer feels protected from a bad outcome, for themselves and for their company: the data is safe, an outage can be survived, nobody is blamed for the choice.",
      "Der Kunde fühlt sich vor einem schlechten Ausgang geschützt, für sich selbst und für sein Unternehmen: Die Daten sind sicher, ein Ausfall ist überstehbar, niemand wird für die Wahl verantwortlich gemacht.",
    ),
    sounds: t(
      "“Where is our data?”, “What happens if it goes down on a Friday?”, “Who pays if it is lost?”",
      "„Wo liegen unsere Daten?“, „Was passiert, wenn es freitags ausfällt?“, „Wer zahlt, wenn sie verloren gehen?“",
    ),
    test: t(
      "Is it about being protected from harm, loss or blame if something goes wrong?",
      "Geht es darum, vor Schaden, Verlust oder Schuldzuweisung geschützt zu sein, wenn etwas schiefgeht?",
    ),
    answeredBy: t(
      "Show the protection: where the data sits, what is covered, how fast a problem is answered and who calls the customer first.",
      "Den Schutz zeigen: wo die Daten liegen, was abgedeckt ist, wie schnell ein Problem beantwortet wird und wer den Kunden zuerst anruft.",
    ),
    notAnsweredBy: t("A price cut, or a longer feature list.", "Ein Preisnachlass oder eine längere Funktionsliste."),
  },
  trust: {
    id: "trust" as NeedId,
    label: t("Trust", "Vertrauen"),
    short: t("Trust", "Vertrauen"),
    means: t(
      "The customer is willing to rely on the provider's people and word: they do what they say, they tell the truth about bad news and they know what they are doing.",
      "Der Kunde ist bereit, sich auf die Menschen und das Wort des Anbieters zu verlassen: Sie tun, was sie sagen, sagen die Wahrheit über schlechte Nachrichten und wissen, was sie tun.",
    ),
    sounds: t(
      "“They said the 14th and it was the 14th.”, “When something was not ready, they told me.”, “Who can I call?”",
      "„Sie sagten den 14., und es war der 14.“, „Als etwas nicht fertig war, haben sie es mir gesagt.“, „Wen kann ich anrufen?“",
    ),
    test: t(
      "Is it about whether the provider keeps its word and can be relied on (ability, honesty, care)?",
      "Geht es darum, ob der Anbieter sein Wort hält und man sich auf ihn verlassen kann (Können, Ehrlichkeit, Fürsorge)?",
    ),
    answeredBy: t(
      "Small promises kept and seen, named people, references the customer can call themselves.",
      "Kleine Versprechen, die gehalten und gesehen werden, namentlich genannte Menschen, Referenzen, die der Kunde selbst anrufen kann.",
    ),
    notAnsweredBy: t("More claims about the company, or a longer brochure.", "Mehr Behauptungen über das Unternehmen oder eine längere Broschüre."),
  },
  status: {
    id: "status" as NeedId,
    label: t("Status", "Status"),
    short: t("Status", "Status"),
    means: t(
      "The customer feels seen as important and is proud of the choice: their standing, and how others see them and their decision.",
      "Der Kunde fühlt sich als wichtig gesehen und ist stolz auf die Wahl: sein Ansehen, und wie andere ihn und seine Entscheidung sehen.",
    ),
    sounds: t(
      "“Our own customers ask about your badge.”, “They named us in their case study.”, “Eight years, and nobody said thank you.”",
      "„Unsere eigenen Kunden fragen nach Ihrem Siegel.“, „Sie haben uns in ihrer Fallstudie genannt.“, „Acht Jahre, und niemand hat Danke gesagt.“",
    ),
    test: t(
      "Is it about how the customer, or the choice, is seen by others: standing, recognition, being treated as a partner?",
      "Geht es darum, wie der Kunde oder die Wahl von anderen gesehen wird: Ansehen, Anerkennung, als Partner behandelt zu werden?",
    ),
    answeredBy: t(
      "Recognition that is true and visible: partner status, a named customer story, early access.",
      "Anerkennung, die wahr und sichtbar ist: Partnerstatus, eine namentlich genannte Kundengeschichte, früher Zugang.",
    ),
    notAnsweredBy: t("A generic thank-you mail, or points that anyone can earn.", "Eine allgemeine Dankes-Mail oder Punkte, die jeder sammeln kann."),
  },
  belonging: {
    id: "belonging" as NeedId,
    label: t("Belonging", "Zugehörigkeit"),
    short: t("Belonging", "Zugehörigkeit"),
    means: t(
      "The customer feels part of a group of people like them and is not alone with their problems.",
      "Der Kunde fühlt sich als Teil einer Gruppe von Menschen wie ihm und ist mit seinen Problemen nicht allein.",
    ),
    sounds: t(
      "“I finally talk to people with the same headaches.”, “Everyone in my industry seems to know each other except through you.”",
      "„Endlich spreche ich mit Leuten, die dieselben Sorgen haben.“, „Alle in meiner Branche scheinen sich zu kennen, nur nicht über Sie.“",
    ),
    test: t(
      "Is it about being among others like them, in a circle or a community, rather than being seen from outside?",
      "Geht es darum, unter anderen zu sein, die ihm gleichen, in einem Kreis oder einer Community, statt von außen gesehen zu werden?",
    ),
    answeredBy: t(
      "Places to meet peers: round tables, a forum, a circle that customers can join.",
      "Orte, um Gleichgestellte zu treffen: Round Tables, ein Forum, ein Kreis, dem Kunden beitreten können.",
    ),
    notAnsweredBy: t("A newsletter that goes to everyone, or a rebate.", "Ein Newsletter an alle oder ein Rabatt."),
  },
  relevance: {
    id: "relevance" as NeedId,
    label: t("Relevance", "Relevanz"),
    short: t("Relevance", "Relevanz"),
    means: t(
      "The offer, message or service does not fit this customer: it ignores what they bought, how much they use it and what their company needs.",
      "Das Angebot, die Nachricht oder der Service passt nicht zu diesem Kunden: Sie ignorieren, was er gekauft hat, wie viel er nutzt und was sein Unternehmen braucht.",
    ),
    sounds: t(
      "“This letter could have gone to anybody.”, “They do not even know what we bought.”, “None of this is for us.”",
      "„Dieser Brief hätte an jeden gehen können.“, „Sie wissen nicht einmal, was wir gekauft haben.“, „Nichts davon ist für uns.“",
    ),
    test: t(
      "Is it about an offer or a message that does not fit this customer's own situation?",
      "Geht es um ein Angebot oder eine Nachricht, die nicht zur eigenen Situation dieses Kunden passt?",
    ),
    answeredBy: t(
      "Use what you know about the customer, and only what they have agreed you may use: their contract tier, their usage, their industry.",
      "Nutzen Sie, was Sie über den Kunden wissen, und nur das, was er Ihnen zu nutzen erlaubt hat: seine Vertragsstufe, seine Nutzung, seine Branche.",
    ),
    notAnsweredBy: t("More messages of the same kind to everyone.", "Mehr Nachrichten derselben Art an alle."),
  },
  timing: {
    id: "timing" as NeedId,
    label: t("Timing", "Timing"),
    short: t("Timing", "Timing"),
    means: t(
      "The right message at the wrong moment: it arrives when the customer cannot, or will not, hear it.",
      "Die richtige Nachricht im falschen Moment: Sie kommt an, wenn der Kunde sie nicht hören kann oder will.",
    ),
    sounds: t(
      "“Two weeks after the outage you ask me to sign for three more years?”, “It arrived the day we changed our CIO.”",
      "„Zwei Wochen nach dem Ausfall bitten Sie mich, für drei weitere Jahre zu unterschreiben?“, „Es kam an dem Tag, an dem wir unseren CIO gewechselt haben.“",
    ),
    test: t("Would the same message have worked at another moment?", "Hätte dieselbe Nachricht in einem anderen Moment funktioniert?"),
    answeredBy: t(
      "Send by event, not by calendar: after the review, never right after an open problem.",
      "Nach Ereignis senden, nicht nach Kalender: nach dem Review, nie direkt nach einem offenen Problem.",
    ),
    notAnsweredBy: t("A better text sent at the same wrong moment.", "Ein besserer Text im selben falschen Moment."),
  },
});

/** The pairs a learner most often confuses among the four emotions, with the question that separates them (Materi A2). */
export const EMOTION_PAIR_TESTS: { pair: string; test: string }[] = bi([
  {
    pair: t("Security or Trust?", "Sicherheit oder Vertrauen?"),
    test: t(
      "Ask what is being judged. If it is whether a bad outcome is prevented or covered, it is Security. If it is whether the provider's people keep their word, it is Trust.",
      "Fragen Sie, was beurteilt wird. Geht es darum, ob ein schlechter Ausgang verhindert oder abgedeckt ist, ist es Sicherheit. Geht es darum, ob die Menschen des Anbieters ihr Wort halten, ist es Vertrauen.",
    ),
  },
  {
    pair: t("Status or Belonging?", "Status oder Zugehörigkeit?"),
    test: t(
      "Ask who is looking. If the point is how outsiders see the customer or the choice, it is Status. If the point is being inside a group of equals, it is Belonging.",
      "Fragen Sie, wer schaut. Geht es darum, wie Außenstehende den Kunden oder die Wahl sehen, ist es Status. Geht es darum, in einer Gruppe von Gleichgestellten zu sein, ist es Zugehörigkeit.",
    ),
  },
  {
    pair: t("Trust or Belonging?", "Vertrauen oder Zugehörigkeit?"),
    test: t(
      "Ask what the customer wants from the people. That they keep their word is Trust. That the customer is among peers and known is Belonging.",
      "Fragen Sie, was der Kunde von den Menschen will. Dass sie ihr Wort halten, ist Vertrauen. Dass der Kunde unter Gleichgestellten und bekannt ist, ist Zugehörigkeit.",
    ),
  },
  {
    pair: t("Security or Status?", "Sicherheit oder Status?"),
    test: t(
      "A “safe choice” can be either. If the sentence is about nobody being blamed for choosing it, it is Security. If it is about the choice looking good, it is Status.",
      "Eine „sichere Wahl“ kann beides sein. Geht der Satz darum, dass niemand für die Wahl verantwortlich gemacht wird, ist es Sicherheit. Geht es darum, dass die Wahl gut aussieht, ist es Status.",
    ),
  },
]);

/** The extra pairs among the six needs (Materi A6), on top of the four above. */
export const NEED_PAIR_TESTS: { pair: string; test: string }[] = bi([
  {
    pair: t("Security or Trust?", "Sicherheit oder Vertrauen?"),
    test: t(
      "Ask what is being judged. If it is whether a bad outcome is prevented or covered, it is Security. If it is whether the provider's people keep their word, it is Trust.",
      "Fragen Sie, was beurteilt wird. Geht es darum, ob ein schlechter Ausgang verhindert oder abgedeckt ist, ist es Sicherheit. Geht es darum, ob die Menschen des Anbieters ihr Wort halten, ist es Vertrauen.",
    ),
  },
  {
    pair: t("Status or Belonging?", "Status oder Zugehörigkeit?"),
    test: t(
      "Ask who is looking. If the point is how outsiders see the customer or the choice, it is Status. If the point is being inside a group of equals, it is Belonging.",
      "Fragen Sie, wer schaut. Geht es darum, wie Außenstehende den Kunden oder die Wahl sehen, ist es Status. Geht es darum, in einer Gruppe von Gleichgestellten zu sein, ist es Zugehörigkeit.",
    ),
  },
  {
    pair: t("Trust or Belonging?", "Vertrauen oder Zugehörigkeit?"),
    test: t(
      "Ask what the customer wants from the people. That they keep their word is Trust. That the customer is among peers and known is Belonging.",
      "Fragen Sie, was der Kunde von den Menschen will. Dass sie ihr Wort halten, ist Vertrauen. Dass der Kunde unter Gleichgestellten und bekannt ist, ist Zugehörigkeit.",
    ),
  },
  {
    pair: t("Relevance or Timing?", "Relevanz oder Timing?"),
    test: t(
      "Ask whether the content or the moment is wrong. If the same message would work at another time, it is Timing. If it would not fit at any time, it is Relevance.",
      "Fragen Sie, ob der Inhalt oder der Moment falsch ist. Würde dieselbe Nachricht zu einer anderen Zeit funktionieren, ist es Timing. Würde sie zu keiner Zeit passen, ist es Relevanz.",
    ),
  },
  {
    pair: t("Relevance or Status?", "Relevanz oder Status?"),
    test: t(
      "Ask what the customer misses. Something that fits their own situation is Relevance. Acknowledgement of who they are and how long they have been a customer is Status.",
      "Fragen Sie, was der Kunde vermisst. Etwas, das zu seiner eigenen Situation passt, ist Relevanz. Anerkennung dafür, wer er ist und wie lange er schon Kunde ist, ist Status.",
    ),
  },
  {
    pair: t("Timing or Trust?", "Timing oder Vertrauen?"),
    test: t(
      "Ask what the customer holds against CloudTech. A message that came at a bad moment is Timing. A promise that was broken is Trust.",
      "Fragen Sie, was der Kunde CloudTech vorhält. Eine Nachricht, die im falschen Moment kam, ist Timing. Ein gebrochenes Versprechen ist Vertrauen.",
    ),
  },
]);

export const emotionLabel = (id: EmotionId) => NEEDS[id].label;
