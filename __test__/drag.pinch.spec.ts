import { RAFTicker } from "@masatomakino/raf-ticker";
import {
  clearCanvas,
  dispatchMouseEvent,
  expectMouseNotCall,
  generateWatcher,
} from "./WatcherGenerator.js";
import { describe, test, vi, beforeEach, expect } from "vitest";

const { canvas, watcher } = generateWatcher();
const mockDragCallback = vi.fn((e) => {
  e;
});
const mockMoveCallback = vi.fn((e) => {
  e;
});
const mockPinchCallback = vi.fn((e) => {
  e;
});
describe("threejs-drag-watcher.dragWatcher.pinch", () => {
  watcher.on("drag_start", mockDragCallback);
  watcher.on("move", mockMoveCallback);
  watcher.on("drag", mockDragCallback);
  watcher.on("drag_end", mockDragCallback);
  watcher.on("pinch", mockPinchCallback);

  beforeEach(() => {
    mockPinchCallback.mockClear();
    RAFTicker.stop();
    RAFTicker.emit("tick", {
      timestamp: 0,
      delta: watcher.throttlingTime_ms * 2,
    });
    //@ts-ignore
    watcher.throttlingDelta = 0;
  });

  test("pinch", () => {
    dispatchMouseEvent(canvas, "pointerdown", {
      offsetX: 100,
      offsetY: 100,
      pointerId: 1,
    });
    dispatchMouseEvent(canvas, "pointerdown", {
      offsetX: 200,
      offsetY: 200,
      pointerId: 2,
    });
    expectMouseNotCall(mockPinchCallback);

    dispatchMouseEvent(canvas, "pointermove", {
      offsetX: 101,
      offsetY: 101,
      pointerId: 1,
    });
    const delta = mockPinchCallback.mock.calls[0][0].delta;
    expect(delta).toBeCloseTo(-Math.SQRT2);
    mockPinchCallback.mockClear();

    dispatchMouseEvent(canvas, "pointerup", {
      offsetX: 200,
      offsetY: 200,
      pointerId: 2,
    });
    expectMouseNotCall(mockPinchCallback);

    dispatchMouseEvent(canvas, "pointermove", {
      offsetX: 102,
      offsetY: 102,
      pointerId: 1,
    });
    expectMouseNotCall(mockPinchCallback);

    clearCanvas(canvas, watcher, mockDragCallback, mockMoveCallback);
  });

  test("pinch : not down", () => {
    /**
     * ポインターダウン前にmoveをしても、pinchは発行されない
     */
    dispatchMouseEvent(canvas, "pointermove", {
      offsetX: 105,
      offsetY: 105,
      pointerId: 1,
    });
    dispatchMouseEvent(canvas, "pointermove", {
      offsetX: 110,
      offsetY: 110,
      pointerId: 2,
    });
    expectMouseNotCall(mockPinchCallback);

    clearCanvas(canvas, watcher, mockDragCallback, mockMoveCallback);
  });
});
