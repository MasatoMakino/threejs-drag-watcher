import { DragWatcher } from "../src";
import { DragEventType } from "../src";
import { DragEvent } from "../src";

const W = 1920;
const H = 1080;

const getBasicOption = () => {
  return { bubbles: true, cancelable: true };
};

describe("threejs-drag-watcher", () => {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const watcher = new DragWatcher(canvas);

  test("wheel", () => {
    const spy = jest
      .spyOn(watcher, "dispatchEvent")
      .mockImplementation((e: Event) => null);

    watcher.addEventListener(DragEventType.ZOOM, e => {});

    const expectWheel = (scroll: number) => {
      const dragEvt = new DragEvent(DragEventType.ZOOM);
      dragEvt.deltaScroll = scroll;
      expect(spy).toHaveBeenLastCalledWith(dragEvt);
    };

    const dispatchWheelEvent = (option: object) => {
      option = Object.assign(getBasicOption(), option);
      const evt = new (<any>WheelEvent)("mousewheel", option);
      canvas.dispatchEvent(evt);
    };

    dispatchWheelEvent({ detail: 1 });
    expectWheel(-1);

    dispatchWheelEvent({ detail: -1 });
    expectWheel(1);

    // dispatchWheelEvent({ wheelDelta: -1 });
    // expectWheel(-1);
    //
    // dispatchWheelEvent({ wheelDelta: 1 });
    // expectWheel(1);

    watcher.removeEventListener(DragEventType.ZOOM, e => {});
    spy.mockClear();
  });
  /*
  test("drag", () => {
    const spy = jest
      .spyOn(watcher, "dispatchEvent")
      .mockImplementation((e: Event) => null);
    watcher.addEventListener(DragEventType.DRAG_START, e => {});
    watcher.addEventListener(DragEventType.DRAG, e => {});
    watcher.addEventListener(DragEventType.DRAG_END, e => {});

    const dispatchMouseEvent = (type: string, option: any) => {
      const init = Object.assign(getBasicOption(), option);
      const evt = new Event(type, init);
      console.log(type, init, evt);
      canvas.dispatchEvent(evt);
    };

    const expectMouse = (type: DragEventType, option: object) => {
      let e = new DragEvent(type);
      e = Object.assign(e, option);
      expect(spy).toHaveBeenLastCalledWith(e);
    };

    dispatchMouseEvent("mousedown", { clientX: 100, layerX: 100, layerY: 100 });
    expectMouse(DragEventType.DRAG_START, { positionX: 100, positionY: 100 });

    spy.mockClear();
  });
  */
});
