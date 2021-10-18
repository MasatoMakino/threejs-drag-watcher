import { RAFTickerEvent } from "raf-ticker";
import { EventDispatcher, Vector4 } from "three";
import { DragEvent } from "./DragEvent";
/**
 * 1.カンバス全体がドラッグされている状態を確認する
 * 2.マウスホイールが操作されている状態を確認する
 * この二つを実行するためのクラスです。
 */
export declare class DragWatcher extends EventDispatcher<DragEvent> {
    private positionX;
    private positionY;
    private isDrag;
    private canvas;
    private hasThrottled;
    throttlingTime_ms: number;
    private throttlingDelta;
    private viewport?;
    constructor(canvas: HTMLCanvasElement, option?: {
        throttlingTime_ms?: number;
        viewport?: Vector4;
    });
    protected onTick: (e: RAFTickerEvent) => void;
    protected onDocumentMouseDown: (event: MouseEvent) => void;
    protected onDocumentMouseMove: (event: MouseEvent) => void;
    private updatePosition;
    private dispatchDragEvent;
    private convertToLocalMousePoint;
    private onDocumentMouseLeave;
    private onDocumentMouseUp;
    private onMouseWheel;
    /**
     * マウスポインタがviewport内に収まっているか否か
     * @param event
     * @private
     */
    private isContain;
    private static convertToRect;
    dispose(): void;
}
//# sourceMappingURL=DragWatcher.d.ts.map