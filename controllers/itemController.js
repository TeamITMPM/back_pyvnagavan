const uuid = require('uuid');
const path = require('path');
const { Item, ItemInfo } = require('../models/models');

const ApiError = require('../error/ApiError');

class ItemController {
    async create(req, res, next) {
        try {
            const {
                nameUA,
                nameENG,
                price,
                brandId,
                typeId,
                oldPrice,
                promoPrice,
                info,
                available,
                stockQuantity,
            } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            if (info) {
                info = JSON.parse(info);
                info.forEach(i =>
                    ItemInfo.create({
                        titleUA: i.titleUA,
                        titleENG: i.titleENG,
                        descriptionUA: i.descriptionUA,
                        descriptionENG: i.descriptionENG,
                        deviceId: i.deviceId,
                    }),
                );
            }

            const item = await Item.create({
                nameUA,
                nameENG,
                price,
                brandId,
                typeId,
                oldPrice,
                promoPrice,
                available,
                stockQuantity,
                img: fileName,
            });

            return res.json(item);
        } catch (e) {
            next(ApiError.badRequest(e.message));
            console.log(e);
        }
    }

    async getAll(req, res, next) {
        let { brandId, typeId, limit, page } = req.query;
        page = Number(page) || 1;
        limit = Number(limit) || 9999999;

        let offset = page * limit - limit;
        let item;
        if (!brandId && !typeId) {
            item = await Item.findAndCountAll({
                offset,
                limit,
                include: [{ model: ItemInfo, as: 'info' }],
            });
        }
        if (brandId && !typeId) {
            item = await Item.findAndCountAll({
                where: { brandId },
                limit,
                offset,
                include: [{ model: ItemInfo, as: 'info' }],
            });
        }
        if (!brandId && typeId) {
            item = await Item.findAndCountAll({
                where: { typeId },
                limit,
                offset,
                include: [{ model: ItemInfo, as: 'info' }],
            });
        }
        if (brandId && typeId) {
            item = await Item.findAndCountAll({
                where: { typeId, brandId },
                limit,
                offset,
                include: [{ model: ItemInfo, as: 'info' }],
            });
        }
        res.json(item);
        return next();
    }
    async getOne(req, res) {
        const { id } = req.params;
        const item = await Item.findOne({
            where: { id },
            include: [{ model: ItemInfo, as: 'info' }],
        });
        return res.json(item);
    }
}

module.exports = new ItemController();
