const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models/models');

const generateJwt = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
        expiresIn: '24h',
    });
};

class UserController {
    async registration(req, res, next) {
        const {
            email,
            password,
            role,
            phone,
            discount,
            firstName,
            secondName,
            clientRating,
            dateOfBirthsday,
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
                ApiError.badRequest(
                    'Пользователь с таким email уже существует',
                ),
            );
        }
        // Хешируем пароль
        const hashPassword = await bcrypt.hash(password, 5);

        // Создаем пользователя
        const user = await User.create({
            email,
            password: hashPassword,
            role,
            phone,
            discount,
            firstName,
            secondName,
            clientRating,
            dateOfBirthsday,
        });
        // Создаем для пользователя корзину
        const basket = await Basket.create({ userId: user.id });
        const token = generateJwt(user.id, user.email, user.role);

        return res.json({ token });
        // return res.json(user);
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'));
        }
        // Сравниваем пароли
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'));
        }
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({ token });
        // res.json({ message: 'worcking' });
    }
}

module.exports = new UserController();
