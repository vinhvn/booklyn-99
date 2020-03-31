const { uuid } = require('uuidv4')
const express = require('express')
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

let authed = []

function queryGenerator(table, params) {

    let keys = Object.keys(params)
    let values = Object.values(params)

    let query = "SELECT * FROM " + "\"" + table + "\"" // initial query string

    if (keys.length != 0) { query += " WHERE " } // add if query parameters

    for (let i = 0; i < keys.length; i++) { // loop through params and add them
        query += keys[i] + " = \'" + values[i] + "\' AND "
    }

    if (keys.length != 0) { query = query.substring(0, query.length - 4) } // remove the additional AND

    return query // return our final query
}

app.get('/', (req, res) => {
    let query = queryGenerator("user", req.query)
    client.connect()
    client.query(query, (error, results) => {
        if(error) {throw error}
        res.json(results.rows)
        //client.end()
    })
})

app.get('/login', (req, res) => {
    let query = queryGenerator("user", req.query)
    console.log(query)
    client.connect()
    client.query(query, (error, results) => {
        let valid = false;
        if(error) {throw error}
        for(let i = 0; i < results.rows.length; i++) {
            console.log(results.rows[i])
            if(results.rows[i].username == req.query.username && results.rows[i].password == req.query.password) {
                valid = true
            }
        }
        if(valid) {
            let key = uuid()
            authed.push(key)
            res.json({status:200, key: key})
            return
        }
        res.json({status:400})
        //client.end()
    })
})

app.get('/logout', (req, res) => {
    authed.
})

app.listen(port, () => {

})