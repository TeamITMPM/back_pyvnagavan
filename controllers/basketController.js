const { BasketItem, Item, ItemInfo } = require('../models/models');

const ApiError = require('../error/ApiError');

class BasketController {
    async create(req, res) {
        const { basketId } = req.params;
        const { itemId, quantity } = req.body;

        const basketResponse = await BasketItem.create({
            basketId,
            itemId,
            quantity,
        });
        return res.json(basketResponse);
    }

    async getAll(req, res) {
        const { basketId } = req.params;

        const basketResponse = await BasketItem.findAll({
            where: {
                basketId: basketId,
            },
        });

        const allItem = await Item.findAll({
            include: [{ model: ItemInfo, as: 'info' }],
        });

        const finalBasketResponse = basketResponse.map(cartItem => {
            const product = allItem.find(item => {
                return item.dataValues.id === cartItem.itemId;
            });

            if (product) {
                return {
                    ...cartItem,
                    product,
                };
            }
            return cartItem;
        });

        let totalPrice = 0;

        finalBasketResponse.map(data => {
            const { quantity } = data.dataValues;
            const { price } = data.product;

            return (totalPrice += quantity * price);
        });

        let lastFinalBasketResponse = [];
        lastFinalBasketResponse.push(finalBasketResponse);
        lastFinalBasketResponse.push([totalPrice]);
        return res.json(lastFinalBasketResponse);
    }

    async delete(req, res) {
        const { basketId } = req.params;

        const { id } = req.body;

        await BasketItem.destroy({
            where: {
                id,
            },
        });

        const basketResponse = await BasketItem.findAll({
            where: {
                basketId: basketId,
            },
        });

        const allItem = await Item.findAll({
            include: [{ model: ItemInfo, as: 'info' }],
        });

        const finalBasketResponse = basketResponse.map(cartItem => {
            const product = allItem.find(item => {
                return item.dataValues.id === cartItem.itemId;
            });

            if (product) {
                return {
                    ...cartItem,
                    product,
                };
            }
            return cartItem;
        });

        let totalPrice = 0;

        finalBasketResponse.map(data => {
            const { quantity } = data.dataValues;
            const { price } = data.product;

            return (totalPrice += quantity * price);
        });

        let lastFinalBasketResponse = [];
        lastFinalBasketResponse.push(finalBasketResponse);
        lastFinalBasketResponse.push([totalPrice]);

        return res.json(lastFinalBasketResponse);
    }
}

module.exports = new BasketController();
