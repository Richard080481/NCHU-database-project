const dt = new Date();
const day = dt.getDate();
const month = dt.getMonth();
const year = dt.getFullYear();
const today = `${year}-${(month+1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
const thisMonth = `${year}-${(month+1).toString().padStart(2, '0')}`

$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});
function toggleLogInMask(){
    var mask = document.getElementById('mask');
    mask.classList.toggle('hidden');

    detectClickSpace();
}

function detectClickSpace(){
    const logInBack = document.getElementById('logInBack'); 
    logInBack.addEventListener('click', (event) => {
        if (!event.target.classList.contains('event')) {
        toggleLogInMask(); // 點擊非事件區域時關閉視窗
      }
    });
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
    localStorage.setItem("userID", userID);
    loadAMonthEvent(userID,thisMonth);
    loadADayEvent(userID,today);
}

function loadAMonthEvent(userID,m){
    $.ajax({
        url:"assets/php/searchAMonthEvent.php",
        method:"post",
        dataType:"json",
        data:{'userID':userID, 'month':m},
        success:function(json){
            //console.log(json);
            showAMonthCalendar(json, m);
        },
        error:function(err){
            console.log(err);
        }
    });
}

function loadADayEvent(userID, dateString){
    $.ajax({
      url:"assets/php/searchADayEvent.php",
      method:"post",
      dataType:"json",
      data:{'userID':userID, 'day':dateString},
      success:function(json){
          //console.log(json);
          showADayEvent(json, dateString);
      },
      error:function(err){
          console.log(err);
      }
  });
}

function showAMonthCalendar(allEventJson, m){
    allEventJson.forEach(function(event){
        if(event.startTime.includes(m)){
            addPointToCalendar(event);
        }
    })
}

function showADayEvent(allEventJson, d){
    $('#EventBox').empty();
    allEventJson.forEach(function(event){
        if(event.startTime.includes(d)){
            $('#EventBox').append(createEventDiv(event));
        }
    })
}

function addPointToCalendar(event){
    const startTimeDate = new Date(event.startTime);
    const startYear = startTimeDate.getFullYear();
    const startMonth = startTimeDate.getMonth();
    const startDay = startTimeDate.getDate();
    const eventDate = `${startYear}-${(startMonth+1).toString().padStart(2, '0')}-${(startDay).toString().padStart(2, '0')}`;
    const dayDiv = document.querySelector(`[data-day="${eventDate}"]`);
    const eventPointDiv = dayDiv.querySelector('.eventPointDiv');
    const pointDiv = document.createElement("div");
    pointDiv.classList.add("point" , "tag-1");
    pointDiv.innerText = '●';
    eventPointDiv.appendChild(pointDiv);
}

function createEventDiv(event){
    var $eventDiv= $('<div>').addClass('event');
    var $eventTimeDiv = $('<div>').addClass('eventTime');

    const startTimeDate = new Date(event.startTime);
    const startH = startTimeDate.getHours();
    const startM = startTimeDate.getMinutes();
    const formattedStartTime = `${startH.toString().padStart(2, '0')}:${startM.toString().padStart(2, '0')}`;
    var $eventStartDiv = $('<div>').addClass('eventStart').text(formattedStartTime);

    const endTimeDate = new Date(event.endTime);
    const endH = endTimeDate.getHours();
    const endM = endTimeDate.getMinutes();
    const formattedEndTime = `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;
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