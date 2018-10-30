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
    this.positionX = event.layerX;
    this.positionY = event.layerY;

    const evt: DragEvent = new DragEvent(DragEventType.DRAG_START);
    evt.positionX = event.layerX;
    evt.positionY = event.layerY;
    this.dispatchEvent(evt);
  };

  protected onDocumentMouseMove = (event: MouseEvent) => {
    const moveEvt: DragEvent = new DragEvent(DragEventType.MOVE);
    moveEvt.positionX = event.layerX;
    moveEvt.positionY = event.layerY;
    this.dispatchEvent(moveEvt);

    if (!this.isDrag) return;

    const evt: DragEvent = new DragEvent(DragEventType.DRAG);
    evt.positionX = event.layerX;
    evt.positionY = event.layerY;
    evt.deltaX = event.layerX - this.positionX;
    evt.deltaY = event.layerY - this.positionY;
    this.dispatchEvent(evt);

    this.positionX = event.layerX;
    this.positionY = event.layerY;
  };

  protected onDocumentMouseLeave = (event: MouseEvent) => {
    this.onDocumentMouseUp(event);
  };

  protected onDocumentMouseUp = (event: MouseEvent) => {
    if (!this.isDrag) return;

    this.isDrag = false;

    const evt: DragEvent = new DragEvent(DragEventType.DRAG_END);
    evt.positionX = event.layerX;
    evt.positionY = event.layerY;
    this.dispatchEvent(evt);
  };

  private onMouseWheel = (e: any) => {
    const evt: DragEvent = new DragEvent(DragEventType.ZOOM);

    console.log(e.detail, e.wheelDelta);
    if (e.detail != null) {
      evt.deltaScroll = e.detail < 0 ? 1 : -1;
    }
    if (e.wheelDelta != null) {
      evt.deltaScroll = e.wheelDelta > 0 ? 1 : -1;
    }

    this.dispatchEvent(evt);
  };
}
