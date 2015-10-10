<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("HTTP/1.0 404 Not Found");
    die();
}

header('Content-Type: application/json; charset=UTF-8');

if (!($db = new SQLite3('../../../dfc.sqlite3', SQLITE3_OPEN_READWRITE))) {
    echo "<h2>" . $TEXT['dfc.sqlite3'] . "</h2>";
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

$createdDate = $db->escapeString(@$json['createdDate']);
$title = $db->escapeString(@$json['title']);
$body = $db->escapeString(@$json['body']);

if ($title != "" && $body != "") {
    if ($createdDate != "") {
        $db->exec("insert into news (createdDate, title, body) values ('$createdDate', '$title', '$body')");
    } else {
        $db->exec("insert into news (title, body) values ('$title', '$body')");
    }
    $id = $db->lastInsertRowid();
    $news = $db->query("select * from news where id = $id")->fetchArray(SQLITE3_ASSOC);
    echo json_encode($news);
} else {
    header("HTTP/1.0 422 Unprocessable Entity");
    die();
}

$db->close();
