const express = require("express");
const { createProduct, getAllProducts, getIdProduct, updateProduct, deleteProduct, buyProductByUser } = require("../database/products");
const router = express.Router()
const auth = require('../middleware/auth')
const z = require('zod')

const ProductSchema = z.object({
    name: z.string({
        required_error: "Name must be described",
        invalid_type_error: "Name must be is a string"
    }),
    price: z.number({
        required_error: "Price must be described",
        invalid_type_error: "Price must be is a number"
    }).min(0).default(0),
})


router.get("/products", async (req, res) => {
    const moreThan = req.query.more_than ? Number(req.query.more_than) : 0;
    const products = await getAllProducts(moreThan);
    res.json({
        products
    })
})

router.get("/products/:id", auth, async (req, res) => {
    const id = Number(req.params.id);
    const product = await getIdProduct(id);
    res.json({product})
})

router.post("/products", async (req, res) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price
    }

    const create = await createProduct(newProduct)
    res.json({
        product: create
    })
})

router.put("/products/:id", auth, async (req, res) => {
    const id = Number(req.params.id);
    const product = ProductSchema.parse(req.body)
    const update = await updateProduct(id, product)
    if (!update){
        return res.status(404).send({message: "Product not found"})
        
    }
    res.json({
        update
    })
})

router.delete("/products/:id", auth, async (req, res) => {
    const id = Number(req.params.id)
    products = await deleteProduct(id);
    res.status(204).send()
})

module.exports = {
    router
}