import { z } from "zod";

export const profileSchema = z.object({
  body: z.object({
    profileName: z.optional(
      z
        .string({ invalid_type_error: "Name must be string" })
        .max(20, "name must be equal/less than 20 letters ")
    ),

    profileBio: z.optional(
      z.string({ invalid_type_error: "Name must be string" })
    ),
    profileAvatar: z.optional(z.any()),
  }),
});

export type profileType = z.infer<typeof profileSchema>["body"];
