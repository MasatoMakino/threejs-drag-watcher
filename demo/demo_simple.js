(()=>{"use strict";var __webpack_modules__={891:(__unused_webpack___webpack_module__,__unused_webpack___webpack_exports__,__webpack_require__)=>{eval('\n// EXTERNAL MODULE: ./node_modules/@masatomakino/raf-ticker/esm/index.js + 2 modules\nvar esm = __webpack_require__(961);\n// EXTERNAL MODULE: ./node_modules/eventemitter3/index.mjs\nvar eventemitter3 = __webpack_require__(486);\n;// CONCATENATED MODULE: ./esm/DragWatcher.js\n\n\n/**\n * 1.カンバス全体がドラッグされている状態を確認する\n * 2.マウスホイールが操作されている状態を確認する\n * この二つを実行するためのクラスです。\n */\nclass DragWatcher extends eventemitter3/* default */.A {\n  constructor(canvas, option) {\n    super();\n    this.isDrag = false;\n    this.hasThrottled = false;\n    this.throttlingTime_ms = 16;\n    this.throttlingDelta = 0;\n    this.onTick = e => {\n      this.throttlingDelta += e.delta;\n      if (this.throttlingDelta < this.throttlingTime_ms) return;\n      this.hasThrottled = false;\n      this.throttlingDelta %= this.throttlingTime_ms;\n    };\n    this.onDocumentMouseDown = event => {\n      if (this.isDrag) return;\n      if (!this.isContain(event)) return;\n      this.isDrag = true;\n      this.updatePosition(event);\n      this.dispatchDragEvent("drag_start", event);\n    };\n    this.onDocumentMouseMove = event => {\n      if (this.hasThrottled) return;\n      this.hasThrottled = true;\n      this.dispatchDragEvent("move", event);\n      if (!this.isDrag) return;\n      this.dispatchDragEvent("drag", event);\n      this.updatePosition(event);\n    };\n    this.onDocumentMouseLeave = event => {\n      this.onDocumentMouseUp(event);\n    };\n    this.onDocumentMouseUp = event => {\n      if (!this.isDrag) return;\n      this.isDrag = false;\n      this.dispatchDragEvent("drag_end", event);\n    };\n    this.onMouseWheel = e => {\n      const evt = {\n        type: "zoom"\n      };\n      if (e.detail != null) {\n        evt.deltaScroll = e.detail < 0 ? 1 : -1;\n      }\n      if (e.wheelDelta != null) {\n        evt.deltaScroll = e.wheelDelta > 0 ? 1 : -1;\n      }\n      if (e.deltaY != null) {\n        evt.deltaScroll = e.deltaY > 0 ? 1 : -1;\n      }\n      this.emit(evt.type, evt);\n    };\n    if (option?.throttlingTime_ms != null) {\n      this.throttlingTime_ms = option.throttlingTime_ms;\n    }\n    this.viewport ??= option?.viewport;\n    this.canvas = canvas;\n    this.canvas.addEventListener("pointermove", this.onDocumentMouseMove, false);\n    this.canvas.addEventListener("pointerdown", this.onDocumentMouseDown, false);\n    this.canvas.addEventListener("pointerup", this.onDocumentMouseUp, false);\n    this.canvas.addEventListener("pointerleave", this.onDocumentMouseLeave, false);\n    this.canvas.addEventListener("wheel", this.onMouseWheel, false);\n    esm/* RAFTicker */.w.on("tick", this.onTick);\n  }\n  updatePosition(event) {\n    this.positionX = event.offsetX;\n    this.positionY = event.offsetY;\n  }\n  dispatchDragEvent(type, event) {\n    const evt = {\n      type\n    };\n    const {\n      x,\n      y\n    } = this.convertToLocalMousePoint(event);\n    evt.positionX = x;\n    evt.positionY = y;\n    if (type === "drag") {\n      evt.deltaX = event.offsetX - this.positionX;\n      evt.deltaY = event.offsetY - this.positionY;\n    }\n    this.emit(type, evt);\n  }\n  convertToLocalMousePoint(e) {\n    if (!this.viewport) {\n      return {\n        x: e.offsetX,\n        y: e.offsetY\n      };\n    } else {\n      const rect = DragWatcher.convertToRect(this.canvas, this.viewport);\n      return {\n        x: e.offsetX - rect.x1,\n        y: e.offsetY - rect.y1\n      };\n    }\n  }\n  /**\n   * マウスポインタがviewport内に収まっているか否か\n   * @param event\n   * @private\n   */\n  isContain(event) {\n    if (!this.viewport) return true;\n    const rect = DragWatcher.convertToRect(this.canvas, this.viewport);\n    return event.offsetX >= rect.x1 && event.offsetX <= rect.x2 && event.offsetY >= rect.y1 && event.offsetY <= rect.y2;\n  }\n  static convertToRect(canvas, viewport) {\n    let height = 0;\n    if (canvas.style.width != null && canvas.style.height) {\n      height = parseInt(canvas.style.height);\n    } else {\n      height = canvas.height / window.devicePixelRatio;\n    }\n    return {\n      x1: viewport.x,\n      x2: viewport.x + viewport.width,\n      y1: height - (viewport.y + viewport.height),\n      y2: height - viewport.y\n    };\n  }\n  dispose() {\n    this.canvas.removeEventListener("pointermove", this.onDocumentMouseMove, false);\n    this.canvas.removeEventListener("pointerdown", this.onDocumentMouseDown, false);\n    this.canvas.removeEventListener("pointerup", this.onDocumentMouseUp, false);\n    this.canvas.removeEventListener("pointerleave", this.onDocumentMouseLeave, false);\n    esm/* RAFTicker */.w.off("tick", this.onTick);\n  }\n}\n;// CONCATENATED MODULE: ./esm/SleepWatcher.js\n\nclass SleepWatcher extends eventemitter3/* default */.A {\n  constructor(dragWatcher, option) {\n    super();\n    this.dragWatcher = dragWatcher;\n    this.timeOut_ms = 10 * 1000; //ミリsec\n    this.isSleep = false;\n    /**\n     * 無操作タイマーをリセットし、再度カウントを開始する。\n     */\n    this.restart = () => {\n      this.stopTimer();\n      this.wakeup();\n      this.sleepTimerID = window.setTimeout(this.sleep, this.timeOut_ms);\n    };\n    this.sleep = () => {\n      if (this.isSleep) return;\n      this.emit("sleep", {\n        type: "sleep"\n      });\n      this.isSleep = true;\n    };\n    this.wakeup = () => {\n      if (!this.isSleep) return;\n      this.emit("wakeup", {\n        type: "wakeup"\n      });\n      this.isSleep = false;\n    };\n    this.pauseTimer = () => {\n      this.stopTimer();\n      this.wakeup();\n      const watcher = this.dragWatcher;\n      watcher.off("drag_start", this.pauseTimer);\n      watcher.on("drag_end", this.resumeTimer);\n    };\n    this.resumeTimer = () => {\n      this.restart();\n      const watcher = this.dragWatcher;\n      watcher.on("drag_start", this.pauseTimer);\n      watcher.off("drag_end", this.resumeTimer);\n    };\n    if (!option) option = {};\n    if (option.timeOut_ms != null) this.timeOut_ms = option.timeOut_ms;\n  }\n  /**\n   * 無操作タイマーをリセットし、再度カウントを開始する。\n   * @deprecated This method will be removed in v0.13.0. Please use restart() instead.\n   */\n  reset() {\n    this.restart();\n  }\n  stopTimer() {\n    if (this.sleepTimerID == null) return;\n    clearTimeout(this.sleepTimerID);\n    this.sleepTimerID = undefined;\n  }\n  /**\n   * マウス監視を開始する\n   */\n  start() {\n    this.stopMouseEventListeners();\n    this.startMouseEventListeners();\n    this.restart();\n  }\n  startMouseEventListeners() {\n    const watcher = this.dragWatcher;\n    watcher.on("zoom", this.restart);\n    watcher.on("drag_start", this.pauseTimer);\n  }\n  /**\n   * マウスの監視を停止する\n   */\n  stop() {\n    this.stopTimer();\n    this.wakeup();\n    this.stopMouseEventListeners();\n  }\n  stopMouseEventListeners() {\n    const watcher = this.dragWatcher;\n    watcher.off("zoom", this.restart);\n    watcher.off("drag_start", this.pauseTimer);\n    watcher.off("drag_end", this.resumeTimer);\n  }\n}\n;// CONCATENATED MODULE: ./esm/index.js\n\n\n\n\n// EXTERNAL MODULE: ./node_modules/three/build/three.module.js\nvar three_module = __webpack_require__(753);\n;// CONCATENATED MODULE: ./demoSrc/demo_simple.js\n\n\nconst W = 1280;\nconst H = 640;\nconst onDomContentsLoaded = () => {\n  // シーンを作成\n  const scene = new three_module/* Scene */.Z58();\n  const camera = new three_module/* PerspectiveCamera */.ubm(45, W / H, 1, 10000);\n  camera.position.set(0, 0, 1000);\n  scene.add(camera);\n  const renderOption = {\n    canvas: document.getElementById("webgl-canvas")\n  };\n  const renderer = new three_module/* WebGLRenderer */.JeP(renderOption);\n  renderer.setClearColor(new three_module/* Color */.Q1f(0x000000));\n  renderer.setSize(W, H);\n  renderer.setPixelRatio(window.devicePixelRatio);\n\n  //平行光源オブジェクト(light)の設定\n  const ambientLight = new three_module/* AmbientLight */.$p8(0xffffff, 1.0);\n  scene.add(ambientLight);\n  renderer.render(scene, camera);\n\n  //ドラッグ監視処理を開始\n  const watcher = new DragWatcher(renderer.domElement);\n  watcher.on("drag", e => {\n    console.log(`throttlingTime_ms : ${watcher.throttlingTime_ms}`, `TimeStamp : ${performance.now()}`, e);\n  });\n  watcher.on("drag_start", e => {\n    console.log(e);\n  });\n  watcher.on("drag_end", e => {\n    console.log(e);\n  });\n  watcher.on("zoom", e => {\n    console.log(e);\n  });\n  const sleepWatcher = new SleepWatcher(watcher, {\n    timeOut_ms: 2 * 1000\n  });\n  sleepWatcher.on("sleep", e => {\n    console.log(e);\n  });\n  sleepWatcher.on("wakeup", e => {\n    console.log(e);\n  });\n  sleepWatcher.start();\n};\n\n/**\n * DOMContentLoaded以降に初期化処理を実行する\n */\nwindow.onload = onDomContentsLoaded;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDdEIsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQXJCLE1BQU0sQ0FBQ3NELE1BQU0sR0FBRzFCLG1CQUFtQiIsInNvdXJjZXMiOlsid2VicGFjazovL0BtYXNhdG9tYWtpbm8vdGhyZWVqcy1kcmFnLXdhdGNoZXIvLi9lc20vRHJhZ1dhdGNoZXIuanM/ZDRiOSIsIndlYnBhY2s6Ly9AbWFzYXRvbWFraW5vL3RocmVlanMtZHJhZy13YXRjaGVyLy4vZXNtL1NsZWVwV2F0Y2hlci5qcz9mM2QxIiwid2VicGFjazovL0BtYXNhdG9tYWtpbm8vdGhyZWVqcy1kcmFnLXdhdGNoZXIvLi9lc20vaW5kZXguanM/YjIzOSIsIndlYnBhY2s6Ly9AbWFzYXRvbWFraW5vL3RocmVlanMtZHJhZy13YXRjaGVyLy4vZGVtb1NyYy9kZW1vX3NpbXBsZS5qcz9mOTlmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJBRlRpY2tlciB9IGZyb20gXCJAbWFzYXRvbWFraW5vL3JhZi10aWNrZXJcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImV2ZW50ZW1pdHRlcjNcIjtcbi8qKlxuICogMS7jgqvjg7Pjg5DjgrnlhajkvZPjgYzjg4njg6njg4PjgrDjgZXjgozjgabjgYTjgovnirbmhYvjgpLnorroqo3jgZnjgotcbiAqIDIu44Oe44Km44K544Ob44Kk44O844Or44GM5pON5L2c44GV44KM44Gm44GE44KL54q25oWL44KS56K66KqN44GZ44KLXG4gKiDjgZPjga7kuozjgaTjgpLlrp/ooYzjgZnjgovjgZ/jgoHjga7jgq/jg6njgrnjgafjgZnjgIJcbiAqL1xuZXhwb3J0IGNsYXNzIERyYWdXYXRjaGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMsIG9wdGlvbikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmlzRHJhZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhhc1Rocm90dGxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRocm90dGxpbmdUaW1lX21zID0gMTY7XG4gICAgICAgIHRoaXMudGhyb3R0bGluZ0RlbHRhID0gMDtcbiAgICAgICAgdGhpcy5vblRpY2sgPSAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy50aHJvdHRsaW5nRGVsdGEgKz0gZS5kZWx0YTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRocm90dGxpbmdEZWx0YSA8IHRoaXMudGhyb3R0bGluZ1RpbWVfbXMpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5oYXNUaHJvdHRsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudGhyb3R0bGluZ0RlbHRhICU9IHRoaXMudGhyb3R0bGluZ1RpbWVfbXM7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25Eb2N1bWVudE1vdXNlRG93biA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNEcmFnKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0NvbnRhaW4oZXZlbnQpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuaXNEcmFnID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaERyYWdFdmVudChcImRyYWdfc3RhcnRcIiwgZXZlbnQpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9uRG9jdW1lbnRNb3VzZU1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1Rocm90dGxlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLmhhc1Rocm90dGxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRHJhZ0V2ZW50KFwibW92ZVwiLCBldmVudCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNEcmFnKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hEcmFnRXZlbnQoXCJkcmFnXCIsIGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oZXZlbnQpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9uRG9jdW1lbnRNb3VzZUxlYXZlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uRG9jdW1lbnRNb3VzZVVwKGV2ZW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vbkRvY3VtZW50TW91c2VVcCA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzRHJhZylcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLmlzRHJhZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaERyYWdFdmVudChcImRyYWdfZW5kXCIsIGV2ZW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vbk1vdXNlV2hlZWwgPSAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXZ0ID0geyB0eXBlOiBcInpvb21cIiB9O1xuICAgICAgICAgICAgaWYgKGUuZGV0YWlsICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBldnQuZGVsdGFTY3JvbGwgPSBlLmRldGFpbCA8IDAgPyAxIDogLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZS53aGVlbERlbHRhICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBldnQuZGVsdGFTY3JvbGwgPSBlLndoZWVsRGVsdGEgPiAwID8gMSA6IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGUuZGVsdGFZICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBldnQuZGVsdGFTY3JvbGwgPSBlLmRlbHRhWSA+IDAgPyAxIDogLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVtaXQoZXZ0LnR5cGUsIGV2dCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChvcHRpb24/LnRocm90dGxpbmdUaW1lX21zICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudGhyb3R0bGluZ1RpbWVfbXMgPSBvcHRpb24udGhyb3R0bGluZ1RpbWVfbXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52aWV3cG9ydCA/Pz0gb3B0aW9uPy52aWV3cG9ydDtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCB0aGlzLm9uRG9jdW1lbnRNb3VzZU1vdmUsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIHRoaXMub25Eb2N1bWVudE1vdXNlRG93biwgZmFsc2UpO1xuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcnVwXCIsIHRoaXMub25Eb2N1bWVudE1vdXNlVXAsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJsZWF2ZVwiLCB0aGlzLm9uRG9jdW1lbnRNb3VzZUxlYXZlLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCB0aGlzLm9uTW91c2VXaGVlbCwgZmFsc2UpO1xuICAgICAgICBSQUZUaWNrZXIub24oXCJ0aWNrXCIsIHRoaXMub25UaWNrKTtcbiAgICB9XG4gICAgdXBkYXRlUG9zaXRpb24oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvblggPSBldmVudC5vZmZzZXRYO1xuICAgICAgICB0aGlzLnBvc2l0aW9uWSA9IGV2ZW50Lm9mZnNldFk7XG4gICAgfVxuICAgIGRpc3BhdGNoRHJhZ0V2ZW50KHR5cGUsIGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGV2dCA9IHsgdHlwZSB9O1xuICAgICAgICBjb25zdCB7IHgsIHkgfSA9IHRoaXMuY29udmVydFRvTG9jYWxNb3VzZVBvaW50KGV2ZW50KTtcbiAgICAgICAgZXZ0LnBvc2l0aW9uWCA9IHg7XG4gICAgICAgIGV2dC5wb3NpdGlvblkgPSB5O1xuICAgICAgICBpZiAodHlwZSA9PT0gXCJkcmFnXCIpIHtcbiAgICAgICAgICAgIGV2dC5kZWx0YVggPSBldmVudC5vZmZzZXRYIC0gdGhpcy5wb3NpdGlvblg7XG4gICAgICAgICAgICBldnQuZGVsdGFZID0gZXZlbnQub2Zmc2V0WSAtIHRoaXMucG9zaXRpb25ZO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdCh0eXBlLCBldnQpO1xuICAgIH1cbiAgICBjb252ZXJ0VG9Mb2NhbE1vdXNlUG9pbnQoZSkge1xuICAgICAgICBpZiAoIXRoaXMudmlld3BvcnQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgeDogZS5vZmZzZXRYLFxuICAgICAgICAgICAgICAgIHk6IGUub2Zmc2V0WSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCByZWN0ID0gRHJhZ1dhdGNoZXIuY29udmVydFRvUmVjdCh0aGlzLmNhbnZhcywgdGhpcy52aWV3cG9ydCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHg6IGUub2Zmc2V0WCAtIHJlY3QueDEsXG4gICAgICAgICAgICAgICAgeTogZS5vZmZzZXRZIC0gcmVjdC55MSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog44Oe44Km44K544Od44Kk44Oz44K/44GMdmlld3BvcnTlhoXjgavlj47jgb7jgaPjgabjgYTjgovjgYvlkKbjgYtcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGlzQ29udGFpbihldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMudmlld3BvcnQpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgY29uc3QgcmVjdCA9IERyYWdXYXRjaGVyLmNvbnZlcnRUb1JlY3QodGhpcy5jYW52YXMsIHRoaXMudmlld3BvcnQpO1xuICAgICAgICByZXR1cm4gKGV2ZW50Lm9mZnNldFggPj0gcmVjdC54MSAmJlxuICAgICAgICAgICAgZXZlbnQub2Zmc2V0WCA8PSByZWN0LngyICYmXG4gICAgICAgICAgICBldmVudC5vZmZzZXRZID49IHJlY3QueTEgJiZcbiAgICAgICAgICAgIGV2ZW50Lm9mZnNldFkgPD0gcmVjdC55Mik7XG4gICAgfVxuICAgIHN0YXRpYyBjb252ZXJ0VG9SZWN0KGNhbnZhcywgdmlld3BvcnQpIHtcbiAgICAgICAgbGV0IGhlaWdodCA9IDA7XG4gICAgICAgIGlmIChjYW52YXMuc3R5bGUud2lkdGggIT0gbnVsbCAmJiBjYW52YXMuc3R5bGUuaGVpZ2h0KSB7XG4gICAgICAgICAgICBoZWlnaHQgPSBwYXJzZUludChjYW52YXMuc3R5bGUuaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGhlaWdodCA9IGNhbnZhcy5oZWlnaHQgLyB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDE6IHZpZXdwb3J0LngsXG4gICAgICAgICAgICB4Mjogdmlld3BvcnQueCArIHZpZXdwb3J0LndpZHRoLFxuICAgICAgICAgICAgeTE6IGhlaWdodCAtICh2aWV3cG9ydC55ICsgdmlld3BvcnQuaGVpZ2h0KSxcbiAgICAgICAgICAgIHkyOiBoZWlnaHQgLSB2aWV3cG9ydC55LFxuICAgICAgICB9O1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgdGhpcy5vbkRvY3VtZW50TW91c2VNb3ZlLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVyZG93blwiLCB0aGlzLm9uRG9jdW1lbnRNb3VzZURvd24sIGZhbHNlKTtcbiAgICAgICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJ1cFwiLCB0aGlzLm9uRG9jdW1lbnRNb3VzZVVwLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVybGVhdmVcIiwgdGhpcy5vbkRvY3VtZW50TW91c2VMZWF2ZSwgZmFsc2UpO1xuICAgICAgICBSQUZUaWNrZXIub2ZmKFwidGlja1wiLCB0aGlzLm9uVGljayk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiZXZlbnRlbWl0dGVyM1wiO1xuZXhwb3J0IGNsYXNzIFNsZWVwV2F0Y2hlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoZHJhZ1dhdGNoZXIsIG9wdGlvbikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmRyYWdXYXRjaGVyID0gZHJhZ1dhdGNoZXI7XG4gICAgICAgIHRoaXMudGltZU91dF9tcyA9IDEwICogMTAwMDsgLy/jg5/jg6pzZWNcbiAgICAgICAgdGhpcy5pc1NsZWVwID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiDnhKHmk43kvZzjgr/jgqTjg57jg7zjgpLjg6rjgrvjg4Pjg4jjgZfjgIHlho3luqbjgqvjgqbjg7Pjg4jjgpLplovlp4vjgZnjgovjgIJcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmVzdGFydCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XG4gICAgICAgICAgICB0aGlzLndha2V1cCgpO1xuICAgICAgICAgICAgdGhpcy5zbGVlcFRpbWVySUQgPSB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnNsZWVwLCB0aGlzLnRpbWVPdXRfbXMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNsZWVwID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTbGVlcClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJzbGVlcFwiLCB7IHR5cGU6IFwic2xlZXBcIiB9KTtcbiAgICAgICAgICAgIHRoaXMuaXNTbGVlcCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMud2FrZXVwID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzU2xlZXApXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwid2FrZXVwXCIsIHsgdHlwZTogXCJ3YWtldXBcIiB9KTtcbiAgICAgICAgICAgIHRoaXMuaXNTbGVlcCA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBhdXNlVGltZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgICAgICAgICAgdGhpcy53YWtldXAoKTtcbiAgICAgICAgICAgIGNvbnN0IHdhdGNoZXIgPSB0aGlzLmRyYWdXYXRjaGVyO1xuICAgICAgICAgICAgd2F0Y2hlci5vZmYoXCJkcmFnX3N0YXJ0XCIsIHRoaXMucGF1c2VUaW1lcik7XG4gICAgICAgICAgICB3YXRjaGVyLm9uKFwiZHJhZ19lbmRcIiwgdGhpcy5yZXN1bWVUaW1lcik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVzdW1lVGltZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc3RhcnQoKTtcbiAgICAgICAgICAgIGNvbnN0IHdhdGNoZXIgPSB0aGlzLmRyYWdXYXRjaGVyO1xuICAgICAgICAgICAgd2F0Y2hlci5vbihcImRyYWdfc3RhcnRcIiwgdGhpcy5wYXVzZVRpbWVyKTtcbiAgICAgICAgICAgIHdhdGNoZXIub2ZmKFwiZHJhZ19lbmRcIiwgdGhpcy5yZXN1bWVUaW1lcik7XG4gICAgICAgIH07XG4gICAgICAgIGlmICghb3B0aW9uKVxuICAgICAgICAgICAgb3B0aW9uID0ge307XG4gICAgICAgIGlmIChvcHRpb24udGltZU91dF9tcyAhPSBudWxsKVxuICAgICAgICAgICAgdGhpcy50aW1lT3V0X21zID0gb3B0aW9uLnRpbWVPdXRfbXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOeEoeaTjeS9nOOCv+OCpOODnuODvOOCkuODquOCu+ODg+ODiOOBl+OAgeWGjeW6puOCq+OCpuODs+ODiOOCkumWi+Wni+OBmeOCi+OAglxuICAgICAqIEBkZXByZWNhdGVkIFRoaXMgbWV0aG9kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2MC4xMy4wLiBQbGVhc2UgdXNlIHJlc3RhcnQoKSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLnJlc3RhcnQoKTtcbiAgICB9XG4gICAgc3RvcFRpbWVyKCkge1xuICAgICAgICBpZiAodGhpcy5zbGVlcFRpbWVySUQgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2xlZXBUaW1lcklEKTtcbiAgICAgICAgdGhpcy5zbGVlcFRpbWVySUQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOODnuOCpuOCueebo+imluOCkumWi+Wni+OBmeOCi1xuICAgICAqL1xuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnN0b3BNb3VzZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIHRoaXMuc3RhcnRNb3VzZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIHRoaXMucmVzdGFydCgpO1xuICAgIH1cbiAgICBzdGFydE1vdXNlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGNvbnN0IHdhdGNoZXIgPSB0aGlzLmRyYWdXYXRjaGVyO1xuICAgICAgICB3YXRjaGVyLm9uKFwiem9vbVwiLCB0aGlzLnJlc3RhcnQpO1xuICAgICAgICB3YXRjaGVyLm9uKFwiZHJhZ19zdGFydFwiLCB0aGlzLnBhdXNlVGltZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDjg57jgqbjgrnjga7nm6PoppbjgpLlgZzmraLjgZnjgotcbiAgICAgKi9cbiAgICBzdG9wKCkge1xuICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgICAgICB0aGlzLndha2V1cCgpO1xuICAgICAgICB0aGlzLnN0b3BNb3VzZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuICAgIHN0b3BNb3VzZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBjb25zdCB3YXRjaGVyID0gdGhpcy5kcmFnV2F0Y2hlcjtcbiAgICAgICAgd2F0Y2hlci5vZmYoXCJ6b29tXCIsIHRoaXMucmVzdGFydCk7XG4gICAgICAgIHdhdGNoZXIub2ZmKFwiZHJhZ19zdGFydFwiLCB0aGlzLnBhdXNlVGltZXIpO1xuICAgICAgICB3YXRjaGVyLm9mZihcImRyYWdfZW5kXCIsIHRoaXMucmVzdW1lVGltZXIpO1xuICAgIH1cbn1cbiIsImV4cG9ydCAqIGZyb20gXCIuL0RyYWdFdmVudC5qc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vRHJhZ1dhdGNoZXIuanNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1NsZWVwRXZlbnQuanNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1NsZWVwV2F0Y2hlci5qc1wiO1xuIiwiaW1wb3J0IHsgRHJhZ1dhdGNoZXIsIFNsZWVwV2F0Y2hlciB9IGZyb20gXCIuLi9lc20vaW5kZXguanNcIjtcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuXG5jb25zdCBXID0gMTI4MDtcbmNvbnN0IEggPSA2NDA7XG5cbmNvbnN0IG9uRG9tQ29udGVudHNMb2FkZWQgPSAoKSA9PiB7XG4gIC8vIOOCt+ODvOODs+OCkuS9nOaIkFxuICBjb25zdCBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICBjb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNDUsIFcgLyBILCAxLCAxMDAwMCk7XG4gIGNhbWVyYS5wb3NpdGlvbi5zZXQoMCwgMCwgMTAwMCk7XG4gIHNjZW5lLmFkZChjYW1lcmEpO1xuXG4gIGNvbnN0IHJlbmRlck9wdGlvbiA9IHtcbiAgICBjYW52YXM6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2ViZ2wtY2FudmFzXCIpLFxuICB9O1xuICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHJlbmRlck9wdGlvbik7XG4gIHJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKSk7XG4gIHJlbmRlcmVyLnNldFNpemUoVywgSCk7XG4gIHJlbmRlcmVyLnNldFBpeGVsUmF0aW8od2luZG93LmRldmljZVBpeGVsUmF0aW8pO1xuXG4gIC8v5bmz6KGM5YWJ5rqQ44Kq44OW44K444Kn44Kv44OIKGxpZ2h0KeOBruioreWumlxuICBjb25zdCBhbWJpZW50TGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4ZmZmZmZmLCAxLjApO1xuICBzY2VuZS5hZGQoYW1iaWVudExpZ2h0KTtcblxuICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSk7XG5cbiAgLy/jg4njg6njg4PjgrDnm6Poppblh6bnkIbjgpLplovlp4tcbiAgY29uc3Qgd2F0Y2hlciA9IG5ldyBEcmFnV2F0Y2hlcihyZW5kZXJlci5kb21FbGVtZW50KTtcbiAgd2F0Y2hlci5vbihcImRyYWdcIiwgKGUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGB0aHJvdHRsaW5nVGltZV9tcyA6ICR7d2F0Y2hlci50aHJvdHRsaW5nVGltZV9tc31gLFxuICAgICAgYFRpbWVTdGFtcCA6ICR7cGVyZm9ybWFuY2Uubm93KCl9YCxcbiAgICAgIGUsXG4gICAgKTtcbiAgfSk7XG4gIHdhdGNoZXIub24oXCJkcmFnX3N0YXJ0XCIsIChlKSA9PiB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gIH0pO1xuICB3YXRjaGVyLm9uKFwiZHJhZ19lbmRcIiwgKGUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgfSk7XG4gIHdhdGNoZXIub24oXCJ6b29tXCIsIChlKSA9PiB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gIH0pO1xuXG4gIGNvbnN0IHNsZWVwV2F0Y2hlciA9IG5ldyBTbGVlcFdhdGNoZXIod2F0Y2hlciwgeyB0aW1lT3V0X21zOiAyICogMTAwMCB9KTtcbiAgc2xlZXBXYXRjaGVyLm9uKFwic2xlZXBcIiwgKGUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgfSk7XG4gIHNsZWVwV2F0Y2hlci5vbihcIndha2V1cFwiLCAoZSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9KTtcbiAgc2xlZXBXYXRjaGVyLnN0YXJ0KCk7XG59O1xuXG4vKipcbiAqIERPTUNvbnRlbnRMb2FkZWTku6XpmY3jgavliJ3mnJ/ljJblh6bnkIbjgpLlrp/ooYzjgZnjgotcbiAqL1xud2luZG93Lm9ubG9hZCA9IG9uRG9tQ29udGVudHNMb2FkZWQ7XG4iXSwibmFtZXMiOlsiUkFGVGlja2VyIiwiRXZlbnRFbWl0dGVyIiwiRHJhZ1dhdGNoZXIiLCJjb25zdHJ1Y3RvciIsImNhbnZhcyIsIm9wdGlvbiIsImlzRHJhZyIsImhhc1Rocm90dGxlZCIsInRocm90dGxpbmdUaW1lX21zIiwidGhyb3R0bGluZ0RlbHRhIiwib25UaWNrIiwiZSIsImRlbHRhIiwib25Eb2N1bWVudE1vdXNlRG93biIsImV2ZW50IiwiaXNDb250YWluIiwidXBkYXRlUG9zaXRpb24iLCJkaXNwYXRjaERyYWdFdmVudCIsIm9uRG9jdW1lbnRNb3VzZU1vdmUiLCJvbkRvY3VtZW50TW91c2VMZWF2ZSIsIm9uRG9jdW1lbnRNb3VzZVVwIiwib25Nb3VzZVdoZWVsIiwiZXZ0IiwidHlwZSIsImRldGFpbCIsImRlbHRhU2Nyb2xsIiwid2hlZWxEZWx0YSIsImRlbHRhWSIsImVtaXQiLCJ2aWV3cG9ydCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbiIsInBvc2l0aW9uWCIsIm9mZnNldFgiLCJwb3NpdGlvblkiLCJvZmZzZXRZIiwieCIsInkiLCJjb252ZXJ0VG9Mb2NhbE1vdXNlUG9pbnQiLCJkZWx0YVgiLCJyZWN0IiwiY29udmVydFRvUmVjdCIsIngxIiwieTEiLCJ4MiIsInkyIiwiaGVpZ2h0Iiwic3R5bGUiLCJ3aWR0aCIsInBhcnNlSW50Iiwid2luZG93IiwiZGV2aWNlUGl4ZWxSYXRpbyIsImRpc3Bvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwib2ZmIiwiU2xlZXBXYXRjaGVyIiwiZHJhZ1dhdGNoZXIiLCJ0aW1lT3V0X21zIiwiaXNTbGVlcCIsInJlc3RhcnQiLCJzdG9wVGltZXIiLCJ3YWtldXAiLCJzbGVlcFRpbWVySUQiLCJzZXRUaW1lb3V0Iiwic2xlZXAiLCJwYXVzZVRpbWVyIiwid2F0Y2hlciIsInJlc3VtZVRpbWVyIiwicmVzZXQiLCJjbGVhclRpbWVvdXQiLCJ1bmRlZmluZWQiLCJzdGFydCIsInN0b3BNb3VzZUV2ZW50TGlzdGVuZXJzIiwic3RhcnRNb3VzZUV2ZW50TGlzdGVuZXJzIiwic3RvcCIsIlRIUkVFIiwiVyIsIkgiLCJvbkRvbUNvbnRlbnRzTG9hZGVkIiwic2NlbmUiLCJTY2VuZSIsImNhbWVyYSIsIlBlcnNwZWN0aXZlQ2FtZXJhIiwicG9zaXRpb24iLCJzZXQiLCJhZGQiLCJyZW5kZXJPcHRpb24iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVuZGVyZXIiLCJXZWJHTFJlbmRlcmVyIiwic2V0Q2xlYXJDb2xvciIsIkNvbG9yIiwic2V0U2l6ZSIsInNldFBpeGVsUmF0aW8iLCJhbWJpZW50TGlnaHQiLCJBbWJpZW50TGlnaHQiLCJyZW5kZXIiLCJkb21FbGVtZW50IiwiY29uc29sZSIsImxvZyIsInBlcmZvcm1hbmNlIiwibm93Iiwic2xlZXBXYXRjaGVyIiwib25sb2FkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///891\n')}},__webpack_module_cache__={},deferred;function __webpack_require__(Q){var U=__webpack_module_cache__[Q];if(void 0!==U)return U.exports;var F=__webpack_module_cache__[Q]={exports:{}};return __webpack_modules__[Q](F,F.exports,__webpack_require__),F.exports}__webpack_require__.m=__webpack_modules__,deferred=[],__webpack_require__.O=(Q,U,F,B)=>{if(!U){var I=1/0;for(e=0;e<deferred.length;e++){for(var[U,F,B]=deferred[e],s=!0,g=0;g<U.length;g++)(!1&B||I>=B)&&Object.keys(__webpack_require__.O).every((Q=>__webpack_require__.O[Q](U[g])))?U.splice(g--,1):(s=!1,B<I&&(I=B));if(s){deferred.splice(e--,1);var C=F();void 0!==C&&(Q=C)}}return Q}B=B||0;for(var e=deferred.length;e>0&&deferred[e-1][2]>B;e--)deferred[e]=deferred[e-1];deferred[e]=[U,F,B]},__webpack_require__.d=(Q,U)=>{for(var F in U)__webpack_require__.o(U,F)&&!__webpack_require__.o(Q,F)&&Object.defineProperty(Q,F,{enumerable:!0,get:U[F]})},__webpack_require__.o=(Q,U)=>Object.prototype.hasOwnProperty.call(Q,U),(()=>{var Q={795:0};__webpack_require__.O.j=U=>0===Q[U];var U=(U,F)=>{var B,I,[s,g,C]=F,e=0;if(s.some((U=>0!==Q[U]))){for(B in g)__webpack_require__.o(g,B)&&(__webpack_require__.m[B]=g[B]);if(C)var t=C(__webpack_require__)}for(U&&U(F);e<s.length;e++)I=s[e],__webpack_require__.o(Q,I)&&Q[I]&&Q[I][0](),Q[I]=0;return __webpack_require__.O(t)},F=self.webpackChunk_masatomakino_threejs_drag_watcher=self.webpackChunk_masatomakino_threejs_drag_watcher||[];F.forEach(U.bind(null,0)),F.push=U.bind(null,F.push.bind(F))})();var __webpack_exports__=__webpack_require__.O(void 0,[121],(()=>__webpack_require__(891)));__webpack_exports__=__webpack_require__.O(__webpack_exports__)})();