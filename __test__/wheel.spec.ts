import { DragEvent, DragEventType } from "../src";
import { generateWatcher } from "./WatcherGenerator";

const getBasicOption = () => {
  return { bubbles: true, cancelable: true };
};

describe("threejs-drag-watcher", () => {
  test("wheel", () => {
    const { canvas, watcher } = generateWatcher();
    const spy = jest
      .spyOn(watcher, "dispatchEvent")
      .mockImplementation((e: Event) => null);
    watcher.addEventListener(DragEventType.ZOOM, (e) => {});

    const expectWheel = (scroll: number) => {
      const dragEvt = new DragEvent(DragEventType.ZOOM);
      dragEvt.deltaScroll = scroll;
      expect(spy).toHaveBeenLastCalledWith(dragEvt);
    };

    const dispatchWheelEvent = (option: object) => {
      option = Object.assign(getBasicOption(), option);
      const evt = new (<any>WheelEvent)("wheel", option);
      canvas.dispatchEvent(evt);
    };

    dispatchWheelEvent({ deltaY: 1 });
    expectWheel(1);

    dispatchWheelEvent({ deltaY: -1 });
    expectWheel(-1);

    watcher.removeEventListener(DragEventType.ZOOM, (e) => {});
    spy.mockClear();
  });
});
