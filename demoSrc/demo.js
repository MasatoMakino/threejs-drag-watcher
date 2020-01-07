import {
  DragWatcher,
  DragEvent,
  DragEventType,
  SleepWatcher,
  SleepEventType
} from "../lib";
import * as THREE from "three";

const W = 1920;
const H = 1080;

const onDomContentsLoaded = () => {
  // シーンを作成
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W / H, 1, 10000);
  camera.position.set(0, 0, 1000);
  scene.add(camera);

  const renderOption = {
    canvas: document.getElementById("webgl-canvas"),
    antialias: true
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
  watcher.addEventListener(DragEventType.DRAG, e => {
    console.log(watcher.throttlingTime_ms, performance.now(), e);
  });
  watcher.addEventListener(DragEventType.DRAG_START, e => {
    console.log(e);
  });
  watcher.addEventListener(DragEventType.DRAG_END, e => {
    console.log(e);
  });
  watcher.addEventListener(DragEventType.ZOOM, e => {
    console.log(e);
  });

  const sleepWatcher = new SleepWatcher(watcher, { timeOut_ms: 2 * 1000 });
  sleepWatcher.addEventListener(SleepEventType.SLEEP, e => {
    console.log(e);
  });
  sleepWatcher.addEventListener(SleepEventType.WAKEUP, e => {
    console.log(e);
  });
  sleepWatcher.start();
};

/**
 * DOMContentLoaded以降に初期化処理を実行する
 */
window.onload = onDomContentsLoaded;
