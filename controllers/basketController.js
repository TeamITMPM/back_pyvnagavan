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

    // async get(req, res) {
    //     const basketResponse = await BasketItem.findAll();
    //     return res.json(basketResponse);
    // }
    async getOne(req, res) {
        const { basketId } = req.params;

        const basketResponse = await BasketItem.findAll({
            where: {
                basketId: basketId,
            },
        });
        return res.json(basketResponse);
    }

    async update(req, res) {
        // const fileName = FileService.saveFile(picture, post.body.nickname);
        // const updatedPost = await Post.findByIdAndUpdate(post.params.id, {
        //     ...post.body,
        //     picture: fileName,
        // });
        // return updatedPost;
    }
}

module.exports = new BasketController();
