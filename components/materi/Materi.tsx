"use client";

import { CARDS_A } from "@/components/materi/CardsA";
import { CARDS_B } from "@/components/materi/CardsB";
import { ReferencesAccordion } from "@/components/ui/ReferencesAccordion";
import { SECTIONS } from "@/data/materialIndex";
import type { RefKey } from "@/data/references";
import { tt } from "@/lib/lang";

/** The material block of a route: one continuous run of study cards, then the block's own reference list. */

const REFS_A: RefKey[] = [
  "kahneman2011",
  "damasio1994",
  "zajonc1980",
  "plassmann2012",
  "ariely2010",
  "poldrack2006",
  "baumeister1995",
  "han2010",
  "mayer1995",
  "kahneman1979",
  "webster1972",
  "cialdini2021",
  "worchel1975",
  "goldstein2008",
  "brehm1966",
  "uwg5",
  "awad2006",
  "aguirre2015",
  "white2008",
  "gdpr2016",
  "planet2019",
  "edpb2020",
  "wp251",
  "dowling1997",
  "kumar2004",
  "nunes2006",
  "kivetz2006",
  "bolton2000",
  "rauyruen2007",
  "vargo2004",
  "bitner1990",
  "lemon2016",
  "nisbett1977",
  "thaler2008",
];
const REFS_B: RefKey[] = [
  "thaler2008",
  "meadows1999",
  "kahneman2011",
  "kahneman1979",
  "rauyruen2007",
  "brehm1966",
  "awad2006",
  "aguirre2015",
  "white2008",
  "gdpr2016",
  "edpb2020",
  "wp251",
  "uwg5",
  "dowling1997",
  "kumar2004",
  "vargo2004",
  "bolton2000",
  "knight1921",
  "klein2007",
  "loomes1982",
  "kaplan1992",
  "doran1981",
  "deming1986",
];

function Block({ id, title, intro, children }: { id: string; title: string; intro: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="space-y-4">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{title}</p>
        <h2 id={`${id}-h`}>{intro}</h2>
      </header>
      {children}
    </section>
  );
}

export function MateriA() {
  const s = SECTIONS[1][0];
  return (
    <Block id={s.id} title={tt(`Materi A · ${s.minutes} minutes, facilitator-led`, `Materi A · ${s.minutes} Minuten, moderiert`)} intro={tt("Emotion, targeting and loyalty: how the brain buys, what customers feel, which triggers move a decision, what personalisation may use, and how to build loyalty that lasts", "Emotion, Targeting und Loyalität: wie das Gehirn kauft, was Kunden fühlen, welche Trigger eine Entscheidung bewegen, was Personalisierung nutzen darf und wie man Loyalität aufbaut, die hält")}>
      <p className="max-w-prose text-body text-ash">
        {tt(
          "Seven cards, Level 1 and Level 2 in one run: knowledge first (the brain, four emotions, three triggers, behavioural targeting, loyalty programmes), then application (reading a sales process, choosing measures and a loyalty concept). Every diagram uses another company, Brenner Netzwerke, so the task is never answered for you.",
          "Sieben Karten, Level 1 und Level 2 in einem Durchgang: erst das Wissen (das Gehirn, vier Emotionen, drei Trigger, Behavioral Targeting, Loyalty-Programme), dann die Anwendung (einen Vertriebsprozess lesen, Maßnahmen und ein Loyalty-Konzept wählen). Jedes Diagramm nutzt ein anderes Unternehmen, Brenner Netzwerke, damit die Aufgabe nie für Sie beantwortet wird.",
        )}
      </p>
      {CARDS_A.map((C, i) => (
        <C key={i} />
      ))}
      <ReferencesAccordion block="A" keys={REFS_A} note={tt("Check every source before you teach from it: page numbers and editions differ between printings, and the legal texts are quoted in outline.", "Prüfen Sie jede Quelle, bevor Sie daraus unterrichten: Seitenzahlen und Auflagen unterscheiden sich zwischen den Ausgaben, und die Rechtstexte sind nur im Umriss zitiert.")} />
    </Block>
  );
}

export function MateriB() {
  const s = SECTIONS[2][0];
  return (
    <Block id={s.id} title={tt(`Materi B · ${s.minutes} minutes, facilitator-led`, `Materi B · ${s.minutes} Minuten, moderiert`)} intro={tt("Managing behaviour as a system: levers, how far to personalise, a loyalty system, the risk of being wrong, and the architecture and the decision that carry it", "Verhalten als System steuern: Hebel, wie weit man personalisiert, ein Loyalty-System, das Risiko, falsch zu liegen, und die Architektur und die Entscheidung, die es tragen")}>
      <p className="max-w-prose text-body text-ash">
        {tt(
          "Six cards for Level 3. You stop choosing measures and start designing conditions for every customer. Each card ends in rules the task uses; each diagram uses Brenner Netzwerke, another provider.",
          "Sechs Karten für Level 3. Sie hören auf, Maßnahmen zu wählen, und beginnen, Bedingungen für jeden Kunden zu gestalten. Jede Karte endet in Regeln, die die Aufgabe nutzt; jedes Diagramm nutzt Brenner Netzwerke, einen anderen Anbieter.",
        )}
      </p>
      {CARDS_B.map((C, i) => (
        <C key={i} />
      ))}
      <ReferencesAccordion block="B" keys={REFS_B} note={tt("Check every source before you teach from it: page numbers and editions differ between printings, and the legal texts are quoted in outline.", "Prüfen Sie jede Quelle, bevor Sie daraus unterrichten: Seitenzahlen und Auflagen unterscheiden sich zwischen den Ausgaben, und die Rechtstexte sind nur im Umriss zitiert.")} />
    </Block>
  );
}
