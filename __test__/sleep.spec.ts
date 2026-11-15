import {
  type FakePointerEventInit,
  getPointerEvent,
} from "@masatomakino/fake-mouse-event";
import { RAFTicker } from "@masatomakino/raf-ticker";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { SleepWatcher } from "../src/index.js";
import { generateWatcher } from "./WatcherGenerator.js";

const { canvas, watcher } = generateWatcher();

const mockWakeup = vi.fn((e) => e);
const mockSleep = vi.fn((e) => e);
const timeout_ms = 10 * 1000;
const sleepWatcher = new SleepWatcher(watcher, { timeOut_ms: timeout_ms });

describe("threejs-drag-watcher", () => {
  sleepWatcher.on("wakeup", mockWakeup);
  sleepWatcher.on("sleep", mockSleep);

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    sleepWatcher.stop();
    dispatchMouseEvent("pointerup", { offsetX: 0, offsetY: 0 });
    watcher.reset();
    clearMockFunctions();
  });

  test("stop before start emits no event, even after the timeout", () => {
    sleepWatcher.stop();
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();

    interval(timeout_ms);
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();
  });

  test("stop right after start emits no event", () => {
    sleepWatcher.start();
    sleepWatcher.stop();
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).not.toBeCalled();
  });

  test("no sleep before the timeout passes", () => {
    sleepWatcher.start();
    interval(timeout_ms * 0.1);
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();
  });

  test("sleep after the timeout, and wakeup on stop while sleeping", () => {
    sleepWatcher.start();
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();

    interval(timeout_ms);
    expect(mockSleep).toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();

    sleepWatcher.stop();
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).toBeCalled();
    clearMockFunctions();
  });

  test("pointerdown while sleeping emits wakeup", () => {
    sleepWatcher.start();

    interval(timeout_ms);
    expect(mockSleep).toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();

    dispatchMouseEvent("pointerdown", { offsetX: 0, offsetY: 0 });
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).toBeCalled();
    clearMockFunctions();
  });

  test("each pointer event restarts the timeout", () => {
    sleepWatcher.start();

    dispatchMouseEvent("pointerdown", { offsetX: 0, offsetY: 0 });
    interval(timeout_ms * 0.8);
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();

    dispatchMouseEvent("pointermove", { offsetX: 10, offsetY: 10 });
    interval(timeout_ms * 0.8);
    dispatchMouseEvent("pointermove", { offsetX: 20, offsetY: 20 });
    interval(timeout_ms * 0.8);
    dispatchMouseEvent("pointerup", { offsetX: 20, offsetY: 20 });
    interval(timeout_ms * 0.8);
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();

    interval(timeout_ms);
    expect(mockSleep).toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();
  });

  test("no sleep while a drag continues past the timeout", () => {
    sleepWatcher.start();

    dispatchMouseEvent("pointerdown", { offsetX: 0, offsetY: 0 });
    interval(timeout_ms * 0.8);
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();

    dispatchMouseEvent("pointermove", { offsetX: 10, offsetY: 10 });
    interval(timeout_ms * 1.2);
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();
  });

  test("sleep after the timeout that follows drag_end, and wakeup on the next pointerdown", () => {
    sleepWatcher.start();

    dispatchMouseEvent("pointerdown", { offsetX: 0, offsetY: 0 });
    interval(timeout_ms * 0.8);
    dispatchMouseEvent("pointermove", { offsetX: 10, offsetY: 10 });
    interval(timeout_ms * 1.2);
    dispatchMouseEvent("pointerup", { offsetX: 10, offsetY: 10 });
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).not.toBeCalled();

    interval(timeout_ms);
    expect(mockSleep).toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();

    dispatchMouseEvent("pointerdown", { offsetX: 0, offsetY: 0 });
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).toBeCalled();
    clearMockFunctions();
  });

  test("restart() resets the timeout", () => {
    sleepWatcher.start();

    interval(timeout_ms * 0.6);
    interval(timeout_ms * 0.6);
    expect(mockSleep).toBeCalled();
    clearMockFunctions();

    dispatchMouseEvent("pointerdown", { offsetX: 0, offsetY: 0 });
    interval(timeout_ms * 0.6);
    sleepWatcher.restart();
    interval(timeout_ms * 0.6);
    expect(mockSleep).not.toBeCalled();
    clearMockFunctions();

    interval(timeout_ms * 0.6);
    expect(mockSleep).toBeCalled();
    clearMockFunctions();
  });
});

const clearMockFunctions = () => {
  mockWakeup.mockClear();
  mockSleep.mockClear();
};

const interval = (timeout_ms: number) => {
  vi.advanceTimersByTime(timeout_ms);
  RAFTicker.emit("tick", {
    timestamp: 0,
    delta: timeout_ms,
  });
};

const dispatchMouseEvent = (type: string, option?: FakePointerEventInit) => {
  if (option != null) {
    option.pointerId ??= 1;
  }
  const evt = getPointerEvent(type, option);
  canvas.dispatchEvent(evt);
};
