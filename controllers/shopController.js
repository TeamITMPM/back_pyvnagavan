const uuid = require('uuid');
const path = require('path');
const { Shop, ShopItem } = require('../models/models');
const ApiError = require('../error/ApiError');

class ShopController {
    async createShop(req, res, next) {
        try {
            const { addressUA, addressENG, schedule } = req.body;
            const shop = await Shop.create({ addressUA, addressENG, schedule });
            return res.json(shop);
        } catch (e) {
            next(ApiError.badRequest(e.message));
            console.log(e);
        }
    }

    async getAllShop(req, res, next) {
        try {
            const shops = await Shop.findAll();
            return res.json(shops);
        } catch (e) {
            next(ApiError.internal(e.message));
            console.log(e);
        }
    }
    //  Закрепить пивчик за магазином
    async bindItemToShop(req, res, next) {
        const { shopId, itemId } = req.body;
        try {
            const shops = await ShopItem.create({ shopId, itemId });
            return res.json(shops);
        } catch (e) {
            next(ApiError.internal(e.message));
            console.log(e);
        }
    }
    // Посмотреть все пиво во всех магазтнах
    async getAllItems(req, res, next) {
        try {
            const shopItems = await ShopItem.findAll();
            return res.json(shopItems);
        } catch (e) {
            next(ApiError.internal(e.message));
            console.log(e);
        }
    }

    async filterItemsByShop(req, res, next) {
        try {
            const { shopId } = req.params;
            const shopItems = await ShopItem.findAll({ where: { shopId } });
            return res.json(shopItems);
        } catch (e) {
            next(ApiError.internal(e.message));
            console.log(e);
        }
    }
}

module.exports = new ShopController();
