import mongoose from "mongoose";
import { member } from "../model/member.model.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { project } from "../model/project.model.js";

export const addMemberToProject = asyncHandler(async (req, res) => {
  const { projectId, username } = req.query;

  if (!projectId && !username) {
    throw new ApiError(400, "ProjectId and username both are required");
  }

  const foundedProject = await project.findById(projectId);

  if (!foundedProject) {
    throw new ApiError(401, "Project not found");
  }

  const user = await User.findOne({ username });
  if (!user) {
    throw new ApiError(401, "User not found");
  }

  const existedUser = await member.findOne({
    project: projectId,
    member: user._id,
  });
  if (existedUser) {
    throw new ApiError(401, "Member already exists");
  }

  const createdMember = await member.create({
    project: projectId,
    member: user._id,
  });

  if (!createdMember) {
    throw new ApiError(401, "failed to add member");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Member added successfully", createdMember));
});

export const removeMemberFromProject = asyncHandler(async (req, res) => {
  const { projectId, username } = req.query;

  if (!projectId && !username) {
    throw new ApiError(400, "ProjectId and username both are required");
  }

  const foundedProject = await project.findById(projectId);

  if (!foundedProject) {
    throw new ApiError(401, "Project not found");
  }

  const user = await User.findOne({ username });
  if (!user) {
    throw new ApiError(401, "User not found");
  }

  const deletedMember = await member.findOneAndDelete({
    project: projectId,
    member: user._id,
  });

  if (!deletedMember) {
    throw new ApiError(401, "there is no such member");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Member removed successfully", deletedMember));
});

export const getMembersOfProject = asyncHandler(async (req, res) => {
  const { projectId } = req.query;

  if (!projectId) {
    throw new ApiError(400, "ProjectId is required");
  }

  const members = await project.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(projectId),
      },
    },
    {
      $lookup: {
        from: "members",
        localField: "_id",
        foreignField: "project",
        as: "members",
      },
    },
    {
      $project: {
        project: 1,
        members: 1,
      },
    },
  ]);

  console.log(members);
  if (!members[0]) {
    throw new ApiError(404, "No members found");
  }

  res.status(201).json({
    ...members[0],
  });
});
