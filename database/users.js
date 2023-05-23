const prisma = require("./prisma")

const getAllUsers = () => {
    return prisma.users.findMany();
}

const getIdUser = (id) => {
    return prisma.users.findUnique({
        where: {
            id: id
        }
    });
}

const findUserByEmail = (email) => {
    return prisma.users.findUnique({
        where: {
            email,
        },
    });
}

const createUser = (user) => {
    return prisma.users.create({
        data: user
    });
}

module.exports = {
    getAllUsers,
    getIdUser,
    findUserByEmail,
    createUser,
}