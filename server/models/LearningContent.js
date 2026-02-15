const mongoose = require('mongoose');

const learningContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  category: {
    type: String,
    required: true,
    enum: ['programming', 'design', 'data-science', 'devops', 'security', 'soft-skills']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  content: {
    type: String,
    required: true
  },
  duration: {
    minutes: Number
  },
  prerequisites: [String],
  learningObjectives: [String],
  resources: [{
    title: String,
    url: String,
    type: String // 'video', 'article', 'documentation', 'exercise'
  }],
  author: String,
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('LearningContent', learningContentSchema);