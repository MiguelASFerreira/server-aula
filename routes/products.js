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


router.get("/products", auth, async (req, res) => {
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

router.post("/products", auth, async (req, res) => {
    try {
        const newProduct = ProductSchema.parse(req.body)
        const create = await createProduct(newProduct)
        res.json({
            product: create
        })
    } catch (error) {
        if (error instanceof z.ZodError) return res.status(422).json({ message: error.errors})
        return res.status(500).json({
            message: "Server Error"
        })
    }
})

router.post("/products/buy", auth, async (req, res) => {
    const user = req.user;
    const productAndQuantity = req.body.products;
    for (let item of productAndQuantity) {
        await buyProductByUser(user.userId, item.id, item.quantity)
    }
    res.status(201).json({
        sucess: true
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