CREATE DATABASE county_friendship CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE county_friendship;

-- 行政区域表
CREATE TABLE administrative_regions (
    code VARCHAR(12) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    level ENUM('province', 'city', 'county', 'town', 'village') NOT NULL,
    parent_code VARCHAR(12),
    longitude DECIMAL(10,7),
    latitude DECIMAL(10,7),
    population INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_parent (parent_code),
    INDEX idx_level (level),
    INDEX idx_location (longitude, latitude)
);

-- 用户表
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    uuid VARCHAR(32) UNIQUE NOT NULL,
    username VARCHAR(50) NOT NULL,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    gender ENUM('M','F') NOT NULL,
    age INT,
    avatar VARCHAR(255),
    province_code VARCHAR(6),
    city_code VARCHAR(6),
    county_code VARCHAR(6),
    town_code VARCHAR(9),
    village_code VARCHAR(12),
    longitude DECIMAL(10,7),
    latitude DECIMAL(10,7),
    occupation VARCHAR(100),
    education VARCHAR(50),
    income_level VARCHAR(20),
    interests JSON,
    bio TEXT,
    status ENUM('active','inactive','verified','banned') DEFAULT 'inactive',
    last_login_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_location (county_code, town_code),
    INDEX idx_gender_age (gender, age),
    INDEX idx_province_city (province_code, city_code),
    SPATIAL INDEX idx_geo (longitude, latitude)
);

-- 匹配记录表
CREATE TABLE matches (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user1_id BIGINT NOT NULL,
    user2_id BIGINT NOT NULL,
    match_score DECIMAL(5,2) DEFAULT 0.00,
    match_type ENUM('auto','manual','ai') DEFAULT 'auto',
    status ENUM('pending','matched','rejected','blocked') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_users (user1_id, user2_id),
    INDEX idx_match_score (match_score),
    INDEX idx_created_at (created_at),
    FOREIGN KEY (user1_id) REFERENCES users(id),
    FOREIGN KEY (user2_id) REFERENCES users(id),
    UNIQUE KEY unique_match (LEAST(user1_id, user2_id), GREATEST(user1_id, user2_id))
);

-- 聊天消息表
CREATE TABLE chat_messages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    sender_id BIGINT NOT NULL,
    receiver_id BIGINT NOT NULL,
    message_type ENUM('text','image','video','audio') DEFAULT 'text',
    content TEXT NOT NULL,
    read_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_conversation (sender_id, receiver_id, created_at),
    INDEX idx_receiver_read (receiver_id, read_status),
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
);

-- 用户在线状态表
CREATE TABLE user_sessions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    device_id VARCHAR(64),
    platform ENUM('android','ios','web'),
    is_online BOOLEAN DEFAULT TRUE,
    last_seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_user_online (user_id, is_online),
    FOREIGN KEY (user_id) REFERENCES users(id)
);