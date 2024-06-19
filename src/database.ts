import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('Softii', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
