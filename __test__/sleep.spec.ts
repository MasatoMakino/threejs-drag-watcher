import {
  FakeMouseEventInit,
  getMouseEvent,
} from "@masatomakino/fake-mouse-event";
import { RAFTicker } from "@masatomakino/raf-ticker";
import { SleepWatcher } from "../src/index.js";
import { generateWatcher } from "./WatcherGenerator";
import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";

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
    dispatchMouseEvent("mouseup", { offsetX: 0, offsetY: 0 });
    clearMockFunctions();
  });

  test("constructor", () => {
    expect(sleepWatcher).toBeTruthy();
    expect(typeof sleepWatcher.start).toBe("function");
  });

  /**
   * 稼働していないWatcherをStopしても、何も起きない。
   */
  test("stop", () => {
    sleepWatcher.stop();
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();

    interval(timeout_ms);
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();
  });

  /**
   * 連続で呼び出しをしてもイベントは発行しない。
   */
  test("start and stop", () => {
    sleepWatcher.start();
    sleepWatcher.stop();
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).not.toBeCalled();
  });

  test("start and < timeout_ms", () => {
    sleepWatcher.start();
    interval(timeout_ms * 0.1);
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();
  });

  test("start", () => {
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

  test("mouse down and wakeup", () => {
    sleepWatcher.start();

    interval(timeout_ms);
    expect(mockSleep).toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();

    dispatchMouseEvent("mousedown", { offsetX: 0, offsetY: 0 });
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).toBeCalled();
    clearMockFunctions();
  });

  test("drag", () => {
    sleepWatcher.start();

    dispatchMouseEvent("mousedown", { offsetX: 0, offsetY: 0 });
    interval(timeout_ms * 0.8);
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();

    dispatchMouseEvent("mousemove", { offsetX: 10, offsetY: 10 });
    interval(timeout_ms * 0.8);
    dispatchMouseEvent("mousemove", { offsetX: 20, offsetY: 20 });
    interval(timeout_ms * 0.8);
    dispatchMouseEvent("mouseup", { offsetX: 20, offsetY: 20 });
    interval(timeout_ms * 0.8);
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();

    interval(timeout_ms);
    expect(mockSleep).toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();
  });

  test("DRAG_START and pause", () => {
    sleepWatcher.start();

    dispatchMouseEvent("mousedown", { offsetX: 0, offsetY: 0 });
    interval(timeout_ms * 0.8);
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();

    dispatchMouseEvent("mousemove", { offsetX: 10, offsetY: 10 });
    interval(timeout_ms * 1.2);
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();
  });

  test("DRAG_END and SLEEP", () => {
    sleepWatcher.start();

    dispatchMouseEvent("mousedown", { offsetX: 0, offsetY: 0 });
    interval(timeout_ms * 0.8);
    dispatchMouseEvent("mousemove", { offsetX: 10, offsetY: 10 });
    interval(timeout_ms * 1.2);
    dispatchMouseEvent("mouseup", { offsetX: 10, offsetY: 10 });
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).not.toBeCalled();

    interval(timeout_ms);
    expect(mockSleep).toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();

    dispatchMouseEvent("mousedown", { offsetX: 0, offsetY: 0 });
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).toBeCalled();
    clearMockFunctions();
  });

  test("reset timer", () => {
    sleepWatcher.start();

    interval(timeout_ms * 0.6);
    interval(timeout_ms * 0.6);
    expect(mockSleep).toBeCalled();
    clearMockFunctions();

    dispatchMouseEvent("mousedown", { offsetX: 0, offsetY: 0 });
    interval(timeout_ms * 0.6);
    sleepWatcher.reset();
    interval(timeout_ms * 0.6);
    expect(mockSleep).not.toBeCalled();
    clearMockFunctions();

    interval(timeout_ms * 0.6);
    expect(mockSleep).toBeCalled();
    clearMockFunctions();
  });
});

/**
 * モック関数のリセット処理
 */
const clearMockFunctions = () => {
  mockWakeup.mockClear();
  mockSleep.mockClear();
};

/**
 * SleepWatcherとCanvasの時間を進める
 * @param timeout_ms
 */
const interval = (timeout_ms: number) => {
  vi.advanceTimersByTime(timeout_ms);
  RAFTicker.emit("tick", {
    timestamp: 0,
    delta: timeout_ms,
  });
};

/**
 * 偽のマウスイベントをCanvasから発行する。
 * @param type
 * @param option
 */
const dispatchMouseEvent = (type: string, option?: FakeMouseEventInit) => {
  const evt = getMouseEvent(type, option);
  canvas.dispatchEvent(evt);
};
