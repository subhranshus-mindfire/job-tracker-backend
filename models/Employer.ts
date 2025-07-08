import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IEmployer extends Document {
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const employerSchema = new Schema<IEmployer>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

export const Employer = mongoose.model<IEmployer>('Employer', employerSchema);
