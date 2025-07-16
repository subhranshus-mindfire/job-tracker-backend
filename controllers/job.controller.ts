import { Request, Response } from 'express';
import { JobRepository } from '../repositories/JobRepository';
import { ApplicationRepository } from '../repositories/ApplicationRepository';

const jobRepo = new JobRepository();
const applicationRepo = new ApplicationRepository()

export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const employerExists = await jobRepo.checkEmployerExists(req.body.employer);
    if (!employerExists) {
      res.status(400).json({ success: false, message: "Employer not found" });
      return;
    }

    const job = await jobRepo.create(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getJobs = async (_req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await jobRepo.findAllWithEmployer();
    res.status(200).json({ success: true, data: jobs });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await jobRepo.findByIdWithEmployer(req.params.id);
    if (!job) {
      res.status(404).json({ success: false, message: 'Job not found' });
      return;
    }
    res.status(200).json({ success: true, data: job });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await jobRepo.updateByIdWithEmployer(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, message: 'Job not found' });
      return;
    }
    res.status(200).json({ success: true, data: updated });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await jobRepo.deleteById(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Job not found' });
      return;
    }
    res.status(203).json({ success: true, message: 'Job deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getEmployerJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const employerId = req.params.empID;

    const jobs = await jobRepo.findByEmployerId(employerId);

    const jobsWithApplicants = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await jobRepo.getApplicantsForJob(job._id);
        return {
          ...job.toObject(),
          applicants,
        };
      })
    );

    res.status(200).json({ success: true, data: jobsWithApplicants });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getJobApplicants = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobId = req.params.id;

    const applications = await applicationRepo.findByJobIdWithApplicant(jobId);

    if (!applications || applications.length === 0) {
      res.status(404).json({ success: false, message: "No applicants found for this job." });
      return;
    }

    res.status(200).json({ success: true, data: applications });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};