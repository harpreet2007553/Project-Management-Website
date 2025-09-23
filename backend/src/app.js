import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";
import projectRoute from "./routes/project.routes.js";
import memberRoute from "./routes/members.routes.js";
import topicRoute from "./routes/topics.routes.js";
import taskRoute from "./routes/task.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/projects", projectRoute);
app.use("/api/v1/members", memberRoute);
app.use("/api/v1/topics", topicRoute);
app.use("/api/v1/tasks", taskRoute)

export { app };
