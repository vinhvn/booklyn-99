const { uuid } = require("uuidv4");
const express = require("express");
const app = express();
const port = 8081;

const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  password: "Vincent",
  host: "localhost",
  database: "bookstore",
  port: 5432,
});
client.connect();
let authed = [];

function queryGenerator(table, params) {
  let store;
  let publisher;
  if ("store" in params) {
    store = params.store;
    delete params.store;
  }
  if ("publisher" in params) {
    publisher = params.publisher;
    delete params.publisher;
  }
  if ("isbn" in params) {
    return "SELECT * FROM book WHERE isbn = " + params.isbn;
  }
  let keys = Object.keys(params);
  let values = Object.values(params);
  console.log(params);
  let query = "SELECT * FROM " + '"' + table + '"'; // initial query string

  if (keys.length != 0) {
    query += " WHERE ";
  } // add if query parameters

  for (let i = 0; i < keys.length; i++) {
    // loop through params and add them
    query += "UPPER(" + keys[i] + ") LIKE UPPER('%" + values[i] + "%') AND ";
  }

  if (keys.length != 0) {
    query = query.substring(0, query.length - 4);
  } // remove the additional AND

  if (store) {
    if (keys.length != 0) {
      query +=
        "AND isbn IN (SELECT isbn FROM store_books WHERE UPPER(store_name) LIKE UPPER('%" +
        store +
        "%'))";
    } else {
      query +=
        " WHERE isbn IN (SELECT isbn FROM store_books WHERE UPPER(store_name) LIKE UPPER('%" +
        store +
        "%'))";
    }
  }

  if (publisher) {
    if (keys.length != 0) {
      query +=
        "AND isbn IN (SELECT isbn FROM published WHERE publisher_id IN (SELECT publisher_id FROM publisher WHERE UPPER(publisher_name) LIKE UPPER('%" +
        publisher +
        "%')))";
    } else {
      query +=
        " WHERE isbn IN (SELECT isbn FROM published WHERE publisher_id IN (SELECT publisher_id FROM publisher WHERE UPPER(publisher_name) LIKE UPPER('%" +
        publisher +
        "%')))";
    }
  }
  console.log(query);
  return query; // return our final query
}

app.get("/books", (req, res) => {
  let query = queryGenerator("book", req.query);
  //client.connect()
  client.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.json(results.rows);
    //client.end()
  });
});

app.get("/login", (req, res) => {
  let query = queryGenerator("user", req.query);
  console.log(query);
  //client.connect()
  client.query(query, (error, results) => {
    // query db if username/password is in it
    let valid = false;
    if (error) {
      throw error;
    }
    for (let i = 0; i < results.rows.length; i++) {
      console.log(results.rows[i]);
      if (
        results.rows[i].username == req.query.username &&
        results.rows[i].password == req.query.password
      ) {
        // compare against rows
        valid = true;
      }
    }
    if (valid) {
      // exists
      let key = uuid();
      authed.push(key);
      res.json({ status: 200, key: key });
      return;
    }
    res.json({ status: 400 });
    //client.end()
  });
});

app.get("/logout", (req, res) => {
  if (!(req.query.authkey in authed)) {
    // check if logged in
    res.json({ status: 400 });
  } else {
    authed.remove(req.query.authkey);
    res.json({ status: 200 });
  }
});

app.get("/genres", (req, res) => {
  let query = "SELECT DISTINCT genre FROM book";
  //client.connect()
  client.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    let sent = { genre: [] };
    for (var i = 0; i < results.rows.length; i++) {
      sent.genre.push(results.rows[i].genre);
    }
    res.json(sent);
    //client.end()
  });
});

app.listen(port, () => {});
