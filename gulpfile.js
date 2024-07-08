const gulp = require('gulp');
const gulpSass = require('gulp-sass')(require('sass'));
const terser = require('gulp-terser');

function compilarSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(gulpSass({
            outputStyle: 'compressed'
        }).on('error', gulpSass.logError))
        .pipe(gulp.dest('./build/styles'));
}

async function comprimirImagens() {
    const imagemin = (await import('gulp-imagemin')).default;
    const imageminMozjpeg = (await import('imagemin-mozjpeg')).default;
    const imageminPngquant = (await import('imagemin-pngquant')).default;

    return gulp.src('./source/images/*')
        .pipe(imagemin([
            imageminMozjpeg({ quality: 75 }),
            imageminPngquant({ quality: [0.65, 0.80] })
        ]))
        .pipe(gulp.dest('./build/images'));
}

function minificarJavaScript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(terser())
        .pipe(gulp.dest('./build/scripts'));
}

exports.comprimirImagens = comprimirImagens;
exports.sass = compilarSass;
exports.minificarJavaScript = minificarJavaScript;
exports.watch = function() {
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilarSass));
    gulp.watch('./source/scripts/*.js', { ignoreInitial: false }, gulp.series(minificarJavaScript));
}
