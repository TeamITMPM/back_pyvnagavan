const axios = require('axios');
const { TELEGRAM_BOT_TOKEN } = process.env;

const chatId = '-718374537';

function orderNotification({ orderInfo, items }) {
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
        price,
    } = orderInfo;
    let itemsData = [`-------Замовлення №${id}-------`];
    items.map(item => {
        const { quantity } = item;
        const { name, price } = item.product.dataValues;

        // const {quantity}= product.dataValues
        // console.log("product>>>>>>>>>>>>>>", product.dataValues);
        itemsData.push(
            `**%0A${name}** | Кількість:${quantity} по ціні:__${price}__ за од/тов`
        );
    });
    let deliveryInfo = `
    -------Замовлення №${id}-------%0A
    ** Ім'я: ** ${firstName},%0A
    **Телефон:** ${phone},%0A
    **email:** ${email},%0A
    **Вулиця:** ${street},%0A
    **Будинок:** ${house},%0A
    **Квартира:** ${apartment},%0A
    **Код домофону:** ${code},%0A
    **Поверх:** ${floor},%0A
    **Коментар:** ${comments},%0A
    **Ресторан:** ${restaurant},%0A
    **Дата доставки:** ${date},%0A
    **Час доставки:** ${time},%0A
    ${asap ? '**якнайшвидше**, %0A' : ''}
    **Купон:** ${voucher},%0A
    **Здача з:** ${change},%0A
    **Без здачі:** ${noChange},%0A
    **Оплата:** ${payment} `;

    // const{}=items
    const messageOrderInfo = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${itemsData}%0AДо сплати:${price}`;
    const messageDeliveryInfo = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${deliveryInfo}`;
    axios
        .post(messageOrderInfo)
        .then(() => {
            console.log(`test success`);
        })
        .catch(error => {
            console.error(`Error sending notification for test:`, error);
        });
    axios
        .post(messageDeliveryInfo)
        .then(() => {
            console.log(`test success`);
        })
        .catch(error => {
            console.error(`Error sending notification for test:`, error);
        });
}

module.exports = { orderNotification };
