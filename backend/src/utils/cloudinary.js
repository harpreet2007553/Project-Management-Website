import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./apiError.js";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
cloudinary.config({
  cloud_name: 'depgyj8gq',
  api_key: '956686256659127',
  api_secret: 'ZostcOr9PAJqbakfBrs5MSkzjf0',
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return "Please enter a local file path";
    const response = await cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type: "auto",
      },
      (res, err) => console.log(err)
    );

    console.log("file uploaded successfully", response.url);

    fs.unlinkSync(localFilePath);
    
    return response.url;
  } catch (error) {
    console.log("Something went wrong", error);
    fs.unlinkSync(localFilePath);
    console.log("testing...");
    throw new ApiError(
      501,
      "Error while uploading avatar to cloudinary",
      error
    );
  }
};
