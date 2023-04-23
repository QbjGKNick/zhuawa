// const xxx = require('xxx')
const { readFileSync } = require("fs");
const { resolve } = require("path");
const { Script } = require("vm");

function my_require(filename) {
  const fileContent = readFileSync(resolve(__dirname, filename), "utf-8");
  const wrapped = `(function(require, module, exports) {
    ${fileContent}
  })`;

  const scripts = new Script(wrapped, {
    filename: "index.js",
  });

  const module = {
    exports: {},
  };

  const func = scripts.runInThisContext();

  func(my_require, module, module.exports);

  return module.exports;
}

global.my_require = my_require;

my_require("./index.js");
