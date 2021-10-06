import {Event} from "three";

export enum SleepEventType {
  SLEEP = "SLEEP_EVENT_TYPE_SLEEP",
  WAKEUP = "SLEEP_EVENT_TYPE_WAKEUP"
}

export class SleepEvent implements Event{
  type: SleepEventType;

  constructor(type: SleepEventType) {
    this.type = type;
  }
}
