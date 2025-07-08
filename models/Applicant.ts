import mongoose, { Schema, Document, Types } from "mongoose";

export interface IApplicant extends Document {
  user: Types.ObjectId;
  skills: string[];
}

const applicantSchema = new Schema<IApplicant>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    skills: {
      type: [String],
      required: false
    }
  },
  {
    timestamps: true
  }
);

export const Applicant = mongoose.model<IApplicant>("Applicant", applicantSchema);
