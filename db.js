const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'your_db_username',
  password: 'password',
  host: 'localhost',
  port: 5432,
  database: 'your_database_name',
});
module.exports = pool;
