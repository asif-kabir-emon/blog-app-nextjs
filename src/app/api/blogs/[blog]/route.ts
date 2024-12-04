import { PrismaClient } from "@prisma/client";
import { sendResponse } from "@/utils/sendResponse";
import { ApiError } from "@/utils/apiError";
import { catchAsync } from "@/utils/handleApi";
import { authGuard } from "@/utils/authGuard";
import {
  deleteImageFromCloudinary,
  uploadToCloudinary,
} from "@/helpers/FileUploader/FileUploader";

const prisma = new PrismaClient();

export const PATCH = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const formData = await request.formData();
    const blogId = context.params.blog;
    const user = request.user;

    const file = (formData.get("file") as File) || null;
    const data = formData.get("data");
    if (!data) {
      return ApiError(400, "Invalid payload!");
    }
    const { title, content } = JSON.parse(data as string);

    if (!user?.id || !user?.email) {
      return ApiError(401, "Unauthorized: No token provided.");
    }

    const isBlogExist = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    });

    if (!isBlogExist) {
      return ApiError(404, "Unauthorized: Blog not found.");
    }

    if (isBlogExist.userId !== user.id) {
      return ApiError(404, "Unauthorized: You can not change the blog info.");
    }

    // Upload image to cloudinary and get the image URL if file is present
    let image: string | null = null;
    if (file) {
      const fileBuffer = await file.arrayBuffer();

      const mimeType = file.type;
      const encoding = "base64";
      const base64Data = Buffer.from(fileBuffer).toString("base64");
      const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

      const uploadCloudinary = (await uploadToCloudinary(
        fileUri,
        `blog_${user.id}_${isBlogExist.id}`,
        "blog-app/blogs",
      )) as {
        success: true;
        result: { secure_url: string; public_id: string };
      };
      image = uploadCloudinary.result.secure_url;
    }

    const updatedBlog = await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        title: title || isBlogExist.title,
        content: content || isBlogExist.content,
        imageUrl: image || isBlogExist.imageUrl,
      },
    });

    if (!updatedBlog) {
      return ApiError(400, "Failed to update blog!");
    }

    if (
      image !== null &&
      image !== "" &&
      isBlogExist.imageUrl &&
      image !== isBlogExist.imageUrl
    ) {
      const publicId = isBlogExist.imageUrl
        .split("/")
        .slice(-3)
        .join("/")
        .split(".")
        .slice(0, -1)
        .join(".");

      await deleteImageFromCloudinary(publicId);
    }

    return sendResponse({
      status: 200,
      success: true,
      message: "Successfully updated blog.",
      data: updatedBlog,
    });
  }),
);

export const DELETE = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const blogId = context.params.blog;
    const user = request.user;

    if (!user?.id || !user?.email) {
      return ApiError(401, "Unauthorized: No token provided.");
    }

    const isBlogExist = await prisma.blog.findUnique({
      where: {
        id: blogId,
        userId: user.id,
      },
    });

    if (!isBlogExist) {
      return ApiError(404, "Unauthorized: Blog not found.");
    }

    const deletedBlog = await prisma.blog.delete({
      where: {
        id: blogId,
      },
    });

    if (!deletedBlog) {
      return ApiError(400, "Failed to delete blog!");
    }

    if (deletedBlog.imageUrl && deletedBlog.imageUrl !== "") {
      const publicId = isBlogExist.imageUrl
        .split("/")
        .slice(-3)
        .join("/")
        .split(".")
        .slice(0, -1)
        .join(".");

      await deleteImageFromCloudinary(publicId);
    }

    return sendResponse({
      status: 200,
      success: true,
      message: "Successfully deleted blog.",
      data: deletedBlog,
    });
  }),
);
