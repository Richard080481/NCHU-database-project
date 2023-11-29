<?php
    session_start();
    if(!empty($_SESSION['SES'])){
        unset($_SESSION['SES']);
        setcookie('SES', '', time()-(9000), '/');
    }
    header("Location: login.php");
?>