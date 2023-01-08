import { Request, Response } from "express";
import { prisma } from "../config/DB";
import {
  createPostType,
  deletePostType,
  getSpecificPostType,
  getUserPostType,
} from "../zodSchema/postSchema";
import { IUser } from "../middlewares/auth";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const allPosts = await prisma.post.findMany({
      include: {
        userID: {
          select: {
            profileAvatar: true,
            profileBio: true,
            profileName: true,
          },
        },
      },
    });

    return res.status(200).json(allPosts);
  } catch (err) {
    return res.status(500).json({
      message: "sorry, server error !!!",
    });
  }
};

export const getSpecificPost = async (req: Request, res: Response) => {
  try {
    const { postID } = req.params as getSpecificPostType;
    const specificPost = await prisma.post.findUnique({
      where: { id: postID },
      include: {
        userID: true,
        replays: true,
      },
    });

    if (!specificPost) {
      return res.status(400).json({
        message: "sorry, there's no post like this",
      });
    }

    return res.status(200).json(specificPost);
  } catch (err) {
    return res.status(500).json({
      message: "sorry, server error !!!",
    });
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params as getUserPostType;
    const userPosts = await prisma.user.findUnique({
      where: { id: userID },
      select: {
        posts: true,
      },
    });

    return res.status(200).json(userPosts);
  } catch (err) {
    return res.status(500).json({
      message: "sorry, server error !!!",
    });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const newPost = req.body as createPostType;
    const user = res.locals.user as IUser;

    await prisma.post.create({
      data: {
        userPost: user.id,
        title: newPost.title,
        content: newPost.content !== undefined ? newPost.content : "",
        image: newPost.image !== undefined ? newPost.image : "",
      },
    });

    return res.status(201).json({
      message: "post has been added !",
    });
  } catch (err) {
    return res.status(500).json({
      message: "sorry, server error !",
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { postID } = req.params as deletePostType;
    const { id } = res.locals.user as IUser;
    await prisma.post.deleteMany({
      where: {
        id: postID,
        userPost: id,
      },
    });

    return res.status(200).json({
      message: "post has been deleted !",
    });
  } catch (err) {
    return res.status(500).json({
      message: "sorry, server error !",
    });
  }
};
