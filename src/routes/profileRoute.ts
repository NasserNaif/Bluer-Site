import express from "express";
import { myProfile, updateProfile } from "../controllers/profileController";
import validate from "../middlewares/validate";
import { profileSchema } from "../zodSchema/profileSchema";
import { protect } from "../middlewares/auth";

const profileRoute = express.Router();

profileRoute.get(`/`, protect, myProfile);
profileRoute.put(`/`, protect, validate(profileSchema), updateProfile);

export default profileRoute;
