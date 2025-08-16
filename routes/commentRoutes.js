const express = require('express');
const {
  addComment,
  listComments,
  deleteComment,
} = require('../controllers/commentController');

const router = express.Router({ mergeParams: true }); // ✅ merge postId from parent

router.route('/')
  .get(listComments)          // Public
  .post(addComment);          // No auth for now

router.route('/:commentId')
  .delete(deleteComment);     // No auth for now

module.exports = router;
