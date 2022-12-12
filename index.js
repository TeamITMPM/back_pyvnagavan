require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

const PORT = process.env.PORT || 5000;
const IP = process.env.IP;

const app = express();
// что б отправлять запросы с брвузера
app.use(cors());
// что б приложение могло парсить json формат
app.use(express.json());
// что б файлы с папки static необходимо раздавать как статику
app.use(express.static(path.resolve(__dirname, 'static')));
// что б работать с файлами
app.use(fileUpload({}));
app.use('/api', router);

// Обработка ошибок , последний Middleware
app.use(errorHandler);

// app.get('/', (req, res) => {
//     res.status(200).json({ message: 'Воно працює=)' });
// });

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, IP, () =>
            console.log(`Server fucking started on port ${PORT}`),
        );
    } catch (err) {
        console.log(err);
    }
};

start();
