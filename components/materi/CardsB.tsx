"use client";

import { Bul, Diagram } from "@/components/materi/kit";
import { ArchitectureExample, ControlLoop, InterventionLadder, PersonalisationTrade, RegretTable, RiskMatrix, SystemProfile, VisionTest } from "@/components/materi/diagramsB";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { OWNERS, OWNER_IDS } from "@/data/route2";
import { tt } from "@/lib/lang";

/** Materi B: the six cards of Route 2 (Level 3, the management decision). 60 minutes in all. */

const p = "text-body text-ink";

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt(
        "A manager cannot talk to every customer, but can design the conditions in which customers feel safe, trust the provider and find its offers relevant. Three levers do that, and a vision says what they are for.",
        "Eine Führungskraft kann nicht mit jedem Kunden sprechen, aber sie kann die Bedingungen gestalten, unter denen Kunden sich sicher fühlen, dem Anbieter vertrauen und dessen Angebote relevant finden. Drei Hebel leisten das, und eine Vision sagt, wofür sie da sind.",
      )}
      reasoning={[
        tt("A vision names an outcome in what customers feel and do. Test it with three questions: is it an outcome and not a tactic or a price, can you see it in customer behaviour, and does it survive a change of tactic?", "Eine Vision nennt ein Ergebnis dessen, was Kunden fühlen und tun. Testen Sie sie mit drei Fragen: Ist sie ein Ergebnis und keine Taktik oder ein Preis, können Sie sie im Kundenverhalten sehen, und übersteht sie einen Wechsel der Taktik?"),
        tt("Emotion, trust and relevance are the three behaviour levers. Each has a question the customer is settling, a signal you would see if it is missing, a phase in which it matters most and a system move.", "Emotion, Vertrauen und Relevanz sind die drei Verhaltenshebel. Jeder hat eine Frage, die der Kunde klärt, ein Signal, das Sie sähen, wenn er fehlt, eine Phase, in der er am meisten zählt, und einen Systemzug."),
        tt("Emotion: do I feel safe, recognised and looked after? It is missing when renewals happen with no conversation and invitations go unanswered.", "Emotion: Fühle ich mich sicher, anerkannt und umsorgt? Sie fehlt, wenn Renewals ohne Gespräch laufen und Einladungen unbeantwortet bleiben."),
        tt("Trust: can I rely on them, also when it costs them? It is built first, in onboarding, and it is missing when customers ask for every promise in writing.", "Vertrauen: Kann ich mich auf sie verlassen, auch wenn es sie etwas kostet? Es entsteht zuerst, im Onboarding, und es fehlt, wenn Kunden jedes Versprechen schriftlich verlangen."),
        tt("Relevance: does this fit my business, right now? It is judged in use and at renewal, and it is missing when customers reply “not for us” or ask to be taken off the list.", "Relevanz: Passt das zu meinem Geschäft, jetzt gerade? Sie wird in der Nutzung und beim Renewal beurteilt, und sie fehlt, wenn Kunden „nichts für uns“ antworten oder bitten, aus dem Verteiler genommen zu werden."),
        tt("The signal is behaviour you can see before the customer leaves. It is not the loss itself, and it is not an activity count such as newsletters sent or opened.", "Das Signal ist Verhalten, das Sie sehen können, bevor der Kunde geht. Es ist nicht der Verlust selbst und keine Aktivitätszählung wie versendete oder geöffnete Newsletter."),
        tt("A system move is a step or a rule that works whoever is on duty. A lever at the level of process or structure keeps working when the person leaves. One at the level of argument or interaction leaves with them.", "Ein Systemzug ist ein Schritt oder eine Regel, die wirkt, wer auch immer Dienst hat. Ein Hebel auf der Ebene von Prozess oder Struktur wirkt weiter, wenn die Person geht. Einer auf der Ebene von Argument oder Interaktion geht mit ihr."),
        tt("Influence, not control. Help the customer decide, and pass three tests: it is true, the customer could check it, and the customer would feel respected if they saw what you are doing.", "Einfluss, nicht Kontrolle. Helfen Sie dem Kunden, zu entscheiden, und bestehen Sie drei Tests: Es ist wahr, der Kunde könnte es prüfen, und der Kunde würde sich respektiert fühlen, wenn er sähe, was Sie tun."),
      ]}
      sources={["thaler2008", "meadows1999", "kahneman2011", "rauyruen2007", "brehm1966"]}
    >
      <p className={p}>
        {tt(
          <>
            Level 1 and 2 were about reading customers and choosing measures. A Chief Customer Officer has a different question: how do we make customers stay across <em>every</em> account, including those nobody has talked to this year? The answer is not to persuade harder. It is to change the conditions in which customers feel and decide, so that staying is the natural choice. Thaler and Sunstein (2008) call this choice architecture: the way options, defaults and steps are set up shapes what people choose. Rauyruen and Miller (2007) found that in business markets trust and service quality carry loyalty.
          </>,
          <>
            Level 1 und 2 handelten davon, Kunden zu lesen und Maßnahmen zu wählen. Ein Chief Customer Officer hat eine andere Frage: Wie bringen wir Kunden dazu, über <em>jeden</em> Account hinweg zu bleiben, auch bei denen, mit denen dieses Jahr niemand gesprochen hat? Die Antwort ist nicht, stärker zu überzeugen. Sie ist, die Bedingungen zu verändern, unter denen Kunden fühlen und entscheiden, sodass das Bleiben die natürliche Wahl ist. Thaler und Sunstein (2008) nennen das Entscheidungsarchitektur: Die Art, wie Optionen, Voreinstellungen und Schritte aufgebaut sind, prägt, was Menschen wählen. Rauyruen und Miller (2007) fanden, dass auf Geschäftsmärkten Vertrauen und Servicequalität die Loyalität tragen.
          </>,
        )}
      </p>
      <Diagram
        label={tt("Four levels of intervention · a worked example on Brenner Netzwerke", "Vier Ebenen des Eingriffs · ein durchgerechnetes Beispiel an Brenner Netzwerke")}
        caption={tt("Pick a level, then switch the person from “stays” to “leaves the company” and watch how much of the effect is left.", "Wählen Sie eine Ebene, schalten Sie dann die Person von „bleibt“ auf „verlässt das Unternehmen“ und beobachten Sie, wie viel von der Wirkung übrig bleibt.")}
      >
        <InterventionLadder />
      </Diagram>
      <Diagram
        label={tt("The decision loop", "Der Entscheidungskreislauf")}
        caption={tt("A strategy is a loop. It sees customer behaviour, decides, acts through the process and learns from the result against a threshold set in advance.", "Eine Strategie ist ein Kreislauf. Sie sieht das Kundenverhalten, entscheidet, handelt über den Prozess und lernt aus dem Ergebnis gegen einen vorab gesetzten Schwellenwert.")}
      >
        <ControlLoop />
      </Diagram>
      <DataTable
        head={[tt("Lever", "Hebel"), tt("The customer's question", "Die Frage des Kunden"), tt("Signal if it is missing", "Signal, wenn er fehlt"), tt("Where it matters most", "Wo er am meisten zählt"), tt("A system move (Brenner, Case assumption)", "Ein Systemzug (Brenner, Case-Annahme)")]}
        rows={[
          [tt("Emotion", "Emotion"), tt("Do I feel safe, recognised and looked after?", "Fühle ich mich sicher, anerkannt und umsorgt?"), tt("Renewals with no conversation; invitations go unanswered.", "Renewals ohne Gespräch; Einladungen bleiben unbeantwortet."), tt("Renewal, and use", "Renewal und Nutzung"), tt("After every renewal the key contact gets a personal thank-you and an invitation to the next round table, sent by the process, whoever the account is with.", "Nach jedem Renewal erhält der wichtigste Ansprechpartner ein persönliches Dankeschön und eine Einladung zum nächsten Round Table, vom Prozess versendet, egal, bei wem der Account liegt.")],
          [tt("Trust", "Vertrauen"), tt("Can I rely on them to do what they say, also when it costs them?", "Kann ich mich darauf verlassen, dass sie tun, was sie sagen, auch wenn es sie etwas kostet?"), tt("Every promise asked for in writing; a second offer before agreeing.", "Jedes Versprechen wird schriftlich verlangt; ein zweites Angebot vor der Zustimmung."), tt("Onboarding", "Onboarding"), tt("Every proposal lists what the customer can check (data location, restore time, two reference calls), and a promise that slips is reported to the customer within two working days by a fixed step.", "Jedes Angebot nennt, was der Kunde prüfen kann (Datenstandort, Wiederherstellungszeit, zwei Referenzgespräche), und ein Versprechen, das sich verschiebt, wird dem Kunden durch einen festen Schritt innerhalb von zwei Werktagen gemeldet.")],
          [tt("Relevance", "Relevanz"), tt("Does this fit my business, as it is right now?", "Passt das zu meinem Geschäft, so wie es gerade ist?"), tt("“Not for us”; opt-outs; offers ignored.", "„Nichts für uns“; Opt-outs; Angebote werden ignoriert."), tt("Use, and renewal", "Nutzung und Renewal"), tt("Each quarter a customer gets one message built from its contract tier and the products it uses; a message that fits nobody in a group is not sent.", "Jedes Quartal erhält ein Kunde eine Nachricht, die aus seiner Vertragsstufe und den genutzten Produkten gebaut ist; eine Nachricht, die zu niemandem in einer Gruppe passt, wird nicht gesendet.")],
        ]}
        caption={tt("The three behaviour levers", "Die drei Verhaltenshebel")}
      />
      <Diagram label={tt("Testing a vision · four visions of Brenner Netzwerke", "Eine Vision testen · vier Visionen von Brenner Netzwerke")} caption={tt("Select a vision to read its three tests.", "Wählen Sie eine Vision, um ihre drei Tests zu lesen.")}>
        <VisionTest />
      </Diagram>
      <Callout label={tt("Influence, not control", "Einfluss, nicht Kontrolle")} tone="rust">
        <p>
          {tt(
            "A customer cannot be controlled and should not be. You can shape what is easy, what is safe and what is visible. A customer who feels pushed resists (Brehm 1966). If you would be embarrassed for the customer to read your plan, the plan is wrong.",
            "Ein Kunde kann nicht kontrolliert werden und sollte es nicht. Sie können gestalten, was einfach, was sicher und was sichtbar ist. Ein Kunde, der sich gedrängt fühlt, wehrt sich (Brehm 1966). Wenn es Ihnen peinlich wäre, dass der Kunde Ihren Plan liest, ist der Plan falsch.",
          )}
        </p>
      </Callout>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt(
        "Personalisation is a ladder of five levels. Each level fits better and needs more data and money. Data protection sets the top of the ladder for each group, and cost sets how far below it you stop.",
        "Personalisierung ist eine Leiter mit fünf Stufen. Jede Stufe passt besser und braucht mehr Daten und Geld. Der Datenschutz legt die Spitze der Leiter für jede Gruppe fest, und die Kosten bestimmen, wie weit darunter Sie aufhören.",
      )}
      reasoning={[
        tt("Each group has a data limit: consented usage data allows level 3 at most; contract facts and contact roles allow level 2; an enquiry form and public facts allow level 1. Nobody may be at level 4 without a separate consent to tracking.", "Jede Gruppe hat eine Datengrenze: Eingewilligte Nutzungsdaten erlauben höchstens Stufe 3; Vertragsdaten und Ansprechpartner-Rollen erlauben Stufe 2; ein Anfrageformular und öffentliche Angaben erlauben Stufe 1. Niemand darf ohne gesonderte Einwilligung zum Tracking auf Stufe 4 sein."),
        tt("Each level needs the one below it, so you pay for the highest level you use, not for the sum of the levels.", "Jede Stufe braucht die darunter, Sie bezahlen also die höchste Stufe, die Sie nutzen, nicht die Summe der Stufen."),
        tt("Responders = the size of the group × the response rate of the level. Compare the responders and the cost for each responder, not the response rate alone.", "Reagierende = die Größe der Gruppe × die Response Rate der Stufe. Vergleichen Sie die Reagierenden und die Kosten je Reagierendem, nicht allein die Response Rate."),
        tt("Marginal test: what does the next level add in responders, and what does it cost? Step up only while an extra responder is worth more than it costs.", "Grenztest: Was bringt die nächste Stufe an Reagierenden, und was kostet sie? Steigen Sie nur so lange auf, wie ein zusätzlicher Reagierender mehr wert ist, als er kostet."),
        tt("A level below the limit is a cost decision, and it is yours. A level above the limit is a data-protection decision that you may not make.", "Eine Stufe unterhalb der Grenze ist eine Kostenentscheidung, und sie liegt bei Ihnen. Eine Stufe oberhalb der Grenze ist eine Datenschutzentscheidung, die Sie nicht treffen dürfen."),
        tt("Write the weighing with a figure: the data limit of one group, and a number from the table (a cost, a rate or a number of responders).", "Schreiben Sie die Abwägung mit einer Zahl: die Datengrenze einer Gruppe und eine Zahl aus der Tabelle (Kosten, eine Rate oder eine Zahl von Reagierenden)."),
        tt("Consent is not permanent. Withdrawals shrink the consenting group, so keep the lower level ready for the customers who leave it.", "Die Einwilligung ist nicht dauerhaft. Widerrufe verkleinern die einwilligende Gruppe, halten Sie also die niedrigere Stufe für die Kunden bereit, die sie verlassen."),
        tt("Personal is not the same as relevant. A message that is too close to what the customer did raises resistance (White et al. 2008).", "Persönlich ist nicht dasselbe wie relevant. Eine Nachricht, die zu nah an dem liegt, was der Kunde getan hat, erhöht den Widerstand (White et al. 2008)."),
      ]}
      sources={["awad2006", "aguirre2015", "white2008", "gdpr2016", "edpb2020", "wp251"]}
    >
      <p className={p}>
        {tt(
          "A campaign can go up a ladder from one message for all to an individual offer in real time. Each step fits the customer better, and each step needs more data, more effort and more consent. Two things limit the climb. The first is data protection: a group can only be addressed at the level its data allows (Art. 5 and 6 GDPR), and profiling for marketing can be objected to at any time (Art. 21). The second is the price of the step: the last levels add little response for a lot of money.",
          "Eine Kampagne kann eine Leiter hinaufgehen, von einer Nachricht für alle bis zu einem individuellen Angebot in Echtzeit. Jede Stufe passt besser zum Kunden, und jede Stufe braucht mehr Daten, mehr Aufwand und mehr Einwilligung. Zwei Dinge begrenzen den Aufstieg. Das erste ist der Datenschutz: Eine Gruppe kann nur auf der Stufe angesprochen werden, die ihre Daten erlauben (Art. 5 und 6 DSGVO), und dem Profiling für Marketing kann jederzeit widersprochen werden (Art. 21). Das zweite ist der Preis der Stufe: Die letzten Stufen bringen wenig Response für viel Geld.",
        )}
      </p>
      <Diagram
        label={tt("How far to personalise each group · a worked example on Brenner Netzwerke", "Wie weit jede Gruppe personalisiert wird · ein durchgerechnetes Beispiel an Brenner Netzwerke")}
        caption={tt("Choose a level for each group. A group above its data limit is outlined. Watch the responders and the cost of the highest level.", "Wählen Sie für jede Gruppe eine Stufe. Eine Gruppe über ihrer Datengrenze ist umrandet. Beobachten Sie die Reagierenden und die Kosten der höchsten Stufe.")}
      >
        <PersonalisationTrade />
      </Diagram>
      <DataTable
        head={[tt("Question", "Frage"), tt("What you look at", "Worauf Sie sehen"), tt("The rule", "Die Regel")]}
        rows={[
          [tt("1 · What has this group agreed to?", "1 · Wozu hat diese Gruppe zugestimmt?"), tt("The group's description: contract facts, consent, an enquiry form.", "Die Beschreibung der Gruppe: Vertragsdaten, Einwilligung, ein Anfrageformular."), tt("That is the highest level you may use.", "Das ist die höchste Stufe, die Sie nutzen dürfen.")],
          [tt("2 · What does each level give?", "2 · Was bringt jede Stufe?"), tt("Responders = size × response rate.", "Reagierende = Größe × Response Rate."), tt("Compare levels by responders, not by rate.", "Vergleichen Sie Stufen nach Reagierenden, nicht nach der Rate.")],
          [tt("3 · What does it cost?", "3 · Was kostet es?"), tt("The cost of the highest level used, and the cost for each responder.", "Die Kosten der höchsten genutzten Stufe und die Kosten je Reagierendem."), tt("Each level needs the one below it: pay once for the top.", "Jede Stufe braucht die darunter: Bezahlen Sie einmal die oberste.")],
          [tt("4 · What does the next step add?", "4 · Was bringt die nächste Stufe?"), tt("Extra responders and extra cost from one level to the next.", "Zusätzliche Reagierende und zusätzliche Kosten von einer Stufe zur nächsten."), tt("Stop where an extra responder costs more than it is worth.", "Hören Sie auf, wo ein zusätzlicher Reagierender mehr kostet, als er wert ist.")],
        ]}
        caption={tt("Four questions to weigh personalisation", "Vier Fragen zum Abwägen der Personalisierung")}
      />
      <Callout label={tt("A rule of thumb, not a law", "Eine Faustregel, kein Gesetz")} tone="rust">
        <p>
          {tt(
            "The response rates and costs here are set for teaching. The method is what matters: limit by data first, then by cost. Ask your data-protection officer which level each of your groups really allows before you build.",
            "Die Response Rates und Kosten hier sind für den Unterricht gesetzt. Es kommt auf die Methode an: erst durch Daten begrenzen, dann durch Kosten. Fragen Sie Ihren Datenschutzbeauftragten, welche Stufe jede Ihrer Gruppen wirklich erlaubt, bevor Sie bauen.",
          )}
        </p>
      </Callout>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt(
        "A loyalty system is a set of building blocks that still work when a discount stops and a person leaves. Rate each on reach, depth, durability and scale, and keep at most one bonus.",
        "Ein Loyalty-System ist eine Reihe von Bausteinen, die auch dann noch wirken, wenn ein Rabatt endet und eine Person geht. Bewerten Sie jeden nach Reichweite, Tiefe, Durability und Skalierung und behalten Sie höchstens einen Bonus.",
      )}
      reasoning={[
        tt("Kind test: is the block a bonus (money), a service (help that fits) or a community (a circle)? A system of bonuses only is a discount programme.", "Art-Test: Ist der Baustein ein Bonus (Geld), ein Service (passende Hilfe) oder eine Community (ein Kreis)? Ein System nur aus Boni ist ein Rabattprogramm."),
        tt("Reach: a block that applies only to members, to opted-in customers or above a size threshold cannot be rated 3.", "Reichweite: Ein Baustein, der nur für Mitglieder, für Kunden mit Opt-in oder ab einer Größenschwelle gilt, kann nicht mit 3 bewertet werden."),
        tt("Depth: a block that removes the reason the customer was leaving is 3. A block that acts on no need in your evidence, such as a rebate, is 1.", "Tiefe: Ein Baustein, der den Grund beseitigt, warum der Kunde ging, ist 3. Ein Baustein, der auf kein Bedürfnis in Ihren Belegen wirkt, etwa ein Rabatt, ist 1."),
        tt("Durability: a block that depends on individual people or on a discount that has to continue cannot be more than 1. A process step or a rule can be 3.", "Durability: Ein Baustein, der von einzelnen Menschen oder von einem weiterlaufenden Rabatt abhängt, kann nicht mehr als 1 sein. Ein Prozessschritt oder eine Regel kann 3 sein."),
        tt("Scale: a cost that repeats with every member is 1. A cost that repeats with every event is at most 2. A one-off cost is 3.", "Skalierung: Ein Aufwand, der bei jedem Mitglied wieder anfällt, ist 1. Ein Aufwand, der bei jedem Ereignis wieder anfällt, ist höchstens 2. Ein einmaliger Aufwand ist 3."),
        tt("A good system has at least two blocks that are process or rule blocks, and at most one bonus.", "Ein gutes System hat mindestens zwei Prozess- oder Regel-Bausteine und höchstens einen Bonus."),
        tt("Which lever does the system serve most? The one whose need is strongest in your evidence, through blocks that reach and last.", "Welchen Hebel bedient das System am meisten? Den, dessen Bedürfnis in Ihren Belegen am stärksten ist, über Bausteine, die erreichen und halten."),
        tt("A fast, cheap start is not a reason: the rebate starts in two weeks and costs on every member for as long as it runs.", "Ein schneller, billiger Start ist kein Grund: Der Rabatt startet in zwei Wochen und kostet bei jedem Mitglied, solange er läuft."),
      ]}
      sources={["dowling1997", "kumar2004", "vargo2004", "meadows1999", "bolton2000"]}
    >
      <p className={p}>
        {tt(
          <>
            A loyalty <em>programme</em> is what customers see: points, cards, tiers. A loyalty <em>system</em> is what makes customers stay: the process steps, rules and events that give them something of value and are still there next year. Donella Meadows (1999) noticed that a system responds most to changes in its rules and structure, and least to a single number. Kumar and Shah (2004) and Dowling and Uncles (1997) showed the same for loyalty: rewards move behaviour for a moment, and value the customer sees in use keeps it (Vargo and Lusch 2004).
          </>,
          <>
            Ein Loyalty-<em>Programm</em> ist das, was Kunden sehen: Punkte, Karten, Stufen. Ein Loyalty-<em>System</em> ist das, was Kunden bleiben lässt: die Prozessschritte, Regeln und Ereignisse, die ihnen etwas von Wert geben und nächstes Jahr noch da sind. Donella Meadows (1999) bemerkte, dass ein System am stärksten auf Änderungen seiner Regeln und Struktur reagiert und am wenigsten auf eine einzelne Zahl. Kumar und Shah (2004) sowie Dowling und Uncles (1997) zeigten dasselbe für Loyalität: Belohnungen bewegen das Verhalten für einen Moment, und Wert, den der Kunde in der Nutzung sieht, hält es (Vargo und Lusch 2004).
          </>,
        )}
      </p>
      <Diagram
        label={tt("Four building blocks, four tests · a worked example on Brenner Netzwerke", "Vier Bausteine, vier Tests · ein durchgerechnetes Beispiel an Brenner Netzwerke")}
        caption={tt("Select any rating to read the test and the reason. The limits below the table are the rules a rating must respect.", "Wählen Sie eine Bewertung, um den Test und den Grund zu lesen. Die Grenzen unter der Tabelle sind die Regeln, die eine Bewertung beachten muss.")}
      >
        <SystemProfile />
      </Diagram>
      <DataTable
        head={[tt("Test", "Test"), tt("The question", "Die Frage"), tt("Low (1)", "Niedrig (1)"), tt("High (3)", "Hoch (3)")]}
        rows={[
          [tt("Reach", "Reichweite"), tt("How many customers does it touch?", "Wie viele Kunden erreicht es?"), tt("Only some (members, opted-in).", "Nur einige (Mitglieder, mit Opt-in)."), tt("Every customer who enters the process.", "Jeden Kunden, der in den Prozess eintritt.")],
          [tt("Depth", "Tiefe"), tt("How strongly does it change how one customer feels or behaves?", "Wie stark verändert es, wie ein Kunde fühlt oder sich verhält?"), tt("A small nudge, or it acts on no need in the evidence.", "Ein kleiner Anstoß, oder es wirkt auf kein Bedürfnis in den Belegen."), tt("It removes the reason the customer was leaving.", "Es beseitigt den Grund, warum der Kunde ging.")],
          ["Durability", tt("Does it still work when the reward stops or the person changes?", "Wirkt es noch, wenn die Belohnung endet oder die Person wechselt?"), tt("It depends on a discount or on individual people.", "Es hängt von einem Rabatt oder von einzelnen Menschen ab."), tt("It is built into the process or a rule.", "Es ist in den Prozess oder eine Regel eingebaut.")],
          [tt("Scale", "Skalierung"), tt("Does the cost per additional member fall as the group grows?", "Sinken die Kosten pro zusätzlichem Mitglied, wenn die Gruppe wächst?"), tt("The cost repeats with every member.", "Die Kosten fallen bei jedem Mitglied wieder an."), tt("A one-off cost that serves every member.", "Ein einmaliger Aufwand, der jedes Mitglied bedient.")],
        ]}
        caption={tt("The four tests of a system", "Die vier Tests eines Systems")}
      />
      <Callout label={tt("Coaching link", "Coaching-Verbindung")} tone="amber">
        <p>
          {tt(
            "“Not just bonuses” is the same test as the benefit test of Materi A5: would the customer still want it if the discount disappeared? At Level 3 you apply it to a whole system, not to one benefit.",
            "„Nicht nur Boni“ ist derselbe Test wie der Vorteils-Test aus Materi A5: Würde der Kunde es noch wollen, wenn der Rabatt wegfiele? Auf Level 3 wenden Sie ihn auf ein ganzes System an, nicht auf einen Vorteil.",
          )}
        </p>
      </Callout>
    </MaterialCard>
  );
}

export function CardB4() {
  return (
    <MaterialCard
      id="B4"
      scan={tt(
        "The largest risk in emotional and personal selling is misjudging the customer: over-personalising, assuming they want a programme, treating consent as permanent. Name the misjudgment, watch for the sign, decide the response in advance.",
        "Das größte Risiko im emotionalen und persönlichen Verkauf ist, den Kunden falsch einzuschätzen: über-zu-personalisieren, anzunehmen, dass er ein Programm will, die Einwilligung als dauerhaft zu behandeln. Benennen Sie die Fehleinschätzung, achten Sie auf das Zeichen, entscheiden Sie die Reaktion vorab.",
      )}
      reasoning={[
        tt("A risk of misjudging the customer is an assumption about the customer: “we assume they …”. A competitor copying the programme is a market risk, and a late delivery is an execution risk. Do not list those here.", "Ein Risiko, den Kunden falsch einzuschätzen, ist eine Annahme über den Kunden: „Wir nehmen an, dass sie …“. Ein Wettbewerber, der das Programm kopiert, ist ein Marktrisiko, und eine verspätete Lieferung ist ein Umsetzungsrisiko. Führen Sie diese hier nicht auf."),
        tt("Rate likelihood and impact from low to high. A risk in the high-likelihood, high-impact corner needs a signal and a trigger now. A risk that is low on both is noted and watched.", "Bewerten Sie Wahrscheinlichkeit und Auswirkung von niedrig bis hoch. Ein Risiko in der Ecke mit hoher Wahrscheinlichkeit und hoher Auswirkung braucht jetzt ein Signal und einen Trigger. Ein Risiko, das bei beiden niedrig ist, wird vermerkt und beobachtet."),
        tt("An early-warning signal appears before the loss is final: a behaviour you can see, such as objections rising, not the number of customers already gone.", "Ein Frühwarnsignal erscheint, bevor der Verlust endgültig ist: ein Verhalten, das Sie sehen können, etwa steigende Widersprüche, nicht die Zahl der bereits gegangenen Kunden."),
        tt("A response is a trigger: a number, a date and an action. “Monitor closely” is not a response.", "Eine Reaktion ist ein Trigger: eine Zahl, ein Datum und eine Aktion. „Genau beobachten“ ist keine Reaktion."),
        tt("Over-personalisation shows as objections and withdrawals, while the open rate can stay high. Watch objections, not opens.", "Über-Personalisierung zeigt sich als Widersprüche und Widerrufe, während die Öffnungsrate hoch bleiben kann. Beobachten Sie Widersprüche, nicht Öffnungen."),
        tt("Consent can be withdrawn at any time, so a plan that rests on a consenting group rests on a group that can shrink.", "Die Einwilligung kann jederzeit widerrufen werden, ein Plan, der auf einer einwilligenden Gruppe beruht, beruht also auf einer Gruppe, die schrumpfen kann."),
        tt("Pressure or false urgency raises resistance (Brehm 1966), and a limit that is not real is a misleading claim (§ 5 UWG).", "Druck oder falsche Dringlichkeit erhöht den Widerstand (Brehm 1966), und eine Grenze, die nicht echt ist, ist eine irreführende Angabe (§ 5 UWG)."),
        tt("The most dangerous misjudgment is the one that hides the others: judging personalisation by its response rate, and never by the customers who objected.", "Die gefährlichste Fehleinschätzung ist die, die die anderen verbirgt: Personalisierung an ihrer Response Rate zu messen und nie an den Kunden, die widersprochen haben."),
      ]}
      sources={["white2008", "aguirre2015", "brehm1966", "gdpr2016", "uwg5", "klein2007"]}
    >
      <p className={p}>
        {tt(
          "A strategy built on emotion and personal data rests on assumptions about how customers will take being addressed that way. White et al. (2008) found that highly personalised email raised resistance when customers could not see why the sender knew so much, and Aguirre et al. (2015) found that personalisation raised the feeling of vulnerability unless customers trusted how the data was handled. So the plan needs a list of the misjudgments it could contain, a signal for each, and a response agreed before the first send.",
          "Eine Strategie, die auf Emotion und personenbezogenen Daten beruht, beruht auf Annahmen darüber, wie Kunden es aufnehmen werden, so angesprochen zu werden. White et al. (2008) fanden, dass stark personalisierte E-Mails den Widerstand erhöhten, wenn Kunden nicht sahen, warum der Absender so viel wusste, und Aguirre et al. (2015) fanden, dass Personalisierung das Gefühl der Verletzlichkeit verstärkte, außer Kunden vertrauten dem Umgang mit den Daten. Der Plan braucht also eine Liste der Fehleinschätzungen, die er enthalten könnte, ein Signal für jede und eine Reaktion, die vor dem ersten Versand vereinbart ist.",
        )}
      </p>
      <Diagram
        label={tt("Five misjudgments on a likelihood-by-impact grid · a worked example on Brenner Netzwerke", "Fünf Fehleinschätzungen in einem Raster aus Wahrscheinlichkeit und Auswirkung · ein durchgerechnetes Beispiel an Brenner Netzwerke")}
        caption={tt("Select a risk (by its number) to read the assumption, the early signal and the response. The shaded cells at the top right need a trigger now.", "Wählen Sie ein Risiko (über seine Nummer), um die Annahme, das Frühsignal und die Reaktion zu lesen. Die schattierten Felder oben rechts brauchen jetzt einen Trigger.")}
      >
        <RiskMatrix />
      </Diagram>
      <DataTable
        head={[tt("If the risk is about …", "Wenn das Risiko betrifft …"), tt("It is a …", "Es ist ein …"), tt("Belongs in a psychology risk analysis?", "Gehört in eine Psychologie-Risikoanalyse?")]}
        rows={[
          [tt("What we assumed the customer feels or will do", "Was wir über die Gefühle oder das Handeln des Kunden angenommen haben"), tt("Misjudgment of customer psychology or acceptance", "Fehleinschätzung der Kundenpsychologie oder -akzeptanz"), tt("Yes", "Ja")],
          [tt("What a competitor does (a copied programme, lower prices)", "Was ein Wettbewerber tut (ein kopiertes Programm, niedrigere Preise)"), tt("Market risk", "Marktrisiko"), tt("No. Cover it in the market analysis.", "Nein. Behandeln Sie es in der Marktanalyse.")],
          [tt("Whether our own teams deliver on time", "Ob unsere eigenen Teams pünktlich liefern"), tt("Execution risk", "Umsetzungsrisiko"), tt("No. Cover it in the governance of the plan.", "Nein. Behandeln Sie es in der Steuerung des Plans.")],
        ]}
        caption={tt("Three kinds of risk, and which one this block is about", "Drei Arten von Risiko und welche dieser Block betrifft")}
      />
      <Bul
        items={[
          tt("Signal: something you can see before the loss is final, such as objections rising after a mailing, or the opt-in share falling.", "Signal: etwas, das Sie sehen können, bevor der Verlust endgültig ist, etwa steigende Widersprüche nach einem Versand oder ein sinkender Opt-in-Anteil."),
          tt("Response: a number, a date and an action. If more than X by month N, do Y.", "Reaktion: eine Zahl, ein Datum und eine Aktion. Wenn mehr als X bis Monat N, tun wir Y."),
          tt("Owner: one person who can act on it without asking permission.", "Owner: eine Person, die darauf handeln kann, ohne um Erlaubnis zu fragen."),
        ]}
      />
    </MaterialCard>
  );
}

export function CardB5() {
  return (
    <MaterialCard
      id="B5"
      scan={tt(
        "An architecture is the order and the ownership of your items: consent first, then the items that use data, one owner who can change each, and a trigger with a number that makes the owner act.",
        "Eine Architektur ist die Reihenfolge und die Zuständigkeit Ihrer Punkte: erst die Einwilligung, dann die Punkte, die Daten nutzen, ein Owner, der jeden ändern kann, und ein Trigger mit einer Zahl, der den Owner handeln lässt.",
      )}
      reasoning={[
        tt("Consent first. The consent and data foundation starts no later than the first other item, so that nothing uses customer data before it is recorded who agreed to what.", "Einwilligung zuerst. Das Einwilligungs- und Datenfundament startet nicht später als der erste andere Punkt, damit nichts Kundendaten nutzt, bevor festgehalten ist, wer wozu zugestimmt hat."),
        tt("Owner test: who can change this without asking anyone else? An owner who cannot change the thing is not an owner. Do not put more than two items on the Chief Customer Officer.", "Owner-Test: Wer kann das ändern, ohne jemand anderen zu fragen? Ein Owner, der die Sache nicht ändern kann, ist kein Owner. Legen Sie nicht mehr als zwei Punkte auf den Chief Customer Officer."),
        tt("The data-protection officer advises and monitors and must stay independent, so does not own an item that uses data. The owner is the person who decides how the data is used, and the officer reviews it.", "Der Datenschutzbeauftragte berät und überwacht und muss unabhängig bleiben, besitzt also keinen Punkt, der Daten nutzt. Owner ist die Person, die entscheidet, wie die Daten genutzt werden, und der Beauftragte prüft es."),
        tt("Trigger test: it has a metric, a number, a date and an action. If fewer than X by month N, do Y.", "Trigger-Test: Er hat eine Kennzahl, eine Zahl, ein Datum und eine Aktion. Wenn weniger als X bis Monat N, tun wir Y."),
        tt("The personalisation engine costs what its highest level costs, once, whichever groups use the lower levels. The total of the funded items must not exceed the budget.", "Die Personalisierungs-Engine kostet, was ihre höchste Stufe kostet, einmal, egal welche Gruppen die niedrigeren Stufen nutzen. Die Summe der finanzierten Punkte darf das Budget nicht übersteigen."),
        tt("If it does, leave out the item with the weakest evidence for its lever, or the one something else covers for now. Do not trim every item a little.", "Wenn doch, lassen Sie den Punkt mit den schwächsten Belegen für seinen Hebel weg oder den, den vorerst etwas anderes abdeckt. Kürzen Sie nicht jeden Punkt ein wenig."),
        tt("Postponing is a decision: name the item, say why, and give a pickup point, meaning the number and the date at which you will look at it again.", "Zurückstellen ist eine Entscheidung: Nennen Sie den Punkt, sagen Sie warum und geben Sie einen Wiedervorlagepunkt an, also die Zahl und das Datum, zu dem Sie es wieder ansehen."),
        tt("Stage the start: the foundation first, then the items that need no customer data, then the ones that use it.", "Staffeln Sie den Start: erst das Fundament, dann die Punkte, die keine Kundendaten brauchen, dann die, die sie nutzen."),
      ]}
      sources={["kaplan1992", "doran1981", "deming1986", "meadows1999", "edpb2020"]}
    >
      <p className={p}>
        {tt(
          "Building blocks only work if somebody owns them and somebody notices when they do not. The architecture is that layer: what starts when, who owns it, and what makes the owner act. It follows Deming's cycle (1986): plan, do, study, act. The foundation is what makes the “do” lawful: it records who agreed to what, and honours an objection at once.",
          "Bausteine wirken nur, wenn jemand sie besitzt und jemand bemerkt, wenn sie es nicht tun. Die Architektur ist diese Schicht: was wann startet, wer es verantwortet und was den Owner handeln lässt. Sie folgt dem Zyklus von Deming (1986): Plan, Do, Study, Act. Das Fundament macht das „Do“ rechtmäßig: Es hält fest, wer wozu zugestimmt hat, und setzt einen Widerspruch sofort um.",
        )}
      </p>
      <Diagram
        label={tt("An eight-month architecture · a worked example on Brenner Netzwerke", "Eine Architektur über acht Monate · ein durchgerechnetes Beispiel an Brenner Netzwerke")}
        caption={tt("Select an item to read why it has this owner, this start month and this trigger.", "Wählen Sie einen Punkt, um zu lesen, warum er diesen Owner, diesen Startmonat und diesen Trigger hat.")}
      >
        <ArchitectureExample />
      </Diagram>
      <DataTable
        head={[tt("Role", "Rolle"), tt("What the role can change", "Was die Rolle ändern kann"), tt("Use it for", "Einsetzen für")]}
        rows={OWNER_IDS.map((id) => [OWNERS[id].name, OWNERS[id].profile, ownerUse(id)])}
        caption={tt("Profiles of the owner roles", "Profile der Owner-Rollen")}
      />
      <Callout label={tt("The three tests", "Die drei Tests")} tone="signal">
        <ol className="list-decimal space-y-1 pl-5">
          <li>{tt("Owner: who can change it without asking anyone else?", "Owner: Wer kann es ändern, ohne jemand anderen zu fragen?")}</li>
          <li>{tt("Start: does something have to exist before it, such as the record of consent?", "Start: Muss vorher etwas existieren, etwa das Einwilligungsregister?")}</li>
          <li>{tt("Trigger: does it have a metric, a number, a date and an action?", "Trigger: Hat er eine Kennzahl, eine Zahl, ein Datum und eine Aktion?")}</li>
        </ol>
      </Callout>
    </MaterialCard>
  );
}

function ownerUse(id: string): string {
  switch (id) {
    case "cco":
      return tt("Decisions that cross sales, marketing and customer success; not day-to-day items.", "Entscheidungen, die Vertrieb, Marketing und Customer Success übergreifen; keine Tagesgeschäft-Punkte.");
    case "sales":
      return tt("The sales process, offers and prospects.", "Der Vertriebsprozess, Angebote und Interessenten.");
    case "marketing":
      return tt("Messages, sending, packaging and stories.", "Botschaften, Versand, Paketierung und Geschichten.");
    case "cs":
      return tt("Reviews, events, references and anything that needs existing customers.", "Reviews, Veranstaltungen, Referenzen und alles, was Bestandskunden braucht.");
    case "product":
      return tt("Early access, the roadmap and feature votes.", "Früher Zugang, die Roadmap und Abstimmungen über Funktionen.");
    case "delivery":
      return tt("Engineer time and the delivery plan.", "Ingenieurzeit und der Lieferplan.");
    case "data":
      return tt("The CRM, the consent record, the data pipelines and dashboards.", "Das CRM, das Einwilligungsregister, die Datenpipelines und Dashboards.");
    default:
      return tt("Review and advice on data use. Not an owner of items that use data.", "Prüfung und Beratung zur Datennutzung. Kein Owner von Punkten, die Daten nutzen.");
  }
}

export function CardB6() {
  return (
    <MaterialCard
      id="B6"
      scan={tt(
        "You cannot know how customers will react to being addressed emotionally and personally. You can decide how much to risk before you know, and which result will make you change course.",
        "Sie können nicht wissen, wie Kunden darauf reagieren, emotional und persönlich angesprochen zu werden. Sie können entscheiden, wie viel Sie riskieren, bevor Sie es wissen, und welches Ergebnis Sie den Kurs ändern lässt.",
      )}
      reasoning={[
        tt("Waiting is also a decision. It lets renewals keep failing for as long as you wait, so it is never free.", "Warten ist auch eine Entscheidung. Es lässt Renewals so lange scheitern, wie Sie warten, es ist also nie umsonst."),
        tt("When you cannot estimate the odds, choose the option with the smallest worst regret. When you can, compare expected results, and see whether the choice changes as your estimate changes.", "Wenn Sie die Wahrscheinlichkeiten nicht schätzen können, wählen Sie die Option mit dem kleinsten schlimmsten Regret. Wenn Sie es können, vergleichen Sie erwartete Ergebnisse und sehen Sie, ob sich die Wahl ändert, wenn sich Ihre Schätzung ändert."),
        tt("Prefer steps you can undo. Start with the customers who have consented and one benefit, and let their first reactions decide what comes next.", "Bevorzugen Sie Schritte, die Sie rückgängig machen können. Starten Sie mit den Kunden, die eingewilligt haben, und einem Vorteil, und lassen Sie deren erste Reaktionen entscheiden, was als Nächstes kommt."),
        tt("A tripwire has four parts: a metric of customer behaviour (not an activity count), a threshold that is better than today's baseline, a date early enough to still act on, and an action agreed in advance (widen, adjust or stop).", "Ein Tripwire hat vier Teile: eine Kennzahl des Kundenverhaltens (keine Aktivitätszählung), einen Schwellenwert, der besser ist als die heutige Baseline, ein Datum, das früh genug ist, um noch zu handeln, und eine vorab vereinbarte Aktion (ausweiten, anpassen oder anhalten)."),
        tt("Guard the plan with a metric that would show over-personalisation: objections to marketing messages. Its threshold must be below today's baseline, because fewer is better.", "Sichern Sie den Plan mit einer Kennzahl, die Über-Personalisierung zeigen würde: Widersprüche gegen Marketing-Nachrichten. Ihr Schwellenwert muss unter der heutigen Baseline liegen, weil weniger besser ist."),
        tt("Write three assumptions your decision rests on. Each must be about how customers will react, must be testable, and must name the sign that it is wrong.", "Schreiben Sie drei Annahmen, auf denen Ihre Entscheidung beruht. Jede muss davon handeln, wie Kunden reagieren werden, muss prüfbar sein und das Zeichen nennen, dass sie falsch ist."),
        tt("When the board challenges you after the start, go back to the tripwire and the objection figures first. Keep what the numbers support and change one lever, not the whole plan.", "Wenn das Board Sie nach dem Start herausfordert, gehen Sie zuerst zum Tripwire und zu den Widerspruchszahlen zurück. Behalten Sie, was die Zahlen stützen, und ändern Sie einen Hebel, nicht den ganzen Plan."),
        tt("Risk is a chance you can put a number on. Uncertainty is when you cannot (Knight 1921). A plan for uncertainty spends in stages and looks for early signals.", "Risiko ist eine Chance, der Sie eine Zahl geben können. Unsicherheit ist, wenn Sie es nicht können (Knight 1921). Ein Plan für Unsicherheit gibt in Stufen aus und sucht nach Frühsignalen."),
      ]}
      sources={["knight1921", "klein2007", "loomes1982", "kahneman1979", "doran1981"]}
    >
      <p className={p}>
        {tt(
          <>
            A decision under uncertainty is not a guess. Knight (1921) separated <em>risk</em>, where you know the odds, from <em>uncertainty</em>, where you do not. How customers react to a more personal, more emotional way of selling is uncertain. So the question is not “what will happen?” but “how much can I afford to be wrong, and how soon will I know?”
          </>,
          <>
            Eine Entscheidung unter Unsicherheit ist kein Raten. Knight (1921) trennte <em>Risiko</em>, bei dem man die Wahrscheinlichkeiten kennt, von <em>Unsicherheit</em>, bei der man sie nicht kennt. Wie Kunden auf eine persönlichere, emotionalere Art des Verkaufens reagieren, ist unsicher. Die Frage ist also nicht „Was wird geschehen?“, sondern „Wie viel Irrtum kann ich mir leisten, und wie bald weiß ich es?“
          </>,
        )}
      </p>
      <Diagram
        label={tt("Three strategies, three reactions · a worked example on Brenner Netzwerke", "Drei Strategien, drei Reaktionen · ein durchgerechnetes Beispiel an Brenner Netzwerke")}
        caption={tt("Switch to regret, then move the slider for your own estimate of pushback and see when the answer changes.", "Schalten Sie auf Regret, bewegen Sie dann den Schieberegler für Ihre eigene Schätzung des Widerstands und sehen Sie, wann sich die Antwort ändert.")}
      >
        <RegretTable />
      </Diagram>
      <DataTable
        head={[tt("Step", "Schritt"), tt("What you write", "Was Sie schreiben"), tt("Example (Brenner, Case assumption)", "Beispiel (Brenner, Case-Annahme)")]}
        rows={[
          [tt("1 · The decision", "1 · Die Entscheidung"), tt("One of: commit, stage, wait. Never “decide later”.", "Eine von: festlegen, staffeln, warten. Nie „später entscheiden“."), tt("Stage it: start with the members of one round table and one benefit.", "Staffeln: mit den Mitgliedern eines Round Tables und einem Vorteil starten.")],
          [tt("2 · Three assumptions", "2 · Drei Annahmen"), tt("How you think customers will react, each with the sign that it is wrong.", "Wie Sie denken, dass Kunden reagieren werden, jeweils mit dem Zeichen, dass sie falsch ist."), tt("“Members welcome a yearly review.” Wrong if fewer than 30% of them book it in the first quarter.", "„Mitglieder begrüßen ein jährliches Review.“ Falsch, wenn weniger als 30 % von ihnen es im ersten Quartal buchen.")],
          [tt("3 · The tripwire", "3 · Der Tripwire"), tt("Metric, threshold, date, action.", "Kennzahl, Schwellenwert, Datum, Aktion."), tt("Members who have booked their yearly review reach 45% by month 6. If not, shorten the review.", "Mitglieder, die ihr jährliches Review gebucht haben, erreichen bis Monat 6 45 %. Wenn nicht, das Review kürzen.")],
          [tt("4 · The pre-mortem", "4 · Die Pre-Mortem"), tt("Imagine it failed. Write down why.", "Stellen Sie sich vor, es sei gescheitert. Schreiben Sie auf, warum."), tt("“We wrote to customers who had agreed to something else.” Check the consent record in month 1.", "„Wir haben Kunden geschrieben, die etwas anderem zugestimmt hatten.“ Das Einwilligungsregister in Monat 1 prüfen.")],
        ]}
        caption={tt("How to write a decision when the data is unclear", "Wie man eine Entscheidung schreibt, wenn die Datenlage unklar ist")}
      />
      <Callout label={tt("The pre-mortem", "Die Pre-Mortem")} tone="signal">
        <p>
          {tt(
            "Klein (2007) suggests one exercise before you start: imagine the plan has already failed and write down the most likely reasons. It brings out the assumptions you were about to rely on without seeing them.",
            "Klein (2007) schlägt vor dem Start eine Übung vor: Stellen Sie sich vor, der Plan sei bereits gescheitert, und schreiben Sie die wahrscheinlichsten Gründe auf. Sie bringt die Annahmen ans Licht, auf die Sie sich verlassen wollten, ohne sie zu sehen.",
          )}
        </p>
      </Callout>
    </MaterialCard>
  );
}

export const CARDS_B = [CardB1, CardB2, CardB3, CardB4, CardB5, CardB6];
