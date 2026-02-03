<?php
/**
 * Contact Form Handler
 * Processes contact form submissions
 */

// Prevent any output before headers
ob_start();

require_once 'Mailer.php';

// Set headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Clear any previous output
ob_clean();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if this is a tour booking form
    if (isset($_POST['tour']) && isset($_POST['first_name']) && isset($_POST['last_name'])) {
        $result = Mailer::sendTourBooking($_POST);
    } else {
        $result = Mailer::sendContactForm($_POST);
    }
    
    // Ensure result has required keys
    if (!isset($result['success'])) {
        $result['success'] = false;
    }
    if (!isset($result['message'])) {
        $result['message'] = 'Unknown error occurred.';
    }
    
    echo json_encode($result, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ], JSON_UNESCAPED_UNICODE);
}

// Send output
ob_end_flush();
exit;
?>
