const gulp = require('gulp'),
    gutil = require("gulp-util"),
    webpack = require("webpack"),
    runSequence = require('run-sequence').use(gulp),
    rename = require("gulp-rename");

var replaceName = function (names, hasContent, replaceContent) {

   return names
        .map(function (value, index) {
            gulp
                .src(value)
                .pipe(rename(function (path) {
                    path.basename = path
                        .basename
                        .replace(hasContent, replaceContent)
                    // path.dirname += "/ciao"; path.basename += "-goodbye"; path.extname = ".md";
                }))
                .pipe(gulp.dest("./dist"));
        })
}

gulp.task("webpack", function (callback) {

    var webpackConfig = require("./webpack.config.js");

    // modify some webpack config options
    webpack(Object.create(webpackConfig), function (err, stats) {
        if (err) 
            throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });

});

let env = "development";

gulp.task("config", function () {
    gulp
        .src([
        "./app/config/localConfig." + env + ".json",
        "./config/sysConfig." + env + ".json",
        "./process.json"
    ])
        .pipe(gulp.dest("./dist"));
})

gulp.task("dev-config", function () {
    return replaceName([
        "./app/config/localConfig.development.json", "./config/sysConfig.development.json", "./process.json"
    ], "development", env)
})

gulp.task("mv", function () {
    gulp
        .src("./dist/*")
        .pipe(gulp.dest("./../release/KoaServer/"));

    gulp
        .src("./package.json")
        .pipe(gulp.dest("./../release/KoaServer/"));
})

gulp.task("build", function () {
    env = "production";
    runSequence("webpack", "config", "mv")
})

gulp.task("dev-build", function () {
    env = "production";
    runSequence("webpack", "dev-config", "mv");

})