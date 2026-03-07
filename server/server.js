// =============================================
// Mitra 2.0 — Backend Server Entry Point
// =============================================

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');

// Load environment config FIRST
const config = require('./src/config/env');

// Import config
const connectDB = require('./src/config/db');

// Import middleware
const errorHandler = require('./src/middleware/errorHandler');
const { apiLimiter } = require('./src/middleware/rateLimiter');

// Import routes
const authRoutes = require('./src/routes/authRoutes');

// Initialize Express app
const app = express();

// ==================== MIDDLEWARE ====================

// Security headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: config.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Sanitize data against NoSQL injection
app.use(mongoSanitize());

// Request logging (dev only)
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
app.use('/api/', apiLimiter);

// ==================== ROUTES ====================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '🧠 Mitra 2.0 API is running',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/auth', authRoutes);
// app.use('/api/chat', chatRoutes);          // Section 5
// app.use('/api/screening', screeningRoutes); // Section 6
// app.use('/api/booking', bookingRoutes);     // Section 7
// app.use('/api/mood', moodRoutes);           // Section 9
// app.use('/api/community', communityRoutes); // Section 9
// app.use('/api/resources', resourceRoutes);  // Section 9
// app.use('/api/admin', adminRoutes);         // Section 8

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.originalUrl} not found`,
    },
  });
});

// Global error handler (must be last)
app.use(errorHandler);

// ==================== START SERVER ====================

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start listening
    const PORT = config.port;
    app.listen(PORT, () => {
      console.log('');
      console.log('='.repeat(50));
      console.log('  🧠 Mitra 2.0 — Mental Health Support Platform');
      console.log('='.repeat(50));
      console.log(`  🚀 Server:      http://localhost:${PORT}`);
      console.log(`  📡 API:         http://localhost:${PORT}/api`);
      console.log(`  🌍 Environment: ${config.nodeEnv}`);
      console.log(`  📦 Database:    MongoDB Atlas`);
      console.log('='.repeat(50));
      console.log('');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;
