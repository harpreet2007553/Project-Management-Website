import { project } from "../model/project.model.js";
import { Topics } from "../model/topics.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createTopic = asyncHandler(async (req, res) => {
  const { projectId, title, description } = req.body;

  if (!projectId && !title) {
    throw new ApiError(401, "project ID and title is required");
  }

  const topic = await Topics.create({
    title,
    description,
    project: projectId,
  });

  if (!topic) {
    throw new ApiError(401, "failed to create topic");
  }

  res.status(201).json({ ...topic });
});

export const getAllProjectTopics = asyncHandler(async (req, res) => {
  const { projectId } = req.query;

  if (!projectId) {
    throw new ApiError(401, "Project ID is required");
  }

  const topics = await project.aggregate([
    {
      $match: {
        _id: projectId,
      },
    },
    {
      $lookup: {
        from: "topics",
        localField: "_id",
        foreignField: "project",
        as: "topics",
      },
    },
    {
      $project: {
        topics: 1,
      },
    }
  ]);

  if (!topics[0].length) {
    throw new ApiError(404, "No topics found");
  }

  res
    .status(201)
    .json(new ApiResponse(201, topics[0], "Topics fetched successfully"));
});

export const deleteTopic = asyncHandler(async (req, res) => {
  const { topicId } = req.query;

  if (!topicId) {
    throw new ApiError(401, "Topic ID is required");
  }

  const deletedTopic = await Topics.findOneAndDelete({ _id: topicId });

  if (!deletedTopic) {
    throw new ApiError(401, "Topic not found");
  }

  res
    .status(201)
    .json(new ApiResponse(201, deletedTopic, "Topic deleted successfully"));
});
