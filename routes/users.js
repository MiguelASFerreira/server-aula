const express = require('express');
const { createUser, getAllUsers, findUserByEmail } = require('../database/users');
const bcrypt = require('bcrypt')
const router = express.Router()

router.get("/user", async (req, res) => {
    const users = await getAllUsers();
    res.json({
        users
    })
})

router.post("/register", async (req, res) => {
    try {
        const isEmailVerify = await findUserByEmail(req.body.email);
        if (isEmailVerify) {
            return res.status(400).json({
                message: "Email já cadastrado"
            })
        }
        const hashPassword = bcrypt.hashSync(req.body.password, 10)
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        }
        const createdUser = await createUser(newUser)
        delete createdUser.password;
        res.status(201).json({
            user: createdUser,
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        })
    }
})




module.exports = {
    router
}