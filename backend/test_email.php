<?php
/**
 * Test email script
 */

require_once 'Mailer.php';

echo "<h3>Testing Email Configuration</h3>";
echo "<pre>";

// Test data
$testData = [
    'name' => 'Test User',
    'country' => 'Costa Rica',
    'phone' => '12345678',
    'email' => 'javalladablanco@gmail.com',
    'message' => 'This is a test message from the contact form.'
];

echo "Attempting to send test email...\n\n";

$result = Mailer::sendContactForm($testData);

echo "\n\nResult:\n";
print_r($result);

if ($result['success']) {
    echo "\n✓ Email sent successfully!\n";
} else {
    echo "\n✗ Failed to send email\n";
    if (isset($result['errors'])) {
        echo "Errors:\n";
        print_r($result['errors']);
    }
}

echo "</pre>";
?>
