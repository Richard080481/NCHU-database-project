-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-12-12 07:54:26
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
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `username` varchar(32) CHARACTER SET utf8 NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 NOT NULL,
  `tokenValue` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `tokenKey` varchar(255) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`userID`, `username`, `email`, `password`, `tokenValue`, `tokenKey`) VALUES
(1, 'test', 'test@test.com', 'eExIZEnErLrxsIbYzomB4Q==', '633d0c88a528fb886f9dc12bb9bfe3dd49d9d6010b5cb83e31c8ec96eca4fd74', '4137a1cff73fa12ac9b6352462c6973bc95c3a9b6001e67fe3905d127b18c0bf'),
(14, 'Joanne.Daugherty48', 'Anne.Nolan@hotmail.com', 'BgPFiNDbI8hMjGs', NULL, NULL),
(15, 'April_Rice', 'Audra_Prohaska@yahoo.com', 'SZJTWeiPX7oQfwB', NULL, NULL),
(16, 'Jaida_Herman', 'Arch.Labadie@yahoo.com', '_9uEHyCPe8mmQOP', NULL, NULL),
(17, 'Pat89', 'Kaylin.Hodkiewicz@yahoo.com', 'uYt5PDhBD1Qr3lQ', NULL, NULL),
(18, 'Annamae.Koelpin47', 'Buford44@hotmail.com', 'Z7Izb78JeYM8Vg3', NULL, NULL),
(19, 'Amparo23', 'Oscar_Heaney@yahoo.com', 'hE_GN5XM7h0EHVU', NULL, NULL),
(20, 'Ardith_Stiedemann', 'Elena.Stoltenberg0@gmail.com', '66Rll8dKrIe7eDw', NULL, NULL),
(21, 'Scarlett92', 'Braulio.Gottlieb@gmail.com', 'HqUQXWQdqa_0TB9', NULL, NULL),
(22, 'Elise_Waters', 'Dahlia63@gmail.com', 'v3utggKUl6_YqNQ', NULL, NULL),
(23, 'Stefan23', 'Jacky43@yahoo.com', 'QI_cmDn9WtRP3t8', NULL, NULL),
(24, 'Lia.Lesch45', 'Jena36@hotmail.com', 'Z6YeMMOo9BOMmbS', NULL, NULL),
(25, 'Amparo_Murazik', 'Elyse_Dietrich@hotmail.com', 'iSeT4rrhUDPLNkl', NULL, NULL),
(26, 'Savanah74', 'Neal_Strosin@yahoo.com', 'm0Tq2qgHnMstKM3', NULL, NULL),
(27, 'Madalyn.Funk45', 'Shad_Daniel81@yahoo.com', 'aAOdaZJQxX2Nxyx', NULL, NULL),
(28, 'Cali_Moen82', 'Hilton.McCullough45@hotmail.com', 'FCvr2DvcBogkq6o', NULL, NULL),
(29, 'Isabell11', 'Guadalupe86@hotmail.com', 'F5QYWgeK4shin1m', NULL, NULL),
(30, 'Valerie72', 'General50@hotmail.com', '4PFsJBzULxlD_D5', NULL, NULL),
(31, 'Carolyne85', 'Aubrey.Champlin@gmail.com', '7pA6NMKLpKKczD_', NULL, NULL),
(32, 'Garret85', 'Ottilie.Ratke49@hotmail.com', 'axIG6sjg0Dlq8xp', NULL, NULL),
(33, 'Brandy1', 'Thurman.Rau@gmail.com', 'InCugzxmyHRkI6n', NULL, NULL),
(34, 'Cayla_Bernhard', 'Ryder_Bernhard@yahoo.com', 'WaqMda3UgItThet', NULL, NULL),
(35, 'Laura7', 'Vincenzo39@gmail.com', 'NbdX8Gxs8xWE1BG', NULL, NULL),
(36, 'Kelli78', 'Aisha_Farrell39@yahoo.com', 'gyuc4idCde7sjL6', NULL, NULL),
(37, 'Bridgette6', 'Gertrude.Yundt1@yahoo.com', 'olX3PC58FfI7bJg', NULL, NULL),
(38, 'Jackeline.Russel59', 'Nickolas.Thiel94@gmail.com', 'uVUqIaf0o_3ZaUO', NULL, NULL),
(39, 'Aida_Hagenes96', 'Daron9@gmail.com', 'uZxuLVerDDDDOhj', NULL, NULL),
(40, 'Alex.Hagenes', 'Eudora28@hotmail.com', '5_J_g2jizrDI4gr', NULL, NULL),
(41, 'Jonathan_DAmore', 'Elian.Koss@yahoo.com', 'NCYUMJ48iXBkjbt', NULL, NULL),
(42, 'Sally76', 'Jacynthe58@yahoo.com', '7SjKFL9Fze8mPO1', NULL, NULL),
(43, 'Shemar24', 'Abdullah86@hotmail.com', 'G3DgQ69o4W3s1AP', NULL, NULL),
(44, 'Erich_Hilll', 'Ellis.Kub82@hotmail.com', 'WZX5e2QJjbkNtbv', NULL, NULL),
(45, 'Buddy_Muller', 'Frances_Olson@hotmail.com', 'ON3kzHwCKhrEyKb', NULL, NULL),
(46, 'Richie_Smith', 'Jeffrey.Swift67@hotmail.com', 'EMBeiXKTWbsxdPc', NULL, NULL),
(47, 'Renee.Hauck81', 'Conrad.Morissette86@gmail.com', 'stSdJ2k70JXQkiL', NULL, NULL),
(48, 'Mina61', 'Delmer_Schumm41@gmail.com', 'fmvFRB7ngBfm0Hm', NULL, NULL),
(49, 'Eryn26', 'Consuelo.Bayer46@yahoo.com', 'gHde0zbD6qAMp8W', NULL, NULL),
(50, 'Mylene_Kuphal', 'Bill39@hotmail.com', 'Y5fQzyLZOYM1eV0', NULL, NULL),
(51, 'Sterling.Bins', 'Reina31@hotmail.com', '7V3XsLDPntU4y9w', NULL, NULL),
(52, 'Ahmed_Tillman45', 'Wilbert_Stanton@gmail.com', '1VtI9ElaRHdhSBC', NULL, NULL),
(53, 'Dante5', 'Lambert_Wiza63@gmail.com', 'JGfiXiew_b1rFG7', NULL, NULL),
(54, 'Jermaine71', 'Destin46@gmail.com', 'AwdOi_cXBNynCUp', NULL, NULL),
(55, 'Cleora.Wuckert', 'Margarett65@gmail.com', 'YeGU67Ce67Dzg4Q', NULL, NULL),
(56, 'Christelle.Metz', 'Estrella.Walker18@hotmail.com', 'ALq1bO0kJJv6gPb', NULL, NULL),
(57, 'Anderson17', 'Herman.Cassin@yahoo.com', 'HaUV5LYMGIR2FCy', NULL, NULL),
(58, 'Ronny_Lehner', 'Kira.Kerluke@gmail.com', 'jVUac778fqvmHC7', NULL, NULL),
(59, 'Weldon_Wolf', 'Curtis.Jacobs58@gmail.com', 'e4TCLGdMKBnuCqA', NULL, NULL),
(60, 'Eulalia78', 'Ila72@yahoo.com', 'fiSErlp4XVDU6Ae', NULL, NULL),
(61, 'Brenda.Jast67', 'Ivory.Gutmann@gmail.com', 'TYkb0TTCLyYpvXO', NULL, NULL),
(62, 'Giovani92', 'Josephine8@hotmail.com', 'AyPaZqON3Ht4lRu', NULL, NULL),
(63, 'Jermain.Hilpert', 'Aubree21@yahoo.com', 'CyhKdwiYePt9U8U', NULL, NULL),
(64, 'Fanny.Beer', 'Rhianna_Luettgen@hotmail.com', '3lma87hVUQm7D_F', NULL, NULL),
(65, 'Chadd23', 'Marshall_Bartoletti@gmail.com', 'ELB2EcTJacCgfkr', NULL, NULL),
(66, 'Torrey_Gislason', 'Jessy.Bosco@yahoo.com', 'qRafrtbyxmv5D3n', NULL, NULL),
(67, 'Fae53', 'Malachi61@yahoo.com', '5wq5nJbJ8o83SWL', NULL, NULL),
(68, 'Marjory.Kessler', 'Waino60@yahoo.com', 'ewNJRTRuUg4bn25', NULL, NULL),
(69, 'Jennifer_Miller57', 'Vincent_Abshire@hotmail.com', '3ZceUw24hydLlC7', NULL, NULL),
(70, 'Arjun_Ebert65', 'Schuyler.Will@yahoo.com', '4gYAzFPViHzRc0V', NULL, NULL),
(71, 'Angelita73', 'Gino13@yahoo.com', '1Xtcp2SAtCIclLW', NULL, NULL),
(72, 'Kathryn.Hyatt', 'Jess.Mante@hotmail.com', 'xp1nRp35BsDGEvJ', NULL, NULL),
(73, 'Jaron.Donnelly', 'Chester.Oberbrunner@hotmail.com', 'Sp2epHgdQSlLo4l', NULL, NULL),
(74, 'Ella.Huels', 'Arianna_Mante92@yahoo.com', 'RG9m_sEDzeLbH6I', NULL, NULL),
(75, 'Elvis21', 'Horace_Tromp@hotmail.com', 'KUoTZVoJ76LeXHU', NULL, NULL),
(76, 'Josh6', 'Cassandra_Harvey73@hotmail.com', 'QWJNiEFA7vIJKHT', NULL, NULL),
(77, 'Clarabelle.Koepp96', 'Bianka57@yahoo.com', 'ePkwFV5zV4O3EDl', NULL, NULL),
(78, 'Johanna_Nitzsche19', 'Heidi.Prosacco4@yahoo.com', 'a8CPZX_CvMdfK7w', NULL, NULL),
(79, 'Eileen.King', 'Stephen.Gutkowski@gmail.com', 'EVBatJh70hc57MG', NULL, NULL),
(80, 'Jaquan_Nolan11', 'Talon_Beier57@gmail.com', 'ja36ZWzHpXY0RN0', NULL, NULL),
(81, 'Lydia41', 'Myrna21@hotmail.com', 'diDvRQxCogWkomR', NULL, NULL),
(82, 'Elissa.Glover', 'Keon.Ullrich95@yahoo.com', 'anV3sz_Hbszc5zI', NULL, NULL),
(83, 'Summer59', 'Hugh_Treutel60@gmail.com', 'o2sF4Q5emi7OY4k', NULL, NULL),
(84, 'Gardner_Nikolaus', 'Belle_Donnelly@gmail.com', 'hvYFABaefT3BXuW', NULL, NULL),
(85, 'Alva.Schimmel78', 'Euna20@hotmail.com', 'JkDbqZQAjqmweif', NULL, NULL),
(86, 'Heidi.Morissette53', 'Myrtie82@yahoo.com', 'yo27xC8wNWhOMm5', NULL, NULL),
(87, 'Walker82', 'Abbey.Bernhard@gmail.com', '9PlD8BYvDMei4SE', NULL, NULL),
(88, 'Paris_Runte81', 'Donny88@yahoo.com', 'bC_aAIvQvoCT9TJ', NULL, NULL),
(89, 'Mark70', 'Kaelyn94@hotmail.com', 'Y0QdIKpKSWFgfmL', NULL, NULL),
(90, 'Asha_Kihn4', 'Lelah55@hotmail.com', 'WsTynlC0FfFAHLa', NULL, NULL),
(91, 'Leila_Corwin', 'Sherman_Lesch33@yahoo.com', 'nRhqEYnTtiB9L9B', NULL, NULL),
(92, 'Norene.Bosco', 'Joaquin_Pfeffer@yahoo.com', '2NLdpOorHgMpd8i', NULL, NULL),
(93, 'Carmella.Abshire53', 'Briana62@yahoo.com', 'SCDnMVxkBFtdqoM', NULL, NULL),
(94, 'Maverick.Hartmann', 'Clarabelle_Goldner12@gmail.com', 'rrQa8y80FME_8RX', NULL, NULL),
(95, 'Jules1', 'Maurice_Turner39@yahoo.com', 'tbBKCI5ofypDisJ', NULL, NULL),
(96, 'Sofia3', 'Carmella.Schamberger66@gmail.com', 'VglVSZX1BlB_V3R', NULL, NULL),
(97, 'Marian_Stoltenberg', 'Ada56@yahoo.com', 'A_NJpecRTqE1Dg9', NULL, NULL),
(98, 'Summer_Cronin68', 'Cristal66@yahoo.com', 'RbYBCutNS4uCZOb', NULL, NULL),
(99, 'Pedro_Wiza60', 'Lizzie.Stark7@hotmail.com', 'n7m8J25JjbfUtam', NULL, NULL),
(100, 'Nikita.Bogisich', 'Pietro33@hotmail.com', 'XPoVWQHb2iXvcnV', NULL, NULL),
(101, 'Phoebe6', 'Pasquale_Abbott59@hotmail.com', 'ARAVrEidqmHmU04', NULL, NULL),
(102, 'Nadia97', 'Jo_Sipes@yahoo.com', '35pgV3FzXIier0N', NULL, NULL),
(103, 'Jonathon30', 'Kurtis27@gmail.com', 'sYdDPLPZV3iNlTj', NULL, NULL),
(104, 'Rico_Boyer73', 'Joseph_Spencer@yahoo.com', '0_2NdSI_DuT05ZQ', NULL, NULL),
(105, 'Hildegard_Waters', 'Dusty9@hotmail.com', '1TOfqVNbm8RVbRH', NULL, NULL),
(106, 'Dejuan61', 'Selina.Pacocha92@yahoo.com', 'kxU1WYrcNYFsCFB', NULL, NULL),
(107, 'Sabrina.Grady', 'Arne_Prosacco@hotmail.com', 'QC5TdwTUTAtLJxY', NULL, NULL),
(108, 'Elwin9', 'Belle83@gmail.com', 'GCl_FCYc20KA_0B', NULL, NULL),
(109, 'Verla.Lindgren', 'Mekhi11@yahoo.com', 'd7ubobskarbrYmw', NULL, NULL),
(110, 'Manley91', 'Tyshawn91@yahoo.com', 'Vd3AfXu59kAjM_2', NULL, NULL),
(111, 'Lillie24', 'Alva.Mante23@gmail.com', 'YOgq3VTNJ_gkYuZ', NULL, NULL),
(112, 'Sylvan.Williamson71', 'Herman_Gusikowski@yahoo.com', 'EGqfpY1tdQr_WpY', NULL, NULL),
(113, 'Elenor_Haley35', 'Cristal_Mayer@gmail.com', 'DQQOjynnh9IVRfJ', NULL, NULL);

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
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
