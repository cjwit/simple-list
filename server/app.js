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
const queryGetAllItems = 'SELECT * FROM items;'
const queryPostTemplate = `
DROP TABLE IF EXISTS items;

CREATE TABLE items(
  id varchar(30) PRIMARY KEY,
  item_name varchar(50),
  item_number integer
);

INSERT INTO items (id, item_name, item_number) VALUES`

// create query from req.body
var buildInsertQuery = function(itemList) {
  var queryText = queryPostTemplate;
  for (var i = 0; i < itemList.length; i++) {
    let item = itemList[i];
    let itemString = `\n  ('${item.id}', '${item.item_name}', ${item.item_number}),`
    queryText += itemString;
  }
  queryText = queryText.replace(/,$/,";");
  return queryText;
}

// get data from database and send to the client
app.get('/storage', (req, res) => {
  pool.query(queryGetAllItems, (err, results) => {
    // console.log(" => getting items", results.rows)
    res.send({ items: results.rows })
  })
});

// save data on update from the client
app.post('/storage', (req, res) => {
  var queryText = buildInsertQuery(req.body);
  pool.query(queryText, (err, res) => {
    // console.log(res);
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