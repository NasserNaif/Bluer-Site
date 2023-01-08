import express from "express";
import cors from "cors";
import { connectDB } from "./config/DB";
import logInRoute from "./routes/logInRoute";
import profileRoute from "./routes/profileRoute";
import postRoute from "./routes/postRoute";
import replayRoute from "./routes/replayRoute";

const app = express();

app.use(express.json());
app.use(cors());

// connect DB
connectDB();

// routes
app.use(`/api/v1/login`, logInRoute);
app.use(`/api/v1/profile`, profileRoute);
app.use(`/api/v1/posts`, postRoute);
app.use(`/api/v1/replay`, replayRoute);

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server running in " + PORT);
});
