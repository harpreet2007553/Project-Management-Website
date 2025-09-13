import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  Topics: [
    {
      type: Schema.Types.ObjectId,
      ref: "Topics",
    },
  ],
});

export const project = mongoose.model("Projects", projectSchema);
