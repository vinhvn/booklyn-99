const { uuid } = require('uuidv4')
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 8081

const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    password: '20000205',
    host: 'localhost',
    database: 'bookstore',
    port: 5432
})
client.connect();
app.use(express.json())
let authed = []

function queryGenerator(table, params) {

    let store;
    let publisher;
    if("store" in params){
        store = params.store
        delete params.store
    }
    if("publisher" in params){
        publisher = params.publisher
        delete params.publisher
    }
    if("isbn" in params){
        return "SELECT * FROM book WHERE isbn = " + params.isbn;
    }
    let keys = Object.keys(params)
    let values = Object.values(params)
    console.log(params)
    let query = "SELECT * FROM " + "\"" + table + "\"" // initial query string

    if (keys.length != 0) { query += " WHERE " } // add if query parameters

    for (let i = 0; i < keys.length; i++) { // loop through params and add them
        query += "UPPER(" + keys[i] + ") LIKE UPPER(\'%" + encodeURIComponent(values[i]) + "%\') AND "
    }

    if (keys.length != 0) { query = query.substring(0, query.length - 4) } // remove the additional AND

    if(store) {
        if(keys.length != 0) {
            query += "AND isbn IN (SELECT isbn FROM store_books WHERE UPPER(store_name) LIKE UPPER(\'%" + store + "%\'))";
        } else {
            query += " WHERE isbn IN (SELECT isbn FROM store_books WHERE UPPER(store_name) LIKE UPPER(\'%" + store + "%\'))";
        }
    }

    if(publisher) {
        if(keys.length != 0) {
            query += "AND isbn IN (SELECT isbn FROM published WHERE publisher_id IN (SELECT publisher_id FROM publisher WHERE UPPER(publisher_name) LIKE UPPER(\'%" + publisher + "%\')))"
        } else {
            query += " WHERE isbn IN (SELECT isbn FROM published WHERE publisher_id IN (SELECT publisher_id FROM publisher WHERE UPPER(publisher_name) LIKE UPPER(\'%" + publisher + "%\')))"
        }
    }
    return query // return our final query
}

app.get('/books', (req, res) => {
    let query = queryGenerator("book", req.query)
    //client.connect()
    client.query(query, (error, results) => {
        if(error) {throw error}
        res.json(results.rows)
        //client.end()
    })
})

app.post('/login', (req, res) => {
    let query = queryGenerator("user", req.body)
    console.log(req.body)
    //client.connect()
    client.query(query, (error, results) => { // query db if username/password is in it
        let valid = false;
        if(error) {throw error}
        for(let i = 0; i < results.rows.length; i++) {
            console.log(results.rows[i])
            if(results.rows[i].username == req.body.username && results.rows[i].password == req.body.password) { // compare against rows
                valid = true
            }
        }
        if(valid) { // exists
            let key = uuid()
            authed.push(key)
            res.json({status:200, key: key})
            return
        }
        res.json({status:400})
        //client.end()
    })
})

app.post('/logout', (req, res) => {
    console.log(authed)
    console.log(req.body.authkey)
    if(!authed.includes(req.body.authkey)) { // check if logged in
        res.json({status:400})
    } else {
        authed.splice(authed.indexOf(req.body.authkey), 1)
        res.json({status:200})
    }
})

app.post('/register', (req, res) => {
    let address_id = Math.floor(Math.random() * 99999);
    let query_address = `INSERT INTO \"address\" VALUES('${address_id}', '${req.body.street_number}', '${req.body.street_name}', '${req.body.city}', '${req.body.province}', '${req.body.postal_code}')`
    let query_user = `INSERT INTO \"user\" VALUES('${req.body.username}', '${req.body.password}', '${req.body.first_name}', '${req.body.last_name}', '${address_id}', '${req.body.email}', '${req.body.phone_number}', '${req.body.gender}', '${req.body.age}')` 
    console.log(query_user)
    console.log(query_address)
    client.query(query_address, (error, results) => {
       // if(error) {}
        //client.end()
        client.query(query_user, (error, results) => {
            if(error) {
                res.status(400).send()
            } else {
                res.status(200).send()
            }
            //client.end()
        })
    })
})

app.post('/book', (req, res) => {
    let query_book = `INSERT INTO book (isbn, title, author, genre) VALUES('${req.body.isbn}', '${req.body.title}', '${req.body.author}'. '${req.body.genre}')`
    //let query_published = `INSERT INTO published VALUES('${req.body.isbn}')`
    client.query(query_book, (error, results) => {
        //if(error) {throw error}
        res.status(200).send()
        //client.end()
    })
})

app.get('/genres', (req, res) => {
    let query = "SELECT DISTINCT genre FROM book"
    //client.connect()
    client.query(query, (error, results) => {
        if(error) {throw error}
        let sent = {genre:[]}
        for (var i = 0; i < results.rows.length; i++){
            sent.genre.push(results.rows[i].genre)
        }
        res.json(sent)
        //client.end()
    })
})

app.listen(port, () => {

})