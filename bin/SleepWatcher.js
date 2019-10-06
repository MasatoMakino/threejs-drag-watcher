import { EventDispatcher } from "three";
import { SleepEvent, SleepEventType } from "./SleepEvent";
import { DragEventType } from "./DragEvent";
export class SleepWatcher extends EventDispatcher {
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
            this.dispatchEvent(new SleepEvent(SleepEventType.SLEEP));
            this.isSleep = true;
        };
        this.wakeup = () => {
            if (!this.isSleep)
                return;
            this.dispatchEvent(new SleepEvent(SleepEventType.WAKEUP));
            this.isSleep = false;
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
        watcher.removeEventListener(DragEventType.DRAG, this.resetTimer);
        watcher.removeEventListener(DragEventType.DRAG_START, this.resetTimer);
        watcher.removeEventListener(DragEventType.DRAG_END, this.resetTimer);
    }
    startMouseEventListeners() {
        const watcher = this.dragWatcher;
        watcher.addEventListener(DragEventType.DRAG, this.resetTimer);
        watcher.addEventListener(DragEventType.DRAG_START, this.resetTimer);
        watcher.addEventListener(DragEventType.DRAG_END, this.resetTimer);
    }
}
