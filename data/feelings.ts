import type { EmotionId } from "@/data/needs";
import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 1.1. Eight things customers said about why a competitor's offer felt more attractive than CloudTech's, to sort into
 * Security, Trust, Status or Belonging. The tests are taught in Materi A2. Every name and quotation is a Case assumption.
 * `truth` is never shown to the learner outside the mentor answer key.
 */
export type FeelingId = "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8";

export type Feeling = {
  id: FeelingId;
  /** What the customer said, as printed. */
  quote: string;
  truth: EmotionId;
  /** One question that teaches how to test the item. Shown for every row at once, never only the wrong ones. */
  clue: string;
  /** Why it belongs where it does. Opened only after two genuine checks, and recorded in the export. */
  why: string;
  /** For the mentor answer key: why the most tempting other emotion is rejected. */
  rejected: Partial<Record<EmotionId, string>>;
};

export const FEELINGS: Feeling[] = bi([
  {
    id: "f1" as FeelingId,
    quote: t(
      "Nordwolke's offer says in writing that our data stays in two German data centres and that they cover data loss up to €500,000. I could put that in front of our managing director.",
      "Das Angebot von Nordwolke sagt schriftlich, dass unsere Daten in zwei deutschen Rechenzentren bleiben und dass sie Datenverlust bis 500.000 € abdecken. Das konnte ich unserer Geschäftsführung vorlegen.",
    ),
    truth: "security" as EmotionId,
    clue: t("Is the point that something bad is prevented or covered?", "Geht es darum, dass etwas Schlimmes verhindert oder abgedeckt ist?"),
    why: t(
      "The sentence is about protection written into the offer: where the data is and who pays if it is lost. The buyer can show it to the managing director, so nobody is blamed.",
      "Der Satz handelt von Schutz, der im Angebot steht: wo die Daten liegen und wer zahlt, wenn sie verloren gehen. Der Käufer kann es der Geschäftsführung zeigen, also wird niemand verantwortlich gemacht.",
    ),
    rejected: {
      trust: t(
        "It does not say the people keep their word. It says the loss is covered and the data location is fixed.",
        "Es sagt nicht, dass die Menschen ihr Wort halten. Es sagt, dass der Verlust abgedeckt und der Datenstandort festgelegt ist.",
      ),
    },
  },
  {
    id: "f2" as FeelingId,
    quote: t(
      "Every Friday I used to worry what happens if the platform goes down over the weekend. Nordwolke put a four-hour restore time into the contract, and I stopped worrying.",
      "Jeden Freitag habe ich mir Sorgen gemacht, was passiert, wenn die Plattform übers Wochenende ausfällt. Nordwolke hat eine Wiederherstellungszeit von vier Stunden in den Vertrag geschrieben, und ich habe aufgehört, mir Sorgen zu machen.",
    ),
    truth: "security" as EmotionId,
    clue: t("What did the customer stop being afraid of?", "Wovor hat der Kunde aufgehört, Angst zu haben?"),
    why: t(
      "The worry is a bad weekend. The four-hour restore time protects against it, and the relief the customer describes is the feeling of being protected.",
      "Die Sorge ist ein schlechtes Wochenende. Die vierstündige Wiederherstellungszeit schützt davor, und die Erleichterung, die der Kunde beschreibt, ist das Gefühl, geschützt zu sein.",
    ),
    rejected: {
      trust: t(
        "The customer does not judge whether Nordwolke's people keep their word. The contract term removes the worry.",
        "Der Kunde beurteilt nicht, ob die Menschen von Nordwolke ihr Wort halten. Die Vertragsklausel nimmt die Sorge weg.",
      ),
    },
  },
  {
    id: "f3" as FeelingId,
    quote: t(
      "Nordwolke said the migration would be finished on 14 June. It was, to the hour. With CloudTech the dates were always “about”.",
      "Nordwolke sagte, die Migration sei am 14. Juni fertig. Sie war es, auf die Stunde genau. Bei CloudTech waren die Termine immer „ungefähr“.",
    ),
    truth: "trust" as EmotionId,
    clue: t("Is the customer judging whether the provider does what it says?", "Beurteilt der Kunde, ob der Anbieter tut, was er sagt?"),
    why: t(
      "A promised date was kept. The customer is judging reliability: whether the provider's word can be counted on.",
      "Ein zugesagter Termin wurde gehalten. Der Kunde beurteilt Verlässlichkeit: ob man sich auf das Wort des Anbieters verlassen kann.",
    ),
    rejected: {
      security: t("No protection is described. The customer compares kept and unkept promises.", "Es wird kein Schutz beschrieben. Der Kunde vergleicht gehaltene und nicht gehaltene Versprechen."),
    },
  },
  {
    id: "f4" as FeelingId,
    quote: t(
      "When their engineer told me the feature we wanted was not ready yet, I trusted them more. CloudTech always said yes and then went quiet.",
      "Als ihr Ingenieur mir sagte, die gewünschte Funktion sei noch nicht fertig, habe ich ihnen mehr vertraut. CloudTech sagte immer Ja und wurde dann still.",
    ),
    truth: "trust" as EmotionId,
    clue: t("Is it about honesty and reliability, or about protection from harm?", "Geht es um Ehrlichkeit und Verlässlichkeit oder um Schutz vor Schaden?"),
    why: t(
      "Telling the truth about bad news is integrity, one of the three parts of trust. The customer trusts more because of it.",
      "Die Wahrheit über schlechte Nachrichten zu sagen ist Integrität, einer der drei Teile von Vertrauen. Der Kunde vertraut deshalb mehr.",
    ),
    rejected: {
      security: t("Nothing in the sentence is about being protected. It is about being told the truth.", "Nichts im Satz handelt davon, geschützt zu sein. Es geht darum, die Wahrheit gesagt zu bekommen."),
    },
  },
  {
    id: "f5" as FeelingId,
    quote: t(
      "Nordwolke gave us a “Partner since 2021” badge for our website. Our own customers ask about it.",
      "Nordwolke hat uns ein Siegel „Partner seit 2021“ für unsere Website gegeben. Unsere eigenen Kunden fragen danach.",
    ),
    truth: "status" as EmotionId,
    clue: t("Is it valued for how others see the customer or the choice?", "Wird es dafür geschätzt, wie andere den Kunden oder die Wahl sehen?"),
    why: t(
      "The badge matters because other people see it. The feeling is standing: being seen as a partner, and having a choice that looks good.",
      "Das Siegel zählt, weil andere Menschen es sehen. Das Gefühl ist Ansehen: als Partner gesehen zu werden und eine Wahl zu haben, die gut aussieht.",
    ),
    rejected: {
      trust: t(
        "The badge is not evidence that Nordwolke keeps its word. It is valued for how it looks to the customer's own customers.",
        "Das Siegel ist kein Beleg dafür, dass Nordwolke sein Wort hält. Es wird dafür geschätzt, wie es auf die eigenen Kunden des Kunden wirkt.",
      ),
    },
  },
  {
    id: "f6" as FeelingId,
    quote: t(
      "They named our IT lead in their published customer story, and our board noticed. At CloudTech we were never mentioned anywhere.",
      "Sie haben unseren IT-Leiter in ihrer veröffentlichten Kundengeschichte genannt, und unser Vorstand hat es bemerkt. Bei CloudTech wurden wir nirgends erwähnt.",
    ),
    truth: "status" as EmotionId,
    clue: t("Who is looking, and what do they see?", "Wer schaut, und was sieht er?"),
    why: t(
      "Being named in a published story is recognition in front of outsiders, the board included. That is standing.",
      "In einer veröffentlichten Geschichte genannt zu werden ist Anerkennung vor Außenstehenden, den Vorstand eingeschlossen. Das ist Ansehen.",
    ),
    rejected: {
      belonging: t(
        "Being named is about how others see the customer. It does not put the customer inside a group of equals.",
        "Genannt zu werden betrifft, wie andere den Kunden sehen. Es stellt den Kunden nicht in eine Gruppe von Gleichgestellten.",
      ),
    },
  },
  {
    id: "f7" as FeelingId,
    quote: t(
      "Nordwolke runs a round table for logistics firms twice a year. For the first time I talk to people who have the same headaches as we do.",
      "Nordwolke veranstaltet zweimal im Jahr einen Round Table für Logistikfirmen. Zum ersten Mal spreche ich mit Leuten, die dieselben Sorgen haben wie wir.",
    ),
    truth: "belonging" as EmotionId,
    clue: t("Is the point being among others like them?", "Geht es darum, unter anderen zu sein, die ihm gleichen?"),
    why: t(
      "The customer meets peers with the same problems. The feeling is being part of a group, not being seen by outsiders.",
      "Der Kunde trifft Gleichgestellte mit denselben Problemen. Das Gefühl ist, Teil einer Gruppe zu sein, nicht von Außenstehenden gesehen zu werden.",
    ),
    rejected: {
      status: t(
        "Nothing is said about standing or how others see the customer. The value is meeting people who share the problem.",
        "Über Ansehen oder darüber, wie andere den Kunden sehen, wird nichts gesagt. Der Wert liegt darin, Menschen zu treffen, die das Problem teilen.",
      ),
    },
  },
  {
    id: "f8" as FeelingId,
    quote: t(
      "Their customers have an online forum. I read that three other firms had the same billing question as I did, and I stopped feeling like the only one.",
      "Ihre Kunden haben ein Online-Forum. Ich habe gelesen, dass drei andere Firmen dieselbe Frage zur Abrechnung hatten wie ich, und ich fühlte mich nicht mehr wie der Einzige.",
    ),
    truth: "belonging" as EmotionId,
    clue: t("What changed in how alone the customer felt?", "Was hat sich daran geändert, wie allein sich der Kunde fühlte?"),
    why: t(
      "“I stopped feeling like the only one” is the feeling of belonging to a group that shares the problem.",
      "„Ich fühlte mich nicht mehr wie der Einzige“ ist das Gefühl, zu einer Gruppe zu gehören, die das Problem teilt.",
    ),
    rejected: {
      security: t("No protection is described. The relief is not being alone with the problem.", "Es wird kein Schutz beschrieben. Die Erleichterung ist, mit dem Problem nicht allein zu sein."),
    },
  },
]);

export const FEELING_BY_ID = Object.fromEntries(FEELINGS.map((f) => [f.id, f])) as Record<FeelingId, Feeling>;
export const FEELING_IDS = FEELINGS.map((f) => f.id);

/** The counts a correct sort produces. */
export const FEELING_TRUTH_COUNTS: Record<EmotionId, number> = FEELINGS.reduce(
  (o, f) => ({ ...o, [f.truth]: o[f.truth] + 1 }),
  { security: 0, trust: 0, status: 0, belonging: 0 } as Record<EmotionId, number>,
);
