const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false, // needed in order for cross-origin to work
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
