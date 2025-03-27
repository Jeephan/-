/*
 Navicat Premium Dump SQL

 Source Server         : 毕设
 Source Server Type    : MySQL
 Source Server Version : 80404 (8.4.4)
 Source Host           : localhost:3306
 Source Schema         : wechat_order

 Target Server Type    : MySQL
 Target Server Version : 80404 (8.4.4)
 File Encoding         : 65001

 Date: 27/03/2025 17:43:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for carts
-- ----------------------------
DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `menu_item_id` int unsigned NOT NULL,
  `quantity` smallint unsigned DEFAULT '1' COMMENT '数量',
  `selected` tinyint(1) DEFAULT '1' COMMENT '是否选中',
  PRIMARY KEY (`id`),
  KEY `idx_user` (`user_id`),
  KEY `menu_item_id` (`menu_item_id`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='购物车表';

-- ----------------------------
-- Records of carts
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` tinyint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分类名称',
  `sort_order` tinyint DEFAULT '0' COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='菜品分类表';

-- ----------------------------
-- Records of categories
-- ----------------------------
BEGIN;
INSERT INTO `categories` (`id`, `name`, `sort_order`) VALUES (1, '热菜', 1);
INSERT INTO `categories` (`id`, `name`, `sort_order`) VALUES (2, '凉菜', 2);
INSERT INTO `categories` (`id`, `name`, `sort_order`) VALUES (3, '主食', 3);
INSERT INTO `categories` (`id`, `name`, `sort_order`) VALUES (4, '汤羹', 4);
INSERT INTO `categories` (`id`, `name`, `sort_order`) VALUES (5, '酒水', 5);
COMMIT;

-- ----------------------------
-- Table structure for coupons
-- ----------------------------
DROP TABLE IF EXISTS `coupons`;
CREATE TABLE `coupons` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '优惠码',
  `discount_type` enum('percentage','fixed') COLLATE utf8mb4_unicode_ci DEFAULT 'fixed' COMMENT '折扣类型',
  `discount_value` decimal(10,2) NOT NULL COMMENT '折扣值',
  `min_amount` decimal(10,2) DEFAULT '0.00' COMMENT '最低使用金额',
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='优惠券表';

-- ----------------------------
-- Records of coupons
-- ----------------------------
BEGIN;
INSERT INTO `coupons` (`id`, `code`, `discount_type`, `discount_value`, `min_amount`, `start_date`, `end_date`) VALUES (1, 'WELCOME10', 'fixed', 10.00, 50.00, '2025-03-20', '2025-03-27');
INSERT INTO `coupons` (`id`, `code`, `discount_type`, `discount_value`, `min_amount`, `start_date`, `end_date`) VALUES (2, 'SUPER20%', 'percentage', 0.20, 100.00, '2025-03-20', '2025-03-23');
COMMIT;

-- ----------------------------
-- Table structure for menu_items
-- ----------------------------
DROP TABLE IF EXISTS `menu_items`;
CREATE TABLE `menu_items` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '菜品名称',
  `category_id` tinyint unsigned NOT NULL COMMENT '分类ID',
  `price` decimal(10,2) NOT NULL COMMENT '价格',
  `stock` int DEFAULT '0' COMMENT '库存',
  `description` text COLLATE utf8mb4_unicode_ci COMMENT '菜品描述',
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '图片地址',
  `is_hot` tinyint(1) DEFAULT '0' COMMENT '是否热卖',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_category` (`category_id`),
  CONSTRAINT `menu_items_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='菜品信息表';

-- ----------------------------
-- Records of menu_items
-- ----------------------------
BEGIN;
INSERT INTO `menu_items` (`id`, `name`, `category_id`, `price`, `stock`, `description`, `image_url`, `is_hot`, `created_at`) VALUES (1, '宫保鸡丁', 1, 38.00, 20, '经典川菜，微辣口味', NULL, 0, '2025-03-20 14:52:20');
INSERT INTO `menu_items` (`id`, `name`, `category_id`, `price`, `stock`, `description`, `image_url`, `is_hot`, `created_at`) VALUES (2, '凉拌黄瓜', 2, 12.00, 50, '爽口凉菜', NULL, 0, '2025-03-20 14:52:20');
COMMIT;

-- ----------------------------
-- Table structure for order_items
-- ----------------------------
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int unsigned NOT NULL,
  `menu_item_id` int unsigned NOT NULL,
  `quantity` smallint unsigned NOT NULL,
  `price` decimal(10,2) NOT NULL COMMENT '成交价',
  PRIMARY KEY (`id`),
  KEY `idx_order` (`order_id`),
  KEY `menu_item_id` (`menu_item_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单明细表';

-- ----------------------------
-- Records of order_items
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `order_no` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '订单号(例:20231101123456)',
  `user_id` int unsigned NOT NULL,
  `total_amount` decimal(10,2) NOT NULL COMMENT '总金额',
  `pay_status` enum('unpaid','paid','refunded') COLLATE utf8mb4_unicode_ci DEFAULT 'unpaid' COMMENT '支付状态',
  `transaction_id` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '微信支付单号',
  `table_number` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '桌号',
  `remark` text COLLATE utf8mb4_unicode_ci COMMENT '订单备注',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_orderno` (`order_no`),
  KEY `idx_user` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单主表';

-- ----------------------------
-- Records of orders
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for reviews
-- ----------------------------
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int unsigned NOT NULL,
  `rating` tinyint unsigned DEFAULT NULL COMMENT '评分1-5',
  `content` text COLLATE utf8mb4_unicode_ci COMMENT '评价内容',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_order` (`order_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户评价表';

-- ----------------------------
-- Records of reviews
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for user_coupons
-- ----------------------------
DROP TABLE IF EXISTS `user_coupons`;
CREATE TABLE `user_coupons` (
  `user_id` int unsigned NOT NULL,
  `coupon_id` int unsigned NOT NULL,
  `used` tinyint(1) DEFAULT '0' COMMENT '是否已使用',
  `used_time` datetime DEFAULT NULL COMMENT '使用时间',
  PRIMARY KEY (`user_id`,`coupon_id`),
  KEY `coupon_id` (`coupon_id`),
  CONSTRAINT `user_coupons_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_coupons_ibfk_2` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户优惠券关联表';

-- ----------------------------
-- Records of user_coupons
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `openid` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '微信唯一标识',
  `nickname` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '微信昵称',
  `avatar_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '微信头像',
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '手机号',
  `member_level` tinyint DEFAULT '1' COMMENT '会员等级(1-5)',
  `points` int DEFAULT '0' COMMENT '积分',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '密码',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_openid` (`openid`),
  KEY `idx_phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户信息表';

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`id`, `openid`, `nickname`, `avatar_url`, `phone`, `member_level`, `points`, `created_at`, `username`, `password`) VALUES (1, 'test', 'test', NULL, NULL, 1, 0, '2025-03-27 17:27:27', NULL, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
