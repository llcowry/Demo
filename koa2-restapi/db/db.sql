CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(255),
    gender ENUM('male', 'female', 'other'),
    birthday DATE,
    avatar VARCHAR(255),
    level INT DEFAULT 1,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE uploads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    originalname VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    size BIGINT NOT NULL,
    type VARCHAR(255) NOT NULL,
    description TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (id, username, password, nickname, gender, birthday, avatar, level, email) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'user1', 'e10adc3949ba59abbe56e057f20f883e', '用户1', 'male', '1990-01-01', 'avatar1.png', 1, 'user1@example.com'),
('550e8400-e29b-41d4-a716-446655440001', 'user2', 'e10adc3949ba59abbe56e057f20f883e', '用户2', 'female', '1992-02-02', 'avatar2.png', 1, 'user2@example.com');

INSERT INTO uploads (originalname, filename, path, size, type, description) VALUES
('test1.png', 'd41d8cd98f00b204e9800998ecf8427e.png', '/uploads/2024-06-26/d41d8cd98f00b204e9800998ecf8427e.png', 1024, 'image/png', 'Test file 1'),
('test2.jpg', 'd41d8cd98f00b204e9800998ecf8427e.jpg', '/uploads/2024-06-26/d41d8cd98f00b204e9800998ecf8427e.jpg', 2048, 'image/jpeg', 'Test file 2');