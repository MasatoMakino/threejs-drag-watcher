import { Event } from "three";

export type SleepEventType = "sleep" | "wakeup";

export interface SleepEvent extends Event {
  type: SleepEventType;
}
