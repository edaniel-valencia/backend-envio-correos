"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('email-send', 'root', '1004-TSE', {
    host: 'localhost',
    dialect: 'mysql'
});
exports.default = sequelize;
