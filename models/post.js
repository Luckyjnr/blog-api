const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    content: { type: String, required: [true, 'Content is required'] },
    tags: [{ type: String, trim: true, lowercase: true }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

// 🔹 Create a combined searchable text field
postSchema.pre('save', function (next) {
  if (this.tags && Array.isArray(this.tags)) {
    this.tagsText = this.tags.join(' ');
  }
  next();
});

// ✅ Index only text-safe fields
postSchema.index({ title: 'text', content: 'text', tagsText: 'text' });

// ✅ Optional sort index for performance
postSchema.index({ author: 1, createdAt: -1 });

module.exports = mongoose.model('Post', postSchema);
