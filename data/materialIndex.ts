import { bi, t } from "@/lib/lang";
import { TASK1_MINUTES, TASK2_MINUTES } from "@/lib/routes";

/** One registry for every material card: the rail, the cards and the task chips all read it. */
export type MaterialId = "A1" | "A2" | "A3" | "A4" | "A5" | "A6" | "A7" | "B1" | "B2" | "B3" | "B4" | "B5" | "B6";
export type Block = "A" | "B";

export type MaterialMeta = { id: MaterialId; block: Block; title: string; minutes: number };

/**
 * Day 4 has two routes (CLAUDE.md #30). Materi A is the material of Route 1 (Levels 1 and 2 on one case): seven cards,
 * 60 minutes. Materi B is the material of Route 2 (Level 3): six cards, 60 minutes.
 */
export const MATERIALS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as Block, title: t("How the brain buys: feeling first, reasons second", "Wie das Gehirn kauft: erst das Gefühl, dann die Gründe"), minutes: 9 },
  { id: "A2" as MaterialId, block: "A" as Block, title: t("Four emotions in a purchase: security, trust, status, belonging", "Vier Emotionen beim Kauf: Sicherheit, Vertrauen, Status, Zugehörigkeit"), minutes: 9 },
  { id: "A3" as MaterialId, block: "A" as Block, title: t("Three triggers: scarcity, social proof, authority", "Drei Trigger: Scarcity, Social Proof, Authority"), minutes: 9 },
  { id: "A4" as MaterialId, block: "A" as Block, title: t("Behavioural targeting: relevance through context and timing", "Behavioral Targeting: Relevanz durch Kontext und Timing"), minutes: 9 },
  { id: "A5" as MaterialId, block: "A" as Block, title: t("Loyalty programmes: bonus, service, community", "Loyalty-Programme: Bonus, Service, Community"), minutes: 8 },
  { id: "A6" as MaterialId, block: "A" as Block, title: t("Reading a sales process: six unmet needs, and how strong each is", "Einen Vertriebsprozess lesen: sechs unerfüllte Bedürfnisse und wie stark jedes ist"), minutes: 8 },
  { id: "A7" as MaterialId, block: "A" as Block, title: t("From need to measure: effect, acceptance, scalability", "Vom Bedürfnis zur Maßnahme: Wirkung, Akzeptanz, Skalierbarkeit"), minutes: 8 },
  { id: "B1" as MaterialId, block: "B" as Block, title: t("Emotion, trust and relevance as levers you can manage", "Emotion, Vertrauen und Relevanz als Hebel, die Sie steuern können"), minutes: 10 },
  { id: "B2" as MaterialId, block: "B" as Block, title: t("Weighing personalisation against effort and data protection", "Personalisierung gegen Aufwand und Datenschutz abwägen"), minutes: 10 },
  { id: "B3" as MaterialId, block: "B" as Block, title: t("A loyalty system is more than a bonus", "Ein Loyalty-System ist mehr als ein Bonus"), minutes: 10 },
  { id: "B4" as MaterialId, block: "B" as Block, title: t("The risks of getting emotion and personalisation wrong", "Die Risiken, Emotion und Personalisierung falsch einzuschätzen"), minutes: 10 },
  { id: "B5" as MaterialId, block: "B" as Block, title: t("From building block to architecture: consent first, owner, trigger", "Vom Baustein zur Architektur: erst die Einwilligung, Owner, Trigger"), minutes: 10 },
  { id: "B6" as MaterialId, block: "B" as Block, title: t("Deciding when the data is unclear: staging and the tripwire", "Entscheiden bei unklarer Datenlage: Staffelung und Tripwire"), minutes: 10 },
]);

export const MATERIAL_BY_ID = Object.fromEntries(MATERIALS.map((m) => [m.id, m])) as Record<MaterialId, MaterialMeta>;
export const materialAnchorId = (id: MaterialId) => `mat-${id}`;

/** Section anchors per route page, in reading order. */
export type RailSection = { id: string; label: string; sub: string; minutes: number };
export const SECTIONS: Record<1 | 2, RailSection[]> = bi({
  1: [
    { id: "materi-a", label: t("Materi A", "Materi A"), sub: t("Levels 1 + 2 · emotion, targeting, loyalty", "Level 1 + 2 · Emotion, Targeting, Loyalty"), minutes: 60 },
    { id: "task-1", label: t("Task 1", "Task 1"), sub: t("Retention Plan · one case", "Retention Plan · ein Fall"), minutes: TASK1_MINUTES },
  ],
  2: [
    { id: "materi-b", label: t("Materi B", "Materi B"), sub: t("Level 3 · managing behaviour as a system", "Level 3 · Verhalten als System steuern"), minutes: 60 },
    { id: "task-2", label: t("Task 2", "Task 2"), sub: t("Strategy Memo · CCO", "Strategy Memo · CCO"), minutes: TASK2_MINUTES },
  ],
});
