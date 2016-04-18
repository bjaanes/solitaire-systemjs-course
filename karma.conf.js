/* eslint-env node*/

module.exports = function (config) {
  "use strict";

  config.set({

    basePath: "./",

    files: [
    ],

    proxies: {
      "/base/bower_components": "/base/app/bower_components",
      "/base/jspm_packages": "/base/app/jspm_packages",
      "/base/cards": "/base/app/cards"
    },

    jspm: {
      stripExtension: false,
      serveFiles: [
          "app/**/*.js"
      ],
      loadFiles: [
          "tests/cards/*.js",
          "tests/klondike/**/*.js"
      ]
    },

    autoWatch: true,

    frameworks: ["jspm", "jasmine"],

    browsers: ["Chrome"],

    plugins: [
        "karma-jspm",
      "karma-chrome-launcher",
      "karma-jasmine",
      "karma-junit-reporter"
    ],

    junitReporter: {
      outputFile: "test_out/unit.xml",
      suite: "unit"
    }

  });
};
