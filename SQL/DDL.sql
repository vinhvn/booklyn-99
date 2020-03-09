-- Bookstore DDL
CREATE TABLE book (
    book_id int NOT NULL,
    publisher_id int NOT NULL,
    title varchar(255),
    author varchar(255),
    isbn varchar(255),
    genre varchar(255),
    tax float,
    tags varchar(255),
    PRIMARY KEY(book_id, publisher_id),
    FOREIGN KEY (publisher_id) REFERENCES publisher(publisher_id)
);

CREATE TABLE publisher (
    publisher_id int NOT NULL,
    publisher_name varchar(255),
    banking_account varchar(255),
    address varchar(255),
    email varchar(255),
    phone_number varchar(255),
    PRIMARY KEY(publisher_id)
);

CREATE TABLE order (
    order_id int NOT NULL,
    date varchar(255),
    tracking_number varchar(24),
    shipping_company varchar(255),
    ba_first_name varchar(255),
    ba_last_name varchar(255),
    ba_address varchar(255),
    ba_postal_code varchar(255),
    ba_province varchar(255),
    sa_first_name varchar(255),
    sa_last_name varchar(255),
    sa_address varchar(255),
    sa_postal_code varchar(255),
    sa_province varchar(255),
    payment_method varchar(255),
    PRIMARY KEY(order_id)
);

CREATE TABLE user (
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    first_name varchar(255),
    last_name varchar(255),
    address varchar(255),
    email varchar(255),
    phone_number varchar(255),
    gender varchar(255),
    age int,
    PRIMARY KEY(username)
);

CREATE TABLE store (
    username varchar(255) NOT NULL,
    store_name varchar(255) NOT NULL,
    PRIMARY KEY(username, store_name),
    FOREIGN KEY (username) REFERENCES user (username)
);

CREATE TABLE store_books (
    store_name varchar(255) NOT NULL,
    book_id varchar(255) NOT NULL,
    final_price float,
    wholesale_price float,
    warning_quantity int,
    quantity int,
    PRIMARY KEY(store_name, book_id),
    FOREIGN KEY (username) REFERENCES user (username)
);

CREATE TABLE ordered (
    order_id varchar(255) NOT NULL,
    book_id varchar(255) NOT NULL,
    username varchar(255),
    quantity int,
    PRIMARY KEY (order_id, book_id),
    FOREIGN KEY order_id REFERENCES order (order_id),
    FOREIGN KEY book_id REFERENCES book (book_id),
    FOREIGN KEY username REFERENCES user (username)
);