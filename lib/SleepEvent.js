"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SleepEventType;
(function (SleepEventType) {
    SleepEventType["SLEEP"] = "SLEEP_EVENT_TYPE_SLEEP";
    SleepEventType["WAKEUP"] = "SLEEP_EVENT_TYPE_WAKEUP";
})(SleepEventType = exports.SleepEventType || (exports.SleepEventType = {}));
var SleepEvent = /** @class */ (function () {
    function SleepEvent(type) {
        this.type = type;
    }
    return SleepEvent;
}());
exports.SleepEvent = SleepEvent;
