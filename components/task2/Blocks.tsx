"use client";

import clsx from "clsx";
import { Toggles } from "@/components/materi/kit";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { BudgetBar } from "@/components/ui/BudgetBar";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { CheckBar, OptionList, Reading, ScorePick, TextBox } from "@/components/ui/Inputs";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import {
  BEHAVIOUR_LEVERS,
  COST_SHAPE_LABEL,
  CRITERIA,
  DECISIONS,
  DEPENDS_LABEL,
  GROUPS,
  GROUP_IDS,
  KIND_LABEL,
  KPIS,
  LEVELS,
  LEVEL_BY_ID,
  MAIN_LEVER_OPTIONS,
  OWNERS,
  OWNER_IDS,
  PHASES,
  PHASE_IDS,
  R2_BUDGET,
  R2_MONTHS,
  R2_TXT,
  RISKS,
  RISK_BY_ID,
  RISK_CHOOSE,
  SYSTEMS,
  SYSTEM_BY_ID,
  SYSTEM_CHOOSE,
  VISIONS,
  archName,
  engineCost,
  engineLevel,
  levelIndex,
  responders,
} from "@/data/route2";
import type { ArchId, Criterion, DecisionId, GroupId, KpiId, LeverKind, LevelId, OwnerId, PhaseId, RiskId, SystemId, VisionId } from "@/data/route2";
import { archCost, archCostOf, archLeft, archList, archOver, bonusSystems, funded, hasNumber, ladderFlags, ladderPlaced, leversHold, psychologyCount, ratingFlags, seqRules, signalFlags, systemTotal, systemicCount, totalResponders, tripFlags, visionHolds } from "@/lib/checks";
import { scrollToAndFlash } from "@/lib/flash";
import { Gloss } from "@/lib/glossify";
import { euro, num, tt } from "@/lib/lang";
import { IDS } from "@/lib/missing";
import { assumptionGuide, challengeGuide, mainWhyGuide, moveGuide, postponedGuide, ratingGuide, riskResponseGuide, triggerGuide, visionTextGuide, weighGuide } from "@/lib/mentorGuide";
import { decisionKey, ladderKey, leverKey, ownerKey, riskKey, systemKey, tripKey, visionKey } from "@/lib/answerKey";
import { MIN_LINE } from "@/lib/progress";
import { BLOCK_MINUTES } from "@/lib/routes";
import { useStore } from "@/store/useStore";
import type { Score } from "@/store/useStore";

const CRIT_IDS: Criterion[] = ["reach", "depth", "durability", "scale"];
const MONTHS_LIST = Array.from({ length: R2_MONTHS }, (_, i) => i + 1);
const pctS = () => tt("%", " %");

/* ------------------------------------------------------------------ Block 3.1 */

export function Block31() {
  const r2 = useStore((s) => s.r2);
  const patch = useStore((s) => s.patchR2);
  const mentor = useStore((s) => s.mentorUnlocked);
  const check = () => patch((s) => ({ checks: s.checks + 1, visionFlagged: !!s.vision && !visionHolds(s), visionClue: false }));
  return (
    <AnswerBlock
      id="block-3-1"
      title={tt("Block 3.1 · Set the target vision", "Block 3.1 · Die Zielvision festlegen")}
      kind="OBJECTIVE + JUDGED"
      minutes={BLOCK_MINUTES["3.1"]}
      core={true}
      findIt={tt("Route 2 → Task 2 → “Where Route 1 left off” in the case above, and the five visions below. Answer by choosing one and writing it in your own words.", "Route 2 → Task 2 → „Wo Route 1 stehen geblieben ist“ im Fall oben und die fünf Visionen unten. Antworten Sie, indem Sie eine wählen und sie in eigenen Worten formulieren.")}
    >
      <MaterialRefs refs={["B1"]} />
      <div id={IDS.vision} className={clsx("space-y-2 rounded-lg p-1", r2.visionFlagged && "is-flagged")}>
        <p className="text-body text-ink">
          <Gloss>{tt("Choose the vision for an emotional and personalised customer strategy. A vision names an outcome in the customer's head and behaviour, not a tactic and not a price.", "Wählen Sie die Vision für eine emotionale und personalisierte Kundenstrategie. Eine Vision nennt ein Ergebnis im Kopf und im Verhalten des Kunden, keine Taktik und keinen Preis.")}</Gloss>
        </p>
        <OptionList<VisionId> label={tt("Target vision", "Zielvision")} value={r2.vision} onChange={(v) => patch({ vision: v, visionFlagged: false, visionClue: false })} options={VISIONS.map((v) => ({ id: v.id, label: v.label, sub: v.detail }))} />
        {r2.visionFlagged && (
          <p className="text-caption text-ink">
            <span className="smallcaps mr-1 text-accent">{tt("Check", "Prüfung")}</span>
            {r2.visionClue ? (
              tt("Is this an outcome in what customers feel and do, or a tactic or a price position? Could you see it come true in customer behaviour? Read the three tests of a vision in Materi B1.", "Ist das ein Ergebnis dessen, was Kunden fühlen und tun, oder eine Taktik oder eine Preisposition? Könnten Sie sehen, wie es im Kundenverhalten wahr wird? Lesen Sie die drei Tests einer Vision in Materi B1.")
            ) : (
              <button type="button" onClick={() => patch({ visionClue: true })} className="btn-ghost btn-sm border-gold">
                {tt("Show clue", "Hinweis anzeigen")}
              </button>
            )}
          </p>
        )}
        <AnswerKey block={visionKey()} />
      </div>
      <TextBox
        id={IDS.visionText}
        label={tt("The vision in your own words", "Die Vision in eigenen Worten")}
        help={tt("What will a customer say about CloudTech in twelve months, and what will they do? Name one behaviour you could see. At least 60 characters.", "Was wird ein Kunde in zwölf Monaten über CloudTech sagen, und was wird er tun? Nennen Sie ein Verhalten, das Sie sehen könnten. Mindestens 60 Zeichen.")}
        value={r2.visionText}
        onChange={(v) => patch({ visionText: v })}
        min={60}
        rows={3}
      />
      <ExampleAnswer id="vision-text-example" guide={visionTextGuide()} />
      {mentor && <MentorGuide guide={visionTextGuide()} />}
      <CheckBar onCheck={check} checkLabel={tt("Check my vision", "Meine Vision prüfen")} checks={r2.checks} />
      <BlockMissing block="3.1" route={2} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 3.2 */

export function Block32() {
  const r2 = useStore((s) => s.r2);
  const patch = useStore((s) => s.patchR2);
  const mentor = useStore((s) => s.mentorUnlocked);
  const setLever = (k: LeverKind, p: Partial<(typeof r2.levers)[LeverKind]>) => patch((s) => ({ levers: { ...s.levers, [k]: { ...s.levers[k], ...p } }, leverResult: null }));
  const check = () =>
    patch((s) => {
      const m = leversHold(s);
      return { checks: s.checks + 1, leverResult: { holds: m.holds, total: m.total }, leverClue: false };
    });
  return (
    <AnswerBlock
      id="block-3-2"
      title={tt("Block 3.2 · Define the three behaviour levers: emotion, trust, relevance", "Block 3.2 · Die drei Verhaltenshebel definieren: Emotion, Vertrauen, Relevanz")}
      kind="OBJECTIVE + JUDGED"
      minutes={BLOCK_MINUTES["3.2"]}
      core={false}
      findIt={tt("Route 2 → Task 2 → the three levers below. For each, answer the customer's question, the signal, the phase and what your system does.", "Route 2 → Task 2 → die drei Hebel unten. Beantworten Sie für jeden die Frage des Kunden, das Signal, die Phase und was Ihr System tut.")}
    >
      <MaterialRefs refs={["B1"]} />
      <p className="text-body text-ink">
        <Gloss>{tt("One row per lever. For each, choose the question the customer is settling, the behaviour you would see if the lever is missing, and the phase in which it matters most, then say what your process does about it, whoever is on duty.", "Eine Zeile pro Hebel. Wählen Sie für jeden die Frage, die der Kunde klärt, das Verhalten, das Sie sähen, wenn der Hebel fehlt, und die Phase, in der er am meisten zählt, und sagen Sie dann, was Ihr Prozess dafür tut, wer auch immer Dienst hat.")}</Gloss>
      </p>
      {BEHAVIOUR_LEVERS.map((l) => {
        const m = r2.levers[l.id];
        return (
          <div key={l.id} id={IDS.lever(l.id)} className="space-y-3 rounded-lg border border-line bg-paper p-3.5">
            <p className="font-semibold text-ink">
              {l.name} <span className="font-normal text-ash">· {l.hint}</span>
            </p>
            <div>
              <p className="smallcaps">{tt("The customer's question", "Die Frage des Kunden")}</p>
              <OptionList label={tt(`${l.name}: the customer's question`, `${l.name}: die Frage des Kunden`)} value={m.question} onChange={(v) => setLever(l.id, { question: v })} options={l.questions} />
            </div>
            <div>
              <p className="smallcaps">{tt("The behaviour you would see if this lever is missing", "Das Verhalten, das Sie sähen, wenn dieser Hebel fehlt")}</p>
              <OptionList label={tt(`${l.name}: the signal`, `${l.name}: das Signal`)} value={m.signal} onChange={(v) => setLever(l.id, { signal: v })} options={l.signals} />
            </div>
            <div>
              <p className="smallcaps">{tt("The phase in which it matters most", "Die Phase, in der er am meisten zählt")}</p>
              <Toggles<PhaseId> label={tt(`${l.name}: the phase`, `${l.name}: die Phase`)} value={m.phase} onChange={(v) => setLever(l.id, { phase: v })} options={PHASE_IDS.map((p) => ({ id: p, label: PHASES[p].name }))} />
              {m.phase && <p className="mt-1 text-micro normal-case tracking-normal text-ash">{PHASES[m.phase].hint}</p>}
            </div>
            <TextBox
              id={`${IDS.lever(l.id)}-move`}
              label={tt(`What your system does for ${l.name.toLowerCase()}`, `Was Ihr System für ${l.name} tut`)}
              help={tt("One or two sentences: a step of the process or a rule that answers the customer's question, whoever is on duty. Not something one person has to remember.", "Ein bis zwei Sätze: ein Prozessschritt oder eine Regel, die die Frage des Kunden beantwortet, wer auch immer Dienst hat. Nichts, woran sich eine einzelne Person erinnern muss.")}
              value={m.move}
              onChange={(v) => setLever(l.id, { move: v })}
              min={MIN_LINE}
              rows={2}
            />
            <ExampleAnswer id={`lever-${l.id}-move-example`} guide={moveGuide(l.id)} />
            {mentor && <MentorGuide guide={moveGuide(l.id)} />}
          </div>
        );
      })}
      <CheckBar onCheck={check} checkLabel={tt("Check my levers", "Meine Hebel prüfen")} checks={r2.checks} clueShown={r2.leverClue} onClue={() => patch({ leverClue: true })} />
      {r2.leverResult && (
        <Reading>
          {tt(`${r2.leverResult.holds} of ${r2.leverResult.total} picks hold (the question, the signal and the phase of each lever). A check never says which.`, `${r2.leverResult.holds} von ${r2.leverResult.total} Auswahlen stimmen (die Frage, das Signal und die Phase jedes Hebels). Eine Prüfung sagt nie, welche.`)}
          {r2.leverClue ? tt(" Clue: read each choice against the description at the top of its row. Would a customer ask it, or would you see it, for this lever and not for another? And in which phase would you first notice it?", " Hinweis: Lesen Sie jede Auswahl gegen die Beschreibung oben in ihrer Zeile. Würde ein Kunde das fragen, oder würden Sie es sehen, bei diesem Hebel und nicht bei einem anderen? Und in welcher Phase würden Sie es zuerst bemerken?") : ""}
        </Reading>
      )}
      <AnswerKey block={leverKey()} />
      <BlockMissing block="3.2" route={2} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 3.3 */

export function Block33() {
  const r2 = useStore((s) => s.r2);
  const patch = useStore((s) => s.patchR2);
  const mentor = useStore((s) => s.mentorUnlocked);
  const levels = [r2.lvl.A, r2.lvl.B, r2.lvl.C];
  const cost = engineCost(levels);
  const top = engineLevel(levels);
  const total = totalResponders(r2);
  const placed = ladderPlaced(r2);
  const flags = ladderFlags(r2);
  const setLvl = (g: GroupId, l: LevelId) => patch((s) => ({ lvl: { ...s.lvl, [g]: l }, lvlFlags: s.lvlFlags.filter((x) => x !== g), lvlChecked: false }));
  const check = () => patch((s) => ({ checks: s.checks + 1, lvlFlags: ladderFlags(s), lvlChecked: true, lvlClue: false }));
  return (
    <AnswerBlock
      id="block-3-3"
      title={tt("Block 3.3 · Weigh personalisation against effort and data protection", "Block 3.3 · Personalisierung gegen Aufwand und Datenschutz abwägen")}
      kind="OBJECTIVE + JUDGED"
      minutes={BLOCK_MINUTES["3.3"]}
      core={false}
      findIt={tt("Route 2 → Task 2 → the table below: three customer groups down the side, five levels of personalisation across the top. Each cell shows how many customers would respond. Answer by choosing one level per group.", "Route 2 → Task 2 → die Tabelle unten: drei Kundengruppen an der Seite, fünf Stufen der Personalisierung oben. Jede Zelle zeigt, wie viele Kunden reagieren würden. Antworten Sie, indem Sie pro Gruppe eine Stufe wählen.")}
    >
      <MaterialRefs refs={["B2", "A4"]} />
      <p className="text-body text-ink">
        <Gloss>
          {tt("Personalisation can go up a ladder of five levels. Each level needs the one below it, so you pay for the highest level you use. Each group of customers has agreed to something different, and what a group has agreed to limits how far you may go. Choose a level for each group, then say why not the top for everyone.", "Personalisierung kann eine Leiter mit fünf Stufen hinaufgehen. Jede Stufe braucht die darunter, Sie bezahlen also die höchste Stufe, die Sie nutzen. Jede Kundengruppe hat etwas anderem zugestimmt, und was eine Gruppe zugestimmt hat, begrenzt, wie weit Sie gehen dürfen. Wählen Sie für jede Gruppe eine Stufe und sagen Sie dann, warum nicht für alle die oberste.")}
        </Gloss>
      </p>
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[46rem] border-collapse text-caption">
          <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("The ladder (Case assumption; response rates are illustrative, not measured)", "Die Leiter (Case-Annahme; die Response Rates sind beispielhaft, nicht gemessen)")}</caption>
          <thead>
            <tr className="text-left text-micro uppercase text-ash">
              <th className="px-3 py-2">{tt("Level", "Stufe")}</th>
              <th className="px-3 py-2">{tt("What it uses", "Was sie nutzt")}</th>
              <th className="px-3 py-2 text-right">{tt("Cost for 12 months", "Kosten für 12 Monate")}</th>
              <th className="px-3 py-2 text-right">Response Rate</th>
            </tr>
          </thead>
          <tbody>
            {LEVELS.map((l) => (
              <tr key={l.id} id={`lvl-head-${l.id}`} className="border-t border-line align-top">
                <td className="px-3 py-2 font-semibold">
                  {tt("Level", "Stufe")} {l.n} · {l.name}
                  <br />
                  <span className="font-normal text-ash">{l.what}</span>
                </td>
                <td className="px-3 py-2">
                  {l.data}
                  <br />
                  <span className="text-ash">{l.risk}</span>
                </td>
                <td className="tnum px-3 py-2 text-right font-semibold">{euro(l.cost)}</td>
                <td className="tnum px-3 py-2 text-right font-semibold">{l.rate}{pctS()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3">
        {GROUP_IDS.map((g) => {
          const gr = GROUPS[g];
          const sel = r2.lvl[g];
          const flagged = r2.lvlFlags.includes(g);
          return (
            <div key={g} id={IDS.level(g)} className={clsx("space-y-2 rounded-lg border border-line bg-paper p-3.5", flagged && "is-flagged")}>
              <p className="font-semibold text-ink">
                {tt("Group", "Gruppe")} {g} · {gr.name} <span className="font-normal text-ash">· {num(gr.size)} {gr.unit}</span>
              </p>
              <p className="text-caption text-ash">
                {gr.detail} <span className="text-ink">{gr.holds}</span>
              </p>
              <div role="radiogroup" aria-label={tt(`Level of personalisation for group ${g}`, `Stufe der Personalisierung für Gruppe ${g}`)} className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {LEVELS.map((l) => {
                  const on = sel === l.id;
                  const r = responders(g, l.id);
                  return (
                    <button
                      key={l.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setLvl(g, l.id)}
                      className={clsx("flex min-h-[56px] flex-col items-start justify-center rounded-lg border px-2.5 py-1.5 text-left text-caption transition-colors", on ? "border-accent bg-accentSoft ring-2 ring-gold" : "border-line bg-paper hover:border-ash")}
                    >
                      <span className="font-semibold text-ink">{tt("Level", "Stufe")} {l.n}</span>
                      <span className="tnum text-ash">{num(r, { maximumFractionDigits: 1 })} {tt("respond", "reagieren")}</span>
                    </button>
                  );
                })}
              </div>
              {sel && (
                <p className="text-caption text-ash">
                  {tt("Level", "Stufe")} {LEVEL_BY_ID[sel].n} · {LEVEL_BY_ID[sel].name}: {num(gr.size)} × {LEVEL_BY_ID[sel].rate}{pctS()} = <span className="tnum font-semibold text-ink">{num(responders(g, sel), { maximumFractionDigits: 1 })}</span> {tt("responders", "Reagierende")}.
                </p>
              )}
              {flagged && (
                <p className="text-caption text-ink">
                  <span className="smallcaps mr-1 text-accent">{r2.lvlClue ? tt("Clue", "Hinweis") : tt("Check", "Prüfung")}</span>
                  {r2.lvlClue ? (
                    tt("Which data does this level use, and has this group agreed to it? Read the group's description above and the “What it uses” column of the ladder.", "Welche Daten nutzt diese Stufe, und hat diese Gruppe dem zugestimmt? Lesen Sie die Beschreibung der Gruppe oben und die Spalte „Was sie nutzt“ der Leiter.")
                  ) : (
                    <button type="button" onClick={() => patch({ lvlClue: true })} className="btn-ghost btn-sm border-gold">
                      {tt("Show clue", "Hinweis anzeigen")}
                    </button>
                  )}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="space-y-1 rounded-lg border border-line bg-mist/50 p-3 text-caption text-ink" aria-live="polite">
        <p className="smallcaps">{tt("What your choice means", "Was Ihre Wahl bedeutet")}</p>
        {placed === 0 && <p>{tt("Choose a level for a group to see what it means.", "Wählen Sie für eine Gruppe eine Stufe, um zu sehen, was sie bedeutet.")}</p>}
        {placed > 0 && (
          <>
            <p>
              {tt("Responders in all:", "Reagierende insgesamt:")} <strong className="tnum">{num(total, { maximumFractionDigits: 1 })}</strong> {tt(`across ${placed} group${placed === 1 ? "" : "s"}.`, `über ${placed} ${placed === 1 ? "Gruppe" : "Gruppen"}.`)} {tt("The engine for the highest level you use (level", "Die Engine für die höchste Stufe, die Sie nutzen (Stufe")} {top ? LEVEL_BY_ID[top].n : "—"}) {tt("costs", "kostet")} <strong className="tnum">{euro(cost)}</strong>
              {total > 0 ? tt(`, which is ${euro(cost / total)} for each responder.`, `, das sind ${euro(cost / total)} pro Reagierendem.`) : "."}
            </p>
            {GROUP_IDS.some((g) => r2.lvl[g] && levelIndex(r2.lvl[g] as LevelId) > 0) && <p>{tt("Every level above the lowest needs the ones below it: the cost is that of the top level, not a sum.", "Jede Stufe über der niedrigsten braucht die darunter: Die Kosten sind die der obersten Stufe, keine Summe.")}</p>}
            {top && levelIndex(top) === 4 && <p>{tt("Level 4 needs a separate consent that CloudTech does not hold. Its cost is the largest item on the ladder for one more point of response than level 3.", "Stufe 4 braucht eine gesonderte Einwilligung, die CloudTech nicht hat. Ihre Kosten sind der größte Posten der Leiter für einen Punkt mehr Response als Stufe 3.")}</p>}
          </>
        )}
      </div>

      <CheckBar onCheck={check} checkLabel={tt("Check my levels", "Meine Stufen prüfen")} checks={r2.checks} />
      {r2.lvlChecked && (
        <Reading>
          {flags.length === 0
            ? tt("Every group you placed is within the data it allows. Whether a lower level is the better buy is a cost decision, and it is yours.", "Jede Gruppe, die Sie platziert haben, bleibt innerhalb der Daten, die sie erlaubt. Ob eine niedrigere Stufe der bessere Kauf ist, ist eine Kostenentscheidung, und sie liegt bei Ihnen.")
            : tt(`${flags.length} of ${placed} placed group${placed === 1 ? " goes" : "s go"} beyond the data ${flags.length === 1 ? "it allows" : "they allow"}, and ${flags.length === 1 ? "is" : "are"} outlined above.`, `${flags.length} von ${placed} platzierten ${placed === 1 ? "Gruppe geht" : "Gruppen gehen"} über die Daten hinaus, die ${flags.length === 1 ? "sie erlaubt" : "sie erlauben"}, und ${flags.length === 1 ? "ist" : "sind"} oben markiert.`)}
        </Reading>
      )}
      <AnswerKey block={ladderKey()} />

      <TextBox
        id={IDS.weigh}
        label={tt("Why do you not personalise every group as far as possible?", "Warum personalisieren Sie nicht jede Gruppe so weit wie möglich?")}
        help={tt("Name the data limit of at least one group, and use a figure from the table (a cost, a response rate or a number of responders). At least 60 characters.", "Nennen Sie die Datengrenze mindestens einer Gruppe und nutzen Sie eine Zahl aus der Tabelle (Kosten, Response Rate oder Zahl der Reagierenden). Mindestens 60 Zeichen.")}
        value={r2.weigh}
        onChange={(v) => patch({ weigh: v })}
        min={60}
        rows={4}
      >
        <WritingHelp
          id="weigh-help"
          steps={[tt("Say which group limits you most and what it has agreed to.", "Sagen Sie, welche Gruppe Sie am meisten begrenzt und wozu sie zugestimmt hat."), tt("Say what the level you chose costs and what the next level up would add (responders, or the response rate).", "Sagen Sie, was die gewählte Stufe kostet und was die nächsthöhere hinzufügen würde (Reagierende oder Response Rate)."), tt("Say what you do not do, and why: think about level 4.", "Sagen Sie, was Sie nicht tun, und warum: Denken Sie an Stufe 4.")]}
          refs={[
            { label: tt("Level 3 cost for 12 months", "Kosten von Stufe 3 für 12 Monate"), value: euro(LEVEL_BY_ID.l3.cost), target: "lvl-head-l3" },
            { label: tt("Level 4 cost for 12 months", "Kosten von Stufe 4 für 12 Monate"), value: euro(LEVEL_BY_ID.l4.cost), target: "lvl-head-l4" },
            { label: tt("Response rate of level 3", "Response Rate von Stufe 3"), value: `${LEVEL_BY_ID.l3.rate}${pctS()}`, target: "lvl-head-l3" },
          ]}
        />
      </TextBox>
      <ExampleAnswer id="weigh-example" guide={weighGuide()} />
      {mentor && <MentorGuide guide={weighGuide()} />}
      <BlockMissing block="3.3" route={2} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 3.4 */

const lik = (n: number) => ["", tt("low", "niedrig"), tt("mid", "mittel"), tt("high", "hoch")][n];

export function Block34() {
  const r2 = useStore((s) => s.r2);
  const patch = useStore((s) => s.patchR2);
  const mentor = useStore((s) => s.mentorUnlocked);
  const toggle = (id: SystemId) =>
    patch((s) => {
      const next = s.sys.includes(id) ? s.sys.filter((x) => x !== id) : [...s.sys, id];
      return { sys: next, rateFlags: [], sysResult: null };
    });
  const setRate = (id: SystemId, c: Criterion, v: Score) => patch((s) => ({ rate: { ...s.rate, [`${id}.${c}`]: v }, rateFlags: s.rateFlags.filter((f) => f !== `${id}.${c}`), sysResult: null }));
  const check = () => patch((s) => ({ checks: s.checks + 1, rateFlags: ratingFlags(s), rateClue: {}, sysResult: { systemic: systemicCount(s.sys), bonus: bonusSystems(s.sys) } }));
  const scalable = r2.sys.filter((id) => r2.rate[`${id}.scale`] === 3);
  const lasting = r2.sys.filter((id) => r2.rate[`${id}.durability`] === 3 && (r2.rate[`${id}.depth`] || 0) >= 2);
  return (
    <AnswerBlock
      id="block-3-4"
      title={tt("Block 3.4 · A loyalty system, not just bonuses", "Block 3.4 · Ein Loyalty-System, nicht nur Boni")}
      kind="OBJECTIVE + JUDGED"
      minutes={BLOCK_MINUTES["3.4"]}
      core={true}
      findIt={tt("Route 2 → Task 2 → the seven building blocks below, each with what it depends on and how its cost behaves. Answer by choosing three, rating each on the four tests and naming the lever your system serves most.", "Route 2 → Task 2 → die sieben Bausteine unten, jeweils mit dem, wovon sie abhängen, und wie sich ihre Kosten verhalten. Antworten Sie, indem Sie drei wählen, jeden nach den vier Tests bewerten und den Hebel nennen, den Ihr System am meisten bedient.")}
    >
      <MaterialRefs refs={["B3", "A5"]} />
      <div id={IDS.sysPick} className="space-y-2">
        <p className="text-body text-ink">
          <Gloss>{tt("Choose exactly three building blocks for a loyalty system. Read what each depends on and how its cost repeats: those printed facts limit the ratings you can honestly give. The personalisation you chose in Block 3.3 and the consent foundation are added in Block 3.6, so leave them out here.", "Wählen Sie genau drei Bausteine für ein Loyalty-System. Lesen Sie, wovon jeder abhängt und wie sich seine Kosten wiederholen: Diese gedruckten Fakten begrenzen die Bewertungen, die Sie ehrlich geben können. Die Personalisierung aus Block 3.3 und das Einwilligungsfundament kommen in Block 3.6 dazu, lassen Sie sie hier also weg.")}</Gloss>
        </p>
        <OptionList<SystemId>
          multi
          label={tt("Building blocks", "Bausteine")}
          value={r2.sys}
          onChange={toggle}
          disabledIds={r2.sys.length >= SYSTEM_CHOOSE ? SYSTEMS.map((s) => s.id) : []}
          onDisabledClick={() => scrollToAndFlash(IDS.sysPick, "warn")}
          options={SYSTEMS.map((s) => ({
            id: s.id,
            label: `${s.name} · ${euro(s.cost)} · ${s.weeks} ${tt("weeks", "Wochen")}`,
            sub: tt(
              `${s.what} Kind: ${KIND_LABEL[s.kind]}. Depends on: ${DEPENDS_LABEL[s.depends]}. Cost: ${COST_SHAPE_LABEL[s.costShape]}. Applies to: ${s.reachAll ? "every customer" : "some customers only (members)"}. Acts on: ${s.acts}`,
              `${s.what} Art: ${KIND_LABEL[s.kind]}. Hängt ab von: ${DEPENDS_LABEL[s.depends]}. Kosten: ${COST_SHAPE_LABEL[s.costShape]}. Gilt für: ${s.reachAll ? "jeden Kunden" : "nur einige Kunden (Mitglieder)"}. Wirkt auf: ${s.acts}`,
            ),
          }))}
        />
        <p role="status" className="text-caption text-ash">
          {tt(`${r2.sys.length} of ${SYSTEM_CHOOSE} chosen.${r2.sys.length >= SYSTEM_CHOOSE ? " To choose another, first remove one." : ""}`, `${r2.sys.length} von ${SYSTEM_CHOOSE} gewählt.${r2.sys.length >= SYSTEM_CHOOSE ? " Um einen anderen zu wählen, entfernen Sie zuerst einen." : ""}`)}
        </p>
        <p className="text-caption text-ash">
          {tt("Cost shapes:", "Kostenformen:")} <strong>{tt("one-off", "einmalig")}</strong> {tt("is paid once,", "wird einmal bezahlt,")} <strong>{tt("per event", "pro Ereignis")}</strong> {tt("repeats with every event (a review, a round table),", "fällt bei jedem Ereignis wieder an (ein Review, ein Round Table),")} <strong>{tt("per member", "pro Mitglied")}</strong> {tt("repeats with every member. Words in the blocks, explained in plain language:", "fällt bei jedem Mitglied wieder an. Wörter in den Bausteinen, in einfacher Sprache erklärt:")} <Gloss>{tt("rebate, round table, advisory circle, roadmap.", "Rabatt, Round Table, Kundenbeirat, Roadmap.")}</Gloss>
        </p>
      </div>

      {r2.sys.map((id) => {
        const s = SYSTEM_BY_ID[id];
        return (
          <div key={id} id={IDS.sys(id)} className="space-y-2 rounded-lg border border-line bg-paper p-3.5">
            <p className="font-semibold text-ink">
              {s.name} <span className="font-normal text-ash">· {KIND_LABEL[s.kind]} · {DEPENDS_LABEL[s.depends]} · {COST_SHAPE_LABEL[s.costShape]}</span>
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {CRITERIA.map((c) => {
                const flagged = r2.rateFlags.includes(`${id}.${c.id}`);
                return (
                  <div key={c.id}>
                    <p className="smallcaps">{c.name}</p>
                    <p className="mb-1 text-micro normal-case leading-snug tracking-normal text-ash">{c.test}</p>
                    <ScorePick label={tt(`${c.name} of ${s.name}`, `${c.name} von ${s.name}`)} value={r2.rate[`${id}.${c.id}`] || 0} onChange={(v) => setRate(id, c.id, v)} flagged={flagged} />
                    {flagged && (
                      <p className="mt-1 text-micro normal-case tracking-normal text-ink">
                        <span className="font-semibold text-accent">{tt("Check.", "Prüfung.")} </span>
                        {tt(`Read the printed facts of this block (${c.id === "reach" ? "who it applies to" : c.id === "durability" ? "what it depends on" : "how its cost behaves"}) against the limits under “Four tests of a system” in Materi B3.`, `Lesen Sie die gedruckten Fakten dieses Bausteins (${c.id === "reach" ? "für wen er gilt" : c.id === "durability" ? "wovon er abhängt" : "wie sich seine Kosten verhalten"}) gegen die Grenzen unter „Vier Tests eines Systems“ in Materi B3.`)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="tnum text-caption text-ink">{tt("Total:", "Summe:")} {CRIT_IDS.every((c) => r2.rate[`${id}.${c}`]) ? tt(`${systemTotal(r2, id)} of 12`, `${systemTotal(r2, id)} von 12`) : tt("rate all four tests", "alle vier Tests bewerten")}</p>
            {mentor && <MentorGuide guide={ratingGuide(id)} />}
          </div>
        );
      })}

      {r2.sys.length > 0 && (
        <div className="space-y-1 rounded-lg border border-line bg-mist/50 p-3 text-caption text-ink" aria-live="polite">
          <p className="smallcaps">{tt("What your own choices say", "Was Ihre eigenen Entscheidungen sagen")}</p>
          <p>
            {tt("Process or rule blocks among your three:", "Prozess- oder Regel-Bausteine unter Ihren dreien:")} <strong>{systemicCount(r2.sys)}</strong>.{" "}
            {systemicCount(r2.sys) < 2 ? tt("A system that depends on individual people or on a discount stops working when the person leaves or the discount ends.", "Ein System, das von einzelnen Menschen oder von einem Rabatt abhängt, hört auf zu wirken, wenn die Person geht oder der Rabatt endet.") : ""}
          </p>
          <p>
            {tt("Bonus blocks among your three:", "Bonus-Bausteine unter Ihren dreien:")} <strong>{bonusSystems(r2.sys)}</strong>.{" "}
            {bonusSystems(r2.sys) >= 2 ? tt("A system made only of bonuses is a discount programme.", "Ein System nur aus Boni ist ein Rabattprogramm.") : bonusSystems(r2.sys) === 1 ? tt("One bonus can sit in a system, if it is not the whole of it.", "Ein Bonus kann in einem System stehen, wenn er nicht das Ganze ist.") : tt("None of your three depends on a reward.", "Keiner Ihrer drei hängt von einer Belohnung ab.")}
          </p>
          <p>{tt("Lasting (durability 3 and depth at least 2):", "Dauerhaft (Durability 3 und Tiefe mindestens 2):")} {lasting.length ? lasting.map((i) => SYSTEM_BY_ID[i].name).join(", ") : tt("none yet, or not rated.", "noch keiner oder nicht bewertet.")}</p>
          <p>{tt("Scalable (scale 3):", "Skalierbar (Skalierung 3):")} {scalable.length ? scalable.map((i) => SYSTEM_BY_ID[i].name).join(", ") : tt("none yet, or not rated.", "noch keiner oder nicht bewertet.")}</p>
        </div>
      )}

      <CheckBar onCheck={check} checkLabel={tt("Check my system", "Mein System prüfen")} checks={r2.checks} />
      {r2.sysResult && (
        <Reading>
          {tt(`${r2.sysResult.systemic} of ${r2.sys.length} of your building blocks are process or rule blocks, and ${r2.sysResult.bonus} ${r2.sysResult.bonus === 1 ? "is a bonus" : "are bonuses"}.`, `${r2.sysResult.systemic} von ${r2.sys.length} Ihrer Bausteine sind Prozess- oder Regel-Bausteine, und ${r2.sysResult.bonus} ${r2.sysResult.bonus === 1 ? "ist ein Bonus" : "sind Boni"}.`)}{" "}
          {r2.sys.length === SYSTEM_CHOOSE && r2.sysResult.systemic < 2 ? tt("The rule in Materi B3 asks for at least two: a system that depends on people or on a discount leaves with them. ", "Die Regel in Materi B3 verlangt mindestens zwei: Ein System, das von Menschen oder von einem Rabatt abhängt, geht mit ihnen. ") : ""}
          {r2.sysResult.bonus >= 2 ? tt("A loyalty system is more than a bonus: at most one of your three should be one. ", "Ein Loyalty-System ist mehr als ein Bonus: Höchstens einer Ihrer drei sollte einer sein. ") : ""}
          {r2.rateFlags.length > 0 ? tt(`${r2.rateFlags.length} rating${r2.rateFlags.length === 1 ? "" : "s"} exceed what the printed facts allow and are outlined above.`, `${r2.rateFlags.length} ${r2.rateFlags.length === 1 ? "Bewertung übersteigt" : "Bewertungen übersteigen"}, was die gedruckten Fakten erlauben, und ${r2.rateFlags.length === 1 ? "ist" : "sind"} oben markiert.`) : ""}
        </Reading>
      )}
      <AnswerKey block={systemKey()} />

      {r2.sys.length > 0 && (
        <div className="space-y-2 border-t border-line pt-3">
          <div id={IDS.mainLever} className="space-y-1.5">
            <p className="font-semibold text-ink">{tt("Which behaviour lever does your system serve most?", "Welchen Verhaltenshebel bedient Ihr System am meisten?")}</p>
            <p className="text-caption text-ash">{tt("Choose one of the three levers of Block 3.2, then say why in the field below.", "Wählen Sie einen der drei Hebel aus Block 3.2 und sagen Sie dann im Feld unten, warum.")}</p>
            <OptionList<LeverKind> label={tt("Lever served most", "Am meisten bedienter Hebel")} value={r2.mainLever} onChange={(v) => patch({ mainLever: v })} options={MAIN_LEVER_OPTIONS.map((o) => ({ id: o.id, label: o.label }))} />
          </div>
          <TextBox
            id={IDS.mainWhy}
            label={tt("Why does your system serve it most?", "Warum bedient Ihr System ihn am meisten?")}
            help={tt("Name the need from Route 1 that this lever answers, and say why your building blocks reach it and last. At least 40 characters.", "Nennen Sie das Bedürfnis aus Route 1, das dieser Hebel beantwortet, und sagen Sie, warum Ihre Bausteine es erreichen und halten. Mindestens 40 Zeichen.")}
            value={r2.mainWhy}
            onChange={(v) => patch({ mainWhy: v })}
            min={40}
            rows={3}
          />
          <ExampleAnswer id="main-why-example" guide={mainWhyGuide()} />
          {mentor && <MentorGuide guide={mainWhyGuide()} />}
        </div>
      )}
      <BlockMissing block="3.4" route={2} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 3.5 */

export function Block35() {
  const r2 = useStore((s) => s.r2);
  const patch = useStore((s) => s.patchR2);
  const mentor = useStore((s) => s.mentorUnlocked);
  const toggle = (id: RiskId) => patch((s) => ({ risks: s.risks.includes(id) ? s.risks.filter((x) => x !== id) : [...s.risks, id], riskFlags: [], riskResult: null }));
  const check = () => patch((s) => ({ checks: s.checks + 1, riskFlags: signalFlags(s), riskClue: {}, riskResult: { psychology: psychologyCount(s.risks) } }));
  const top = [...r2.risks].filter((id) => r2.riskLik[id] && r2.riskImp[id]).sort((a, b) => r2.riskLik[b] * r2.riskImp[b] - r2.riskLik[a] * r2.riskImp[a])[0];
  return (
    <AnswerBlock
      id="block-3-5"
      title={tt("Block 3.5 · Risk analysis: what if we misjudge the customer?", "Block 3.5 · Risikoanalyse: was, wenn wir den Kunden falsch einschätzen?")}
      kind="OBJECTIVE + JUDGED"
      minutes={BLOCK_MINUTES["3.5"]}
      core={false}
      findIt={tt("Route 2 → Task 2 → the eight risks below. Answer by choosing three that are misjudgments of customer psychology or acceptance, rating them, choosing the early signal and writing the response.", "Route 2 → Task 2 → die acht Risiken unten. Antworten Sie, indem Sie drei wählen, die Fehleinschätzungen der Kundenpsychologie oder -akzeptanz sind, sie bewerten, das Frühsignal wählen und die Reaktion schreiben.")}
    >
      <MaterialRefs refs={["B4"]} />
      <div id={IDS.riskPickR2} className="space-y-2">
        <p className="text-body text-ink">
          <Gloss>{tt("Choose exactly three risks. The block asks for misjudgments of customer psychology and acceptance: “we assume the customer …”. Not every risk in the list is one.", "Wählen Sie genau drei Risiken. Der Block verlangt Fehleinschätzungen der Kundenpsychologie und -akzeptanz: „Wir nehmen an, der Kunde …“. Nicht jedes Risiko in der Liste ist eines.")}</Gloss>
        </p>
        <OptionList<RiskId>
          multi
          label={tt("Risks", "Risiken")}
          value={r2.risks}
          onChange={toggle}
          disabledIds={r2.risks.length >= RISK_CHOOSE ? RISKS.map((r) => r.id) : []}
          onDisabledClick={() => scrollToAndFlash(IDS.riskPickR2, "warn")}
          options={RISKS.map((r) => ({
            id: r.id,
            label: r.name,
            sub: r.psychology ? tt(`We assume: ${r.weAssume} It may be that: ${r.mayBeTrue}`, `Wir nehmen an: ${r.weAssume} Es kann sein, dass: ${r.mayBeTrue}`) : r.id === "competitor" ? tt("A competitor copies the programme.", "Ein Wettbewerber kopiert das Programm.") : tt("The consent centre is not ready when the plan needs it.", "Das Consent Centre ist nicht fertig, wenn der Plan es braucht."),
          }))}
        />
        <p role="status" className="text-caption text-ash">
          {tt(`${r2.risks.length} of ${RISK_CHOOSE} chosen.${r2.risks.length >= RISK_CHOOSE ? " To choose another, first remove one." : ""}`, `${r2.risks.length} von ${RISK_CHOOSE} gewählt.${r2.risks.length >= RISK_CHOOSE ? " Um ein anderes zu wählen, entfernen Sie zuerst eines." : ""}`)}
        </p>
      </div>
      {r2.risks.map((id) => {
        const r = RISK_BY_ID[id];
        const flagged = r2.riskFlags.includes(`${id}.signal`);
        return (
          <div key={id} id={IDS.risk(id)} className="space-y-3 rounded-lg border border-line bg-paper p-3.5">
            <p className="font-semibold text-ink">{r.name}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="smallcaps">{tt("Likelihood", "Wahrscheinlichkeit")}</p>
                <ScorePick label={tt(`Likelihood of ${r.name}`, `Wahrscheinlichkeit von ${r.name}`)} value={r2.riskLik[id] || 0} onChange={(v) => patch((s) => ({ riskLik: { ...s.riskLik, [id]: v as Score } }))} />
              </div>
              <div>
                <p className="smallcaps">{tt("Impact if it happens", "Auswirkung, wenn es eintritt")}</p>
                <ScorePick label={tt(`Impact of ${r.name}`, `Auswirkung von ${r.name}`)} value={r2.riskImp[id] || 0} onChange={(v) => patch((s) => ({ riskImp: { ...s.riskImp, [id]: v as Score } }))} />
              </div>
            </div>
            <div className={clsx("rounded-lg", flagged && "is-flagged p-1")}>
              <p className="smallcaps">{tt("The early-warning signal", "Das Frühwarnsignal")}</p>
              <OptionList label={tt(`Signal for ${r.name}`, `Signal für ${r.name}`)} value={r2.riskSignal[id] ?? null} onChange={(v) => patch((s) => ({ riskSignal: { ...s.riskSignal, [id]: v }, riskFlags: s.riskFlags.filter((f) => f !== `${id}.signal`) }))} options={r.signals} />
              {flagged && (
                <p className="mt-1 text-caption text-ink">
                  <span className="smallcaps mr-1 text-accent">{tt("Clue", "Hinweis")}</span>
                  {tt("Which of the three would you see in customer behaviour before the loss is final, and is it about how the customer reacts rather than how well the programme performs on paper? Read the rule on signals in Materi B4.", "Welches der drei würden Sie im Kundenverhalten sehen, bevor der Verlust endgültig ist, und geht es darum, wie der Kunde reagiert, und nicht darum, wie gut das Programm auf dem Papier abschneidet? Lesen Sie die Regel zu Signalen in Materi B4.")}
                </p>
              )}
            </div>
            <TextBox
              id={`${IDS.risk(id)}-response`}
              label={tt("The response", "Die Reaktion")}
              help={tt("A trigger: a number, a date and an action. If [signal] happens [how often] within [when], we [do what]. At least 30 characters, with a number.", "Ein Trigger: eine Zahl, ein Datum und eine Aktion. Wenn [Signal] [wie oft] innerhalb von [wann] eintritt, tun wir [was]. Mindestens 30 Zeichen, mit einer Zahl.")}
              value={r2.riskResponse[id] ?? ""}
              onChange={(v) => patch((s) => ({ riskResponse: { ...s.riskResponse, [id]: v } }))}
              min={MIN_LINE}
              rows={2}
              flagged={(r2.riskResponse[id] ?? "").trim().length >= MIN_LINE && !hasNumber(r2.riskResponse[id] ?? "") && r2.riskResult !== null}
              clue={tt("Add the number that says when you act: how many customers, how many weeks, what percentage.", "Ergänzen Sie die Zahl, die sagt, wann Sie handeln: wie viele Kunden, wie viele Wochen, welcher Prozentsatz.")}
              clueShown
            />
            <ExampleAnswer id={`risk-${id}-response-example`} guide={riskResponseGuide(id)} />
            {mentor && <MentorGuide guide={riskResponseGuide(id)} />}
          </div>
        );
      })}

      {r2.risks.length > 0 && (
        <div className="space-y-2">
          <p className="smallcaps">{tt("Where your risks sit (likelihood across, impact up)", "Wo Ihre Risiken liegen (Wahrscheinlichkeit nach rechts, Auswirkung nach oben)")}</p>
          <div className="grid max-w-sm grid-cols-3 gap-1" role="group" aria-label={tt("Likelihood by impact grid of your risks", "Raster Ihrer Risiken nach Wahrscheinlichkeit und Auswirkung")}>
            {[3, 2, 1].flatMap((imp) =>
              [1, 2, 3].map((lik) => {
                const here = r2.risks.filter((id) => r2.riskLik[id] === lik && r2.riskImp[id] === imp);
                const hot = lik * imp >= 6;
                return (
                  <div key={`${lik}-${imp}`} className={clsx("flex min-h-[48px] flex-wrap items-center justify-center gap-1 rounded-md border p-1", hot ? "border-rust/40 bg-rustSoft" : "border-line bg-mist/60")}>
                    {here.map((id) => (
                      <span key={id} className="rounded-full border-2 border-ink bg-paper px-2 text-caption font-bold" title={RISK_BY_ID[id].name}>
                        {RISK_BY_ID[id].name.split(" ").slice(0, 2).join(" ")}
                      </span>
                    ))}
                  </div>
                );
              }),
            )}
          </div>
          <p className="text-caption text-ash" aria-live="polite">
            {top
              ? tt(
                  `Your highest-rated risk is “${RISK_BY_ID[top].name}” (likelihood ${lik(r2.riskLik[top])}, impact ${lik(r2.riskImp[top])}). ${(r2.riskResponse[top] ?? "").trim().length < MIN_LINE || !hasNumber(r2.riskResponse[top] ?? "") ? "It has no trigger with a number yet." : "It has a trigger with a number."}`,
                  `Ihr am höchsten bewertetes Risiko ist „${RISK_BY_ID[top].name}“ (Wahrscheinlichkeit ${lik(r2.riskLik[top])}, Auswirkung ${lik(r2.riskImp[top])}). ${(r2.riskResponse[top] ?? "").trim().length < MIN_LINE || !hasNumber(r2.riskResponse[top] ?? "") ? "Es hat noch keinen Trigger mit einer Zahl." : "Es hat einen Trigger mit einer Zahl."}`,
                )
              : tt("Rate a risk to see where it sits.", "Bewerten Sie ein Risiko, um zu sehen, wo es liegt.")}
          </p>
        </div>
      )}

      <CheckBar onCheck={check} checkLabel={tt("Check my risks", "Meine Risiken prüfen")} checks={r2.checks} />
      {r2.riskResult && (
        <Reading>
          {tt(`${r2.riskResult.psychology} of ${r2.risks.length} chosen risks are misjudgments of customer psychology or acceptance.`, `${r2.riskResult.psychology} von ${r2.risks.length} gewählten Risiken sind Fehleinschätzungen der Kundenpsychologie oder -akzeptanz.`)}{" "}
          {r2.risks.length > 0 && r2.riskResult.psychology < r2.risks.length ? tt("The others are real risks, but of another kind: ask of each “what did we assume the customer feels?”.", "Die anderen sind echte Risiken, aber anderer Art: Fragen Sie bei jedem „Was haben wir über die Gefühle des Kunden angenommen?“.") : ""}
          {r2.riskFlags.length > 0 ? tt(` ${r2.riskFlags.length} signal${r2.riskFlags.length === 1 ? " is" : "s are"} outlined above.`, ` ${r2.riskFlags.length} ${r2.riskFlags.length === 1 ? "Signal ist" : "Signale sind"} oben markiert.`) : ""}
        </Reading>
      )}
      <AnswerKey block={riskKey()} />
      <BlockMissing block="3.5" route={2} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 3.6 */

export function Block36() {
  const r2 = useStore((s) => s.r2);
  const patch = useStore((s) => s.patchR2);
  const mentor = useStore((s) => s.mentorUnlocked);
  const levels = [r2.lvl.A, r2.lvl.B, r2.lvl.C];
  const items = archList(r2);
  const f = funded(r2);
  const over = archOver(r2);
  const rules = seqRules(r2);
  const setItem = (id: ArchId, p: Partial<{ alloc: boolean; start: number | null; owner: OwnerId | null; trigger: string }>) =>
    patch((s) => ({
      alloc: p.alloc !== undefined ? { ...s.alloc, [id]: p.alloc } : s.alloc,
      start: p.start !== undefined ? { ...s.start, [id]: p.start } : p.alloc === false ? { ...s.start, [id]: null } : s.start,
      owner: p.owner !== undefined ? { ...s.owner, [id]: p.owner } : s.owner,
      trigger: p.trigger !== undefined ? { ...s.trigger, [id]: p.trigger } : s.trigger,
      seqResult: null,
    }));
  const check = () =>
    patch((s) => {
      const r = seqRules(s);
      return { checks: s.checks + 1, seqResult: { holds: Number(r.baseline) + Number(r.budget), total: 2 }, seqClue: false };
    });
  const fStart = r2.start.foundation;
  const others = f.filter((id) => id !== "foundation");
  const firstOther = others.length ? Math.min(...others.map((id) => r2.start[id] ?? 99)) : null;
  const notAllFunded = !items.every((it) => r2.alloc[it.id]);
  return (
    <AnswerBlock
      id="block-3-6"
      title={tt("Block 3.6 · The implementation architecture: fund, sequence, own", "Block 3.6 · Die Umsetzungsarchitektur: finanzieren, sequenzieren, verantworten")}
      kind="OBJECTIVE + JUDGED"
      minutes={BLOCK_MINUTES["3.6"]}
      core={false}
      findIt={tt(`Route 2 → Task 2 → the items below: your three building blocks from Block 3.4, the personalisation engine from Block 3.3 and the two enabling items. The budget is ${euro(R2_BUDGET)} over ${R2_MONTHS} months. Answer in the item cards.`, `Route 2 → Task 2 → die Punkte unten: Ihre drei Bausteine aus Block 3.4, die Personalisierungs-Engine aus Block 3.3 und die zwei Enabler-Punkte. Das Budget beträgt ${euro(R2_BUDGET)} über ${R2_MONTHS} Monate. Antworten Sie in den Punkte-Karten.`)}
    >
      <MaterialRefs refs={["B5"]} />
      {r2.sys.length < SYSTEM_CHOOSE && (
        <p className="rounded-md border border-line bg-mist/60 px-3 py-2 text-caption text-ink">
          {tt(`You have chosen ${r2.sys.length} of your ${SYSTEM_CHOOSE} building blocks in Block 3.4, so this list shows only what it has so far. Nothing is blocked.`, `Sie haben in Block 3.4 ${r2.sys.length} von ${SYSTEM_CHOOSE} Bausteinen gewählt, diese Liste zeigt also nur, was bisher da ist. Nichts ist gesperrt.`)}{" "}
          <button type="button" onClick={() => scrollToAndFlash(IDS.sysPick, "ref", "start")} className="font-semibold underline decoration-dotted underline-offset-2">
            {tt("Go to Block 3.4", "Zu Block 3.4")}
          </button>
        </p>
      )}
      {!levels.some(Boolean) && (
        <p className="rounded-md border border-line bg-mist/60 px-3 py-2 text-caption text-ink">
          {tt("You have not chosen a level of personalisation in Block 3.3, so the personalisation engine is not in the list yet. Nothing is blocked.", "Sie haben in Block 3.3 noch keine Stufe der Personalisierung gewählt, die Personalisierungs-Engine steht also noch nicht in der Liste. Nichts ist gesperrt.")}{" "}
          <button type="button" onClick={() => scrollToAndFlash(IDS.level("A"), "ref", "start")} className="font-semibold underline decoration-dotted underline-offset-2">
            {tt("Go to Block 3.3", "Zu Block 3.3")}
          </button>
        </p>
      )}
      <div className="flex flex-wrap items-start gap-2">
        <RevealHint id="owner-help" label={tt("Show the owner test", "Owner-Test anzeigen")} title={tt("The tests · taught in Materi B5", "Die Tests · vermittelt in Materi B5")}>
          <div className="space-y-2 text-caption text-ink">
            <ul className="list-disc space-y-1 pl-5">
              <li>{tt("Owner: who can change it without asking anyone else?", "Owner: Wer kann es ändern, ohne jemand anderen zu fragen?")}</li>
              <li>{tt("Start: does something have to exist before it, such as the record of what customers agreed to?", "Start: Muss vorher etwas existieren, etwa das Register dessen, wozu Kunden zugestimmt haben?")}</li>
              <li>{tt("Trigger: does it have a metric, a number, a date and an action?", "Trigger: Hat er eine Kennzahl, eine Zahl, ein Datum und eine Aktion?")}</li>
            </ul>
            <p className="smallcaps text-ash">{tt("What each role can change", "Was jede Rolle ändern kann")}</p>
            <ul className="space-y-1">
              {OWNER_IDS.map((o) => (
                <li key={o}>
                  <span className="font-semibold">{OWNERS[o].name}. </span>
                  {OWNERS[o].profile}
                </li>
              ))}
            </ul>
            <MaterialRefs refs={["B5"]} lead={tt("Taught in", "Vermittelt in")} />
          </div>
        </RevealHint>
      </div>
      <p className="text-body text-ink">
        <Gloss>{tt("Fund the items you will carry out inside the budget. For each funded item choose the month it starts, one owner who can change it without asking anyone else, and a trigger: a number, a date and an action. Leave out what does not fit, on purpose.", "Finanzieren Sie die Punkte, die Sie innerhalb des Budgets umsetzen. Wählen Sie für jeden finanzierten Punkt den Startmonat, einen Owner, der ihn ändern kann, ohne jemand anderen zu fragen, und einen Trigger: eine Zahl, ein Datum und eine Aktion. Lassen Sie bewusst weg, was nicht passt.")}</Gloss>
      </p>
      <div id={IDS.archTotal} className="space-y-2">
        <BudgetBar items={f.map((id) => ({ id, short: archName(id, levels).split(" ")[0], cost: archCostOf(r2, id) }))} budget={R2_BUDGET} title={tt(`Funded items against the ${euro(R2_BUDGET)} budget`, `Finanzierte Punkte gegen das Budget von ${euro(R2_BUDGET)}`)} />
        <p className="text-caption text-ash" aria-live="polite">
          {tt(`Funded ${euro(archCost(r2))} of ${euro(R2_BUDGET)}.`, `Finanziert ${euro(archCost(r2))} von ${euro(R2_BUDGET)}.`)} {over > 0 ? tt(`${euro(over)} over: leave out the item with the weakest evidence for its lever, do not trim every item a little.`, `${euro(over)} zu viel: Lassen Sie den Punkt mit den schwächsten Belegen für seinen Hebel weg, kürzen Sie nicht jeden Punkt ein wenig.`) : tt(`${euro(archLeft(r2))} left.`, `${euro(archLeft(r2))} übrig.`)}
        </p>
      </div>
      {items.map((it) => {
        const id = it.id;
        const on = !!r2.alloc[id];
        return (
          <div key={id} id={IDS.arch(id)} className={clsx("space-y-3 rounded-lg border p-3.5", on ? "border-line bg-paper" : "border-dashed border-ash/60 bg-mist/40")}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-ink">
                {archName(id, levels)} <span className="font-normal text-ash">· {euro(it.cost)} · {it.weeks} {tt("weeks to a first effect", "Wochen bis zur ersten Wirkung")}{it.enabler ? tt(" · enabling item", " · Enabler-Punkt") : id === "engine" ? tt(" · from Block 3.3", " · aus Block 3.3") : ""}</span>
              </p>
              <button type="button" aria-pressed={on} onClick={() => setItem(id, { alloc: !on })} className={clsx("btn btn-sm min-h-[40px] border", on ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
                {on ? tt("☑ Funded", "☑ Finanziert") : tt("☐ Not funded", "☐ Nicht finanziert")}
              </button>
            </div>
            <p className="text-caption text-ash">{it.what}</p>
            {on && (
              <>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label htmlFor={`start-${id}`} className="smallcaps block">
                      {tt("Starts in month", "Startet in Monat")}
                    </label>
                    <select id={`start-${id}`} className="field mt-1 max-w-[10rem]" value={r2.start[id] ?? ""} onChange={(e) => setItem(id, { start: e.target.value ? Number(e.target.value) : null })}>
                      <option value="">{tt("Choose…", "Wählen …")}</option>
                      {MONTHS_LIST.map((m) => (
                        <option key={m} value={m}>
                          {tt("Month", "Monat")} {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`owner-${id}`} className="smallcaps block">
                      {tt("Owner (who can change it without asking anyone else)", "Owner (wer kann es ändern, ohne jemand anderen zu fragen)")}
                    </label>
                    <select id={`owner-${id}`} className="field mt-1" value={r2.owner[id] ?? ""} onChange={(e) => setItem(id, { owner: (e.target.value || null) as OwnerId | null })}>
                      <option value="">{tt("Choose an owner…", "Owner wählen …")}</option>
                      {OWNER_IDS.map((o) => (
                        <option key={o} value={o}>
                          {OWNERS[o].name}
                        </option>
                      ))}
                    </select>
                    {r2.owner[id] && <p className="mt-1 text-micro normal-case tracking-normal text-ash">{OWNERS[r2.owner[id]!].profile}</p>}
                  </div>
                </div>
                <TextBox
                  id={`${IDS.arch(id)}-trigger`}
                  label="Trigger"
                  help={tt("If [metric] is [worse than a number] by [month], then [action]. At least 20 characters, with a number.", "Wenn [Kennzahl] bis [Monat] [schlechter als eine Zahl] ist, dann [Aktion]. Mindestens 20 Zeichen, mit einer Zahl.")}
                  value={r2.trigger[id] ?? ""}
                  onChange={(v) => setItem(id, { trigger: v })}
                  min={20}
                  rows={2}
                />
                <ExampleAnswer id={`arch-${id}-trigger-example`} guide={triggerGuide(id)} />
                {mentor && <MentorGuide guide={triggerGuide(id)} />}
              </>
            )}
          </div>
        );
      })}

      <div className="space-y-1 rounded-lg border border-line bg-mist/50 p-3 text-caption text-ink" aria-live="polite">
        <p className="smallcaps">{tt("What your sequence means", "Was Ihre Reihenfolge bedeutet")}</p>
        {f.length === 0 && <p>{tt("Nothing is funded yet.", "Noch nichts ist finanziert.")}</p>}
        {f.length > 0 && !rules.hasFoundation && <p>{tt("The consent and data foundation is not funded, so nothing records what customers agreed to before the other items use their data.", "Das Einwilligungs- und Datenfundament ist nicht finanziert, also hält nichts fest, wozu Kunden zugestimmt haben, bevor die anderen Punkte ihre Daten nutzen.")}</p>}
        {rules.hasFoundation && fStart != null && firstOther !== null && fStart > firstOther && <p>{tt(`The first item starts in month ${firstOther}, before the consent foundation in month ${fStart}: it may use data that nobody has recorded consent for.`, `Der erste Punkt startet in Monat ${firstOther}, vor dem Einwilligungsfundament in Monat ${fStart}: Er könnte Daten nutzen, für die niemand eine Einwilligung erfasst hat.`)}</p>}
        {rules.hasFoundation && fStart != null && firstOther !== null && fStart <= firstOther && <p>{tt(`The consent foundation starts in month ${fStart}, no later than the first item (month ${firstOther}), so the record of consent exists before anything uses customer data.`, `Das Einwilligungsfundament startet in Monat ${fStart}, nicht später als der erste Punkt (Monat ${firstOther}), das Einwilligungsregister existiert also, bevor irgendetwas Kundendaten nutzt.`)}</p>}
        {over > 0 && <p>{tt(`The funded items are ${euro(over)} over the budget.`, `Die finanzierten Punkte liegen ${euro(over)} über dem Budget.`)}</p>}
      </div>

      {notAllFunded && (
        <div className="space-y-3 border-t border-line pt-3">
          <TextBox
            id={IDS.postponed}
            label={tt("What you leave out, and why", "Was Sie weglassen, und warum")}
            help={tt("Name the item and say why it is the one that goes: the budget, or the weakest evidence for its lever, or something else covering it for now. At least 30 characters.", "Nennen Sie den Punkt und sagen Sie, warum gerade er wegfällt: das Budget, die schwächsten Belege für seinen Hebel oder etwas anderes, das ihn vorerst abdeckt. Mindestens 30 Zeichen.")}
            value={r2.postponed}
            onChange={(v) => patch({ postponed: v })}
            min={MIN_LINE}
            rows={3}
          >
            <WritingHelp
              id="postponed-help"
              steps={[tt("Name the item you leave out.", "Nennen Sie den Punkt, den Sie weglassen."), tt("Say what it would have cost and what that would have pushed the total to.", "Sagen Sie, was er gekostet hätte und auf welche Summe das die Gesamtsumme gebracht hätte."), tt("Say why this one and not another, and what you use in the meantime.", "Sagen Sie, warum dieser und kein anderer, und was Sie in der Zwischenzeit nutzen.")]}
              refs={[{ label: "Budget", value: euro(R2_BUDGET), target: IDS.archTotal }]}
            />
          </TextBox>
          <TextBox
            id={IDS.pickup}
            label={tt("The pickup point", "Der Wiedervorlagepunkt")}
            help={tt("The number and the date at which you look at it again: if [metric] is [number] by [month], we revisit it. At least 15 characters, with a number.", "Die Zahl und das Datum, zu dem Sie es wieder ansehen: Wenn [Kennzahl] bis [Monat] [Zahl] ist, nehmen wir es wieder auf. Mindestens 15 Zeichen, mit einer Zahl.")}
            value={r2.pickup}
            onChange={(v) => patch({ pickup: v })}
            min={15}
            rows={2}
          />
          <ExampleAnswer id="postponed-example" guide={postponedGuide()} />
          {mentor && <MentorGuide guide={postponedGuide()} />}
        </div>
      )}

      <CheckBar onCheck={check} checkLabel={tt("Check my architecture", "Meine Architektur prüfen")} checks={r2.checks} clueShown={r2.seqClue} onClue={() => patch({ seqClue: true })} />
      {r2.seqResult && (
        <Reading>
          {tt(`${r2.seqResult.holds} of ${r2.seqResult.total} rules hold (the consent and data foundation starts no later than the first other item, and the funded items fit the budget).`, `${r2.seqResult.holds} von ${r2.seqResult.total} Regeln stimmen (das Einwilligungs- und Datenfundament startet nicht später als der erste andere Punkt, und die finanzierten Punkte passen ins Budget).`)}
          {r2.seqClue ? tt(" Clue: which item records what customers agreed to, and when should it start compared with anything that uses their data? And do the funded costs add up to no more than the budget?", " Hinweis: Welcher Punkt hält fest, wozu Kunden zugestimmt haben, und wann sollte er im Vergleich zu allem starten, was ihre Daten nutzt? Und ergeben die finanzierten Kosten nicht mehr als das Budget?") : ""}
        </Reading>
      )}
      <AnswerKey block={ownerKey(f, levels)} />
      <BlockMissing block="3.6" route={2} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 3.7 */

export function Block37() {
  const r2 = useStore((s) => s.r2);
  const patch = useStore((s) => s.patchR2);
  const mentor = useStore((s) => s.mentorUnlocked);
  const k = r2.tripKpi ? KPIS.find((x) => x.id === r2.tripKpi)! : null;
  const flags = tripFlags(r2);
  const check = () => patch((s) => ({ checks: s.checks + 1, decisionFlagged: s.decision === "wait", decisionClue: false, tripFlags: tripFlags(s), tripClue: {} }));
  return (
    <AnswerBlock
      id="block-3-7"
      title={tt("Block 3.7 · Decide although the data is unclear", "Block 3.7 · Entscheiden, obwohl die Datenlage unklar ist")}
      kind="OBJECTIVE + JUDGED"
      minutes={BLOCK_MINUTES["3.7"]}
      core={true}
      findIt={tt("Route 2 → Task 2 → your own answers in Blocks 3.1 to 3.6, the baselines below, and the regret table in Materi B6. Answer in the fields below.", "Route 2 → Task 2 → Ihre eigenen Antworten in den Blöcken 3.1 bis 3.6, die Baselines unten und die Regret-Tabelle in Materi B6. Antworten Sie in den Feldern unten.")}
    >
      <MaterialRefs refs={["B6"]} />
      <div id={IDS.decision} className={clsx("space-y-2 rounded-lg p-1", r2.decisionFlagged && "is-flagged")}>
        <p className="font-semibold text-ink">{tt("Your decision", "Ihre Entscheidung")}</p>
        <p className="text-caption text-ash">{tt("The brief asks you to decide although the data on customer behaviour is not clear. Choose one.", "Der Auftrag verlangt, dass Sie entscheiden, obwohl die Daten zum Kundenverhalten nicht klar sind. Wählen Sie eine.")}</p>
        <OptionList<DecisionId> label={tt("Decision", "Entscheidung")} value={r2.decision} onChange={(v) => patch({ decision: v, decisionFlagged: false, decisionClue: false })} options={DECISIONS.map((d) => ({ id: d.id, label: d.label, sub: d.detail }))} />
        {r2.decisionFlagged && (
          <p className="text-caption text-ink">
            <span className="smallcaps mr-1 text-accent">{tt("Clue", "Hinweis")}</span>
            {tt("Is waiting a decision that keeps customers from leaving, or one that lets renewals keep failing for as long as you wait? Look at the last row of the regret table in Materi B6.", "Ist Warten eine Entscheidung, die Kunden am Gehen hindert, oder eine, die Renewals so lange scheitern lässt, wie Sie warten? Sehen Sie sich die letzte Zeile der Regret-Tabelle in Materi B6 an.")}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <p className="font-semibold text-ink">{tt("Three assumptions your decision rests on", "Drei Annahmen, auf denen Ihre Entscheidung beruht")}</p>
        {r2.assumptions.map((a, i) => (
          <div key={i} className="space-y-1.5">
            <TextBox
              id={IDS.assumption(i)}
              label={`${tt("Assumption", "Annahme")} ${i + 1}`}
              help={tt("How you think customers will react to being addressed emotionally and personally, and the sign that would show you are wrong (a number or something you could see). At least 30 characters.", "Wie Kunden Ihrer Meinung nach darauf reagieren, emotional und persönlich angesprochen zu werden, und das Zeichen, das zeigen würde, dass Sie falsch liegen (eine Zahl oder etwas, das Sie sehen könnten). Mindestens 30 Zeichen.")}
              value={a}
              onChange={(v) => patch((s) => ({ assumptions: s.assumptions.map((x, j) => (j === i ? v : x)) }))}
              min={MIN_LINE}
              rows={2}
            />
            <ExampleAnswer id={`assumption-${i}-example`} guide={assumptionGuide(i)} />
            {mentor && <MentorGuide guide={assumptionGuide(i)} />}
          </div>
        ))}
      </div>

      <div id={IDS.trip} className="space-y-3 rounded-lg border border-line bg-paper p-3.5">
        <p className="font-semibold text-ink">Tripwire</p>
        <p className="text-caption text-ash">
          {tt("A metric of customer behaviour, a threshold better than today's baseline, a month and an action agreed now.", "Eine Kennzahl des Kundenverhaltens, ein Schwellenwert, der besser ist als die heutige Baseline, ein Monat und eine jetzt vereinbarte Aktion.")} {R2_TXT.baselineNote}
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className={clsx(flags.includes("kpi") && "is-flagged p-1")}>
            <label htmlFor="trip-kpi" className="smallcaps block">
              {tt("Metric", "Kennzahl")}
            </label>
            <select id="trip-kpi" className="field mt-1" value={r2.tripKpi ?? ""} onChange={(e) => patch({ tripKpi: (e.target.value || null) as KpiId | null, tripFlags: [] })}>
              <option value="">{tt("Choose a metric…", "Kennzahl wählen …")}</option>
              {KPIS.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.label} ({tt("today:", "heute:")} {num(x.baseline)}
                  {x.unit === "%" ? pctS() : ` ${x.unit}`})
                </option>
              ))}
            </select>
            {flags.includes("kpi") && r2.tripFlags.includes("kpi") && (
              <p className="mt-1 text-micro normal-case tracking-normal text-ink">
                <span className="font-semibold text-accent">{tt("Clue.", "Hinweis.")} </span>{tt("Does this metric measure how the customer behaved, or how much CloudTech sent?", "Misst diese Kennzahl, wie sich der Kunde verhalten hat, oder wie viel CloudTech gesendet hat?")}
              </p>
            )}
          </div>
          <div className={clsx(flags.includes("threshold") && "is-flagged p-1")}>
            <label htmlFor="trip-threshold" className="smallcaps block">
              {tt("Threshold", "Schwellenwert")}{k ? tt(` (${k.unit}; better is ${k.better === "up" ? "higher" : "lower"})`, ` (${k.unit}; besser ist ${k.better === "up" ? "höher" : "niedriger"})`) : ""}
            </label>
            <input id="trip-threshold" className="field tnum mt-1" inputMode="decimal" value={r2.tripThreshold} onChange={(e) => patch({ tripThreshold: e.target.value, tripFlags: [] })} />
            {flags.includes("threshold") && r2.tripFlags.includes("threshold") && k && (
              <p className="mt-1 text-micro normal-case tracking-normal text-ink">
                <span className="font-semibold text-accent">{tt("Clue.", "Hinweis.")} </span>{tt("Compare it with today's figure,", "Vergleichen Sie ihn mit der heutigen Zahl,")} {num(k.baseline)}
                {k.unit === "%" ? pctS() : ` ${k.unit}`}. {tt("Would reaching it show a real change?", "Würde sein Erreichen eine echte Veränderung zeigen?")}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="trip-month" className="smallcaps block">
              {tt("By month", "Bis Monat")}
            </label>
            <select id="trip-month" className="field mt-1 max-w-[10rem]" value={r2.tripMonth ?? ""} onChange={(e) => patch({ tripMonth: e.target.value ? Number(e.target.value) : null })}>
              <option value="">{tt("Choose…", "Wählen …")}</option>
              {MONTHS_LIST.map((m) => (
                <option key={m} value={m}>
                  {tt("Month", "Monat")} {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="trip-action" className="smallcaps block">
              {tt("If it is missed", "Wenn er verfehlt wird")}
            </label>
            <select id="trip-action" className="field mt-1" value={r2.tripAction} onChange={(e) => patch({ tripAction: e.target.value as "" | "scale" | "adjust" | "stop" })}>
              <option value="">{tt("Choose an action…", "Aktion wählen …")}</option>
              <option value="adjust">{tt("Adjust one lever and continue", "Einen Hebel anpassen und weitermachen")}</option>
              <option value="stop">{tt("Stop and reconsider the plan", "Anhalten und den Plan neu überdenken")}</option>
              <option value="scale">{tt("Widen the personalisation anyway", "Die Personalisierung trotzdem ausweiten")}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="rounded-lg border border-gold bg-accentSoft p-3.5 text-caption text-ink">
          <p className="smallcaps text-accent">{tt("The board's challenge", "Die Rückfrage des Boards")}</p>
          <p className="mt-1">{R2_TXT.boardChallenge}</p>
        </div>
        <TextBox
          id={IDS.challenge}
          label={tt("What do you do?", "Was tun Sie?")}
          help={tt("Say what you check first, what you keep, and the one thing you change. At least 60 characters.", "Sagen Sie, was Sie zuerst prüfen, was Sie behalten und das eine, was Sie ändern. Mindestens 60 Zeichen.")}
          value={r2.challenge}
          onChange={(v) => patch({ challenge: v })}
          min={60}
          rows={4}
        >
          <WritingHelp id="challenge-help" steps={[tt("Go back to your tripwire and the objection figures before spending more.", "Gehen Sie zu Ihrem Tripwire und den Widerspruchszahlen zurück, bevor Sie mehr ausgeben."), tt("Say what the numbers still support, and keep it.", "Sagen Sie, was die Zahlen weiterhin stützen, und behalten Sie es."), tt("Change one lever, not the whole plan, and say how you will find out why the customers objected.", "Ändern Sie einen Hebel, nicht den ganzen Plan, und sagen Sie, wie Sie herausfinden, warum die Kunden widersprochen haben.")]} />
        </TextBox>
        <ExampleAnswer id="challenge-example" guide={challengeGuide()} />
        {mentor && <MentorGuide guide={challengeGuide()} />}
      </div>

      <CheckBar onCheck={check} checkLabel={tt("Check my decision", "Meine Entscheidung prüfen")} checks={r2.checks} />
      {r2.checks > 0 && (r2.decisionFlagged || r2.tripFlags.length > 0) && (
        <Reading>
          {r2.decisionFlagged ? tt("Your decision is outlined.", "Ihre Entscheidung ist markiert.") : ""}
          {r2.tripFlags.length > 0 ? tt(` ${r2.tripFlags.length} part${r2.tripFlags.length === 1 ? "" : "s"} of the tripwire ${r2.tripFlags.length === 1 ? "is" : "are"} outlined.`, ` ${r2.tripFlags.length} ${r2.tripFlags.length === 1 ? "Teil des Tripwires ist" : "Teile des Tripwires sind"} markiert.`) : ""}
        </Reading>
      )}
      <AnswerKey block={decisionKey()} />
      <AnswerKey block={tripKey()} />
      <BlockMissing block="3.7" route={2} />
    </AnswerBlock>
  );
}

