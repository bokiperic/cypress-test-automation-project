const { defineConfig } = require("cypress");
const preprocessor = require('@badeball/cypress-cucumber-preprocessor')
const browserify = require('@badeball/cypress-cucumber-preprocessor/browserify')

async function setupNodeEvents(on, config) {
  // implement node event listeners here
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));
  return config;
}

module.exports = defineConfig({
  projectId: 'pesoss',
  chromeWebSecurity: false, // needed in order for cross-origin to work
  e2e: {
    setupNodeEvents,

    // 'specPattern' for the Framework w/o BDD
    // specPattern: 'cypress/e2e/examples/*.js'

    // 'specPattern' for the Framework WITH BDD
    specPattern: 'cypress/e2e/examples/BDD/*.feature'
  },
  "defaultCommandTimeout": 8000,
  "env": {
    "baseUrl": "https://rahulshettyacademy.com"
  }
});
