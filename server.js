const express = require("express");
const productsRoutes = require("./routes/products")
const usersRoutes = require("./routes/users")

const server = express();

server.use(logger)
server.use(express.json());

server.use(productsRoutes.router)

module.exports = {
    server
}