// jest.config.js
module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/testConfig.js", "<rootDir>/tests/setup.js"],
  testTimeout: 20000, // 20s to avoid random MongoDB startup delays
  automock: false,
  resetMocks: false,
  clearMocks: false
};
