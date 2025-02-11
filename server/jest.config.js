module.exports = {
  reporters: [
    "default",
    ["jest-html-reporters", {
      "publicPath": "./reports",
      "filename": "index.html",
      "expand": true
    }]
  ],
  collectCoverage: true,  // Mantieni Istanbul attivo
  coverageDirectory: "./reports/coverage",
  coverageReporters: ["html", "lcov", "text-summary"]
};
