import { UserRepository } from "../repositories/UserRepository";
import { ApplicantRepository } from "../repositories/ApplicantRepository";
import { EmployerRepository } from "../repositories/EmployerRepository";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m"; 
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "1d";  

export class AuthService {
  private userRepo = new UserRepository();
  private applicantRepo = new ApplicantRepository();
  private employerRepo = new EmployerRepository();

  generateTokens(userId: string) {
    const accessToken = jwt.sign(
      { id: userId },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }  as jwt.SignOptions
    );

    const refreshToken = jwt.sign(
      { id: userId },
      JWT_REFRESH_SECRET,
      { expiresIn: JWT_REFRESH_EXPIRES_IN }  as jwt.SignOptions
    );

    return { accessToken, refreshToken };
  }

  async register(data: {
    name: string;
    email: string;
    password: string;
    role: string;
    phone?: string;
  }) {
    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userRepo.create({
      ...data,
      password: hashedPassword,
    });

    const tokens = this.generateTokens(user._id.toString());
    return { user, ...tokens };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    let role_id: string | null = null;

    if (user.role === "applicant") {
      const applicant = await this.applicantRepo.findByUser(user._id);
      if (applicant) role_id = applicant._id as string;
    }

    if (user.role === "employer") {
      const employer = await this.employerRepo.findOneByUser(user._id);
      if (employer) role_id = employer._id as string;
    }

    const tokens = this.generateTokens(user._id.toString());
    return { user, ...tokens, role_id };
  }
}
