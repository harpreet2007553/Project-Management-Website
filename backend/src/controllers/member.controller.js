import { member } from "../model/member.model.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { project } from "../model/project.model.js";

export const addMemberToProject = asyncHandler(async (req, res) => {
  const { projectId, username } = req.params;

  if (!projectId && !username) {
    throw new ApiError(400, "ProjectId and username both are required");
  }

  const project = await project.findById(projectId);

  if (!project) {
    throw new ApiError(401, "Project not found");
  }

  const createdMember = await member.create({
    project: projectId,
    member: username,
  });

  if (!createdMember) {
    throw new ApiError(401, "failed to add member");
  }

  res
    .status(200)
    .json(new ApiResponse(200, createdMember, "Member added successfully"));
});

export const removeMemberFromProject = asyncHandler(async (req, res) => {
  const { projectId, username } = req.params;

  if (!projectId && !username) {
    throw new ApiError(400, "ProjectId and username both are required");
  }

  const project = await project.findById(projectId);

  if (!project) {
    throw new ApiError(401, "Project not found");
  }

  const member = await member.findOneAndDelete({
    project: projectId,
    member: username,
  });

  res
    .status(200)
    .json(new ApiResponse(200, member, "Member removed successfully"));
});

export const getMembersOfProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    throw new ApiError(400, "ProjectId is required");
  }

  const members = await project.aggregate([
    {
      $match: {
        _id: projectId,
      },
    },
    {
      $lookup: {
        from: "member",
        localField: "_id",
        foreignField: "project",
        as: "members",
      },
    },
    {
      $project: {
        members: 1,
      },
    },
  ]);
  if (!members[0].length) {
    throw new ApiError(404, "No members found");
  }

  res.status(201).json({
    ...members[0],
  });
});

