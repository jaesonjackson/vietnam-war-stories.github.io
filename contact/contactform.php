<?php
// ini_set('display_errors',1);
// error_reporting(E_ALL);

$msg = '';
$name = $email = $message = "";


// adding below -eb
// $mytempdir = "/u/ejblom/a348-spr2018-workspace/apache/phpsessions";
if (array_key_exists('userfile', $_FILES)) {
    // get some values from the form
    $name = test_input($_POST['name']);
    $email = test_input($_POST["email"]);
    $message = test_input($_POST['message']);
    
    // create the body
    $body = "Message from: " . $name . "\r\n" . "Contact them: " . $email . "\r\n" . "Their message: " . $message;

    // First handle the upload
    // Don't trust provided filename - same goes for MIME types
    // See http://php.net/manual/en/features.file-upload.php#114004 for more thorough upload validation
     $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['userfile']['name']));
    //   $uploadfile = tempnam($mytempdir, sha1($_FILES['userfile']['name']));
    if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
        // Upload handled successfully
        // Now create a message
        // This should be somewhere in your include_path
        // require '../PHPMailerAutoload.php';
           require 'vendor/autoload.php';
        // use PHPMailer\PHPMailer\PHPMailer;


        // $mail = new PHPMailer;
        $mail = new PHPMailer\PHPMailer\PHPMailer();
        $mail->setFrom('contact@vietnamwarstories.org', 'Vietnam War Stories');
        // $mail->addAddress('osgoodr@indiana.edu', 'Ron');
        $mail->addAddress('ejblom@iu.edu', 'Ron');
        $mail->Subject = 'A message from Vietnam War Stories';
        $mail->Body = $body;

        // Attach the uploaded file
        $mail->addAttachment($uploadfile, $_FILES['userfile']['name']);
        if (!$mail->send()) {
            $msg .= "Mailer Error: " . $mail->ErrorInfo;
        } else {
            $msg .= "<h1>Thanks for contacting us!</h1><p>Your message has been sent. We may contact you about your message.<p>"
;
        }
    } else {
        $msg .= '<p>Failed to upload file ' . $uploadfile . ". It may have been too big. Try a file less than 1 mb.<p>";
    }
}

// does some validation
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<title>Contact Us</title>
<style>
body {font-family: Arial, Helvetica, sans-serif;}

input[type=text], select, textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical;
}

input[type=submit] {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

input[type=submit]:hover {
    background-color: #45a049;
}

.container {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
}
</style>
</head>

<body>
<div class="container">
<?php
echo $msg;
?>
<p>Back to <a href="http://vietnamwarstories.org\">Vietnam War Stories</a></p>
</div>
</body>
