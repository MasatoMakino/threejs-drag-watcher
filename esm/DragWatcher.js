import {EventDispatcher} from "three";
import {DragEvent, DragEventType} from "./DragEvent";
import {RAFTicker, RAFTickerEventType} from "raf-ticker";

/**
 * 1.カンバス全体がドラッグされている状態を確認する
 * 2.マウスホイールが操作されている状態を確認する
 * この二つを実行するためのクラスです。
 */
export class DragWatcher extends EventDispatcher {
    constructor(canvas, option) {
        var _a;
        super();
        this.isDrag = false;
        this.hasThrottled = false;
        this.throttlingTime_ms = 16;
        this.throttlingDelta = 0;
        this.onDocumentMouseDown = (event) => {
            if (this.isDrag)
                return;
            this.isDrag = true;
            this.updatePosition(event);
            this.dispatchDragEvent(DragEventType.DRAG_START, event);
        };
        this.onDocumentMouseMove = (event) => {
            if (this.hasThrottled)
                return;
            this.hasThrottled = true;
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
            if (e.deltaY != null) {
                evt.deltaScroll = e.deltaY > 0 ? 1 : -1;
            }
            this.dispatchEvent(evt);
        };
        this.throttlingTime_ms = (_a = option === null || option === void 0 ? void 0 : option.throttlingTime_ms) !== null && _a !== void 0 ? _a : this.throttlingTime_ms;
        canvas.addEventListener("mousemove", this.onDocumentMouseMove, false);
        canvas.addEventListener("mousedown", this.onDocumentMouseDown, false);
        canvas.addEventListener("mouseup", this.onDocumentMouseUp, false);
        canvas.addEventListener("mouseleave", this.onDocumentMouseLeave, false);
        canvas.addEventListener("wheel", this.onMouseWheel, false);
        RAFTicker.addEventListener(RAFTickerEventType.tick, (e) => {
            this.throttlingDelta += e.delta;
            if (this.throttlingDelta < this.throttlingTime_ms)
                return;
            this.hasThrottled = false;
            this.throttlingDelta %= this.throttlingTime_ms;
        });
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
