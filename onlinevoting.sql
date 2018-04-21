-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2017 at 11:03 AM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `onlinevoting`
--

-- --------------------------------------------------------

--
-- Table structure for table `approval`
--

CREATE TABLE `approval` (
  `Approved_nid` varchar(25) NOT NULL,
  `Approved_voteid` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `candidate`
--

CREATE TABLE `candidate` (
  `NID` varchar(25) NOT NULL,
  `voteid` int(25) NOT NULL,
  `totalvote` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `candidate`
--

INSERT INTO `candidate` (`NID`, `voteid`, `totalvote`) VALUES
('1324', 2, 2),
('1996123', 1, 4),
('1996124', 1, 5),
('1996127', 3, 9),
('1996128', 4, 5),
('1996129', 2, 3),
('1996125', 3, 0),
('1996126', 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `Name` varchar(50) NOT NULL,
  `NID` varchar(25) NOT NULL,
  `Dateofbirth` varchar(25) NOT NULL,
  `Address` varchar(25) NOT NULL,
  `Phoneno` varchar(14) NOT NULL,
  `persontypeid` varchar(25) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`Name`, `NID`, `Dateofbirth`, `Address`, `Phoneno`, `persontypeid`, `email`, `password`) VALUES
('Sehat', '12334', '1989-02-09', 'Kochukhet', '0222556', '2', 'androidsehat@gmail.com', '123456789'),
('alif', '1324', '1996-05-15', 'Nukali', '00111422', '3', 'alif@gmail.com', '123456789'),
('Ansiur rahman Akash', '1442554', '1996-08-13', 'Dhaka', '01748555106', '1', 'ar156403@gmail.com', '123456789'),
('Projna saha', '1996123', '1996-06-24', 'Farmgate,Dhaka', '01735835781', '3', 'projna@gmail.com', '123456789'),
('Ansiur rahman Akash', '1996124', '13/08/1996', 'Dhaka', '01748555106', '1', 'ar156403@gmail.com', '123456789'),
('Bijoy', '1996125', '1996-12-05', 'Basundhara', '0171562223', '3', 'bijoy@aiub.edu', '123456789'),
('Dipto', '1996126', '1996-05-01', 'Namapara', '016765122', '3', 'dipto@gmail.com', '123456789'),
('Showmik', '1996127', '1994-09-23', 'Basundhara', '018412254', '3', 'showmik@gmail.com', '123456789'),
('dia', '1996128', '1996-11-15', 'Mirpur', '017325223', '3', 'dia@gmail.com', '123456789'),
('Morshed', '1996129', '1996-06-28', 'Du hall', '01740003430', '3', 'rasel@gmail.com', '123456789'),
('Rakib', '1996130', '1996-06-22', 'DU hall', '01521211520', '2', 'rakib@gmail.com', '123456789'),
('Ramim', '1996131', '1996-09-24', 'IUT campus', '01738138682', '2', 'ramim@gmai.com', '123456789'),
('Siblu', '1996132', '1992-03-18', 'Nukali', '017356222', '2', 'siblu@gmail.com', '123456789'),
('Asha', '1996135', '1995-02-14', 'Nukali', '0153245522', '2', 'asha@gmail.com', '123456789');

-- --------------------------------------------------------

--
-- Table structure for table `persontype`
--

CREATE TABLE `persontype` (
  `persontypeid` varchar(25) NOT NULL,
  `persontypename` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `persontype`
--

INSERT INTO `persontype` (`persontypeid`, `persontypename`) VALUES
('1', 'Admin'),
('2', 'Voter'),
('3', 'Candidate');

-- --------------------------------------------------------

--
-- Table structure for table `vote`
--

CREATE TABLE `vote` (
  `Voteid` int(15) NOT NULL,
  `votetopic` varchar(1000) NOT NULL,
  `votestatus` varchar(30) NOT NULL,
  `totalvotes` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vote`
--

INSERT INTO `vote` (`Voteid`, `votetopic`, `votestatus`, `totalvotes`) VALUES
(1, 'Who is best?', 'start', 9),
(2, 'Who should become the leader of this project?', 'not started', 5),
(3, 'Who should become the class monitor?', 'not started', 9),
(4, 'Who should become president of acc?', 'not started', 5);

-- --------------------------------------------------------

--
-- Table structure for table `votestatus`
--

CREATE TABLE `votestatus` (
  `NIDv` varchar(25) NOT NULL,
  `voteidV` int(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `votestatus`
--

INSERT INTO `votestatus` (`NIDv`, `voteidV`) VALUES
('1996128', 4),
('1996128', 4),
('1996128', 4),
('1996124', 4),
('1996124', 3),
('1996124', 3),
('1996124', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`NID`);

--
-- Indexes for table `persontype`
--
ALTER TABLE `persontype`
  ADD PRIMARY KEY (`persontypeid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
