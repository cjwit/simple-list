const express = require('express');
const createError = require('http-errors');

const app = express();
app.use(express.static('../client/dist'));

// for sending data
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// database
const db = require('./db');
const { pool } = require('./db');

// sent page to client
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// queries
const queryPostTemplate = `
DROP TABLE IF EXISTS items;

CREATE TABLE items(
  id varchar(30) PRIMARY KEY,
  item_name varchar(50),
  item_number integer
);

INSERT INTO items (id, item_name, item_number) VALUES`

// send data to the client
app.get('/storage', (req, res) => {
  pool.query('SELECT * FROM items;', (err, results) => {
    console.log(" => getting items", results.rows)
    res.send({ items: results.rows })
  })
});

// save data on update from the client
app.post('/storage', (req, res) => {
  
  // create query from req.body
  var queryText = queryPostTemplate;
  itemList = req.body;
  for (var i = 0; i < itemList.length; i++) {
    let item = itemList[i];
    let itemString = `\n  ('${item.id}', '${item.item_name}', ${item.item_number}),`
    queryText += itemString;
  }
  queryText = queryText.replace(/,$/,";");

  // send query to database
  pool.query(queryText, (err, res) => {
    console.log(res);
    // res.status(201).send(' --> cleared table');
  })
})

// error handler
app.use(function (err, req, res, next) {
  const error = err.status
    ? err
    : createError(500, 'Something went wrong!');

  res.status(error.status).json(error);
})

app.set("port", process.env.PORT || 3000);
module.exports = app;