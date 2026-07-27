const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

pool.getConnection((error, connection) => {
  if (error) {
    console.error("❌ MySQL connection failed:", error.message);
    return;
  }

  console.log("✅ Connected to MySQL connection pool");
  connection.release();
});

module.exports = pool;