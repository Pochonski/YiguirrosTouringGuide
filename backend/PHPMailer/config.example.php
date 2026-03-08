<?php
/**
 * Local Configuration File
 * This file contains sensitive data and should NOT be committed to version control
 * Copy this file to config.local.php and update with your actual credentials
 */

// Email configuration
define('EMAIL_TO', 'your-email@gmail.com');
define('EMAIL_FROM', 'your-email@gmail.com');
define('EMAIL_FROM_NAME', 'Yiguirros Touring Guide');

// SMTP configuration for Gmail
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'your-gmail@gmail.com'); // Your Gmail address
define('SMTP_PASSWORD', 'your-app-password'); // App password from Google
define('SMTP_ENCRYPTION', 'tls');

// reCAPTCHA configuration
define('RECAPTCHA_SECRET_KEY', 'your-recaptcha-secret-key'); // Get from Google reCAPTCHA admin

// Database configuration (if needed)
define('DB_HOST', 'localhost');
define('DB_NAME', 'yiguirros_touring');
define('DB_USER', 'your-db-user');
define('DB_PASS', 'your-db-password');

// API Keys (if needed)
define('GOOGLE_MAPS_API_KEY', 'your-google-maps-api-key');
define('FACEBOOK_APP_ID', 'your-facebook-app-id');
define('FACEBOOK_APP_SECRET', 'your-facebook-app-secret');

// Development/Production settings
define('DEBUG_MODE', true); // Set to false in production
define('ENVIRONMENT', 'development'); // 'development' or 'production'

// Security keys
define('JWT_SECRET', 'your-jwt-secret-key');
define('ENCRYPTION_KEY', 'your-encryption-key');

// Third-party service URLs
define('PAYPAL_WEBHOOK_URL', 'your-paypal-webhook-url');
define('STRIPE_WEBHOOK_SECRET', 'your-stripe-webhook-secret');
?>
