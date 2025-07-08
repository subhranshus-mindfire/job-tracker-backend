import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IApplication extends Document {
  job: Types.ObjectId;
  applicant: Types.ObjectId;
  status: string;
  applied_at: Date;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    job: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true
    },
    applicant: {
      type: Schema.Types.ObjectId,
      ref: 'Applicant',
      required: true
    },
    status: {
      type: String,
      enum: ['applied', 'reviewing', 'accepted', 'rejected'],
      default: 'applied'
    },
    applied_at: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export const Application = mongoose.model<IApplication>('Application', applicationSchema);
