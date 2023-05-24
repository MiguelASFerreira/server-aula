const express = require("express");
const productsRoutes = require("./routes/products")

const server = express();
server.use(express.json());

server.use(productsRoutes.router)

module.exports = {
    server
}