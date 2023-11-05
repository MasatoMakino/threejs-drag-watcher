import { DragEvent } from "../src/index.js";
import { generateWatcher } from "./WatcherGenerator.js";
import { describe, expect, test, vi } from "vitest";

const getBasicOption = () => {
  return { bubbles: true, cancelable: true };
};

describe("threejs-drag-watcher", () => {
  test("wheel", () => {
    const { canvas, watcher } = generateWatcher();
    const mockZoom = vi.fn((e) => e);
    watcher.on("zoom", mockZoom);

    const expectWheel = (scroll: number) => {
      const dragEvt: DragEvent = { type: "zoom" };
      dragEvt.deltaScroll = scroll;
      expect(mockZoom).toHaveBeenLastCalledWith(dragEvt);
    };

    const dispatchWheelEvent = (option: object) => {
      option = Object.assign(getBasicOption(), option);
      const evt = new WheelEvent("wheel", option);
      canvas.dispatchEvent(evt);
    };

    dispatchWheelEvent({ deltaY: 1 });
    expectWheel(1);

    dispatchWheelEvent({ deltaY: -1 });
    expectWheel(-1);

    watcher.off("zoom", mockZoom);
    mockZoom.mockClear();
  });
});
