const Post = require('../models/post');
const { isOwnerOrAdmin } = require('../middleware/authMiddleware');

// Validate helpers
const validatePostInput = ({ title, content }) => {
  if (!title || !title.trim()) return 'Title is required';
  if (!content || !content.trim()) return 'Content is required';
  return null;
};

// Create Post (auth)
const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const error = validatePostInput({ title, content });
    if (error) return res.status(400).json({ message: error });

    const post = await Post.create({
      title: title.trim(),
      content: content.trim(),
      tags: Array.isArray(tags) ? tags.map(t => String(t).trim().toLowerCase()) : [],
      author: req.user._id
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all posts (public) with pagination + filtering
const getPosts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      author,           // user id
      tags,             // comma-separated
      startDate,        // ISO date
      endDate
    } = req.query;

    const query = {};
    if (author) query.author = author;
    if (tags) query.tags = { $in: tags.split(',').map(t => t.trim().toLowerCase()) };
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const pageNum = Math.max(parseInt(page, 10), 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10), 1), 100);

    const [items, total] = await Promise.all([
      Post.find(query)
        .populate('author', 'name email role')
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Post.countDocuments(query)
    ]);

    res.json({
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum),
      items
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single post (public)
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email role');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update post (owner or admin)
const updatePost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!isOwnerOrAdmin(post.author, req.user)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (title !== undefined) post.title = String(title).trim();
    if (content !== undefined) post.content = String(content).trim();
    if (tags !== undefined) {
      post.tags = Array.isArray(tags) ? tags.map(t => String(t).trim().toLowerCase()) : [];
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete post (owner or admin)
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!isOwnerOrAdmin(post.author, req.user)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };
