import { Router } from 'express';
import Tip from '../models/Tip';
import Employee from '../models/Employee';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { amount, method, employees } = req.body;
    const tip = await Tip.create({ amount, method });

    if (employees && employees.length > 0) {
      const employeeInstances = employees.map((employee: { name: string, amount: number }) => ({
        name: employee.name,
        amount: employee.amount,
        tipId: tip.id 
      }));
      await Employee.bulkCreate(employeeInstances);
    }

    res.status(201).json(tip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add tip' });
  }
});

export default router;
