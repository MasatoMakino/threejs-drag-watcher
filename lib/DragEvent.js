"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DragEvent = /** @class */ (function () {
    function DragEvent(type) {
        this.type = type;
    }
    return DragEvent;
}());
exports.DragEvent = DragEvent;
var DragEventType;
(function (DragEventType) {
    DragEventType["DRAG_START"] = "THREE_CANVAS_EVENT_DRAG_START";
    DragEventType["DRAG"] = "THREE_CANVAS_EVENT_DRAG";
    DragEventType["DRAG_END"] = "THREE_CANVAS_EVENT_DRAG_END";
    DragEventType["MOVE"] = "THREE_CANVAS_EVENT_MOVE";
    DragEventType["ZOOM"] = "THREE_CANVAS_EVENT_ZOOM";
})(DragEventType = exports.DragEventType || (exports.DragEventType = {}));
