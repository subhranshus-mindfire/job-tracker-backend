import { Request, Response } from 'express';
import { EmployerRepository } from '../repositories/EmployerRepository';

const employerRepo = new EmployerRepository();

export const createEmployer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req.body;

    if (!user) {
      res.status(400).json({ success: false, message: 'User is required' });
      return;
    }

    const existing = await employerRepo.findOneByUser(user);
    if (existing) {
      res.status(400).json({ success: false, message: 'Employer already exists for this user' });
      return;
    }

    const employer = await employerRepo.create({ user });
    res.status(201).json({ success: true, data: employer });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getEmployers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const employers = await employerRepo.findAllWithUser();
    res.status(200).json({ success: true, data: employers });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getEmployer = async (req: Request, res: Response): Promise<void> => {
  try {
    const employer = await employerRepo.findByIdWithUser(req.params.id);

    if (!employer) {
      res.status(404).json({ success: false, message: 'Employer not found' });
      return;
    }

    res.status(200).json({ success: true, data: employer });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateEmployer = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedEmployer = await employerRepo.updateByIdWithUser(req.params.id, req.body);

    if (!updatedEmployer) {
      res.status(404).json({ success: false, message: 'Employer not found' });
      return;
    }

    res.status(200).json({ success: true, data: updatedEmployer });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteEmployer = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await employerRepo.deleteById(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Employer not found' });
      return;
    }

    res.status(203).json({ success: true, message: 'Employer deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
