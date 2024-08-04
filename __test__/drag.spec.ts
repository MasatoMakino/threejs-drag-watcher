import { RAFTicker } from "@masatomakino/raf-ticker";
import {
  clearCanvas,
  dispatchMouseEvent,
  expectMouse,
  expectMouseNotCall,
  generateWatcher,
} from "./WatcherGenerator.js";
import { describe, test, vi, beforeEach } from "vitest";

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

  test("drag : mouse down", () => {
    dispatchMouseEvent(canvas, "pointerdown", {
      offsetX: 100,
      offsetY: 100,
    });
    expectMouse(mockDragCallback, "drag_start", {
      positionX: 100,
      positionY: 100,
    });

    dispatchMouseEvent(canvas, "pointerdown", {
      offsetX: 100,
      offsetY: 100,
    });
    expectMouseNotCall(mockDragCallback);

    clearCanvas(canvas, watcher, mockDragCallback, mockMoveCallback);
  });

  test("drag : hasThrottled", () => {
    dispatchMouseEvent(canvas, "pointerdown", {
      offsetX: 100,
      offsetY: 100,
    });
    mockDragCallback.mockClear();

    dispatchMouseEvent(canvas, "pointermove", {
      offsetX: 105,
      offsetY: 105,
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

    //連続呼び出しをしてもスロットリングされる
    dispatchMouseEvent(canvas, "pointermove", {
      offsetX: 110,
      offsetY: 110,
    });
    expectMouseNotCall(mockMoveCallback);
    expectMouseNotCall(mockDragCallback);

    //連続呼び出しをしてもスロットリングされる
    RAFTicker.emit("tick", {
      timestamp: 0,
      delta: watcher.throttlingTime_ms / 2,
    });
    dispatchMouseEvent(canvas, "pointermove", {
      offsetX: 115,
      offsetY: 115,
    });
    expectMouseNotCall(mockMoveCallback);
    expectMouseNotCall(mockDragCallback);

    //時間経過後にスロットリングは解除される。
    RAFTicker.emit("tick", {
      timestamp: 0,
      delta: watcher.throttlingTime_ms * 3,
    });
    dispatchMouseEvent(canvas, "pointermove", {
      offsetX: 120,
      offsetY: 120,
    });
    expectMouse(mockMoveCallback, "move", {
      positionX: 120,
      positionY: 120,
    });
    //delta値はスロットリング前の最後のものが利用される
    expectMouse(mockDragCallback, "drag", {
      positionX: 120,
      positionY: 120,
      deltaX: 15,
      deltaY: 15,
    });

    clearCanvas(canvas, watcher, mockDragCallback, mockMoveCallback);
  });

  test("drag : not down", () => {
    /**
     * マウスダウン前にmoveをすると、moveは発行されるがdragは発行されない
     */
    dispatchMouseEvent(canvas, "pointermove", {
      offsetX: 105,
      offsetY: 105,
    });
    expectMouse(mockMoveCallback, "move", {
      positionX: 105,
      positionY: 105,
    });
    expectMouseNotCall(mockDragCallback);

    clearCanvas(canvas, watcher, mockDragCallback, mockMoveCallback);
  });
});
