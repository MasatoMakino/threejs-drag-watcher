export var SleepEventType;
(function (SleepEventType) {
    SleepEventType["SLEEP"] = "SLEEP_EVENT_TYPE_SLEEP";
    SleepEventType["WAKEUP"] = "SLEEP_EVENT_TYPE_WAKEUP";
})(SleepEventType || (SleepEventType = {}));
export class SleepEvent {
    constructor(type) {
        this.type = type;
    }
}
