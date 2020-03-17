/** online-bookstore DDL
Written by Nicolas El-Khoury & Vinh Nguyen

Defines database, relations, and relationships in that order.

*/
-- DATABASE
CREATE DATABASE `bookstore` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
-- RELATION: Book
CREATE TABLE book (
  publisher_id numeric(5, 0),
  isbn numeric(13, 0),
  title varchar(100) NOT NULL,
  author varchar(50) NOT NULL,
  genre varchar(50),
  publisher_percentage numeric(0, 2) DEFAULT.02,
  PRIMARY KEY(publisher_id, isbn),
  FOREIGN KEY (publisher_id) REFERENCES publisher(publisher_id)
);
-- RELATION: publisher
CREATE TABLE publisher (
  publisher_id numeric(5, 0),
  publisher_name varchar(50),
  banking_account varchar(20) NOT NULL,
  address varchar(100),
  email varchar(100),
  phone_number numeric(10, 0),
  PRIMARY KEY(publisher_id)
);
-- RELATION: order
CREATE TABLE order (
  order_id numeric(8, 0) NOT NULL,
  date timestamp,
  tracking_number varchar(24),
  shipping_company varchar(50),
  ba_first_name varchar(25),
  ba_last_name varchar(25),
  ba_address varchar(50),
  ba_postal_code varchar(6),
  ba_province varchar(25),
  sa_first_name varchar(25),
  sa_last_name varchar(25),
  sa_address varchar(50),
  sa_postal_code varchar(6),
  sa_province varchar(25),
  payment_method varchar(6),
  PRIMARY KEY(order_id)
);
-- RELATION: user
CREATE TABLE user (
  username varchar(30),
  password varchar(30) NOT NULL,
  first_name varchar(25),
  last_name varchar(25),
  address varchar(50),
  email varchar(50) NOT NULL,
  phone_number numeric(10, 0),
  gender varchar(1),
  age numeric(3, 0) CHECK (
    age > 0
    AND age < 122
  ),
  PRIMARY KEY(username)
);
-- RELATION: store
CREATE TABLE store (
  username varchar(30),
  store_name varchar(50),
  PRIMARY KEY(username, store_name),
  FOREIGN KEY (username) REFERENCES user (username)
);
-- RELATIONSHIP: store_books
CREATE TABLE store_books (
  store_name varchar(255),
  isbn numeric(13, 0),
  retail_price numeric(3, 2) CHECK (retail_price > 0),
  wholesale_price numeric(3, 2) CHECK (wholesale_price > 0),
  stock_quantity numeric(4, 0) CHECK (stock_quantity > warning_quantity),
  warning_quantity numeric(4, 0) CHECK (warning_quantity >= 0),
  PRIMARY KEY(store_name, isbn),
  FOREIGN KEY (username) REFERENCES user (username),
  FOREIGN KEY (isbn) REFERENCES book (isbn)
);
-- RELATIONSHIP: ordered
CREATE TABLE ordered (
  order_id numeric(8, 0),
  isbn numeric(13, 0),
  username varchar(30),
  quantity numeric(3, 0) CHECK (quantity > 0),
  PRIMARY KEY (order_id, isbn),
  FOREIGN KEY order_id REFERENCES order (order_id),
  FOREIGN KEY isbn REFERENCES book (isbn),
  FOREIGN KEY username REFERENCES user (username)
);
-- All other relationships are trivial