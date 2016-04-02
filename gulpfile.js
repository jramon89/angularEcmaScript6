'use strict';
let gulp = require('gulp'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    rollup = require('gulp-rollup'),
    rollupPaths =require('rollup-plugin-includepaths'),
    sync = require('browser-sync')

gulp.task('es6', function() {
    return gulp.src('app/app.js', { read: false })
        .pipe(rollup({
            sourceMap: true,
            format: 'umd',
            plugins: [
                rollupPaths(['app/modules/layout/controllers/'])
            ]
        }))
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))

});

gulp.task('serve', ['es6'], function() {
    sync({
        server: {
            baserDir: 'index.html'
        }
    })
});
