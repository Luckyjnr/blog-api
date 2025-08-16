// __tests__/post.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../tests/testApp");
const Post = require("../models/post");

// Mock the authMiddleware
jest.mock('../middleware/authMiddleware', () => ({
  protect: (req, res, next) => {
    req.user = { _id: '507f1f77bcf86cd799439011', role: 'user' };
    next();
  },
  isOwnerOrAdmin: () => true
}));

describe("Post API", () => {
  it("should create a new post", async () => {
    const res = await request(app)
      .post("/api/posts")
      .send({
        title: "Test Post",
        content: "This is a test post",
        author: new mongoose.Types.ObjectId(), // ✅ REQUIRED
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Post");
  });

  it("should update a post", async () => {
    const post = await Post.create({
      title: "Old",
      content: "Stuff",
      author: new mongoose.Types.ObjectId(),
    });

    const res = await request(app)
      .patch(`/api/posts/${post._id}`)
      .send({ title: "New" });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("New");
  });

  it("should delete a post", async () => {
    const post = await Post.create({
      title: "Del",
      content: "Me",
      author: new mongoose.Types.ObjectId(),
    });

    const res = await request(app).delete(`/api/posts/${post._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Post deleted successfully");
  });
});
