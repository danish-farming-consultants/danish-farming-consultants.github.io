<?php
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header("HTTP/1.0 404 Not Found");
    die();
}

header('Content-Type: application/json; charset=UTF-8');

if (!($db = new SQLite3('../dfc.sqlite3', SQLITE3_OPEN_READWRITE))) {
    echo "<h2>" . $TEXT['dfc.sqlite3'] . "</h2>";
    die();
}

$newsAsJson = array();
$news = $db->query('select * from news order by date(createdDate) desc');
while ($singleNews = $news->fetchArray(SQLITE3_ASSOC)) {
    $newsAsJson[] = $singleNews;
}
echo json_encode($newsAsJson);

$db->close();
