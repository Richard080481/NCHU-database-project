<?php

    // global var
    $resArray = [];
    // database settings
    $servername = "localhost";
    $username = "admin";
    $password = "admin";
    $dbname = "admin";

    if(!$con = mysqli_connect($servername, $username, $password, $dbname)){
        die("Failed to connect");
    }

    function query($query){
        global $con;
        $result = mysqli_query($con, $query);
        if(!is_bool($result) && mysqli_num_rows($result) > 0){
            $resArray = [];
            while($row = mysqli_fetch_assoc($result)){
                $resArray[] = $row;
            }

            return $resArray;
        }
        return false;    
    }

    function isLoggedIn(){
        if(!empty($_SESSION['SES']) && is_array($_SESSION['SES'])){

            if(!empty($_SESSION['SES']['userID']))
                return true;
        }

        //check for a cookie
        $cookie = $_COOKIE['SES'] ?? null;
        if($cookie && strstr($cookie, ":")){
            $parts = explode(":", $cookie);
            $tokenKey = $parts[0];
            $tokenValue = $parts[1];

            $query = "SELECT * FROM users where tokenKey = '$tokenKey' limit 1";
            $row = query( $query );
            if($row){
                $row = $row[0];
                if($tokenValue == $row['tokenValue']){
                    $_SESSION['SES'] = $row;
                    return true;
                }
            }
        }

        return false;
    }

    function generate_timekey() : string{
        date_default_timezone_set("Asia/Taipei");
        $mtime = floor(microtime(true)*1000);

        $fp = fopen("timekey.key","w");
        if(!$fp){
            $resArray = [
                'result'=>"failure",
                "type"=>"file",
                "info"=>""
            ];
            echo json_encode($resArray);
            die();
        }
        fwrite($fp,$mtime);
        fclose($fp);

        return $mtime;
    }
?>