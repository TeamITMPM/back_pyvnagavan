const { BasketItem } = require('../models/models');
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
        return res.json(basketResponse);
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
