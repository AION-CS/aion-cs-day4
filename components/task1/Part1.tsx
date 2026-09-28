"use client";

import clsx from "clsx";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { CalcDiagnosis } from "@/components/ui/CalcDiagnosis";
import { Field } from "@/components/ui/Field";
import { FormulaBuilder } from "@/components/ui/FormulaBuilder";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { CheckBar, OptionList, Reading, TextBox } from "@/components/ui/Inputs";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { PlacementBoard } from "@/components/ui/PlacementBoard";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { APPROACH_COUNT, APPROACH_EMOTIONS, APPROACH_TXT, APPROACH_MIN, APPROACH_TRIGGER_OPTIONS, hasBecause } from "@/data/approaches";
import { BASE, FIGURES, FIGURE_IDS, LETTERS, MEASURES_L1, RISK_CLUES, RISK_PICKS, RISK_TRUTH } from "@/data/custBase";
import type { FigureId, MeasureLetter, RiskPickId } from "@/data/custBase";
import { FEELINGS } from "@/data/feelings";
import type { FeelingId } from "@/data/feelings";
import { EMOTION_IDS, EMOTION_PAIR_TESTS, NEEDS } from "@/data/needs";
import type { EmotionId } from "@/data/needs";
import { HONESTY_TESTS, LINES, TRIGGERS, TRIGGER_PAIR_TESTS, TRIGGER_TESTS } from "@/data/triggers";
import type { LineId, TriggerId } from "@/data/triggers";
import { FIGURE_BUILDERS, figurePartFlags, partKey } from "@/lib/calcBuilder";
import { citesCalcFigure, figMatches, noSendHolds, sortHolds, trigHolds } from "@/lib/checks";
import { scrollToAndFlash } from "@/lib/flash";
import { Gloss } from "@/lib/glossify";
import { IDS } from "@/lib/missing";
import { euro, num, tt } from "@/lib/lang";
import { approachGuide, extraFactorGuide, figureGuide, reflectGuide, sentenceGuide } from "@/lib/mentorGuide";
import { feelingKey, noSendKey, riskPickKey, triggerKey } from "@/lib/answerKey";
import { MIN_LINE, MIN_SENTENCE } from "@/lib/progress";
import { BLOCK_MINUTES } from "@/lib/routes";
import { useStore } from "@/store/useStore";

const emotionHint = (e: EmotionId): string =>
  ({
    security: tt("Protected from a bad outcome, or from blame.", "Vor einem schlechten Ausgang oder vor Schuldzuweisung geschützt."),
    trust: tt("Can rely on the provider's word and people.", "Sich auf das Wort und die Menschen des Anbieters verlassen können."),
    status: tt("How the customer, or the choice, is seen by others.", "Wie der Kunde oder die Wahl von anderen gesehen wird."),
    belonging: tt("Among others like them; not alone with the problem.", "Unter Gleichgesinnten; nicht allein mit dem Problem."),
  })[e];

/* ------------------------------------------------------------------ Block 1.1 */

export function Block11() {
  const l1 = useStore((s) => s.l1);
  const place = useStore((s) => s.placeFeeling);
  const undo = useStore((s) => s.undoSort);
  const redo = useStore((s) => s.redoSort);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  return (
    <AnswerBlock
      id="block-1-1"
      title={tt("Block 1.1 · Sort what customers feel", "Block 1.1 · Einordnen, was Kunden fühlen")}
      kind="OBJECTIVE"
      minutes={BLOCK_MINUTES["1.1"]}
      core={true}
      findIt={tt("Route 1 → Task 1 → “What customers told us” in the case above. The eight statements are customers' own words about why a competitor's offer felt more attractive. Answer on the sort board below.", "Route 1 → Task 1 → „Was Kunden uns gesagt haben“ im Fall oben. Die acht Aussagen sind eigene Worte von Kunden dazu, warum das Angebot eines Wettbewerbers attraktiver wirkte. Antworten Sie auf dem Sortierbrett unten.")}
    >
      <MaterialRefs refs={["A2"]} />
      <PlacementBoard<EmotionId>
        items={FEELINGS.map((f, i) => ({ id: f.id, meta: `${tt("Statement", "Aussage")} ${i + 1}`, text: tt(`“${f.quote}”`, `„${f.quote}“`) }))}
        bins={EMOTION_IDS.map((e) => ({ id: e, label: NEEDS[e].label, hint: emotionHint(e) }))}
        value={l1.sort}
        onPlace={(id, e) => place(id as FeelingId, e)}
        onUndo={undo}
        onRedo={redo}
        undoCount={l1.sortHistory.length}
        redoCount={l1.sortFuture.length}
        domId={IDS.feeling}
        clues={Object.fromEntries(FEELINGS.map((f) => [f.id, f.clue]))}
        reasons={Object.fromEntries(FEELINGS.map((f) => [f.id, f.why]))}
        keyPhrases={Object.fromEntries(FEELINGS.map((f) => [f.id, f.key]))}
        result={l1.sortResult}
        checks={l1.sortChecks}
        onCheck={() => patch((s) => ({ checks: s.checks + 1, sortChecks: s.sortChecks + 1, sortResult: sortHolds(s.sort) }))}
        onClue={() => patch({ sortClue: true })}
        clueShown={l1.sortClue}
        reasoningOpened={l1.sortReasoning}
        onOpenReasoning={() => patch({ sortReasoning: true })}
        noun={tt("statement", "Aussage")}
        binCols={2}
        intro={tt("Drag a statement into a bin, or select it and then select a bin. Select a placed one to move it again.", "Ziehen Sie eine Aussage in ein Fach, oder wählen Sie sie und dann ein Fach. Wählen Sie eine bereits platzierte, um sie erneut zu verschieben.")}
        tests={
          <RevealHint id="sort-tests" label={tt("Show the test questions", "Testfragen anzeigen")} title={tt("Test questions · taught in Materi A2", "Testfragen · vermittelt in Materi A2")} forceOpen={true}>
            <div className="space-y-2 text-caption text-ink">
              <p>{tt("Ask these of every statement. They repeat the tests from Materi A2; they never say which statement goes where.", "Stellen Sie diese Fragen zu jeder Aussage. Sie wiederholen die Tests aus Materi A2; sie sagen nie, welche Aussage wohin gehört.")}</p>
              <ul className="space-y-1.5">
                {EMOTION_IDS.map((e) => (
                  <li key={e}>
                    <span className="font-semibold">{NEEDS[e].label}. </span>
                    <Gloss>{NEEDS[e].test}</Gloss>
                  </li>
                ))}
              </ul>
              <p className="smallcaps text-ash">{tt("When two emotions both seem to fit", "Wenn zwei Emotionen passen")}</p>
              <ul className="space-y-1.5">
                {EMOTION_PAIR_TESTS.map((t) => (
                  <li key={t.pair}>
                    <span className="font-semibold">{t.pair} </span>
                    <Gloss>{t.test}</Gloss>
                  </li>
                ))}
              </ul>
              <MaterialRefs refs={["A2"]} lead={tt("Taught in", "Vermittelt in")} />
            </div>
          </RevealHint>
        }
      />
      <TextBox
        id={IDS.extraFactor}
        label={tt("One emotional factor of your own that is not in the statements", "Ein eigener emotionaler Faktor, der nicht in den Aussagen steht")}
        help={tt("Think of one more thing that would make an IT provider's offer feel more attractive, and say which of the four emotions it serves. At least 30 characters.", "Überlegen Sie sich einen weiteren Punkt, der das Angebot eines IT-Anbieters attraktiver wirken ließe, und sagen Sie, welcher der vier Emotionen er dient. Mindestens 30 Zeichen.")}
        value={l1.extraFactor}
        onChange={(v) => patch({ extraFactor: v })}
        min={MIN_LINE}
        rows={2}
      />
      <ExampleAnswer id="extra-factor-example" guide={extraFactorGuide()} />
      {mentor && <MentorGuide guide={extraFactorGuide()} />}
      <p className="text-caption text-ash">
        {tt("Words in the statements, explained in plain language:", "Wörter in den Aussagen, in einfacher Sprache erklärt:")} <Gloss>{tt("data centre, restore time, liability, migration, forum, round table.", "Rechenzentrum, Wiederherstellungszeit, Haftung, Migration, Forum, Round Table.")}</Gloss>
      </p>
      <AnswerKey block={feelingKey()} />
      <BlockMissing block="1.1" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.2 */

export function Block12() {
  const l1 = useStore((s) => s.l1);
  const place = useStore((s) => s.placeLine);
  const undo = useStore((s) => s.undoTrig);
  const redo = useStore((s) => s.redoTrig);
  const patch = useStore((s) => s.patchL1);
  const toggle = (id: LineId) => patch((s) => ({ noSend: s.noSend.includes(id) ? s.noSend.filter((x) => x !== id) : [...s.noSend, id], noSendResult: null }));
  return (
    <AnswerBlock
      id="block-1-2"
      title={tt("Block 1.2 · Name the trigger, and say which lines you would not send", "Block 1.2 · Den Trigger benennen und sagen, welche Zeilen Sie nicht senden würden")}
      kind="OBJECTIVE + JUDGED"
      minutes={BLOCK_MINUTES["1.2"]}
      core={false}
      findIt={tt("Route 1 → Task 1 → “Eight lines from sales material” in the case above. Each line says where it appeared. Answer on the sort board, then in the list under it.", "Route 1 → Task 1 → „Acht Zeilen aus Vertriebsmaterial“ im Fall oben. Jede Zeile sagt, wo sie erschien. Antworten Sie auf dem Sortierbrett, dann in der Liste darunter.")}
    >
      <MaterialRefs refs={["A3"]} />
      <PlacementBoard<TriggerId>
        items={LINES.map((l, i) => ({ id: l.id, meta: `${tt("Line", "Zeile")} ${i + 1} · ${l.source}`, text: tt(`“${l.text}”`, `„${l.text}“`) }))}
        bins={TRIGGERS.map((t) => ({ id: t.id, label: t.label, hint: t.hint }))}
        value={l1.trig}
        onPlace={(id, t) => place(id as LineId, t)}
        onUndo={undo}
        onRedo={redo}
        undoCount={l1.trigHistory.length}
        redoCount={l1.trigFuture.length}
        domId={IDS.line}
        clues={Object.fromEntries(LINES.map((l) => [l.id, l.clue]))}
        reasons={Object.fromEntries(LINES.map((l) => [l.id, l.why]))}
        keyPhrases={Object.fromEntries(LINES.map((l) => [l.id, l.key]))}
        result={l1.trigResult}
        checks={l1.trigChecks}
        onCheck={() => patch((s) => ({ checks: s.checks + 1, trigChecks: s.trigChecks + 1, trigResult: trigHolds(s.trig) }))}
        onClue={() => patch({ trigClue: true })}
        clueShown={l1.trigClue}
        reasoningOpened={l1.trigReasoning}
        onOpenReasoning={() => patch({ trigReasoning: true })}
        noun={tt("line", "Zeile")}
        binCols={2}
        checkLabel={tt("Check my triggers", "Meine Trigger prüfen")}
        intro={tt("Drag a line into a bin, or select it and then select a bin. Tag the trigger the line uses, whether or not it is honest. Select a placed one to move it again.", "Ziehen Sie eine Zeile in ein Fach, oder wählen Sie sie und dann ein Fach. Ordnen Sie den Trigger zu, den die Zeile nutzt, ob er ehrlich ist oder nicht. Wählen Sie eine platzierte, um sie erneut zu verschieben.")}
        tests={
          <RevealHint id="trig-tests" label={tt("Show the test questions", "Testfragen anzeigen")} title={tt("Test questions · taught in Materi A3", "Testfragen · vermittelt in Materi A3")} forceOpen={true}>
            <div className="space-y-2 text-caption text-ink">
              <p>{tt("Ask the test of the trigger you suspect. They repeat the tests from Materi A3; they never say which line goes where.", "Stellen Sie die Testfrage des Triggers, den Sie vermuten. Sie wiederholen die Tests aus Materi A3; sie sagen nie, welche Zeile wohin gehört.")}</p>
              <ul className="space-y-1.5">
                {TRIGGER_TESTS.map((t) => (
                  <li key={t.id}>
                    <span className="font-semibold">{t.name}. </span>
                    <Gloss>{t.test}</Gloss>
                  </li>
                ))}
              </ul>
              <p className="smallcaps text-ash">{tt("When two seem to fit", "Wenn zwei zu passen scheinen")}</p>
              <ul className="space-y-1.5">
                {TRIGGER_PAIR_TESTS.map((t) => (
                  <li key={t.pair}>
                    <span className="font-semibold">{t.pair} </span>
                    <Gloss>{t.test}</Gloss>
                  </li>
                ))}
              </ul>
              <MaterialRefs refs={["A3"]} lead={tt("Taught in", "Vermittelt in")} />
            </div>
          </RevealHint>
        }
      />
      <AnswerKey block={triggerKey()} />

      <div id={IDS.noSend} className="space-y-2 border-t border-line pt-3">
        <p className="font-semibold text-ink">{tt("Which lines would you not send as they stand?", "Welche Zeilen würden Sie so nicht senden?")}</p>
        <p className="text-caption text-ash">
          <Gloss>{tt("A trigger is only fair if it passes three tests: it is true, the customer can check it, and the customer would feel respected if they saw why the line is written this way. Choose the lines that fail at least one of them.", "Ein Trigger ist nur fair, wenn er drei Tests besteht: Er ist wahr, der Kunde kann ihn prüfen, und der Kunde würde sich respektiert fühlen, wenn er sähe, warum die Zeile so geschrieben ist. Wählen Sie die Zeilen, die mindestens einen davon nicht bestehen.")}</Gloss>
        </p>
        <RevealHint id="honesty-tests" label={tt("Show the three tests", "Die drei Tests anzeigen")} title={tt("The three tests · taught in Materi A3", "Die drei Tests · vermittelt in Materi A3")}>
          <ul className="space-y-1.5 text-caption text-ink">
            {HONESTY_TESTS.map((t) => (
              <li key={t.name}>
                <span className="font-semibold">{t.name}. </span>
                <Gloss>{t.test}</Gloss>
              </li>
            ))}
          </ul>
        </RevealHint>
        <OptionList<LineId>
          multi
          label={tt("Lines you would not send as they stand", "Zeilen, die Sie so nicht senden würden")}
          value={l1.noSend}
          onChange={toggle}
          options={LINES.map((l, i) => ({ id: l.id, label: `${tt("Line", "Zeile")} ${i + 1} · ${l.source}`, sub: tt(`“${l.text}”`, `„${l.text}“`) }))}
        />
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => patch((s) => ({ checks: s.checks + 1, noSendResult: noSendHolds(s.noSend) }))} className="btn-ghost btn-sm">
            {tt("Check my choices", "Meine Auswahl prüfen")}
          </button>
          {l1.noSendResult && (
            <span role="status" className="text-caption text-ink">
              {l1.noSendResult.chosen === 0
                ? tt("Nothing chosen yet.", "Noch nichts gewählt.")
                : tt(`${l1.noSendResult.holds} of ${l1.noSendResult.chosen} chosen fail at least one of the three tests. The others pass all three.`, `${l1.noSendResult.holds} von ${l1.noSendResult.chosen} gewählten bestehen mindestens einen der drei Tests nicht. Die anderen bestehen alle drei.`)}
            </span>
          )}
        </div>
        <AnswerKey block={noSendKey()} />
      </div>
      <BlockMissing block="1.2" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.3 */

export function Block13() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const check = () =>
    patch((s) => ({
      checks: s.checks + 1,
      apprChecked: true,
      apprClue: false,
      apprFlagged: s.appr
        .map((a, i) => ({ a, i }))
        .filter(({ a, i }) => !a.emotion || s.appr.findIndex((g) => g.emotion === a.emotion) !== i || !a.trigger || a.text.trim().length < APPROACH_MIN || !hasBecause(a.text))
        .map(({ i }) => i),
    }));
  const setRow = (i: number, p: Partial<{ emotion: EmotionId | null; trigger: TriggerId | null; text: string }>) =>
    patch((s) => ({ appr: s.appr.map((a, j) => (j === i ? { ...a, ...p } : a)), apprFlagged: s.apprFlagged.filter((x) => x !== i) }));
  return (
    <AnswerBlock
      id="block-1-3"
      title={tt("Block 1.3 · Three approaches that convince customers more strongly", "Block 1.3 · Drei Ansätze, die Kunden stärker überzeugen")}
      kind="JUDGED"
      minutes={BLOCK_MINUTES["1.3"]}
      core={false}
      findIt={tt("Route 1 → Task 1 → your own answers to Blocks 1.1 and 1.2 above, and the four emotions in Materi A2. Answer in the three fields below.", "Route 1 → Task 1 → Ihre eigenen Antworten zu Block 1.1 und 1.2 oben und die vier Emotionen in Materi A2. Antworten Sie in den drei Feldern unten.")}
    >
      <MaterialRefs refs={["A1", "A2", "A3"]} />
      <p className="text-body text-ink">
        <Gloss>{tt("CloudTech's offers are technically like its competitors', and customers compare prices. Formulate three concrete approaches that make the offer more attractive, each resting on a different emotion, so that they can be told apart.", "Die Angebote von CloudTech gleichen technisch denen der Wettbewerber, und Kunden vergleichen Preise. Formulieren Sie drei konkrete Ansätze, die das Angebot attraktiver machen und jeweils auf einer anderen Emotion beruhen, damit man sie unterscheiden kann.")}</Gloss>
      </p>
      <p className="text-caption text-ash">{tt("The frame:", "Der Rahmen:")} {APPROACH_TXT.frame}</p>
      <div className="space-y-4">
        {l1.appr.map((a, i) => {
          const flagged = l1.apprFlagged.includes(i);
          return (
            <div key={i} className="space-y-1.5">
              <TextBox
                id={IDS.appr(i)}
                label={`${tt("Approach", "Ansatz")} ${i + 1}`}
                help={tt(`Choose the emotion and the trigger (or none), then write the approach in one or two sentences with a reason (“so that … because …”), at least ${APPROACH_MIN} characters.`, `Wählen Sie die Emotion und den Trigger (oder keinen), schreiben Sie dann den Ansatz in ein bis zwei Sätzen mit einer Begründung („damit … weil …“), mindestens ${APPROACH_MIN} Zeichen.`)}
                value={a.text}
                onChange={(v) => setRow(i, { text: v })}
                min={APPROACH_MIN}
                flagged={flagged}
                clue={tt(`Use the frame: ${APPROACH_TXT.frame} Choose an emotion no other approach uses, and finish with what the customer feels and why it works.`, `Nutzen Sie den Rahmen: ${APPROACH_TXT.frame} Wählen Sie eine Emotion, die kein anderer Ansatz nutzt, und enden Sie damit, was der Kunde fühlt und warum es wirkt.`)}
                clueShown={l1.apprClue}
                onShowClue={() => patch({ apprClue: true })}
              >
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label htmlFor={`appr-${i}-emotion`} className="smallcaps block">
                      {tt("Emotion", "Emotion")}
                    </label>
                    <select id={`appr-${i}-emotion`} className="field mt-1" value={a.emotion ?? ""} onChange={(e) => setRow(i, { emotion: (e.target.value || null) as EmotionId | null })}>
                      <option value="">{tt("Choose an emotion…", "Emotion wählen …")}</option>
                      {APPROACH_EMOTIONS.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.label} (Materi {m.from})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`appr-${i}-trigger`} className="smallcaps block">
                      {tt("Trigger (Materi A3)", "Trigger (Materi A3)")}
                    </label>
                    <select id={`appr-${i}-trigger`} className="field mt-1" value={a.trigger ?? ""} onChange={(e) => setRow(i, { trigger: (e.target.value || null) as TriggerId | null })}>
                      <option value="">{tt("Choose a trigger, or none…", "Trigger wählen oder keinen …")}</option>
                      {APPROACH_TRIGGER_OPTIONS.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </TextBox>
              {i < APPROACH_COUNT && <ExampleAnswer id={`appr-${i}-example`} guide={approachGuide(i)} />}
              {mentor && i < APPROACH_COUNT && <MentorGuide guide={approachGuide(i)} />}
            </div>
          );
        })}
      </div>
      <CheckBar onCheck={check} checkLabel={tt("Check my approaches", "Meine Ansätze prüfen")} checks={l1.checks} />
      {l1.apprChecked && (
        <Reading>
          {l1.apprFlagged.length === 0
            ? tt(`All ${APPROACH_COUNT} approaches have a distinct emotion, a trigger choice and a reason. Whether they are good is for you and your facilitator to judge.`, `Alle ${APPROACH_COUNT} Ansätze haben eine eigene Emotion, eine Trigger-Wahl und eine Begründung. Ob sie gut sind, beurteilen Sie und Ihre Moderation.`)
            : tt(
                `${l1.apprFlagged.length} approach${l1.apprFlagged.length === 1 ? " is" : "es are"} outlined: an emotion or a trigger choice is missing or repeated, the text is short, or it gives no reason.`,
                `${l1.apprFlagged.length} ${l1.apprFlagged.length === 1 ? "Ansatz ist" : "Ansätze sind"} markiert: Eine Emotion oder Trigger-Wahl fehlt oder wiederholt sich, der Text ist kurz, oder er nennt keinen Grund.`,
              )}
        </Reading>
      )}
      <BlockMissing block="1.3" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.4 */

const row = (id: string, label: string, value: string) => (
  <tr id={id} className="border-t border-line">
    <td className="px-3 py-2">{label}</td>
    <td className="tnum px-3 py-2 text-right font-semibold">{value}</td>
  </tr>
);

const measureName = (l: MeasureLetter): string => ({ A: MEASURES_L1.A.name, B: MEASURES_L1.B.name, C: MEASURES_L1.C.name })[l];

export function Block14() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const flaggedFig = l1.figFlagged;

  const setFig = (id: FigureId, v: string) => patch((s) => ({ figs: { ...s.figs, [id]: v }, figFlagged: s.figFlagged.filter((f) => f !== id), sentenceFlagged: false }));
  const check = () =>
    patch((s) => {
      const parts = figurePartFlags(s.parts);
      const figFlagged = FIGURE_IDS.filter((id) => s.figs[id].trim() !== "" && !figMatches(s.figs[id], FIGURES[id].answer));
      const t = s.sentence.trim();
      const riskFlags = LETTERS.filter((l) => s.risks[l] && s.risks[l] !== RISK_TRUTH[l]);
      return {
        checks: s.checks + 1,
        figFlagged,
        figClue: {},
        partFlags: parts,
        sentenceFlagged: t !== "" && (t.length < MIN_SENTENCE || !citesCalcFigure(t)),
        sentenceClue: false,
        riskFlags,
        riskClue: {},
      };
    });

  return (
    <AnswerBlock
      id="block-1-4"
      title={tt("Block 1.4 · Weigh the three measures: reach, cost and risk", "Block 1.4 · Die drei Maßnahmen abwägen: Reichweite, Kosten und Risiko")}
      kind="OBJECTIVE + JUDGED"
      minutes={BLOCK_MINUTES["1.4"]}
      core={true}
      findIt={tt("Route 1 → Task 1 → the two tables “The customer base” and “The three measures” directly below. The numbers are printed there. Answer in the fields under the tables.", "Route 1 → Task 1 → die beiden Tabellen „Die Kundenbasis“ und „Die drei Maßnahmen“ direkt darunter. Die Zahlen stehen dort. Antworten Sie in den Feldern unter den Tabellen.")}
    >
      <MaterialRefs refs={["A4", "A5"]} />
      <p className="text-body text-ink">
        <Gloss>
          {tt(
            "CloudTech can send a standard newsletter (A), individual offers based on usage behaviour (B) or start a bonus programme (C). The budget is small and data protection is strict. The numbers you need are in the tables below. Look for them first; the buttons “Show where the numbers are” and “Show the formula” are there if you get stuck. The method is taught in",
            "CloudTech kann einen Standard-Newsletter senden (A), individuelle Angebote auf Basis des Nutzungsverhaltens (B) oder ein Bonusprogramm starten (C). Das Budget ist klein und der Datenschutz streng. Die Zahlen, die Sie brauchen, stehen in den Tabellen unten. Suchen Sie sie zuerst selbst; die Tasten „Wo die Zahlen stehen anzeigen“ und „Formel anzeigen“ sind da, wenn Sie nicht weiterkommen. Die Methode wird vermittelt in",
          )}
        </Gloss>{" "}
        <button type="button" onClick={() => scrollToAndFlash("mat-A4", "ref")} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          Materi A4
        </button>
        {tt(", on other numbers.", ", mit anderen Zahlen.")}
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full border-collapse text-caption">
            <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("The customer base (Case assumption)", "Die Kundenbasis (Case-Annahme)")}</caption>
            <tbody>
              {row("base-customers", tt("Customers on annual contracts", "Kunden mit Jahresverträgen"), num(BASE.customers))}
              {row("base-value", tt("Average revenue per customer per year", "Durchschnittlicher Umsatz pro Kunde und Jahr"), euro(BASE.annualValue))}
              {row("base-consent", tt("Share of customers who agreed to usage analysis", "Anteil der Kunden, die der Nutzungsanalyse zugestimmt haben"), `${BASE.consent}${tt("%", " %")}`)}
              {row("base-usable", tt("Of those, the share with twelve months of usable usage data", "Davon der Anteil mit zwölf Monaten nutzbarer Nutzungsdaten"), `${BASE.usable}${tt("%", " %")}`)}
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full border-collapse text-caption">
            <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("The three measures (Case assumption)", "Die drei Maßnahmen (Case-Annahme)")}</caption>
            <tbody>
              {row("meas-A", `A · ${MEASURES_L1.A.name}: ${tt("cost for six months, reaches all customers", "Kosten für sechs Monate, erreicht alle Kunden")}`, euro(MEASURES_L1.A.cost))}
              {row("meas-B-build", tt("B · Individual offers based on usage: build cost", "B · Individuelle Angebote nach Nutzung: Aufbaukosten"), euro(MEASURES_L1.B.build))}
              {row("meas-B-review", tt("B · Data-protection review (uses only data of customers who agreed)", "B · Datenschutzprüfung (nutzt nur Daten von Kunden, die zugestimmt haben)"), euro(MEASURES_L1.B.review))}
              {row("meas-C-share", tt("C · Bonus programme: share of customers who join", "C · Bonusprogramm: Anteil der Kunden, die beitreten"), `${MEASURES_L1.C.memberShare}${tt("%", " %")}`)}
              {row("meas-C-rebate", tt("C · Rebate on the annual fee for members", "C · Rabatt auf die Jahresgebühr für Mitglieder"), `${MEASURES_L1.C.rebate}${tt("%", " %")}`)}
              {row("meas-C-months", tt("C · Months the programme runs", "C · Monate, die das Programm läuft"), String(MEASURES_L1.C.months))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-5">
        {FIGURE_IDS.map((id) => {
          const f = FIGURES[id];
          const b = FIGURE_BUILDERS[id];
          const flagged = flaggedFig.includes(id);
          const partsFlagged = b.parts.some((p) => l1.partFlags.includes(partKey(id, p.id)));
          return (
            <div key={id} className="space-y-2">
              <Field
                id={IDS.figure(id)}
                htmlFor={`fig-${id}-in`}
                label={f.label}
                help={`${f.question} ${tt("Type the figure as a number, for example", "Tippen Sie die Zahl als Zahl ein, zum Beispiel")} ${id === "F3" ? "85" : id === "F2" ? "60000" : "500"}.`}
                flagged={flagged}
                clue={f.clue}
                clueShown={!!l1.figClue[id]}
                onShowClue={() => patch((s) => ({ figClue: { ...s.figClue, [id]: true } }))}
              >
                <input id={`fig-${id}-in`} className="field tnum max-w-xs" inputMode="decimal" autoComplete="off" value={l1.figs[id]} onChange={(e) => setFig(id, e.target.value)} aria-invalid={flagged || undefined} />
              </Field>
              {flagged && (
                <CalcDiagnosis builder={b} figure={id} parts={l1.parts} partFlags={l1.partFlags} name={tt(`your ${id}`, `Ihr ${id}`)} mismatch={(r) => tt(`The parts in the formula calculator are right and give ${r}, but the figure you entered differs. Press “Use this result in ${id}” or check the entry.`, `Die Teile im Formelrechner stimmen und ergeben ${r}, aber die von Ihnen eingegebene Zahl weicht ab. Drücken Sie „Ergebnis übernehmen in ${id}“ oder prüfen Sie die Eingabe.`)} />
              )}
              <div className="flex flex-wrap items-start gap-2">
                <RevealHint id={`fig-${id}-where`} label={tt("Show where the numbers are", "Zeigen, wo die Zahlen stehen")} title={tt("Numbers you need · the printed rows", "Zahlen, die Sie brauchen · die gedruckten Zeilen")}>
                  <ul className="space-y-1 text-caption">
                    {f.sources === "figures" ? (
                      <li className="text-ink">{tt("Your own answers above.", "Ihre eigenen Antworten oben.")}</li>
                    ) : (
                      f.sources.map((s) => (
                        <li key={s.label}>
                          <button type="button" onClick={() => scrollToAndFlash(s.target, "ref")} className="flex min-h-[36px] w-full flex-wrap items-baseline gap-x-2 rounded px-2 py-1 text-left hover:bg-accentSoft">
                            <span className="text-ink">{s.label}:</span>
                            <span className="tnum font-semibold text-ink">{s.value}</span>
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                </RevealHint>
                <RevealHint id={`fig-${id}-formula`} label={tt("Show the formula", "Formel anzeigen")} title={`${tt("The formula · from Materi", "Die Formel · aus Materi")} ${f.taughtIn}`} forceOpen={partsFlagged}>
                  <p className="text-caption text-ink">
                    <Gloss>{f.formula}</Gloss>
                  </p>
                  <FormulaBuilder
                    figure={id}
                    builder={b}
                    parts={l1.parts}
                    partFlags={l1.partFlags}
                    onPart={(k, v) => patch((s) => ({ parts: { ...s.parts, [k]: v }, partFlags: s.partFlags.filter((x) => x !== k) }))}
                    onUse={(v) => setFig(id, String(Math.round(v * 100) / 100))}
                    unit={f.unit}
                    label={id}
                    source={id === "F3" ? tt("the table and your F1", "der Tabelle und Ihrem F1") : tt("the two tables above", "den beiden Tabellen oben")}
                  />
                </RevealHint>
              </div>
              {mentor && <MentorGuide guide={figureGuide(id)} />}
            </div>
          );
        })}
      </div>

      <div className="space-y-3 border-t border-line pt-3">
        <p className="font-semibold text-ink">{tt("The main risk of each measure", "Das Hauptrisiko jeder Maßnahme")}</p>
        <p className="text-caption text-ash">
          <Gloss>{tt("Choose the risk that most threatens each measure. One choice is not the main risk of any of them. Think about who receives the measure and what data it uses.", "Wählen Sie das Risiko, das jede Maßnahme am meisten bedroht. Eine Auswahl ist bei keiner das Hauptrisiko. Denken Sie daran, wer die Maßnahme erhält und welche Daten sie nutzt.")}</Gloss>
        </p>
        {LETTERS.map((l) => {
          const flagged = l1.riskFlags.includes(l);
          return (
            <div key={l} id={IDS.riskPick(l)} className={clsx("space-y-1.5 rounded-lg border border-line bg-paper p-3", flagged && "is-flagged")}>
              <p className="font-semibold text-ink">
                {tt("Measure", "Maßnahme")} {l} · <span className="font-normal text-ash">{measureName(l)}</span>
              </p>
              <OptionList<RiskPickId> label={tt(`Main risk of measure ${l}`, `Hauptrisiko von Maßnahme ${l}`)} value={l1.risks[l]} onChange={(v) => patch((s) => ({ risks: { ...s.risks, [l]: v }, riskFlags: s.riskFlags.filter((x) => x !== l) }))} options={RISK_PICKS.map((r) => ({ id: r.id, label: r.label }))} />
              {flagged && (
                <p className="text-caption text-ink">
                  <span className="smallcaps mr-1 text-accent">{tt("Clue", "Hinweis")}</span>
                  {RISK_CLUES[l]}
                </p>
              )}
            </div>
          );
        })}
        <AnswerKey block={riskPickKey()} />
      </div>

      <TextBox
        id={IDS.sentence}
        label={tt("What do the figures say about effect against feasibility?", "Was sagen die Zahlen zu Wirkung gegenüber Machbarkeit?")}
        help={tt("One or two sentences. Say which measure you would fund first when the budget is small and data protection is strict, and use at least one figure from your calculation.", "Ein bis zwei Sätze. Sagen Sie, welche Maßnahme Sie bei kleinem Budget und strengem Datenschutz zuerst finanzieren würden, und nutzen Sie mindestens eine Zahl aus Ihrer Berechnung.")}
        value={l1.sentence}
        onChange={(v) => patch({ sentence: v, sentenceFlagged: false })}
        min={MIN_SENTENCE}
        rows={4}
        flagged={l1.sentenceFlagged}
        clue={tt("Which of your figures shows how many customers a measure reaches, or what it costs? A sentence that quotes one of them and names the measure funded first is enough.", "Welche Ihrer Zahlen zeigt, wie viele Kunden eine Maßnahme erreicht oder was sie kostet? Ein Satz, der eine davon zitiert und die zuerst finanzierte Maßnahme nennt, genügt.")}
        clueShown={l1.sentenceClue}
        onShowClue={() => patch({ sentenceClue: true })}
      >
        <WritingHelp
          id="sentence-help"
          steps={[tt("Name the measure you would fund first.", "Nennen Sie die Maßnahme, die Sie zuerst finanzieren würden."), tt("Say what limits it (the number of customers it can reach, or what it costs), with a figure from your calculation.", "Sagen Sie, was sie begrenzt (die Zahl der Kunden, die sie erreicht, oder was sie kostet), mit einer Zahl aus Ihrer Berechnung."), tt("Say what you would not do, and why: think about the newsletter and the bonus programme.", "Sagen Sie, was Sie nicht tun würden, und warum: Denken Sie an den Newsletter und das Bonusprogramm.")]}
          refs={[
            { label: tt("Budget for the whole plan", "Budget für den gesamten Plan"), value: euro(180000), target: "case-brief" },
            { label: tt("Rebate of measure C", "Rabatt von Maßnahme C"), value: `${MEASURES_L1.C.rebate}${tt("%", " %")}`, target: "meas-C-rebate" },
          ]}
        />
      </TextBox>
      <ExampleAnswer id="sentence-example" guide={sentenceGuide()} />
      {mentor && <MentorGuide guide={sentenceGuide()} />}

      <CheckBar onCheck={check} checkLabel={tt("Check my figures, risks and sentence", "Meine Zahlen, Risiken und meinen Satz prüfen")} checks={l1.checks} />
      {l1.checks > 0 && (
        <Reading>
          {l1.figFlagged.length === 0 && !l1.sentenceFlagged && l1.partFlags.length === 0 && l1.riskFlags.length === 0
            ? tt("Nothing is outlined by the last check.", "Die letzte Prüfung markiert nichts.")
            : tt(
                `${l1.figFlagged.length > 0 ? `${l1.figFlagged.length} figure${l1.figFlagged.length === 1 ? " is" : "s are"} outlined above. Each says what to check.` : ""}${l1.riskFlags.length > 0 ? ` ${l1.riskFlags.length} main risk${l1.riskFlags.length === 1 ? " is" : "s are"} outlined.` : ""}${l1.sentenceFlagged ? " The sentence needs at least one of your calculated figures." : ""}${l1.partFlags.length > 0 ? " A part of the formula calculator is outlined." : ""}`,
                `${l1.figFlagged.length > 0 ? `${l1.figFlagged.length} ${l1.figFlagged.length === 1 ? "Zahl ist" : "Zahlen sind"} oben markiert. Jede sagt, was zu prüfen ist.` : ""}${l1.riskFlags.length > 0 ? ` ${l1.riskFlags.length} ${l1.riskFlags.length === 1 ? "Hauptrisiko ist" : "Hauptrisiken sind"} markiert.` : ""}${l1.sentenceFlagged ? " Der Satz braucht mindestens eine Ihrer berechneten Zahlen." : ""}${l1.partFlags.length > 0 ? " Ein Teil des Formelrechners ist markiert." : ""}`,
              )}
        </Reading>
      )}
      <BlockMissing block="1.4" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.5 */

export function Block15() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const fields: { k: "assume" | "tip" | "manager"; label: string; help: string }[] = [
    { k: "assume", label: tt("Which of my choices assumed that facts, not feelings, would decide?", "Welche meiner Entscheidungen nahm an, dass Fakten und nicht Gefühle entscheiden?"), help: tt("One or two sentences about something you actually did in Blocks 1.1 to 1.4, for example how you first read what a customer wants.", "Ein bis zwei Sätze über etwas, das Sie in den Blöcken 1.1 bis 1.4 wirklich getan haben, zum Beispiel, wie Sie zuerst gelesen haben, was ein Kunde will.") },
    { k: "tip", label: tt("Where could my personalisation tip into rejection?", "Wo könnte meine Personalisierung in Ablehnung kippen?"), help: tt("Name one approach or measure where a customer could feel watched or pushed, and say what would set it off.", "Nennen Sie einen Ansatz oder eine Maßnahme, bei der ein Kunde sich beobachtet oder gedrängt fühlen könnte, und sagen Sie, was es auslösen würde.") },
    { k: "manager", label: tt("How would a strategic decision-maker prioritise?", "Wie würde ein strategischer Entscheider priorisieren?"), help: tt("What would they fund first, what would they wait with, and why? Be concrete.", "Was würde er zuerst finanzieren, womit würde er warten, und warum? Seien Sie konkret.") },
  ];
  return (
    <AnswerBlock
      id="block-1-5"
      title={tt("Block 1.5 · Coaching reflection: from Level 1 to Level 2", "Block 1.5 · Coaching-Reflexion: von Level 1 zu Level 2")}
      kind="JUDGED"
      minutes={BLOCK_MINUTES["1.5"]}
      core={false}
      findIt={tt("Route 1 → Task 1 → your own answers in Blocks 1.1 to 1.4 above, and the coaching focus in Materi A1 and A4. Answer in the three fields below.", "Route 1 → Task 1 → Ihre eigenen Antworten in den Blöcken 1.1 bis 1.4 oben und der Coaching-Fokus in Materi A1 und A4. Antworten Sie in den drei Feldern unten.")}
    >
      <MaterialRefs refs={["A1", "A4", "A5"]} />
      <p className="text-body text-ink">
        <Gloss>{tt("Before you analyse CloudTech's touchpoints, look at how you read this case. Why do emotional triggers work stronger than facts? When does personalisation tip into rejection? And which measures really change behaviour?", "Bevor Sie die Touchpoints von CloudTech analysieren, betrachten Sie, wie Sie diesen Fall gelesen haben. Warum wirken emotionale Trigger stärker als Fakten? Wann kippt Personalisierung in Ablehnung? Und welche Maßnahmen verändern wirklich das Verhalten?")}</Gloss>
      </p>
      {fields.map((f) => (
        <div key={f.k} className="space-y-1.5">
          <TextBox id={IDS.reflect(f.k)} label={f.label} help={f.help} value={l1.reflect[f.k]} onChange={(v) => patch((s) => ({ reflect: { ...s.reflect, [f.k]: v } }))} min={MIN_LINE} rows={3} />
          <ExampleAnswer id={`reflect-${f.k}-example`} guide={reflectGuide(f.k)} />
          {mentor && <MentorGuide guide={reflectGuide(f.k)} />}
        </div>
      ))}
      <BlockMissing block="1.5" route={1} />
    </AnswerBlock>
  );
}
