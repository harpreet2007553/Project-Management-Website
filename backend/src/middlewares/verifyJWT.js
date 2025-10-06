import { ApiError } from "../utils/apiError.js";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  let {accessToken, refreshToken} = req.cookies;

  if(!accessToken){
    accessToken = req.header("Authorization")?.trim().replace("Bearer ", "");
  }
  if(!refreshToken){
    refreshToken = req.header("x-refresh-token")?.trim();
  }

  console.log(accessToken)

  if (!accessToken || !refreshToken) {
    throw new ApiError(401, "accessToken and refreshToken both are required");
  }

  const decodedAccessToken = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET
  );

  if (!decodedAccessToken) {
    const decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!decodedRefreshToken) {
      throw new ApiError(401, "Both tokens are expired");
    }
    const user = await User.findById(decodedRefreshToken.id);
    req.user = user._id;
    next();
  }

  const user = await User.findById(decodedAccessToken.id);
  req.user = user._id;
  next();

};
