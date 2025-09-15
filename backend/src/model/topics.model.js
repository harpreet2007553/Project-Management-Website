import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
    {
        title : {
            type : String,
            required : true,
        },
        description : {
            type : String,
        },
        project : {
            type : Schema.Types.ObjectId,
            ref : "Project",
        },
        // tasks : [
        //     {
        //         type : Schema.Types.ObjectId,
        //         ref : "Task",
        //     }
        // ]
    },
    { timestamps : true }
)

export const Topics = mongoose.model("Topics", topicSchema);
