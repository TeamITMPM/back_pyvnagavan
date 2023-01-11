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

    async getOne(req, res) {
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

        let pizza = [];
        pizza.push(finalBasketResponse);
        pizza.push([{ totalPrice: totalPrice }]);
        return res.json(pizza);
    }

    async delete(req, res) {
        const { id } = req.params;

        const basketResponse = await BasketItem.destroy({
            where: {
                id,
            },
        });

        return res.json(basketResponse);
    }
}

module.exports = new BasketController();
