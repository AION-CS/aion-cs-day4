"use client";

import { Bul, Diagram } from "@/components/materi/kit";
import { BRENNER, EmotionSortExample, EndowedProgress, FeelFirst, LoyaltyExample, LoyaltyTypes, PersonalisationLadder, ScoreExample, StrengthExample, TouchpointExample, TriggerChecker } from "@/components/materi/diagramsA";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { EMOTION_IDS, EMOTION_PAIR_TESTS, NEEDS, NEED_IDS, NEED_PAIR_TESTS } from "@/data/needs";
import { RULES } from "@/data/measures";
import { HONESTY_TESTS } from "@/data/triggers";
import { euro, num, tt } from "@/lib/lang";

/** Materi A: the seven cards of Route 1 (Levels 1 and 2 on one case). 60 minutes in all. */

const p = "text-body text-ink";
const pc = () => tt("%", " %");

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt(
        "A customer feels first and finds reasons afterwards. Emotions are not the opposite of good judgement: they carry the information that lets a person decide at all.",
        "Ein Kunde fühlt zuerst und findet erst danach Gründe. Emotionen sind nicht das Gegenteil von gutem Urteilsvermögen: Sie tragen die Information, die einen Menschen überhaupt entscheiden lässt.",
      )}
      reasoning={[
        tt("Ask first what the customer feels in this moment (protected, able to rely, seen, not alone), and only then which feature they compare.", "Fragen Sie zuerst, was der Kunde in diesem Moment fühlt (geschützt, verlässlich versorgt, gesehen, nicht allein), und erst dann, welches Merkmal er vergleicht."),
        tt("A reason given after a decision is often a justification. Test it: could a third party check it against a document? If not, look for the feeling under it.", "Ein Grund, der nach einer Entscheidung genannt wird, ist oft eine Rechtfertigung. Testen Sie ihn: Könnte ein Dritter ihn an einem Dokument prüfen? Wenn nicht, suchen Sie das Gefühl darunter."),
        tt("Emotion first does not mean irrational. Emotions carry information about risk and value: patients whose emotional processing was damaged could still reason well and yet decided badly (Damasio 1994).", "Emotion zuerst heißt nicht irrational. Emotionen tragen Informationen über Risiko und Wert: Patienten mit gestörter emotionaler Verarbeitung konnten noch gut denken und entschieden dennoch schlecht (Damasio 1994)."),
        tt("Neuromarketing results are patterns across groups of people. They do not read the mind of one customer, so never present a brain-scan finding as proof in a sales conversation.", "Neuromarketing-Ergebnisse sind Muster über Gruppen von Menschen. Sie lesen nicht den Kopf eines einzelnen Kunden, präsentieren Sie also nie einen Hirnscan-Befund als Beweis in einem Verkaufsgespräch."),
        tt("An active brain area does not tell which emotion is present (reverse inference, Poldrack 2006). Treat “this part of the brain lights up” as a hypothesis, not as a fact about your customer.", "Ein aktives Hirnareal sagt nicht, welche Emotion vorliegt (umgekehrter Schluss, Poldrack 2006). Behandeln Sie „dieser Teil des Gehirns leuchtet auf“ als Hypothese, nicht als Tatsache über Ihren Kunden."),
        tt("In a business purchase the feelings attach to the buyer's own position: who is blamed, who is thanked, who is seen. The company decides through a person.", "Bei einem Geschäftskauf haften die Gefühle an der eigenen Position des Käufers: wer beschuldigt wird, wer Dank erhält, wer gesehen wird. Das Unternehmen entscheidet durch einen Menschen."),
        tt("You do not need a scanner. In sales, behaviour is the measure: what a customer asks, answers, ignores or goes quiet about.", "Sie brauchen keinen Scanner. Im Vertrieb ist das Verhalten das Maß: was ein Kunde fragt, antwortet, ignoriert oder wozu er schweigt."),
      ]}
      sources={["kahneman2011", "damasio1994", "zajonc1980", "plassmann2012", "ariely2010", "poldrack2006", "webster1972"]}
    >
      <p className={p}>
        {tt(
          "Two ways of judging run side by side (Kahneman 2011). One is fast, automatic and led by feeling. The other is slow and works with reasons. In a purchase the fast one reacts first, and the slow one is then asked to justify the result. Zajonc (1980) showed that a feeling of liking or unease can arise before any reason exists. Damasio (1994) added the other half: people who lost the ability to feel about a choice did not become better decision makers. They became unable to decide. Feeling is part of how a decision gets made.",
          "Zwei Arten des Urteilens laufen nebeneinander (Kahneman 2011). Die eine ist schnell, automatisch und vom Gefühl geleitet. Die andere ist langsam und arbeitet mit Gründen. Bei einem Kauf reagiert die schnelle zuerst, und die langsame soll dann das Ergebnis rechtfertigen. Zajonc (1980) zeigte, dass ein Gefühl von Zuneigung oder Unbehagen entstehen kann, bevor es irgendeinen Grund gibt. Damasio (1994) ergänzte die andere Hälfte: Menschen, die die Fähigkeit verloren, bei einer Wahl etwas zu fühlen, wurden keine besseren Entscheider. Sie wurden unfähig zu entscheiden. Fühlen gehört dazu, wie eine Entscheidung entsteht.",
        )}
      </p>
      <Diagram
        label={tt("Feeling first, reasons second · a worked example on Brenner Netzwerke", "Erst das Gefühl, dann die Gründe · ein durchgerechnetes Beispiel an Brenner Netzwerke")}
        caption={tt("Switch the customer's first impression and compare how the same three facts are read. Then ask the customer why.", "Schalten Sie den ersten Eindruck des Kunden um und vergleichen Sie, wie dieselben drei Fakten gelesen werden. Fragen Sie den Kunden dann, warum.")}
      >
        <FeelFirst />
      </Diagram>
      <p className={p}>
        {tt(
          <>
            <strong>Neuromarketing</strong> applies brain and body measurements to marketing: which offer draws attention, which one raises arousal, which one a person prefers. It has produced useful patterns, and it has produced much hype (Ariely and Berns 2010). Its main limit is the step from “this area was active” to “the customer felt this”, which the measurement cannot make on its own (Poldrack 2006). For a sales team the lesson is practical, and it does not need a scanner.
          </>,
          <>
            <strong>Neuromarketing</strong> wendet Messungen von Gehirn und Körper auf das Marketing an: welches Angebot Aufmerksamkeit zieht, welches die Erregung steigert, welches ein Mensch bevorzugt. Es hat nützliche Muster hervorgebracht und viel Hype (Ariely und Berns 2010). Seine Hauptgrenze ist der Schritt von „dieses Areal war aktiv“ zu „der Kunde hat das gefühlt“, den die Messung nicht allein leisten kann (Poldrack 2006). Für ein Vertriebsteam ist die Lehre praktisch, und sie braucht keinen Scanner.
          </>,
        )}
      </p>
      <DataTable
        head={[tt("Method", "Methode"), tt("What it measures", "Was sie misst"), tt("Use for a B2B sales team?", "Nutzbar für ein B2B-Vertriebsteam?")]}
        rows={[
          [tt("Brain imaging (fMRI)", "Bildgebung des Gehirns (fMRT)"), tt("Blood flow in brain areas while a person looks at an offer.", "Durchblutung von Hirnarealen, während ein Mensch ein Angebot ansieht."), tt("No. It is expensive, the samples are small, and the step to a feeling is an inference.", "Nein. Sie ist teuer, die Stichproben sind klein, und der Schritt zu einem Gefühl ist ein Schluss.")],
          [tt("Eye tracking", "Eye Tracking"), tt("Where a person looks first and longest on a page.", "Wohin ein Mensch auf einer Seite zuerst und am längsten schaut."), tt("Yes, for a proposal or a web page: it shows what is noticed.", "Ja, für ein Angebot oder eine Webseite: Es zeigt, was bemerkt wird.")],
          [tt("Skin response and heart rate", "Hautreaktion und Herzfrequenz"), tt("Arousal: that something excites, not whether it is pleasant.", "Erregung: dass etwas aufregt, nicht ob es angenehm ist."), tt("Rarely. The reading is too coarse.", "Selten. Die Aussage ist zu grob.")],
          [tt("A/B test of behaviour", "A/B-Test des Verhaltens"), tt("What customers do with version A or version B of a message.", "Was Kunden mit Version A oder Version B einer Nachricht tun."), tt("Yes. It measures behaviour directly, with no inference.", "Ja. Er misst das Verhalten direkt, ohne Schluss.")],
        ]}
        caption={tt("Neuromarketing methods and what they are good for", "Neuromarketing-Methoden und wofür sie taugen")}
      />
      <Callout label={tt("Coaching focus", "Coaching-Fokus")} tone="amber">
        <p>
          {tt(
            "Why do emotional triggers work stronger than facts? Because the feeling decides which facts are noticed and how they are read. Reflect on your last lost deal: which facts did you keep repeating, and what was the customer feeling while you did?",
            "Warum wirken emotionale Trigger stärker als Fakten? Weil das Gefühl entscheidet, welche Fakten bemerkt und wie sie gelesen werden. Denken Sie an Ihren letzten verlorenen Deal: Welche Fakten haben Sie immer wieder wiederholt, und was fühlte der Kunde dabei?",
          )}
        </p>
      </Callout>
      <Callout label={tt("What this is, and what it is not", "Was das ist und was nicht")} tone="rust">
        <p>
          {tt(
            "A picture of how a decision is built, not a way to steer a customer. Emotions are not switches. A message that tries to create a feeling the customer does not have is manipulation, and it fails the first time the customer checks (see A3). The task asks you to answer feelings that are already there.",
            "Ein Bild davon, wie eine Entscheidung entsteht, kein Weg, einen Kunden zu steuern. Emotionen sind keine Schalter. Eine Nachricht, die ein Gefühl erzeugen will, das der Kunde nicht hat, ist Manipulation und scheitert, sobald der Kunde nachprüft (siehe A3). Die Aufgabe verlangt, auf Gefühle zu antworten, die schon da sind.",
          )}
        </p>
      </Callout>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt(
        "Four emotions drive most of what a customer feels about a provider: security, trust, status and belonging. Each has one test question, and two pairs are easy to confuse.",
        "Vier Emotionen bestimmen das meiste, was ein Kunde für einen Anbieter empfindet: Sicherheit, Vertrauen, Status und Zugehörigkeit. Jede hat eine Testfrage, und zwei Paare werden leicht verwechselt.",
      )}
      reasoning={[
        tt("Tag a statement by the feeling its own words describe, not by the fact it mentions. A status page, a phone call and a badge are facts; the emotion is what they mean to the customer.", "Ordnen Sie eine Aussage nach dem Gefühl zu, das ihre eigenen Worte beschreiben, nicht nach dem Fakt, den sie nennt. Eine Statusseite, ein Anruf und ein Siegel sind Fakten; die Emotion ist das, was sie dem Kunden bedeuten."),
        tt("Find the one phrase that decides the statement, then ask the test question of the emotion it points to. If two fit, use the pair test.", "Finden Sie die eine Formulierung, die die Aussage entscheidet, und stellen Sie dann die Testfrage der Emotion, auf die sie zeigt. Passen zwei, nutzen Sie den Paar-Test."),
        tt("Security or Trust? Ask what is judged. A bad outcome prevented or covered is Security. A promise kept is Trust.", "Sicherheit oder Vertrauen? Fragen Sie, was beurteilt wird. Ein schlechter Ausgang, der verhindert oder abgedeckt wird, ist Sicherheit. Ein gehaltenes Versprechen ist Vertrauen."),
        tt("Status or Belonging? Ask who is looking. Outsiders seeing the customer or the choice is Status. Being inside a group of equals is Belonging.", "Status oder Zugehörigkeit? Fragen Sie, wer hinsieht. Dass Außenstehende den Kunden oder die Wahl sehen, ist Status. In einer Gruppe Gleichgestellter zu sein, ist Zugehörigkeit."),
        tt("Trust or Belonging? Ask what the customer wants from the people: that they keep their word (Trust), or that the customer is among peers and known (Belonging).", "Vertrauen oder Zugehörigkeit? Fragen Sie, was der Kunde von den Menschen will: dass sie ihr Wort halten (Vertrauen) oder dass der Kunde unter Gleichgesinnten ist und gekannt wird (Zugehörigkeit)."),
        tt("A “safe choice” is Security if it means nobody is blamed, and Status if it means the choice looks good.", "Eine „sichere Wahl“ ist Sicherheit, wenn sie bedeutet, dass niemand beschuldigt wird, und Status, wenn sie bedeutet, dass die Wahl gut aussieht."),
        tt("One statement has one dominant emotion. Do not tag an emotion because a measure you like happens to answer it.", "Eine Aussage hat eine dominante Emotion. Ordnen Sie keine Emotion zu, nur weil eine Maßnahme, die Sie mögen, sie beantwortet."),
        tt("An approach to a more attractive offer starts from the emotion, then chooses the action: security is answered by protection shown, trust by promises kept, status by recognition that is true, belonging by places to meet peers. A price cut answers none of the four.", "Ein Ansatz für ein attraktiveres Angebot beginnt bei der Emotion und wählt dann die Aktion: Sicherheit beantwortet gezeigter Schutz, Vertrauen gehaltene Versprechen, Status wahre Anerkennung, Zugehörigkeit Orte, an denen man Gleichgesinnte trifft. Ein Preisnachlass beantwortet keine der vier."),
      ]}
      sources={["kahneman1979", "mayer1995", "baumeister1995", "han2010", "webster1972"]}
    >
      <p className={p}>
        {tt(
          <>
            In IT sales the product is often the same and the feeling is not. <em>Security</em> is the feeling of being protected from a bad outcome, for oneself and for the company (loss aversion, Kahneman and Tversky 1979, is the mechanism under it). <em>Trust</em> is the willingness to rely on the provider's people and word. <em>Status</em> is how the customer, and the choice, look to others. <em>Belonging</em> is being part of a group of people like them, and not alone (Baumeister and Leary 1995). In a company the buyer also carries these for their own position (Webster and Wind 1972): who is blamed, thanked, seen.
          </>,
          <>
            Im IT-Vertrieb ist das Produkt oft gleich, das Gefühl nicht. <em>Sicherheit</em> ist das Gefühl, vor einem schlechten Ausgang geschützt zu sein, für sich selbst und für das Unternehmen (Verlustaversion, Kahneman und Tversky 1979, ist der Mechanismus darunter). <em>Vertrauen</em> ist die Bereitschaft, sich auf die Menschen und das Wort des Anbieters zu verlassen. <em>Status</em> ist, wie der Kunde und die Wahl auf andere wirken. <em>Zugehörigkeit</em> heißt, Teil einer Gruppe von Menschen wie ihnen zu sein und nicht allein (Baumeister und Leary 1995). In einem Unternehmen trägt der Käufer diese auch für die eigene Position (Webster und Wind 1972): wer beschuldigt, bedankt, gesehen wird.
          </>,
        )}
      </p>
      <DataTable
        head={[tt("Emotion", "Emotion"), tt("What it means", "Was sie bedeutet"), tt("What customers say", "Was Kunden sagen"), tt("Test question", "Testfrage"), tt("What answers it", "Was sie beantwortet")]}
        rows={EMOTION_IDS.map((id) => [NEEDS[id].label, NEEDS[id].means, NEEDS[id].sounds, NEEDS[id].test, NEEDS[id].answeredBy])}
        caption={tt("The four emotions: a profile of each", "Die vier Emotionen: ein Profil jeder einzelnen")}
      />
      <div className="space-y-1.5">
        <p className="smallcaps">{tt("When two emotions seem to fit", "Wenn zwei Emotionen zu passen scheinen")}</p>
        <Bul
          items={EMOTION_PAIR_TESTS.map((t) => (
            <>
              <strong>{t.pair}</strong> {t.test}
            </>
          ))}
        />
      </div>
      <EmotionSortExample />
      <Bul
        items={[
          tt(
            <>
              <strong>Ability</strong>: can they do it? Certificates and references speak to this.
            </>,
            <>
              <strong>Fähigkeit</strong>: Können sie es? Dazu sprechen Zertifikate und Referenzen.
            </>,
          ),
          tt(
            <>
              <strong>Benevolence</strong>: do they care about me and not only about the contract? Small acts before signing speak to this.
            </>,
            <>
              <strong>Wohlwollen</strong>: Liege ich ihnen am Herzen und nicht nur der Vertrag? Dazu sprechen kleine Gesten vor der Unterschrift.
            </>,
          ),
          tt(
            <>
              <strong>Integrity</strong>: do they keep their word, and tell bad news early? A promise kept is worth more than a claim made. These are the three parts of trust (Mayer et al. 1995).
            </>,
            <>
              <strong>Integrität</strong>: Halten sie ihr Wort und sagen schlechte Nachrichten früh? Ein gehaltenes Versprechen ist mehr wert als eine gemachte Behauptung. Das sind die drei Teile des Vertrauens (Mayer et al. 1995).
            </>,
          ),
        ]}
      />
      <Callout label={tt("From Day 3", "Aus Tag 3")} tone="signal">
        <p>
          {tt(
            "Day 3 named principles that move a decision: trust and security, loss aversion, social proof and reciprocity. The four emotions are what the customer feels; the principles are how a provider can act on them. Loss aversion sits under Security, and social proof works on Trust and on Belonging.",
            "Tag 3 nannte Prinzipien, die eine Entscheidung bewegen: Vertrauen und Sicherheit, Verlustaversion, Social Proof und Reziprozität. Die vier Emotionen sind das, was der Kunde fühlt; die Prinzipien sind der Weg, wie ein Anbieter darauf einwirken kann. Verlustaversion liegt unter Sicherheit, und Social Proof wirkt auf Vertrauen und Zugehörigkeit.",
          )}
        </p>
      </Callout>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt(
        "Scarcity, social proof and authority move a decision because they answer a feeling. Each works only while the customer trusts that it is true: once a customer checks, an empty trigger costs trust.",
        "Scarcity, Social Proof und Authority bewegen eine Entscheidung, weil sie ein Gefühl beantworten. Jeder wirkt nur, solange der Kunde glaubt, dass er wahr ist: Sobald ein Kunde nachprüft, kostet ein leerer Trigger Vertrauen.",
      )}
      reasoning={[
        tt("Name the trigger by what the line asks the customer to look at: a limit (scarcity), what similar others did (social proof), or an expert or a credential (authority).", "Benennen Sie den Trigger danach, worauf die Zeile den Kunden hinweist: eine Grenze (Scarcity), was ähnliche andere getan haben (Social Proof) oder ein Experte oder eine Qualifikation (Authority)."),
        tt("A line with none of these is a plain fact: a contract term, a payment date. Do not tag a plain term as a trigger.", "Eine Zeile mit keinem davon ist ein schlichter Fakt: eine Vertragsklausel, ein Zahlungstermin. Ordnen Sie eine schlichte Klausel nicht als Trigger zu."),
        tt("Social proof or Authority? Ask where the weight is: on what people like the customer did, or on who says it is right.", "Social Proof oder Authority? Fragen Sie, wo das Gewicht liegt: darauf, was Menschen wie der Kunde getan haben, oder darauf, wer sagt, dass es richtig ist."),
        tt("Test every trigger with three questions before it is used: is it true, could the customer check it, would the customer feel respected if they saw why the line is written this way? A line that fails one would not be sent as it stands.", "Testen Sie jeden Trigger vor dem Einsatz mit drei Fragen: Ist er wahr, könnte der Kunde ihn prüfen, würde sich der Kunde respektiert fühlen, wenn er sähe, warum die Zeile so geschrieben ist? Eine Zeile, die eine nicht besteht, würde so nicht gesendet."),
        tt("A limit that restarts, “thousands of customers” with no names, or “experts agree” with no expert fail the tests. A false limit is also a misleading claim (§ 5 UWG).", "Eine Grenze, die neu startet, „Tausende Kunden“ ohne Namen oder „Experten sind sich einig“ ohne Experten bestehen die Tests nicht. Eine falsche Grenze ist zudem eine irreführende Angabe (§ 5 UWG)."),
        tt("Scarcity works on a decision the customer already leans towards. Pushed on a doubt, it raises resistance (Brehm 1966). Use it where waiting really costs something.", "Scarcity wirkt bei einer Entscheidung, zu der der Kunde ohnehin neigt. Auf einen Zweifel gedrückt, erhöht sie den Widerstand (Brehm 1966). Nutzen Sie sie dort, wo Warten wirklich etwas kostet."),
        tt("Social proof is strongest when the others are similar, named and reachable (Goldstein et al. 2008). Authority is strongest when the credential is named, current and relevant to the claim.", "Social Proof ist am stärksten, wenn die anderen ähnlich, namentlich genannt und erreichbar sind (Goldstein et al. 2008). Authority ist am stärksten, wenn die Qualifikation benannt, aktuell und für die Aussage relevant ist."),
        tt("A trigger that passes all three tests is worth more after the customer checks it than before. One that fails is worth less: you have spent trust to buy a moment of attention.", "Ein Trigger, der alle drei Tests besteht, ist nach dem Nachprüfen des Kunden mehr wert als vorher. Einer, der durchfällt, ist weniger wert: Sie haben Vertrauen ausgegeben, um einen Moment Aufmerksamkeit zu kaufen."),
      ]}
      sources={["cialdini2021", "worchel1975", "goldstein2008", "brehm1966", "uwg5"]}
    >
      <p className={p}>
        {tt(
          <>
            Cialdini (2021) describes principles that make people say yes. Three matter for a sales page or an offer. <strong>Scarcity</strong>: things look more valuable when they are limited (Worchel et al. 1975 found that the same biscuits were rated higher from a nearly empty jar). <strong>Social proof</strong>: when unsure, people look at what similar others do (Goldstein et al. 2008). <strong>Authority</strong>: people defer to an expert or a credential. Each answers one of the four emotions: scarcity leans on the fear of missing out, social proof on trust and belonging, authority on security.
          </>,
          <>
            Cialdini (2021) beschreibt Prinzipien, die Menschen Ja sagen lassen. Drei zählen für eine Verkaufsseite oder ein Angebot. <strong>Scarcity</strong>: Dinge wirken wertvoller, wenn sie begrenzt sind (Worchel et al. 1975 fanden, dass dieselben Kekse aus einem fast leeren Glas höher bewertet wurden). <strong>Social Proof</strong>: Wenn Menschen unsicher sind, sehen sie darauf, was ähnliche andere tun (Goldstein et al. 2008). <strong>Authority</strong>: Menschen fügen sich einem Experten oder einer Qualifikation. Jeder beantwortet eine der vier Emotionen: Scarcity stützt sich auf die Angst, etwas zu verpassen, Social Proof auf Vertrauen und Zugehörigkeit, Authority auf Sicherheit.
          </>,
        )}
      </p>
      <DataTable
        head={[tt("Trigger", "Trigger"), tt("The idea", "Die Idee"), tt("Example in IT sales", "Beispiel im IT-Vertrieb"), tt("The honest version", "Die ehrliche Version"), tt("The hollow version", "Die hohle Version")]}
        rows={[
          ["Scarcity", tt("A limit makes waiting feel costly.", "Eine Grenze lässt Warten teuer wirken."), tt("“Two slots left this quarter.”", "„Noch zwei Plätze in diesem Quartal.“"), tt("A real limit with a reason the customer can see.", "Eine echte Grenze mit einem Grund, den der Kunde sehen kann."), tt("A countdown that restarts, or “last licences” that are never the last.", "Ein Countdown, der neu startet, oder „letzte Lizenzen“, die nie die letzten sind.")],
          ["Social Proof", tt("What similar others did counts as evidence.", "Was ähnliche andere getan haben, zählt als Beleg."), tt("“Eleven logistics firms in your region run on us.”", "„Elf Logistikfirmen in Ihrer Region laufen bei uns.“"), tt("Comparable firms, named, and reachable for a call.", "Vergleichbare Firmen, namentlich genannt und für ein Gespräch erreichbar."), tt("“Thousands of companies trust us”, with no name.", "„Tausende Unternehmen vertrauen uns“, ohne Namen.")],
          ["Authority", tt("An expert or a credential is a reason to defer.", "Ein Experte oder eine Qualifikation ist ein Grund, sich zu fügen."), tt("“Certified to ISO/IEC 27001.”", "„Zertifiziert nach ISO/IEC 27001.“"), tt("A named standard, a certificate number, an auditor.", "Ein benannter Standard, eine Zertifikatsnummer, ein Auditor."), tt("“Leading experts agree”, with no expert.", "„Führende Experten sind sich einig“, ohne Experten.")],
        ]}
        caption={tt("Three triggers, and the difference between honest and hollow", "Drei Trigger und der Unterschied zwischen ehrlich und hohl")}
      />
      <Diagram
        label={tt("The trigger checker · a worked example on Brenner Netzwerke and its competitor Kastell", "Der Trigger-Checker · ein durchgerechnetes Beispiel an Brenner Netzwerke und dessen Wettbewerber Kastell")}
        caption={tt("Select a line to read its three tests. Then switch to “After they check” to see what the customer believes once they have looked.", "Wählen Sie eine Zeile, um ihre drei Tests zu lesen. Schalten Sie dann auf „Nach dem Nachprüfen“, um zu sehen, was der Kunde glaubt, nachdem er hingesehen hat.")}
      >
        <TriggerChecker />
      </Diagram>
      <div className="space-y-1.5">
        <p className="smallcaps">{tt("The three tests of a fair trigger", "Die drei Tests eines fairen Triggers")}</p>
        <Bul
          items={HONESTY_TESTS.map((t) => (
            <>
              <strong>{t.name}.</strong> {t.test}
            </>
          ))}
        />
      </div>
      <Callout label={tt("A limit to a limit", "Eine Grenze für die Grenze")} tone="rust">
        <p>
          {tt(
            "A deadline or a stock limit that is not real is a misleading claim (§ 5 UWG). This is the German rule on misleading commercial practices; the exact wording and the exceptions differ, so check it with your legal team before you use a limit in an offer. The three tests are a working rule, not legal advice.",
            "Eine Frist oder eine Bestandsgrenze, die nicht echt ist, ist eine irreführende Angabe (§ 5 UWG). Das ist die deutsche Regel zu irreführenden geschäftlichen Handlungen; der genaue Wortlaut und die Ausnahmen unterscheiden sich, prüfen Sie es also mit Ihrer Rechtsabteilung, bevor Sie eine Grenze in einem Angebot nutzen. Die drei Tests sind eine Arbeitsregel, keine Rechtsberatung.",
          )}
        </p>
      </Callout>
    </MaterialCard>
  );
}

export function CardA4() {
  const B = BRENNER;
  const reach = B.customers * (B.consent / 100) * (B.usable / 100);
  const members = B.customers * 0.4;
  const rebateYear = members * B.value * 0.03;
  const rebate = rebateYear * (4 / 12);
  const build = 30000;
  const review = 6000;
  const dec = (x: number) => x.toFixed(2).replace(".", tt(".", ","));
  return (
    <MaterialCard
      id="A4"
      scan={tt(
        "Behavioural targeting makes an offer fit by using what customers did, at a moment they can hear it. It is limited by what customers have agreed to, and it can tip into feeling watched.",
        "Behavioral Targeting macht ein Angebot passend, indem es nutzt, was Kunden getan haben, in einem Moment, in dem sie es hören können. Es wird begrenzt durch das, wozu Kunden zugestimmt haben, und es kann in das Gefühl kippen, beobachtet zu werden.",
      )}
      reasoning={[
        tt("Reach = customers × the share who agreed × the share with enough usable data. Read each percentage as a fraction of one (divide by 100) before you multiply.", "Reichweite = Kunden × der Anteil, der zugestimmt hat × der Anteil mit genügend nutzbaren Daten. Lesen Sie jede Prozentzahl als Bruchteil von eins (durch 100 teilen), bevor Sie multiplizieren."),
        tt("The cost of a rebate over part of a year = members × the average annual revenue × the rebate rate × (months ÷ 12). Members are the customers who join, not all customers.", "Die Kosten eines Rabatts über einen Teil des Jahres = Mitglieder × der durchschnittliche Jahresumsatz × der Rabattsatz × (Monate ÷ 12). Mitglieder sind die Kunden, die beitreten, nicht alle Kunden."),
        tt("Cost per customer reached = the total cost (build plus the data-protection review) ÷ the customers reached. Use your own reach figure.", "Kosten pro erreichtem Kunden = die Gesamtkosten (Aufbau plus Datenschutzprüfung) ÷ die erreichten Kunden. Nutzen Sie Ihre eigene Reichweitenzahl."),
        tt("Climb the ladder only as far as the data a group has agreed to allows. A higher level for a group that has not agreed is not an option, however good the response.", "Steigen Sie die Leiter nur so weit hinauf, wie es die Daten erlauben, denen eine Gruppe zugestimmt hat. Eine höhere Stufe für eine Gruppe, die nicht zugestimmt hat, ist keine Option, so gut die Response auch ist."),
        tt("A higher level gives a better fit and a smaller reach. Compare the responders and the cost, not the response rate alone.", "Eine höhere Stufe gibt besseren Zuschnitt und kleinere Reichweite. Vergleichen Sie die Reagierenden und die Kosten, nicht allein die Response Rate."),
        tt("Send by event, not by calendar. An offer that arrives soon after an unresolved problem fails whatever it says.", "Senden Sie nach Ereignis, nicht nach Kalender. Ein Angebot, das kurz nach einem ungelösten Problem eintrifft, scheitert, was auch immer es sagt."),
        tt("Consent must be given by an active step, for a specific purpose, and be as easy to withdraw as to give. A pre-ticked box or silence is not consent (Planet49, 2019).", "Die Einwilligung muss durch einen aktiven Schritt für einen bestimmten Zweck erteilt werden und so leicht widerrufbar sein wie erteilbar. Ein vorangekreuztes Kästchen oder Schweigen ist keine Einwilligung (Planet49, 2019)."),
        tt("A customer can object to direct marketing, including profiling for it, at any time, and it must then stop (Art. 21 GDPR). Build the way to honour it before the first send.", "Ein Kunde kann jederzeit der Direktwerbung widersprechen, einschließlich des Profilings dafür, und sie muss dann enden (Art. 21 DSGVO). Bauen Sie den Weg, das umzusetzen, vor dem ersten Versand."),
        tt("Personal is not the same as relevant. When the customer cannot see why the sender knows so much, a very personal message raises resistance (White et al. 2008).", "Persönlich ist nicht dasselbe wie relevant. Wenn der Kunde nicht sieht, warum der Absender so viel weiß, erhöht eine sehr persönliche Nachricht den Widerstand (White et al. 2008)."),
      ]}
      sources={["awad2006", "aguirre2015", "white2008", "gdpr2016", "planet2019", "edpb2020", "wp251"]}
    >
      <p className={p}>
        {tt(
          <>
            <strong>Behavioural targeting</strong> uses what customers did (what they use, click, buy, ask) to choose which message, offer and moment fits each one. Its promise is relevance through context and timing: the right offer for this customer at the moment they can hear it. Its price is data. Awad and Krishnan (2006) called the tension the personalisation–privacy paradox: customers want messages that fit and resist the data collection that makes them possible. Aguirre et al. (2015) found that personalised messages made customers feel more vulnerable, unless the customers trusted how their data was handled. So the limit of targeting is not technical. It is what the customer has agreed to and how the customer feels about it.
          </>,
          <>
            <strong>Behavioral Targeting</strong> nutzt, was Kunden getan haben (was sie nutzen, anklicken, kaufen, fragen), um zu wählen, welche Nachricht, welches Angebot und welcher Moment zu jedem passt. Sein Versprechen ist Relevanz durch Kontext und Timing: das richtige Angebot für diesen Kunden in dem Moment, in dem er es hören kann. Sein Preis sind Daten. Awad und Krishnan (2006) nannten die Spannung das Personalisierungs-Datenschutz-Paradox: Kunden wollen passende Nachrichten und wehren sich gegen die Datenerhebung, die sie möglich macht. Aguirre et al. (2015) fanden, dass personalisierte Nachrichten Kunden verletzlicher fühlen ließen, außer sie vertrauten dem Umgang mit ihren Daten. Die Grenze des Targetings ist also nicht technisch. Sie ist das, wozu der Kunde zugestimmt hat und wie er sich dabei fühlt.
          </>,
        )}
      </p>
      <Diagram
        label={tt("The personalisation ladder · a worked example on Brenner Netzwerke", "Die Personalisierungsleiter · ein durchgerechnetes Beispiel an Brenner Netzwerke")}
        caption={tt("Choose a level, then change when the message is sent. Watch what happens to reach and to the number of responders.", "Wählen Sie eine Stufe und ändern Sie dann, wann die Nachricht gesendet wird. Beobachten Sie, was mit der Reichweite und der Zahl der Reagierenden passiert.")}
      >
        <PersonalisationLadder />
      </Diagram>
      <DataTable
        head={[tt("Rule", "Regel"), tt("In plain words", "In einfachen Worten"), tt("What it means for a provider", "Was es für einen Anbieter bedeutet")]}
        rows={[
          [tt("Consent (Art. 6 and 7 GDPR)", "Einwilligung (Art. 6 und 7 DSGVO)"), tt("A clear, active, specific agreement, freely given and as easy to withdraw as to give.", "Eine klare, aktive, bestimmte Zustimmung, freiwillig erteilt und so leicht widerrufbar wie erteilbar."), tt("An opt-in. No pre-ticked boxes: the Court of Justice held in 2019 (Planet49) that a pre-ticked box is not consent.", "Ein Opt-in. Keine vorangekreuzten Kästchen: Der Gerichtshof entschied 2019 (Planet49), dass ein vorangekreuztes Kästchen keine Einwilligung ist.")],
          [tt("Legitimate interest (Art. 6 GDPR)", "Berechtigtes Interesse (Art. 6 DSGVO)"), tt("A business may sometimes use data without consent if its interest is real and the customer's interests do not outweigh it.", "Ein Unternehmen darf Daten manchmal ohne Einwilligung nutzen, wenn sein Interesse echt ist und die Interessen des Kunden nicht überwiegen."), tt("It may cover ordinary marketing to existing customers. Do not assume it covers profiling by usage: check with the data-protection officer.", "Es kann gewöhnliche Werbung an Bestandskunden abdecken. Nehmen Sie nicht an, dass es Profiling nach Nutzung abdeckt: Klären Sie es mit dem Datenschutzbeauftragten.")],
          [tt("Purpose limitation and minimisation (Art. 5 GDPR)", "Zweckbindung und Datenminimierung (Art. 5 DSGVO)"), tt("Use data only for the purpose it was given for, and only as much as is needed.", "Nutzen Sie Daten nur für den Zweck, für den sie gegeben wurden, und nur so viel wie nötig."), tt("Usage data given for running the service is not automatically usable for sales offers.", "Nutzungsdaten, die für den Betrieb des Service gegeben wurden, sind nicht automatisch für Verkaufsangebote nutzbar.")],
          [tt("Right to object (Art. 21 GDPR)", "Widerspruchsrecht (Art. 21 DSGVO)"), tt("A customer can object to direct marketing, including profiling for it, at any time. It must then stop.", "Ein Kunde kann jederzeit der Direktwerbung widersprechen, einschließlich des Profilings dafür. Sie muss dann enden."), tt("Build the stop button first, and honour it at once.", "Bauen Sie zuerst den Stopp-Knopf und setzen Sie ihn sofort um.")],
          [tt("Email advertising (§ 7 UWG)", "E-Mail-Werbung (§ 7 UWG)"), tt("Advertising by email generally needs consent. There is a narrow exception for the provider's own similar products to existing customers.", "Werbung per E-Mail braucht grundsätzlich eine Einwilligung. Es gibt eine enge Ausnahme für eigene ähnliche Produkte des Anbieters an Bestandskunden."), tt("Check the exception before you rely on it, and always give a way to object.", "Prüfen Sie die Ausnahme, bevor Sie sich darauf verlassen, und geben Sie immer eine Möglichkeit zum Widerspruch.")],
        ]}
        caption={tt("What the rules ask, in outline (not legal advice)", "Was die Regeln verlangen, im Umriss (keine Rechtsberatung)")}
      />
      <p className="text-caption text-ash">
        {tt(
          "Business customers are companies, but the people who work there are individuals: names, email addresses and usage traced to a person are personal data. The rules above apply to them.",
          "Geschäftskunden sind Unternehmen, aber die Menschen, die dort arbeiten, sind Einzelpersonen: Namen, E-Mail-Adressen und einer Person zuordenbare Nutzung sind personenbezogene Daten. Die obigen Regeln gelten für sie.",
        )}
      </p>
      <p className={p}>
        {tt(
          `The method for the task figures is the same on other numbers. Brenner Netzwerke has ${num(B.customers)} customers. ${B.consent}% agreed to usage analysis and ${B.usable}% of those have enough data.`,
          `Die Methode für die Zahlen der Aufgabe ist dieselbe, mit anderen Zahlen. Brenner Netzwerke hat ${num(B.customers)} Kunden. ${B.consent} % haben der Nutzungsanalyse zugestimmt, und ${B.usable} % davon haben genug Daten.`,
        )}
      </p>
      <DataTable
        head={[tt("Step", "Schritt"), tt("Calculation for Brenner (Case assumption)", "Berechnung für Brenner (Case-Annahme)"), tt("Result", "Ergebnis")]}
        rows={[
          [tt("1 · Read the percentages as fractions of one", "1 · Die Prozentzahlen als Bruchteile von eins lesen"), `${B.consent}${pc()} = ${dec(B.consent / 100)}. ${B.usable}${pc()} = ${dec(B.usable / 100)}.`, tt("0.30 and 0.80", "0,30 und 0,80")],
          [tt("2 · Customers reached = customers × the two shares", "2 · Erreichte Kunden = Kunden × die zwei Anteile"), `${num(B.customers)} × ${dec(0.3)} × ${dec(0.8)}`, `${num(reach)} ${tt("customers", "Kunden")}`],
          [tt("3 · Members of a bonus programme = customers × the share who join (40%)", "3 · Mitglieder eines Bonusprogramms = Kunden × der Anteil, der beitritt (40 %)"), `${num(B.customers)} × ${dec(0.4)}`, `${num(members)} ${tt("members", "Mitglieder")}`],
          [tt("4 · Rebate for a full year = members × annual revenue × the rebate (3%)", "4 · Rabatt für ein volles Jahr = Mitglieder × Jahresumsatz × der Rabatt (3 %)"), `${num(members)} × ${euro(B.value)} × ${dec(0.03)}`, euro(rebateYear)],
          [tt("5 · Scale to the window: × months ÷ 12 (4 months)", "5 · Auf das Zeitfenster umrechnen: × Monate ÷ 12 (4 Monate)"), `${euro(rebateYear)} × 4 ÷ 12`, euro(rebate)],
          [tt("6 · Cost per customer reached = (build + review) ÷ reached", "6 · Kosten pro erreichtem Kunden = (Aufbau + Prüfung) ÷ erreicht"), `(${euro(build)} + ${euro(review)}) ÷ ${num(reach)}`, euro((build + review) / reach)],
        ]}
        caption={tt("The same method as the task, on different numbers", "Dieselbe Methode wie in der Aufgabe, mit anderen Zahlen")}
      />
      <Callout label={tt("Coaching focus", "Coaching-Fokus")} tone="amber">
        <p>
          {tt(
            "Personalisation against mass communication: a message to everyone reaches everyone and fits nobody; a personal message fits and reaches few. When does it tip into rejection? When the customer does not see why the sender knows what it knows, when it arrives at the wrong moment, or when the customer never agreed to be looked at. Reflect on the last “personal” email you received that made you uneasy.",
            "Personalisierung gegen Massenkommunikation: Eine Nachricht an alle erreicht alle und passt zu niemandem; eine persönliche Nachricht passt und erreicht wenige. Wann kippt sie in Ablehnung? Wenn der Kunde nicht sieht, warum der Absender weiß, was er weiß, wenn sie im falschen Moment kommt oder wenn der Kunde nie zugestimmt hat, betrachtet zu werden. Denken Sie an die letzte „persönliche“ E-Mail, die Sie bekommen haben und die Ihnen unbehaglich war.",
          )}
        </p>
      </Callout>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt(
        "A loyalty programme is a bonus, a service or a community. Only what a customer would still want when the discount stops builds loyalty; the rest only activates the next purchase.",
        "Ein Loyalty-Programm ist ein Bonus, ein Service oder eine Community. Nur was ein Kunde auch dann noch wollen würde, wenn der Rabatt endet, schafft Loyalität; der Rest aktiviert nur den nächsten Kauf.",
      )}
      reasoning={[
        tt("Type test: what does the customer receive? Money or something that stands for money is a bonus. Help that fits is a service. A circle of peers and recognition is a community.", "Typ-Test: Was erhält der Kunde? Geld oder etwas, das für Geld steht, ist ein Bonus. Passende Hilfe ist ein Service. Ein Kreis von Gleichgesinnten und Anerkennung ist eine Community."),
        tt("Benefit test: would the customer still want it if the discount disappeared? If not, it is a reward, not a benefit.", "Vorteils-Test: Würde der Kunde es noch wollen, wenn der Rabatt wegfiele? Wenn nicht, ist es eine Belohnung, kein Vorteil."),
        tt("A bonus costs on every member, including those who would have stayed anyway, and stopping it feels like a loss. A service costs per event or per member. A community costs per event and grows in value with the group.", "Ein Bonus kostet bei jedem Mitglied, auch bei denen, die ohnehin geblieben wären, und sein Ende fühlt sich wie ein Verlust an. Ein Service kostet pro Ereignis oder pro Mitglied. Eine Community kostet pro Ereignis und gewinnt mit der Gruppe an Wert."),
        tt("Long-term test: does what a member gets grow the longer they stay? Short-term tools (points that reset, a welcome gift) activate a purchase. They do not give a reason to stay in year three.", "Langzeit-Test: Wächst, was ein Mitglied bekommt, je länger es bleibt? Kurzfristige Werkzeuge (Punkte, die verfallen, ein Willkommensgeschenk) aktivieren einen Kauf. Sie geben keinen Grund, im dritten Jahr zu bleiben."),
        tt("Membership is a choice. Customers join by an active opt-in, and benefits use only what members agreed to share.", "Mitgliedschaft ist eine Wahl. Kunden treten durch ein aktives Opt-in bei, und Vorteile nutzen nur, was Mitglieder zu teilen zugestimmt haben."),
        tt("Cost of a concept in a window = the one-off set-up + (members × the yearly cost per member of the benefits × months ÷ 12). Hold it against the same budget as the measures.", "Kosten eines Konzepts in einem Zeitfenster = der einmalige Aufbau + (Mitglieder × die jährlichen Kosten pro Mitglied der Vorteile × Monate ÷ 12). Halten Sie es gegen dasselbe Budget wie die Maßnahmen."),
        tt("Progress already made is a cheap way to start a customer moving (Nunes and Drèze 2006), and a reward close by makes people speed up (Kivetz et al. 2006). Use both for activation, and do not mistake them for loyalty.", "Bereits gemachter Fortschritt ist ein billiger Weg, einen Kunden in Bewegung zu setzen (Nunes und Drèze 2006), und eine nahe Belohnung lässt Menschen schneller werden (Kivetz et al. 2006). Nutzen Sie beides zur Aktivierung und verwechseln Sie es nicht mit Loyalität."),
        tt("A programme changes little unless it adds real value the customer would not otherwise get (Dowling and Uncles 1997). In business markets the value is service quality and trust (Rauyruen and Miller 2007).", "Ein Programm verändert wenig, wenn es keinen echten Wert bietet, den der Kunde sonst nicht bekäme (Dowling und Uncles 1997). Auf Geschäftsmärkten sind der Wert Servicequalität und Vertrauen (Rauyruen und Miller 2007)."),
      ]}
      sources={["dowling1997", "kumar2004", "nunes2006", "kivetz2006", "bolton2000", "rauyruen2007", "vargo2004"]}
    >
      <p className={p}>
        {tt(
          "Dowling and Uncles (1997) asked whether loyalty programmes really work and found that most change little: customers join several, and the reward is soon expected. Kumar and Shah (2004) added that rewarding customers who are not profitable builds behaviour without loyalty. What lasts is value the customer sees in use (Vargo and Lusch 2004): a service that solves a problem, or a circle that gives them something they cannot buy.",
          "Dowling und Uncles (1997) fragten, ob Loyalty-Programme wirklich funktionieren, und fanden, dass die meisten wenig verändern: Kunden treten mehreren bei, und die Belohnung wird bald erwartet. Kumar und Shah (2004) ergänzten, dass das Belohnen nicht profitabler Kunden Verhalten ohne Loyalität schafft. Was hält, ist Wert, den der Kunde in der Nutzung sieht (Vargo und Lusch 2004): ein Service, der ein Problem löst, oder ein Kreis, der ihnen etwas gibt, das sie nicht kaufen können.",
        )}
      </p>
      <DataTable
        head={[tt("Type", "Typ"), tt("What the customer gets", "Was der Kunde bekommt"), tt("What it builds", "Was es aufbaut"), tt("Cost shape", "Kostenform"), tt("How long it lasts", "Wie lange es hält"), tt("Main risk", "Hauptrisiko")]}
        rows={[
          [tt("Bonus", "Bonus"), tt("Money or its equivalent: a rebate, points, vouchers.", "Geld oder sein Gegenwert: ein Rabatt, Punkte, Gutscheine."), tt("A reason to buy again soon.", "Ein Grund, bald wieder zu kaufen."), tt("Repeats on every member.", "Fällt bei jedem Mitglied wieder an."), tt("While the reward continues.", "Solange die Belohnung weiterläuft."), tt("The discount trap: customers wait for the next one.", "Die Rabattfalle: Kunden warten auf den nächsten.")],
          [tt("Service", "Service"), tt("Help that fits: a review, a named contact, a priority line.", "Passende Hilfe: ein Review, ein namentlicher Ansprechpartner, eine Prioritäts-Hotline."), tt("Trust, and the feeling of being looked after.", "Vertrauen und das Gefühl, umsorgt zu sein."), tt("Per event or per member.", "Pro Ereignis oder pro Mitglied."), tt("As long as it is delivered.", "Solange er geliefert wird."), tt("It depends on people, and it does not scale.", "Er hängt von Menschen ab und skaliert nicht.")],
          [tt("Community", "Community"), tt("A circle: round tables, a forum, recognition, a say.", "Ein Kreis: Round Tables, ein Forum, Anerkennung, Mitsprache."), tt("Belonging and standing.", "Zugehörigkeit und Ansehen."), tt("Per event, and a set-up.", "Pro Ereignis und ein Aufbau."), tt("It builds over years and is hard to copy.", "Sie baut sich über Jahre auf und ist schwer zu kopieren."), tt("It needs a reason for people to take part.", "Sie braucht einen Grund für Menschen, teilzunehmen.")],
        ]}
        caption={tt("Three types of loyalty programme", "Drei Typen von Loyalty-Programmen")}
      />
      <Diagram
        label={tt("Three types, one test · a worked example on Brenner Netzwerke", "Drei Typen, ein Test · ein durchgerechnetes Beispiel an Brenner Netzwerke")}
        caption={tt("Choose a type, then switch the benefit to “Stops in year three” and watch who still renews.", "Wählen Sie einen Typ, schalten Sie den Vorteil dann auf „Endet im dritten Jahr“ und beobachten Sie, wer noch verlängert.")}
      >
        <LoyaltyTypes />
      </Diagram>
      <DataTable
        head={["", tt("Short-term activation", "Kurzfristige Aktivierung"), tt("Long-term retention", "Langfristige Retention")]}
        rows={[
          [tt("What it does", "Was sie tut"), tt("Moves the next purchase or the next sign-up.", "Bewegt den nächsten Kauf oder die nächste Anmeldung."), tt("Gives a reason to stay for years.", "Gibt einen Grund, jahrelang zu bleiben.")],
          [tt("Typical tools", "Typische Werkzeuge"), tt("A discount, points that reset, a welcome gift, a card that is already stamped.", "Ein Rabatt, Punkte, die verfallen, ein Willkommensgeschenk, eine Karte, die schon abgestempelt ist."), tt("A benefit that grows with tenure, a community, a service that improves with use.", "Ein Vorteil, der mit der Dauer wächst, eine Community, ein Service, der mit der Nutzung besser wird.")],
          [tt("What it costs", "Was sie kostet"), tt("A price on every member, again and again.", "Einen Preis bei jedem Mitglied, immer wieder."), tt("A set-up and events, with a cost per member that can fall.", "Einen Aufbau und Ereignisse, mit Kosten pro Mitglied, die sinken können.")],
          [tt("Test", "Test"), tt("Would the customer come back if it stopped? Often no.", "Würde der Kunde wiederkommen, wenn es endete? Oft nein."), tt("Would the customer miss it? Yes.", "Würde der Kunde es vermissen? Ja.")],
        ]}
        caption={tt("Short-term activation against long-term retention", "Kurzfristige Aktivierung gegen langfristige Retention")}
      />
      <Diagram
        label={tt("Progress already made · the endowed progress effect", "Bereits gemachter Fortschritt · der Endowed-Progress-Effekt")}
        caption={tt("Both cards need the same eight purchases. Switch between them.", "Beide Karten brauchen dieselben acht Käufe. Wechseln Sie zwischen ihnen.")}
      >
        <EndowedProgress />
      </Diagram>
      <Callout label={tt("Coaching focus", "Coaching-Fokus")} tone="amber">
        <p>
          {tt(
            "Loyalty: reward against real added value. Take a programme you know. If the reward were taken away tomorrow, what would be left, and would the customers notice? What they would notice is the value; the rest was the reward.",
            "Loyalität: Belohnung gegen echten Mehrwert. Nehmen Sie ein Programm, das Sie kennen. Wenn die Belohnung morgen wegfiele, was bliebe, und würden die Kunden es bemerken? Was sie bemerken würden, ist der Wert; der Rest war die Belohnung.",
          )}
        </p>
      </Callout>
    </MaterialCard>
  );
}

export function CardA6() {
  return (
    <MaterialCard
      id="A6"
      scan={tt(
        "Read a sales process as twelve small moments. Tag each with the need it leaves unmet, count them, add those that cost a customer, and say what the file cannot tell you.",
        "Lesen Sie einen Vertriebsprozess als zwölf kleine Momente. Ordnen Sie jedem das Bedürfnis zu, das er offen lässt, zählen Sie sie, addieren Sie die, die einen Kunden gekostet haben, und sagen Sie, was die Akte Ihnen nicht sagt.",
      )}
      reasoning={[
        tt("A touchpoint is one moment where the customer meets the provider: a proposal, a call, a letter, an outage. Tag it with the need it leaves unmet, from what the customer says and does.", "Ein Touchpoint ist ein Moment, in dem der Kunde dem Anbieter begegnet: ein Angebot, ein Anruf, ein Brief, ein Ausfall. Ordnen Sie ihm das Bedürfnis zu, das er offen lässt, nach dem, was der Kunde sagt und tut."),
        tt("Find the one phrase that decides the touchpoint, then ask the test question of the need it points to. If two needs fit, use the pair test.", "Finden Sie die eine Formulierung, die den Touchpoint entscheidet, und stellen Sie dann die Testfrage des Bedürfnisses, auf das sie zeigt. Passen zwei Bedürfnisse, nutzen Sie den Paar-Test."),
        tt("Trust or Timing? Ask what the customer holds against the provider. A broken promise is Trust. A message that came at a bad moment is Timing.", "Vertrauen oder Timing? Fragen Sie, was der Kunde dem Anbieter vorhält. Ein gebrochenes Versprechen ist Vertrauen. Eine Nachricht, die im falschen Moment kam, ist Timing."),
        tt("Relevance or Timing? Ask whether the content or the moment is wrong. If the same message would work at another time, it is Timing; if it would fit at no time, it is Relevance.", "Relevanz oder Timing? Fragen Sie, ob der Inhalt oder der Moment falsch ist. Würde dieselbe Nachricht zu einer anderen Zeit wirken, ist es Timing; würde sie nie passen, ist es Relevanz."),
        tt("Relevance or Status? Ask what the customer misses. Something that fits their own situation is Relevance. Acknowledgement of who they are and how long they have been a customer is Status.", "Relevanz oder Status? Fragen Sie, was der Kunde vermisst. Etwas, das zu seiner eigenen Situation passt, ist Relevanz. Anerkennung dessen, wer er ist und wie lange er schon Kunde ist, ist Status."),
        tt("Points = the touchpoints with the need + those followed by a customer leaving. 5 or more points is High, 3 to 4 is Mid, 2 or fewer is Low.", "Punkte = die Touchpoints mit dem Bedürfnis + die, auf die ein Kunde ging. 5 oder mehr Punkte sind Hoch, 3 bis 4 Mittel, 2 oder weniger Niedrig."),
        tt("Apply the rule to your own tally. If you tagged a touchpoint differently, your points differ and your rating follows your own evidence.", "Wenden Sie die Regel auf Ihre eigene Strichliste an. Wenn Sie einen Touchpoint anders zugeordnet haben, unterscheiden sich Ihre Punkte, und Ihre Bewertung folgt Ihren eigenen Belegen."),
        tt("The four central needs are the four with the most touchpoints. Break a tie with the customers who left.", "Die vier zentralen Bedürfnisse sind die vier mit den meisten Touchpoints. Entscheiden Sie einen Gleichstand mit den abgewanderten Kunden."),
        tt("A need that only produces complaints is weaker than one that costs customers, but it is not harmless: it shows what customers will want next.", "Ein Bedürfnis, das nur Beschwerden erzeugt, ist schwächer als eines, das Kunden kostet, aber nicht harmlos: Es zeigt, was Kunden als Nächstes wollen werden."),
        tt("Twelve touchpoints show a pattern; they do not prove one. Say what the file cannot tell you, and ask which missing item would change the need you tackle or the measure you fund. A count of what CloudTech sent or handled says how busy it was, not how the customer felt.", "Zwölf Touchpoints zeigen ein Muster; sie beweisen keines. Sagen Sie, was die Akte nicht sagen kann, und fragen Sie, welches fehlende Element das Bedürfnis ändern würde, das Sie angehen, oder die Maßnahme, die Sie finanzieren. Eine Zählung dessen, was CloudTech gesendet oder bearbeitet hat, sagt, wie beschäftigt es war, nicht, wie der Kunde sich fühlte."),
      ]}
      sources={["bitner1990", "lemon2016", "nisbett1977"]}
    >
      <p className={p}>
        {tt(
          <>
            A customer's view of a provider is built from many small encounters (Bitner 1990), and the experience adds up across the whole journey (Lemon and Verhoef 2016). Customers seldom name the need behind a complaint. They say what happened, and people are not good witnesses to their own reasons (Nisbett and Wilson 1977). So read each touchpoint for what the customer <em>did</em> and <em>said</em>, and ask which of six needs it left unmet. Four are the emotions of A2; two are about how the provider communicates.
          </>,
          <>
            Das Bild, das ein Kunde von einem Anbieter hat, entsteht aus vielen kleinen Begegnungen (Bitner 1990), und die Erfahrung summiert sich über die ganze Journey (Lemon und Verhoef 2016). Kunden nennen selten das Bedürfnis hinter einer Beschwerde. Sie sagen, was passiert ist, und Menschen sind keine guten Zeugen ihrer eigenen Gründe (Nisbett und Wilson 1977). Lesen Sie also jeden Touchpoint danach, was der Kunde <em>getan</em> und <em>gesagt</em> hat, und fragen Sie, welches von sechs Bedürfnissen er offen ließ. Vier sind die Emotionen aus A2; zwei betreffen, wie der Anbieter kommuniziert.
          </>,
        )}
      </p>
      <DataTable
        head={[tt("Need", "Bedürfnis"), tt("What it means", "Was es bedeutet"), tt("What customers say", "Was Kunden sagen"), tt("Test question", "Testfrage")]}
        rows={NEED_IDS.map((id) => [NEEDS[id].label, NEEDS[id].means, NEEDS[id].sounds, NEEDS[id].test])}
        caption={tt("The six needs: a profile of each", "Die sechs Bedürfnisse: ein Profil jedes einzelnen")}
      />
      <div className="space-y-1.5">
        <p className="smallcaps">{tt("When two needs seem to fit", "Wenn zwei Bedürfnisse zu passen scheinen")}</p>
        <Bul
          items={NEED_PAIR_TESTS.map((t) => (
            <>
              <strong>{t.pair}</strong> {t.test}
            </>
          ))}
        />
      </div>
      <TouchpointExample />
      <Diagram
        label={tt("Strength of four needs · a worked example on Brenner's ten touchpoints", "Stärke von vier Bedürfnissen · ein durchgerechnetes Beispiel an Brenners zehn Touchpoints")}
        caption={tt("Switch the ranking between touchpoints only and touchpoints plus customers who left, and watch Trust and Relevance change places.", "Schalten Sie die Rangfolge zwischen nur Touchpoints und Touchpoints plus abgewanderten Kunden um und beobachten Sie, wie Vertrauen und Relevanz die Plätze tauschen.")}
      >
        <StrengthExample />
      </Diagram>
      <DataTable
        head={[tt("Format of a need", "Format eines Bedürfnisses"), tt("Brenner's example (Case assumption)", "Brenners Beispiel (Case-Annahme)")]}
        rows={[
          [
            tt("When [situation], customers [behaviour], because [need].", "Wenn [Situation], dann [Verhalten] Kunden, weil [Bedürfnis]."),
            tt(
              "When a promised review comes 34 days late, customers stop attending the reviews, because they can no longer check that the provider does what it says.",
              "Wenn ein versprochenes Review 34 Tage zu spät kommt, kommen Kunden nicht mehr zu den Reviews, weil sie nicht mehr prüfen können, ob der Anbieter tut, was er sagt.",
            ),
          ],
        ]}
        caption={tt("How to write a need", "Wie man ein Bedürfnis schreibt")}
      />
      <div className="space-y-1.5">
        <p className="smallcaps">{tt("What the file cannot tell you: four kinds of gap", "Was die Akte nicht sagen kann: vier Arten von Lücken")}</p>
        <Bul
          items={[
            tt(
              <>
                <strong>No comparison group.</strong> Touchpoints that failed show what failed. What works, in the customers who stayed, is missing.
              </>,
              <>
                <strong>Keine Vergleichsgruppe.</strong> Touchpoints, die scheiterten, zeigen, was scheiterte. Was bei den Kunden wirkt, die geblieben sind, fehlt.
              </>,
            ),
            tt(
              <>
                <strong>No “what happened next”.</strong> A customer who left either bought a cheaper offer or a more personal one. The two point at different causes.
              </>,
              <>
                <strong>Kein „Was geschah danach“.</strong> Ein Kunde, der ging, kaufte entweder ein günstigeres oder ein persönlicheres Angebot. Beides deutet auf verschiedene Ursachen.
              </>,
            ),
            tt(
              <>
                <strong>No “how much”.</strong> A few large customers leaving is a different problem from many small ones.
              </>,
              <>
                <strong>Kein „Wie viel“.</strong> Wenn wenige große Kunden gehen, ist das ein anderes Problem als bei vielen kleinen.
              </>,
            ),
            tt(
              <>
                <strong>Activity instead of feeling.</strong> A count of newsletters opened or tickets handled is not a measure of what the customer felt.
              </>,
              <>
                <strong>Aktivität statt Gefühl.</strong> Eine Zählung geöffneter Newsletter oder bearbeiteter Tickets misst nicht, was der Kunde fühlte.
              </>,
            ),
          ]}
        />
        <p className="text-caption text-ash">
          {tt(
            "Test any missing item with two questions: would knowing it change the need you tackle or the measure you fund? And is it about the customer's behaviour and not yet in the file?",
            "Testen Sie jedes fehlende Element mit zwei Fragen: Würde es Wissen ändern, welches Bedürfnis Sie angehen oder welche Maßnahme Sie finanzieren? Und betrifft es das Verhalten des Kunden und steht noch nicht in der Akte?",
          )}
        </p>
      </div>
      <Callout label={tt("Small numbers", "Kleine Zahlen")} tone="rust">
        <p>{tt("Twelve touchpoints are a pattern to act on, not a statistic to quote. Say “in the twelve touchpoints”, not “customers usually”.", "Zwölf Touchpoints sind ein Muster, nach dem man handelt, keine Statistik zum Zitieren. Sagen Sie „in den zwölf Touchpoints“, nicht „Kunden tun üblicherweise“.")}</p>
      </Callout>
    </MaterialCard>
  );
}

export function CardA7() {
  return (
    <MaterialCard
      id="A7"
      scan={tt(
        "A measure works when it answers the need the evidence shows. Score its effect, its acceptance and its scalability, multiply the three, and hold the plan, with the loyalty concept, against the budget.",
        "Eine Maßnahme wirkt, wenn sie das Bedürfnis beantwortet, das die Belege zeigen. Bewerten Sie ihre Wirkung, ihre Akzeptanz und ihre Skalierbarkeit, multiplizieren Sie die drei und halten Sie den Plan samt Loyalty-Konzept gegen das Budget.",
      )}
      reasoning={[
        tt("Match first. Each measure says what it changes in the customer. Choose the ones that act on a need that appears in your own tally, not the ones that are easiest to run.", "Erst zuordnen. Jede Maßnahme sagt, was sie im Kunden verändert. Wählen Sie die, die auf ein Bedürfnis wirken, das in Ihrer eigenen Strichliste vorkommt, nicht die, die am leichtesten umzusetzen sind."),
        RULES.effect,
        RULES.acceptance,
        RULES.scale,
        tt("Score = effect × acceptance × scalability, from 1 to 27. A 1 in any factor pulls it down hard. Compare the products, and check that the plan's costs, with the loyalty concept, add up to no more than the budget.", "Wert = Wirkung × Akzeptanz × Skalierbarkeit, von 1 bis 27. Eine 1 in einem Faktor zieht ihn stark nach unten. Vergleichen Sie die Produkte und prüfen Sie, dass die Kosten des Plans samt Loyalty-Konzept nicht mehr als das Budget ergeben."),
        tt("If the measures and the concept together cost more than the budget, leave out the measure with the lowest score. Do not shave every measure a little.", "Wenn die Maßnahmen und das Konzept zusammen mehr als das Budget kosten, lassen Sie die Maßnahme mit dem niedrigsten Wert weg. Kürzen Sie nicht jede Maßnahme ein wenig."),
        tt("A discount or a newsletter to everyone answers none of the six needs in the evidence. It scores high on acceptance and scalability and low on effect. Look at your tally first.", "Ein Rabatt oder ein Newsletter an alle beantwortet keines der sechs Bedürfnisse in den Belegen. Er erreicht hohe Werte bei Akzeptanz und Skalierbarkeit und einen niedrigen bei der Wirkung. Sehen Sie zuerst auf Ihre Strichliste."),
        tt("Check coverage: a need is covered when at least one chosen measure acts on it. A need that no measure reaches may be reached by the loyalty concept.", "Prüfen Sie die Abdeckung: Ein Bedürfnis ist abgedeckt, wenn mindestens eine gewählte Maßnahme darauf wirkt. Ein Bedürfnis, das keine Maßnahme erreicht, kann vom Loyalty-Konzept erreicht werden."),
        tt("Loyalty concept: the type must be the type of at least one of your benefits; at most one of two benefits may be money; customers join by an opt-in; and what a member gets should grow with the years.", "Loyalty-Konzept: Der Typ muss der Typ mindestens eines Ihrer Vorteile sein; höchstens einer von zwei Vorteilen darf Geld sein; Kunden treten durch ein Opt-in bei; und was ein Mitglied bekommt, sollte mit den Jahren wachsen."),
        tt("Influence is not manipulation. Three tests before a measure is used: is it true, could the customer check it, would the customer feel respected if they saw exactly what you do and what data you use?", "Einflussnahme ist nicht Manipulation. Drei Tests, bevor eine Maßnahme genutzt wird: Ist sie wahr, könnte der Kunde sie prüfen, würde sich der Kunde respektiert fühlen, wenn er genau sähe, was Sie tun und welche Daten Sie nutzen?"),
      ]}
      sources={["cialdini2021", "uwg5", "planet2019", "gdpr2016", "thaler2008"]}
    >
      <DataTable
        head={[tt("Need", "Bedürfnis"), tt("What answers it", "Was es beantwortet"), tt("What does not", "Was nicht")]}
        rows={NEED_IDS.map((id) => [NEEDS[id].label, NEEDS[id].answeredBy, NEEDS[id].notAnsweredBy])}
        caption={tt("Matching a measure to a need", "Eine Maßnahme einem Bedürfnis zuordnen")}
      />
      <Diagram
        label={tt("Scoring three measures · a worked example on Brenner Netzwerke", "Drei Maßnahmen bewerten · ein durchgerechnetes Beispiel an Brenner Netzwerke")}
        caption={tt("Brenner has €100,000 and six months. Change an effect or an acceptance score, or leave a measure out of the plan.", `Brenner hat ${euro(100000)} und sechs Monate. Ändern Sie eine Wirkung oder einen Akzeptanz-Wert oder lassen Sie eine Maßnahme aus dem Plan.`)}
      >
        <ScoreExample />
      </Diagram>
      <DataTable
        head={[tt("Factor", "Faktor"), "3", "2", "1"]}
        rows={[
          [
            tt("Effect (judged)", "Wirkung (beurteilt)"),
            tt("The need appears in 3 or more touchpoints and the measure reaches most customers", "Das Bedürfnis kommt in 3 oder mehr Touchpoints vor, und die Maßnahme erreicht die meisten Kunden"),
            tt("The need appears in 2 touchpoints, or it reaches only part of the customers", "Das Bedürfnis kommt in 2 Touchpoints vor, oder sie erreicht nur einen Teil der Kunden"),
            tt("The need appears in 1 touchpoint or none, or the measure acts on none", "Das Bedürfnis kommt in 1 Touchpoint oder keinem vor, oder die Maßnahme wirkt auf keines"),
          ],
          [
            tt("Acceptance (capped by data)", "Akzeptanz (durch Daten gedeckelt)"),
            tt("No customer data, or only facts given under the contract", "Keine Kundendaten oder nur Angaben, die im Rahmen des Vertrags gegeben wurden"),
            tt("Usage data only for customers who agreed to share it", "Nutzungsdaten nur von Kunden, die der Weitergabe zugestimmt haben"),
            tt("Data the customers have not agreed to share for this purpose", "Daten, deren Weitergabe für diesen Zweck die Kunden nicht zugestimmt haben"),
          ],
          [
            tt("Scalability (from the effort)", "Skalierbarkeit (aus dem Aufwand)"),
            tt("Nothing more once it is built", "Nichts mehr, sobald sie gebaut ist"),
            tt("A small standard step for every additional customer", "Ein kleiner Standardschritt für jeden zusätzlichen Kunden"),
            tt("A person's time for every additional customer", "Die Zeit eines Menschen für jeden zusätzlichen Kunden"),
          ],
        ]}
        caption={tt("The three scores", "Die drei Werte")}
      />
      <Diagram
        label={tt("A loyalty concept in four tests · a worked example on Brenner Netzwerke", "Ein Loyalty-Konzept in vier Tests · ein durchgerechnetes Beispiel an Brenner Netzwerke")}
        caption={tt("Choose two benefits. The type, the benefit test and the cost update as you choose.", "Wählen Sie zwei Vorteile. Der Typ, der Vorteils-Test und die Kosten aktualisieren sich bei Ihrer Wahl.")}
      >
        <LoyaltyExample />
      </Diagram>
      <Callout label={tt("Influence is not manipulation: three tests", "Einflussnahme ist nicht Manipulation: drei Tests")} tone="rust">
        <ol className="list-decimal space-y-1 pl-5">
          <li>{tt("Is it true? A limit that is not real, or a reference that does not exist, is a misleading claim (§ 5 UWG).", "Ist es wahr? Eine Grenze, die nicht echt ist, oder eine Referenz, die nicht existiert, ist eine irreführende Angabe (§ 5 UWG).")}</li>
          <li>{tt("Could the customer check it? A claim the customer can verify builds trust; one they cannot is a demand for faith.", "Könnte der Kunde es prüfen? Eine Aussage, die der Kunde verifizieren kann, schafft Vertrauen; eine, die er nicht kann, ist eine Forderung nach Glauben.")}</li>
          <li>{tt("Would the customer feel respected if they saw exactly what you do and which of their data you use? If not, it is pressure, not help.", "Würde sich der Kunde respektiert fühlen, wenn er genau sähe, was Sie tun und welche seiner Daten Sie nutzen? Wenn nicht, ist es Druck, keine Hilfe.")}</li>
        </ol>
      </Callout>
      <p className="text-caption text-ash">
        {tt(
          "Consent is part of the design, not a form at the end. A customer who joins by choice, with a clear reason, is also the customer whose data you may use for the benefits. A measure that needs data from customers who never agreed does not become acceptable by a good idea: its acceptance is capped at 1.",
          "Die Einwilligung ist Teil des Entwurfs, kein Formular am Ende. Ein Kunde, der aus freier Wahl mit klarem Grund beitritt, ist auch der Kunde, dessen Daten Sie für die Vorteile nutzen dürfen. Eine Maßnahme, die Daten von Kunden braucht, die nie zugestimmt haben, wird durch eine gute Idee nicht akzeptabel: Ihre Akzeptanz ist auf 1 gedeckelt.",
        )}
      </p>
    </MaterialCard>
  );
}

export const CARDS_A = [CardA1, CardA2, CardA3, CardA4, CardA5, CardA6, CardA7];
