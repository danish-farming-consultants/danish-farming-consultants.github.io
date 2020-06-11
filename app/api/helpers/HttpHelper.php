<?php declare(strict_types = 1);

class HttpHelper {

    public static function checkIfPostOrDie() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            header('HTTP/1.1 405 Method Not Allowed');
            die();
        }
    }

    public static function setNoContentResponseStatusCode() {
        header('HTTP/1.1 204 No Content');
    }

    public static function addCorsHeaders() {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST');
        header('Access-Control-Allow-Headers: *');
    }
}
