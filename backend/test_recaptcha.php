<?php
/**
 * Test script to verify reCAPTCHA configuration
 * Access this file directly to test reCAPTCHA validation
 */

require_once 'config.php';

echo "<h2>reCAPTCHA Configuration Test</h2>";

echo "<h3>Configuration Status:</h3>";
echo "Secret Key defined: " . (defined('RECAPTCHA_SECRET_KEY') ? 'YES' : 'NO') . "<br>";
echo "Secret Key value: " . (defined('RECAPTCHA_SECRET_KEY') ? RECAPTCHA_SECRET_KEY : 'NOT DEFINED') . "<br>";
echo "Secret Key is configured: " . (defined('RECAPTCHA_SECRET_KEY') && RECAPTCHA_SECRET_KEY !== '' && RECAPTCHA_SECRET_KEY !== 'YOUR_SECRET_KEY' ? 'YES' : 'NO') . "<br>";

echo "<h3>Test Form Submission:</h3>";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    echo "<div style='background: #f0f0f0; padding: 10px; margin: 10px 0;'>";
    echo "<strong>POST Data Received:</strong><br>";
    echo "<pre>";
    print_r($_POST);
    echo "</pre>";
    echo "</div>";
    
    $recaptchaResponse = $_POST['g-recaptcha-response'] ?? '';
    
    echo "<div style='background: #fff3cd; padding: 10px; margin: 10px 0;'>";
    echo "<strong>reCAPTCHA Response:</strong><br>";
    echo "Length: " . strlen($recaptchaResponse) . " characters<br>";
    echo "Value: " . htmlspecialchars(substr($recaptchaResponse, 0, 50)) . "...<br>";
    echo "</div>";
    
    if (empty($recaptchaResponse)) {
        echo "<div style='background: #f8d7da; padding: 10px; margin: 10px 0; color: #721c24;'>";
        echo "<strong>ERROR:</strong> g-recaptcha-response is empty or not sent!";
        echo "</div>";
    } else {
        // Verify with Google using cURL for better error handling
        $remoteip = $_SERVER['REMOTE_ADDR'];

        echo "<div style='background: #d1ecf1; padding: 10px; margin: 10px 0;'>";
        echo "<strong>Verification Endpoint (without secret):</strong><br>";
        echo "https://www.google.com/recaptcha/api/siteverify?secret=***&response=$recaptchaResponse&remoteip=$remoteip<br>";
        echo "</div>";

        $verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
        $post = [
            'secret' => RECAPTCHA_SECRET_KEY,
            'response' => $recaptchaResponse,
            'remoteip' => $remoteip
        ];

        $ch = curl_init($verifyUrl);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

        $verify = curl_exec($ch);
        $curlErr = curl_error($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        echo "<div style='background: #d1ecf1; padding: 10px; margin: 10px 0;'>";
        echo "<strong>Raw Google Response (HTTP $httpCode):</strong><br>";
        echo "<pre>" . htmlspecialchars($verify) . "</pre>";
        if (!empty($curlErr)) {
            echo "<strong>cURL error:</strong> " . htmlspecialchars($curlErr) . "<br>";
        }
        echo "</div>";

        $captcha_success = json_decode($verify);

        if (is_object($captcha_success) && !empty($captcha_success->success) && $captcha_success->success === true) {
            echo "<div style='background: #d4edda; padding: 10px; margin: 10px 0; color: #155724;'>";
            echo "<strong>SUCCESS:</strong> reCAPTCHA verification passed!";
            echo "</div>";
        } else {
            echo "<div style='background: #f8d7da; padding: 10px; margin: 10px 0; color: #721c24;'>";
            echo "<strong>FAILED:</strong> reCAPTCHA verification failed!<br>";
            if (is_object($captcha_success) && isset($captcha_success->{'error-codes'})) {
                echo "Error codes: " . implode(', ', (array)$captcha_success->{'error-codes'}) . "<br>";
            }
            if (empty($verify)) {
                echo "Possible connection issue: empty response from Google.\n";
            }
            echo "</div>";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>reCAPTCHA Test</title>
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
        }
        .form-container {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        }
        button {
            background: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        }
        button:hover {
            background: #0056b3;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <h3>Test Form</h3>
        <form method="POST" action="">
            <div style="margin-bottom: 15px;">
                <label>Test Input:</label><br>
                <input type="text" name="test_input" value="Test data" style="padding: 8px; width: 100%;">
            </div>
            
            <div style="margin-bottom: 15px;">
                <div class="g-recaptcha" data-sitekey="6LfnziksAAAAAOPrggzu1azN7BYu76ts8noPhCsE"></div>
            </div>
            
            <button type="submit">Test Submit</button>
        </form>
    </div>
</body>
</html>
