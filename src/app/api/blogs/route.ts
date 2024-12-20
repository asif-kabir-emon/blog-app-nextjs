import { Prisma, PrismaClient } from "@prisma/client";
import { sendResponse } from "@/utils/sendResponse";
import { ApiError } from "@/utils/apiError";
import { catchAsync } from "@/utils/handleApi";
import { authGuard } from "@/utils/authGuard";
import { uploadToCloudinary } from "@/helpers/FileUploader/FileUploader";

const prisma = new PrismaClient();

export const POST = authGuard(
  catchAsync(async (request: Request) => {
    const formData = await request.formData();
    const user = request.user;

    const file = formData.get("file") as File;
    const data = formData.get("data");
    if (!data) {
      return ApiError(400, "Invalid payload!");
    }
    const { title, content } = JSON.parse(data as string);

    if (!title || !content) {
      return ApiError(400, "Invalid payload!");
    }

    if (!user?.id || !user?.email) {
      return ApiError(401, "Unauthorized: No token provided.");
    }

    const createBlog = await prisma.$transaction(
      async (tsc: Prisma.TransactionClient) => {
        const createdBlog = await tsc.blog.create({
          data: {
            title,
            imageUrl: "",
            content,
            isPublished: true,
            userId: user?.id,
          },
        });

        let image = "";
        if (file) {
          const fileBuffer = await file.arrayBuffer();

          const mimeType = file.type;
          const encoding = "base64";
          const base64Data = Buffer.from(fileBuffer).toString("base64");
          const fileUri =
            "data:" + mimeType + ";" + encoding + "," + base64Data;

          const uploadCloudinary = (await uploadToCloudinary(
            fileUri,
            `blog_${user.id}_${createdBlog.id}`,
            "blog-app/blogs",
          )) as {
            success: true;
            result: { secure_url: string; public_id: string };
          };
          image = uploadCloudinary.result.secure_url;
        }

        const blogWithImageURL = await tsc.blog.update({
          where: {
            id: createdBlog.id,
          },
          data: {
            imageUrl: image,
          },
        });

        return blogWithImageURL;
      },
    );

    if (!createBlog) {
      return ApiError(400, "Failed to create blog!");
    }

    return sendResponse({
      status: 200,
      success: true,
      message: "Successfully created a blog.",
      data: createBlog,
    });
  }),
);

export const GET = catchAsync(async (request: Request) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams();
  url.searchParams.forEach((value, key) => {
    searchParams.set(key.toLowerCase(), value);
  });

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");

  // Ensure valid pagination parameters
  const currentPage = Math.max(page, 1);
  const pageSize = Math.max(limit, 1);

  // Calculate skip and take for Prisma
  const skip = (currentPage - 1) * pageSize;

  // Fetch total count of blogs for meta data
  const totalBlogs = await prisma.blog.count();

  // Calculate total pages
  const totalPages = Math.ceil(totalBlogs / pageSize);

  const blogs = await prisma.blog.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    skip,
    take: pageSize,
    select: {
      id: true,
      title: true,
      imageUrl: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          email: true,
          profile: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return sendResponse({
    status: 200,
    success: true,
    message: "Successfully created a blog.",
    meta: {
      total: totalBlogs,
      page: currentPage,
      limit: pageSize,
      totalPages: totalPages,
    },
    data: blogs,
  });
});
