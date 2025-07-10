import { Applicant } from "../models/Applicant";
import { Request, Response } from "express";

export const getApplicants = async (req: Request, res: Response): Promise<void> => {
  try {
    const applicants = await Applicant.find()
    console.log(applicants)
    res.status(200).json({ status: true, data: applicants })
  } catch (error: any) {
    res.status(400).json({ status: false, error: error.message })
  }
}

export const createApplicant = async (req: Request, res: Response): Promise<void> => {
  try {
    const existing = await Applicant.findOne({ user: req?.body?.user });
    if (existing) {
      res.status(400).json({ success: false, message: 'Applicant already exists for this user' });
    }
    const applicant = await Applicant.create(req.body)
    res.status(201).json({ status: true, data: applicant })
  } catch (error: any) {
    res.status(400).json({ status: false, error: error.message })
  }
}

export const getApplicant = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id
    const applicant = await Applicant.find({ _id: id });
    res.status(200).json({ status: true, data: applicant })
  } catch (error: any) {
    res.status(400).json({ status: false, error: error.message })
  }
}

export const updateApplicant = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id
    const updatedApplicant = await Applicant.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json({ status: true, data: updatedApplicant })
  } catch (error: any) {
    res.status(400).json({ status: false, error: error.message })
  }
}

export const deleteApplicant = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id
    const deletedApplicant = await Applicant.findByIdAndDelete(id)
    res.status(203).json({ status: true })
  } catch (error: any) {
    res.status(400).json({ status: false, error: error.message })
  }
}