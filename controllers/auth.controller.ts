
import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({ success: true, data: result.user, token: result.token });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(200).json({
      success: true,
      data: result.user,
      token: result.token,
      role_id: result.role_id,
    });
  } catch (err: any) {
    res.status(401).json({ success: false, message: err.message });
  }
};
