"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragWatcher = void 0;
const raf_ticker_1 = require("raf-ticker");
const three_1 = require("three");
const DragEvent_1 = require("./DragEvent");
/**
 * 1.カンバス全体がドラッグされている状態を確認する
 * 2.マウスホイールが操作されている状態を確認する
 * この二つを実行するためのクラスです。
 */
class DragWatcher extends three_1.EventDispatcher {
    constructor(canvas, option) {
        var _a, _b;
        super();
        this.isDrag = false;
        this.hasThrottled = false;
        this.throttlingTime_ms = 16;
        this.throttlingDelta = 0;
        this.onTick = (e) => {
            this.throttlingDelta += e.delta;
            if (this.throttlingDelta < this.throttlingTime_ms)
                return;
            this.hasThrottled = false;
            this.throttlingDelta %= this.throttlingTime_ms;
        };
        this.onDocumentMouseDown = (event) => {
            if (this.isDrag)
                return;
            if (!this.isContain(event))
                return;
            this.isDrag = true;
            this.updatePosition(event);
            this.dispatchDragEvent(DragEvent_1.DragEventType.DRAG_START, event);
        };
        this.onDocumentMouseMove = (event) => {
            if (this.hasThrottled)
                return;
            this.hasThrottled = true;
            this.dispatchDragEvent(DragEvent_1.DragEventType.MOVE, event);
            if (!this.isDrag)
                return;
            this.dispatchDragEvent(DragEvent_1.DragEventType.DRAG, event);
            this.updatePosition(event);
        };
        this.onDocumentMouseLeave = (event) => {
            this.onDocumentMouseUp(event);
        };
        this.onDocumentMouseUp = (event) => {
            if (!this.isDrag)
                return;
            this.isDrag = false;
            this.dispatchDragEvent(DragEvent_1.DragEventType.DRAG_END, event);
        };
        this.onMouseWheel = (e) => {
            const evt = new DragEvent_1.DragEvent(DragEvent_1.DragEventType.ZOOM);
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
        (_a = this.throttlingTime_ms) !== null && _a !== void 0 ? _a : (this.throttlingTime_ms = option === null || option === void 0 ? void 0 : option.throttlingTime_ms);
        (_b = this.viewport) !== null && _b !== void 0 ? _b : (this.viewport = option === null || option === void 0 ? void 0 : option.viewport);
        this.canvas = canvas;
        this.canvas.addEventListener("mousemove", this.onDocumentMouseMove, false);
        this.canvas.addEventListener("mousedown", this.onDocumentMouseDown, false);
        this.canvas.addEventListener("mouseup", this.onDocumentMouseUp, false);
        this.canvas.addEventListener("mouseleave", this.onDocumentMouseLeave, false);
        this.canvas.addEventListener("wheel", this.onMouseWheel, false);
        raf_ticker_1.RAFTicker.on(raf_ticker_1.RAFTickerEventType.tick, this.onTick);
    }
    updatePosition(event) {
        this.positionX = event.offsetX;
        this.positionY = event.offsetY;
    }
    dispatchDragEvent(type, event) {
        const evt = new DragEvent_1.DragEvent(type);
        const { x, y } = this.convertToLocalMousePoint(event);
        evt.positionX = x;
        evt.positionY = y;
        if (type === DragEvent_1.DragEventType.DRAG) {
            evt.deltaX = event.offsetX - this.positionX;
            evt.deltaY = event.offsetY - this.positionY;
        }
        this.dispatchEvent(evt);
    }
    convertToLocalMousePoint(e) {
        if (!this.viewport) {
            return {
                x: e.offsetX,
                y: e.offsetY,
            };
        }
        else {
            const rect = DragWatcher.convertToRect(this.canvas, this.viewport);
            return {
                x: e.offsetX - rect.x1,
                y: e.offsetY - rect.y1
            };
        }
    }
    /**
     * マウスポインタがviewport内に収まっているか否か
     * @param event
     * @private
     */
    isContain(event) {
        if (!this.viewport)
            return true;
        const rect = DragWatcher.convertToRect(this.canvas, this.viewport);
        return (event.offsetX >= rect.x1 &&
            event.offsetX <= rect.x2 &&
            event.offsetY >= rect.y1 &&
            event.offsetY <= rect.y2);
    }
    static convertToRect(canvas, viewport) {
        return {
            x1: viewport.x,
            x2: viewport.x + viewport.width,
            y1: canvas.height - (viewport.y + viewport.height),
            y2: canvas.height - viewport.y,
        };
    }
    dispose() {
        this.canvas.removeEventListener("mousemove", this.onDocumentMouseMove, false);
        this.canvas.removeEventListener("mousedown", this.onDocumentMouseDown, false);
        this.canvas.removeEventListener("mouseup", this.onDocumentMouseUp, false);
        this.canvas.removeEventListener("mouseleave", this.onDocumentMouseLeave, false);
        raf_ticker_1.RAFTicker.off(raf_ticker_1.RAFTickerEventType.tick, this.onTick);
    }
}
exports.DragWatcher = DragWatcher;
