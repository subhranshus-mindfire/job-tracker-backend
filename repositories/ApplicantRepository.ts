
import { BaseRepository } from "./BaseRepository";
import { Applicant } from "../models/Applicant";
import { Application } from "../models/Application";

export class ApplicantRepository extends BaseRepository<any> {
  constructor() {
    super(Applicant);
  }

  async findByUser(userId: string) {
    return this.model.findOne({ user: userId });
  }

  async hasApplied(jobId: string, applicantId: string) {
    return Application.exists({ job: jobId, applicant: applicantId });
  }
}
