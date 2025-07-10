import { Request, Response } from 'express';
import { Application } from '../models/Application';

export const createApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const { job, applicant, status } = req.body;

    if (!job || !applicant) {
      res.status(400).json({ success: false, message: 'job and applicant are required' });
      return
    }

    const existing = await Application.findOne({ job, applicant });
    if (existing) {
      res.status(400).json({ success: false, message: 'Already applied for this job' });
      return
    }

    const application = await Application.create({
      job,
      applicant,
      status,
      applied_at: new Date()
    });

    res.status(201).json({ success: true, data: application });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getApplications = async (req: Request, res: Response): Promise<void> => {
  try {
    const applications = await Application.find().populate('job').populate('applicant');
    res.status(200).json({ success: true, data: applications });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const application = await Application.findById(req.params.id).populate('job').populate('applicant');

    if (!application) {
      res.status(404).json({ success: false, message: 'Application not found' });
      return
    }

    res.status(200).json({ success: true, data: application });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const applicationId = req.params.id;

    const updated = await Application.findByIdAndUpdate(applicationId, req.body, { new: true, runValidators: true }).populate('job').populate('applicant');

    if (!updated) {
      res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const deleteApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Application.findByIdAndDelete(req.params.id);

    if (!deleted) {
      res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.status(200).json({ success: true, message: 'Application deleted successfully', data: deleted });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

