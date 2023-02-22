import { Request, Response } from "express";
import { logInType, registerType } from "../zodSchema/logInSchema";
import { prisma } from "../config/DB";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export const logIn = async (req: Request, res: Response) => {
  try {
    const { password, username } = req.body as logInType;
    const user = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: username,
          },
          {
            email: username,
          },
        ],
      },
    });

    if (user.length < 1) {
      return res.status(300).json({
        message: "sorry username or password is not correct !",
      });
    }

    const isPasswordCorrect = await argon2.verify(user[0].password, password);

    if (!isPasswordCorrect) {
      return res.status(300).json({
        message: "sorry username or password is not correct !",
      });
    }

    const token = jwt.sign(
      { id: user[0].id, usename: user[0].username, role: user[0].role },
      process.env.JWT_KEY as string
    );

    return res.status(201).json({
      message: `welcome back ${user[0].profileName}`,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "sorry, server error !",
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const newUser = req.body as registerType;
    console.log(newUser);
    console.log(req.body.file);
    const isUserExsist = await prisma.user.findMany({
      where: {
        OR: [{ username: newUser.username }, { email: newUser.email }],
      },
    });
    if (isUserExsist.length >= 1) {
      return res.status(400).json({
        message: "sorry, but username or email is already exsist !",
      });
    }

    newUser.password = await argon2.hash(newUser.password);

    await prisma.user.create({
      data: {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        profileName: newUser.username,
        profileAvatar: newUser.profileAvatar,
        profileBio: "",
      },
    });

    return res.status(201).json({
      message: "user have been added seccefully ",
    });
  } catch (err) {
    return res.status(500).json({
      message: "sorry, server error !",
    });
  }
};
