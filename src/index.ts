import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './database';
import tipRoutes from './routes/tips';
import Tip from './models/Tip';
import Employee from './models/Employee';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/tips', tipRoutes);

Tip.hasMany(Employee, { foreignKey: 'tipId' });
Employee.belongsTo(Tip, { foreignKey: 'tipId' });

app.get('/', (req, res) => {
  res.send('Server is running');
});

sequelize.sync({ force: true }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to sync database:', err);
});
