<?php declare(strict_types = 1);

include_once('helpers/HttpHelper.php');
include_once('helpers/JsonHelper.php');
include_once('helpers/MailHelper.php');

const SUBJECT = 'DFC - formularz kontaktowy';
const DFC_EMAIL = 'biuro@dfc.slask.pl';
const DFC_DISPLAY_NAME = 'DFC';

function formatBody(string $name, string $email, string $body): string {
    return "
        <html lang=\"pl\">
            <body>
                <p>
                    Imię i nazwisko: $name
                </p>
                <p>
                    E-mail: <a href='mailto:$email'>$email</a>
                </p>
                <p>
                    <span style='white-space: pre-line'>$body</span>
                </p>
            </body>
        </html>";
}

function formatConfirmationBody() {
    return "
        <html lang=\"pl\">
            <body>
                <p>Dziękujemy! Skontaktujemy się z Państwem w 48 godzin!</p>
            </body>
        </html>";
}

function sendRequestMail(string $name, string $email, string $body) {
    $message = formatBody($name, $email, $body);
    MailHelper::sendHtmlMail(DFC_EMAIL, $name, $email, SUBJECT, $message);
}

function sendConfirmationMail(string $email) {
    $message = formatConfirmationBody();
    MailHelper::sendHtmlMail($email, DFC_DISPLAY_NAME, DFC_EMAIL, SUBJECT, $message);
}

HttpHelper::checkIfPostOrDie();
$json = JsonHelper::getJsonFromBodyOrDie();

$name = htmlspecialchars(@$json['name']);
$email = htmlspecialchars(MailHelper::extractFirstEmailAddressOrDie(@$json['email']));
$body = htmlspecialchars(@$json['body']);

sendRequestMail($name, $email, $body);
sendConfirmationMail($email);

HttpHelper::setNoContentResponseStatusCode();
HttpHelper::addCorsHeaders();
