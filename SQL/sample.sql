--address
INSERT INTO address
VALUES(1, 2939, 'Books Avenue', 'Booklyn', 'New Bork City', 'B00K')
--publishers
INSERT INTO publisher
VALUES(1, 'Books R Us', '420', 1, 'booksrus@aol.com', '7184208008')
--books

INSERT INTO book
VALUES(9781593275846, 1, 'Eloquent JavaScript, Second Edition', 'Marijn Haverbeke', 'Educational');

INSERT INTO book
VALUES(9781449331818, 1, 'Learning JavaScript Design Patterns', 'Addy Osmani', 'Educational');

INSERT INTO book
VALUES(9781449365035, 1, 'Speaking JavaScript', 'Axel Rauschmayer', 'Educational');

INSERT INTO book
VALUES(9781491950296, 1, 'Programming JavaScript Applications', 'Eric Elliott', 'Educational');

INSERT INTO book
VALUES(9781593277574, 1, 'Understanding ECMAScript 6', 'Nicholas C. Zakas', 'Educational');

INSERT INTO book
VALUES(9781449325862, 1, 'Git Pocket Guide', 'Richard E. Silverman', 'Educational');

INSERT INTO book
VALUES(9781137279019, 1, 'Riveted: The Science of Why Jokes Make Us Laugh, Movies Make Us Cry, and Religion Makes Us Feel One with the Universe', 'Jim Davies', 'Educational');

INSERT INTO book
VALUES(9780071841603, 1, 'ITIL Foundation All-in-One Exam Guide', 'Jim Davies', 'Educational');

INSERT INTO book
VALUES(9780747546245, 1, 'Harry Potter and the Goblet of Fire', 'J.K. Rowling', 'Fiction');

--published
INSERT INTO published
VALUES(9781137279019, 1);

--store
INSERT INTO store
VALUES('Nix', 'Nick');

--store_books
INSERT INTO store_books
VALUES('Nix', 9781137279019, 14.99, 19.99, 3, 1);