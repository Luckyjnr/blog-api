// __tests__/comment.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../tests/testApp");
const Post = require("../models/post");
const Comment = require("../models/comment");

// Mock the authMiddleware
jest.mock('../middleware/authMiddleware', () => ({
  protect: (req, res, next) => {
    req.user = { _id: '507f1f77bcf86cd799439011', role: 'user' };
    next();
  },
  isOwnerOrAdmin: () => true
}));

describe("Comment API", () => {
  let post;

  beforeEach(async () => {
    post = await Post.create({
      title: "Post for comments",
      content: "Some content",
      author: new mongoose.Types.ObjectId(),
    });
  });

  it("should add a comment to a post", async () => {
    const res = await request(app)
      .post(`/api/posts/${post._id}/comments`)
      .send({
        content: "Great post!",
        author: new mongoose.Types.ObjectId(), // ✅ REQUIRED
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.content).toBe("Great post!");
  });

  it("should delete a comment", async () => {
    const comment = await Comment.create({
      content: "Delete me",
      post: post._id,
      author: new mongoose.Types.ObjectId(),
    });

    const res = await request(app).delete(
      `/api/posts/${post._id}/comments/${comment._id}`
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Comment deleted");
  });
});
