const express = require("express");
const productsRoutes = require("./routes/products")
const usersRoutes = require("./routes/users")
const logger = require('./middleware/logger')

const server = express();

server.use(logger)
server.use(express.json());

server.use(productsRoutes.router)
server.use(usersRoutes.router)


module.exports = {
    server
}