const uuid = require('uuid');
const path = require('path');
const { Item } = require('../models/models');

const ApiError = require('../error/ApiError');

class ItemController {
    async create(req, res, next) {
        try {
            const { name, price, brandId, typeId, oldPrice, promoPrice, info } =
                req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const item = await Item.create({
                name,
                price,
                brandId,
                typeId,
                oldPrice,
                promoPrice,
                img: fileName,
            });

            return res.json(item);
        } catch (e) {
            next(ApiError.badRequest(e.message));
            console.log(e);
        }
    }

    async getAll(req, res) {
        const { brandId, typeId } = req.query;
        let items;
        if (!brandId && !typeId) {
            items = await Item.findAll();
        }
        if (brandId && !typeId) {
            items = await Item.findAll({ where: { brandId } });
        }
        if (!brandId && typeId) {
            items = await Item.findAll({ where: { typeId } });
        }
        if (brandId && typeId) {
            items = await Item.findAll({ where: { typeId, brandId } });
        }
        return res.json(items);
    }
    async getOne(req, res) {}
}

module.exports = new ItemController();
