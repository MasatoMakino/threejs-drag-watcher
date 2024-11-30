(()=>{"use strict";var t,e={891:(t,e,s)=>{var i=s(961),o=s(486);class n extends o.A{constructor(t,e){super(),this.pointers=new Map,this.hasThrottled=!1,this.throttlingTime_ms=16,this.throttlingDelta=0,this.onTick=t=>{this.throttlingDelta+=t.delta,this.throttlingDelta<this.throttlingTime_ms||(this.hasThrottled=!1,this.throttlingDelta%=this.throttlingTime_ms)},this.onDocumentMouseDown=t=>{this.isContain(t)&&(this.pointers.set(t.pointerId,t),this.dispatchDragEvent("drag_start",t))},this.onDocumentMouseMove=t=>{if(!this.hasThrottled){if(this.hasThrottled=!0,this.dispatchDragEvent("move",t),2===this.pointers.size&&this.pointers.has(t.pointerId)){const e=n.generatePinchEvent(this.pointers,t);this.emit(e.type,e)}1===this.pointers.size&&this.pointers.has(t.pointerId)&&this.dispatchDragEvent("drag",t,this.pointers.get(t.pointerId)),this.pointers.has(t.pointerId)&&this.pointers.set(t.pointerId,t)}},this.onDocumentMouseLeave=t=>{this.onDocumentMouseUp(t)},this.onDocumentMouseUp=t=>{this.pointers.has(t.pointerId)&&this.dispatchDragEvent("drag_end",t),this.pointers.delete(t.pointerId)},this.onMouseWheel=t=>{const e={type:"zoom"};null!=t.detail&&(e.deltaScroll=t.detail<0?1:-1),null!=t.wheelDelta&&(e.deltaScroll=t.wheelDelta>0?1:-1),null!=t.deltaY&&(e.deltaScroll=t.deltaY>0?1:-1),this.emit(e.type,e)},null!=e?.throttlingTime_ms&&(this.throttlingTime_ms=e.throttlingTime_ms),null!=e?.viewport&&(this.viewport??=e.viewport.area,this.canvasRect??=e.viewport.canvasRect),this.canvas=t,this.canvas.addEventListener("pointermove",this.onDocumentMouseMove,!1),this.canvas.addEventListener("pointerdown",this.onDocumentMouseDown,!1),this.canvas.addEventListener("pointerup",this.onDocumentMouseUp,!1),this.canvas.addEventListener("pointerleave",this.onDocumentMouseLeave,!1),this.canvas.addEventListener("wheel",this.onMouseWheel,!1),i.w.on("tick",this.onTick)}static generatePinchEvent(t,e){const s=Array.from(t.values()),i=n.calculateDistance(s),o=new Map(t);o.set(e.pointerId,e);const r=Array.from(o.values());return{type:"pinch",delta:n.calculateDistance(r)-i,pointers:r}}static calculateDistance(t){return Math.sqrt(Math.pow(t[0].offsetX-t[1].offsetX,2)+Math.pow(t[0].offsetY-t[1].offsetY,2))}dispatchDragEvent(t,e,s){const i={type:t},{x:o,y:n}=this.convertToLocalMousePoint(e);i.positionX=o,i.positionY=n,i.pointerId=e.pointerId,"drag"===t&&s&&(i.deltaX=e.offsetX-s.offsetX,i.deltaY=e.offsetY-s.offsetY),this.emit(t,i)}convertToLocalMousePoint(t){if(this.viewport&&this.canvasRect){const e=n.convertToRect(this.viewport,this.canvasRect),s=this.canvas.clientWidth/this.canvasRect.width,i=t.offsetX/s,o=t.offsetY/s;return{x:i-e.x1,y:o-e.y1}}return{x:t.offsetX,y:t.offsetY}}isContain(t){if(!this.viewport||!this.canvasRect)return!0;const e=n.convertToRect(this.viewport,this.canvasRect),s=this.canvas.clientWidth/this.canvasRect.width,i=t.offsetX/s,o=t.offsetY/s;return i>=e.x1&&i<=e.x2&&o>=e.y1&&o<=e.y2}static convertToRect(t,e){return{x1:t.x,x2:t.x+t.width,y1:e.height-(t.y+t.height),y2:e.height-t.y}}reset(){this.pointers.clear()}dispose(){this.canvas.removeEventListener("pointermove",this.onDocumentMouseMove,!1),this.canvas.removeEventListener("pointerdown",this.onDocumentMouseDown,!1),this.canvas.removeEventListener("pointerup",this.onDocumentMouseUp,!1),this.canvas.removeEventListener("pointerleave",this.onDocumentMouseLeave,!1),i.w.off("tick",this.onTick)}}class r extends o.A{constructor(t,e){super(),this.dragWatcher=t,this.timeOut_ms=1e4,this.isSleep=!1,this.restart=()=>{this.stopTimer(),this.wakeup(),this.sleepTimerID=window.setTimeout(this.sleep,this.timeOut_ms)},this.sleep=()=>{this.isSleep||(this.emit("sleep",{type:"sleep"}),this.isSleep=!0)},this.wakeup=()=>{this.isSleep&&(this.emit("wakeup",{type:"wakeup"}),this.isSleep=!1)},this.pauseTimer=()=>{this.stopTimer(),this.wakeup();const t=this.dragWatcher;t.off("drag_start",this.pauseTimer),t.on("drag_end",this.resumeTimer)},this.resumeTimer=()=>{this.restart();const t=this.dragWatcher;t.on("drag_start",this.pauseTimer),t.off("drag_end",this.resumeTimer)},e||(e={}),null!=e.timeOut_ms&&(this.timeOut_ms=e.timeOut_ms)}reset(){this.restart()}stopTimer(){null!=this.sleepTimerID&&(clearTimeout(this.sleepTimerID),this.sleepTimerID=void 0)}start(){this.stopMouseEventListeners(),this.startMouseEventListeners(),this.restart()}startMouseEventListeners(){const t=this.dragWatcher;t.on("zoom",this.restart),t.on("drag_start",this.pauseTimer)}stop(){this.stopTimer(),this.wakeup(),this.stopMouseEventListeners()}stopMouseEventListeners(){const t=this.dragWatcher;t.off("zoom",this.restart),t.off("drag_start",this.pauseTimer),t.off("drag_end",this.resumeTimer)}}var a=s(710),h=s(753);window.onload=()=>{const t=new a.Z58,e=new a.ubm(45,2,1,1e4);e.position.set(0,0,1e3),t.add(e);const s={canvas:document.getElementById("webgl-canvas")},i=new h.JeP(s);i.setClearColor(new a.Q1f(0)),i.setSize(1280,640),i.setPixelRatio(window.devicePixelRatio);const o=new a.$p8(16777215,1);t.add(o),i.render(t,e);const c=new n(i.domElement);c.on("drag",(t=>{console.log(`throttlingTime_ms : ${c.throttlingTime_ms}`,`TimeStamp : ${performance.now()}`,t)})),c.on("drag_start",(t=>{console.log(t)})),c.on("drag_end",(t=>{console.log(t)})),c.on("zoom",(t=>{console.log(t)}));const l=new r(c,{timeOut_ms:2e3});l.on("sleep",(t=>{console.log(t)})),l.on("wakeup",(t=>{console.log(t)})),l.start(),i.domElement.style.touchAction="none"}}},s={};function i(t){var o=s[t];if(void 0!==o)return o.exports;var n=s[t]={exports:{}};return e[t](n,n.exports,i),n.exports}i.m=e,t=[],i.O=(e,s,o,n)=>{if(!s){var r=1/0;for(l=0;l<t.length;l++){for(var[s,o,n]=t[l],a=!0,h=0;h<s.length;h++)(!1&n||r>=n)&&Object.keys(i.O).every((t=>i.O[t](s[h])))?s.splice(h--,1):(a=!1,n<r&&(r=n));if(a){t.splice(l--,1);var c=o();void 0!==c&&(e=c)}}return e}n=n||0;for(var l=t.length;l>0&&t[l-1][2]>n;l--)t[l]=t[l-1];t[l]=[s,o,n]},i.d=(t,e)=>{for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={795:0};i.O.j=e=>0===t[e];var e=(e,s)=>{var o,n,[r,a,h]=s,c=0;if(r.some((e=>0!==t[e]))){for(o in a)i.o(a,o)&&(i.m[o]=a[o]);if(h)var l=h(i)}for(e&&e(s);c<r.length;c++)n=r[c],i.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return i.O(l)},s=self.webpackChunk_masatomakino_threejs_drag_watcher=self.webpackChunk_masatomakino_threejs_drag_watcher||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))})();var o=i.O(void 0,[121],(()=>i(891)));o=i.O(o)})();