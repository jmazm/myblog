/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 60011
Source Host           : localhost:3306
Source Database       : myblog

Target Server Type    : MYSQL
Target Server Version : 60011
File Encoding         : 65001

Date: 2018-06-07 10:41:02
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
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', '3eac64acce6b8f2a4ffdf39e7a03d136', '14d68186ae4dee3a4f6c1561752401fa', null);

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
  `Category_id` int(11) NOT NULL,
  `Admin_id` int(11) NOT NULL,
  `Tag_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Article_Category_idx` (`Category_id`),
  KEY `fk_Article_Admin1_idx` (`Admin_id`),
  KEY `fk_Article_Tag1_idx` (`Tag_id`),
  CONSTRAINT `fk_Article_Admin1` FOREIGN KEY (`Admin_id`) REFERENCES `admin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Article_Category` FOREIGN KEY (`Category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Article_Tag1` FOREIGN KEY (`Tag_id`) REFERENCES `tag` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('2', '2', '2018-05-04 19:32:32', '0', '0', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525715227960&di=3c7c622a2221fc0a9c69754432398732&imgtype=0&src=http%3A%2F%2Ffile.xdf.cn%2Fuploads%2F150916%2F861_150916162840glm1nhlGDjqan6Va.png', '![progress-02](/progress/progress-02.png)看到我粘出来的代码，', '1', '4', '2', '1', '1');
INSERT INTO `article` VALUES ('3', '3', '2018-05-04 05:00:00', '0', '0', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525715227960&di=3c7c622a2221fc0a9c69754432398732&imgtype=0&src=http%3A%2F%2Ffile.xdf.cn%2Fuploads%2F150916%2F861_150916162840glm1nhlGDjqan6Va.png', '![progress-02](/progress/progress-02.png)看到我粘出来的代码，\n                ### 1.5 demo\n                ![progress-03](/progress/progress-02.png)\n                ![progress-04](/progress/progress-02.png)\n                * [demo](/effects/demo/css/progress/v1-1.html)', '0', '4', '1', '1', '1');
INSERT INTO `article` VALUES ('4', '4', '2018-05-05 00:00:00', '0', '0', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525715227960&di=3c7c622a2221fc0a9c69754432398732&imgtype=0&src=http%3A%2F%2Ffile.xdf.cn%2Fuploads%2F150916%2F861_150916162840glm1nhlGDjqan6Va.png', '![progress-02](/progress/progress-02.png)看到我粘出来的代码，\n                ### 1.5 demo\n                ![progress-03](/progress/progress-02.png)\n                ![progress-04](/progress/progress-02.png)\n                * [demo](/effects/demo/css/progress/v1-1.html)', '0', '4本文总结了近期博主在小程序内嵌H5使用公众号能力实践中遇到的一些问题和解决方案，其中一些是移动端开发共性的问题，一些是公众号独有的问题，特此分享出来，避免后来人采坑。', '3', '1', '1');
INSERT INTO `article` VALUES ('5', '小黄人', '2018-05-04 00:00:00', '0', '0', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525715227960&di=3c7c622a2221fc0a9c69754432398732&imgtype=0&src=http%3A%2F%2Ffile.xdf.cn%2Fuploads%2F150916%2F861_150916162840glm1nhlGDjqan6Va.png', '![progress-02](/progress/progress-02.png)看到我粘出来的代码，\n                ### 1.5 demo\n                ![progress-03](/progress/progress-02.png)\n                ![progress-04](/progress/progress-02.png)\n                * [demo](/effects/demo/css/progress/v1-1.html)', '1', '4本文总结了近期博主在小程序内嵌H5使用公众号能力实践中遇到的一些问题和解决方案，其中一些是移动端开发共性的问题，一些是公众号独有的问题，特此分享出来，避免后来人采坑。本文总结了近期博主在小程序内嵌H5使用公众号能力实践中遇到的一些问题和解决方案，其中一些是移动端开发共性的问题，一些是公众号独有的问题，特此分享出来，避免后来人采坑。', '4', '1', '1');
INSERT INTO `article` VALUES ('6', '6', '2018-05-18 00:00:00', '0', '0', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525715227960&di=3c7c622a2221fc0a9c69754432398732&imgtype=0&src=http%3A%2F%2Ffile.xdf.cn%2Fuploads%2F150916%2F861_150916162840glm1nhlGDjqan6Va.png', '![progress-02](/progress/progress-02.png)看到我粘出来的代码，\n                ### 1.5 demo\n                ![progress-03](/progress/progress-02.png)\n                ![progress-04](/progress/progress-02.png)\n                * [demo](/effects/demo/css/progress/v1-1.html)', '1', '4本文总结了近期博主在小程序内嵌H5使用公众号能力实践中遇到的一些问题和解决方案，其中一些是移动端开发共性的问题，一些是公众号独有的问题，特此分享出来，避免后来人采坑。', '1', '1', '1');
INSERT INTO `article` VALUES ('7', '小黄人', '2018-05-20 00:00:00', '0', '0', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525715227960&di=3c7c622a2221fc0a9c69754432398732&imgtype=0&src=http%3A%2F%2Ffile.xdf.cn%2Fuploads%2F150916%2F861_150916162840glm1nhlGDjqan6Va.png', '![progress-02](/progress/progress-02.png)看到我粘出来的代码，\n                ### 1.5 demo\n                ![progress-03](/progress/progress-02.png)\n                ![progress-04](/progress/progress-02.png)\n                * [demo](/effects/demo/css/progress/v1-1.html)', '1', '4你好本文总结了近期博主在小程序内嵌H5使用公众号能力实践中遇到的一些问题和解决方案，其中一些是移动端开发共性的问题，一些是公众号独有的问题，特此分享出来，避免后来人采坑。', '1', '1', '1');
INSERT INTO `article` VALUES ('8', '小黄人', '2018-05-01 00:00:00', '0', '0', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525715227960&di=3c7c622a2221fc0a9c69754432398732&imgtype=0&src=http%3A%2F%2Ffile.xdf.cn%2Fuploads%2F150916%2F861_150916162840glm1nhlGDjqan6Va.png', '![progress-02](/progress/progress-02.png)看到我粘出来的代码，\n                ### 1.5 demo\n                ![progress-03](/progress/progress-02.png)\n                ![progress-04](/progress/progress-02.png)\n                * [demo](/effects/demo/css/progress/v1-1.html)', '1', '本文总结了近期博主在小程序内嵌H5使用公众号能力实践中遇到的一些问题和解决方案，其中一些是移动端开发共性的问题，一些是公众号独有的问题，特此分享出来，避免后来人采坑。', '1', '1', '1');
INSERT INTO `article` VALUES ('9', '小黄人', '2018-05-05 00:00:00', '0', '0', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525715227960&di=3c7c622a2221fc0a9c69754432398732&imgtype=0&src=http%3A%2F%2Ffile.xdf.cn%2Fuploads%2F150916%2F861_150916162840glm1nhlGDjqan6Va.png', '![progress-02](/progress/progress-02.png)看到我粘出来的代码，\n                ### 1.5 demo\n                ![progress-03](/progress/progress-02.png)\n                ![progress-04](/progress/progress-02.png)\n                * [demo](/effects/demo/css/progress/v1-1.html)', '1', '本文总结了近期博主在小程序内嵌H5使用公众号能力实践中遇到的一些问题和解决方案，其中一些是移动端开发共性的问题，一些是公众号独有的问题，特此分享出来，避免后来人采坑。', '1', '1', '1');
INSERT INTO `article` VALUES ('10', '小黄人', '2018-05-04 18:15:34', '0', '0', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525715227960&di=3c7c622a2221fc0a9c69754432398732&imgtype=0&src=http%3A%2F%2Ffile.xdf.cn%2Fuploads%2F150916%2F861_150916162840glm1nhlGDjqan6Va.png', '![progress-02](/progress/progress-02.png)看到我粘出来的代码，\n                ### 1.5 demo\n                ![progress-03](/progress/progress-02.png)\n                ![progress-04](/progress/progress-02.png)\n                * [demo](/effects/demo/css/progress/v1-1.html)', '1', '本文总结了近期博主在小程序内嵌H5使用公众号能力实践中遇到的一些问题和解决方案，其中一些是移动端开发共性的问题，一些是公众号独有的问题，特此分享出来，避免后来人采坑。', '1', '1', '1');
INSERT INTO `article` VALUES ('11', '小黄人', '2018-05-04 18:17:56', '0', '0', 'http://127.0.0.1:3002/progress/progress-01.png', '![progress-02](/progress/progress-02.png)看到我粘出来的代码，\n                ### 1.5 demo\n                ![progress-03](/progress/progress-02.png)\n                ![progress-04](/progress/progress-02.png)\n                * [demo](/effects/demo/css/progress/v1-1.html)', '1', '4你好', '1', '1', '1');
INSERT INTO `article` VALUES ('12', '小黄人', '2018-05-04 18:18:27', '0', '0', 'http://127.0.0.1:3002/progress/progress-01.png', '![progress-02](/progress/progress-02.png)看到我粘出来的代码，\n                ### 1.5 demo\n                ![progress-03](/progress/progress-02.png)\n                ![progress-04](/progress/progress-02.png)\n                * [demo](/effects/demo/css/progress/v1-1.html)', '1', '4你好本文总结了近期博主在小程序内嵌H5使用公众号能力实践中遇到的一些问题和解决方案，其中一些是移动端开发共性的问题，一些是公众号独有的问题，特此分享出来，避免后来人采坑。', '1', '1', '1');
INSERT INTO `article` VALUES ('13', '13', '2018-05-04 18:20:27', '0', '0', 'http://127.0.0.1:3002/progress/progress-01.png', '![progress-02](/progress/progress-02.png)看到我粘出来的代码，\n                ### 1.5 demo\n                ![progress-03](/progress/progress-02.png)\n                ![progress-04](/progress/progress-02.png)\n                * [demo](/effects/demo/css/progress/v1-1.html)', '1', '4你好', '1', '1', '1');
INSERT INTO `article` VALUES ('14', '14', '2018-05-04 18:21:33', '0', '0', 'http://127.0.0.1:3002/progress/progress-01.png', '![progress-02](/progress/progress-02.png)看到我粘出来的代码，\n                ### 1.5 demo\n                ![progress-03](/progress/progress-02.png)\n                ![progress-04](/progress/progress-02.png)\n                * [demo](/effects/demo/css/progress/v1-1.html)', '1', '你好', '1', '1', '14');
INSERT INTO `article` VALUES ('15', '15', '2018-05-04 18:24:07', '0', '0', 'http://127.0.0.1:3002/progress/progress-01.png', '![progress-02](/progress/progress-02.png)看到我粘出来的代码，\n                ### 1.5 demo\n                ![progress-03](/progress/progress-02.png)\n                ![progress-04](/progress/progress-02.png)\n                * [demo](/effects/demo/css/progress/v1-1.html)', '1', '4', '1', '1', '1');
INSERT INTO `article` VALUES ('16', '16', '2018-05-04 19:12:56', '0', '0', 'http://127.0.0.1:3002/progress/progress-01.png', '![progress-02](/progress/progress-02.png)看到我粘出来的代码，\n                ### 1.5 demo\n                ![progress-03](/progress/progress-02.png)\n                ![progress-04](/progress/progress-02.png)\n                * [demo](/effects/demo/css/progress/v1-1.html)', '1', '4', '1', '1', '1');
INSERT INTO `article` VALUES ('17', '17', '2018-05-04 19:15:03', '0', '0', 'http://127.0.0.1:3002/progress/progress-01.png', '![progress-02](/progress/progress-02.png)看到我粘出来的代码，\n                ### 1.5 demo\n                ![progress-03](/progress/progress-02.png)\n                ![progress-04](/progress/progress-02.png)\n                * [demo](/effects/demo/css/progress/v1-1.html)', '1', '4', '1', '1', '14');
INSERT INTO `article` VALUES ('18', '18', '2018-05-04 19:15:37', '0', '0', 'http://127.0.0.1:3002/progress/progress-01.png', '![progress-02](/progress/progress-02.png)看到我粘出来的代码，\n                ### 1.5 demo\n                ![progress-03](/progress/progress-02.png)\n                ![progress-04](/progress/progress-02.png)\n                * [demo](/effects/demo/css/progress/v1-1.html)', '1', '4', '1', '1', '1');
INSERT INTO `article` VALUES ('19', '19', '2018-05-04 19:20:08', '0', '0', 'http://127.0.0.1:3002/progress/progress-01.png', '![progress-02](/progress/progress-02.png)看到我粘出来的代码，\n                ### 1.5 demo\n                ![progress-03](/progress/progress-02.png)\n                ![progress-04](/progress/progress-02.png)\n                * [demo](/effects/demo/css/progress/v1-1.html)', '1', '4', '1', '1', '1');
INSERT INTO `article` VALUES ('20', '20', '2018-05-04 19:24:02', '0', '0', 'http://127.0.0.1:3002/progress/progress-01.png', '![progress-02](/progress/progress-02.png)看到我粘出来的代码，', '1', '4', '1', '1', '1');
INSERT INTO `article` VALUES ('21', '21', '2018-05-04 19:32:32', '0', '0', 'http://127.0.0.1:3002/progress/progress-01.png', '![progress-02](/progress/progress-02.png)看到我粘出来的代码，\n                ### 1.5 demo\n                ![progress-03](/progress/progress-02.png)\n                ![progress-04](/progress/progress-02.png)\n                * [demo](/effects/demo/css/progress/v1-1.html)', '1', '4', '1', '1', '1');

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
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '原创');
INSERT INTO `category` VALUES ('2', '学习笔记');
INSERT INTO `category` VALUES ('3', '项目');
INSERT INTO `category` VALUES ('4', '面试经历');

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
  `Article_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idComment_UNIQUE` (`id`),
  KEY `fk_Comment_Article1_idx` (`Article_id`),
  CONSTRAINT `fk_Comment_Article1` FOREIGN KEY (`Article_id`) REFERENCES `article` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('7', 'q', '1222@qq.com', '', 'd', '2018-05-16 21:05:20', '8');
INSERT INTO `comment` VALUES ('8', 'jm', '471938302@qq.com', '', 'hahh', '2018-05-27 19:05:27', '10');
INSERT INTO `comment` VALUES ('9', '1', 'nihao@qq.com', '', 'dddd', '2018-05-27 19:05:38', '10');
INSERT INTO `comment` VALUES ('10', 'mmm', 'ddf4@qq.com', '', 'good', '2018-05-27 19:05:58', '10');
INSERT INTO `comment` VALUES ('11', '111', '1222@qq.com', '', '1', '2018-05-28 09:05:04', '11');
INSERT INTO `comment` VALUES ('12', '1', '1222@qq.com', '', '1', '2018-05-28 09:05:22', '11');

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
-- Records of replying
-- ----------------------------

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES ('1', 'html');
INSERT INTO `tag` VALUES ('2', 'css');
INSERT INTO `tag` VALUES ('3', 'javascript');
INSERT INTO `tag` VALUES ('4', 'nodejs');
INSERT INTO `tag` VALUES ('5', 'webpack');
INSERT INTO `tag` VALUES ('6', 'react');
INSERT INTO `tag` VALUES ('7', 'koa');
INSERT INTO `tag` VALUES ('8', 'mysql');
INSERT INTO `tag` VALUES ('9', 'algorithm');
INSERT INTO `tag` VALUES ('10', '项目经历');
INSERT INTO `tag` VALUES ('11', '面试经历');
INSERT INTO `tag` VALUES ('12', '插件');
INSERT INTO `tag` VALUES ('13', 'http');
INSERT INTO `tag` VALUES ('14', 'nigix');
