const express = require("express");
const { createProduct, getAllProducts, getIdProduct, updateProduct, deleteProduct } = require("../database/products");
const router = express.Router()

router.get("/products", async (req, res) => {
    const products = await getAllProducts();
    res.json({
        products
    })
})

router.get("/products/:id", async (req, res) => {
    const id = Number(req.params.id);
    const product = await getIdProduct(id);
    res.json({product})
})

router.post("/products", async (req, res) => {
    const newProduct = req.body;

    const create = await createProduct(newProduct)
    res.json({
        product: create
    })
})

router.put("/products/:id", async (req, res) => {
    const id = Number(req.params.id);
    const update = await updateProduct(id, req.body)
    if (!update){
        return res.status(404).send({message: "Product not found"})
        
    }
    res.json({
        update
    })
})

router.delete("/products/:id", async (req, res) => {
    const id = Number(req.params.id)
    products = await deleteProduct(id);
    res.status(204).send()
})

module.exports = {
    router
}