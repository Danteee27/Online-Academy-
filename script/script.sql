-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: qlkh2
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `catID` int NOT NULL AUTO_INCREMENT,
  `catName` varchar(100) NOT NULL,
  `fieldID` int NOT NULL,
  `course_num` int NOT NULL,
  `hidden` tinyint DEFAULT '0',
  PRIMARY KEY (`catID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Web Development',1,13,0),(2,'Mobile Development',1,0,0),(3,'Management',2,0,0),(4,'Sales',2,0,0);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `courseID` int NOT NULL AUTO_INCREMENT,
  `courseName` varchar(100) DEFAULT NULL,
  `catID` int DEFAULT NULL,
  `teacherID` int DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `rating_num` int DEFAULT NULL,
  `image` mediumtext,
  `price` int DEFAULT NULL,
  `promotion` int DEFAULT NULL,
  `lec_num` int DEFAULT NULL,
  `tinydes` mediumtext,
  `maindes` longtext,
  `student_num` int DEFAULT NULL,
  `update` date DEFAULT NULL,
  `completed` tinyint DEFAULT '0',
  `hidden` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`courseID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'Web Development',1,1,4.0,50,'1gTg4WWls0hn5mccb11YhkjKnM2wams9L',199000,0,0,'',NULL,NULL,NULL,0,0),(2,'JavaScript',1,1,4.0,50,'1jOJBit2X9Xs5KGl5ECgzTMwCsujWAKOs',199000,0,10,'Learn javascript online and supercharge your web design with this Javascript for beginners training course.','Take this Javascript training course and start learning Javascript today.<br><br>\"As a business guy I have no place in programming.\" Ten years ago you could have gotten away with that statement. Today you say that to your colleagues and they scoff at you before they go back to their computers to fix real problems and do real work.<br><br>If you want to do something useful start by learning Javascript . In these days when the browser is central to all computer use knowing \"the language of the browser\" is the most important step. A few years ago Javascript potential was uncertain and many programmers considered it useless. These days however competent programmers have identified Javascript real potential and uses and it has gone from a toy language to the main language of the browser. It has become one of the most useful languages of this era. Every developer needs at least a basic understanding of Javascript. A developer who knows Javascript is the rockstar of the company and is in constant demand by employers. Our online Javascrip course will get you started by teaching all the essential aspects of coding in Javascript. So... what\'s it gonna be? Do you want to supercharge your career and be in constant demand by employers? Do you want to learn how to create dynamic and innovative Javascript documents? Start programming today with our Javascript course for Beginners training and take control of your career.',50,'2022-12-16',0,0),(3,'2022 Complete Python Bootcamp From Zero to Hero in Python',1,4,4.6,445313,'1gTg4WWls0hn5mccb11YhkjKnM2wams9L',2199000,299000,5,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',600000,'2022-12-18',0,0),(4,'The Complete Web Developer in 2023: Zero to Mastery',1,5,4.7,58415,'',1999000,0,0,'',NULL,NULL,NULL,0,0),(5,'Modern React With Redux [2012 Update]',1,2,4.7,78473,'',2299000,0,0,'',NULL,NULL,NULL,0,0),(6,'The Complete JavaScript Course 2023: From Zero to Expert',1,5,4.7,160582,'',2499000,0,0,'',NULL,NULL,NULL,0,0),(7,'Python for Data Science and Machine Learning Bootcamp',1,4,4.6,124153,'',1999000,0,0,'',NULL,NULL,NULL,0,0),(8,'Become a Certified HTML, CSS, JavaScript Web Developer',1,8,4.4,3078,'',999000,0,0,'',NULL,NULL,NULL,0,0),(9,'The Complete 2020 Fullstack Web Developer Course',1,3,4.5,6558,'',1699000,0,0,'',NULL,NULL,NULL,0,0),(10,'Introduction to Web Development',1,8,4.4,1912,'',429000,0,0,'',NULL,NULL,NULL,0,0),(11,'Ultimate Web Designer & Web Developer Course',1,9,4.6,13726,'',1899000,0,0,'',NULL,NULL,NULL,0,0),(12,'Running a Web Development Business: The Complete Guide',1,7,4.6,1612,'',1799000,0,0,'',NULL,NULL,NULL,0,0),(13,'The Complete 2023 Web Development Bootcamp',1,10,4.7,245323,'',999000,0,0,'',NULL,NULL,NULL,0,0);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbacks` (
  `fbID` int NOT NULL,
  `courseID` varchar(45) DEFAULT NULL,
  `author` varchar(45) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `content` longtext,
  `rating` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`fbID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
INSERT INTO `feedbacks` VALUES (1,'2','Nivek','Excellent!','I love this course!',5,'2022-12-18'),(2,'2','Dante','Good!','This course gives me a 5000$ job!',5,'2022-12-18'),(3,'2','Eric','Greate!','Thank you for the course!',5,'2022-12-18'),(4,'2','Messi','Vamos!','The GOAT!',5,'2022-12-19'),(5,'2','Ronaldo','Greate!','I love this course!',4,'2022-12-19'),(6,'2','Naruto','Great!','I love this course!',5,'2022-12-20'),(7,'2','Naruto','Great!','I love this course!',5,'2022-12-20'),(8,'2','Naruto','Great!','I love this course!',5,'2022-12-20'),(9,'2','Naruto','Great!','I love this course!',5,'2022-12-20'),(10,'2','Naruto','Great!','I love this course!',5,'2022-12-20'),(11,'2','Naruto','Great!','I love this course!',5,'2022-12-20'),(12,'2','Naruto','Great!','I love this course!',5,'2022-12-20');
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fields`
--

DROP TABLE IF EXISTS `fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fields` (
  `fieldID` int NOT NULL AUTO_INCREMENT,
  `fieldName` varchar(45) NOT NULL,
  `hidden` tinyint DEFAULT '0',
  PRIMARY KEY (`fieldID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fields`
--

LOCK TABLES `fields` WRITE;
/*!40000 ALTER TABLE `fields` DISABLE KEYS */;
INSERT INTO `fields` VALUES (1,'IT',0),(2,'Business',0);
/*!40000 ALTER TABLE `fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lectures`
--

DROP TABLE IF EXISTS `lectures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lectures` (
  `lecID` int NOT NULL,
  `lecName` varchar(100) DEFAULT NULL,
  `courseID` int DEFAULT NULL,
  `videoURL` mediumtext,
  `order` int DEFAULT NULL,
  `description` mediumtext,
  `hidden` tinyint DEFAULT '0',
  PRIMARY KEY (`lecID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lectures`
--

LOCK TABLES `lectures` WRITE;
/*!40000 ALTER TABLE `lectures` DISABLE KEYS */;
INSERT INTO `lectures` VALUES (1,'Introduction',1,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',1,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',0),(2,'development tool',1,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',2,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',0),(3,'getting started with html',1,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',3,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',0),(4,'introduction css',1,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',4,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',0),(5,'Inserting javascript',2,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',1,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',0),(6,'Writing javascript',2,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',2,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',0),(7,'Making a form',2,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',3,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',0),(8,'Where to go from here',2,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',4,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',0),(9,'Lab exercise',2,'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',5,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',0);
/*!40000 ALTER TABLE `lectures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `my-courses`
--

DROP TABLE IF EXISTS `my-courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `my-courses` (
  `userID` int NOT NULL,
  `courseID` int NOT NULL,
  PRIMARY KEY (`userID`,`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my-courses`
--

LOCK TABLES `my-courses` WRITE;
/*!40000 ALTER TABLE `my-courses` DISABLE KEYS */;
INSERT INTO `my-courses` VALUES (1,1),(1,3),(1,4),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11);
/*!40000 ALTER TABLE `my-courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `sid` varchar(255) NOT NULL,
  `sess` json NOT NULL,
  `expired` datetime NOT NULL,
  PRIMARY KEY (`sid`),
  KEY `sessions_expired_index` (`expired`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('App4_fMKdzs3n_KJwqQOFUl-SJuhdsqS','{\"auth\": true, \"cookie\": {\"path\": \"/\", \"expires\": null, \"httpOnly\": true, \"originalMaxAge\": null}, \"authUser\": {\"dob\": \"2022-12-21\", \"name\": \"Vu Nhat Khang\", \"role\": \"ROLE.TEACHER\", \"email\": \"khang@gmail.com\", \"userID\": 4, \"balance\": null, \"introduction\": null}, \"passport\": {\"user\": {\"id\": \"103091474803851358807\", \"sub\": \"103091474803851358807\", \"_raw\": \"{\\n  \\\"sub\\\": \\\"103091474803851358807\\\",\\n  \\\"name\\\": \\\"Ducanh Duong\\\",\\n  \\\"given_name\\\": \\\"Ducanh\\\",\\n  \\\"family_name\\\": \\\"Duong\\\",\\n  \\\"picture\\\": \\\"https://lh3.googleusercontent.com/a/AEdFTp581yC_5EAZ-KVpOLlTM_OJRijXgtccoNn_Hw7q\\\\u003ds96-c\\\",\\n  \\\"email\\\": \\\"duongducanh6101@gmail.com\\\",\\n  \\\"email_verified\\\": true,\\n  \\\"locale\\\": \\\"vi\\\"\\n}\", \"name\": {\"givenName\": \"Ducanh\", \"familyName\": \"Duong\"}, \"_json\": {\"sub\": \"103091474803851358807\", \"name\": \"Ducanh Duong\", \"email\": \"duongducanh6101@gmail.com\", \"locale\": \"vi\", \"picture\": \"https://lh3.googleusercontent.com/a/AEdFTp581yC_5EAZ-KVpOLlTM_OJRijXgtccoNn_Hw7q=s96-c\", \"given_name\": \"Ducanh\", \"family_name\": \"Duong\", \"email_verified\": true}, \"email\": \"duongducanh6101@gmail.com\", \"emails\": [{\"type\": \"account\", \"value\": \"duongducanh6101@gmail.com\"}], \"photos\": [{\"type\": \"default\", \"value\": \"https://lh3.googleusercontent.com/a/AEdFTp581yC_5EAZ-KVpOLlTM_OJRijXgtccoNn_Hw7q=s96-c\"}], \"picture\": \"https://lh3.googleusercontent.com/a/AEdFTp581yC_5EAZ-KVpOLlTM_OJRijXgtccoNn_Hw7q=s96-c\", \"language\": \"vi\", \"provider\": \"google\", \"verified\": true, \"given_name\": \"Ducanh\", \"displayName\": \"Ducanh Duong\", \"family_name\": \"Duong\", \"email_verified\": true}}}','2022-12-23 14:26:14'),('ig__Gn8wetfLx0J4JWgBVJTvJOU8Ngvx','{\"cookie\": {\"path\": \"/\", \"expires\": null, \"httpOnly\": true, \"originalMaxAge\": null}}','2022-12-22 18:58:56'),('iMQ_oX4u6yUqqHxp3DjNYHgNtJEMwjdQ','{\"cookie\": {\"path\": \"/\", \"expires\": null, \"httpOnly\": true, \"originalMaxAge\": null}}','2022-12-23 07:19:41'),('nFRVu1J4AhtYAQsapJwqkpiS2dxQudt4','{\"cookie\": {\"path\": \"/\", \"expires\": null, \"httpOnly\": true, \"originalMaxAge\": null}}','2022-12-22 16:02:06'),('Qjp8KJmQkj-yzD-YyBxfoMDLOoF-M6dM','{\"cookie\": {\"path\": \"/\", \"expires\": null, \"httpOnly\": true, \"originalMaxAge\": null}}','2022-12-22 15:51:27'),('u8KJT4Fg12ofzcoUQ65bN2G8ZDHV7mvU','{\"cookie\": {\"path\": \"/\", \"expires\": null, \"httpOnly\": true, \"originalMaxAge\": null}}','2022-12-22 15:51:28');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teachers` (
  `teacherID` int NOT NULL,
  `teacherName` varchar(100) DEFAULT NULL,
  `numCourses` int DEFAULT NULL,
  `teacherBio` mediumtext,
  `description` mediumtext,
  `rating` float DEFAULT NULL,
  `totals_stu` int DEFAULT NULL,
  `reviews` int DEFAULT NULL,
  `websites` mediumtext,
  `fb_link` mediumtext,
  `linkedin` mediumtext,
  `avatar` mediumtext,
  `bground` mediumtext,
  `email` varchar(100) DEFAULT NULL,
  `userID` int DEFAULT NULL,
  PRIMARY KEY (`teacherID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` VALUES (1,'Vũ Nhất Kkhang',5,'bio','<p>description</p>',5,50,10000,'siu.com','fb.com','linkedin.com','1Ul94zXgUvEXv7df4qGCJRwQmXzB0CyLs','11LTIF9pR0yXYe5QS-zMUkzkRFFce3vIC','khang@gmail.com',4);
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user-lectures`
--

DROP TABLE IF EXISTS `user-lectures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user-lectures` (
  `userID` int NOT NULL,
  `lecID` int NOT NULL,
  `completed` int NOT NULL DEFAULT '0',
  `courseID` int NOT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`userID`,`lecID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user-lectures`
--

LOCK TABLES `user-lectures` WRITE;
/*!40000 ALTER TABLE `user-lectures` DISABLE KEYS */;
/*!40000 ALTER TABLE `user-lectures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `introduction` mediumtext,
  `balance` int DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `dob` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin Duc Anh','$2a$10$WQUNjsmv27oXOZjumqw6ReNUP5U6qOxRs2Stqnu3PXu8YSNA/EQnK','admin@5horses.com',NULL,NULL,'ROLE.ADMIN','2022-12-21'),(2,'Duong Duc Anh','$2a$10$l7YWsKV/cvpzFZJvT9mjOOzu8S4dtyYMMu6Q4LynWnpIK6omx6A26','duongducanh6101@gmail.com',NULL,NULL,'ROLE.USER','2022-12-21'),(3,'Truong Gia Huy','$2a$10$xfrHU0bHcW7rqPGdc9IiGeQx4Nnk8/Ko0Oco4kuq0LbFTg0lPgjN.','truonghuy@gmail.com',NULL,NULL,'ROLE.TEACHER','2022-12-21'),(4,'Vu Nhat Khang','$2a$10$1aru/nUTalE6aPsA3XbSmuNadGsE6rcX6Q.JG2d81Q7iUMvyj5ppe','khang@gmail.com',NULL,NULL,'ROLE.TEACHER','2022-12-21');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlists`
--

DROP TABLE IF EXISTS `wishlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlists` (
  `userID` int NOT NULL,
  `courseID` int NOT NULL,
  PRIMARY KEY (`userID`,`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlists`
--

LOCK TABLES `wishlists` WRITE;
/*!40000 ALTER TABLE `wishlists` DISABLE KEYS */;
INSERT INTO `wishlists` VALUES (1,5);
/*!40000 ALTER TABLE `wishlists` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-22 21:34:33
