import { RAFTicker, RAFTickerEvent, RAFTickerEventType } from "raf-ticker";
import { EventDispatcher, Vector2, Vector4, WebGLRenderer } from "three";
import { DragEvent, DragEventType } from "./DragEvent";

/**
 * 1.カンバス全体がドラッグされている状態を確認する
 * 2.マウスホイールが操作されている状態を確認する
 * この二つを実行するためのクラスです。
 */

export class DragWatcher extends EventDispatcher {
  protected positionX!: number;
  protected positionY!: number;
  protected isDrag: boolean = false;
  protected renderer: WebGLRenderer;

  protected hasThrottled: boolean = false;
  public throttlingTime_ms: number = 16;
  protected throttlingDelta: number = 0;
  protected viewport?: Vector4;

  constructor(
    renderer: WebGLRenderer,
    option?: { throttlingTime_ms?: number; viewport?: Vector4 }
  ) {
    super();

    this.throttlingTime_ms ??= option?.throttlingTime_ms;
    this.viewport ??= option?.viewport;

    this.renderer = renderer;
    this.renderer.domElement.addEventListener(
      "mousemove",
      this.onDocumentMouseMove,
      false
    );
    this.renderer.domElement.addEventListener(
      "mousedown",
      this.onDocumentMouseDown,
      false
    );
    this.renderer.domElement.addEventListener(
      "mouseup",
      this.onDocumentMouseUp,
      false
    );
    this.renderer.domElement.addEventListener(
      "mouseleave",
      this.onDocumentMouseLeave,
      false
    );
    this.renderer.domElement.addEventListener(
      "wheel",
      this.onMouseWheel,
      false
    );

    RAFTicker.on(RAFTickerEventType.tick, this.onTick);
  }

  protected onTick = (e: RAFTickerEvent) => {
    this.throttlingDelta += e.delta;
    if (this.throttlingDelta < this.throttlingTime_ms) return;
    this.hasThrottled = false;
    this.throttlingDelta %= this.throttlingTime_ms;
  };

  protected onDocumentMouseDown = (event: MouseEvent) => {
    if (this.isDrag) return;

    if (!this.isContain(event)) return;

    this.isDrag = true;
    this.updatePosition(event);

    this.dispatchDragEvent(DragEventType.DRAG_START, event);
  };

  protected onDocumentMouseMove = (event: MouseEvent) => {
    if (this.hasThrottled) return;
    this.hasThrottled = true;

    this.dispatchDragEvent(DragEventType.MOVE, event);

    if (!this.isDrag) return;
    this.dispatchDragEvent(DragEventType.DRAG, event);
    this.updatePosition(event);
  };

  private updatePosition(event: MouseEvent): void {
    this.positionX = event.offsetX;
    this.positionY = event.offsetY;
  }

  private dispatchDragEvent(type: DragEventType, event: MouseEvent): void {
    const evt: DragEvent = new DragEvent(type);

    const { x, y } = this.convertToLocalMousePoint(event);
    evt.positionX = x;
    evt.positionY = y;

    if (type === DragEventType.DRAG) {
      evt.deltaX = event.offsetX - this.positionX;
      evt.deltaY = event.offsetY - this.positionY;
    }
    this.dispatchEvent(evt);
  }
  private convertToLocalMousePoint(e: MouseEvent): { x: number; y: number } {
    if (!this.viewport) {
      return {
        x: e.offsetX,
        y: e.offsetY,
      };
    } else {
      const rect = DragWatcher.convertToRect(this.renderer, this.viewport);
      return {
        x: e.offsetX - rect.x1,
        y: e.offsetY - rect.y1,
      };
    }
  }

  protected onDocumentMouseLeave = (event: MouseEvent) => {
    this.onDocumentMouseUp(event);
  };

  protected onDocumentMouseUp = (event: MouseEvent) => {
    if (!this.isDrag) return;

    this.isDrag = false;

    this.dispatchDragEvent(DragEventType.DRAG_END, event);
  };

  private onMouseWheel = (e: any) => {
    const evt: DragEvent = new DragEvent(DragEventType.ZOOM);

    if (e.detail != null) {
      evt.deltaScroll = e.detail < 0 ? 1 : -1;
    }
    if (e.wheelDelta != null) {
      evt.deltaScroll = e.wheelDelta > 0 ? 1 : -1;
    }
    if (e.deltaY != null) {
      evt.deltaScroll = e.deltaY > 0 ? 1 : -1;
    }

    this.dispatchEvent(evt);
  };

  /**
   * マウスポインタがviewport内に収まっているか否か
   * @param event
   * @private
   */
  private isContain(event: MouseEvent): boolean {
    if (!this.viewport) return true;

    const rect = DragWatcher.convertToRect(this.renderer, this.viewport);

    return (
      event.offsetX >= rect.x1 &&
      event.offsetX <= rect.x2 &&
      event.offsetY >= rect.y1 &&
      event.offsetY <= rect.y2
    );
  }

  private static convertToRect(
    renderer: WebGLRenderer,
    viewport: Vector4
  ): { x1: number; x2: number; y1: number; y2: number } {
    const size = renderer.getSize(new Vector2());
    return {
      x1: viewport.x,
      x2: viewport.x + viewport.width,
      y1: size.height - (viewport.y + viewport.height),
      y2: size.height - viewport.y,
    };
  }

  public dispose(): void {
    this.renderer.domElement.removeEventListener(
      "mousemove",
      this.onDocumentMouseMove,
      false
    );
    this.renderer.domElement.removeEventListener(
      "mousedown",
      this.onDocumentMouseDown,
      false
    );
    this.renderer.domElement.removeEventListener(
      "mouseup",
      this.onDocumentMouseUp,
      false
    );
    this.renderer.domElement.removeEventListener(
      "mouseleave",
      this.onDocumentMouseLeave,
      false
    );
    RAFTicker.off(RAFTickerEventType.tick, this.onTick);
  }
}
