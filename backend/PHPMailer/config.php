<?php
/**
 * Configuration file for Sloth Adventure CR
 * Centralizes all configuration settings
 * 
 * IMPORTANT: Sensitive data is loaded from config.local.php
 * Copy config.example.php to config.local.php and update with your credentials
 */

// Load local configuration with sensitive data
$configLocalFile = __DIR__ . '/config.local.php';
if (file_exists($configLocalFile)) {
    require_once $configLocalFile;
} else {
    // Default values for development - DO NOT use in production
    define('EMAIL_TO', 'your-email@gmail.com');
    define('EMAIL_FROM', 'your-email@gmail.com');
    define('EMAIL_FROM_NAME', 'Yiguirros Touring Guide');
    
    define('SMTP_HOST', 'smtp.gmail.com');
    define('SMTP_PORT', 587);
    define('SMTP_USERNAME', 'your-gmail@gmail.com');
    define('SMTP_PASSWORD', 'your-app-password');
    define('SMTP_ENCRYPTION', 'tls');
    
    define('RECAPTCHA_SECRET_KEY', 'your-recaptcha-secret-key');
    
    define('DEBUG_MODE', true);
    define('ENVIRONMENT', 'development');
}

// Application settings (non-sensitive)
define('REDIRECT_SUCCESS_URL', '../index.html');
define('REDIRECT_ERROR_URL', '../pages/contact.html');

// Error reporting based on environment
if (defined('DEBUG_MODE') && DEBUG_MODE) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// Security headers
if (!defined('ENVIRONMENT') || ENVIRONMENT === 'production') {
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('X-XSS-Protection: 1; mode=block');
    header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
}
?>
