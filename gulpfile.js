const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const sass = require('sass');
const imagemin = require('gulp-imagemin');

const compileSass = gulpSass(sass);

function compilarSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(compileSass({
            outputStyle: 'compressed'
        }).on('error', compileSass.logError))
        .pipe(gulp.dest('./build/styles'));
}

function comprimirImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

exports.comprimirImagens = comprimirImagens;
exports.sass = compilarSass;
exports.watch = function() {
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilarSass));
}
