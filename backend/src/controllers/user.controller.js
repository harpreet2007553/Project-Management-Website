import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessRefreshToken = async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new ApiError(404, "User not found");
      }

      const accessToken = await user.generateAccessToken();
      const refreshToken = await user.generateRefreshToken();
      
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
      
      return { accessToken, refreshToken };
    } catch (error) {
      throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const requestNewAccessRefreshToken = asyncHandler(
  async (req, res) => {

    const {userId} = req.body;
    const {accessToken , refreshToken} = generateAccessRefreshToken(userId);

    const options = {
      httpOnly : true,
      secure : true
    }

    res
    .status(201)
    .json({
        success: true,
        message : "New access token and refresh token are successfully generated"
    })
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
  }
)

export const registerUser = asyncHandler(
  async (req, res) => {
    const { username, fullname, password, email } = req.body;

    if (
      username.trim() === "" ||
      fullname.trim() === "" ||
      password.trim() === "" ||
      email.trim() === ""
    ) {
      throw new Error(
        "All fields among username, fullname, password and email are required"
      );
    }

    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      throw new ApiError(
        400,
        "User with this username or email already exists"
      );
    }
    
    const avatarPath =
      req.files?.avatar &&
      Array.isArray(reqTyped.files.avatar) &&
      req.files.avatar.length > 0
        ? req.files.avatar[0].path
        : undefined;

    console.log("Avatar path:", avatarPath);

    const avatarUrl = await uploadOnCloudinary(avatarPath);

    console.log("avatar url:", avatarUrl);

    const user = await User.create({
      username,
      fullname,
      password,
      email,
      avatar: avatarUrl,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(500, "User creation failed, please try again.");
    }

    const { accessToken , refreshToken} = generateAccessRefreshToken(user._id);

    const option = {
      httpOnly: true,
      secure: true,
    };

    res
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .status(201)
    .json({
      success: true,
      data: {
        id: createdUser._id,
        username: createdUser.username,
        fullname: createdUser.fullname,
        email: createdUser.email,
        avatar: createdUser.avatar,
      },
    });
  }
);

export const loginUser = asyncHandler(
  async (req, res)=>{
    const {username, email, password} = req.body;

    if((!username && !email) || !password){
        throw new ApiError(400, "Username or email and password are required to login")
    }

    const existedUser = await User.findOne({
        $or : [{username}, {email}]
    });

    if(!existedUser){
       throw new ApiError(401, "User not found")
    }

    const isPasswordValid = await existedUser.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials")
    }
    const {accessToken, refreshToken} = await generateAccessRefreshToken(existedUser._id);

    const options= {
        httpOnly : true,
        secure : true
    }
    res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .status(200)
    .json({
        success : true,
        data : {
            id : existedUser._id,
            username : existedUser.username,
            fullname : existedUser.fullname,
            email : existedUser.email,
            avatar : existedUser.avatar,
        }
     })
  }
)

const logoutUser = asyncHandler(
  async (req, res)=>{
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set : {
          refreshToken : undefined
        }
      },
      {
        new : true
      }
    )

    const options = {
      httpOnly : true,
      secure : true
    }

    res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      success : true,
      message : "User logged out successfully"
    })
  }
)

const getUser = asyncHandler(
  async (req, res)=>{
    const user = await User.findById(req.user._id).select("-password -refreshToken");

    res
    .status(200)
    .json({
      success : true,
      data : user
    })
  }
)
