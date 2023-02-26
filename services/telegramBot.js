const axios = require('axios');
const { TELEGRAM_BOT_TOKEN } = process.env;

const chatId = '229489966';

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
    let itemsData = [];
    items.map(item => {
        const { quantity } = item;
        const { name, price } = item.product.dataValues;

        // const {quantity}= product.dataValues
        // console.log("product>>>>>>>>>>>>>>", product.dataValues);
        itemsData.push(
            `${name} | Кількість:${quantity} по ціні:${price} за од/тов `,
        );
    });
    let deliveryInfo = `Ім'я:${firstName},
    Телефон: ${phone},
    email: ${email},
    Вулиця: ${street},
    Будинок: ${house},
    Квартира ${apartment},
    Код домофону: ${code},
    Поверх: ${floor},
    Коментар: ${comments},
    Ресторан: ${restaurant},
    Дата доставки: ${date},
    Час доставки: ${time},
    ${asap? "якнайшвидше," : ""}
    Купон: ${voucher},
    Здача з: ${change},
    Без здачі: ${noChange},
    Оплата: ${payment} `;

    // const{}=items
    const messageOrderInfo = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${itemsData}. До сплати:${price}`;
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
