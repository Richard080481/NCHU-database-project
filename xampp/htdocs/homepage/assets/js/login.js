$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

function toggleLogInMask(){
    var mask = document.getElementById('mask');
    mask.classList.toggle('hidden');
}

function vibrateAtError(){
    $("#logInBox").addClass("loginError");
    setTimeout(()=>{
        $("#logInBox").removeClass("loginError");
    },500);
}

function showErrorMessage(msg){
    $('.ErrorMessage').text(msg);
    setTimeout(()=>{
        $('.ErrorMessage').text('');
    },500);
}

function vibrateAtSuccess(){
    $("#logInBox").addClass("signupSuccess");
    setTimeout(()=>{
        $("#logInBox").removeClass("signupSuccess");
    },500);
}

function fInputKeypress(event){
    if(event.key=="Enter"){
        fLogin();
    }
}

function fLogin(){
    let userText = $("#loginAccount").val();
    let passwdText = $("#loginPasswd").val();
    if(userText!="" && passwdText!=""){
        $.ajax({
            url:"assets/php/checkAccount.php",
            method:"post",
            dataType:"json",
            data:{'loginAccount':userText, 'loginPasswd':passwdText},
            success:function(json){
                if(json['result']=="failure"){
                    console.log(`${json['info']}`);
                    vibrateAtError();
                    showErrorMessage("Unkonwn account or incorrect password!");    
                }else{
                    //console.log(json);
                    toggleLogInMask();
                    let userID = json['userID'];
                    let userName = json['userName'];
                    loadUser(userID, userName);
                }
            },
            error:function(err){
                console.log(err);
            }
        });
    }else{
        vibrateAtError();
        showErrorMessage('Input cannot be empty!');
    }
}

function fSignup(){
    let nameText = $('#signupName').val();
    let userText = $("#signupAccount").val();
    let passwdText = $("#signupPasswd").val();
    if(userText!="" && passwdText!="" && nameText!=""){
        $.ajax({
            url:"assets/php/createAccount.php",
            method:"post",
            dataType:"json",
            data:{'signupName':nameText, 'signupAccount':userText,'signupPasswd':passwdText},
            success:function(json){
                //console.log(json);
                if(json['result']=="success") {
                    vibrateAtSuccess();
                    setTimeout(()=>{
                        location.reload();
                    },500);
                    //do something!!
                }
                else{
                    //console.log(json);
                    vibrateAtError();
                    showErrorMessage("The account already exists!");
                } 
            },
            error:function(err){
                console.log(err);
            }
        });
    }else{
        vibrateAtError();
        showErrorMessage('Input cannot be empty!');
    }
}

function loadUser(userID, userName){
    $('#loginA').text(`Hello! ${userName}`);
}

$(document).ready(()=>{
    $.ajaxSetup({async:false});
    $('input').keypress(fInputKeypress);
    $('#loginA').click(toggleLogInMask);
    $('#signupBtn').click(fSignup);
    $('#loginBtn').click(fLogin);
});