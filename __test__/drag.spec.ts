import { FakeMouseEventInit, getMouseEvent } from "fake-mouse-event";
import { RAFTicker, RAFTickerEventType } from "raf-ticker";
import { DragEventType } from "../src";
import { generateWatcher } from "./WatcherGenerator";
import Mock = jest.Mock;

const { canvas, watcher } = generateWatcher();
const mockCallback = jest.fn((e) => {
  e;
});
const mockMoveCallback = jest.fn((e) => {
  e;
});

describe("threejs-drag-watcher", () => {
  watcher.addEventListener(DragEventType.DRAG_START, mockCallback);
  watcher.addEventListener(DragEventType.MOVE, mockMoveCallback);
  watcher.addEventListener(DragEventType.DRAG, mockCallback);
  watcher.addEventListener(DragEventType.DRAG_END, mockCallback);

  test("drag : mouse down", () => {
    dispatchMouseEvent("mousedown", {
      offsetX: 100,
      offsetY: 100,
    });
    expectMouse(mockCallback, DragEventType.DRAG_START, {
      positionX: 100,
      positionY: 100,
    });

    dispatchMouseEvent("mousedown", {
      offsetX: 100,
      offsetY: 100,
    });
    expectMouseNotCall(mockCallback);

    clearCanvas();
  });

  test("drag : hasThrottled", () => {
    dispatchMouseEvent("mousedown", {
      offsetX: 100,
      offsetY: 100,
    });
    mockCallback.mockClear();

    dispatchMouseEvent("mousemove", {
      offsetX: 105,
      offsetY: 105,
    });
    expectMouse(mockMoveCallback, DragEventType.MOVE, {
      positionX: 105,
      positionY: 105,
    });
    expectMouse(mockCallback, DragEventType.DRAG, {
      positionX: 105,
      positionY: 105,
      deltaX: 5,
      deltaY: 5,
    });

    //連続呼び出しをしてもスロットリングされる
    dispatchMouseEvent("mousemove", {
      offsetX: 110,
      offsetY: 110,
    });
    expectMouseNotCall(mockMoveCallback);
    expectMouseNotCall(mockCallback);

    //連続呼び出しをしてもスロットリングされる
    RAFTicker.emit(RAFTickerEventType.tick, {
      timestamp: 0,
      delta: watcher.throttlingTime_ms / 2,
    });
    dispatchMouseEvent("mousemove", {
      offsetX: 115,
      offsetY: 115,
    });
    expectMouseNotCall(mockMoveCallback);
    expectMouseNotCall(mockCallback);

    //時間経過後にスロットリングは解除される。
    RAFTicker.emit(RAFTickerEventType.tick, {
      timestamp: 0,
      delta: watcher.throttlingTime_ms * 3,
    });
    dispatchMouseEvent("mousemove", {
      offsetX: 120,
      offsetY: 120,
    });
    expectMouse(mockMoveCallback, DragEventType.MOVE, {
      positionX: 120,
      positionY: 120,
    });
    //delta値はスロットリング前の最後のものが利用される
    expectMouse(mockCallback, DragEventType.DRAG, {
      positionX: 120,
      positionY: 120,
      deltaX: 15,
      deltaY: 15,
    });

    clearCanvas();
  });

  test("drag : not down", () => {
    /**
     * マウスダウン前にmoveをすると、moveは発行されるがdragは発行されない
     */
    dispatchMouseEvent("mousemove", {
      offsetX: 105,
      offsetY: 105,
    });
    expectMouse(mockMoveCallback, DragEventType.MOVE, {
      positionX: 105,
      positionY: 105,
    });
    expectMouseNotCall(mockCallback);

    clearCanvas();
  });
});

const dispatchMouseEvent = (type: string, option?: FakeMouseEventInit) => {
  const evt = getMouseEvent(type, option);
  canvas.dispatchEvent(evt);
};

const clearCanvas = () => {
  dispatchMouseEvent("mouseleave");
  RAFTicker.emit(RAFTickerEventType.tick, {
    timestamp: 0,
    delta: watcher.throttlingTime_ms * 2,
  });
  mockCallback.mockClear();
  mockMoveCallback.mockClear();
};

const expectMouse = (mockFunc: Mock, type: DragEventType, option: object) => {
  const evt = mockFunc.mock.calls[0][0];
  expect(evt.type).toBe(type);
  Object.keys(option).forEach((key) => {
    expect(evt[key]).toBe(option[key]);
  });
  mockFunc.mockClear();
};

const expectMouseNotCall = (mockFunc: Mock) => {
  expect(mockFunc).toBeCalledTimes(0);
  mockFunc.mockClear();
};
