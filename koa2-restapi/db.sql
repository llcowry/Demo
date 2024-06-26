CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(255),
    gender ENUM('male', 'female', 'other'),
    birthday DATE,
    avatar VARCHAR(255),
    level INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE uploads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  original_filename VARCHAR(255) NOT NULL,
  current_filename VARCHAR(255) NOT NULL,
  path VARCHAR(255) NOT NULL,
  size INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  description TEXT,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);