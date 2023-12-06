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
    $scheduleID = $_POST['scheduleID'];
    $sql = "SELECT name,startTime,endTime,tag,scheduleID,duplicate,detail FROM schedules where schedules.scheduleID = '$scheduleID'";  
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        
        while($row = $result->fetch_assoc()){
            array_push($resArray,$row);
        }
    }
    
    $conn->close();

    echo json_encode($resArray);
?>