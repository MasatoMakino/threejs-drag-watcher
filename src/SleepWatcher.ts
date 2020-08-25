import { EventDispatcher } from "three";
import { DragEventType } from "./DragEvent";
import { DragWatcher } from "./DragWatcher";
import { SleepEvent, SleepEventType } from "./SleepEvent";

export class SleepWatcher extends EventDispatcher {
  private dragWatcher: DragWatcher;
  private sleepTimerID;
  private timeOut_ms: number = 10 * 1000; //ミリsec
  private isSleep = false;

  constructor(dragWatcher: DragWatcher, option?: { timeOut_ms?: number }) {
    super();
    if (!option) option = {};
    if (option.timeOut_ms != null) this.timeOut_ms = option.timeOut_ms;

    this.dragWatcher = dragWatcher;
  }

  /**
   * 無操作タイマーをリセットし、再度カウントを開始する。
   * @param e
   */
  private resetTimer = (e: any = null) => {
    this.stopTimer();
    this.wakeup();

    this.sleepTimerID = setTimeout(this.sleep, this.timeOut_ms);
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

  /**
   * マウスの監視を停止する
   */
  public stop(): void {
    this.stopTimer();
    this.wakeup();
    this.stopMouseEventListeners();
  }

  protected stopMouseEventListeners(): void {
    this.switchMouseEventListeners(false);
  }

  protected startMouseEventListeners(): void {
    this.switchMouseEventListeners(true);
  }

  protected switchMouseEventListeners(isAddListener: boolean): void {
    const watcher = this.dragWatcher;
    [
      DragEventType.DRAG,
      DragEventType.DRAG_START,
      DragEventType.DRAG_END,
      DragEventType.ZOOM,
    ].forEach((type) => {
      if (isAddListener) {
        watcher.addEventListener(type, this.resetTimer);
      } else {
        watcher.removeEventListener(type, this.resetTimer);
      }
    });
  }
}
