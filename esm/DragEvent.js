export class DragEvent {
    constructor(type) {
        this.type = type;
    }
}
export var DragEventType;
(function (DragEventType) {
    DragEventType["DRAG_START"] = "THREE_CANVAS_EVENT_DRAG_START";
    DragEventType["DRAG"] = "THREE_CANVAS_EVENT_DRAG";
    DragEventType["DRAG_END"] = "THREE_CANVAS_EVENT_DRAG_END";
    DragEventType["MOVE"] = "THREE_CANVAS_EVENT_MOVE";
    DragEventType["ZOOM"] = "THREE_CANVAS_EVENT_ZOOM";
})(DragEventType || (DragEventType = {}));
