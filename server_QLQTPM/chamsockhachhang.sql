-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 01, 2018 at 04:19 PM
-- Server version: 8.0.13
-- PHP Version: 7.2.10-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chamsockhachhang`
--

-- --------------------------------------------------------

--
-- Table structure for table `AccountCompany`
--

CREATE TABLE `AccountCompany` (
  `Email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `PhoneNumber` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `PasswordMail` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `HostSmtpMail` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `PortSmtpMail` int(11) DEFAULT NULL,
  `HostImap` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `PortImap` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `AccountCompany`
--

INSERT INTO `AccountCompany` (`Email`, `Password`, `Username`, `PhoneNumber`, `PasswordMail`, `HostSmtpMail`, `PortSmtpMail`, `HostImap`, `PortImap`) VALUES
('coldboy6596@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Tran Joss', '0947016316', NULL, NULL, NULL, NULL, NULL),
('hotdau911995@yahoo.com', 'e10adc3949ba59abbe56e057f20f883e', 'hotdau', '0389194021', NULL, NULL, NULL, NULL, NULL),
('htkh17hcb@gmail.com', 'c37cc7113d9a78c35190a332af07d8a6', 'supportcentermanagement', '0908325568', '0908325568', 'smtp.gmail.com', 465, 'imap.gmail.com', 993),
('truongvanhau911995@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'truongvanhau911995', '0389194021', NULL, NULL, NULL, NULL, NULL),
('ttngoc653@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Tran Joss', '0947016316', NULL, NULL, NULL, NULL, NULL),
('undefined', '5e543256c480ac577d30f76f9120eb74', 'Tran Joss', '0947016316', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `chat_message`
--

CREATE TABLE `chat_message` (
  `room_id` int(11) NOT NULL,
  `account` varchar(256) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `message` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `time_send` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_file` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chat_room`
--

CREATE TABLE `chat_room` (
  `id` int(11) NOT NULL,
  `name` varchar(256) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chat_user`
--

CREATE TABLE `chat_user` (
  `room_id` int(11) NOT NULL,
  `account` varchar(256) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `time_seen` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `CompanyInfo`
--

CREATE TABLE `CompanyInfo` (
  `Id` int(11) NOT NULL,
  `CompanyName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ComID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `CompanyInfo`
--

INSERT INTO `CompanyInfo` (`Id`, `CompanyName`, `ComID`) VALUES
(1, 'COmPany1', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Mail`
--

CREATE TABLE `Mail` (
  `ID` int(11) NOT NULL,
  `Subject` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `InReplyTo` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `Email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `SendTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `TypeID` int(11) DEFAULT NULL,
  `PriorityID` int(11) DEFAULT NULL,
  `StatusID` int(11) DEFAULT NULL,
  `AttachFile` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `UserID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Mail`
--

INSERT INTO `Mail` (`ID`, `Subject`, `Content`, `InReplyTo`, `Email`, `TypeID`, `PriorityID`, `StatusID`, `AttachFile`, `UserID`) VALUES
(45, 'Re: day la tieu de thu', 'trả lời lần 4  ', '<CAMRnce5J2LHkq2cHO1ER4azV01YDK4pF+FYLhfV7HaTumiRe+w@mail.gmail.com>', 'ttngoc653@gmail.com', NULL, NULL, NULL, NULL, NULL),
(46, 'Re: day la tieu de thu', 'trả lời lần 6  ', '<CAMRnce49TYNzFqkTQkG=bovY6Z0DY_nELA_3C55FHC5S0ZjHGA@mail.gmail.com>', 'ttngoc653@gmail.com', NULL, NULL, NULL, NULL, NULL),
(47, 'Re: day la tieu de thu', 'trả lời lần 7  ', '<CAMRnce7O2ffnY1p8Mj2cs3HmPiUOXiFakPG0NwKdOjOxbWjzHg@mail.gmail.com>', 'ttngoc653@gmail.com', NULL, NULL, NULL, NULL, NULL),
(48, 'tự chọn đi nè', 'thư nặc *danh đang ở đây nè*  --  Tran The Ngoc Telephone: 0947 016 319 Facebook: Tran T. Ngoc <https://web.facebook.com/coldboy6596> ', 'undefined', 'ttngoc653@gmail.com', NULL, NULL, NULL, NULL, NULL),
(49, 'Fwd: tự chọn đi nè', 'thư nặc *danh đang ở đây nè*  --  Tran The Ngoc Telephone: 0947 016 319 Facebook: Tran T. Ngoc <https://web.facebook.com/coldboy6596> ', '<CAMRnce7tGgGtSa8KgK=Vi+Xpq+A9h3kp90Rtpn9YCnLgM1MaFg@mail.gmail.com>', 'ttngoc653@gmail.com', NULL, NULL, NULL, NULL, NULL),
(50, 'Re: tự chọn đi nè', 'abcghi  ', '<CAMRnce5txipkYd2AVDAycUn_RL6TVwDBdCDW+B0HM0+d66Qvcw@mail.gmail.com>', 'ttngoc653@gmail.com', NULL, NULL, NULL, NULL, NULL),
(51, 'yêu cầu thứ 1', 'nội dung yêu cầu 1  --  Tran The Ngoc Telephone: 0947 016 319 Facebook: Tran T. Ngoc <https://web.facebook.com/coldboy6596> ', 'undefined', 'ttngoc653@gmail.com', NULL, NULL, NULL, NULL, NULL),
(52, 'Re: yêu cầu thứ 1', 'trả lời nội dung yêu cầu 1 ', '<CAMRnce5jNWB59VwWx+U0sCZT0=7EbCa9LxRRNcs0Jukkva+p+w@mail.gmail.com>', 'ttngoc653@gmail.com', NULL, NULL, NULL, NULL, NULL),
(53, 'Re: yêu cầu thứ 1', 'trả lời nội dung yêu cầu 1 - lần 1  ', '<CAMRnce5jNWB59VwWx+U0sCZT0=7EbCa9LxRRNcs0Jukkva+p+w@mail.gmail.com>', 'ttngoc653@gmail.com', NULL, NULL, NULL, NULL, NULL),
(54, 'Re: yêu cầu thứ 1', 'trả lòi nộp dung yêu càu 1 - lần 2 tại trả lời  ', '<CAMRnce4NbAyF20mooyizZG2WvN6z8kJ1sAe8jiAtf+VeXU16iQ@mail.gmail.com>', 'ttngoc653@gmail.com', NULL, NULL, NULL, NULL, NULL),
(55, 'Re: day la tieu de thu', 'trả lời mail   ', '<785aefb7-e52a-3a16-6cee-c5fb8987aceb@gmail.com>', 'ttngoc653@gmail.com', NULL, NULL, NULL, NULL, NULL),
(56, 'tamkute01', 'xin chao cac ban iu dau ', 'undefined', 'why64955@gmail.com', NULL, NULL, NULL, NULL, NULL),
(58, 'tamkute 02', 'alibaba ', 'undefined', 'why64955@gmail.com', NULL, NULL, NULL, NULL, NULL),
(59, 'Re: hãy reply vào đây', 'abcghi  ', '<8bb4df27-efa9-a7fe-0304-3c03bf9fbc95@gmail.com>', 'ttngoc653@gmail.com', NULL, NULL, NULL, NULL, NULL),
(60, 'Re: hãy reply vào đây', 'zxcvbn  ', '<CAMRnce4Rt=DLVJnhRv6=7fjoc21FPi3tHCkvpp=hw80u_3xxnw@mail.gmail.com>', 'ttngoc653@gmail.com', NULL, NULL, NULL, NULL, NULL),
(61, 'Re: hãy reply vào đây', 'tran the ngoc  ', '<CAMRnce4Rt=DLVJnhRv6=7fjoc21FPi3tHCkvpp=hw80u_3xxnw@mail.gmail.com>', 'ttngoc653@gmail.com', NULL, NULL, NULL, NULL, NULL),
(62, 'Re: hãy reply vào đây', 'abc ghi xyz  ', '<CAMRnce6WLEU435r9UFM+yphFWsNePN1spYDam=O39SFG31hpAg@mail.gmail.com>', 'ttngoc653@gmail.com', NULL, NULL, NULL, NULL, NULL),
(63, 'tamkute03', 'lich thanh toán tiền mua hàng 9000000$ ', 'undefined', 'why64951@gmail.com', NULL, NULL, NULL, NULL, NULL),
(64, 'tamkute03', 'lich thanh toán tiền mua hàng 9000000$ ', 'undefined', 'why64951@gmail.com', NULL, NULL, NULL, NULL, NULL),
(65, 'tamkute04', 'thang nam chó ,thứ mắc dại, thứ 3D ', 'undefined', 'bihero33@gmail.com', NULL, NULL, NULL, NULL, NULL),
(66, 'tamkute05', 'tam đẹp trai ,kute ', 'undefined', 'why1460866@gmail.com', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Messages`
--

CREATE TABLE `Messages` (
  `TopicID` int(11) NOT NULL,
  `SenderID` int(11) NOT NULL,
  `ReceiverID` int(11) NOT NULL,
  `SendTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `TypeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Status`
--

CREATE TABLE `Status` (
  `StatusID` int(11) NOT NULL,
  `StatusName` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Status`
--

INSERT INTO `Status` (`StatusID`, `StatusName`) VALUES
(1, 'new'),
(2, 'responded'),
(3, 'confirm'),
(4, 'end');

-- --------------------------------------------------------

--
-- Table structure for table `Ticket`
--

CREATE TABLE `Ticket` (
  `id` int(11) NOT NULL,
  `mail_id` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `subject` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci,
  `assignee` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT 'email khĂ¡ch hĂ ng',
  `status` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Ticket`
--

INSERT INTO `Ticket` (`id`, `mail_id`, `subject`, `content`, `assignee`, `status`) VALUES
(1, '<8bb4df27-efa9-a7fe-0304-3c03bf9fbc95@gmail.com>', 'hãy reply vào đây', 'mời reply vào đây', 'ttngoc653@gmail.com', 1),
(2, '<4f089f03-0003-abc1-1817-6c3e5f53f498@gmail.com>', '12346', '798461354646', 'coldboy6596@gmail.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `TicketResponse`
--

CREATE TABLE `TicketResponse` (
  `ticket_id` int(11) NOT NULL,
  `user_response` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `mail_id` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Topic`
--

CREATE TABLE `Topic` (
  `IP` text COLLATE utf8_unicode_ci NOT NULL,
  `VisitorName` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `UnreadMessageCount` int(11) NOT NULL,
  `ServedID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Visitor`
--

CREATE TABLE `Visitor` (
  `IP` int(11) NOT NULL,
  `Name` int(11) NOT NULL,
  `Email` int(11) NOT NULL,
  `Phone` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AccountCompany`
--
ALTER TABLE `AccountCompany`
  ADD PRIMARY KEY (`Email`);

--
-- Indexes for table `chat_message`
--
ALTER TABLE `chat_message`
  ADD PRIMARY KEY (`room_id`,`account`,`time_send`);

--
-- Indexes for table `chat_room`
--
ALTER TABLE `chat_room`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_user`
--
ALTER TABLE `chat_user`
  ADD PRIMARY KEY (`room_id`,`account`);

--
-- Indexes for table `CompanyInfo`
--
ALTER TABLE `CompanyInfo`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Mail`
--
ALTER TABLE `Mail`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Status`
--
ALTER TABLE `Status`
  ADD PRIMARY KEY (`StatusID`);

--
-- Indexes for table `Ticket`
--
ALTER TABLE `Ticket`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Visitor`
--
ALTER TABLE `Visitor`
  ADD PRIMARY KEY (`IP`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat_room`
--
ALTER TABLE `chat_room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `CompanyInfo`
--
ALTER TABLE `CompanyInfo`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Mail`
--
ALTER TABLE `Mail`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `Status`
--
ALTER TABLE `Status`
  MODIFY `StatusID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Ticket`
--
ALTER TABLE `Ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Visitor`
--
ALTER TABLE `Visitor`
  MODIFY `IP` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
