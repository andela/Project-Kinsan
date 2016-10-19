var gulp = require('gulp'),
  livereload = require('gulp-livereload'),
  bower = require('gulp-bower'),
  sass = require('gulp-sass'),
  karma = require('karma').Server,
  eslint = require('gulp-eslint'),
  nodemon = require('gulp-nodemon');

gulp.task('bower', function () {
  return bower({
    'cmd': 'install',
    'directory': './public/lib',
    'verbosity': 2
  });
});

gulp.task('karma',function (done) {
  return new karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: process.env.TRAVIS ? true : false
  }, done).start();
});

gulp.task('sass', function(){
  return gulp.src('public/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css/'));
});

gulp.task('eslint', function() {
  return gulp.src(['gulpfile.js', 'public/js/**/*.js', 'test/**/*.js',
    'app/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('nodemon', function () {
  nodemon({
    script : 'server.js',
    ext : 'js',
    ignore: ['README.md', 'node_modules/!**', '.DS_Store'],
    watch:  ['app', 'config']
  }).on('restart', function () {
    //console.log('restarted!');
  });
});

gulp.task('watch', function () {
  livereload.listen();
  // jade
  gulp.watch(['app/views/**']);
  // js
  gulp.watch(['public/js/**', 'app/**/*.js'], ['eslint']);
  // html
  gulp.watch(['public/views/**']);
  // sass
  gulp.watch(['public/css/common.scss, public/css/views/articles.scss']);
  // css
  gulp.watch(['public/css/**'], ['sass']);
});

// Default task(s).
gulp.task('default', ['eslint', 'nodemon', 'watch', 'sass']);

// Test task
gulp.task('test',['karma']);

// Bower task
gulp.task('install',['bower']);
