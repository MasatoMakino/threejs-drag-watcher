import { EventDispatcher } from "three";
import { DragEventType, DragWatcher, SleepEvent, SleepEventType } from "./";

export class SleepWatcher extends EventDispatcher<SleepEvent> {
  private sleepTimerID?: number;
  private timeOut_ms: number = 10 * 1000; //ミリsec
  private isSleep = false;

  constructor(
    private dragWatcher: DragWatcher,
    option?: { timeOut_ms?: number },
  ) {
    super();
    if (!option) option = {};
    if (option.timeOut_ms != null) this.timeOut_ms = option.timeOut_ms;
  }

  /**
   * 無操作タイマーをリセットし、再度カウントを開始する。
   */
  public reset(): void {
    this.stopTimer();
    this.wakeup();

    this.sleepTimerID = window.setTimeout(this.sleep, this.timeOut_ms);
  }

  /**
   * 無操作タイマーをリセットし、再度カウントを開始する。
   * zoomイベントハンドラー
   */
  private resetTimer = () => {
    this.reset();
  };

  private stopTimer(): void {
    if (this.sleepTimerID == null) return;
    clearTimeout(this.sleepTimerID);
    this.sleepTimerID = null;
  }

  private sleep = () => {
    if (this.isSleep) return;
    this.dispatchEvent({ type: "sleep" });
    this.isSleep = true;
  };

  private wakeup = () => {
    if (!this.isSleep) return;
    this.dispatchEvent({ type: "wakeup" });
    this.isSleep = false;
  };

  /**
   * マウス監視を開始する
   */
  public start(): void {
    this.stopMouseEventListeners();
    this.startMouseEventListeners();
    this.resetTimer();
  }

  protected startMouseEventListeners(): void {
    const watcher = this.dragWatcher;
    watcher.addEventListener("zoom", this.resetTimer);
    watcher.addEventListener("drag_start", this.pauseTimer);
  }

  private pauseTimer = () => {
    this.stopTimer();
    this.wakeup();

    const watcher = this.dragWatcher;
    watcher.removeEventListener("drag_start", this.pauseTimer);
    watcher.addEventListener("drag_end", this.resumeTimer);
  };

  private resumeTimer = () => {
    this.resetTimer();

    const watcher = this.dragWatcher;
    watcher.addEventListener("drag_start", this.pauseTimer);
    watcher.removeEventListener("drag_end", this.resumeTimer);
  };

  /**
   * マウスの監視を停止する
   */
  public stop(): void {
    this.stopTimer();
    this.wakeup();
    this.stopMouseEventListeners();
  }

  protected stopMouseEventListeners(): void {
    const watcher = this.dragWatcher;
    watcher.removeEventListener("zoom", this.resetTimer);
    watcher.removeEventListener("drag_start", this.pauseTimer);
    watcher.removeEventListener("drag_end", this.resumeTimer);
  }
}
