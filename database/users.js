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

const findUserById = (id) => {
    return prisma.users.findUnique({
        where: {
            id: id
        },
        select: {
            password: false,
            id: true,
            name: true,
            email: true,
            BoughtMany: {
                select: {
                    quantity: true,
                    product: {
                        select: {
                            name: true,
                            price: true,
                        }
                    },
                },
            }
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
        data: {
            name: user.name,
            email: user.email,
            BoughtMany: {
                create: {
                    quantity: 5,
                    productsId: 2,
                }
            }
        }
    });
}

module.exports = {
    getAllUsers,
    getIdUser,
    findUserById,
    findUserByEmail,
    createUser,
}