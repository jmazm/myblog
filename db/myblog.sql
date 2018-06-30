/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 60011
Source Host           : localhost:3306
Source Database       : myblog

Target Server Type    : MYSQL
Target Server Version : 60011
File Encoding         : 65001

Date: 2018-06-18 00:23:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `sault` varchar(32) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idAdmin_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `visitTotal` int(5) DEFAULT '0',
  `commentTotal` int(5) DEFAULT '0',
  `imgSrc` varchar(255) DEFAULT NULL,
  `content` mediumtext,
  `isPublished` int(11) DEFAULT '0',
  `foreword` varchar(255) DEFAULT NULL,
  `Category_id` int(11) DEFAULT NULL,
  `Admin_id` int(11) DEFAULT NULL,
  `Tag_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Article_Category_idx` (`Category_id`),
  KEY `fk_Article_Admin1_idx` (`Admin_id`),
  KEY `fk_Article_Tag1_idx` (`Tag_id`),
  CONSTRAINT `fk_Article_Admin1` FOREIGN KEY (`Admin_id`) REFERENCES `admin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Article_Category` FOREIGN KEY (`Category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Article_Tag1` FOREIGN KEY (`Tag_id`) REFERENCES `tag` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL COMMENT '博客分类名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL COMMENT '评论人的昵称',
  `email` varchar(120) DEFAULT NULL COMMENT '评论人的邮箱',
  `website` varchar(255) DEFAULT NULL COMMENT '评论人的网址',
  `content` varchar(255) DEFAULT NULL COMMENT '评论内容',
  `date` datetime DEFAULT NULL COMMENT '评论时间',
  `Article_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idComment_UNIQUE` (`id`),
  KEY `fk_Comment_Article1_idx` (`Article_id`),
  CONSTRAINT `fk_Comment_Article1` FOREIGN KEY (`Article_id`) REFERENCES `article` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for replying
-- ----------------------------
DROP TABLE IF EXISTS `replying`;
CREATE TABLE `replying` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL COMMENT '回复人名称',
  `content` varchar(255) DEFAULT NULL COMMENT '回复的内容',
  `date` date DEFAULT NULL COMMENT '回复时间',
  `Comment_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idComment_UNIQUE` (`id`),
  KEY `fk_Replying_Comment1_idx` (`Comment_id`),
  CONSTRAINT `fk_Replying_Comment1` FOREIGN KEY (`Comment_id`) REFERENCES `comment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL COMMENT '博客标签名\n',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idTag_UNIQUE` (`id`),
  KEY `idName_UNIQUE` (`id`,`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
