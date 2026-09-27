import { getLang } from "@/lib/lang";

/**
 * Plain-language glossary (CLAUDE.md #19), in English and German (#32). Every technical term, abbreviation or German word that the
 * material or a task uses is an entry here. In the text it becomes a dotted link; a click opens the explanation. Written for someone
 * who is NOT an expert: short sentences, everyday words, one example where it helps.
 *
 * `match` lists every English written form; `de.match` every form the German text uses (the English term itself, with German plural
 * or genitive forms, and German words). The German `title` keeps the English term where German practitioners use it. An all-capitals
 * match ("CRM") is matched exactly, so ordinary words never turn into links.
 */
export type GlossDe = { title?: string; match: string[]; plain: string; example?: string };
export type GlossEntry = {
  id: string;
  title: string;
  match: string[];
  exactCase?: boolean;
  plain: string;
  example?: string;
  from?: string;
  de?: GlossDe;
};

export const GLOSSARY: GlossEntry[] = [
  // --- the brain and the decision -------------------------------------------
  {
    id: "neuromarketing",
    title: "Neuromarketing",
    match: ["neuromarketing"],
    plain: "Using measurements of the brain and body, such as brain scans, eye tracking or skin response, to learn how people react to offers. It has found useful patterns across groups of people. It cannot read what one customer feels.",
    example: "Eye tracking can show that most people read the price before the guarantee on a proposal.",
    from: "Ariely & Berns 2010",
    de: {
      title: "Neuromarketing",
      match: ["Neuromarketing", "Neuromarketings"],
      plain: "Man misst Gehirn und Körper, zum Beispiel mit Hirnscans, Eye Tracking oder Hautreaktion, um zu erfahren, wie Menschen auf Angebote reagieren. Das liefert nützliche Muster über Gruppen von Menschen. Was ein einzelner Kunde fühlt, lässt sich damit nicht ablesen.",
      example: "Eye Tracking kann zeigen, dass die meisten Menschen in einem Angebot zuerst den Preis lesen und erst danach die Garantie.",
    },
  },
  {
    id: "reverse-inference",
    title: "Reverse inference",
    match: ["reverse inference"],
    plain: "The mistake of saying “this brain area was active, so the customer felt this”. The same area is active for many different feelings, so the step does not hold on its own.",
    from: "Poldrack 2006",
    de: {
      title: "Reverse Inference (Umkehrschluss)",
      match: ["Reverse Inference", "Umkehrschluss"],
      plain: "Der Denkfehler „dieses Hirnareal war aktiv, also hat der Kunde das gefühlt“. Dasselbe Areal ist bei vielen verschiedenen Gefühlen aktiv, der Schluss trägt also nicht von allein.",
    },
  },
  {
    id: "eye-tracking",
    title: "Eye tracking",
    match: ["eye tracking"],
    plain: "A camera that records where a person looks on a page or a screen, and for how long. It shows what is noticed, not what is felt.",
    de: {
      title: "Eye Tracking",
      match: ["Eye Tracking"],
      plain: "Eine Kamera zeichnet auf, wohin eine Person auf einer Seite oder einem Bildschirm schaut und wie lange. Sie zeigt, was auffällt, nicht, was gefühlt wird.",
    },
  },
  {
    id: "fmri",
    title: "Brain imaging (fMRI)",
    match: ["fMRI", "brain imaging"],
    plain: "A scan that shows which parts of the brain use more blood while a person does something, for example looks at an offer. It is expensive and the groups studied are small.",
    de: {
      title: "Hirnbildgebung (fMRI)",
      match: ["fMRI", "Hirnbildgebung"],
      plain: "Ein Scan, der zeigt, welche Teile des Gehirns mehr Blut brauchen, während jemand etwas tut, etwa ein Angebot ansieht. Er ist teuer, und die untersuchten Gruppen sind klein.",
    },
  },
  {
    id: "ab-test",
    title: "A/B test",
    match: ["A/B test"],
    plain: "You send version A of a message to one half of your customers and version B to the other half, then compare what they do. It measures behaviour directly.",
    example: "Half the customers get a subject line with the customer's name, half without. You count who opens and who objects.",
    de: {
      title: "A/B-Test",
      match: ["A/B-Test", "A/B-Tests"],
      plain: "Sie senden Version A einer Nachricht an eine Hälfte Ihrer Kunden und Version B an die andere und vergleichen, was die Kunden tun. So messen Sie Verhalten direkt.",
      example: "Die eine Hälfte bekommt einen Betreff mit dem Namen des Kunden, die andere ohne. Sie zählen, wer öffnet und wer widerspricht.",
    },
  },
  {
    id: "loss-aversion",
    title: "Loss aversion",
    match: ["loss aversion"],
    plain: "A loss hurts about twice as much as an equal gain pleases. So customers work harder to avoid a bad outcome than to win a good one.",
    from: "Kahneman & Tversky 1979",
    de: {
      title: "Loss Aversion (Verlustaversion)",
      match: ["Loss Aversion", "Verlustaversion"],
      plain: "Ein Verlust schmerzt etwa doppelt so stark, wie ein gleich großer Gewinn erfreut. Deshalb tun Kunden mehr, um ein schlechtes Ergebnis zu vermeiden, als um ein gutes zu gewinnen.",
    },
  },
  {
    id: "reactance",
    title: "Reactance",
    match: ["reactance"],
    plain: "The urge to resist when we feel pushed or watched. A message that feels like pressure, or too personal, can make a customer step back.",
    from: "Brehm 1966",
    de: {
      title: "Reaktanz",
      match: ["Reaktanz"],
      plain: "Der Drang, sich zu wehren, wenn wir uns gedrängt oder beobachtet fühlen. Eine Nachricht, die wie Druck oder zu persönlich wirkt, kann einen Kunden zurückweichen lassen.",
    },
  },
  {
    id: "loyalty",
    title: "Loyalty",
    match: ["loyalty", "loyal"],
    plain: "A customer who would choose you again even if leaving were easy. It is not the same as buying again: a customer can keep buying out of habit and still not be loyal.",
    from: "Dick & Basu 1994",
    de: {
      title: "Loyalty (Loyalität)",
      match: ["Loyalty", "Loyalität", "loyal"],
      plain: "Ein Kunde, der sich wieder für Sie entscheiden würde, auch wenn ein Wechsel leicht wäre. Das ist nicht dasselbe wie wieder kaufen: Ein Kunde kann aus Gewohnheit weiterkaufen und trotzdem nicht loyal sein.",
    },
  },
  {
    id: "retention",
    title: "Retention",
    match: ["retention", "retained"],
    plain: "Keeping customers from one period to the next. It says nothing about why they stay: it can be loyalty, habit or a contract.",
    de: {
      title: "Retention",
      match: ["Retention", "Retention Rate"],
      plain: "Kunden von einer Periode zur nächsten halten. Sie sagt nichts darüber, warum sie bleiben: Es kann Loyalität sein, Gewohnheit oder ein Vertrag.",
    },
  },
  {
    id: "renewal",
    title: "Renewal",
    match: ["renewal", "renewals", "renew", "renews", "renewing"],
    plain: "The moment at the end of a contract term when the customer decides whether to sign again. Most customers who leave leave at renewal.",
    de: {
      title: "Renewal",
      match: ["Renewal", "Renewals", "Renewal-Gespräch", "Renewal-Angebot", "Renewal-Brief"],
      plain: "Der Moment am Ende einer Vertragslaufzeit, in dem der Kunde entscheidet, ob er wieder unterschreibt. Die meisten Kunden, die gehen, gehen beim Renewal.",
    },
  },
  {
    id: "onboarding",
    title: "Onboarding",
    match: ["onboarding"],
    plain: "The first weeks after signing, when the provider sets things up and the customer learns whether the promises hold.",
    de: {
      title: "Onboarding",
      match: ["Onboarding", "Onboarding-Plan"],
      plain: "Die ersten Wochen nach der Unterschrift, in denen der Anbieter alles einrichtet und der Kunde erfährt, ob die Versprechen halten.",
    },
  },
  {
    id: "prospect",
    title: "Prospect",
    match: ["prospect", "prospects"],
    plain: "A company that might buy from you but has not yet signed.",
    de: {
      title: "Prospect (Interessent)",
      match: ["Prospect", "Prospects", "Interessent", "Interessenten"],
      plain: "Ein Unternehmen, das bei Ihnen kaufen könnte, aber noch nicht unterschrieben hat.",
    },
  },
  {
    id: "mittelstand",
    title: "Mittelstand (mid-sized companies)",
    match: ["Mittelstand"],
    exactCase: true,
    plain: "The German word for the backbone of the economy: mid-sized, often family-owned companies. They usually have a small IT team, so one person can carry a large share of an IT decision.",
    de: {
      title: "Mittelstand",
      match: ["Mittelstand"],
      plain: "Das Rückgrat der deutschen Wirtschaft: mittelgroße, oft familiengeführte Unternehmen. Sie haben meist ein kleines IT-Team, sodass eine Person einen großen Teil einer IT-Entscheidung tragen kann.",
    },
  },
  // --- emotions, triggers -------------------------------------------------------
  {
    id: "trigger",
    title: "Trigger (sales)",
    match: ["trigger", "triggers"],
    plain: "In sales: a cue in an offer that moves a decision, such as a limit, what others did, or an expert's word. In a plan: an agreed number, date and action, such as “if objections pass 15 per 1,000 by month 4, we pause the sending”.",
    de: {
      title: "Trigger",
      match: ["Trigger", "Triggers", "Triggern"],
      plain: "Im Vertrieb: ein Reiz in einem Angebot, der eine Entscheidung bewegt, etwa eine Begrenzung, was andere getan haben oder das Wort eines Experten. In einem Plan: eine vereinbarte Zahl, Frist und Maßnahme, etwa „wenn die Widersprüche bis Monat 4 über 15 pro 1.000 steigen, pausieren wir den Versand“.",
    },
  },
  {
    id: "scarcity",
    title: "Scarcity",
    match: ["scarcity"],
    plain: "The effect that things look more valuable when they are limited. Used honestly, it points to a real limit. Used falsely, for example a countdown that restarts, it is a misleading claim.",
    from: "Cialdini 2021",
    de: {
      title: "Scarcity (Knappheit)",
      match: ["Scarcity", "Knappheit"],
      plain: "Der Effekt, dass Dinge wertvoller wirken, wenn sie begrenzt sind. Ehrlich genutzt, verweist er auf eine echte Grenze. Falsch genutzt, zum Beispiel mit einem Countdown, der neu startet, ist es eine irreführende Angabe.",
    },
  },
  {
    id: "social-proof",
    title: "Social proof",
    match: ["social proof"],
    plain: "When we are unsure, we look at what people like us did. “Eleven logistics firms in your region use us” is social proof. It is strongest when the others are similar, named and can be called.",
    from: "Cialdini 2021",
    de: {
      title: "Social Proof",
      match: ["Social Proof"],
      plain: "Wenn wir unsicher sind, schauen wir, was Menschen wie wir getan haben. „Elf Logistikfirmen in Ihrer Region nutzen uns“ ist Social Proof. Er wirkt am stärksten, wenn die anderen ähnlich, namentlich genannt und erreichbar sind.",
    },
  },
  {
    id: "authority",
    title: "Authority (as a trigger)",
    match: ["authority"],
    plain: "People defer to an expert or a credential. “Certified to ISO/IEC 27001, certificate number on page 5” is authority. “Experts agree” with no expert is not.",
    from: "Cialdini 2021",
    de: {
      title: "Authority (Autorität)",
      match: ["Authority", "Autorität"],
      plain: "Menschen richten sich nach einem Experten oder einem Nachweis. „Zertifiziert nach ISO/IEC 27001, Zertifikatsnummer auf Seite 5“ ist Authority. „Experten sind sich einig“ ohne einen Experten ist es nicht.",
    },
  },
  {
    id: "iso27001",
    title: "ISO/IEC 27001",
    match: ["ISO/IEC 27001"],
    plain: "An international standard for managing information security. A company is audited against it and receives a certificate, which can be checked with the auditor.",
    de: {
      title: "ISO/IEC 27001",
      match: ["ISO/IEC 27001"],
      plain: "Ein internationaler Standard für das Management der Informationssicherheit. Ein Unternehmen wird danach geprüft und erhält ein Zertifikat, das sich beim Prüfer überprüfen lässt.",
    },
  },
  {
    id: "uwg",
    title: "UWG (unfair competition law)",
    match: ["UWG"],
    plain: "The German Act against Unfair Competition. It forbids, among other things, misleading claims and unwanted advertising. Section 5 covers misleading claims, such as a deadline that is not real. Section 7 covers unwanted advertising such as email.",
    de: {
      title: "UWG (Gesetz gegen den unlauteren Wettbewerb)",
      match: ["UWG"],
      plain: "Das deutsche Gesetz gegen den unlauteren Wettbewerb. Es verbietet unter anderem irreführende Angaben und unzumutbare Werbung. § 5 betrifft irreführende Angaben, etwa eine Frist, die es gar nicht gibt. § 7 betrifft unerwünschte Werbung, etwa per E-Mail.",
    },
  },
  {
    id: "misleading",
    title: "Misleading claim",
    match: ["misleading claim", "misleading claims"],
    plain: "A statement that is not true, or that is likely to make a customer decide differently than they would with the full picture. A countdown that restarts every time the page loads is one.",
    de: {
      title: "Irreführende Angabe",
      match: ["irreführende Angabe", "irreführenden Angabe", "irreführende Angaben", "irreführende", "irreführend"],
      plain: "Eine Aussage, die nicht stimmt oder die einen Kunden wahrscheinlich anders entscheiden lässt, als er es mit vollem Wissen täte. Ein Countdown, der bei jedem Laden der Seite neu startet, ist eine.",
    },
  },
  // --- data, personalisation, law ---------------------------------------------
  {
    id: "behavioural-targeting",
    title: "Behavioural targeting",
    match: ["behavioural targeting"],
    plain: "Choosing which message or offer a customer gets by what they did: what they use, click or buy. It makes an offer fit better and it needs data.",
    de: {
      title: "Behavioral Targeting",
      match: ["Behavioral Targeting"],
      plain: "Man wählt Nachricht oder Angebot danach aus, was ein Kunde getan hat: was er nutzt, anklickt oder kauft. Das Angebot passt dadurch besser, und es braucht Daten.",
    },
  },
  {
    id: "personalisation",
    title: "Personalisation",
    match: ["personalisation", "personalise", "personalised", "personalising"],
    plain: "Fitting a message or an offer to one customer or one group, instead of sending the same to everyone. It can go from “by industry” to “by this customer's own use, in real time”.",
    de: {
      title: "Personalisierung",
      match: ["Personalisierung", "personalisieren", "personalisiert", "personalisierte", "personalisierten", "personalisiertes", "Personalisierungsstufe"],
      plain: "Eine Nachricht oder ein Angebot auf einen Kunden oder eine Gruppe zuschneiden, statt allen dasselbe zu schicken. Das kann von „nach Branche“ bis „nach der eigenen Nutzung dieses Kunden, in Echtzeit“ reichen.",
    },
  },
  {
    id: "personalisation-paradox",
    title: "Personalisation–privacy paradox",
    match: ["personalisation–privacy paradox", "personalisation privacy paradox"],
    plain: "Customers like messages that fit them and dislike the data collection that makes them possible. The more personal, the more some of them feel watched.",
    from: "Awad & Krishnan 2006",
    de: {
      title: "Personalisierungs-Datenschutz-Paradox",
      match: ["Personalisierungs-Datenschutz-Paradox"],
      plain: "Kunden mögen Nachrichten, die zu ihnen passen, und mögen die Datenerhebung nicht, die sie möglich macht. Je persönlicher, desto mehr fühlen sich manche beobachtet.",
    },
  },
  {
    id: "profiling",
    title: "Profiling",
    match: ["profiling"],
    plain: "Using personal data to judge or predict something about a person, such as what they will want next. Under the GDPR, a customer can object to profiling for marketing.",
    from: "GDPR Art. 4(4) and 21",
    de: {
      title: "Profiling",
      match: ["Profiling"],
      plain: "Personenbezogene Daten nutzen, um etwas über eine Person zu beurteilen oder vorherzusagen, etwa was sie als Nächstes will. Nach der DSGVO kann ein Kunde dem Profiling für Marketing widersprechen.",
    },
  },
  {
    id: "consent",
    title: "Consent",
    match: ["consent", "consented"],
    plain: "A customer's clear, active agreement to a specific use of their data, given freely and as easy to take back as to give. Silence, a pre-ticked box or a bundle with the contract is not consent.",
    example: "A customer ticks an empty box next to “I agree that CloudTech analyses my usage to send me offers”. That is consent.",
    from: "GDPR Art. 6 and 7",
    de: {
      title: "Einwilligung (Consent)",
      match: ["Einwilligung", "Einwilligungen", "Einwilligungsstatus", "eingewilligt", "einwilligen", "Consent"],
      plain: "Die klare, aktive Zustimmung eines Kunden zu einer bestimmten Nutzung seiner Daten, freiwillig gegeben und so leicht zurückzunehmen wie zu geben. Schweigen, ein vorangekreuztes Kästchen oder eine Kopplung an den Vertrag ist keine Einwilligung.",
      example: "Ein Kunde setzt selbst ein Häkchen bei „Ich willige ein, dass CloudTech meine Nutzung auswertet, um mir Angebote zu senden“. Das ist eine Einwilligung.",
    },
  },
  {
    id: "opt-in",
    title: "Opt-in and opt-out",
    match: ["opt-in", "opt-out", "opt-outs", "opted in", "opted-in"],
    plain: "Opt-in: the customer joins by an active choice. Opt-out: the customer is included unless they say no. For personal data used in marketing, opt-in is the safe way.",
    de: {
      title: "Opt-in und Opt-out",
      match: ["Opt-in", "Opt-out", "Opt-ins", "Opt-outs"],
      plain: "Opt-in: Der Kunde macht durch eine aktive Entscheidung mit. Opt-out: Der Kunde ist dabei, solange er nicht Nein sagt. Für personenbezogene Daten im Marketing ist Opt-in der sichere Weg.",
    },
  },
  {
    id: "preticked",
    title: "Pre-ticked box",
    match: ["pre-ticked box", "pre-ticked", "Planet49"],
    plain: "A box that is already ticked when the customer sees it. The Court of Justice of the EU held in 2019 (the Planet49 case) that this is not valid consent, because consent needs an active step.",
    from: "CJEU C-673/17",
    de: {
      title: "Vorangekreuztes Kästchen",
      match: ["vorangekreuztes Kästchen", "vorangekreuzte Kästchen", "vorangekreuzten Kästchen", "Planet49"],
      plain: "Ein Kästchen, das schon angekreuzt ist, wenn der Kunde es sieht. Der Europäische Gerichtshof hat 2019 (Fall Planet49) entschieden, dass das keine gültige Einwilligung ist, weil eine Einwilligung einen aktiven Schritt braucht.",
    },
  },
  {
    id: "legitimate-interest",
    title: "Legitimate interest",
    match: ["legitimate interest"],
    plain: "A reason under the GDPR to use data without consent when the business has a real interest and the customer's own interests do not outweigh it. It may cover ordinary marketing to existing customers. It does not cover everything, and the customer can object.",
    from: "GDPR Art. 6(1)(f)",
    de: {
      title: "Berechtigtes Interesse",
      match: ["berechtigtes Interesse", "berechtigten Interesse", "berechtigtes Interesses"],
      plain: "Ein Grund nach der DSGVO, Daten ohne Einwilligung zu nutzen, wenn das Unternehmen ein echtes Interesse hat und die Interessen des Kunden nicht überwiegen. Es kann gewöhnliche Werbung an Bestandskunden abdecken, aber nicht alles, und der Kunde kann widersprechen.",
    },
  },
  {
    id: "gdpr",
    title: "GDPR (General Data Protection Regulation)",
    match: ["GDPR"],
    plain: "The European law that says how personal data may be used. It applies to the people who work at a business customer too: names, email addresses and usage traced to a person are personal data.",
    from: "Regulation (EU) 2016/679",
    de: {
      title: "DSGVO (Datenschutz-Grundverordnung)",
      match: ["DSGVO"],
      plain: "Das europäische Gesetz, das regelt, wie personenbezogene Daten genutzt werden dürfen. Es gilt auch für die Menschen, die bei einem Geschäftskunden arbeiten: Namen, E-Mail-Adressen und auf eine Person zurückführbare Nutzung sind personenbezogene Daten.",
    },
  },
  {
    id: "purpose-limitation",
    title: "Purpose limitation and data minimisation",
    match: ["purpose limitation", "data minimisation", "minimisation"],
    plain: "Use data only for the purpose it was given for, and only as much as you need. Data given to run the service is not automatically free to use for sales offers.",
    from: "GDPR Art. 5",
    de: {
      title: "Zweckbindung und Datenminimierung",
      match: ["Zweckbindung", "Datenminimierung"],
      plain: "Daten nur für den Zweck nutzen, für den sie gegeben wurden, und nur so viele, wie nötig. Daten, die für den Betrieb des Dienstes gegeben wurden, sind nicht automatisch für Verkaufsangebote frei.",
    },
  },
  {
    id: "right-to-object",
    title: "Right to object",
    match: ["right to object", "object to direct marketing", "objections", "objection"],
    plain: "A customer can say at any time that they do not want direct marketing, including profiling for it. The provider must then stop. So the way to stop must work before the first message is sent.",
    from: "GDPR Art. 21",
    de: {
      title: "Widerspruchsrecht",
      match: ["Widerspruchsrecht", "Widerspruch", "Widersprüche", "Widersprüchen", "widersprechen", "widerspricht"],
      plain: "Ein Kunde kann jederzeit sagen, dass er keine Direktwerbung möchte, auch kein Profiling dafür. Der Anbieter muss dann aufhören. Der Weg, das zu tun, muss also funktionieren, bevor die erste Nachricht gesendet wird.",
    },
  },
  {
    id: "dpo",
    title: "Data-protection officer",
    match: ["data-protection officer", "data protection officer"],
    plain: "The person who advises the company on data protection and checks that it complies. The officer must stay independent, so does not decide how data is used and should not own a project that uses it.",
    de: {
      title: "Datenschutzbeauftragter",
      match: ["Datenschutzbeauftragter", "Datenschutzbeauftragten", "Datenschutzbeauftragte"],
      plain: "Die Person, die das Unternehmen im Datenschutz berät und prüft, ob er eingehalten wird. Sie muss unabhängig bleiben, entscheidet also nicht, wie Daten genutzt werden, und sollte kein Vorhaben besitzen, das sie nutzt.",
    },
  },
  {
    id: "usage-analysis",
    title: "Usage analysis",
    match: ["usage analysis", "usage data", "usage-based"],
    plain: "Looking at how a customer uses the service, such as storage, load and backup. It shows what fits them and, traced to a person, it is personal data.",
    de: {
      title: "Nutzungsanalyse",
      match: ["Nutzungsanalyse", "Nutzungsdaten", "nutzungsbasiert", "nutzungsbasierte", "nutzungsbasierten", "nutzungsbasiertes"],
      plain: "Man schaut, wie ein Kunde den Dienst nutzt, etwa Speicher, Auslastung und Backup. Das zeigt, was zu ihm passt, und auf eine Person zurückgeführt sind es personenbezogene Daten.",
    },
  },
  {
    id: "response-rate",
    title: "Response rate and responders",
    match: ["response rate", "responders", "responder"],
    plain: "The response rate is the share of customers who act on a message. Responders are the customers who do. Customers reached × response rate = responders.",
    example: "600 customers reached at an 8% response rate gives 48 responders.",
    de: {
      title: "Response Rate und Responder",
      match: ["Response Rate", "Responder", "Responders"],
      plain: "Die Response Rate ist der Anteil der Kunden, die auf eine Nachricht reagieren. Responder sind die Kunden, die es tun. Erreichte Kunden × Response Rate = Responder.",
      example: "600 erreichte Kunden bei 8 % Response Rate ergeben 48 Responder.",
    },
  },
  {
    id: "reach",
    title: "Reach",
    match: ["customers reached"],
    plain: "How many customers a measure or a message can actually get to. For a measure that needs consent, it is only the customers who agreed.",
    de: {
      title: "Reichweite",
      match: ["Reichweite", "erreichte Kunden", "erreichten Kunden"],
      plain: "Wie viele Kunden eine Maßnahme oder eine Nachricht tatsächlich erreichen kann. Braucht die Maßnahme eine Einwilligung, sind es nur die Kunden, die zugestimmt haben.",
    },
  },
  {
    id: "crm",
    title: "CRM — customer relationship management system",
    match: ["CRM"],
    plain: "The software in which a company records its customers: who they are, what they bought, what was said, what the next step is.",
    de: {
      title: "CRM (Customer-Relationship-Management-System)",
      match: ["CRM"],
      plain: "Die Software, in der ein Unternehmen seine Kunden erfasst: wer sie sind, was sie gekauft haben, was gesagt wurde, was der nächste Schritt ist.",
    },
  },
  {
    id: "batch-job",
    title: "Batch job",
    match: ["batch job", "batch date"],
    plain: "A task the computer runs on a fixed date for everyone at once, such as sending all renewal letters 90 days before term end. It ignores what is going on with each customer.",
    de: {
      title: "Batch-Job",
      match: ["Batch-Job", "Batch-Termin"],
      plain: "Eine Aufgabe, die der Rechner an einem festen Datum für alle auf einmal ausführt, etwa alle Renewal-Briefe 90 Tage vor Laufzeitende zu versenden. Was bei dem einzelnen Kunden gerade los ist, bleibt unbeachtet.",
    },
  },
  // --- loyalty ------------------------------------------------------------------
  {
    id: "loyalty-programme",
    title: "Loyalty programme",
    match: ["loyalty programme", "loyalty programmes", "loyalty concept", "loyalty system"],
    plain: "A set of benefits meant to make customers stay. It can give money (a bonus), help (a service) or a circle of people (a community).",
    de: {
      title: "Loyalty-Programm",
      match: ["Loyalty-Programm", "Loyalty-Programme", "Loyalty-Programms", "Loyalty-Konzept", "Loyalty-Systems", "Loyalty-System"],
      plain: "Eine Reihe von Vorteilen, die Kunden zum Bleiben bewegen sollen. Sie können Geld geben (ein Bonus), Hilfe (einen Service) oder einen Kreis von Menschen (eine Community).",
    },
  },
  {
    id: "rebate",
    title: "Rebate",
    match: ["rebate", "rebates"],
    plain: "A discount on the fee, given back as a percentage. A 2% rebate on a €12,000 fee is €240.",
    de: {
      title: "Rabatt (Rebate)",
      match: ["Rabatt", "Rabatte", "Rabatts", "Rebate"],
      plain: "Ein Nachlass auf die Gebühr, als Prozentsatz. Ein Rabatt von 2 % auf eine Gebühr von 12.000 € sind 240 €.",
    },
  },
  {
    id: "discount-trap",
    title: "Discount trap",
    match: ["discount trap"],
    plain: "A rebate is paid on every member, including those who would have stayed, and stopping it feels like a loss. Customers learn to wait for the next one.",
    de: {
      title: "Rabattfalle",
      match: ["Rabattfalle"],
      plain: "Ein Rabatt wird auf jedes Mitglied gezahlt, auch auf die, die geblieben wären, und ihn zu beenden fühlt sich wie ein Verlust an. Kunden lernen, auf den nächsten zu warten.",
    },
  },
  {
    id: "endowed-progress",
    title: "Endowed progress effect",
    match: ["endowed progress effect", "endowed progress"],
    plain: "People work harder towards a goal when they feel they have already started. A loyalty card with two stamps already given got more completions than a card with none.",
    from: "Nunes & Drèze 2006",
    de: {
      title: "Endowed-Progress-Effekt",
      match: ["Endowed-Progress-Effekt", "Endowed Progress"],
      plain: "Menschen strengen sich mehr für ein Ziel an, wenn sie das Gefühl haben, schon begonnen zu haben. Eine Kundenkarte mit zwei bereits abgestempelten Feldern wurde häufiger vollständig gefüllt als eine ohne.",
    },
  },
  {
    id: "tenure",
    title: "Tenure",
    match: ["tenure"],
    plain: "How long someone has been a customer or a member. A benefit that grows with tenure gives a reason to stay for years.",
    de: {
      title: "Tenure (Kundendauer)",
      match: ["Tenure", "Kundendauer"],
      plain: "Wie lange jemand Kunde oder Mitglied ist. Ein Vorteil, der mit der Tenure wächst, gibt einen Grund, jahrelang zu bleiben.",
    },
  },
  {
    id: "round-table",
    title: "Round table",
    match: ["round table", "round tables"],
    plain: "A meeting where customers of one industry sit together and talk about shared problems, moderated by the provider.",
    de: {
      title: "Round Table",
      match: ["Round Table", "Round Tables", "Round-Table"],
      plain: "Ein Treffen, bei dem Kunden einer Branche zusammensitzen und über gemeinsame Probleme sprechen, moderiert vom Anbieter.",
    },
  },
  {
    id: "advisory-circle",
    title: "Advisory circle",
    match: ["advisory circle"],
    plain: "A small group of customers the provider asks for advice, for example about which feature to build next.",
    de: {
      title: "Beirat (Advisory Circle)",
      match: ["Advisory Circle", "Beirat", "Kundenbeirat"],
      plain: "Eine kleine Gruppe von Kunden, die der Anbieter um Rat fragt, zum Beispiel, welche Funktion als Nächstes gebaut werden soll.",
    },
  },
  {
    id: "roadmap",
    title: "Roadmap",
    match: ["roadmap"],
    plain: "The plan of which features a provider will build next, and roughly when.",
    de: {
      title: "Roadmap",
      match: ["Roadmap"],
      plain: "Der Plan, welche Funktionen ein Anbieter als Nächstes baut und ungefähr wann.",
    },
  },
  {
    id: "forum",
    title: "Forum",
    match: ["forum"],
    plain: "An online place where customers post questions and answer each other.",
    de: {
      title: "Forum",
      match: ["Forum"],
      plain: "Ein Ort im Netz, an dem Kunden Fragen stellen und einander antworten.",
    },
  },
  // --- the IT case --------------------------------------------------------------
  {
    id: "touchpoint",
    title: "Touchpoint",
    match: ["touchpoint", "touchpoints"],
    plain: "One moment where a customer meets the provider: a proposal, a call, a letter, an outage notice, a renewal offer. The customer's view of the provider is built from these moments.",
    from: "Bitner 1990",
    de: {
      title: "Touchpoint",
      match: ["Touchpoint", "Touchpoints"],
      plain: "Ein Moment, in dem ein Kunde dem Anbieter begegnet: ein Angebot, ein Anruf, ein Brief, eine Störungsmeldung, ein Renewal-Angebot. Das Bild des Kunden vom Anbieter setzt sich aus diesen Momenten zusammen.",
    },
  },
  {
    id: "customer-journey",
    title: "Customer journey",
    match: ["customer journey"],
    plain: "The whole path a customer takes with a provider, from the first proposal to renewal, as a series of touchpoints.",
    from: "Lemon & Verhoef 2016",
    de: {
      title: "Customer Journey",
      match: ["Customer Journey"],
      plain: "Der ganze Weg eines Kunden mit einem Anbieter, vom ersten Angebot bis zum Renewal, als Folge von Touchpoints.",
    },
  },
  {
    id: "go-live",
    title: "Go-live",
    match: ["go-live"],
    plain: "The day a new service starts to run for real.",
    de: {
      title: "Go-live",
      match: ["Go-live", "Go-Live"],
      plain: "Der Tag, an dem ein neuer Dienst echt zu laufen beginnt.",
    },
  },
  {
    id: "outage",
    title: "Outage and incident",
    match: ["outage", "incident", "incidents"],
    plain: "An outage is when the service is down. An incident is any event that disturbs the service. How fast and how clearly the provider tells the customer is a large part of how safe the customer feels.",
    de: {
      title: "Ausfall und Incident",
      match: ["Ausfall", "Ausfälle", "Ausfalls", "Incident", "Incidents"],
      plain: "Ein Ausfall ist, wenn der Dienst nicht läuft. Ein Incident ist jedes Ereignis, das den Dienst stört. Wie schnell und wie klar der Anbieter den Kunden informiert, bestimmt zu einem großen Teil, wie sicher sich der Kunde fühlt.",
    },
  },
  {
    id: "status-page",
    title: "Status page",
    match: ["status page"],
    plain: "A public web page that shows whether the service is running and lists past problems.",
    de: {
      title: "Statusseite",
      match: ["Statusseite"],
      plain: "Eine öffentliche Webseite, die zeigt, ob der Dienst läuft, und frühere Störungen auflistet.",
    },
  },
  {
    id: "backup",
    title: "Backup and restore time",
    match: ["backup", "backups", "restore time"],
    plain: "A backup is a copy of the data kept in another place. The restore time is how long it takes to get the data back after a loss.",
    de: {
      title: "Backup und Wiederherstellungszeit",
      match: ["Backup", "Backups", "Wiederherstellungszeit"],
      plain: "Ein Backup ist eine Kopie der Daten an einem anderen Ort. Die Wiederherstellungszeit ist die Dauer, bis die Daten nach einem Verlust wieder da sind.",
    },
  },
  {
    id: "data-centre",
    title: "Data centre",
    match: ["data centre", "data centres"],
    plain: "The building where the servers stand. Customers ask where it is, because the place decides which law applies and how safe the data is.",
    de: {
      title: "Rechenzentrum",
      match: ["Rechenzentrum", "Rechenzentren", "Rechenzentrums"],
      plain: "Das Gebäude, in dem die Server stehen. Kunden fragen, wo es liegt, denn der Ort bestimmt, welches Recht gilt und wie sicher die Daten sind.",
    },
  },
  {
    id: "liability",
    title: "Liability",
    match: ["liability"],
    plain: "Who pays if something goes wrong. “Covers data loss up to €500,000” is a limit on the provider's liability.",
    de: {
      title: "Haftung",
      match: ["Haftung"],
      plain: "Wer zahlt, wenn etwas schiefgeht. „Deckt Datenverlust bis 500.000 €“ ist eine Grenze der Haftung des Anbieters.",
    },
  },
  {
    id: "migration",
    title: "Migration",
    match: ["migration", "migrations"],
    plain: "Moving a customer's systems and data from an old provider or platform to a new one.",
    de: {
      title: "Migration",
      match: ["Migration", "Migrationen"],
      plain: "Die Systeme und Daten eines Kunden von einem alten Anbieter oder einer alten Plattform auf einen neuen umziehen.",
    },
  },
  {
    id: "ticket",
    title: "Ticket",
    match: ["ticket", "tickets"],
    plain: "A numbered record of a customer's request or problem in the service desk system.",
    de: {
      title: "Ticket",
      match: ["Ticket", "Tickets", "Ticketnummer"],
      plain: "Ein nummerierter Eintrag zur Anfrage oder zum Problem eines Kunden im System des Service Desks.",
    },
  },
  {
    id: "upsell",
    title: "Upsell",
    match: ["upsell"],
    plain: "Offering a customer something more or bigger than what they already have.",
    de: {
      title: "Upsell",
      match: ["Upsell", "Upsell-Mail"],
      plain: "Einem Kunden etwas Zusätzliches oder Größeres anbieten als das, was er schon hat.",
    },
  },
  {
    id: "users-day",
    title: "Users' day",
    match: ["users' day", "user group"],
    plain: "A yearly meeting where customers of a provider meet each other and the provider's team.",
    de: {
      title: "Anwendertag (User Group)",
      match: ["Anwendertag", "User Group", "Anwendertreffen"],
      plain: "Ein jährliches Treffen, bei dem Kunden eines Anbieters einander und das Team des Anbieters kennenlernen.",
    },
  },
  // --- Level 2 and 3 concepts ------------------------------------------------------
  {
    id: "acceptance",
    title: "Acceptance (of a measure)",
    match: ["acceptance"],
    plain: "How well customers will take a measure. It is limited by the data the measure uses: the less the customer agreed to, the lower the score can be.",
    de: {
      title: "Akzeptanz (einer Maßnahme)",
      match: ["Akzeptanz"],
      plain: "Wie gut Kunden eine Maßnahme annehmen. Sie wird von den Daten begrenzt, die die Maßnahme nutzt: Je weniger der Kunde zugestimmt hat, desto niedriger kann die Bewertung sein.",
    },
  },
  {
    id: "scalability",
    title: "Scalability",
    match: ["scalability", "scalable"],
    plain: "What one more customer costs once the measure is built. If it costs nothing more, it scales. If it takes a person's time for every customer, it does not.",
    de: {
      title: "Skalierbarkeit",
      match: ["Skalierbarkeit", "skalieren", "skaliert"],
      plain: "Was ein weiterer Kunde kostet, wenn die Maßnahme einmal steht. Kostet er nichts extra, skaliert sie. Braucht sie für jeden Kunden die Zeit eines Menschen, skaliert sie nicht.",
    },
  },
  {
    id: "choice-architecture",
    title: "Choice architecture",
    match: ["choice architecture"],
    plain: "The way options, defaults and steps are set up, which shapes what people choose without forcing them.",
    from: "Thaler & Sunstein 2008",
    de: {
      title: "Choice Architecture (Entscheidungsarchitektur)",
      match: ["Choice Architecture", "Entscheidungsarchitektur"],
      plain: "Die Art, wie Optionen, Voreinstellungen und Schritte aufgebaut sind, und die prägt, was Menschen wählen, ohne sie zu zwingen.",
    },
  },
  {
    id: "durability",
    title: "Durability",
    match: ["durability"],
    plain: "Whether a measure still works when the person who runs it leaves or the discount stops. A process step or a rule lasts; a person or a discount does not.",
    de: {
      title: "Durability (Beständigkeit)",
      match: ["Durability", "Beständigkeit"],
      plain: "Ob eine Maßnahme noch wirkt, wenn die Person, die sie betreibt, geht oder der Rabatt endet. Ein Prozessschritt oder eine Regel hält; eine Person oder ein Rabatt nicht.",
    },
  },
  {
    id: "tripwire",
    title: "Tripwire",
    match: ["tripwire"],
    plain: "A result agreed in advance that makes you change course. It has a metric, a threshold that beats today's figure, a date and an action.",
    example: "If fewer than 30% of invited customers have booked a review by month 5, we shorten the review.",
    de: {
      title: "Tripwire",
      match: ["Tripwire"],
      plain: "Ein vorab vereinbartes Ergebnis, das Sie den Kurs ändern lässt. Es hat eine Kennzahl, eine Schwelle, die den heutigen Wert übertrifft, eine Frist und eine Maßnahme.",
      example: "Haben bis Monat 5 weniger als 30 % der eingeladenen Kunden ein Review gebucht, verkürzen wir das Review.",
    },
  },
  {
    id: "baseline",
    title: "Baseline",
    match: ["baseline", "baselines"],
    plain: "Today's figure for a metric, before anything changes. A threshold must be better than the baseline to show a real change.",
    de: {
      title: "Baseline",
      match: ["Baseline", "Baselines"],
      plain: "Der heutige Wert einer Kennzahl, bevor sich etwas ändert. Eine Schwelle muss besser sein als die Baseline, um eine echte Veränderung zu zeigen.",
    },
  },
  {
    id: "regret",
    title: "Regret",
    match: ["regret", "worst regret"],
    plain: "How much less you get than the best choice would have given, once you learn what happened. Choosing the option with the smallest worst regret is a way to decide when you cannot estimate the odds.",
    from: "Loomes & Sugden 1982",
    de: {
      title: "Regret (Bedauern)",
      match: ["Regret", "Bedauern", "größten Regret"],
      plain: "Wie viel weniger Sie bekommen, als die beste Wahl gebracht hätte, sobald Sie wissen, was passiert ist. Die Option mit dem kleinsten größten Regret zu wählen ist eine Möglichkeit zu entscheiden, wenn sich die Wahrscheinlichkeiten nicht schätzen lassen.",
    },
  },
  {
    id: "premortem",
    title: "Pre-mortem",
    match: ["pre-mortem"],
    plain: "Before you start, imagine the plan has already failed and write down why. It brings out the assumptions you were about to rely on.",
    from: "Klein 2007",
    de: {
      title: "Premortem",
      match: ["Premortem"],
      plain: "Bevor Sie starten, stellen Sie sich vor, der Plan sei schon gescheitert, und schreiben auf, warum. So kommen die Annahmen ans Licht, auf die Sie sich verlassen wollten.",
    },
  },
  {
    id: "pickup-point",
    title: "Pickup point",
    match: ["pickup point"],
    plain: "The number and the date at which you look again at something you postponed. It turns “later” into a decision.",
    de: {
      title: "Wiedervorlage-Punkt (Pickup Point)",
      match: ["Pickup Point", "Wiedervorlage-Punkt"],
      plain: "Die Zahl und das Datum, an dem Sie sich etwas Zurückgestelltes noch einmal ansehen. Aus „später“ wird so eine Entscheidung.",
    },
  },
  {
    id: "cco",
    title: "Chief Customer Officer",
    match: ["Chief Customer Officer", "CCO"],
    plain: "The manager who owns the whole customer relationship, across marketing, sales and customer success.",
    de: {
      title: "Chief Customer Officer",
      match: ["Chief Customer Officer", "CCO"],
      plain: "Die Führungskraft, die die gesamte Kundenbeziehung verantwortet, über Marketing, Vertrieb und Customer Success hinweg.",
    },
  },
  {
    id: "kpi",
    title: "KPI — key performance indicator",
    match: ["KPI", "KPIs"],
    plain: "One number that shows whether something is working, such as the renewal rate.",
    de: {
      title: "KPI (Key Performance Indicator)",
      match: ["KPI", "KPIs"],
      plain: "Eine Zahl, die zeigt, ob etwas funktioniert, etwa die Renewal-Quote.",
    },
  },
];

// --- lookup ---------------------------------------------------------------------

export const GLOSS_BY_ID: Record<string, GlossEntry> = Object.fromEntries(GLOSSARY.map((g) => [g.id, g]));

/** The texts of an entry in the active language (the English text where a German version is missing). */
export function glossText(g: GlossEntry): { title: string; plain: string; example?: string; from?: string } {
  if (getLang() === "de" && g.de) return { title: g.de.title ?? g.title, plain: g.de.plain, example: g.de.example, from: g.from };
  return { title: g.title, plain: g.plain, example: g.example, from: g.from };
}

const isAcronym = (s: string) => s === s.toUpperCase() && /[A-Z]/.test(s);
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function build(forms: (g: GlossEntry) => string[] | undefined) {
  const lookup = new Map<string, { entry: GlossEntry; exact: string | null }>();
  for (const g of GLOSSARY) for (const m of forms(g) ?? []) if (!lookup.has(m.toLowerCase())) lookup.set(m.toLowerCase(), { entry: g, exact: g.exactCase || isAcronym(m) ? m : null });
  const re = new RegExp(
    `(?<![\\p{L}\\p{N}_])(${[...lookup.keys()]
      .sort((a, b) => b.length - a.length)
      .map(escapeRe)
      .join("|")})(?![\\p{L}\\p{N}_])`,
    "giu",
  );
  return { lookup, re };
}

const EN = build((g) => g.match);
const DE = build((g) => g.de?.match);

/** lowercase written form → its entry, and whether that form must be matched exactly. */
export const GLOSS_LOOKUP = EN.lookup;
export const GLOSS_RE = EN.re;
export const GLOSS_LOOKUP_DE = DE.lookup;
export const GLOSS_RE_DE = DE.re;
