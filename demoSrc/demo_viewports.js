import * as THREE from "three";
import { DragEventType, DragWatcher } from "../";
import { TorusKnotGeometry, Mesh, MeshPhongMaterial } from "three";

const onDomContentsLoaded = () => {
  const canvas = document.getElementById("webgl-canvas");
  const renderOption = {
    canvas,
  };
  const renderer = new THREE.WebGLRenderer(renderOption);
  renderer.autoClear = false;
  renderer.setSize(canvas.width, canvas.height);
  renderer.setPixelRatio(window.devicePixelRatio);

  const box = new Mesh(
    new TorusKnotGeometry(10, 3, 100, 16),
    new MeshPhongMaterial({
      color: 0xff0000,
      specular: 0xffffff,
      shininess: 30,
    })
  );
  const tri = new Mesh(
    new TorusKnotGeometry(10, 3, 100, 16),
    new MeshPhongMaterial({
      color: 0x0000ff,
      specular: 0xffffff,
      shininess: 30,
    })
  );
  const scene1 = new SceneSet(canvas, 20, 20, 400, 300, box, 0x222222);
  const scene2 = new SceneSet(canvas, 480, 360, 120, 60, tri, 0x444444);

  const render = () => {
    renderer.setClearColor(0x000000);
    renderer.clear();

    scene1.render(renderer);
    scene2.render(renderer);
    requestAnimationFrame(render);
  };
  render();
};

/**
 * DOMContentLoaded以降に初期化処理を実行する
 */
window.onload = onDomContentsLoaded;

class SceneSet {
  scene;
  camera;
  bgColor;
  viewPort;
  mesh;

  dragManager;

  constructor(canvas, x, y, width, height, mesh, bgColor) {
    this.viewPort = new THREE.Vector4(x, y, width, height);
    this.mesh = mesh;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    this.camera.position.set(0, 0, 64);
    this.scene.add(this.camera);
    this.scene.add(mesh);
    this.bgColor = bgColor;

    //光源オブジェクト(light)の設定
    const ambientLight = new THREE.AmbientLight(0x111111, 1);
    this.scene.add(ambientLight);

    const spot = new THREE.SpotLight(0x888888, 1);
    spot.position.set(8, 6, -2);
    this.scene.add(spot);

    const spot2 = new THREE.SpotLight(0x888888, 1);
    spot2.position.set(-8, -6, 2);
    this.scene.add(spot2);

    this.dragManager = new DragWatcher(canvas, { viewport: this.viewPort });
    this.dragManager.addEventListener(DragEventType.DRAG, (e) => {
      console.log(
        this.bgColor,
        `throttlingTime_ms : ${this.dragManager.throttlingTime_ms}`,
        `TimeStamp : ${performance.now()}`,
        e
      );
    });
    this.dragManager.addEventListener(DragEventType.DRAG_START, (e) => {
      console.log(e);
    });
    this.dragManager.addEventListener(DragEventType.DRAG_END, (e) => {
      console.log(e);
    });
    this.dragManager.addEventListener(DragEventType.ZOOM, (e) => {
      console.log(e);
    });
  }

  render(renderer) {
    this.mesh.rotation.x += 0.001;
    this.mesh.rotation.y += 0.001;
    renderer.setClearColor(this.bgColor);
    renderer.clearDepth(); // important!
    renderer.setScissorTest(true);

    renderer.setScissor(this.viewPort);
    renderer.setViewport(this.viewPort);
    renderer.clear();

    renderer.render(this.scene, this.camera);
    renderer.setScissorTest(false);
  }
}
