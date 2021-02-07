const {src, dest, task, series, watch, parallel} = require("gulp");
const rm = require( 'gulp-rm' );
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
var gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const env = process.env.MODE_ENV;
 
sass.compiler = require('node-sass');

task("copy:html", () => {
  return src("src/*.html")
  .pipe(dest("dist"))
  .pipe(reload({stream:true}))
}),

task("copy:images", () => {
  return src("src/images/**/*")
  .pipe(dest("dist/images"))
  .pipe(reload({stream:true}))
}),

task("copy:sprite", () => {
  return src("src/sprite.svg")
  .pipe(dest("dist"))
  .pipe(reload({stream:true}))
}),

task('clean', () => {
  return src( 'dist/**/*', {read: false})
  .pipe(rm())
})

const css = [
  'node_modules/normalize.css/normalize.css',
  'src/css/main.scss'
];

task('sass', () => {
  return src(css)
    .pipe(gulpif(env=="dev", sourcemaps.init()))
    .pipe(concat("main.min.scss"))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env=="prod",gcmq()))
    .pipe(gulpif(env=="dev",autoprefixer({
      cascade: false
  })))
    .pipe(gulpif(env=="prod",cleanCSS()))
    .pipe(gulpif(env=="dev",sourcemaps.write()))
    .pipe(dest('dist/css'))
    .pipe(reload({stream:true}))
});

const js = [
  'src/js/*.js'
]

task('scripts', () => {
  return src(js)
    .pipe(gulpif(env=="dev",sourcemaps.init()))
    .pipe(concat("main.min.js", {newLine: ";"}))
    .pipe(gulpif(env=="prod", babel({
      presets: ['@babel/env']
  })))
    .pipe(gulpif(env=="prod", uglify()))
    .pipe(gulpif(env=="dev", sourcemaps.write()))
    .pipe(dest('dist/js'))
    .pipe(reload({stream:true}))
});

task('server', () => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      open:false
  });
});
 
task("watch", () => {
  watch('./src/css/**/*.scss', series('sass'));
  watch('./src/*.html', series('copy:html'));
  watch('./src/js/*.js', series('scripts'));
})


task("default", series("clean", parallel("copy:html", "copy:images", "copy:sprite", "sass", 'scripts'), parallel ("watch","server")));

task("build", series("clean", parallel("copy:html", "copy:images", "copy:sprite", "sass", 'scripts')));