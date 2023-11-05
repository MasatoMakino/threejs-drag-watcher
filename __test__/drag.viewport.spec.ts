import { describe, test, vi } from "vitest";
import {
  clearCanvas,
  dispatchMouseEvent,
  expectMouse,
  expectMouseNotCall,
  generateWatcher,
} from "./WatcherGenerator";
import { Vector4 } from "three";

const { canvas, watcher } = generateWatcher({
  viewport: new Vector4(0, 0, 400, 400),
});
const mockDragCallback = vi.fn((e) => {
  e;
});
const mockMoveCallback = vi.fn((e) => {
  e;
});
describe("drag.viewport", () => {
  watcher.on("drag_start", mockDragCallback);
  watcher.on("move", mockMoveCallback);
  watcher.on("drag", mockDragCallback);
  watcher.on("drag_end", mockDragCallback);

  test("drag : mouse down", () => {
    //viewportはcanvasの右下を原点とするため、0,0は操作の範囲外
    dispatchMouseEvent(canvas, "mousedown", {
      offsetX: 0,
      offsetY: 0,
    });
    expectMouseNotCall(mockDragCallback);

    //viewportの左上は、1080(canvasのheight) - 400(viewportのheight) で 680になる。
    dispatchMouseEvent(canvas, "mousedown", {
      offsetX: 150,
      offsetY: 1080 - 400 + 150,
    });
    expectMouse(mockDragCallback, "drag_start", {
      positionX: 150,
      positionY: 150,
    });

    //スロットリングが有効なため、同じ点を連続してマウスダウンしてもイベントは発生しない。
    dispatchMouseEvent(canvas, "mousedown", {
      offsetX: 150,
      offsetY: 1080 - 400 + 150,
    });
    expectMouseNotCall(mockDragCallback);

    clearCanvas(canvas, watcher, mockDragCallback, mockMoveCallback);
  });
});
