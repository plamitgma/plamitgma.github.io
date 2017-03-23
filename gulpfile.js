var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-clean-css'),
    templateCache = require('gulp-angular-templatecache'),
    minifyHTML = require('gulp-minify-html'),
    clean = require('gulp-clean');
gulpSequence = require('gulp-sequence'),
    inject = require('gulp-inject-string'),
    less = require('gulp-less'),
    path = require('path');

gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('build-js-css', function () {
    return gulp.src('index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-html', function () {
    return gulp.src('./src/**/*.html')
        .pipe(minifyHTML({
            quotes: true
        }))
        .pipe(templateCache('templates.min.js', {
            module: 'main',
            root: 'src/',
            standAlone: false
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('build-fonts', function () {
    return gulp.src(['bower_components/font-awesome/fonts/*', 'bower_components/bootstrap/fonts/*'])
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('move-templateCache', function () {
    return gulp.src('./dist/index.html')
        .pipe(inject.before('</html>', '<script src="scripts/templates.min.js"></script>\n'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-clean', function () {
    return gulp.src(['./dist'], { read: false })
        .pipe(clean());
});

gulp.task('default', gulpSequence('build-clean', 'less', ['build-js-css', 'build-html', 'build-fonts'], ['move-templateCache']));