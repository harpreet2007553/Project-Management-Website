import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  topic: {
    type: Schema.Types.ObjectId,
    ref: "Topics",
  },
//   assignedTo: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "assignedTasks",
//     },
//   ],
  completed: {
    type: Boolean,
    default: false,
  },
} , {timestamps : true});

export const task = mongoose.model("Task", taskSchema)