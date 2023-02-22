import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getMyPosts,
  getSpecificPost,
  getUserPosts,
} from "../controllers/postController";
import { protect } from "../middlewares/auth";
import validate from "../middlewares/validate";
import { createPostSchema, deletePostSchema } from "../zodSchema/postSchema";

const postRoute = express.Router();

// get all posts
postRoute.get(`/`, getAllPosts);

// get my posts
postRoute.get(`/myposts`, protect, getMyPosts);

// get spicific post
postRoute.get(`/:postid`, getSpecificPost);

// get all user's posts
postRoute.get(`/user/posts/:userID`, getUserPosts);

// create post
postRoute.post(`/`, protect, validate(createPostSchema), createPost);

// delete post
postRoute.delete(`/:postID`, protect, validate(deletePostSchema), deletePost);

export default postRoute;
