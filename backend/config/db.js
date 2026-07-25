const mysql = require("mysql2");

function connectWithRetry() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  connection.connect((err) => {
    if (err) {
      console.log("❌ MySQL not ready. Retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
      return;
    }

    console.log("✅ Connected to MySQL");
    module.exports = connection;
  });

  return connection;
}

module.exports = connectWithRetry();