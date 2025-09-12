import { ApiError } from "../utils/apiError.js";
import { User } from "../model/user.model.js";

export const verifyJWT = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken || !refreshToken) {
    throw new ApiError(401, "accessToken and refreshToken both are required");
  }

  const decodedAccessToken = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_KEY
  );

  if (!decodedAccessToken) {
    const decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY
    );
    if (!decodedRefreshToken) {
      throw new ApiError(401, "please login again...");
    }
    const user = await User.findById(decodedRefreshToken.id);
    req.user = user._id;
    next();
  }
};
