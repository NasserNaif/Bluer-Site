import { Request, Response } from "express";
import { IUser } from "../middlewares/auth";
import { profileType } from "../zodSchema/profileSchema";
import { prisma } from "../config/DB";

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user as IUser;
    const updateProfile = req.body as profileType;

    const prevName = await prisma.user.findUnique({
      where: { id: user.id },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        profileName:
          updateProfile.profileName !== null ||
          updateProfile.profileName !== undefined
            ? updateProfile.profileName
            : prevName?.profileName,
        profileAvatar: updateProfile.profileAvatar,
        profileBio: updateProfile.profileBio,
      },
    });

    return res.status(201).json({
      message: "profile has been updated seccesfully ",
    });
  } catch (err) {
    return res.status(500).json({
      message: "sorry, server error !!!",
      err,
    });
  }
};
