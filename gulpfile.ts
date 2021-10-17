const { series } = require("gulp");

const server = require("gulptask-dev-server").generateTask("./docs/demo");
const { bundleDemo, watchDemo } = require("gulptask-demo-page").generateTasks({
  body: `<canvas id="webgl-canvas" width="1280" height="640"></canvas>`,
});
const { tsc, tscClean, watchTsc } = require("gulptask-tsc").generateTasks({
  projects: ["tsconfig.cjs.json", "tsconfig.esm.json"],
});

const watchTasks = async () => {
  watchDemo();
  watchTsc();
};

exports.bundleDemo = bundleDemo;
exports.start_dev = series(watchTasks, server);
exports.build = series(tsc, bundleDemo);
exports.build_clean = series(tscClean, bundleDemo);
