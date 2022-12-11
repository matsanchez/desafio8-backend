const { configMysql, configSqlite, configDbLocal } = require("../options/db.config.js");
const mysql = require("mysql");
const knex = require("knex");
const dbMysql = knex(configMysql);
const dbSqlite = knex(configSqlite);

const auth = (req, res, next) => {
  let admin = false; /* valor true, para restringir acceso a rutas de solo administrador */
  if (admin)
    return res
      .status(401)
      .send({ error: -2, descripcion: `ruta ${req.baseUrl} ${req.url} metodo ${req.method} no autorizada` });
  next();
};

const validationUrl = (req, res, next) => {
  if (isNaN(req.params.id) && isNaN(req.params.id_prod))
    return res
      .status(400)
      .send({ error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada` });
  next();
};

const validationBody = (req, res, next) => {
  let { nombre, descripcion, codigo, foto, precio, stock } = req.body;
  if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) {
    return res.status(400).send({ error: -2, descripcion: `Todos los campos son obligatorios` });
  }
  next();
};

const createDBLocal = async (req, res, next) => {
  const connectDB = await mysql.createConnection(configDbLocal);
  connectDB.connect(function (err, result) {
    if (err) throw err;
    connectDB.query("CREATE DATABASE IF NOT EXISTS websocket_mariadb", function (err, result) {
      console.log("🚩 Trabajando en la DB websocket_mariadb en localhost");
      if (err) throw err;
    });
  });
  next();
};

const createTableMysql = async (req, res, next) => {
  try {
    dbMysql.initialize(dbMysql);
    const isCreated = await dbMysql.schema.hasTable("productos");
    if (isCreated) {
      next();
    } else {
      await dbMysql.schema
        .createTable("productos", (table) => {
          table.increments("id");
          table.string("name");
          table.integer("price");
          table.string("thumbnail");
        })
        .finally(() => dbMysql.destroy());
      console.log("✅ Tabla productos creada exitosamente en MySql MariaDb");
      next();
    }
  } catch (error) {
    console.log("error", error.message);
  }
};

const createTableSqlite = async (req, res, next) => {
  try {
    const isCreated = await dbSqlite.schema.hasTable("mensajes");
    if (isCreated) {
      next();
    } else {
      await dbSqlite.schema.createTable("mensajes", (table) => {
        table.increments("id");
        table.string("email");
        table.integer("date");
        table.string("text");
      });
      console.log("✅ Tabla mensajes creada exitosamente en SQlite3");
      next();
    }
  } catch (error) {
    console.log("error", error.message);
  }
};

module.exports = {
  auth,
  validationUrl,
  validationBody,
  createTableMysql,
  createTableSqlite,
  createDBLocal,
};
