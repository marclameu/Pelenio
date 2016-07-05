-- MySQL dump 10.13  Distrib 5.7.12, for Linux (x86_64)
--
-- Host: localhost    Database: pelenio
-- ------------------------------------------------------
-- Server version	5.7.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `matches`
--

DROP TABLE IF EXISTS `matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `matches` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date_match` date DEFAULT NULL,
  `income` decimal(8,2) DEFAULT NULL,
  `value` decimal(8,2) DEFAULT NULL,
  `season_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `matches_season_id_foreign` (`season_id`),
  CONSTRAINT `matches_season_id_foreign` FOREIGN KEY (`season_id`) REFERENCES `seasons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matches`
--

LOCK TABLES `matches` WRITE;
/*!40000 ALTER TABLE `matches` DISABLE KEYS */;
INSERT INTO `matches` VALUES (16,'2016-06-15',122.00,150.00,3,'2016-06-24 02:33:35','2016-06-24 02:33:35'),(26,'2016-06-30',300.00,150.00,3,'2016-06-29 21:45:02','2016-06-29 21:45:02'),(27,'2016-06-01',45.00,150.00,3,'2016-06-29 21:51:34','2016-06-29 21:51:34');
/*!40000 ALTER TABLE `matches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES ('2014_10_12_000000_create_users_table',1),('2014_10_12_100000_create_password_resets_table',1),('2016_06_18_232545_create_situation_table',2),('2016_06_19_171306_create_table_season',3),('2016_06_19_172124_create_matches_table',3),('2016_06_19_172558_create_season_user_table',3),('2016_06_19_175516_add_start_end_columns_season',3);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL,
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `season_user`
--

DROP TABLE IF EXISTS `season_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `season_user` (
  `date_payment` date DEFAULT NULL,
  `payment` decimal(8,2) DEFAULT NULL,
  `season_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  KEY `season_user_season_id_foreign` (`season_id`),
  KEY `season_user_user_id_foreign` (`user_id`),
  CONSTRAINT `season_user_season_id_foreign` FOREIGN KEY (`season_id`) REFERENCES `seasons` (`id`) ON DELETE CASCADE,
  CONSTRAINT `season_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `season_user`
--

LOCK TABLES `season_user` WRITE;
/*!40000 ALTER TABLE `season_user` DISABLE KEYS */;
INSERT INTO `season_user` VALUES ('2016-06-22',33.00,3,1,NULL,NULL),('2016-05-01',55.00,3,2,NULL,NULL),('2016-06-20',30.00,3,3,NULL,NULL),('2016-06-30',45.00,3,7,NULL,NULL),('2016-06-01',35.00,3,4,NULL,NULL),('2016-06-01',50.00,3,11,NULL,NULL),('2016-06-01',30.00,3,8,NULL,NULL),('2016-06-20',20.00,3,5,NULL,NULL),('2016-06-30',25.00,3,9,NULL,NULL),('2016-05-01',555.55,4,1,NULL,NULL),('2016-05-30',898.99,4,8,NULL,NULL),('2016-05-01',10.00,4,2,NULL,NULL);
/*!40000 ALTER TABLE `season_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seasons`
--

DROP TABLE IF EXISTS `seasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seasons` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `value` decimal(8,2) DEFAULT NULL,
  `actual` tinyint(1) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `start` date DEFAULT NULL,
  `end` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seasons`
--

LOCK TABLES `seasons` WRITE;
/*!40000 ALTER TABLE `seasons` DISABLE KEYS */;
INSERT INTO `seasons` VALUES (3,'Mes de junho',600.00,1,1,'2016-06-19 22:29:15','2016-06-19 22:29:15','2016-06-20',NULL),(4,'Mes de Maio',600.00,NULL,2,'2016-06-23 16:07:23','2016-06-23 16:07:23','0000-00-00',NULL);
/*!40000 ALTER TABLE `seasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `situations`
--

DROP TABLE IF EXISTS `situations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `situations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `dt_situation` date NOT NULL,
  `active` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `situations_user_id_foreign` (`user_id`),
  CONSTRAINT `situations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `situations`
--

LOCK TABLES `situations` WRITE;
/*!40000 ALTER TABLE `situations` DISABLE KEYS */;
INSERT INTO `situations` VALUES (1,10,'2016-06-18',1,'2016-06-19 00:13:26','2016-06-19 00:40:46'),(2,11,'2016-06-19',1,'2016-06-19 00:51:46','2016-06-19 00:51:46'),(3,11,'2016-06-20',1,'2016-06-19 01:04:12','2016-06-19 01:04:12'),(4,1,'2016-06-20',1,'2016-06-19 14:53:30','2016-06-19 14:53:30'),(5,2,'2016-06-20',1,'2016-06-19 14:53:30','2016-06-19 14:53:30'),(6,3,'2016-06-20',1,'2016-06-19 14:53:30','2016-06-19 14:53:30'),(7,4,'2016-06-20',1,'2016-06-19 14:53:30','2016-06-19 14:53:30'),(8,5,'2016-06-20',1,'2016-06-19 14:53:30','2016-06-19 14:53:30'),(9,7,'2016-06-20',1,'2016-06-19 14:53:30','2016-06-19 14:53:30'),(10,8,'2016-06-20',1,'2016-06-19 14:53:30','2016-06-19 14:53:30'),(11,9,'2016-06-20',1,'2016-06-19 14:53:30','2016-06-19 14:53:30'),(12,10,'2016-06-20',1,'2016-06-19 14:53:30','2016-06-19 14:53:30'),(13,11,'2016-06-20',1,'2016-06-19 14:53:31','2016-06-19 14:53:31'),(14,8,'2016-06-21',0,'2016-06-19 14:55:26','2016-06-19 14:55:26');
/*!40000 ALTER TABLE `situations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ryan Chenkie','ryanchenkie@gmail.com','$2y$10$jIzFoRFpaeVDW2vx/2EFAeBsZbYcadqx1Wy6xto.n2q6ahYC5Zlga',NULL,'2016-06-15 21:37:19','2016-06-15 21:37:19'),(2,'Chris Sevilleja','chris@scotch.io','$2y$10$4R9Xyq1xICAN2cjHqfWU0eOaxnFWBfXRsI8ns/JnMPV22tGSayBf.',NULL,'2016-06-15 21:37:19','2016-06-15 21:37:19'),(3,'Holly Lloyd','holly@scotch.io','$2y$10$NMtKZMyJ.KmbhGSMPhaXZekUmL2LU2l2/hTMJgRzfMs8w0.3rCCWG',NULL,'2016-06-15 21:37:19','2016-06-15 21:37:19'),(4,'Adnan Kukic','adnan@scotch.io','$2y$10$og57zmvcHzZ9gNZTcSaJT.nW6EXoEXAsxVIUjPSClVwa/HOYckKEe',NULL,'2016-06-15 21:37:19','2016-06-15 21:37:19'),(5,'Marcelino Lameu','marclameu@gmail.com','$2y$10$BrUUhKguCddrYuwrnnbC3ejdIHf7V3pLwjP1oMoeERxnE.YPJ.cr2',NULL,'2016-06-15 21:37:19','2016-06-15 21:37:19'),(7,'Marcelino Lameu','marclameu@gmail.cm','$2y$10$mhujLNixcdhNP40FLaYSA.PStEakK7VKV//s3VAkOvzIR7lfnKQ82',NULL,'2016-06-16 03:12:44','2016-06-16 03:12:44'),(8,'João Melão','joao@bol.com.br','$2y$10$p4PrvEk9d4./QNvi3L2/buGmJ5lrRastC6B.THbFmx9XmL7DvjLFa',NULL,'2016-06-16 03:13:39','2016-06-16 03:13:39'),(9,'Jotalhão','jota@uol.bom','$2y$10$zx7pq/TxY8N/8dfkHgYFJeqwSOZASXQm7HrM3jidmTZO3iTKrnD2G',NULL,'2016-06-16 03:14:20','2016-06-16 03:14:20'),(10,'Rafela Goncalves','rafaelato@gmail.com','$2y$10$a6GBm4/nkP6t5Zfyp86c7OXvAyEfCyw3/Al7Da1kDjDOhZYPc8m6e',NULL,'2016-06-16 22:53:45','2016-06-16 22:53:45'),(11,'Jurandir da Silva','juras@gmail.com','$2y$10$S9ND6M.kJDtHfCBCn4MRMewWeLdVHU6xJbrBhwDjHjId8t42a3P.i',NULL,'2016-06-19 00:51:46','2016-06-19 00:51:46');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-07-01  3:16:07
