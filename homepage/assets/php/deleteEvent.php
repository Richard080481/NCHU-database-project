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
    $sql = "DELETE FROM schedules WHERE scheduleID = '$scheduleID'";  
    $result = $conn->query($sql);

    
if ($result) {
    $resArray = ['result' => "success"];
} else {
    $resArray = ['result' => "failure", 'type' => "delete", 'info' => $conn->error];
}
    
    $conn->close();

    echo json_encode($resArray);
?>