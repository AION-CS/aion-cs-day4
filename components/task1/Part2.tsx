"use client";

import clsx from "clsx";
import { Toggles } from "@/components/materi/kit";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BudgetBar } from "@/components/ui/BudgetBar";
import { Field } from "@/components/ui/Field";
import { CheckBar, OptionList, Reading, ScorePick, TextBox } from "@/components/ui/Inputs";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { PlacementBoard } from "@/components/ui/PlacementBoard";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { NEEDS, NEED_IDS, NEED_PAIR_TESTS } from "@/data/needs";
import type { NeedId } from "@/data/needs";
import { INFO_ITEMS, OUTCOME_LABEL, STRENGTH_LABEL, STRENGTH_ORDER, TOUCHPOINTS } from "@/data/touchpoints";
import type { InfoId, Strength, TouchId } from "@/data/touchpoints";
import { BUDGET, CHOOSE, DATA_LABEL, EFFORT_LABEL, MEASURES, MEASURE_BY_ID, MONTHS, RULES } from "@/data/measures";
import type { MeasureId } from "@/data/measures";
import { BENEFITS, BENEFIT_BY_ID, BENEFIT_CHOOSE, ENTRIES, HORIZONS, LOYALTY_MONTHS, LOYALTY_TYPES, MEMBERS, SETUP } from "@/data/loyalty";
import type { BenefitId, EntryId, HorizonId, LoyaltyType } from "@/data/loyalty";
import { acceptHolds, aimsHold, allTagged, benefitNeeds, coverage, infoHolds, loyaltyCostOf, loyaltyFlags, measureScore, measureScored, orderInversions, ownPoints, patternCheck, planCost, planLeft, planOver, scaleHolds, tagHolds, tallyOf, totalCost } from "@/lib/checks";
import { scrollToAndFlash } from "@/lib/flash";
import { Gloss } from "@/lib/glossify";
import { euro, tt } from "@/lib/lang";
import { IDS } from "@/lib/missing";
import { entryKey, horizonKey, infoKey, loyaltyBenefitsKey, loyaltyTypeKey, measureKey, orderKey, patternKey, touchKey } from "@/lib/answerKey";
import { behaviourGuide, infoTextGuide, loyWhyGuide, loyaltyCostGuide, scoreGuide, whyGuide } from "@/lib/mentorGuide";
import { MIN_SENTENCE } from "@/lib/progress";
import { BLOCK_MINUTES } from "@/lib/routes";
import { useStore } from "@/store/useStore";
import type { Score } from "@/store/useStore";

/* ------------------------------------------------------------------ Block 2.1 */

export function Block21() {
  const l1 = useStore((s) => s.l1);
  const place = useStore((s) => s.placeTouch);
  const undo = useStore((s) => s.undoTags);
  const redo = useStore((s) => s.redoTags);
  const patch = useStore((s) => s.patchL1);
  return (
    <AnswerBlock
      id="block-2-1"
      title={tt("Block 2.1 · Find the emotional weakness in twelve touchpoints", "Block 2.1 · Die emotionale Schwachstelle in zwölf Touchpoints finden")}
      kind="OBJECTIVE"
      minutes={BLOCK_MINUTES["2.1"]}
      findIt={tt("Route 1 → Task 1 → “Twelve touchpoints” in the case above. Read each one, find the phrase that decides it, and answer on the tagging board below.", "Route 1 → Task 1 → „Zwölf Touchpoints“ im Fall oben. Lesen Sie jeden, finden Sie die Formulierung, die ihn entscheidet, und antworten Sie auf dem Zuordnungsbrett unten.")}
    >
      <MaterialRefs refs={["A6"]} />
      <PlacementBoard<NeedId>
        items={TOUCHPOINTS.map((p) => ({ id: p.id, meta: `${p.label} · ${p.moment} · ${p.stage} · ${OUTCOME_LABEL[p.outcome]}`, text: p.text }))}
        bins={NEED_IDS.map((n) => ({ id: n, label: NEEDS[n].label, hint: NEEDS[n].means }))}
        value={l1.tags}
        onPlace={(id, n) => place(id as TouchId, n)}
        onUndo={undo}
        onRedo={redo}
        undoCount={l1.tagHistory.length}
        redoCount={l1.tagFuture.length}
        domId={IDS.touch}
        clues={Object.fromEntries(TOUCHPOINTS.map((p) => [p.id, p.clue]))}
        reasons={Object.fromEntries(TOUCHPOINTS.map((p) => [p.id, p.why]))}
        result={l1.tagResult}
        checks={l1.tagChecks}
        onCheck={() => patch((s) => ({ checks: s.checks + 1, tagChecks: s.tagChecks + 1, tagResult: tagHolds(s.tags) }))}
        onClue={() => patch({ tagClue: true })}
        clueShown={l1.tagClue}
        reasoningOpened={l1.tagReasoning}
        onOpenReasoning={() => patch({ tagReasoning: true })}
        noun="Touchpoint"
        checkLabel={tt("Check my tags", "Meine Zuordnungen prüfen")}
        intro={tt("Drag a touchpoint into a need, or select it and then select a need. Select a placed one to move it again. Tag one need per touchpoint: the one that is left unmet.", "Ziehen Sie einen Touchpoint zu einem Bedürfnis, oder wählen Sie ihn und dann ein Bedürfnis. Wählen Sie einen platzierten, um ihn erneut zu verschieben. Ordnen Sie pro Touchpoint ein Bedürfnis zu: das, das unerfüllt bleibt.")}
        tests={
          <RevealHint id="tag-tests" label={tt("Show the test questions", "Testfragen anzeigen")} title={tt("Test questions · taught in Materi A6", "Testfragen · vermittelt in Materi A6")}>
            <div className="space-y-2 text-caption text-ink">
              <p>{tt("Ask the test of the need you suspect. They repeat the tests from Materi A6; they never say which touchpoint goes where.", "Stellen Sie die Testfrage des Bedürfnisses, das Sie vermuten. Sie wiederholen die Tests aus Materi A6; sie sagen nie, welcher Touchpoint wohin gehört.")}</p>
              <ul className="space-y-1.5">
                {NEED_IDS.map((n) => (
                  <li key={n}>
                    <span className="font-semibold">{NEEDS[n].label}. </span>
                    <Gloss>{NEEDS[n].test}</Gloss>
                  </li>
                ))}
              </ul>
              <p className="smallcaps text-ash">{tt("When two needs both seem to fit", "Wenn zwei Bedürfnisse passen")}</p>
              <ul className="space-y-1.5">
                {NEED_PAIR_TESTS.map((t) => (
                  <li key={t.pair}>
                    <span className="font-semibold">{t.pair} </span>
                    <Gloss>{t.test}</Gloss>
                  </li>
                ))}
              </ul>
              <MaterialRefs refs={["A6"]} lead={tt("Taught in", "Vermittelt in")} />
            </div>
          </RevealHint>
        }
      />
      <p className="text-caption text-ash">
        {tt("Words in the touchpoints, explained in plain language:", "Wörter in den Touchpoints, in einfacher Sprache erklärt:")} <Gloss>{tt("go-live, outage, backup, ticket, upsell, users' day, batch job.", "Go-live, Ausfall, Backup, Ticket, Upsell, Nutzertag, Batch-Job.")}</Gloss>
      </p>
      <AnswerKey block={touchKey()} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 2.2 */

const strengthOpts = () => STRENGTH_ORDER.map((s) => ({ id: s, label: `${STRENGTH_LABEL[s]} ${s === "high" ? "●●●" : s === "mid" ? "●●○" : "●○○"}` }));

export function Block22() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const tally = tallyOf(l1.tags);
  const complete = allTagged(l1.tags);
  const pc = patternCheck(l1);
  const flaggedRows = l1.patResult ? l1.patterns.map((_, i) => !pc.rowsNeed[i] || (!!l1.patterns[i].strength && !pc.rowsStrength[i])) : [];

  const setRow = (i: number, p: Partial<{ need: NeedId | null; behaviour: string; strength: Strength | null }>) =>
    patch((s) => ({ patterns: s.patterns.map((r, j) => (j === i ? { ...r, ...p } : r)), patResult: null }));
  const check = () =>
    patch((s) => {
      const c = patternCheck(s);
      return { checks: s.checks + 1, patResult: { need: c.need, strength: c.strength, filled: c.filled }, patClue: false };
    });
  const checkInfo = () => patch((s) => ({ checks: s.checks + 1, infoResult: infoHolds(s.info) }));
  const toggleInfo = (id: InfoId) => patch((s) => ({ info: s.info.includes(id) ? s.info.filter((x) => x !== id) : [...s.info, id], infoResult: null }));

  return (
    <AnswerBlock
      id="block-2-2"
      title={tt("Block 2.2 · Name the four customer needs, rate them, say what is missing", "Block 2.2 · Die vier Kundenbedürfnisse benennen, bewerten und sagen, was fehlt")}
      kind="OBJECTIVE + JUDGED"
      minutes={BLOCK_MINUTES["2.2"]}
      findIt={tt("Route 1 → Task 1 → “Your tally” directly below: it counts your own tags from Block 2.1. Answer in the four need rows and the two fields under them.", "Route 1 → Task 1 → „Ihre Strichliste“ direkt darunter: Sie zählt Ihre eigenen Zuordnungen aus Block 2.1. Antworten Sie in den vier Bedürfnis-Zeilen und den zwei Feldern darunter.")}
    >
      <MaterialRefs refs={["A6"]} />
      <div id="tally-panel" className="space-y-2 rounded-lg border border-line bg-mist/50 p-3">
        <p className="smallcaps">{tt("Your tally · from your tags in Block 2.1", "Ihre Strichliste · aus Ihren Zuordnungen in Block 2.1")}</p>
        {!complete && (
          <p className="text-caption text-ash">
            {tt(`${tally.tagged} of 12 touchpoints are tagged, so the tally below is not complete yet.`, `${tally.tagged} von 12 Touchpoints sind zugeordnet, die Strichliste unten ist also noch nicht vollständig.`)}{" "}
            <button type="button" onClick={() => scrollToAndFlash("block-2-1", "ref", "start")} className="font-semibold text-ink underline decoration-dotted underline-offset-2">
              {tt("Go to Block 2.1", "Zu Block 2.1")}
            </button>
            {tt(". Nothing is blocked; the check simply reads what is there.", ". Nichts ist gesperrt; die Prüfung liest einfach, was da ist.")}
          </p>
        )}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[26rem] border-collapse text-caption">
            <caption className="sr-only">{tt("Touchpoints and customers who left per need, from your own tags", "Touchpoints und abgewanderte Kunden je Bedürfnis, aus Ihren eigenen Zuordnungen")}</caption>
            <thead>
              <tr className="text-left text-micro uppercase text-ash">
                <th className="py-1 pr-2">{tt("Need", "Bedürfnis")}</th>
                <th className="py-1 pr-2 text-right">Touchpoints</th>
                <th className="py-1 pr-2 text-right">{tt("Customer left", "Kunde gegangen")}</th>
                <th className="py-1 pr-2 text-right">{tt("Points", "Punkte")}</th>
              </tr>
            </thead>
            <tbody>
              {NEED_IDS.map((n) => (
                <tr key={n} className="border-t border-line">
                  <td className="py-1 pr-2 font-semibold">{NEEDS[n].label}</td>
                  <td className="tnum py-1 pr-2 text-right">{tally.count[n]}</td>
                  <td className="tnum py-1 pr-2 text-right">{tally.left[n]}</td>
                  <td className="tnum py-1 pr-2 text-right">{ownPoints(n, tally)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-micro normal-case tracking-normal text-ash">
          {tt("Points = touchpoints + those followed by a customer leaving. The rating rule (5 or more High, 3 to 4 Mid, 2 or fewer Low) is in Materi A6. The tally shows counts; it does not say which needs are the central four or how strong each is.", "Punkte = Touchpoints + die, auf die ein Kunde ging. Die Bewertungsregel (5 oder mehr Hoch, 3 bis 4 Mittel, 2 oder weniger Niedrig) steht in Materi A6. Die Strichliste zeigt Zahlen; sie sagt nicht, welche Bedürfnisse die zentralen vier sind oder wie stark jedes ist.")}
        </p>
      </div>

      <div className="space-y-4">
        {l1.patterns.map((r, i) => (
          <div key={i} className="space-y-2">
            <Field
              id={IDS.pattern(i)}
              htmlFor={`pattern-${i}-behaviour-in`}
              label={`${tt("Need", "Bedürfnis")} ${i + 1}`}
              help={tt(`Choose the need, say what customers do and why (“When …, customers …, because …”, at least ${MIN_SENTENCE} characters), then rate how strongly it drives customers away.`, `Wählen Sie das Bedürfnis, sagen Sie, was Kunden tun und warum („Wenn …, dann …, weil …“, mindestens ${MIN_SENTENCE} Zeichen), und bewerten Sie dann, wie stark es Kunden vertreibt.`)}
              flagged={l1.patResult ? flaggedRows[i] : false}
              clue={
                r.need && !pc.rowsNeed[i]
                  ? tt("Which four needs have the most touchpoints in your own tally above? This one is not among them, or it repeats another row.", "Welche vier Bedürfnisse haben in Ihrer eigenen Strichliste oben die meisten Touchpoints? Dieses gehört nicht dazu, oder es wiederholt eine andere Zeile.")
                  : tt("Add the touchpoints and the customers who left for this need from your tally, then compare the total with the bands 5 or more, 3 to 4, and 2 or fewer.", "Addieren Sie aus Ihrer Strichliste die Touchpoints und die abgewanderten Kunden für dieses Bedürfnis und vergleichen Sie die Summe mit den Bändern 5 oder mehr, 3 bis 4 und 2 oder weniger.")
              }
              clueShown={l1.patClue}
              onShowClue={() => patch({ patClue: true })}
              meta={<span className={clsx("tnum text-micro normal-case tracking-normal", r.behaviour.trim().length >= MIN_SENTENCE ? "text-signal" : "text-ash")}>{`${r.behaviour.trim().length} / ${MIN_SENTENCE} ${tt("characters", "Zeichen")}`}</span>}
            >
              <div className="grid gap-2 md:grid-cols-[minmax(0,16rem)_1fr]">
                <div>
                  <label htmlFor={`pattern-${i}-need`} className="smallcaps block">
                    {tt("Need", "Bedürfnis")}
                  </label>
                  <select id={`pattern-${i}-need`} className="field mt-1" value={r.need ?? ""} onChange={(e) => setRow(i, { need: (e.target.value || null) as NeedId | null })}>
                    <option value="">{tt("Choose a need…", "Bedürfnis wählen …")}</option>
                    {NEED_IDS.map((n) => (
                      <option key={n} value={n}>
                        {NEEDS[n].label}
                      </option>
                    ))}
                  </select>
                  {r.need && (
                    <p className="mt-1 text-micro normal-case tracking-normal text-ash">
                      {tt(`Your tally: ${tally.count[r.need]} touchpoint${tally.count[r.need] === 1 ? "" : "s"}, ${tally.left[r.need]} customer${tally.left[r.need] === 1 ? "" : "s"} left.`, `Ihre Strichliste: ${tally.count[r.need]} Touchpoint${tally.count[r.need] === 1 ? "" : "s"}, ${tally.left[r.need]} ${tally.left[r.need] === 1 ? "Kunde" : "Kunden"} gegangen.`)}
                    </p>
                  )}
                </div>
                <textarea id={`pattern-${i}-behaviour-in`} rows={3} className="field" value={r.behaviour} onChange={(e) => setRow(i, { behaviour: e.target.value })} aria-describedby={`pattern-${i}-behaviour-in-help`} placeholder={tt("When …, customers …, because …", "Wenn …, dann …, weil …")} />
              </div>
              <div className="mt-1">
                <p className="smallcaps">{tt("How strongly does it drive customers away?", "Wie stark vertreibt es Kunden?")}</p>
                <Toggles<Strength> label={tt(`Strength of need ${i + 1}`, `Stärke von Bedürfnis ${i + 1}`)} value={r.strength} onChange={(v) => setRow(i, { strength: v })} options={strengthOpts()} />
              </div>
            </Field>
            {mentor && <MentorGuide guide={behaviourGuide(i)} />}
          </div>
        ))}
        <CheckBar onCheck={check} checkLabel={tt("Check my needs", "Meine Bedürfnisse prüfen")} checks={l1.checks} />
        {l1.patResult && (
          <Reading>
            {complete ? (
              <>
                {tt(`${l1.patResult.need} of 4 needs are among your four most frequent (and different from each other). ${l1.patResult.strength} of ${l1.patResult.filled} ratings agree with the rule applied to your own tally. Rows that do not are outlined; each has a clue that asks you to read your own tally.`, `${l1.patResult.need} von 4 Bedürfnissen gehören zu Ihren vier häufigsten (und unterscheiden sich voneinander). ${l1.patResult.strength} von ${l1.patResult.filled} Bewertungen stimmen mit der Regel überein, angewandt auf Ihre eigene Strichliste. Zeilen, bei denen das nicht so ist, sind markiert; jede hat einen Hinweis, der Sie bittet, Ihre eigene Strichliste zu lesen.`)}
              </>
            ) : (
              <>{tt(`The check reads your own tally, which is not complete: ${tally.tagged} of 12 touchpoints are tagged. Tag the rest in Block 2.1 and check again.`, `Die Prüfung liest Ihre eigene Strichliste, die nicht vollständig ist: ${tally.tagged} von 12 Touchpoints sind zugeordnet. Ordnen Sie den Rest in Block 2.1 zu und prüfen Sie erneut.`)}</>
            )}
          </Reading>
        )}
        <AnswerKey block={patternKey()} />
      </div>

      <div className="space-y-3 border-t border-line pt-3">
        <div id={IDS.info}>
          <p className="font-semibold text-ink">{tt("What does the file not tell you?", "Was sagt Ihnen die Akte nicht?")}</p>
          <p className="text-caption text-ash">
            {tt("Choose two or more things you would want to know that would change which need CloudTech tackles or which measure it funds. Test each with the two questions in Materi A6.", "Wählen Sie zwei oder mehr Dinge, die Sie wissen wollten und die ändern würden, welches Bedürfnis CloudTech angeht oder welche Maßnahme es finanziert. Prüfen Sie jedes mit den zwei Fragen in Materi A6.")}
          </p>
          <div className="mt-2">
            <OptionList<InfoId> multi label={tt("Missing information", "Fehlende Informationen")} options={INFO_ITEMS.map((i) => ({ id: i.id, label: i.label }))} value={l1.info} onChange={toggleInfo} />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <button type="button" onClick={checkInfo} className="btn-ghost btn-sm">
              {tt("Check my choices", "Meine Auswahl prüfen")}
            </button>
            {l1.infoResult && (
              <span role="status" className="text-caption text-ink">
                {l1.infoResult.chosen === 0 ? tt("Nothing chosen yet.", "Noch nichts gewählt.") : tt(`${l1.infoResult.holds} of ${l1.infoResult.chosen} chosen would change what CloudTech does. The others count activity or are already in the file.`, `${l1.infoResult.holds} von ${l1.infoResult.chosen} gewählten würden ändern, was CloudTech tut. Die anderen zählen Aktivität oder stehen schon in der Akte.`)}
              </span>
            )}
          </div>
          <AnswerKey block={infoKey()} />
        </div>
        <TextBox
          id={IDS.infoText}
          label={tt("The one question you would ask the customers who left", "Die eine Frage, die Sie den abgewanderten Kunden stellen würden")}
          help={tt("One question, addressed to the customer, about what they expected or felt at the moment they decided to leave. At least 20 characters.", "Eine Frage, an den Kunden gerichtet, dazu, was er erwartete oder fühlte, als er sich zum Gehen entschied. Mindestens 20 Zeichen.")}
          value={l1.infoText}
          onChange={(v) => patch({ infoText: v })}
          min={20}
          rows={2}
        />
        {mentor && <MentorGuide guide={infoTextGuide()} />}
      </div>
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 2.3 */

export function Block23() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const chosen = l1.chosen;
  const cost = totalCost(chosen);
  const cov = coverage(l1);
  const shown = l1.order.length === chosen.length && chosen.every((id) => l1.order.includes(id)) ? l1.order : chosen;
  const inv = orderInversions({ ...l1, order: shown });

  const toggle = (id: MeasureId) =>
    patch((s) => {
      const has = s.chosen.includes(id);
      const next = has ? s.chosen.filter((x) => x !== id) : [...s.chosen, id];
      return { chosen: next, order: s.order.filter((x) => next.includes(x)), measureFlags: [], measureClue: {} };
    });
  const setAims = (id: MeasureId, aims: NeedId[]) => patch((s) => ({ aims: { ...s.aims, [id]: aims }, measureFlags: s.measureFlags.filter((f) => f !== `${id}.aims`) }));
  const setScore = (k: "eff" | "acc" | "sca", id: MeasureId, v: Score) =>
    patch((s) => ({ [k]: { ...s[k], [id]: v }, measureFlags: s.measureFlags.filter((f) => f !== `${id}.${k}`) }) as Partial<typeof s>);
  const move = (id: MeasureId, d: -1 | 1) => {
    const list = [...shown];
    const i = list.indexOf(id);
    const j = i + d;
    if (j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j], list[i]];
    patch({ order: list });
  };
  const check = () =>
    patch((s) => {
      const flags: string[] = [];
      for (const id of s.chosen) {
        if (s.aims[id] !== undefined && !aimsHold(id, s.aims[id])) flags.push(`${id}.aims`);
        if (s.acc[id] && !acceptHolds(id, s.acc[id])) flags.push(`${id}.acc`);
        if (s.sca[id] && !scaleHolds(id, s.sca[id])) flags.push(`${id}.sca`);
      }
      return { checks: s.checks + 1, measureFlags: flags, measureClue: {} };
    });
  const flagged = (id: MeasureId, k: "aims" | "acc" | "sca") => l1.measureFlags.includes(`${id}.${k}`);
  const anyFlag = l1.measureFlags.length > 0;
  const count = (k: string) => l1.measureFlags.filter((f) => f.endsWith(`.${k}`)).length;

  return (
    <AnswerBlock
      id="block-2-3"
      title={tt("Block 2.3 · Choose three measures, score them, put them in order", "Block 2.3 · Drei Maßnahmen wählen, bewerten und in Reihenfolge bringen")}
      kind="OBJECTIVE + JUDGED"
      minutes={BLOCK_MINUTES["2.3"]}
      findIt={tt(`Route 1 → Task 1 → “The limits” in the case above (${euro(BUDGET)}, ${MONTHS} months, data protection critical) and the nine measures below. Answer by choosing three and filling their cards.`, `Route 1 → Task 1 → „Die Grenzen“ im Fall oben (${euro(BUDGET)}, ${MONTHS} Monate, Datenschutz kritisch) und die neun Maßnahmen unten. Antworten Sie, indem Sie drei wählen und ihre Karten ausfüllen.`)}
    >
      <MaterialRefs refs={["A7", "A4"]} />
      <div id={IDS.measurePick} className="space-y-2">
        <p className="text-body text-ink">
          <Gloss>
            {tt("Choose exactly three of the nine measures. Each says what it changes in the customer, what data it uses and what one more customer costs; it does not say which need it answers. That is your job. You can change your choice at any time and your entries for a measure come back if you choose it again. The loyalty concept of Block 2.4 is paid from the same budget.", "Wählen Sie genau drei der neun Maßnahmen. Jede sagt, was sie im Kunden verändert, welche Daten sie nutzt und was ein weiterer Kunde kostet; sie sagt nicht, welches Bedürfnis sie beantwortet. Das ist Ihre Aufgabe. Sie können Ihre Wahl jederzeit ändern, und Ihre Eingaben zu einer Maßnahme kommen zurück, wenn Sie sie wieder wählen. Das Loyalty-Konzept aus Block 2.4 wird aus demselben Budget bezahlt.")}
          </Gloss>
        </p>
        <OptionList<MeasureId>
          multi
          label={tt("Measures", "Maßnahmen")}
          value={chosen}
          onChange={toggle}
          disabledIds={chosen.length >= CHOOSE ? MEASURES.map((m) => m.id) : []}
          onDisabledClick={() => scrollToAndFlash(IDS.measurePick, "warn")}
          options={MEASURES.map((m) => ({
            id: m.id,
            label: `${m.name} · ${euro(m.cost)} · ${m.weeks} ${tt("weeks to a first effect", "Wochen bis zur ersten Wirkung")}`,
            sub: tt(
              `${m.what} It ${m.mechanism.charAt(0).toLowerCase()}${m.mechanism.slice(1)} Needs: ${m.needs} Data it uses: ${DATA_LABEL[m.data].toLowerCase()}. One more customer: ${EFFORT_LABEL[m.effort].toLowerCase()}. Reaches: ${m.reachAll ? "every customer" : "part of the customers"}.`,
              `${m.what} Was sie im Kunden verändert: ${m.mechanism} Voraussetzung: ${m.needs} Genutzte Daten: ${DATA_LABEL[m.data]}. Ein weiterer Kunde: ${EFFORT_LABEL[m.effort]}. Erreicht: ${m.reachAll ? "jeden Kunden" : "einen Teil der Kunden"}.`,
            ),
          }))}
        />
        <p role="status" className="text-caption text-ash">
          {tt(`${chosen.length} of ${CHOOSE} chosen.${chosen.length >= CHOOSE ? " To choose another, first remove one." : ""}`, `${chosen.length} von ${CHOOSE} gewählt.${chosen.length >= CHOOSE ? " Um eine andere zu wählen, entfernen Sie zuerst eine." : ""}`)}
        </p>
        <p className="text-caption text-ash">
          {tt("Words in the measures, explained in plain language:", "Wörter in den Maßnahmen, in einfacher Sprache erklärt:")} <Gloss>{tt("legitimate interest, consent, opt-in, CRM, incident, status page, rebate.", "berechtigtes Interesse, Einwilligung, Opt-in, CRM, Incident, Statusseite, Rabatt.")}</Gloss>
        </p>
        <div className="flex flex-wrap items-start gap-2">
          <RevealHint id="aims-help" label={tt("Show the test questions", "Testfragen anzeigen")} title={tt("How to match a measure to a need · taught in Materi A7", "Wie man eine Maßnahme einem Bedürfnis zuordnet · vermittelt in Materi A7")}>
            <div className="space-y-2 text-caption text-ink">
              <p>{tt("For each measure ask two things: what does it change in the customer, and which need's test question does that change answer? This list repeats what answers each need; it never says which measure it is.", "Fragen Sie bei jeder Maßnahme zwei Dinge: Was verändert sie im Kunden, und welche Testfrage welches Bedürfnisses beantwortet diese Veränderung? Diese Liste wiederholt, was jedes Bedürfnis beantwortet; sie sagt nie, welche Maßnahme es ist.")}</p>
              <ul className="space-y-1.5">
                {NEED_IDS.map((n) => (
                  <li key={n}>
                    <span className="font-semibold">{NEEDS[n].label}. </span>
                    <Gloss>{NEEDS[n].answeredBy}</Gloss>
                  </li>
                ))}
              </ul>
              <MaterialRefs refs={["A7"]} lead="Taught in" />
            </div>
          </RevealHint>
          <RevealHint id="score-rules" label={tt("Show the scoring rules", "Bewertungsregeln anzeigen")} title={tt("The three scores · taught in Materi A7", "Die drei Werte · vermittelt in Materi A7")}>
            <ul className="list-disc space-y-1 pl-5 text-caption text-ink">
              <li>
                <Gloss>{RULES.effect}</Gloss>
              </li>
              <li>
                <Gloss>{RULES.acceptance}</Gloss>
              </li>
              <li>
                <Gloss>{RULES.scale}</Gloss>
              </li>
              <li>{tt("Score = effect × acceptance × scalability, from 1 to 27.", "Wert = Wirkung × Akzeptanz × Skalierbarkeit, von 1 bis 27.")}</li>
            </ul>
          </RevealHint>
        </div>
      </div>

      {chosen.length > 0 && (
        <div className="space-y-3">
          <BudgetBar items={chosen.map((id) => ({ id, short: MEASURE_BY_ID[id].name.split(" ")[0], cost: MEASURE_BY_ID[id].cost }))} budget={BUDGET} title={tt(`Chosen measures against the ${euro(BUDGET)} budget`, `Gewählte Maßnahmen gegen das Budget von ${euro(BUDGET)}`)} />
          <p className="text-caption text-ash">
            {tt(
              `${chosen.length} measure${chosen.length === 1 ? "" : "s"} cost ${euro(cost)} of ${euro(BUDGET)}, before the loyalty concept of Block 2.4.${cost > BUDGET ? ` That is ${euro(cost - BUDGET)} over: leave out the measure with the lowest score.` : ` ${euro(BUDGET - cost)} is left for the loyalty concept.`}`,
              `${chosen.length} ${chosen.length === 1 ? "Maßnahme kostet" : "Maßnahmen kosten"} ${euro(cost)} von ${euro(BUDGET)}, vor dem Loyalty-Konzept aus Block 2.4.${cost > BUDGET ? ` Das sind ${euro(cost - BUDGET)} zu viel: Lassen Sie die Maßnahme mit dem niedrigsten Wert weg.` : ` Für das Loyalty-Konzept bleiben ${euro(BUDGET - cost)}.`}`,
            )}
          </p>
        </div>
      )}

      {chosen.map((id) => {
        const m = MEASURE_BY_ID[id];
        const aims = l1.aims[id];
        const score = measureScore(l1, id);
        return (
          <div key={id} id={IDS.measure(id)} className={clsx("space-y-3 rounded-lg border border-line bg-paper p-3.5", (flagged(id, "aims") || flagged(id, "acc") || flagged(id, "sca")) && "is-flagged")}>
            <p className="font-semibold text-ink">
              {m.name} <span className="font-normal text-ash">· {euro(m.cost)} · {m.weeks} {tt("weeks", "Wochen")}</span>
            </p>
            <p className="text-caption text-ash">
              {tt("Data it uses:", "Genutzte Daten:")} <span className="text-ink">{DATA_LABEL[m.data]}</span>. {tt("One more customer:", "Ein weiterer Kunde:")} <span className="text-ink">{EFFORT_LABEL[m.effort]}</span>.
            </p>
            <div>
              <p className="smallcaps">{tt("Which needs does it act on? (choose the ones its mechanism answers, or none)", "Auf welche Bedürfnisse wirkt sie? (Wählen Sie die, die ihr Mechanismus beantwortet, oder keines)")}</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {NEED_IDS.map((n) => {
                  const on = aims?.includes(n) ?? false;
                  return (
                    <button
                      key={n}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setAims(id, on ? (aims ?? []).filter((x) => x !== n) : [...(aims ?? []), n])}
                      className={clsx("btn btn-sm min-h-[40px] border", on ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}
                    >
                      {on ? "☑ " : "☐ "}
                      {NEEDS[n].short}
                    </button>
                  );
                })}
                <button type="button" aria-pressed={aims !== undefined && aims.length === 0} onClick={() => setAims(id, [])} className={clsx("btn btn-sm min-h-[40px] border", aims !== undefined && aims.length === 0 ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
                  {tt("None of the six", "Keines der sechs")}
                </button>
              </div>
              {flagged(id, "aims") && (
                <p className="mt-1 text-caption text-ink">
                  <span className="smallcaps mr-1 text-accent">{tt("Clue", "Hinweis")}</span>{tt("Read the mechanism of this measure against the table “Matching a measure to a need” in Materi A7. Which need does the change in the customer answer, and does anything it does touch a second one?", "Lesen Sie den Mechanismus dieser Maßnahme gegen die Tabelle „Eine Maßnahme einem Bedürfnis zuordnen“ in Materi A7. Welches Bedürfnis beantwortet die Veränderung im Kunden, und berührt etwas, was sie tut, ein zweites?")}
                </p>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <p className="smallcaps">{tt("Effect", "Wirkung")}</p>
                <ScorePick label={tt(`Effect of ${m.name}`, `Wirkung von ${m.name}`)} value={l1.eff[id] || 0} onChange={(v) => setScore("eff", id, v)} />
              </div>
              <div>
                <p className="smallcaps">{tt("Acceptance (from the data it uses)", "Akzeptanz (aus den genutzten Daten)")}</p>
                <ScorePick label={tt(`Acceptance of ${m.name}`, `Akzeptanz von ${m.name}`)} value={l1.acc[id] || 0} onChange={(v) => setScore("acc", id, v)} flagged={flagged(id, "acc")} />
                {flagged(id, "acc") && <p className="mt-1 text-micro normal-case tracking-normal text-ink">{tt("Read “Data it uses” above against the acceptance rule in Materi A7. What is the highest score that data allows?", "Lesen Sie „Genutzte Daten“ oben gegen die Akzeptanz-Regel in Materi A7. Was ist der höchste Wert, den diese Daten erlauben?")}</p>}
              </div>
              <div>
                <p className="smallcaps">{tt("Scalability (from the effort)", "Skalierbarkeit (aus dem Aufwand)")}</p>
                <ScorePick label={tt(`Scalability of ${m.name}`, `Skalierbarkeit von ${m.name}`)} value={l1.sca[id] || 0} onChange={(v) => setScore("sca", id, v)} flagged={flagged(id, "sca")} />
                {flagged(id, "sca") && <p className="mt-1 text-micro normal-case tracking-normal text-ink">{tt("Read “One more customer” above against the scalability rule in Materi A7.", "Lesen Sie „Ein weiterer Kunde“ oben gegen die Skalierbarkeits-Regel in Materi A7.")}</p>}
              </div>
            </div>
            <p className="tnum text-caption text-ink" aria-live="polite">
              {tt("Score:", "Wert:")} {measureScored(l1, id) ? `${l1.eff[id]} × ${l1.acc[id]} × ${l1.sca[id]} = ` : tt("fill all three scores · ", "alle drei Werte ausfüllen · ")}
              <strong>{score || "—"}</strong>
            </p>
            {mentor && <MentorGuide guide={scoreGuide(id)} />}
          </div>
        );
      })}

      {chosen.length > 0 && (
        <div className="space-y-2">
          <p className="smallcaps">{tt("Which of your four needs do your measures reach? (from what each measure really acts on)", "Welche Ihrer vier Bedürfnisse erreichen Ihre Maßnahmen? (danach, worauf jede Maßnahme wirklich wirkt)")}</p>
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {cov.length === 0 && <li className="text-caption text-ash">{tt("Name your four needs in Block 2.2 to see this.", "Nennen Sie Ihre vier Bedürfnisse in Block 2.2, um das zu sehen.")}</li>}
            {cov.map((c) => (
              <li key={c.need} className={clsx("rounded-md border px-3 py-1.5 text-caption", c.covered ? "border-signal/40 bg-signalSoft text-ink" : "border-dashed border-ash bg-mist text-ink")}>
                <span aria-hidden>{c.covered ? "● " : "○ "}</span>
                <strong>{NEEDS[c.need].label}</strong>: {c.covered ? tt("at least one chosen measure acts on it", "mindestens eine gewählte Maßnahme wirkt darauf") : tt("nothing you chose acts on it (the loyalty concept in Block 2.4 can)", "nichts, was Sie gewählt haben, wirkt darauf (das Loyalty-Konzept in Block 2.4 kann es)")}
              </li>
            ))}
          </ul>
        </div>
      )}

      <CheckBar onCheck={check} checkLabel={tt("Check my measures", "Meine Maßnahmen prüfen")} checks={l1.checks} />
      {chosen.length > 0 && (l1.measureFlags.length > 0 || l1.checks > 0) && (
        <Reading>
          {anyFlag
            ? tt(
                `${count("aims")} measure${count("aims") === 1 ? " has" : "s have"} needs that do not match what they act on, ${count("acc")} acceptance score${count("acc") === 1 ? " is" : "s are"} higher than the data allows and ${count("sca")} scalability score${count("sca") === 1 ? " does not" : "s do not"} follow the effort. They are outlined in the cards above.`,
                `Bei ${count("aims")} ${count("aims") === 1 ? "Maßnahme passen" : "Maßnahmen passen"} die genannten Bedürfnisse nicht zu dem, worauf sie wirken, ${count("acc")} ${count("acc") === 1 ? "Akzeptanz-Wert liegt" : "Akzeptanz-Werte liegen"} höher, als die Daten erlauben, und ${count("sca")} ${count("sca") === 1 ? "Skalierbarkeits-Wert folgt" : "Skalierbarkeits-Werte folgen"} nicht dem Aufwand. Sie sind in den Karten oben markiert.`,
              )
            : tt(`The needs you named, the acceptance and the scalability match the measures. Effect is your judgement.`, `Die genannten Bedürfnisse, die Akzeptanz und die Skalierbarkeit passen zu den Maßnahmen. Die Wirkung ist Ihr Urteil.`)}
          {cost > BUDGET ? tt(` The three measures are ${euro(cost - BUDGET)} over the budget.`, ` Die drei Maßnahmen liegen ${euro(cost - BUDGET)} über dem Budget.`) : ""}
        </Reading>
      )}
      <AnswerKey block={measureKey()} />

      {chosen.length === CHOOSE && (
        <div id={IDS.order} className="space-y-2 border-t border-line pt-3">
          <p className="font-semibold text-ink">{tt("Put your three measures in priority order", "Bringen Sie Ihre drei Maßnahmen in eine Prioritätsreihenfolge")}</p>
          <p className="text-caption text-ash">{tt("The first one is the one you start with. Use the arrows, then keep the order. Compare the scores, the cost and the weeks to a first effect.", "Die erste ist die, mit der Sie beginnen. Nutzen Sie die Pfeile und übernehmen Sie dann die Reihenfolge. Vergleichen Sie die Werte, die Kosten und die Wochen bis zur ersten Wirkung.")}</p>
          <ol className="space-y-1.5">
            {shown.map((id, i) => (
              <li key={id} className="flex items-center gap-2 rounded-lg border border-line bg-paper px-3 py-1.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-caption font-bold text-paper">{i + 1}</span>
                <span className="min-w-0 flex-1 text-caption text-ink">
                  {MEASURE_BY_ID[id].name} <span className="tnum text-ash">· {tt("score", "Wert")} {measureScore(l1, id) || "—"}</span>
                </span>
                <button type="button" onClick={() => move(id, -1)} aria-label={tt(`Move ${MEASURE_BY_ID[id].name} up`, `${MEASURE_BY_ID[id].name} nach oben`)} className="btn-ghost btn-sm min-w-[40px]">
                  ↑
                </button>
                <button type="button" onClick={() => move(id, 1)} aria-label={tt(`Move ${MEASURE_BY_ID[id].name} down`, `${MEASURE_BY_ID[id].name} nach unten`)} className="btn-ghost btn-sm min-w-[40px]">
                  ↓
                </button>
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => patch({ order: [...shown] })} className={clsx("btn-sm", l1.order.length === CHOOSE ? "btn-ghost" : "btn-primary")}>
              {l1.order.length === CHOOSE && chosen.every((id) => l1.order.includes(id)) ? tt("✓ Order kept", "✓ Reihenfolge übernommen") : tt("Keep this order", "Reihenfolge übernehmen")}
            </button>
            {inv.length > 0 && (
              <span role="status" className="text-caption text-ink">
                <span className="smallcaps mr-1 text-accent">{tt("Check", "Prüfung")}</span>
                {inv.length === 1 ? tt("One measure sits above one with a higher score.", "Eine Maßnahme steht über einer mit höherem Wert.") : tt(`${inv.length} measures sit above ones with a higher score.`, `${inv.length} Maßnahmen stehen über solchen mit höherem Wert.`)} {tt("If the order is deliberate, say why in the field below.", "Wenn die Reihenfolge bewusst so ist, sagen Sie im Feld unten, warum.")}
              </span>
            )}
          </div>
          <AnswerKey block={orderKey()} />
          <TextBox
            id={IDS.why}
            label={tt("Why does your first priority go first?", "Warum steht Ihre erste Priorität an erster Stelle?")}
            help={tt("Give the order, name the score or the need that decides it, and say what your three measures cost against the budget and what they leave out. At least 60 characters.", "Nennen Sie die Reihenfolge, benennen Sie den Wert oder das Bedürfnis, das sie entscheidet, und sagen Sie, was Ihre drei Maßnahmen gegenüber dem Budget kosten und was sie auslassen. Mindestens 60 Zeichen.")}
            value={l1.why}
            onChange={(v) => patch({ why: v })}
            min={60}
            rows={4}
          >
            <WritingHelp
              id="why-help"
              steps={[tt("Say which measure goes first and why: the score, or the need behind the most lost customers, or how fast it acts.", "Sagen Sie, welche Maßnahme zuerst kommt und warum: der Wert, das Bedürfnis hinter den meisten verlorenen Kunden oder wie schnell sie wirkt."), tt("Name the emotion or trigger it uses (for example trust from a reference, or security from a written protection).", "Nennen Sie die Emotion oder den Trigger, den sie nutzt (zum Beispiel Vertrauen durch eine Referenz oder Sicherheit durch einen schriftlichen Schutz)."), tt(`Say what the three cost together against the ${euro(BUDGET)}, and that the loyalty concept needs the rest.`, `Sagen Sie, was die drei zusammen gegenüber den ${euro(BUDGET)} kosten und dass das Loyalty-Konzept den Rest braucht.`), tt("Say what you left out, and which of your four needs is then not reached by a measure.", "Sagen Sie, was Sie weggelassen haben und welches Ihrer vier Bedürfnisse dann von keiner Maßnahme erreicht wird.")]}
              refs={[
                { label: "Budget", value: euro(BUDGET), target: IDS.measurePick },
                { label: tt("Time", "Zeit"), value: `${MONTHS} ${tt("months", "Monate")}`, target: IDS.measurePick },
              ]}
            />
          </TextBox>
          {mentor && <MentorGuide guide={whyGuide()} />}
        </div>
      )}
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 2.4 */

const typeName = (t: string) => ({ bonus: tt("bonus", "Bonus"), service: tt("service", "Service"), community: tt("community", "Community") })[t as "bonus"] ?? t;

export function Block24() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const ids = l1.loyBenefits;
  const concept = loyaltyCostOf(l1);
  const measuresCost = totalCost(l1.chosen);
  const named = l1.patterns.map((p) => p.need).filter((n): n is NeedId => !!n);
  const reached = benefitNeeds(l1);
  const flags = l1.loyFlags;
  const has = (k: string) => flags.includes(k);

  const toggle = (id: BenefitId) => patch((s) => ({ loyBenefits: s.loyBenefits.includes(id) ? s.loyBenefits.filter((x) => x !== id) : [...s.loyBenefits, id], loyFlags: [], loyClue: {} }));
  const check = () => patch((s) => ({ checks: s.checks + 1, loyFlags: loyaltyFlags(s), loyChecked: true, loyClue: {} }));
  const clue = (k: string, text: string) =>
    has(k) && (
      <div className="fade-in text-caption">
        {l1.loyClue[k] ? (
          <p role="status" className="rounded-md border border-gold bg-accentSoft px-3 py-2 text-ink">
            <span className="smallcaps mr-1 text-accent">{tt("Clue", "Hinweis")}</span>
            {text}
          </p>
        ) : (
          <button type="button" onClick={() => patch((s) => ({ loyClue: { ...s.loyClue, [k]: true } }))} className="btn-ghost btn-sm border-gold">
            {tt("Show clue", "Hinweis anzeigen")}
          </button>
        )}
      </div>
    );

  return (
    <AnswerBlock
      id="block-2-4"
      title={tt("Block 2.4 · Design a simple loyalty concept", "Block 2.4 · Ein einfaches Loyalty-Konzept entwerfen")}
      kind="OBJECTIVE + JUDGED"
      minutes={BLOCK_MINUTES["2.4"]}
      findIt={tt("Route 1 → Task 1 → the types, the benefit menu and the budget bar below. Your three measures from Block 2.3 and your four needs from Block 2.2 count here. Answer by choosing and by writing in the last field.", "Route 1 → Task 1 → die Typen, das Vorteilsmenü und der Budgetbalken unten. Ihre drei Maßnahmen aus Block 2.3 und Ihre vier Bedürfnisse aus Block 2.2 zählen hier. Antworten Sie durch Auswählen und durch Schreiben im letzten Feld.")}
    >
      <MaterialRefs refs={["A5", "A7"]} />
      <p className="text-body text-ink">
        <Gloss>
          {tt(`The loyalty concept should rest on benefit, not on rewards. Choose its main type and two benefits, say how customers join and how it lasts, and check that the whole plan (three measures and this concept) fits the ${euro(BUDGET)}. ${MEMBERS} customers are assumed to join in the first year.`, `Das Loyalty-Konzept sollte auf Nutzen beruhen, nicht auf Belohnungen. Wählen Sie den Haupttyp und zwei Vorteile, sagen Sie, wie Kunden beitreten und wie es anhält, und prüfen Sie, dass der gesamte Plan (drei Maßnahmen und dieses Konzept) in die ${euro(BUDGET)} passt. Es wird angenommen, dass im ersten Jahr ${MEMBERS} Kunden beitreten.`)}
        </Gloss>
      </p>
      <div className="flex flex-wrap items-start gap-2">
        <RevealHint id="loy-tests" label={tt("Show the test questions", "Testfragen anzeigen")} title={tt("The four tests of a concept · taught in Materi A5 and A7", "Die vier Tests eines Konzepts · vermittelt in Materi A5 und A7")}>
          <ul className="list-disc space-y-1 pl-5 text-caption text-ink">
            <li>
              <Gloss>{tt("Type test: what does the customer receive, money (bonus), help (service) or a circle (community)? The type you choose must be the type of at least one of your benefits.", "Typ-Test: Was erhält der Kunde, Geld (Bonus), Hilfe (Service) oder einen Kreis (Community)? Der gewählte Typ muss der Typ mindestens eines Ihrer Vorteile sein.")}</Gloss>
            </li>
            <li>
              <Gloss>{tt("Benefit test: would the customer still want it if the discount disappeared? At most one of your two benefits may be money.", "Vorteils-Test: Würde der Kunde es noch wollen, wenn der Rabatt wegfiele? Höchstens einer Ihrer zwei Vorteile darf Geld sein.")}</Gloss>
            </li>
            <li>
              <Gloss>{tt("Opt-in test: does a customer join by an active choice, and are benefits built only from what members agreed to share?", "Opt-in-Test: Tritt ein Kunde durch eine aktive Entscheidung bei, und werden Vorteile nur aus dem gebaut, was Mitglieder zu teilen zugestimmt haben?")}</Gloss>
            </li>
            <li>
              <Gloss>{tt("Horizon test: does what a member gets grow the longer they stay, or does it only reward the next purchase?", "Horizont-Test: Wächst, was ein Mitglied bekommt, je länger es bleibt, oder belohnt es nur den nächsten Kauf?")}</Gloss>
            </li>
          </ul>
        </RevealHint>
        <RevealHint id="loy-formula" label={tt("Show how the cost is worked out", "Zeigen, wie die Kosten berechnet werden")} title={tt("The cost formula · taught in Materi A5", "Die Kostenformel · vermittelt in Materi A5")}>
          <p className="text-caption text-ink">
            <Gloss>{tt("Cost of the concept in the window = the one-off set-up + (the number of members × the yearly cost per member of the two benefits × the months of the window ÷ 12). The whole plan = the three measures + the concept, held against the budget.", "Kosten des Konzepts im Zeitfenster = der einmalige Aufbau + (die Zahl der Mitglieder × die jährlichen Kosten pro Mitglied der zwei Vorteile × die Monate des Zeitfensters ÷ 12). Der gesamte Plan = die drei Maßnahmen + das Konzept, gegen das Budget gehalten.")}</Gloss>
          </p>
        </RevealHint>
      </div>

      <div id={IDS.loyType} className="space-y-2">
        <p className="font-semibold text-ink">{tt("The main type", "Der Haupttyp")}</p>
        <OptionList<LoyaltyType>
          label={tt("Main type of the concept", "Haupttyp des Konzepts")}
          value={l1.loyType}
          onChange={(v) => patch({ loyType: v, loyFlags: [], loyClue: {} })}
          options={LOYALTY_TYPES.map((t) => ({ id: t.id, label: t.label, sub: tt(`${t.what} Builds: ${t.builds} Lasts: ${t.lasts}`, `${t.what} Baut auf: ${t.builds} Hält: ${t.lasts}`) }))}
        />
        {clue("type", tt("Which type do your two benefits belong to? And would the customer still want a bonus if the discount disappeared? Read the types in Materi A5.", "Zu welchem Typ gehören Ihre zwei Vorteile? Und würde der Kunde einen Bonus noch wollen, wenn der Rabatt wegfiele? Lesen Sie die Typen in Materi A5."))}
        <AnswerKey block={loyaltyTypeKey()} />
      </div>

      <div id={IDS.loyBenefits} className="space-y-2 border-t border-line pt-3">
        <p className="font-semibold text-ink">{tt("Two benefits", "Zwei Vorteile")}</p>
        <OptionList<BenefitId>
          multi
          label={tt("Benefits", "Vorteile")}
          value={ids}
          onChange={toggle}
          disabledIds={ids.length >= BENEFIT_CHOOSE ? BENEFITS.map((b) => b.id) : []}
          onDisabledClick={() => scrollToAndFlash(IDS.loyBenefits, "warn")}
          options={BENEFITS.map((b) => ({ id: b.id, label: `${b.name} · ${typeName(b.type)} · ${euro(b.perMember)} ${tt("per member per year", "pro Mitglied und Jahr")}`, sub: b.what }))}
        />
        <p role="status" className="text-caption text-ash">
          {tt(`${ids.length} of ${BENEFIT_CHOOSE} chosen.${ids.length >= BENEFIT_CHOOSE ? " To choose another, first remove one." : ""}`, `${ids.length} von ${BENEFIT_CHOOSE} gewählt.${ids.length >= BENEFIT_CHOOSE ? " Um einen anderen zu wählen, entfernen Sie zuerst einen." : ""}`)}
        </p>
        {clue("benefits", tt("How many of your two benefits are money? Ask of each: would the customer still want it if the discount disappeared?", "Wie viele Ihrer zwei Vorteile sind Geld? Fragen Sie bei jedem: Würde der Kunde es noch wollen, wenn der Rabatt wegfiele?"))}
        <AnswerKey block={loyaltyBenefitsKey()} />
      </div>

      <div id={IDS.planTotal} className="space-y-2 border-t border-line pt-3">
        <BudgetBar
          items={[...l1.chosen.map((id) => ({ id, short: MEASURE_BY_ID[id].name.split(" ")[0], cost: MEASURE_BY_ID[id].cost })), ...(concept > 0 ? [{ id: "concept", short: "Loyalty", cost: concept }] : [])]}
          budget={BUDGET}
          title={tt(`Three measures and the loyalty concept against the ${euro(BUDGET)} budget`, `Drei Maßnahmen und das Loyalty-Konzept gegen das Budget von ${euro(BUDGET)}`)}
        />
        <p className="text-caption text-ash" aria-live="polite">
          {tt(
            `Measures ${euro(measuresCost)} + concept ${euro(concept)} (${euro(SETUP)} set-up${ids.length ? ` + ${MEMBERS} members × ${euro(ids.reduce((s, id) => s + BENEFIT_BY_ID[id].perMember, 0))} × ${LOYALTY_MONTHS} ÷ 12` : ""}) = ${euro(planCost(l1))} of ${euro(BUDGET)}.`,
            `Maßnahmen ${euro(measuresCost)} + Konzept ${euro(concept)} (${euro(SETUP)} Aufbau${ids.length ? ` + ${MEMBERS} Mitglieder × ${euro(ids.reduce((s, id) => s + BENEFIT_BY_ID[id].perMember, 0))} × ${LOYALTY_MONTHS} ÷ 12` : ""}) = ${euro(planCost(l1))} von ${euro(BUDGET)}.`,
          )}{" "}
          {planOver(l1) > 0 ? tt(`${euro(planOver(l1))} over: leave out a measure, or choose cheaper benefits.`, `${euro(planOver(l1))} zu viel: Lassen Sie eine Maßnahme weg oder wählen Sie günstigere Vorteile.`) : tt(`${euro(planLeft(l1))} left.`, `${euro(planLeft(l1))} übrig.`)}
        </p>
        {mentor && <MentorGuide guide={loyaltyCostGuide()} />}
      </div>

      <div className="grid gap-4 border-t border-line pt-3 md:grid-cols-2">
        <div id={IDS.loyEntry} className="space-y-2">
          <p className="font-semibold text-ink">{tt("How customers join", "Wie Kunden beitreten")}</p>
          <OptionList<EntryId> label={tt("How customers join", "Wie Kunden beitreten")} value={l1.loyEntry} onChange={(v) => patch({ loyEntry: v, loyFlags: [], loyClue: {} })} options={ENTRIES.map((e) => ({ id: e.id, label: e.label }))} />
          {clue("entry", tt("Is joining an active choice the customer makes, that they can take back? Does the concept use data of customers who never agreed to it? Read the consent rules in Materi A4.", "Ist der Beitritt eine aktive Entscheidung des Kunden, die er zurücknehmen kann? Nutzt das Konzept Daten von Kunden, die nie zugestimmt haben? Lesen Sie die Einwilligungsregeln in Materi A4."))}
          <AnswerKey block={entryKey()} />
        </div>
        <div id={IDS.loyHorizon} className="space-y-2">
          <p className="font-semibold text-ink">{tt("How the benefit lasts", "Wie der Vorteil anhält")}</p>
          <OptionList<HorizonId> label={tt("How the benefit lasts", "Wie der Vorteil anhält")} value={l1.loyHorizon} onChange={(v) => patch({ loyHorizon: v, loyFlags: [], loyClue: {} })} options={HORIZONS.map((h) => ({ id: h.id, label: h.label }))} />
          {clue("horizon", tt("What does a customer in their third year get that a new customer cannot buy? Is your choice a reward for the next purchase, or a reason to stay?", "Was bekommt ein Kunde im dritten Jahr, das ein neuer Kunde nicht kaufen kann? Ist Ihre Wahl eine Belohnung für den nächsten Kauf oder ein Grund zu bleiben?"))}
          <AnswerKey block={horizonKey()} />
        </div>
      </div>

      {ids.length > 0 && (
        <div className="space-y-2">
          <p className="smallcaps">{tt("Which of your four needs do your benefits reach?", "Welche Ihrer vier Bedürfnisse erreichen Ihre Vorteile?")}</p>
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {named.length === 0 && <li className="text-caption text-ash">{tt("Name your four needs in Block 2.2 to see this.", "Nennen Sie Ihre vier Bedürfnisse in Block 2.2, um das zu sehen.")}</li>}
            {named.map((n) => (
              <li key={n} className={clsx("rounded-md border px-3 py-1.5 text-caption", reached.includes(n) ? "border-signal/40 bg-signalSoft text-ink" : "border-dashed border-ash bg-mist text-ink")}>
                <span aria-hidden>{reached.includes(n) ? "● " : "○ "}</span>
                <strong>{NEEDS[n].label}</strong>: {reached.includes(n) ? tt("at least one of your benefits acts on it", "mindestens einer Ihrer Vorteile wirkt darauf") : tt("none of your benefits acts on it", "keiner Ihrer Vorteile wirkt darauf")}
              </li>
            ))}
          </ul>
        </div>
      )}

      <TextBox
        id={IDS.loyWhy}
        label={tt("Why will a customer stay for the benefit and not for a discount?", "Warum bleibt ein Kunde wegen des Vorteils und nicht wegen eines Rabatts?")}
        help={tt("Say what the customer would miss if the benefit stopped, which need it answers (one your measures leave uncovered is best), and how it lasts. At least 60 characters.", "Sagen Sie, was der Kunde vermissen würde, wenn der Vorteil endete, welches Bedürfnis er beantwortet (am besten eines, das Ihre Maßnahmen offen lassen) und wie er anhält. Mindestens 60 Zeichen.")}
        value={l1.loyWhy}
        onChange={(v) => patch({ loyWhy: v })}
        min={60}
        rows={4}
      >
        <WritingHelp
          id="loyalty-help"
          steps={[tt("Name the two benefits and the need each one answers.", "Nennen Sie die zwei Vorteile und das Bedürfnis, das jeder beantwortet."), tt("Say what the customer would miss if you stopped it, and why they would not miss a rebate in the same way.", "Sagen Sie, was der Kunde vermissen würde, wenn Sie es einstellten, und warum er einen Rabatt nicht auf dieselbe Weise vermissen würde."), tt("Say how a member joins and what a member gets in the third year that a new customer does not.", "Sagen Sie, wie ein Mitglied beitritt und was ein Mitglied im dritten Jahr bekommt, was ein neuer Kunde nicht bekommt.")]}
          refs={[{ label: tt("Members assumed", "Angenommene Mitglieder"), value: String(MEMBERS), target: IDS.planTotal }]}
        />
      </TextBox>
      {mentor && <MentorGuide guide={loyWhyGuide()} />}

      <CheckBar onCheck={check} checkLabel={tt("Check my concept", "Mein Konzept prüfen")} checks={l1.checks} />
      {l1.loyChecked && (
        <Reading>
          {flags.length === 0
            ? tt("Nothing about the type, the benefits, how customers join or how the benefit lasts is outlined.", "Nichts zu Typ, Vorteilen, Beitritt der Kunden oder Dauer des Vorteils ist markiert.")
            : tt(
                `${flags.length} part${flags.length === 1 ? "" : "s"} of the concept ${flags.length === 1 ? "is" : "are"} outlined: ${flags.map((f) => ({ type: "the main type", benefits: "the benefits", entry: "how customers join", horizon: "how it lasts" })[f as "type"]).join(", ")}.`,
                `${flags.length} ${flags.length === 1 ? "Teil des Konzepts ist" : "Teile des Konzepts sind"} markiert: ${flags.map((f) => ({ type: "der Haupttyp", benefits: "die Vorteile", entry: "wie Kunden beitreten", horizon: "wie es anhält" })[f as "type"]).join(", ")}.`,
              )}
          {planOver(l1) > 0 ? tt(` The whole plan is ${euro(planOver(l1))} over the budget.`, ` Der gesamte Plan liegt ${euro(planOver(l1))} über dem Budget.`) : ""}
        </Reading>
      )}
    </AnswerBlock>
  );
}
