<?php
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    header('HTTP/1.0 404 Not Found');
    die();
}

header('Content-Type: application/json; charset=UTF-8');

if (!($db = new SQLite3('../../../dfc.sqlite3', SQLITE3_OPEN_READWRITE))) {
    echo '<h2>' . $TEXT['dfc.sqlite3'] . '</h2>';
    die();
}

function isJson($string){
    return is_string($string) && is_object(json_decode($string)) && (json_last_error() == JSON_ERROR_NONE) ? true : false;
}

function getJsonFromBody() {
    $body = file_get_contents('php://input');
    if (!isJson($body)) {
        header('HTTP/1.0 400 Bad Request');
        die();
    }
    return json_decode($body, true);
}

$json = getJsonFromBody();

$id = $db->escapeString(@$json['id']);
$createdDate = $db->escapeString(@$json['createdDate']);
$title = $db->escapeString(@$json['title']);
$language = $db->escapeString(@$json['language']);
$body = $db->escapeString(@$json['body']);

if (is_numeric($id) && $createdDate != '' && $title != '' && $body != '') {
    $query = $db->prepare('update news set createdDate = :createdDate, title = :title, language = :language, body = :body where id = :id');
    $query->bindValue(':createdDate', $createdDate);
    $query->bindValue(':title', $title);
    $query->bindValue(':language', $language);
    $query->bindValue(':body', $body);
    $query->bindValue(':id', $id);
    $query->execute();
    echo json_encode($json);
} else {
    header('HTTP/1.0 422 Unprocessable Entity');
    die();
}

$db->close();
