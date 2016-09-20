var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    bower = require('gulp-bower'),
    mocha = require('gulp-mocha'),
    sass = require("gulp-sass"),
    jshint = require('gulp-jshint'),
    nodemon = require('gulp-nodemon');

gulp.task('install', function () {
    return bower({
        "cmd": "install",
        "directory": "./public/lib",
        "verbosity": 2
    });
});

gulp.task('mochaTest', function () {
   return gulp.src('test/**/*.js')
       .pipe(mocha({
           "reporter" : "spec"
       }));
});

gulp.task('sass', function(){
   return gulp.src('public/css/common.scss')
       .pipe(sass().on('error', sass.logError))
       .pipe(gulp.dest('public/css/'));
});

gulp.task('jshint', function() {
    return gulp.src(['gruntfile.js', 'public/js/**/*.js', 'test/**/*.js',
        'app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('nodemon', function () {
    nodemon({
        script : "server.js",
        ext : "js",
        ignore: ['README.md', 'node_modules/!**', '.DS_Store'],
        watch:  ['app', 'config']
    }).on('restart', function () {
        console.log('restarted!')
    });
/*   return nodemon({
       dev: {
           options: {
               file: 'server.js',
               args: [],
               ignoredFiles: ['README.md', 'node_modules/!**', '.DS_Store'],
               watchedExtensions: ['js'],
               watchedFolders: ['app', 'config'],
               debug: true,
               delayTime: 1,
               env: {
                   PORT: 3000
               },
               cwd: __dirname
           }
       }
   });*/
});

gulp.task('watch', function () {
    livereload.listen();
    // jade
    gulp.watch(['app/views/**']);
    // js
    gulp.watch(['public/js/**', 'app/**/*.js'], ['jshint']);
    // html
    gulp.watch(['public/views/**']);
    // sass
    gulp.watch(['public/css/common.scss, public/css/views/articles.scss']);
    // css
    gulp.watch(['public/css/**'], ['sass']);
});
