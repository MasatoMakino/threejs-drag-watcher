import { Event } from "three";

export interface DragEvent extends Event {
  type: DragEventType;
  positionX?: number;
  positionY?: number;
  deltaX?: number;
  deltaY?: number;
  deltaScroll?: number;
}

export type DragEventType =
  | "drag_start"
  | "drag"
  | "drag_end"
  | "move"
  | "zoom";
