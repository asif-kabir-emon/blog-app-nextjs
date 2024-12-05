import { z } from "zod";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const BlogSchema = z.object({
  title: z
    .string({
      message: "Title is required.",
    })
    .min(5, {
      message: "Title must be at least 5 characters.",
    }),
  content: z
    .string({
      message: "Content is required.",
    })
    .min(10, {
      message: "Content must be at least 10 characters.",
    }),
  tags: z.array(z.string()).optional(),
  image: z
    .any()
    .refine(
      (file: any) => {
        if (!file) return true;
        return (
          file.size <= MAX_FILE_SIZE && ACCEPTED_IMAGE_TYPES.includes(file.type)
        );
      },
      {
        message:
          "Only .jpg, .jpeg, .png, and .webp formats are supported, and File must not exceed 5MB.",
      },
    )
    .optional(),
});
