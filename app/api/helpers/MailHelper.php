<?php declare(strict_types = 1);

class MailHelper {

    public static function extractFirstEmailAddressOrDie(string $rawEmail) {
        $pattern = "/^[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/";
        preg_match_all($pattern, $rawEmail, $matches);
        if (count($matches) != 1 || count($matches[0]) != 1) {
            header('HTTP/1.1 400 Bad Request');
            die();
        }
        return $matches[0][0];
    }

    public static function sendHtmlMail(string $to, string $displayFrom, string $from, string $subject, string $message) {
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
        $headers .= "From: \"$displayFrom\" <$from>" . "\r\n";
        mail($to, $subject, $message, $headers);
    }
}
