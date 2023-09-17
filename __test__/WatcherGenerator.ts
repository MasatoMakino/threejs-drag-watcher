import { DragWatcher } from "../src/index.js";

export function generateWatcher(): {
  canvas: HTMLCanvasElement;
  watcher: DragWatcher;
} {
  const canvas = document.createElement("canvas");
  canvas.width = 1920;
  canvas.height = 1080;
  const watcher = new DragWatcher(canvas);
  return { canvas, watcher };
}
