-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2022 at 08:46 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

--
-- Table structure for table `booking_property`
--

CREATE TABLE `booking_property` (
  `id` int(100) NOT NULL,
  `propertyId` int(100) NOT NULL,
  `userId` int(100) NOT NULL,
  `fromDate` date NOT NULL,
  `toDate` date NOT NULL,
  `guests` int(100) NOT NULL,
  `amountPaid` int(100) NOT NULL,
  `currencyType` varchar(100) NOT NULL,
  `paymentMethod` varchar(100) NOT NULL,
  `transactionId` varchar(100) NOT NULL,
  `transactionType` varchar(100) NOT NULL,
  `transactionEmail` varchar(100) NOT NULL,
  `cardLastNumbers` int(100) NOT NULL,
  `cardId` varchar(100) NOT NULL,
  `cardBrand` varchar(100) NOT NULL,
  `cardExpMonth` varchar(100) NOT NULL,
  `cardExpYear` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `booking_property`
--

INSERT INTO `booking_property` (`id`, `propertyId`, `userId`, `fromDate`, `toDate`, `guests`, `amountPaid`, `currencyType`, `paymentMethod`, `transactionId`, `transactionType`, `transactionEmail`, `cardLastNumbers`, `cardId`, `cardBrand`, `cardExpMonth`, `cardExpYear`) VALUES
(1, 1, 2, '0000-00-00', '0000-00-00', 3, 100, '?', 'Stripe', '11111', '11111', '22222', 4444, '123', 'token.card.brand', 'token.card.exp_month', 'token.card.exp_year');

-- --------------------------------------------------------

--
-- Table structure for table `favorite`
--

CREATE TABLE `favorite` (
  `id` int(100) NOT NULL,
  `user_id` int(100) NOT NULL,
  `hosting_id` int(100) NOT NULL,
  `isFavorite` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `favorite`
--

INSERT INTO `favorite` (`id`, `user_id`, `hosting_id`, `isFavorite`) VALUES
(1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `hosting`
--

CREATE TABLE `hosting` (
  `id` int(100) NOT NULL,
  `userId` int(100) NOT NULL,
  `countryName` varchar(255) NOT NULL,
  `typeOfPropert` varchar(255) NOT NULL,
  `whatGuestBook` varchar(255) NOT NULL,
  `bedrooms` int(255) NOT NULL,
  `noOfBed` int(255) NOT NULL,
  `bedType` varchar(255) NOT NULL,
  `baths` varchar(255) NOT NULL,
  `noOfGuests` int(255) NOT NULL,
  `listingTitle` varchar(255) NOT NULL,
  `listingDescription` varchar(255) NOT NULL,
  `amenList` varchar(255) NOT NULL,
  `houseRuelsList` varchar(255) NOT NULL,
  `imageList` varchar(255) NOT NULL,
  `additionalHouseRules` varchar(255) NOT NULL,
  `specificDestails` varchar(255) NOT NULL,
  `noticeBeforeGuestArrival` varchar(255) NOT NULL,
  `BookingAvailablity` varchar(255) NOT NULL,
  `arriveBefore` varchar(255) NOT NULL,
  `arriveAfter` varchar(255) NOT NULL,
  `leaveBefore` varchar(255) NOT NULL,
  `minStayInNight` int(255) NOT NULL,
  `maxStayInNight` int(255) NOT NULL,
  `currencyType` varchar(255) NOT NULL,
  `basePrice` int(255) NOT NULL,
  `discount` varchar(255) NOT NULL,
  `govermentId` varchar(255) NOT NULL,
  `profilePic` varchar(255) NOT NULL,
  `addrHouseNumber` varchar(255) NOT NULL,
  `addrStreet` varchar(255) NOT NULL,
  `addrCity` varchar(255) NOT NULL,
  `addrState` varchar(255) NOT NULL,
  `lat` varchar(255) NOT NULL,
  `lng` varchar(255) NOT NULL,
  `forGuestOnly` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hosting`
--

INSERT INTO `hosting` (`id`, `userId`, `countryName`, `typeOfPropert`, `whatGuestBook`, `bedrooms`, `noOfBed`, `bedType`, `baths`, `noOfGuests`, `listingTitle`, `listingDescription`, `amenList`, `houseRuelsList`, `imageList`, `additionalHouseRules`, `specificDestails`, `noticeBeforeGuestArrival`, `BookingAvailablity`, `arriveBefore`, `arriveAfter`, `leaveBefore`, `minStayInNight`, `maxStayInNight`, `currencyType`, `basePrice`, `discount`, `govermentId`, `profilePic`, `addrHouseNumber`, `addrStreet`, `addrCity`, `addrState`, `lat`, `lng`, `forGuestOnly`) VALUES
(1, 1, 'India', 'in', 'in', 1, 1, 'in', 'in', 1, 'in', 'in', '1,2,m', '1,2,m', '1,2,m', 'in', 'in', 'in', 'in', 'in', 'in', 'in', 1, 3, 'in', 700, 'in', 'n', '1', '2', '1', 'bhopal', '1', '1', '1', '');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(100) NOT NULL,
  `userId` int(100) NOT NULL,
  `hosting_id` int(100) NOT NULL,
  `message` varchar(255) NOT NULL,
  `ratings` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `userId`, `hosting_id`, `message`, `ratings`) VALUES
(1, 1, 1, 'Good Apartment', 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `logintoken` varchar(255) NOT NULL,
  `profile_pic` varchar(255) NOT NULL,
  `govt_id` varchar(255) NOT NULL,
  `login_type` varchar(255) NOT NULL,
  `work` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `about` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `logintoken`, `profile_pic`, `govt_id`, `login_type`, `work`, `location`, `about`, `phone`, `password`) VALUES
(1, 'Krishna', 'kk@gmail.com', 'Hwc4P8asiFto1JuW', 'https://checkin-images-upload.s3.ap-south-1.amazonaws.com/efda02e0-d954-4125-93e5-ec49b7081759default-profile.png', '', 'Email and Password', '', '', '', '7697114202', '$2b$10$I2bMlePSAkJVWAt8PBuymuPGn19KTmzzBas9NgcfWHvvLTGY1FaC.'),
(2, 'Customer', 'cu@gmail.com', 'S1kMqr98ZJ5cF5h2', 'https://checkin-images-upload.s3.ap-south-1.amazonaws.com/efda02e0-d954-4125-93e5-ec49b7081759default-profile.png', '', 'Email and Password', '', '', '', '7697114202', '$2b$10$Xs0binmpJNVIGGEY48.q8.rJLJ8pyseRAN7E5SUyk4kqCj81OQGya');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking_property`
--
ALTER TABLE `booking_property`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hosting`
--
ALTER TABLE `hosting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking_property`
--
ALTER TABLE `booking_property`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `favorite`
--
ALTER TABLE `favorite`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hosting`
--
ALTER TABLE `hosting`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
