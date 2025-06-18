import EventEmitter from "eventemitter3";
import type { DragWatcher, SleepEventMap } from "./index.js";

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
   * @deprecated This method will be removed in v0.13.0. Please use restart() instead.
   */
  public reset(): void {
    this.restart();
  }

  /**
   * 無操作タイマーをリセットし、再度カウントを開始する。
   */
  public restart = (): void => {
    this.stopTimer();
    this.wakeup();
    this.sleepTimerID = window.setTimeout(this.sleep, this.timeOut_ms);
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
    this.restart();
  }

  protected startMouseEventListeners(): void {
    const watcher = this.dragWatcher;
    watcher.on("zoom", this.restart);
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
    this.restart();

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
    watcher.off("zoom", this.restart);
    watcher.off("drag_start", this.pauseTimer);
    watcher.off("drag_end", this.resumeTimer);
  }
}
