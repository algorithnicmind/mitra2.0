const dotenv = require('dotenv');
const path = require('path');

// Load .env file from server root
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mitra',
  jwtSecret: process.env.JWT_SECRET || 'default_dev_secret_change_me',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  aiServiceUrl: process.env.AI_SERVICE_URL || 'http://localhost:8000',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT, 10) || 587,
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },
};

module.exports = config;
