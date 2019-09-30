const gulp = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnaano = require("cssnano");
const sass = require("gulp-sass");
const terser = require("gulp-terser");
const rename = require("gulp-rename");

function styles() {
    return(
        gulp.src("css/*.scss")
            .pipe(sass())
            .pipe(postcss([autoprefixer({grid:true}),cssnaano()]))
            .pipe(gulp.dest("css"))

    );
}

function js() {
    return(
        gulp.src(["js/*.js","!js/*min.js"])
            .pipe(terser())
            .pipe(rename({
                suffix:".min"
            }))
            .pipe(gulp.dest("js"))
    );
}

function watch() {
    gulp.watch("css/*.scss", styles);
    gulp.watch(["js/*.js","!js/*min.js"], js);


}

const build = gulp.parallel(styles, js);


exports.styles = styles;
exports.watch = watch;
exports.js = js;
exports.build = build;


