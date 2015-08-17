<?php
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header("HTTP/1.0 404 Not Found");
    die();
}

header('Content-Type: application/json; charset=UTF-8');

if (!($db = new SQLite3('dfc.sqlite3', SQLITE3_OPEN_READWRITE))) {
    echo "<h2>" . $TEXT['dfc.sqlite3'] . "</h2>";
    die();
}

$offersAsJson = array();
$offers = $db->query('select * from offers order by id');
while ($offer = $offers->fetchArray(SQLITE3_ASSOC)) {
    $offersAsJson[] = $offer;
}
echo json_encode($offersAsJson);

$db->close();
