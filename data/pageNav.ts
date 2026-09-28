import { MATERIALS, materialAnchorId } from "@/data/materialIndex";
import type { RouteNo } from "@/lib/routes";
import type { TaskBlockId } from "@/lib/progress";
import { isOptionalBlock } from "@/lib/progress";
import { tt } from "@/lib/lang";

/**
 * The page map on the right of every route: one entry per material card and per task block, in page
 * order, so a learner can see how much the route holds and jump straight to any part of it. Anchor ids
 * are the ones the page already renders (mat-A1, block-2-1, export-l1l2, ...). Built on call, so it follows the language.
 */
export type NavItem = {
  /** The element id to scroll to. */
  id: string;
  /** The pill text: "A1", "2.3", "Case", "Export". */
  short: string;
  /** The full name, shown on hover/focus and in the mobile list. */
  title: string;
  /** Completion source: a card marked read, or a task block filled in. Absent = no done state. */
  done?: { card: string } | { block: TaskBlockId };
  /** Collapsed by default (OptionalSection), and outside the dossier ring's count and total. */
  optional?: boolean;
};
export type NavGroup = { label: string; items: NavItem[] };

const cards = (block: "A" | "B"): NavItem[] =>
  MATERIALS.filter((m) => m.block === block).map((m) => ({ id: materialAnchorId(m.id), short: m.id, title: m.title, done: { card: m.id }, optional: m.optional }));

const blk = (n: string, title: string, block: TaskBlockId): NavItem => ({ id: `block-${n.replace(".", "-")}`, short: n, title, done: { block }, optional: isOptionalBlock(block) });

export function pageNav(route: RouteNo): NavGroup[] {
  if (route === 1)
    return [
      { label: "Materi A", items: cards("A") },
      {
        label: "Task 1",
        items: [
          { id: "case-brief", short: tt("Case", "Fall"), title: tt("The case: CloudTech Solutions", "Der Fall: CloudTech Solutions") },
          blk("1.1", tt("Sort what customers feel", "Sortieren, was Kunden fühlen"), "b11"),
          blk("1.2", tt("Name the trigger, and what you would not send", "Den Trigger benennen, und was Sie nicht versenden würden"), "b12"),
          blk("1.3", tt("Three approaches", "Drei Ansätze"), "b13"),
          blk("1.4", tt("Weigh the three measures", "Die drei Maßnahmen abwägen"), "b14"),
          blk("1.5", tt("Coaching reflection", "Coaching-Reflexion"), "b15"),
          blk("2.1", tt("Twelve touchpoints", "Zwölf Touchpoints"), "b21"),
          blk("2.2", tt("Four needs, their strength, what is missing", "Vier Bedürfnisse, ihre Stärke, was fehlt"), "b22"),
          blk("2.3", tt("Three measures, scored and ordered", "Drei Maßnahmen, bewertet und geordnet"), "b23"),
          blk("2.4", tt("The loyalty concept", "Das Loyalty-Konzept"), "b24"),
          { id: "export-l1l2", short: "Export", title: tt("Export the Retention Plan", "Retention Plan exportieren") },
        ],
      },
    ];
  return [
    { label: "Materi B", items: cards("B") },
    {
      label: "Task 2",
      items: [
        { id: "task-2", short: tt("Case", "Fall"), title: tt("The situation and the budget", "Die Lage und das Budget") },
        blk("3.1", tt("The target vision", "Die Zielvision"), "b31"),
        blk("3.2", tt("Emotion, trust and relevance", "Emotion, Vertrauen und Relevanz"), "b32"),
        blk("3.3", tt("How far to personalise", "Wie weit personalisieren"), "b33"),
        blk("3.4", tt("A loyalty system, not just bonuses", "Ein Loyalty-System, nicht nur Boni"), "b34"),
        blk("3.5", tt("Risk of over-personalising", "Risiko der Über-Personalisierung"), "b35"),
        blk("3.6", tt("The architecture", "Die Architektur"), "b36"),
        blk("3.7", tt("The decision", "Die Entscheidung"), "b37"),
        { id: "export-l3", short: "Export", title: tt("Export the Strategy Memo", "Strategy Memo exportieren") },
      ],
    },
  ];
}
