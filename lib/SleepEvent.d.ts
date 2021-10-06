import { Event } from "three";
export declare enum SleepEventType {
    SLEEP = "SLEEP_EVENT_TYPE_SLEEP",
    WAKEUP = "SLEEP_EVENT_TYPE_WAKEUP"
}
export declare class SleepEvent implements Event {
    type: SleepEventType;
    constructor(type: SleepEventType);
}
//# sourceMappingURL=SleepEvent.d.ts.map