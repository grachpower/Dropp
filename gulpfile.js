var gulp = require('gulp'),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-html-minifier'),
    watch = require('gulp-watch'),
    fileinclude = require('gulp-file-include'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function() {
    return gulp.src('img/icons/*.png')
        .pipe(spritesmith({
            imgName: 'icons.png'
        }));
});

gulp.task('fileinclude', function() {
    return gulp.src(['index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('sass', function() {
    return gulp.src('src/css/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'));
});

gulp.task('sass-watch', function() {
    return watch('src/css/**/*.scss', function() {
        gulp.src('src/css/style.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: ['IE 11','last 2 iOS versions','last 1 Chrome versions','last 1 Firefox versions',
                    'last 1 Safari versions','last 1 Opera versions','last 1 Edge versions','Android >= 4.4'],
                cascade: false
            }))
            .pipe(gulp.dest('src/css'));
    });
});

gulp.task('css-min', function() {
    return gulp.src('src/css/style.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('autoprefix', function() {
    return gulp.src('src/css/style.css')
        .pipe(autoprefixer({
            browsers: ['IE 11','last 2 iOS versions','last 1 Chrome versions','last 1 Firefox versions',
                'last 1 Safari versions','last 1 Opera versions','last 1 Edge versions','Android >= 4.4'],
            cascade: false
        }))
        .pipe(gulp.dest('src/css/'));
});

gulp.task('htmlmin', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('build', ['clean', 'sass', 'autoprefix', 'img', 'htmlmin', 'css-min']);
