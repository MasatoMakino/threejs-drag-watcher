import { SleepEventType, SleepWatcher } from "../src";
import { generateWatcher } from "./WatcherGenerator";

const { canvas, watcher } = generateWatcher();

const mockWakeup = jest.fn((e) => e);
const mockSleep = jest.fn((e) => e);
const timeout_ms = 10 * 1000;
const sleepWatcher = new SleepWatcher(watcher, { timeOut_ms: timeout_ms });

describe("threejs-drag-watcher", () => {
  sleepWatcher.addEventListener(SleepEventType.WAKEUP, mockWakeup);
  sleepWatcher.addEventListener(SleepEventType.SLEEP, mockSleep);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    clearMockFunctions();
    sleepWatcher.stop();
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

    jest.advanceTimersByTime(timeout_ms);
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
    jest.advanceTimersByTime(timeout_ms * 0.1);
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();
  });

  test("start", () => {
    sleepWatcher.start();
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();

    jest.advanceTimersByTime(timeout_ms);
    expect(mockSleep).toBeCalled();
    expect(mockWakeup).not.toBeCalled();
    clearMockFunctions();

    sleepWatcher.stop();
    expect(mockSleep).not.toBeCalled();
    expect(mockWakeup).toBeCalled();
    clearMockFunctions();
  });
});

const clearMockFunctions = () => {
  mockWakeup.mockClear();
  mockSleep.mockClear();
};
