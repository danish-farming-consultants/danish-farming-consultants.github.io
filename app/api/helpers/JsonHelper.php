<?php declare(strict_types = 1);

class JsonHelper {

    private static function isJson(string $string): bool {
        return is_string($string) && is_object(json_decode($string)) && (json_last_error() == JSON_ERROR_NONE) ? true : false;
    }

    public static function getJsonFromBodyOrDie() {
        $body = file_get_contents('php://input');
        if (!JsonHelper::isJson($body)) {
            header('HTTP/1.1 400 Bad Request');
            die();
        }
        return json_decode($body, true);
    }
}
