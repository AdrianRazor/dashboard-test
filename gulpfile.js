import gulp from "gulp";
import autoprefixer from "gulp-autoprefixer";
import browserSync from "browser-sync";
import cssnano from "gulp-cssnano";
import del from "del";
import sass from "gulp-dart-sass";
import sourcemaps from "gulp-sourcemaps";

// HTML task
export function html() {
  return gulp
    .src("src/**/*.html")
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream());
}

// SCSS task
export function scss() {
  return gulp
    .src("src/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/css/"))
    .pipe(browserSync.stream());
}

// Image task
export function img() {
  return gulp
    .src("src/img/**/*")
    .pipe(gulp.dest("dist/img/"))
    .pipe(browserSync.stream());
}

// Fonts task
export function fonts() {
  return gulp
    .src("src/fonts/**/*")
    .pipe(gulp.dest("dist/fonts/"))
    .pipe(browserSync.stream());
}

// Clean task
export function clean() {
  return del(["dist"]);
}

// Watch task
export function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist/",
    },
  });

  gulp.watch("src/**/*.html", html).on("all", browserSync.reload);
  gulp.watch("src/scss/**/*.scss", scss).on("all", browserSync.reload);
  gulp.watch("src/img/**/*", img);
  gulp.watch("src/fonts/**/*", fonts);
}

// Default task
export const dev = gulp.series(
  clean,
  gulp.parallel(html, scss, img, fonts),
  watch
);
