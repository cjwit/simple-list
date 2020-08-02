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

// production setup
// const isProduction = app.get("env") === "production";

// if (isProduction) {
//   app.set("trust proxy", 1);
// }

// app.disable("x-powered-by");

var items = [];

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/storage', (req, res) => {
  pool.query('SELECT * FROM items;', (err, results) => {
    console.log(" => getting items", results.rows)
    res.send({ items: results.rows })
  })
});

const clearTableText = `
DROP TABLE IF EXISTS items;

CREATE TABLE items(
  id BIGSERIAL PRIMARY KEY,
  item_name TEXT,
  item_number INT
);
`
/* query text model
INSERT INTO items (id, item_name, item_number)
VALUES 
  (001, 'oranges', 0),
  (002, 'crackers', 1),
  (003, 'seltzer water', 2);
*/

// START HERE: clearing works, but is not asynchronous
//             saving the data is not working
app.post('/storage', (req, res) => {
  console.log(" => clearing table");
  pool.query(clearTableText, (err, res) => {
    console.log(' --> cleared table')
    console.log(res); // showing as undefined
    // res.status(201).send(' --> cleared table');
  })

  console.log(" => saving items", req.body)

  queryText = `
INSERT INTO items (id, item_name, item_number)
VALUES`

  itemList = req.body;
  for (var i = 0; i < itemList.length; i++) {
    let item = itemList[i];
    let itemString = `\n  (${item.id}, '${item.item_name}', ${item.item_number})`
    queryText += itemString;
  }
  queryText += ";";
  console.log(queryText);

  // start query
  // express.json();
  // asyncHandler(async (req, res, next) => {
  //   db.tx(async (client) => {
  //     const items = await client.query(queryText, []);
  //     console.log(res);
  //     console.log(' --> queried list')
  //   }, next);
  // })
  pool.query(queryText, {}, (err, res) => {
    console.log(' --> queried list')
    console.log(res);
    // res.status(201).send(' --> Stored list in database');
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