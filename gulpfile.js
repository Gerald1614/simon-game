// Gulp.js configuration

// modules
var gulp = require('gulp');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
 var htmlclean = require('gulp-htmlclean');
 var uglify = require('gulp-uglify');
 var babel = require('gulp-babel');
var  cleanCSS = require('gulp-clean-css');
var image = require('gulp-image');

var paths = {
  src: 'src/**/*',
  srcHTML: 'src/**/*.html',
  srcImages: 'src/images/*',
  srcCSS: 'src/**/*.css',
  srcJS: 'src/**/*.js',
  tmp: 'tmp',
  tmpIndex: 'tmp/index.html',
  tmpCSS: 'tmp/**/*.css',
  tmpJS: 'tmp/**/*.js',
  dist: 'dist',
  distIndex: 'dist/index.html',
  distCSS: 'dist/**/*.css',
  distJS: 'dist/**/*.js'
};

gulp.task('image', function () {
  return gulp.src(paths.srcImages)
    .pipe(image())
    .pipe(gulp.dest(paths.tmp+'/images'));
});

gulp.task('html', function () {
  return gulp.src(paths.srcHTML).pipe(gulp.dest(paths.tmp));
});

gulp.task('css', function () {
  return gulp.src(paths.srcCSS).pipe(gulp.dest(paths.tmp));
});

gulp.task('js', function () {
  return gulp.src(paths.srcJS).pipe(gulp.dest(paths.tmp));
});


gulp.task('copy', gulp.series('html', 'css', 'js'));

gulp.task('inject', gulp.series('copy', function () {
  var css = gulp.src(paths.tmpCSS);
  var js = gulp.src(paths.tmpJS);
  return gulp.src(paths.tmpIndex)
    .pipe(inject( css, { relative:true } ))
    .pipe(inject( js, { relative:true } ))
    .pipe(gulp.dest(paths.tmp));
}));

gulp.task('serve', gulp.series('inject', function () {
  return gulp.src(paths.tmp)
    .pipe(webserver({
      port: 3000,
      livereload: true
    }));
}));

gulp.task('watch', gulp.series('serve', function () {
  gulp.watch(paths.src, gulp.series('inject'));
}));

gulp.task('default', gulp.series('watch'));

gulp.task('image:dist', function () {
  return gulp.src(paths.srcImages)
    .pipe(image())
    .pipe(gulp.dest(paths.dist+'/images'));
});

gulp.task('html:dist', function () {
  return gulp.src(paths.srcHTML)
    .pipe(htmlclean())
    .pipe(gulp.dest(paths.dist));
});
gulp.task('css:dist', function () {
  return gulp.src(paths.srcCSS)
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.dist));
});


gulp.task('js:dist', function () {
  return gulp.src(paths.srcJS)
    .pipe(babel({
    presets: ['es2015']
    }))
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist));
});
gulp.task('copy:dist', gulp.series('image:dist', 'html:dist', 'css:dist', 'js:dist'));
gulp.task('inject:dist', gulp.series('copy:dist', function () {
  var css = gulp.src(paths.distCSS);
  var js = gulp.src(paths.distJS);
  return gulp.src(paths.distIndex)
    .pipe(inject( css, { relative:true } ))
    .pipe(inject( js, { relative:true } ))
    .pipe(gulp.dest(paths.dist));
}));
gulp.task('build', gulp.series('inject:dist'));