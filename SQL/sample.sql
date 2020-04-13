--address
INSERT INTO address
VALUES(1, 2939, 'Books Avenue', 'Booklyn', 'New Bork City', 'B00K');

--user
INSERT INTO "user" (username, password, email)
VALUES('Nick', 'covid19', 'nick@gmail.com');

--publishers
INSERT INTO publisher
VALUES(1, 'Books R Us', '420', 1, 'booksrus@aol.com', '7184208008');
--books

INSERT INTO book
VALUES(9781593275846, 'Eloquent JavaScript, Second Edition', 'Marijn Haverbeke', 'Educational');

INSERT INTO book
VALUES(9781449331818,'Learning JavaScript Design Patterns', 'Addy Osmani', 'Educational');

INSERT INTO book
VALUES(9781449365035,'Speaking JavaScript', 'Axel Rauschmayer', 'Educational');

INSERT INTO book
VALUES(9781491950296,'Programming JavaScript Applications', 'Eric Elliott', 'Educational');

INSERT INTO book
VALUES(9781593277574,'Understanding ECMAScript 6', 'Nicholas C. Zakas', 'Educational');

INSERT INTO book
VALUES(9781449325862, 'Git Pocket Guide', 'Richard E. Silverman', 'Educational');

INSERT INTO book
VALUES(9781137279019,'Riveted: The Science of Why Jokes Make Us Laugh', 'Jim Davies', 'Educational');

INSERT INTO book
VALUES(9780071841603,'ITIL Foundation All-in-One Exam Guide', 'Jim Davies', 'Educational');

INSERT INTO book
VALUES(9780747546245,'Harry Potter and the Goblet of Fire', 'J.K. Rowling', 'Fiction');

--published
INSERT INTO published
VALUES(9781137279019, 1);

--store
INSERT INTO store
VALUES('Nix', 'Nick');

--store_books
INSERT INTO store_books
VALUES('Nix', 9781137279019, 14.99, 19.99, 3, 1);