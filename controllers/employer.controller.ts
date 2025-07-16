import { Request, Response } from 'express';
import { Employer } from '../models/Employer';

export const createEmployer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req.body;

    if (!user) {
      res.status(400).json({ success: false, message: 'user is required' });
      return
    }

    const existing = await Employer.findOne({ user });
    if (existing) {
      res.status(400).json({ success: false, message: 'Employer already exists for this user' });
      return
    }

    const employer = await Employer.create({ user });
    res.status(201).json({ success: true, data: employer });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getEmployers = async (req: Request, res: Response): Promise<void> => {
  try {
    const employers = await Employer.find().populate('user');
    res.status(200).json({ success: true, data: employers });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getEmployer = async (req: Request, res: Response): Promise<void> => {
  try {
    const employer = await Employer.findById(req.params.id).populate('user');

    if (!employer) {
      res.status(404).json({ success: false, message: 'Employer not found' });
      return
    }

    res.status(200).json({ success: true, data: employer });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateEmployer = async (req: Request, res: Response): Promise<void> => {
  try {
    const employerId = req.params.id;

    const updatedEmployer = await Employer.findByIdAndUpdate(
      employerId,
      req.body,
      { new: true, runValidators: true }
    ).populate('user');

    if (!updatedEmployer) {
      res.status(404).json({ success: false, message: 'Employer not found' });
      return
    }

    res.status(200).json({ success: true, data: updatedEmployer });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteEmployer = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Employer.findByIdAndDelete(req.params.id);
    res.status(203).json({ success: true, message: 'Employer deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};


