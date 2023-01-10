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
            // console.log(cartItem);
            const product = allItem.find(item => {
                return item.dataValues.id === cartItem.itemId;
            });

            if (product) {
                return {
                    ...cartItem,
                    metaData: product,
                };
            }
            return cartItem;
        });

        return res.json(finalBasketResponse);
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
