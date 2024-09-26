import { Sequelize } from "sequelize";


const sequelize = new Sequelize('email-send', 'root', '1004-TSE', {
    host: 'localhost',
    dialect: 'mysql'
})

export default sequelize