<?php
    session_start();
    require 'function.php';

    if(isLoggedIn()){
		header("Location: ../../index.php");
		die;
	}

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if (isset($_POST['signupform'])) {
            $username = addslashes($_POST['username']);
            $email = addslashes($_POST['email']);
            $password = addslashes($_POST['password']);
            $password2 = addslashes($_POST['repeatpassword']);

            if($password != $password2){
                echo 'passwords do not match!';
            }else{
                $query = "SELECT * FROM users where email='$email' limit 1";
                $row = query($query);
    
                if($row != NULL){
                    echo "The email already exists!";
                }else{
                    //加密
                    $key = file_get_contents("key.key");
                    $encPasswd = openssl_encrypt($password,"aes-128-cbc",$key,0,"0000000000000000");
                    $query = "INSERT INTO users values (0, '$username', '$email', '$encPasswd', NULL, NULL)";
                    query($query);
                }
            }

        } elseif (isset($_POST['loginform'])) {
            $email = addslashes($_POST['email']);
            $password = addslashes($_POST['password']);
            $remember = $_POST['remember'] ?? null;
            
            $query = "SELECT * FROM users where email='$email' limit 1";
            $row = query($query);
    
            if($row){
                $row = $row[0];
                //解密
                $key = file_get_contents("key.key");
                $decPasswd = openssl_decrypt($row['password'],"aes-128-cbc",$key,0,"0000000000000000");
                if($decPasswd == $password){
                    $_SESSION['SES'] = $row;
                    $userID = $row['userID'];
    
                    //set a cookie
                    if($remember){
                        $expires = time() + ((60*60*24)*7);
                        $salt = "*&&salt#@";
                        $tokenKey = hash('sha256', (time(). $salt));
                        $tokenValue = hash('sha256', ('LoogedIn'. $salt));
                        setcookie('SES', $tokenKey.':'.$tokenValue, $expires, '/');
                        $query = "UPDATE users SET tokenKey = '$tokenKey', tokenValue = '$tokenValue' ";
                        $query .= " WHERE userID = '$userID' limit 1";
                        query($query);
                    }

                    $_SESSION['USERID'] = $userID;
                    $_SESSION['USERNAME'] = $row['username'];

                    header("Location: ../../index.php");
                    die;
                }else{
                    echo "Wrong password!";
                }
            }else{
                echo "Unkonwn email!";
            }
        }

	}
?>
<!DOCTYPE html>
<html class="no-js" lang="zh-TW">
	<head>
		<title>CactusPage</title>
		
		<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<!-- Compiled and minified CSS -->
        
		<link rel="stylesheet" href="../css/login.css">
		
		<!--Import Google Icon Font-->
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		
		<!--font-family-->
		<link href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&amp;subset=devanagari,latin-ext" rel="stylesheet">
		<!-- For favicon png -->
		<link rel="shortcut icon" type="image/icon" href="../logo/cactus.png">
	</head>
	<body>
        <div id="logInBox">
            <div class="form">

                <form class="signupFrom" method="post">
                    <input type="hidden" name="signupform" value="1">
                    <p class="ErrorMessage"> </p>
                    <label for="signupName">User name</label>
                    <input type="text" name="username" id="signupName"  placeholder="username" required/>

                    <label for="signupEmail">Email</label>
                    <input type="email" name="email" id="signupEmail"  placeholder="email" title="Please enter a valid email." required/>

                    <label for="signupPasswd">Password</label>
                    <input type="password" name="password"id="signupPasswd"  placeholder="password" required/>

                    <label for="repeatPasswd">Repeat password</label>
                    <input type="password" name="repeatpassword" id="repeatPasswd" placeholder="repeat password" required/>

                    <button id="signupBtn">create</button>
                    <p class="message">Already registered? <a href="#">Log In</a></p>
                </form>

                <form class="loginFrom" method="post">
                    <input type="hidden" name="loginform" value="1">
                    <p class="ErrorMessage"> </p>
                    <label for="loginEmail">Email</label>
                    <input type="email" name="email" id="loginEmail" placeholder="email" title="Please enter a valid email." required/>

                    <label for="loginPasswd">Password</label>
                    <input type="password" name="password" id="loginPasswd"  placeholder="password" required/>
                    
                    <label for="rememberCheck">Remember me</label>
                    <input type="checkbox" name="remember" id="rememberCheck"/>

                    <button id="loginBtn">login</button>
                    <p class="message">Not registered? <a href="#">Create an account</a></p>
                </form>
            </div>
        </div>
        <script src="../js/jquery.js"></script>
        <script src="../js/globalVariable.js"></script>
        <script src = "../js/login.js"></script>
	</body>
</html>