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
/******/ 		"demo": 0
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

/***/ "./demoSrc/demo.js":
/*!*************************!*\
  !*** ./demoSrc/demo.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ \"./lib/index.js\");\n/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\n\nconst W = 1920;\nconst H = 1080;\n\nconst onDomContentsLoaded = () => {\n  // シーンを作成\n  const scene = new three__WEBPACK_IMPORTED_MODULE_1__[\"Scene\"]();\n  const camera = new three__WEBPACK_IMPORTED_MODULE_1__[\"PerspectiveCamera\"](45, W / H, 1, 10000);\n  camera.position.set(0, 0, 1000);\n  scene.add(camera);\n  const renderOption = {\n    canvas: document.getElementById(\"webgl-canvas\"),\n    antialias: true\n  };\n  const renderer = new three__WEBPACK_IMPORTED_MODULE_1__[\"WebGLRenderer\"](renderOption);\n  renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__[\"Color\"](0x000000));\n  renderer.setSize(W, H);\n  renderer.setPixelRatio(window.devicePixelRatio); //平行光源オブジェクト(light)の設定\n\n  const ambientLight = new three__WEBPACK_IMPORTED_MODULE_1__[\"AmbientLight\"](0xffffff, 1.0);\n  scene.add(ambientLight);\n  renderer.render(scene, camera); //ドラッグ監視処理を開始\n\n  const watcher = new _lib__WEBPACK_IMPORTED_MODULE_0__[\"DragWatcher\"](renderer.domElement);\n  watcher.addEventListener(_lib__WEBPACK_IMPORTED_MODULE_0__[\"DragEventType\"].DRAG, e => {\n    console.log(`throttlingTime_ms : ${watcher.throttlingTime_ms}`, `TimeStamp : ${performance.now()}`, e);\n  });\n  watcher.addEventListener(_lib__WEBPACK_IMPORTED_MODULE_0__[\"DragEventType\"].DRAG_START, e => {\n    console.log(e);\n  });\n  watcher.addEventListener(_lib__WEBPACK_IMPORTED_MODULE_0__[\"DragEventType\"].DRAG_END, e => {\n    console.log(e);\n  });\n  watcher.addEventListener(_lib__WEBPACK_IMPORTED_MODULE_0__[\"DragEventType\"].ZOOM, e => {\n    console.log(e);\n  });\n  const sleepWatcher = new _lib__WEBPACK_IMPORTED_MODULE_0__[\"SleepWatcher\"](watcher, {\n    timeOut_ms: 2 * 1000\n  });\n  sleepWatcher.addEventListener(_lib__WEBPACK_IMPORTED_MODULE_0__[\"SleepEventType\"].SLEEP, e => {\n    console.log(e);\n  });\n  sleepWatcher.addEventListener(_lib__WEBPACK_IMPORTED_MODULE_0__[\"SleepEventType\"].WAKEUP, e => {\n    console.log(e);\n  });\n  sleepWatcher.start();\n};\n/**\n * DOMContentLoaded以降に初期化処理を実行する\n */\n\n\nwindow.onload = onDomContentsLoaded;\n\n//# sourceURL=webpack:///./demoSrc/demo.js?");

/***/ }),

/***/ "./lib/DragEvent.js":
/*!**************************!*\
  !*** ./lib/DragEvent.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.DragEventType = exports.DragEvent = void 0;\n\nvar DragEvent =\n/** @class */\nfunction () {\n  function DragEvent(type) {\n    this.type = type;\n  }\n\n  return DragEvent;\n}();\n\nexports.DragEvent = DragEvent;\nvar DragEventType;\n\n(function (DragEventType) {\n  DragEventType[\"DRAG_START\"] = \"THREE_CANVAS_EVENT_DRAG_START\";\n  DragEventType[\"DRAG\"] = \"THREE_CANVAS_EVENT_DRAG\";\n  DragEventType[\"DRAG_END\"] = \"THREE_CANVAS_EVENT_DRAG_END\";\n  DragEventType[\"MOVE\"] = \"THREE_CANVAS_EVENT_MOVE\";\n  DragEventType[\"ZOOM\"] = \"THREE_CANVAS_EVENT_ZOOM\";\n})(DragEventType = exports.DragEventType || (exports.DragEventType = {}));\n\n//# sourceURL=webpack:///./lib/DragEvent.js?");

/***/ }),

/***/ "./lib/DragWatcher.js":
/*!****************************!*\
  !*** ./lib/DragWatcher.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __extends = this && this.__extends || function () {\n  var extendStatics = function (d, b) {\n    extendStatics = Object.setPrototypeOf || {\n      __proto__: []\n    } instanceof Array && function (d, b) {\n      d.__proto__ = b;\n    } || function (d, b) {\n      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];\n    };\n\n    return extendStatics(d, b);\n  };\n\n  return function (d, b) {\n    extendStatics(d, b);\n\n    function __() {\n      this.constructor = d;\n    }\n\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n  };\n}();\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.DragWatcher = void 0;\n\nvar raf_ticker_1 = __webpack_require__(/*! raf-ticker */ \"./node_modules/raf-ticker/esm/index.js\");\n\nvar three_1 = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nvar DragEvent_1 = __webpack_require__(/*! ./DragEvent */ \"./lib/DragEvent.js\");\n/**\n * 1.カンバス全体がドラッグされている状態を確認する\n * 2.マウスホイールが操作されている状態を確認する\n * この二つを実行するためのクラスです。\n */\n\n\nvar DragWatcher =\n/** @class */\nfunction (_super) {\n  __extends(DragWatcher, _super);\n\n  function DragWatcher(canvas, option) {\n    var _a;\n\n    var _this = _super.call(this) || this;\n\n    _this.isDrag = false;\n    _this.hasThrottled = false;\n    _this.throttlingTime_ms = 16;\n    _this.throttlingDelta = 0;\n\n    _this.onDocumentMouseDown = function (event) {\n      if (_this.isDrag) return;\n      _this.isDrag = true;\n\n      _this.updatePosition(event);\n\n      _this.dispatchDragEvent(DragEvent_1.DragEventType.DRAG_START, event);\n    };\n\n    _this.onDocumentMouseMove = function (event) {\n      if (_this.hasThrottled) return;\n      _this.hasThrottled = true;\n\n      _this.dispatchDragEvent(DragEvent_1.DragEventType.MOVE, event);\n\n      if (!_this.isDrag) return;\n\n      _this.dispatchDragEvent(DragEvent_1.DragEventType.DRAG, event);\n\n      _this.updatePosition(event);\n    };\n\n    _this.onDocumentMouseLeave = function (event) {\n      _this.onDocumentMouseUp(event);\n    };\n\n    _this.onDocumentMouseUp = function (event) {\n      if (!_this.isDrag) return;\n      _this.isDrag = false;\n\n      _this.dispatchDragEvent(DragEvent_1.DragEventType.DRAG_END, event);\n    };\n\n    _this.onMouseWheel = function (e) {\n      var evt = new DragEvent_1.DragEvent(DragEvent_1.DragEventType.ZOOM);\n\n      if (e.detail != null) {\n        evt.deltaScroll = e.detail < 0 ? 1 : -1;\n      }\n\n      if (e.wheelDelta != null) {\n        evt.deltaScroll = e.wheelDelta > 0 ? 1 : -1;\n      }\n\n      if (e.deltaY != null) {\n        evt.deltaScroll = e.deltaY > 0 ? 1 : -1;\n      }\n\n      _this.dispatchEvent(evt);\n    };\n\n    _this.throttlingTime_ms = (_a = option === null || option === void 0 ? void 0 : option.throttlingTime_ms) !== null && _a !== void 0 ? _a : _this.throttlingTime_ms;\n    canvas.addEventListener(\"mousemove\", _this.onDocumentMouseMove, false);\n    canvas.addEventListener(\"mousedown\", _this.onDocumentMouseDown, false);\n    canvas.addEventListener(\"mouseup\", _this.onDocumentMouseUp, false);\n    canvas.addEventListener(\"mouseleave\", _this.onDocumentMouseLeave, false);\n    canvas.addEventListener(\"wheel\", _this.onMouseWheel, false);\n    raf_ticker_1.RAFTicker.on(raf_ticker_1.RAFTickerEventType.tick, function (e) {\n      _this.throttlingDelta += e.delta;\n      if (_this.throttlingDelta < _this.throttlingTime_ms) return;\n      _this.hasThrottled = false;\n      _this.throttlingDelta %= _this.throttlingTime_ms;\n    });\n    return _this;\n  }\n\n  DragWatcher.prototype.updatePosition = function (event) {\n    this.positionX = event.offsetX;\n    this.positionY = event.offsetY;\n  };\n\n  DragWatcher.prototype.dispatchDragEvent = function (type, event) {\n    var evt = new DragEvent_1.DragEvent(type);\n    evt.positionX = event.offsetX;\n    evt.positionY = event.offsetY;\n\n    if (type === DragEvent_1.DragEventType.DRAG) {\n      evt.deltaX = event.offsetX - this.positionX;\n      evt.deltaY = event.offsetY - this.positionY;\n    }\n\n    this.dispatchEvent(evt);\n  };\n\n  return DragWatcher;\n}(three_1.EventDispatcher);\n\nexports.DragWatcher = DragWatcher;\n\n//# sourceURL=webpack:///./lib/DragWatcher.js?");

/***/ }),

/***/ "./lib/SleepEvent.js":
/*!***************************!*\
  !*** ./lib/SleepEvent.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.SleepEvent = exports.SleepEventType = void 0;\nvar SleepEventType;\n\n(function (SleepEventType) {\n  SleepEventType[\"SLEEP\"] = \"SLEEP_EVENT_TYPE_SLEEP\";\n  SleepEventType[\"WAKEUP\"] = \"SLEEP_EVENT_TYPE_WAKEUP\";\n})(SleepEventType = exports.SleepEventType || (exports.SleepEventType = {}));\n\nvar SleepEvent =\n/** @class */\nfunction () {\n  function SleepEvent(type) {\n    this.type = type;\n  }\n\n  return SleepEvent;\n}();\n\nexports.SleepEvent = SleepEvent;\n\n//# sourceURL=webpack:///./lib/SleepEvent.js?");

/***/ }),

/***/ "./lib/SleepWatcher.js":
/*!*****************************!*\
  !*** ./lib/SleepWatcher.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __extends = this && this.__extends || function () {\n  var extendStatics = function (d, b) {\n    extendStatics = Object.setPrototypeOf || {\n      __proto__: []\n    } instanceof Array && function (d, b) {\n      d.__proto__ = b;\n    } || function (d, b) {\n      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];\n    };\n\n    return extendStatics(d, b);\n  };\n\n  return function (d, b) {\n    extendStatics(d, b);\n\n    function __() {\n      this.constructor = d;\n    }\n\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n  };\n}();\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.SleepWatcher = void 0;\n\nvar three_1 = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nvar DragEvent_1 = __webpack_require__(/*! ./DragEvent */ \"./lib/DragEvent.js\");\n\nvar SleepEvent_1 = __webpack_require__(/*! ./SleepEvent */ \"./lib/SleepEvent.js\");\n\nvar SleepWatcher =\n/** @class */\nfunction (_super) {\n  __extends(SleepWatcher, _super);\n\n  function SleepWatcher(dragWatcher, option) {\n    var _this = _super.call(this) || this;\n\n    _this.timeOut_ms = 10 * 1000; //ミリsec\n\n    _this.isSleep = false;\n    /**\n     * 無操作タイマーをリセットし、再度カウントを開始する。\n     * @param e\n     */\n\n    _this.resetTimer = function (e) {\n      if (e === void 0) {\n        e = null;\n      }\n\n      _this.stopTimer();\n\n      _this.wakeup();\n\n      _this.sleepTimerID = setTimeout(_this.sleep, _this.timeOut_ms);\n    };\n\n    _this.sleep = function () {\n      if (_this.isSleep) return;\n\n      _this.dispatchEvent(new SleepEvent_1.SleepEvent(SleepEvent_1.SleepEventType.SLEEP));\n\n      _this.isSleep = true;\n    };\n\n    _this.wakeup = function () {\n      if (!_this.isSleep) return;\n\n      _this.dispatchEvent(new SleepEvent_1.SleepEvent(SleepEvent_1.SleepEventType.WAKEUP));\n\n      _this.isSleep = false;\n    };\n\n    if (!option) option = {};\n    if (option.timeOut_ms != null) _this.timeOut_ms = option.timeOut_ms;\n    _this.dragWatcher = dragWatcher;\n    return _this;\n  }\n\n  SleepWatcher.prototype.stopTimer = function () {\n    if (this.sleepTimerID == null) return;\n    clearTimeout(this.sleepTimerID);\n    this.sleepTimerID = null;\n  };\n  /**\n   * マウス監視を開始する\n   */\n\n\n  SleepWatcher.prototype.start = function () {\n    this.stopMouseEventListeners();\n    this.startMouseEventListeners();\n    this.resetTimer();\n  };\n  /**\n   * マウスの監視を停止する\n   */\n\n\n  SleepWatcher.prototype.stop = function () {\n    this.stopTimer();\n    this.wakeup();\n    this.stopMouseEventListeners();\n  };\n\n  SleepWatcher.prototype.stopMouseEventListeners = function () {\n    this.switchMouseEventListeners(false);\n  };\n\n  SleepWatcher.prototype.startMouseEventListeners = function () {\n    this.switchMouseEventListeners(true);\n  };\n\n  SleepWatcher.prototype.switchMouseEventListeners = function (isAddListener) {\n    var _this = this;\n\n    var watcher = this.dragWatcher;\n    [DragEvent_1.DragEventType.DRAG, DragEvent_1.DragEventType.DRAG_START, DragEvent_1.DragEventType.DRAG_END, DragEvent_1.DragEventType.ZOOM].forEach(function (type) {\n      if (isAddListener) {\n        watcher.addEventListener(type, _this.resetTimer);\n      } else {\n        watcher.removeEventListener(type, _this.resetTimer);\n      }\n    });\n  };\n\n  return SleepWatcher;\n}(three_1.EventDispatcher);\n\nexports.SleepWatcher = SleepWatcher;\n\n//# sourceURL=webpack:///./lib/SleepWatcher.js?");

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  Object.defineProperty(o, k2, {\n    enumerable: true,\n    get: function () {\n      return m[k];\n    }\n  });\n} : function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  o[k2] = m[k];\n});\n\nvar __exportStar = this && this.__exportStar || function (m, exports) {\n  for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\n__exportStar(__webpack_require__(/*! ./DragEvent */ \"./lib/DragEvent.js\"), exports);\n\n__exportStar(__webpack_require__(/*! ./DragWatcher */ \"./lib/DragWatcher.js\"), exports);\n\n__exportStar(__webpack_require__(/*! ./SleepEvent */ \"./lib/SleepEvent.js\"), exports);\n\n__exportStar(__webpack_require__(/*! ./SleepWatcher */ \"./lib/SleepWatcher.js\"), exports);\n\n//# sourceURL=webpack:///./lib/index.js?");

/***/ })

/******/ });