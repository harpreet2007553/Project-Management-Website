import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { project } from "../model/project.model.js";
import { User } from "../model/user.model.js";
import { member } from "../model/member.model.js";

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

  if(!newProject){
    throw new ApiError(500, "Something went wrong while creating project")
  }

  // console.log(newProject);

  return res.status(201).json(
    new ApiResponse(201, newProject, "Project created successfully")
  );
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
    .json(new ApiResponse(true, "Projects fetched successfully", project[0]));
});

export const userInTeamProjects = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username) {
    throw new ApiError(400, "Username is required to get projects");
  }

  const user = await User.findOne({ username });

  const teamProjects = await User.aggregate([
    {
      $match: {
        _id : user._id
      },
    },
    {
      $lookup: {
        from: "members",
        localField: "_id",
        foreignField: "member",
        as: "projects",
      },
    },
    {
      $project: {
        username: 1,
        projects : 1,
      },
    },
  ]);

  if (!teamProjects[0]) {
    throw new ApiError(404, "No members in your project");
  }

  console.log(teamProjects);

  res
    .status(200)
    .json(new ApiResponse(true, "Projects fetched successfully",  teamProjects[0]));
});

export const getProjectDetails = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  if (!projectId) {
    throw new ApiError(400, "Project ID is required to get project details");
  }

  const projectDetails = await project.findById(projectId);

  res.json(
    new ApiResponse(
      true,
      "Project details fetched successfully",
      projectDetails
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
    .json(new ApiResponse(201,  "Project deleted successfully", deletedProject));
});

