import express from "express";
import { updateProfile } from "../controllers/profileController";
import validate from "../middlewares/validate";
import { profileSchema } from "../zodSchema/profileSchema";
import { protect } from "../middlewares/auth";

const profileRoute = express.Router();

profileRoute.put(`/`, protect, validate(profileSchema), updateProfile);

export default profileRoute;
