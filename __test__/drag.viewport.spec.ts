import { Vector2, Vector4 } from "three";
import { describe, test, vi } from "vitest";
import {
  clearCanvas,
  dispatchMouseEvent,
  expectMouse,
  expectMouseNotCall,
  generateWatcher,
} from "./WatcherGenerator";

const { canvas, watcher } = generateWatcher({
  viewport: {
    area: new Vector4(0, 0, 400, 400),
    canvasRect: new Vector2(1920, 1080),
  },
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
    dispatchMouseEvent(canvas, "pointerdown", {
      offsetX: 0,
      offsetY: 0,
      pointerId: 1,
    });
    expectMouseNotCall(mockDragCallback);

    //viewportの左上は、1080(canvasのheight) - 400(viewportのheight) で 680になる。
    dispatchMouseEvent(canvas, "pointerdown", {
      offsetX: 150,
      offsetY: 1080 - 400 + 150,
      pointerId: 1,
    });
    expectMouse(mockDragCallback, "drag_start", {
      positionX: 150,
      positionY: 150,
      pointerId: 1,
    });

    dispatchMouseEvent(canvas, "pointerdown", {
      offsetX: 150,
      offsetY: 1080 - 400 + 150,
      pointerId: 1,
    });
    expectMouse(mockDragCallback, "drag_start", {
      positionX: 150,
      positionY: 150,
      pointerId: 1,
    });

    clearCanvas(canvas, watcher, mockDragCallback, mockMoveCallback);
  });
});
