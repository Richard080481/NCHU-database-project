let nav = 0;
let clicked = null;
let showMonth = thisMonth;
let pickDay = today;

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
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

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
      daySquare.innerText = i - paddingDays;

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
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function openNewEventBox(){
  const pickDayDiv = document.getElementById("currentDay");
  const pickDay = pickDayDiv.getAttribute('data-day');
  console.log(pickDay);
  const modalBackDrop = document.getElementById('modalBackDrop');
  newEventModal.style.display = 'grid';

  modalBackDrop.addEventListener('click', (event) => {
    if (!event.target.classList.contains('event')) {
      closeModal(); // 點擊非事件區域時關閉視窗
    }
  });
  backDrop.style.display = 'block';
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
  const userID = localStorage.getItem("userID");
  loadADayEvent(userID, dateString);
}

function gototoday(){
  nav = 0;
  pickDay = today;
  load();
  const userID = localStorage.getItem("userID");
  loadAMonthEvent(userID,thisMonth);
  loadADayEvent(userID,today);
}

function nextMonth(){
  nav++;
  load();
  const userID = localStorage.getItem("userID");
  loadAMonthEvent(userID,showMonth);
  loadADayEvent(userID,pickDay);
}

function backMonth(){
  nav--;
  load();
  const userID = localStorage.getItem("userID");
  loadAMonthEvent(userID,showMonth);
  loadADayEvent(userID,pickDay);
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
  document.getElementById('saveButton').addEventListener('click', saveEvent);
  // document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();
