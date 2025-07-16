
import { Model, Document, FilterQuery, UpdateQuery } from "mongoose";

export class BaseRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>) {
    return this.model.create(data);
  }

  async findAll() {
    return this.model.find();
  }

  async findById(id: string) {
    return this.model.findById(id);
  }

  async findOne(filter: FilterQuery<T>) {
    return this.model.findOne(filter);
  }

  async updateById(id: string, update: UpdateQuery<T>) {
    return this.model.findByIdAndUpdate(id, update, { new: true, runValidators: true });
  }

  async deleteById(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
