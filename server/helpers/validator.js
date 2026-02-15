// Validation helper functions
const validator = {
  // Validate email format
  isEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate password strength
  isPasswordStrong: (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  },

  // Validate required fields
  validateRequired: (fields, data) => {
    const errors = [];
    for (const field of fields) {
      if (!data[field] || data[field].toString().trim() === '') {
        errors.push(`${field} is required`);
      }
    }
    return errors;
  },

  // Validate number is within range
  isInRange: (num, min, max) => {
    return num >= min && num <= max;
  },

  // Validate object ID format (basic check)
  isValidObjectId: (id) => {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return objectIdRegex.test(id);
  }
};

module.exports = validator;