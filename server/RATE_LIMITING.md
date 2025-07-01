# Rate Limiting Implementation

This document outlines the comprehensive rate limiting strategy implemented in the e-commerce application to protect against abuse and ensure fair usage.

## Overview

Rate limiting is implemented using `express-rate-limit` middleware with different limits for different types of endpoints based on their sensitivity and usage patterns.

## Rate Limiters

### 1. General API Rate Limiter
- **Limit**: 100 requests per 15 minutes per IP
- **Purpose**: General protection against API abuse
- **Applied to**: All routes globally

### 2. Authentication Rate Limiter
- **Limit**: 5 attempts per 15 minutes per IP + User-Agent
- **Purpose**: Prevent brute force attacks on login/signup
- **Applied to**: `/signup`, `/login`
- **Features**: 
  - Skips successful requests
  - Uses IP + User-Agent for better identification

### 3. Admin Authentication Rate Limiter
- **Limit**: 3 attempts per 15 minutes per IP + User-Agent
- **Purpose**: Extra protection for admin login (more sensitive)
- **Applied to**: `/admin-signup`, `/admin-login`
- **Features**: 
  - Stricter than regular auth
  - Skips successful requests

### 4. Product Creation Rate Limiter
- **Limit**: 10 creations per hour per IP
- **Purpose**: Prevent spam product creation
- **Applied to**: `/create-product`

### 5. Review Submission Rate Limiter
- **Limit**: 5 reviews per hour per user
- **Purpose**: Prevent review spam
- **Applied to**: `/create-review`, `/update-review`, `/reply-review`
- **Features**: Uses user ID when authenticated

### 6. Payment Rate Limiter
- **Limit**: 5 payment attempts per hour per user
- **Purpose**: Prevent payment abuse
- **Applied to**: `/generate-payment`, `/verify-payment`
- **Features**: Uses user ID when authenticated

### 7. Search Rate Limiter
- **Limit**: 30 searches per 5 minutes per IP
- **Purpose**: Prevent search abuse
- **Applied to**: `/get-products`, `/get-product-by-name`

### 8. File Upload Rate Limiter
- **Limit**: 20 uploads per hour per IP
- **Purpose**: Prevent storage abuse
- **Applied to**: File upload endpoints

### 9. Settings Change Rate Limiter
- **Limit**: 5 changes per hour per user
- **Purpose**: Prevent settings abuse
- **Applied to**: `/change-username`, `/change-password`
- **Features**: Uses user ID when authenticated

### 10. Order Rate Limiter
- **Limit**: 10 orders per hour per user
- **Purpose**: Prevent order spam
- **Applied to**: `/get-orders-by-user-id`
- **Features**: Uses user ID when authenticated

### 11. Analytics Rate Limiter
- **Limit**: 20 requests per 5 minutes per IP
- **Purpose**: Prevent analytics abuse
- **Applied to**: `/get-metrics`

### 12. Pincode Management Rate Limiter
- **Limit**: 5 operations per hour per IP
- **Purpose**: Prevent pincode management abuse
- **Applied to**: `/add-pincodes`

### 13. Suspicious Activity Rate Limiter
- **Limit**: 50 requests per hour per IP
- **Purpose**: Catch suspicious activity patterns
- **Applied to**: All unauthenticated routes
- **Features**: Skips authenticated users

## Response Headers

All rate limiters include standard headers:
- `RateLimit-Limit`: Maximum requests allowed
- `RateLimit-Remaining`: Remaining requests in current window
- `RateLimit-Reset`: Time when the rate limit resets

## Error Response Format

When rate limit is exceeded:
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

## Logging

Rate limit violations are logged to the console with:
- IP address
- User-Agent
- Request path
- Timestamp

Example log:
```
🚨 Rate limit exceeded for IP: 192.168.1.1, User-Agent: Mozilla/5.0..., Path: /api/login
```

## Configuration

Rate limits can be adjusted by modifying the values in `server/middlewares/rateLimiter.js`:

- `windowMs`: Time window for the limit
- `max`: Maximum number of requests allowed
- `skipSuccessfulRequests`: Whether to skip counting successful requests
- `keyGenerator`: Custom function to generate rate limit keys

## Best Practices

1. **Monitor logs** for rate limit violations to identify potential attacks
2. **Adjust limits** based on actual usage patterns
3. **Consider user feedback** if legitimate users are hitting limits
4. **Use different limits** for different user types (admin vs regular users)
5. **Implement progressive delays** for repeated violations if needed

## Security Benefits

- **Prevents brute force attacks** on authentication endpoints
- **Protects against spam** in reviews and product creation
- **Prevents API abuse** and resource exhaustion
- **Reduces server load** from malicious requests
- **Protects payment systems** from abuse
- **Maintains service quality** for legitimate users 