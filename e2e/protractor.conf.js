// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

exports.config = {
  allScriptsTimeout: 11000,
  specs: ['./features/**/*.feature'],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--no-sandbox']
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4201/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: ['./steps/**/*.ts'],
    strict: true,
    dryRun: false,
    format: 'progress-bar'
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
  },
  suites: {
    home: './features/home.feature',
    logout: './features/logout.feature',
    restorePassword: './features/restore-password.feature',
    signin: './features/signin.feature',
    signup: './features/signup.feature',
  }
};
