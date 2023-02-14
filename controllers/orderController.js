const {
    Order,
    OrderItem,
    BasketItem,
    Item,
    ItemInfo,
} = require('../models/models');

const ApiError = require('../error/ApiError');

class OrderController {
    async create(req, res) {
        // const { basketId } = req.body;
        const {
            id,
            firstName,
            phone,
            email,
            street,
            house,
            apartment,
            code,
            floor,
            comments,
            restaurant,
            date,
            time,
            asap,
            voucher,
            change,
            noChange,
            payment,
            basketId,
        } = req.body;

        const createOrder = await Order.create({
            id,
            firstName,
            phone,
            email,
            street,
            house,
            apartment,
            code,
            floor,
            comments,
            restaurant,
            date,
            time,
            asap,
            voucher,
            change,
            noChange,
            payment,
            basketId,
        });

        const itemInBasket = await BasketItem.findAll({
            where: {
                basketId: basketId,
            },
        });

        let data = itemInBasket.map(item => {
            const { itemId, quantity } = item.dataValues;

            return OrderItem.create({
                itemId,
                basketId,
                quantity,
            });
        });

        let result = await Promise.all(data);

        return res.json(result);
    }

    // async getAll(req, res) {
    //     const { basketId } = req.params;

    //     const basketResponse = await BasketItem.findAll({
    //         where: {
    //             basketId: basketId,
    //         },
    //     });

    //     const allItem = await Item.findAll({
    //         include: [{ model: ItemInfo, as: 'info' }],
    //     });

    //     const finalBasketResponse = basketResponse.map(cartItem => {
    //         const product = allItem.find(item => {
    //             return item.dataValues.id === cartItem.itemId;
    //         });

    //         if (product) {
    //             return {
    //                 ...cartItem,
    //                 product,
    //             };
    //         }
    //         return cartItem;
    //     });

    //     let totalPrice = 0;

    //     finalBasketResponse.map(data => {
    //         const { quantity } = data.dataValues;
    //         const { price } = data.product;

    //         return (totalPrice += quantity * price);
    //     });

    //     let lastFinalBasketResponse = [];
    //     lastFinalBasketResponse.push(finalBasketResponse);
    //     lastFinalBasketResponse.push([totalPrice]);
    //     return res.json(lastFinalBasketResponse);
    // }

    // async delete(req, res) {
    //     const { basketId } = req.params;

    //     const { id } = req.body;

    //     const basketResponse1 = await BasketItem.destroy({
    //         where: {
    //             id,
    //         },
    //     });

    //     const basketResponse = await BasketItem.findAll({
    //         where: {
    //             basketId: basketId,
    //         },
    //     });

    //     const allItem = await Item.findAll({
    //         include: [{ model: ItemInfo, as: 'info' }],
    //     });

    //     const finalBasketResponse = basketResponse.map(cartItem => {
    //         const product = allItem.find(item => {
    //             return item.dataValues.id === cartItem.itemId;
    //         });

    //         if (product) {
    //             return {
    //                 ...cartItem,
    //                 product,
    //             };
    //         }
    //         return cartItem;
    //     });

    //     let totalPrice = 0;

    //     finalBasketResponse.map(data => {
    //         const { quantity } = data.dataValues;
    //         const { price } = data.product;

    //         return (totalPrice += quantity * price);
    //     });

    //     let lastFinalBasketResponse = [];
    //     lastFinalBasketResponse.push(finalBasketResponse);
    //     lastFinalBasketResponse.push([totalPrice]);

    //     return res.json(lastFinalBasketResponse);
    // }
}

module.exports = new OrderController();
