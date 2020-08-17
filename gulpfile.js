const { watch, src, dest, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();
const rename = require("gulp-rename");
const del = require("del");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const config = {
  app: {
    css: "./css/**/*.css",
    html: "./*.html",
    root: "./",
  },
  dist: {
    base: "./dist/",
  },
};

function cssTask(done) {
  src(config.app.css)
    .pipe(rename({ suffix: ".bundle" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest(config.dist.base));
  done();
}

function watchFiles() {
  watch(config.app.css, series(cssTask, reload));
  watch(config.app.html, series(reload));
}

function liveReload(done) {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  done();
}

function reload(done) {
  browserSync.reload();
  done();
}

function cleanUp() {
  return del([config.dist.base]);
}

exports.dev = parallel(cssTask, watchFiles, liveReload);
exports.build = series(cleanUp, parallel(cssTask));
