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

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');
    const dayString = `${year}-${(month+1).toString().padStart(2, '0')}-${(i-paddingDays).toString().padStart(2, '0')}`;
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
  pickDayDisplay.innerText = `${pickDayGetDate} ${pickDaydate.toLocaleDateString('en-us', {month: 'short'})} `;

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  
  const monthIndex = dt.getMonth();
  pickMonthDisplay.innerText = months[monthIndex];

  showMonth = `${year}-${month + 1}`;
}

function closeModal() {
  selectSwitch.checked = false;
  repeatSelect.style.display = 'none';
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
}

// function saveEvent() {
//   if (eventTitleInput.value) {
//     eventTitleInput.classList.remove('error');

//     var eventData = {
//       date: clicked,
//       title: eventTitleInput.value,
//       duplicate: clicked,
//       detail: describeText.value,
//     };

//     fetch('saveEvent.php', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(eventData),
//     })
//       .then(response => response.text())
//       .then(data => {
//         console.log(data);
//         closeModal();
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   } else {
//     eventTitleInput.classList.add('error');
//   }
// }


function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function openNewEventBox(){
  const pickDayDiv = document.getElementById("currentDay");
  const pickDay = pickDayDiv.getAttribute('data-day');
  const modalBackDrop = document.getElementById('modalBackDrop');
  newEventModal.style.display = 'grid';
  const startTimeInput = document.getElementById("startTime");
  const endTimeInput = document.getElementById("endTime");
  startTimeInput.value = pickDay + "T00:00";
  endTimeInput.value = pickDay + "T23:59";
  backDrop.style.display = 'block';
  
  modalBackDrop.addEventListener('click', (event) => {
    if (!event.target.classList.contains('event')) {
      closeModal(); // 點擊非事件區域時關閉視窗
    }
  });
}

function checkTheDay(dayDIV){

  const cDay = document.getElementById("currentDay");
  if(cDay){
    cDay.removeAttribute("id");
  }
  dayDIV.id = "currentDay";
  const dateString = dayDIV.getAttribute('data-day');
  pickDay = dateString;
  const date = new Date(dateString);
  const day = date.getDate();
  pickDayDisplay.innerText = `${day} ${date.toLocaleDateString('en-us', {month: 'short'})} `;
  loadADayEvent(userID, dateString);
}

function checkTheMonth(){
  const dateString = pickMonthDisplay.getAttribute('data-day');
  showMonth = dateString;
  pickDayDisplay.innerText = `${day} ${date.toLocaleDateString('en-us', {month: 'short'})} `;
  loadAMonthEvent(userID, dateString);
}

function gototoday(){
  nav = 0;
  pickDay = today;
  load();
  loadAMonthEvent(userID,thisMonth);
  loadADayEvent(userID,today);
}

function nextMonth(){
  nav++;
  load();
  loadAMonthEvent(userID,showMonth);
  loadADayEvent(userID,pickDay);
}

function backMonth(){
  nav--;
  load();
  loadAMonthEvent(userID,showMonth);
  loadADayEvent(userID,pickDay);
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
        $('#EventBox').append(createEventDiv(event, d));
  })
}

// TODO: 修改，多天事件發生時
function addPointToCalendar(event){
  const startTimeDate = new Date(event.startTime);
  const endTimeDate = new Date(event.endTime);


  const startYear = startTimeDate.getFullYear();
  const startMonth = startTimeDate.getMonth();
  const startDay = startTimeDate.getDate();
  const eventDate = `${startYear}-${(startMonth+1).toString().padStart(2, '0')}-${(startDay).toString().padStart(2, '0')}`;
  const dayDiv = document.querySelector(`[data-day="${eventDate}"]`);
  const eventPointDiv = dayDiv.querySelector('.eventPointDiv');
  const pointDiv = document.createElement("div");
  pointDiv.classList.add("point" , "tag-1");
  eventPointDiv.appendChild(pointDiv);
}

function createEventDiv(event, day){
  var $eventDiv= $('<div>').addClass('event');
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
  if(isSameDay(startTimeDate, endTimeDate)){

    // 判斷是否為整天行程
    if(startH === 0 && startM === 0 && endH === 23 && endM === 59){
      $eventStartDiv.text('All');
      $eventEndDiv.text('day');
    }else{
      $eventStartDiv.text(formattedStartTime);
      $eventEndDiv.text(formattedEndTime);
    }

  }else{

    const sD = startTimeDate.getDate();
    const eD = endTimeDate.getDate();
    const DD = theDay.getDate();

    // 為多天的第一天
    if(sD === DD){
      $eventStartDiv.text(formattedStartTime);
      $eventEndDiv.text('23:59');
    // 為多天的最後一天
    }else if(eD === DD){
      $eventStartDiv.text('00:00');
      $eventEndDiv.text(formattedEndTime);
    // 為區間內
    }else{
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
  selectSwitch.addEventListener('change', function() {
    if(this.checked) {
      repeatSelect.style.display = 'block';
    } else {
      repeatSelect.style.display = 'none';
    }
  });
}

function initButtons() {
  showTheSelectBox();
  document.getElementById('nextButton').addEventListener('click',nextMonth);
  document.getElementById('backButton').addEventListener('click', backMonth);
  document.getElementById('quickaddEventBtn').addEventListener('click', openNewEventBox);
  document.getElementById('TodayButton').addEventListener('click', gototoday)
  // document.getElementById('saveButton').addEventListener('click', saveEvent);
  // document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();
loadAMonthEvent(userID,thisMonth);
loadADayEvent(userID,today);