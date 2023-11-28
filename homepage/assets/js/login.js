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
    loadAllEvent(userID);
}

function loadAllEvent(userID){
    $.ajax({
        url:"assets/php/searchAllEvent.php",
        method:"post",
        dataType:"json",
        data:{'userID':userID},
        success:function(json){
            console.log(json);
            showTodayEvent(json);
        },
        error:function(err){
            console.log(err);
        }
    });
}

function showTodayEvent(allEventJson){
    const dt = new Date();
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    const today = `${year}-${month+1}-${day}`

    allEventJson.forEach(function(event){
        if(event.startTime.includes(today)){
            $('#EventBox').append(createEventDiv(event));
        }
    })
}

function createEventDiv(event){
    var $eventDiv= $('<div>').addClass('event');
    var $eventTimeDiv = $('<div>').addClass('eventTime');

    var startTimeDate = new Date(event.startTime);
    var startH = startTimeDate.getHours();
    var startM = startTimeDate.getMinutes();
    var formattedStartTime = `${startH.toString().padStart(2, '0')}:${startM.toString().padStart(2, '0')}`;
    var $eventStartDiv = $('<div>').addClass('eventStart').text(formattedStartTime);

    var endTimeDate = new Date(event.endTime);
    var endH = endTimeDate.getHours();
    var endM = endTimeDate.getMinutes();
    var formattedEndTime = `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;
    var $eventEndDiv = $('<div>').addClass('eventEnd').text(formattedEndTime);

    $eventTimeDiv.append($eventStartDiv, $eventEndDiv);
    var $eventTagColorDiv = $('<div>').addClass('eventTagColor');
    var $eventNameP = $('<p>').addClass('eventName').text(event.name);
    $eventDiv.append($eventTimeDiv, $eventTagColorDiv, $eventNameP);
    return $eventDiv
}

$(document).ready(()=>{
    $.ajaxSetup({async:false});
    $('input').keypress(fInputKeypress);
    $('#loginA').click(toggleLogInMask);
    $('#signupBtn').click(fSignup);
    $('#loginBtn').click(fLogin);
});