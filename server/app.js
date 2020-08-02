const app = require("./routes");
const createError = require('http-errors');

// error handler
app.use(function (err, req, res, next) {
  const error = err.status
    ? err
    : createError(500, 'Something went wrong!');

  res.status(error.status).json(error);
})

app.set("port", process.env.PORT || 3000);
module.exports = app;