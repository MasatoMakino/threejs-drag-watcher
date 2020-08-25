"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SleepWatcher = void 0;
var three_1 = require("three");
var DragEvent_1 = require("./DragEvent");
var SleepEvent_1 = require("./SleepEvent");
var SleepWatcher = /** @class */ (function (_super) {
    __extends(SleepWatcher, _super);
    function SleepWatcher(dragWatcher, option) {
        var _this = _super.call(this) || this;
        _this.timeOut_ms = 10 * 1000; //ミリsec
        _this.isSleep = false;
        /**
         * 無操作タイマーをリセットし、再度カウントを開始する。
         * @param e
         */
        _this.resetTimer = function (e) {
            if (e === void 0) { e = null; }
            _this.stopTimer();
            _this.wakeup();
            _this.sleepTimerID = setTimeout(_this.sleep, _this.timeOut_ms);
        };
        _this.sleep = function () {
            if (_this.isSleep)
                return;
            _this.dispatchEvent(new SleepEvent_1.SleepEvent(SleepEvent_1.SleepEventType.SLEEP));
            _this.isSleep = true;
        };
        _this.wakeup = function () {
            if (!_this.isSleep)
                return;
            _this.dispatchEvent(new SleepEvent_1.SleepEvent(SleepEvent_1.SleepEventType.WAKEUP));
            _this.isSleep = false;
        };
        if (!option)
            option = {};
        if (option.timeOut_ms != null)
            _this.timeOut_ms = option.timeOut_ms;
        _this.dragWatcher = dragWatcher;
        return _this;
    }
    SleepWatcher.prototype.stopTimer = function () {
        if (this.sleepTimerID == null)
            return;
        clearTimeout(this.sleepTimerID);
        this.sleepTimerID = null;
    };
    /**
     * マウス監視を開始する
     */
    SleepWatcher.prototype.start = function () {
        this.stopMouseEventListeners();
        this.startMouseEventListeners();
        this.resetTimer();
    };
    /**
     * マウスの監視を停止する
     */
    SleepWatcher.prototype.stop = function () {
        this.stopTimer();
        this.wakeup();
        this.stopMouseEventListeners();
    };
    SleepWatcher.prototype.stopMouseEventListeners = function () {
        this.switchMouseEventListeners(false);
    };
    SleepWatcher.prototype.startMouseEventListeners = function () {
        this.switchMouseEventListeners(true);
    };
    SleepWatcher.prototype.switchMouseEventListeners = function (isAddListener) {
        var _this = this;
        var watcher = this.dragWatcher;
        [
            DragEvent_1.DragEventType.DRAG,
            DragEvent_1.DragEventType.DRAG_START,
            DragEvent_1.DragEventType.DRAG_END,
            DragEvent_1.DragEventType.ZOOM,
        ].forEach(function (type) {
            if (isAddListener) {
                watcher.addEventListener(type, _this.resetTimer);
            }
            else {
                watcher.removeEventListener(type, _this.resetTimer);
            }
        });
    };
    return SleepWatcher;
}(three_1.EventDispatcher));
exports.SleepWatcher = SleepWatcher;
