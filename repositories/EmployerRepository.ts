import { BaseRepository } from "./BaseRepository";
import { Employer } from "../models/Employer";

export class EmployerRepository extends BaseRepository<any> {
  constructor() {
    super(Employer);
  }

  async findOneByUser(userId: string) {
    return this.model.findOne({ user: userId });
  }

  async findAllWithUser() {
    return this.model.find().populate('user');
  }

  async findByIdWithUser(id: string) {
    return this.model.findById(id).populate('user');
  }

  async updateByIdWithUser(id: string, update: any) {
    return this.model.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true
    }).populate('user');
  }
}
