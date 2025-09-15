import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // members: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Member",
  //   },
  // ],
  // Topics: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Topics",
  //   },
  // ],
},
{ timestamps: true });

export const project = mongoose.model("Projects", projectSchema);
