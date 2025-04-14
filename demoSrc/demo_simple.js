import { DragWatcher, SleepWatcher } from "../esm/index.js";
import * as THREE from "three";

const W = 1280;
const H = 640;

const generateColorFromPointerId = (id) => {
  const hue = (id * 137.508) % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

const onDomContentsLoaded = () => {
  // デバッグ情報表示エリアを生成
  const debugInfo = document.createElement("div");
  debugInfo.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px;
    font-family: monospace;
    pointer-events: none;
    z-index: 1000;
  `;
  document.body.appendChild(debugInfo);

  // ポインター位置を表示する要素のコンテナ
  const pointerContainer = document.createElement("div");
  pointerContainer.style.cssText = `
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1000;
  `;
  document.body.appendChild(pointerContainer);

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
  watcher.on("drag", (e) => {
    const currentTime = performance.now().toFixed(2);
    debugInfo.innerHTML = `
      Status: drag<br>
      Time: ${currentTime}ms<br>
      throttlingTime_ms: ${watcher.throttlingTime_ms}<br>
      Pointer ID: ${e.pointerId}<br>
      Position: (${e.positionX}, ${e.positionY})<br>
      Delta: (${e.deltaX ?? 0}, ${e.deltaY ?? 0})
    `;

    // ポインターマーカーを更新
    pointerContainer.innerHTML = "";
    const marker = document.createElement("div");
    const color = generateColorFromPointerId(e.pointerId);
    marker.style.cssText = `
      position: absolute;
      left: ${e.positionX}px;
      top: ${e.positionY}px;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: ${color};
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
    `;
    marker.textContent = e.pointerId;
    pointerContainer.appendChild(marker);
  });

  watcher.on("drag_start", (e) => {
    const currentTime = performance.now().toFixed(2);
    debugInfo.innerHTML = `
      Status: drag_start<br>
      Time: ${currentTime}ms<br>
      Pointer ID: ${e.pointerId}<br>
      Position: (${e.positionX}, ${e.positionY})
    `;

    // 開始位置にマーカーを表示
    pointerContainer.innerHTML = "";
    const marker = document.createElement("div");
    const color = generateColorFromPointerId(e.pointerId);
    marker.style.cssText = `
      position: absolute;
      left: ${e.positionX}px;
      top: ${e.positionY}px;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: ${color};
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
    `;
    marker.textContent = e.pointerId;
    pointerContainer.appendChild(marker);
  });

  watcher.on("drag_end", (e) => {
    const currentTime = performance.now().toFixed(2);
    debugInfo.innerHTML = `
      Status: drag_end<br>
      Time: ${currentTime}ms<br>
      Pointer ID: ${e.pointerId}<br>
      Position: (${e.positionX}, ${e.positionY})
    `;

    // マーカーを削除
    pointerContainer.innerHTML = "";
  });
  watcher.on("zoom", (e) => {
    console.log(e);
  });

  const sleepWatcher = new SleepWatcher(watcher, { timeOut_ms: 2 * 1000 });
  sleepWatcher.on("sleep", (e) => {
    console.log(e);
  });
  sleepWatcher.on("wakeup", (e) => {
    console.log(e);
  });
  sleepWatcher.start();

  renderer.domElement.style.touchAction = "none";
};

/**
 * DOMContentLoaded以降に初期化処理を実行する
 */
window.onload = onDomContentsLoaded;
