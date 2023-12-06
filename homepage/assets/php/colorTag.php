<?php

$servername = "localhost";
$username = "admin";
$password = "admin";
$dbname = "admin";

// Check connection
$con = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);

// Check if data is not empty
if (!empty($data)) {
    // Get the last item in the array to retrieve userID
    $userID = mysqli_real_escape_string($con, $data['passUserID']);
    $param = array(...$data['tags']);
    $prepareStr = "UPDATE color_tags SET ";
    $prepareStr = $prepareStr . 'color0 = ?';
    //TODO: prevent js from sending $count exceeding the limit 15
    for($i = 1, $count = count($data['tags']); $i < $count; $i++){
        $prepareStr = $prepareStr . ', color' . $i . '= ?';
    }
    array_push($param, $userID);
    $prepareStr = $prepareStr . " WHERE userID = ?";
    // Prepare a statement
    $stmt = $con->prepare($prepareStr);

    // Bind parameters for each tag
    $stmt->bind_param("sssssssssssssssi", ...$param);

    $stmt->execute();

    echo "Data updated successfully";
} else {
    echo "No data received";
}

// Close the statement and the database connection
$stmt->close();
$con->close();

?>
