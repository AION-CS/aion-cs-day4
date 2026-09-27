import { bi, t } from "@/lib/lang";

/**
 * Day 4 route registry: Customer Retention & Buying Behaviour in B2B IT Sales, Module 2, Day 2.
 * From Day 3 a day has TWO routes (CLAUDE.md #30): Route 1 merges Level 1 and Level 2 on one case,
 * Route 2 is Level 3.
 */

export const COURSE = bi({
  title: t("Emotional Sales Control, Personalisation and Long-Term Customer Retention", "Emotionale Verkaufssteuerung, Personalisierung und langfristige Kundenbindung"),
  site: t("Retention Lab · Day 4", "Retention Lab · Tag 4"),
  module: t("Module 2, Day 2 of 2", "Modul 2, Tag 2 von 2"),
  course: t("Customer Retention & Buying Behaviour in B2B IT Sales", "Customer Retention & Kaufverhalten im B2B-IT-Vertrieb"),
  day: 4,
  company: "CloudTech Solutions GmbH",
});

export type RouteNo = 1 | 2;

/** Minutes are a guide for the facilitator, not a timer. One place, so the home page, the rail and the blocks agree. */
export const BLOCK_MINUTES = {
  "1.1": 7,
  "1.2": 7,
  "1.3": 7,
  "1.4": 10,
  "1.5": 4,
  "2.1": 8,
  "2.2": 9,
  "2.3": 11,
  "2.4": 9,
  "3.1": 5,
  "3.2": 8,
  "3.3": 8,
  "3.4": 10,
  "3.5": 8,
  "3.6": 10,
  "3.7": 10,
} as const;

const sum = (keys: (keyof typeof BLOCK_MINUTES)[]) => keys.reduce((s, k) => s + BLOCK_MINUTES[k], 0);
export const TASK1_MINUTES = sum(["1.1", "1.2", "1.3", "1.4", "1.5", "2.1", "2.2", "2.3", "2.4"]);
export const TASK2_MINUTES = sum(["3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7"]);

export type RouteInfo = {
  n: RouteNo;
  href: string;
  short: string;
  title: string;
  level: string;
  blurb: string;
  plan: { label: string; minutes: number }[];
  built: boolean;
};

export const ROUTES: RouteInfo[] = bi([
  {
    n: 1 as RouteNo,
    href: "/route-1/",
    short: t("Understand & apply", "Verstehen & anwenden"),
    title: t("Route 1 · Understand and apply", "Route 1 · Verstehen und anwenden"),
    level: t("Levels 1 + 2 · Knowledge and application", "Level 1 + 2 · Wissen und Anwendung"),
    blurb: t(
      "One case, two levels: CloudTech Solutions' offers look the same as everyone else's and customers compare prices. You study how the brain buys, four emotions, three triggers, behavioural targeting and loyalty programmes, weigh three measures under a small budget and strict data protection, find the emotional weaknesses in twelve touchpoints and design three measures and a loyalty concept inside €180,000 and six months. Material first, then one task that ends in a Retention Plan.",
      "Ein Fall, zwei Level: Die Angebote von CloudTech Solutions sehen aus wie die aller anderen, und Kunden vergleichen Preise. Sie lernen, wie das Gehirn kauft, vier Emotionen, drei Trigger, Behavioral Targeting und Loyalty-Programme, wägen drei Maßnahmen unter kleinem Budget und strengem Datenschutz ab, finden die emotionalen Schwachstellen in zwölf Touchpoints und entwerfen drei Maßnahmen und ein Loyalty-Konzept innerhalb von 180.000 € und sechs Monaten. Erst das Material, dann eine Aufgabe, die mit einem Retention Plan endet.",
    ),
    plan: [
      { label: t("Materi A · seven cards, Levels 1 and 2", "Materi A · sieben Karten, Level 1 und 2"), minutes: 60 },
      { label: t("Task 1 · Retention Plan, one task", "Task 1 · Retention Plan, eine Aufgabe"), minutes: TASK1_MINUTES },
    ],
    built: true,
  },
  {
    n: 2 as RouteNo,
    href: "/route-2/",
    short: t("Decide", "Entscheiden"),
    title: t("Route 2 · Management decision", "Route 2 · Management-Entscheidung"),
    level: t("Level 3 · Management decision", "Level 3 · Management-Entscheidung"),
    blurb: t(
      "You are now the Chief Customer Officer. Competition is strong, retention is weak, the offers are interchangeable, the budget is limited, data protection sets hard limits and customer behaviour is not fully visible. You define a vision, set the levers of emotion, trust and relevance, weigh how far to personalise, design a loyalty system that is not just bonuses, size the risks and decide, in writing, before the data is clear. Material first, then a Strategy Memo that assembles itself beside your answers.",
      "Sie sind jetzt Chief Customer Officer. Der Wettbewerb ist stark, die Retention schwach, die Angebote sind austauschbar, das Budget ist knapp, der Datenschutz setzt harte Grenzen und das Kundenverhalten ist nicht vollständig sichtbar. Sie legen eine Vision fest, setzen die Hebel Emotion, Vertrauen und Relevanz, wägen ab, wie weit personalisiert wird, entwerfen ein Loyalty-System, das mehr ist als Boni, beziffern die Risiken und entscheiden schriftlich, bevor die Datenlage klar ist. Erst das Material, dann ein Strategy Memo, das sich neben Ihren Antworten von selbst aufbaut.",
    ),
    plan: [
      { label: t("Materi B · six cards, Level 3", "Materi B · sechs Karten, Level 3"), minutes: 60 },
      { label: t("Task 2 · Strategy Memo", "Task 2 · Strategy Memo"), minutes: TASK2_MINUTES },
    ],
    built: true,
  },
]);
