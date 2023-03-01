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
        const { nameUA, price } = item.product.dataValues;

        // const {quantity}= product.dataValues
        // console.log("product>>>>>>>>>>>>>>", product.dataValues);
        itemsData.push(
            `%0A    <b>${nameUA}</b>%0A      К:${quantity} Ц:<i>${price}</i> за од/тов`,
        );
    });
    itemsData.push(`%0A-----------------------%0AДо сплати:${price} грн`);

    let deliveryInfo = [`<u>-- Замовлення №${id} Інформація --</u>`];
    if (firstName) {
        deliveryInfo.push(`%0A<b> Ім'я: </b> <i>${firstName}</i>`);
    }
    if (phone) {
        deliveryInfo.push(`%0A<b> Телефон: </b> <i>${phone}</i>`);
    }
    if (email) {
        deliveryInfo.push(`%0A<b> email: </b> <i>${email}</i>`);
    }
    if (street) {
        deliveryInfo.push(`%0A<b> Вулиця: </b> <i>${street}</i>`);
    }
    if (house) {
        deliveryInfo.push(`%0A<b> Будинок: </b> <i>${house}</i>`);
    }
    if (apartment) {
        deliveryInfo.push(`%0A<b> Квартира: </b> <i>${apartment}</i>`);
    }
    if (code) {
        deliveryInfo.push(`%0A<b> Код домофону: </b> <i>${code}</i>`);
    }
    if (floor) {
        deliveryInfo.push(`%0A<b> Поверх: </b> <i>${floor}</i>`);
    }
    if (comments) {
        deliveryInfo.push(`%0A<b> Коментар: </b> <i>${comments}</i>`);
    }
    if (restaurant) {
        deliveryInfo.push(`%0A<b> Ресторан: </b> <i>${restaurant}</i>`);
    }
    if (date) {
        deliveryInfo.push(`%0A<b> Дата доставки: </b> <i>${date}</i>`);
    }
    if (asap === 'on') {
        deliveryInfo.push(`%0A<b><u>  якнайшвидше </u></b>`);
    }
    if (voucher) {
        deliveryInfo.push(`%0A<b> Купон: </b> <i>${voucher}</i>`);
    }
    if (change) {
        deliveryInfo.push(`%0A<b> Здача з: </b> <i>${change}</i>`);
    }
    if (noChange === 'on') {
        deliveryInfo.push(`%0A<b><u> Без здачі </u></b>`);
    }
    if (payment) {
        deliveryInfo.push(`%0A<b> Оплата: </b> <i>${payment}</i>`);
    }
    console.log(asap);

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
