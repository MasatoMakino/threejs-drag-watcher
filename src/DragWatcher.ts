import { EventDispatcher } from "three";
import { DragEvent, DragEventType } from "./DragEvent";

/**
 * 1.カンバス全体がドラッグされている状態を確認する
 * 2.マウスホイールが操作されている状態を確認する
 * この二つを実行するためのクラスです。
 */

export class DragWatcher extends EventDispatcher {
  protected positionX!: number;
  protected positionY!: number;
  protected isDrag: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    super();

    canvas.addEventListener("mousemove", this.onDocumentMouseMove, false);
    canvas.addEventListener("mousedown", this.onDocumentMouseDown, false);
    canvas.addEventListener("mouseup", this.onDocumentMouseUp, false);
    canvas.addEventListener("mouseleave", this.onDocumentMouseLeave, false);
    canvas.addEventListener("mousewheel", this.onMouseWheel, false); // IE9, Chrome, Safari, Opera
    canvas.addEventListener("DOMMouseScroll", this.onMouseWheel, false); // Firefox
  }

  protected onDocumentMouseDown = (event: MouseEvent) => {
    if (this.isDrag) return;

    this.isDrag = true;
    this.updatePosition(event);

    this.dispatchDragEvent(DragEventType.DRAG_START, event);
  };

  protected onDocumentMouseMove = (event: MouseEvent) => {
    this.dispatchDragEvent(DragEventType.MOVE, event);

    if (!this.isDrag) return;
    this.dispatchDragEvent(DragEventType.DRAG, event);
    this.updatePosition(event);
  };

  private updatePosition(event: MouseEvent): void {
    this.positionX = event.offsetX;
    this.positionY = event.offsetY;
  }

  private dispatchDragEvent(type: DragEventType, event: MouseEvent): void {
    const evt: DragEvent = new DragEvent(type);
    evt.positionX = event.offsetX;
    evt.positionY = event.offsetY;
    if (type === DragEventType.DRAG) {
      evt.deltaX = event.offsetX - this.positionX;
      evt.deltaY = event.offsetY - this.positionY;
    }
    this.dispatchEvent(evt);
  }

  protected onDocumentMouseLeave = (event: MouseEvent) => {
    this.onDocumentMouseUp(event);
  };

  protected onDocumentMouseUp = (event: MouseEvent) => {
    if (!this.isDrag) return;

    this.isDrag = false;

    this.dispatchDragEvent(DragEventType.DRAG_END, event);
  };

  private onMouseWheel = (e: any) => {
    const evt: DragEvent = new DragEvent(DragEventType.ZOOM);

    if (e.detail != null) {
      evt.deltaScroll = e.detail < 0 ? 1 : -1;
    }
    if (e.wheelDelta != null) {
      evt.deltaScroll = e.wheelDelta > 0 ? 1 : -1;
    }

    this.dispatchEvent(evt);
  };
}
