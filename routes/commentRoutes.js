const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  addComment,
  listComments,
  deleteComment,
} = require('../controllers/commentController');

const router = express.Router({ mergeParams: true }); // ✅ merge postId from parent

router.route('/')
  .get(listComments)          // Public
  .post(protect, addComment); // Auth

router.route('/:commentId')
  .delete(protect, deleteComment); // Owner/admin

module.exports = router;
