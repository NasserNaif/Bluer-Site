import { z } from "zod";

export const logInSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: "username or email is required !",
      invalid_type_error: "username or email must be only chaactars & number ",
    }),
    password: z.string({
      required_error: "password is required !",
      invalid_type_error: "password must be only chaactars & number ",
    }),
  }),
});
export type logInType = z.infer<typeof logInSchema>["body"];

export const registerSchema = z.object({
  body: z.object({
    username: z
      .string({ required_error: "username is required !" })
      .min(4, "username must be more than 3 chars !")
      .max(20, "username must be less/equal than 20"),
    password: z
      .string({ required_error: "password is required !" })
      .min(6, "password must be equal/more than 6"),
    email: z.string({ required_error: "email is required !" }).email(),
    profileAvatar: z.any(),
  }),
});
export type registerType = z.infer<typeof registerSchema>["body"];
