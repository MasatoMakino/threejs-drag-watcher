/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./demoSrc/demo_viewports.js":
/*!***********************************!*\
  !*** ./demoSrc/demo_viewports.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ */ \"./esm/index.js\");\n\n\n\nconst W = 1280;\nconst H = 640;\n\nconst onDomContentsLoaded = () => {\n  const canvas = document.getElementById(\"webgl-canvas\");\n  const renderOption = {\n    canvas\n  };\n  const renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer(renderOption);\n  renderer.autoClear = false;\n  renderer.setSize(W, H);\n  renderer.setPixelRatio(window.devicePixelRatio);\n  const box = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.TorusKnotGeometry(10, 3, 100, 16), new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({\n    color: 0xff0000,\n    specular: 0xffffff,\n    shininess: 30\n  }));\n  const tri = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.TorusKnotGeometry(10, 3, 100, 16), new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({\n    color: 0x0000ff,\n    specular: 0xffffff,\n    shininess: 30\n  }));\n  const scene1 = new SceneSet(canvas, 20, 20, 400, 300, box, 0x222222);\n  const scene2 = new SceneSet(canvas, 480, 360, 120, 60, tri, 0x444444);\n\n  const render = () => {\n    renderer.setClearColor(0x000000);\n    renderer.clear();\n    scene1.render(renderer);\n    scene2.render(renderer);\n    requestAnimationFrame(render);\n  };\n\n  render();\n};\n/**\n * DOMContentLoaded以降に初期化処理を実行する\n */\n\n\nwindow.onload = onDomContentsLoaded;\n\nclass SceneSet {\n  scene;\n  camera;\n  bgColor;\n  viewPort;\n  mesh;\n  dragManager;\n\n  constructor(canvas, x, y, width, height, mesh, bgColor) {\n    this.viewPort = new three__WEBPACK_IMPORTED_MODULE_1__.Vector4(x, y, width, height);\n    this.mesh = mesh;\n    this.scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();\n    this.camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(45, width / height, 1, 10000);\n    this.camera.position.set(0, 0, 64);\n    this.scene.add(this.camera);\n    this.scene.add(mesh);\n    this.bgColor = bgColor; //光源オブジェクト(light)の設定\n\n    const ambientLight = new three__WEBPACK_IMPORTED_MODULE_1__.AmbientLight(0x111111, 1);\n    this.scene.add(ambientLight);\n    const spot = new three__WEBPACK_IMPORTED_MODULE_1__.SpotLight(0x888888, 1);\n    spot.position.set(8, 6, -2);\n    this.scene.add(spot);\n    const spot2 = new three__WEBPACK_IMPORTED_MODULE_1__.SpotLight(0x888888, 1);\n    spot2.position.set(-8, -6, 2);\n    this.scene.add(spot2);\n    this.dragManager = new ___WEBPACK_IMPORTED_MODULE_0__.DragWatcher(canvas, {\n      viewport: this.viewPort\n    });\n    this.dragManager.addEventListener(___WEBPACK_IMPORTED_MODULE_0__.DragEventType.DRAG, e => {\n      console.log(this.bgColor, `throttlingTime_ms : ${this.dragManager.throttlingTime_ms}`, `TimeStamp : ${performance.now()}`, e);\n    });\n    this.dragManager.addEventListener(___WEBPACK_IMPORTED_MODULE_0__.DragEventType.DRAG_START, e => {\n      console.log(e);\n    });\n    this.dragManager.addEventListener(___WEBPACK_IMPORTED_MODULE_0__.DragEventType.DRAG_END, e => {\n      console.log(e);\n    });\n    this.dragManager.addEventListener(___WEBPACK_IMPORTED_MODULE_0__.DragEventType.ZOOM, e => {\n      console.log(e);\n    });\n  }\n\n  render(renderer) {\n    this.mesh.rotation.x += 0.001;\n    this.mesh.rotation.y += 0.001;\n    renderer.setClearColor(this.bgColor);\n    renderer.clearDepth(); // important!\n\n    renderer.setScissorTest(true);\n    renderer.setScissor(this.viewPort);\n    renderer.setViewport(this.viewPort);\n    renderer.clear();\n    renderer.render(this.scene, this.camera);\n    renderer.setScissorTest(false);\n  }\n\n}\n\n//# sourceURL=webpack://threejs-drag-watcher/./demoSrc/demo_viewports.js?");

/***/ }),

/***/ "./esm/DragEvent.js":
/*!**************************!*\
  !*** ./esm/DragEvent.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DragEvent\": () => (/* binding */ DragEvent),\n/* harmony export */   \"DragEventType\": () => (/* binding */ DragEventType)\n/* harmony export */ });\nclass DragEvent {\n  constructor(type) {\n    this.type = type;\n  }\n\n}\nvar DragEventType;\n\n(function (DragEventType) {\n  DragEventType[\"DRAG_START\"] = \"THREE_CANVAS_EVENT_DRAG_START\";\n  DragEventType[\"DRAG\"] = \"THREE_CANVAS_EVENT_DRAG\";\n  DragEventType[\"DRAG_END\"] = \"THREE_CANVAS_EVENT_DRAG_END\";\n  DragEventType[\"MOVE\"] = \"THREE_CANVAS_EVENT_MOVE\";\n  DragEventType[\"ZOOM\"] = \"THREE_CANVAS_EVENT_ZOOM\";\n})(DragEventType || (DragEventType = {}));\n\n//# sourceURL=webpack://threejs-drag-watcher/./esm/DragEvent.js?");

/***/ }),

/***/ "./esm/DragWatcher.js":
/*!****************************!*\
  !*** ./esm/DragWatcher.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DragWatcher\": () => (/* binding */ DragWatcher)\n/* harmony export */ });\n/* harmony import */ var raf_ticker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raf-ticker */ \"./node_modules/raf-ticker/esm/index.js\");\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _DragEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DragEvent */ \"./esm/DragEvent.js\");\n\n\n\n/**\n * 1.カンバス全体がドラッグされている状態を確認する\n * 2.マウスホイールが操作されている状態を確認する\n * この二つを実行するためのクラスです。\n */\n\nclass DragWatcher extends three__WEBPACK_IMPORTED_MODULE_2__.EventDispatcher {\n  constructor(canvas, option) {\n    var _a, _b;\n\n    super();\n    this.isDrag = false;\n    this.hasThrottled = false;\n    this.throttlingTime_ms = 16;\n    this.throttlingDelta = 0;\n\n    this.onTick = e => {\n      this.throttlingDelta += e.delta;\n      if (this.throttlingDelta < this.throttlingTime_ms) return;\n      this.hasThrottled = false;\n      this.throttlingDelta %= this.throttlingTime_ms;\n    };\n\n    this.onDocumentMouseDown = event => {\n      if (this.isDrag) return;\n      if (!this.isContain(event)) return;\n      this.isDrag = true;\n      this.updatePosition(event);\n      this.dispatchDragEvent(_DragEvent__WEBPACK_IMPORTED_MODULE_1__.DragEventType.DRAG_START, event);\n    };\n\n    this.onDocumentMouseMove = event => {\n      if (this.hasThrottled) return;\n      this.hasThrottled = true;\n      this.dispatchDragEvent(_DragEvent__WEBPACK_IMPORTED_MODULE_1__.DragEventType.MOVE, event);\n      if (!this.isDrag) return;\n      this.dispatchDragEvent(_DragEvent__WEBPACK_IMPORTED_MODULE_1__.DragEventType.DRAG, event);\n      this.updatePosition(event);\n    };\n\n    this.onDocumentMouseLeave = event => {\n      this.onDocumentMouseUp(event);\n    };\n\n    this.onDocumentMouseUp = event => {\n      if (!this.isDrag) return;\n      this.isDrag = false;\n      this.dispatchDragEvent(_DragEvent__WEBPACK_IMPORTED_MODULE_1__.DragEventType.DRAG_END, event);\n    };\n\n    this.onMouseWheel = e => {\n      const evt = new _DragEvent__WEBPACK_IMPORTED_MODULE_1__.DragEvent(_DragEvent__WEBPACK_IMPORTED_MODULE_1__.DragEventType.ZOOM);\n\n      if (e.detail != null) {\n        evt.deltaScroll = e.detail < 0 ? 1 : -1;\n      }\n\n      if (e.wheelDelta != null) {\n        evt.deltaScroll = e.wheelDelta > 0 ? 1 : -1;\n      }\n\n      if (e.deltaY != null) {\n        evt.deltaScroll = e.deltaY > 0 ? 1 : -1;\n      }\n\n      this.dispatchEvent(evt);\n    };\n\n    (_a = this.throttlingTime_ms) !== null && _a !== void 0 ? _a : this.throttlingTime_ms = option === null || option === void 0 ? void 0 : option.throttlingTime_ms;\n    (_b = this.viewport) !== null && _b !== void 0 ? _b : this.viewport = option === null || option === void 0 ? void 0 : option.viewport;\n    this.canvas = canvas;\n    this.canvas.addEventListener(\"mousemove\", this.onDocumentMouseMove, false);\n    this.canvas.addEventListener(\"mousedown\", this.onDocumentMouseDown, false);\n    this.canvas.addEventListener(\"mouseup\", this.onDocumentMouseUp, false);\n    this.canvas.addEventListener(\"mouseleave\", this.onDocumentMouseLeave, false);\n    this.canvas.addEventListener(\"wheel\", this.onMouseWheel, false);\n    raf_ticker__WEBPACK_IMPORTED_MODULE_0__.RAFTicker.on(raf_ticker__WEBPACK_IMPORTED_MODULE_0__.RAFTickerEventType.tick, this.onTick);\n  }\n\n  updatePosition(event) {\n    this.positionX = event.offsetX;\n    this.positionY = event.offsetY;\n  }\n\n  dispatchDragEvent(type, event) {\n    const evt = new _DragEvent__WEBPACK_IMPORTED_MODULE_1__.DragEvent(type);\n    const {\n      x,\n      y\n    } = this.convertToLocalMousePoint(event);\n    evt.positionX = x;\n    evt.positionY = y;\n\n    if (type === _DragEvent__WEBPACK_IMPORTED_MODULE_1__.DragEventType.DRAG) {\n      evt.deltaX = event.offsetX - this.positionX;\n      evt.deltaY = event.offsetY - this.positionY;\n    }\n\n    this.dispatchEvent(evt);\n  }\n\n  convertToLocalMousePoint(e) {\n    if (!this.viewport) {\n      return {\n        x: e.offsetX,\n        y: e.offsetY\n      };\n    } else {\n      const rect = DragWatcher.convertToRect(this.canvas, this.viewport);\n      return {\n        x: e.offsetX - rect.x1,\n        y: e.offsetY - rect.y1\n      };\n    }\n  }\n  /**\n   * マウスポインタがviewport内に収まっているか否か\n   * @param event\n   * @private\n   */\n\n\n  isContain(event) {\n    if (!this.viewport) return true;\n    const rect = DragWatcher.convertToRect(this.canvas, this.viewport);\n    return event.offsetX >= rect.x1 && event.offsetX <= rect.x2 && event.offsetY >= rect.y1 && event.offsetY <= rect.y2;\n  }\n\n  static convertToRect(canvas, viewport) {\n    return {\n      x1: viewport.x,\n      x2: viewport.x + viewport.width,\n      y1: canvas.height - (viewport.y + viewport.height),\n      y2: canvas.height - viewport.y\n    };\n  }\n\n  dispose() {\n    this.canvas.removeEventListener(\"mousemove\", this.onDocumentMouseMove, false);\n    this.canvas.removeEventListener(\"mousedown\", this.onDocumentMouseDown, false);\n    this.canvas.removeEventListener(\"mouseup\", this.onDocumentMouseUp, false);\n    this.canvas.removeEventListener(\"mouseleave\", this.onDocumentMouseLeave, false);\n    raf_ticker__WEBPACK_IMPORTED_MODULE_0__.RAFTicker.off(raf_ticker__WEBPACK_IMPORTED_MODULE_0__.RAFTickerEventType.tick, this.onTick);\n  }\n\n}\n\n//# sourceURL=webpack://threejs-drag-watcher/./esm/DragWatcher.js?");

/***/ }),

/***/ "./esm/SleepEvent.js":
/*!***************************!*\
  !*** ./esm/SleepEvent.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SleepEventType\": () => (/* binding */ SleepEventType),\n/* harmony export */   \"SleepEvent\": () => (/* binding */ SleepEvent)\n/* harmony export */ });\nvar SleepEventType;\n\n(function (SleepEventType) {\n  SleepEventType[\"SLEEP\"] = \"SLEEP_EVENT_TYPE_SLEEP\";\n  SleepEventType[\"WAKEUP\"] = \"SLEEP_EVENT_TYPE_WAKEUP\";\n})(SleepEventType || (SleepEventType = {}));\n\nclass SleepEvent {\n  constructor(type) {\n    this.type = type;\n  }\n\n}\n\n//# sourceURL=webpack://threejs-drag-watcher/./esm/SleepEvent.js?");

/***/ }),

/***/ "./esm/SleepWatcher.js":
/*!*****************************!*\
  !*** ./esm/SleepWatcher.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SleepWatcher\": () => (/* binding */ SleepWatcher)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _DragEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DragEvent */ \"./esm/DragEvent.js\");\n/* harmony import */ var _SleepEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SleepEvent */ \"./esm/SleepEvent.js\");\n\n\n\nclass SleepWatcher extends three__WEBPACK_IMPORTED_MODULE_2__.EventDispatcher {\n  constructor(dragWatcher, option) {\n    super();\n    this.timeOut_ms = 10 * 1000; //ミリsec\n\n    this.isSleep = false;\n    /**\n     * 無操作タイマーをリセットし、再度カウントを開始する。\n     * @param e\n     */\n\n    this.resetTimer = (e = null) => {\n      this.stopTimer();\n      this.wakeup();\n      this.sleepTimerID = setTimeout(this.sleep, this.timeOut_ms);\n    };\n\n    this.sleep = () => {\n      if (this.isSleep) return;\n      this.dispatchEvent(new _SleepEvent__WEBPACK_IMPORTED_MODULE_1__.SleepEvent(_SleepEvent__WEBPACK_IMPORTED_MODULE_1__.SleepEventType.SLEEP));\n      this.isSleep = true;\n    };\n\n    this.wakeup = () => {\n      if (!this.isSleep) return;\n      this.dispatchEvent(new _SleepEvent__WEBPACK_IMPORTED_MODULE_1__.SleepEvent(_SleepEvent__WEBPACK_IMPORTED_MODULE_1__.SleepEventType.WAKEUP));\n      this.isSleep = false;\n    };\n\n    this.pauseTimer = () => {\n      this.stopTimer();\n      this.wakeup();\n      const watcher = this.dragWatcher;\n      watcher.removeEventListener(_DragEvent__WEBPACK_IMPORTED_MODULE_0__.DragEventType.DRAG_START, this.pauseTimer);\n      watcher.addEventListener(_DragEvent__WEBPACK_IMPORTED_MODULE_0__.DragEventType.DRAG_END, this.resumeTimer);\n    };\n\n    this.resumeTimer = () => {\n      this.resetTimer();\n      const watcher = this.dragWatcher;\n      watcher.addEventListener(_DragEvent__WEBPACK_IMPORTED_MODULE_0__.DragEventType.DRAG_START, this.pauseTimer);\n      watcher.removeEventListener(_DragEvent__WEBPACK_IMPORTED_MODULE_0__.DragEventType.DRAG_END, this.resumeTimer);\n    };\n\n    if (!option) option = {};\n    if (option.timeOut_ms != null) this.timeOut_ms = option.timeOut_ms;\n    this.dragWatcher = dragWatcher;\n  }\n\n  stopTimer() {\n    if (this.sleepTimerID == null) return;\n    clearTimeout(this.sleepTimerID);\n    this.sleepTimerID = null;\n  }\n  /**\n   * マウス監視を開始する\n   */\n\n\n  start() {\n    this.stopMouseEventListeners();\n    this.startMouseEventListeners();\n    this.resetTimer();\n  }\n\n  startMouseEventListeners() {\n    const watcher = this.dragWatcher;\n    watcher.addEventListener(_DragEvent__WEBPACK_IMPORTED_MODULE_0__.DragEventType.ZOOM, this.resetTimer);\n    watcher.addEventListener(_DragEvent__WEBPACK_IMPORTED_MODULE_0__.DragEventType.DRAG_START, this.pauseTimer);\n  }\n  /**\n   * マウスの監視を停止する\n   */\n\n\n  stop() {\n    this.stopTimer();\n    this.wakeup();\n    this.stopMouseEventListeners();\n  }\n\n  stopMouseEventListeners() {\n    const watcher = this.dragWatcher;\n    watcher.removeEventListener(_DragEvent__WEBPACK_IMPORTED_MODULE_0__.DragEventType.ZOOM, this.resetTimer);\n    watcher.removeEventListener(_DragEvent__WEBPACK_IMPORTED_MODULE_0__.DragEventType.DRAG_START, this.pauseTimer);\n    watcher.removeEventListener(_DragEvent__WEBPACK_IMPORTED_MODULE_0__.DragEventType.DRAG_END, this.resumeTimer);\n  }\n\n}\n\n//# sourceURL=webpack://threejs-drag-watcher/./esm/SleepWatcher.js?");

/***/ }),

/***/ "./esm/index.js":
/*!**********************!*\
  !*** ./esm/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DragEvent\": () => (/* reexport safe */ _DragEvent__WEBPACK_IMPORTED_MODULE_0__.DragEvent),\n/* harmony export */   \"DragEventType\": () => (/* reexport safe */ _DragEvent__WEBPACK_IMPORTED_MODULE_0__.DragEventType),\n/* harmony export */   \"DragWatcher\": () => (/* reexport safe */ _DragWatcher__WEBPACK_IMPORTED_MODULE_1__.DragWatcher),\n/* harmony export */   \"SleepEvent\": () => (/* reexport safe */ _SleepEvent__WEBPACK_IMPORTED_MODULE_2__.SleepEvent),\n/* harmony export */   \"SleepEventType\": () => (/* reexport safe */ _SleepEvent__WEBPACK_IMPORTED_MODULE_2__.SleepEventType),\n/* harmony export */   \"SleepWatcher\": () => (/* reexport safe */ _SleepWatcher__WEBPACK_IMPORTED_MODULE_3__.SleepWatcher)\n/* harmony export */ });\n/* harmony import */ var _DragEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DragEvent */ \"./esm/DragEvent.js\");\n/* harmony import */ var _DragWatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DragWatcher */ \"./esm/DragWatcher.js\");\n/* harmony import */ var _SleepEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SleepEvent */ \"./esm/SleepEvent.js\");\n/* harmony import */ var _SleepWatcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SleepWatcher */ \"./esm/SleepWatcher.js\");\n\n\n\n\n\n//# sourceURL=webpack://threejs-drag-watcher/./esm/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"demo_viewports": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkthreejs_drag_watcher"] = self["webpackChunkthreejs_drag_watcher"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./demoSrc/demo_viewports.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;