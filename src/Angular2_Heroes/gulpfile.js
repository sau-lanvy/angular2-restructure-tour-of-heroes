var gulp = require('gulp'),
Q = require('q'),
rimraf = require('rimraf');
var ts = require('gulp-typescript');

var project = require("./project.json");
var webroot = "./wwwroot/";

gulp.task('clean', function (cb) {
    return rimraf(webroot + 'libs/', cb);
});

gulp.task('copy:lib', ['clean'], function () {
    var libs = [
       "@angular",
       "systemjs",
       "core-js",
       "zone.js",
       "reflect-metadata",
       "rxjs",
       "es6-shim",
       "angular2-in-memory-web-api"
    ];

    var promises = [];

    libs.forEach(function (lib) {
        var defer = Q.defer();
        var pipeline = gulp
           .src('node_modules/' + lib + '/**/*')
           .pipe(gulp.dest(webroot + 'libs/' + lib));

        pipeline.on('end', function () {
            defer.resolve();
        });
        promises.push(defer.promise);
    });

    return Q.all(promises);
});

var tsProject = ts.createProject('./wwwroot/tsconfig.json');

gulp.task('compile-typescript', function (done) {
    var tsResult = gulp.src([
       "wwwroot/app/**/*.ts"
    ])
     .pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
    return tsResult.js.pipe(gulp.dest(webroot + 'js/app/'));
});

gulp.task('watch.ts', ['compile-typescript'], function () {
    return gulp.watch('wwwroot/app/**/*.ts', ['compile-typescript']);
});

gulp.task('watch', ['watch.ts']);

gulp.task('default', ['clean', 'copy:lib', 'watch']);