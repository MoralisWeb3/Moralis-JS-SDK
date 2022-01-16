/* eslint-disable prefer-template */
/* eslint-disable prefer-arrow-callback */
const gulp = require("gulp");
const babel = require("gulp-babel");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const derequire = require("gulp-derequire");
const eslint = require("gulp-eslint");
const babelify = require("babelify");
const path = require("path");

const transformRuntime = [
  "@babel/plugin-transform-runtime",
  {
    corejs: 3,
    helpers: true,
    regenerator: true,
    useESModules: true,
  },
];

const SRC = ["src/**/*.js"];

gulp.task("compile", function () {
  return (
    gulp
      .src(SRC)
      .pipe(
        babel({
          presets: [
            [
              "@babel/preset-env",
              {
                targets: "> 0.25%, not dead",
              },
              "@babel/preset-react",
            ],
          ],
          plugins: [
            transformRuntime,
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-flow-comments",
            "inline-package-json",
            "transform-inline-environment-variables",
            // [
            //   "transform-inline-environment-variables",
            //   { exclude: ["SERVER_RENDERING"] },
            // ],
          ],
        })
      )
      // Second pass to kill BUILD-switched code
      .pipe(
        babel({
          plugins: ["minify-dead-code-elimination"],
        })
      )
      .pipe(gulp.dest("./lib"))
  );
});

gulp.task("browserify", function (cb) {
  const stream = browserify({
    // builtins: [
    //   "_process",
    //   "events",
    //   "buffer",
    //   "http",
    //   "util",
    //   "url",
    //   "punycode",
    //   "querystring",
    //   "https",
    //   "os",
    // ],
    entries: "lib/index.js",
    standalone: "MoralisWalletconnect",
  })
    .transform("babelify", {
      presets: ["@babel/preset-env"],
      plugins: ["transform-inline-environment-variables"],
      sourceMaps: true,
      global: true,
    })
    .exclude("xmlhttprequest")
    .ignore("_process")
    // .ignore("@walletconnect/web3-provider")
    .bundle();
  stream.on("end", () => {
    cb();
  });
  return (
    stream
      .pipe(source("index.js"))
      .pipe(derequire())
      // .pipe(insert.prepend(getDevHeader()))
      .pipe(gulp.dest("./dist"))
  );
});
