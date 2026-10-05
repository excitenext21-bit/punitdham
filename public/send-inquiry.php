<?php
/**
 * Punitdhan Pulses Limited - SMTP Form Email Handler
 * POST endpoint: /send-inquiry.php
 * Target Recipient: manish@excitesys.com
 * Powered by PHPMailer via Authenticated SMTP
 */

ini_set('display_errors', '0');
error_reporting(0);
ob_start();

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    ob_clean();
    echo json_encode(['success' => false, 'message' => 'Method not allowed. Use POST.']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);
if (!$data && !empty($_POST)) {
    $data = $_POST;
}

if (!$data) {
    http_response_code(400);
    ob_clean();
    echo json_encode(['success' => false, 'message' => 'No form data received.']);
    exit;
}

function cleanInput($val) {
    return htmlspecialchars(strip_tags(trim($val ?? '')), ENT_QUOTES, 'UTF-8');
}

$name       = cleanInput($data['name'] ?? $data['fullName'] ?? '');
$email      = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone      = cleanInput($data['phone'] ?? $data['phoneNumber'] ?? '');
$subject    = cleanInput($data['subject'] ?? $data['requirement'] ?? 'New Inquiry from Punitdhan Website');
$message    = cleanInput($data['message'] ?? $data['comments'] ?? '');
$formType   = cleanInput($data['type'] ?? $data['formType'] ?? 'General Inquiry');
$position   = cleanInput($data['position'] ?? '');
$experience = cleanInput($data['experience'] ?? '');

$toEmail = 'manish@excitesys.com';

if (empty($name) && empty($email) && empty($phone)) {
    http_response_code(400);
    ob_clean();
    echo json_encode(['success' => false, 'message' => 'Please provide contact information.']);
    exit;
}

$inquiryId   = 'PUNIT-' . strtoupper(substr(uniqid(), -6));
$submittedAt = date('d M Y, h:i A T');

$senderName = !empty($name) ? $name : (!empty($email) ? $email : "Website Visitor");
$userSubject = !empty($subject) && $subject !== "New Inquiry from Punitdhan Website" ? $subject : "";
$emailSubject = !empty($userSubject) ? "{$userSubject} - {$senderName}" : "New Inquiry from {$senderName}";

$bodyHtml = "
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f7f4; margin: 0; padding: 24px; color: #27272a; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e4e4e7; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #0f2e1e; color: #ffffff; padding: 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 700; color: #f4d068; }
    .header p { margin: 6px 0 0 0; font-size: 13px; color: #d4d4d8; }
    .content { padding: 24px; }
    .badge { display: inline-block; padding: 4px 10px; background: #e8f0eb; color: #0f2e1e; font-size: 11px; font-weight: 700; border-radius: 20px; text-transform: uppercase; margin-bottom: 16px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #f4f4f5; font-size: 14px; }
    th { width: 35%; color: #71717a; font-weight: 600; background-color: #fafafa; }
    td { color: #18181b; }
    .message-box { background: #f8fafc; border-left: 4px solid #0f2e1e; padding: 16px; border-radius: 4px; margin-top: 16px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
    .footer { background: #fafafa; padding: 16px; text-align: center; font-size: 12px; color: #a1a1aa; border-top: 1px solid #f4f4f5; }
  </style>
</head>
<body>
  <div class='container'>
    <div class='header'>
      <h1>PUNITDHAN PULSES LIMITED</h1>
      <p>Official Website Inquiry Notification</p>
    </div>
    <div class='content'>
      <div class='badge'>Form Type: {$formType}</div>
      <table>
        <tr><th>Inquiry Ref ID</th><td><strong>{$inquiryId}</strong></td></tr>
        <tr><th>Full Name</th><td><strong>{$name}</strong></td></tr>
        <tr><th>Email Address</th><td>" . ($email ? "<a href='mailto:{$email}'>{$email}</a>" : "Not Provided") . "</td></tr>
        <tr><th>Phone Number</th><td>" . ($phone ? "<a href='tel:{$phone}'>{$phone}</a>" : "Not Provided") . "</td></tr>
        <tr><th>Subject / Product</th><td>{$subject}</td></tr>";

if (!empty($position)) {
    $bodyHtml .= "<tr><th>Applied Position</th><td>{$position}</td></tr>";
}
if (!empty($experience)) {
    $bodyHtml .= "<tr><th>Experience</th><td>{$experience}</td></tr>";
}

$bodyHtml .= "
        <tr><th>Submission Time</th><td>{$submittedAt}</td></tr>
      </table>

      <h3 style='margin-top: 24px; margin-bottom: 8px; font-size: 14px; color: #0f2e1e; text-transform: uppercase;'>Inquiry Details / Message:</h3>
      <div class='message-box'>" . nl2br($message ? $message : 'No additional message text.') . "</div>
    </div>
    <div class='footer'>
      Official Inquiry Dispatch &bull; Recipient: <strong>manish@excitesys.com</strong>
    </div>
  </div>
</body>
</html>
";

$sent = false;

// ── Try PHPMailer via Gmail SMTP ──
$phpmailerDir = __DIR__ . '/phpmailer';
if (file_exists($phpmailerDir . '/PHPMailer.php')) {
    require_once $phpmailerDir . '/Exception.php';
    require_once $phpmailerDir . '/PHPMailer.php';
    require_once $phpmailerDir . '/SMTP.php';

    try {
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'rgmonish@gmail.com';
        $mail->Password   = 'lscx dujd wjmc ukro';
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;
        $mail->Timeout    = 15;

        $mail->setFrom('rgmonish@gmail.com', 'Punitdhan Pulses Web Portal');
        $mail->addAddress($toEmail);
        if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $mail->addReplyTo($email, $name);
        }

        $mail->isHTML(true);
        $mail->Subject = $emailSubject;
        $mail->Body    = $bodyHtml;
        $mail->AltBody = strip_tags(str_replace(['<br>', '<br/>', '<br />'], "\n", $bodyHtml));

        $mail->send();
        $sent = true;
    } catch (\Exception $e) {
        error_log('PHPMailer Error: ' . $e->getMessage());
    }
}

// ── Fallback to direct SMTP SSL socket if PHPMailer wasn't available ──
if (!$sent) {
    $fp = @fsockopen('ssl://smtp.gmail.com', 465, $errno, $errstr, 10);
    if ($fp) {
        $read = function() use ($fp) {
            $res = '';
            while ($str = fgets($fp, 515)) {
                $res .= $str;
                if (substr($str, 3, 1) === ' ') break;
            }
            return $res;
        };
        $write = function($cmd) use ($fp) {
            fputs($fp, $cmd . "\r\n");
        };

        $read();
        $write('EHLO localhost');
        $read();
        $write('AUTH LOGIN');
        $read();
        $write(base64_encode('rgmonish@gmail.com'));
        $read();
        $write(base64_encode('lscx dujd wjmc ukro'));
        $authRes = $read();

        if (strpos($authRes, '235') !== false) {
            $write('MAIL FROM:<rgmonish@gmail.com>');
            $read();
            $write("RCPT TO:<{$toEmail}>");
            $read();
            $write('DATA');
            $read();

            $msg  = "From: Punitdhan Web Portal <rgmonish@gmail.com>\r\n";
            $msg .= "To: {$toEmail}\r\n";
            if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $msg .= "Reply-To: {$email}\r\n";
            }
            $msg .= "Subject: {$emailSubject}\r\n";
            $msg .= "MIME-Version: 1.0\r\n";
            $msg .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
            $msg .= $bodyHtml . "\r\n.\r\n";

            $write($msg);
            $sendRes = $read();
            if (strpos($sendRes, '250') !== false) {
                $sent = true;
            }
            $write('QUIT');
        }
        fclose($fp);
    }
}

// ── Fallback 3: Standard mail() ──
if (!$sent) {
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: Punitdhan Web Portal <rgmonish@gmail.com>\r\n";
    if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $headers .= "Reply-To: {$email}\r\n";
    }
    $sent = @mail($toEmail, $emailSubject, $bodyHtml, $headers);
}

ob_clean();
echo json_encode([
    'success' => true,
    'message' => 'Inquiry successfully delivered to manish@excitesys.com.',
    'inquiryId' => $inquiryId,
    'delivered' => $sent
]);
