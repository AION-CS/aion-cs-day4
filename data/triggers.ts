import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 1.2. Eight lines from sales material (competitors' and CloudTech's own) to sort by the trigger they use: scarcity,
 * social proof, authority, or none (a plain fact). Then the learner chooses which lines they would not send as they stand. The tests
 * are taught in Materi A3. Every line is a Case assumption. `truth` and `holdsUp` are never shown outside the mentor answer key.
 */
export type TriggerId = "scarcity" | "proof" | "authority" | "none";
export const TRIGGER_IDS: TriggerId[] = ["scarcity", "proof", "authority", "none"];

export const TRIGGERS: { id: TriggerId; label: string; hint: string }[] = bi([
  { id: "scarcity" as TriggerId, label: t("Scarcity", "Scarcity"), hint: t("A limit (of time, number or place) that makes waiting feel costly.", "Eine Begrenzung (von Zeit, Menge oder Ort), die Warten teuer wirken lässt.") },
  { id: "proof" as TriggerId, label: t("Social proof", "Social Proof"), hint: t("What other, similar customers did or think.", "Was andere, ähnliche Kunden getan haben oder denken.") },
  { id: "authority" as TriggerId, label: t("Authority", "Authority"), hint: t("An expert, a certificate or a rank the customer is meant to defer to.", "Ein Experte, ein Zertifikat oder ein Rang, dem sich der Kunde beugen soll.") },
  { id: "none" as TriggerId, label: t("Not a trigger", "Kein Trigger"), hint: t("A plain term or fact. No limit, no others, no credential.", "Eine schlichte Bedingung oder Tatsache. Keine Begrenzung, keine anderen, kein Nachweis.") },
]);
export const TRIGGER_LABEL: Record<TriggerId, string> = bi({
  scarcity: t("Scarcity", "Scarcity"),
  proof: t("Social proof", "Social Proof"),
  authority: t("Authority", "Authority"),
  none: t("Not a trigger", "Kein Trigger"),
});

export type LineId = "t1" | "t2" | "t3" | "t4" | "t5" | "t6" | "t7" | "t8";

export type SalesLine = {
  id: LineId;
  /** Where the line appeared: printed above the text. */
  source: string;
  text: string;
  truth: TriggerId;
  /** True when the line passes the three tests of Materi A3 (true, checkable, respectful). Only meaningful for the trigger lines. */
  holdsUp: boolean;
  clue: string;
  why: string;
  rejected: Partial<Record<TriggerId, string>>;
  /** Why the line would not be sent as it stands (only when holdsUp is false). */
  fails?: string;
};

export const LINES: SalesLine[] = bi([
  {
    id: "t1" as LineId,
    source: t("CloudTech proposal", "Angebot von CloudTech"),
    text: t(
      "We run six migrations a quarter, because each one gets a named engineer. Two slots are open for the third quarter.",
      "Wir führen sechs Migrationen pro Quartal durch, weil jede einen namentlich genannten Ingenieur bekommt. Für das dritte Quartal sind noch zwei Plätze frei.",
    ),
    truth: "scarcity" as TriggerId,
    holdsUp: true,
    clue: t("Does the line state a limit, and does the limit make waiting cost something?", "Nennt die Zeile eine Grenze, und lässt die Grenze das Warten etwas kosten?"),
    why: t(
      "A limit (two slots of six) with a real reason for it (a named engineer per migration). Waiting could lose a slot, and the customer can check the plan.",
      "Eine Grenze (zwei Plätze von sechs) mit einem echten Grund (ein namentlich genannter Ingenieur pro Migration). Wer wartet, kann einen Platz verlieren, und der Kunde kann den Plan prüfen.",
    ),
    rejected: {
      none: t(
        "It is not a plain term. The number of open slots is used to make waiting feel costly.",
        "Es ist keine schlichte Bedingung. Die Zahl der freien Plätze wird genutzt, damit Warten teuer wirkt.",
      ),
    },
  },
  {
    id: "t2" as LineId,
    source: t("Nordwolke website banner", "Website-Banner von Nordwolke"),
    text: t(
      "“Special price ends in 01:59:59.” The countdown restarts every time the page is loaded.",
      "„Sonderpreis endet in 01:59:59.“ Der Countdown startet bei jedem Laden der Seite neu.",
    ),
    truth: "scarcity" as TriggerId,
    holdsUp: false,
    clue: t("Is there a limit, and what happens to it when the customer comes back?", "Gibt es eine Grenze, und was passiert mit ihr, wenn der Kunde wiederkommt?"),
    why: t(
      "A time limit used to make waiting feel costly. It is scarcity, and a false one: the limit is not real, because the timer restarts.",
      "Eine Zeitgrenze, die Warten teuer wirken lassen soll. Es ist Scarcity, und eine falsche: Die Grenze ist nicht echt, weil der Timer neu startet.",
    ),
    rejected: {
      none: t("A countdown is not a plain term. It is there to make the customer hurry.", "Ein Countdown ist keine schlichte Bedingung. Er soll den Kunden zur Eile bringen."),
    },
    fails: t(
      "Not true: the limit is not real. It also fails the respect test, and a false deadline is a misleading claim (§ 5 UWG).",
      "Nicht wahr: Die Grenze ist nicht echt. Sie fällt auch beim Respekt-Test durch, und eine falsche Frist ist eine irreführende Angabe (§ 5 UWG).",
    ),
  },
  {
    id: "t3" as LineId,
    source: t("Nordwolke proposal", "Angebot von Nordwolke"),
    text: t(
      "Eleven logistics firms in Lower Saxony run their systems on our platform. Three of them have agreed to take your call; their names and numbers are on page 4.",
      "Elf Logistikfirmen in Niedersachsen betreiben ihre Systeme auf unserer Plattform. Drei von ihnen haben zugesagt, Ihren Anruf entgegenzunehmen; Namen und Nummern stehen auf Seite 4.",
    ),
    truth: "proof" as TriggerId,
    holdsUp: true,
    clue: t("Does the line point to what similar customers did?", "Verweist die Zeile darauf, was ähnliche Kunden getan haben?"),
    why: t(
      "Similar customers (logistics firms in the same region) are named and can be called. It is social proof at its strongest: comparable, named and checkable.",
      "Ähnliche Kunden (Logistikfirmen in derselben Region) werden genannt und sind erreichbar. Es ist Social Proof in Bestform: vergleichbar, namentlich genannt und überprüfbar.",
    ),
    rejected: {
      authority: t("No expert or certificate is used. The weight is on what firms like the customer did.", "Es wird kein Experte und kein Zertifikat genutzt. Das Gewicht liegt darauf, was Firmen wie der Kunde getan haben."),
    },
  },
  {
    id: "t4" as LineId,
    source: t("Nordwolke brochure", "Broschüre von Nordwolke"),
    text: t(
      "“9 out of 10 customers recommend us.” No survey, sample size or date is given.",
      "„9 von 10 Kunden empfehlen uns.“ Weder Umfrage noch Stichprobengröße noch Datum werden genannt.",
    ),
    truth: "proof" as TriggerId,
    holdsUp: false,
    clue: t("Who are the others, and could the customer find out?", "Wer sind die anderen, und könnte der Kunde das herausfinden?"),
    why: t(
      "It points to what other customers think, so it is social proof. The others are not named, the sample is not given and the customer cannot check it.",
      "Sie verweist darauf, was andere Kunden denken, ist also Social Proof. Die anderen werden nicht genannt, die Stichprobe fehlt, und der Kunde kann es nicht prüfen.",
    ),
    rejected: {
      authority: t("No expert or credential is named. The claim rests on what other customers said.", "Es wird kein Experte und kein Nachweis genannt. Die Behauptung stützt sich darauf, was andere Kunden gesagt haben."),
    },
    fails: t(
      "Not checkable: no survey, sample or date. A claim the customer cannot verify is a demand for faith.",
      "Nicht überprüfbar: keine Umfrage, keine Stichprobe, kein Datum. Eine Behauptung, die der Kunde nicht verifizieren kann, verlangt blindes Vertrauen.",
    ),
  },
  {
    id: "t5" as LineId,
    source: t("CloudTech offer, last page", "Angebot von CloudTech, letzte Seite"),
    text: t(
      "Both our data centres are certified to ISO/IEC 27001. The certificate number and the auditor's name are printed on this page.",
      "Beide unserer Rechenzentren sind nach ISO/IEC 27001 zertifiziert. Zertifikatsnummer und Name des Prüfers stehen auf dieser Seite.",
    ),
    truth: "authority" as TriggerId,
    holdsUp: true,
    clue: t("Does the line lean on a credential the customer is meant to respect?", "Stützt sich die Zeile auf einen Nachweis, den der Kunde respektieren soll?"),
    why: t(
      "A named standard and a named auditor are a credential. It works as authority because the customer can verify it with the auditor.",
      "Ein genannter Standard und ein genannter Prüfer sind ein Nachweis. Er wirkt als Authority, weil der Kunde ihn beim Prüfer verifizieren kann.",
    ),
    rejected: {
      none: t("It is more than a plain term: the certificate is used to make the customer feel safe.", "Es ist mehr als eine schlichte Bedingung: Das Zertifikat soll dem Kunden ein sicheres Gefühl geben."),
    },
  },
  {
    id: "t6" as LineId,
    source: t("Rhein-Cloud flyer", "Flyer von Rhein-Cloud"),
    text: t(
      "“Leading IT experts agree: our platform is the best on the market.” No expert is named.",
      "„Führende IT-Experten sind sich einig: Unsere Plattform ist die beste am Markt.“ Es wird kein Experte genannt.",
    ),
    truth: "authority" as TriggerId,
    holdsUp: false,
    clue: t("Who is the authority, and could the customer ask them?", "Wer ist die Autorität, und könnte der Kunde sie fragen?"),
    why: t(
      "It leans on experts to make the customer defer. It is authority, and an empty one: no expert is named and nobody can be asked.",
      "Sie stützt sich auf Experten, damit der Kunde sich beugt. Es ist Authority, und eine leere: Es wird kein Experte genannt, und niemand lässt sich fragen.",
    ),
    rejected: {
      proof: t("The weight is on who says it (experts), not on what similar customers did.", "Das Gewicht liegt darauf, wer es sagt (Experten), nicht darauf, was ähnliche Kunden getan haben."),
    },
    fails: t(
      "Not checkable: no expert is named. A credential nobody can check is a claim, not an authority.",
      "Nicht überprüfbar: Es wird kein Experte genannt. Ein Nachweis, den niemand prüfen kann, ist eine Behauptung, keine Autorität.",
    ),
  },
  {
    id: "t7" as LineId,
    source: t("CloudTech contract", "Vertrag von CloudTech"),
    text: t(
      "The standard term is 36 months, with a notice period of three months before the end of the term.",
      "Die Standardlaufzeit beträgt 36 Monate, mit einer Kündigungsfrist von drei Monaten zum Ende der Laufzeit.",
    ),
    truth: "none" as TriggerId,
    holdsUp: true,
    clue: t("Is anything in the line used to move the customer's feeling?", "Wird irgendetwas in der Zeile genutzt, um das Gefühl des Kunden zu bewegen?"),
    why: t(
      "A plain contract term. There is no limit that pressures, no others to follow and no credential. It is a fact.",
      "Eine schlichte Vertragsbedingung. Es gibt keine Grenze, die drängt, keine anderen, denen man folgt, und keinen Nachweis. Es ist eine Tatsache.",
    ),
    rejected: {
      scarcity: t("The 36 months and the notice period are not a limit used to make the customer hurry.", "Die 36 Monate und die Kündigungsfrist sind keine Grenze, die den Kunden zur Eile bringen soll."),
    },
  },
  {
    id: "t8" as LineId,
    source: t("CloudTech invoice terms", "Rechnungsbedingungen von CloudTech"),
    text: t(
      "Invoices are issued monthly in advance and are payable within 14 days.",
      "Rechnungen werden monatlich im Voraus gestellt und sind innerhalb von 14 Tagen zahlbar.",
    ),
    truth: "none" as TriggerId,
    holdsUp: true,
    clue: t("Is anything in the line used to move the customer's feeling?", "Wird irgendetwas in der Zeile genutzt, um das Gefühl des Kunden zu bewegen?"),
    why: t(
      "A plain payment term. Fourteen days is a rule, not a pressure to decide.",
      "Eine schlichte Zahlungsbedingung. Vierzehn Tage sind eine Regel, kein Druck, sich zu entscheiden.",
    ),
    rejected: {
      scarcity: t("The 14 days is a payment term, not a limit that makes waiting costly.", "Die 14 Tage sind eine Zahlungsfrist, keine Grenze, die Warten teuer macht."),
    },
  },
]);

export const LINE_BY_ID = Object.fromEntries(LINES.map((l) => [l.id, l])) as Record<LineId, SalesLine>;
export const LINE_IDS = LINES.map((l) => l.id);
/** The lines that would not be sent as they stand: they fail at least one of the three tests. */
export const FAILING_LINES: LineId[] = LINES.filter((l) => !l.holdsUp).map((l) => l.id);

/** The tests taught in Materi A3 for each trigger. */
export const TRIGGER_TESTS: { id: TriggerId; name: string; test: string }[] = bi([
  { id: "scarcity" as TriggerId, name: t("Scarcity", "Scarcity"), test: t("Does the line state a limit of time, number or place, and does that limit make waiting feel costly?", "Nennt die Zeile eine Grenze von Zeit, Menge oder Ort, und lässt diese Grenze Warten teuer wirken?") },
  { id: "proof" as TriggerId, name: t("Social proof", "Social Proof"), test: t("Does the line point to what other, similar customers did or think?", "Verweist die Zeile darauf, was andere, ähnliche Kunden getan haben oder denken?") },
  { id: "authority" as TriggerId, name: t("Authority", "Authority"), test: t("Does the line lean on an expert, a certificate or a rank that the customer is meant to defer to?", "Stützt sich die Zeile auf einen Experten, ein Zertifikat oder einen Rang, dem sich der Kunde beugen soll?") },
  { id: "none" as TriggerId, name: t("Not a trigger", "Kein Trigger"), test: t("Is it only a term or a fact, with no limit, no others and no credential used to move the customer's feeling?", "Ist es nur eine Bedingung oder Tatsache, ohne Grenze, ohne andere und ohne Nachweis, der das Gefühl des Kunden bewegen soll?") },
]);

export const TRIGGER_PAIR_TESTS: { pair: string; test: string }[] = bi([
  {
    pair: t("Social proof or Authority?", "Social Proof oder Authority?"),
    test: t(
      "Ask where the weight is. On what people like the customer did, it is Social proof. On who says it is right (an expert, a certificate), it is Authority.",
      "Fragen Sie, wo das Gewicht liegt. Auf dem, was Menschen wie der Kunde getan haben, ist es Social Proof. Darauf, wer sagt, dass es richtig ist (ein Experte, ein Zertifikat), ist es Authority.",
    ),
  },
  {
    pair: t("Authority or Not a trigger?", "Authority oder Kein Trigger?"),
    test: t(
      "Ask whether the credential is being used to make the customer feel safe or to defer. A term that only states what the contract says is not a trigger.",
      "Fragen Sie, ob der Nachweis genutzt wird, damit sich der Kunde sicher fühlt oder sich beugt. Eine Bedingung, die nur sagt, was der Vertrag sagt, ist kein Trigger.",
    ),
  },
]);

/** The three tests a trigger must pass before it is used (Materi A3). */
export const HONESTY_TESTS: { name: string; test: string }[] = bi([
  { name: t("True", "Wahr"), test: t("Is the limit, the number or the credential real today?", "Ist die Grenze, die Zahl oder der Nachweis heute real?") },
  { name: t("Checkable", "Überprüfbar"), test: t("Could the customer verify it themselves: a name, a number, a date, a document?", "Könnte der Kunde es selbst verifizieren: ein Name, eine Zahl, ein Datum, ein Dokument?") },
  { name: t("Respectful", "Respektvoll"), test: t("Would the customer feel respected if they saw exactly why the line is written this way?", "Würde sich der Kunde respektiert fühlen, wenn er genau sähe, warum die Zeile so geschrieben ist?") },
]);
