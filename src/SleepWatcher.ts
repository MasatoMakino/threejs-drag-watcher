import { EventDispatcher } from "three";
import { DragEventType, DragWatcher, SleepEvent, SleepEventType } from "./";

export class SleepWatcher extends EventDispatcher<SleepEvent> {
  private sleepTimerID;
  private timeOut_ms: number = 10 * 1000; //ミリsec
  private isSleep = false;

  constructor(
    private dragWatcher: DragWatcher,
    option?: { timeOut_ms?: number }
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

    this.sleepTimerID = setTimeout(this.sleep, this.timeOut_ms);
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
    this.dispatchEvent(new SleepEvent(SleepEventType.SLEEP));
    this.isSleep = true;
  };

  private wakeup = () => {
    if (!this.isSleep) return;
    this.dispatchEvent(new SleepEvent(SleepEventType.WAKEUP));
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
    watcher.addEventListener(DragEventType.ZOOM, this.resetTimer);
    watcher.addEventListener(DragEventType.DRAG_START, this.pauseTimer);
  }

  private pauseTimer = () => {
    this.stopTimer();
    this.wakeup();

    const watcher = this.dragWatcher;
    watcher.removeEventListener(DragEventType.DRAG_START, this.pauseTimer);
    watcher.addEventListener(DragEventType.DRAG_END, this.resumeTimer);
  };

  private resumeTimer = () => {
    this.resetTimer();

    const watcher = this.dragWatcher;
    watcher.addEventListener(DragEventType.DRAG_START, this.pauseTimer);
    watcher.removeEventListener(DragEventType.DRAG_END, this.resumeTimer);
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
    watcher.removeEventListener(DragEventType.ZOOM, this.resetTimer);
    watcher.removeEventListener(DragEventType.DRAG_START, this.pauseTimer);
    watcher.removeEventListener(DragEventType.DRAG_END, this.resumeTimer);
  }
}
