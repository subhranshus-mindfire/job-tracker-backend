import { Request, Response } from 'express';
import { Job } from '../models/Job';
import { Employer } from '../models/Employer';
import { Application } from "../models/Application";


export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const employer = await Employer.find({ _id: req?.body?.employer })
    console.log(employer)
    if ((employer.length == 0)) {
      res.status(400).json({ success: false, message: "employer not found" });
      return
    }
    const job = await Job.create(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getJobs = async (_req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await Job.find()
      .populate({
        path: 'employer',
        populate: {
          path: 'user',
        },
      });

    res.status(200).json({ success: true, data: jobs });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id).populate('employer');
    if (!job) {
      res.status(404).json({ success: false, message: 'Job not found' });
      return
    }
    res.status(200).json({ success: true, data: job });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('employer');

    if (!job) {
      res.status(404).json({ success: false, message: 'Job not found' });
      return
    }

    res.status(200).json({ success: true, data: job });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Job.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Job not found' });
      return
    }

    res.status(203).json({ success: true, message: 'Job deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getEmployerJobs = async (req: Request, res: Response): Promise<void> => {
  try {

    const employerId = req.params.empID
    console.log(employerId)

    const jobs = await Job.find({ employer: employerId }).populate({
      path: "employer",
      populate: { path: "user" },
    });

    const jobsWithApplicants = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await Application.find({ job: job._id });
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

