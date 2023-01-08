import express from "express";
import validate from "../middlewares/validate";
import { logInSchema, registerSchema } from "../zodSchema/logInSchema";
import { logIn, register } from "../controllers/logInController";

const logInRoute = express.Router();

logInRoute.post(`/`, validate(logInSchema), logIn);
logInRoute.post("/register", validate(registerSchema), register);

export default logInRoute;
