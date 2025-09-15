import mongoose, { Schema } from "mongoose";

const projectMember = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    member: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const member = mongoose.model("Member", projectMember);
