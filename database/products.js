const prisma = require('./prisma')

const getAllProducts = (moreThan) => {
    return prisma.products.findMany({
        where: {
            price: {
                gt: moreThan
            }
        }
    });
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
}