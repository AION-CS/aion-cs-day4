"use client";

import { Block31, Block32, Block33, Block34, Block35, Block36, Block37 } from "@/components/task2/Blocks";
import { MemoPanel } from "@/components/task2/MemoPanel";
import { ExportBar } from "@/components/ui/ExportBar";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { Callout } from "@/components/ui/MaterialCard";
import { NEEDS } from "@/data/needs";
import { MEASURE_BY_ID } from "@/data/measures";
import { R2_BUDGET, R2_MONTHS } from "@/data/route2";
import { Gloss } from "@/lib/glossify";
import { euro, tt } from "@/lib/lang";
import { memoBody } from "@/lib/exportDoc";
import { r2Missing } from "@/lib/missing";
import { BLOCK_MINUTES, TASK2_MINUTES } from "@/lib/routes";
import { exportName } from "@/lib/slug";
import { useJumpTo } from "@/lib/useJumpTo";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated } from "@/store/useStore";

/** The situation of Route 2, stated once, directly above the task, with a soft pointer to the learner's own Route 1 answers. */
function CaseBrief() {
  const hydrated = useHydrated();
  const p = usePersisted();
  const jump = useJumpTo();
  const named = p.l1.patterns.filter((x) => x.need).map((x) => NEEDS[x.need!].short);
  const chosen = p.l1.chosen.map((id) => MEASURE_BY_ID[id].name);
  const has = hydrated && (named.length > 0 || chosen.length > 0);
  return (
    <section id="task-2" aria-labelledby="task2-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="task2-h">{tt("The situation: you are the Chief Customer Officer", "Die Lage: Sie sind der Chief Customer Officer")}</h2>
        <span className="smallcaps">{tt("Read once · about 4 min", "Einmal lesen · etwa 4 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt(
            "Six months ago CloudTech Solutions GmbH acted on what it could see. You now own the whole customer strategy across marketing and sales, and the board wants a long-term plan, not another campaign. Competition is strong and retention is weak. The offers are interchangeable. The budget is limited, data protection sets hard limits, and customer behaviour is not fully transparent.",
            "Vor sechs Monaten hat die CloudTech Solutions GmbH auf das gehandelt, was sie sehen konnte. Sie verantworten jetzt die gesamte Kundenstrategie über Marketing und Vertrieb hinweg, und das Board will einen langfristigen Plan, keine weitere Kampagne. Der Wettbewerb ist stark und die Retention schwach. Die Angebote sind austauschbar. Das Budget ist begrenzt, der Datenschutz setzt harte Grenzen, und das Kundenverhalten ist nicht vollständig transparent.",
          )}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              Budget: <strong>{euro(R2_BUDGET)}</strong> {tt("(Case assumption)", "(Case-Annahme)")}
            </li>
            <li>
              {tt("Time:", "Zeit:")} <strong>{R2_MONTHS} {tt("months", "Monate")}</strong>
            </li>
            <li>{tt("Data protection: what customers agreed to limits what you may use. Baselines for the tripwire are printed in Block 3.7.", "Datenschutz: Was Kunden zugestimmt haben, begrenzt, was Sie nutzen dürfen. Die Baselines für den Tripwire stehen in Block 3.7.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption md:col-span-2">
          <p className="smallcaps">{tt("What you build", "Was Sie bauen")} · {tt("about", "etwa")} {TASK2_MINUTES} {tt("min", "Min.")}</p>
          <ol className="mt-1 grid list-decimal gap-x-6 pl-4 text-ink sm:grid-cols-2">
            <li>{tt("A target vision", "Eine Zielvision")}</li>
            <li>{tt("The levers of emotion, trust and relevance", "Die Hebel Emotion, Vertrauen und Relevanz")}</li>
            <li>{tt("How far to personalise each group", "Wie weit jede Gruppe personalisiert wird")}</li>
            <li>{tt("A loyalty system that is not just bonuses", "Ein Loyalty-System, das mehr ist als Boni")}</li>
            <li>{tt("The risk of over-personalising", "Das Risiko der Über-Personalisierung")}</li>
            <li>{tt("An implementation architecture", "Eine Architektur für die Umsetzung")}</li>
            <li>{tt("A decision although the data is unclear", "Eine Entscheidung, obwohl die Datenlage unklar ist")}</li>
          </ol>
        </div>
      </div>
      <div role="note" className="rounded-lg border border-gold bg-accentSoft p-3 text-caption text-ink" id="task1-quote">
        <p className="smallcaps text-accent">{tt("Where Route 1 left off · your own answers", "Wo Route 1 stehen geblieben ist · Ihre eigenen Antworten")}</p>
        {has ? (
          <p className="mt-1">
            {tt("Needs you named:", "Bedürfnisse, die Sie genannt haben:")} <strong>{named.join(", ") || tt("none yet", "noch keine")}</strong>. {tt("Measures you chose:", "Maßnahmen, die Sie gewählt haben:")} <strong>{chosen.join(", ") || tt("none yet", "noch keine")}</strong>.
          </p>
        ) : (
          <p className="mt-1">{tt("You have not answered Route 1 yet. That is fine: nothing here is blocked, and this box fills in when you do.", "Sie haben Route 1 noch nicht beantwortet. Das ist in Ordnung: Nichts hier ist gesperrt, und dieses Feld füllt sich, sobald Sie antworten.")}</p>
        )}
        <button type="button" onClick={() => jump("block-2-2", "/route-1/")} className="btn-ghost btn-sm mt-2">
          {tt("Go to Block 2.2 in Route 1", "Zu Block 2.2 in Route 1")}
        </button>
      </div>
      <Callout label={tt("Case assumption", "Case-Annahme")} tone="amber">
        <p>
          {tt(
            "The brief gives the role and the situation: strong competition, weak retention, interchangeable offers, a limited budget, data protection restrictions, customer behaviour not fully transparent, and the requirement to decide anyway. The budget figure, the costs, the baselines, the groups and the levels are made up for this exercise.",
            "Der Auftrag gibt die Rolle und die Lage vor: starker Wettbewerb, schwache Retention, austauschbare Angebote, ein begrenztes Budget, Einschränkungen durch den Datenschutz, nicht voll transparentes Kundenverhalten und die Vorgabe, trotzdem zu entscheiden. Die Budgetzahl, die Kosten, die Baselines, die Gruppen und die Stufen sind für diese Übung erfunden.",
          )}
        </p>
      </Callout>
    </section>
  );
}

export function Task2() {
  const p = usePersisted();
  const missing = r2Missing(p);
  const filename = exportName(p.participant.name, "l3-strategy-memo");
  return (
    <div className="space-y-6">
      <CaseBrief />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
        <div className="min-w-0 space-y-6 pb-14 lg:pb-0">
          <Block31 />
          <OptionalSection
            id="block-3-2"
            title={tt("Block 3.2 · Define the three behaviour levers: emotion, trust, relevance", "Block 3.2 · Die drei Verhaltenshebel definieren: Emotion, Vertrauen, Relevanz")}
            minutes={BLOCK_MINUTES["3.2"]}
            reason={tt("Deepens the vision from Block 3.1 into three named levers; the loyalty system in Block 3.4 does not require it.", "Vertieft die Vision aus Block 3.1 zu drei benannten Hebeln; das Loyalty-System in Block 3.4 setzt es nicht voraus.")}
          >
            <Block32 />
          </OptionalSection>
          <OptionalSection
            id="block-3-3"
            title={tt("Block 3.3 · Weigh personalisation against effort and data protection", "Block 3.3 · Personalisierung gegen Aufwand und Datenschutz abwägen")}
            minutes={BLOCK_MINUTES["3.3"]}
            reason={tt("How far to personalise each group; a separate design question from the loyalty system itself.", "Wie weit jede Gruppe personalisiert wird; eine eigene Designfrage, getrennt vom Loyalty-System selbst.")}
          >
            <Block33 />
          </OptionalSection>
          <Block34 />
          <OptionalSection
            id="block-3-5"
            title={tt("Block 3.5 · Risk analysis: what if we misjudge the customer?", "Block 3.5 · Risikoanalyse: was, wenn wir den Kunden falsch einschätzen?")}
            minutes={BLOCK_MINUTES["3.5"]}
            reason={tt("A closer look at what could go wrong with the system from Block 3.4; the decision in Block 3.7 does not require it.", "Ein genauerer Blick darauf, was am System aus Block 3.4 schiefgehen könnte; die Entscheidung in Block 3.7 setzt es nicht voraus.")}
          >
            <Block35 />
          </OptionalSection>
          <OptionalSection
            id="block-3-6"
            title={tt("Block 3.6 · The implementation architecture: fund, sequence, own", "Block 3.6 · Die Umsetzungsarchitektur: finanzieren, sequenzieren, verantworten")}
            minutes={BLOCK_MINUTES["3.6"]}
            reason={tt("Turns the chosen system into a funded, scheduled plan; the decision in Block 3.7 can still be made and defended without it.", "Macht aus dem gewählten System einen finanzierten, terminierten Plan; die Entscheidung in Block 3.7 lässt sich auch ohne es treffen und begründen.")}
          >
            <Block36 />
          </OptionalSection>
          <Block37 />
          <ExportBar id="export-l3" previewTitle={tt("Preview of your memo", "Vorschau Ihres Memos")} exportLabel={tt("Export the Strategy Memo", "Strategy Memo exportieren")} docTitle="Strategy Memo" filename={filename} missing={missing} buildBody={() => memoBody(p)} showPreview={false} />
        </div>
        <MemoPanel />
      </div>
    </div>
  );
}
