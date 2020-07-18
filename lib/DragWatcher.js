"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragWatcher = void 0;
var three_1 = require("three");
var DragEvent_1 = require("./DragEvent");
var raf_ticker_1 = require("raf-ticker");
/**
 * 1.カンバス全体がドラッグされている状態を確認する
 * 2.マウスホイールが操作されている状態を確認する
 * この二つを実行するためのクラスです。
 */
var DragWatcher = /** @class */ (function (_super) {
    __extends(DragWatcher, _super);
    function DragWatcher(canvas, option) {
        var _a;
        var _this = _super.call(this) || this;
        _this.isDrag = false;
        _this.hasThrottled = false;
        _this.throttlingTime_ms = 16;
        _this.throttlingDelta = 0;
        _this.onDocumentMouseDown = function (event) {
            if (_this.isDrag)
                return;
            _this.isDrag = true;
            _this.updatePosition(event);
            _this.dispatchDragEvent(DragEvent_1.DragEventType.DRAG_START, event);
        };
        _this.onDocumentMouseMove = function (event) {
            if (_this.hasThrottled)
                return;
            _this.hasThrottled = true;
            _this.dispatchDragEvent(DragEvent_1.DragEventType.MOVE, event);
            if (!_this.isDrag)
                return;
            _this.dispatchDragEvent(DragEvent_1.DragEventType.DRAG, event);
            _this.updatePosition(event);
        };
        _this.onDocumentMouseLeave = function (event) {
            _this.onDocumentMouseUp(event);
        };
        _this.onDocumentMouseUp = function (event) {
            if (!_this.isDrag)
                return;
            _this.isDrag = false;
            _this.dispatchDragEvent(DragEvent_1.DragEventType.DRAG_END, event);
        };
        _this.onMouseWheel = function (e) {
            var evt = new DragEvent_1.DragEvent(DragEvent_1.DragEventType.ZOOM);
            if (e.detail != null) {
                evt.deltaScroll = e.detail < 0 ? 1 : -1;
            }
            if (e.wheelDelta != null) {
                evt.deltaScroll = e.wheelDelta > 0 ? 1 : -1;
            }
            if (e.deltaY != null) {
                evt.deltaScroll = e.deltaY > 0 ? 1 : -1;
            }
            _this.dispatchEvent(evt);
        };
        _this.throttlingTime_ms = (_a = option === null || option === void 0 ? void 0 : option.throttlingTime_ms) !== null && _a !== void 0 ? _a : _this.throttlingTime_ms;
        canvas.addEventListener("mousemove", _this.onDocumentMouseMove, false);
        canvas.addEventListener("mousedown", _this.onDocumentMouseDown, false);
        canvas.addEventListener("mouseup", _this.onDocumentMouseUp, false);
        canvas.addEventListener("mouseleave", _this.onDocumentMouseLeave, false);
        canvas.addEventListener("wheel", _this.onMouseWheel, false);
        raf_ticker_1.RAFTicker.addEventListener(raf_ticker_1.RAFTickerEventType.tick, function (e) {
            _this.throttlingDelta += e.delta;
            if (_this.throttlingDelta < _this.throttlingTime_ms)
                return;
            _this.hasThrottled = false;
            _this.throttlingDelta %= _this.throttlingTime_ms;
        });
        return _this;
    }
    DragWatcher.prototype.updatePosition = function (event) {
        this.positionX = event.offsetX;
        this.positionY = event.offsetY;
    };
    DragWatcher.prototype.dispatchDragEvent = function (type, event) {
        var evt = new DragEvent_1.DragEvent(type);
        evt.positionX = event.offsetX;
        evt.positionY = event.offsetY;
        if (type === DragEvent_1.DragEventType.DRAG) {
            evt.deltaX = event.offsetX - this.positionX;
            evt.deltaY = event.offsetY - this.positionY;
        }
        this.dispatchEvent(evt);
    };
    return DragWatcher;
}(three_1.EventDispatcher));
exports.DragWatcher = DragWatcher;
