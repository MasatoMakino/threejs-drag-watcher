(()=>{"use strict";var t,e={124:(t,e,s)=>{var n=s(753),i=s(710),o=s(961),r=s(486);class a extends r.A{constructor(t,e){super(),this.pointers=new Map,this.hasThrottled=!1,this.throttlingTime_ms=16,this.throttlingDelta=0,this.onTick=t=>{this.throttlingDelta+=t.delta,this.throttlingDelta<this.throttlingTime_ms||(this.hasThrottled=!1,this.throttlingDelta%=this.throttlingTime_ms)},this.onDocumentMouseDown=t=>{this.isContain(t)&&(this.pointers.set(t.pointerId,t),this.dispatchDragEvent("drag_start",t))},this.onDocumentMouseMove=t=>{if(!this.hasThrottled){if(this.hasThrottled=!0,this.dispatchDragEvent("move",t),2===this.pointers.size&&this.pointers.has(t.pointerId)){const e=a.generatePinchEvent(this.pointers,t);this.emit(e.type,e)}1===this.pointers.size&&this.pointers.has(t.pointerId)&&this.dispatchDragEvent("drag",t,this.pointers.get(t.pointerId)),this.pointers.has(t.pointerId)&&this.pointers.set(t.pointerId,t)}},this.onDocumentMouseLeave=t=>{this.onDocumentMouseUp(t)},this.onDocumentMouseUp=t=>{this.pointers.has(t.pointerId)&&this.dispatchDragEvent("drag_end",t),this.pointers.delete(t.pointerId)},this.onMouseWheel=t=>{const e={type:"zoom"};null!=t.detail&&(e.deltaScroll=t.detail<0?1:-1),null!=t.wheelDelta&&(e.deltaScroll=t.wheelDelta>0?1:-1),null!=t.deltaY&&(e.deltaScroll=t.deltaY>0?1:-1),this.emit(e.type,e)},null!=e?.throttlingTime_ms&&(this.throttlingTime_ms=e.throttlingTime_ms),null!=e?.viewport&&(this.viewport??=e.viewport.area,this.canvasRect??=e.viewport.canvasRect),this.canvas=t,this.canvas.addEventListener("pointermove",this.onDocumentMouseMove,!1),this.canvas.addEventListener("pointerdown",this.onDocumentMouseDown,!1),this.canvas.addEventListener("pointerup",this.onDocumentMouseUp,!1),this.canvas.addEventListener("pointerleave",this.onDocumentMouseLeave,!1),this.canvas.addEventListener("wheel",this.onMouseWheel,!1),o.w.on("tick",this.onTick)}static generatePinchEvent(t,e){const s=Array.from(t.values()),n=a.calculateDistance(s),i=new Map(t);i.set(e.pointerId,e);const o=Array.from(i.values());return{type:"pinch",delta:a.calculateDistance(o)-n,pointers:o}}static calculateDistance(t){return Math.sqrt(Math.pow(t[0].offsetX-t[1].offsetX,2)+Math.pow(t[0].offsetY-t[1].offsetY,2))}dispatchDragEvent(t,e,s){const n={type:t},{x:i,y:o}=this.convertToLocalMousePoint(e);n.positionX=i,n.positionY=o,n.pointerId=e.pointerId,"drag"===t&&s&&(n.deltaX=e.offsetX-s.offsetX,n.deltaY=e.offsetY-s.offsetY),this.emit(t,n)}convertToLocalMousePoint(t){if(this.viewport&&this.canvasRect){const e=a.convertToRect(this.viewport,this.canvasRect),s=this.canvas.clientWidth/this.canvasRect.width,n=t.offsetX/s,i=t.offsetY/s;return{x:n-e.x1,y:i-e.y1}}return{x:t.offsetX,y:t.offsetY}}isContain(t){if(!this.viewport||!this.canvasRect)return!0;const e=a.convertToRect(this.viewport,this.canvasRect),s=this.canvas.clientWidth/this.canvasRect.width,n=t.offsetX/s,i=t.offsetY/s;return n>=e.x1&&n<=e.x2&&i>=e.y1&&i<=e.y2}static convertToRect(t,e){return{x1:t.x,x2:t.x+t.width,y1:e.height-(t.y+t.height),y2:e.height-t.y}}reset(){this.pointers.clear()}dispose(){this.canvas.removeEventListener("pointermove",this.onDocumentMouseMove,!1),this.canvas.removeEventListener("pointerdown",this.onDocumentMouseDown,!1),this.canvas.removeEventListener("pointerup",this.onDocumentMouseUp,!1),this.canvas.removeEventListener("pointerleave",this.onDocumentMouseLeave,!1),o.w.off("tick",this.onTick)}}r.A;const h=1280,c=640,l=(t,e,s,n)=>{const i=t.clientWidth,o=t.clientHeight,r=s/n;i/o>r?(e.style.width=o*r+"px",e.style.height=`${o}px`):(e.style.width=`${i}px`,e.style.height=i/r+"px")};window.onload=()=>{const t=document.createElement("div");t.style.width="100vw",t.style.height="100vh",t.style.overflow="hidden",t.style.display="flex",t.style.justifyContent="center",t.style.alignItems="center",document.body.appendChild(t);const e=document.getElementById("webgl-canvas");e.parentElement.removeChild(e),t.appendChild(e);const s={canvas:e},o=new n.JeP(s);o.autoClear=!1,o.setSize(h,c);const r=new i.eaF(new i.UPV(10,3,100,16),new i.tXL({color:16711680,specular:16777215,shininess:30})),a=new i.eaF(new i.UPV(10,3,100,16),new i.tXL({color:255,specular:16777215,shininess:30})),p=new d(o,20,20,400,300,r,2236962),v=new d(o,480,360,120,60,a,4473924),m=()=>{o.setClearColor(0),o.clear(),p.render(o),v.render(o),requestAnimationFrame(m)};m(),l(t,e,h,c),window.addEventListener("resize",(()=>{l(t,e,h,c)}))};class d{scene;camera;bgColor;viewPort;mesh;dragManager;constructor(t,e,s,n,o,r,l){this.viewPort=new i.IUQ(e,s,n,o),this.mesh=r,this.scene=new i.Z58,this.camera=new i.ubm(45,n/o,1,1e4),this.camera.position.set(0,0,64),this.scene.add(this.camera),this.scene.add(r),this.bgColor=l;const d=new i.$p8(1118481,1);this.scene.add(d);const p=new i.nCl(8947848,1);p.position.set(8,6,-2),this.scene.add(p);const v=new i.nCl(8947848,1);v.position.set(-8,-6,2),this.scene.add(v),this.dragManager=new a(t.domElement,{viewport:{area:this.viewPort,canvasRect:new i.I9Y(h,c)}}),this.dragManager.on("drag",(t=>{console.log(this.bgColor,`throttlingTime_ms : ${this.dragManager.throttlingTime_ms}`,`TimeStamp : ${performance.now()}`,t)})),this.dragManager.on("drag_start",(t=>{console.log(t)})),this.dragManager.on("drag_end",(t=>{console.log(t)})),this.dragManager.on("zoom",(t=>{console.log(t)}))}render(t){this.mesh.rotation.x+=.001,this.mesh.rotation.y+=.001,t.setClearColor(this.bgColor),t.clearDepth(),t.setScissorTest(!0),t.setScissor(this.viewPort),t.setViewport(this.viewPort),t.clear(),t.render(this.scene,this.camera),t.setScissorTest(!1)}}}},s={};function n(t){var i=s[t];if(void 0!==i)return i.exports;var o=s[t]={exports:{}};return e[t](o,o.exports,n),o.exports}n.m=e,t=[],n.O=(e,s,i,o)=>{if(!s){var r=1/0;for(l=0;l<t.length;l++){for(var[s,i,o]=t[l],a=!0,h=0;h<s.length;h++)(!1&o||r>=o)&&Object.keys(n.O).every((t=>n.O[t](s[h])))?s.splice(h--,1):(a=!1,o<r&&(r=o));if(a){t.splice(l--,1);var c=i();void 0!==c&&(e=c)}}return e}o=o||0;for(var l=t.length;l>0&&t[l-1][2]>o;l--)t[l]=t[l-1];t[l]=[s,i,o]},n.d=(t,e)=>{for(var s in e)n.o(e,s)&&!n.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={914:0};n.O.j=e=>0===t[e];var e=(e,s)=>{var i,o,[r,a,h]=s,c=0;if(r.some((e=>0!==t[e]))){for(i in a)n.o(a,i)&&(n.m[i]=a[i]);if(h)var l=h(n)}for(e&&e(s);c<r.length;c++)o=r[c],n.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return n.O(l)},s=self.webpackChunk_masatomakino_threejs_drag_watcher=self.webpackChunk_masatomakino_threejs_drag_watcher||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))})();var i=n.O(void 0,[121],(()=>n(124)));i=n.O(i)})();