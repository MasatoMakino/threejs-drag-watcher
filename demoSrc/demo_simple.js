import { DragWatcher, SleepWatcher } from "../";
import * as THREE from "three";

const W = 1280;
const H = 640;

const onDomContentsLoaded = () => {
  // シーンを作成
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W / H, 1, 10000);
  camera.position.set(0, 0, 1000);
  scene.add(camera);

  const renderOption = {
    canvas: document.getElementById("webgl-canvas"),
  };
  const renderer = new THREE.WebGLRenderer(renderOption);
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(W, H);
  renderer.setPixelRatio(window.devicePixelRatio);

  //平行光源オブジェクト(light)の設定
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);

  renderer.render(scene, camera);

  //ドラッグ監視処理を開始
  const watcher = new DragWatcher(renderer.domElement);
  watcher.addEventListener("drag", (e) => {
    console.log(
      `throttlingTime_ms : ${watcher.throttlingTime_ms}`,
      `TimeStamp : ${performance.now()}`,
      e
    );
  });
  watcher.addEventListener("drag_start", (e) => {
    console.log(e);
  });
  watcher.addEventListener("drag_end", (e) => {
    console.log(e);
  });
  watcher.addEventListener("zoom", (e) => {
    console.log(e);
  });

  const sleepWatcher = new SleepWatcher(watcher, { timeOut_ms: 2 * 1000 });
  sleepWatcher.addEventListener("sleep", (e) => {
    console.log(e);
  });
  sleepWatcher.addEventListener("wakeup", (e) => {
    console.log(e);
  });
  sleepWatcher.start();
};

/**
 * DOMContentLoaded以降に初期化処理を実行する
 */
window.onload = onDomContentsLoaded;
