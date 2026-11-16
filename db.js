const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'only',
  host: 'localhost',
  port: 5432,
  database: 'gateproj',
});
module.exports = pool;
