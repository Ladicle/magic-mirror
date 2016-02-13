import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

const $ = gulpLoadPlugins();

gulp.task('babel', () => {
  gulp.src('./src/js/*.js')
    .pipe($.plumber())
    .pipe($.babel())
    .pipe(gulp.dest('./js'));
});

gulp.task('stylus', () => {
  gulp.src('./src/css/*.stylus')
    .pipe($.plumber())
    .pipe($.stylus())
    .pipe($.autoprefixer('last 2 version'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({stream: true, once: true}))
    ;
});

gulp.task('jade', () => {
  gulp.src('./src/*.jade')
    .pipe($.plumber())
    .pipe($.jade())
    .pipe(gulp.dest('./'));
});

gulp.task('serve', () => {
  browserSync.init(null, {
    server: {baseDir: './'}
  });
});

gulp.task('reload', () => browserSync.reload());

gulp.task('watch', () => {
  gulp.watch('./src/js/*.js', ['babel', 'reload']);
  gulp.watch('./src/css/*.stylus', ['stylus', 'reload']);
  gulp.watch('./src/*.jade', ['jade', 'reload']);
});

gulp.task('build', ['babel', 'stylus', 'jade']);
gulp.task('default', ['serve', 'build', 'watch']);
