import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ success: false, message: 'No token provided' });
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.status(401).json({ success: false, message: 'User not found' });
      return
    }

    // @ts-ignore
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid Request' });
    return
  }
};

export const authorize = (role: string) => (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if ((role === req.user.role) || (req.user.role == "admin")) {
    next();
  }
  res.status(403).json({ success: false, message: 'Access denied' });
  return
};

export const verifySelf = (req: Request, res: Response, next: NextFunction) => {

  // @ts-ignore

  if (req.user.role == "admin") {
    next()
  }
  // @ts-ignore
  const userIdFromToken = req.user?.id;
  const userIdFromParams = req.params.id;

  if (!userIdFromToken) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return
  }

  if (userIdFromToken !== userIdFromParams) {
    res.status(403).json({ success: false, message: 'You can only access your own resource' });
    return
  }

  next();
};






