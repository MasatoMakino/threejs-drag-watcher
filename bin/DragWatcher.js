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
            this.updatePosition(event);
            this.dispatchDragEvent(DragEventType.DRAG_START, event);
        };
        this.onDocumentMouseMove = (event) => {
            this.dispatchDragEvent(DragEventType.MOVE, event);
            if (!this.isDrag)
                return;
            this.dispatchDragEvent(DragEventType.DRAG, event);
            this.updatePosition(event);
        };
        this.onDocumentMouseLeave = (event) => {
            this.onDocumentMouseUp(event);
        };
        this.onDocumentMouseUp = (event) => {
            if (!this.isDrag)
                return;
            this.isDrag = false;
            this.dispatchDragEvent(DragEventType.DRAG_END, event);
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
    updatePosition(event) {
        this.positionX = event.offsetX;
        this.positionY = event.offsetY;
    }
    dispatchDragEvent(type, event) {
        const evt = new DragEvent(type);
        evt.positionX = event.offsetX;
        evt.positionY = event.offsetY;
        if (type === DragEventType.DRAG) {
            evt.deltaX = event.offsetX - this.positionX;
            evt.deltaY = event.offsetY - this.positionY;
        }
        this.dispatchEvent(evt);
    }
}
