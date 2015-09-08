<?php
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header("HTTP/1.0 404 Not Found");
    die();
}

header('Content-Type: application/json; charset=UTF-8');

if (!($db = new SQLite3('/home/dfcpl/domains/dfc.slask.pl/dfc.sqlite3', SQLITE3_OPEN_READWRITE))) {
    echo "<h2>" . $TEXT['dfc.sqlite3'] . "</h2>";
    die();
}

$offersInfosAsJson = array();
$offersInfos = $db->query('select * from offersInfos order by id');
while ($offerInfo = $offersInfos->fetchArray(SQLITE3_ASSOC)) {
    $offersInfosAsJson[] = $offerInfo;
}
echo json_encode($offersInfosAsJson);

$db->close();
