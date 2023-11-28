-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-11-28 17:15:12
-- 伺服器版本： 10.4.24-MariaDB
-- PHP 版本： 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `admin`
--

-- --------------------------------------------------------

--
-- 資料表結構 `remembered_logins`
--

CREATE TABLE `remembered_logins` (
  `tokenHash` varchar(64) NOT NULL,
  `userID` int(11) DEFAULT NULL,
  `expiresAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `schedules`
--

CREATE TABLE `schedules` (
  `userID` int(11) NOT NULL,
  `scheduleID` int(11) NOT NULL,
  `name` varchar(32) CHARACTER SET utf8 NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `tag` varchar(32) CHARACTER SET utf8 DEFAULT NULL,
  `duplicate` int(11) NOT NULL,
  `detail` text CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `schedules`
--

INSERT INTO `schedules` (`userID`, `scheduleID`, `name`, `startTime`, `endTime`, `tag`, `duplicate`, `detail`) VALUES
(1, 1, '考試1', '2023-11-28 09:10:00', '2023-11-28 12:00:00', NULL, 0, NULL),
(1, 2, 'meeting', '2023-11-29 13:00:00', '2023-11-29 15:30:00', NULL, 0, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `username` varchar(32) CHARACTER SET utf8 NOT NULL,
  `account` varchar(32) CHARACTER SET utf8 NOT NULL,
  `password` varchar(32) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`userID`, `username`, `account`, `password`) VALUES
(1, 'test', 'eExIZEnErLrxsIbYzomB4Q==', 'eExIZEnErLrxsIbYzomB4Q==');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `remembered_logins`
--
ALTER TABLE `remembered_logins`
  ADD PRIMARY KEY (`tokenHash`),
  ADD KEY `idxUserID` (`userID`);

--
-- 資料表索引 `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`scheduleID`),
  ADD KEY `fk_schedule` (`userID`);

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`,`account`),
  ADD UNIQUE KEY `account` (`account`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `schedules`
--
ALTER TABLE `schedules`
  MODIFY `scheduleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `remembered_logins`
--
ALTER TABLE `remembered_logins`
  ADD CONSTRAINT `fk_userID` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `fk_schedule` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
