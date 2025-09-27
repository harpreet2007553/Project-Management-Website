import { task } from "../model/task.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Topics } from "../model/topics.model.js";

const createTask = asyncHandler(
    async (req, res) => {
        const { text, topicId, taskDueDate, completed } = req.body;
        if(!taskName || !taskDescription || !taskDueDate || !projectId){
            throw new ApiError(401, "One or more than one of the fields is missing")
        }

        const newTask = await task.create(
            {
                text : text,
                topic : topicId,
                completed,
                dueDate : taskDueDate,
            }
        )
        if(!newTask){
            throw new ApiError(401, "failed to create task")
        }
        res.status(201).json(
            new ApiResponse(201, newTask, "Task created successfully")
        )
    }
)

const deleteTask = asyncHandler(
    async ( req, res)=> {
        const { taskId } = req.query;
        if(!taskId){
            throw new ApiError(401, "Task id is required")
        }
        const deletedTask = await task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            throw new ApiError(404, "failed to delete task"); 
        }

        res
        .status(201)
        .json(
            new ApiResponse(201, deletedTask, "Task deleted successfully")
        )
    }
)

const getAllTasks = asyncHandler(
    async (req, res) => {
        const { topicId } = req.query;
        if(!topicId){
            throw new ApiError(401, "Topic ID is required")
        }
        const tasks = await Topics.aggregate([
            {
                $match : {
                    "_id" : topicId
                }
            },
            {
                $lookup : {
                    from : "tasks",
                    localField : "_id",
                    foreignField : "topic",
                    as : "tasks"
                }
            },
            {
                $project : {
                    topicID : topicId,
                    tasks : 1
                }
            }
        ])
        if(!tasks[0].length){
            throw new ApiError(404, "No tasks found")
        }
        res.status(201).json(
            new ApiResponse(201, tasks[0], "Tasks fetched successfully")
        )
    }
)

export { createTask, deleteTask, getAllTasks };