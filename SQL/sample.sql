/** online-bookstore sample data
Written by Nicolas El-Khoury & Vinh Nguyen

Inserts sample data into our database.

*/
---------------------------------------------------------------
/*

-- ADDRESS

*/
INSERT INTO address
VALUES(1,3005,'Book Avenue','New Book City','New Book','B00K5');
INSERT INTO address
VALUES(2,1125,'Colonel By Drive','Ottawa','Ontario','K1S5B6');
INSERT INTO address
VALUES(3,404,'Street Not Found','Ottawa','Ontario','K2B5G6');
INSERT INTO address
VALUES(4,2404,'Christine Avenue','Kanata','Ontario','J9K2L3');
INSERT INTO address
VALUES(5,3804,'Jorg Sack Street','Montreal','Quebec','Q1C8E6');
/*

-- USER

*/
INSERT INTO "user"
VALUES('nick', 'nick', 'Nicolas', 'El-Khoury', 4, 'nick@gmail.com', '6132405900', 'm', 20);
INSERT INTO "user"
VALUES('vinh', 'vinh', 'Vinh', 'Nguyen', 3, 'vinh@gmail.com', '6133164004', 'm', 20);
INSERT INTO "user"
VALUES('deen', 'deen', 'Deen', 'Albert', 2, 'deen@yahoo.ca', '4162003400', 'o', 32);
INSERT INTO "user"
VALUES('bill', 'bill', 'Bill', 'Morin', 5, 'billzz@gmail.com', '8521230840', 'm', 19);
/*

-- PUBLISHER

*/
INSERT INTO publisher
VALUES(1, 'Books R Us', '037412204', 1, 'booksrus@aol.com','6134550303');
INSERT INTO publisher
VALUES(2, 'Coder Pro', '037412038', 3, 'coderpro@gmail.com','6133080400');
INSERT INTO publisher
VALUES(3, 'Carleton Bookstore', '037410019', 2, 'carletonbookstore@gmail.com','6138082400');
/*

-- BOOK

*/
INSERT INTO book
VALUES(
    9781593275846,
    'Eloquent JavaScript, Second Edition',
    'Marijn Haverbeke',
    'Educational'
  );
INSERT INTO book
VALUES(
    9781449331818,
    'Learning JavaScript Design Patterns',
    'Addy Osmani',
    'Educational'
  );
INSERT INTO book
VALUES(
    9781449365035,
    'Speaking JavaScript',
    'Axel Rauschmayer',
    'Educational'
  );
INSERT INTO book
VALUES(
    9781491950296,
    'Programming JavaScript Applications',
    'Eric Elliott',
    'Educational'
  );
INSERT INTO book
VALUES(
    9781593277574,
    'Understanding ECMAScript 6',
    'Nicholas C. Zakas',
    'Educational'
  );
INSERT INTO book
VALUES(
    9781449325862,
    'Git Pocket Guide',
    'Richard E. Silverman',
    'Educational'
  );
INSERT INTO book
VALUES(
    9781137279019,
    'Riveted: The Science of Why Jokes Make Us Laugh',
    'Jim Davies',
    'Educational'
  );
INSERT INTO book
VALUES(
    9780071841603,
    'ITIL Foundation All-in-One Exam Guide',
    'Jim Davies',
    'Educational'
  );
INSERT INTO book
VALUES(
    9780747546245,
    'Harry Potter and the Goblet of Fire',
    'J.K. Rowling',
    'Fiction'
  );
/*

-- PUBLISHED

*/
INSERT INTO published
VALUES(9781137279019, 3);
INSERT INTO published
VALUES(9780747546245, 2);
INSERT INTO published
VALUES(9780747546245, 1);
INSERT INTO published
VALUES(9780071841603, 3);
INSERT INTO published
VALUES(9781449325862, 2);
INSERT INTO published
VALUES(9781593277574, 2);
INSERT INTO published
VALUES(9781491950296, 1);
INSERT INTO published
VALUES(9781491950296, 2);
INSERT INTO published
VALUES(9781449331818, 2);
INSERT INTO published
VALUES(9781593275846, 2);
/*

-- STORE

*/
INSERT INTO store
VALUES('Nix', 'nick');
INSERT INTO store
VALUES('VV Books', 'vinh');
/*

-- STORE_BOOKS

*/
INSERT INTO store_books
VALUES('Nix', 9781137279019, 14.99, 19.99, 20, 5);
INSERT INTO store_books
VALUES('VV Books', 9780071841603, 12.99, 20.99, 15, 5);
INSERT INTO store_books
VALUES('VV Books', 9781137279019, 18.99, 24.99, 15, 5);
INSERT INTO store_books
VALUES('VV Books', 9781593275846, 69.99, 109.99, 65, 20);
/*

-- ORDER

*/
INSERT INTO "order"
VALUES(1, '2020-01-08 12:05:00', '1Z2938882003920', 'UPS', 5, 5, 'VISA');
INSERT INTO "order"
VALUES(2, '2020-03-13 08:23:00', '1Z9382838378283', 'UPS', 2, 3, 'VISA');
/*

-- ORDERED

*/
INSERT INTO ordered
VALUES(1, 'vinh');
INSERT INTO ordered
VALUES(2, 'nick');
/*

-- ORDER_BOOK

*/
INSERT INTO order_book
VALUES(1, 9780071841603, 1);
INSERT INTO order_book
VALUES(1, 9781137279019, 1);
INSERT INTO order_book
VALUES(1, 9781593275846, 1);
INSERT INTO order_book
VALUES(2, 9781137279019, 3);
