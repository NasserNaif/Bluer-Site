import { z } from "zod";

export const postReplaySchema = z.object({
  body: z.object({
    content: z.string({ required_error: "content is required !" }),
  }),
});

export type replayType = z.infer<typeof postReplaySchema>["body"];

export const deletReplaySchema = z.object({
  params: z.object({
    replayID: z.string(),
  }),
});

export type deleteReplayType = z.infer<typeof deletReplaySchema>["params"];
