/** online-bookstore DDL
Written by Nicolas El-Khoury & Vinh Nguyen

Defines database, relations, and relationships in that order.

*/
-- DATABASE
CREATE DATABASE `bookstore` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
/*

------------------------------------------------------------- RELATIONS

*/
-- RELATION: address
CREATE TABLE address (
  id numeric(5, 0),
  street_number numeric(4, 0),
  street_name varchar(30),
  city varchar(20),
  province varchar(25),
  postal_code varchar(6),
  PRIMARY KEY (id)
);
-- RELATION: publisher
CREATE TABLE publisher (
  id numeric(5, 0),
  publisher_name varchar(50),
  banking_account varchar(20) NOT NULL,
  address_id numeric(5, 0),
  email varchar(100),
  phone_number numeric(10, 0),
  PRIMARY KEY (id),
  FOREIGN KEY (address_id) REFERENCES address (id)
);
-- RELATION: Book
CREATE TABLE book (
  isbn numeric(13, 0),
  publisher_id numeric(5, 0) NOT NULL,
  title varchar(255) NOT NULL,
  author varchar(50) NOT NULL,
  genre varchar(50),
  pub_percentage numeric(3, 2) DEFAULT 0.02,
  PRIMARY KEY (isbn),
  FOREIGN KEY (publisher_id) REFERENCES publisher (id)
);
CREATE TABLE published (
  isbn numeric(13, 0) NOT NULL,
  publisher_id numeric(5, 0) NOT NULL,
  PRIMARY KEY (isbn, publisher_id),
  FOREIGN KEY(isbn) REFERENCES book (isbn),
  FOREIGN KEY(publisher_id) REFERENCES publisher (id)
);
-- RELATION: "order"
CREATE TABLE "order" (
  id numeric(8, 0) NOT NULL,
  date timestamp,
  tracking_number varchar(24),
  shipping_company varchar(50),
  billing_address numeric(5, 0),
  shipping_address numeric(5, 0),
  payment_method varchar(6),
  PRIMARY KEY (id),
  FOREIGN KEY (billing_address) REFERENCES address (id),
  FOREIGN KEY (shipping_address) REFERENCES address (id)
);
-- RELATION: "user"
CREATE TABLE "user" (
  username varchar(30),
  password varchar(30) NOT NULL,
  first_name varchar(25),
  last_name varchar(25),
  address_id numeric(5, 0),
  email varchar(50) NOT NULL,
  phone_number numeric(10, 0),
  gender varchar(1),
  age numeric(3, 0) CHECK (
    age > 0
    AND age < 122
  ),
  PRIMARY KEY (username),
  FOREIGN KEY (address_id) REFERENCES address (id)
);
-- RELATION: store
CREATE TABLE store (
  store_name varchar(50),
  username varchar(30),
  PRIMARY KEY(store_name),
  FOREIGN KEY (username) REFERENCES "user" (username)
);
/*

------------------------------------------------------------- RELATIONSHIPS

*/
-- RELATIONSHIP: store_books
CREATE TABLE store_books (
  store_name varchar(50),
  isbn numeric(13, 0),
  retail_price numeric(5, 2) CHECK (retail_price > 0),
  wholesale_price numeric(5, 2) CHECK (wholesale_price > 0),
  stock_quantity numeric(4, 0) CHECK (stock_quantity > warning_quantity),
  warning_quantity numeric(4, 0) CHECK (warning_quantity >= 0),
  PRIMARY KEY(store_name, isbn),
  FOREIGN KEY (store_name) REFERENCES store (store_name),
  FOREIGN KEY (isbn) REFERENCES book (isbn)
);
-- RELATIONSHIP: ordered
CREATE TABLE ordered (
  order_id numeric(8, 0),
  username varchar(30),
  PRIMARY KEY (order_id),
  FOREIGN KEY (order_id) REFERENCES "order" (id),
  FOREIGN KEY (username) REFERENCES "user" (username)
);
-- RELATIONSHIP: order_book
CREATE TABLE order_book (
  order_id numeric(8, 0),
  isbn numeric(13, 0),
  quantity numeric(3, 0) CHECK (quantity > 0),
  PRIMARY KEY (order_id, isbn),
  FOREIGN KEY (order_id) REFERENCES "order" (id),
  FOREIGN KEY (isbn) REFERENCES book (isbn)
);
-- All other relationships are implied