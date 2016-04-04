'use strict';
let gulp = require('gulp'),
    inject = require('gulp-inject'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    rollup = require('gulp-rollup'),
    event = require('event-stream'),
    rollupPaths = require('rollup-plugin-includepaths'),
    sync = require('browser-sync')

gulp.task('es6', function() {
    return gulp.src('app/app.js', { read: false })
        .pipe(rollup({
            sourceMap: true,
            format: 'cjs',
            plugins: [
                rollupPaths(['app'])
            ]
        }))
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))

});
gulp.task('dist', function() {
    let jsmin = gulp.src('app/app.js', { read: false })
        .pipe(rollup({
            sourceMap: true,
            format: 'cjs',
            plugins: [
                rollupPaths(['app'])
            ]
        }))
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))

    return gulp.src('index.html')
        .pipe(inject(jsmin, { name: 'bundle' }))
        .pipe(gulp.dest('dist'))
});
gulp.task('serve', ['dist'], function() {
    sync({
        server: {
            baserDir: 'dist/index.html'
        }
    })
});
