const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../db');

const app = express.Router();

module.exports = router;

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

INSERT INTO items (id, item_name, item_number) VALUES 
`

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
