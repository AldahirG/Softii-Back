import { Request, Response } from 'express';
import Tip from '../models/Tip';
import Employee from '../models/Employee';

export const addTip = async (req: Request, res: Response) => {
  try {
    const { amount, method, employees } = req.body;
    const newTip = await Tip.create({ amount, method });
    const employeePromises = employees.map((employee: any) =>
      Employee.create({ ...employee, tipId: newTip.id })
    );
    await Promise.all(employeePromises);
    res.status(201).json(newTip);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const getTips = async (req: Request, res: Response) => {
  try {
    const tips = await Tip.findAll({ include: [Employee] });
    res.status(200).json(tips);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};
