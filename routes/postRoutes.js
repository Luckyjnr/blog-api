const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController');

const commentRoutes = require('./commentRoutes');

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, createPost);

router.route('/:id')
  .get(getPostById)
  .patch(protect, updatePost)
  .delete(protect, deletePost);

// ✅ Mount comment routes under posts
router.use('/:postId/comments', commentRoutes);

module.exports = router;
