const prisma = require('./prisma')

const getAllProducts = (moreThan) => {
    return prisma.products.findMany();
}

const getIdProduct = (id) => {
    return prisma.products.findUnique({
        where: {
            id: id,
        }
    })
}

const createProduct = (product) => {
    return prisma.products.create({
        data: product
    })
}

const buyProductByUser = (userId, productId, quantity) => {
    return prisma.boughtBy.create({
        data: {
            usersId: userId,
            productsId: productId,
            quantity: quantity
        }
    });
}

const updateProduct = (id, product) => {
    return prisma.products.update({
        where: {
            id: id,
        },
        data: product
    });
}

const deleteProduct = (id) => {
    return prisma.products.delete({
        where: {
            id: id,
        },
    });
}


module.exports = {
    getAllProducts,
    getIdProduct,
    createProduct, 
    updateProduct,
    deleteProduct,
    buyProductByUser,
}