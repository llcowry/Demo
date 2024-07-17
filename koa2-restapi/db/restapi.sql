/*
 Navicat MySQL Data Transfer

 Source Server         : Rowan
 Source Server Type    : MySQL
 Source Server Version : 50744
 Source Host           : localhost:3306
 Source Schema         : restapi

 Target Server Type    : MySQL
 Target Server Version : 50744
 File Encoding         : 65001

 Date: 17/07/2024 14:25:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_logs
-- ----------------------------
DROP TABLE IF EXISTS `admin_logs`;
CREATE TABLE `admin_logs`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adminId` int(11) NULL DEFAULT NULL,
  `adminName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `loginResult` int(11) NOT NULL DEFAULT 0 COMMENT '0: 失败, 1: 成功',
  `loginIp` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `userAgent` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_logs
-- ----------------------------
INSERT INTO `admin_logs` VALUES (1, 1, 'admin', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '登录成功', '2024-07-16 08:08:17');
INSERT INTO `admin_logs` VALUES (2, 1, 'admin', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '登录成功', '2024-07-16 08:11:25');
INSERT INTO `admin_logs` VALUES (3, 1, 'admin', 2, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '退出登录', '2024-07-16 08:11:35');
INSERT INTO `admin_logs` VALUES (4, 1, 'admin', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '登录成功', '2024-07-16 08:11:39');
INSERT INTO `admin_logs` VALUES (5, 1, 'admin', 2, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '退出登录', '2024-07-16 08:12:05');
INSERT INTO `admin_logs` VALUES (6, 1, 'admin', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '登录成功', '2024-07-16 08:13:10');
INSERT INTO `admin_logs` VALUES (7, 1, 'admin', 2, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '退出登录', '2024-07-16 08:13:20');
INSERT INTO `admin_logs` VALUES (8, 1, 'admin', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '登录成功', '2024-07-16 08:15:24');
INSERT INTO `admin_logs` VALUES (9, 1, 'admin', 2, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '退出登录', '2024-07-16 08:15:31');
INSERT INTO `admin_logs` VALUES (10, 1, 'admin', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '登录成功', '2024-07-16 08:15:46');
INSERT INTO `admin_logs` VALUES (11, 1, 'admin', 2, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '退出登录', '2024-07-16 08:15:49');
INSERT INTO `admin_logs` VALUES (12, 1, 'admin', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '登录成功', '2024-07-16 08:16:12');
INSERT INTO `admin_logs` VALUES (13, 1, 'admin', 2, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '退出登录', '2024-07-16 08:16:15');
INSERT INTO `admin_logs` VALUES (14, 1, 'admin', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '登录成功', '2024-07-16 08:20:48');
INSERT INTO `admin_logs` VALUES (15, 1, 'admin', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '登录成功', '2024-07-16 09:35:33');
INSERT INTO `admin_logs` VALUES (16, 1, 'admin', 2, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '退出登录', '2024-07-16 09:35:35');
INSERT INTO `admin_logs` VALUES (17, 1, 'admin', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '登录成功', '2024-07-16 09:35:39');
INSERT INTO `admin_logs` VALUES (18, 1, 'admin', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '登录成功', '2024-07-16 10:46:13');
INSERT INTO `admin_logs` VALUES (19, 1, 'admin', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '登录成功', '2024-07-16 11:51:11');
INSERT INTO `admin_logs` VALUES (20, 1, 'admin', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '登录成功', '2024-07-17 01:20:27');
INSERT INTO `admin_logs` VALUES (21, 1, 'admin', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '登录成功', '2024-07-17 02:24:17');
INSERT INTO `admin_logs` VALUES (22, 1, 'admin', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '登录成功', '2024-07-17 03:28:53');
INSERT INTO `admin_logs` VALUES (23, 1, 'admin', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '登录成功', '2024-07-17 06:07:39');

-- ----------------------------
-- Table structure for admin_roles
-- ----------------------------
DROP TABLE IF EXISTS `admin_roles`;
CREATE TABLE `admin_roles`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `adminId` int(11) NULL DEFAULT NULL,
  `roleId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `admin_roles_roleId_adminId_unique`(`adminId`, `roleId`) USING BTREE,
  INDEX `roleId`(`roleId`) USING BTREE,
  CONSTRAINT `admin_roles_ibfk_1` FOREIGN KEY (`adminId`) REFERENCES `admins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `admin_roles_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 48 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_roles
-- ----------------------------
INSERT INTO `admin_roles` VALUES (22, '2024-07-02 13:55:39', '2024-07-02 13:55:39', 1, 2);
INSERT INTO `admin_roles` VALUES (38, '2024-07-16 03:12:06', '2024-07-16 03:12:06', 1, 1);
INSERT INTO `admin_roles` VALUES (43, '2024-07-16 12:40:06', '2024-07-16 12:40:06', 4, 5);
INSERT INTO `admin_roles` VALUES (44, '2024-07-16 12:40:27', '2024-07-16 12:40:27', 2, 3);
INSERT INTO `admin_roles` VALUES (45, '2024-07-16 12:40:33', '2024-07-16 12:40:33', 3, 2);
INSERT INTO `admin_roles` VALUES (47, '2024-07-16 12:41:26', '2024-07-16 12:41:26', 5, 6);

-- ----------------------------
-- Table structure for admins
-- ----------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gender` int(11) NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `note` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT 0,
  `isDisabled` tinyint(1) NOT NULL DEFAULT 0,
  `administrator` tinyint(1) NOT NULL DEFAULT 0,
  `departmentId` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admins
-- ----------------------------
INSERT INTO `admins` VALUES (1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'admin@example.com', 'Admin One', 1, 'avatar1.png', '19234567890', 'First admin', 0, 0, 1, 1, '2024-07-01 18:24:17', '2024-07-09 08:15:26');
INSERT INTO `admins` VALUES (2, 'admin2', 'e10adc3949ba59abbe56e057f20f883e', 'admin2@example.com', 'Admin2', 0, 'avatar2.png', '19087654321', 'Second admin', 0, 0, 0, 4, '2024-07-01 18:24:17', '2024-07-13 10:43:49');
INSERT INTO `admins` VALUES (3, 'admin3', '2d18efc623bf83b8f59d534d395b7b7c', 'admin3@example.com', 'Admin3', 2, 'avatar3.png', '18112223333', 'Third admin', 0, 0, 0, 2, '2024-07-01 18:24:17', '2024-07-06 01:49:35');
INSERT INTO `admins` VALUES (4, 'admin4', '37518ae3f74432df29315b60c68c55f6', 'admin@example.com', 'Admin4', 1, 'avatar1.png', '16623452345', 'First admin', 0, 0, 0, 5, '2024-07-03 01:25:26', '2024-07-03 02:47:54');
INSERT INTO `admins` VALUES (5, 'admin5', 'f3def30aed7d25b66e90cdca98d450a5', NULL, 'Admin5', 1, NULL, '15567585678', NULL, 0, 0, 0, 4, '2024-07-03 01:35:10', '2024-07-15 11:29:18');

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles`  (
  `articleId` int(11) NOT NULL AUTO_INCREMENT,
  `categoryId` int(11) NULL DEFAULT NULL,
  `typeId` int(11) NOT NULL DEFAULT 1,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `previewImg` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `linkUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `contentText` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `contentHtml` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `attachment` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `sort` int(11) NOT NULL DEFAULT 99,
  `viewCount` int(11) NOT NULL DEFAULT 0,
  `isHomeShow` tinyint(1) NOT NULL DEFAULT 0,
  `isRecommend` tinyint(1) NOT NULL DEFAULT 0,
  `isDisabled` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`articleId`) USING BTREE,
  INDEX `articles_ibfk_1`(`categoryId`) USING BTREE,
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES (3, 3, 2, '以色列将从8月开始征召极端正统派犹太人入伍', '邢斯馨，刘亮', '[{\"uid\":\"vc-upload-1720530765808-9\",\"name\":\"087ac50a5c879b0c17751db86b65bafc.jpg\",\"status\":\"done\",\"percent\":100,\"id\":\"5fde6ab1-ad32-4340-bf46-64ad3c81ae64\",\"folderType\":\"5\",\"originalname\":\"2024070920574320228[1].jpg\",\"filename\":\"087ac50a5c879b0c17751db86b65bafc.jpg\",\"path\":\"uploads/2024-07-09/087ac50a5c879b0c17751db86b65bafc.jpg\",\"size\":73895,\"type\":\"image/jpeg\",\"url\":\"http://127.0.0.1:8000/uploads/2024-07-09/087ac50a5c879b0c17751db86b65bafc.jpg\",\"description\":\"\",\"creatorId\":1,\"creatorName\":\"admin\",\"updatedAt\":\"2024-07-09T13:19:07.708Z\",\"createdAt\":\"2024-07-09T13:19:07.708Z\"}]', NULL, '　　当地时间9日，根据以色列国防部长加兰特发表的声明，以色列国防军将从8月起扩大对以色列极端正统派犹太人的兵役招募。声明称，加兰特当天与以军总参谋长哈莱维及其他国防部官员就此进行了评估，但是声明未说明以军此次招募的人数等具体细节。\n　　今年6月25日，以色列最高法院作出裁决，要求政府将长期享受兵役豁免的极端正统派犹太经学院学生纳入征兵范围。7月1日，以色列国防部长加兰特表示，以色列需要立即增兵1万名，其中的4800名可以从极端正统派犹太人中招募。相关征兵要求遭到以色列极端正统派犹太人的强烈抵制，并连续在以色列多地举行抗议活动。（总台记者 赵兵）', '<p style=\"text-align: start;\">　　当地时间9日，根据以色列国防部长加兰特发表的声明，以色列国防军将从8月起扩大对以色列极端正统派犹太人的兵役招募。声明称，加兰特当天与以军总参谋长哈莱维及其他国防部官员就此进行了评估，但是声明未说明以军此次招募的人数等具体细节。</p><p style=\"text-align: start;\">　　今年6月25日，以色列最高法院作出裁决，要求政府将长期享受兵役豁免的极端正统派犹太经学院学生纳入征兵范围。7月1日，以色列国防部长加兰特表示，以色列需要立即增兵1万名，其中的4800名可以从极端正统派犹太人中招募。相关征兵要求遭到以色列极端正统派犹太人的强烈抵制，并连续在以色列多地举行抗议活动。（总台记者 赵兵）</p>', '[]', 99, 0, 1, 0, 0, '2024-07-05 12:06:46', '2024-07-09 13:20:05');
INSERT INTO `articles` VALUES (5, 2, 1, '“免签朋友圈”不断扩大 数据见证“China Travel”魅力十足', '及玥，刘亮', '[]', NULL, '央视网消息：这个暑期，无论是出境游，还是入境游，都是一片旺季的感觉。\n\n体育赛事带动出境游 入境游同样火爆\n记者从各大旅行社和在线旅游平台了解到，今年暑期，日本、韩国和东南亚仍是出境游热门目的地，同时，美国、英国、澳大利亚、法国、意大利等长线游热也颇受欢迎。巴黎奥运会、欧洲杯等体育赛事带动赴欧旅游的订单量增长显著。法国暑期旅游订单量同比增长八成，德国旅游订单量同比增长1.5倍以上。此外，随着直飞航线的开通，巴西、墨西哥、阿根廷等长线目的地也吸引了中国游客，暑期订单量同比增长均超过80%。\n\n此外，暑期的入境游将持续增长。在免签政策、支付便利化等利好因素影响下，海外社交平台逐渐形成了“China Travel”热潮，吸引了不少外国游客来中国。数据显示，暑期入境旅游订单同比增长1倍，可免签入境中国的法国、意大利、德国、马来西亚、泰国等14国的游客入境游订单整体同比增长1.5倍。\n广东深圳：“免签朋友圈”不断扩大 暑期出入境游迎热潮\n\n随着中国免签“朋友圈”的扩容，外国游客“中国游”持续火热。数据显示，今年以来，深圳机场口岸外籍人员通关人数增长明显。\n\n据深圳机场边检站统计，截至7月5日，今年以来深圳机场口岸出入境外国人近50万人次，同比增长209%。其中入境外国人近24.5万人次，同比增长197%，值得注意的是，来自法国、德国等免签国家的游客明显增多，同比增长292%。\n\n此外，某旅游平台数据显示，暑假期间，出境游订单量同比增长59%，入境游订单量同比增长113%。\n我国自2013年1月起，开始实施72/144小时过境免签政策。这一免签政策覆盖面还在持续扩大。从7月1日起，我国正式对新西兰、澳大利亚、波兰等三国实施单方面免签。', '<p style=\"text-indent: 2em; text-align: start;\"><strong>央视网消息：</strong>这个暑期，无论是出境游，还是入境游，都是一片旺季的感觉。<br></p><p style=\"text-indent: 2em; text-align: start;\"><strong>体育赛事带动出境游 入境游同样火爆</strong></p><p style=\"text-indent: 2em; text-align: start;\">记者从各大旅行社和在线旅游平台了解到，今年暑期，日本、韩国和东南亚仍是出境游热门目的地，同时，美国、英国、澳大利亚、法国、意大利等长线游热也颇受欢迎。巴黎奥运会、欧洲杯等体育赛事带动赴欧旅游的订单量增长显著。法国暑期旅游订单量同比增长八成，德国旅游订单量同比增长1.5倍以上。此外，随着直飞航线的开通，巴西、墨西哥、阿根廷等长线目的地也吸引了中国游客，暑期订单量同比增长均超过80%。</p><p style=\"text-align: center;\"><img src=\"https://p2.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070910552912600.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">此外，暑期的入境游将持续增长。在免签政策、支付便利化等利好因素影响下，海外社交平台逐渐形成了“China Travel”热潮，吸引了不少外国游客来中国。数据显示，暑期入境旅游订单同比增长1倍，可免签入境中国的法国、意大利、德国、马来西亚、泰国等14国的游客入境游订单整体同比增长1.5倍。</p><p style=\"text-indent: 2em; text-align: start;\"><strong>广东深圳：“免签朋友圈”不断扩大 暑期出入境游迎热潮</strong></p><p style=\"text-align: center;\"><br></p><p style=\"text-indent: 2em; text-align: start;\">随着中国免签“朋友圈”的扩容，外国游客“中国游”持续火热。数据显示，今年以来，深圳机场口岸外籍人员通关人数增长明显。</p><p style=\"text-align: center;\"><img src=\"https://p4.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070910570860788.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">据深圳机场边检站统计，截至7月5日，今年以来深圳机场口岸出入境外国人近50万人次，同比增长209%。其中入境外国人近24.5万人次，同比增长197%，值得注意的是，来自法国、德国等免签国家的游客明显增多，同比增长292%。</p><p style=\"text-align: center;\"><img src=\"https://p4.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070910565933761.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">此外，某旅游平台数据显示，暑假期间，出境游订单量同比增长59%，入境游订单量同比增长113%。</p><p style=\"text-indent: 2em; text-align: start;\">我国自2013年1月起，开始实施72/144小时过境免签政策。这一免签政策覆盖面还在持续扩大。从7月1日起，我国正式对新西兰、澳大利亚、波兰等三国实施单方面免签。</p>', '[]', 99, 0, 1, 0, 0, '2024-07-09 13:15:26', '2024-07-09 13:15:26');
INSERT INTO `articles` VALUES (6, 2, 1, '黄河古贤水利枢纽工程进入建设阶段', '罗萌，刘亮', '[]', NULL, '　　央视网消息（新闻联播）：今天（7月9日），随着黄河古贤水利枢纽工程导流洞支洞掘进施工，标志着这项黄河干流关键控制性工程已进入建设阶段。\n\n　　古贤工程位于黄河中游大峡谷河段，左岸为山西省吉县，右岸为陕西省宜川县，是黄河水沙调控体系的核心工程和国家水网的重要节点工程。 \n\n　　建设古贤工程是破解小浪底水库调水调沙后续动力不足、充分发挥水沙调控体系整体合力、完善水沙调控机制的关键一环。工程坝址可控制黄河流域73%的水量、60%的沙量和80%的粗泥沙量。', '<p style=\"text-align: start;\">　　<strong>央视网消息</strong>（新闻联播）：今天（7月9日），随着黄河古贤水利枢纽工程导流洞支洞掘进施工，标志着这项黄河干流关键控制性工程已进入建设阶段。</p><p style=\"text-align: center;\"><img src=\"https://p1.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070920593932953.jpg\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-align: start;\">　　古贤工程位于黄河中游大峡谷河段，左岸为山西省吉县，右岸为陕西省宜川县，是黄河水沙调控体系的核心工程和国家水网的重要节点工程。 </p><p style=\"text-align: center;\"><img src=\"https://p5.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070921002469304.jpg\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-align: start;\">　　建设古贤工程是破解小浪底水库调水调沙后续动力不足、充分发挥水沙调控体系整体合力、完善水沙调控机制的关键一环。工程坝址可控制黄河流域73%的水量、60%的沙量和80%的粗泥沙量。</p>', '[]', 99, 0, 1, 1, 0, '2024-07-09 13:16:14', '2024-07-09 13:16:14');
INSERT INTO `articles` VALUES (7, 2, 1, '第700架A320系列飞机交付 中国高水平对外开放释放强大“磁吸力”', '刘珊，刘亮', '[]', NULL, '央视网消息：7月8日，空中客车公司在中国总装的第700架A320系列飞机在天津完成交付。目前正在稳步推进建设的空客天津第二条总装线预计于2026年年初投产。\n\n此次空客中国交付的第700架A320系列飞机，由空客天津A320系列飞机亚洲总装线完成总装，由成都航空接收运营，共设180个经济舱座位。\n\n位于天津的空中客车A320系列飞机亚洲总装线，是空中客车公司在欧洲以外的首条民用飞机生产线，至今已经成功运营了超过15年。目前，空客中国已与多家中国航空工业企业合作，进行包括应急舱门、机翼翼盒等零部件的制造生产和采购。\n\n此外，于2023年9月正式开工建设的空客天津第二条总装线也正在稳步推进，预计2026年年初交付投产。届时，空客在天津将形成两条单通道飞机总装线和一个双通道飞机完成交付中心的布局。\n\n空中客车中国公司首席执行官徐岗称：“中国供应链整体的韧性和在竞争力方面的一些优势，给我们树立了信心。同时，我们希望在中国更加扩大供应链系统，中国的高水平对外开放给我们带来很好的一个预期性和稳定性，有了这些，也使得我们更放心在中国的投资。”', '<p style=\"text-indent: 2em; text-align: start;\"><strong>央视网消息：</strong>7月8日，空中客车公司在中国总装的第700架A320系列飞机在天津完成交付。目前正在稳步推进建设的空客天津第二条总装线预计于2026年年初投产。<br></p><p style=\"text-indent: 2em; text-align: start;\">此次空客中国交付的第700架A320系列飞机，由空客天津A320系列飞机亚洲总装线完成总装，由成都航空接收运营，共设180个经济舱座位。</p><p style=\"text-align: center;\"><img src=\"https://p4.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070911473252292.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">位于天津的空中客车A320系列飞机亚洲总装线，是空中客车公司在欧洲以外的首条民用飞机生产线，至今已经成功运营了超过15年。目前，空客中国已与多家中国航空工业企业合作，进行包括应急舱门、机翼翼盒等零部件的制造生产和采购。</p><p style=\"text-align: center;\"><img src=\"https://p4.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070911473832725.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">此外，于2023年9月正式开工建设的空客天津第二条总装线也正在稳步推进，预计2026年年初交付投产。届时，空客在天津将形成两条单通道飞机总装线和一个双通道飞机完成交付中心的布局。</p><p style=\"text-align: center;\"><img src=\"https://p4.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070911474423802.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">空中客车中国公司首席执行官徐岗称：“中国供应链整体的韧性和在竞争力方面的一些优势，给我们树立了信心。同时，我们希望在中国更加扩大供应链系统，中国的高水平对外开放给我们带来很好的一个预期性和稳定性，有了这些，也使得我们更放心在中国的投资。”</p>', '[]', 99, 0, 1, 1, 0, '2024-07-09 13:17:26', '2024-07-09 13:17:26');
INSERT INTO `articles` VALUES (8, 2, 1, '深中通道日均车流超10万 超级工程促“流量”变“留量”', '及玥，刘亮', '[]', NULL, '央视网消息：今年6月30日，全长24公里的深中通道正式通车运营。作为粤港澳大湾区核心交通枢纽工程，现在一个多星期过去了，目前运行的情况怎么样？来看总台记者吴媚苗从现场带来的最新观察。\n\n总台记者吴媚苗介绍，“我现在是在深中通道路网调度中心，这里是整个深中通道运营的‘心脏’和‘大脑’，覆盖全线800多个监控摄像和数字平台，能够对24公里长的全线路况了如指掌并作出应急处理。\n先来说说最新的数据，通车以来，截至目前，深中通道平均每天的车流量超过10万车次，单小时最高峰时超过了8000车次。可以说，深中通道运行以来，车流始终保持着高位运行，是大湾区交通基础设施不折不扣的‘流量担当’。\n\n就在刚刚过去的这个周末（7月6日、7月7日），深中通道出现了堵车缓行的情况，目前，各有关部门正在分析排查易堵点，进一步优化交通组织。那么随着人们逐渐熟悉和适应深中通道的通行线路，官方预计堵车的情况将会有所缓解。\n有采访对象就告诉我们，过去，深圳的市民群众周末会去惠州等地游玩，如今又多了个好去处，到中山吃乳鸽、赏美景，大湾区一小时生活圈又扩圈了。而日均超200趟、最快每5分钟就一班的跨市公交的开通，让中山到深圳的通勤时间缩短，居住在中山、工作在深圳也许是未来的一个新趋势。\n所以说深中通道也是大湾区多城生活变同城生活的重要载体。\n\n其实我们站在这里，看车来车往的背后有一个更深的议题，也是各地倍加关注的，那就是面对深中通道带来的‘超级流量’，如何将通车的‘客流量’转变为发展的‘留客量’？\n\n事实上，深中通道的利好还将辐射珠海、广州南沙等地，深圳到珠海1个小时左右，未来随着万顷沙互通支线开通，到广州南沙半小时左右。目前我们了解到，中山、珠海、广州南沙等地正在不断推进包括发展规划、产业创新、文旅整合、业态培养、营商环境、公共服务等各个方面工作。尤其是中山还将准备10万亩的产业用地提供给深圳，承接珠江口东岸产业的辐射。可以说，深中通道未来将有力促进珠江口东西两岸的融合发展，不断提升大湾区‘硬联通’和‘软联通’水平。”', '<p style=\"text-indent: 2em; text-align: start;\"><strong>央视网消息：</strong>今年6月30日，全长24公里的深中通道正式通车运营。作为粤港澳大湾区核心交通枢纽工程，现在一个多星期过去了，目前运行的情况怎么样？来看总台记者吴媚苗从现场带来的最新观察。</p><p style=\"text-align: center;\"><img src=\"https://p4.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070913312968791.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">总台记者吴媚苗介绍，“我现在是在深中通道路网调度中心，这里是整个深中通道运营的‘心脏’和‘大脑’，覆盖全线800多个监控摄像和数字平台，能够对24公里长的全线路况了如指掌并作出应急处理。</p><p style=\"text-indent: 2em; text-align: start;\">先来说说最新的数据，通车以来，截至目前，深中通道平均每天的车流量超过10万车次，单小时最高峰时超过了8000车次。可以说，深中通道运行以来，车流始终保持着高位运行，是大湾区交通基础设施不折不扣的‘流量担当’。</p><p style=\"text-align: center;\"><img src=\"https://p3.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070913320235757.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">就在刚刚过去的这个周末（7月6日、7月7日），深中通道出现了堵车缓行的情况，目前，各有关部门正在分析排查易堵点，进一步优化交通组织。那么随着人们逐渐熟悉和适应深中通道的通行线路，官方预计堵车的情况将会有所缓解。</p><p style=\"text-indent: 2em; text-align: start;\">有采访对象就告诉我们，过去，深圳的市民群众周末会去惠州等地游玩，如今又多了个好去处，到中山吃乳鸽、赏美景，大湾区一小时生活圈又扩圈了。而日均超200趟、最快每5分钟就一班的跨市公交的开通，让中山到深圳的通勤时间缩短，居住在中山、工作在深圳也许是未来的一个新趋势。</p><p style=\"text-indent: 2em; text-align: start;\">所以说深中通道也是大湾区多城生活变同城生活的重要载体。</p><p style=\"text-align: center;\"><img src=\"https://p5.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070913342218883.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">其实我们站在这里，看车来车往的背后有一个更深的议题，也是各地倍加关注的，那就是面对深中通道带来的‘超级流量’，如何将通车的‘客流量’转变为发展的‘留客量’？</p><p style=\"text-align: center;\"><img src=\"https://p2.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070913330891077.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">事实上，深中通道的利好还将辐射珠海、广州南沙等地，深圳到珠海1个小时左右，未来随着万顷沙互通支线开通，到广州南沙半小时左右。目前我们了解到，中山、珠海、广州南沙等地正在不断推进包括发展规划、产业创新、文旅整合、业态培养、营商环境、公共服务等各个方面工作。尤其是中山还将准备10万亩的产业用地提供给深圳，承接珠江口东岸产业的辐射。可以说，深中通道未来将有力促进珠江口东西两岸的融合发展，不断提升大湾区‘硬联通’和‘软联通’水平。”</p>', '[]', 99, 0, 1, 0, 0, '2024-07-09 13:18:02', '2024-07-09 13:18:02');
INSERT INTO `articles` VALUES (9, 12, 1, '中法深度合作成果+1！中法天文卫星探索宇宙最亮“烟花”', '及玥，刘亮', '[]', NULL, '央视网消息：6月22日发射升空的中法天文卫星搭载的4台科学载荷均已完成开机测试，其中，伽马射线监测器已成功探测到三个伽马暴。专家表示，发射后仅两周内就取得重要探测成果，充分验证了中法天文卫星对伽马射线暴的高精度触发探测能力，伽马射线监测器的性能符合预期。\n中法天文卫星探索宇宙最亮“烟花”\n\n伽马暴是除宇宙大爆炸以外，目前已知宇宙中最剧烈的爆发现象，其短时间内能够辐射巨大能量，典型的高能暴发仅持续几毫秒至几十秒，伽马暴涉及从恒星、星系到宇宙学等天体物理学的多个领域。通过观测伽马暴，进一步揭秘来自宇宙更深处以及宇宙诞生之初的科学奥秘。\n中法天文卫星中方首席科学家、中国科学院国家天文台首席研究员魏建彦介绍：“伽马（射线）暴是一个恒星演化到它生命终结的时候一个剧烈的能量耀发过程，这个过程它会产生黑洞、产生中子星，同时它会产生剧烈的能量爆发现象，所以研究伽马（射线）暴本身对研究恒星的演化和宇宙的形成和演化非常有意义。”\n中法天文卫星完成载荷开机测试\n\n\n中法天文卫星是两国在空间科学领域开展的重要国际合作项目，也是迄今全球对伽马射线暴开展多波段综合观测能力最强的卫星。搭载的伽马射线监测器6月24日开机后进行了在轨测试，6月27日监测器成功捕捉到了首个伽马射线暴，这是中法天文卫星的首个在轨科学探测成果。经过比对，该伽马射线暴的光变曲线与中国创新X首发星上观测到的结果相同，也和国外费米卫星的观测结果一致。6月29日和7月2日，中法天文卫星再次探测到第二第三个伽马射线暴。首批探测结果充分验证了中法天文卫星对伽马射线暴的高精度触发探测能力，目前卫星搭载的中法双方研制的4台有效载荷均已完成开机测试。\n魏建彦表示：“我们这个卫星非常适合来找这类，如果有发现，对推动恒星演化、伽马暴种类（研究），包括来了解我们的超重元素从哪来，天文上有可能通过这类研究得到很好的回答。”\n中法天文卫星法方首席科学家贝特朗·科迪尔称：“我们期望每年能够观测到大约70次伽马暴。”\n预计8月将开展科学任务观测测试\n\n中法天文卫星将按照在轨测试计划和流程完成各项测试任务，尽快开展载荷标定和业务运行测试，预计8月将开展科学任务观测测试。\n中法在航天领域开展多项务实合作\n\n\n近年来，中法两国在航天领域开展了多项务实合作。2018年，中法联合研制的中法海洋卫星成功发射。2024年，嫦娥六号探测器搭载法国氡气探测仪着陆月球背面。中法天文卫星取得重要成果，也是中法航天领域深度合作的典范。', '<p style=\"text-indent: 2em; text-align: start;\"><strong>央视网消息：</strong>6月22日发射升空的中法天文卫星搭载的4台科学载荷均已完成开机测试，其中，伽马射线监测器已成功探测到三个伽马暴。专家表示，发射后仅两周内就取得重要探测成果，充分验证了中法天文卫星对伽马射线暴的高精度触发探测能力，伽马射线监测器的性能符合预期。</p><p style=\"text-indent: 2em; text-align: start;\"><strong>中法天文卫星探索宇宙最亮“烟花”</strong></p><p style=\"text-align: center;\"><img src=\"https://p3.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070920230257705.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">伽马暴是除宇宙大爆炸以外，目前已知宇宙中最剧烈的爆发现象，其短时间内能够辐射巨大能量，典型的高能暴发仅持续几毫秒至几十秒，伽马暴涉及从恒星、星系到宇宙学等天体物理学的多个领域。通过观测伽马暴，进一步揭秘来自宇宙更深处以及宇宙诞生之初的科学奥秘。</p><p style=\"text-indent: 2em; text-align: start;\">中法天文卫星中方首席科学家、中国科学院国家天文台首席研究员魏建彦介绍：“伽马（射线）暴是一个恒星演化到它生命终结的时候一个剧烈的能量耀发过程，这个过程它会产生黑洞、产生中子星，同时它会产生剧烈的能量爆发现象，所以研究伽马（射线）暴本身对研究恒星的演化和宇宙的形成和演化非常有意义。”</p><p style=\"text-indent: 2em; text-align: start;\"><strong>中法天文卫星完成载荷开机测试</strong></p><p style=\"text-indent: 2em; text-align: start;\"><br></p><p style=\"text-align: center;\"><img src=\"https://p2.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070920260050774.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">中法天文卫星是两国在空间科学领域开展的重要国际合作项目，也是迄今全球对伽马射线暴开展多波段综合观测能力最强的卫星。搭载的伽马射线监测器6月24日开机后进行了在轨测试，6月27日监测器成功捕捉到了首个伽马射线暴，这是中法天文卫星的首个在轨科学探测成果。经过比对，该伽马射线暴的光变曲线与中国创新X首发星上观测到的结果相同，也和国外费米卫星的观测结果一致。6月29日和7月2日，中法天文卫星再次探测到第二第三个伽马射线暴。首批探测结果充分验证了中法天文卫星对伽马射线暴的高精度触发探测能力，目前卫星搭载的中法双方研制的4台有效载荷均已完成开机测试。</p><p style=\"text-indent: 2em; text-align: start;\">魏建彦表示：“我们这个卫星非常适合来找这类，如果有发现，对推动恒星演化、伽马暴种类（研究），包括来了解我们的超重元素从哪来，天文上有可能通过这类研究得到很好的回答。”</p><p style=\"text-indent: 2em; text-align: start;\">中法天文卫星法方首席科学家贝特朗·科迪尔称：“我们期望每年能够观测到大约70次伽马暴。”</p><p style=\"text-indent: 2em; text-align: start;\"><strong>预计8月将开展科学任务观测测试</strong></p><p style=\"text-align: center;\"><img src=\"https://p3.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070920255069887.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">中法天文卫星将按照在轨测试计划和流程完成各项测试任务，尽快开展载荷标定和业务运行测试，预计8月将开展科学任务观测测试。</p><p style=\"text-indent: 2em; text-align: start;\"><strong>中法在航天领域开展多项务实合作</strong></p><p style=\"text-indent: 2em; text-align: start;\"><br></p><p style=\"text-align: center;\"><img src=\"https://p1.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070920274311892.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">近年来，中法两国在航天领域开展了多项务实合作。2018年，中法联合研制的中法海洋卫星成功发射。2024年，嫦娥六号探测器搭载法国氡气探测仪着陆月球背面。中法天文卫星取得重要成果，也是中法航天领域深度合作的典范。</p>', '[]', 99, 0, 1, 1, 0, '2024-07-09 13:21:07', '2024-07-09 13:21:07');
INSERT INTO `articles` VALUES (10, 2, 3, '洞庭湖一线堤防决口合龙 排涝工作稳步进行', '罗萌，刘亮', '[{\"uid\":\"vc-upload-1720530765808-14\",\"name\":\"31edac26d0cabba782c1ca9833742144.jpg\",\"status\":\"done\",\"percent\":100,\"id\":\"5ba2fae0-17b3-4d72-b1fd-0d3413edfc4e\",\"folderType\":\"5\",\"originalname\":\"2024070920454071880[1].jpg\",\"filename\":\"31edac26d0cabba782c1ca9833742144.jpg\",\"path\":\"uploads/2024-07-09/31edac26d0cabba782c1ca9833742144.jpg\",\"size\":293952,\"type\":\"image/jpeg\",\"url\":\"http://127.0.0.1:8000/uploads/2024-07-09/31edac26d0cabba782c1ca9833742144.jpg\",\"description\":\"\",\"creatorId\":1,\"creatorName\":\"admin\",\"updatedAt\":\"2024-07-09T13:21:57.760Z\",\"createdAt\":\"2024-07-09T13:21:57.760Z\"}]', 'https://dh5.cntv.myalicdn.com/asp/h5e/hls/main/0303000a/3/default/826579055f9c422892a081e7b3f294a4/main.m3u8?maxbr=2048&contentid=15120519184043', '　 央视网消息（新闻联播）：7月8日晚10时30分左右，湖南岳阳华容县团洲垸洞庭湖一线堤防长达226米的决口完成封堵，实现合龙。\n\n　　7月5日下午，湖南岳阳华容县团洲垸洞庭湖一线堤防发生决口，造成垸区被淹。各方抢险救援力量迅速集结，昼夜奋战、水陆并进，持续推进决口封堵工作。\n\n　　接下来，抢险队伍将继续对合龙堤段进行加宽、加高、加固，并进行闭气防渗作业。同时，抽排工作也在持续推进。排涝所需要的各类潜水、电泵等相关设施陆续运送到团洲垸大堤，湖南消防救援队从昨晚（7月8日）开始，在决口附近排涝点展开排涝工作。国家防总办公室、应急管理部紧急从湖北、福建、四川等地调派排涝力量实施跨省区增援，执行积水排涝任务。水利部专家组分析研判封堵后可能存在的风险，并对后续应急处置提出技术方案。', '<p style=\"text-align: start;\">　<strong> 央视网消息</strong>（新闻联播）：7月8日晚10时30分左右，湖南岳阳华容县团洲垸洞庭湖一线堤防长达226米的决口完成封堵，实现合龙。</p><p style=\"text-align: center;\"><img src=\"https://p3.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070920454071880.jpg\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-align: start;\">　　7月5日下午，湖南岳阳华容县团洲垸洞庭湖一线堤防发生决口，造成垸区被淹。各方抢险救援力量迅速集结，昼夜奋战、水陆并进，持续推进决口封堵工作。</p><p style=\"text-align: center;\"><img src=\"https://p4.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070920472962269.jpg\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-align: start;\">　　接下来，抢险队伍将继续对合龙堤段进行加宽、加高、加固，并进行闭气防渗作业。同时，抽排工作也在持续推进。排涝所需要的各类潜水、电泵等相关设施陆续运送到团洲垸大堤，湖南消防救援队从昨晚（7月8日）开始，在决口附近排涝点展开排涝工作。国家防总办公室、应急管理部紧急从湖北、福建、四川等地调派排涝力量实施跨省区增援，执行积水排涝任务。水利部专家组分析研判封堵后可能存在的风险，并对后续应急处置提出技术方案。</p>', '[]', 99, 0, 0, 1, 0, '2024-07-09 13:22:50', '2024-07-09 13:22:50');
INSERT INTO `articles` VALUES (11, 2, 1, '长线游、避暑游、亲子研学游、出入境游……“暑期游”热潮火爆来袭', '刘珊，刘亮', '[]', NULL, '央视网消息：来自文化和旅游部的消息，今年暑期将迎来旅游高峰，全国多地推出一系列旅游产品和主题线路，丰富暑期供给。\n\n在线旅游平台报告显示，今年暑期国内旅游市场保持稳步增长，境内酒店、机票搜索热度均同比上涨20%以上。6月底至7月初、7月中旬、8月中旬是暑期三个出游高峰，国内长线游预订火热，避暑游、亲子游、研学游、文化游等需求增长明显，游客更倾向于选择深度体验、有特色的高品质旅游产品。西北的青海湖和新疆伊犁、阿勒泰，内蒙古呼伦贝尔，西南的云南丽江、大理、香格里拉以及西藏拉萨、林芝等都是暑期出行的热门方向，尤其是近期的“顶流”阿勒泰，出游热度持续升温。\n\n敦煌莫高窟的丝路研学、九寨沟大熊猫基地、三星堆博物馆的探索之旅等体验丰富的研学游产品受欢迎，让学生在旅程中收获知识和乐趣。同时，毕业旅行也拉开序幕，一些准大学生将到北京、上海、西安、南京、天津等高校集中的城市进行“踩点游”。\n播放视频\n画中画\n\n体育赛事带动出境游 入境游同样火爆\n这个暑期，出入境游迎来旺季。\n\n记者从各大旅行社和在线旅游平台了解到，今年暑期，日本、韩国和东南亚仍是出境游热门目的地，同时，美国、英国、澳大利亚、法国、意大利等长线游也颇受欢迎。巴黎奥运会、欧洲杯等体育赛事带动赴欧旅游的订单量增长显著。法国暑期旅游订单量同比增长八成，德国旅游订单量同比增长1.5倍以上。此外，随着直飞航线的开通，巴西、墨西哥、阿根廷等长线目的地也吸引了中国游客。暑期订单量同比增长均超过80%。\n\n此外，暑期的入境游将持续增长。在免签政策、支付便利化等利好因素影响下，海外社交平台逐渐形成了“China Travel”的热潮，吸引了不少外国游客来中国。数据显示，暑期入境旅游订单同比增长1倍，可免签入境中国的法国、意大利、德国、马来西亚、泰国等14国的游客入境游订单整体同比增长1.5倍。\n播放视频\n画中画\n\n苏州博物馆延长开放时间 推出夜游项目\n为应对火热暑期，苏州博物馆本馆延长开放时间至晚八点，并推出夜游项目，吸引众多游客。\n从7月2日至8月31日，苏州多家博物馆将于暑期开放延时服务，每周二至周日晚上延时至8点闭馆。', '<p style=\"text-indent: 2em; text-align: start;\"><strong>央视网消息：</strong>来自文化和旅游部的消息，今年暑期将迎来旅游高峰，全国多地推出一系列旅游产品和主题线路，丰富暑期供给。</p><p style=\"text-align: center;\"><img src=\"https://p5.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070911002176294.jpg\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">在线旅游平台报告显示，今年暑期国内旅游市场保持稳步增长，境内酒店、机票搜索热度均同比上涨20%以上。6月底至7月初、7月中旬、8月中旬是暑期三个出游高峰，国内长线游预订火热，避暑游、亲子游、研学游、文化游等需求增长明显，游客更倾向于选择深度体验、有特色的高品质旅游产品。西北的青海湖和新疆伊犁、阿勒泰，内蒙古呼伦贝尔，西南的云南丽江、大理、香格里拉以及西藏拉萨、林芝等都是暑期出行的热门方向，尤其是近期的“顶流”阿勒泰，出游热度持续升温。</p><p style=\"text-align: center;\"><img src=\"https://p4.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070911002789361.jpg\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">敦煌莫高窟的丝路研学、九寨沟大熊猫基地、三星堆博物馆的探索之旅等体验丰富的研学游产品受欢迎，让学生在旅程中收获知识和乐趣。同时，毕业旅行也拉开序幕，一些准大学生将到北京、上海、西安、南京、天津等高校集中的城市进行“踩点游”。</p><p style=\"text-align: start;\">播放视频</p><p style=\"text-align: start;\">画中画</p><p><br></p><p style=\"text-indent: 2em; text-align: start;\"><strong>体育赛事带动出境游 入境游同样火爆</strong></p><p style=\"text-indent: 2em; text-align: start;\">这个暑期，出入境游迎来旺季。</p><p style=\"text-align: center;\"><img src=\"https://p4.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070911003442426.jpg\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">记者从各大旅行社和在线旅游平台了解到，今年暑期，日本、韩国和东南亚仍是出境游热门目的地，同时，美国、英国、澳大利亚、法国、意大利等长线游也颇受欢迎。巴黎奥运会、欧洲杯等体育赛事带动赴欧旅游的订单量增长显著。法国暑期旅游订单量同比增长八成，德国旅游订单量同比增长1.5倍以上。此外，随着直飞航线的开通，巴西、墨西哥、阿根廷等长线目的地也吸引了中国游客。暑期订单量同比增长均超过80%。</p><p style=\"text-align: center;\"><img src=\"https://p3.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070911004182184.jpg\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">此外，暑期的入境游将持续增长。在免签政策、支付便利化等利好因素影响下，海外社交平台逐渐形成了“China Travel”的热潮，吸引了不少外国游客来中国。数据显示，暑期入境旅游订单同比增长1倍，可免签入境中国的法国、意大利、德国、马来西亚、泰国等14国的游客入境游订单整体同比增长1.5倍。</p><p style=\"text-align: start;\">播放视频</p><p style=\"text-align: start;\">画中画</p><p><br></p><p style=\"text-indent: 2em; text-align: start;\"><strong>苏州博物馆延长开放时间 推出夜游项目</strong></p><p style=\"text-indent: 2em; text-align: start;\">为应对火热暑期，苏州博物馆本馆延长开放时间至晚八点，并推出夜游项目，吸引众多游客。</p><p style=\"text-indent: 2em; text-align: start;\">从7月2日至8月31日，苏州多家博物馆将于暑期开放延时服务，每周二至周日晚上延时至8点闭馆。</p>', '[]', 99, 0, 1, 1, 0, '2024-07-09 13:25:35', '2024-07-09 13:25:35');
INSERT INTO `articles` VALUES (12, 2, 1, '中国昂首阔步走稳走好高质量发展道路 让人民的获得感成色更足', '央视网', '[]', NULL, '央视网消息：7月9日，《新闻联播》报道了黄河水利工程建设、生态保护、对外开放以及电影产业发展等方面的消息，中国式现代化展现出万千气象，不断取得新成绩，人民获得感满满，美好的生活愿景正在不断变成实景。\n黄河古贤水利枢纽工程进入建设阶段\n7月9日，随着黄河古贤水利枢纽工程导流洞支洞掘进施工，标志着这项黄河干流关键控制性工程已进入建设阶段。\n\n古贤工程位于黄河中游大峡谷河段，左岸为山西省吉县，右岸为陕西省宜川县，是黄河水沙调控体系的核心工程和国家水网的重要节点工程。\n\n\n建设古贤工程是破解小浪底水库调水调沙后续动力不足、充分发挥水沙调控体系整体合力、完善水沙调控机制的关键一环。工程坝址可控制黄河流域73%的水量、60%的沙量和80%的粗泥沙量。\n\n《生态环境分区管控管理暂行规定》发布\n生态环境部7月9日发布《生态环境分区管控管理暂行规定》，指导地方进一步落实生态保护红线、环境质量底线、资源利用上线的硬约束，科学确定各省区市重点区域的生态环境准入清单，指导各类开发保护建设活动，推动以高水平保护服务经济社会高质量发展。\n\n中国—南亚博览会7月23日至28日在昆明举行\n记者从国务院新闻办公室7月9日举行的新闻发布会上了解到，第八届中国—南亚博览会将于7月23日至28日在云南昆明举行。目前，已有境外81个国家、地区和国际组织，境内27个省份确认参展参会。\n\n第五届中非地方政府合作论坛在广州举行\n7月9日，第五届中非地方政府合作论坛在广州举行。论坛主题为“为共筑高水平中非命运共同体贡献地方力量”，下设产业合作、绿色创新、人才培养三个议题。\n\n“电影的夏天”2024暑期档电影片单发布\n“电影的夏天”2024年暑期档电影片单7月9日发布。发布分为“中国精神 光影赓续”“中国故事 光影抒写”“中国美学 光影绘就”“中国创新 光影探索”和“中国市场 全球共享”五大主题单元，一批类型丰富、题材多元的国内外优秀影片在暑期陆续登陆全国电影院线。\n全面深化改革 中国式现代化展现万千气象\n大美青海，新潮涌动；创新甘肃，活力迸发。让我们一起走进青海、甘肃，一起看看今日中国的发展画卷。', '<p style=\"text-indent: 2em; text-align: justify;\"><strong>央视网消息：</strong>7月9日，《新闻联播》报道了黄河水利工程建设、生态保护、对外开放以及电影产业发展等方面的消息，中国式现代化展现出万千气象，不断取得新成绩，人民获得感满满，美好的生活愿景正在不断变成实景。</p><p style=\"text-indent: 2em; text-align: justify;\"><strong>黄河古贤水利枢纽工程进入建设阶段</strong></p><p style=\"text-indent: 2em; text-align: justify;\">7月9日，随着黄河古贤水利枢纽工程导流洞支洞掘进施工，标志着这项黄河干流关键控制性工程已进入建设阶段。</p><p style=\"text-align: center;\"><img src=\"https://p4.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070920151999521.png\" alt=\"\" data-href=\"\" style=\"width: auto;\"></p><p style=\"text-indent: 2em; text-align: justify;\">古贤工程位于黄河中游大峡谷河段，左岸为山西省吉县，右岸为陕西省宜川县，是黄河水沙调控体系的核心工程和国家水网的重要节点工程。<br></p><p style=\"text-align: center;\"><img src=\"https://p5.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070920152678638.png\" alt=\"\" data-href=\"\" style=\"width: auto;\"></p><p style=\"text-indent: 2em; text-align: justify;\">建设古贤工程是破解小浪底水库调水调沙后续动力不足、充分发挥水沙调控体系整体合力、完善水沙调控机制的关键一环。工程坝址可控制黄河流域73%的水量、60%的沙量和80%的粗泥沙量。<br></p><p style=\"text-indent: 2em; text-align: justify;\"><strong>《生态环境分区管控管理暂行规定》发布</strong></p><p style=\"text-indent: 2em; text-align: justify;\">生态环境部7月9日发布《生态环境分区管控管理暂行规定》，指导地方进一步落实生态保护红线、环境质量底线、资源利用上线的硬约束，科学确定各省区市重点区域的生态环境准入清单，指导各类开发保护建设活动，推动以高水平保护服务经济社会高质量发展。</p><p style=\"text-align: center;\"><img src=\"https://p1.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070920153311801.png\" alt=\"\" data-href=\"\" style=\"width: auto;\"></p><p style=\"text-indent: 2em; text-align: justify;\"><strong>中国—南亚博览会7月23日至28日在昆明举行</strong></p><p style=\"text-indent: 2em; text-align: justify;\">记者从国务院新闻办公室7月9日举行的新闻发布会上了解到，第八届中国—南亚博览会将于7月23日至28日在云南昆明举行。目前，已有境外81个国家、地区和国际组织，境内27个省份确认参展参会。</p><p style=\"text-align: center;\"><img src=\"https://p4.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070920153823203.png\" alt=\"\" data-href=\"\" style=\"width: auto;\"></p><p style=\"text-indent: 2em; text-align: justify;\"><strong>第五届中非地方政府合作论坛在广州举行</strong></p><p style=\"text-indent: 2em; text-align: justify;\">7月9日，第五届中非地方政府合作论坛在广州举行。论坛主题为“为共筑高水平中非命运共同体贡献地方力量”，下设产业合作、绿色创新、人才培养三个议题。</p><p style=\"text-align: center;\"><img src=\"https://p1.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070920154620066.png\" alt=\"\" data-href=\"\" style=\"width: auto;\"></p><p style=\"text-indent: 2em; text-align: justify;\"><strong>“电影的夏天”2024暑期档电影片单发布</strong></p><p style=\"text-indent: 2em; text-align: justify;\">“电影的夏天”2024年暑期档电影片单7月9日发布。发布分为“中国精神 光影赓续”“中国故事 光影抒写”“中国美学 光影绘就”“中国创新 光影探索”和“中国市场 全球共享”五大主题单元，一批类型丰富、题材多元的国内外优秀影片在暑期陆续登陆全国电影院线。</p><p style=\"text-indent: 2em; text-align: justify;\"><strong>全面深化改革 中国式现代化展现万千气象</strong></p><p style=\"text-indent: 2em; text-align: justify;\">大美青海，新潮涌动；创新甘肃，活力迸发。让我们一起走进青海、甘肃，一起看看今日中国的发展画卷。</p>', '[]', 99, 0, 0, 0, 0, '2024-07-09 13:26:54', '2024-07-09 13:26:54');
INSERT INTO `articles` VALUES (13, 2, 1, '一套丝滑“连招” 让众多外国游客惊叹“好city的中国”', '及玥，刘亮', '[]', NULL, '央视网消息：扩大72/144小时过境免签政策适用国家范围、放宽口岸签证办理条件等一系列便利外籍人员来华政策接连推出，吸引来自世界各地的游客，点燃“China Travel”热潮，“好city的中国”让众多外国游客惊叹，持续带火了中国入境游市场，随着便利措施提质升级，外国游客来华旅游越来越“丝滑”。\n72/144小时过境免签 “说走就走”很OK\n\n在72/144小时过境免签政策的加持下，拿起护照，说走就走，丝滑的入境体验让越来越多的外国游客热衷中国旅游。\n外籍旅客：“得益于免签政策，我们不用再受各种手续之累，好极了！”\n今年深圳机场口岸入境外国游客大幅增长\n\n据深圳机场边检站统计，截至7月5日，今年以来深圳机场口岸出入境外国人近50万人次，同比增长209%。其中入境外国人近24.5万人次，同比增长197%，来自法国、德国等免签国家的游客明显增多，同比增长292%。\n外籍游客：“我们可以想来就来，我们对于新出的免签政策感到非常开心。”\n“China Travel”热潮成外国博主流量密码\n\n随着“China Travel”热潮成为不少外国视频博主的流量密码，网络热词“City不City？”走红社交媒体，中英文结合的文化交流梗，让City从名词逐渐演变成对事物感到刺激、舒适、赞美等形容词。\n\n旅居广州英国人：“通过‘City不City啊？’这种表达，可以更好连接、吸引国外和中国的观众。（过境免签政策）让旅游更便捷，他们只需要订一张机票就可以来旅游，我认为这是一个非常好的政策。”\n中国72/144小时过境免签适用范围增至54国\n\n\n\n去年12月以来，中国72/144小时过境免签政策适用国家范围增至54国，今年以来，外籍游客来华人数大幅增长，直接带火了中国入境游市场。国家移民管理局数据显示，今年上半年全国各口岸入境外国人1463.5万人次，同比增长152.7%，其中通过免签入境854.2万人次，同比增长190.1%。\n澳大利亚籍旅客奥布赖恩：“任何时候我都能想来就来，想走就走， 我想就可以离开澳大利亚过来看我的孙女。”\n持续优化签证 外国人在中国旅行更方便\n\n为方便外籍人士入境，国家移民管理局不断放宽口岸签证办理条件，在国际航线较多、外籍人员入境量较大的口岸均已开展口岸签证业务，覆盖73个城市的100个对外开放口岸。随着中国优化签证政策等便利中外人员往来的系列举措不断出台，外国游客来华旅游将更加“丝滑”，越来越多国家的民众将更加全面、深入地了解中国。', '<p style=\"text-indent: 2em; text-align: start;\"><strong>央视网消息：</strong>扩大72/144小时过境免签政策适用国家范围、放宽口岸签证办理条件等一系列便利外籍人员来华政策接连推出，吸引来自世界各地的游客，点燃“China Travel”热潮，“好city的中国”让众多外国游客惊叹，持续带火了中国入境游市场，随着便利措施提质升级，外国游客来华旅游越来越“丝滑”。</p><p style=\"text-indent: 2em; text-align: start;\"><strong>72/144小时过境免签 “说走就走”很OK</strong></p><p style=\"text-align: center;\"><img src=\"https://p4.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070919155342218.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">在72/144小时过境免签政策的加持下，拿起护照，说走就走，丝滑的入境体验让越来越多的外国游客热衷中国旅游。</p><p style=\"text-indent: 2em; text-align: start;\">外籍旅客：“得益于免签政策，我们不用再受各种手续之累，好极了！”</p><p style=\"text-indent: 2em; text-align: start;\"><strong>今年深圳机场口岸入境外国游客大幅增长</strong></p><p style=\"text-align: center;\"><img src=\"https://p4.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070919195537518.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">据深圳机场边检站统计，截至7月5日，今年以来深圳机场口岸出入境外国人近50万人次，同比增长209%。其中入境外国人近24.5万人次，同比增长197%，来自法国、德国等免签国家的游客明显增多，同比增长292%。</p><p style=\"text-indent: 2em; text-align: start;\">外籍游客：“我们可以想来就来，我们对于新出的免签政策感到非常开心。”</p><p style=\"text-indent: 2em; text-align: start;\"><strong>“China Travel”热潮成外国博主流量密码</strong><br></p><p style=\"text-indent: 2em; text-align: start;\">随着“China Travel”热潮成为不少外国视频博主的流量密码，网络热词“City不City？”走红社交媒体，中英文结合的文化交流梗，让City从名词逐渐演变成对事物感到刺激、舒适、赞美等形容词。</p><p style=\"text-align: center;\"><img src=\"https://p1.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070919205781927.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">旅居广州英国人：“通过‘City不City啊？’这种表达，可以更好连接、吸引国外和中国的观众。（过境免签政策）让旅游更便捷，他们只需要订一张机票就可以来旅游，我认为这是一个非常好的政策。”</p><p style=\"text-indent: 2em; text-align: start;\"><strong>中国72/144小时过境免签适用范围增至54国</strong><br></p><p style=\"text-indent: 2em; text-align: start;\"><br></p><p style=\"text-align: center;\"><img src=\"https://p2.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070919215772481.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">去年12月以来，中国72/144小时过境免签政策适用国家范围增至54国，今年以来，外籍游客来华人数大幅增长，直接带火了中国入境游市场。国家移民管理局数据显示，今年上半年全国各口岸入境外国人1463.5万人次，同比增长152.7%，其中通过免签入境854.2万人次，同比增长190.1%。</p><p style=\"text-indent: 2em; text-align: start;\">澳大利亚籍旅客奥布赖恩：“任何时候我都能想来就来，想走就走， 我想就可以离开澳大利亚过来看我的孙女。”</p><p style=\"text-indent: 2em; text-align: start;\"><strong>持续优化签证 外国人在中国旅行更方便</strong></p><p style=\"text-align: center;\"><img src=\"https://p2.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070919225234476.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">为方便外籍人士入境，国家移民管理局不断放宽口岸签证办理条件，在国际航线较多、外籍人员入境量较大的口岸均已开展口岸签证业务，覆盖73个城市的100个对外开放口岸。随着中国优化签证政策等便利中外人员往来的系列举措不断出台，外国游客来华旅游将更加“丝滑”，越来越多国家的民众将更加全面、深入地了解中国。</p>', '[]', 99, 0, 1, 1, 0, '2024-07-09 13:27:42', '2024-07-09 13:27:42');
INSERT INTO `articles` VALUES (14, 2, 1, '【新思想引领新时代改革开放】“创新中国” 逐梦新征程', '央视网', '[]', NULL, '　　央视网消息（新闻联播）：习近平总书记指出，“中国式现代化要靠科技现代化作支撑，实现高质量发展要靠科技创新培育新动能”。党的十八大以来，以习近平同志为核心的党中央，统筹把握中华民族伟大复兴战略全局和世界百年未有之大变局，部署推进一系列重大科技发展和改革举措，走出了一条从人才强、科技强，到产业强、经济强、国家强的发展道路。\n\n　　今天的中国，创新动力、发展活力勃发奔涌，到处都是日新月异的创造。\n　　万米海底，“奋斗者”号完成深潜；大山深处，“中国天眼”巡天观测；碧海之中，国产大型邮轮实现首航；万米高空，国产大飞机C919投入商业运营；浩瀚太空，嫦娥奔月书写人类探月新篇章……一个个重大科技创新成果不断涌现。\n　　全球创新指数排名跃升至第12位，成功进入创新型国家行列，研发人员总量和专利合作条约国际专利申请量均居世界首位，科技进步贡献率超过60%。\n　　我国用几十年的时间走完了西方发达国家几百年走过的工业化历程，建成全球最完整、规模最大的研发体系和工业体系，生产力水平和科技创新能力大幅提升。\n\n　　时间回到十年前，从全球范围看，新一轮科技革命和产业变革正在孕育兴起，科学技术越来越成为推动经济社会发展的主要力量。从国内看，虽然我国经济总量跃居世界第二，但经济发展不少领域大而不强、大而不优，长期以来主要依靠资源、资本、劳动力等要素投入支撑经济增长和规模扩张的方式已不可持续，中国发展正面临着动力转变、方式转变、结构调整的繁重任务。\n　　面对国际国内的严峻挑战，站在新的历史起点，习近平总书记提出“实施创新驱动发展战略”，强调“科技创新是提高社会生产力和综合国力的战略支撑，必须摆在国家发展全局的核心位置”，要“破除一切束缚创新驱动发展的观念和体制机制障碍”。\n\n　　新思想的光芒，照亮崭新的时代。\n　　习近平总书记的脚步一次次踏入创新要素最活跃的地方。\n　　在科研院所里，总书记指出，要瞄准世界科技前沿，抓住大趋势，下好“先手棋”，实现前瞻性基础研究、引领性原创成果重大突破；在全国两会上，总书记强调“围绕产业链部署创新链，消除科技创新中的‘孤岛现象’，使创新成果更快转化为现实生产力”；在地方调研时，总书记希冀科技工作者“要增强科技创新的紧迫感和使命感，把科技创新摆到更加重要位置，踢好‘临门一脚’”；在企业考察时，总书记提出，“技术创新是企业的命根子。拥有自主知识产权和核心技术，才能生产具有核心竞争力的产品，才能在激烈的竞争中立于不败之地”。\n\n　　当前，高技术领域成为国际竞争的前沿阵地和主战场，深刻重塑全球秩序和发展格局。2023年，面对新的国内外形势，习近平总书记敏锐洞悉时代所需、发展所急、大势所趋，创造性提出发展新质生产力重大论断，强调必须做好创新这篇大文章，推动新质生产力加快发展。深刻揭示科技创新与发展新质生产力的关系。\n　　在方向上精心规划布局，在路径上精确落子施策。\n　　创新中国坚定前行，按下改革快进键。《深化科技体制改革实施方案》提出143项改革措施，向多年束缚创新的藩篱动真格；坚持科技创新和制度创新“双轮驱动”，着力解决谁来创新、如何激发创新动力等问题。完善科研经费管理、科技成果转化、科技人才评价等方面的体制机制，让更多的创新主体踊跃发明创造。\n\n　　瞄准世界科技前沿和国家重大需求，集中力量实现“从0到1”重大突破，解决一批影响和制约国家发展全局和长远利益的“卡脖子”关键核心技术，实现原始性引领性创新。\n　　聚焦现代化产业体系建设的重点领域和薄弱环节，针对集成电路、工业母机、先进材料、科研仪器等瓶颈制约加大技术研发，为确保重要产业链供应链自主安全可控提供科技支撑。\n　　一系列举措密集落地，重点领域和关键环节的改革取得实质性突破，极大释放创新引擎的动能。\n\n　　十年来，我国在全球创新版图中的地位不断提升。\n　　科技投入逐年递增。2012年至2023年，全社会研发经费从1.03万亿元增长到3.3万亿元；研发人员全时当量由2012年的324.7万人年提高到2022年的635.4万人年，稳居世界首位。\n　　重大科技创新成果不断涌现。量子科技、生命科学等基础前沿研究领域取得一批重大原创成果。载人航天、空间站建设、载人深潜等战略高技术领域取得系列重要成果。\n\n　　国家战略科技力量加快布局，优化重组国家重点实验室，组织实施重点领域产学研协同攻关，聚集培养高水平人才和创新团队。\n　　创新驱动发展效果凸显：传统行业加快转型升级，新兴产业蓬勃发展，未来产业布局建设，科技创新为高质量发展安上新引擎。\n　　科技兴则民族兴，科技强则国家强。\n\n　　创新的中国风华正茂。在以习近平同志为核心的党中央引领下，一个朝气蓬勃的创新中国正在新时代航程中乘风破浪，向着科技强国的目标奋勇前进！', '<p style=\"text-align: justify;\">　　<strong>央视网消息</strong>（新闻联播）：习近平总书记指出，“中国式现代化要靠科技现代化作支撑，实现高质量发展要靠科技创新培育新动能”。党的十八大以来，以习近平同志为核心的党中央，统筹把握中华民族伟大复兴战略全局和世界百年未有之大变局，部署推进一系列重大科技发展和改革举措，走出了一条从人才强、科技强，到产业强、经济强、国家强的发展道路。</p><p style=\"text-align: center;\"><img src=\"https://p2.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070920290541979.jpg\" alt=\"\" data-href=\"\" style=\"width: auto;\"></p><p style=\"text-align: justify;\">　　今天的中国，创新动力、发展活力勃发奔涌，到处都是日新月异的创造。</p><p style=\"text-align: justify;\">　　万米海底，“奋斗者”号完成深潜；大山深处，“中国天眼”巡天观测；碧海之中，国产大型邮轮实现首航；万米高空，国产大飞机C919投入商业运营；浩瀚太空，嫦娥奔月书写人类探月新篇章……一个个重大科技创新成果不断涌现。</p><p style=\"text-align: justify;\">　　全球创新指数排名跃升至第12位，成功进入创新型国家行列，研发人员总量和专利合作条约国际专利申请量均居世界首位，科技进步贡献率超过60%。</p><p style=\"text-align: justify;\">　　我国用几十年的时间走完了西方发达国家几百年走过的工业化历程，建成全球最完整、规模最大的研发体系和工业体系，生产力水平和科技创新能力大幅提升。</p><p style=\"text-align: center;\"><img src=\"https://p4.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070920294914592.jpg\" alt=\"\" data-href=\"\" style=\"width: auto;\"></p><p style=\"text-align: justify;\">　　时间回到十年前，从全球范围看，新一轮科技革命和产业变革正在孕育兴起，科学技术越来越成为推动经济社会发展的主要力量。从国内看，虽然我国经济总量跃居世界第二，但经济发展不少领域大而不强、大而不优，长期以来主要依靠资源、资本、劳动力等要素投入支撑经济增长和规模扩张的方式已不可持续，中国发展正面临着动力转变、方式转变、结构调整的繁重任务。</p><p style=\"text-align: justify;\">　　面对国际国内的严峻挑战，站在新的历史起点，习近平总书记提出“实施创新驱动发展战略”，强调“科技创新是提高社会生产力和综合国力的战略支撑，必须摆在国家发展全局的核心位置”，要“破除一切束缚创新驱动发展的观念和体制机制障碍”。</p><p style=\"text-align: center;\"><img src=\"https://p1.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070920375456275.jpg\" alt=\"\" data-href=\"\" style=\"width: auto;\"></p><p style=\"text-align: justify;\">　　新思想的光芒，照亮崭新的时代。</p><p style=\"text-align: justify;\">　　习近平总书记的脚步一次次踏入创新要素最活跃的地方。</p><p style=\"text-align: justify;\">　　在科研院所里，总书记指出，要瞄准世界科技前沿，抓住大趋势，下好“先手棋”，实现前瞻性基础研究、引领性原创成果重大突破；在全国两会上，总书记强调“围绕产业链部署创新链，消除科技创新中的‘孤岛现象’，使创新成果更快转化为现实生产力”；在地方调研时，总书记希冀科技工作者“要增强科技创新的紧迫感和使命感，把科技创新摆到更加重要位置，踢好‘临门一脚’”；在企业考察时，总书记提出，“技术创新是企业的命根子。拥有自主知识产权和核心技术，才能生产具有核心竞争力的产品，才能在激烈的竞争中立于不败之地”。</p><p style=\"text-align: center;\"><img src=\"https://p3.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070920312023429.jpg\" alt=\"\" data-href=\"\" style=\"width: auto;\"></p><p style=\"text-align: justify;\">　　当前，高技术领域成为国际竞争的前沿阵地和主战场，深刻重塑全球秩序和发展格局。2023年，面对新的国内外形势，习近平总书记敏锐洞悉时代所需、发展所急、大势所趋，创造性提出发展新质生产力重大论断，强调必须做好创新这篇大文章，推动新质生产力加快发展。深刻揭示科技创新与发展新质生产力的关系。</p><p style=\"text-align: justify;\">　　在方向上精心规划布局，在路径上精确落子施策。</p><p style=\"text-align: justify;\">　　创新中国坚定前行，按下改革快进键。《深化科技体制改革实施方案》提出143项改革措施，向多年束缚创新的藩篱动真格；坚持科技创新和制度创新“双轮驱动”，着力解决谁来创新、如何激发创新动力等问题。完善科研经费管理、科技成果转化、科技人才评价等方面的体制机制，让更多的创新主体踊跃发明创造。</p><p style=\"text-align: center;\"><img src=\"https://p5.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070920323717980.jpg\" alt=\"\" data-href=\"\" style=\"width: auto;\"></p><p style=\"text-align: justify;\">　　瞄准世界科技前沿和国家重大需求，集中力量实现“从0到1”重大突破，解决一批影响和制约国家发展全局和长远利益的“卡脖子”关键核心技术，实现原始性引领性创新。</p><p style=\"text-align: justify;\">　　聚焦现代化产业体系建设的重点领域和薄弱环节，针对集成电路、工业母机、先进材料、科研仪器等瓶颈制约加大技术研发，为确保重要产业链供应链自主安全可控提供科技支撑。</p><p style=\"text-align: justify;\">　　一系列举措密集落地，重点领域和关键环节的改革取得实质性突破，极大释放创新引擎的动能。</p><p style=\"text-align: center;\"><img src=\"https://p2.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070920332643842.jpg\" alt=\"\" data-href=\"\" style=\"width: auto;\"></p><p style=\"text-align: justify;\">　　十年来，我国在全球创新版图中的地位不断提升。</p><p style=\"text-align: justify;\">　　科技投入逐年递增。2012年至2023年，全社会研发经费从1.03万亿元增长到3.3万亿元；研发人员全时当量由2012年的324.7万人年提高到2022年的635.4万人年，稳居世界首位。</p><p style=\"text-align: justify;\">　　重大科技创新成果不断涌现。量子科技、生命科学等基础前沿研究领域取得一批重大原创成果。载人航天、空间站建设、载人深潜等战略高技术领域取得系列重要成果。</p><p style=\"text-align: center;\"><img src=\"https://p5.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070920343053355.jpg\" alt=\"\" data-href=\"\" style=\"width: auto;\"></p><p style=\"text-align: justify;\">　　国家战略科技力量加快布局，优化重组国家重点实验室，组织实施重点领域产学研协同攻关，聚集培养高水平人才和创新团队。</p><p style=\"text-align: justify;\">　　创新驱动发展效果凸显：传统行业加快转型升级，新兴产业蓬勃发展，未来产业布局建设，科技创新为高质量发展安上新引擎。</p><p style=\"text-align: justify;\">　　科技兴则民族兴，科技强则国家强。</p><p style=\"text-align: center;\"><img src=\"https://p5.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070920364387056.jpg\" alt=\"\" data-href=\"\" style=\"width: auto;\"></p><p style=\"text-align: justify;\">　　创新的中国风华正茂。在以习近平同志为核心的党中央引领下，一个朝气蓬勃的创新中国正在新时代航程中乘风破浪，向着科技强国的目标奋勇前进！</p>', '[]', 99, 0, 0, 1, 0, '2024-07-09 13:28:23', '2024-07-09 13:28:23');
INSERT INTO `articles` VALUES (15, 2, 1, '暑期出行提醒！网红“野生景点”有风险 跟风“打卡”需谨慎', '及玥，刘亮', '[]', NULL, '央视网消息：夏日酷暑，游水、溯溪成为不少人、尤其是学生一起出去游玩的选择，特别是一些社交平台的网红攻略，一些所谓的“小众宝藏”的“野生景点”受到了年轻人的追捧。户外救援专业人士表示，这些地方存在不少安全隐患。\n\n在一些社交平台上，广州北部这处景点被形容为“世外桃源”“广东秘境”，看起来十分吸引人，“免费”更是一大引流点。记者和广州蓝天救援协会的教练一起前往这条徒步溯溪路线实地了解发现，这个“野生景点”的路前半段多是泥路、碎石路，草木茂盛，平时会有工作人员出入，而后半段则是野路，要行经溪水碎石路，才能到达网红“景点”，溪水深度没过脚腕。在这段路的入口处，有一块十分醒目的黄色提示牌，上面写着“岩洞已封闭，严禁进入。”但在多位网友发布的攻略中，都隐去了这个信息，对可能存在的风险隐患也避重就轻。另外记者留意到，这条路线手机全程没有信号，如果发生意外，难以用电话和外界取得联络。沿途记者还遇到了来这里游玩的市民。\n广东广州市民：“尝试一下野外，徒步进来看看。”\n记者：“网上是怎么说的？你们想找什么景点？”\n广东广州市民：“有瀑布的地方。”\n\n广州蓝天救援协会教练梁永健介绍：“我们行走的地方是溪流，不知道上游会不会发大水，一定要留意天气情况。现在天气比较炎热，一些蛇也比较喜欢待在潮湿阴凉的地方避暑。”\n\n位于白云区的六片山有处水体呈蓝绿色的水塘，在社交平台被称为“广州的蓝眼泪”，部分网友发布的内容，把这里营造成“天然水上乐园”。但记者在现场看到，这处水塘周边建有围栏，多处张贴“禁止翻越下水”的提醒，喇叭提示声也在山间循环响起，但依旧有野泳客翻越围栏下水。\n野泳者：“我们都游了十几年了，最深20多米，前段时间也有出事。”\n记者：“你们不害怕吗？”\n野泳者：“不会。”\n暑假期间，户外游热度持续上升，但“安全意识”不能放松。目前，多个社交平台上线了风险地点提示、举报等功能。', '<p style=\"text-indent: 2em; text-align: start;\"><strong>央视网消息：夏日酷暑，游水、溯溪成为不少人、尤其是学生一起出去游玩的选择，特别是一些社交平台的网红攻略，一些所谓的“小众宝藏”的“野生景点”受到了年轻人的追捧。户外救援专业人士表示，这些地方存在不少安全隐患。</strong></p><p style=\"text-align: center;\"><img src=\"https://p3.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070918455240312.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">在一些社交平台上，广州北部这处景点被形容为“世外桃源”“广东秘境”，看起来十分吸引人，“免费”更是一大引流点。记者和广州蓝天救援协会的教练一起前往这条徒步溯溪路线实地了解发现，这个“野生景点”的路前半段多是泥路、碎石路，草木茂盛，平时会有工作人员出入，而后半段则是野路，要行经溪水碎石路，才能到达网红“景点”，溪水深度没过脚腕。在这段路的入口处，有一块十分醒目的黄色提示牌，上面写着“岩洞已封闭，严禁进入。”但在多位网友发布的攻略中，都隐去了这个信息，对可能存在的风险隐患也避重就轻。另外记者留意到，这条路线手机全程没有信号，如果发生意外，难以用电话和外界取得联络。沿途记者还遇到了来这里游玩的市民。</p><p style=\"text-indent: 2em; text-align: start;\">广东广州市民：“尝试一下野外，徒步进来看看。”</p><p style=\"text-indent: 2em; text-align: start;\">记者：“网上是怎么说的？你们想找什么景点？”</p><p style=\"text-indent: 2em; text-align: start;\">广东广州市民：“有瀑布的地方。”</p><p style=\"text-align: center;\"><img src=\"https://p4.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070918473461326.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">广州蓝天救援协会教练梁永健介绍：“我们行走的地方是溪流，不知道上游会不会发大水，一定要留意天气情况。现在天气比较炎热，一些蛇也比较喜欢待在潮湿阴凉的地方避暑。”</p><p style=\"text-align: center;\"><img src=\"https://p3.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070918472078154.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">位于白云区的六片山有处水体呈蓝绿色的水塘，在社交平台被称为“广州的蓝眼泪”，部分网友发布的内容，把这里营造成“天然水上乐园”。但记者在现场看到，这处水塘周边建有围栏，多处张贴“禁止翻越下水”的提醒，喇叭提示声也在山间循环响起，但依旧有野泳客翻越围栏下水。</p><p style=\"text-indent: 2em; text-align: start;\">野泳者：“我们都游了十几年了，最深20多米，前段时间也有出事。”</p><p style=\"text-indent: 2em; text-align: start;\">记者：“你们不害怕吗？”</p><p style=\"text-indent: 2em; text-align: start;\">野泳者：“不会。”</p><p style=\"text-indent: 2em; text-align: start;\">暑假期间，户外游热度持续上升，但“安全意识”不能放松。目前，多个社交平台上线了风险地点提示、举报等功能。</p>', '[]', 99, 0, 0, 0, 0, '2024-07-09 13:29:43', '2024-07-09 13:29:43');
INSERT INTO `articles` VALUES (16, 2, 1, '何以中国·运载千秋｜护我安澜 运河新景映欣颜', '王玉西，刘亮', '[]', NULL, '　　千里通波，舟楫如梭。\n　　中国大运河南起浙江，北至北京，途径8个省级行政区，沟通5大河流水系。运河流经地，往往人口稠密、繁华富庶。涛声帆影间，翻涌着无数动人的人间烟火故事。\n　　喝着大运河的水长大，在大运河上跑船养家，沿着大运河去往更大的世界……在中国大运河申遗成功10周年之际，“何以中国·运载千秋”网络主题宣传活动在江苏扬州举办。来自浙江、山东、江苏的三位运河人讲述了人河共生的故事。\n\n　　三位运河人在“何以中国·运载千秋”网络主题宣传活动现场讲述。人民视频供图\n　　岸清景明 出行更舒心\n　　3块钱即可从浙江杭州武林门码头乘坐运河水上巴士到拱宸桥。沿途往来货运船只络绎不绝，运河街景尽收眼底，古韵悠长的水乡风光与繁华热闹的现代都市交织成趣。\n　　为缓解市区道路交通拥堵问题，2004年，杭州开通水上公交巴士，成为全国第一个开通市区运河水上公交的城市。2005年，水上巴士线路增加了“西湖号”，薛鑫坤担任船长。\n　　“大运河是生命之河，滋养了我们全家人。”薛鑫坤动情地表示，祖父母、父母和自己三代人都是开了一辈子船的船工。在船上长大的他，从货运小工变成第一批水上公交司机。\n　　薛鑫坤见证了大运河生态环境的改善。2003年，杭州成立京杭运河（杭州段）综合保护委员会；2006年，针对大运河的综合保护管理和周边生态环境治理，杭州采取了编制条例、修复生态等一系列措施；2017年，杭州对大运河进行分类分段分级保护管理，大运河环境治理从水环境整治延伸到多方面综合保护。据浙江省生态环境厅通报，2020年运河杭州段总体水质状况为优。\n　　“眼见着运河的水变清了，风景变美了，文化长廊一步一景，外地游客最喜欢坐水上巴士了。”薛鑫坤说，20年过去，大运河重新焕发生机。\n　　如今的水上巴士，不只是交通工程，也是杭州的风景线。薛鑫坤回忆，水上巴士开通之初最高峰乘坐人数在千人以上。如今，每逢节假日水上巴士日均乘坐人数可达8000人次。\n　　杭州水陆交旅发展集团总经理助理李林蔚介绍，为了推进水上交旅融合发展，增加大客位数的船舶，建设综合水上客运中心，投入绿色新能源船舶，不断拓展新的旅游路线。2023年，运河水上巴士游客量同比增长超180%，达到120万人次。\n　　水深道宽 货运更高效\n　　“两千吨级的集装箱船，北斗导航，探测仪配齐，六七级大风天照样跑。”说起新换的船，来自山东济宁的杨杰伟言语中不无骄傲。\n　　杨杰伟是在大运河上从事航运业20多年的“跑船人”。微山湖是山东最大淡水湖泊，也是京杭大运河的主航道。杨杰伟的乡亲们大多从事水运行业，在运河航线上往返。他记得，爷爷辈最常见的是木船，父亲辈换成了载重80多吨的水泥船，再后来是载重200到400多吨的铁船......\n　　为减少航运货物对运河水质造成的污染，推动绿色发展，提高运输效率，优化运输结构，济宁鼓励更换集装箱货轮，并给予相应政策支持。借此机会，杨杰伟和弟弟贷款购买了一艘大型集装箱货轮。除了先进的航船设备一应俱全，新船上还配备了空调、冰箱等生活设施。\n　　“2000多年前，大运河上跑的可能是10来吨的小木船，现在跑的是千吨级的集装箱货轮。从古至今，大运河河道一直在升级改造，加深加宽。”杨杰伟说。\n　　2022年，济宁共计完成201.3公里高等级航道改造提升，可通航2000吨级船舶、万吨级船队。京杭大运河济宁段1000吨至2000吨级船型实载率可提升近60%，2000吨级提升近30%，每年可节省直接物流成本近10亿元，减少航运油耗约15万吨。\n　　为保障船舶的航行安全和效益，京杭大运河沿线各地建成了保证船舶24小时通航的航道设备。济宁段推出的“鲁船通”App报闸系统将船闸单闸运行时间缩短至42分钟，船舶通航效率大幅提升。\n　　“从山东济宁到江苏太仓要过12道闸，15天路程变成了5天，节省的时间就是金钱。”杨杰伟表示，现在的船闸系统很智能，在手机上就可以完成过闸手续，大大缩短了时间。\n　　常年在河上“跑”，以船为家的杨杰伟感受到运河多年来的变化，“河道宽了、深了，河水越来越清了，两岸的生态绿化做得非常好，高楼大厦越来越多。”他对未来充满希望：“我们一家的日子就像这条大运河一样，越跑路越宽！\n　　退捕转型 渔民闯新路\n　　“骆马湖的夜里，我们凑在一条大船上演奏，听到琴声，很多渔民从10里外划着小木船来听，有时一聚就有上百条船。呼啦一大片，渔火点点，琴声悠扬......”做渔民时召集伙伴，凑在大船上唱歌演奏的欢乐时光，江苏徐州新沂市窑湾古镇渔民艺术团团长沈召明至今记忆犹新。\n　　窑湾古镇位于京杭大运河与骆马湖交汇处，因“运”而生，发展成为大运河上的重要码头和商贸重镇，有“黄金水道金三角”之称。因水位落差较大，船舶不宜夜行，停泊此处补给。南来北往的船工、渔民聚集于此，唱起各自的家乡戏。长久的熏陶使得沈召明成了戏迷，他常到岸上看电影，学唱歌。\n　　“打记事起就知道逮鱼摸虾、下钩下网，每天都要干活。”沈召明祖孙四代都在运河上以捕鱼为生。船上生活枯燥，从小爱唱歌、吹笛子的沈召明组建起渔民乐队，吼两嗓子唱首歌，拿着乐器拉曲子。“时间长了逐渐固定下来七八个人，爱唱的歌像《一条大河》《洪湖水浪打浪》《小小竹排江中游》，都是跟水有关的。”\n　　随着经济的发展，靠水吃水的传统渔业生产模式迎来变化。2013年6月，四部委联合印发指导意见，提出“力争用3年时间实现以船为家渔民上岸安居，改善以船为家渔民居住条件，推进水域生态环境保护。”2014年7月，江苏省正式启动渔民上岸安居工程。2015年8月，沈召明所在的三桥村退捕渔民搬迁工程启动，他率先签约上岸，搬进了渔民安置小区。“过去打鱼是为了生计，现在退捕是为了子孙。”\n　　恰逢新沂市建设窑湾古镇景区，沈召明组建的渔民乐队被景区“收编”，成为景区文艺团体。艺术团的成员大多由撑船摇橹几十载的渔民组成，经过不断发展，剧团由原来的十几人，发展到现在的30多人。\n　　大运河申遗成功10周年之际，沈召明计划沿着大运河源头开启巡演，唱南腔北调、讲漕运故事、演渔家民俗。\n　　家运、水运、国运交织，大美和鸣，奔流不息！', '<p style=\"text-align: start;\">　　千里通波，舟楫如梭。</p><p style=\"text-align: start;\">　　中国大运河南起浙江，北至北京，途径8个省级行政区，沟通5大河流水系。运河流经地，往往人口稠密、繁华富庶。涛声帆影间，翻涌着无数动人的人间烟火故事。</p><p style=\"text-align: start;\">　　喝着大运河的水长大，在大运河上跑船养家，沿着大运河去往更大的世界……在中国大运河申遗成功10周年之际，“何以中国·运载千秋”网络主题宣传活动在江苏扬州举办。来自浙江、山东、江苏的三位运河人讲述了人河共生的故事。</p><p style=\"text-align: center;\"><img src=\"https://p4.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070920034567662.jpg\" alt=\"三位运河人在“何以中国·运载千秋”网络主题宣传活动现场讲述。人民视频供图\" data-href=\"\" style=\"\"></p><p style=\"text-align: start;\">　　三位运河人在“何以中国·运载千秋”网络主题宣传活动现场讲述。人民视频供图</p><p style=\"text-align: start;\">　　<strong>岸清景明 出行更舒心</strong></p><p style=\"text-align: start;\">　　3块钱即可从浙江杭州武林门码头乘坐运河水上巴士到拱宸桥。沿途往来货运船只络绎不绝，运河街景尽收眼底，古韵悠长的水乡风光与繁华热闹的现代都市交织成趣。</p><p style=\"text-align: start;\">　　为缓解市区道路交通拥堵问题，2004年，杭州开通水上公交巴士，成为全国第一个开通市区运河水上公交的城市。2005年，水上巴士线路增加了“西湖号”，薛鑫坤担任船长。</p><p style=\"text-align: start;\">　　“大运河是生命之河，滋养了我们全家人。”薛鑫坤动情地表示，祖父母、父母和自己三代人都是开了一辈子船的船工。在船上长大的他，从货运小工变成第一批水上公交司机。</p><p style=\"text-align: start;\">　　薛鑫坤见证了大运河生态环境的改善。2003年，杭州成立京杭运河（杭州段）综合保护委员会；2006年，针对大运河的综合保护管理和周边生态环境治理，杭州采取了编制条例、修复生态等一系列措施；2017年，杭州对大运河进行分类分段分级保护管理，大运河环境治理从水环境整治延伸到多方面综合保护。据浙江省生态环境厅通报，2020年运河杭州段总体水质状况为优。</p><p style=\"text-align: start;\">　　“眼见着运河的水变清了，风景变美了，文化长廊一步一景，外地游客最喜欢坐水上巴士了。”薛鑫坤说，20年过去，大运河重新焕发生机。</p><p style=\"text-align: start;\">　　如今的水上巴士，不只是交通工程，也是杭州的风景线。薛鑫坤回忆，水上巴士开通之初最高峰乘坐人数在千人以上。如今，每逢节假日水上巴士日均乘坐人数可达8000人次。</p><p style=\"text-align: start;\">　　杭州水陆交旅发展集团总经理助理李林蔚介绍，为了推进水上交旅融合发展，增加大客位数的船舶，建设综合水上客运中心，投入绿色新能源船舶，不断拓展新的旅游路线。2023年，运河水上巴士游客量同比增长超180%，达到120万人次。</p><p style=\"text-align: start;\">　　<strong>水深道宽 货运更高效</strong></p><p style=\"text-align: start;\">　　“两千吨级的集装箱船，北斗导航，探测仪配齐，六七级大风天照样跑。”说起新换的船，来自山东济宁的杨杰伟言语中不无骄傲。</p><p style=\"text-align: start;\">　　杨杰伟是在大运河上从事航运业20多年的“跑船人”。微山湖是山东最大淡水湖泊，也是京杭大运河的主航道。杨杰伟的乡亲们大多从事水运行业，在运河航线上往返。他记得，爷爷辈最常见的是木船，父亲辈换成了载重80多吨的水泥船，再后来是载重200到400多吨的铁船......</p><p style=\"text-align: start;\">　　为减少航运货物对运河水质造成的污染，推动绿色发展，提高运输效率，优化运输结构，济宁鼓励更换集装箱货轮，并给予相应政策支持。借此机会，杨杰伟和弟弟贷款购买了一艘大型集装箱货轮。除了先进的航船设备一应俱全，新船上还配备了空调、冰箱等生活设施。</p><p style=\"text-align: start;\">　　“2000多年前，大运河上跑的可能是10来吨的小木船，现在跑的是千吨级的集装箱货轮。从古至今，大运河河道一直在升级改造，加深加宽。”杨杰伟说。</p><p style=\"text-align: start;\">　　2022年，济宁共计完成201.3公里高等级航道改造提升，可通航2000吨级船舶、万吨级船队。京杭大运河济宁段1000吨至2000吨级船型实载率可提升近60%，2000吨级提升近30%，每年可节省直接物流成本近10亿元，减少航运油耗约15万吨。</p><p style=\"text-align: start;\">　　为保障船舶的航行安全和效益，京杭大运河沿线各地建成了保证船舶24小时通航的航道设备。济宁段推出的“鲁船通”App报闸系统将船闸单闸运行时间缩短至42分钟，船舶通航效率大幅提升。</p><p style=\"text-align: start;\">　　“从山东济宁到江苏太仓要过12道闸，15天路程变成了5天，节省的时间就是金钱。”杨杰伟表示，现在的船闸系统很智能，在手机上就可以完成过闸手续，大大缩短了时间。</p><p style=\"text-align: start;\">　　常年在河上“跑”，以船为家的杨杰伟感受到运河多年来的变化，“河道宽了、深了，河水越来越清了，两岸的生态绿化做得非常好，高楼大厦越来越多。”他对未来充满希望：“我们一家的日子就像这条大运河一样，越跑路越宽！</p><p style=\"text-align: start;\">　　<strong>退捕转型 渔民闯新路</strong></p><p style=\"text-align: start;\">　　“骆马湖的夜里，我们凑在一条大船上演奏，听到琴声，很多渔民从10里外划着小木船来听，有时一聚就有上百条船。呼啦一大片，渔火点点，琴声悠扬......”做渔民时召集伙伴，凑在大船上唱歌演奏的欢乐时光，江苏徐州新沂市窑湾古镇渔民艺术团团长沈召明至今记忆犹新。</p><p style=\"text-align: start;\">　　窑湾古镇位于京杭大运河与骆马湖交汇处，因“运”而生，发展成为大运河上的重要码头和商贸重镇，有“黄金水道金三角”之称。因水位落差较大，船舶不宜夜行，停泊此处补给。南来北往的船工、渔民聚集于此，唱起各自的家乡戏。长久的熏陶使得沈召明成了戏迷，他常到岸上看电影，学唱歌。</p><p style=\"text-align: start;\">　　“打记事起就知道逮鱼摸虾、下钩下网，每天都要干活。”沈召明祖孙四代都在运河上以捕鱼为生。船上生活枯燥，从小爱唱歌、吹笛子的沈召明组建起渔民乐队，吼两嗓子唱首歌，拿着乐器拉曲子。“时间长了逐渐固定下来七八个人，爱唱的歌像《一条大河》《洪湖水浪打浪》《小小竹排江中游》，都是跟水有关的。”</p><p style=\"text-align: start;\">　　随着经济的发展，靠水吃水的传统渔业生产模式迎来变化。2013年6月，四部委联合印发指导意见，提出“力争用3年时间实现以船为家渔民上岸安居，改善以船为家渔民居住条件，推进水域生态环境保护。”2014年7月，江苏省正式启动渔民上岸安居工程。2015年8月，沈召明所在的三桥村退捕渔民搬迁工程启动，他率先签约上岸，搬进了渔民安置小区。“过去打鱼是为了生计，现在退捕是为了子孙。”</p><p style=\"text-align: start;\">　　恰逢新沂市建设窑湾古镇景区，沈召明组建的渔民乐队被景区“收编”，成为景区文艺团体。艺术团的成员大多由撑船摇橹几十载的渔民组成，经过不断发展，剧团由原来的十几人，发展到现在的30多人。</p><p style=\"text-align: start;\">　　大运河申遗成功10周年之际，沈召明计划沿着大运河源头开启巡演，唱南腔北调、讲漕运故事、演渔家民俗。</p><p style=\"text-align: start;\">　　家运、水运、国运交织，大美和鸣，奔流不息！</p>', '[]', 99, 0, 1, 1, 0, '2024-07-09 13:30:14', '2024-07-09 13:30:14');
INSERT INTO `articles` VALUES (17, 3, 1, '美联邦航空局要求检查波音737制氧装置隐患', '罗萌，刘亮', '[]', NULL, '　　新华社旧金山7月8日电（记者吴晓凌）美国联邦航空局8日表示，由于波音737型客机乘客使用的制氧装置可能在紧急情况下失效，该机构要求对涉及的2600架737型客机进行检查。\n　　联邦航空局表示，该机构收到多起乘客使用的制氧装置因固定问题发生移位的报告，该问题可能导致在机舱发生减压时制氧装置无法为乘客供氧。该机构要求对737 MAX和737 NG系列客机进行检查。\n　　据联邦航空局介绍，其适航指令立即生效，要求在120至150天内对737型客机进行必要的检查并采取纠正措施，必要时更换并调整制氧装置的位置。波音公司8日表示，已通知航空公司更新737型客机的制氧装置上的部分固定带。\n　　今年以来，波音飞机安全事故频发。一架美国联合航空公司的波音757-200客机8日从洛杉矶起飞时起落架的一个轮胎掉落，这架飞机随后安全降落在丹佛机场。3月7日，美联航一架波音777-200客机从旧金山起飞后也发生轮胎掉落事故。', '<p style=\"text-align: start;\">　　新华社旧金山7月8日电（记者吴晓凌）美国联邦航空局8日表示，由于波音737型客机乘客使用的制氧装置可能在紧急情况下失效，该机构要求对涉及的2600架737型客机进行检查。</p><p style=\"text-align: start;\">　　联邦航空局表示，该机构收到多起乘客使用的制氧装置因固定问题发生移位的报告，该问题可能导致在机舱发生减压时制氧装置无法为乘客供氧。该机构要求对737 MAX和737 NG系列客机进行检查。</p><p style=\"text-align: start;\">　　据联邦航空局介绍，其适航指令立即生效，要求在120至150天内对737型客机进行必要的检查并采取纠正措施，必要时更换并调整制氧装置的位置。波音公司8日表示，已通知航空公司更新737型客机的制氧装置上的部分固定带。</p><p style=\"text-align: start;\">　　今年以来，波音飞机安全事故频发。一架美国联合航空公司的波音757-200客机8日从洛杉矶起飞时起落架的一个轮胎掉落，这架飞机随后安全降落在丹佛机场。3月7日，美联航一架波音777-200客机从旧金山起飞后也发生轮胎掉落事故。</p>', '[]', 99, 0, 0, 0, 0, '2024-07-09 13:31:36', '2024-07-09 13:31:36');
INSERT INTO `articles` VALUES (18, 3, 1, '欧盟驻格鲁吉亚大使：格鲁吉亚加入欧盟的进程暂停', '罗萌，刘亮', '[]', NULL, '　　中新网7月9日电 据俄罗斯卫星通讯社当地时间9日报道，欧盟驻格鲁吉亚大使赫尔琴斯基称，欧盟领导人同意暂停格加入欧盟进程。\n　　赫尔琴斯基称，欧盟领导人目前尚不清楚格鲁吉亚现政府的意图。格方已经通过的《外国影响透明度法案》与该国加入欧盟的目标并不兼容。\n　　据介绍，《外国影响透明度法案》要求从国外获得超过20%资金的媒体和非政府组织公布资金来源，并登记为“受外国影响的机构”。\n　　赫尔琴斯基还表示，欧盟决定冻结原计划向格鲁吉亚提供的3000万欧元的国防支持，“这只是第一步，还会有其他步骤，对格鲁吉亚政府的直接支持将受到限制。”\n　　此外，他表示，对格鲁吉亚公民组织和媒体的资助将会增加。\n　　据此前报道，欧盟2009年出台东部伙伴关系计划，力图发展与包括格鲁吉亚、乌克兰、摩尔多瓦、阿塞拜疆、亚美尼亚和白俄罗斯六国的关系。2023年12月，格鲁吉亚获得欧盟候选国地位。', '<p style=\"text-align: start;\">　　中新网7月9日电 据俄罗斯卫星通讯社当地时间9日报道，欧盟驻格鲁吉亚大使赫尔琴斯基称，欧盟领导人同意暂停格加入欧盟进程。</p><p style=\"text-align: start;\">　　赫尔琴斯基称，欧盟领导人目前尚不清楚格鲁吉亚现政府的意图。格方已经通过的《外国影响透明度法案》与该国加入欧盟的目标并不兼容。</p><p style=\"text-align: start;\">　　据介绍，《外国影响透明度法案》要求从国外获得超过20%资金的媒体和非政府组织公布资金来源，并登记为“受外国影响的机构”。</p><p style=\"text-align: start;\">　　赫尔琴斯基还表示，欧盟决定冻结原计划向格鲁吉亚提供的3000万欧元的国防支持，“这只是第一步，还会有其他步骤，对格鲁吉亚政府的直接支持将受到限制。”</p><p style=\"text-align: start;\">　　此外，他表示，对格鲁吉亚公民组织和媒体的资助将会增加。</p><p style=\"text-align: start;\">　　据此前报道，欧盟2009年出台东部伙伴关系计划，力图发展与包括格鲁吉亚、乌克兰、摩尔多瓦、阿塞拜疆、亚美尼亚和白俄罗斯六国的关系。2023年12月，格鲁吉亚获得欧盟候选国地位。</p>', '[]', 99, 0, 0, 0, 0, '2024-07-09 13:32:03', '2024-07-09 13:32:03');
INSERT INTO `articles` VALUES (19, 3, 2, '上合组织国家合作共促绿色发展', '王玉西，刘亮', '[{\"uid\":\"vc-upload-1720531830924-6\",\"name\":\"e91fa691e1476864bcba84e099139637.jpg\",\"status\":\"done\",\"percent\":100,\"id\":\"535e0287-a3cb-4e94-8bba-7987de432965\",\"folderType\":\"5\",\"originalname\":\"2024070914331536537[1].jpg\",\"filename\":\"e91fa691e1476864bcba84e099139637.jpg\",\"path\":\"uploads/2024-07-09/e91fa691e1476864bcba84e099139637.jpg\",\"size\":135804,\"type\":\"image/jpeg\",\"url\":\"http://127.0.0.1:8000/uploads/2024-07-09/e91fa691e1476864bcba84e099139637.jpg\",\"description\":\"\",\"creatorId\":1,\"creatorName\":\"admin\",\"updatedAt\":\"2024-07-09T13:34:17.293Z\",\"createdAt\":\"2024-07-09T13:34:17.293Z\"}]', NULL, '　　新华社青岛7月9日电（记者邵琨、张武岳、王凯）在距离阿联酋首都阿布扎比市中心南部约45公里的沙漠里，一大片蓝色光伏板与金黄色沙丘交织成一幅壮观的景象。\n　　占地约21平方公里、发电量可以满足阿联酋约20万户家庭用电需求、每年可减少超240万吨碳排放、为当地提供就业机会约5000个……这是由中国企业承建的艾尔达芙拉光伏电站，也是上合组织国家携手共筑绿色家园的缩影。\n　　绿色能源项目、绿色基础设施建设、生物多样性保护、生态修复、绿色可持续发展……正在山东青岛举行的上海合作组织国家绿色发展论坛上，展板上的一幅幅上合组织国家区域合作赋能绿色发展的图片吸引了与会各国代表的关注。\n　　与会各国代表围绕“携手绿色发展，推动人与自然和谐共生”主题展开讨论，共建上海合作组织绿色发展伙伴关系，共促可持续发展，共建清洁美丽世界，为区域和全球绿色发展作出贡献。\n\n　　7月9日拍摄的上海合作组织国家绿色发展论坛开幕式现场。新华社记者 李紫恒 摄\n　　此次论坛上，阿塞拜疆共和国国民会议第一副主席阿里·侯赛因利说，中国坚持绿水青山就是金山银山的发展理念，取得很大成就，给了他们启示。阿塞拜疆今年11月将主办《联合国气候变化框架公约》第二十九次缔约方大会，欢迎上合组织成员国参与到阿塞拜疆国家绿色能源转型中，相信本次论坛的成果将助力本组织成员国绿色发展，在应对全球气候变化中发挥更大作用。\n　　在巴基斯坦，由中国能建葛洲坝集团投资建设的昆哈河苏吉吉纳里水电站为当地带来清洁能源、促进经济发展，项目还在当地创造了大量就业机会并培养了众多技术工人。\n　　巴基斯坦国民议会副议长赛义德·古拉姆·穆斯塔法·沙介绍，上合组织的众多目标之一，就是通过团结成员国，在可持续发展和绿色技术方面实现合作。目前，巴基斯坦的雪豹数量正在恢复，这正是上合组织国家间分享经验、联合研究、共同保护的结果。\n　　当今，绿色发展成为上合组织国家合作新亮点，生态环保产业科技创新成为推动能源结构优化、实现绿色低碳转型的重要力量，为共建上合组织绿色发展命运共同体注入了强劲动力。\n\n　　7月8日，与会者在论坛展览区参观。新华社记者 李紫恒 摄\n　　中国与俄罗斯合作的华电捷宁斯卡娅燃气蒸汽联合循环供热电站项目，每年可发电30.2亿千瓦时，提供81.4万吉卡的年供热量；湖南军信环保股份有限公司投资建设的比什凯克垃圾科技处置发电项目，是吉尔吉斯共和国第一个垃圾焚烧发电项目，通过科技手段处理城市垃圾并将其转化为电能……\n　　中国环境保护产业协会会长郭承站介绍，中国环保产业的科技创新成果不仅服务保障中国的能源行业绿色低碳转型，也为全球环保产业乃至全球能源体系的绿色低碳转型贡献了中国智慧和中国方案。', '<p style=\"text-align: start;\">　　新华社青岛7月9日电（记者邵琨、张武岳、王凯）在距离阿联酋首都阿布扎比市中心南部约45公里的沙漠里，一大片蓝色光伏板与金黄色沙丘交织成一幅壮观的景象。</p><p style=\"text-align: start;\">　　占地约21平方公里、发电量可以满足阿联酋约20万户家庭用电需求、每年可减少超240万吨碳排放、为当地提供就业机会约5000个……这是由中国企业承建的艾尔达芙拉光伏电站，也是上合组织国家携手共筑绿色家园的缩影。</p><p style=\"text-align: start;\">　　绿色能源项目、绿色基础设施建设、生物多样性保护、生态修复、绿色可持续发展……正在山东青岛举行的上海合作组织国家绿色发展论坛上，展板上的一幅幅上合组织国家区域合作赋能绿色发展的图片吸引了与会各国代表的关注。</p><p style=\"text-align: start;\">　　与会各国代表围绕“携手绿色发展，推动人与自然和谐共生”主题展开讨论，共建上海合作组织绿色发展伙伴关系，共促可持续发展，共建清洁美丽世界，为区域和全球绿色发展作出贡献。</p><p style=\"text-align: center;\"><img src=\"https://p3.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070914331536537.jpg\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-align: center;\">　　7月9日拍摄的上海合作组织国家绿色发展论坛开幕式现场。新华社记者 李紫恒 摄</p><p style=\"text-align: start;\">　　此次论坛上，阿塞拜疆共和国国民会议第一副主席阿里·侯赛因利说，中国坚持绿水青山就是金山银山的发展理念，取得很大成就，给了他们启示。阿塞拜疆今年11月将主办《联合国气候变化框架公约》第二十九次缔约方大会，欢迎上合组织成员国参与到阿塞拜疆国家绿色能源转型中，相信本次论坛的成果将助力本组织成员国绿色发展，在应对全球气候变化中发挥更大作用。</p><p style=\"text-align: start;\">　　在巴基斯坦，由中国能建葛洲坝集团投资建设的昆哈河苏吉吉纳里水电站为当地带来清洁能源、促进经济发展，项目还在当地创造了大量就业机会并培养了众多技术工人。</p><p style=\"text-align: start;\">　　巴基斯坦国民议会副议长赛义德·古拉姆·穆斯塔法·沙介绍，上合组织的众多目标之一，就是通过团结成员国，在可持续发展和绿色技术方面实现合作。目前，巴基斯坦的雪豹数量正在恢复，这正是上合组织国家间分享经验、联合研究、共同保护的结果。</p><p style=\"text-align: start;\">　　当今，绿色发展成为上合组织国家合作新亮点，生态环保产业科技创新成为推动能源结构优化、实现绿色低碳转型的重要力量，为共建上合组织绿色发展命运共同体注入了强劲动力。</p><p style=\"text-align: center;\"><img src=\"https://p3.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070914331513127.jpg\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-align: center;\">　　7月8日，与会者在论坛展览区参观。新华社记者 李紫恒 摄</p><p style=\"text-align: start;\">　　中国与俄罗斯合作的华电捷宁斯卡娅燃气蒸汽联合循环供热电站项目，每年可发电30.2亿千瓦时，提供81.4万吉卡的年供热量；湖南军信环保股份有限公司投资建设的比什凯克垃圾科技处置发电项目，是吉尔吉斯共和国第一个垃圾焚烧发电项目，通过科技手段处理城市垃圾并将其转化为电能……</p><p style=\"text-align: start;\">　　中国环境保护产业协会会长郭承站介绍，中国环保产业的科技创新成果不仅服务保障中国的能源行业绿色低碳转型，也为全球环保产业乃至全球能源体系的绿色低碳转型贡献了中国智慧和中国方案。</p>', '[]', 99, 0, 0, 0, 0, '2024-07-09 13:34:18', '2024-07-09 13:34:18');
INSERT INTO `articles` VALUES (20, 3, 1, '两名美国士兵窃取军火库武器：线上贩卖牟利 涉及敏感装备', '钱景童，刘亮', '[]', NULL, '\n图为被盗取的军事装备（图：纽约州警方）\n　　海外网7月9日电 据《纽约邮报》7月8日报道，美国纽约州警方表示，两名美国士兵和一名国民警卫队雇员联合作案，从该州军火库中窃取军事装备，并通过线上贩卖牟利。\n　　警方称，这些被贩卖的军用级装备包括枪支、头盔、收银机、防弹背心等。嫌犯通过社交平台脸书出售，牟取数万美元利益。其中一些被盗的物品涉及敏感装备。\n　　警方称，嫌犯被指控犯有重大盗窃、非法持有武器以及非法出售防弹衣等罪名。（海外网 李萌）', '<p style=\"text-align: center;\"><img src=\"https://p4.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070914194919022.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-align: center;\">图为被盗取的军事装备（图：纽约州警方）</p><p style=\"text-align: start;\">　　海外网7月9日电<strong> </strong>据《纽约邮报》7月8日报道，美国纽约州警方表示，两名美国士兵和一名国民警卫队雇员联合作案，从该州军火库中窃取军事装备，并通过线上贩卖牟利。</p><p style=\"text-align: start;\">　　警方称，这些被贩卖的军用级装备包括枪支、头盔、收银机、防弹背心等。嫌犯通过社交平台脸书出售，牟取数万美元利益。其中一些被盗的物品涉及敏感装备。</p><p style=\"text-align: start;\">　　警方称，嫌犯被指控犯有重大盗窃、非法持有武器以及非法出售防弹衣等罪名。（海外网 李萌）</p>', '[]', 99, 0, 0, 0, 0, '2024-07-09 13:35:08', '2024-07-09 13:35:08');
INSERT INTO `articles` VALUES (21, 3, 1, '白宫称拜登没接受过帕金森病治疗 拜登称“接受过”相关检查', '钱景童，刘亮', '[]', NULL, '　　【环球网报道 记者 李梓瑜】白宫访客记录显示，美知名帕金森病专家凯文·卡纳德此前在白宫会见拜登私人医生凯文·奥康纳，且去年8月以来卡纳德已8次访问白宫，这令外界对美国总统拜登罹患相关疾病的猜测日甚。据美国有线电视新闻网（CNN）、路透社最新报道，白宫8日对此做出回应，称拜登没接受过帕金森病治疗。\n　　路透社称，拜登在6月27日与特朗普辩论中磕磕绊绊、显得虚弱并不时失去思路，此后人们关于拜登可能患有未公开疾病的担忧不断升温。\n　　针对人们质疑拜登接受过帕金森病治疗，据路透社报道，白宫新闻秘书卡里娜·让-皮埃尔8日在新闻发布会上“三连设问”，做出回应。她表示，“总统（拜登）之前接受过帕金森病治疗吗？没有。他现在正接受帕金森病治疗吗？没有。他正服用治疗帕金森病的药物吗？没有”。\n\n当地时间8日，白宫新闻秘书卡里娜·让-皮埃尔在新闻发布会上回答记者提问\n　　CNN说，让-皮埃尔提到，拜登担任总统期间曾3次接受神经科医生检查，每次体检时都接受一次。但她拒绝透露医生姓名，也拒绝解释为什么卡纳德在过去一年8次访问白宫。“不论你们怎么逼我，不论你们对我有多么生气，我都不会透露或确认任何人的名字”，她说。\n　　CNN称，当被问及卡纳德访问白宫并会见拜登私人医生，白宫发言人安德鲁·贝茨说，“沃尔特·里德（国家军事医学中心）多名专家访问白宫，为在白宫工作的数千名军事人员提供治疗”。贝茨说，这些访问包括神经科医生每年为拜登进行一次体检。他补充说，拜登在担任总统期间，没有在年度体检之外接受过神经科医生诊治。\n\n　　拜登 资料图片 图自外媒\n　　另据CNN报道，8日上午，美国微软全国广播公司（MSNBC）主持人米卡·布热津斯基在采访拜登时特别询问他最近是否接受过帕金森病检查，拜登称他接受过检查。\n　　布热津斯基问道，“你是否接受过任何与年龄有关的疾病、帕金森病前期或类似疾病的检查，这也许可以解释为什么你在（辩论）那天晚上说不出完整句子”？\n　　拜登笑着回答，“我以前接受过”。他补充说，“辩论前我感觉很糟糕，回来后他们给我做了检查。我以为我感染了新冠病毒，也许出了什么问题，我感染了什么。他们对我进行了检测，给我做了那些测试，我没事”。\n　　据媒体此前报道，美国2024年总统选举当地时间6月27日21时许迎来首场候选人电视辩论，此前一直隔空打“口水仗”的拜登和特朗普时隔近4年再次登台交锋。美国有线电视新闻网（CNN）称，自从拜登糟糕的辩论表现曝光后，越来越多民主党人希望拜登能够为了民主党和美国退出竞选。\n　　另据“今日俄罗斯”（RT）当地时间6日报道，81岁的拜登接受美国广播公司（ABC）专访，被问到外界对其精神认知状况的担忧，在被问到“是否接受了全面的神经学和认知评估”时，拜登说，“我有的——几乎每天都要接受全面的神经学测试，我已经做过全面的体检”。拜登在采访中还自称每天都接受认知测试。\n　　英国广播公司（BBC）称，拜登的说法并没能平息民主党内对他身体状况的争议。而据美国福克斯新闻网报道，在接受ABC采访时，拜登还表示，只有上帝可以说服他退出竞选。', '<p style=\"text-align: start;\">　　【环球网报道 记者 李梓瑜】白宫访客记录显示，美知名帕金森病专家凯文·卡纳德此前在白宫会见拜登私人医生凯文·奥康纳，且去年8月以来卡纳德已8次访问白宫，这令外界对美国总统拜登罹患相关疾病的猜测日甚。据美国有线电视新闻网（CNN）、路透社最新报道，白宫8日对此做出回应，称拜登没接受过帕金森病治疗。</p><p style=\"text-align: start;\">　　路透社称，拜登在6月27日与特朗普辩论中磕磕绊绊、显得虚弱并不时失去思路，此后人们关于拜登可能患有未公开疾病的担忧不断升温。</p><p style=\"text-align: start;\">　　针对人们质疑拜登接受过帕金森病治疗，据路透社报道，白宫新闻秘书卡里娜·让-皮埃尔8日在新闻发布会上“三连设问”，做出回应。她表示，“总统（拜登）之前接受过帕金森病治疗吗？没有。他现在正接受帕金森病治疗吗？没有。他正服用治疗帕金森病的药物吗？没有”。</p><p style=\"text-align: center;\"><img src=\"https://p4.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070914164582066.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-align: center;\">当地时间8日，白宫新闻秘书卡里娜·让-皮埃尔在新闻发布会上回答记者提问</p><p style=\"text-align: start;\">　　CNN说，让-皮埃尔提到，拜登担任总统期间曾3次接受神经科医生检查，每次体检时都接受一次。但她拒绝透露医生姓名，也拒绝解释为什么卡纳德在过去一年8次访问白宫。“不论你们怎么逼我，不论你们对我有多么生气，我都不会透露或确认任何人的名字”，她说。</p><p style=\"text-align: start;\">　　CNN称，当被问及卡纳德访问白宫并会见拜登私人医生，白宫发言人安德鲁·贝茨说，“沃尔特·里德（国家军事医学中心）多名专家访问白宫，为在白宫工作的数千名军事人员提供治疗”。贝茨说，这些访问包括神经科医生每年为拜登进行一次体检。他补充说，拜登在担任总统期间，没有在年度体检之外接受过神经科医生诊治。</p><p style=\"text-align: center;\"><img src=\"https://p5.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070914164572862.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-align: center;\">　　拜登 资料图片 图自外媒</p><p style=\"text-align: start;\">　　另据CNN报道，8日上午，美国微软全国广播公司（MSNBC）主持人米卡·布热津斯基在采访拜登时特别询问他最近是否接受过帕金森病检查，拜登称他接受过检查。</p><p style=\"text-align: start;\">　　布热津斯基问道，“你是否接受过任何与年龄有关的疾病、帕金森病前期或类似疾病的检查，这也许可以解释为什么你在（辩论）那天晚上说不出完整句子”？</p><p style=\"text-align: start;\">　　拜登笑着回答，“我以前接受过”。他补充说，“辩论前我感觉很糟糕，回来后他们给我做了检查。我以为我感染了新冠病毒，也许出了什么问题，我感染了什么。他们对我进行了检测，给我做了那些测试，我没事”。</p><p style=\"text-align: start;\">　　据媒体此前报道，美国2024年总统选举当地时间6月27日21时许迎来首场候选人电视辩论，此前一直隔空打“口水仗”的拜登和特朗普时隔近4年再次登台交锋。美国有线电视新闻网（CNN）称，自从拜登糟糕的辩论表现曝光后，越来越多民主党人希望拜登能够为了民主党和美国退出竞选。</p><p style=\"text-align: start;\">　　另据“今日俄罗斯”（RT）当地时间6日报道，81岁的拜登接受美国广播公司（ABC）专访，被问到外界对其精神认知状况的担忧，在被问到“是否接受了全面的神经学和认知评估”时，拜登说，“我有的——几乎每天都要接受全面的神经学测试，我已经做过全面的体检”。拜登在采访中还自称每天都接受认知测试。</p><p style=\"text-align: start;\">　　英国广播公司（BBC）称，拜登的说法并没能平息民主党内对他身体状况的争议。而据美国福克斯新闻网报道，在接受ABC采访时，拜登还表示，只有上帝可以说服他退出竞选。</p>', '[]', 99, 0, 1, 1, 0, '2024-07-09 13:35:38', '2024-07-09 13:35:38');
INSERT INTO `articles` VALUES (22, 3, 1, '日本公布两架海上自卫队直升机坠毁事故调查结果', '罗萌，刘亮', '[]', NULL, '　　当地时间7月9日，日本防卫省公布了4月发生的两架海上自卫队巡逻直升机坠毁事故的调查结果，称主要原因是机组人员监视不足，以及指挥官之间缺乏配合，多名指挥官向两架直升机发布指令时协调不足。\n　　当地时间4月20日晚间，两架日本海上自卫队SH-60K“海鹰”直升机在伊豆群岛的鸟岛附近失联。经调查，判定两架直升机已坠毁，坠毁原因为两机相撞，两架直升机机体本身未发现异常。事故共造成8名机组人员死亡。（总台记者 杨红霞 何欣蕾）', '<p style=\"text-align: start;\">　　当地时间7月9日，日本防卫省公布了4月发生的两架海上自卫队巡逻直升机坠毁事故的调查结果，称主要原因是<strong>机组人员监视不足</strong>，以及<strong>指挥官之间缺乏配合，</strong>多名指挥官向两架直升机发布指令时协调不足。</p><p style=\"text-align: start;\">　　当地时间4月20日晚间，两架日本海上自卫队SH-60K“海鹰”直升机在伊豆群岛的鸟岛附近失联。经调查，判定两架直升机已坠毁，坠毁原因为两机相撞，两架直升机机体本身未发现异常。事故共造成8名机组人员死亡。（总台记者 杨红霞 何欣蕾）</p>', '[]', 99, 0, 0, 0, 0, '2024-07-09 13:36:11', '2024-07-09 13:36:11');
INSERT INTO `articles` VALUES (23, 3, 3, '美情报界编造一黑客组织来抹黑中国', '王玉西，刘亮', '[]', 'https://dh5.cntv.qcloudcdn.com/asp/h5e/hls/main/0303000a/3/default/0ca0117bbb934389a6e2d11431087fe4/main.m3u8?maxbr=2048&contentid=15120519184043', '7月8日，中国国家计算机病毒应急处理中心发布了一份关于美国“伏特台风”行动的研究报告。这次行动的带头人，是美国国家安全局前局长，保罗·中曾根。他在与俄罗斯、伊朗的网络战中战绩显赫，却在临退休前为了诬陷中国露出马脚。他为什么要这样做？', '<p><span style=\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);\">7月8日，中国国家计算机病毒应急处理中心发布了一份关于美国“伏特台风”行动的研究报告。这次行动的带头人，是美国国家安全局前局长，保罗·中曾根。他在与俄罗斯、伊朗的网络战中战绩显赫，却在临退休前为了诬陷中国露出马脚。他为什么要这样做？</span></p>', '[]', 99, 0, 0, 0, 0, '2024-07-09 13:36:57', '2024-07-09 13:36:57');
INSERT INTO `articles` VALUES (24, 3, 1, '菲律宾非法“坐滩”军舰如何破坏仁爱礁珊瑚礁生态系统？真相揭开', '及玥，刘亮', '[]', NULL, '央视网消息：7月8日下午，由自然资源部南海生态中心和自然资源部南海发展研究院共同编制的《仁爱礁非法“坐滩”军舰破坏珊瑚礁生态系统调查报告》（以下简称《报告》）发布。\n《报告》首次全面系统评估了仁爱礁珊瑚礁生态系统状况。《报告》显示，仁爱礁的造礁石珊瑚覆盖面积大幅下降，非法“坐滩”军舰周边降幅尤为明显。《报告》指出，导致仁爱礁珊瑚礁生态系统遭到破坏的主要因素正是菲律宾军舰非法“坐滩”及其相关联的人类活动。\n\n\n菲律宾非法“坐滩”军舰严重破坏仁爱礁珊瑚礁生态系统\n播放视频\n画中画\n\n1999年以来，菲律宾军舰在仁爱礁非法“坐滩”，严重侵犯中国领土主权和海洋权益。有关科学调查报告显示，该军舰在“坐滩”过程中毁灭性破坏珊瑚礁，船体锈蚀破损析出重金属抑制珊瑚生长，舰上人员生活和菲方人员捕捞等还对仁爱礁珊瑚礁生态系统造成持续损害。\n', '<p style=\"text-indent: 2em; text-align: start;\"><strong>央视网消息：</strong>7月8日下午，由自然资源部南海生态中心和自然资源部南海发展研究院共同编制的《仁爱礁非法“坐滩”军舰破坏珊瑚礁生态系统调查报告》（以下简称《报告》）发布。</p><p style=\"text-indent: 2em; text-align: start;\">《报告》首次全面系统评估了仁爱礁珊瑚礁生态系统状况。《报告》显示，仁爱礁的造礁石珊瑚覆盖面积大幅下降，非法“坐滩”军舰周边降幅尤为明显。《报告》指出，导致仁爱礁珊瑚礁生态系统遭到破坏的主要因素正是菲律宾军舰非法“坐滩”及其相关联的人类活动。<br></p><p style=\"text-align: center;\"><img src=\"https://p5.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070910280732558.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\"><strong>菲律宾非法“坐滩”军舰严重破坏仁爱礁珊瑚礁生态系统</strong></p><p style=\"text-align: center;\">播放视频</p><p style=\"text-align: center;\">画中画</p><p><br></p><p style=\"text-indent: 2em; text-align: start;\">1999年以来，菲律宾军舰在仁爱礁非法“坐滩”，严重侵犯中国领土主权和海洋权益。有关科学调查报告显示，该军舰在“坐滩”过程中毁灭性破坏珊瑚礁，船体锈蚀破损析出重金属抑制珊瑚生长，舰上人员生活和菲方人员捕捞等还对仁爱礁珊瑚礁生态系统造成持续损害。</p><p style=\"text-align: center;\"><img src=\"https://p4.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070910275928292.png\" alt=\"\" data-href=\"\" style=\"\"></p>', '[]', 99, 0, 0, 0, 0, '2024-07-09 13:37:44', '2024-07-09 13:37:44');
INSERT INTO `articles` VALUES (25, 3, 2, '巴西央行上调该国2024年经济增长预期', '邢斯馨，刘亮', '[{\"uid\":\"vc-upload-1720531830924-17\",\"name\":\"7ddd6e455ebd612ecc9e7b323ac8fe9b.jpg\",\"status\":\"done\",\"percent\":100,\"id\":\"285777b2-dd20-45f7-a3d1-9a9b9521708d\",\"folderType\":\"5\",\"originalname\":\"2024070910121079021[1].jpg\",\"filename\":\"7ddd6e455ebd612ecc9e7b323ac8fe9b.jpg\",\"path\":\"uploads/2024-07-09/7ddd6e455ebd612ecc9e7b323ac8fe9b.jpg\",\"size\":170988,\"type\":\"image/jpeg\",\"url\":\"http://127.0.0.1:8000/uploads/2024-07-09/7ddd6e455ebd612ecc9e7b323ac8fe9b.jpg\",\"description\":\"\",\"creatorId\":1,\"creatorName\":\"admin\",\"updatedAt\":\"2024-07-09T13:38:13.270Z\",\"createdAt\":\"2024-07-09T13:38:13.270Z\"}]', NULL, '\n　　△巴西央行\n　　当地时间7月8日，巴西中央银行发布的《焦点报告》显示，巴西央行对该国2024年国内生产总值（GDP）的增长预期由2.09%升至2.10%，2025年增长预期则由1.98%下调至1.97%。报告还显示，至2024年底，巴西基准利率将维持在10.5%，2025年基准利率预期下调至9.5%。\n　　通过对100余家金融机构的调研，巴西央行每周定期发布《焦点报告》，对国内重要经济数据的形势与趋势做出预测。（总台记者 冯丽） ', '<p style=\"text-align: center;\"><img src=\"https://p4.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070910121079021.jpg\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-align: center;\">　　△巴西央行</p><p style=\"text-align: start;\">　　当地时间7月8日，巴西中央银行发布的《焦点报告》显示，巴西央行对该国2024年国内生产总值（GDP）的增长预期由2.09%升至2.10%，2025年增长预期则由1.98%下调至1.97%。报告还显示，至2024年底，巴西基准利率将维持在10.5%，2025年基准利率预期下调至9.5%。</p><p style=\"text-align: start;\">　　通过对100余家金融机构的调研，巴西央行每周定期发布《焦点报告》，对国内重要经济数据的形势与趋势做出预测。（总台记者 冯丽） </p>', '[]', 99, 0, 0, 1, 0, '2024-07-09 13:38:16', '2024-07-09 13:38:16');
INSERT INTO `articles` VALUES (26, 3, 1, '中方敦促刚果（金）所有武装团伙立即放下武器', '及玥，刘亮', '[]', NULL, '\n　　中国常驻联合国副代表耿爽7月8日在安理会审议刚果（金）问题时表示，中方敦促所有在刚果（金）的武装团伙立即放下武器，撤出占领区。\n　　耿爽强调，国际社会应推动刚果（金）武装团伙停火止暴。他说，仅仅最近3个月，就有500多名平民被武装团伙杀害，730万人被迫流离失所。7月3日，一家在刚果（金）的中国企业遭到武装袭击，造成数名中国公民死亡、失踪，中方对此强烈谴责，要求尽快追捕并依法严惩凶手。4月，刚果（金）政府同多个武装团伙签署停火协议，同乌干达、布隆迪开展双边安全合作，北基伍省解武复员试点项目顺利完成，有关进展值得充分肯定。国际社会应尊重刚果（金）的主权、独立和领土完整，为刚果（金）维护安全稳定和改善人道主义状况提供建设性帮助，推动刚果（金）东部问题早日解决。\n　　耿爽说，要促进地区局势尽快降温。近期，地区国家围绕刚果（金）东部问题矛盾分歧增加。中方呼吁有关国家保持冷静克制，通过对话化解分歧，避免诉诸军事手段。中方赞赏安哥拉今年3月促成刚果（金）和卢旺达举行外长会晤，期待地区国家和组织推动罗安达进程和内罗毕进程发挥更大作用。中方希望联合国秘书长刚果（金）问题特别代表凯塔同联合国秘书长大湖地区问题特使夏煌保持协调，继续努力劝和促谈。\n　　耿爽说，要有序推进联合国刚果（金）稳定特派团（联刚稳定团）缩编。联刚稳定团上个月顺利撤出南基伍省。下阶段，联合国系统要帮助南基伍省建设与巩固和平，联刚稳定团要同刚果（金）政府保持沟通，安全有序推进缩编进程。近期，联刚稳定团遇袭事件持续发生，有关方面要以更大的紧迫感、更有效的手段保障维和人员安全。南部非洲发展共同体正在刚果（金）东部地区开展维和行动。中方支持对联刚稳定团授权进行合理调整，确保其同区域部队形成协调互补，愿建设性参与安理会关于区域部队支助问题的讨论。', '<p style=\"text-align: center;\"><img src=\"https://p4.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070909224564565.jpg\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-align: start;\">　　中国常驻联合国副代表耿爽7月8日在安理会审议刚果（金）问题时表示，中方敦促所有在刚果（金）的武装团伙立即放下武器，撤出占领区。</p><p style=\"text-align: start;\">　　耿爽强调，国际社会应推动刚果（金）武装团伙停火止暴。他说，仅仅最近3个月，就有500多名平民被武装团伙杀害，730万人被迫流离失所。7月3日，一家在刚果（金）的中国企业遭到武装袭击，造成数名中国公民死亡、失踪，中方对此强烈谴责，要求尽快追捕并依法严惩凶手。4月，刚果（金）政府同多个武装团伙签署停火协议，同乌干达、布隆迪开展双边安全合作，北基伍省解武复员试点项目顺利完成，有关进展值得充分肯定。国际社会应尊重刚果（金）的主权、独立和领土完整，为刚果（金）维护安全稳定和改善人道主义状况提供建设性帮助，推动刚果（金）东部问题早日解决。</p><p style=\"text-align: start;\">　　耿爽说，要促进地区局势尽快降温。近期，地区国家围绕刚果（金）东部问题矛盾分歧增加。中方呼吁有关国家保持冷静克制，通过对话化解分歧，避免诉诸军事手段。中方赞赏安哥拉今年3月促成刚果（金）和卢旺达举行外长会晤，期待地区国家和组织推动罗安达进程和内罗毕进程发挥更大作用。中方希望联合国秘书长刚果（金）问题特别代表凯塔同联合国秘书长大湖地区问题特使夏煌保持协调，继续努力劝和促谈。</p><p style=\"text-align: start;\">　　耿爽说，要有序推进联合国刚果（金）稳定特派团（联刚稳定团）缩编。联刚稳定团上个月顺利撤出南基伍省。下阶段，联合国系统要帮助南基伍省建设与巩固和平，联刚稳定团要同刚果（金）政府保持沟通，安全有序推进缩编进程。近期，联刚稳定团遇袭事件持续发生，有关方面要以更大的紧迫感、更有效的手段保障维和人员安全。南部非洲发展共同体正在刚果（金）东部地区开展维和行动。中方支持对联刚稳定团授权进行合理调整，确保其同区域部队形成协调互补，愿建设性参与安理会关于区域部队支助问题的讨论。</p>', '[]', 99, 0, 0, 0, 0, '2024-07-09 13:38:40', '2024-07-09 13:38:40');
INSERT INTO `articles` VALUES (27, 3, 2, '内政新老问题叠加 英国新政府面临多重经济挑战', '谢博韬，刘亮', '[{\"uid\":\"vc-upload-1720531830924-23\",\"name\":\"a807f1116cb02ad561d68978eca644bd.jpg\",\"status\":\"done\",\"percent\":100,\"id\":\"fda829a2-a4de-4604-9b2c-92f807d37d9d\",\"folderType\":\"5\",\"originalname\":\"2024070906221149922[1].jpg\",\"filename\":\"a807f1116cb02ad561d68978eca644bd.jpg\",\"path\":\"uploads/2024-07-09/a807f1116cb02ad561d68978eca644bd.jpg\",\"size\":8958,\"type\":\"image/jpeg\",\"url\":\"http://127.0.0.1:8000/uploads/2024-07-09/a807f1116cb02ad561d68978eca644bd.jpg\",\"description\":\"\",\"creatorId\":1,\"creatorName\":\"admin\",\"updatedAt\":\"2024-07-09T13:39:22.736Z\",\"createdAt\":\"2024-07-09T13:39:22.736Z\"}]', NULL, '　　日前，由基尔·斯塔默领导的工党时隔14年后再次在英国大选中获胜、成为执政党，斯塔默正式就任英国首相并开始组阁。分析指出，虽然工党以压倒性优势赢得大选，但其上台后仍然面临推动经济复苏等多重挑战。\n　　经济增长成为“头号任务”\n　　当地时间7月6日，英国新任首相斯塔默召开新内阁的首次会议。在会后的记者会上，斯塔默表示，经济增长将成为本届政府的“头号任务”。工党此次竞选以“改变”为口号，并在竞选纲领中提出启动经济增长、实施严格的公共支出政策、减少医疗候诊时间、提升社会治安水平、控制非法移民等一系列措施。\n　　斯塔默主持内阁会议时表示，公共医疗服务是工党经济改革的重点。英国《每日电讯报》7日报道说，斯塔默的内阁成员中，卫生大臣韦斯·斯特里廷在上任后不久就发出警告，英国的公共医疗体系已经“残破不全”。他还宣布，将与公立医疗机构的初级医生展开谈判，解决持续已久的薪酬待遇纠纷。\n　　伦敦政治经济学院教授托尼·特拉弗斯分析指出，工党提出的政策与保守党提出的或正在推行的政策并无太大区别，实际上政府可用于新服务或改变现有服务的资源十分有限。\n　　选举结果公布后，高盛将其对英国2025年和2026年的国内生产总值（GDP）增速预测上调了0.1个百分点。高盛在最新的报告中写道，预计工党的财政政策议程将在“短期内为需求的增长带来温和提振”；规划体系改革可以促进房屋建设和生产率，增加公共部门投资可以提升潜在产出。\n　　先前外界认为，英国民众对“再次公投以决定是否回归欧盟”的热情不高，但预期斯塔默会寻求与欧盟构筑更紧密关系。高盛也指出，与欧盟建立更紧密的贸易关系可以减轻英国“脱欧”的部分成本,不过，潜在的增税可能会影响投资，另外工党“减少净移民数”的承诺可能会对劳动力供应造成压力。\n　　工党的投资计划还包括一项为期十年的国家基础设施战略，工党承诺在未来五年内建造150万套新房。这一规模相当于目前英国平均每年15万套新房开工数量的两倍。摩根大通认为，“工党打算放宽规划监管并以相当快的速度实施其他改革。这可能会在一定程度上刺激增长，但幅度可能很小，需要一段时间才能实现。”\n　　复苏进程面临挑战\n　　从停滞不前的经济增长、摇摇欲坠的公共服务、长期的住房短缺，到不断增加的债务，工党面临一系列棘手的经济挑战。\n　　英国新任财政大臣蕾切尔·里夫斯在接受英国广播公司采访时称，新的工党政府面临一个“枯竭的经济局面”，应对这一困局尤其是解决教育、医疗等公共服务行业财政危机最好的办法就是吸引私人资本投入，通过公私合营来缓解政府和社会的压力。\n　　英国财政研究所所长约翰逊认为，经济增长能给英国财政带来喘息空间，但近年来英国经济增长始终乏力，“要实现真正的变革，需要将实际资源摆上桌面。但工党的宣言中没有任何迹象表明工党有计划从什么地方筹集资金。”\n　　英国智库决议基金会在6月的一份报告中写道，自2008年金融危机以来，英国经济就停滞不前。而改变这种情况，需要企业和政府大幅增加投资以提高生产率，增加投资将提升“基础设施、设备和研发，从而提高工人的工作效率”。有了更高的生产率，就会有更高的GDP增长和更高的工资。\n　　在工党的竞选纲领中，承诺将恢复经济增长作为其首要任务。为此，新一届英国政府将增加公共投资、新工业战略并实行政策改革。但与此同时，工党还面临着高企的政府债务与是否要增税的艰难抉择。\n　　在经济生产率停滞不前的背景下，英国民众的收入也没有增长。同时，英国通货膨胀率一度在2022年达到创纪录的11.1%，侵蚀了家庭的消费能力，民众的生活质量也在下降。数据显示，自2010年以来，英国实际工资几乎没有增长，英国智库决议基金会估计，2023年的实际平均周薪比2008年金融危机前的水平还要低205英镑。\n　　内政新老问题叠加\n　　在经济复苏面临挑战的情况下，工党政府还要继续解决包括医疗、移民、公共服务危机加剧等新挑战。\n　　近年来，英国多个地方政府宣告“破产”，令地方公共服务面临极大挑战。同时，英国国民保健制度、监狱等公共机构也面临重重压力。2023年11月，英国工业城市诺丁汉宣告“破产”；同年9月，英国第二大城市伯明翰宣布“破产”。自2018年以来，英国已有8个地方政府宣布破产。根据英国法律，政府破产意味着将停止法律规定服务之外的所有新支出。\n　　英国《卫报》今年2月援引英地方政府信息机构LGIU的一份报告称，英格兰近十分之一地方政府已发出警告，由于面临预算缩减等压力，预计将在未来12个月内破产。LGIU首席执行官乔纳森·卡尔-韦斯特表示，目前地方财政状况普遍“令人绝望”，无法否认存在着结构性的资金问题。英智库机构“政府研究所”6月发布报告称，当前英国医疗候诊时长创历史新高。\n　　与此同时，工党政府对于移民问题也难有良方。据英国内政部和国防部数据，截至2024年6月底，今年已有超1.3万非法移民穿越英吉利海峡来到英国，这一数字创四年来新高。此外，英国全国社会调查中心发布的报告称，由于公共政策失败等因素，当前民众对政府体系的信心降至历史低点。该机构高级研究员约翰·柯蒂斯说，新政府面临的挑战是，不仅要重振停滞不前的经济和举步维艰的公共服务，更需解除公众的担忧。（记者 秦天弘）', '<p style=\"text-align: start;\">　　日前，由基尔·斯塔默领导的工党时隔14年后再次在英国大选中获胜、成为执政党，斯塔默正式就任英国首相并开始组阁。分析指出，虽然工党以压倒性优势赢得大选，但其上台后仍然面临推动经济复苏等多重挑战。</p><p style=\"text-align: start;\">　　<strong>经济增长成为“头号任务”</strong></p><p style=\"text-align: start;\">　　当地时间7月6日，英国新任首相斯塔默召开新内阁的首次会议。在会后的记者会上，斯塔默表示，经济增长将成为本届政府的“头号任务”。工党此次竞选以“改变”为口号，并在竞选纲领中提出启动经济增长、实施严格的公共支出政策、减少医疗候诊时间、提升社会治安水平、控制非法移民等一系列措施。</p><p style=\"text-align: start;\">　　斯塔默主持内阁会议时表示，公共医疗服务是工党经济改革的重点。英国《每日电讯报》7日报道说，斯塔默的内阁成员中，卫生大臣韦斯·斯特里廷在上任后不久就发出警告，英国的公共医疗体系已经“残破不全”。他还宣布，将与公立医疗机构的初级医生展开谈判，解决持续已久的薪酬待遇纠纷。</p><p style=\"text-align: start;\">　　伦敦政治经济学院教授托尼·特拉弗斯分析指出，工党提出的政策与保守党提出的或正在推行的政策并无太大区别，实际上政府可用于新服务或改变现有服务的资源十分有限。</p><p style=\"text-align: start;\">　　选举结果公布后，高盛将其对英国2025年和2026年的国内生产总值（GDP）增速预测上调了0.1个百分点。高盛在最新的报告中写道，预计工党的财政政策议程将在“短期内为需求的增长带来温和提振”；规划体系改革可以促进房屋建设和生产率，增加公共部门投资可以提升潜在产出。</p><p style=\"text-align: start;\">　　先前外界认为，英国民众对“再次公投以决定是否回归欧盟”的热情不高，但预期斯塔默会寻求与欧盟构筑更紧密关系。高盛也指出，与欧盟建立更紧密的贸易关系可以减轻英国“脱欧”的部分成本,不过，潜在的增税可能会影响投资，另外工党“减少净移民数”的承诺可能会对劳动力供应造成压力。</p><p style=\"text-align: start;\">　　工党的投资计划还包括一项为期十年的国家基础设施战略，工党承诺在未来五年内建造150万套新房。这一规模相当于目前英国平均每年15万套新房开工数量的两倍。摩根大通认为，“工党打算放宽规划监管并以相当快的速度实施其他改革。这可能会在一定程度上刺激增长，但幅度可能很小，需要一段时间才能实现。”</p><p style=\"text-align: start;\">　　<strong>复苏进程面临挑战</strong></p><p style=\"text-align: start;\">　　从停滞不前的经济增长、摇摇欲坠的公共服务、长期的住房短缺，到不断增加的债务，工党面临一系列棘手的经济挑战。</p><p style=\"text-align: start;\">　　英国新任财政大臣蕾切尔·里夫斯在接受英国广播公司采访时称，新的工党政府面临一个“枯竭的经济局面”，应对这一困局尤其是解决教育、医疗等公共服务行业财政危机最好的办法就是吸引私人资本投入，通过公私合营来缓解政府和社会的压力。</p><p style=\"text-align: start;\">　　英国财政研究所所长约翰逊认为，经济增长能给英国财政带来喘息空间，但近年来英国经济增长始终乏力，“要实现真正的变革，需要将实际资源摆上桌面。但工党的宣言中没有任何迹象表明工党有计划从什么地方筹集资金。”</p><p style=\"text-align: start;\">　　英国智库决议基金会在6月的一份报告中写道，自2008年金融危机以来，英国经济就停滞不前。而改变这种情况，需要企业和政府大幅增加投资以提高生产率，增加投资将提升“基础设施、设备和研发，从而提高工人的工作效率”。有了更高的生产率，就会有更高的GDP增长和更高的工资。</p><p style=\"text-align: start;\">　　在工党的竞选纲领中，承诺将恢复经济增长作为其首要任务。为此，新一届英国政府将增加公共投资、新工业战略并实行政策改革。但与此同时，工党还面临着高企的政府债务与是否要增税的艰难抉择。</p><p style=\"text-align: start;\">　　在经济生产率停滞不前的背景下，英国民众的收入也没有增长。同时，英国通货膨胀率一度在2022年达到创纪录的11.1%，侵蚀了家庭的消费能力，民众的生活质量也在下降。数据显示，自2010年以来，英国实际工资几乎没有增长，英国智库决议基金会估计，2023年的实际平均周薪比2008年金融危机前的水平还要低205英镑。</p><p style=\"text-align: start;\">　　<strong>内政新老问题叠加</strong></p><p style=\"text-align: start;\">　　在经济复苏面临挑战的情况下，工党政府还要继续解决包括医疗、移民、公共服务危机加剧等新挑战。</p><p style=\"text-align: start;\">　　近年来，英国多个地方政府宣告“破产”，令地方公共服务面临极大挑战。同时，英国国民保健制度、监狱等公共机构也面临重重压力。2023年11月，英国工业城市诺丁汉宣告“破产”；同年9月，英国第二大城市伯明翰宣布“破产”。自2018年以来，英国已有8个地方政府宣布破产。根据英国法律，政府破产意味着将停止法律规定服务之外的所有新支出。</p><p style=\"text-align: start;\">　　英国《卫报》今年2月援引英地方政府信息机构LGIU的一份报告称，英格兰近十分之一地方政府已发出警告，由于面临预算缩减等压力，预计将在未来12个月内破产。LGIU首席执行官乔纳森·卡尔-韦斯特表示，目前地方财政状况普遍“令人绝望”，无法否认存在着结构性的资金问题。英智库机构“政府研究所”6月发布报告称，当前英国医疗候诊时长创历史新高。</p><p style=\"text-align: start;\">　　与此同时，工党政府对于移民问题也难有良方。据英国内政部和国防部数据，截至2024年6月底，今年已有超1.3万非法移民穿越英吉利海峡来到英国，这一数字创四年来新高。此外，英国全国社会调查中心发布的报告称，由于公共政策失败等因素，当前民众对政府体系的信心降至历史低点。该机构高级研究员约翰·柯蒂斯说，新政府面临的挑战是，不仅要重振停滞不前的经济和举步维艰的公共服务，更需解除公众的担忧。（记者 秦天弘）</p>', '[]', 99, 0, 0, 0, 0, '2024-07-09 13:39:24', '2024-07-09 13:39:24');
INSERT INTO `articles` VALUES (28, 12, 2, '4102.8米、5次、36度……我国深海采矿领域迎来自主研制“重器”', '刘珊，刘亮', '[{\"uid\":\"vc-upload-1720531830924-28\",\"name\":\"cb08369a858bd99c36bab348ad28ef30.jpg\",\"status\":\"done\",\"percent\":100,\"id\":\"c09f74d3-0238-439d-b75b-4edfc25e7e77\",\"folderType\":\"5\",\"originalname\":\"1720513840885_755[1].jpg\",\"filename\":\"cb08369a858bd99c36bab348ad28ef30.jpg\",\"path\":\"uploads/2024-07-09/cb08369a858bd99c36bab348ad28ef30.jpg\",\"size\":109979,\"type\":\"image/jpeg\",\"url\":\"http://127.0.0.1:8000/uploads/2024-07-09/cb08369a858bd99c36bab348ad28ef30.jpg\",\"description\":\"\",\"creatorId\":1,\"creatorName\":\"admin\",\"updatedAt\":\"2024-07-09T13:40:17.168Z\",\"createdAt\":\"2024-07-09T13:40:17.168Z\"}]', NULL, '央视网消息：深海大洋海底蕴藏着丰富的多金属结核、富钴结壳和多金属硫化物等矿产资源，富含铜、钴、镍、锰等新能源、航空航天和国防工业的重要关键材料。为了加大对我国海底资源的开发，记者从7月9日上海市政府举办的新闻发布会获悉，近日，由上海交通大学自主研制的深海重载作业采矿车工程样机“开拓二号”，实现在4102.8米海底作业，成功开采获取深海多金属结壳与结核，为全国首次突破4000米，创下了我国深海采矿领域的多项纪录。\n\n此次深海试验，深海重载作业采矿车“开拓二号”在位于西太平洋的多金属结壳与结核海区，连续成功完成了5次下潜，其中4000米级深度1次，采矿车达到了4102.8米深海海底，在平均坡度20度以上，最大达36度的陡峭、崎岖海山，以及海底高粘性、稀软沉积物等各种复杂海底地形条件下，高质量完成了直线行进、原地大曲率回转和爬坡越障等海底行进试验。\n\n上海交通大学“开拓二号”装备首席科学家杨建民表示，“开拓二号”展示出了强大的海底矿石钻进与采集能力，成功获得了约200公斤的各类深海矿产样品。\n\n无论是坡度达20多度的陡峭、崎岖海山，还是由高粘性稀软沉积物堆积的海底“滩涂”，“开拓二号”都可以轻松地行进、爬坡和原地回转。为了让采矿车的行进更加自由，团队研发了“四履带自适应海底复杂地形行进技术”，“开拓二号”可以自主感知采矿环境，四条履带能够根据海底实际地形实时调整方向和状态，适应海底复杂地形行走的需要，为国内首创。除此之外，开拓二号首创多金属结壳、结核、硫化物多矿类复合钻采技术，并搭载深海羽状流、水下噪声等环境综合监测设备，达到国际一流水平。\n\n杨建民表示，此次海试，深海采矿车“开拓二号”在6级风、4级海况条件下，成功完成了多次、连续深海布放回收、海底采矿作业，装备技术性能全面达到设计指标，表明深海采矿车“开拓二号”具有强大的矿物高效开采能力和强大的爬坡越障能力。\n\n据介绍，我国是国际海底矿区开发的先驱投资者和承包者，拥有最多专属勘探权和开采优先权，在太平洋、印度洋等国际海底区域共拥有5块矿区，所含的锰、镍、钴等战略性矿产可满足我国未来数十年的需求。本次试验的成功，将有助于我国早日实现对海底资源的合理利用和开发。', '<p style=\"text-indent: 2em; text-align: start;\"><strong>央视网消息：</strong>深海大洋海底蕴藏着丰富的多金属结核、富钴结壳和多金属硫化物等矿产资源，富含铜、钴、镍、锰等新能源、航空航天和国防工业的重要关键材料。为了加大对我国海底资源的开发，记者从7月9日上海市政府举办的新闻发布会获悉，近日，由上海交通大学自主研制的深海重载作业采矿车工程样机“开拓二号”，实现在4102.8米海底作业，成功开采获取深海多金属结壳与结核，为全国首次突破4000米，创下了我国深海采矿领域的多项纪录。<br></p><p style=\"text-indent: 2em; text-align: start;\">此次深海试验，深海重载作业采矿车“开拓二号”在位于西太平洋的多金属结壳与结核海区，连续成功完成了5次下潜，其中4000米级深度1次，采矿车达到了4102.8米深海海底，在平均坡度20度以上，最大达36度的陡峭、崎岖海山，以及海底高粘性、稀软沉积物等各种复杂海底地形条件下，高质量完成了直线行进、原地大曲率回转和爬坡越障等海底行进试验。</p><p style=\"text-align: center;\"><img src=\"https://p3.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070916073385115.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">上海交通大学“开拓二号”装备首席科学家杨建民表示，“开拓二号”展示出了强大的海底矿石钻进与采集能力，成功获得了约200公斤的各类深海矿产样品。</p><p style=\"text-align: center;\"><img src=\"https://p2.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070916074022551.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">无论是坡度达20多度的陡峭、崎岖海山，还是由高粘性稀软沉积物堆积的海底“滩涂”，“开拓二号”都可以轻松地行进、爬坡和原地回转。为了让采矿车的行进更加自由，团队研发了“四履带自适应海底复杂地形行进技术”，“开拓二号”可以自主感知采矿环境，四条履带能够根据海底实际地形实时调整方向和状态，适应海底复杂地形行走的需要，为国内首创。除此之外，开拓二号首创多金属结壳、结核、硫化物多矿类复合钻采技术，并搭载深海羽状流、水下噪声等环境综合监测设备，达到国际一流水平。</p><p style=\"text-align: center;\"><img src=\"https://p5.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070916074755602.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">杨建民表示，此次海试，深海采矿车“开拓二号”在6级风、4级海况条件下，成功完成了多次、连续深海布放回收、海底采矿作业，装备技术性能全面达到设计指标，表明深海采矿车“开拓二号”具有强大的矿物高效开采能力和强大的爬坡越障能力。</p><p style=\"text-align: center;\"><img src=\"https://p2.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070916075370228.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-indent: 2em; text-align: start;\">据介绍，我国是国际海底矿区开发的先驱投资者和承包者，拥有最多专属勘探权和开采优先权，在太平洋、印度洋等国际海底区域共拥有5块矿区，所含的锰、镍、钴等战略性矿产可满足我国未来数十年的需求。本次试验的成功，将有助于我国早日实现对海底资源的合理利用和开发。</p>', '[]', 99, 0, 0, 0, 0, '2024-07-09 13:40:18', '2024-07-09 13:40:18');
INSERT INTO `articles` VALUES (29, 12, 1, '韦布首次在宇宙中发现“悬空”冰', '肖潇，刘亮', '[]', NULL, '\n　　韦布望远镜在恒星形成区域发现了“悬空”冰。图片来源：美国国家航空航天局\n　　科技日报北京7月8日电 （记者刘霞）据英国《新科学家》杂志网站7日报道，法国科学家借助詹姆斯·韦布空间望远镜，首次在宇宙中发现了“悬空”冰。该发现将有助于人们揭示地球生命化学成分的秘密。\n　　冰拥有固体晶格结构，但当它没有被完全压实时，其中一些分子可能会有点“松松垮垮”。\n　　在每个水分子中，有两个氢原子，其中一个氢原子与其他原子形成共价键而被束缚在晶格内，另一个氢原子则可能形成“悬空”键（即未与其他原子形成稳定共价键的单个电子）。\n　　这些所谓的“悬空”键会产生非常特殊的光信号，科学家此前已在实验室中测量到了这些信号。但在被冰覆盖的太空尘埃颗粒中，很难找到相同的特征，因为地球的大气层会吸收这些光频率。\n　　现在，法国马赛大学研究团队使用韦布空间望远镜的红外光谱仪，在距离地球约500光年的巨大恒星形成区域蝘蜓座云群中，探测到两个与实验室观测极为接近的光谱信号。其中一个似乎源自具有“悬空”键的冰反射的光；另一个则似乎来自与一氧化碳等其他分子结合的冰。\n　　研究人员表示，他们现在可以研究不同形式的冰在不同环境下的差异，一旦成功区分出各种冰的特征，就能更深入地理解冰岩石在长时间尺度上的破碎与聚集过程，而这是行星形成的关键机制。\n　　英国赫里奥特-瓦特大学的马丁·马考斯特表示，在太空中观察到“悬空”冰令人兴奋。光和冰之间的相互作用决定了行星形成时会产生哪些分子，其对于了解形成地球生命的化学物质至关重要。', '<p style=\"text-align: center;\"><img src=\"https://p1.img.cctvpic.com/photoworkspace/contentimg/2024/07/09/2024070906232235392.jpg\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-align: center;\">　　韦布望远镜在恒星形成区域发现了“悬空”冰。图片来源：美国国家航空航天局</p><p style=\"text-align: start;\">　　科技日报北京7月8日电 （记者刘霞）据英国《新科学家》杂志网站7日报道，法国科学家借助詹姆斯·韦布空间望远镜，首次在宇宙中发现了“悬空”冰。该发现将有助于人们揭示地球生命化学成分的秘密。</p><p style=\"text-align: start;\">　　冰拥有固体晶格结构，但当它没有被完全压实时，其中一些分子可能会有点“松松垮垮”。</p><p style=\"text-align: start;\">　　在每个水分子中，有两个氢原子，其中一个氢原子与其他原子形成共价键而被束缚在晶格内，另一个氢原子则可能形成“悬空”键（即未与其他原子形成稳定共价键的单个电子）。</p><p style=\"text-align: start;\">　　这些所谓的“悬空”键会产生非常特殊的光信号，科学家此前已在实验室中测量到了这些信号。但在被冰覆盖的太空尘埃颗粒中，很难找到相同的特征，因为地球的大气层会吸收这些光频率。</p><p style=\"text-align: start;\">　　现在，法国马赛大学研究团队使用韦布空间望远镜的红外光谱仪，在距离地球约500光年的巨大恒星形成区域蝘蜓座云群中，探测到两个与实验室观测极为接近的光谱信号。其中一个似乎源自具有“悬空”键的冰反射的光；另一个则似乎来自与一氧化碳等其他分子结合的冰。</p><p style=\"text-align: start;\">　　研究人员表示，他们现在可以研究不同形式的冰在不同环境下的差异，一旦成功区分出各种冰的特征，就能更深入地理解冰岩石在长时间尺度上的破碎与聚集过程，而这是行星形成的关键机制。</p><p style=\"text-align: start;\">　　英国赫里奥特-瓦特大学的马丁·马考斯特表示，在太空中观察到“悬空”冰令人兴奋。光和冰之间的相互作用决定了行星形成时会产生哪些分子，其对于了解形成地球生命的化学物质至关重要。</p>', '[]', 99, 0, 0, 0, 0, '2024-07-09 13:40:44', '2024-07-09 13:40:44');
INSERT INTO `articles` VALUES (30, 12, 1, '我国自主研发智能研究与实训两用船在大连交付', '刘京京，刘亮', '[]', NULL, '　　7月8日，大连海事大学智能研究与实训两用船在大连中远海运重工有限公司完工交付。该船是我国自主研发建造，集远程遥控、智能航行和教学实训等功能于一体的新型船舶，交付使用后将为我国开展智能航运基础性、前沿性、关键性技术研究和人才教学实训提供重要支撑。\n　　该船总长69.83米、型宽10.9米、型深5米、服务航速17.5节、满载排水量1488吨，可容纳船员、科研人员和学生共50人。\n\n　　大连海事大学智能研究与实训两用船。（大连海事大学供图）\n　　据介绍，该船配备基于海事规则、航行大数据的船舶智能决策模型和自动靠离泊系统，具备航路优化和智能避碰功能。其综合自动化系统实现驾驶、轮机、电气深度融合，具有虚实结合、岸海一体的综合测试与验证能力。此外，该船可通过数字孪生技术实现虚实融合沉浸式教学实训，具备较为先进的智能化教学水平。（记者张博群）', '<p style=\"text-align: start;\">　　7月8日，大连海事大学智能研究与实训两用船在大连中远海运重工有限公司完工交付。该船是我国自主研发建造，集远程遥控、智能航行和教学实训等功能于一体的新型船舶，交付使用后将为我国开展智能航运基础性、前沿性、关键性技术研究和人才教学实训提供重要支撑。</p><p style=\"text-align: start;\">　　该船总长69.83米、型宽10.9米、型深5米、服务航速17.5节、满载排水量1488吨，可容纳船员、科研人员和学生共50人。</p><p style=\"text-align: center;\"><img src=\"https://p1.img.cctvpic.com/photoworkspace/contentimg/2024/07/08/2024070819351790174.jpg\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-align: center;\">　　大连海事大学智能研究与实训两用船。（大连海事大学供图）</p><p style=\"text-align: start;\">　　据介绍，该船配备基于海事规则、航行大数据的船舶智能决策模型和自动靠离泊系统，具备航路优化和智能避碰功能。其综合自动化系统实现驾驶、轮机、电气深度融合，具有虚实结合、岸海一体的综合测试与验证能力。此外，该船可通过数字孪生技术实现虚实融合沉浸式教学实训，具备较为先进的智能化教学水平。（记者张博群）</p>', '[]', 99, 0, 0, 0, 0, '2024-07-09 13:41:07', '2024-07-09 13:41:07');
INSERT INTO `articles` VALUES (31, 12, 1, '我国科学家破解抗结核药物贝达喹啉及其衍生物作用机理', '郭倩，刘亮', '[]', NULL, '　　新华社天津7月8日电（张建新、丛敏）记者从南开大学了解到，南开大学生命科学学院教授贡红日和中国科学院院士饶子和团队研究揭示了治疗耐药结核病药物贝达喹啉（BDQ）及其衍生物TBAJ-587抑制结核分枝杆菌ATP合成酶的分子机理，同时揭示了它们与人源ATP合成酶之间的交叉反应机制，对于进一步提升贝达喹啉的安全性、有效性以及开发新一代安全有效的抗结核药物具有重要指导意义。\n　　该项研究获得国家重点研发计划青年科学家项目、国家自然科学基金优秀青年科学基金项目等的资助，国际顶尖学术期刊《自然》日前在线发表了他们的研究成果。\n\n　　结核分枝杆菌ATP合成酶结合BDQ的冷冻电镜结构。（受访单位供图）\n　　贡红日介绍，结核病是由结核分枝杆菌引发的重大传染性疾病，耐药结核病的治疗是目前困扰医患的突出问题。BDQ是一种靶向结核分枝杆菌ATP合成酶的抑制剂，可以高效抑制结核分枝杆菌的生长，是耐药结核病长程治疗方案的首选药物。然而研究发现，服用BDQ可使患者心脏发生心律失常的风险增加，而且对人源ATP合成酶也存在潜在的抑制作用。\n\n　　结核分枝杆菌ATP合成酶结合TBAJ-587的冷冻电镜结构。（受访单位供图）\n　　研究团队创新性地获得了结核分枝杆菌ATP合成酶蛋白样品，成功地解析了结核分枝杆菌ATP合成酶分别结合BDQ和TBAJ-587状态下的三维结构。结构显示，BDQ和TBAJ-587以相同的方式结合到结核分枝杆菌ATP合成酶转子的多个位点，阻止其旋转，进而干扰了ATP的合成，达到“饿死”结核分枝杆菌的效果。\n\n　　人源ATP合成酶结合BDQ的冷冻电镜结构。（受访单位供图）\n　　研究人员分析发现BDQ和TBAJ-587对人源ATP合成酶的活性均有影响，指出了新一代贝达喹啉衍生物设计优化方向，消除对人源ATP合成酶的影响，进而规避临床治疗中带来的潜在健康风险。\n　　中国工程院院士、广州国家实验室主任钟南山表示，此次重大科技攻关突破多个卡点，揭示抗耐药结核药物贝达喹啉以及衍生物的作用机理，不仅夯实了结核病领域前沿理论研究基础，也为设计具有更高选择性的抗结核药物提供了更多的可能性。\n　　饶子和表示，团队目前已经启动开发新型结核分枝杆菌ATP合成酶抑制剂研究，争取早日研发出具有自主知识产权的抗结核新药。', '<p style=\"text-align: start;\">　　新华社天津7月8日电（张建新、丛敏）记者从南开大学了解到，南开大学生命科学学院教授贡红日和中国科学院院士饶子和团队研究揭示了治疗耐药结核病药物贝达喹啉（BDQ）及其衍生物TBAJ-587抑制结核分枝杆菌ATP合成酶的分子机理，同时揭示了它们与人源ATP合成酶之间的交叉反应机制，对于进一步提升贝达喹啉的安全性、有效性以及开发新一代安全有效的抗结核药物具有重要指导意义。</p><p style=\"text-align: start;\">　　该项研究获得国家重点研发计划青年科学家项目、国家自然科学基金优秀青年科学基金项目等的资助，国际顶尖学术期刊《自然》日前在线发表了他们的研究成果。</p><p style=\"text-align: center;\"><img src=\"https://p3.img.cctvpic.com/photoworkspace/contentimg/2024/07/08/2024070818580861538.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-align: center;\">　　结核分枝杆菌ATP合成酶结合BDQ的冷冻电镜结构。（受访单位供图）</p><p style=\"text-align: start;\">　　贡红日介绍，结核病是由结核分枝杆菌引发的重大传染性疾病，耐药结核病的治疗是目前困扰医患的突出问题。BDQ是一种靶向结核分枝杆菌ATP合成酶的抑制剂，可以高效抑制结核分枝杆菌的生长，是耐药结核病长程治疗方案的首选药物。然而研究发现，服用BDQ可使患者心脏发生心律失常的风险增加，而且对人源ATP合成酶也存在潜在的抑制作用。</p><p style=\"text-align: center;\"><img src=\"https://p5.img.cctvpic.com/photoworkspace/contentimg/2024/07/08/2024070818580874372.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-align: center;\">　　结核分枝杆菌ATP合成酶结合TBAJ-587的冷冻电镜结构。（受访单位供图）</p><p style=\"text-align: start;\">　　研究团队创新性地获得了结核分枝杆菌ATP合成酶蛋白样品，成功地解析了结核分枝杆菌ATP合成酶分别结合BDQ和TBAJ-587状态下的三维结构。结构显示，BDQ和TBAJ-587以相同的方式结合到结核分枝杆菌ATP合成酶转子的多个位点，阻止其旋转，进而干扰了ATP的合成，达到“饿死”结核分枝杆菌的效果。</p><p style=\"text-align: center;\"><img src=\"https://p5.img.cctvpic.com/photoworkspace/contentimg/2024/07/08/2024070818580815806.png\" alt=\"\" data-href=\"\" style=\"\"></p><p style=\"text-align: center;\">　　人源ATP合成酶结合BDQ的冷冻电镜结构。（受访单位供图）</p><p style=\"text-align: start;\">　　研究人员分析发现BDQ和TBAJ-587对人源ATP合成酶的活性均有影响，指出了新一代贝达喹啉衍生物设计优化方向，消除对人源ATP合成酶的影响，进而规避临床治疗中带来的潜在健康风险。</p><p style=\"text-align: start;\">　　中国工程院院士、广州国家实验室主任钟南山表示，此次重大科技攻关突破多个卡点，揭示抗耐药结核药物贝达喹啉以及衍生物的作用机理，不仅夯实了结核病领域前沿理论研究基础，也为设计具有更高选择性的抗结核药物提供了更多的可能性。</p><p style=\"text-align: start;\">　　饶子和表示，团队目前已经启动开发新型结核分枝杆菌ATP合成酶抑制剂研究，争取早日研发出具有自主知识产权的抗结核新药。</p>', '[]', 99, 0, 0, 0, 0, '2024-07-09 13:41:31', '2024-07-09 13:41:31');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `categoryId` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pid` int(11) NOT NULL DEFAULT 0,
  `sort` int(11) NOT NULL DEFAULT 99,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`categoryId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '文章', 0, 1, '2024-07-05 05:54:46', '2024-07-09 04:52:58');
INSERT INTO `category` VALUES (2, '国内新闻', 1, 1, '2024-07-05 05:56:48', '2024-07-09 13:18:39');
INSERT INTO `category` VALUES (3, '国际新闻', 1, 2, '2024-07-05 05:56:56', '2024-07-09 13:18:30');
INSERT INTO `category` VALUES (4, '帮助', 0, 99, '2024-07-05 05:57:05', '2024-07-09 04:53:03');
INSERT INTO `category` VALUES (6, '子目录1', 4, 99, '2024-07-05 06:04:30', '2024-07-09 13:41:37');
INSERT INTO `category` VALUES (10, '子目录2', 4, 99, '2024-07-05 06:11:11', '2024-07-09 13:41:41');
INSERT INTO `category` VALUES (12, '科技新闻', 1, 99, '2024-07-09 13:20:36', '2024-07-09 13:20:36');

-- ----------------------------
-- Table structure for config
-- ----------------------------
DROP TABLE IF EXISTS `config`;
CREATE TABLE `config`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `configName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `configKey` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `configValue` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `configValue`(`configValue`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of config
-- ----------------------------
INSERT INTO `config` VALUES (1, '万能密码', 'super_pwd', '12345678', '需要定期修改', '2024-07-03 12:02:30', '2024-07-03 12:07:20');

-- ----------------------------
-- Table structure for departments
-- ----------------------------
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deptName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `adminId` int(11) NULL DEFAULT NULL,
  `pid` int(11) NOT NULL DEFAULT 0,
  `sort` int(11) NOT NULL DEFAULT 99,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `pid`(`pid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of departments
-- ----------------------------
INSERT INTO `departments` VALUES (1, 'RTChina', 1, 0, 1, '2022-10-19 20:17:09', '2022-10-19 20:17:09');
INSERT INTO `departments` VALUES (2, '开发部', 1, 1, 1000, '2022-10-19 20:22:23', '2022-10-19 20:22:23');
INSERT INTO `departments` VALUES (3, '产品部', 2, 1, 99, '2022-10-21 10:25:30', '2022-10-21 10:25:30');
INSERT INTO `departments` VALUES (4, '销售部', 3, 1, 9, '2022-10-21 10:25:47', '2022-10-21 10:25:47');
INSERT INTO `departments` VALUES (5, '测试部', 0, 1, 0, '2022-11-05 10:54:18', '2022-11-05 10:54:18');

-- ----------------------------
-- Table structure for dicts
-- ----------------------------
DROP TABLE IF EXISTS `dicts`;
CREATE TABLE `dicts`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keyName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `keyCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `keyValue` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dicts
-- ----------------------------
INSERT INTO `dicts` VALUES (8, 'MENU_TYPE_ENUM', 'catalog', '1', '目录', '2024-07-02 08:43:26', '2024-07-17 01:55:39');
INSERT INTO `dicts` VALUES (9, 'MENU_TYPE_ENUM', 'menu', '2', '菜单', '2024-07-02 08:43:31', '2024-07-17 01:55:42');
INSERT INTO `dicts` VALUES (10, 'MENU_TYPE_ENUM', 'points', '3', '按钮', '2024-07-02 08:43:41', '2024-07-17 01:55:47');

-- ----------------------------
-- Table structure for feedbacks
-- ----------------------------
DROP TABLE IF EXISTS `feedbacks`;
CREATE TABLE `feedbacks`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NULL DEFAULT NULL,
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `attachment` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `isRead` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of feedbacks
-- ----------------------------
INSERT INTO `feedbacks` VALUES (2, NULL, 'test123', 'asdfasdfafasdffasfasdfsafdasdfasdfasdfasdfsadf', '[{\"id\":\"e1b56734-b257-4edf-96d9-2efabbcff2fa\",\"folderType\":\"4\",\"originalname\":\"avatar-100x75.jpg\",\"filename\":\"7d31d6d09aea5dc8c4cb7e2ff2596c3c.jpg\",\"path\":\"uploads\\\\2024-07-06\\\\7d31d6d09aea5dc8c4cb7e2ff2596c3c.jpg\",\"size\":21993,\"type\":\"image/jpeg\",\"description\":\"\",\"creatorId\":1,\"creatorName\":\"admin\",\"updatedAt\":\"2024-07-06T02:17:29.579Z\",\"createdAt\":\"2024-07-06T02:17:29.579Z\",\"url\":\"http://localhost:8000/uploads\\\\2024-07-06\\\\7d31d6d09aea5dc8c4cb7e2ff2596c3c.jpg\",\"name\":\"7d31d6d09aea5dc8c4cb7e2ff2596c3c.jpg\",\"uid\":\"__AUTO__1720232249617_0__\"}]', 1, '2024-07-06 02:17:31', '2024-07-06 02:29:26');
INSERT INTO `feedbacks` VALUES (3, NULL, 'test123', '有个错误哦！有个错误哦！有个错误哦！有个错误哦！有个错误哦！有个错误哦！有个错误哦！有个错误哦！有个错误哦！有个错误哦！有个错误哦！有个错误哦！有个错误哦！有个错误哦！有个错误哦！有个错误哦！有个错误哦！有个错误哦！有个错误哦！', '[]', 1, '2024-07-06 02:33:46', '2024-07-06 08:17:50');
INSERT INTO `feedbacks` VALUES (4, NULL, 'test123', '有个错误哦！有个错误哦！有个错误哦！有个错误哦！有个错误哦！有个错误哦！有个错误哦！有个错误哦！有个错误哦！', '[{\"id\":\"5efe747e-4f91-4e91-8ea2-748b6a538470\",\"folderType\":\"4\",\"originalname\":\"avatar-500x500.jpg\",\"filename\":\"58104dcfcdf776df26479392dec37e08.jpg\",\"path\":\"uploads\\\\2024-07-06\\\\58104dcfcdf776df26479392dec37e08.jpg\",\"size\":114919,\"type\":\"image/jpeg\",\"description\":\"\",\"creatorId\":1,\"creatorName\":\"admin\",\"updatedAt\":\"2024-07-06T02:33:54.573Z\",\"createdAt\":\"2024-07-06T02:33:54.573Z\",\"url\":\"http://localhost:8000/uploads\\\\2024-07-06\\\\58104dcfcdf776df26479392dec37e08.jpg\",\"name\":\"58104dcfcdf776df26479392dec37e08.jpg\",\"uid\":\"__AUTO__1720233234606_0__\"},{\"id\":\"10ccd787-a197-4e00-9881-06fb7162edd7\",\"folderType\":\"4\",\"originalname\":\"avatar-1024x768.jpg\",\"filename\":\"cf09cdca986beb2ae255fd19f498febb.jpg\",\"path\":\"uploads\\\\2024-07-06\\\\cf09cdca986beb2ae255fd19f498febb.jpg\",\"size\":261307,\"type\":\"image/jpeg\",\"description\":\"\",\"creatorId\":1,\"creatorName\":\"admin\",\"updatedAt\":\"2024-07-06T02:33:54.586Z\",\"createdAt\":\"2024-07-06T02:33:54.586Z\",\"url\":\"http://localhost:8000/uploads\\\\2024-07-06\\\\cf09cdca986beb2ae255fd19f498febb.jpg\",\"name\":\"cf09cdca986beb2ae255fd19f498febb.jpg\",\"uid\":\"__AUTO__1720233234632_1__\"}]', 1, '2024-07-06 02:33:57', '2024-07-06 02:34:41');
INSERT INTO `feedbacks` VALUES (5, NULL, 'test123', 'asdfsadfsadfasdfasdfasdf2341234234', '[]', 1, '2024-07-06 08:17:21', '2024-07-07 12:24:02');
INSERT INTO `feedbacks` VALUES (6, NULL, 'test123', '通过修改算法可以快速生成风格迥异的主题，4.0 版本中默认提供三套预设算法，分别是默认算法 theme.defaultAlgorithm、暗色算法 theme.darkAlgorithm 和紧凑算法 theme.compactAlgorithm。你可以通过修改 ConfigProvider 中 theme 属性的 algorithm 属性来切换算法。', '[]', 1, '2024-07-06 08:17:33', '2024-07-09 05:22:29');
INSERT INTO `feedbacks` VALUES (7, NULL, 'test123', '测试上传效果', '[{\"id\":\"34e77e07-6909-487f-8fa8-1e6d26bf9366\",\"folderType\":\"4\",\"originalname\":\"IMG_2062.jpg\",\"filename\":\"6d8785e172f2de67bc90e7d7ae28d02a.jpg\",\"path\":\"uploads\\\\2024-07-07\\\\6d8785e172f2de67bc90e7d7ae28d02a.jpg\",\"size\":103095,\"type\":\"image/jpeg\",\"description\":\"\",\"creatorId\":1,\"creatorName\":\"admin\",\"updatedAt\":\"2024-07-07T04:31:38.594Z\",\"createdAt\":\"2024-07-07T04:31:38.594Z\",\"status\":\"done\",\"url\":\"http://localhost:8000/uploads\\\\2024-07-07\\\\6d8785e172f2de67bc90e7d7ae28d02a.jpg\",\"name\":\"6d8785e172f2de67bc90e7d7ae28d02a.jpg\",\"uid\":\"__AUTO__1720326698611_0__\"}]', 1, '2024-07-07 04:32:11', '2024-07-14 03:48:45');
INSERT INTO `feedbacks` VALUES (8, NULL, 'test123', 'adssadfasfasfasdfasdf', '[{\"uid\":\"vc-upload-1720406984615-2\",\"name\":\"2b3a15e10445b0119026eb7487932470.jpg\",\"status\":\"done\",\"percent\":100,\"id\":\"aed682e7-f9b8-44f7-a4fe-61b0b14ff6c0\",\"folderType\":\"4\",\"originalname\":\"0w8g97.jpg\",\"filename\":\"2b3a15e10445b0119026eb7487932470.jpg\",\"path\":\"uploads/2024-07-08/2b3a15e10445b0119026eb7487932470.jpg\",\"size\":289938,\"type\":\"image/jpeg\",\"url\":\"http://localhost:8000/uploads/2024-07-08/2b3a15e10445b0119026eb7487932470.jpg\",\"description\":\"\",\"creatorId\":1,\"creatorName\":\"admin\",\"updatedAt\":\"2024-07-08T02:51:02.603Z\",\"createdAt\":\"2024-07-08T02:51:02.603Z\"}]', 1, '2024-07-08 02:51:06', '2024-07-08 03:10:41');
INSERT INTO `feedbacks` VALUES (9, NULL, 'test123', 'sdafasdfasdfasfasdfadf', '[]', 1, '2024-07-14 03:37:45', '2024-07-14 03:48:43');

-- ----------------------------
-- Table structure for loginfail
-- ----------------------------
DROP TABLE IF EXISTS `loginfail`;
CREATE TABLE `loginfail`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adminId` int(11) NOT NULL,
  `adminName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `failCount` int(11) NOT NULL DEFAULT 0,
  `isLock` int(11) NOT NULL DEFAULT 0 COMMENT '0: 未锁定, 1: 已锁定',
  `lockBeginAt` datetime NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of loginfail
-- ----------------------------
INSERT INTO `loginfail` VALUES (6, 3, 'admin3', 3, 0, NULL, '2024-07-04 10:39:47', '2024-07-04 10:40:02');

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menuName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `menuType` int(11) NOT NULL DEFAULT 1,
  `routerName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pid` int(11) NOT NULL DEFAULT 0,
  `sort` int(11) NULL DEFAULT 0,
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `component` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `linkUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `permissions` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `isLink` tinyint(1) NOT NULL DEFAULT 0,
  `isCache` tinyint(1) NOT NULL DEFAULT 0,
  `isDisabled` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 241 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES (26, '菜单管理', 2, 'menu', 50, 3, '/menu/list', '/system/menu/menu-list.vue', NULL, NULL, 'CopyOutlined', 0, 0, 0, '2021-08-09 15:04:35', '2024-07-06 01:52:43');
INSERT INTO `menus` VALUES (40, '删除', 3, NULL, 26, 99, NULL, NULL, NULL, 'system:menu:batchDelete', NULL, 0, 0, 0, '2021-08-12 09:45:56', '2023-10-07 18:15:50');
INSERT INTO `menus` VALUES (46, '组织管理', 2, 'department', 50, 1, '/employee/department', '/system/employee/department/index.vue', NULL, NULL, 'UserSwitchOutlined', 0, 0, 0, '2021-08-12 16:21:50', '2024-07-16 12:33:13');
INSERT INTO `menus` VALUES (47, '商品管理', 2, 'goods', 48, 1, '/erp/goods/list', '/business/erp/goods/goods-list.vue', NULL, NULL, 'AliwangwangOutlined', 0, 0, 0, '2021-08-12 17:58:39', '2024-07-06 12:45:53');
INSERT INTO `menus` VALUES (48, '商品管理', 1, 'goods', 137, 10, '/erp/goods', NULL, NULL, NULL, 'BarcodeOutlined', 0, 0, 0, '2021-08-12 18:02:59', '2024-07-02 07:25:01');
INSERT INTO `menus` VALUES (50, '系统设置', 1, 'system', 0, 1, '', NULL, NULL, NULL, 'SettingOutlined', 0, 0, 0, '2021-08-13 16:41:33', '2024-07-02 08:53:00');
INSERT INTO `menus` VALUES (76, '角色管理', 2, 'role', 50, 2, '/employee/role', '/system/employee/role/index.vue', NULL, NULL, 'ContactsOutlined', 0, 0, 0, '2021-08-26 10:31:00', '2024-07-04 02:00:28');
INSERT INTO `menus` VALUES (78, '商品分类', 2, 'goods-category', 48, 2, '/erp/catalog/goods', '/business/erp/catalog/goods-catalog.vue', NULL, NULL, 'ApartmentOutlined', 0, 0, 0, '2022-05-18 23:34:14', '2024-07-06 12:45:57');
INSERT INTO `menus` VALUES (79, '自定义分组', 2, 'custom-category', 48, 3, '/erp/catalog/custom', '/business/erp/catalog/custom-catalog.vue', NULL, NULL, 'AppstoreAddOutlined', 0, 0, 0, '2022-05-18 23:37:53', '2023-12-01 19:33:16');
INSERT INTO `menus` VALUES (81, '操作日志', 2, 'operate-log', 213, 3, '/operate-log/list', '/support/operate-log/operate-log-list.vue', NULL, NULL, 'VideoCameraOutlined', 0, 0, 0, '2022-05-20 12:37:24', '2024-07-15 11:39:02');
INSERT INTO `menus` VALUES (86, '添加部门', 3, NULL, 46, 1, NULL, NULL, NULL, 'system:department:add', NULL, 0, 0, 0, '2022-05-26 23:33:37', '2023-10-07 18:26:35');
INSERT INTO `menus` VALUES (87, '修改部门', 3, NULL, 46, 2, NULL, NULL, NULL, 'system:department:update', NULL, 0, 0, 0, '2022-05-26 23:34:11', '2023-10-07 18:26:44');
INSERT INTO `menus` VALUES (88, '删除部门', 3, NULL, 46, 3, NULL, NULL, NULL, 'system:department:delete', NULL, 0, 0, 0, '2022-05-26 23:34:49', '2023-10-07 18:26:49');
INSERT INTO `menus` VALUES (91, '添加员工', 3, NULL, 46, 0, NULL, NULL, NULL, 'system:employee:add', NULL, 0, 0, 0, '2022-05-27 00:11:38', '2023-10-07 18:27:46');
INSERT INTO `menus` VALUES (92, '编辑员工', 3, NULL, 46, 0, NULL, NULL, NULL, 'system:employee:update', NULL, 0, 0, 0, '2022-05-27 00:12:10', '2023-10-07 18:27:49');
INSERT INTO `menus` VALUES (93, '禁用启用员工', 3, NULL, 46, 0, NULL, NULL, NULL, 'system:employee:disabled', NULL, 0, 0, 0, '2022-05-27 00:12:37', '2023-10-07 18:27:53');
INSERT INTO `menus` VALUES (94, '调整员工部门', 3, NULL, 46, 0, NULL, NULL, NULL, 'system:employee:department:update', NULL, 0, 0, 0, '2022-05-27 00:12:59', '2023-10-07 18:27:34');
INSERT INTO `menus` VALUES (95, '重置密码', 3, NULL, 46, 0, NULL, NULL, NULL, 'system:employee:password:reset', NULL, 0, 0, 0, '2022-05-27 00:13:30', '2023-10-07 18:27:57');
INSERT INTO `menus` VALUES (96, '删除员工', 3, NULL, 46, 0, NULL, NULL, NULL, 'system:employee:delete', NULL, 0, 0, 0, '2022-05-27 00:14:08', '2023-10-07 18:28:01');
INSERT INTO `menus` VALUES (97, '添加角色', 3, NULL, 76, 0, NULL, NULL, NULL, 'system:role:add', NULL, 0, 0, 0, '2022-05-27 00:34:00', '2023-10-07 18:42:31');
INSERT INTO `menus` VALUES (98, '删除角色', 3, NULL, 76, 0, NULL, NULL, NULL, 'system:role:delete', NULL, 0, 0, 0, '2022-05-27 00:34:19', '2023-10-07 18:42:35');
INSERT INTO `menus` VALUES (99, '编辑角色', 3, NULL, 76, 0, NULL, NULL, NULL, 'system:role:update', NULL, 0, 0, 0, '2022-05-27 00:34:55', '2023-10-07 18:42:44');
INSERT INTO `menus` VALUES (101, '批量移除员工', 3, NULL, 76, 0, NULL, NULL, NULL, 'system:role:employee:batchDelete', NULL, 0, 0, 0, '2022-05-27 00:39:05', '2024-07-13 05:05:48');
INSERT INTO `menus` VALUES (102, '移除员工', 3, NULL, 76, 0, NULL, NULL, NULL, 'system:role:employee:delete', NULL, 0, 0, 0, '2022-05-27 00:39:21', '2023-10-07 18:43:37');
INSERT INTO `menus` VALUES (103, '添加员工', 3, NULL, 76, 0, NULL, NULL, NULL, 'system:role:employee:add', NULL, 0, 0, 0, '2022-05-27 00:39:38', '2023-10-07 18:44:05');
INSERT INTO `menus` VALUES (104, '修改权限', 3, NULL, 76, 0, NULL, NULL, NULL, 'system:role:menu:update', NULL, 0, 0, 0, '2022-05-27 00:41:55', '2023-10-07 18:44:11');
INSERT INTO `menus` VALUES (105, '添加', 3, NULL, 26, 97, NULL, NULL, NULL, 'system:menu:add', NULL, 0, 0, 0, '2022-05-27 00:44:37', '2024-07-05 00:06:36');
INSERT INTO `menus` VALUES (106, '编辑', 3, NULL, 26, 98, NULL, NULL, NULL, 'system:menu:update', NULL, 0, 0, 0, '2022-05-27 00:44:59', '2024-07-05 00:06:31');
INSERT INTO `menus` VALUES (109, '参数配置', 2, 'config', 50, 98, '/config/list', '/support/config/config-list.vue', NULL, NULL, 'AntDesignOutlined', 0, 0, 0, '2022-05-27 13:34:41', '2024-07-15 11:40:00');
INSERT INTO `menus` VALUES (110, '数据字典', 2, 'dict', 50, 99, '/dict/list', '/support/dict/index.vue', NULL, NULL, 'CodeSandboxOutlined', 0, 0, 0, '2022-05-27 17:53:00', '2024-07-15 11:37:58');
INSERT INTO `menus` VALUES (132, '通知公告', 2, 'notice', 138, 2, '/oa/notice/notice-list', '/business/oa/notice/notice-list.vue', NULL, NULL, 'SoundOutlined', 0, 0, 0, '2022-06-24 18:23:09', '2024-07-06 12:46:00');
INSERT INTO `menus` VALUES (133, '缓存管理', 2, 'cache', 50, 97, '/cache/list', '/support/cache/cache-list.vue', NULL, NULL, 'BorderInnerOutlined', 0, 0, 0, '2022-06-24 18:52:25', '2024-07-15 11:38:34');
INSERT INTO `menus` VALUES (137, '进销存系统', 1, 'erp', 220, 5, '', NULL, NULL, NULL, 'AccountBookOutlined', 0, 0, 0, '2022-06-24 20:07:20', '2024-07-09 04:54:39');
INSERT INTO `menus` VALUES (138, 'OA系统', 1, 'oa', 220, 6, NULL, NULL, NULL, NULL, 'BankOutlined', 0, 0, 0, '2022-06-24 20:09:18', '2024-07-09 04:54:46');
INSERT INTO `menus` VALUES (142, '公告详情', 2, 'notice-detail', 138, 3, '/oa/notice/notice-detail', '/business/oa/notice/notice-detail.vue', NULL, NULL, 'PicLeftOutlined', 0, 0, 0, '2022-06-25 16:38:47', '2024-07-09 04:58:40');
INSERT INTO `menus` VALUES (143, '登录日志', 2, 'login-log', 213, 2, '/login-log/list', '/support/login-log/login-log-list.vue', NULL, NULL, 'LoginOutlined', 0, 0, 0, '2022-06-28 15:01:38', '2024-07-15 11:40:32');
INSERT INTO `menus` VALUES (144, '企业信息', 2, 'enterprise', 138, 98, '/oa/enterprise/enterprise-list', '/business/oa/enterprise/enterprise-list.vue', NULL, NULL, 'ShopOutlined', 0, 0, 0, '2022-09-14 17:00:07', '2024-07-09 04:57:44');
INSERT INTO `menus` VALUES (145, '企业详情', 2, 'enterprise-detail', 138, 99, '/oa/enterprise/enterprise-detail', '/business/oa/enterprise/enterprise-detail.vue', NULL, NULL, 'BarsOutlined', 0, 0, 0, '2022-09-14 18:52:52', '2024-07-02 07:25:53');
INSERT INTO `menus` VALUES (148, '留言反馈', 2, 'feedback', 218, 2, '/feedback/list', '/support/feedback/feedback-list.vue', NULL, NULL, 'CoffeeOutlined', 0, 0, 0, '2022-09-14 19:59:52', '2024-07-15 11:41:09');
INSERT INTO `menus` VALUES (149, '我的通知', 2, 'notice-employee', 138, 4, '/oa/notice/notice-employee-list', '/business/oa/notice/notice-employee-list.vue', NULL, NULL, 'NotificationOutlined', 0, 0, 0, '2022-09-14 20:29:41', '2024-07-09 04:58:52');
INSERT INTO `menus` VALUES (150, '我的通知公告详情', 2, 'notice-employee-detail', 138, 5, '/oa/notice/notice-employee-detail', '/business/oa/notice/notice-employee-detail.vue', NULL, NULL, 'PicRightOutlined', 0, 0, 0, '2022-09-14 20:30:25', '2024-07-09 04:59:01');
INSERT INTO `menus` VALUES (152, '更新日志', 2, 'version-log', 218, 99, '/version-log/list', '/support/version-log/version-log-list.vue', NULL, NULL, 'HeartOutlined', 0, 0, 0, '2022-10-10 10:31:20', '2024-07-15 11:41:17');
INSERT INTO `menus` VALUES (153, '清除缓存', 3, NULL, 133, 1, NULL, NULL, NULL, 'support:cache:delete', NULL, 0, 0, 0, '2022-10-15 22:45:13', '2024-07-04 10:36:40');
INSERT INTO `menus` VALUES (154, '详情', 3, NULL, 133, 99, NULL, NULL, NULL, 'support:cache:keys', NULL, 0, 0, 0, '2022-10-15 22:45:48', '2024-07-04 10:36:35');
INSERT INTO `menus` VALUES (159, '新建', 3, NULL, 110, 1, NULL, NULL, NULL, 'support:dict:add', NULL, 0, 0, 0, '2022-10-15 23:23:51', '2024-07-02 09:02:38');
INSERT INTO `menus` VALUES (160, '编辑', 3, NULL, 110, 2, NULL, NULL, NULL, 'support:dict:edit', NULL, 0, 0, 0, '2022-10-15 23:24:05', '2024-07-02 09:02:42');
INSERT INTO `menus` VALUES (161, '批量删除', 3, NULL, 110, 4, NULL, NULL, NULL, 'support:dict:batchDelete', NULL, 0, 0, 0, '2022-10-15 23:24:34', '2024-07-02 09:02:46');
INSERT INTO `menus` VALUES (163, '新建', 3, NULL, 109, 99, NULL, NULL, NULL, 'support:config:add', NULL, 0, 0, 0, '2022-10-15 23:26:56', '2023-10-07 18:16:17');
INSERT INTO `menus` VALUES (164, '编辑', 3, NULL, 109, 99, NULL, NULL, NULL, 'support:config:update', NULL, 0, 0, 0, '2022-10-15 23:27:07', '2023-10-07 18:16:24');
INSERT INTO `menus` VALUES (165, '查询', 3, NULL, 47, 99, NULL, NULL, NULL, 'goods:query', NULL, 0, 0, 0, '2022-10-16 19:55:39', '2023-10-07 13:58:28');
INSERT INTO `menus` VALUES (166, '新建', 3, NULL, 47, 99, NULL, NULL, NULL, 'goods:add', NULL, 0, 0, 0, '2022-10-16 19:56:00', '2023-10-07 13:58:32');
INSERT INTO `menus` VALUES (167, '批量删除', 3, NULL, 47, 99, NULL, NULL, NULL, 'goods:batchDelete', NULL, 0, 0, 0, '2022-10-16 19:56:15', '2023-10-07 13:58:35');
INSERT INTO `menus` VALUES (173, '新建', 3, NULL, 78, 99, NULL, NULL, NULL, 'category:add', NULL, 0, 0, 0, '2022-10-16 20:17:02', '2023-10-07 13:54:01');
INSERT INTO `menus` VALUES (174, '查询', 3, NULL, 78, 99, NULL, NULL, NULL, 'category:tree', NULL, 0, 0, 0, '2022-10-16 20:17:22', '2023-10-07 13:54:33');
INSERT INTO `menus` VALUES (175, '编辑', 3, NULL, 78, 99, NULL, NULL, NULL, 'category:update', NULL, 0, 0, 0, '2022-10-16 20:17:38', '2023-10-07 13:54:18');
INSERT INTO `menus` VALUES (176, '删除', 3, NULL, 78, 99, NULL, NULL, NULL, 'category:delete', NULL, 0, 0, 0, '2022-10-16 20:17:50', '2023-10-07 13:54:27');
INSERT INTO `menus` VALUES (177, '新建', 3, NULL, 79, 99, NULL, NULL, NULL, 'custom:category:add', NULL, 0, 0, 0, '2022-10-16 20:17:02', '2023-10-07 13:57:32');
INSERT INTO `menus` VALUES (178, '查询', 3, NULL, 79, 99, NULL, NULL, NULL, 'custom:category:tree', NULL, 0, 0, 0, '2022-10-16 20:17:22', '2023-10-07 13:57:50');
INSERT INTO `menus` VALUES (179, '编辑', 3, NULL, 79, 99, NULL, NULL, NULL, 'custom:category:update', NULL, 0, 0, 0, '2022-10-16 20:17:38', '2023-10-07 13:58:02');
INSERT INTO `menus` VALUES (180, '删除', 3, NULL, 79, 99, NULL, NULL, NULL, 'custom:category:delete', NULL, 0, 0, 0, '2022-10-16 20:17:50', '2023-10-07 13:58:12');
INSERT INTO `menus` VALUES (181, '查询', 3, NULL, 144, 99, NULL, NULL, NULL, 'oa:enterprise:query', NULL, 0, 0, 0, '2022-10-16 20:25:14', '2023-10-07 12:00:09');
INSERT INTO `menus` VALUES (182, '新建', 3, NULL, 144, 99, NULL, NULL, NULL, 'oa:enterprise:add', NULL, 0, 0, 0, '2022-10-16 20:25:25', '2023-10-07 12:00:17');
INSERT INTO `menus` VALUES (183, '编辑', 3, NULL, 144, 99, NULL, NULL, NULL, 'oa:enterprise:update', NULL, 0, 0, 0, '2022-10-16 20:25:36', '2023-10-07 12:00:38');
INSERT INTO `menus` VALUES (184, '删除', 3, NULL, 144, 99, NULL, NULL, NULL, 'oa:enterprise:delete', NULL, 0, 0, 0, '2022-10-16 20:25:53', '2023-10-07 12:00:46');
INSERT INTO `menus` VALUES (185, '查询', 3, NULL, 132, 99, NULL, NULL, NULL, 'oa:notice:query', NULL, 0, 0, 0, '2022-10-16 20:26:38', '2023-10-07 11:43:01');
INSERT INTO `menus` VALUES (186, '新建', 3, NULL, 132, 99, NULL, NULL, NULL, 'oa:notice:add', NULL, 0, 0, 0, '2022-10-16 20:27:04', '2023-10-07 11:43:07');
INSERT INTO `menus` VALUES (187, '编辑', 3, NULL, 132, 99, NULL, NULL, NULL, 'oa:notice:update', NULL, 0, 0, 0, '2022-10-16 20:27:15', '2023-10-07 11:43:12');
INSERT INTO `menus` VALUES (188, '删除', 3, NULL, 132, 99, NULL, NULL, NULL, 'oa:notice:delete', NULL, 0, 0, 0, '2022-10-16 20:27:23', '2023-10-07 11:43:18');
INSERT INTO `menus` VALUES (190, '查询', 3, NULL, 152, 99, NULL, NULL, NULL, 'support:versionlog:query', NULL, 0, 0, 0, '2022-10-16 20:28:33', '2024-07-05 13:16:20');
INSERT INTO `menus` VALUES (191, '新建', 3, NULL, 152, 99, NULL, NULL, NULL, 'support:versionlog:add', NULL, 0, 0, 0, '2022-10-16 20:28:46', '2024-07-05 13:16:17');
INSERT INTO `menus` VALUES (192, '批量删除', 3, NULL, 152, 99, NULL, NULL, NULL, 'support:versionlog:batchDelete', NULL, 0, 0, 0, '2022-10-16 20:29:10', '2024-07-05 13:16:14');
INSERT INTO `menus` VALUES (193, '文件管理', 2, 'file', 50, 96, '/file/list', '/support/file/file-list.vue', NULL, NULL, 'FolderOpenOutlined', 0, 0, 0, '2022-10-21 11:26:11', '2024-07-15 11:39:47');
INSERT INTO `menus` VALUES (194, '删除', 3, NULL, 47, 99, NULL, NULL, NULL, 'goods:delete', NULL, 0, 0, 0, '2022-10-21 20:00:12', '2023-10-07 13:58:39');
INSERT INTO `menus` VALUES (195, '修改', 3, NULL, 47, 99, NULL, NULL, NULL, 'goods:update', NULL, 0, 0, 0, '2022-10-21 20:05:23', '2023-10-07 13:58:42');
INSERT INTO `menus` VALUES (196, '查看详情', 3, NULL, 145, 99, NULL, NULL, NULL, 'oa:enterprise:detail', NULL, 0, 0, 0, '2022-10-21 20:16:47', '2023-10-07 11:48:59');
INSERT INTO `menus` VALUES (198, '删除', 3, NULL, 152, 99, NULL, NULL, NULL, 'support:versionlog:delete', NULL, 0, 0, 0, '2022-10-21 20:42:34', '2024-07-05 13:16:10');
INSERT INTO `menus` VALUES (199, '查询', 3, NULL, 109, 99, NULL, NULL, NULL, 'support:config:query', NULL, 0, 0, 0, '2022-10-21 20:45:14', '2023-10-07 18:16:27');
INSERT INTO `menus` VALUES (200, '查询', 3, NULL, 193, 1, NULL, NULL, NULL, 'support:file:query', NULL, 0, 0, 0, '2022-10-21 20:47:23', '2024-07-04 10:35:38');
INSERT INTO `menus` VALUES (203, '查询', 3, NULL, 143, 1, NULL, NULL, NULL, 'support:loginLog:query', NULL, 0, 0, 0, '2022-10-21 21:05:11', '2024-07-04 10:32:43');
INSERT INTO `menus` VALUES (204, '查询', 3, NULL, 81, 1, NULL, NULL, NULL, 'support:operateLog:query', NULL, 0, 0, 0, '2022-10-22 10:33:31', '2024-07-04 10:32:48');
INSERT INTO `menus` VALUES (205, '详情', 3, NULL, 81, 99, NULL, NULL, NULL, 'support:operateLog:detail', NULL, 0, 0, 0, '2022-10-22 10:33:49', '2023-10-07 14:28:04');
INSERT INTO `menus` VALUES (207, '更新', 3, NULL, 152, 99, NULL, NULL, NULL, 'support:versionlog:update', NULL, 0, 0, 0, '2022-10-22 11:51:32', '2024-07-05 13:16:06');
INSERT INTO `menus` VALUES (213, '网络安全', 1, 'security', 0, 3, NULL, NULL, NULL, '', 'SafetyCertificateOutlined', 0, 0, 0, '2023-10-17 19:03:08', '2024-07-08 03:33:17');
INSERT INTO `menus` VALUES (214, '登录锁定', 2, 'login-fail', 213, 1, '/login-fail/list', '/support/login-fail/login-fail-list.vue', NULL, NULL, 'LockOutlined', 0, 0, 0, '2023-10-17 19:04:24', '2024-07-15 11:39:26');
INSERT INTO `menus` VALUES (216, '导出', 3, NULL, 47, 99, NULL, NULL, NULL, 'goods:exportGoods', NULL, 0, 0, 0, '2023-12-01 19:34:03', '2024-07-08 03:34:54');
INSERT INTO `menus` VALUES (217, '导入', 3, NULL, 47, 3, NULL, NULL, NULL, 'goods:importGoods', NULL, 0, 0, 0, '2023-12-01 19:34:22', '2024-07-08 03:35:10');
INSERT INTO `menus` VALUES (218, '内容管理', 1, 'content', 0, 4, NULL, NULL, NULL, '', 'FileSearchOutlined', 0, 0, 0, '2023-12-01 19:37:28', '2024-07-08 03:33:12');
INSERT INTO `menus` VALUES (219, '删除', 3, NULL, 110, 3, NULL, NULL, NULL, 'support:dict:delete', NULL, 0, 0, 0, '2024-07-02 09:02:29', '2024-07-08 03:35:06');
INSERT INTO `menus` VALUES (220, '其他功能', 1, 'other', 0, 6, NULL, NULL, NULL, NULL, 'BuildOutlined', 0, 0, 0, '2024-07-04 10:18:50', '2024-07-08 03:33:40');
INSERT INTO `menus` VALUES (221, '解除锁定', 3, NULL, 214, 2, NULL, NULL, NULL, 'support:loginfail:delete', NULL, 0, 0, 0, '2024-07-04 10:30:57', '2024-07-08 03:34:13');
INSERT INTO `menus` VALUES (222, '查询', 3, NULL, 214, 1, NULL, NULL, NULL, 'support:loginfail:query', NULL, 0, 0, 0, '2024-07-04 10:31:51', '2024-07-08 03:33:53');
INSERT INTO `menus` VALUES (223, '清空', 3, NULL, 143, 2, NULL, NULL, NULL, ' support:loginlog:clear', NULL, 0, 0, 0, '2024-07-04 10:32:37', '2024-07-08 03:35:32');
INSERT INTO `menus` VALUES (224, '清空', 3, NULL, 81, 2, NULL, NULL, NULL, 'support:operatelog:clear', NULL, 0, 0, 0, '2024-07-04 10:33:17', '2024-07-08 03:35:27');
INSERT INTO `menus` VALUES (225, '上传文件', 3, NULL, 193, 2, NULL, NULL, NULL, 'support:file:upload', NULL, 0, 0, 0, '2024-07-04 10:35:32', '2024-07-08 03:35:23');
INSERT INTO `menus` VALUES (226, '查询', 3, NULL, 148, 1, NULL, NULL, NULL, 'support:feedback:query', NULL, 0, 0, 0, '2024-07-05 00:00:17', '2024-07-08 03:33:59');
INSERT INTO `menus` VALUES (227, '删除', 3, NULL, 148, 2, NULL, NULL, NULL, 'support:feedback:delete', NULL, 0, 0, 0, '2024-07-05 00:01:43', '2024-07-08 03:35:19');
INSERT INTO `menus` VALUES (228, '添加', 3, NULL, 148, 3, NULL, NULL, NULL, 'support:feedback:add', NULL, 0, 0, 0, '2024-07-05 00:02:04', '2024-07-08 03:35:02');
INSERT INTO `menus` VALUES (229, '删除', 3, NULL, 193, 99, NULL, NULL, NULL, 'support:file:delete', NULL, 0, 0, 0, '2024-07-05 00:03:35', '2024-07-08 03:34:49');
INSERT INTO `menus` VALUES (230, '下载文件', 3, NULL, 193, 4, NULL, NULL, NULL, 'support:file:download', NULL, 0, 0, 0, '2024-07-05 00:05:38', '2024-07-08 03:34:58');
INSERT INTO `menus` VALUES (231, '查询', 3, NULL, 26, 1, NULL, NULL, NULL, 'system:menu:query', NULL, 0, 0, 0, '2024-07-05 00:06:51', '2024-07-08 03:34:03');
INSERT INTO `menus` VALUES (232, '文章管理', 2, 'article', 218, 1, '/article/list', '/support/article/index.vue', NULL, NULL, 'BarsOutlined', 0, 0, 0, '2024-07-05 00:19:12', '2024-07-15 11:40:49');
INSERT INTO `menus` VALUES (233, '添加分类', 3, NULL, 232, 1, NULL, NULL, NULL, 'support:articleCategory:add', NULL, 0, 0, 0, '2024-07-05 00:21:08', '2024-07-08 03:34:07');
INSERT INTO `menus` VALUES (234, '修改分类', 3, NULL, 232, 2, NULL, NULL, NULL, 'support:articleCategory:update', NULL, 0, 0, 0, '2024-07-05 00:21:50', '2024-07-08 03:35:15');
INSERT INTO `menus` VALUES (235, '查询', 3, NULL, 232, 3, NULL, NULL, NULL, 'support:article:query', NULL, 0, 0, 0, '2024-07-05 00:22:35', '2024-07-08 03:34:25');
INSERT INTO `menus` VALUES (236, '添加', 3, NULL, 232, 4, NULL, NULL, NULL, 'support:article:add', NULL, 0, 0, 0, '2024-07-05 00:22:52', '2024-07-08 03:34:31');
INSERT INTO `menus` VALUES (237, '修改', 3, NULL, 232, 5, NULL, NULL, NULL, 'support:article:update', NULL, 0, 0, 0, '2024-07-05 00:23:07', '2024-07-08 03:34:37');
INSERT INTO `menus` VALUES (238, '删除', 3, NULL, 232, 6, NULL, NULL, NULL, 'support:article:delete', NULL, 0, 0, 0, '2024-07-05 00:23:17', '2024-07-08 03:34:43');
INSERT INTO `menus` VALUES (239, '百度', 2, '', 220, 99, '/baidu', NULL, 'https://baidu.com/', NULL, 'AimOutlined', 1, 0, 0, '2024-07-12 04:18:37', '2024-07-13 05:43:40');
INSERT INTO `menus` VALUES (240, 'Bing', 2, '', 220, 99, '/bing', NULL, 'https://bing.com/', NULL, 'AlertOutlined', 1, 1, 0, '2024-07-12 05:05:19', '2024-07-13 05:43:44');

-- ----------------------------
-- Table structure for operate_logs
-- ----------------------------
DROP TABLE IF EXISTS `operate_logs`;
CREATE TABLE `operate_logs`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adminId` int(11) NULL DEFAULT NULL,
  `adminName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `method` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `params` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `result` int(11) NOT NULL DEFAULT 0 COMMENT '0: 失败, 1: 成功',
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `userAgent` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 43 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of operate_logs
-- ----------------------------
INSERT INTO `operate_logs` VALUES (1, 1, 'admin', '/api/operatelogs/clear', 'POST', '{}', 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 03:48:56');
INSERT INTO `operate_logs` VALUES (2, 1, 'admin', '/api/operatelogs/list?adminName=&page=1&pageSize=10', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 03:48:56');
INSERT INTO `operate_logs` VALUES (3, 1, 'admin', '/api/tablecolumns/20005', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 03:48:58');
INSERT INTO `operate_logs` VALUES (4, 1, 'admin', '/api/loginfail/list?page=1&pageSize=10', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 03:48:58');
INSERT INTO `operate_logs` VALUES (5, 1, 'admin', '/api/versionlogs/list?page=1&pageSize=8&searchCount=false', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 03:49:00');
INSERT INTO `operate_logs` VALUES (6, 1, 'admin', '/api/feedback/list?page=1&pageSize=10', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 03:49:00');
INSERT INTO `operate_logs` VALUES (7, 1, 'admin', '/api/admins/login/info', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 03:49:16');
INSERT INTO `operate_logs` VALUES (8, 1, 'admin', '/api/versionlogs/list?page=1&pageSize=8&searchCount=false', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 03:49:17');
INSERT INTO `operate_logs` VALUES (9, 1, 'admin', '/api/feedback/list?page=1&pageSize=10', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 03:49:17');
INSERT INTO `operate_logs` VALUES (10, 1, 'admin', '/api/articles/category/all', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 03:52:41');
INSERT INTO `operate_logs` VALUES (11, 1, 'admin', '/api/articles/list?keywords=&page=1&pageSize=10', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 03:52:41');
INSERT INTO `operate_logs` VALUES (12, 1, 'admin', '/api/articles/category/all', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 03:52:43');
INSERT INTO `operate_logs` VALUES (13, 1, 'admin', '/api/admins/login/info', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 03:53:12');
INSERT INTO `operate_logs` VALUES (14, 1, 'admin', '/api/articles/list?keywords=&page=1&pageSize=10', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 03:53:12');
INSERT INTO `operate_logs` VALUES (15, 1, 'admin', '/api/articles/category/all', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 03:53:12');
INSERT INTO `operate_logs` VALUES (16, 1, 'admin', '/api/articles/category/all', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 03:53:23');
INSERT INTO `operate_logs` VALUES (17, 1, 'admin', '/api/articles/detail/31', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 03:53:23');
INSERT INTO `operate_logs` VALUES (18, 1, 'admin', '/api/feedback/list?page=1&pageSize=10', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 03:53:33');
INSERT INTO `operate_logs` VALUES (19, 1, 'admin', '/api/versionlogs/list?page=1&pageSize=8&searchCount=false', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 03:53:33');
INSERT INTO `operate_logs` VALUES (20, 1, 'admin', '/api/feedback/list?page=1&pageSize=10', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:07:39');
INSERT INTO `operate_logs` VALUES (21, 1, 'admin', '/api/versionlogs/list?page=1&pageSize=8&searchCount=false', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:07:39');
INSERT INTO `operate_logs` VALUES (22, 1, 'admin', '/api/files/list?page=1&pageSize=10', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:07:43');
INSERT INTO `operate_logs` VALUES (23, 1, 'admin', '/api/upload', 'POST', '{\"folder\":\"1\"}', 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:08:32');
INSERT INTO `operate_logs` VALUES (24, 1, 'admin', '/api/files/c79f5028-0a10-4537-a9b3-bad53ea55c51', 'DELETE', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:08:50');
INSERT INTO `operate_logs` VALUES (25, 1, 'admin', '/api/files/list?page=1&pageSize=10', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:08:52');
INSERT INTO `operate_logs` VALUES (26, 1, 'admin', '/api/upload', 'POST', '{\"folder\":\"1\"}', 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:09:08');
INSERT INTO `operate_logs` VALUES (27, 1, 'admin', '/api/files/list?page=1&pageSize=10', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:09:14');
INSERT INTO `operate_logs` VALUES (28, 1, 'admin', '/api/files/e687676b-85d2-42f9-8ff3-d2f4f605da09', 'DELETE', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:11:10');
INSERT INTO `operate_logs` VALUES (29, 1, 'admin', '/api/files/list?page=1&pageSize=10', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:11:10');
INSERT INTO `operate_logs` VALUES (30, 1, 'admin', '/api/upload', 'POST', '{\"folder\":\"1\"}', 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:11:15');
INSERT INTO `operate_logs` VALUES (31, 1, 'admin', '/api/files/ee4214e4-aa10-4a64-ac67-0beb5d1425c2', 'DELETE', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:11:44');
INSERT INTO `operate_logs` VALUES (32, 1, 'admin', '/api/files/list?page=1&pageSize=10', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:11:46');
INSERT INTO `operate_logs` VALUES (33, 1, 'admin', '/api/articles/list?keywords=&page=1&pageSize=10', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:13:41');
INSERT INTO `operate_logs` VALUES (34, 1, 'admin', '/api/articles/category/all', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:13:41');
INSERT INTO `operate_logs` VALUES (35, 1, 'admin', '/api/articles/category/all', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:13:43');
INSERT INTO `operate_logs` VALUES (36, 1, 'admin', '/api/upload', 'POST', '{\"folder\":\"5\"}', 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:13:51');
INSERT INTO `operate_logs` VALUES (37, 1, 'admin', '/api/files/97ef551e-6304-41d2-ab37-aa22fc2de99e', 'DELETE', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:14:01');
INSERT INTO `operate_logs` VALUES (38, 1, 'admin', '/api/upload', 'POST', '{\"folder\":\"5\"}', 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:14:05');
INSERT INTO `operate_logs` VALUES (39, 1, 'admin', '/api/files/23d1deb1-aa87-44dd-a8a7-05469f228583', 'DELETE', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:14:14');
INSERT INTO `operate_logs` VALUES (40, 1, 'admin', '/api/files/list?page=1&pageSize=10', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:17:13');
INSERT INTO `operate_logs` VALUES (41, 1, 'admin', '/api/feedback/list?page=1&pageSize=10', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:17:43');
INSERT INTO `operate_logs` VALUES (42, 1, 'admin', '/api/versionlogs/list?page=1&pageSize=8&searchCount=false', 'GET', NULL, 1, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', '', '2024-07-17 06:17:43');

-- ----------------------------
-- Table structure for role_menus
-- ----------------------------
DROP TABLE IF EXISTS `role_menus`;
CREATE TABLE `role_menus`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) NULL DEFAULT NULL,
  `menuId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `role_menus_menuId_roleId_unique`(`roleId`, `menuId`) USING BTREE,
  INDEX `menuId`(`menuId`) USING BTREE,
  CONSTRAINT `role_menus_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_menus_ibfk_2` FOREIGN KEY (`menuId`) REFERENCES `menus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1085 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_menus
-- ----------------------------
INSERT INTO `role_menus` VALUES (458, '2024-07-04 02:05:31', '2024-07-04 02:05:31', 3, 47);
INSERT INTO `role_menus` VALUES (459, '2024-07-04 02:05:31', '2024-07-04 02:05:31', 3, 48);
INSERT INTO `role_menus` VALUES (460, '2024-07-04 02:05:31', '2024-07-04 02:05:31', 3, 78);
INSERT INTO `role_menus` VALUES (461, '2024-07-04 02:05:31', '2024-07-04 02:05:31', 3, 79);
INSERT INTO `role_menus` VALUES (462, '2024-07-04 02:05:31', '2024-07-04 02:05:31', 3, 137);
INSERT INTO `role_menus` VALUES (463, '2024-07-04 02:05:31', '2024-07-04 02:05:31', 3, 165);
INSERT INTO `role_menus` VALUES (464, '2024-07-04 02:05:31', '2024-07-04 02:05:31', 3, 166);
INSERT INTO `role_menus` VALUES (465, '2024-07-04 02:05:31', '2024-07-04 02:05:31', 3, 167);
INSERT INTO `role_menus` VALUES (466, '2024-07-04 02:05:31', '2024-07-04 02:05:31', 3, 173);
INSERT INTO `role_menus` VALUES (467, '2024-07-04 02:05:31', '2024-07-04 02:05:31', 3, 174);
INSERT INTO `role_menus` VALUES (468, '2024-07-04 02:05:31', '2024-07-04 02:05:31', 3, 175);
INSERT INTO `role_menus` VALUES (469, '2024-07-04 02:05:31', '2024-07-04 02:05:31', 3, 176);
INSERT INTO `role_menus` VALUES (470, '2024-07-04 02:05:31', '2024-07-04 02:05:31', 3, 177);
INSERT INTO `role_menus` VALUES (471, '2024-07-04 02:05:31', '2024-07-04 02:05:31', 3, 178);
INSERT INTO `role_menus` VALUES (472, '2024-07-04 02:05:31', '2024-07-04 02:05:31', 3, 179);
INSERT INTO `role_menus` VALUES (473, '2024-07-04 02:05:32', '2024-07-04 02:05:32', 3, 180);
INSERT INTO `role_menus` VALUES (474, '2024-07-04 02:05:32', '2024-07-04 02:05:32', 3, 194);
INSERT INTO `role_menus` VALUES (475, '2024-07-04 02:05:32', '2024-07-04 02:05:32', 3, 195);
INSERT INTO `role_menus` VALUES (476, '2024-07-04 02:05:32', '2024-07-04 02:05:32', 3, 216);
INSERT INTO `role_menus` VALUES (477, '2024-07-04 02:05:32', '2024-07-04 02:05:32', 3, 217);
INSERT INTO `role_menus` VALUES (478, '2024-07-04 02:05:33', '2024-07-04 02:05:33', 4, 47);
INSERT INTO `role_menus` VALUES (479, '2024-07-04 02:05:33', '2024-07-04 02:05:33', 4, 48);
INSERT INTO `role_menus` VALUES (480, '2024-07-04 02:05:33', '2024-07-04 02:05:33', 4, 78);
INSERT INTO `role_menus` VALUES (481, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 79);
INSERT INTO `role_menus` VALUES (482, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 132);
INSERT INTO `role_menus` VALUES (483, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 137);
INSERT INTO `role_menus` VALUES (484, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 138);
INSERT INTO `role_menus` VALUES (485, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 142);
INSERT INTO `role_menus` VALUES (486, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 144);
INSERT INTO `role_menus` VALUES (487, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 145);
INSERT INTO `role_menus` VALUES (488, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 149);
INSERT INTO `role_menus` VALUES (489, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 150);
INSERT INTO `role_menus` VALUES (490, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 165);
INSERT INTO `role_menus` VALUES (491, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 166);
INSERT INTO `role_menus` VALUES (492, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 167);
INSERT INTO `role_menus` VALUES (493, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 173);
INSERT INTO `role_menus` VALUES (494, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 174);
INSERT INTO `role_menus` VALUES (495, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 175);
INSERT INTO `role_menus` VALUES (496, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 176);
INSERT INTO `role_menus` VALUES (497, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 177);
INSERT INTO `role_menus` VALUES (498, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 178);
INSERT INTO `role_menus` VALUES (499, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 179);
INSERT INTO `role_menus` VALUES (500, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 180);
INSERT INTO `role_menus` VALUES (501, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 181);
INSERT INTO `role_menus` VALUES (502, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 182);
INSERT INTO `role_menus` VALUES (503, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 183);
INSERT INTO `role_menus` VALUES (504, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 184);
INSERT INTO `role_menus` VALUES (505, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 185);
INSERT INTO `role_menus` VALUES (506, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 186);
INSERT INTO `role_menus` VALUES (507, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 187);
INSERT INTO `role_menus` VALUES (508, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 188);
INSERT INTO `role_menus` VALUES (509, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 194);
INSERT INTO `role_menus` VALUES (510, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 195);
INSERT INTO `role_menus` VALUES (511, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 196);
INSERT INTO `role_menus` VALUES (512, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 216);
INSERT INTO `role_menus` VALUES (513, '2024-07-04 02:05:34', '2024-07-04 02:05:34', 4, 217);
INSERT INTO `role_menus` VALUES (598, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 46);
INSERT INTO `role_menus` VALUES (599, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 47);
INSERT INTO `role_menus` VALUES (600, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 48);
INSERT INTO `role_menus` VALUES (601, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 50);
INSERT INTO `role_menus` VALUES (602, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 76);
INSERT INTO `role_menus` VALUES (603, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 78);
INSERT INTO `role_menus` VALUES (604, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 79);
INSERT INTO `role_menus` VALUES (605, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 81);
INSERT INTO `role_menus` VALUES (606, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 86);
INSERT INTO `role_menus` VALUES (607, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 87);
INSERT INTO `role_menus` VALUES (608, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 88);
INSERT INTO `role_menus` VALUES (609, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 91);
INSERT INTO `role_menus` VALUES (610, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 92);
INSERT INTO `role_menus` VALUES (611, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 93);
INSERT INTO `role_menus` VALUES (612, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 94);
INSERT INTO `role_menus` VALUES (613, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 95);
INSERT INTO `role_menus` VALUES (614, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 96);
INSERT INTO `role_menus` VALUES (615, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 97);
INSERT INTO `role_menus` VALUES (616, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 98);
INSERT INTO `role_menus` VALUES (617, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 99);
INSERT INTO `role_menus` VALUES (619, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 101);
INSERT INTO `role_menus` VALUES (620, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 102);
INSERT INTO `role_menus` VALUES (621, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 103);
INSERT INTO `role_menus` VALUES (622, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 132);
INSERT INTO `role_menus` VALUES (623, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 133);
INSERT INTO `role_menus` VALUES (624, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 137);
INSERT INTO `role_menus` VALUES (625, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 138);
INSERT INTO `role_menus` VALUES (626, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 142);
INSERT INTO `role_menus` VALUES (627, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 143);
INSERT INTO `role_menus` VALUES (628, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 144);
INSERT INTO `role_menus` VALUES (629, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 145);
INSERT INTO `role_menus` VALUES (631, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 148);
INSERT INTO `role_menus` VALUES (632, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 149);
INSERT INTO `role_menus` VALUES (633, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 150);
INSERT INTO `role_menus` VALUES (634, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 152);
INSERT INTO `role_menus` VALUES (635, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 153);
INSERT INTO `role_menus` VALUES (636, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 154);
INSERT INTO `role_menus` VALUES (637, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 165);
INSERT INTO `role_menus` VALUES (638, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 166);
INSERT INTO `role_menus` VALUES (639, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 167);
INSERT INTO `role_menus` VALUES (644, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 173);
INSERT INTO `role_menus` VALUES (645, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 174);
INSERT INTO `role_menus` VALUES (646, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 175);
INSERT INTO `role_menus` VALUES (647, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 176);
INSERT INTO `role_menus` VALUES (648, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 177);
INSERT INTO `role_menus` VALUES (649, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 178);
INSERT INTO `role_menus` VALUES (650, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 179);
INSERT INTO `role_menus` VALUES (651, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 180);
INSERT INTO `role_menus` VALUES (652, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 181);
INSERT INTO `role_menus` VALUES (653, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 182);
INSERT INTO `role_menus` VALUES (654, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 183);
INSERT INTO `role_menus` VALUES (655, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 184);
INSERT INTO `role_menus` VALUES (656, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 185);
INSERT INTO `role_menus` VALUES (657, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 186);
INSERT INTO `role_menus` VALUES (658, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 187);
INSERT INTO `role_menus` VALUES (659, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 188);
INSERT INTO `role_menus` VALUES (660, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 190);
INSERT INTO `role_menus` VALUES (661, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 191);
INSERT INTO `role_menus` VALUES (662, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 192);
INSERT INTO `role_menus` VALUES (663, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 193);
INSERT INTO `role_menus` VALUES (664, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 194);
INSERT INTO `role_menus` VALUES (665, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 195);
INSERT INTO `role_menus` VALUES (666, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 196);
INSERT INTO `role_menus` VALUES (667, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 198);
INSERT INTO `role_menus` VALUES (668, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 200);
INSERT INTO `role_menus` VALUES (671, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 203);
INSERT INTO `role_menus` VALUES (672, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 204);
INSERT INTO `role_menus` VALUES (673, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 205);
INSERT INTO `role_menus` VALUES (674, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 207);
INSERT INTO `role_menus` VALUES (675, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 213);
INSERT INTO `role_menus` VALUES (676, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 214);
INSERT INTO `role_menus` VALUES (678, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 216);
INSERT INTO `role_menus` VALUES (679, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 217);
INSERT INTO `role_menus` VALUES (680, '2024-07-04 10:37:37', '2024-07-04 10:37:37', 2, 218);
INSERT INTO `role_menus` VALUES (948, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 46);
INSERT INTO `role_menus` VALUES (949, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 47);
INSERT INTO `role_menus` VALUES (950, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 48);
INSERT INTO `role_menus` VALUES (951, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 76);
INSERT INTO `role_menus` VALUES (952, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 78);
INSERT INTO `role_menus` VALUES (953, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 79);
INSERT INTO `role_menus` VALUES (954, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 86);
INSERT INTO `role_menus` VALUES (955, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 87);
INSERT INTO `role_menus` VALUES (956, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 88);
INSERT INTO `role_menus` VALUES (957, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 91);
INSERT INTO `role_menus` VALUES (958, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 92);
INSERT INTO `role_menus` VALUES (959, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 93);
INSERT INTO `role_menus` VALUES (960, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 94);
INSERT INTO `role_menus` VALUES (961, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 95);
INSERT INTO `role_menus` VALUES (962, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 96);
INSERT INTO `role_menus` VALUES (963, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 97);
INSERT INTO `role_menus` VALUES (964, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 98);
INSERT INTO `role_menus` VALUES (965, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 99);
INSERT INTO `role_menus` VALUES (966, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 101);
INSERT INTO `role_menus` VALUES (967, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 102);
INSERT INTO `role_menus` VALUES (968, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 103);
INSERT INTO `role_menus` VALUES (969, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 132);
INSERT INTO `role_menus` VALUES (970, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 137);
INSERT INTO `role_menus` VALUES (971, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 138);
INSERT INTO `role_menus` VALUES (972, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 142);
INSERT INTO `role_menus` VALUES (973, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 144);
INSERT INTO `role_menus` VALUES (974, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 145);
INSERT INTO `role_menus` VALUES (975, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 148);
INSERT INTO `role_menus` VALUES (976, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 149);
INSERT INTO `role_menus` VALUES (977, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 150);
INSERT INTO `role_menus` VALUES (978, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 152);
INSERT INTO `role_menus` VALUES (979, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 165);
INSERT INTO `role_menus` VALUES (980, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 166);
INSERT INTO `role_menus` VALUES (981, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 167);
INSERT INTO `role_menus` VALUES (982, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 173);
INSERT INTO `role_menus` VALUES (983, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 174);
INSERT INTO `role_menus` VALUES (984, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 175);
INSERT INTO `role_menus` VALUES (985, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 176);
INSERT INTO `role_menus` VALUES (986, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 177);
INSERT INTO `role_menus` VALUES (987, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 178);
INSERT INTO `role_menus` VALUES (988, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 179);
INSERT INTO `role_menus` VALUES (989, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 180);
INSERT INTO `role_menus` VALUES (990, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 181);
INSERT INTO `role_menus` VALUES (991, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 182);
INSERT INTO `role_menus` VALUES (992, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 183);
INSERT INTO `role_menus` VALUES (993, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 184);
INSERT INTO `role_menus` VALUES (994, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 185);
INSERT INTO `role_menus` VALUES (995, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 186);
INSERT INTO `role_menus` VALUES (996, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 187);
INSERT INTO `role_menus` VALUES (997, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 188);
INSERT INTO `role_menus` VALUES (998, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 190);
INSERT INTO `role_menus` VALUES (999, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 191);
INSERT INTO `role_menus` VALUES (1000, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 192);
INSERT INTO `role_menus` VALUES (1001, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 194);
INSERT INTO `role_menus` VALUES (1002, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 195);
INSERT INTO `role_menus` VALUES (1003, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 196);
INSERT INTO `role_menus` VALUES (1004, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 198);
INSERT INTO `role_menus` VALUES (1005, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 207);
INSERT INTO `role_menus` VALUES (1006, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 216);
INSERT INTO `role_menus` VALUES (1007, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 217);
INSERT INTO `role_menus` VALUES (1008, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 218);
INSERT INTO `role_menus` VALUES (1009, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 226);
INSERT INTO `role_menus` VALUES (1010, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 227);
INSERT INTO `role_menus` VALUES (1011, '2024-07-16 11:30:48', '2024-07-16 11:30:48', 1, 228);
INSERT INTO `role_menus` VALUES (1012, '2024-07-16 12:41:52', '2024-07-16 12:41:52', 6, 220);
INSERT INTO `role_menus` VALUES (1013, '2024-07-16 12:41:52', '2024-07-16 12:41:52', 6, 137);
INSERT INTO `role_menus` VALUES (1014, '2024-07-16 12:41:52', '2024-07-16 12:41:52', 6, 48);
INSERT INTO `role_menus` VALUES (1015, '2024-07-16 12:41:52', '2024-07-16 12:41:52', 6, 47);
INSERT INTO `role_menus` VALUES (1016, '2024-07-16 12:41:52', '2024-07-16 12:41:52', 6, 217);
INSERT INTO `role_menus` VALUES (1017, '2024-07-16 12:41:52', '2024-07-16 12:41:52', 6, 165);
INSERT INTO `role_menus` VALUES (1018, '2024-07-16 12:41:52', '2024-07-16 12:41:52', 6, 166);
INSERT INTO `role_menus` VALUES (1019, '2024-07-16 12:41:52', '2024-07-16 12:41:52', 6, 167);
INSERT INTO `role_menus` VALUES (1020, '2024-07-16 12:41:52', '2024-07-16 12:41:52', 6, 194);
INSERT INTO `role_menus` VALUES (1021, '2024-07-16 12:41:52', '2024-07-16 12:41:52', 6, 195);
INSERT INTO `role_menus` VALUES (1022, '2024-07-16 12:41:52', '2024-07-16 12:41:52', 6, 216);
INSERT INTO `role_menus` VALUES (1023, '2024-07-16 12:41:52', '2024-07-16 12:41:52', 6, 78);
INSERT INTO `role_menus` VALUES (1024, '2024-07-16 12:41:52', '2024-07-16 12:41:52', 6, 173);
INSERT INTO `role_menus` VALUES (1025, '2024-07-16 12:41:52', '2024-07-16 12:41:52', 6, 174);
INSERT INTO `role_menus` VALUES (1026, '2024-07-16 12:41:52', '2024-07-16 12:41:52', 6, 175);
INSERT INTO `role_menus` VALUES (1027, '2024-07-16 12:41:52', '2024-07-16 12:41:52', 6, 176);
INSERT INTO `role_menus` VALUES (1028, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 218);
INSERT INTO `role_menus` VALUES (1029, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 232);
INSERT INTO `role_menus` VALUES (1030, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 233);
INSERT INTO `role_menus` VALUES (1031, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 234);
INSERT INTO `role_menus` VALUES (1032, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 235);
INSERT INTO `role_menus` VALUES (1033, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 236);
INSERT INTO `role_menus` VALUES (1034, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 237);
INSERT INTO `role_menus` VALUES (1035, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 238);
INSERT INTO `role_menus` VALUES (1036, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 148);
INSERT INTO `role_menus` VALUES (1037, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 226);
INSERT INTO `role_menus` VALUES (1038, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 227);
INSERT INTO `role_menus` VALUES (1039, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 228);
INSERT INTO `role_menus` VALUES (1040, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 152);
INSERT INTO `role_menus` VALUES (1041, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 190);
INSERT INTO `role_menus` VALUES (1042, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 191);
INSERT INTO `role_menus` VALUES (1043, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 192);
INSERT INTO `role_menus` VALUES (1044, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 198);
INSERT INTO `role_menus` VALUES (1045, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 207);
INSERT INTO `role_menus` VALUES (1046, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 220);
INSERT INTO `role_menus` VALUES (1047, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 137);
INSERT INTO `role_menus` VALUES (1048, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 48);
INSERT INTO `role_menus` VALUES (1049, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 47);
INSERT INTO `role_menus` VALUES (1050, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 217);
INSERT INTO `role_menus` VALUES (1051, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 165);
INSERT INTO `role_menus` VALUES (1052, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 166);
INSERT INTO `role_menus` VALUES (1053, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 167);
INSERT INTO `role_menus` VALUES (1054, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 194);
INSERT INTO `role_menus` VALUES (1055, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 195);
INSERT INTO `role_menus` VALUES (1056, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 216);
INSERT INTO `role_menus` VALUES (1057, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 78);
INSERT INTO `role_menus` VALUES (1058, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 173);
INSERT INTO `role_menus` VALUES (1059, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 174);
INSERT INTO `role_menus` VALUES (1060, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 175);
INSERT INTO `role_menus` VALUES (1061, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 176);
INSERT INTO `role_menus` VALUES (1062, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 79);
INSERT INTO `role_menus` VALUES (1063, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 177);
INSERT INTO `role_menus` VALUES (1064, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 178);
INSERT INTO `role_menus` VALUES (1065, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 179);
INSERT INTO `role_menus` VALUES (1066, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 180);
INSERT INTO `role_menus` VALUES (1067, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 138);
INSERT INTO `role_menus` VALUES (1068, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 132);
INSERT INTO `role_menus` VALUES (1069, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 185);
INSERT INTO `role_menus` VALUES (1070, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 186);
INSERT INTO `role_menus` VALUES (1071, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 187);
INSERT INTO `role_menus` VALUES (1072, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 188);
INSERT INTO `role_menus` VALUES (1073, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 142);
INSERT INTO `role_menus` VALUES (1074, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 149);
INSERT INTO `role_menus` VALUES (1075, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 150);
INSERT INTO `role_menus` VALUES (1076, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 144);
INSERT INTO `role_menus` VALUES (1077, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 181);
INSERT INTO `role_menus` VALUES (1078, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 182);
INSERT INTO `role_menus` VALUES (1079, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 183);
INSERT INTO `role_menus` VALUES (1080, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 184);
INSERT INTO `role_menus` VALUES (1081, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 145);
INSERT INTO `role_menus` VALUES (1082, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 196);
INSERT INTO `role_menus` VALUES (1083, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 239);
INSERT INTO `role_menus` VALUES (1084, '2024-07-16 12:42:11', '2024-07-16 12:42:11', 5, 240);

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `roleCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, '总经理', 'GM', '', '2019-08-30 09:31:05', '2024-07-02 09:36:54');
INSERT INTO `roles` VALUES (2, '技术总监', 'CTO', '', '2022-10-19 20:24:09', '2019-06-21 12:09:34');
INSERT INTO `roles` VALUES (3, '销售总监', 'CSO', '', '2023-09-06 19:10:34', '2019-08-30 09:30:50');
INSERT INTO `roles` VALUES (4, '财务总监', 'CFO', '', '2019-08-30 09:31:16', '2019-08-30 09:31:16');
INSERT INTO `roles` VALUES (5, '测试工程师', 'Test Engineer', NULL, '2024-07-16 12:39:54', '2024-07-16 12:39:54');
INSERT INTO `roles` VALUES (6, '销售员', 'Salesman', NULL, '2024-07-16 12:41:16', '2024-07-16 12:41:16');

-- ----------------------------
-- Table structure for tablecolumns
-- ----------------------------
DROP TABLE IF EXISTS `tablecolumns`;
CREATE TABLE `tablecolumns`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adminId` int(11) NOT NULL,
  `tableId` int(11) NOT NULL,
  `columns` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tablecolumns
-- ----------------------------
INSERT INTO `tablecolumns` VALUES (2, 1, 20006, '[{\"columnKey\":\"adminId\",\"sort\":1,\"width\":70,\"showFlag\":true},{\"columnKey\":\"adminName\",\"sort\":2,\"width\":100,\"showFlag\":true},{\"columnKey\":\"loginResult\",\"sort\":3,\"width\":70,\"showFlag\":true},{\"columnKey\":\"loginIp\",\"sort\":4,\"showFlag\":true},{\"columnKey\":\"userAgent\",\"sort\":5,\"showFlag\":true},{\"columnKey\":\"remark\",\"sort\":6,\"width\":100,\"showFlag\":true},{\"columnKey\":\"createdAt\",\"sort\":7,\"width\":120,\"showFlag\":true}]', '2024-07-04 07:29:19', '2024-07-15 05:00:37');
INSERT INTO `tablecolumns` VALUES (4, 1, 20005, '[{\"columnKey\":\"adminName\",\"sort\":1,\"width\":160,\"showFlag\":true},{\"columnKey\":\"failCount\",\"sort\":2,\"width\":100,\"showFlag\":true},{\"columnKey\":\"isLock\",\"sort\":3,\"width\":80,\"showFlag\":true},{\"columnKey\":\"lockBeginAt\",\"sort\":4,\"width\":120,\"showFlag\":true},{\"columnKey\":\"createdAt\",\"sort\":5,\"width\":120,\"showFlag\":false},{\"columnKey\":\"updatedAt\",\"sort\":6,\"width\":120,\"showFlag\":true}]', '2024-07-15 03:48:18', '2024-07-15 04:59:08');
INSERT INTO `tablecolumns` VALUES (6, 1, 20004, '[{\"columnKey\":\"adminName\",\"sort\":1,\"width\":100,\"showFlag\":true},{\"columnKey\":\"url\",\"sort\":2,\"width\":200,\"showFlag\":true},{\"columnKey\":\"method\",\"sort\":3,\"width\":70,\"showFlag\":true},{\"columnKey\":\"result\",\"sort\":4,\"width\":80,\"showFlag\":true},{\"columnKey\":\"remark\",\"sort\":5,\"width\":160,\"showFlag\":true},{\"columnKey\":\"ip\",\"sort\":6,\"width\":120,\"showFlag\":false},{\"columnKey\":\"userAgent\",\"sort\":7,\"width\":160,\"showFlag\":true},{\"columnKey\":\"createdAt\",\"sort\":8,\"width\":120,\"showFlag\":true},{\"columnKey\":\"action\",\"sort\":9,\"width\":60,\"showFlag\":true}]', '2024-07-15 04:42:39', '2024-07-15 04:57:00');

-- ----------------------------
-- Table structure for uploads
-- ----------------------------
DROP TABLE IF EXISTS `uploads`;
CREATE TABLE `uploads`  (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `folderType` tinyint(1) NULL DEFAULT 1 COMMENT '1：通用\r\n2：公告\r\n3：帮助中心\r\n4：意见反馈',
  `filename` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `originalname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `size` int(11) NOT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `creatorId` int(11) NULL DEFAULT NULL,
  `creatorName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of uploads
-- ----------------------------
INSERT INTO `uploads` VALUES ('10ccd787-a197-4e00-9881-06fb7162edd7', 4, 'cf09cdca986beb2ae255fd19f498febb.jpg', 'avatar-1024x768.jpg', 'uploads/2024-07-06/cf09cdca986beb2ae255fd19f498febb.jpg', 261307, 'image/jpeg', 'http://127.0.0.1:8000/uploads/2024-07-06/cf09cdca986beb2ae255fd19f498febb.jpg', '', 1, 'admin', '2024-07-06 02:33:54', '2024-07-06 02:33:54');
INSERT INTO `uploads` VALUES ('285777b2-dd20-45f7-a3d1-9a9b9521708d', 5, '7ddd6e455ebd612ecc9e7b323ac8fe9b.jpg', '2024070910121079021[1].jpg', 'uploads/2024-07-09/7ddd6e455ebd612ecc9e7b323ac8fe9b.jpg', 170988, 'image/jpeg', 'http://127.0.0.1:8000/uploads/2024-07-09/7ddd6e455ebd612ecc9e7b323ac8fe9b.jpg', '', 1, 'admin', '2024-07-09 13:38:13', '2024-07-09 13:38:13');
INSERT INTO `uploads` VALUES ('34e77e07-6909-487f-8fa8-1e6d26bf9366', 4, '6d8785e172f2de67bc90e7d7ae28d02a.jpg', 'IMG_2062.jpg', 'uploads/2024-07-07/6d8785e172f2de67bc90e7d7ae28d02a.jpg', 103095, 'image/jpeg', 'http://127.0.0.1:8000/uploads/2024-07-07/6d8785e172f2de67bc90e7d7ae28d02a.jpg', '', 1, 'admin', '2024-07-07 04:31:38', '2024-07-07 04:31:38');
INSERT INTO `uploads` VALUES ('535e0287-a3cb-4e94-8bba-7987de432965', 5, 'e91fa691e1476864bcba84e099139637.jpg', '2024070914331536537[1].jpg', 'uploads/2024-07-09/e91fa691e1476864bcba84e099139637.jpg', 135804, 'image/jpeg', 'http://127.0.0.1:8000/uploads/2024-07-09/e91fa691e1476864bcba84e099139637.jpg', '', 1, 'admin', '2024-07-09 13:34:17', '2024-07-09 13:34:17');
INSERT INTO `uploads` VALUES ('5ba2fae0-17b3-4d72-b1fd-0d3413edfc4e', 5, '31edac26d0cabba782c1ca9833742144.jpg', '2024070920454071880[1].jpg', 'uploads/2024-07-09/31edac26d0cabba782c1ca9833742144.jpg', 293952, 'image/jpeg', 'http://127.0.0.1:8000/uploads/2024-07-09/31edac26d0cabba782c1ca9833742144.jpg', '', 1, 'admin', '2024-07-09 13:21:57', '2024-07-09 13:21:57');
INSERT INTO `uploads` VALUES ('5efe747e-4f91-4e91-8ea2-748b6a538470', 4, '58104dcfcdf776df26479392dec37e08.jpg', 'avatar-500x500.jpg', 'uploads/2024-07-06/58104dcfcdf776df26479392dec37e08.jpg', 114919, 'image/jpeg', 'http://127.0.0.1:8000/uploads/2024-07-06/58104dcfcdf776df26479392dec37e08.jpg', '', 1, 'admin', '2024-07-06 02:33:54', '2024-07-06 02:33:54');
INSERT INTO `uploads` VALUES ('5fde6ab1-ad32-4340-bf46-64ad3c81ae64', 5, '087ac50a5c879b0c17751db86b65bafc.jpg', '2024070920574320228[1].jpg', 'uploads/2024-07-09/087ac50a5c879b0c17751db86b65bafc.jpg', 73895, 'image/jpeg', 'http://127.0.0.1:8000/uploads/2024-07-09/087ac50a5c879b0c17751db86b65bafc.jpg', '', 1, 'admin', '2024-07-09 13:19:07', '2024-07-09 13:19:07');
INSERT INTO `uploads` VALUES ('695e22e1-2d38-42a0-8731-8771a05de6b2', 1, '9bc2583965e7a29eb3187592556110a3.JPG', 'IMG_5463.JPG', 'uploads/2024-07-04/9bc2583965e7a29eb3187592556110a3.JPG', 30513, 'image/jpeg', 'http://127.0.0.1:8000/uploads/2024-07-04/9bc2583965e7a29eb3187592556110a3.JPG', '', 1, 'admin', '2024-07-04 01:43:40', '2024-07-04 01:43:40');
INSERT INTO `uploads` VALUES ('755fdd62-122d-4067-adc8-4bcf95fd895e', 4, '072f88a82e8802e7b2008f480257080c.jpg', 'IMG_2062.jpg', 'uploads/2024-07-07/072f88a82e8802e7b2008f480257080c.jpg', 103095, 'image/jpeg', 'http://127.0.0.1:8000/uploads/2024-07-07/072f88a82e8802e7b2008f480257080c.jpg', '', 1, 'admin', '2024-07-07 04:31:02', '2024-07-07 04:31:02');
INSERT INTO `uploads` VALUES ('aed682e7-f9b8-44f7-a4fe-61b0b14ff6c0', 4, '2b3a15e10445b0119026eb7487932470.jpg', '0w8g97.jpg', 'uploads/2024-07-08/2b3a15e10445b0119026eb7487932470.jpg', 289938, 'image/jpeg', 'http://127.0.0.1:8000/uploads/2024-07-08/2b3a15e10445b0119026eb7487932470.jpg', '', 1, 'admin', '2024-07-08 02:51:02', '2024-07-08 02:51:02');
INSERT INTO `uploads` VALUES ('c09f74d3-0238-439d-b75b-4edfc25e7e77', 5, 'cb08369a858bd99c36bab348ad28ef30.jpg', '1720513840885_755[1].jpg', 'uploads/2024-07-09/cb08369a858bd99c36bab348ad28ef30.jpg', 109979, 'image/jpeg', 'http://127.0.0.1:8000/uploads/2024-07-09/cb08369a858bd99c36bab348ad28ef30.jpg', '', 1, 'admin', '2024-07-09 13:40:17', '2024-07-09 13:40:17');
INSERT INTO `uploads` VALUES ('dace744a-c8ae-4eed-99d0-494ff93c89cd', 1, '2b405cf0e896bbb10b26b92108310766.JPG', 'IMG_2059.JPG', 'uploads/2024-07-04/2b405cf0e896bbb10b26b92108310766.JPG', 51638, 'image/jpeg', 'http://127.0.0.1:8000/uploads/2024-07-04/2b405cf0e896bbb10b26b92108310766.JPG', '', 1, 'admin', '2024-07-04 01:17:48', '2024-07-04 01:17:48');
INSERT INTO `uploads` VALUES ('e1b56734-b257-4edf-96d9-2efabbcff2fa', 4, '7d31d6d09aea5dc8c4cb7e2ff2596c3c.jpg', 'avatar-100x75.jpg', 'uploads/2024-07-06/7d31d6d09aea5dc8c4cb7e2ff2596c3c.jpg', 21993, 'image/jpeg', 'http://127.0.0.1:8000/uploads/2024-07-06/7d31d6d09aea5dc8c4cb7e2ff2596c3c.jpg', '', 1, 'admin', '2024-07-06 02:17:29', '2024-07-06 02:17:29');
INSERT INTO `uploads` VALUES ('fda829a2-a4de-4604-9b2c-92f807d37d9d', 5, 'a807f1116cb02ad561d68978eca644bd.jpg', '2024070906221149922[1].jpg', 'uploads/2024-07-09/a807f1116cb02ad561d68978eca644bd.jpg', 8958, 'image/jpeg', 'http://127.0.0.1:8000/uploads/2024-07-09/a807f1116cb02ad561d68978eca644bd.jpg', '', 1, 'admin', '2024-07-09 13:39:22', '2024-07-09 13:39:22');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `birthday` datetime NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `level` int(11) NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------

-- ----------------------------
-- Table structure for version_logs
-- ----------------------------
DROP TABLE IF EXISTS `version_logs`;
CREATE TABLE `version_logs`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeId` int(11) NOT NULL,
  `version` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `publisher` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `publishDate` datetime NOT NULL,
  `link` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of version_logs
-- ----------------------------
INSERT INTO `version_logs` VALUES (1, 1, 'v1.0.1', 'Admin One', '2024-07-05 00:00:00', NULL, '版本重大更新！', '2024-07-05 13:38:15', '2024-07-05 13:38:15');
INSERT INTO `version_logs` VALUES (2, 2, 'v1.0.2', 'Admin One', '2024-07-06 00:00:00', NULL, '这个版本主要加了一个大功能！', '2024-07-05 13:46:21', '2024-07-05 13:46:21');
INSERT INTO `version_logs` VALUES (3, 3, 'v1.0.3', 'Admin One', '2024-07-17 00:00:00', NULL, 'sdfasdfsdfasdfasdfasdfasdfsdf', '2024-07-15 11:12:57', '2024-07-16 03:24:32');

SET FOREIGN_KEY_CHECKS = 1;
