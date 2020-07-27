const express = require('express');
const app = express();
const port = 3000;
const createError = require('http-errors');

// error handler
app.use(function (err, req, res, next) {
  const error = err.status
    ? err
    : createError(500, 'Someting went wrong!');
  
  res.status(error.status).json(error);
})

app.get('/', (req, res) => res.send("Hello World!"))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))