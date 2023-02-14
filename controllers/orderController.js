const {
    Order,
    OrderItem,
    BasketItem,
    Item,
    ItemInfo,
} = require('../models/models');

const ApiError = require('../error/ApiError');

class OrderController {
    async create(req, res) {
        try {
            const {
                id,
                firstName,
                phone,
                email,
                street,
                house,
                apartment,
                code,
                floor,
                comments,
                restaurant,
                date,
                time,
                asap,
                voucher,
                change,
                noChange,
                payment,
                basketId,
            } = req.body;

            const createOrder = await Order.create({
                id,
                firstName,
                phone,
                email,
                street,
                house,
                apartment,
                code,
                floor,
                comments,
                restaurant,
                date,
                time,
                asap,
                voucher,
                change,
                noChange,
                payment,
                basketId,
            });

            console.log('createOrder:', createOrder);

            if (!basketId) {
                throw new Error('BasketId is required.');
            }

            const itemInBasket = await BasketItem.findAll({
                where: {
                    basketId: basketId,
                },
            });

            console.log('itemInBasket:', itemInBasket);

            if (itemInBasket.length === 0) {
                throw new Error('No items found in the basket.');
            }

            let data = itemInBasket.map(item => {
                const { itemId, quantity } = item.dataValues;

                return OrderItem.create({
                    itemId,
                    basketId,
                    quantity,
                });
            });

            let result = await Promise.all(data);

            console.log('result:', result);

            return res.json(result);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new OrderController();
