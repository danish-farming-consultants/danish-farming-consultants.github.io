<?php
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    header("HTTP/1.0 404 Not Found");
    die();
}

header('Content-Type: application/json; charset=UTF-8');

if (!($db = new SQLite3('/home/dfcpl/domains/dfc.slask.pl/dfc.sqlite3', SQLITE3_OPEN_READWRITE))) {
    echo "<h2>" . $TEXT['dfc.sqlite3'] . "</h2>";
    die();
}
$db->busyTimeout(5000);

function isJson($string){
    return is_string($string) && is_object(json_decode($string)) && (json_last_error() == JSON_ERROR_NONE) ? true : false;
}

function getJsonFromBody() {
    $body = file_get_contents('php://input');
    if (!isJson($body)) {
        header("HTTP/1.0 400 Bad Request");
        die();
    }
    return json_decode($body, true);
}

$json = getJsonFromBody();

$id = $db->escapeString(@$json['id']);
$name = $db->escapeString(@$json['name']);
$amount = $db->escapeString(@$json['amount']);
$weightMin = $db->escapeString(@$json['weightMin']);
$weightMax = $db->escapeString(@$json['weightMax']);
$price = $db->escapeString(@$json['price']);

if (is_numeric($id) && $name != "" && is_numeric($amount) && is_numeric($weightMin) && is_numeric($weightMax) && is_numeric($price)) {
    $db->exec("update offers set name = '$name', amount = '$amount', weightMin = '$weightMin', weightMax = '$weightMax', price = '$price' where id = $id");
    echo json_encode($json);
} else {
    header("HTTP/1.0 422 Unprocessable Entity");
    die();
}

$db->close();
