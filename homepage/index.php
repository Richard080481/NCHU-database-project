<?php
    session_start();
	require 'assets/php/function.php';

	if(!isLoggedIn()){
		header("Location: assets/php/login.php");
		die;
	};
?>
<!DOCTYPE html>
	<head>
	<title>CactusPage</title>

		<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<!-- Compiled and minified CSS -->
		<link rel="stylesheet" href="assets/css/materialize.css">
		<link rel="stylesheet" href="assets/css/indexgrid.css">
		<link rel="stylesheet" href="assets/css/style.css">
		<link rel="stylesheet" href="assets/css/calendarStyle.css">
		<link rel="stylesheet" href="assets/css/swatchy.css">

		<!-- Compiled and minified JavaScript -->
		<script src="assets/js/jquery.js" async></script>
		<script src="assets/js/globalVariable.js"></script>
		<script src="assets/js/search.js"></script>
		<script src="assets/js/materialize.js" ></script>
		<script src="https://cdn.jsdelivr.net/npm/darkmode-js@1.5.7/lib/darkmode-js.min.js"></script>
		<script src="assets/js/swatchy.js" ></script>
		<script src="assets/js/calendar.js"></script>


		<!--Import Google Icon Font-->
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

		<!--font-family-->
		<link href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&amp;subset=devanagari,latin-ext" rel="stylesheet">
		<!-- For favicon png -->
		<link rel="shortcut icon" type="image/icon" href="assets/logo/cactus.png">
    	<script>
			const userName = "<?php echo isset($_SESSION['USERNAME']) ? $_SESSION['USERNAME'] : ''; ?>";
			const userID = "<?php echo isset($_SESSION['USERID']) ? $_SESSION['USERID'] : ''; ?>";
			console.log(userID);
		</script>
  </head>
	<body>
		<div class="wrapper">
		<!---header start--->
		<div class="gridDiv" id="header">
			<nav>
				<div class="nav-wrapper">
					<a id="homeTitle" class="brand-logo" href="index.php">&nbsp;&nbsp;Cactus</a> <!--Catus is so cute, Don't you think so?-->
					<ul id="nav-mobile" class="right hide-on-med-and-down">
            <li class="navbarButton"><a href="#" onclick="toggleDarkMode()"><i id="darkMode" class="material-icons">dark_mode</i></a></li>
						<li class="navbarButton"><a href="https://idp.nchu.edu.tw/nidp/idff/sso?id=20&sid=5&option=credential&sid=5&target=https%3A%2F%2Fportal.nchu.edu.tw%2Fportal">NCHUSSO</a></li>
						<li class="navbarButton"><a href="https://lms2020.nchu.edu.tw/">iLearning 3.0</a></li>
						<li class="navbarButton"><a href="https://chat.openai.com/">ChatGPT</a></li>
						<li class="navbarButton"><a href="https://www.youtube.com/">Youtube</a></li>
						<li class="navbarButton"><a href="https://streetvoice.com/">StreetVoice</a></li>
						<li class="navbarButton"><a href="https://www.netflix.com">NetFlix</a></li>
						<li class="navbarButton"><a href="https://www.facebook.com/">facebook</a></li>
						<li class="navbarButton"><button id="nameButton">Hello! <?php echo isset($_SESSION['USERNAME']) ? $_SESSION['USERNAME'] : ''; ?></button></li>
						<li class="navbarButton"><a id="logoutBtn" href="assets/php/logout.php"><i class="material-icons">logout</i></a></li>
					</ul>
				</div>
			</nav>
		</div>
		<!---header end--->

		<!---searchbar start--->
		<div class="gridDiv" id="searchBarDiv">
			<div class="search">
				<p for="youtubeBar">Youtube Search</p>
				<input class="shortSearchBar" type="text" id="youtubeBar" placeholder="輸入想搜尋的影片(按Enter可進到YT主頁)">
			</div>
			<div class="search">
				<p for="searchBar">Google Search</p>
				<input class="shortSearchBar" type="text" id="searchBar" placeholder="輸入搜尋內容(按Enter可進到Google主頁)">
			</div>
			<div class="search">
				<p for="translateBar">Translate</p>
				<input class="shortSearchBar" type="text" id="translateBar" placeholder="輸入想翻譯的文字(英翻中，其他語言翻英)">
			</div>
		</div>
		<!---searchbar end--->

		<!---sidebar start--->
		<!-- <div class="gridDiv" id="sideBar">
			<div>
				<ul>
					<li class="sideBarIcon"><a class="sideLink" href="index.php"><i
								class="material-icons">cottage</i>Home</a></li>
					<li class="sideBarIcon"><a class="sideLink" href="calendar.html"><i
								class="material-icons">event</i>calendar</a></li>
					<li class="sdf"><a class="sideLink" href="timer.html"><i
								class="material-icons">timer</i>Timer</a></li>
					<li class="sideBarIcon"><a class="sideLink" id="settingBtn" href="setting.html"><i
								class="material-icons">settings</i>Setting</a></li>
				</ul>
			</div>
		</div> -->
		<!---sidebar end--->

		<!-- calendar star -->

		<div class="gridDiv" id="calendarBar">
			<div class="calendarContent" id="today">
				<div id="Eventheader" class="cHeader">
					<p>Task</p>
					<div id="pickDayDisplay"></div>
				</div>
				<div id="EventBox" class="cBox">
				</div>
			</div>

			<!-- mainCalendar start -->
			<div class="calendarContent" id="mainCalendar">
				<div id="calendarheader">
					<div id="monthDisplay"></div>
					<div>
						<button id="quickaddEventBtn">+Event</button>
						<button id="TodayButton">Today</button>
						<button id="backButton">＜</button>
						<button id="nextButton">＞</button>
					</div>
				</div>

				<div id="weekdays">
					<div>Sun</div>
					<div>Mon</div>
					<div>Tue</div>
					<div>Wed</div>
					<div>Thu</div>
					<div>Fri</div>
					<div>Sat</div>
				</div>
				<div id="calendar"></div>

				<div id="newEventModal">
					<h3>Event</h3>
					<form>
						<div>
							<label for="eventTitleInput">Title</label>
							<input id="eventTitleInput" placeholder="Event Title" /><br>
						</div>
						<div>
							<label for="startTime">Starting Time</label>
							<input class="inputField" type="datetime-local" id="startTime" name="startTime"><br>
						</div>
						<div>
							<label for="endTime">Ending Time</label>
							<input class="inputField" type="datetime-local" id="endTime" name="endTime"><br>
						</div>

						<!-- color picker -->

						<div id="classColor">
							<button class="swatchy-trigger" id="colorPciker" type="button"><i class="material-icons">colorize</i></button>
							<div class="showColor">
								<input type="text" class="swatchy-output" id="eventColor" disabled>
							</div>
						</div>



						<!-- color picker end -->
						<!-- switch start -->
						<div class="switch">
							<label>
								重複
								<input type="checkbox" id="repeat-switch">
								<span class="lever"></span>
							</label>
						</div>

						<select id="repeat-select">
							<option value="7">每周</option>
							<option value="30">每月</option>
							<option value="365">每年</option>
						</select>

						<div>
							<label for="describeText">Describe</label>
							<input class="inputField" type="text" id="describeText" name="describeText"
								placeholder="describe" maxlength="100"><br>
						</div>

					</form>
					<div class="btnBox">
						<button id="saveButton">Save</button>
						<button id="deleteButton">Delete</button>
					</div>
				</div>
				<div id="modalBackDrop"></div>
			</div>
			<!-- mainCalendar end -->

			<div class="calendarContent" id="month">
				<div id="scheduleheader" class="cHeader">
					<p>schedule</p>
					<div id="pickMonthDisplay"></div>
				</div>
				<div id="scheduleBox" class="cBox">
				</div>
			</div>
		</div>



		<!--buttonbar start-->
		<div class="gridDiv" id="buttonBar">
			<div class="buttonbar"><a href="https://drive.google.com/drive/u/0/my-drive"><img
						src="assets/images/clouddrive.svg" class="btnicon">Google Drive</a></div>
			<div class="buttonbar"><a href="https://mail.google.com/mail/u"><img src="assets/images/gmail.svg"
						class="btnicon">Gmail</a></div>
			<div class="buttonbar"><a href="https://www.google.com/maps"><img src="assets/images/gmaps.svg"
						class="btnicon">Google Map</a></div>
			<div class="buttonbar"><a href="https://github.com"><img src="assets/images/github.svg"
						class="btnicon">github</a></div>
			<div class="buttonbar"><a href="https://metronom.us/en/"><img src="assets/images/metronomus.svg"
						class="btnicon">metronomus</a></div>
			<div class="buttonbar"><a href="https://leetcode.com/"><img src="assets/images/leetcode.svg"
						class="btnicon">LeetCode</a></div>
			<div class="buttonbar"><a href="https://www.overleaf.com/project"><img src="assets/images/overleaf.svg"
						class="btnicon">OverLeaf</a></div>
			<div class="buttonbar"><a href="https://en.cppreference.com/w/"><img src="assets/images/cpp.svg"
						class="btnicon">CppReference</a></div>
		</div>
		
	</body>
</html>