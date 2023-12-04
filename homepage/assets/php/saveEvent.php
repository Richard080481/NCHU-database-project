<?php

$servername = "localhost";
$username = "admin";
$password = "admin";
$dbname = "admin";

// Check connection
if (!$con = mysqli_connect($servername, $username, $password, $dbname)) {
    die("Failed to connect");
}

// Get the raw POST data
$postData = file_get_contents("php://input");

// Decode the JSON data
$eventData = json_decode($postData);

// Extract data from the decoded JSON
$title = mysqli_real_escape_string($con, $eventData->title);
$passStartTime = mysqli_real_escape_string($con, $eventData->passStartTime);
$passEndTime = mysqli_real_escape_string($con, $eventData->passEndTime);
$duplicate = mysqli_real_escape_string($con, $eventData->duplicate);
$passEventColor = mysqli_real_escape_string($con, $eventData->passEventColor);
$detail = mysqli_real_escape_string($con, $eventData->detail);
$userID = mysqli_real_escape_string($con, $eventData->passUserID);

// Your SQL query to insert data into the database
$sql = "INSERT INTO schedules (userID, name, startTime, endTime, duplicate, tag, detail) VALUES ('$userID', '$title', '$passStartTime', '$passEndTime', '$duplicate', '$passEventColor', '$detail')";
// Perform the query
if (mysqli_query($con, $sql)) {
    echo "Event saved successfully!";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($con);
}

// Close the database connection
mysqli_close($con);

?>
