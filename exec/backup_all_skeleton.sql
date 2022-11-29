-- MariaDB dump 10.19  Distrib 10.9.3-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: 
-- ------------------------------------------------------
-- Server version	10.9.3-MariaDB-1:10.9.3+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `delete_user`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `delete_user` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `delete_user`;

--
-- Table structure for table `delete_dead_moti`
--

DROP TABLE IF EXISTS `delete_dead_moti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delete_dead_moti` (
  `dead_moti_no` bigint(20) NOT NULL,
  `moti_birth` varchar(255) DEFAULT NULL,
  `moti_catalog_no` bigint(20) DEFAULT NULL,
  `moti_death` varchar(255) DEFAULT NULL,
  `moti_gender` varchar(255) DEFAULT NULL,
  `moti_name` varchar(255) DEFAULT NULL,
  `user_no` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`dead_moti_no`),
  KEY `FKaoq5b9j91f11pgk918qp8tbho` (`user_no`),
  CONSTRAINT `FKaoq5b9j91f11pgk918qp8tbho` FOREIGN KEY (`user_no`) REFERENCES `delete_user` (`user_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delete_dead_moti`
--

LOCK TABLES `delete_dead_moti` WRITE;
/*!40000 ALTER TABLE `delete_dead_moti` DISABLE KEYS */;
/*!40000 ALTER TABLE `delete_dead_moti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delete_user`
--

DROP TABLE IF EXISTS `delete_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delete_user` (
  `user_no` bigint(20) NOT NULL,
  `delete_date` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_no`),
  UNIQUE KEY `UK74ut8i17b3qmxvgvrj5ka0mnf` (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delete_user`
--

LOCK TABLES `delete_user` WRITE;
/*!40000 ALTER TABLE `delete_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `delete_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delete_user_accounts`
--

DROP TABLE IF EXISTS `delete_user_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delete_user_accounts` (
  `provider` varchar(255) NOT NULL,
  `user_no` bigint(20) NOT NULL,
  `provider_id` varchar(255) NOT NULL,
  PRIMARY KEY (`provider`,`user_no`),
  KEY `FKsudyd0kov87v9a7h25gnt4gwb` (`user_no`),
  CONSTRAINT `FKsudyd0kov87v9a7h25gnt4gwb` FOREIGN KEY (`user_no`) REFERENCES `delete_user` (`user_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delete_user_accounts`
--

LOCK TABLES `delete_user_accounts` WRITE;
/*!40000 ALTER TABLE `delete_user_accounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `delete_user_accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delete_user_goods`
--

DROP TABLE IF EXISTS `delete_user_goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delete_user_goods` (
  `goods_type` varchar(255) NOT NULL,
  `user_no` bigint(20) NOT NULL,
  `goods_count` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`goods_type`,`user_no`),
  KEY `FKan5k87slxthed9ti4728ggfcq` (`user_no`),
  CONSTRAINT `FKan5k87slxthed9ti4728ggfcq` FOREIGN KEY (`user_no`) REFERENCES `delete_user` (`user_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delete_user_goods`
--

LOCK TABLES `delete_user_goods` WRITE;
/*!40000 ALTER TABLE `delete_user_goods` DISABLE KEYS */;
/*!40000 ALTER TABLE `delete_user_goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delete_user_inventory`
--

DROP TABLE IF EXISTS `delete_user_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delete_user_inventory` (
  `item_catalog_no` bigint(20) NOT NULL,
  `user_no` bigint(20) NOT NULL,
  `item_count` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`item_catalog_no`,`user_no`),
  KEY `FK9ughedho00t0gn5d7g61534wv` (`user_no`),
  CONSTRAINT `FK9ughedho00t0gn5d7g61534wv` FOREIGN KEY (`user_no`) REFERENCES `delete_user` (`user_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delete_user_inventory`
--

LOCK TABLES `delete_user_inventory` WRITE;
/*!40000 ALTER TABLE `delete_user_inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `delete_user_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delete_user_theme`
--

DROP TABLE IF EXISTS `delete_user_theme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delete_user_theme` (
  `user_no` bigint(20) NOT NULL,
  `button_color` varchar(255) NOT NULL,
  `device_color` varchar(255) NOT NULL,
  PRIMARY KEY (`user_no`),
  CONSTRAINT `FK3vx385wk1s65fg7hxb8n7b57b` FOREIGN KEY (`user_no`) REFERENCES `delete_user` (`user_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delete_user_theme`
--

LOCK TABLES `delete_user_theme` WRITE;
/*!40000 ALTER TABLE `delete_user_theme` DISABLE KEYS */;
/*!40000 ALTER TABLE `delete_user_theme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'delete_user'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `REMOVE_USER` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `REMOVE_USER` ON SCHEDULE EVERY 1 DAY STARTS '2022-11-18 00:00:00' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
        DECLARE TODAY_DATE VARCHAR(255);
        SET TODAY_DATE = (SELECT DATE_FORMAT(NOW(),'%Y-%m-%d'));

        DELETE FROM delete_user.delete_user WHERE delete_date = TODAY_DATE;
    END */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'delete_user'
--

--
-- Current Database: `dev`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `dev` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `dev`;

--
-- Table structure for table `combination`
--

DROP TABLE IF EXISTS `combination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `combination` (
  `user_no` bigint(20) DEFAULT NULL,
  `closeness` bigint(20) DEFAULT NULL,
  `moti_type` varchar(255) DEFAULT NULL,
  `moti_sub_type` varchar(255) DEFAULT NULL,
  `moti_level` varchar(255) DEFAULT NULL,
  UNIQUE KEY `user_no` (`user_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `combination`
--

LOCK TABLES `combination` WRITE;
/*!40000 ALTER TABLE `combination` DISABLE KEYS */;
/*!40000 ALTER TABLE `combination` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dead_moti`
--

DROP TABLE IF EXISTS `dead_moti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dead_moti` (
  `dead_moti_no` bigint(20) NOT NULL AUTO_INCREMENT,
  `moti_birth` varchar(255) DEFAULT NULL,
  `moti_death` varchar(255) DEFAULT NULL,
  `moti_gender` varchar(255) DEFAULT NULL,
  `moti_name` varchar(255) DEFAULT NULL,
  `moti_catalog_no` bigint(20) DEFAULT NULL,
  `user_no` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`dead_moti_no`),
  KEY `FK1n39jv3te7cgfwrink8dr3vat` (`moti_catalog_no`),
  KEY `FKqh4a0pbvp8mfw3s8psu0mt998` (`user_no`),
  CONSTRAINT `FK1n39jv3te7cgfwrink8dr3vat` FOREIGN KEY (`moti_catalog_no`) REFERENCES `moti_catalog` (`moti_catalog_no`),
  CONSTRAINT `FKqh4a0pbvp8mfw3s8psu0mt998` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dead_moti`
--

LOCK TABLES `dead_moti` WRITE;
/*!40000 ALTER TABLE `dead_moti` DISABLE KEYS */;
INSERT INTO `dead_moti` VALUES
(1,'2022-11-10','2022-11-11','female','motimoti',1,35),
(2,'2022-11-18','2022-11-19','male','흐엥',2,29),
(3,'2022-11-11','2022-11-12','male','취업하게해줘',2,35),
(4,'2022-11-12','2022-11-13','female','모티는최고다',2,35);
/*!40000 ALTER TABLE `dead_moti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `death_candidate`
--

DROP TABLE IF EXISTS `death_candidate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `death_candidate` (
  `user_no` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `death_candidate`
--

LOCK TABLES `death_candidate` WRITE;
/*!40000 ALTER TABLE `death_candidate` DISABLE KEYS */;
/*!40000 ALTER TABLE `death_candidate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES
(1);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_catalog`
--

DROP TABLE IF EXISTS `item_catalog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_catalog` (
  `item_catalog_no` bigint(20) NOT NULL AUTO_INCREMENT,
  `item_description` varchar(255) NOT NULL,
  `item_goods_type` varchar(255) NOT NULL,
  `item_img` varchar(255) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_price` bigint(20) NOT NULL,
  `item_type` varchar(255) NOT NULL,
  PRIMARY KEY (`item_catalog_no`),
  UNIQUE KEY `UK3sw4ow04ajpwv5q1rxb42cdbv` (`item_name`,`item_description`,`item_img`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_catalog`
--

LOCK TABLES `item_catalog` WRITE;
/*!40000 ALTER TABLE `item_catalog` DISABLE KEYS */;
INSERT INTO `item_catalog` VALUES
(1,'먹으면 알로 돌아가는 신비한 풀. 행운을 빌어요 :)','COIN','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/item/reset.png','알로초',50,'PERMANENT'),
(2,'모티의 이름을 바꿔줘요.','COIN','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/item/nametag.png','이름표',20,'PERMANENT'),
(3,'헉!! 모티 밥 주기를 깜빡했다!?! Σ(°Д°;) 걱정 마세요. 비상식량이 있잖아요.','COIN','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/item/candy-sprite.png','비상식량',30,'PERMANENT');
/*!40000 ALTER TABLE `item_catalog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moti_catalog`
--

DROP TABLE IF EXISTS `moti_catalog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `moti_catalog` (
  `moti_catalog_no` bigint(20) NOT NULL AUTO_INCREMENT,
  `moti_level` varchar(255) DEFAULT NULL,
  `moti_sub_type` varchar(255) DEFAULT NULL,
  `moti_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`moti_catalog_no`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moti_catalog`
--

LOCK TABLES `moti_catalog` WRITE;
/*!40000 ALTER TABLE `moti_catalog` DISABLE KEYS */;
INSERT INTO `moti_catalog` VALUES
(1,'ZERO','A','BASIC'),
(2,'ONE','A','BASIC'),
(3,'TWO','A','BASIC'),
(4,'THREE','B','BASIC'),
(5,'FOUR','B','BASIC'),
(6,'THREE','C','BASIC'),
(7,'FOUR','C','BASIC');
/*!40000 ALTER TABLE `moti_catalog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moti_img`
--

DROP TABLE IF EXISTS `moti_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `moti_img` (
  `moti_catalog_no` bigint(20) NOT NULL,
  `moti_code` varchar(255) NOT NULL,
  `moti_img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`moti_catalog_no`,`moti_code`),
  CONSTRAINT `FK2qusagcmel9kimyjlmjg138x7` FOREIGN KEY (`moti_catalog_no`) REFERENCES `moti_catalog` (`moti_catalog_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moti_img`
--

LOCK TABLES `moti_img` WRITE;
/*!40000 ALTER TABLE `moti_img` DISABLE KEYS */;
INSERT INTO `moti_img` VALUES
(1,'DEFAULT','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/0_+v1/basic_0_default.gif'),
(1,'EATING','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/0_+v1/basic_0_eating.gif'),
(1,'HUNGRY','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/0_+v1/basic_0_hungry.gif'),
(1,'PLAYING','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/0_+v1/basic_0_playing.gif'),
(1,'SHOWER','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/0_+v1/basic_0_shower.gif'),
(2,'DEFAULT','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/1_+v1/basic_1_default.gif'),
(2,'EATING','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/1_+v1/basic_1_eating.gif'),
(2,'HUNGRY','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/1_+v1/basic_1_hungry.gif'),
(2,'PLAYING','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/1_+v1/basic_1_playing.gif'),
(2,'SHOWER','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/1_+v1/basic_1_shower.gif'),
(3,'DEFAULT','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/2_+v1/basic_2_default.gif'),
(3,'EATING','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/2_+v1/basic_2_eating.gif'),
(3,'HUNGRY','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/2_+v1/basic_2_hungry.gif'),
(3,'PLAYING','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/2_+v1/basic_2_playing.gif'),
(3,'SHOWER','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/2_+v1/basic_2_shower.gif'),
(4,'DEFAULT','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif'),
(4,'EATING','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_eating.gif'),
(4,'HUNGRY','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_hungry.gif'),
(4,'PLAYING','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_playing.gif'),
(4,'SHOWER','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_shower.gif'),
(5,'DEFAULT','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/4_+v1/basic_4_default.gif'),
(5,'EATING','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/4_+v1/basic_4_eating.gif'),
(5,'HUNGRY','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/4_+v1/basic_4_hungry.gif'),
(5,'PLAYING','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/4_+v1/basic_4_playing.gif'),
(5,'SHOWER','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/4_+v1/basic_4_shower.gif'),
(6,'DEFAULT','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v2/basic_3_default.gif'),
(6,'EATING','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v2/basic_3_eating.gif'),
(6,'HUNGRY','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v2/basic_3_hungry.gif'),
(6,'PLAYING','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v2/basic_3_playing.gif'),
(6,'SHOWER','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v2/basic_3_shower.gif'),
(7,'DEFAULT','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/4_+v2/basic_4_default.gif'),
(7,'EATING','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/4_+v2/basic_4_eating.gif'),
(7,'HUNGRY','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/4_+v2/basic_4_hungry.gif'),
(7,'PLAYING','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/4_+v2/basic_4_playing.gif'),
(7,'SHOWER','https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/4_+v2/basic_4_shower.gif');
/*!40000 ALTER TABLE `moti_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ranking`
--

DROP TABLE IF EXISTS `ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ranking` (
  `rank` bigint(20) NOT NULL AUTO_INCREMENT,
  `closeness` bigint(20) DEFAULT NULL,
  `live_days` bigint(20) DEFAULT NULL,
  `moti_img` varchar(255) DEFAULT NULL,
  `moti_name` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`rank`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ranking`
--

LOCK TABLES `ranking` WRITE;
/*!40000 ALTER TABLE `ranking` DISABLE KEYS */;
INSERT INTO `ranking` VALUES
(1,95,10,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/4_+v2/basic_4_default.gif','GM타락파워모티','gitmoti'),
(2,25,6,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/4_+v1/basic_4_default.gif','모티로코테성공','HyunHyun-choi'),
(3,75,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v2/basic_3_default.gif','컨모티!','mstkang1'),
(4,75,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','지누지누지누','Geenoos'),
(5,75,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','이지수','woozzangg'),
(6,75,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','메타몽','zzzso-o'),
(7,75,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/2_+v1/basic_2_default.gif','갈!','atluw1'),
(8,50,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v2/basic_3_default.gif','모티모티깃모티','wakkpu'),
(9,40,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','뀨웅이','hseol'),
(10,35,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','폭발은예술이다','d-perado'),
(11,35,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v2/basic_3_default.gif','안녕','jejinmyeong'),
(12,35,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','Checking','Checking-pks'),
(13,25,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','왕깃모티','kdgaws'),
(14,25,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','엘빈킴','ElvinKim23'),
(15,25,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','앵두입술','jiwon0297'),
(16,25,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','기모티','jeonga-Son'),
(17,25,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','고빼시','Eunyeol-Lucas'),
(18,25,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','status','dltmdgh579'),
(19,25,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','ingyeon','Ingyeon'),
(20,25,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v2/basic_3_default.gif','hyunklee','hyunklee'),
(21,25,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v2/basic_3_default.gif','dfa','heo-sang'),
(22,20,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','최용욱','colorfulvox'),
(23,15,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','공주석영ol','Binzify'),
(24,10,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','석찬맨','seokchain'),
(25,10,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','배모티','InSooBae'),
(26,10,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','모티모티','qogksqls'),
(27,0,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','뚜뚜','chaesuhyeon'),
(28,25,2,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/2_+v1/basic_2_default.gif','떵유','DongYu-Kim'),
(29,10,2,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/2_+v1/basic_2_default.gif','오딩이','OhHyerin'),
(30,25,1,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/1_+v1/basic_1_default.gif','gurimJr','HyeoklimKwon'),
(31,0,1,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/1_+v1/basic_1_default.gif','모티진화','MinSeo-Ming'),
(32,0,1,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/1_+v1/basic_1_default.gif','LEGO','HYUNTAK-KIM');
/*!40000 ALTER TABLE `ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop`
--

DROP TABLE IF EXISTS `shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shop` (
  `item_catalog_no` bigint(20) NOT NULL,
  PRIMARY KEY (`item_catalog_no`),
  CONSTRAINT `FKin41axsjosbg3cbi92fkivbmw` FOREIGN KEY (`item_catalog_no`) REFERENCES `item_catalog` (`item_catalog_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop`
--

LOCK TABLES `shop` WRITE;
/*!40000 ALTER TABLE `shop` DISABLE KEYS */;
INSERT INTO `shop` VALUES
(1),
(2),
(3);
/*!40000 ALTER TABLE `shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survival_from_death`
--

DROP TABLE IF EXISTS `survival_from_death`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `survival_from_death` (
  `user_no` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survival_from_death`
--

LOCK TABLES `survival_from_death` WRITE;
/*!40000 ALTER TABLE `survival_from_death` DISABLE KEYS */;
INSERT INTO `survival_from_death` VALUES
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10),
(11),
(12),
(13),
(15),
(16),
(17),
(18),
(20),
(21),
(22),
(23),
(25),
(26),
(27),
(30),
(31);
/*!40000 ALTER TABLE `survival_from_death` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temporary_ranking`
--

DROP TABLE IF EXISTS `temporary_ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `temporary_ranking` (
  `rank` bigint(20) NOT NULL,
  `closeness` bigint(20) DEFAULT NULL,
  `live_days` bigint(20) DEFAULT NULL,
  `moti_img` varchar(255) DEFAULT NULL,
  `moti_name` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`rank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temporary_ranking`
--

LOCK TABLES `temporary_ranking` WRITE;
/*!40000 ALTER TABLE `temporary_ranking` DISABLE KEYS */;
INSERT INTO `temporary_ranking` VALUES
(1,95,10,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/4_+v2/basic_4_default.gif','GM타락파워모티','gitmoti'),
(2,25,6,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/4_+v1/basic_4_default.gif','모티로코테성공','HyunHyun-choi'),
(3,75,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v2/basic_3_default.gif','컨모티!','mstkang1'),
(4,75,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','지누지누지누','Geenoos'),
(5,75,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','이지수','woozzangg'),
(6,75,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','메타몽','zzzso-o'),
(7,75,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/2_+v1/basic_2_default.gif','갈!','atluw1'),
(8,50,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v2/basic_3_default.gif','모티모티깃모티','wakkpu'),
(9,40,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','뀨웅이','hseol'),
(10,35,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','폭발은예술이다','d-perado'),
(11,35,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v2/basic_3_default.gif','안녕','jejinmyeong'),
(12,35,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','Checking','Checking-pks'),
(13,25,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','왕깃모티','kdgaws'),
(14,25,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','엘빈킴','ElvinKim23'),
(15,25,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','앵두입술','jiwon0297'),
(16,25,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','기모티','jeonga-Son'),
(17,25,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','고빼시','Eunyeol-Lucas'),
(18,25,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','status','dltmdgh579'),
(19,25,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','ingyeon','Ingyeon'),
(20,25,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v2/basic_3_default.gif','hyunklee','hyunklee'),
(21,25,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v2/basic_3_default.gif','dfa','heo-sang'),
(22,20,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','최용욱','colorfulvox'),
(23,15,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','공주석영ol','Binzify'),
(24,10,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','석찬맨','seokchain'),
(25,10,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','배모티','InSooBae'),
(26,10,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','모티모티','qogksqls'),
(27,0,3,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/3_+v1/basic_3_default.gif','뚜뚜','chaesuhyeon'),
(28,25,2,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/2_+v1/basic_2_default.gif','떵유','DongYu-Kim'),
(29,10,2,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/2_+v1/basic_2_default.gif','오딩이','OhHyerin'),
(30,25,1,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/1_+v1/basic_1_default.gif','gurimJr','HyeoklimKwon'),
(31,0,1,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/1_+v1/basic_1_default.gif','모티진화','MinSeo-Ming'),
(32,0,1,'https://motimoti-bucket.s3.ap-northeast-2.amazonaws.com/basic/1_+v1/basic_1_default.gif','LEGO','HYUNTAK-KIM');
/*!40000 ALTER TABLE `temporary_ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_no` bigint(20) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_no`),
  UNIQUE KEY `UK4bakctviobmdk6ddh2nwg08c2` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
(2,'$2a$10$OfZOtQ7fm7K/BVQ1CCXSa.gSd43FuMQJaemAm9HKxURO2WZA6.Kbu','Geenoos'),
(3,'$2a$10$JbG65M/Cm0VYsRNaP1EKGuO7mxWxAYOYVm6GC0TKJjsvFNxA3bbyC','atluw1'),
(4,'$2a$10$ey1Bmxn29G78ufh7ZcMNv.3aw7R7lG5Cu5mdgHrMMO0clEnoHC4rW','d-perado'),
(5,'$2a$10$PfqZspY2Gi/KknrBSvjGIuUnkjK8ikXg6yRHBl0N2jAyiKHQoZvAC','zzzso-o'),
(6,'$2a$10$0u9QxQl37gLL6BddNCYStOxoVXkAUAlUQzV6gfnChVzvblSiOOuT2','gitmoti'),
(7,'$2a$10$4sLureqPaZW0uRn4FWfvp.C/R/Z.pyPaYs9gr.1FJvmyyeT2tYqMO','dltmdgh579'),
(8,'$2a$10$Cmyf7yJiT51bQR2n.uh5.eltLmlZ0En95qYWWQ0ZQ97.PBxANtUyq','qogksqls'),
(9,'$2a$10$BcDyimqYQn3EMrg.j/H7H.N26DlaCxbmZ2rQfMI4baXwW9164wW3G','InSooBae'),
(10,'$2a$10$OkjzaExecpgjQwDiW34omeP8P2ZLiI3Fw4uuqYfS1BDFcapfyC326','colorfulvox'),
(11,'$2a$10$wxYZkjvwc/0M66WnTrPyO.QuydlE5kISej3ZA0.2Jp39GqK3TLmfi','Ingyeon'),
(12,'$2a$10$fm5Gyq.By07tOz.ZwZJad.yxInNO.GRAHPTdsX0ahDCXldExwchqy','Binzify'),
(13,'$2a$10$v33u9/efKtl1GPYJpb0DxOykDGgE7FcmMy0RVj5CWdRXGlKfkJr4q','wakkpu'),
(14,'$2a$10$AFRE29giGPBeZJSsZZ5TgO0DTyrj.LnOkTAlZtP0Dp08L7AJKmQpu','woozzangg'),
(15,'$2a$10$.E3bx8J3PVbrPrTWQn8ciuU2jySrJwXAYwrt6f1ASKClRVKXJhdRC','hyunklee'),
(16,'$2a$10$oTtplx5aHRnBmp9YsgCk4.zJ7wjhm1C/hjvxA0D1JNlVAFD.X3KNy','jiwon0297'),
(17,'$2a$10$DUtsGGGcuvuUFl/dLT79YeXlidX.sNIdK8Dgqx4qXJWJWv7yyQ4kG','hseol'),
(18,'$2a$10$DduMo8JP41FNHpIvtUaTVueJYUPB2pLvqeMYkOqHtoPJRjaqirJv6','kdgaws'),
(19,'$2a$10$9NzL8bQwYD3CXc7UEhopTeLEHHv7c7EvL351k5e0zLUlAeBGT9Sui','Checking-pks'),
(20,'$2a$10$ensMYKRO3Xkak183FPbsi.eMPr34Km2apv3gC5PVYgrgN/HInvHCu','Eunyeol-Lucas'),
(21,'$2a$10$3vYrDDyZXOWPcdzdPX8npeSYeB8gcFBb5RSFmPeJellrgs6IJMnPe','jejinmyeong'),
(22,'$2a$10$YZmkGMvBvDjn/oY3WxaO6ONSDV6bakjXu2g/vJ3jc6MxIp4CUnR9K','seokchain'),
(23,'$2a$10$HTgfPr.e5FXPAsyX8S4iF.skEQxWT8xY9CNm2535gFTg4Drj9c7FS','chaesuhyeon'),
(24,'$2a$10$o0TxamBMkX0qXpR5ZuISN.RtVHtUPe7IXGzdqgZ/JDcqT.Z.iZNsq','testmymoti'),
(25,'$2a$10$808dJCxf2qJfUpBqOEJ9TeXNx6I4mEEGlusymaPGzV7j2U60LplWC','heo-sang'),
(26,'$2a$10$kDXrrOg5VEAA3eji4pi31OINNt9AHRqePAoWYOQnjv4dSar.r/1Lu','jeonga-Son'),
(27,'$2a$10$y.3EMUMPXHIL3fY4Uqo8PuBkUczPzXld6yumZLaU6Zaep63ZrHyAm','ElvinKim23'),
(28,'$2a$10$LaNbcP4Xu0I6aMTFWFhbGebyiv/X7gPUPhaGR6WEME8spnJfBvqeG','mstkang1'),
(29,'$2a$10$bV63CXM8S1fm5QpSAiQzFuwE.Tws2diyJfjrvNPAJSTbLA1Hrqjsm','MinSeo-Ming'),
(30,'$2a$10$uCbCQESqh6BAtJpogkgm1e8XB5o/PlpT0hoKKFrQ5Z.GCjhyBHT9C','DongYu-Kim'),
(31,'$2a$10$6t5C05So72AOVuR89Dh5KulUnSLgUlfOXUia4gyhyTrwDn.rOl3Dy','OhHyerin'),
(32,'$2a$10$gcn.xynGrluRgfws3bFf2ehTnEnJTWKZ//qN0hxw/3.Ss2Dv3B/8e','JiHyeon1004'),
(33,'$2a$10$6UPA6oCOnzVrHMyiszpKhuhdrDYCTZiOvl19TqmESOxO1L1wY1XMq','HYUNTAK-KIM'),
(34,'$2a$10$oZXg7i/9ns.8Fid4S99EcOhVeGkgGucczehPJ0qbPCa8a9LJ7fxcS','HyeoklimKwon'),
(35,'$2a$10$RWAM5mI4rAC.MzWXAD1qqu/d/D9/wqvFP8qYbB7YE5U0rn4hpDXpW','HyunHyun-choi');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_accounts`
--

DROP TABLE IF EXISTS `user_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_accounts` (
  `provider` varchar(255) NOT NULL,
  `user_no` bigint(20) NOT NULL,
  `provider_id` varchar(255) NOT NULL,
  PRIMARY KEY (`provider`,`user_no`),
  UNIQUE KEY `UKrb5sm0iqfymikb9t91u20wyr9` (`provider_id`),
  KEY `FKi6vluylm851e44f2ttoo47om6` (`user_no`),
  CONSTRAINT `FKi6vluylm851e44f2ttoo47om6` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_accounts`
--

LOCK TABLES `user_accounts` WRITE;
/*!40000 ALTER TABLE `user_accounts` DISABLE KEYS */;
INSERT INTO `user_accounts` VALUES
('GITHUB',3,'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'),
('GITHUB',19,'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'),
('GITHUB',25,'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'),
('GITHUB',13,'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'),
('GITHUB',6,'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'),
('GITHUB',9,'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'),
('GITHUB',8,'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'),
('GITHUB',22,'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'),
('GITHUB',31,'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'),
('GITHUB',16,'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'),
('GITHUB',21,'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'),
('GITHUB',29,'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'),
('GITHUB',10,'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'),
('GITHUB',12,'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'),
('GITHUB',14,'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'),
('GITHUB',4,'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'),
('GITHUB',5,'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'),
('GITHUB',7,'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'),
('GITHUB',33,'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'),
('GITHUB',34,'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'),
('GITHUB',2,'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'),
('GITHUB',28,'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'),
('GITHUB',15,'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'),
('GITHUB',11,'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'),
('GITHUB',23,'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'),
('GITHUB',27,'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'),
('GITHUB',20,'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'),
('GITHUB',30,'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'),
('GITHUB',26,'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'),
('GITHUB',18,'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'),
('GITHUB',35,'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'),
('GITHUB',24,'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'),
('GITHUB',17,'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'),
('GITHUB',32,'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');
/*!40000 ALTER TABLE `user_accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_goods`
--

DROP TABLE IF EXISTS `user_goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_goods` (
  `goods_type` varchar(255) NOT NULL,
  `user_no` bigint(20) NOT NULL,
  `goods_count` bigint(20) NOT NULL,
  PRIMARY KEY (`goods_type`,`user_no`),
  KEY `FKbqepk0aa6w7lrj8t3c2pkd1y8` (`user_no`),
  CONSTRAINT `FKbqepk0aa6w7lrj8t3c2pkd1y8` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_goods`
--

LOCK TABLES `user_goods` WRITE;
/*!40000 ALTER TABLE `user_goods` DISABLE KEYS */;
INSERT INTO `user_goods` VALUES
('COIN',2,100),
('COIN',3,100),
('COIN',4,103),
('COIN',5,102),
('COIN',6,100),
('COIN',7,100),
('COIN',8,10),
('COIN',9,101),
('COIN',10,100),
('COIN',11,103),
('COIN',12,80),
('COIN',13,13),
('COIN',14,54),
('COIN',15,70),
('COIN',16,0),
('COIN',17,100),
('COIN',18,100),
('COIN',19,102),
('COIN',20,100),
('COIN',21,100),
('COIN',22,73),
('COIN',23,100),
('COIN',24,100),
('COIN',25,0),
('COIN',26,100),
('COIN',27,80),
('COIN',28,9),
('COIN',29,50),
('COIN',30,100),
('COIN',31,100),
('COIN',32,100),
('COIN',33,100),
('COIN',34,70),
('COIN',35,100);
/*!40000 ALTER TABLE `user_goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_inventory`
--

DROP TABLE IF EXISTS `user_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_inventory` (
  `item_catalog_no` bigint(20) NOT NULL,
  `user_no` bigint(20) NOT NULL,
  `item_count` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`item_catalog_no`,`user_no`),
  KEY `FKbhsfqnn3igg4oq6lsup06ykhg` (`user_no`),
  CONSTRAINT `FKbhsfqnn3igg4oq6lsup06ykhg` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE,
  CONSTRAINT `FKigwmvlq6brity4nj8bo43edct` FOREIGN KEY (`item_catalog_no`) REFERENCES `item_catalog` (`item_catalog_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_inventory`
--

LOCK TABLES `user_inventory` WRITE;
/*!40000 ALTER TABLE `user_inventory` DISABLE KEYS */;
INSERT INTO `user_inventory` VALUES
(1,2,1),
(1,3,1),
(1,4,2),
(1,5,1),
(1,6,0),
(1,7,1),
(1,8,1),
(1,9,1),
(1,10,1),
(1,11,1),
(1,12,1),
(1,13,1),
(1,14,2),
(1,15,1),
(1,16,2),
(1,17,1),
(1,18,1),
(1,19,1),
(1,20,1),
(1,21,1),
(1,22,1),
(1,23,1),
(1,24,1),
(1,25,3),
(1,26,1),
(1,27,1),
(1,28,2),
(1,29,2),
(1,30,1),
(1,31,1),
(1,32,1),
(1,33,1),
(1,34,1),
(1,35,1),
(2,2,0),
(2,3,1),
(2,4,1),
(2,5,0),
(2,6,1),
(2,7,1),
(2,8,1),
(2,9,1),
(2,10,1),
(2,11,1),
(2,12,1),
(2,13,1),
(2,14,1),
(2,15,1),
(2,16,1),
(2,17,2),
(2,18,1),
(2,19,1),
(2,20,1),
(2,21,1),
(2,22,1),
(2,23,1),
(2,24,1),
(2,25,1),
(2,26,1),
(2,27,1),
(2,28,1),
(2,29,0),
(2,30,1),
(2,31,1),
(2,32,1),
(2,33,1),
(2,34,1),
(2,35,1),
(3,2,1),
(3,3,1),
(3,4,1),
(3,5,1),
(3,6,1),
(3,7,1),
(3,8,4),
(3,9,1),
(3,10,1),
(3,11,1),
(3,12,1),
(3,13,5),
(3,14,3),
(3,15,2),
(3,16,2),
(3,17,1),
(3,18,1),
(3,19,2),
(3,20,1),
(3,21,1),
(3,22,2),
(3,23,1),
(3,24,3),
(3,25,1),
(3,26,1),
(3,27,1),
(3,28,4),
(3,29,4),
(3,30,2),
(3,31,2),
(3,32,3),
(3,33,3),
(3,34,4),
(3,35,3);
/*!40000 ALTER TABLE `user_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_moti_info`
--

DROP TABLE IF EXISTS `user_moti_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_moti_info` (
  `user_no` bigint(20) NOT NULL,
  `moti_birth` varchar(255) NOT NULL,
  `moti_gender` varchar(255) NOT NULL,
  `moti_name` varchar(255) NOT NULL,
  `moti_catalog_no` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`user_no`),
  KEY `FK707pduuj5jkiujcssqbivy27j` (`moti_catalog_no`),
  CONSTRAINT `FK707pduuj5jkiujcssqbivy27j` FOREIGN KEY (`moti_catalog_no`) REFERENCES `moti_catalog` (`moti_catalog_no`),
  CONSTRAINT `FKa5tfvhfqr6jqgkih340o53w0s` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_moti_info`
--

LOCK TABLES `user_moti_info` WRITE;
/*!40000 ALTER TABLE `user_moti_info` DISABLE KEYS */;
INSERT INTO `user_moti_info` VALUES
(2,'2022-11-17','male','지누지누지누',4),
(3,'2022-11-17','male','갈!',3),
(4,'2022-11-17','female','폭발은예술이다',4),
(5,'2022-11-17','female','메타몽',4),
(6,'2022-11-10','male','GM타락파워모티',7),
(7,'2022-11-17','male','status',4),
(8,'2022-11-17','male','모티모티',4),
(9,'2022-11-17','male','배모티',4),
(10,'2022-11-17','male','최용욱',4),
(11,'2022-11-17','male','ingyeon',4),
(12,'2022-11-17','male','공주석영ol',4),
(13,'2022-11-17','male','모티모티깃모티',6),
(14,'2022-11-17','male','이지수',4),
(15,'2022-11-17','male','hyunklee',6),
(16,'2022-11-17','male','앵두입술',4),
(17,'2022-11-17','male','뀨웅이',4),
(18,'2022-11-17','female','왕깃모티',4),
(19,'2022-11-17','female','Checking',4),
(20,'2022-11-17','female','고빼시',4),
(21,'2022-11-17','female','안녕',6),
(22,'2022-11-17','female','석찬맨',4),
(23,'2022-11-17','male','뚜뚜',4),
(25,'2022-11-17','female','dfa',6),
(26,'2022-11-17','female','기모티',4),
(27,'2022-11-17','male','엘빈킴',4),
(28,'2022-11-17','male','컨모티!',6),
(29,'2022-11-19','male','모티진화',2),
(30,'2022-11-18','female','떵유',3),
(31,'2022-11-18','female','오딩이',3),
(33,'2022-11-19','female','LEGO',2),
(34,'2022-11-19','female','gurimJr',2),
(35,'2022-11-14','female','모티로코테성공',5);
/*!40000 ALTER TABLE `user_moti_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_moti_status`
--

DROP TABLE IF EXISTS `user_moti_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_moti_status` (
  `user_no` bigint(20) NOT NULL,
  `closeness` bigint(20) DEFAULT NULL,
  `latest_clean_date` varchar(255) DEFAULT NULL,
  `latest_feed_date` varchar(255) DEFAULT NULL,
  `latest_feed_time` varchar(255) DEFAULT NULL,
  `live_days` bigint(20) DEFAULT NULL,
  `survival_days` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`user_no`),
  CONSTRAINT `FKa3eqm4ohdn3b6uvg5067xvos3` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_moti_status`
--

LOCK TABLES `user_moti_status` WRITE;
/*!40000 ALTER TABLE `user_moti_status` DISABLE KEYS */;
INSERT INTO `user_moti_status` VALUES
(2,75,'2022-11-19','2022-11-19','00:00:00',3,3),
(3,75,'2022-11-19','2022-11-19','00:00:00',3,2),
(4,35,'2022-11-18','2022-11-19','00:00:00',3,3),
(5,75,'2022-11-19','2022-11-19','00:00:00',3,3),
(6,95,'2022-11-17','2022-11-19','00:00:00',10,10),
(7,25,'2022-11-17','2022-11-19','00:00:00',3,3),
(8,10,'2022-11-17','2022-11-19','00:00:00',3,3),
(9,10,'2022-11-17','2022-11-19','00:00:00',3,3),
(10,20,'2022-11-17','2022-11-19','00:00:00',3,3),
(11,25,'2022-11-17','2022-11-19','00:00:00',3,3),
(12,15,'2022-11-17','2022-11-19','00:00:00',3,3),
(13,50,'2022-11-18','2022-11-19','00:00:00',3,3),
(14,75,'2022-11-19','2022-11-19','09:06:07',3,3),
(15,25,'2022-11-17','2022-11-19','00:00:00',3,3),
(16,25,'2022-11-17','2022-11-19','00:00:00',3,3),
(17,40,'2022-11-19','2022-11-19','00:00:00',3,3),
(18,25,'2022-11-17','2022-11-19','00:00:00',3,3),
(19,35,'2022-11-19','2022-11-19','12:04:02',3,3),
(20,25,'2022-11-17','2022-11-19','00:00:00',3,3),
(21,35,'2022-11-18','2022-11-19','00:00:00',3,3),
(22,10,'2022-11-17','2022-11-19','00:00:00',3,3),
(23,0,'2022-11-17','2022-11-19','00:00:00',3,3),
(25,25,'2022-11-17','2022-11-19','00:00:00',3,3),
(26,25,'2022-11-17','2022-11-19','00:00:00',3,3),
(27,25,'2022-11-17','2022-11-19','00:00:00',3,3),
(28,75,'2022-11-20','2022-11-20','00:10:50',3,3),
(29,0,'2022-11-19','2022-11-19','00:00:00',1,1),
(30,25,'2022-11-18','2022-11-19','00:00:00',2,2),
(31,10,'2022-11-18','2022-11-19','00:00:00',2,2),
(33,0,'2022-11-19','2022-11-19','00:00:00',1,1),
(34,25,'2022-11-19','2022-11-19','00:00:00',1,1),
(35,25,'2022-11-20','2022-11-20','00:00:00',6,6);
/*!40000 ALTER TABLE `user_moti_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_theme`
--

DROP TABLE IF EXISTS `user_theme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_theme` (
  `user_no` bigint(20) NOT NULL,
  `button_color` varchar(255) NOT NULL,
  `device_color` varchar(255) NOT NULL,
  PRIMARY KEY (`user_no`),
  CONSTRAINT `FKhi4ljeem09nekdp0j0tktr7md` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_theme`
--

LOCK TABLES `user_theme` WRITE;
/*!40000 ALTER TABLE `user_theme` DISABLE KEYS */;
INSERT INTO `user_theme` VALUES
(2,'#5A6078','#FFAAAA'),
(3,'#DFDCDD','#FF4554'),
(4,'#FBBC05','#5A6078'),
(5,'#DFDCDD','#AC79AE'),
(6,'#FBBC05','#5A6078'),
(7,'#FBBC05','#5A6078'),
(8,'#FFAAAA','#5A6078'),
(9,'#FBBC05','#5A6078'),
(10,'#FF4554','#5A6078'),
(11,'#FF4554','#DFDCDD'),
(12,'#DFDCDD','#DFDCDD'),
(13,'#00C3E3','#FFE054'),
(14,'#DFDCDD','#AC79AE'),
(15,'#00C3E3','#5A6078'),
(16,'#DFDCDD','#98E294'),
(17,'#DFDCDD','#98E294'),
(18,'#FBBC05','#5A6078'),
(19,'#DFDCDD','#5A6078'),
(20,'#FF4554','#FFE054'),
(21,'#F37333','#5A6078'),
(22,'#FBBC05','#5A6078'),
(23,'#FBBC05','#5A6078'),
(24,'#FBBC05','#5A6078'),
(25,'#FBBC05','#5A6078'),
(26,'#DFDCDD','#FFAAAA'),
(27,'#DFDCDD','#DFDCDD'),
(28,'#FBBC05','#5A6078'),
(29,'#DFDCDD','#AC79AE'),
(30,'#98E294','#FFE054'),
(31,'#FBBC05','#5A6078'),
(32,'#FBBC05','#5A6078'),
(33,'#FBBC05','#5A6078'),
(34,'#FBBC05','#5A6078'),
(35,'#DFDCDD','#AC79AE');
/*!40000 ALTER TABLE `user_theme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yesterday_moti_info`
--

DROP TABLE IF EXISTS `yesterday_moti_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `yesterday_moti_info` (
  `user_no` bigint(20) NOT NULL,
  `moti_birth` varchar(255) NOT NULL,
  `moti_gender` varchar(255) NOT NULL,
  `moti_name` varchar(255) NOT NULL,
  `moti_catalog_no` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`user_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yesterday_moti_info`
--

LOCK TABLES `yesterday_moti_info` WRITE;
/*!40000 ALTER TABLE `yesterday_moti_info` DISABLE KEYS */;
INSERT INTO `yesterday_moti_info` VALUES
(2,'2022-11-17','male','지누지누지누',4),
(3,'2022-11-17','male','갈!',3),
(4,'2022-11-17','female','폭발은예술이다',4),
(5,'2022-11-17','female','메타몽',4),
(6,'2022-11-10','male','GM타락파워모티',7),
(7,'2022-11-17','male','status',4),
(8,'2022-11-17','male','모티모티',4),
(9,'2022-11-17','male','배모티',4),
(10,'2022-11-17','male','최용욱',4),
(11,'2022-11-17','male','ingyeon',4),
(12,'2022-11-17','male','공주석영ol',4),
(13,'2022-11-17','male','모티모티깃모티',6),
(14,'2022-11-17','male','이지수',4),
(15,'2022-11-17','male','hyunklee',6),
(16,'2022-11-17','male','앵두입술',4),
(17,'2022-11-17','male','뀨웅이',4),
(18,'2022-11-17','female','왕깃모티',4),
(19,'2022-11-17','female','Checking',4),
(20,'2022-11-17','female','고빼시',4),
(21,'2022-11-17','female','안녕',6),
(22,'2022-11-17','female','석찬맨',4),
(23,'2022-11-17','male','뚜뚜',4),
(25,'2022-11-17','female','dfa',6),
(26,'2022-11-17','female','기모티',4),
(27,'2022-11-17','male','엘빈킴',4),
(28,'2022-11-17','male','컨모티!',6),
(29,'2022-11-19','male','모티진화',2),
(30,'2022-11-18','female','떵유',3),
(31,'2022-11-18','female','오딩이',3),
(33,'2022-11-19','female','LEGO',2),
(34,'2022-11-19','female','gurimJr',2),
(35,'2022-11-14','female','모티로코테성공',5);
/*!40000 ALTER TABLE `yesterday_moti_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yesterday_moti_status`
--

DROP TABLE IF EXISTS `yesterday_moti_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `yesterday_moti_status` (
  `user_no` bigint(20) NOT NULL,
  `closeness` bigint(20) DEFAULT NULL,
  `latest_clean_date` varchar(255) DEFAULT NULL,
  `latest_feed_date` varchar(255) DEFAULT NULL,
  `latest_feed_time` varchar(255) DEFAULT NULL,
  `live_days` bigint(20) DEFAULT NULL,
  `survival_days` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`user_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yesterday_moti_status`
--

LOCK TABLES `yesterday_moti_status` WRITE;
/*!40000 ALTER TABLE `yesterday_moti_status` DISABLE KEYS */;
INSERT INTO `yesterday_moti_status` VALUES
(2,75,'2022-11-19','2022-11-19','00:00:00',3,3),
(3,75,'2022-11-19','2022-11-19','00:00:00',3,2),
(4,35,'2022-11-18','2022-11-19','00:00:00',3,3),
(5,75,'2022-11-19','2022-11-19','00:00:00',3,3),
(6,95,'2022-11-17','2022-11-19','00:00:00',10,10),
(7,25,'2022-11-17','2022-11-19','00:00:00',3,3),
(8,10,'2022-11-17','2022-11-19','00:00:00',3,3),
(9,10,'2022-11-17','2022-11-19','00:00:00',3,3),
(10,20,'2022-11-17','2022-11-19','00:00:00',3,3),
(11,25,'2022-11-17','2022-11-19','00:00:00',3,3),
(12,15,'2022-11-17','2022-11-19','00:00:00',3,3),
(13,50,'2022-11-18','2022-11-19','00:00:00',3,3),
(14,75,'2022-11-19','2022-11-19','09:06:07',3,3),
(15,25,'2022-11-17','2022-11-19','00:00:00',3,3),
(16,25,'2022-11-17','2022-11-19','00:00:00',3,3),
(17,40,'2022-11-19','2022-11-19','00:00:00',3,3),
(18,25,'2022-11-17','2022-11-19','00:00:00',3,3),
(19,35,'2022-11-19','2022-11-19','12:04:02',3,3),
(20,25,'2022-11-17','2022-11-19','00:00:00',3,3),
(21,35,'2022-11-18','2022-11-19','00:00:00',3,3),
(22,10,'2022-11-17','2022-11-19','00:00:00',3,3),
(23,0,'2022-11-17','2022-11-19','00:00:00',3,3),
(25,25,'2022-11-17','2022-11-19','00:00:00',3,3),
(26,25,'2022-11-17','2022-11-19','00:00:00',3,3),
(27,25,'2022-11-17','2022-11-19','00:00:00',3,3),
(28,75,'2022-11-20','2022-11-20','00:10:50',3,3),
(29,0,'2022-11-19','2022-11-19','00:00:00',1,1),
(30,25,'2022-11-18','2022-11-19','00:00:00',2,2),
(31,10,'2022-11-18','2022-11-19','00:00:00',2,2),
(33,0,'2022-11-19','2022-11-19','00:00:00',1,1),
(34,25,'2022-11-19','2022-11-19','00:00:00',1,1),
(35,25,'2022-11-20','2022-11-20','00:00:00',6,6);
/*!40000 ALTER TABLE `yesterday_moti_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'dev'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `MOTI_MID_NIGHT` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `MOTI_MID_NIGHT` ON SCHEDULE EVERY 1 DAY STARTS '2022-11-17 00:00:00' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
        START TRANSACTION;

    CALL DEATH_CAN();
    CALL DELETE_AND_SURVIVAL();
    CALL BASIC_EVOLUTION('ONE',1);
    CALL BASIC_EVOLUTION('TWO',2);
    CALL BASIC_EVOLUTION('THREE',3);
    CALL BASIC_EVOLUTION('FOUR',4);
        COMMIT ;

END */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `RANKING_30_MIN` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `RANKING_30_MIN` ON SCHEDULE EVERY 15 MINUTE STARTS '2022-11-17 17:14:55' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
        START TRANSACTION;
            CALL RANKING_UPDATE();
        COMMIT ;

END */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'dev'
--
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `BASIC_EVOLUTION` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `BASIC_EVOLUTION`(IN DEVELOP_LEVEL varchar(255), IN SURVIVAL_DAYS bigint)
BEGIN


    START TRANSACTION;
        TRUNCATE TABLE combination;

        INSERT INTO combination (user_no, closeness,  moti_type, moti_sub_type, moti_level)
        SELECT ys.user_no, ys.closeness,mc.moti_type,mc.moti_sub_type,mc.moti_level
        FROM dev.user_moti_status ys, dev.user_moti_info yi, moti_catalog mc
        WHERE ys.user_no= yi.user_no AND  ys.survival_days =SURVIVAL_DAYS AND yi.moti_catalog_no = mc.moti_catalog_no;

        If (SURVIVAL_DAYS =1 or SURVIVAL_DAYS = 2 or SURVIVAL_DAYS = 4)THEN

            CALL GET_BASIC_EVOL_NO(DEVELOP_LEVEL);
        ELSEIF SURVIVAL_DAYS=3 THEN
            CALL GET_BASIC_EVOL_TWO();

        END IF;
    COMMIT;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DEATH_CAN` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `DEATH_CAN`()
BEGIN
    START TRANSACTION;
    TRUNCATE dev.death_candidate;
    INSERT INTO dev.death_candidate(user_no) -- 죽을 후보군 넣기 현재로는 2일 차이로 주긍ㅁ
    SELECT user_no FROM dev.user_moti_status AS ums
    WHERE ums.latest_feed_date <= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL  2 DAY),'%Y-%m-%d');

    TRUNCATE dev.survival_from_death; -- 하루 살아 남는 애들
    INSERT INTO survival_from_death(user_no)
    SELECT ui.user_no FROM dev.user_inventory ui, dev.death_candidate dc
    WHERE ui.user_no = dc.user_no AND ui.item_catalog_no=3 AND ui.item_count >0;

    UPDATE dev.user_inventory   -- 아이템 있는 애들은 아이템 사용
    SET item_count = item_count -1
    WHERE user_no IN (SELECT user_no FROM survival_from_death) and item_catalog_no=3;


    UPDATE dev.user_moti_status-- 아이템 사용해서 수명연장됨.
    SET latest_feed_time = '00:00:00',
        latest_feed_date = DATE_FORMAT(NOW() - INTERVAL 1 DAY,'%Y-%m-%d')
    WHERE user_no IN (SELECT user_no FROM survival_from_death);

    TRUNCATE TABLE dev.death_candidate;

    INSERT INTO dev.death_candidate(user_no) -- 진짜 정말로 죽을 애들 스캔
    SELECT user_no FROM dev.user_moti_status AS ums
    WHERE ums.latest_feed_date <= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL  2 DAY),'%Y-%m-%d');
 COMMIT ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DELETE_AND_SURVIVAL` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `DELETE_AND_SURVIVAL`()
BEGIN
    START TRANSACTION;
        INSERT INTO dev.dead_moti(moti_birth,moti_death,moti_gender,moti_name,user_no,moti_catalog_no) -- 죽은 모티에 추가
    SELECT umi.moti_birth,date_format(now(),'%Y-%m-%d')AS moti_death,
            umi.moti_gender ,umi.moti_name ,
            umi.user_no,umi.moti_catalog_no
    FROM dev.user_moti_info umi
    WHERE umi.user_no IN (SELECT user_no FROM death_candidate);

    delete FROM dev.user_moti_info WHERE user_no  IN (SELECT user_no FROM death_candidate);

    delete FROM dev.user_moti_status WHERE user_no IN (SELECT user_no FROM death_candidate);

    UPDATE  dev.user_moti_status  -- 살아남은 모든 모티들 생존일 증가, 살아남은 일 증가
       SET live_days = live_days+1, survival_days = survival_days+1
       WHERE user_no is not null ;


    COMMIT ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_BASIC_EVOL_NO` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GET_BASIC_EVOL_NO`(IN LEVEL VARCHAR(255))
BEGIN


    DECLARE DONE INT DEFAULT FALSE;
    DECLARE V_SUB_TYPE VARCHAR(255);
    DECLARE V_TYPE VARCHAR(255);
    DECLARE V_CATALOG_NO BIGINT;
    DECLARE V_USER_NO BIGINT ;


    DECLARE BASIC_EVOL_CURSOR CURSOR FOR
    SELECT moti_sub_type, user_no,moti_type FROM combination;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET DONE = TRUE;

    OPEN BASIC_EVOL_CURSOR;

    my_loop: LOOP
        FETCH BASIC_EVOL_CURSOR
        INTO V_SUB_TYPE, V_USER_NO,V_TYPE;

        IF DONE THEN
            LEAVE my_loop;
        END IF ;

        SET V_CATALOG_NO = (SELECT moti_catalog_no
            FROM moti_catalog
                WHERE moti_sub_type=V_SUB_TYPE AND moti_level=LEVEL AND moti_type=V_TYPE
            ORDER BY RAND() LIMIT 1);

        UPDATE user_moti_info SET moti_catalog_no =V_CATALOG_NO WHERE user_no=V_USER_NO;


    END LOOP ;
    CLOSE BASIC_EVOL_CURSOR;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_BASIC_EVOL_TWO` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GET_BASIC_EVOL_TWO`()
BEGIN


    DECLARE DONE INT DEFAULT FALSE;
    DECLARE V_TYPE VARCHAR(255);
    DECLARE V_CATALOG_NO BIGINT;
    DECLARE V_USER_NO BIGINT ;
    DECLARE V_CLOSENESS BIGINT ;
    DECLARE V_PERCENT int ;

    DECLARE  cursor1 CURSOR FOR
    SELECT user_no,moti_type,closeness FROM combination;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET DONE = TRUE;

    OPEN cursor1;

    my_loop: LOOP
        FETCH cursor1
        INTO  V_USER_NO,V_TYPE,V_CLOSENESS;

        IF DONE THEN
            LEAVE my_loop;
        END IF ;

        SET V_PERCENT =(SELECT FLOOR(RAND()*100));

        IF V_CLOSENESS >= 50 THEN
            IF V_PERCENT >= 80 THEN

            SET V_CATALOG_NO = (SELECT moti_catalog_no
                FROM moti_catalog
                    WHERE moti_level='THREE' AND moti_type=V_TYPE AND moti_sub_type='C'
                );
            ELSEIF V_PERCENT<80 THEN
                SET V_CATALOG_NO = (SELECT moti_catalog_no
                FROM moti_catalog
                    WHERE moti_level='THREE' AND moti_type=V_TYPE AND moti_sub_type='B'
                );
            END IF;
        ELSEIF V_CLOSENESS <50 THEN
             IF V_PERCENT >= 90 THEN

            SET V_CATALOG_NO = (SELECT moti_catalog_no
                FROM moti_catalog
                    WHERE moti_level='THREE' AND moti_type=V_TYPE AND moti_sub_type='C'
                );
            ELSEIF V_PERCENT<90 THEN
                SET V_CATALOG_NO = (SELECT moti_catalog_no
                FROM moti_catalog
                    WHERE moti_level='THREE' AND moti_type=V_TYPE AND moti_sub_type='B'
                );
            END IF;

        END IF;

        UPDATE user_moti_info SET moti_catalog_no =V_CATALOG_NO WHERE user_no=V_USER_NO;


    END LOOP ;
    CLOSE cursor1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `RANKING_UPDATE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `RANKING_UPDATE`()
BEGIN
    START TRANSACTION;
    TRUNCATE yesterday_moti_info;
    INSERT INTO yesterday_moti_info
        SELECT * FROM user_moti_info;

    TRUNCATE yesterday_moti_status;
    INSERT INTO yesterday_moti_status
        SELECT * FROM user_moti_status;

    TRUNCATE TABLE dev.ranking;
    INSERT INTO dev.ranking(moti_name,live_days,moti_img,closeness,user_name) -- ranking 테이블에 삽입
    SELECT umi.moti_name  ,ums.live_days,mi.moti_img,ums.closeness,u.user_name
    FROM dev.yesterday_moti_info AS umi, dev.yesterday_moti_status AS ums ,