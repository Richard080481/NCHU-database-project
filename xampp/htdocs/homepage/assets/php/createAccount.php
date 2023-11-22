<?php
    // global var
    $resArray = [];

    // flag
    $enableInsert = true;
    if($enableInsert==false){
        $resArray = ['result'=>"failure","type"=>"forbid"];
        echo json_encode($resArray);
        exit();
    }

    // database settings
    $servername = "localhost";
    $username = "admin";
    $password = "admin";
    $dbname = "admin";

    // POST
    $name = $_POST['signupName'];
    $account = $_POST['signupAccount'];
    $passwd = $_POST['signupPasswd'];
    

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        $resArray = ['result'=>"failure","type"=>"connect","info"=>$conn->connect_error];
        echo json_encode($resArray);
        die();
    }

    {
        // 帳號密碼加密
        $key = file_get_contents("key.key");
        $encAccount = openssl_encrypt($account,"aes-128-cbc",$key,0,"0000000000000000");
        $encPasswd = openssl_encrypt($passwd,"aes-128-cbc",$key,0,"0000000000000000");

        //query
        //account 重複會失敗，並導致id加一
        $sql = "INSERT INTO users values (0,'$name','$encAccount','$encPasswd')";
        try{
            $result = $conn->query($sql);
            if($result==true){
                $resArray = ['result'=>"success","type"=>"signup","info"=>""];
            }
            else{
                $resArray = ['result'=>"failure","type"=>"signup","info"=>""];
            }
        }
        catch(Exception $e){
            $resArray = ['result'=>"failure","type"=>"exception","info"=>$e->getMessage()];
        }
    }

    $conn->close();

    echo json_encode($resArray);
?>