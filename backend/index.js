import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import Database from "./config/Database.js";
import userRoute from "./routes/userRoute.js";
import taskRoute from "./routes/taskRoute.js";
import auth from "./middlewares/auth.js";

const app = express();

const PORT = process.env.PORT || 6500;

Database.dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/1/auth", userRoute);
app.use("/api/1/tasks", taskRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
