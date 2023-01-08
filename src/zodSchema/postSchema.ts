import { z } from "zod";

export const getSpecificPostSchema = z.object({
  params: z.object({
    postID: z.string(),
  }),
});
export type getSpecificPostType = z.infer<
  typeof getSpecificPostSchema
>["params"];

export const getUserPostSchema = z.object({
  params: z.object({
    userID: z.string(),
  }),
});
export type getUserPostType = z.infer<typeof getUserPostSchema>["params"];

export const createPostSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: "title is required !" })
      .max(25, "title must ber equal/less than 25 letters !"),
    content: z.optional(z.string()),
    image: z.optional(z.string()),
  }),
});

export type createPostType = z.infer<typeof createPostSchema>["body"];

export const deletePostSchema = z.object({
  params: z.object({
    postID: z.string(),
  }),
});
export type deletePostType = z.infer<typeof deletePostSchema>["params"];
