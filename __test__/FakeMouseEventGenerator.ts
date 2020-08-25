export interface FakeMouseEventInit {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  altKey?: boolean;
  button?: 0 | 1 | 2 | 3 | 4;
  buttons?: number;
  clientX?: number;
  clientY?: number;
  ctrlKey?: boolean;
  metaKey?: boolean;
  movementX?: number;
  movementY?: number;
  offsetX?: number;
  offsetY?: number;
  pageX?: number;
  pageY?: number;
  screenX?: number;
  screenY?: number;
  shiftKey?: boolean;
  x?: number;
  y?: number;
}

export class FakeMouseEvent extends MouseEvent {
  offsetX: number;
  offsetY: number;
  pageX: number;
  pageY: number;
  x: number;
  y: number;

  constructor(type: string, values: FakeMouseEventInit) {
    super(type, values);

    this.offsetX = values.offsetX;
    this.offsetY = values.offsetY;
    this.pageX = values.pageX;
    this.pageY = values.pageY;
    this.x = values.x;
    this.y = values.y;
  }
}

export function getMouseEvent(
  type: string,
  values?: FakeMouseEventInit
): FakeMouseEvent {
  values ??= {};
  values.bubbles ??= true;
  values.cancelable ??= true;
  values.offsetX ??= 0;
  values.offsetY ??= 0;
  values.pageX ??= 0;
  values.pageY ??= 0;
  values.x ??= 0;
  values.y ??= 0;

  return new FakeMouseEvent(type, values);
}
