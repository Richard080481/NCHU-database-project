$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

function fInputKeypress(event){
    if(event.key=="Enter"){
        fLogin();
    }
}

$(document).ready(()=>{
    $('input').keypress(fInputKeypress);
});