const sequelize = require('../db');
// Класс с помощу которого описываются типы того или инного поня
const { DataTypes, TEXT } = require('sequelize');
// Описываем модель пользователя
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    firstName: { type: DataTypes.STRING },
    secondName: { type: DataTypes.STRING },
    dateOfBirthsday: { type: DataTypes.DATEONLY },
    clientRating: { type: DataTypes.TINYINT, defaultValue: 0 },
    discount: { type: DataTypes.TINYINT, defaultValue: 0 },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
    favouriteBeer: { type: DataTypes.STRING },
});

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketItem = sequelize.define('basket_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: { type: DataTypes.TEXT },
});

const Item = sequelize.define('item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameUA: { type: DataTypes.STRING, unique: true, allowNull: false },
    nameENG: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    oldPrice: { type: DataTypes.INTEGER, allowNull: false },
    promoPrice: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameUA: { type: DataTypes.STRING, unique: true, allowNull: false },
    nameENG: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameUA: { type: DataTypes.STRING, unique: true, allowNull: false },
    nameENG: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull: false },
});

const ItemInfo = sequelize.define('item_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titleUA: { type: DataTypes.STRING, allowNull: false },
    titleENG: { type: DataTypes.STRING, allowNull: false },
    descriptionUA: { type: DataTypes.STRING, allowNull: false },
    descriptionENG: { type: DataTypes.STRING, allowNull: false },
});

const TypeBrand = sequelize.define('type_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    firstName: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    street: { type: DataTypes.STRING },
    house: { type: DataTypes.STRING },
    apartment: { type: DataTypes.STRING },
    code: { type: DataTypes.STRING },
    floor: { type: DataTypes.TINYINT },
    comments: { type: DataTypes.STRING },
    restaurant: { type: DataTypes.STRING },
    date: { type: DataTypes.STRING },
    time: { type: DataTypes.STRING },
    asap: { type: DataTypes.STRING },
    voucher: { type: DataTypes.STRING },
    change: { type: DataTypes.STRING },
    noChange: { type: DataTypes.STRING },
    payment: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING },
    basketId: { type: DataTypes.STRING },
    price: { type: DataTypes.STRING },
});

const OrderItem = sequelize.define('order_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: { type: DataTypes.TEXT },
    basketId: { type: DataTypes.INTEGER },
    itemId: { type: DataTypes.INTEGER },
});

const Shop = sequelize.define('shop', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    addressUA: { type: DataTypes.TEXT },
    addressENG: { type: DataTypes.TEXT },
    schedule: { type: DataTypes.TEXT },
});

const ShopItem = sequelize.define('shop_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketItem);
BasketItem.belongsTo(Basket);

Type.hasMany(Item);
Item.belongsTo(Type);

Brand.hasMany(Item);
Item.belongsTo(Brand);

Item.hasMany(Rating);
Rating.belongsTo(Item);

Item.hasMany(BasketItem);
BasketItem.belongsTo(Item);

Item.hasMany(ItemInfo, { as: 'info' });
ItemInfo.belongsTo(Item);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

Item.hasMany(OrderItem);
OrderItem.belongsTo(Item);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Shop.hasMany(ShopItem);
ShopItem.belongsTo(Shop);

Item.hasMany(ShopItem);
ShopItem.belongsTo(Item);

module.exports = {
    User,
    Basket,
    BasketItem,
    Item,
    Type,
    Brand,
    Rating,
    TypeBrand,
    ItemInfo,
    Order,
    OrderItem,
    Shop,
    ShopItem,
};
