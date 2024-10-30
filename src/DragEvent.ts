export interface DragEvent {
  type: keyof DragEventMap;
  positionX?: number;
  positionY?: number;
  deltaX?: number;
  deltaY?: number;
  deltaScroll?: number;
  pointerId?: number;
}

export interface PinchEvent {
  type: "pinch";
  delta: number;
  pointers: PointerEvent[];
}

export interface DragEventMap {
  drag_start: (e: DragEvent) => void;
  drag: (e: DragEvent) => void;
  drag_end: (e: DragEvent) => void;
  move: (e: DragEvent) => void;
  zoom: (e: DragEvent) => void;
  pinch: (e: PinchEvent) => void;
}
