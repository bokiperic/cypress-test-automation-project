const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'pesoss',
  chromeWebSecurity: false, // needed in order for cross-origin to work
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
  "defaultCommandTimeout": 8000,
  "env": {
    "baseUrl": "https://rahulshettyacademy.com"
  }
});
