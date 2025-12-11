'use strict';

const gulp = require('gulp');
const rigger = require('gulp-rigger');
const sass = require('gulp-sass')(require('sass'));
const minify = require('gulp-minify');
const include = require('gulp-include');
const browserSync = require('browser-sync').create();

const path = {
    build: {
        html: 'build/',
        css: 'build/css/',
        js: 'build/js/',
        jsLib: 'build/js/lib',
        img: 'build/img/',
        font: 'build/font/',
        json: 'build/Questions/',
        vendor: 'build/vendor',
        images: 'build/images'
    },
    src: {
        html: 'src/*.html',
        scss: 'src/scss/*.scss',
        js: ['src/js/*.js', 'node_modules/bootstrap/dist/js/bootstrap.bundle.js.map'],
        jsLib: 'src/js/lib/*.js',
        img: 'src/img/*.*',
        font: 'src/font/*.*',
        json: 'src/Questions/*.*',
        vendorCSS: 'src/vendor/**/*.css',
        vendor: 'src/vendor/**/*.*',
        images: 'src/images/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        scss: 'src/scss/**/*.scss',
        js: 'src/js/**/*.js',
        jsLib: 'src/js/lib/**/*.js',
        img: 'src/img/**/*.*',
        font: 'src/font/**/*.*',
        json: 'src/Questions/**/*.*',
        vendor: 'src/vendor/**/*.*',
        vendorCSS: 'src/vendor/**/*.css',
        images: 'src/images/**/*.*'
    }
};

/* ---------------- BUILD TASKS ---------------- */

gulp.task('html:build', async () =>
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.reload({ stream: true }))
);

gulp.task('vendor:copy', async () =>
    gulp.src(path.src.vendor)
        .pipe(gulp.dest(path.build.vendor))
        .pipe(browserSync.reload({ stream: true }))
);

gulp.task('css:build', async () =>
    gulp.src([path.src.scss, path.src.vendorCSS])
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.reload({ stream: true }))
);

gulp.task('js:build', async () =>
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(minify())
        .pipe(include())
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.reload({ stream: true }))
);

gulp.task('js:copy', async () =>
    gulp.src(path.src.jsLib)
        .pipe(gulp.dest(path.build.jsLib))
        .pipe(browserSync.reload({ stream: true }))
);

gulp.task('img:copy', async () =>
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(browserSync.reload({ stream: true }))
);

gulp.task('images:copy', async () =>
    gulp.src(path.src.images)
        .pipe(gulp.dest(path.build.images))
        .pipe(browserSync.reload({ stream: true }))
);

gulp.task('font:copy', async () =>
    gulp.src(path.src.font)
        .pipe(gulp.dest(path.build.font))
        .pipe(browserSync.reload({ stream: true }))
);

gulp.task('Questions:copy', async () =>
    gulp.src(path.src.json)
        .pipe(gulp.dest(path.build.json))
        .pipe(browserSync.reload({ stream: true }))
);

/* ---------------- SERVER ---------------- */

gulp.task('browserSync', async () =>
    browserSync.init({
        server: { baseDir: 'build' }
    })
);

/* ---------------- WATCH ---------------- */

gulp.task('watcher', async () => {
    gulp.watch(path.watch.html, gulp.parallel('html:build'));
    gulp.watch(path.watch.scss, gulp.parallel('css:build'));
    gulp.watch(path.watch.vendorCSS, gulp.parallel('css:build'));

    gulp.watch(path.watch.js, gulp.parallel('js:build'));
    gulp.watch(path.watch.jsLib, gulp.parallel('js:copy'));

    gulp.watch(path.watch.img, gulp.parallel('img:copy'));
    gulp.watch(path.watch.images, gulp.parallel('images:copy'));

    gulp.watch(path.watch.font, gulp.parallel('font:copy'));
    gulp.watch(path.watch.json, gulp.parallel('Questions:copy'));

    gulp.watch(path.watch.vendor, gulp.parallel('vendor:copy'));
});

/* ---------------- DEFAULT ---------------- */

gulp.task(
    'default',
    gulp.parallel(
        'html:build',
        'css:build',
        'js:build',
        'js:copy',
        'img:copy',
        'font:copy',
        'Questions:copy',
        'images:copy',
        'vendor:copy',
        'watcher',
        'browserSync'
    )
);



