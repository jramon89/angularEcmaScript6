'use strict';
let gulp = require('gulp'),
    inject = require('gulp-inject'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    rollup = require('gulp-rollup'),
    event = require('event-stream'),
    rollupPaths = require('rollup-plugin-includepaths'),
    sync = require('browser-sync')

gulp.task('dist', function() {
    var jsmin = gulp.src(['./app/*.js'])
        .pipe(rollup({
            sourceMap: true,
            format: 'cjs',
            plugins: [
                rollupPaths(['app'])
            ]
        }))
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))

    return gulp.src('./index.html')
        .pipe(inject(jsmin, { name: 'bundle', relative: true, ignorePath: 'dist' }))
        .pipe(gulp.dest('./dist'))
});

gulp.task('watch', function() {
    gulp.watch(['app/**/*.js'], ['dist']).on('change', sync.reload)
    gulp.watch('./index.html',['dist']).on('change', sync.reload)
});


gulp.task('serve', ['dist'], function() {
    sync({
        server: 'dist'
    })
});

gulp.task('default', ['serve', 'watch'])



/*gulp.task('es6', function() {
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

gulp.task('index', function() {
    gulp.src('dist/index.html')
        .pipe(inject(gulp.src('dist/all.js',{ read: false }), { name: 'bundle', relative: true }))
        .pipe(gulp.dest('dist'))
});

*/

// gulp.task('inject', function() {
//     gulp.src('./src/**/*.html')
//         .pipe(inject(gulp.src('./src/**/*.js', { read: false }), { name: 'bundle', relative: true }))
//         .pipe(gulp.dest('./src'))

// })
