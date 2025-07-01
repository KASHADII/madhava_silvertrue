const rateLimit = require('express-rate-limit');

// Helper function to log rate limit violations
const logRateLimitViolation = (req, res, next) => {
  console.log(`🚨 Rate limit exceeded for IP: ${req.ip}, User-Agent: ${req.get('User-Agent')}, Path: ${req.path}`);
  next();
};

// General API rate limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    logRateLimitViolation(req, res, () => {});
    res.status(429).json({
      success: false,
      message: 'Too many requests from this IP, please try again later.'
    });
  }
});

// Authentication rate limiter (more strict for login/signup)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logRateLimitViolation(req, res, () => {});
    res.status(429).json({
      success: false,
      message: 'Too many authentication attempts, please try again later.'
    });
  },
  skipSuccessfulRequests: true, // Don't count successful requests
  keyGenerator: (req) => {
    // Use IP + user agent for better rate limiting
    return req.ip + req.get('User-Agent');
  }
});

// Admin authentication rate limiter (very strict)
const adminAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 requests per windowMs
  message: {
    success: false,
    message: 'Too many admin login attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logRateLimitViolation(req, res, () => {});
    res.status(429).json({
      success: false,
      message: 'Too many admin login attempts, please try again later.'
    });
  },
  skipSuccessfulRequests: true,
  keyGenerator: (req) => {
    return req.ip + req.get('User-Agent');
  }
});

// Product creation rate limiter (for admin)
const productCreationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 product creations per hour
  message: {
    success: false,
    message: 'Too many product creation attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logRateLimitViolation(req, res, () => {});
    res.status(429).json({
      success: false,
      message: 'Too many product creation attempts, please try again later.'
    });
  }
});

// Review submission rate limiter
const reviewLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each user to 5 reviews per hour
  message: {
    success: false,
    message: 'Too many review submissions, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logRateLimitViolation(req, res, () => {});
    res.status(429).json({
      success: false,
      message: 'Too many review submissions, please try again later.'
    });
  },
  keyGenerator: (req) => {
    // Use user ID if authenticated, otherwise IP
    return req.id || req.ip;
  }
});

// Payment rate limiter
const paymentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each user to 5 payment attempts per hour
  message: {
    success: false,
    message: 'Too many payment attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logRateLimitViolation(req, res, () => {});
    res.status(429).json({
      success: false,
      message: 'Too many payment attempts, please try again later.'
    });
  },
  keyGenerator: (req) => {
    return req.id || req.ip;
  }
});

// Search rate limiter
const searchLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 30, // Limit each IP to 30 searches per 5 minutes
  message: {
    success: false,
    message: 'Too many search requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logRateLimitViolation(req, res, () => {});
    res.status(429).json({
      success: false,
      message: 'Too many search requests, please try again later.'
    });
  }
});

// File upload rate limiter
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Limit each IP to 20 uploads per hour
  message: {
    success: false,
    message: 'Too many file uploads, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logRateLimitViolation(req, res, () => {});
    res.status(429).json({
      success: false,
      message: 'Too many file uploads, please try again later.'
    });
  }
});

// Settings change rate limiter
const settingsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each user to 5 settings changes per hour
  message: {
    success: false,
    message: 'Too many settings changes, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logRateLimitViolation(req, res, () => {});
    res.status(429).json({
      success: false,
      message: 'Too many settings changes, please try again later.'
    });
  },
  keyGenerator: (req) => {
    return req.id || req.ip;
  }
});

// Order creation rate limiter
const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each user to 10 orders per hour
  message: {
    success: false,
    message: 'Too many order attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logRateLimitViolation(req, res, () => {});
    res.status(429).json({
      success: false,
      message: 'Too many order attempts, please try again later.'
    });
  },
  keyGenerator: (req) => {
    return req.id || req.ip;
  }
});

// Analytics rate limiter (for admin dashboard)
const analyticsLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 20, // Limit each IP to 20 analytics requests per 5 minutes
  message: {
    success: false,
    message: 'Too many analytics requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logRateLimitViolation(req, res, () => {});
    res.status(429).json({
      success: false,
      message: 'Too many analytics requests, please try again later.'
    });
  }
});

// Pincode management rate limiter (for admin)
const pincodeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 pincode operations per hour
  message: {
    success: false,
    message: 'Too many pincode operations, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logRateLimitViolation(req, res, () => {});
    res.status(429).json({
      success: false,
      message: 'Too many pincode operations, please try again later.'
    });
  }
});

// IP-based rate limiter for suspicious activity
const suspiciousActivityLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // Limit each IP to 50 requests per hour
  message: {
    success: false,
    message: 'Suspicious activity detected, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logRateLimitViolation(req, res, () => {});
    res.status(429).json({
      success: false,
      message: 'Suspicious activity detected, please try again later.'
    });
  },
  skip: (req) => {
    // Skip rate limiting for authenticated users
    return req.id !== undefined;
  }
});

module.exports = {
  generalLimiter,
  authLimiter,
  adminAuthLimiter,
  productCreationLimiter,
  reviewLimiter,
  paymentLimiter,
  searchLimiter,
  uploadLimiter,
  settingsLimiter,
  orderLimiter,
  analyticsLimiter,
  pincodeLimiter,
  suspiciousActivityLimiter
}; 