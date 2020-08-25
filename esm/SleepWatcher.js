import {EventDispatcher} from "three";
import {DragEventType} from "./DragEvent";
import {SleepEvent, SleepEventType} from "./SleepEvent";

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
        this.switchMouseEventListeners(false);
    }
    startMouseEventListeners() {
        this.switchMouseEventListeners(true);
    }
    switchMouseEventListeners(isAddListener) {
        const watcher = this.dragWatcher;
        [
            DragEventType.DRAG,
            DragEventType.DRAG_START,
            DragEventType.DRAG_END,
            DragEventType.ZOOM,
        ].forEach((type) => {
            if (isAddListener) {
                watcher.addEventListener(type, this.resetTimer);
            }
            else {
                watcher.removeEventListener(type, this.resetTimer);
            }
        });
    }
}
