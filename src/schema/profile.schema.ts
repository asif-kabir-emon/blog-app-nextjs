import { z } from "zod";

export const ProfileSchema = z.object({
  name: z
    .string({
      message: "Name is required.",
    })
    .min(5, {
      message: "Name must be at least 5 characters long.",
    }),
  bio: z
    .string({
      message: "Bio is required.",
    })
    .min(5, {
      message: "Bio must be at least 5 characters long.",
    }),
});
