import { RAFTicker } from "@masatomakino/raf-ticker";
import { beforeEach, describe, test, vi } from "vitest";
import {
  clearCanvas,
  dispatchMouseEvent,
  expectMouse,
  expectMouseNotCall,
  generateWatcher,
} from "./WatcherGenerator.js";

const { canvas, watcher } = generateWatcher();
const mockDragCallback = vi.fn((e) => {
  e;
});
const mockMoveCallback = vi.fn((e) => {
  e;
});
describe("threejs-drag-watcher", () => {
  watcher.on("drag_start", mockDragCallback);
  watcher.on("move", mockMoveCallback);
  watcher.on("drag", mockDragCallback);
  watcher.on("drag_end", mockDragCallback);

  beforeEach(() => {
    RAFTicker.stop();
    RAFTicker.emit("tick", {
      timestamp: 0,
      delta: watcher.throttlingTime_ms * 2,
    });
    //@ts-ignore
    watcher.throttlingDelta = 0;
  });

  test("pointerdown emits drag_start, also again for the same pointerId", () => {
    dispatchMouseEvent(canvas, "pointerdown", {
      offsetX: 100,
      offsetY: 100,
      pointerId: 1,
    });
    expectMouse(mockDragCallback, "drag_start", {
      positionX: 100,
      positionY: 100,
      pointerId: 1,
    });

    dispatchMouseEvent(canvas, "pointerdown", {
      offsetX: 100,
      offsetY: 100,
      pointerId: 1,
    });
    expectMouse(mockDragCallback, "drag_start", {
      positionX: 100,
      positionY: 100,
      pointerId: 1,
    });

    clearCanvas(canvas, watcher, mockDragCallback, mockMoveCallback);
  });

  test("pointermove within throttlingTime_ms is dropped, and the next drag delta covers the dropped moves", () => {
    dispatchMouseEvent(canvas, "pointerdown", {
      offsetX: 100,
      offsetY: 100,
      pointerId: 1,
    });
    mockDragCallback.mockClear();

    dispatchMouseEvent(canvas, "pointermove", {
      offsetX: 105,
      offsetY: 105,
      pointerId: 1,
    });
    expectMouse(mockMoveCallback, "move", {
      positionX: 105,
      positionY: 105,
    });
    expectMouse(mockDragCallback, "drag", {
      positionX: 105,
      positionY: 105,
      deltaX: 5,
      deltaY: 5,
    });
    dispatchMouseEvent(canvas, "pointermove", {
      offsetX: 110,
      offsetY: 110,
      pointerId: 1,
    });
    expectMouseNotCall(mockMoveCallback);
    expectMouseNotCall(mockDragCallback);
    RAFTicker.emit("tick", {
      timestamp: 0,
      delta: watcher.throttlingTime_ms / 2,
    });
    dispatchMouseEvent(canvas, "pointermove", {
      offsetX: 115,
      offsetY: 115,
      pointerId: 1,
    });
    expectMouseNotCall(mockMoveCallback);
    expectMouseNotCall(mockDragCallback);
    RAFTicker.emit("tick", {
      timestamp: 0,
      delta: watcher.throttlingTime_ms * 3,
    });
    dispatchMouseEvent(canvas, "pointermove", {
      offsetX: 120,
      offsetY: 120,
      pointerId: 1,
    });
    expectMouse(mockMoveCallback, "move", {
      positionX: 120,
      positionY: 120,
    });
    expectMouse(mockDragCallback, "drag", {
      positionX: 120,
      positionY: 120,
      deltaX: 15,
      deltaY: 15,
    });

    clearCanvas(canvas, watcher, mockDragCallback, mockMoveCallback);
  });

  test("pointermove without pointerdown emits move but not drag", () => {
    dispatchMouseEvent(canvas, "pointermove", {
      offsetX: 105,
      offsetY: 105,
      pointerId: 1,
    });
    expectMouse(mockMoveCallback, "move", {
      positionX: 105,
      positionY: 105,
    });
    expectMouseNotCall(mockDragCallback);

    clearCanvas(canvas, watcher, mockDragCallback, mockMoveCallback);
  });
});
