import express from "express";
import { protect } from "../middlewares/auth";
import {
  deleteReplay,
  getAllReplays,
  postReplay,
} from "../controllers/replayController";
import validate from "../middlewares/validate";
import { deletReplaySchema, postReplaySchema } from "../zodSchema/replaySchema";

const replayRoute = express.Router();

// get all post's replays
replayRoute.get(`/:postID`, getAllReplays);

// post replay
replayRoute.post(`/:postID`, protect, validate(postReplaySchema), postReplay);

// delete replays
replayRoute.delete(
  `/:replayID`,
  protect,
  validate(deletReplaySchema),
  deleteReplay
);

export default replayRoute;
