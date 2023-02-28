const uuid = require('uuid');
const path = require('path');
const { Shop, ShopItem} = require('../models/models');
const ApiError = require('../error/ApiError');

class ShopController {
    async create(req, res, next) {
        try {
            const { address , schedule } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const shop = await Shop.create({ address , schedule , img: fileName });
            return res.json(shop);
        } catch (e) {
            next(ApiError.badRequest(e.message));
            console.log(e);
        }
    }
    
    async getAll(req, res, next) {
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
        const { shopId , itemId} = req.body;
        try {
            const shops = await ShopItem.create( { shopId , itemId} );
            return res.json(shops);
        } catch (e) {
            next(ApiError.internal(e.message));
            console.log(e);
        }
    }

}

module.exports = new ShopController();