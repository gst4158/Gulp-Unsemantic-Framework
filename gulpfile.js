/*
* Required gulp/browser-sync
* ----------------------------------------------- */
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var rename      = require("gulp-rename");

// style merging
var less         = require('gulp-less');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS     = require('gulp-clean-css');

// merge js
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');

// variables
var _settings = _settings || {};
_settings.appPath    = 'app';
_settings.assetsPath = 'app/assets';
_settings.distPath   = 'app/assets/_dist';

/*
* Start Gulp Script
* ----------------------------------------------- */
// Static Server + watching scss/html files
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            browser: 'chrome',
            baseDir: "./app"
        }
    });

    gulp.watch(_settings.assetsPath + '/less/style.less', ['less']);
    gulp.watch(_settings.assetsPath + '/scss/style.scss', ['sass']);
    gulp.watch(_settings.assetsPath + '/js/*.js', ['js']);
    gulp.watch(_settings.appPath  + '/*.html').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(_settings.assetsPath + '/scss/style.scss')
        .pipe(sass())
        .on('error', swallowError)
        .pipe(autoprefixer())

        // non-minified
        .pipe(gulp.dest(_settings.distPath))

        // minify
        .pipe(minifyCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(_settings.distPath))
        
        // reload sync
        .pipe(browserSync.stream());
});

// Compile less into CSS & auto-inject into browsers
gulp.task('less', function() {
    return gulp.src(_settings.assetsPath + '/less/style.less')
        .pipe(less())
        .on('error', swallowError)
        .pipe(autoprefixer())

        // non-minified
        //.pipe(gulp.dest(_settings.distPath))
        .pipe(rename('style.less.css'))
        .pipe(gulp.dest(_settings.distPath))

        // minify
        //.pipe(minifyCSS())
        //.pipe(rename('style.less.min.css'))
        //.pipe(gulp.dest(_settings.distPath))
        
        // reload sync
        .pipe(browserSync.stream());
});

// Reload JS files
gulp.task('js', function () {
    return gulp.src(_settings.assetsPath + '/js/*js')
        .pipe(concat('script.js'))
        .on('error', swallowError)

        // non-minified
        .pipe(gulp.dest(_settings.distPath))
        
        // minify
        .pipe(uglify())
        .pipe(rename('script.min.js'))
        .pipe(gulp.dest(_settings.distPath))
        
        // reload sync
        .pipe(browserSync.stream());

});

// Prevent errors from crashing gulp instance
function swallowError (error) {
    // error details
    console.log(error.toString())

    this.emit('end')
}
gulp.task('default', ['browser-sync']);