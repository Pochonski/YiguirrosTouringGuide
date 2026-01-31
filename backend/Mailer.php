<?php
/**
 * Mailer Class
 * Handles all email functionality for the application
 */

require_once 'config.php';

// Import PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

class Mailer {
    
    /**
     * Sanitize input data
     * @param string $data
     * @return string
     */
    public static function sanitize($data) {
        return htmlspecialchars(trim($data));
    }
    
    /**
     * Validate email address
     * @param string $email
     * @return bool
     */
    public static function validateEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }
    
    /**
     * Validate phone number
     * @param string $phone
     * @return bool
     */
    public static function validatePhone($phone) {
        return preg_match("/^[0-9]{7,15}$/", $phone);
    }
    
    /**
     * Send email using PHPMailer with SMTP
     * @param string $to Recipient email
     * @param string $subject Email subject
     * @param string $message Email body
     * @param string $from Sender email
     * @param bool $isHtml Whether the message is HTML
     * @return bool
     */
    public static function send($to, $subject, $message, $from = EMAIL_FROM, $isHtml = false) {
        $mail = new PHPMailer(true);
        
        try {
            // Server settings
            if (DEBUG_MODE) {
                $mail->SMTPDebug = SMTP::DEBUG_SERVER;
            }
            
            $mail->isSMTP();
            $mail->Host       = SMTP_HOST;
            $mail->SMTPAuth   = true;
            $mail->Username   = SMTP_USERNAME;
            $mail->Password   = SMTP_PASSWORD;
            $mail->SMTPSecure = SMTP_ENCRYPTION;
            $mail->Port       = SMTP_PORT;
            $mail->CharSet    = 'UTF-8';
            
            // Recipients
            $mail->setFrom($from, EMAIL_FROM_NAME);
            $mail->addAddress($to);
            $mail->addReplyTo($from, EMAIL_FROM_NAME);
            
            // Content
            $mail->isHTML($isHtml);
            $mail->Subject = $subject;
            $mail->Body    = $message;
            
            if ($isHtml) {
                $mail->AltBody = strip_tags($message);
            }
            
            $mail->send();
            return true;
        } catch (Exception $e) {
            if (DEBUG_MODE) {
                error_log("Mailer Error: {$mail->ErrorInfo}");
            }
            // Fallback: try PHP's mail() if SMTP fails (requires server mail configured)
            $headers = "From: " . $from . "\r\n";
            if ($isHtml) {
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-type: text/html; charset=UTF-8\r\n";
            } else {
                $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
            }
            $fallbackSent = @mail($to, $subject, $message, $headers);
            if ($fallbackSent) {
                if (DEBUG_MODE) {
                    error_log("Mailer: SMTP failed, PHP mail() fallback succeeded.");
                }
                return true;
            } else {
                if (DEBUG_MODE) {
                    error_log("Mailer: SMTP and PHP mail() both failed.");
                }
                return false;
            }
        }
    }
    
    /**
     * Verify reCAPTCHA and return debug info
     * @param string $response
     * @return array ['success'=>bool,'httpCode'=>int,'curlErr'=>string,'body'=>string,'google'=>object|null]
     */
    public static function verifyRecaptcha($response) {
        $remoteip = $_SERVER['REMOTE_ADDR'] ?? '';

        $postFields = http_build_query([
            'secret' => RECAPTCHA_SECRET_KEY,
            'response' => $response,
            'remoteip' => $remoteip
        ]);

        // Use cURL for outbound request (more reliable on shared hosts)
        $ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

        $verify = curl_exec($ch);
        $curlErr = curl_error($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        // TEMP LOG: store HTTP status, cURL error (if any) and Google's siteverify JSON for debugging. Remove after diagnosis.
        @file_put_contents(__DIR__ . '/recaptcha_siteverify.log', date('c') . " " . ($remoteip ?: 'unknown') . " HTTP:" . ($httpCode ?: '0') . " ERR:" . ($curlErr ?: '-') . " " . ($verify ?: 'NO_RESPONSE') . PHP_EOL, FILE_APPEND);

        $captcha_success = null;
        if (!empty($verify)) {
            $captcha_success = json_decode($verify);
        }

        return [
            'success' => $captcha_success->success ?? false,
            'httpCode' => $httpCode ?: 0,
            'curlErr' => $curlErr ?: '',
            'body' => $verify ?: '',
            'google' => $captcha_success
        ];
    }
    
    /**
     * Send contact form email
     * @param array $data Form data
     * @return array Result with success status and message
     */
    public static function sendContactForm($data) {
        $errors = [];
        
        // Sanitize input
        $name = self::sanitize($data['name'] ?? '');
        $country = self::sanitize($data['country'] ?? '');
        $phone = self::sanitize($data['phone'] ?? '');
        $email = self::sanitize($data['email'] ?? '');
        $message = self::sanitize($data['message'] ?? '');
        
        // Validate
        if (empty($name)) $errors[] = "Name is required.";
        if (empty($country)) $errors[] = "Country is required.";
        if (!self::validatePhone($phone)) $errors[] = "Valid phone number is required.";
        if (!self::validateEmail($email)) $errors[] = "Valid email address is required.";
        if (empty($message)) $errors[] = "Message is required.";
        
        if (!empty($errors)) {
            return [
                'success' => false,
                'message' => implode(' ', $errors),
                'errors' => $errors
            ];
        }

        // Verify reCAPTCHA if secret key is configured
        $recaptchaResponse = $data['g-recaptcha-response'] ?? '';
        if (defined('RECAPTCHA_SECRET_KEY') && RECAPTCHA_SECRET_KEY !== '' && RECAPTCHA_SECRET_KEY !== 'YOUR_SECRET_KEY') {
            if (empty($recaptchaResponse)) {
                return [
                    'success' => false,
                    'message' => 'reCAPTCHA verification failed.',
                    'errors' => ['reCAPTCHA response not provided.']
                ];
            }

            $verify = self::verifyRecaptcha($recaptchaResponse);
            if (empty($verify['success'])) {
                $details = [];
                if (!empty($verify['curlErr'])) $details[] = 'cURL error: ' . $verify['curlErr'];
                if (!empty($verify['body'])) {
                    $codes = [];
                    if (is_object($verify['google']) && isset($verify['google']->{'error-codes'})) {
                        $codes = (array)$verify['google']->{'error-codes'};
                    }
                    if (!empty($codes)) $details[] = 'Google errors: ' . implode(', ', $codes);
                }

                $errors = array_merge(['reCAPTCHA verification failed.'], $details ?: []);
                return [
                    'success' => false,
                    'message' => 'reCAPTCHA verification failed.',
                    'errors' => $errors
                ];
            }
        }
        
        // Prepare emails
        $subject = "New Contact Form Message from $name";
        $emailBody = "
You have received a new message from the contact form:

Name: $name
Country: $country
Phone: $phone
Email: $email

Message:
$message
        ";
        
        // Send to business
        $sentToBusiness = self::send(EMAIL_TO, $subject, $emailBody, $email);
        
        // Send confirmation to client
        $clientSubject = "Thank you for contacting us";
        $clientMessage = "
Dear $name,

Thank you for reaching out to us. We have received your message and will get back to you shortly.

Here is the information we received:
Country: $country
Phone: $phone
Message: $message

Best regards,
Sloth Adventure CR Team
        ";
        
        $sentToClient = self::send($email, $clientSubject, $clientMessage);
        
        return [
            'success' => $sentToBusiness && $sentToClient,
            'message' => $sentToBusiness ? 'Message sent successfully.' : 'Error sending the message.'
        ];
    }
    
    /**
     * Send tour booking email
     * @param array $data Tour booking data
     * @return array Result with success status and message
     */
    public static function sendTourBooking($data) {
        $errors = [];
        
        // Sanitize input
        $tour = self::sanitize($data['tour'] ?? '');
        $firstName = self::sanitize($data['first_name'] ?? '');
        $lastName = self::sanitize($data['last_name'] ?? '');
        $nombre = "$firstName $lastName";
        $emailCliente = self::sanitize($data['email'] ?? '');
        $telefono = self::sanitize($data['phone'] ?? '');
        $pais = self::sanitize($data['country'] ?? '');
        $fecha = self::sanitize($data['date'] ?? '');
        $adultos = self::sanitize($data['adults'] ?? '');
        $ninos = self::sanitize($data['children'] ?? '');
        $pickup = self::sanitize($data['pickup'] ?? '');
        $notas = self::sanitize($data['notes'] ?? '');
        
        // Validate email
        if (!self::validateEmail($emailCliente)) {
            return ['success' => false, 'message' => 'Invalid email address', 'errors' => ['Invalid email address']];
        }
        
        // Verify reCAPTCHA if secret key is configured
        $recaptchaResponse = $data['g-recaptcha-response'] ?? '';
        if (defined('RECAPTCHA_SECRET_KEY') && RECAPTCHA_SECRET_KEY !== '' && RECAPTCHA_SECRET_KEY !== 'YOUR_SECRET_KEY') {
            if (empty($recaptchaResponse)) {
                return ['success' => false, 'message' => 'reCAPTCHA verification failed.', 'errors' => ['reCAPTCHA response not provided.']];
            }

            $verify = self::verifyRecaptcha($recaptchaResponse);
            if (empty($verify['success'])) {
                $details = [];
                if (!empty($verify['curlErr'])) $details[] = 'cURL error: ' . $verify['curlErr'];
                if (!empty($verify['body'])) {
                    $codes = [];
                    if (is_object($verify['google']) && isset($verify['google']->{'error-codes'})) {
                        $codes = (array)$verify['google']->{'error-codes'};
                    }
                    if (!empty($codes)) $details[] = 'Google errors: ' . implode(', ', $codes);
                }

                $errors = array_merge(['reCAPTCHA verification failed.'], $details ?: []);
                return ['success' => false, 'message' => 'reCAPTCHA verification failed.', 'errors' => $errors];
            }
        }
        
        // Email to business
        $asuntoProveedor = "New Tour Booking: $tour";
        $mensajeProveedor = "
        <h3>Tour Booking Details</h3>
        <p><strong>Tour:</strong> $tour</p>
        <p><strong>Name:</strong> $nombre</p>
        <p><strong>Email:</strong> $emailCliente</p>
        <p><strong>Phone:</strong> $telefono</p>
        <p><strong>Country:</strong> $pais</p>
        <p><strong>Tour Date:</strong> $fecha</p>
        <p><strong>Number of Adults:</strong> $adultos</p>
        <p><strong>Number of Children:</strong> $ninos</p>
        <p><strong>Pickup Location:</strong> $pickup</p>
        <p><strong>Notes:</strong><br>$notas</p>
        ";
        
        // Email to client
        $asuntoCliente = "Tour Pre-booking Confirmation";
        $mensajeCliente = "
        <h3>Thank you for your booking!</h3>
        <p>Hello $nombre,</p>
        <p>We have received your request for <strong>$tour</strong> on <strong>$fecha</strong>.</p>
        <p><strong>Details:</strong></p>
        <ul>
            <li>Number of adults: $adultos</li>
            <li>Number of children: $ninos</li>
            <li>Pickup location: $pickup</li>
        </ul>
        <p><strong>Notes:</strong> $notas</p>
        <p>You will receive the service confirmation within 24 hours. An agent will contact you.</p>
        <p>Best regards,<br>Sloth Adventure CR Team</p>
        ";
        
        // Send emails
        $sentToBusiness = self::send(EMAIL_TO, $asuntoProveedor, $mensajeProveedor, $emailCliente, true);
        $sentToClient = self::send($emailCliente, $asuntoCliente, $mensajeCliente, EMAIL_FROM, true);
        
        return [
            'success' => $sentToBusiness && $sentToClient,
            'message' => $sentToBusiness ? 'Booking sent successfully.' : 'Error sending the booking.'
        ];
    }
    
    /**
     * Send custom tour quote request
     * @param array $data Quote request data
     * @return array Result with success status and message
     */
    public static function sendQuoteRequest($data) {
        // Sanitize input
        $hotel = self::sanitize($data['hotel'] ?? '');
        $tour_type = self::sanitize($data['tour_type'] ?? '');
        $people = self::sanitize($data['people'] ?? '');
        $luggage = self::sanitize($data['luggage'] ?? '');
        $dates = self::sanitize($data['dates'] ?? '');
        $name = self::sanitize($data['name'] ?? '');
        $email = self::sanitize($data['email'] ?? '');
        $phone = self::sanitize($data['phone'] ?? '');
        $country = self::sanitize($data['country'] ?? '');
        $meals = self::sanitize($data['meals'] ?? '');
        $notes = self::sanitize($data['notes'] ?? '');
        
        // Validate email
        if (!self::validateEmail($email)) {
            return ['success' => false, 'errors' => ['Invalid email address']];
        }
        
        $subject = "New Tour Quote Request from $name";
        $message = "
A new custom tour quote request has been submitted:

Name: $name
Email: $email
Phone: $phone
Country of Origin: $country

Hotel Category: $hotel
Tour Type: $tour_type
Number of People: $people
Approx. Luggage: $luggage
Possible Visit Dates: $dates
Meal Preference: $meals

Notes:
$notes
        ";
        
        // Send to business
        $sentToBusiness = self::send(EMAIL_TO, $subject, $message);
        
        // Send confirmation to client
        $clientSubject = "Thank You – Tour Quote Request Received";
        $clientMessage = "
Hi $name,

Thank you for your interest in our custom tours in Costa Rica.

We've received your request and our team is reviewing the details. You will receive your quote within 48 hours.

PURA VIDA!
– Sloth Adventure CR Team
        ";
        
        $sentToClient = self::send($email, $clientSubject, $clientMessage);
        
        return [
            'success' => $sentToBusiness && $sentToClient,
            'message' => $sentToBusiness ? 'Quote request sent successfully.' : 'Error sending the request.'
        ];
    }
}
?>
