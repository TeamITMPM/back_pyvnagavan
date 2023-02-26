const {
    Order,
    OrderItem,
    BasketItem,
    Item,
    ItemInfo,
} = require('../models/models');

const ApiError = require('../error/ApiError');
const { orderNotification } = require('../services/telegramBot');

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
            } = req.body;

            const { basketId } = req.params;

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
                        ...cartItem.dataValues,
                        product,
                    };
                }

                return cartItem;
            });

            console.log('finalBasketResponse>>>>>>>>', finalBasketResponse);
            let totalPrice = 0;

            finalBasketResponse.map(data => {
                const { quantity } = data;
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

            //Создаем записи в таблице order_items
            itemInBasket.map(item => {
                const { itemId, quantity } = item.dataValues;

                return OrderItem.create({
                    itemId,
                    basketId,
                    quantity,
                    orderId: createOrder.id,
                });
            });

            let response = {
                orderInfo: createOrder.dataValues,
                items: finalBasketResponse,
            };

            const basketToDelete = await BasketItem.findAll({
                where: {
                    basketId: basketId,
                },
            });

            if (basketToDelete.length > 0) {
                await BasketItem.destroy({
                    where: {
                        basketId: basketId,
                    },
                });
            }
            orderNotification(response);
            return res.json(response);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res, next) {
        try {
            const { basketId } = req.params;

            const orders = await Order.findAll({
                where: {
                    basketId: basketId,
                },
            });

            let result = await Promise.all(
                orders.map(async orderInfo => {
                    const orderItems = await OrderItem.findAll({
                        where: {
                            orderId: orderInfo.id, // use the order ID to filter the order items
                        },
                    });

                    const allItems = await Item.findAll({
                        include: [{ model: ItemInfo, as: 'info' }],
                    });

                    const finalOrderItems = orderItems.map(orderItem => {
                        const product = allItems.find(item => {
                            return item.dataValues.id === orderItem.itemId;
                        });

                        if (product) {
                            return {
                                ...orderItem.dataValues,
                                product,
                            };
                        }
                        return orderItem;
                    });

                    return {
                        orderInfo: orderInfo.dataValues,
                        items: finalOrderItems,
                    };
                }),
            );

            return res.json(result);
        } catch (error) {
            next(ApiError.internal(e.message));
            console.log(e);
        }
    }
}

module.exports = new OrderController();
