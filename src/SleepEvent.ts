export interface SleepEvent {
  type: keyof SleepEventMap;
}
export interface SleepEventMap {
  sleep: (e: SleepEvent) => void;
  wakeup: (e: SleepEvent) => void;
}
