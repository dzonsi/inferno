//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      'lib/jquery/dist/jquery.min.js',
      'lib/angular/angular.js',
      'lib/angular-route/angular-route.js',
      'lib/angular-animate/angular-animate.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      'app.module.js',
      '**/*.module.js',
      'core/**/*.js',
      '**/*.controller.js',
      '**/*.component.js',
      '**/*.spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ]

  });
};
