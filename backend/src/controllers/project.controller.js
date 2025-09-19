import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { project } from "../model/project.model.js";
import { User } from "../model/user.model.js";

export const createProject = asyncHandler(async (req, res) => {
  const { title, description, owner } = req.body;

  if (!title && !owner) {
    throw new ApiError(400, "Title and owner are required to create a project");
  }
  const newProject = await project.create({
    title,
    description,
    owner,
  });

  console.log(newProject);

  return res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: newProject,
  });
});

export const getUserProjects = asyncHandler(async (req, res) => {
  const { username } = req.body;
  if (!username) {
    throw new ApiError(400, "Username is required to get projects");
  }

  const project = await User.aggregate([
    {
      $match: {
        username,
      },
    },
    {
      $lookup: {
        from: "projects",
        localField: "_id",
        foreignField: "owner",
        as: "projects",
      },
    },
    {
      $project: {
        username: 1,
        email: 1,
        projects: 1,
      },
    },
  ]);

  if (!project?.length) {
    throw new ApiError(404, "No projects found");
  }

  console.log(project);

  res
    .status(200)
    .json(new ApiResponse(true, project[0], "Projects fetched successfully"));
});

export const userInTeamProjects = asyncHandler(async (req, res) => {
  const { projectId } = req.body;
  if (!projectId) {
    throw new ApiError(400, "Project ID is required to get projects");
  }

  const members = await project.aggregate([
    {
      $match: {
        projectId,
      },
    },
    {
      $lookup: {
        from: "member",
        localField: "_id",
        foreignField: "member",
        as: "members",
      },
    },
    {
      $project: {
        members: 1,
      },
    },
  ]);

  if (!members?.length) {
    throw new ApiError(404, "No members in your project");
  }

  console.log(members);

  res
    .status(200)
    .json(new ApiResponse(true, members[0], "Projects fetched successfully"));
});

export const getProjectDetails = asyncHandler(async (req, res) => {
  const { projectId } = req.body;
  if (!projectId) {
    throw new ApiError(400, "Project ID is required to get project details");
  }

  const projectDetails = await project.findById(projectId);

  res.json(
    new ApiResponse(
      true,
      projectDetails,
      "Project details fetched successfully"
    )
  );
});

export const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    throw new ApiError(401, "Project ID is required");
  }

  const deletedProject = await project.findByIdAndDelete(projectId);

  if (!deletedProject) {
    throw new ApiError(401, "Project not found");
  }

  res
    .status(201)
    .json(new ApiResponse(201, deletedProject, "Project deleted successfully"));
});

