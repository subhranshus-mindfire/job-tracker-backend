import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";
import { Applicant } from "../models/Applicant";
import { Employer } from "../models/Employer";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ success: false, message: "No access token provided." });
    return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    await attachUserToReq(decoded.id, req);

    next();

  } catch (err: any) {
    if (err.name !== "TokenExpiredError") {
      console.log(err);
      res.status(401).json({ success: false, message: "Invalid access token." });
      return
    }

    console.log("Access token expired. Trying to refresh…");

    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      res.status(401).json({ success: false, message: "Access token expired. No refresh token found." });
      return
    }

    try {
      const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { id: string };

      const newAccessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);

      res.cookie("token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
      });

      console.log("Issued new access token from refresh token");

      await attachUserToReq(decoded.id, req);
      next();

      return
    } catch (refreshErr) {
      console.log("Invalid refresh token:", refreshErr);
      res.status(401).json({ success: false, message: "Invalid refresh token. Please login again." });

      return
    }
  }
};

async function attachUserToReq(userId: string, req: Request) {
  const user = await User.findById(userId).select("-password");
  if (!user) throw new Error("User not found");

  let role_id: string | null = null;

  if (user.role === "applicant") {
    const applicant = await Applicant.findOne({ user: user._id });
    if (applicant && applicant._id) role_id = applicant._id.toString();
  }

  if (user.role === "employer") {
    const employer = await Employer.findOne({ user: user._id });
    if (employer && employer._id) role_id = employer._id.toString();
  }

  const result = user.toObject();
  // @ts-ignore
  result.role_id = role_id;
  // @ts-ignore
  req.user = result;
}

export const authorize = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const userRole = req.user?.role;

    if (userRole === role || userRole === "admin") {
      next();
      return;
    }

    res.status(403).json({ success: false, message: "Access denied." });
    return;
  };
};

export const verifySelf = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const userRole = req.user?.role;

  if (userRole === "admin") {
    next();
    return;
  }

  // @ts-ignore
  const userIdFromToken = req.user?.id;
  const userIdFromParams = req.params.id;

  if (!userIdFromToken) {
    res.status(401).json({ success: false, message: "Unauthorized." });
    return;
  }

  if (userIdFromToken !== userIdFromParams) {
    res.status(403).json({ success: false, message: "You can only access your own resource." });
    return;
  }

  next();
};
