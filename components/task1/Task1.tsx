"use client";

import { ExportBar } from "@/components/ui/ExportBar";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { Block11, Block12, Block13, Block14, Block15 } from "@/components/task1/Part1";
import { Block21, Block22, Block23, Block24 } from "@/components/task1/Part2";
import { Callout } from "@/components/ui/MaterialCard";
import { BUDGET, MONTHS } from "@/data/measures";
import { retentionBody } from "@/lib/exportDoc";
import { l1Missing } from "@/lib/missing";
import { BLOCK_MINUTES } from "@/lib/routes";
import { euro, tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { usePersisted } from "@/store/usePersisted";
import { Gloss } from "@/lib/glossify";
import { TASK1_MINUTES } from "@/lib/routes";

/** The case, stated once, directly above the task. */
function CaseBrief() {
  return (
    <section id="case-brief" aria-labelledby="case-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case-h">{tt("The case: CloudTech Solutions GmbH", "Der Fall: CloudTech Solutions GmbH")}</h2>
        <span className="smallcaps">{tt("Read once · about 5 min", "Einmal lesen · etwa 5 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt(
            "CloudTech Solutions GmbH is a German provider of cloud hosting, backup and managed IT for Mittelstand (mid-sized) companies, with about 1,500 customers on annual contracts. Its problems are easy to say and hard to fix: customer retention is low, its offers look interchangeable, and there is little that sets CloudTech apart. Three competitors sell technically the same service at similar prices, and customers compare prices at every renewal. Data protection is critical: what CloudTech may do with customer data is limited by what customers have agreed to.",
            "Die CloudTech Solutions GmbH ist ein deutscher Anbieter von Cloud-Hosting, Backup und Managed IT für Mittelstandsunternehmen (mittelgroße Unternehmen) mit etwa 1.500 Kunden auf Jahresverträgen. Ihre Probleme sind leicht gesagt und schwer zu lösen: Die Retention ist niedrig, die Angebote wirken austauschbar, und es gibt wenig, was CloudTech abhebt. Drei Wettbewerber verkaufen technisch denselben Service zu ähnlichen Preisen, und Kunden vergleichen bei jedem Renewal die Preise. Der Datenschutz ist kritisch: Was CloudTech mit Kundendaten tun darf, ist dadurch begrenzt, wozu die Kunden zugestimmt haben.",
          )}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("What you have", "Was Sie haben")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt("Eight things customers said about why a competitor felt more attractive (Block 1.1) and eight lines from sales material (Block 1.2).", "Acht Aussagen von Kunden dazu, warum ein Wettbewerber attraktiver wirkte (Block 1.1), und acht Zeilen aus Vertriebsmaterial (Block 1.2).")}</li>
            <li>{tt("The customer base and three measures with their figures (Block 1.4).", "Die Kundenbasis und drei Maßnahmen mit ihren Zahlen (Block 1.4).")}</li>
            <li>{tt("Twelve touchpoints of CloudTech's customer journey (Block 2.1), nine measures (Block 2.3) and a menu of loyalty benefits (Block 2.4).", "Zwölf Touchpoints der Customer Journey von CloudTech (Block 2.1), neun Maßnahmen (Block 2.3) und eine Auswahl an Loyalty-Vorteilen (Block 2.4).")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              Budget: <strong>{euro(BUDGET)}</strong> {tt("for the three measures and the loyalty concept together", "für die drei Maßnahmen und das Loyalty-Konzept zusammen")}
            </li>
            <li>
              {tt("Time:", "Zeit:")} <strong>{MONTHS} {tt("months", "Monate")}</strong> {tt("(about 26 weeks)", "(etwa 26 Wochen)")}
            </li>
            <li>{tt("Data protection is critical: the data a measure uses is printed on each measure in Block 2.3.", "Der Datenschutz ist kritisch: Die Daten, die eine Maßnahme nutzt, stehen in Block 2.3 bei jeder Maßnahme.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("How the task runs", "Wie die Aufgabe abläuft")} · {tt("about", "etwa")} {TASK1_MINUTES} {tt("min", "Min.")}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Understand the emotional effect: emotions, triggers, three approaches and a weighing of three measures (Level 1).", "Die emotionale Wirkung verstehen: Emotionen, Trigger, drei Ansätze und eine Abwägung dreier Maßnahmen (Level 1).")}</li>
            <li>{tt("Find the emotional weaknesses in the journey and name the four needs (Level 2).", "Die emotionalen Schwachstellen in der Journey finden und die vier Bedürfnisse benennen (Level 2).")}</li>
            <li>{tt("Choose three measures, design a loyalty concept and defend the order.", "Drei Maßnahmen wählen, ein Loyalty-Konzept entwerfen und die Reihenfolge begründen.")}</li>
          </ol>
        </div>
      </div>
      <Callout label={tt("Case assumption", "Case-Annahme")} tone="amber">
        <p>
          {tt(
            `The brief says: low retention, interchangeable offers, little differentiation, ${euro(BUDGET)}, six months, data protection critical. Everything else is made up for this exercise: the customers' words, the touchpoints, the figures, the costs and the competitor names. They are labelled where you meet them.`,
            `Der Auftrag sagt: niedrige Retention, austauschbare Angebote, wenig Differenzierung, ${euro(BUDGET)}, sechs Monate, Datenschutz kritisch. Alles andere ist für diese Übung erfunden: die Worte der Kunden, die Touchpoints, die Zahlen, die Kosten und die Namen der Wettbewerber. Sie sind dort gekennzeichnet, wo Sie ihnen begegnen.`,
          )}
        </p>
      </Callout>
    </section>
  );
}

function PartHeading({ id, n, title, level }: { id: string; n: number; title: string; level: string }) {
  return (
    <div id={id} className="flex flex-wrap items-baseline gap-x-3 border-b-2 border-ink pb-1 pt-2">
      <span className="smallcaps text-accent">{tt("Part", "Teil")} {n}</span>
      <h2>{title}</h2>
      <span className="smallcaps ml-auto">{level}</span>
    </div>
  );
}

export function Task1() {
  const p = usePersisted();
  const missing = l1Missing(p);
  const filename = exportName(p.participant.name, "l1l2-retention-plan");
  return (
    <section id="task-1" aria-labelledby="task1-h" className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">Task 1 · {tt("about", "etwa")} {TASK1_MINUTES} {tt("minutes", "Minuten")}</p>
        <h2 id="task1-h">{tt("Retention Plan: from an interchangeable offer to three measures and a loyalty concept", "Retention Plan: von einem austauschbaren Angebot zu drei Maßnahmen und einem Loyalty-Konzept")}</h2>
      </header>
      <CaseBrief />

      <PartHeading id="part-1" n={1} title={tt("Understand the emotional effect", "Die emotionale Wirkung verstehen")} level={tt("Level 1 · Knowledge", "Level 1 · Wissen")} />
      <Block11 />
      <OptionalSection
        id="block-1-2"
        title={tt("Block 1.2 · Name the trigger, and what you would not send", "Block 1.2 · Den Trigger benennen, und was Sie nicht versenden würden")}
        minutes={BLOCK_MINUTES["1.2"]}
        reason={tt("Sales-ethics side note on triggers; Block 1.1 already covers the emotion reading the plan needs.", "Randthema zur Ethik von Triggern; Block 1.1 deckt das für den Plan nötige Lesen von Emotionen schon ab.")}
      >
        <Block12 />
      </OptionalSection>
      <OptionalSection
        id="block-1-3"
        title={tt("Block 1.3 · Three approaches", "Block 1.3 · Drei Ansätze")}
        minutes={BLOCK_MINUTES["1.3"]}
        reason={tt("Practises the same four emotions in your own words; Block 1.1 already teaches the core skill.", "Übt dieselben vier Emotionen in eigenen Worten; Block 1.1 vermittelt die Kernfertigkeit bereits.")}
      >
        <Block13 />
      </OptionalSection>
      <Block14 />
      <OptionalSection
        id="block-1-5"
        title={tt("Block 1.5 · Coaching reflection", "Block 1.5 · Coaching-Reflexion")}
        minutes={BLOCK_MINUTES["1.5"]}
        reason={tt("A reflective bridge between Level 1 and Level 2, not content the Retention Plan itself needs.", "Eine reflektierende Brücke zwischen Level 1 und Level 2, kein Inhalt, den der Retention Plan selbst braucht.")}
      >
        <Block15 />
      </OptionalSection>

      <PartHeading id="part-2" n={2} title={tt("Analyse and act", "Analysieren und handeln")} level={tt("Level 2 · Application", "Level 2 · Anwendung")} />
      <Block21 />
      <OptionalSection
        id="block-2-2"
        title={tt("Block 2.2 · Four needs, their strength, what is missing", "Block 2.2 · Vier Bedürfnisse, ihre Stärke, was fehlt")}
        minutes={BLOCK_MINUTES["2.2"]}
        reason={tt("Elaborates Block 2.1's tally into named, rated needs; 2.1's diagnosis is the part the plan needs.", "Vertieft die Strichliste aus Block 2.1 zu benannten, bewerteten Bedürfnissen; die Diagnose aus 2.1 ist der Teil, den der Plan braucht.")}
      >
        <Block22 />
      </OptionalSection>
      <OptionalSection
        id="block-2-3"
        title={tt("Block 2.3 · Three measures, scored and ordered", "Block 2.3 · Drei Maßnahmen, bewertet und geordnet")}
        minutes={BLOCK_MINUTES["2.3"]}
        reason={tt("The full scored measure-choice; Block 1.4 already drills the same weighing method on a smaller set.", "Die vollständige, bewertete Maßnahmenwahl; Block 1.4 übt dieselbe Abwägungsmethode bereits an einer kleineren Auswahl.")}
      >
        <Block23 />
      </OptionalSection>
      <Block24 />

      <ExportBar
        id="export-l1l2"
        previewTitle={tt("Preview of your Retention Plan", "Vorschau Ihres Retention Plans")}
        exportLabel={tt("Export the Retention Plan", "Retention Plan exportieren")}
        docTitle="Retention Plan"
        filename={filename}
        missing={missing}
        buildBody={() => retentionBody(p)}
      />
    </section>
  );
}
