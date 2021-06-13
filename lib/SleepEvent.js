"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SleepEvent = exports.SleepEventType = void 0;
var SleepEventType;
(function (SleepEventType) {
    SleepEventType["SLEEP"] = "SLEEP_EVENT_TYPE_SLEEP";
    SleepEventType["WAKEUP"] = "SLEEP_EVENT_TYPE_WAKEUP";
})(SleepEventType = exports.SleepEventType || (exports.SleepEventType = {}));
class SleepEvent {
    constructor(type) {
        this.type = type;
    }
}
exports.SleepEvent = SleepEvent;
