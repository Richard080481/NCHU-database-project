<?php
    // global var
    $resArray = [];

    // database settings
    $servername = "localhost";
    $username = "admin";
    $password = "admin";
    $dbname = "admin";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        $resArray = ['result'=>"failure","type"=>"connect","info"=>$conn->connect_error];
        echo json_encode($resArray);
        die();
    }else{
        //echo "connect success";
    }

    // POST
    $userid = $_POST['userID'];
    $sql = "SELECT name,startTime,endTime,tag,scheduleID,duplicate FROM users, schedules where schedules.userID=users.userID and users.userID='$userid' and schedules.duplicate!=0";
    $sql .= " ORDER BY schedules.startTime ASC";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {

        while($row = $result->fetch_assoc()){
            array_push($resArray,$row);
        }
    }

    echo json_encode($resArray);
    $conn->close();

?>