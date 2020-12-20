<?php
function connection() {
global $link;
$link = mysqli_connect("pi.cba.pl", "Bazapi2019", "Bazapi2019", "elunch_1");
    if (!mysqli_set_charset($link, "utf8")) {
        printf("Error loading character set utf8: %s\n", mysqli_error($link));
        exit();
    } else {
       // printf("Current character set: %s\n",
        mysqli_character_set_name($link);
    }
    if (!$link) {
        echo "Error: Unable to connect to MySQL." . PHP_EOL;
        echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
        echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit; echo '<br><BR>Poprawne połączenie z bazą danych<BR>';
    }
// echo "Host information: " . mysqli_get_host_info($link) . PHP_EOL;
}

connection();
$my_date = date("Y-m-d");  
$my_time = $_GET["time"];
$lat = $_GET["lat"];
$longitude = $_GET["longitude"];
$s = $_GET["s"];

$return_arr = array();

// tabela zarejestrowanych rekordów z GPS

    if($result = mysqli_query($link,"select * from maps_records WHERE 1 ORDER BY ID DESC LIMIT 1 ")){
        while($row = mysqli_fetch_assoc($result)) {
            $id = $row['id'];
            $my_time = $row['time'];
            $lat = $row['lat'];
            $longitude = $row['longitude'];
            $s = $row['s'];  

			$return_arr[] = array("id" => $id,
                    "lat" => $lat,
                    "longitude" => $longitude,
                    "s" => $s);
			
        }

    }

// Encoding array in JSON format
header('Content-Type: application/json');
echo json_encode($return_arr);
// echo $return_arr;
?>
