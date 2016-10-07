module.exports = function (config) {
  config.set({
    frameworks: ['systemjs', 'qunit'],
    files: [
      'dist/*.test.js',
      { pattern: 'dist/**/*!(.test).js', included: false },
      { pattern: 'dist/**/*.html', included: false, nocache: true }
    ],
    plugins: ['karma-systemjs', 'karma-qunit', 'karma-chrome-launcher'],
    systemjs: {
      configFile: 'system.conf.js'
    },
    browsers: ['Chrome'],
    browserNoActivityTimeout: 15000,
    browserDisconnectTolerance: 10,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    concurrency: Infinity
  });
}
