const configDbLocal = {
  host: "localhost",
  user: "root",
  password: "",
};

const configMysql = {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "websocket_mariadb",
  },
  pool: { min: 0, max: 7 },
};

const configSqlite = {
  client: "sqlite3",
  connection: {
    filename: "./src/db/ecommerce.sqlite",
  },
  useNullAsDefault: true,
};

module.exports = { configMysql, configSqlite, configDbLocal };
