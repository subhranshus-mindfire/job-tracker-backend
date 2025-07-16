
import { BaseRepository } from "./BaseRepository";
import User from "../models/User";

export class UserRepository extends BaseRepository<any> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string) {
    return this.model.findOne({ email });
  }
}
