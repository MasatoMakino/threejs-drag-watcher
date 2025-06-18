import {
  type FakePointerEventInit,
  getPointerEvent,
} from "@masatomakino/fake-mouse-event";
import { RAFTicker } from "@masatomakino/raf-ticker";
import { expect, type Mock } from "vitest";
import {
  type DragEventMap,
  DragWatcher,
  type DragWatcherInitOption,
} from "../src/index.js";

export function generateWatcher(option?: DragWatcherInitOption): {
  canvas: HTMLCanvasElement;
  watcher: DragWatcher;
} {
  const canvas = document.createElement("canvas");
  canvas.width = 1920;
  canvas.height = 1080;
  const watcher = new DragWatcher(canvas, option);
  document.body.appendChild(canvas);
  return { canvas, watcher };
}

export const dispatchMouseEvent = (
  canvas: HTMLCanvasElement,
  type: string,
  option?: FakePointerEventInit,
) => {
  const evt = getPointerEvent(type, option);
  canvas.dispatchEvent(evt);
};

export const clearCanvas = (
  canvas: HTMLCanvasElement,
  watcher: DragWatcher,
  mockDragCallback: Mock,
  mockMoveCallback: Mock,
) => {
  dispatchMouseEvent(canvas, "pointerleave");
  watcher.reset();
  RAFTicker.emit("tick", {
    timestamp: 0,
    delta: watcher.throttlingTime_ms * 2,
  });
  mockDragCallback.mockClear();
  mockMoveCallback.mockClear();
};

export const expectMouse = (
  mockFunc: Mock,
  type: keyof DragEventMap,
  option: { [key: string]: unknown },
) => {
  const evt = mockFunc.mock.calls[0][0];
  expect(evt.type).toBe(type);
  Object.keys(option).forEach((key) => {
    expect(evt[key]).toBe(option[key]);
  });
  mockFunc.mockClear();
};

export const expectMouseNotCall = (mockFunc: Mock) => {
  expect(mockFunc).toBeCalledTimes(0);
  mockFunc.mockClear();
};
