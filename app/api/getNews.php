<?php
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('HTTP/1.0 404 Not Found');
    die();
}

header('Content-Type: application/json; charset=UTF-8');

if (!($db = new SQLite3('../dfc.sqlite3', SQLITE3_OPEN_READONLY))) {
    echo '<h2>' . $TEXT['dfc.sqlite3'] . '</h2>';
    die();
}

$language = isset($_GET['lang']) ? $db->escapeString($_GET['lang']) :'';

if ($language != '') {
    $query = $db->prepare('select * from news where language = :language order by date(createdDate) desc');
} else {
    $query = $db->prepare('select * from news order by date(createdDate) desc');
}
$query->bindValue(':language', $language);
$news = $query->execute();

$newsAsJson = array();
while ($singleNews = $news->fetchArray(SQLITE3_ASSOC)) {
    $newsAsJson[] = $singleNews;
}
echo json_encode($newsAsJson);

$db->close();
