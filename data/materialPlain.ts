import { bi, t } from "@/lib/lang";
import type { MaterialId } from "@/data/materialIndex";

/**
 * The "In plain words" box under each card's scan line: the idea in everyday language, why it matters for the day's case
 * and tasks, and how to read the diagram or interactive below. Written for someone who has never met the topic. Typed as
 * a full Record so a card without an explanation fails the typecheck. Every control and label named in `picture` was
 * checked against the component that draws it.
 */
export type PlainExplain = {
  /** The idea itself, in everyday words. */
  idea: string;
  /** Why the learner should care, tied to the case or the task. */
  why: string;
  /** How to read or use the picture below. Omitted for cards without a diagram to read. */
  picture?: string;
};

export const MATERIAL_PLAIN: Record<MaterialId, PlainExplain> = bi({
  /* ---------------------------------------------------------------- Materi A */
  A1: {
    idea: t(
      "A customer does not first collect facts and then feel something about them. The feeling comes first, in a fraction of a second, and the facts are read in its light. Later the customer explains the choice with the facts, and the explanation is true, but it was not what decided. Neuromarketing tries to measure this with brain scans and body sensors. For a sales team the practical version is simpler: watch what customers do.",
      "Ein Kunde sammelt nicht erst Fakten und fühlt dann etwas dazu. Das Gefühl kommt zuerst, in einem Sekundenbruchteil, und die Fakten werden in seinem Licht gelesen. Später erklärt der Kunde die Wahl mit den Fakten, und die Erklärung stimmt, aber sie war nicht das, was entschieden hat. Neuromarketing versucht, das mit Hirnscans und Körpersensoren zu messen. Für ein Vertriebsteam ist die praktische Version einfacher: beobachten, was Kunden tun.",
    ),
    why: t(
      "CloudTech's offers look the same as everyone else's, so customers compare prices. Block 1.1 asks you to hear the feeling under eight customer statements, and Block 1.3 asks for approaches that answer a feeling and not only a fact.",
      "Die Angebote von CloudTech sehen aus wie die aller anderen, deshalb vergleichen Kunden Preise. Block 1.1 verlangt, das Gefühl unter acht Kundenaussagen zu hören, und Block 1.3 verlangt Ansätze, die ein Gefühl beantworten und nicht nur einen Fakt.",
    ),
    picture: t(
      "The three boxes are the steps of one decision: the first impression, the reasons collected and the story told afterwards. The bar at the bottom is the chance the customer says yes. Use the first pair of buttons to make the first impression calm or uneasy, and watch the same three facts below change their reading. The second pair of buttons shows how the facts are read, or what the customer will say if you ask them why.",
      "Die drei Kästen sind die Schritte einer Entscheidung: der erste Eindruck, die gesammelten Gründe und die Geschichte, die danach erzählt wird. Der Balken unten ist die Chance, dass der Kunde Ja sagt. Mit dem ersten Tastenpaar machen Sie den ersten Eindruck ruhig oder unruhig und sehen, wie sich die Lesart derselben drei Fakten darunter ändert. Das zweite Tastenpaar zeigt, wie die Fakten gelesen werden oder was der Kunde sagen wird, wenn Sie ihn nach dem Warum fragen.",
    ),
  },
  A2: {
    idea: t(
      "Four feelings explain most of what a customer feels about a provider: security (I am protected), trust (I can rely on them), status (others see me and my choice in a good light) and belonging (I am among people like me). Each has one test question. Two pairs are easy to mix up: security and trust, and status and belonging.",
      "Vier Gefühle erklären das meiste dessen, was ein Kunde für einen Anbieter empfindet: Sicherheit (ich bin geschützt), Vertrauen (ich kann mich auf sie verlassen), Status (andere sehen mich und meine Wahl in gutem Licht) und Zugehörigkeit (ich bin unter Menschen wie mir). Jedes hat eine Testfrage. Zwei Paare werden leicht verwechselt: Sicherheit und Vertrauen sowie Status und Zugehörigkeit.",
    ),
    why: t(
      "Block 1.1 gives you eight things customers said and asks you to sort them into the four emotions with the tests on this card. Block 1.3 then asks for three approaches, each resting on a different emotion.",
      "Block 1.1 gibt Ihnen acht Kundenaussagen und verlangt, sie mit den Tests dieser Karte den vier Emotionen zuzuordnen. Block 1.3 verlangt dann drei Ansätze, die jeweils auf einer anderen Emotion beruhen.",
    ),
    picture: t(
      "Each box is something a customer of Brenner Netzwerke said about a competitor, Kastell. Click one: its emotion appears in the box, and underneath you find the test question and why it holds. You can open all six.",
      "Jeder Kasten ist etwas, das ein Kunde von Brenner Netzwerke über einen Wettbewerber, Kastell, gesagt hat. Klicken Sie einen an: Seine Emotion erscheint im Kasten, und darunter finden Sie die Testfrage und warum sie zutrifft. Sie können alle sechs öffnen.",
    ),
  },
  A3: {
    idea: t(
      "Three triggers make people decide faster: scarcity (there is a limit, so waiting costs something), social proof (people like me did it) and authority (an expert or a certificate says it is right). They work while the customer believes them. A trigger that is true, checkable and respectful gets stronger when the customer checks; an empty one costs trust the moment the customer looks.",
      "Drei Trigger lassen Menschen schneller entscheiden: Scarcity (es gibt eine Grenze, also kostet Warten etwas), Social Proof (Menschen wie ich haben es getan) und Authority (ein Experte oder ein Zertifikat sagt, dass es richtig ist). Sie wirken, solange der Kunde ihnen glaubt. Ein Trigger, der wahr, prüfbar und respektvoll ist, wird stärker, wenn der Kunde nachprüft; ein leerer kostet Vertrauen, sobald der Kunde hinsieht.",
    ),
    why: t(
      "Block 1.2 gives you eight lines from sales material. You name the trigger in each and choose the lines you would not send as they stand, because they fail one of the three tests.",
      "Block 1.2 gibt Ihnen acht Zeilen aus Vertriebsmaterial. Sie benennen in jeder den Trigger und wählen die Zeilen, die Sie so nicht senden würden, weil sie einen der drei Tests nicht bestehen.",
    ),
    picture: t(
      "Each box is a line from Brenner or from its competitor Kastell. Click one to see its trigger and its three tests, each marked as passing or failing. The bar under the list shows how much the customer believes the provider's word. Use the two buttons “Before they check” and “After they check” to see what happens when the customer looks.",
      "Jeder Kasten ist eine Zeile von Brenner oder von dessen Wettbewerber Kastell. Klicken Sie einen an, um seinen Trigger und seine drei Tests zu sehen, jeweils als bestanden oder nicht bestanden markiert. Der Balken unter der Liste zeigt, wie sehr der Kunde dem Wort des Anbieters glaubt. Mit den beiden Tasten „Vor dem Nachprüfen“ und „Nach dem Nachprüfen“ sehen Sie, was passiert, wenn der Kunde hinsieht.",
    ),
  },
  A4: {
    idea: t(
      "Behavioural targeting means choosing the message and the moment by what a customer did. It fits better, and it needs data. The more personal you get, the fewer customers you may address, because only customers who agreed can be included. The rule of thumb: go as far up the ladder as each group's data allows, and choose the moment as carefully as the level.",
      "Behavioral Targeting heißt, Nachricht und Zeitpunkt danach zu wählen, was ein Kunde getan hat. Es passt besser und braucht Daten. Je persönlicher Sie werden, desto weniger Kunden dürfen Sie ansprechen, denn nur Kunden, die zugestimmt haben, dürfen einbezogen werden. Faustregel: So weit die Leiter hinauf, wie die Daten jeder Gruppe erlauben, und den Zeitpunkt so sorgfältig wählen wie die Stufe.",
    ),
    why: t(
      "Block 1.4 asks you to work out how many customers a usage-based offer can reach, what a bonus programme would cost and what a reached customer costs. The method is in the table on this card, on other numbers. Block 2.4 uses the consent rules for how customers join.",
      "Block 1.4 verlangt, auszurechnen, wie viele Kunden ein nutzungsbasiertes Angebot erreichen kann, was ein Bonusprogramm kosten würde und was ein erreichter Kunde kostet. Die Methode steht in der Tabelle dieser Karte, mit anderen Zahlen. Block 2.4 nutzt die Einwilligungsregeln dafür, wie Kunden beitreten.",
    ),
    picture: t(
      "The two bars show how many customers a level reaches and how many of them respond. The line under them gives the cost. Use the five Level buttons to climb the ladder: watch the reach fall at level 3 and level 4, where customers must have agreed. Use the three buttons under “When the message is sent” to see how much the moment changes the response.",
      "Die beiden Balken zeigen, wie viele Kunden eine Stufe erreicht und wie viele davon reagieren. Die Zeile darunter nennt die Kosten. Mit den fünf Stufen-Tasten steigen Sie die Leiter hinauf: Sehen Sie, wie die Reichweite bei Stufe 3 und Stufe 4 fällt, wo Kunden zugestimmt haben müssen. Mit den drei Tasten unter „Wann die Nachricht gesendet wird“ sehen Sie, wie stark der Zeitpunkt die Reaktion verändert.",
    ),
  },
  A5: {
    idea: t(
      "A loyalty programme can give money (a bonus), help (a service) or a circle of people (a community). The test that separates them: would the customer still want it if the discount disappeared? A bonus is paid on every member and stops mattering when it stops. A service and a community give the customer something they would miss. Short-term tools such as points that reset only move the next purchase.",
      "Ein Loyalty-Programm kann Geld geben (einen Bonus), Hilfe (einen Service) oder einen Kreis von Menschen (eine Community). Der Test, der sie trennt: Würde der Kunde es noch wollen, wenn der Rabatt wegfiele? Ein Bonus wird für jedes Mitglied gezahlt und zählt nicht mehr, wenn er endet. Ein Service und eine Community geben dem Kunden etwas, das er vermissen würde. Kurzfristige Werkzeuge wie Punkte, die verfallen, verschieben nur den nächsten Kauf.",
    ),
    why: t(
      "Block 1.4 asks for the cost of a bonus programme, and Block 2.4 asks you to design a simple loyalty concept: a type, two benefits, how customers join and how the benefit lasts.",
      "Block 1.4 verlangt die Kosten eines Bonusprogramms, und Block 2.4 verlangt, ein einfaches Loyalty-Konzept zu entwerfen: einen Typ, zwei Vorteile, wie Kunden beitreten und wie der Vorteil anhält.",
    ),
    picture: t(
      "The three bars are the three types. The first pair of buttons picks a type to read. The second pair switches the benefit between “Continues” and “Stops in year three”: watch how many members still renew. Under the bars is the cost per member per year. The second picture is a loyalty card: use its two buttons to compare a card with eight empty spaces with one that has two already stamped.",
      "Die drei Balken sind die drei Typen. Das erste Tastenpaar wählt einen Typ zum Lesen. Das zweite Tastenpaar schaltet den Vorteil zwischen „Läuft weiter“ und „Endet im dritten Jahr“ um: Sehen Sie, wie viele Mitglieder noch verlängern. Unter den Balken stehen die Kosten pro Mitglied und Jahr. Das zweite Bild ist eine Treuekarte: Mit ihren zwei Tasten vergleichen Sie eine Karte mit acht leeren Feldern mit einer, auf der zwei schon abgestempelt sind.",
    ),
  },
  A6: {
    idea: t(
      "A customer's view of a company is built from many small moments: a proposal, a first review, an outage, a renewal letter. Read each moment for what the customer says and does, and ask which of six needs it leaves unmet. Count the moments for each need, add the ones after which a customer left, and you have the strength of each need.",
      "Das Bild, das ein Kunde von einem Unternehmen hat, entsteht aus vielen kleinen Momenten: einem Angebot, einem ersten Review, einem Ausfall, einem Renewal-Brief. Lesen Sie jeden Moment danach, was der Kunde sagt und tut, und fragen Sie, welches von sechs Bedürfnissen er offen lässt. Zählen Sie die Momente je Bedürfnis, addieren Sie die, nach denen ein Kunde ging, und Sie haben die Stärke jedes Bedürfnisses.",
    ),
    why: t(
      "Block 2.1 gives you twelve touchpoints of CloudTech's journey to tag. Your tags decide which four needs you name in Block 2.2 and how strong you rate each one.",
      "Block 2.1 gibt Ihnen zwölf Touchpoints der Journey von CloudTech zum Zuordnen. Ihre Zuordnungen entscheiden, welche vier Bedürfnisse Sie in Block 2.2 nennen und wie stark Sie jedes einschätzen.",
    ),
    picture: t(
      "The first picture is six touchpoints of Brenner Netzwerke. Click one to see its need, the words that give it away (highlighted), the test question and why the nearest other need does not fit. The second picture is a bar for each need. Use the first pair of buttons to switch the ranking between touchpoints only and touchpoints plus customers who left; the dashed amber part is the customers who left. The second row of buttons picks one need to read.",
      "Das erste Bild zeigt sechs Touchpoints von Brenner Netzwerke. Klicken Sie einen an, um sein Bedürfnis, die verräterischen Wörter (hervorgehoben), die Testfrage und den Grund zu sehen, warum das nächstliegende andere Bedürfnis nicht passt. Das zweite Bild ist ein Balken für jedes Bedürfnis. Mit dem ersten Tastenpaar schalten Sie die Rangfolge zwischen nur Touchpoints und Touchpoints plus abgewanderten Kunden um; der gestrichelte bernsteinfarbene Teil sind die abgewanderten Kunden. Die zweite Tastenreihe wählt ein Bedürfnis zum Lesen.",
    ),
  },
  A7: {
    idea: t(
      "A measure is useful when it answers a need your evidence shows. Give it three scores from 1 to 3: effect (how much it changes customers), acceptance (how well customers accept it, which the data it uses limits) and scalability (what one more customer costs). Multiply them and compare, then check that the costs, with the loyalty concept, fit the budget.",
      "Eine Maßnahme ist nützlich, wenn sie ein Bedürfnis beantwortet, das Ihre Belege zeigen. Geben Sie ihr drei Werte von 1 bis 3: Wirkung (wie stark sie Kunden verändert), Akzeptanz (wie gut Kunden sie annehmen, was die verwendeten Daten begrenzen) und Skalierbarkeit (was ein weiterer Kunde kostet). Multiplizieren Sie sie und vergleichen Sie, dann prüfen Sie, ob die Kosten samt Loyalty-Konzept ins Budget passen.",
    ),
    why: t(
      "Block 2.3 gives you nine measures, €180,000 and six months. You choose three, name the needs each answers, score them and order them. Block 2.4 adds a loyalty concept that comes out of the same budget.",
      "Block 2.3 gibt Ihnen neun Maßnahmen, 180.000 € und sechs Monate. Sie wählen drei, benennen die Bedürfnisse, die jede beantwortet, bewerten sie und ordnen sie. Block 2.4 fügt ein Loyalty-Konzept hinzu, das aus demselben Budget bezahlt wird.",
    ),
    picture: t(
      "The first picture is a table of three measures of Brenner Netzwerke. The tick box in front of each puts it in or out of the plan. Click the Effect or the Acceptance number to change it: acceptance cannot go above the number printed next to it, and it snaps back if you try. Scalability follows from what one more customer costs. The bar under the table is the budget: a hatched amber part is over budget. The second picture lets you tick two benefits and shows the cost and the tests.",
      "Das erste Bild ist eine Tabelle mit drei Maßnahmen von Brenner Netzwerke. Das Kästchen davor nimmt sie in den Plan auf oder heraus. Klicken Sie die Zahl bei Wirkung oder Akzeptanz, um sie zu ändern: Die Akzeptanz kann nicht über die daneben gedruckte Zahl steigen und springt zurück, wenn Sie es versuchen. Die Skalierbarkeit folgt daraus, was ein weiterer Kunde kostet. Der Balken unter der Tabelle ist das Budget: Ein schraffierter bernsteinfarbener Teil liegt über dem Budget. Im zweiten Bild haken Sie zwei Vorteile an und sehen Kosten und Tests.",
    ),
  },

  /* ---------------------------------------------------------------- Materi B */
  B1: {
    idea: t(
      "A manager cannot talk to every customer. What a manager can do is design the conditions in which customers feel safe, can rely on the provider and receive offers that fit them. Those are the three levers: emotion, trust and relevance. A vision says what they are for, and it should describe what customers feel and do, not a tactic or a price.",
      "Eine Führungskraft kann nicht mit jedem Kunden sprechen. Was sie kann, ist die Bedingungen zu gestalten, unter denen Kunden sich sicher fühlen, sich auf den Anbieter verlassen können und Angebote bekommen, die zu ihnen passen. Das sind die drei Hebel: Emotion, Vertrauen und Relevanz. Eine Vision sagt, wofür sie da sind, und sie sollte beschreiben, was Kunden fühlen und tun, nicht eine Taktik oder einen Preis.",
    ),
    why: t(
      "Block 3.1 asks for a target vision, and Block 3.2 asks you to define the three levers: the customer's question, the signal you would see if the lever is missing, the phase where it matters and what your system does.",
      "Block 3.1 verlangt eine Zielvision, und Block 3.2 verlangt, die drei Hebel zu definieren: die Frage des Kunden, das Signal, das Sie sähen, wenn der Hebel fehlt, die Phase, in der er zählt, und was Ihr System tut.",
    ),
    picture: t(
      "The first picture has four columns, the four levels of intervention, from Argument on the left to Structure on the right. The dark part of each column is how much of its effect stays. Use the first buttons to read a level and the second pair to send the person away: when they leave, only the process and the structure keep most of their effect. The loop under it is a picture only. The last picture lists four visions: click one to read its three tests.",
      "Das erste Bild hat vier Spalten, die vier Ebenen des Eingriffs, von Argument links bis Struktur rechts. Der dunkle Teil jeder Spalte ist, wie viel ihrer Wirkung bleibt. Mit den ersten Tasten lesen Sie eine Ebene, mit dem zweiten Paar schicken Sie die Person weg: Wenn sie geht, behalten nur der Prozess und die Struktur den größten Teil ihrer Wirkung. Der Kreislauf darunter ist nur ein Bild. Das letzte Bild listet vier Visionen: Klicken Sie eine an, um ihre drei Tests zu lesen.",
    ),
  },
  B2: {
    idea: t(
      "Personalisation is a ladder. Each step fits the customer better and needs more data, more effort and more consent. Each group of customers has agreed to something different, and that sets the top step for the group. Below the top, cost decides where you stop: the last steps add little for a lot.",
      "Personalisierung ist eine Leiter. Jede Stufe passt besser zum Kunden und braucht mehr Daten, mehr Aufwand und mehr Einwilligung. Jede Kundengruppe hat etwas anderem zugestimmt, und das legt die oberste Stufe der Gruppe fest. Unterhalb der Spitze entscheiden die Kosten, wo Sie aufhören: Die letzten Stufen bringen wenig für viel.",
    ),
    why: t(
      "Block 3.3 asks you to choose a level for three groups of customers and to say why not the top level for everyone. The cost of the highest level you choose also becomes an item of your architecture in Block 3.6.",
      "Block 3.3 verlangt, für drei Kundengruppen eine Stufe zu wählen und zu sagen, warum nicht für alle die oberste. Die Kosten der höchsten Stufe, die Sie wählen, werden in Block 3.6 auch zu einem Punkt Ihrer Architektur.",
    ),
    picture: t(
      "Each card is a group of customers with what CloudTech may use about them. The five buttons in each card are the five levels, and the number on a button is how many customers of the group would respond. A card is outlined if its level goes beyond what the group agreed to. The box under the cards gives the responders, the cost of the highest level and the cost for each responder.",
      "Jede Karte ist eine Kundengruppe mit dem, was CloudTech über sie nutzen darf. Die fünf Tasten in jeder Karte sind die fünf Stufen, und die Zahl auf einer Taste ist, wie viele Kunden der Gruppe reagieren würden. Eine Karte ist umrandet, wenn ihre Stufe über das hinausgeht, dem die Gruppe zugestimmt hat. Der Kasten unter den Karten nennt die Reagierenden, die Kosten der höchsten Stufe und die Kosten je Reagierendem.",
    ),
  },
  B3: {
    idea: t(
      "A loyalty programme is what the customer sees. A loyalty system is what makes the customer stay: steps, rules and events that give something of use and are still there next year. Rate each building block on four tests: reach, depth, durability and scale. Blocks that depend on a person or on a discount score low on durability. Keep at most one bonus.",
      "Ein Loyalty-Programm ist das, was der Kunde sieht. Ein Loyalty-System ist das, was den Kunden bleiben lässt: Schritte, Regeln und Ereignisse, die etwas Nützliches geben und nächstes Jahr noch da sind. Bewerten Sie jeden Baustein nach vier Tests: Reichweite, Tiefe, Durability und Skalierung. Bausteine, die von einer Person oder einem Rabatt abhängen, erreichen bei der Durability wenig. Behalten Sie höchstens einen Bonus.",
    ),
    why: t(
      "Block 3.4 asks you to choose three building blocks, rate them on the four tests, and say which lever your system serves most. The limits on this card tell you what a rating may not exceed.",
      "Block 3.4 verlangt, drei Bausteine zu wählen, sie nach den vier Tests zu bewerten und zu sagen, welchen Hebel Ihr System am meisten bedient. Die Grenzen auf dieser Karte sagen Ihnen, was eine Bewertung nicht überschreiten darf.",
    ),
    picture: t(
      "Each row is a building block of Brenner Netzwerke and each column is one of the four tests. Three dots mean 3, two dots mean 2 and one dot means 1. Click any rating and the box underneath gives the test and the reason. The box “What this shows” compares the totals.",
      "Jede Zeile ist ein Baustein von Brenner Netzwerke und jede Spalte einer der vier Tests. Drei Punkte bedeuten 3, zwei Punkte 2 und ein Punkt 1. Klicken Sie eine Bewertung an, und der Kasten darunter nennt den Test und den Grund. Der Kasten „Was das zeigt“ vergleicht die Summen.",
    ),
  },
  B4: {
    idea: t(
      "A strategy built on emotion and personal data is only as good as your understanding of the customer, and that is the part most likely to be wrong. Write down the ways you could be wrong. For each, name the sign that it is happening and what you will do if you see it. A competitor copying you or a late delivery are different risks and belong elsewhere.",
      "Eine Strategie, die auf Emotion und personenbezogenen Daten beruht, ist nur so gut wie Ihr Verständnis des Kunden, und das ist der Teil, der am ehesten falsch liegt. Schreiben Sie auf, wie Sie falsch liegen könnten. Nennen Sie für jeden Fall das Zeichen, dass es passiert, und was Sie tun, wenn Sie es sehen. Ein Wettbewerber, der Sie kopiert, oder eine verspätete Lieferung sind andere Risiken und gehören woanders hin.",
    ),
    why: t(
      "Block 3.5 asks for three misjudgments of customer psychology or acceptance, each with a likelihood, an impact, an early signal and a trigger with a number.",
      "Block 3.5 verlangt drei Fehleinschätzungen der Kundenpsychologie oder -akzeptanz, jeweils mit Eintrittswahrscheinlichkeit, Auswirkung, einem Frühsignal und einem Trigger mit einer Zahl.",
    ),
    picture: t(
      "The grid puts five of Brenner's risks by how likely they are (left to right) and how bad they would be (bottom to top). The shaded cells at the top right, where both are high, need a trigger now. Click a numbered circle or an entry in the list to read the assumption, the signal and the response.",
      "Das Raster ordnet fünf Risiken von Brenner danach, wie wahrscheinlich sie sind (von links nach rechts) und wie schlimm sie wären (von unten nach oben). Die schattierten Felder oben rechts, wo beides hoch ist, brauchen jetzt einen Trigger. Klicken Sie einen nummerierten Kreis oder einen Eintrag in der Liste an, um die Annahme, das Signal und die Reaktion zu lesen.",
    ),
  },
  B5: {
    idea: t(
      "An architecture is the order and the ownership of your items. Start by recording what customers agreed to, then run the items that use data, give each one an owner who can change it without asking anyone, and a trigger with a number that tells the owner when to act. If the money does not stretch, leave something out on purpose and say when you will look at it again.",
      "Eine Architektur ist die Reihenfolge und die Zuständigkeit Ihrer Punkte. Beginnen Sie damit, festzuhalten, wozu Kunden zugestimmt haben, lassen Sie dann die Punkte laufen, die Daten nutzen, geben Sie jedem einen Owner, der ihn ändern kann, ohne jemanden zu fragen, und einen Trigger mit einer Zahl, der dem Owner sagt, wann er handeln muss. Reicht das Geld nicht, lassen Sie bewusst etwas weg und sagen Sie, wann Sie es wieder ansehen.",
    ),
    why: t(
      "Block 3.6 asks you to fund items within €240,000, set start months, name owners and write triggers. The items are your three building blocks, the personalisation engine from Block 3.3, and two enabling items.",
      "Block 3.6 verlangt, Punkte innerhalb von 240.000 € zu finanzieren, Startmonate zu setzen, Owner zu benennen und Trigger zu schreiben. Die Punkte sind Ihre drei Bausteine, die Personalisierungs-Engine aus Block 3.3 und zwei Enabler-Punkte.",
    ),
    picture: t(
      "Each row is one of Brenner's items and each column a month. The dark box is the start month, the pale boxes after it are running. Click a row to read why it has this owner, this start and this trigger. The line under the table says what was left open and when it will be looked at again.",
      "Jede Zeile ist ein Punkt von Brenner und jede Spalte ein Monat. Der dunkle Kasten ist der Startmonat, die hellen Kästen danach laufen. Klicken Sie eine Zeile an, um zu lesen, warum sie diesen Owner, diesen Start und diesen Trigger hat. Die Zeile unter der Tabelle sagt, was offen blieb und wann es wieder angesehen wird.",
    ),
  },
  B6: {
    idea: t(
      "You will never know how customers will react before you decide. What you can do is choose how much to risk, and choose in advance the result that will make you change course. Waiting is not a way out: it lets renewals keep failing. A staged start with a tripwire limits how much a bad reaction costs.",
      "Sie werden nie wissen, wie Kunden reagieren, bevor Sie entscheiden. Was Sie können, ist zu wählen, wie viel Sie riskieren, und vorab das Ergebnis festzulegen, das Sie den Kurs ändern lässt. Warten ist kein Ausweg: Es lässt Renewals weiter scheitern. Ein gestaffelter Start mit einem Tripwire begrenzt, wie viel eine schlechte Reaktion kostet.",
    ),
    why: t(
      "Block 3.7 asks you to decide, in writing, before the data is clear. You name the decision, three assumptions and a tripwire, and you answer the board's challenge about objections.",
      "Block 3.7 verlangt, schriftlich zu entscheiden, bevor die Daten klar sind. Sie nennen die Entscheidung, drei Annahmen und einen Tripwire und beantworten die Rückfrage des Boards zu den Widersprüchen.",
    ),
    picture: t(
      "The table shows three strategies and three ways customers might react, in thousands of euros. Click a column heading to highlight it. The first pair of buttons switches between the net result and the regret (how much less than the best you would get). The slider is your own estimate of pushback. “What this shows” tells you which strategy wins on each reading.",
      "Die Tabelle zeigt drei Strategien und drei mögliche Reaktionen der Kunden, in Tausend Euro. Klicken Sie eine Spaltenüberschrift an, um sie hervorzuheben. Das erste Tastenpaar schaltet zwischen dem Nettoergebnis und dem Regret um (wie viel weniger als das Beste Sie bekämen). Der Schieberegler ist Ihre eigene Schätzung des Widerstands. „Was das zeigt“ sagt Ihnen, welche Strategie bei jeder Lesart gewinnt.",
    ),
  },
});

export const plainOf = (id: MaterialId): PlainExplain => MATERIAL_PLAIN[id];
