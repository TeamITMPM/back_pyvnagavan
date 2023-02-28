const { Brand } = require('../models/models');
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res) {
        try {
            const { nameUA, nameENG } = req.body;
            const brand = await Brand.create({ nameUA, nameENG });
            return res.json(brand);
        } catch (e) {
            next(ApiError.internal(e.message));
            console.log(e);
        }
    }

    async getAll(req, res) {
        try {
            const brands = await Brand.findAll();
            return res.json(brands);
        } catch (e) {
            next(ApiError.internal(e.message));
            console.log(e);
        }
    }
}

module.exports = new BrandController();
