export enum SleepEventType {
  SLEEP = "SLEEP_EVENT_TYPE_SLEEP",
  WAKEUP = "SLEEP_EVENT_TYPE_WAKEUP"
}

export class SleepEvent {
  public type: SleepEventType;

  constructor(type: SleepEventType) {
    this.type = type;
  }
}
