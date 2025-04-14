import { DragWatcher } from "../esm/index.js";

const onDomContentsLoaded = () => {
  const canvas = document.getElementById("webgl-canvas");

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

  // ポインターIDから色を生成
  const generateColorFromPointerId = (id) => {
    const hue = (id * 137.508) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  // DragWatcherの初期化
  const watcher = new DragWatcher(canvas);

  // ピンチイベントのハンドラ
  watcher.on("pinch", (e) => {
    // デバッグ情報を更新
    const currentTime = performance.now().toFixed(2);
    debugInfo.innerHTML = `
      Time: ${currentTime}ms<br>
      Delta: ${e.delta.toFixed(2)}<br>
      Active Pointers: ${e.pointers.length}<br>
      Pointer IDs: ${e.pointers.map((p) => p.pointerId).join(", ")}<br>
      Throttling: ${watcher.throttlingTime_ms}ms
    `;

    // ポインターマーカーを更新
    pointerContainer.innerHTML = "";
    e.pointers.forEach((pointer) => {
      // ポインターマーカー
      const marker = document.createElement("div");
      const color = generateColorFromPointerId(pointer.pointerId);
      marker.style.cssText = `
        position: absolute;
        left: ${pointer.offsetX}px;
        top: ${pointer.offsetY}px;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: ${color};
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 48px;
        font-weight: bold;
      `;
      marker.textContent = pointer.pointerId;
      pointerContainer.appendChild(marker);
    });

    // 2点間の線を描画
    if (e.pointers.length === 2) {
      const [p1, p2] = e.pointers;
      const line = document.createElement("div");
      const dx = p2.offsetX - p1.offsetX;
      const dy = p2.offsetY - p1.offsetY;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      line.style.cssText = `
        position: absolute;
        left: ${p1.offsetX}px;
        top: ${p1.offsetY}px;
        width: ${length}px;
        height: 2px;
        background: rgba(255, 255, 255, 0.5);
        transform: rotate(${angle}deg);
        transform-origin: left center;
      `;
      pointerContainer.appendChild(line);
    }
  });

  // タッチアクションを無効化
  canvas.style.touchAction = "none";
};

window.onload = onDomContentsLoaded;
