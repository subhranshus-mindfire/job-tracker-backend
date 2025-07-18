import { BaseRepository } from "./BaseRepository";
import { Application } from "../models/Application";

export class ApplicationRepository extends BaseRepository<any> {
  constructor() {
    super(Application);
  }

  async findByJobAndApplicant(job: string, applicant: string) {
    return this.model.findOne({ job, applicant });
  }

  async findAllWithPopulated() {
    return this.model.find().populate('job').populate('applicant');
  }

  async findByIdWithPopulated(id: string) {
    return this.model.findById(id).populate('job').populate('applicant');
  }

  async updateByIdWithPopulated(id: string, update: any) {
    return this.model.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true
    }).populate('job').populate('applicant');
  }

  async findByApplicantId(applicantId: string) {
    return this.model.find({ applicant: applicantId }).populate({
      path: 'job',
      populate: {
        path: 'employer',
        populate: {
          path: 'user'
        }
      }
    });
  }

  async findByJobIdWithApplicant(jobId: string) {
    return Application.find({ job: jobId }).populate({
      path: "applicant",
      populate: { path: "user" },
    });
  }

  async findByIdUpdate(applicationId: string, status: string) {
    return await Application.findByIdAndUpdate(applicationId, { status }, { new: true });
  }
}
