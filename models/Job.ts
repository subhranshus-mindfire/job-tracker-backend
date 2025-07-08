import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IJob extends Document {
  employer: Types.ObjectId;
  job_role: string;
  description: string;
  job_type: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    employer: {
      type: Schema.Types.ObjectId,
      ref: 'Employer',
      required: true
    },
    job_role: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    job_type: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);

export const Job = mongoose.model<IJob>('Job', jobSchema);
