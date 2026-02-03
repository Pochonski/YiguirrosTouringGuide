<?php
/**
 * Configuration file for Yiguirros Adventure CR
 * Centralizes all configuration settings
 */

// Email configuration
define('EMAIL_TO', 'joseph19102005@gmail.com');
define('EMAIL_FROM', 'joseph19102005@gmail.com');
define('EMAIL_FROM_NAME', 'Yiguirros Touring Guide');

// SMTP configuration for Gmail
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'joseph19102005@gmail.com'); // Your Gmail address
define('SMTP_PASSWORD', 'jfhl fsvl tifx sjip'); // App password (leave empty if not configured yet)
define('SMTP_ENCRYPTION', 'tls');

// reCAPTCHA configuration
define('RECAPTCHA_SECRET_KEY', '6LfnziksAAAAAMx8vQGB7SzwRnVZd4XJyD43d6PM'); // Replace with your actual secret key

// Application settings
define('REDIRECT_SUCCESS_URL', '../pages/tours.html');
define('REDIRECT_ERROR_URL', '../pages/contact.html');

// Development mode (set to false in production)
define('DEBUG_MODE', false);

// Error reporting
if (DEBUG_MODE) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}
?>
