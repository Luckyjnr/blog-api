// controllers/postController.js
const Post = require('../models/post.js');

// Validate helpers
const validatePostInput = ({ title, content }) => {
  if (!title || !title.trim()) return 'Title is required';
  if (!content || !content.trim()) return 'Content is required';
  return null;
};

// Create Post
const createPost = async (req, res) => {
  try {
    const { title, content, tags, author } = req.body;
    const error = validatePostInput({ title, content });
    if (error) return res.status(400).json({ message: error });

    const post = await Post.create({
      title: title.trim(),
      content: content.trim(),
      tags: Array.isArray(tags) ? tags.map(t => String(t).trim().toLowerCase()) : [],
      author: author || '507f1f77bcf86cd799439011' // Default author ID for now
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email role')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get single post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email role');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update post
const updatePost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (title !== undefined) post.title = String(title).trim();
    if (content !== undefined) post.content = String(content).trim();
    if (tags !== undefined) {
      post.tags = Array.isArray(tags)
        ? tags.map(t => String(t).trim().toLowerCase())
        : [];
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await post.deleteOne();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,   // ✅ Now exported
  updatePost,
  deletePost
};
