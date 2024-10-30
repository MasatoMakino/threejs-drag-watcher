import { RAFTicker, RAFTickerEventContext } from "@masatomakino/raf-ticker";
import { Vector2, Vector4 } from "three";
import { DragEvent, PinchEvent, DragEventMap } from "./DragEvent.js";
import EventEmitter from "eventemitter3";

/**
 * DragWatcherの初期化オプション
 */
export interface DragWatcherInitOption {
  /**
   * ドラッグイベントの間引き間隔を設定します。単位はミリ秒です。
   */
  throttlingTime_ms?: number;
  /**
   * Viewportの設定を行います。
   * areaとcanvasRectはセットで設定する必要があります。
   */
  viewport?: {
    /*
     * Viewportの範囲を示す矩形です。
     */
    area: Vector4;
    /**
     * Viewportが描画されるキャンバスの範囲を示す矩形です。
     */
    canvasRect: Vector2;
  };
}
/**
 * 1.カンバス全体がドラッグされている状態を確認する
 * 2.マウスホイールが操作されている状態を確認する
 * この二つを実行するためのクラスです。
 */
export class DragWatcher extends EventEmitter<DragEventMap> {
  private pointers: Map<number, PointerEvent> = new Map();
  private canvas: HTMLCanvasElement;

  private hasThrottled: boolean = false;
  public throttlingTime_ms: number = 16;
  private throttlingDelta: number = 0;
  /**
   * Sets the viewport to render from (x, y) to (x + width, y + height).
   * (x, y) is the lower-left corner of the region.
   * @see https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setViewport
   * @private
   */
  private viewport?: Vector4;
  private canvasRect?: Vector2;

  constructor(canvas: HTMLCanvasElement, option?: DragWatcherInitOption) {
    super();

    if (option?.throttlingTime_ms != null) {
      this.throttlingTime_ms = option.throttlingTime_ms;
    }
    if (option?.viewport != null) {
      this.viewport ??= option.viewport.area;
      this.canvasRect ??= option.viewport.canvasRect;
    }

    this.canvas = canvas;
    this.canvas.addEventListener(
      "pointermove",
      this.onDocumentMouseMove,
      false,
    );
    this.canvas.addEventListener(
      "pointerdown",
      this.onDocumentMouseDown,
      false,
    );
    this.canvas.addEventListener("pointerup", this.onDocumentMouseUp, false);
    this.canvas.addEventListener(
      "pointerleave",
      this.onDocumentMouseLeave,
      false,
    );
    this.canvas.addEventListener("wheel", this.onMouseWheel, false);

    RAFTicker.on("tick", this.onTick);
  }

  protected onTick = (e: RAFTickerEventContext) => {
    this.throttlingDelta += e.delta;
    if (this.throttlingDelta < this.throttlingTime_ms) return;
    this.hasThrottled = false;
    this.throttlingDelta %= this.throttlingTime_ms;
  };

  protected onDocumentMouseDown = (event: PointerEvent) => {
    if (!this.isContain(event)) return;

    this.pointers.set(event.pointerId, event);
    this.dispatchDragEvent("drag_start", event);
  };

  protected onDocumentMouseMove = (event: PointerEvent) => {
    if (this.hasThrottled) return;
    this.hasThrottled = true;

    this.dispatchDragEvent("move", event);

    //ダブルタッチの場合、ズーム処理を行う
    if (this.pointers.size === 2 && this.pointers.has(event.pointerId)) {
      const evt = DragWatcher.generatePinchEvent(this.pointers, event);
      this.emit(evt.type, evt);
    }

    //シングルタッチかつ、ドラッグ中のポインタのみ処理を行う
    if (this.pointers.size === 1 && this.pointers.has(event.pointerId)) {
      this.dispatchDragEvent(
        "drag",
        event,
        this.pointers.get(event.pointerId) as PointerEvent,
      );
    }

    // ポインターの位置を更新
    if (this.pointers.has(event.pointerId)) {
      this.pointers.set(event.pointerId, event);
    }
  };

  private static generatePinchEvent(
    pointers: Map<number, PointerEvent>,
    nextPointer: PointerEvent,
  ): PinchEvent {
    const pointerArray = Array.from(pointers.values());
    const distance = DragWatcher.calculateDistance(pointerArray);

    const nextPointerMap = new Map(pointers);
    nextPointerMap.set(nextPointer.pointerId, nextPointer);
    const nextPointerArray = Array.from(nextPointerMap.values());
    const nextDistance = DragWatcher.calculateDistance(nextPointerArray);

    return {
      type: "pinch",
      delta: nextDistance - distance,
      pointers: nextPointerArray,
    };
  }
  private static calculateDistance(pointers: PointerEvent[]): number {
    return Math.sqrt(
      Math.pow(pointers[0].offsetX - pointers[1].offsetX, 2) +
        Math.pow(pointers[0].offsetY - pointers[1].offsetY, 2),
    );
  }

  private dispatchDragEvent(
    type: keyof DragEventMap,
    event: PointerEvent,
    prevEvent?: PointerEvent,
  ): void {
    const evt: DragEvent = { type };

    const { x, y } = this.convertToLocalMousePoint(event);
    evt.positionX = x;
    evt.positionY = y;
    evt.pointerId = event.pointerId;

    if (type === "drag" && prevEvent) {
      evt.deltaX = event.offsetX - prevEvent.offsetX;
      evt.deltaY = event.offsetY - prevEvent.offsetY;
    }
    this.emit(type, evt);
  }

  private convertToLocalMousePoint(e: PointerEvent): { x: number; y: number } {
    if (!this.viewport || !this.canvasRect) {
      return {
        x: e.offsetX,
        y: e.offsetY,
      };
    } else {
      const rect = DragWatcher.convertToRect(this.viewport, this.canvasRect);
      const scale = this.canvas.clientWidth / this.canvasRect.width;
      const offsetX = e.offsetX / scale;
      const offsetY = e.offsetY / scale;
      return {
        x: offsetX - rect.x1,
        y: offsetY - rect.y1,
      };
    }
  }

  private onDocumentMouseLeave = (event: PointerEvent) => {
    this.onDocumentMouseUp(event);
  };

  private onDocumentMouseUp = (event: PointerEvent) => {
    if (this.pointers.has(event.pointerId)) {
      this.dispatchDragEvent("drag_end", event);
    }
    this.pointers.delete(event.pointerId);
  };

  private onMouseWheel = (e: any) => {
    const evt: DragEvent = { type: "zoom" };

    if (e.detail != null) {
      evt.deltaScroll = e.detail < 0 ? 1 : -1;
    }
    if (e.wheelDelta != null) {
      evt.deltaScroll = e.wheelDelta > 0 ? 1 : -1;
    }
    if (e.deltaY != null) {
      evt.deltaScroll = e.deltaY > 0 ? 1 : -1;
    }

    this.emit(evt.type, evt);
  };

  /**
   * マウスポインタがviewport内に収まっているか否か
   * @param event
   * @private
   */
  private isContain(event: PointerEvent): boolean {
    if (!this.viewport || !this.canvasRect) return true;

    const rect = DragWatcher.convertToRect(this.viewport, this.canvasRect);
    const scale = this.canvas.clientWidth / this.canvasRect.width;
    const offsetX = event.offsetX / scale;
    const offsetY = event.offsetY / scale;
    return (
      offsetX >= rect.x1 &&
      offsetX <= rect.x2 &&
      offsetY >= rect.y1 &&
      offsetY <= rect.y2
    );
  }

  /**
   * 座標値をviewportの座標値に変換する
   *
   * @param canvas
   * @param viewport
   * @returns
   */
  private static convertToRect(
    viewport: Vector4,
    canvasRect: Vector2,
  ): { x1: number; x2: number; y1: number; y2: number } {
    return {
      x1: viewport.x,
      x2: viewport.x + viewport.width,
      y1: canvasRect.height - (viewport.y + viewport.height),
      y2: canvasRect.height - viewport.y,
    };
  }

  /**
   * ポインターの情報をリセットする。
   * 主に単体テストで使用する。
   */
  public reset(): void {
    this.pointers.clear();
  }

  public dispose(): void {
    this.canvas.removeEventListener(
      "pointermove",
      this.onDocumentMouseMove,
      false,
    );
    this.canvas.removeEventListener(
      "pointerdown",
      this.onDocumentMouseDown,
      false,
    );
    this.canvas.removeEventListener("pointerup", this.onDocumentMouseUp, false);
    this.canvas.removeEventListener(
      "pointerleave",
      this.onDocumentMouseLeave,
      false,
    );
    RAFTicker.off("tick", this.onTick);
  }
}
