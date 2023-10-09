import { DragWatcher, SleepEventMap } from "./index.js";
import EventEmitter from "eventemitter3";

export class SleepWatcher extends EventEmitter<SleepEventMap> {
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
    this.sleepTimerID = undefined;
  }

  private sleep = () => {
    if (this.isSleep) return;
    this.emit("sleep", { type: "sleep" });
    this.isSleep = true;
  };

  private wakeup = () => {
    if (!this.isSleep) return;
    this.emit("wakeup", { type: "wakeup" });
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
    watcher.on("zoom", this.resetTimer);
    watcher.on("drag_start", this.pauseTimer);
  }

  private pauseTimer = () => {
    this.stopTimer();
    this.wakeup();

    const watcher = this.dragWatcher;
    watcher.off("drag_start", this.pauseTimer);
    watcher.on("drag_end", this.resumeTimer);
  };

  private resumeTimer = () => {
    this.resetTimer();

    const watcher = this.dragWatcher;
    watcher.on("drag_start", this.pauseTimer);
    watcher.off("drag_end", this.resumeTimer);
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
    watcher.off("zoom", this.resetTimer);
    watcher.off("drag_start", this.pauseTimer);
    watcher.off("drag_end", this.resumeTimer);
  }
}
