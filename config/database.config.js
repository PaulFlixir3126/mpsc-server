var mysql = require("mysql");
var pool;
var client;
const config = {
    host: "sql12.freemysqlhosting.net",
    port: "3306",
    user: "sql12384947",
    password: "Twcb3x3MMa",
    database: "sql12384947",
  insecureAuth: true,
};

module.exports = {
  getPool: function () {
    if (!pool) {
      pool = new mysql.Pool(config);
      pool = mysql.createPool(config);
      console.log("MySQL database connection established!");
    }
    return pool;
  },
  getClient: function () {
    if (!client) {
      client = mysql.createConnection(config);
      client.connect(function (err) {
        if (err) {
          return console.error("error: " + err.message);
        }

        console.log("Connected to the MySQL server.");
      });
    }
    return client;
  },
};
