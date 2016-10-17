module.exports = function(config) {

  config.set({

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    reporters: ['progress', 'coverage', 'kjhtml'],
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'public/lib/jquery/dist/jquery.js',
      'public/lib/jasmine-jquery/lib/jasmine-jquery.js',
      'public/lib/angular/angular.js',
      'public/lib/angular-resource/angular-resource.js',
      'public/lib/angular-mocks/angular-mocks.js',
      'public/lib/firebase/firebase.js',
      'public/js/socket.io.js',
      './src/app/**/*.js',
      './src/app/*.js',
      'public/js/*.js',
      'public/js/**/*.js',
      './src/test/**/*.js',
      'public/views/*.tpl.html', // Ralph: load template file for the directives
      './src/test/*.js',
      'test/app/*.test.js',
      'test/app/**/*.test.js',
      {pattern: 'test/app/response.json', watched: true, served: true, included: false}
    ],


    // list of files to exclude
    exclude: [
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './src/app/**/*.js': ['coverage'],
      'public/views/*.tpl.html': 'ng-html2js' // Ralph: add ng-html2js to watch the template files
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'public' //Ralph: strip public away from the link of the template
    },

    coverageReporter: {
      type : 'lcov',
      dir : 'coverage/'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });

  if (process.env.TRAVIS) {
    config.browsers = ['Chrome_travis_ci'];
  }
};
