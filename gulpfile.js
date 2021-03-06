const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
  -- TOP LEVEL FUNCTIONS --
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/

// Logs Message
gulp.task('message', function() {
  return console.log('Gulp is running...');
});

// Copy All Html Files
gulp.task('copyHtml', function() {
  gulp.src('./src/*.html').pipe(gulp.dest('./dist/'));
});

// Optimize Images
// npm install --save-dev gulp-imagemin
gulp.task('imageMin', () =>
  gulp
    .src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
);

// Minify JS
// npm install --save-dev gulp-uglify
gulp.task('minify', function() {
  gulp
    .src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Compile Sass
// npm install gulp-sass --save-dev
gulp.task('sass', function() {
  gulp
    .src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

// Scripts
gulp.task('scripts', function() {
  gulp
    .src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/images/*', ['imageMin']);
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/*.html', ['copyHtml']);
});

gulp.task('build', ['copyHtml', 'imageMin', 'sass', 'scripts', 'watch']);
