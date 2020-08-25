import {EventDispatcher} from "three";
import {DragWatcher} from "./DragWatcher";

export declare class SleepWatcher extends EventDispatcher {
    private dragWatcher;
    private sleepTimerID;
    private timeOut_ms;
    private isSleep;
    constructor(dragWatcher: DragWatcher, option?: {
        timeOut_ms?: number;
    });
    /**
     * 無操作タイマーをリセットし、再度カウントを開始する。
     * @param e
     */
    private resetTimer;
    private stopTimer;
    private sleep;
    private wakeup;
    /**
     * マウス監視を開始する
     */
    start(): void;
    /**
     * マウスの監視を停止する
     */
    stop(): void;
    protected stopMouseEventListeners(): void;
    protected startMouseEventListeners(): void;
    protected switchMouseEventListeners(isAddListener: boolean): void;
}
//# sourceMappingURL=SleepWatcher.d.ts.map