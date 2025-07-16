import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';
import { Applicant } from '../models/Applicant';
import { Employer } from '../models/Employer';

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

    let role_id: string | null = null

    //@ts-ignore
    if (user.role == "applicant") {
      const applicant = await Applicant.findOne({ user: user!._id })
      if (applicant) role_id = applicant._id as string
    }

    //@ts-ignore
    if (user.role == "employer") {
      const employer = await Employer.findOne({ user: user!._id })
      if (employer) role_id = employer._id as string
    }

    if (!user) {
      res.status(401).json({ success: false, message: 'User not found' });
      return
    }

    const result: object = user.toObject();

    // @ts-ignore
    result.role_id = role_id
    // @ts-ignore
    req.user = result
    console.log("user", result)
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid Request' });
    return
  }
};

export const authorize = (role: string) => (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  console.log((role === req.user.role), "check")
  // @ts-ignore
  if ((role === req.user.role) || (req.user.role == "admin")) {
    next();
    return
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






