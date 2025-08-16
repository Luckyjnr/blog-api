// __tests__/simple.test.js
describe("Simple Import Test", () => {
  it("should import user model", () => {
    try {
      const User = require('../models/user');
      expect(User).toBeDefined();
      expect(typeof User).toBe('function');
    } catch (error) {
      fail(`Failed to import user model: ${error.message}`);
    }
  });

  it("should import post model", () => {
    try {
      const Post = require('../models/post');
      expect(Post).toBeDefined();
      expect(typeof Post).toBe('function');
    } catch (error) {
      fail(`Failed to import post model: ${error.message}`);
    }
  });
});
