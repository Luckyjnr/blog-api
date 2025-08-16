const express = require('express');
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
  .post(createPost);

router.route('/:id')
  .get(getPostById)
  .patch(updatePost)
  .delete(deletePost);

// ✅ Mount comment routes under posts
router.use('/:postId/comments', commentRoutes);

module.exports = router;
