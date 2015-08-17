<?php
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    header("HTTP/1.0 404 Not Found");
    die();
}

header('Content-Type: application/json; charset=UTF-8');

if (!($db = new SQLite3('dfs.sqlite3', SQLITE3_OPEN_READWRITE))) {
    echo "<h2>" . $TEXT['dfs.sqlite3'] . "</h2>";
    die();
}

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
if (is_numeric($id)) {
    $db->query("delete from news where id = $id");
    echo json_encode($json);
} else {
    header("HTTP/1.0 422 Unprocessable Entity");
    die();
}

$db->close();