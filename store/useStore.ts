"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { FEELING_IDS } from "@/data/feelings";
import type { FeelingId } from "@/data/feelings";
import { LINE_IDS } from "@/data/triggers";
import type { LineId, TriggerId } from "@/data/triggers";
import type { EmotionId, NeedId } from "@/data/needs";
import { TOUCH_IDS } from "@/data/touchpoints";
import type { InfoId, Strength, TouchId } from "@/data/touchpoints";
import { APPROACH_COUNT } from "@/data/approaches";
import type { FigureId, MeasureLetter, RiskPickId } from "@/data/custBase";
import type { MeasureId } from "@/data/measures";
import type { BenefitId, EntryId, HorizonId, LoyaltyType } from "@/data/loyalty";
import { LEVER_KINDS } from "@/data/route2";
import type { ArchId, DecisionId, GroupId, KpiId, LeverKind, LevelId, OwnerId, PhaseId, RiskId, SystemId, VisionId } from "@/data/route2";
import { KEY_L1, KEY_R2 } from "@/data/mentorKey";
import { FIGURE_BUILDERS, modelParts } from "@/lib/calcBuilder";
import type { RouteNo } from "@/lib/routes";

export const STORAGE_KEY = "cs-d4-v1";
const HISTORY_CAP = 100;

/** 0 means not chosen yet. */
export type Score = 0 | 1 | 2 | 3;

export type SortMap = Record<FeelingId, EmotionId | null>;
export type TrigMap = Record<LineId, TriggerId | null>;
export type TagMap = Record<TouchId, NeedId | null>;
export type ApproachRow = { emotion: EmotionId | null; trigger: TriggerId | null; text: string };
export type PatternRow = { need: NeedId | null; behaviour: string; strength: Strength | null };
export type LeverRow = { question: string | null; signal: string | null; phase: PhaseId | null; move: string };

/** Route 1 · Levels 1 and 2 — the Retention Plan. */
export type L1State = {
  /** Block 1.1 */
  sort: SortMap;
  sortHistory: SortMap[];
  sortFuture: SortMap[];
  sortChecks: number;
  /** Last set-level check: how many placed statements hold. Cleared by the next placement. */
  sortResult: { holds: number; placed: number } | null;
  sortClue: boolean;
  /** Recorded in the export: the reasoning was opened after two genuine checks. */
  sortReasoning: boolean;
  /** An emotional factor of the learner's own that is not among the eight statements. */
  extraFactor: string;
  /** Block 1.2 */
  trig: TrigMap;
  trigHistory: TrigMap[];
  trigFuture: TrigMap[];
  trigChecks: number;
  trigResult: { holds: number; placed: number } | null;
  trigClue: boolean;
  trigReasoning: boolean;
  /** The lines the learner would not send as they stand. */
  noSend: LineId[];
  noSendResult: { holds: number; chosen: number } | null;
  /** Block 1.3 */
  appr: ApproachRow[];
  apprFlagged: number[];
  apprChecked: boolean;
  apprClue: boolean;
  /** Block 1.4 */
  figs: Record<FigureId, string>;
  figFlagged: FigureId[];
  figClue: Record<string, boolean>;
  /** The formula calculators' parts, keyed "F1.customers". */
  parts: Record<string, string>;
  partFlags: string[];
  sentence: string;
  sentenceFlagged: boolean;
  sentenceClue: boolean;
  risks: Record<MeasureLetter, RiskPickId | null>;
  riskFlags: MeasureLetter[];
  riskClue: Record<string, boolean>;
  /** Block 1.5 */
  reflect: { assume: string; tip: string; manager: string };
  /** Block 2.1 */
  tags: TagMap;
  tagHistory: TagMap[];
  tagFuture: TagMap[];
  tagChecks: number;
  tagResult: { holds: number; placed: number } | null;
  tagClue: boolean;
  tagReasoning: boolean;
  /** Block 2.2 */
  patterns: PatternRow[];
  patResult: { need: number; strength: number; filled: number } | null;
  patClue: boolean;
  info: InfoId[];
  infoText: string;
  infoResult: { holds: number; chosen: number } | null;
  /** Block 2.3 */
  chosen: MeasureId[];
  aims: Record<string, NeedId[]>;
  eff: Record<string, Score>;
  acc: Record<string, Score>;
  sca: Record<string, Score>;
  /** Flags from the last check: "refs.aims", "refs.acc", "refs.sca". */
  measureFlags: string[];
  measureClue: Record<string, boolean>;
  order: MeasureId[];
  why: string;
  /** Block 2.4 */
  loyType: LoyaltyType | null;
  loyBenefits: BenefitId[];
  loyEntry: EntryId | null;
  loyHorizon: HorizonId | null;
  loyWhy: string;
  /** Flags from the last check: "type", "benefits", "entry", "horizon". */
  loyFlags: string[];
  loyChecked: boolean;
  loyClue: Record<string, boolean>;
  /** Every check requested in Route 1, printed in the export footer. */
  checks: number;
};

/** Route 2 · Level 3 — the Strategy Memo. */
export type R2State = {
  /** Block 3.1 */
  vision: VisionId | null;
  visionFlagged: boolean;
  visionClue: boolean;
  visionText: string;
  /** Block 3.2 */
  levers: Record<LeverKind, LeverRow>;
  leverResult: { holds: number; total: number } | null;
  leverClue: boolean;
  /** Block 3.3 */
  lvl: Record<GroupId, LevelId | null>;
  lvlFlags: GroupId[];
  lvlChecked: boolean;
  lvlClue: boolean;
  weigh: string;
  /** Block 3.4 — ratings keyed "system.criterion" */
  sys: SystemId[];
  rate: Record<string, Score>;
  rateFlags: string[];
  rateClue: Record<string, boolean>;
  sysResult: { systemic: number; bonus: number } | null;
  mainLever: LeverKind | null;
  mainWhy: string;
  /** Block 3.5 */
  risks: RiskId[];
  riskLik: Record<string, Score>;
  riskImp: Record<string, Score>;
  riskSignal: Record<string, string | null>;
  riskResponse: Record<string, string>;
  riskFlags: string[];
  riskClue: Record<string, boolean>;
  riskResult: { psychology: number } | null;
  /** Block 3.6 — keyed by item id */
  alloc: Record<string, boolean>;
  start: Record<string, number | null>;
  owner: Record<string, OwnerId | null>;
  trigger: Record<string, string>;
  postponed: string;
  pickup: string;
  seqResult: { holds: number; total: number } | null;
  seqClue: boolean;
  /** Block 3.7 */
  decision: DecisionId | null;
  decisionFlagged: boolean;
  decisionClue: boolean;
  assumptions: string[];
  tripKpi: KpiId | null;
  tripThreshold: string;
  tripMonth: number | null;
  tripAction: "" | "scale" | "adjust" | "stop";
  tripFlags: string[];
  tripClue: Record<string, boolean>;
  challenge: string;
  checks: number;
};

export type Persisted = {
  participant: { name: string };
  ui: { bannerDismissed: Record<string, boolean>; sectionsRead: Record<string, boolean>; lang: "en" | "de" };
  l1: L1State;
  r2: R2State;
};

type Session = {
  mentorUnlocked: boolean;
  /** Bumped by a reset or a mentor fill so components holding local state remount clean. */
  resetCount: number;
};

type Patch<T> = Partial<T> | ((s: T) => Partial<T>);

type Actions = {
  setParticipant: (patch: Partial<Persisted["participant"]>) => void;
  dismissBanner: (routeKey: string) => void;
  toggleRead: (cardId: string, value?: boolean) => void;
  setLang: (l: "en" | "de") => void;

  patchL1: (p: Patch<L1State>) => void;
  patchR2: (p: Patch<R2State>) => void;

  // placement exercises with undo and redo
  placeFeeling: (id: FeelingId, emotion: EmotionId | null) => void;
  undoSort: () => void;
  redoSort: () => void;
  placeLine: (id: LineId, trigger: TriggerId | null) => void;
  undoTrig: () => void;
  redoTrig: () => void;
  placeTouch: (id: TouchId, need: NeedId | null) => void;
  undoTags: () => void;
  redoTags: () => void;

  setMentorUnlocked: (v: boolean) => void;
  mentorFill: () => void;
  resetRoute: (route: RouteNo | null) => void;
};

const emptySort = (): SortMap => Object.fromEntries(FEELING_IDS.map((id) => [id, null])) as SortMap;
const emptyTrig = (): TrigMap => Object.fromEntries(LINE_IDS.map((id) => [id, null])) as TrigMap;
const emptyTags = (): TagMap => Object.fromEntries(TOUCH_IDS.map((id) => [id, null])) as TagMap;

export const emptyL1 = (): L1State => ({
  sort: emptySort(),
  sortHistory: [],
  sortFuture: [],
  sortChecks: 0,
  sortResult: null,
  sortClue: false,
  sortReasoning: false,
  extraFactor: "",
  trig: emptyTrig(),
  trigHistory: [],
  trigFuture: [],
  trigChecks: 0,
  trigResult: null,
  trigClue: false,
  trigReasoning: false,
  noSend: [],
  noSendResult: null,
  appr: Array.from({ length: APPROACH_COUNT }, () => ({ emotion: null, trigger: null, text: "" })),
  apprFlagged: [],
  apprChecked: false,
  apprClue: false,
  figs: { F1: "", F2: "", F3: "" },
  figFlagged: [],
  figClue: {},
  parts: {},
  partFlags: [],
  sentence: "",
  sentenceFlagged: false,
  sentenceClue: false,
  risks: { A: null, B: null, C: null },
  riskFlags: [],
  riskClue: {},
  reflect: { assume: "", tip: "", manager: "" },
  tags: emptyTags(),
  tagHistory: [],
  tagFuture: [],
  tagChecks: 0,
  tagResult: null,
  tagClue: false,
  tagReasoning: false,
  patterns: Array.from({ length: 4 }, () => ({ need: null, behaviour: "", strength: null })),
  patResult: null,
  patClue: false,
  info: [],
  infoText: "",
  infoResult: null,
  chosen: [],
  aims: {},
  eff: {},
  acc: {},
  sca: {},
  measureFlags: [],
  measureClue: {},
  order: [],
  why: "",
  loyType: null,
  loyBenefits: [],
  loyEntry: null,
  loyHorizon: null,
  loyWhy: "",
  loyFlags: [],
  loyChecked: false,
  loyClue: {},
  checks: 0,
});

export const emptyR2 = (): R2State => ({
  vision: null,
  visionFlagged: false,
  visionClue: false,
  visionText: "",
  levers: Object.fromEntries(LEVER_KINDS.map((k) => [k, { question: null, signal: null, phase: null, move: "" }])) as R2State["levers"],
  leverResult: null,
  leverClue: false,
  lvl: { A: null, B: null, C: null },
  lvlFlags: [],
  lvlChecked: false,
  lvlClue: false,
  weigh: "",
  sys: [],
  rate: {},
  rateFlags: [],
  rateClue: {},
  sysResult: null,
  mainLever: null,
  mainWhy: "",
  risks: [],
  riskLik: {},
  riskImp: {},
  riskSignal: {},
  riskResponse: {},
  riskFlags: [],
  riskClue: {},
  riskResult: null,
  alloc: {},
  start: {},
  owner: {},
  trigger: {},
  postponed: "",
  pickup: "",
  seqResult: null,
  seqClue: false,
  decision: null,
  decisionFlagged: false,
  decisionClue: false,
  assumptions: ["", "", ""],
  tripKpi: null,
  tripThreshold: "",
  tripMonth: null,
  tripAction: "",
  tripFlags: [],
  tripClue: {},
  challenge: "",
  checks: 0,
});

const emptyPersisted = (): Persisted => ({
  participant: { name: "" },
  ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" },
  l1: emptyL1(),
  r2: emptyR2(),
});

const pushCapped = <T,>(list: T[], item: T) => [...list, item].slice(-HISTORY_CAP);
const resolve = <T,>(p: Patch<T>, s: T): Partial<T> => (typeof p === "function" ? (p as (x: T) => Partial<T>)(s) : p);

/** The three placement boards of Route 1: where each keeps its map, its history and its last check. */
type Board = { value: keyof L1State; hist: keyof L1State; fut: keyof L1State; res: keyof L1State };
const BOARDS: Record<"sort" | "trig" | "tags", Board> = {
  sort: { value: "sort", hist: "sortHistory", fut: "sortFuture", res: "sortResult" },
  trig: { value: "trig", hist: "trigHistory", fut: "trigFuture", res: "trigResult" },
  tags: { value: "tags", hist: "tagHistory", fut: "tagFuture", res: "tagResult" },
};

function placeOn(l1: L1State, b: Board, id: string, val: string | null): L1State {
  const before = l1[b.value] as unknown as Record<string, string | null>;
  if (before[id] === val) return l1;
  const next = {
    ...l1,
    [b.value]: { ...before, [id]: val },
    [b.hist]: pushCapped(l1[b.hist] as unknown as unknown[], before),
    [b.fut]: [],
    [b.res]: null,
  } as L1State;
  // the patterns and their ratings are read off the touchpoint tags, so a changed tag clears their last check
  if (b.value === "tags") next.patResult = null;
  return next;
}
function undoOn(l1: L1State, b: Board): L1State {
  const hist = l1[b.hist] as unknown as unknown[];
  const prev = hist[hist.length - 1];
  if (!prev) return l1;
  const next = {
    ...l1,
    [b.value]: prev,
    [b.hist]: hist.slice(0, -1),
    [b.fut]: pushCapped(l1[b.fut] as unknown as unknown[], l1[b.value]),
    [b.res]: null,
  } as L1State;
  if (b.value === "tags") next.patResult = null;
  return next;
}
function redoOn(l1: L1State, b: Board): L1State {
  const fut = l1[b.fut] as unknown as unknown[];
  const nextVal = fut[fut.length - 1];
  if (!nextVal) return l1;
  const next = {
    ...l1,
    [b.value]: nextVal,
    [b.hist]: pushCapped(l1[b.hist] as unknown as unknown[], l1[b.value]),
    [b.fut]: fut.slice(0, -1),
    [b.res]: null,
  } as L1State;
  if (b.value === "tags") next.patResult = null;
  return next;
}

const isPlain = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * A deep merge of a saved value onto the defaults: every field an older or partial blob lacks comes from the defaults, a value of the
 * wrong type is dropped, and an empty default array or object takes what was saved (a history, a list of chosen ids).
 */
export function mergeDefaults<T>(base: T, saved: unknown): T {
  if (saved === undefined || saved === null) return base;
  if (Array.isArray(base)) {
    if (!Array.isArray(saved)) return base;
    if (base.length === 0) return saved as T;
    return base.map((b, i) => mergeDefaults(b, saved[i])) as T;
  }
  if (isPlain(base)) {
    if (!isPlain(saved)) return base;
    const keys = Object.keys(base);
    // an empty default object is a free-form map (parts, ratings): keep every saved key
    if (keys.length === 0) return { ...saved } as T;
    const out: Record<string, unknown> = { ...(saved as Record<string, unknown>) };
    for (const k of keys) out[k] = mergeDefaults((base as Record<string, unknown>)[k], (saved as Record<string, unknown>)[k]);
    return out as T;
  }
  return typeof saved === typeof base || base === null ? (saved as T) : base;
}

export const useStore = create<Persisted & Session & Actions>()(
  persist(
    (set) => ({
      ...emptyPersisted(),
      mentorUnlocked: false,
      resetCount: 0,

      setParticipant: (patch) => set((s) => ({ participant: { ...s.participant, ...patch } })),
      dismissBanner: (routeKey) => set((s) => ({ ui: { ...s.ui, bannerDismissed: { ...s.ui.bannerDismissed, [routeKey]: true } } })),
      toggleRead: (cardId, value) =>
        set((s) => ({ ui: { ...s.ui, sectionsRead: { ...s.ui.sectionsRead, [cardId]: value ?? !s.ui.sectionsRead[cardId] } } })),

      setLang: (l) => set((s) => ({ ui: { ...s.ui, lang: l } })),
      patchL1: (p) => set((s) => ({ l1: { ...s.l1, ...resolve(p, s.l1) } })),
      patchR2: (p) => set((s) => ({ r2: { ...s.r2, ...resolve(p, s.r2) } })),

      // --- Block 1.1: sort what the customers said ---------------------------------
      placeFeeling: (id, emotion) => set((s) => ({ l1: placeOn(s.l1, BOARDS.sort, id, emotion) })),
      undoSort: () => set((s) => ({ l1: undoOn(s.l1, BOARDS.sort) })),
      redoSort: () => set((s) => ({ l1: redoOn(s.l1, BOARDS.sort) })),
      // --- Block 1.2: name the trigger of each line --------------------------------
      placeLine: (id, trigger) => set((s) => ({ l1: placeOn(s.l1, BOARDS.trig, id, trigger) })),
      undoTrig: () => set((s) => ({ l1: undoOn(s.l1, BOARDS.trig) })),
      redoTrig: () => set((s) => ({ l1: redoOn(s.l1, BOARDS.trig) })),
      // --- Block 2.1: tag the twelve touchpoints -----------------------------------
      placeTouch: (id, need) => set((s) => ({ l1: placeOn(s.l1, BOARDS.tags, id, need) })),
      undoTags: () => set((s) => ({ l1: undoOn(s.l1, BOARDS.tags) })),
      redoTags: () => set((s) => ({ l1: redoOn(s.l1, BOARDS.tags) })),

      setMentorUnlocked: (v) => set({ mentorUnlocked: v }),

      // Mentor autofill: every model answer in Routes 1 and 2, plus the participant name if it is empty, so each document can be exported straight away.
      mentorFill: () =>
        set((s) => {
          const l1 = emptyL1();
          l1.sort = { ...KEY_L1.sort };
          l1.extraFactor = KEY_L1.extraFactor;
          l1.trig = { ...KEY_L1.trig };
          l1.noSend = [...KEY_L1.noSend];
          l1.appr = KEY_L1.approaches.map((a) => ({ ...a }));
          l1.figs = { ...KEY_L1.figs };
          l1.parts = modelParts(FIGURE_BUILDERS);
          l1.sentence = KEY_L1.sentence;
          l1.risks = { ...KEY_L1.risks };
          l1.reflect = { ...KEY_L1.reflect };
          l1.tags = { ...KEY_L1.tags };
          l1.patterns = KEY_L1.patterns.map((p) => ({ ...p }));
          l1.info = [...KEY_L1.info];
          l1.infoText = KEY_L1.infoText;
          l1.chosen = [...KEY_L1.chosen];
          l1.aims = Object.fromEntries(Object.entries(KEY_L1.aims).map(([k, v]) => [k, [...v]]));
          l1.eff = { ...KEY_L1.eff } as Record<string, Score>;
          l1.acc = { ...KEY_L1.acc } as Record<string, Score>;
          l1.sca = { ...KEY_L1.sca } as Record<string, Score>;
          l1.order = [...KEY_L1.order];
          l1.why = KEY_L1.why;
          l1.loyType = KEY_L1.loyType;
          l1.loyBenefits = [...KEY_L1.loyBenefits];
          l1.loyEntry = KEY_L1.loyEntry;
          l1.loyHorizon = KEY_L1.loyHorizon;
          l1.loyWhy = KEY_L1.loyWhy;

          const r2 = emptyR2();
          r2.vision = KEY_R2.vision;
          r2.visionText = KEY_R2.visionText;
          r2.levers = Object.fromEntries(LEVER_KINDS.map((k) => [k, { ...KEY_R2.levers[k] }])) as R2State["levers"];
          r2.lvl = { ...KEY_R2.levels };
          r2.weigh = KEY_R2.weigh;
          r2.sys = [...KEY_R2.systems];
          r2.rate = { ...KEY_R2.rate } as Record<string, Score>;
          r2.mainLever = KEY_R2.mainLever;
          r2.mainWhy = KEY_R2.mainWhy;
          r2.risks = [...KEY_R2.risks];
          r2.riskLik = { ...KEY_R2.riskLik } as Record<string, Score>;
          r2.riskImp = { ...KEY_R2.riskImp } as Record<string, Score>;
          r2.riskSignal = { ...KEY_R2.riskSignal };
          r2.riskResponse = { ...KEY_R2.riskResponse };
          r2.alloc = Object.fromEntries(KEY_R2.arch.map((id: ArchId) => [id, true]));
          r2.start = { ...KEY_R2.start };
          r2.owner = { ...KEY_R2.owner };
          r2.trigger = { ...KEY_R2.trigger };
          r2.postponed = KEY_R2.postponed;
          r2.pickup = KEY_R2.pickup;
          r2.decision = KEY_R2.decision;
          r2.assumptions = [...KEY_R2.assumptions];
          r2.tripKpi = KEY_R2.tripKpi;
          r2.tripThreshold = KEY_R2.tripThreshold;
          r2.tripMonth = KEY_R2.tripMonth;
          r2.tripAction = KEY_R2.tripAction;
          r2.challenge = KEY_R2.challenge;

          const participant = { name: s.participant.name.trim() ? s.participant.name : "Mentor Check" };
          return { participant, l1, r2, resetCount: s.resetCount + 1 };
        }),

      // One route's state (the participant strip and the other route stay).
      resetRoute: (route) =>
        set((s) => {
          const prefix = route === 1 ? "A" : route === 2 ? "B" : "";
          const keep = (k: string) => (route === null ? false : !k.startsWith(prefix));
          const sectionsRead = Object.fromEntries(Object.entries(s.ui.sectionsRead).filter(([k]) => keep(k)));
          const bannerDismissed = { ...s.ui.bannerDismissed };
          if (route === null) for (const k of Object.keys(bannerDismissed)) delete bannerDismissed[k];
          else delete bannerDismissed[`r${route}`];
          return {
            l1: route === null || route === 1 ? emptyL1() : s.l1,
            r2: route === null || route === 2 ? emptyR2() : s.r2,
            ui: { bannerDismissed, sectionsRead, lang: s.ui.lang },
            resetCount: s.resetCount + 1,
          };
        }),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      // Session-only flags (mentor unlock, reset counter) never persist.
      partialize: (s) => ({ participant: s.participant, ui: s.ui, l1: s.l1, r2: s.r2 }),
      // Any change to the persisted shape bumps `version` and adds a step here; `merge` below then fills every field an older
      // blob lacks from the defaults. Version 1 is the first shape of Day 4 (there is nothing older to migrate).
      migrate: (persisted) => (persisted ?? {}) as Persisted,
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<Persisted>;
        const base = emptyPersisted();
        const merged = mergeDefaults(base, p);
        merged.ui.lang = merged.ui.lang === "de" ? "de" : "en";
        return { ...current, ...merged };
      },
    },
  ),
);

/**
 * The store is created with `skipHydration`, so the server render and the first client paint both see the
 * defaults (no hydration mismatch). <StoreHydrator/> reads localStorage once after mount. This hook reports
 * when it has finished, for UI that must not flash a default (a dismissed banner, a read mark).
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const unsub = useStore.persist.onFinishHydration(() => setHydrated(true));
    if (useStore.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);
  return hydrated;
}

export function rehydrateStore() {
  return useStore.persist.rehydrate();
}
