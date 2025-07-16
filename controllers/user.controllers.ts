import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';

const userRepo = new UserRepository();

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userRepo.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await userRepo.findAll();
    res.status(200).json({ success: true, data: users });
  } catch (error: any) {
    console.log(error?.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userRepo.findById(req.params.id);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    console.log(error?.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await userRepo.updateById(req.params.id, req.body);
    if (!updatedUser) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error: any) {
    console.log(error?.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await userRepo.deleteById(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.status(203).json({ success: true, message: 'User deleted successfully' });
  } catch (error: any) {
    console.log(error?.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
