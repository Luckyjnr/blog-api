// jest.config.js
module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/testConfig.js", "<rootDir>/tests/setup.js"],
  testTimeout: 30000, // 30s to avoid random MongoDB startup delays
  verbose: true,
  moduleDirectories: ['node_modules', 'models', 'controllers', 'routes'],
  moduleFileExtensions: ['js', 'json'],
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js']
};
