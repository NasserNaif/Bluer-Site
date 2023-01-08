import { Request, Response } from "express";
import { prisma } from "../config/DB";
import { getSpecificPostType } from "../zodSchema/postSchema";
import { replayType } from "../zodSchema/replaySchema";
import { IUser } from "../middlewares/auth";
import { deleteReplayType } from "../zodSchema/replaySchema";

export const getAllReplays = async (req: Request, res: Response) => {
  try {
    const { postID } = req.params as getSpecificPostType;
    const allReplay = await prisma.replay.findMany({
      where: { post: postID },

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
    return res.status(200).json(allReplay);
  } catch (err) {
    return res.status(500).json({
      message: "sorry, server error !!!",
    });
  }
};

export const postReplay = async (req: Request, res: Response) => {
  try {
    const { content } = req.body as replayType;
    const { postID } = req.params as getSpecificPostType;
    const user = res.locals.user as IUser;

    await prisma.replay.create({
      data: {
        content: content,
        userReplay: user.id,
        post: postID,
      },
    });

    return res.status(201).json({
      message: "replay has been added !",
    });
  } catch (err) {
    return res.status(500).json({
      message: "sorry, server error !!!",
    });
  }
};

export const deleteReplay = async (req: Request, res: Response) => {
  try {
    const { replayID } = req.params as deleteReplayType;
    const user = res.locals.user as IUser;

    await prisma.replay.deleteMany({
      where: {
        id: replayID,
        userReplay: user.id,
      },
    });

    return res.status(200).json({
      message: "replay has been deleted !",
    });
  } catch (err) {
    return res.status(500).json({
      message: "sorry, server error !!!",
    });
  }
};
