CREATE DATABASE shop_cheaper;

CREATE TABLE store (
  username VARCHAR(255) PRIMARY KEY,
  url_prefix VARCHAR(255) NOT NULL UNIQUE,
  tag VARCHAR(255) NOT NULL,
  attrs VARCHAR(255) NOT NULL
)

CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL
)

CREATE TABLE item (
  id INT NOT NULL AUTO_INCREMENT,
  store_id INT,
  item_url VARCHAR(255) NOT NULL,
  PRIMARY KEY (id, store_id),
  FOREIGN KEY store_id REFERENCES store ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE alert (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  item_id INT NOT NULL,
  store_id INT NOT NULL,
  price_limit REAL NOT NULL,
  last_notified DATETIME,
  FOREIGN KEY user_id REFERENCES user ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (item_id, store_id) REFERENCES (item.id, item.store_id) ON DELETE NO ACTION ON UPDATE CASCADE
)

CREATE TABLE item_price (
  recorded_at DATETIME;
  item_id INT NOT NULL,
  store_id INT NOT NULL,
  price REAL NOT NULL,
  PRIMARY KEY (recorded_at, item_id, store_id),
  FOREIGN KEY (item_id, store_id) REFERENCES (item.id, item.store_id) ON DELETE CASCADE ON UPDATE CASCADE
)
