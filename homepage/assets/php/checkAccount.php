<?php
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

<?php
    // global var
    $resArray = [];

    // database settings
    $servername = "localhost";
    $username = "admin";
    $password = "admin";
    $dbname = "admin";
    
    // POST
    $account = $_POST['loginAccount'];
    $passwd = $_POST['loginPasswd'];

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        $resArray = ['result'=>"failure","type"=>"connect","info"=>$conn->connect_error];
        echo json_encode($resArray);
        die();
    }

    {
        // 帳號密碼解密
        $key = file_get_contents("key.key");
        $decAccount = openssl_encrypt($account,"aes-128-cbc",$key,0,"0000000000000000");
        $decPasswd = openssl_encrypt($passwd,"aes-128-cbc",$key,0,"0000000000000000");

        //query
        $sql = "SELECT * FROM users where account='$decAccount' and password='$decPasswd'";
        try{
            $result = $conn->query($sql);
            if($row = $result->fetch_assoc()){
                // GET encString for redirect php
                $mtimekey = generate_timekey();
                $plaintext = file_get_contents("key.key");
                $encypted = openssl_encrypt($plaintext,"aes-128-cbc",$mtimekey,0,"0000000000000000");
                $urlenc = urlencode($encypted);
                $resArray = [
                    "result"=>"success",
                    "type"=>"login",
                    "info"=>"match",
                    "userID"=>$row['userID'],
                    "userName"=>$row['username']
                ];
            }
            else{
                $resArray = ['result'=>"failure","type"=>"login","info"=>"not match"];
            }
        }
        catch(Exception $e){
            $resArray = ['result'=>"failure","type"=>"exception","info"=>$e->getMessage()];
        }
        
    }

    $conn->close();

    echo json_encode($resArray);
?>