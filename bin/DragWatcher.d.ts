import { EventDispatcher, WebGLRenderer } from "three";
/**
 * 1.ステージ全体がドラッグされている状態を確認する
 * 2.マウスホイールが操作されている状態を確認する
 * この二つを実行するためのクラスです。
 */
export declare class DragWatcher extends EventDispatcher {
    protected positionX: number;
    protected positionY: number;
    protected isDrag: boolean;
    constructor(renderer: WebGLRenderer);
    protected onDocumentMouseDown: (event: MouseEvent) => void;
    protected onDocumentMouseMove: (event: MouseEvent) => void;
    protected onDocumentMouseLeave: (event: MouseEvent) => void;
    protected onDocumentMouseUp: (event: MouseEvent) => void;
    private onMouseWheel;
}
//# sourceMappingURL=DragWatcher.d.ts.map