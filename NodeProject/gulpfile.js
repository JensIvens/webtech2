var gulp = require('gulp'), 
 minifyCSS = require('gulp-minify-css'),
 concatCss = require('gulp-concat-css'),
 livereload = require('gulp-livereload'),
 imagemin = require('gulp-imagemin'),
 cleanhtml = require('gulp-cleanhtml'),
 clean = require('gulp-clean'),
 jsmin = require('gulp-jsmin'),
 rename = require('gulp-rename');

gulp.task('styles', function() { 
	gulp.src('public/stylesheets/*.css') 
	.pipe(concatCss('build.css'))
	.pipe(minifyCSS(opts)) 
	.pipe(gulp.dest('build/css/')) 
	.pipe(livereload());
	gulp.src('*.html')
    .pipe(cleanhtml())
    .pipe(gulp.dest('build/'))
});

gulp.task('watch', function(){  
 gulp.watch('public/stylesheets/*.css', ['styles']),
 gulp.watch('images/*', ['images']);
 gulp.src('build', {read: false})
        .pipe(clean());
var server = livereload();
 	gulp.watch('build/**').on('change', function(file) {
    server.changed(file.path);
  });
})

gulp.task('images', function() { 
	return gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images/'));
});

gulp.task('mini', function () {
    gulp.src('public/javascripts/*.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/javascripts/'));
});