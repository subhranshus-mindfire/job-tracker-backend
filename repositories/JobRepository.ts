import { BaseRepository } from "./BaseRepository";
import { Job } from "../models/Job";
import { Employer } from "../models/Employer";
import { Application } from "../models/Application";

export class JobRepository extends BaseRepository<any> {
  constructor() {
    super(Job);
  }

  async checkEmployerExists(employerId: string) {
    return Employer.exists({ _id: employerId });
  }

  async findAllWithEmployer() {
    return this.model.find().populate({
      path: 'employer',
      populate: {
        path: 'user',
      },
    });
  }

  async findByIdWithEmployer(id: string) {
    return this.model.findById(id).populate({
      path: 'employer',
      populate: {
        path: 'user',
      },
    });
  }

  async updateByIdWithEmployer(id: string, update: any) {
    return this.model.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true
    }).populate({
      path: 'employer',
      populate: {
        path: 'user',
      },
    });
  }

  async findByEmployerId(employerId: string) {
    return this.model.find({ employer: employerId }).populate({
      path: 'employer',
      populate: {
        path: 'user',
      },
    });
  }

  async getApplicantsForJob(jobId: string) {
    return Application.find({ job: jobId });
  }
}
