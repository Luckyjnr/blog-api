const Comment = require('../models/comment');
const Post = require('../models/post');
const { isOwnerOrAdmin } = require('../middleware/authMiddleware');

const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    if (!content || !content.trim()) return res.status(400).json({ message: 'Content is required' });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = await Comment.create({
      post: postId,
      author: req.user._id,
      content: content.trim()
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const listComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId })
      .populate('author', 'name email role')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const comment = await Comment.findOne({ _id: commentId, post: postId });
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (!isOwnerOrAdmin(comment.author, req.user)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await comment.deleteOne();
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addComment, listComments, deleteComment };
