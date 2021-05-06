module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  watchPathIgnorePatterns: ["/node_modules/"],
  collectCoverage: true,
  collectCoverageFrom: [
    "./src/components/**/*.{js,vue}",
    "!**/node_modules/**",
  ],
};
