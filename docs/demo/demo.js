/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"demo.js": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./demoSrc/demo.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./bin/DragEvent.js":
/*!**************************!*\
  !*** ./bin/DragEvent.js ***!
  \**************************/
/*! exports provided: DragEvent, DragEventType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DragEvent\", function() { return DragEvent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DragEventType\", function() { return DragEventType; });\nclass DragEvent {\n  constructor(type) {\n    this.type = type;\n  }\n\n}\nvar DragEventType;\n\n(function (DragEventType) {\n  DragEventType[\"DRAG_START\"] = \"THREE_CANVAS_EVENT_DRAG_START\";\n  DragEventType[\"DRAG\"] = \"THREE_CANVAS_EVENT_DRAG\";\n  DragEventType[\"DRAG_END\"] = \"THREE_CANVAS_EVENT_DRAG_END\";\n  DragEventType[\"MOVE\"] = \"THREE_CANVAS_EVENT_MOVE\";\n  DragEventType[\"ZOOM\"] = \"THREE_CANVAS_EVENT_ZOOM\";\n})(DragEventType || (DragEventType = {}));\n\n//# sourceURL=webpack:///./bin/DragEvent.js?");

/***/ }),

/***/ "./bin/DragWatcher.js":
/*!****************************!*\
  !*** ./bin/DragWatcher.js ***!
  \****************************/
/*! exports provided: DragWatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DragWatcher\", function() { return DragWatcher; });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _DragEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DragEvent */ \"./bin/DragEvent.js\");\n/* harmony import */ var raf_ticker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! raf-ticker */ \"./node_modules/raf-ticker/bin/index.js\");\n\n\n\n/**\n * 1.カンバス全体がドラッグされている状態を確認する\n * 2.マウスホイールが操作されている状態を確認する\n * この二つを実行するためのクラスです。\n */\n\nclass DragWatcher extends three__WEBPACK_IMPORTED_MODULE_0__[\"EventDispatcher\"] {\n  constructor(canvas, option) {\n    var _a, _b;\n\n    super();\n    this.isDrag = false;\n    this.hasThrottled = false;\n    this.throttlingTime_ms = 16;\n    this.throttlingDelta = 0;\n\n    this.onDocumentMouseDown = event => {\n      if (this.isDrag) return;\n      this.isDrag = true;\n      this.updatePosition(event);\n      this.dispatchDragEvent(_DragEvent__WEBPACK_IMPORTED_MODULE_1__[\"DragEventType\"].DRAG_START, event);\n    };\n\n    this.onDocumentMouseMove = event => {\n      if (this.hasThrottled) return;\n      this.hasThrottled = true;\n      this.dispatchDragEvent(_DragEvent__WEBPACK_IMPORTED_MODULE_1__[\"DragEventType\"].MOVE, event);\n      if (!this.isDrag) return;\n      this.dispatchDragEvent(_DragEvent__WEBPACK_IMPORTED_MODULE_1__[\"DragEventType\"].DRAG, event);\n      this.updatePosition(event);\n    };\n\n    this.onDocumentMouseLeave = event => {\n      this.onDocumentMouseUp(event);\n    };\n\n    this.onDocumentMouseUp = event => {\n      if (!this.isDrag) return;\n      this.isDrag = false;\n      this.dispatchDragEvent(_DragEvent__WEBPACK_IMPORTED_MODULE_1__[\"DragEventType\"].DRAG_END, event);\n    };\n\n    this.onMouseWheel = e => {\n      const evt = new _DragEvent__WEBPACK_IMPORTED_MODULE_1__[\"DragEvent\"](_DragEvent__WEBPACK_IMPORTED_MODULE_1__[\"DragEventType\"].ZOOM);\n\n      if (e.detail != null) {\n        evt.deltaScroll = e.detail < 0 ? 1 : -1;\n      }\n\n      if (e.wheelDelta != null) {\n        evt.deltaScroll = e.wheelDelta > 0 ? 1 : -1;\n      }\n\n      if (e.deltaY != null) {\n        evt.deltaScroll = e.deltaY > 0 ? 1 : -1;\n      }\n\n      this.dispatchEvent(evt);\n    };\n\n    this.throttlingTime_ms = (_b = (_a = option) === null || _a === void 0 ? void 0 : _a.throttlingTime_ms, _b !== null && _b !== void 0 ? _b : this.throttlingTime_ms);\n    canvas.addEventListener(\"mousemove\", this.onDocumentMouseMove, false);\n    canvas.addEventListener(\"mousedown\", this.onDocumentMouseDown, false);\n    canvas.addEventListener(\"mouseup\", this.onDocumentMouseUp, false);\n    canvas.addEventListener(\"mouseleave\", this.onDocumentMouseLeave, false);\n    canvas.addEventListener(\"wheel\", this.onMouseWheel, false);\n    raf_ticker__WEBPACK_IMPORTED_MODULE_2__[\"RAFTicker\"].addEventListener(raf_ticker__WEBPACK_IMPORTED_MODULE_2__[\"RAFTickerEventType\"].tick, e => {\n      this.throttlingDelta += e.delta;\n      if (this.throttlingDelta < this.throttlingTime_ms) return;\n      this.hasThrottled = false;\n      this.throttlingDelta %= this.throttlingTime_ms;\n    });\n  }\n\n  updatePosition(event) {\n    this.positionX = event.offsetX;\n    this.positionY = event.offsetY;\n  }\n\n  dispatchDragEvent(type, event) {\n    const evt = new _DragEvent__WEBPACK_IMPORTED_MODULE_1__[\"DragEvent\"](type);\n    evt.positionX = event.offsetX;\n    evt.positionY = event.offsetY;\n\n    if (type === _DragEvent__WEBPACK_IMPORTED_MODULE_1__[\"DragEventType\"].DRAG) {\n      evt.deltaX = event.offsetX - this.positionX;\n      evt.deltaY = event.offsetY - this.positionY;\n    }\n\n    this.dispatchEvent(evt);\n  }\n\n}\n\n//# sourceURL=webpack:///./bin/DragWatcher.js?");

/***/ }),

/***/ "./bin/SleepEvent.js":
/*!***************************!*\
  !*** ./bin/SleepEvent.js ***!
  \***************************/
/*! exports provided: SleepEventType, SleepEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SleepEventType\", function() { return SleepEventType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SleepEvent\", function() { return SleepEvent; });\nvar SleepEventType;\n\n(function (SleepEventType) {\n  SleepEventType[\"SLEEP\"] = \"SLEEP_EVENT_TYPE_SLEEP\";\n  SleepEventType[\"WAKEUP\"] = \"SLEEP_EVENT_TYPE_WAKEUP\";\n})(SleepEventType || (SleepEventType = {}));\n\nclass SleepEvent {\n  constructor(type) {\n    this.type = type;\n  }\n\n}\n\n//# sourceURL=webpack:///./bin/SleepEvent.js?");

/***/ }),

/***/ "./bin/SleepWatcher.js":
/*!*****************************!*\
  !*** ./bin/SleepWatcher.js ***!
  \*****************************/
/*! exports provided: SleepWatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SleepWatcher\", function() { return SleepWatcher; });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _SleepEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SleepEvent */ \"./bin/SleepEvent.js\");\n/* harmony import */ var _DragEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DragEvent */ \"./bin/DragEvent.js\");\n\n\n\nclass SleepWatcher extends three__WEBPACK_IMPORTED_MODULE_0__[\"EventDispatcher\"] {\n  constructor(dragWatcher, option) {\n    super();\n    this.timeOut_ms = 10 * 1000; //ミリsec\n\n    this.isSleep = false;\n    /**\n     * 無操作タイマーをリセットし、再度カウントを開始する。\n     * @param e\n     */\n\n    this.resetTimer = (e = null) => {\n      this.stopTimer();\n      this.wakeup();\n      this.sleepTimerID = setTimeout(this.sleep, this.timeOut_ms);\n    };\n\n    this.sleep = () => {\n      if (this.isSleep) return;\n      this.dispatchEvent(new _SleepEvent__WEBPACK_IMPORTED_MODULE_1__[\"SleepEvent\"](_SleepEvent__WEBPACK_IMPORTED_MODULE_1__[\"SleepEventType\"].SLEEP));\n      this.isSleep = true;\n    };\n\n    this.wakeup = () => {\n      if (!this.isSleep) return;\n      this.dispatchEvent(new _SleepEvent__WEBPACK_IMPORTED_MODULE_1__[\"SleepEvent\"](_SleepEvent__WEBPACK_IMPORTED_MODULE_1__[\"SleepEventType\"].WAKEUP));\n      this.isSleep = false;\n    };\n\n    if (!option) option = {};\n    if (option.timeOut_ms != null) this.timeOut_ms = option.timeOut_ms;\n    this.dragWatcher = dragWatcher;\n  }\n\n  stopTimer() {\n    if (this.sleepTimerID == null) return;\n    clearTimeout(this.sleepTimerID);\n    this.sleepTimerID = null;\n  }\n  /**\n   * マウス監視を開始する\n   */\n\n\n  start() {\n    this.stopMouseEventListeners();\n    this.startMouseEventListeners();\n    this.resetTimer();\n  }\n  /**\n   * マウスの監視を停止する\n   */\n\n\n  stop() {\n    this.stopTimer();\n    this.wakeup();\n    this.stopMouseEventListeners();\n  }\n\n  stopMouseEventListeners() {\n    const watcher = this.dragWatcher;\n    watcher.removeEventListener(_DragEvent__WEBPACK_IMPORTED_MODULE_2__[\"DragEventType\"].DRAG, this.resetTimer);\n    watcher.removeEventListener(_DragEvent__WEBPACK_IMPORTED_MODULE_2__[\"DragEventType\"].DRAG_START, this.resetTimer);\n    watcher.removeEventListener(_DragEvent__WEBPACK_IMPORTED_MODULE_2__[\"DragEventType\"].DRAG_END, this.resetTimer);\n    watcher.removeEventListener(_DragEvent__WEBPACK_IMPORTED_MODULE_2__[\"DragEventType\"].ZOOM, this.resetTimer);\n  }\n\n  startMouseEventListeners() {\n    const watcher = this.dragWatcher;\n    watcher.addEventListener(_DragEvent__WEBPACK_IMPORTED_MODULE_2__[\"DragEventType\"].DRAG, this.resetTimer);\n    watcher.addEventListener(_DragEvent__WEBPACK_IMPORTED_MODULE_2__[\"DragEventType\"].DRAG_START, this.resetTimer);\n    watcher.addEventListener(_DragEvent__WEBPACK_IMPORTED_MODULE_2__[\"DragEventType\"].DRAG_END, this.resetTimer);\n    watcher.addEventListener(_DragEvent__WEBPACK_IMPORTED_MODULE_2__[\"DragEventType\"].ZOOM, this.resetTimer);\n  }\n\n}\n\n//# sourceURL=webpack:///./bin/SleepWatcher.js?");

/***/ }),

/***/ "./bin/index.js":
/*!**********************!*\
  !*** ./bin/index.js ***!
  \**********************/
/*! exports provided: SleepEventType, SleepEvent, DragEvent, DragEventType, DragWatcher, SleepWatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DragEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DragEvent */ \"./bin/DragEvent.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"DragEvent\", function() { return _DragEvent__WEBPACK_IMPORTED_MODULE_0__[\"DragEvent\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"DragEventType\", function() { return _DragEvent__WEBPACK_IMPORTED_MODULE_0__[\"DragEventType\"]; });\n\n/* harmony import */ var _DragWatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DragWatcher */ \"./bin/DragWatcher.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"DragWatcher\", function() { return _DragWatcher__WEBPACK_IMPORTED_MODULE_1__[\"DragWatcher\"]; });\n\n/* harmony import */ var _SleepEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SleepEvent */ \"./bin/SleepEvent.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SleepEventType\", function() { return _SleepEvent__WEBPACK_IMPORTED_MODULE_2__[\"SleepEventType\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SleepEvent\", function() { return _SleepEvent__WEBPACK_IMPORTED_MODULE_2__[\"SleepEvent\"]; });\n\n/* harmony import */ var _SleepWatcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SleepWatcher */ \"./bin/SleepWatcher.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SleepWatcher\", function() { return _SleepWatcher__WEBPACK_IMPORTED_MODULE_3__[\"SleepWatcher\"]; });\n\n\n\n\n\n\n//# sourceURL=webpack:///./bin/index.js?");

/***/ }),

/***/ "./demoSrc/demo.js":
/*!*************************!*\
  !*** ./demoSrc/demo.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../bin */ \"./bin/index.js\");\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _bin_SleepEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bin/SleepEvent */ \"./bin/SleepEvent.js\");\n\n\n\n\nconst W = 1920;\nconst H = 1080;\n\nconst onDomContentsLoaded = () => {\n  // シーンを作成\n  const scene = new three__WEBPACK_IMPORTED_MODULE_1__[\"Scene\"]();\n  const camera = new three__WEBPACK_IMPORTED_MODULE_1__[\"PerspectiveCamera\"](45, W / H, 1, 10000);\n  camera.position.set(0, 0, 1000);\n  scene.add(camera);\n  const renderOption = {\n    canvas: document.getElementById(\"webgl-canvas\"),\n    antialias: true\n  };\n  const renderer = new three__WEBPACK_IMPORTED_MODULE_1__[\"WebGLRenderer\"](renderOption);\n  renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__[\"Color\"](0x000000));\n  renderer.setSize(W, H);\n  renderer.setPixelRatio(window.devicePixelRatio); //平行光源オブジェクト(light)の設定\n\n  const ambientLight = new three__WEBPACK_IMPORTED_MODULE_1__[\"AmbientLight\"](0xffffff, 1.0);\n  scene.add(ambientLight);\n  renderer.render(scene, camera); //ドラッグ監視処理を開始\n\n  const watcher = new _bin__WEBPACK_IMPORTED_MODULE_0__[\"DragWatcher\"](renderer.domElement);\n  watcher.addEventListener(_bin__WEBPACK_IMPORTED_MODULE_0__[\"DragEventType\"].DRAG, e => {\n    console.log(watcher.throttlingTime_ms, performance.now(), e);\n  });\n  watcher.addEventListener(_bin__WEBPACK_IMPORTED_MODULE_0__[\"DragEventType\"].DRAG_START, e => {\n    console.log(e);\n  });\n  watcher.addEventListener(_bin__WEBPACK_IMPORTED_MODULE_0__[\"DragEventType\"].DRAG_END, e => {\n    console.log(e);\n  });\n  watcher.addEventListener(_bin__WEBPACK_IMPORTED_MODULE_0__[\"DragEventType\"].ZOOM, e => {\n    console.log(e);\n  });\n  const sleepWatcher = new _bin__WEBPACK_IMPORTED_MODULE_0__[\"SleepWatcher\"](watcher, {\n    timeOut_ms: 2 * 1000\n  });\n  sleepWatcher.addEventListener(_bin_SleepEvent__WEBPACK_IMPORTED_MODULE_2__[\"SleepEventType\"].SLEEP, e => {\n    console.log(e);\n  });\n  sleepWatcher.addEventListener(_bin_SleepEvent__WEBPACK_IMPORTED_MODULE_2__[\"SleepEventType\"].WAKEUP, e => {\n    console.log(e);\n  });\n  sleepWatcher.start();\n};\n/**\n * DOMContentLoaded以降に初期化処理を実行する\n */\n\n\nwindow.onload = onDomContentsLoaded;\n\n//# sourceURL=webpack:///./demoSrc/demo.js?");

/***/ })

/******/ });