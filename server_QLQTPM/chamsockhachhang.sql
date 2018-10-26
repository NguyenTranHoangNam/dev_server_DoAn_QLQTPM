-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 26, 2018 at 11:40 AM
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
  `ComID` int(11) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `PhoneNumber` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `CompanyInfo`
--

CREATE TABLE `CompanyInfo` (
  `Id` int(11) NOT NULL,
  `CompanyName` varchar(255) NOT NULL,
  `ComID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `Subject` varchar(255) NOT NULL,
  `Content` text NOT NULL,
  `Requester` varchar(255) NOT NULL,
  `Assigner` varchar(255) NOT NULL,
  `SendTime` datetime NOT NULL,
  `TypeID` int(11) NOT NULL,
  `PriorityID` int(11) NOT NULL,
  `StatusID` int(11) NOT NULL,
  `AttachFile` text,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Messages`
--

CREATE TABLE `Messages` (
  `TopicID` int(11) NOT NULL,
  `SenderID` int(11) NOT NULL,
  `ReceiverID` int(11) NOT NULL,
  `SendTime` datetime NOT NULL,
  `Content` text NOT NULL,
  `TypeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Status`
--

CREATE TABLE `Status` (
  `StatusID` int(11) NOT NULL,
  `StatusName` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Topic`
--

CREATE TABLE `Topic` (
  `IP` text NOT NULL,
  `VisitorName` text NOT NULL,
  `UnreadMessageCount` int(11) NOT NULL,
  `ServedID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Visitor`
--

CREATE TABLE `Visitor` (
  `IP` int(11) NOT NULL,
  `Name` int(11) NOT NULL,
  `Email` int(11) NOT NULL,
  `Phone` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AccountCompany`
--
ALTER TABLE `AccountCompany`
  ADD PRIMARY KEY (`ComID`);

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
-- Indexes for table `Visitor`
--
ALTER TABLE `Visitor`
  ADD PRIMARY KEY (`IP`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `AccountCompany`
--
ALTER TABLE `AccountCompany`
  MODIFY `ComID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `CompanyInfo`
--
ALTER TABLE `CompanyInfo`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Mail`
--
ALTER TABLE `Mail`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Status`
--
ALTER TABLE `Status`
  MODIFY `StatusID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Visitor`
--
ALTER TABLE `Visitor`
  MODIFY `IP` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `AccountCompany`
--
ALTER TABLE `AccountCompany`
  ADD CONSTRAINT `AccountCompany_ibfk_1` FOREIGN KEY (`ComID`) REFERENCES `CompanyInfo` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
