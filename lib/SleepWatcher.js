"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SleepWatcher = void 0;
const three_1 = require("three");
const DragEvent_1 = require("./DragEvent");
const SleepEvent_1 = require("./SleepEvent");
class SleepWatcher extends three_1.EventDispatcher {
    constructor(dragWatcher, option) {
        super();
        this.timeOut_ms = 10 * 1000; //ミリsec
        this.isSleep = false;
        /**
         * 無操作タイマーをリセットし、再度カウントを開始する。
         * @param e
         */
        this.resetTimer = (e = null) => {
            this.stopTimer();
            this.wakeup();
            this.sleepTimerID = setTimeout(this.sleep, this.timeOut_ms);
        };
        this.sleep = () => {
            if (this.isSleep)
                return;
            this.dispatchEvent(new SleepEvent_1.SleepEvent(SleepEvent_1.SleepEventType.SLEEP));
            this.isSleep = true;
        };
        this.wakeup = () => {
            if (!this.isSleep)
                return;
            this.dispatchEvent(new SleepEvent_1.SleepEvent(SleepEvent_1.SleepEventType.WAKEUP));
            this.isSleep = false;
        };
        this.pauseTimer = () => {
            this.stopTimer();
            this.wakeup();
            const watcher = this.dragWatcher;
            watcher.removeEventListener(DragEvent_1.DragEventType.DRAG_START, this.pauseTimer);
            watcher.addEventListener(DragEvent_1.DragEventType.DRAG_END, this.resumeTimer);
        };
        this.resumeTimer = () => {
            this.resetTimer();
            const watcher = this.dragWatcher;
            watcher.addEventListener(DragEvent_1.DragEventType.DRAG_START, this.pauseTimer);
            watcher.removeEventListener(DragEvent_1.DragEventType.DRAG_END, this.resumeTimer);
        };
        if (!option)
            option = {};
        if (option.timeOut_ms != null)
            this.timeOut_ms = option.timeOut_ms;
        this.dragWatcher = dragWatcher;
    }
    stopTimer() {
        if (this.sleepTimerID == null)
            return;
        clearTimeout(this.sleepTimerID);
        this.sleepTimerID = null;
    }
    /**
     * マウス監視を開始する
     */
    start() {
        this.stopMouseEventListeners();
        this.startMouseEventListeners();
        this.resetTimer();
    }
    startMouseEventListeners() {
        const watcher = this.dragWatcher;
        watcher.addEventListener(DragEvent_1.DragEventType.ZOOM, this.resetTimer);
        watcher.addEventListener(DragEvent_1.DragEventType.DRAG_START, this.pauseTimer);
    }
    /**
     * マウスの監視を停止する
     */
    stop() {
        this.stopTimer();
        this.wakeup();
        this.stopMouseEventListeners();
    }
    stopMouseEventListeners() {
        const watcher = this.dragWatcher;
        watcher.removeEventListener(DragEvent_1.DragEventType.ZOOM, this.resetTimer);
        watcher.removeEventListener(DragEvent_1.DragEventType.DRAG_START, this.pauseTimer);
        watcher.removeEventListener(DragEvent_1.DragEventType.DRAG_END, this.resumeTimer);
    }
}
exports.SleepWatcher = SleepWatcher;
