-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-12-06 17:07:47
-- 伺服器版本： 10.4.32-MariaDB
-- PHP 版本： 8.2.12

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
-- 資料表結構 `color_tags`
--

CREATE TABLE `color_tags` (
  `userID` int(11) DEFAULT NULL,
  `color0` varchar(10) DEFAULT NULL,
  `color1` varchar(10) DEFAULT NULL,
  `color2` varchar(10) DEFAULT NULL,
  `color3` varchar(10) DEFAULT NULL,
  `color4` varchar(10) DEFAULT NULL,
  `color5` varchar(10) DEFAULT NULL,
  `color6` varchar(10) DEFAULT NULL,
  `color7` varchar(10) DEFAULT NULL,
  `color8` varchar(10) DEFAULT NULL,
  `color9` varchar(10) DEFAULT NULL,
  `color10` varchar(10) DEFAULT NULL,
  `color11` varchar(10) DEFAULT NULL,
  `color12` varchar(10) DEFAULT NULL,
  `color13` varchar(10) DEFAULT NULL,
  `color14` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `color_tags`
--

INSERT INTO `color_tags` (`userID`, `color0`, `color1`, `color2`, `color3`, `color4`, `color5`, `color6`, `color7`, `color8`, `color9`, `color10`, `color11`, `color12`, `color13`, `color14`) VALUES
(1, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- 資料表結構 `schedules`
--

CREATE TABLE `schedules` (
  `userID` int(11) NOT NULL,
  `scheduleID` int(11) NOT NULL,
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `tag` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `duplicate` int(11) NOT NULL DEFAULT 0,
  `detail` text CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `schedules`
--

INSERT INTO `schedules` (`userID`, `scheduleID`, `name`, `startTime`, `endTime`, `tag`, `duplicate`, `detail`) VALUES
(1, 1, '考試1', '2023-11-28 09:10:00', '2023-11-28 12:00:00', NULL, 0, NULL),
(1, 2, 'meeting', '2023-11-29 13:00:00', '2023-11-29 15:30:00', NULL, 0, NULL),
(1, 3, '聚餐', '2023-12-01 15:00:00', '2023-12-01 18:00:00', NULL, 0, NULL),
(1, 4, '測試', '2023-10-23 10:00:00', '2023-10-23 17:00:00', NULL, 0, NULL),
(1, 5, '出遊', '2023-11-14 00:00:00', '2023-11-14 23:59:00', NULL, 0, NULL),
(1, 6, '回家', '2023-11-18 09:00:00', '2023-11-20 18:00:00', NULL, 0, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `username` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tokenValue` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `tokenKey` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`userID`, `username`, `email`, `password`, `tokenValue`, `tokenKey`) VALUES
(1, 'test', 'test@test.com', 'eExIZEnErLrxsIbYzomB4Q==', '633d0c88a528fb886f9dc12bb9bfe3dd49d9d6010b5cb83e31c8ec96eca4fd74', '4137a1cff73fa12ac9b6352462c6973bc95c3a9b6001e67fe3905d127b18c0bf'),
(11, '123', '123@123.com', '1Rjvn62V98fzi558VuDJqw==', NULL, NULL),
(12, 'test2', 'test2@test.com', 'oCy17ihsQ0KbypBjoi50og==', NULL, NULL);

--
-- 觸發器 `users`
--
DELIMITER $$
CREATE TRIGGER `after_user_insert` AFTER INSERT ON `users` FOR EACH ROW BEGIN
    INSERT INTO color_tags (userID)
    VALUES (NEW.userID);
END
$$
DELIMITER ;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `color_tags`
--
ALTER TABLE `color_tags`
  ADD KEY `userID` (`userID`);

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
  ADD PRIMARY KEY (`userID`) USING BTREE,
  ADD UNIQUE KEY `account` (`email`),
  ADD UNIQUE KEY `tokenKey` (`tokenKey`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `schedules`
--
ALTER TABLE `schedules`
  MODIFY `scheduleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `color_tags`
--
ALTER TABLE `color_tags`
  ADD CONSTRAINT `color_tags_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);

--
-- 資料表的限制式 `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `fk_schedule` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
