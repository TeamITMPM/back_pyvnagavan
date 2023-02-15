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

            const itemInBasket = await BasketItem.findAll({
                where: {
                    basketId: basketId,
                },
            });

            const allItem = await Item.findAll({
                include: [{ model: ItemInfo, as: 'info' }],
            });

            const finalBasketResponse = itemInBasket.map(cartItem => {
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

            // Создать запись в таблице Order
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
                price: totalPrice,
            });

            if (!basketId) {
                throw new Error('BasketId is required.');
            }

            if (itemInBasket.length === 0) {
                throw new Error('No items found in the basket.');
            }

            let data = itemInBasket.map(item => {
                const { itemId, quantity } = item.dataValues;

                return OrderItem.create({
                    itemId,
                    basketId,
                    quantity,
                    orderId: createOrder.id,
                });
            });

            let result = await Promise.all(data);

            let response = [];
            response.push(createOrder);
            response.push(...result);

            return res.json(response);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
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

        let lastFinalBasketResponse = [];
        lastFinalBasketResponse.push(finalBasketResponse);
        lastFinalBasketResponse.push([totalPrice]);
        return res.json(lastFinalBasketResponse);
    }
}

module.exports = new OrderController();
