import { Request, Response } from "express";
import { ApplicationRepository } from "../repositories/ApplicationRepository";

const applicationRepo = new ApplicationRepository();

export const createApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const { job, applicant, status } = req.body;

    if (!job || !applicant) {
      res.status(400).json({ success: false, message: "Job and applicant are required" });
      return;
    }

    const existing = await applicationRepo.findByJobAndApplicant(job, applicant);
    if (existing) {
      res.status(400).json({ success: false, message: "Already applied for this job" });
      return;
    }

    const application = await applicationRepo.create({
      job,
      applicant,
      status,
      applied_at: new Date(),
    });

    res.status(201).json({ success: true, data: application });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getApplications = async (_req: Request, res: Response): Promise<void> => {
  try {
    const applications = await applicationRepo.findAllWithPopulated();
    res.status(200).json({ success: true, data: applications });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const application = await applicationRepo.findByIdWithPopulated(req.params.id);

    if (!application) {
      res.status(404).json({ success: false, message: "Application not found" });
      return;
    }

    res.status(200).json({ success: true, data: application });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await applicationRepo.updateByIdWithPopulated(req.params.id, req.body);

    if (!updated) {
      res.status(404).json({ success: false, message: "Application not found" });
      return;
    }

    res.status(200).json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await applicationRepo.deleteById(req.params.id);

    if (!deleted) {
      res.status(404).json({ success: false, message: "Application not found" });
      return;
    }

    res.status(203).json({ success: true, message: "Application deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getApplicationsByApplicant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { applicantId } = req.params;
    const applications = await applicationRepo.findByApplicantId(applicantId);

    res.status(200).json({ success: true, data: applications });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;

    const updated = applicationRepo.findByIdUpdate(applicationId,status)

    if (!updated) {
       res.status(404).json({ success: false, message: 'Application not found' });
       return
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
