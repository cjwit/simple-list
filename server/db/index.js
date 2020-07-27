const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
})

// transaction
const tx = async(callback, errCallback) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await callback(client);
    await client.query("COMMIT");
  } catch (err) {
    console.log("DB ERROR:", err);
    await client.query("ROLLBACK");
    errCallback && errCallback(err);
  } finally {
    client.release();
  }
};

pool.on("error", (err) => {
  process.exit(-1);
});

pool.on("connect", () => {
  console.log("Connected to the database");
})

// logging could go here, see comment below
module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
  
  // I will use the tx function in an API if I have to call many queries that depend on each other.
  // If I'm making a single query, I will use the query function.
  tx,
  pool,
}

/*
module.exports = {
  query: (text, params, callback) => {
    const start = Date.now();
    return pool.query(text, params, (err, res) => {
      
      // set up logging in the console
      const duration = Date.now() - start;
      console.log('executed query', { text, duration, rows: res.rowCount })

      // call the callback that was sent as part of the query
      callback(err, res);
    });
  }
}
*/