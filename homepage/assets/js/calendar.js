let nav = 0;
let clicked = null;
let showMonth = thisMonth;
let pickDay = today;
var pickMonthDisplay, pickDayDisplay, calendar, newEventModal, deleteEventModal, backDrop, eventTitleInput, weekdays, selectSwitch, repeatSelect;
var darkModeIcon, darkmode;

const tagToColor = {
  "color1" : "#64CCC5",
  "color2" : "#009788",
  "color3" : "#039be6",
  "color4" : "#f5511e",
  "color5" : "#ef6c00",
  "color6" : "#ef9300",
  "color7" : "#ad1457",
  "color8" : "#d81a60",
  "color9" : "#d60000",
  "color10" : "#7986cc",
  "color11" : "#b39ddb",
  "color12" : "#9e69af",
  "color13" : "#795547",
  "color14" : "#616161",
  "color15" : "#a79b8d",
};


const tagToInput = {
  "color1" : "inputColor1",
  "color2" : "inputColor2",
  "color3" : "inputColor3",
  "color4" : "inputColor4",
  "color5" : "inputColor5",
  "color6" : "inputColor6",
  "color7" : "inputColor7",
  "color8" : "inputColor8",
  "color9" : "inputColor9",
  "color10" : "inputColor10",
  "color11" : "inputColor11",
  "color12" : "inputColor12",
  "color13" : "inputColor13",
  "color14" : "inputColor14",
  "color15" : "inputColor15",
};

function loadSchedule() {
  const scheduleid = $(this).attr('data-scheduleid');
  $.ajax({
    url: "assets/php/searchScheduleID.php",
    method: "post",
    dataType: "json",
    data: { 'scheduleID': scheduleid },
    success: function (json) {
      //console.log(json);
      openNewEventBox(json[0]);
    },
    error: function (err) {
      console.log(err);
    }
  });
}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    let currentMonth = dt.getMonth();
    dt.setDate(1);
    dt.setMonth(currentMonth + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  //console.log(`nav:${nav}, month:${month+1}`);

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText =
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');
    const dayString = `${year}-${(month + 1).toString().padStart(2, '0')}-${(i - paddingDays).toString().padStart(2, '0')}`;
    
    if (i > paddingDays) {
      daySquare.setAttribute('data-day', dayString)
      const dayNumP = document.createElement("p");
      dayNumP.innerText = i - paddingDays;
      dayNumP.classList.add("dayNumP");
      daySquare.appendChild(dayNumP);

      const eventPointDiv = document.createElement("div");
      eventPointDiv.classList.add("darkmode-ignore");
      eventPointDiv.classList.add("eventPointDiv");
      daySquare.appendChild(eventPointDiv);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }
      daySquare.addEventListener('click', () => checkTheDay(daySquare));
    } else {
      daySquare.classList.add('padding');
    }
    calendar.appendChild(daySquare);
  }

  const pickDaydate = new Date(pickDay);
  const pickDayGetDate = pickDaydate.getDate();
  pickDayDisplay.innerText = `${pickDayGetDate} ${pickDaydate.toLocaleDateString('en-us', { month: 'short' })} `;

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const monthIndex = dt.getMonth();
  pickMonthDisplay.innerText = months[monthIndex];

  showMonth = `${year}-${(month + 1).toString().padStart(2, '0')}-`;
}

function doubleClickAddEvent() {
  $('.day').on('dblclick', openNewEventBox);
}

function closeModal() {
  selectSwitch.checked = false;
  repeatSelect.style.display = 'none';
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  document.querySelector('.swatchy-element').style.display = 'none';
}

function saveAndEditEvent() {
  const startTime = document.getElementById('startTime');
  const endTime = document.getElementById('endTime');
  const eventColor = document.getElementById('eventColor');
  if (!selectSwitch.checked) {
    repeatSelect.value = '0';
  }
  if (eventTitleInput.value) {
    let tagNum;
    const colorMappings = {
      "#64CCC5": "color1",
      "#009788": "color2",
      "#039be6": "color3",
      "#f5511e": "color4",
      "#ef6c00": "color5",
      "#ef9300": "color6",
      "#ad1457": "color7",
      "#d81a60": "color8",
      "#d60000": "color9",
      "#7986cc": "color10",
      "#b39ddb": "color11",
      "#9e69af": "color12",
      "#795547": "color13",
      "#616161": "color14",
      "#a79b8d": "color15",
    };

    const colorValue = eventColor.getAttribute('data-swatchy-color');
    tagNum = colorMappings[colorValue] || "color1";
    eventTitleInput.classList.remove('error');
    var eventData = {
      title: eventTitleInput.value,
      passStartTime: startTime.value,
      passEndTime: endTime.value,
      duplicate: repeatSelect.value,
      passEventColor: tagNum,
      detail: describeText.value,
      passUserID: userID,
      passScheduleID: editEventID,
    };
    fetch(`assets/php/saveAndEditEvent.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    })
      .then(response => response.text())
      .then(eventData => {
        console.log(eventData);
        closeModal();
        load();
        loadAMonthEvent(userID, showMonth);
        loadADayEvent(userID, pickDay);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } else {
    eventTitleInput.classList.add('error');
  }

}

function openNewEventBox(eventJson) {
  if (eventJson.scheduleID) {
    //console.log('edit event');
    editEventID = eventJson.scheduleID;
    $("#eventTitleInput").val(eventJson.name);
    $("#startTime").val(eventJson.startTime);
    $("#endTime").val(eventJson.endTime);
    if (eventJson.duplicate != '0') {
      selectSwitch.checked = true;
      repeatSelect.style.display = 'block';
      repeatSelect.value = eventJson.duplicate;
    }
    const eventColor = document.getElementById('eventColor');
    eventColor.style.backgroundColor = tagToColor[eventJson.tag];
    const inputColor = document.getElementById(tagToInput[eventJson.tag]);
    eventColor.value = inputColor.value;
    $("#describeText").val(eventJson.detail);
    $('#deleteButton').css('display', 'block');
  } else {
    //console.log('new event');
    editEventID = 0;
    const pickDayDiv = document.getElementById("currentDay");
    const startTimeInput = document.getElementById("startTime");
    const endTimeInput = document.getElementById("endTime");
    const eventColor = document.getElementById('eventColor');
    eventColor.style.backgroundColor = '';
    eventColor.value = '';
    if (pickDayDiv) {
      const pickDay = pickDayDiv.getAttribute('data-day');
      startTimeInput.value = pickDay + "T00:00";
      endTimeInput.value = pickDay + "T23:59";
    } else {
      startTimeInput.value = today + "T00:00";
      endTimeInput.value = today + "T23:59";
    }
    repeatSelect.value = '0';
    $("#describeText").val('');
    $('#deleteButton').css('display', 'none');
  }

  newEventModal.style.display = 'grid';
  backDrop.style.display = 'block';
  const modalBackDrop = document.getElementById('modalBackDrop');
  modalBackDrop.addEventListener('click', (event) => {
    if (!event.target.classList.contains('event')) {
      closeModal(); // 點擊非事件區域時關閉視窗
    }
  });
}

function checkTheDay(dayDIV) {

  const cDay = document.getElementById("currentDay");
  if (cDay) {
    cDay.removeAttribute("id");
  }
  dayDIV.id = "currentDay";
  const dateString = dayDIV.getAttribute('data-day');
  pickDay = dateString;
  const date = new Date(dateString);
  const day = date.getDate();
  pickDayDisplay.innerText = `${day} ${date.toLocaleDateString('en-us', { month: 'short' })} `;
  resetTask(dateString)
}

function resetTask(dateString){
  $('#EventBox').empty();
  loadADayEvent(userID, dateString);
  loadRepeatEvent(userID, 'task');
}

function gototoday() {
  nav = 0;
  pickDay = today;
  load();
  loadCalendar(userID, thisMonth, today);
}

function nextMonth() {
  nav++;
  load();
  loadCalendar(userID, showMonth, pickDay);
}

function backMonth() {
  nav--;
  load();
  loadCalendar(userID, showMonth, pickDay);
}


function loadRepeatEvent(userID, place){
  $.ajax({
    url: "assets/php/searchRepeatEvent.php",
    method: "post",
    dataType: "json",
    data: { 'userID': userID},
    success: function (json) {
      //console.log(json);
      if(place == 'calendar'){
        showRepeatEventforCalendar(json);
      }else if(place == 'task'){
        showRepeatEventforTask(json);
        addDayEventClick();
      }else if(place == 'schedule'){
        showRepeatEventforSchedule(json);
        addMonthEventClick();
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
}

function showRepeatEventforSchedule(allEventJson){
  allEventJson.forEach(function(event){
    const SY = showMonth.substring(0, 4);
    const SM = showMonth.substring(5, 7);
    const startTimeDate = new Date (event.startTime);
    const Y = startTimeDate.getFullYear();
    const M = startTimeDate.getMonth() + 1;
    const D = startTimeDate.getDate();

    if(event.duplicate == 7){
      if(SY > Y || (SY == Y && SM > M)){
        $('#scheduleBox').append(createScheduleDiv(event));
      }
    }else if(event.duplicate == 30){
      if(SY > Y || (SY == Y && SM > M)){
        $('#scheduleBox').append(createScheduleDiv(event));
      }
    }else if(event.duplicate == 365){
      if((SY > Y && SM == M)){
        $('#scheduleBox').append(createScheduleDiv(event));
      }
    }

  })
}

function showRepeatEventforTask(allEventJson){
  allEventJson.forEach(function(event){
    const PY = pickDay.substring(0, 4);
    const PM = pickDay.substring(5, 7);
    const PD = pickDay.substring(8, 10);
    const pickDate = new Date(pickDay);
    const startTimeDate = new Date (event.startTime);
    const Y = startTimeDate.getFullYear();
    const M = startTimeDate.getMonth() + 1;
    const D = startTimeDate.getDate();

    if(event.duplicate == 7){
      if(PY > Y || (PY == Y && PM > M) || (PY == Y && PM == M && PD > D)){
        if(pickDate.getDay() == startTimeDate.getDay()){
          $('#EventBox').append(createEventDiv(event, pickDay));
        }
      }
    }else if(event.duplicate == 30){
      if((PY > Y || (PY == Y && PM > M)) && PD == D){
        $('#EventBox').append(createEventDiv(event, pickDay));
      }
    }else if(event.duplicate == 365){
      if((PY > Y && PM == M  && PD == D)){
        $('#EventBox').append(createEventDiv(event, pickDay));
      }
    }
  });
}

function showRepeatEventforCalendar(allEventJson){
  allEventJson.forEach(function(event){
    const SY = showMonth.substring(0, 4);
    const SM = showMonth.substring(5, 7);
    const startTimeDate = new Date (event.startTime);
    const Y = startTimeDate.getFullYear();
    const M = startTimeDate.getMonth() + 1;
    const D = startTimeDate.getDate();

    if(event.duplicate == 7){
      const dayOfWeek = startTimeDate.getDay();
      if(SY > Y || (SY == Y && SM > M)){
        const calendar = document.getElementById('calendar');
        const dayOfCalendar = calendar.querySelectorAll('.day');
        for(let i=dayOfWeek; i<dayOfCalendar.length; i+=7){
          if(!dayOfCalendar[i].classList.contains('padding')){
            const dayDiv = dayOfCalendar[i];
            createAPoint(dayDiv, event);
          }
        }
      }else if(SY == Y && SM == M){
        let i = D+7;
        while(i<=31){
          const eventDate = `${SY}-${(SM).toString().padStart(2, '0')}-${(i).toString().padStart(2, '0')}`;
          const dayDiv = document.querySelector(`[data-day="${eventDate}"]`);
          if(dayDiv){
            createAPoint(dayDiv, event);
          }
          i+=7;
        }
      }
    }else if(event.duplicate == 30){
      if(SY > Y || (SY == Y && SM > M)){
        const eventDate = `${SY}-${(SM).toString().padStart(2, '0')}-${(D).toString().padStart(2, '0')}`;
        const dayDiv = document.querySelector(`[data-day="${eventDate}"]`);
        if(dayDiv){
          createAPoint(dayDiv, event);
        }
      }
    }else if(event.duplicate == 365){
      if((SY > Y && SM == M)){
        const eventDate = `${SY}-${(M).toString().padStart(2, '0')}-${(D).toString().padStart(2, '0')}`;
        const dayDiv = document.querySelector(`[data-day="${eventDate}"]`);
        createAPoint(dayDiv, event);
      }
    }
  })
}


function loadAMonthEvent(userID, m) {
  $.ajax({
    url: "assets/php/searchAMonthEvent.php",
    method: "post",
    dataType: "json",
    data: { 'userID': userID, 'month': m },
    success: function (json) {
      showAMonthCalendar(json, m);
      showAMonthSchedule(json, m);
      loadRepeatEvent(userID, 'schedule');
    },
    error: function (err) {
      console.log(err);
    }
  });
}

function loadADayEvent(userID, dateString) {
  $.ajax({
    url: "assets/php/searchADayEvent.php",
    method: "post",
    dataType: "json",
    data: { 'userID': userID, 'day': dateString },
    success: function (json) {
      //console.log(json);
      showADayEvent(json, dateString);
    },
    error: function (err) {
      console.log(err);
    }
  });
}


function showAMonthCalendar(allEventJson, m) {
  allEventJson.forEach(function (event) {
    if (event.startTime.includes(m)) {
      addPointToCalendar(event);
    }
  })
}

function showAMonthSchedule(allEventJson, m) {
  $('#scheduleBox').empty();
  allEventJson.forEach(function (event) {
    $('#scheduleBox').append(createScheduleDiv(event));
  })
}

function createScheduleDiv(event) {
  var $eventDiv = $('<div>').addClass('event monthEvent');
  $eventDiv.attr('data-scheduleID', event.scheduleID);
  var $eventTimeDiv = $('<div>').addClass('eventTime');
  let colorText;
  const startTimeDate = new Date(event.startTime);
  const startD = startTimeDate.getDate();
  const formattedStartTime = `${startD.toString().padStart(2, '0')}`;
  var $eventStartDiv = $('<div>').addClass('eventStart');
  var $eventEndDiv = $('<div>').addClass('eventEnd');
  const inputColor = document.getElementById(tagToInput[event.tag]);
  colorText = inputColor.value || '';
  if(event.duplicate == 0){
    $eventStartDiv.text(formattedStartTime);
    $eventEndDiv.text(colorText);
  }else if(event.duplicate == 7){
    const W = startTimeDate.getDay();
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    $eventStartDiv.text(`每周`);
    $eventEndDiv.text(`${weekdays[W]}`);
  }else if(event.duplicate == 30){
    const D = startTimeDate.getDate();
    $eventStartDiv.text('每月');
    $eventEndDiv.text(`${(D).toString().padStart(2, '0')}`);
  }else if(event.duplicate == 365){
    const M = startTimeDate.getMonth()+1;
    const D = startTimeDate.getDate();
    $eventStartDiv.text('每年');
    $eventEndDiv.text(`${(M).toString().padStart(2, '0')}/${(D).toString().padStart(2, '0')}`)
  }

  $eventTimeDiv.append($eventStartDiv, $eventEndDiv);
  var $eventTagColorDiv = $('<div>').addClass('eventTagColor').addClass(event.tag).addClass('darkmode-ignore');
  var $eventNameP = $('<p>').addClass('eventName').text(event.name);
  if(event.duplicate!=0){
  var $eventNameP = $('<p>').addClass('eventName').text(event.name);
  var $icon = $('<i>').addClass('material-icons').text('all_inclusive');
  $eventNameP = $eventNameP.add($icon);

  }
  $eventDiv.append($eventTimeDiv, $eventTagColorDiv, $eventNameP);
  return $eventDiv
}

function addDayEventClick() {
  $('.dayEvent').click(loadSchedule);
}

function addMonthEventClick() {
  $('.monthEvent').click(loadSchedule);
}

function showADayEvent(allEventJson, d) {
  allEventJson.forEach(function (event) {
    $('#EventBox').append(createEventDiv(event, d));
  })
}

function addPointToCalendar(event) {
  const startTimeDate = new Date(event.startTime);
  const endTimeDate = new Date(event.endTime);

  while (startTimeDate < endTimeDate) {
    const Y = startTimeDate.getFullYear();
    const M = startTimeDate.getMonth();
    const D = startTimeDate.getDate();

    const eventDate = `${Y}-${(M + 1).toString().padStart(2, '0')}-${(D).toString().padStart(2, '0')}`;
    const dayDiv = document.querySelector(`[data-day="${eventDate}"]`);
    createAPoint(dayDiv, event)
    startTimeDate.setDate(startTimeDate.getDate() + 1);
  }
}

function createAPoint(dayDiv, event){
  const eventPointDiv = dayDiv.querySelector('.eventPointDiv');
  const pointDiv = document.createElement("div");
  pointDiv.classList.add("point", event.tag);
  eventPointDiv.appendChild(pointDiv);
}

function createEventDiv(event, day) {
  var $eventDiv = $('<div>').addClass('event dayEvent');
  $eventDiv.attr('data-scheduleID', event.scheduleID);
  var $eventTimeDiv = $('<div>').addClass('eventTime');

  const startTimeDate = new Date(event.startTime);
  const startH = startTimeDate.getHours();
  const startM = startTimeDate.getMinutes();
  const formattedStartTime = `${startH.toString().padStart(2, '0')}:${startM.toString().padStart(2, '0')}`;
  var $eventStartDiv = $('<div>').addClass('eventStart');

  const endTimeDate = new Date(event.endTime);
  const endH = endTimeDate.getHours();
  const endM = endTimeDate.getMinutes();
  const formattedEndTime = `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;
  var $eventEndDiv = $('<div>').addClass('eventEnd');

  const theDay = new Date(day);

  // 判斷是否為多天的行程
  if (isSameDay(startTimeDate, endTimeDate)) {

    // 判斷是否為整天行程
    if (startH === 0 && startM === 0 && endH === 23 && endM === 59) {
      $eventStartDiv.text('All');
      $eventEndDiv.text('day');
    } else {
      $eventStartDiv.text(formattedStartTime);
      $eventEndDiv.text(formattedEndTime);
    }

  } else {

    const sD = startTimeDate.getDate();
    const eD = endTimeDate.getDate();
    const DD = theDay.getDate();

    // 為多天的第一天
    if (sD === DD) {
      $eventStartDiv.text(formattedStartTime);
      $eventEndDiv.text('23:59');
      if(formattedStartTime == '00:00'){
        $eventStartDiv.text('All');
        $eventEndDiv.text('day');
      }
      // 為多天的最後一天
    } else if (eD === DD) {
      $eventStartDiv.text('00:00');
      $eventEndDiv.text(formattedEndTime);
      if(formattedEndTime == '23:59'){
        $eventStartDiv.text('All');
        $eventEndDiv.text('day');
      }
      // 為區間內
    } else {
      $eventStartDiv.text('All');
      $eventEndDiv.text('day');
    }

  }

  $eventTimeDiv.append($eventStartDiv, $eventEndDiv);
  var $eventTagColorDiv = $('<div>').addClass('eventTagColor').addClass(event.tag);
  var $eventNameP = $('<p>').addClass('eventName').text(event.name);
  $eventDiv.append($eventTimeDiv, $eventTagColorDiv, $eventNameP);
  return $eventDiv
}

function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}

function showTheSelectBox() {
  selectSwitch.addEventListener('change', function () {
    if (this.checked) {
      repeatSelect.style.display = 'block';
    } else {
      repeatSelect.style.display = 'none';
    }
  });
}

function deleteEvent() {
  $.ajax({
    url: "assets/php/deleteEvent.php",
    method: "post",
    dataType: "json",
    data: { 'scheduleID': editEventID },
    success: function (json) {
      //console.log(json);
      closeModal();
      load();
      loadAMonthEvent(userID, showMonth);
      loadADayEvent(userID, pickDay);
    },
    error: function (err) {
      console.log(err);
    }
  });
}

const options = {
  bottom: '64px', // default: '32px'
  right: 'unset', // default: '32px'
  left: '32px', // default: 'unset'
  time: '0.5s', // default: '0.3s'
  mixColor: '#fff', // default: '#fff'
  backgroundColor: '#201f1d',  // default: '#fff'
  buttonColorDark: '#100f2c',  // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: true, // default: true,
  label: '', // default: ''
  autoMatchOsTheme: true // default: true
}


function toggleDarkMode() {
  var currentIcon = darkModeIcon.innerText;
  darkmode.toggle();
  // Toggle between icons
  if (currentIcon === 'dark_mode') {
    darkModeIcon.innerText = 'light_mode';
  } else {
    darkModeIcon.innerText = 'dark_mode';
  }

  // You can add additional logic for toggling dark mode styles or other actions here
}


function initButtons() {
  showTheSelectBox();
  document.getElementById('nextButton').addEventListener('click', nextMonth);
  document.getElementById('backButton').addEventListener('click', backMonth);
  document.getElementById('quickaddEventBtn').addEventListener('click', openNewEventBox);
  document.getElementById('TodayButton').addEventListener('click', gototoday);
  document.getElementById('saveButton').addEventListener('click', saveAndEditEvent);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
}

function loadCalendar(userID, month, day){
  doubleClickAddEvent();
  loadAMonthEvent(userID, month);
  resetTask(day);
  loadRepeatEvent(userID, 'calendar');
}

window.onload = function () {
  serchfucntion();
  darkModeIcon = document.getElementById('darkMode');
  darkmode =  new Darkmode(options);
  if(darkmode.isActivated()){
    darkModeIcon.innerText = 'light_mode';
  }else{
    darkModeIcon.innerText = 'dark_mode';
  }
  pickMonthDisplay = document.getElementById('pickMonthDisplay');
  pickDayDisplay = document.getElementById('pickDayDisplay');
  calendar = document.getElementById('calendar');
  newEventModal = document.getElementById('newEventModal');
  deleteEventModal = document.getElementById('deleteEventModal');
  backDrop = document.getElementById('modalBackDrop');
  eventTitleInput = document.getElementById('eventTitleInput');
  weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  selectSwitch = document.getElementById('repeat-switch');
  repeatSelect = document.getElementById('repeat-select');
  selectSwitch.checked = false;
  loadUserTagName(userID, function() {
    initButtons();
    load();
    loadCalendar(userID, thisMonth, today);
  });
};

