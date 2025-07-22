
import { Request, Response } from "express";
import { ApplicantRepository } from "../repositories/ApplicantRepository";

const applicantRepo = new ApplicantRepository();

export const getApplicants = async (_req: Request, res: Response) => {
  const applicants = await applicantRepo.findAll();
  res.status(200).json({ success: true, data: applicants });
};

export const createApplicant = async (req: Request, res: Response) => {
  const existing = await applicantRepo.findByUser(req.body.user);
  if (existing) {
     res.status(400).json({ success: false, message: "Applicant already exists" });
     return
  }
  const applicant = await applicantRepo.create(req.body);
  res.status(201).json({ success: true, data: applicant });
};

export const getApplicant = async (req: Request, res: Response) => {
  const applicant = await applicantRepo.findById(req.params.id);
  res.status(200).json({ success: true, data: applicant });
};

export const updateApplicant = async (req: Request, res: Response) => {
  const updated = await applicantRepo.updateById(req.params.id, req.body);
  res.status(200).json({ success: true, data: updated });
};

export const deleteApplicant = async (req: Request, res: Response) => {
  await applicantRepo.deleteById(req.params.id);
  res.status(203).json({ success: true });
};

export const hasApplied = async (req: Request, res: Response) => {
  const exists = await applicantRepo.hasApplied(req.params.jobId, req.params.applicantId);
  res.status(200).json({ success: true, data: Boolean(exists) });
};
