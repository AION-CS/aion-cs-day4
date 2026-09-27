"use client";

import { SectionRail } from "@/components/chrome/SectionRail";
import { PageNav } from "@/components/chrome/PageNav";
import { HashFlash } from "@/components/chrome/HashFlash";
import { SuggestedOrderBanner } from "@/components/ui/Banner";
import { MateriB } from "@/components/materi/Materi";
import { Task2 } from "@/components/task2/Task2";
import { ResetRoute } from "@/components/ui/ResetRoute";
import { tt } from "@/lib/lang";

export function Route2Page() {
  return (
    <div className="space-y-8 pt-4">
      <HashFlash />
      <header className="space-y-3">
        <div className="space-y-1">
          <p className="smallcaps text-accent">{tt("Route 2 · Level 3 · Management decision", "Route 2 · Level 3 · Management-Entscheidung")}</p>
          <h1>{tt("Build a long-term customer strategy, before the data is clear", "Eine langfristige Kundenstrategie aufbauen, bevor die Datenlage klar ist")}</h1>
        </div>
        <blockquote className="max-w-prose space-y-2 border-l-4 border-gold bg-accentSoft px-4 py-3 text-body text-ink">
          <p>
            {tt(
              "Route 1 chose three measures and a loyalty concept for one case. Level 3 asks a different question: what long-term strategy joins emotion, personalisation and data protection for every customer, and what do you decide today although nobody can say how customers will react?",
              "Route 1 wählte drei Maßnahmen und ein Loyalty-Konzept für einen Fall. Level 3 stellt eine andere Frage: Welche langfristige Strategie verbindet Emotion, Personalisierung und Datenschutz für jeden Kunden, und was entscheiden Sie heute, obwohl niemand sagen kann, wie Kunden reagieren werden?",
            )}
          </p>
        </blockquote>
      </header>
      <SuggestedOrderBanner
        routeKey="r2"
        text={tt(
          "Route 1 first is recommended, because the situation quotes the needs and measures you named there. Every section stays open, so you can work through this route regardless.",
          "Route 1 zuerst wird empfohlen, weil die Lage die Bedürfnisse und Maßnahmen zitiert, die Sie dort genannt haben. Jeder Abschnitt bleibt offen, Sie können diese Route trotzdem durcharbeiten.",
        )}
      />
      <SectionRail route={2} />
      <PageNav route={2} />
      <MateriB />
      <Task2 />
      <ResetRoute route={2} />
    </div>
  );
}
