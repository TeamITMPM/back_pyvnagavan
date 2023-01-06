const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models/models');

const generateJwt = (
    basketId,
    id,
    email,
    role,
    phone,
    firstName,
    secondName,
    dateOfBirthsday,
    discount,
    favouriteBeer,
) => {
    return jwt.sign(
        {
            basketId,
            id,
            email,
            role,
            phone,
            firstName,
            secondName,
            dateOfBirthsday,
            discount,
            favouriteBeer,
        },
        process.env.SECRET_KEY,
        {
            expiresIn: '24h',
        },
    );
};

class UserController {
    async registration(req, res, next) {
        const {
            email,
            password,
            phone,
            firstName,
            secondName,
            dateOfBirthsday,
            favouriteBeer,
        } = req.body;
        if (
            !email ||
            !password ||
            !phone ||
            !firstName ||
            !secondName ||
            !dateOfBirthsday
        ) {
            return next(ApiError.badRequest('Некоректні данні'));
        }

        // Проверка на такой же emaile
        const candidate = await User.findOne({ where: { email } });

        if (candidate) {
            return next(
                ApiError.badRequest('Користувач з таким email вже існує'),
            );
        }
        // Хешируем пароль
        const hashPassword = await bcrypt.hash(password, 5);

        // Создаем пользователя
        const user = await User.create({
            email,
            password: hashPassword,
            role: 'USER',
            phone,
            discount: 0,
            firstName,
            secondName,
            clientRating: 0,
            dateOfBirthsday,
            favouriteBeer,
        });
        // Создаем для пользователя корзину
        const basket = await Basket.create({ userId: user.id });
        const basketID = await Basket.findOne({
            where: {
                userId: user.id,
            },
        });
        const token = generateJwt(
            basketID.id,
            user.id,
            user.email,
            user.role,
            user.phone,
            user.firstName,
            user.secondName,
            user.dateOfBirthsday,
            user.discount,
            user.favouriteBeer,
        );

        return res.json({ token });
        // return res.json(user);
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal('Такого користувача не існує =('));
        }
        // Сравниваем пароли
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Не вірний пароль =('));
        }
        const basketID = await Basket.findOne({
            where: {
                userId: user.id,
            },
        });

        const token = generateJwt(
            basketID.id,
            user.id,
            user.email,
            user.role,
            user.phone,
            user.firstName,
            user.secondName,
            user.dateOfBirthsday,
            user.discount,
            user.favouriteBeer,
        );
        return res.json({ token });
    }
    async check(req, res, next) {
        const basketID = await Basket.findOne({
            where: {
                userId: user.id,
            },
        });
        const token = generateJwt(
            basketID.id,
            req.user.id,
            req.user.email,
            req.user.role,
            req.user.id,
            req.user.email,
            req.user.role,
            req.user.phone,
            req.user.firstName,
            req.user.secondName,
            req.user.dateOfBirthsday,
            req.user.discount,
            req.user.favouriteBeer,
        );
        return res.json({ token });
        // res.json({ message: 'worcking' });
    }
}

module.exports = new UserController();
