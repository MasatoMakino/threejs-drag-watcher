import { EventDispatcher } from "three";
import { DragEvent, DragEventType } from "./DragEvent";
/**
 * 1.カンバス全体がドラッグされている状態を確認する
 * 2.マウスホイールが操作されている状態を確認する
 * この二つを実行するためのクラスです。
 */
export class DragWatcher extends EventDispatcher {
    constructor(canvas) {
        super();
        this.isDrag = false;
        this.onDocumentMouseDown = (event) => {
            if (this.isDrag)
                return;
            this.isDrag = true;
            this.positionX = event.layerX;
            this.positionY = event.layerY;
            const evt = new DragEvent(DragEventType.DRAG_START);
            evt.positionX = event.layerX;
            evt.positionY = event.layerY;
            this.dispatchEvent(evt);
        };
        this.onDocumentMouseMove = (event) => {
            const moveEvt = new DragEvent(DragEventType.MOVE);
            moveEvt.positionX = event.layerX;
            moveEvt.positionY = event.layerY;
            this.dispatchEvent(moveEvt);
            if (!this.isDrag)
                return;
            const evt = new DragEvent(DragEventType.DRAG);
            evt.positionX = event.layerX;
            evt.positionY = event.layerY;
            evt.deltaX = event.layerX - this.positionX;
            evt.deltaY = event.layerY - this.positionY;
            this.dispatchEvent(evt);
            this.positionX = event.layerX;
            this.positionY = event.layerY;
        };
        this.onDocumentMouseLeave = (event) => {
            this.onDocumentMouseUp(event);
        };
        this.onDocumentMouseUp = (event) => {
            if (!this.isDrag)
                return;
            this.isDrag = false;
            const evt = new DragEvent(DragEventType.DRAG_END);
            evt.positionX = event.layerX;
            evt.positionY = event.layerY;
            this.dispatchEvent(evt);
        };
        this.onMouseWheel = (e) => {
            const evt = new DragEvent(DragEventType.ZOOM);
            if (e.detail != null) {
                evt.deltaScroll = e.detail < 0 ? 1 : -1;
            }
            if (e.wheelDelta != null) {
                evt.deltaScroll = e.wheelDelta > 0 ? 1 : -1;
            }
            this.dispatchEvent(evt);
        };
        canvas.addEventListener("mousemove", this.onDocumentMouseMove, false);
        canvas.addEventListener("mousedown", this.onDocumentMouseDown, false);
        canvas.addEventListener("mouseup", this.onDocumentMouseUp, false);
        canvas.addEventListener("mouseleave", this.onDocumentMouseLeave, false);
        canvas.addEventListener("mousewheel", this.onMouseWheel, false); // IE9, Chrome, Safari, Opera
        canvas.addEventListener("DOMMouseScroll", this.onMouseWheel, false); // Firefox
    }
}
