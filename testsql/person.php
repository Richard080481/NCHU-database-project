<?php

    $a = "";
    if (isset($_GET["deletex"])){
        $a = $_GET["deletex"];
    }

    if($a!="true"){
        $GLOBALS['arr'] = [
            $_POST['name'],
            $_POST['age'],
            $_POST['gender'],
            $_POST['weight']
        ];
        echo("name:".$_POST['name']."<br>");
        echo("age:".$_POST['age']."<br>");
        echo("gender:".$_POST['gender']."<br>");
        echo("weight:".$_POST['weight']."<br>");
    }
?>

<?php
$servername = "localhost";
$username = "admin01";
$password = "ADmin01";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully<br>";

$a = "";
if (isset($_GET["deletex"])){
    $a = $_GET["deletex"];
}

$sql = "";
if($a=="true"){
    $sql= "DELETE FROM admin01.person1 WHERE age>20";
    echo "delete successfully<br>";
}
else{
    $sql = "INSERT INTO  admin01.person1  ( id ,  name ,  age ,  gender ,  weight )
    VALUES (NULL, '$arr[0]', $arr[1], '$arr[2]', $arr[3])";
}

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>