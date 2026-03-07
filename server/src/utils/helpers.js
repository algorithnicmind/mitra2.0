/**
 * Async handler wrapper to avoid try-catch in every controller
 * Wraps an async function and passes errors to next()
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Create a custom error with status code
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.code = statusCode === 404 ? 'NOT_FOUND' : 
                statusCode === 400 ? 'BAD_REQUEST' :
                statusCode === 401 ? 'UNAUTHORIZED' :
                statusCode === 403 ? 'FORBIDDEN' :
                statusCode === 409 ? 'CONFLICT' : 'SERVER_ERROR';
  }
}

/**
 * Generate a random anonymous alias for users
 * e.g., "CalmOcean42", "HappyPanda17"
 */
const generateAnonymousAlias = () => {
  const adjectives = [
    'Calm', 'Brave', 'Gentle', 'Happy', 'Kind',
    'Peaceful', 'Bright', 'Serene', 'Warm', 'Quiet',
    'Hopeful', 'Strong', 'Patient', 'Wise', 'Cheerful',
    'Tender', 'Bold', 'Steady', 'Cool', 'Free',
  ];

  const nouns = [
    'Ocean', 'Panda', 'Star', 'Mountain', 'River',
    'Cloud', 'Dolphin', 'Sparrow', 'Lotus', 'Breeze',
    'Forest', 'Sunrise', 'Meadow', 'Eagle', 'Butterfly',
    'Moon', 'Rain', 'Phoenix', 'Tiger', 'Willow',
  ];

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 99) + 1;

  return `${adj}${noun}${num}`;
};

/**
 * Paginate query helper
 */
const paginate = (query, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  return query.skip(skip).limit(limit);
};

module.exports = {
  asyncHandler,
  AppError,
  generateAnonymousAlias,
  paginate,
};
