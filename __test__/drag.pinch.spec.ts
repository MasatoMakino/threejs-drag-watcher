import { RAFTicker } from "@masatomakino/raf-ticker";
import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  clearCanvas,
  dispatchMouseEvent,
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

  test("multi-touch throttling", () => {
    // 2本のポインターを設定
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

    // 1本目のポインターを動かす
    dispatchMouseEvent(canvas, "pointermove", {
      offsetX: 101,
      offsetY: 101,
      pointerId: 1,
    });
    expect(mockPinchCallback).toHaveBeenCalledTimes(1);
    mockPinchCallback.mockClear();

    // スロットリング中の移動
    dispatchMouseEvent(canvas, "pointermove", {
      offsetX: 110,
      offsetY: 110,
      pointerId: 1,
    });
    expectMouseNotCall(mockPinchCallback);

    // スロットリングはポインターごとに行われる
    dispatchMouseEvent(canvas, "pointermove", {
      offsetX: 205,
      offsetY: 205,
      pointerId: 2,
    });
    expect(mockPinchCallback).toHaveBeenCalledTimes(1);
    mockPinchCallback.mockClear();

    // スロットリング解除後の移動
    RAFTicker.emit("tick", {
      timestamp: 0,
      delta: watcher.throttlingTime_ms * 2,
    });
    dispatchMouseEvent(canvas, "pointermove", {
      offsetX: 115,
      offsetY: 115,
      pointerId: 1,
    });
    expect(mockPinchCallback).toHaveBeenCalledTimes(1);
    mockPinchCallback.mockClear();

    dispatchMouseEvent(canvas, "pointermove", {
      offsetX: 210,
      offsetY: 210,
      pointerId: 2,
    });
    expect(mockPinchCallback).toHaveBeenCalledTimes(1);
    mockPinchCallback.mockClear();

    clearCanvas(canvas, watcher, mockDragCallback, mockMoveCallback);
  });

  test("should not emit drag events during pinch operation", () => {
    //1本目のポインターでは、drag_startが発行される
    dispatchMouseEvent(canvas, "pointerdown", {
      offsetX: 100,
      offsetY: 100,
      pointerId: 1,
    });
    expect(mockDragCallback).toHaveBeenCalledTimes(1);
    mockDragCallback.mockClear();

    //2本目のポインターを追加、drag_startは発行されない
    dispatchMouseEvent(canvas, "pointerdown", {
      offsetX: 200,
      offsetY: 200,
      pointerId: 2,
    });
    expectMouseNotCall(mockDragCallback);
    mockDragCallback.mockClear();

    /**
     * 2本のポインターでドラッグを開始した場合、moveは発行されない
     */
    dispatchMouseEvent(canvas, "pointermove", {
      offsetX: 101,
      offsetY: 101,
      pointerId: 1,
    });
    dispatchMouseEvent(canvas, "pointermove", {
      offsetX: 201,
      offsetY: 201,
      pointerId: 2,
    });
    expectMouseNotCall(mockDragCallback);

    //1本目のポインターでは、drag_endが発行されない
    dispatchMouseEvent(canvas, "pointerup", {
      offsetX: 100,
      offsetY: 100,
      pointerId: 1,
    });
    expectMouseNotCall(mockDragCallback);
    dispatchMouseEvent(canvas, "pointerup", {
      offsetX: 201,
      offsetY: 201,
      pointerId: 2,
    });
    expect(mockDragCallback).toHaveBeenCalledTimes(1);
    mockDragCallback.mockClear();

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
