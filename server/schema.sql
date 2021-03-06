CREATE DATABASE shopCheaper;
USE shopCheaper;

CREATE TABLE store (
  store_name VARCHAR(255) PRIMARY KEY,
  url_prefix VARCHAR(255) NOT NULL UNIQUE,
  html_tag VARCHAR(255) NOT NULL,
  html_id VARCHAR(255),
  html_class VARCHAR(255)
);

CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL
);

CREATE TABLE item (
  id INT NOT NULL AUTO_INCREMENT,
  item_url VARCHAR(513) NOT NULL UNIQUE,
  store_name VARCHAR(255) NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (store_name, item_url),
  KEY(id),
  FOREIGN KEY (store_name) REFERENCES store(store_name) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE alert (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  item_id INT NOT NULL,
  store_name VARCHAR(255) NOT NULL,
  price_limit REAL NOT NULL,
  is_on BIT DEFAULT 1,
  last_notified DATETIME DEFAULT NOW(),
  CONSTRAINT FK_alert_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_alert_item FOREIGN KEY (item_id, store_name) REFERENCES item(id, store_name) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE item_price (
  recorded_at DATETIME DEFAULT NOW(),
  item_id INT NOT NULL,
  store_name VARCHAR(50),
  price REAL NOT NULL,
  PRIMARY KEY (recorded_at, item_id, store_name),
  CONSTRAINT FK_item_price FOREIGN KEY (item_id, store_name) REFERENCES item(id, store_name) ON DELETE CASCADE ON UPDATE CASCADE
);
