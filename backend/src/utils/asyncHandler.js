export const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.log("Error from asyncHandler util", error.message);
    res.status(error.statusCode || 500).json({
      status : error.statusCode,
      message: error.message || "Something went wrong",
      errors: error.errors || [],
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
