// playwright.config.js
module.exports = {
  testDir: './tests',
  use: {
    headless: false, // set to true for CI
    baseURL: 'http://localhost:3000', // your Express app URL
  },
};
