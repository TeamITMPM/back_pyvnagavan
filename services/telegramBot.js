const axios = require('axios');
const { TELEGRAM_BOT_TOKEN } = process.env;

const chatId = '229489966';

function orderNotification({ orderInfo, items }) {
    const {
        id,
        firstName,
        phone,
        email,
        stree,
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

    // const{}=items
    const text = '123';
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${text}`;
    axios
        .post(url)
        .then(() => {
            console.log(`test success`);
        })
        .catch(error => {
            console.error(`Error sending notification for test:`, error);
        });
}

module.exports = { orderNotification };
