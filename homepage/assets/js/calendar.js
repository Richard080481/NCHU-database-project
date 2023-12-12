let nav = 0;
let clicked = null;
let showMonth = thisMonth;
let pickDay = today;

const pickMonthDisplay = document.getElementById('pickMonthDisplay');
const pickDayDisplay = document.getElementById('pickDayDisplay');
const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const selectSwitch = document.getElementById('repeat-switch');
const repeatSelect = document.getElementById('repeat-select');

selectSwitch.checked = false;

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
    daySquare.setAttribute('data-day', dayString)

    if (i > paddingDays) {
      const dayNumP = document.createElement("p");
      dayNumP.innerText = i - paddingDays;
      dayNumP.classList.add("dayNumP");
      daySquare.appendChild(dayNumP);

      const eventPointDiv = document.createElement("div");
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
    switch (eventColor.getAttribute('data-swatchy-color')) {
      case "#64CCC5":
        tagNum = "color1";
        break;
      case "#009788":
        tagNum = "color2";
        break;
      case "#039be6":
        tagNum = "color3";
        break;
      case "#f5511e":
        tagNum = "color4";
        break;
      case "#ef6c00":
        tagNum = "color5";
        break;
      case "#ef9300":
        tagNum = "color6";
        break;
      case "#ad1457":
        tagNum = "color7";
        break;
      case "#d81a60":
        tagNum = "color8";
        break;
      case "#d60000":
        tagNum = "color9";
        break;
      case "#7986cc":
        tagNum = "color10";
        break;
      case "#b39ddb":
        tagNum = "color11";
        break;
      case "#9e69af":
        tagNum = "color12";
        break;
      case "#795547":
        tagNum = "color13";
        break;
      case "#616161":
        tagNum = "color14";
        break;
      case "#a79b8d":
        tagNum = "color15";
        break;
      default:
        tagNum = "color1";
    }
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
    $("#describeText").val(eventJson.detail);
    $('#deleteButton').css('display', 'block');
  } else {
    //console.log('new event');
    editEventID = 0;
    const pickDayDiv = document.getElementById("currentDay");
    const startTimeInput = document.getElementById("startTime");
    const endTimeInput = document.getElementById("endTime");
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
  loadADayEvent(userID, dateString);
}

function checkTheMonth() {
  const dateString = pickMonthDisplay.getAttribute('data-day');
  showMonth = dateString;
  pickDayDisplay.innerText = `${day} ${date.toLocaleDateString('en-us', { month: 'short' })} `;
  loadAMonthEvent(userID, dateString);
}

function gototoday() {
  nav = 0;
  pickDay = today;
  load();
  loadAMonthEvent(userID, thisMonth);
  loadADayEvent(userID, today);
}

function nextMonth() {
  nav++;
  load();
  loadAMonthEvent(userID, showMonth);
  loadADayEvent(userID, pickDay);
}

function backMonth() {
  nav--;
  load();
  loadAMonthEvent(userID, showMonth);
  loadADayEvent(userID, pickDay);
}


function loadAMonthEvent(userID, m) {
  $.ajax({
    url: "assets/php/searchAMonthEvent.php",
    method: "post",
    dataType: "json",
    data: { 'userID': userID, 'month': m },
    success: function (json) {
      //console.log(json);
      showAMonthCalendar(json, m);
      showAMonthSchedule(json, m);
      addMonthEventClick();
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
      addDayEventClick();
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
    $('#scheduleBox').append(createScheduleDiv(allEventJson, event));
  })
}

function createScheduleDiv(allEventJson, event) {
  var $eventDiv = $('<div>').addClass('event monthEvent');
  $eventDiv.attr('data-scheduleID', event.scheduleID);
  var $eventTimeDiv = $('<div>').addClass('eventTime');
  let colorText;
  const startTimeDate = new Date(event.startTime);
  const startD = startTimeDate.getDate();
  const formattedStartTime = `${startD.toString().padStart(2, '0')}`;
  var $eventStartDiv = $('<div>').addClass('eventStart');
  switch (event.tag) {
    case "color1":
      colorText = ' ' + document.getElementById('inputColor1').value || '';
      break;
    case "color2":
      colorText = ' ' + document.getElementById('inputColor2').value || '';
      break;
    case "color3":
      colorText = ' ' + document.getElementById('inputColor3').value || '';
      break;
    case "color4":
      colorText = ' ' + document.getElementById('inputColor4').value || '';
      break;
    case "color5":
      colorText = ' ' + document.getElementById('inputColor5').value || '';
      break;
    case "color6":
      colorText = ' ' + document.getElementById('inputColor6').value || '';
      break;
    case "color7":
      colorText = ' ' + document.getElementById('inputColor7').value || '';
      break;
    case "color8":
      colorText = ' ' + document.getElementById('inputColor8').value || '';
      break;
    case "color9":
      colorText = ' ' + document.getElementById('inputColor9').value || '';
      break;
    case "color10":
      colorText = ' ' + document.getElementById('inputColor10').value || '';
      break;
    case "color11":
      colorText = ' ' + document.getElementById('inputColor11').value || '';
      break;
    case "color12":
      colorText = ' ' + document.getElementById('inputColor12').value || '';
      break;
    case "color13":
      colorText = ' ' + document.getElementById('inputColor13').value || '';
      break;
    case "color14":
      colorText = ' ' + document.getElementById('inputColor14').value || '';
      break;
    case "color15":
      colorText = ' ' + document.getElementById('inputColor15').value || '';
      break;
    default:
      colorText = ' ' + document.getElementById('inputColor1').value || '';
  }
  $eventStartDiv.text(formattedStartTime + colorText);

  $eventTimeDiv.append($eventStartDiv);
  var $eventTagColorDiv = $('<div>').addClass('eventTagColor').addClass(event.tag);
  var $eventNameP = $('<p>').addClass('eventName').text(event.name);
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
  $('#EventBox').empty();
  allEventJson.forEach(function (event) {
    $('#EventBox').append(createEventDiv(event, d));
  })
}

// TODO: 修改，多天事件發生時
function addPointToCalendar(event) {
  const startTimeDate = new Date(event.startTime);
  const endTimeDate = new Date(event.endTime);

  while (startTimeDate < endTimeDate) {
    const Y = startTimeDate.getFullYear();
    const M = startTimeDate.getMonth();
    const D = startTimeDate.getDate();

    const eventDate = `${Y}-${(M + 1).toString().padStart(2, '0')}-${(D).toString().padStart(2, '0')}`;
    const dayDiv = document.querySelector(`[data-day="${eventDate}"]`);
    const eventPointDiv = dayDiv.querySelector('.eventPointDiv');
    const pointDiv = document.createElement("div");
    pointDiv.classList.add("point", event.tag);
    eventPointDiv.appendChild(pointDiv);
    startTimeDate.setDate(startTimeDate.getDate() + 1);
  }
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
      // 為多天的最後一天
    } else if (eD === DD) {
      $eventStartDiv.text('00:00');
      $eventEndDiv.text(formattedEndTime);
      // 為區間內
    } else {
      $eventStartDiv.text('All');
      $eventEndDiv.text('day');
    }

  }

  $eventTimeDiv.append($eventStartDiv, $eventEndDiv);
  var $eventTagColorDiv = $('<div>').addClass('eventTagColor');
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

function toggleDarkMode() {
  var darkModeIcon = document.getElementById('darkMode');
  var currentIcon = darkModeIcon.innerText;

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
  //document.getElementById('colorPciker').addEventListener('click', openColorBox);
  document.getElementById('TodayButton').addEventListener('click', gototoday);
  document.getElementById('saveButton').addEventListener('click', saveAndEditEvent);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('darkMode').addEventListener('click', toggleDarkMode);
}

initButtons();
load();
doubleClickAddEvent();
loadAMonthEvent(userID, thisMonth);
loadADayEvent(userID, today);