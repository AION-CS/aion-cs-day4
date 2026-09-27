import { bi, t } from "@/lib/lang";

/**
 * Day 4 reference list. Cards cite by key; each `References` accordion shows the union of what its own cards
 * cite. `chip` is the short "Author Year" label a Source chip prints. Every entry is a published work, a court decision or a statute
 * cited by its usual reference; the bracketed note says what the card takes from it (in German in the German version, the
 * bibliographic part stays as published). Page ranges and editions differ between printings: check each before you teach from it.
 */

export type RefKey =
  | "kahneman2011"
  | "damasio1994"
  | "zajonc1980"
  | "plassmann2012"
  | "ariely2010"
  | "poldrack2006"
  | "baumeister1995"
  | "han2010"
  | "mayer1995"
  | "kahneman1979"
  | "webster1972"
  | "cialdini2021"
  | "worchel1975"
  | "goldstein2008"
  | "brehm1966"
  | "uwg5"
  | "awad2006"
  | "aguirre2015"
  | "white2008"
  | "gdpr2016"
  | "planet2019"
  | "edpb2020"
  | "wp251"
  | "dowling1997"
  | "kumar2004"
  | "nunes2006"
  | "kivetz2006"
  | "bolton2000"
  | "rauyruen2007"
  | "vargo2004"
  | "bitner1990"
  | "lemon2016"
  | "nisbett1977"
  | "thaler2008"
  | "meadows1999"
  | "knight1921"
  | "klein2007"
  | "loomes1982"
  | "kaplan1992"
  | "doran1981"
  | "deming1986";

export type Reference = { key: RefKey; chip: string; full: string };

const cite = (key: RefKey, chip: string, ref: string, en: string, de: string) => ({ key, chip, full: t(`${ref} (${en})`, `${ref} (${de})`) });

export const REFERENCES: Record<RefKey, Reference> = bi({
  kahneman2011: cite("kahneman2011", "Kahneman 2011", "Kahneman, D. (2011). Thinking, Fast and Slow. Farrar, Straus and Giroux.", "A fast, automatic, feeling-led way of judging and a slow, deliberate one.", "Eine schnelle, automatische, gefühlsgeleitete Art zu urteilen und eine langsame, überlegte."),
  damasio1994: cite("damasio1994", "Damasio 1994", "Damasio, A. R. (1994). Descartes' Error: Emotion, Reason, and the Human Brain. Putnam.", "Patients whose emotional processing was damaged could still reason and yet decided badly: emotion is part of good decisions.", "Patienten mit gestörter emotionaler Verarbeitung konnten noch denken und entschieden dennoch schlecht: Emotion ist Teil guter Entscheidungen."),
  zajonc1980: cite("zajonc1980", "Zajonc 1980", "Zajonc, R. B. (1980). Feeling and thinking: Preferences need no inferences. American Psychologist, 35(2), 151–175.", "Affective reactions can come first and do not need a reasoned basis.", "Affektive Reaktionen können zuerst kommen und brauchen keine begründete Basis."),
  plassmann2012: cite("plassmann2012", "Plassmann et al. 2012", "Plassmann, H., Ramsøy, T. Z., & Milosavljevic, M. (2012). Branding the brain: A critical review and outlook. Journal of Consumer Psychology, 22(1), 18–36.", "What brain-imaging studies of brands and choices can and cannot show.", "Was Studien mit bildgebenden Verfahren zu Marken und Entscheidungen zeigen können und was nicht."),
  ariely2010: cite("ariely2010", "Ariely & Berns 2010", "Ariely, D., & Berns, G. S. (2010). Neuromarketing: The hope and hype of neuroimaging in business. Nature Reviews Neuroscience, 11(4), 284–292.", "Promise and limits of neuromarketing.", "Versprechen und Grenzen des Neuromarketings."),
  poldrack2006: cite("poldrack2006", "Poldrack 2006", "Poldrack, R. A. (2006). Can cognitive processes be inferred from neuroimaging data? Trends in Cognitive Sciences, 10(2), 59–63.", "Reverse inference: an active brain area does not by itself tell which mental state is present.", "Umgekehrter Schluss: Ein aktives Hirnareal sagt allein nicht, welcher mentale Zustand vorliegt."),
  baumeister1995: cite("baumeister1995", "Baumeister & Leary 1995", "Baumeister, R. F., & Leary, M. R. (1995). The need to belong: Desire for interpersonal attachments as a fundamental human motivation. Psychological Bulletin, 117(3), 497–529.", "Belonging as a basic human need.", "Zugehörigkeit als menschliches Grundbedürfnis."),
  han2010: cite("han2010", "Han, Nunes & Drèze 2010", "Han, Y. J., Nunes, J. C., & Drèze, X. (2010). Signaling status with luxury goods: The role of brand prominence. Journal of Marketing, 74(4), 15–30.", "Status is a signal to other people, and how visible it is matters.", "Status ist ein Signal an andere Menschen, und es kommt darauf an, wie sichtbar es ist."),
  mayer1995: cite("mayer1995", "Mayer, Davis & Schoorman 1995", "Mayer, R. C., Davis, J. H., & Schoorman, F. D. (1995). An integrative model of organizational trust. Academy of Management Review, 20(3), 709–734.", "Trust rests on ability, benevolence and integrity.", "Vertrauen beruht auf Fähigkeit, Wohlwollen und Integrität."),
  kahneman1979: cite("kahneman1979", "Kahneman & Tversky 1979", "Kahneman, D., & Tversky, A. (1979). Prospect theory: An analysis of decision under risk. Econometrica, 47(2), 263–291.", "Loss aversion.", "Verlustaversion."),
  webster1972: cite("webster1972", "Webster & Wind 1972", "Webster, F. E., & Wind, Y. (1972). A general model for understanding organizational buying behavior. Journal of Marketing, 36(2), 12–19.", "Organisational buying is made by people in a buying centre, with individual as well as organisational motives.", "Beschaffung in Organisationen wird von Menschen in einem Buying Center getroffen, mit individuellen wie organisationalen Motiven."),
  cialdini2021: cite("cialdini2021", "Cialdini 2021", "Cialdini, R. B. (2021). Influence, New and Expanded: The Psychology of Persuasion. Harper Business.", "Scarcity, social proof and authority among the principles of influence.", "Scarcity, Social Proof und Authority unter den Prinzipien der Einflussnahme."),
  worchel1975: cite("worchel1975", "Worchel, Lee & Adewole 1975", "Worchel, S., Lee, J., & Adewole, A. (1975). Effects of supply and demand on ratings of object value. Journal of Personality and Social Psychology, 32(5), 906–914.", "The same object was rated as more valuable when it was scarce.", "Dasselbe Objekt wurde als wertvoller bewertet, wenn es knapp war."),
  goldstein2008: cite("goldstein2008", "Goldstein, Cialdini & Griskevicius 2008", "Goldstein, N. J., Cialdini, R. B., & Griskevicius, V. (2008). A room with a viewpoint: Using social norms to motivate environmental conservation in hotels. Journal of Consumer Research, 35(3), 472–482.", "A message about what others like the guest did worked better than a general appeal.", "Eine Botschaft darüber, was andere wie der Gast getan haben, wirkte besser als ein allgemeiner Appell."),
  brehm1966: cite("brehm1966", "Brehm 1966", "Brehm, J. W. (1966). A Theory of Psychological Reactance. Academic Press.", "A pressure to choose can lead people to resist it.", "Druck, sich zu entscheiden, kann dazu führen, dass Menschen sich dagegen wehren."),
  uwg5: {
    key: "uwg5" as RefKey,
    chip: "§ 5 UWG",
    full: t(
      "§ 5 UWG (Gesetz gegen den unlauteren Wettbewerb): a commercial practice is misleading if it contains untrue statements or other information that is likely to mislead a market participant into a decision it would not otherwise take.",
      "§ 5 UWG (Gesetz gegen den unlauteren Wettbewerb): Eine geschäftliche Handlung ist irreführend, wenn sie unwahre Angaben oder sonstige Angaben enthält, die geeignet sind, einen Marktteilnehmer zu einer Entscheidung zu veranlassen, die er sonst nicht getroffen hätte.",
    ),
  },
  awad2006: cite("awad2006", "Awad & Krishnan 2006", "Awad, N. F., & Krishnan, M. S. (2006). The personalization privacy paradox: An empirical evaluation of information transparency and the willingness to be profiled online for personalization. MIS Quarterly, 30(1), 13–28.", "Customers want personalisation and resist the data collection it needs; transparency changes how willing they are.", "Kunden wollen Personalisierung und wehren sich gegen die Datenerhebung, die sie braucht; Transparenz verändert ihre Bereitschaft."),
  aguirre2015: cite("aguirre2015", "Aguirre et al. 2015", "Aguirre, E., Mahr, D., Grewal, D., de Ruyter, K., & Wetzels, M. (2015). Unraveling the personalization paradox: The effect of information collection and trust-building strategies on online advertisement effectiveness. Journal of Retailing, 91(1), 34–49.", "Personalisation raised the feeling of vulnerability, unless customers trusted how the data was handled.", "Personalisierung verstärkte das Gefühl der Verletzlichkeit, außer Kunden vertrauten dem Umgang mit den Daten."),
  white2008: cite("white2008", "White et al. 2008", "White, T. B., Zahay, D. L., Thorbjørnsen, H., & Shavitt, S. (2008). Getting too personal: Reactance to highly personalized email solicitations. Marketing Letters, 19(1), 39–50.", "Highly personalised email can raise resistance when the customer does not see why the sender knows so much.", "Stark personalisierte E-Mails können Widerstand auslösen, wenn der Kunde nicht sieht, warum der Absender so viel weiß."),
  gdpr2016: {
    key: "gdpr2016" as RefKey,
    chip: t("GDPR 2016", "DSGVO 2016"),
    full: t(
      "Regulation (EU) 2016/679 (General Data Protection Regulation): Art. 4(4) profiling, Art. 5 principles (purpose limitation, data minimisation), Art. 6 lawfulness, Art. 7 conditions for consent, Art. 21 right to object, including to direct marketing.",
      "Verordnung (EU) 2016/679 (Datenschutz-Grundverordnung, DSGVO): Art. 4 Nr. 4 Profiling, Art. 5 Grundsätze (Zweckbindung, Datenminimierung), Art. 6 Rechtmäßigkeit, Art. 7 Bedingungen für die Einwilligung, Art. 21 Widerspruchsrecht, auch gegen Direktwerbung.",
    ),
  },
  planet2019: {
    key: "planet2019" as RefKey,
    chip: "CJEU Planet49 2019",
    full: t(
      "Court of Justice of the European Union, Case C-673/17, Planet49 (judgment of 1 October 2019). (A pre-ticked box does not give valid consent: consent needs an active step.)",
      "Gerichtshof der Europäischen Union, Rechtssache C-673/17, Planet49 (Urteil vom 1. Oktober 2019). (Ein vorangekreuztes Kästchen ergibt keine wirksame Einwilligung: Die Einwilligung braucht einen aktiven Schritt.)",
    ),
  },
  edpb2020: cite("edpb2020", "EDPB 2020", "European Data Protection Board (2020). Guidelines 05/2020 on consent under Regulation 2016/679.", "Consent must be freely given, specific, informed and unambiguous, and as easy to withdraw as to give.", "Die Einwilligung muss freiwillig, für den bestimmten Fall, informiert und unmissverständlich erfolgen und so leicht widerrufbar sein wie erteilbar."),
  wp251: cite("wp251", "WP29 2018", "Article 29 Working Party (2018). Guidelines on automated individual decision-making and profiling for the purposes of Regulation 2016/679 (WP251 rev.01).", "What profiling is and what rules apply to it.", "Was Profiling ist und welche Regeln dafür gelten."),
  dowling1997: cite("dowling1997", "Dowling & Uncles 1997", "Dowling, G. R., & Uncles, M. (1997). Do customer loyalty programs really work? Sloan Management Review, 38(4), 71–82.", "A programme changes little unless it adds real value the customer would otherwise not get.", "Ein Programm verändert wenig, wenn es keinen echten Wert bietet, den der Kunde sonst nicht bekäme."),
  kumar2004: cite("kumar2004", "Kumar & Shah 2004", "Kumar, V., & Shah, D. (2004). Building and sustaining profitable customer loyalty for the 21st century. Journal of Retailing, 80(4), 317–330.", "Behavioural and attitudinal loyalty; the pitfalls of rewarding customers who are not profitable.", "Verhaltensbezogene und einstellungsbezogene Loyalität; die Fallstricke, Kunden zu belohnen, die nicht profitabel sind."),
  nunes2006: cite("nunes2006", "Nunes & Drèze 2006", "Nunes, J. C., & Drèze, X. (2006). The endowed progress effect: How artificial advancement increases effort. Journal of Consumer Research, 32(4), 504–512.", "A loyalty card that started with two stamps already given was completed by about 34% of customers, against about 19% for a card with none.", "Eine Treuekarte, die mit zwei bereits vergebenen Stempeln begann, wurde von etwa 34 % der Kunden vollständig gefüllt, gegenüber etwa 19 % bei einer Karte ohne Stempel."),
  kivetz2006: cite("kivetz2006", "Kivetz et al. 2006", "Kivetz, R., Urminsky, O., & Zheng, Y. (2006). The goal-gradient hypothesis resurrected: Purchase acceleration, illusionary goal progress, and customer retention. Journal of Marketing Research, 43(1), 39–58.", "People speed up as they get closer to a reward.", "Menschen werden schneller, je näher sie einer Belohnung kommen."),
  bolton2000: cite("bolton2000", "Bolton et al. 2000", "Bolton, R. N., Kannan, P. K., & Bramlett, M. D. (2000). Implications of loyalty program membership and service experiences for customer retention and value. Journal of the Academy of Marketing Science, 28(1), 95–108.", "Membership helped retention, and a poor service experience weakened it.", "Mitgliedschaft half bei der Retention, und schlechte Service-Erfahrungen schwächten sie."),
  rauyruen2007: cite("rauyruen2007", "Rauyruen & Miller 2007", "Rauyruen, P., & Miller, K. E. (2007). Relationship quality as a predictor of B2B customer loyalty. Journal of Business Research, 60(1), 21–31.", "In business-to-business markets, service quality and trust predict loyalty.", "Auf Business-to-Business-Märkten sagen Servicequalität und Vertrauen die Loyalität voraus."),
  vargo2004: cite("vargo2004", "Vargo & Lusch 2004", "Vargo, S. L., & Lusch, R. F. (2004). Evolving to a new dominant logic for marketing. Journal of Marketing, 68(1), 1–17.", "Value is created in use, together with the customer, not delivered in the price.", "Wert entsteht in der Nutzung, gemeinsam mit dem Kunden, und wird nicht im Preis geliefert."),
  bitner1990: cite("bitner1990", "Bitner 1990", "Bitner, M. J. (1990). Evaluating service encounters: The effects of physical surroundings and employee responses. Journal of Marketing, 54(2), 69–82.", "Each encounter with a service is judged on its own and adds up to the customer's view.", "Jede Begegnung mit einem Service wird für sich beurteilt und summiert sich zum Bild des Kunden."),
  lemon2016: cite("lemon2016", "Lemon & Verhoef 2016", "Lemon, K. N., & Verhoef, P. C. (2016). Understanding customer experience throughout the customer journey. Journal of Marketing, 80(6), 69–96.", "A journey is a series of touchpoints, and the experience builds across them.", "Eine Journey ist eine Reihe von Touchpoints, und die Erfahrung baut sich über sie auf."),
  nisbett1977: cite("nisbett1977", "Nisbett & Wilson 1977", "Nisbett, R. E., & Wilson, T. D. (1977). Telling more than we can know: Verbal reports on mental processes. Psychological Review, 84(3), 231–259.", "People's stated reasons often do not match what moved them.", "Die genannten Gründe der Menschen passen oft nicht zu dem, was sie bewegt hat."),
  thaler2008: cite("thaler2008", "Thaler & Sunstein 2008", "Thaler, R. H., & Sunstein, C. R. (2008). Nudge: Improving Decisions About Health, Wealth, and Happiness. Yale University Press.", "Choice architecture: how the way options are presented shapes what people choose; defaults and simplification.", "Entscheidungsarchitektur: wie die Darstellung von Optionen beeinflusst, was Menschen wählen; Voreinstellungen und Vereinfachung."),
  meadows1999: cite("meadows1999", "Meadows 1999", "Meadows, D. (1999). Leverage Points: Places to Intervene in a System. The Sustainability Institute.", "Changing rules and structures moves a system more than changing a single parameter.", "Regeln und Strukturen zu ändern bewegt ein System stärker als einen einzelnen Parameter zu ändern."),
  knight1921: cite("knight1921", "Knight 1921", "Knight, F. H. (1921). Risk, Uncertainty and Profit. Houghton Mifflin.", "Risk is measurable odds; uncertainty is not.", "Risiko sind messbare Wahrscheinlichkeiten; Unsicherheit nicht."),
  klein2007: cite("klein2007", "Klein 2007", "Klein, G. (2007). Performing a project premortem. Harvard Business Review, 85(9), 18–19.", "Imagine the plan has failed and write down why, before it starts.", "Stellen Sie sich vor, der Plan sei gescheitert, und schreiben Sie auf, warum, bevor er startet."),
  loomes1982: cite("loomes1982", "Loomes & Sugden 1982", "Loomes, G., & Sugden, R. (1982). Regret theory: An alternative theory of rational choice under uncertainty. Economic Journal, 92(368), 805–824.", "Choosing to keep the largest regret small.", "So wählen, dass das größte Bedauern klein bleibt."),
  kaplan1992: cite("kaplan1992", "Kaplan & Norton 1992", "Kaplan, R. S., & Norton, D. P. (1992). The balanced scorecard: Measures that drive performance. Harvard Business Review, 70(1), 71–79.", "Objectives, measures, targets and initiatives kept in one line of sight.", "Ziele, Kennzahlen, Zielwerte und Initiativen in einer durchgehenden Linie."),
  doran1981: cite("doran1981", "Doran 1981", "Doran, G. T. (1981). There's a S.M.A.R.T. way to write management's goals and objectives. Management Review, 70(11), 35–36.", "Specific, measurable, assignable, realistic, time-related.", "Spezifisch, messbar, zuweisbar, realistisch, zeitgebunden."),
  deming1986: cite("deming1986", "Deming 1986", "Deming, W. E. (1986). Out of the Crisis. MIT Center for Advanced Engineering Study.", "Plan, do, study, act: a measured cycle instead of a one-off fix.", "Plan, Do, Study, Act: ein gemessener Zyklus statt einer einmaligen Korrektur."),
}) as Record<RefKey, Reference>;

export const refFull = (key: RefKey) => REFERENCES[key].full;

/** Print order of the accordion. */
export const REFERENCE_ORDER: RefKey[] = Object.keys(REFERENCES) as RefKey[];
