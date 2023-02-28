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
    let itemsData = [`<u>-- Замовлення №${id} Кошик --</u>`];
    items.map(item => {
        const { quantity } = item;
        const { name, price } = item.product.dataValues;

        // const {quantity}= product.dataValues
        // console.log("product>>>>>>>>>>>>>>", product.dataValues);
        itemsData.push(
            `%0A    <b>${name}</b>%0A      К:${quantity} Ц:<i>${price}</i> за од/тов`,
        );
    });
    itemsData.push(`%0A-----------------------%0AДо сплати:${price} грн`)

    let deliveryInfo = `
    <u>-- Замовлення №${id} Інформація --</u>%0A
    <b> Ім'я: </b> <i>${firstName}</i>,%0A
    <b> Телефон: </b> <i>${phone}</i>,%0A
    <b> email: </b> <i>${email}</i>,%0A
    <b> Вулиця: </b> <i>${street}</i>,%0A
    <b> Будинок: </b> <i>${house}</i>,%0A
    <b> Квартира: </b> <i>${apartment}</i>,%0A
    <b> Код домофону: </b> <i>${code}</i>,%0A
    <b> Поверх: </b> <i>${floor}</i>,%0A
    <b> Коментар: </b> <i>${comments}</i>,%0A
    <b> Ресторан: </b> <i>${restaurant}</i>,%0A
    <b> Дата доставки: </b> <i>${date}</i>,%0A
    <b> Час доставки: </b> <i>${time}</i>,%0A
    ${asap ? '<b> якнайшвидше </b>, %0A' : ''}
    <b> Купон: </b> <i>${voucher}</i>,%0A
    <b> Здача з: </b> <i>${change}</i>,%0A
    <b> Без здачі: </b> <i>${noChange}</i>,%0A
    <b> Оплата: </b> <i>${payment}</i> `;

    // const{}=items
    const messageOrderInfo = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${chatId}&parse_mode=HTML&text=${itemsData}`;
    const messageDeliveryInfo = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${chatId}&parse_mode=HTML&text=${deliveryInfo}`;
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
