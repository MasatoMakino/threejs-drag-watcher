import { RAFTickerEvent } from "raf-ticker";
import { EventDispatcher, Vector4 } from "three";
/**
 * 1.カンバス全体がドラッグされている状態を確認する
 * 2.マウスホイールが操作されている状態を確認する
 * この二つを実行するためのクラスです。
 */
export declare class DragWatcher extends EventDispatcher {
    protected positionX: number;
    protected positionY: number;
    protected isDrag: boolean;
    protected canvas: HTMLCanvasElement;
    protected hasThrottled: boolean;
    throttlingTime_ms: number;
    protected throttlingDelta: number;
    protected viewport?: Vector4;
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
    protected onDocumentMouseLeave: (event: MouseEvent) => void;
    protected onDocumentMouseUp: (event: MouseEvent) => void;
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