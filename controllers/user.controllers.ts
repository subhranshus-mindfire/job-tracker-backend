import { Request, Response } from 'express';
import User from '../models/User';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {

    const user = await User.create(req?.body);
    res.status(201).json({ success: true, data: user });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error: any) {
    console.log(error?.message)
    res.status(400).json({ success: false, message: error.message });
  }
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req?.params?.id
    const user = await User.find({ _id: id });
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    console.log(error?.message)
    res.status(400).json({ success: false, message: error.message })
  }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req?.params?.id
    const updatedUser = await User.findByIdAndUpdate(id, req?.body);
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error: any) {
    console.log(error?.message)
    res.status(400).json({ success: false, message: error.message });
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req?.params?.id
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, data: deletedUser });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
    console.log(error?.message)
  }
}


