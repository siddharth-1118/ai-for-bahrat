const LearningContent = require('../models/LearningContent');

class LearningContentService {
  // Create new learning content
  static async createContent(contentData) {
    const content = new LearningContent(contentData);
    await content.save();
    return content;
  }

  // Get learning content by ID
  static async getContentById(contentId) {
    const content = await LearningContent.findById(contentId);
    if (!content || !content.isActive) {
      throw new Error('Content not found or inactive');
    }
    return content;
  }

  // Get all learning content with filters
  static async getAllContent(filters = {}) {
    const query = { isActive: true };
    
    if (filters.category) {
      query.category = filters.category;
    }
    
    if (filters.difficulty) {
      query.difficulty = filters.difficulty;
    }
    
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } }
      ];
    }

    const contents = await LearningContent.find(query);
    return contents;
  }

  // Update learning content
  static async updateContent(contentId, updateData) {
    const content = await LearningContent.findByIdAndUpdate(
      contentId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!content) {
      throw new Error('Content not found');
    }

    return content;
  }

  // Delete learning content (soft delete)
  static async deleteContent(contentId) {
    const content = await LearningContent.findByIdAndUpdate(
      contentId,
      { isActive: false },
      { new: true }
    );

    if (!content) {
      throw new Error('Content not found');
    }

    return content;
  }

  // Rate learning content
  static async rateContent(contentId, userId, rating) {
    const content = await LearningContent.findById(contentId);
    if (!content || !content.isActive) {
      throw new Error('Content not found or inactive');
    }

    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    // Update rating
    if (!content.ratings) {
      content.ratings = {};
    }

    content.ratings[userId] = rating;

    // Recalculate average rating
    const ratings = Object.values(content.ratings);
    content.rating.average = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
    content.rating.count = ratings.length;

    await content.save();
    return content;
  }
}

module.exports = LearningContentService;