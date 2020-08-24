import { DragEvent, DragEventType, DragWatcher } from "..";
import { getMouseEvent } from "./FakeMouseEventGenerator";

const canvas = document.createElement("canvas");
canvas.width = 1920;
canvas.height = 1080;
const watcher = new DragWatcher(canvas);

test("drag", () => {
  const spy = jest
    .spyOn(watcher, "dispatchEvent")
    .mockImplementation((e: Event) => null);
  watcher.addEventListener(DragEventType.DRAG_START, (e) => {});
  watcher.addEventListener(DragEventType.DRAG, (e) => {});
  watcher.addEventListener(DragEventType.DRAG_END, (e) => {});

  const dispatchMouseEvent = (type: string, option: any) => {
    const evt = getMouseEvent(type, option);
    canvas.dispatchEvent(evt);
  };

  const expectMouse = (type: DragEventType, option: object) => {
    let e = new DragEvent(type);
    e = Object.assign(e, option);
    expect(spy).toHaveBeenLastCalledWith(e);
  };

  dispatchMouseEvent("mousedown", {
    offsetX: 100,
    offsetY: 100,
  });
  expectMouse(DragEventType.DRAG_START, { positionX: 100, positionY: 100 });

  spy.mockClear();
});
