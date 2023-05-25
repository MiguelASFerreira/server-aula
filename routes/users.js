const express = require('express');
const { createUser, getAllUsers, findUserByEmail, findUserById } = require('../database/users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const z = require('zod')
const router = express.Router()

const UserSchema = z.object({
    name: z.string().min(3).max(),
    email: z.string().email(),
    password: z.string().min(3),
    // age: z.number().optional()
})
router.get("/user", async (req, res) => {
    const users = await getAllUsers();
    res.json({
        users
    })
})

router.get("/history", auth, async (req, res) => {
    const user = await findUserById(req.user.userId);
    res.json({
        user
    }).send()
})

router.post("/register", async (req, res) => {
    try {
        const user = UserSchema.parse(req.body)
        const isEmailVerify = await findUserByEmail(user.email);
        if (isEmailVerify) {
            return res.status(400).json({
                message: "Email já cadastrado"
            })
        }
        const hashPassword = bcrypt.hashSync(user.password, 10)
        user.password = hashPassword
        const createdUser = await createUser(user)
        delete createdUser.password;
        res.status(201).json({
            user: createdUser,
        })
    } catch (error) {
        if (error instanceof z.ZodError) return res.status(422).json({ message: error.errors})
        res.status(500).json({
            message: "Server Error"
        })
    }
})


router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await findUserByEmail(email);
    const isSamePassword = bcrypt.compareSync(password, user.password);

    if (!user) {
        return res.status(401).send();
    }


    if (!isSamePassword) {
        return res.status(401).send()
    }

    const token = jwt.sign({
        userId: user.id,
        name: user.name,
    }, process.env.SECRET);

    res.json({
        sucess: true,
        token
    });
})

router.get("/profile", auth, async (req, res) => {
    const user = await findUserById(req.user.userId);
    res.json({
        user
    })
})


module.exports = {
    router
}