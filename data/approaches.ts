import type { EmotionId } from "@/data/needs";
import { EMOTION_IDS, NEEDS } from "@/data/needs";
import type { TriggerId } from "@/data/triggers";
import { bi, lazyRecord, t } from "@/lib/lang";

/**
 * Task 1 · Block 1.3. The three approaches a learner formulates to make an IT provider's offer more attractive. Each rests on one of the
 * four emotions of Materi A2, and the three must rest on three different ones so that they can be told apart. Each may use one trigger of
 * Materi A3, or none.
 */
export const APPROACH_COUNT = 3;
/** Labels are read when rendered, so they follow the language. */
export const APPROACH_EMOTIONS: { id: EmotionId; label: string; from: string }[] = EMOTION_IDS.map((id) => ({
  id,
  from: "A2",
  get label() {
    return NEEDS[id].label;
  },
}));
export const APPROACH_EMOTION_LABEL = lazyRecord<EmotionId>({
  security: () => NEEDS.security.label,
  trust: () => NEEDS.trust.label,
  status: () => NEEDS.status.label,
  belonging: () => NEEDS.belonging.label,
});

export type ApproachTrigger = TriggerId;
export const APPROACH_TRIGGER_OPTIONS: { id: TriggerId; label: string }[] = bi([
  { id: "none" as TriggerId, label: t("No trigger: the approach stands on its own", "Kein Trigger: Der Ansatz steht für sich") },
  { id: "scarcity" as TriggerId, label: t("Scarcity (a real limit)", "Scarcity (eine echte Grenze)") },
  { id: "proof" as TriggerId, label: t("Social proof (named, similar customers)", "Social Proof (namentlich genannte, ähnliche Kunden)") },
  { id: "authority" as TriggerId, label: t("Authority (a checkable credential)", "Authority (ein überprüfbarer Nachweis)") },
]);

/** True when the sentence gives a reason (English or German). The check is a floor, not a judge of quality. */
export const hasBecause = (s: string) => /\b(because|since|as it|which is why|so that|due to|weil|damit|sodass|so dass|denn|deshalb|daher|da)\b/i.test(s);
export const APPROACH_MIN = 45;

export const APPROACH_TXT = bi({
  frame: t(
    "We will [do what], so that the customer feels [what], because [why this works for that emotion].",
    "Wir werden [was tun], damit der Kunde [was] empfindet, weil [warum das bei dieser Emotion wirkt].",
  ),
});
