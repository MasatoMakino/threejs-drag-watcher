import {
  RAFTicker,
  type RAFTickerEventContext,
} from "@masatomakino/raf-ticker";
import EventEmitter from "eventemitter3";
import type { Vector2, Vector4 } from "three";
import type { DragEvent, DragEventMap, PinchEvent } from "./DragEvent.js";

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

  public throttlingTime_ms: number = 16;
  private throttlingDeltas: Map<number, number> = new Map();
  private hasThrottledMap: Map<number, boolean> = new Map();
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
    for (const [pointerId, delta] of this.throttlingDeltas.entries()) {
      const newDelta = delta + e.delta;
      if (newDelta >= this.throttlingTime_ms) {
        this.hasThrottledMap.set(pointerId, false);
        this.throttlingDeltas.set(pointerId, newDelta % this.throttlingTime_ms);
      } else {
        this.throttlingDeltas.set(pointerId, newDelta);
      }
    }
  };

  protected onDocumentMouseDown = (event: PointerEvent) => {
    if (!this.isContain(event)) return;

    this.pointers.set(event.pointerId, event);
    if (this.pointers.size === 1) {
      this.dispatchDragEvent("drag_start", event);
    }
  };

  protected onDocumentMouseMove = (event: PointerEvent) => {
    const hasThrottled = this.hasThrottledMap.get(event.pointerId) ?? false;
    if (hasThrottled) return;

    this.dispatchDragEvent("move", event);

    if (this.pointers.has(event.pointerId)) {
      const prevPointers = new Map(this.pointers);
      this.pointers.set(event.pointerId, event);

      if (this.pointers.size === 2 && prevPointers.size === 2) {
        const evt = this.generatePinchEvent(prevPointers);
        this.emit(evt.type, evt);
      } else if (this.pointers.size === 1) {
        // 2本目のポインターが離れた後はドラッグイベントを発行しない
        if (prevPointers.size === 1) {
          this.dispatchDragEvent(
            "drag",
            event,
            prevPointers.get(event.pointerId) as PointerEvent,
          );
        }
      }
    }

    this.hasThrottledMap.set(event.pointerId, true);
    this.throttlingDeltas.set(event.pointerId, 0);
  };

  private generatePinchEvent(
    prevPointers: Map<number, PointerEvent>,
  ): PinchEvent {
    const currentPointerArray = Array.from(this.pointers.values());
    const prevPointerArray = Array.from(prevPointers.values());

    const currentDistance = DragWatcher.calculateDistance(currentPointerArray);
    const prevDistance = DragWatcher.calculateDistance(prevPointerArray);

    const delta = currentDistance - prevDistance;

    return { type: "pinch", delta: delta, pointers: currentPointerArray };
  }

  private static calculateDistance(pointers: PointerEvent[]): number {
    return Math.sqrt(
      (pointers[0].offsetX - pointers[1].offsetX) ** 2 +
        (pointers[0].offsetY - pointers[1].offsetY) ** 2,
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
      return { x: e.offsetX, y: e.offsetY };
    } else {
      const rect = DragWatcher.convertToRect(this.viewport, this.canvasRect);
      const scale = this.canvas.clientWidth / this.canvasRect.width;
      const offsetX = e.offsetX / scale;
      const offsetY = e.offsetY / scale;
      return { x: offsetX - rect.x1, y: offsetY - rect.y1 };
    }
  }

  private onDocumentMouseLeave = (event: PointerEvent) => {
    this.onDocumentMouseUp(event);
  };

  private onDocumentMouseUp = (event: PointerEvent) => {
    if (this.pointers.has(event.pointerId)) {
      if (this.pointers.size === 1) {
        this.dispatchDragEvent("drag_end", event);
      }
    }
    this.pointers.delete(event.pointerId);
  };

  private onMouseWheel = (e: WheelEvent) => {
    const evt: DragEvent = { type: "zoom" };

    if (e.detail != null) {
      evt.deltaScroll = e.detail < 0 ? 1 : -1;
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
