const { configMysql, configSqlite } = require("./options/db.config");
const express = require("express");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const Manager = require("./controllers/manager.js");
const managerProductos = new Manager(configMysql, "productos");
const managerChat = new Manager(configSqlite, "mensajes");
const { createTableMysql, createTableSqlite, createDBLocal } = require("./controllers/middleware.js");
const PORT = process.env.PORT || 8080;
const app = express();
const server = app.listen(PORT, () => {
  console.log(`>>>>> 🚀 Server Up! Port: ${PORT} <<<<<`);
});

app.use(express.static("src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.set("views", "./src/public/views");
app.set("view engine", "handlebars");
const io = new Server(server);

app.get("/", createDBLocal, createTableMysql, createTableSqlite, async (req, res) => {
  res.render("home");
});

io.on("connection", async (socket) => {
  console.log("🔛 Usuario Conectado");

  const loadProducts = async () => {
    const products = await managerProductos.getAll();
    const logChat = await managerChat.getAll();
    socket.emit("server:loadProducts", products);
    socket.emit("server:loadMessages", logChat);
  };
  loadProducts();

  const refreshList = async () => {
    const products = await managerProductos.getAll();
    io.emit("server:loadProducts", products);
  };

  socket.on("client:newProduct", async (obj) => {
    let id = await managerProductos.create(obj);
    let product = await managerProductos.getById(id);
    io.emit("server:newProduct", product);
  });

  socket.on("client:newMessage", async (obj) => {
    let id = await managerChat.create(obj);
    let message = await managerChat.getById(id);
    io.emit("server:newMessage", message);
  });

  socket.on("client:deleteProduct", async (id) => {
    await managerProductos.deleteById(id);
    refreshList();
  });

  socket.on("client:updateProduct", async (id) => {
    let prodId = await managerProductos.getById(id);
    socket.emit("server:updateProduct", prodId);
  });

  socket.on("cliente:sendUpdateProduct", async (prod) => {
    await managerProductos.updateById(prod);
    refreshList();
  });
});
