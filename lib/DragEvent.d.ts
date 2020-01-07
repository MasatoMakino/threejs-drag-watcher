export declare class DragEvent {
    type: DragEventType;
    positionX: number;
    positionY: number;
    deltaX: number;
    deltaY: number;
    deltaScroll: number;
    constructor(type: DragEventType);
}
export declare enum DragEventType {
    DRAG_START = "THREE_CANVAS_EVENT_DRAG_START",
    DRAG = "THREE_CANVAS_EVENT_DRAG",
    DRAG_END = "THREE_CANVAS_EVENT_DRAG_END",
    MOVE = "THREE_CANVAS_EVENT_MOVE",
    ZOOM = "THREE_CANVAS_EVENT_ZOOM"
}
//# sourceMappingURL=DragEvent.d.ts.map