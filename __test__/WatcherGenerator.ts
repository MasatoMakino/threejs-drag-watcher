import { DragEventMap, DragWatcher } from "../src/index.js";
import { Vector4 } from "three";
import {
  FakeMouseEventInit,
  getMouseEvent,
} from "@masatomakino/fake-mouse-event";
import { expect, Mock } from "vitest";
import { RAFTicker } from "@masatomakino/raf-ticker";

export function generateWatcher(option?: {
  throttlingTime_ms?: number;
  viewport?: Vector4;
}): {
  canvas: HTMLCanvasElement;
  watcher: DragWatcher;
} {
  const canvas = document.createElement("canvas");
  canvas.width = 1920;
  canvas.height = 1080;
  const watcher = new DragWatcher(canvas, option);
  return { canvas, watcher };
}

export const dispatchMouseEvent = (
  canvas: HTMLCanvasElement,
  type: string,
  option?: FakeMouseEventInit,
) => {
  const evt = getMouseEvent(type, option);
  canvas.dispatchEvent(evt);
};

export const clearCanvas = (
  canvas: HTMLCanvasElement,
  watcher: DragWatcher,
  mockDragCallback: Mock,
  mockMoveCallback: Mock,
) => {
  dispatchMouseEvent(canvas, "mouseleave");
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
