import mongoose, { Schema } from "mongoose";

const assignedTasksSchema = new Schema(
    {
        task : {
            type : Schema.Types.ObjectId,
            ref : "Task"
        },
        assignedTo : {
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    },
    { timestamps : true }
)

export const assignedTasks = mongoose.model("assignedTasks", assignedTasksSchema);