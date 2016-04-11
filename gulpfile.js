'use strict';
let gulp = require('gulp'),
    inject = require('gulp-inject'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    series = require('stream-series'),
    //event = require('event-stream'),
    merge = require('merge-stream'),
    //source = require('vinyl-source-stream'),
    rollup = require('gulp-rollup'),
    stylus = require('gulp-stylus'),
    cssConcat = require('gulp-concat-css'),
    //rollup = require('rollup'),
    //rollupStream = require('rollup-stream'),
    //rollupBabel = require('rollup-plugin-babel'),
    rollupPaths = require('rollup-plugin-includepaths'),
    common = require('rollup-plugin-commonjs'),
    //npm = require('rollup-plugin-npm'),
    //css = require('rollup-plugin-stylus-css-modules'),
    //external = require('rollup-plugin-external'),
    //resolve = require('rollup-plugin-node-resolve'),
    sync = require('browser-sync'),
    libs = require('./lib.paths.js')

gulp.task('dist', function() {

    let vendor = gulp.src(libs.js)
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))

    let appJs = gulp.src('./app/*.js')
        .pipe(rollup({
            format: 'cjs',
            plugins: [
                rollupPaths({
                    external: [],
                    globals: [],
                    include: {}
                }),

            ]
        }))
        .pipe(babel())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))

    let css = {
        libs: function() {
            let libCss = gulp.src(libs.css)
            return libCss;
        },
        app: function() {
            let appCss = gulp.src('./app/*.styl')
                .pipe(stylus())
            return appCss;
        },
        merge: function() {
            let min = merge(css.libs(), css.app())
                .pipe(cssConcat('min.css'))
                .pipe(gulp.dest('./dist'))
            return min;
        }

    }

    return gulp.src('./index.html')
        .pipe(inject(series(vendor, appJs), {
            name: 'bundle',
            relative: true,
            ignorePath: 'dist'
        }))
        .pipe(inject(css.merge(), { relative: true, ignorePath: 'dist' }))
        .pipe(gulp.dest('./dist'))


});

gulp.task('watch', function() {
    gulp.watch(['app/**/*.js'], ['dist']).on('change', sync.reload)
    gulp.watch('./index.html', ['dist']).on('change', sync.reload)
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

// })}
/*
gulp.task('rollup', function() {
    return rollupStream({
            entry: './app/*.js'
        })
        .pipe(source('app.js'))
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))

})
*/
