export class DragEvent {
  public type: DragEventType;

  public positionX!: number;
  public positionY!: number;
  public deltaX!: number;
  public deltaY!: number;
  public deltaScroll!: number;

  constructor(type: DragEventType) {
    this.type = type;
  }
}

export enum DragEventType {
  DRAG_START = "THREE_CANVAS_EVENT_DRAG_START",
  DRAG = "THREE_CANVAS_EVENT_DRAG",
  DRAG_END = "THREE_CANVAS_EVENT_DRAG_END",
  MOVE = "THREE_CANVAS_EVENT_MOVE",
  ZOOM = "THREE_CANVAS_EVENT_ZOOM"
}
