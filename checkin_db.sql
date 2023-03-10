-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2023 at 11:16 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `checkin_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `bookingId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `guestName` text NOT NULL DEFAULT '',
  `qrCode` text NOT NULL DEFAULT '',
  `guests` int(11) NOT NULL DEFAULT 1,
  `roomKey` text NOT NULL,
  `roomNum` text NOT NULL,
  `roomType` text NOT NULL,
  `bookingType` text NOT NULL,
  `dateFrom` text NOT NULL DEFAULT '',
  `dateTo` text NOT NULL DEFAULT '',
  `createdAt` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`bookingId`, `userId`, `guestName`, `qrCode`, `guests`, `roomKey`, `roomNum`, `roomType`, `bookingType`, `dateFrom`, `dateTo`, `createdAt`) VALUES
(5, 4, 'Yana Derevianko', '', 5, '123', 'P027-1-3', '13 night standard non smoking room', 'EMOS-3', '', '', 'Wed Jan 25th 2023');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `surname` text NOT NULL,
  `lastname` text NOT NULL,
  `phoneNumber` text NOT NULL,
  `email` text NOT NULL,
  `rankNum` text NOT NULL,
  `pmKey` text NOT NULL,
  `title` text NOT NULL,
  `token` text NOT NULL DEFAULT '',
  `other` text NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `surname`, `lastname`, `phoneNumber`, `email`, `rankNum`, `pmKey`, `title`, `token`, `other`) VALUES
(4, 'Yana', 'Derevianko', '+380501552037', 'derevianko.yana21@gmail.com', '1LT', '12345', 'Ms.', '', ''),
(5, 'Yana', 'Derevianko', '+380501552037', 'derevianko.yana21@gmail.com', '2LT', '123456', 'Ms.', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`bookingId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `pmKey` (`pmKey`) USING HASH;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `bookingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
