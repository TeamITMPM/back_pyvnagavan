require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const PORT = process.env.PORT || 5002;

const app = express();
// что б отправлять запросы с брвузера
app.use(cors());
// что б приложение могло парсить json формат
app.use(express.json());
app.use('/api', router);

// Обработка ошибок , последний Middleware
app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Воно працює=)' });
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () =>
            console.log(`Server fucking started on port ${PORT}`),
        );
    } catch (err) {
        console.log(err);
    }
};

start();
