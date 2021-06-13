const { series } = require("gulp");

const doc = require("gulptask-tsdoc").generateTask();
const server = require("gulptask-dev-server").generateTask("./docs/demo");
const { bundleDemo, watchDemo } = require("gulptask-demo-page").generateTasks({
  externalScripts: [],
  body: `<canvas id="webgl-canvas" width="1920" height="1080"></canvas>`,
});
const { tsc, tscClean, watchTsc } = require("gulptask-tsc").generateTasks({
  projects: ["tsconfig.cjs.json", "tsconfig.esm.json"],
});

const watchTasks = async () => {
  watchDemo();
  watchTsc();
};

exports.start_dev = series(watchTasks, server);
exports.build = series(tsc, bundleDemo, doc);
exports.build_clean = series(tscClean, bundleDemo, doc);
