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
      'public/lib/hello/dist/hello.all.min.js',
      'public/js/*.js',
      'public/js/**/*.js',
      'public/js/controllers/*.js',
      'public/js/services/*.js',
      'public/views/*.tpl.html', // Ralph: load template file for the directives
      'test/app/*.test.js',
      'test/app/**/*.test.js',
      {pattern: 'test/app/response.json', watched: true, served: true, included: false},
      {pattern: 'test/app/token.json', watched: true, served: true, included: false}
    ],


    // list of files to exclude
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-jasmine-html-reporter',
      'karma-ng-html2js-preprocessor'
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

<<<<<<< 4e440bc8117d7f52d0b3269a330a4adf93aa6e91
    ngHtml2JsPreprocessor: {
<<<<<<< c513bfc660ff3552e2d9cdc42d2a4fd9421cd090
      stripPrefix: 'public' //Ralph: strip public away from the link of the template
=======
      stripPrefix: 'public/' //Ralph: strip public away from the link of the template
>>>>>>> Feature(add-ng-html2js-to-karma): Add ng-html2js preprocessor to karma
    },
=======
    // ngHtml2JsPreprocessor: {
    //   stripPrefix: 'public/' //Ralph: strip public away from the link of the template
    // },
>>>>>>> Feature(player-test): Add test for player component

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
