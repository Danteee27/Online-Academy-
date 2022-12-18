CREATE TABLE `qlkh`.`fields` (
  `fieldID` INT NOT NULL,
  `fieldName` VARCHAR(45) NOT NULL,
  `hidden` TINYINT NOT NULL,
  PRIMARY KEY (`fieldID`));

CREATE TABLE `qlkh`.`categories` (
  `catID` INT NOT NULL,
  `catName` VARCHAR(100) NOT NULL,
  `fieldID` INT NOT NULL,
  `course_num` INT NOT NULL,
  PRIMARY KEY (`catID`));

CREATE TABLE `qlkh`.`courses` (
  `courseID` INT NOT NULL,
  `courseName` VARCHAR(100) NOT NULL,
  `catID` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `instructor` VARCHAR(100) NOT NULL,
  `rating` DECIMAL(2,1) NULL,
  `rating_num` INT NOT NULL,
  `image` MEDIUMTEXT NULL,
  `price` INT NULL,
  `promotion` INT NULL,
  `lec_num` INT NULL,
  `description` MEDIUMTEXT NULL,
  `hidden` TINYINT NOT NULL,
  PRIMARY KEY (`courseID`));

CREATE TABLE `qlkh`.`lectures` (
  `lecID` INT NOT NULL,
  `lecName` VARCHAR(100) NULL,
  `courseID` INT NULL,
  `videoURL` MEDIUMTEXT NULL,
  `order` INT NULL,
  `description` MEDIUMTEXT NULL,
  PRIMARY KEY (`lecID`));

CREATE TABLE `qlkh`.`users` (
  `userID` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`userID`));


