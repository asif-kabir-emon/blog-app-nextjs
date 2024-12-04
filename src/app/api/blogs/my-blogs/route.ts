import { PrismaClient } from "@prisma/client";
import { sendResponse } from "@/utils/sendResponse";
import { catchAsync } from "@/utils/handleApi";
import { authGuard } from "@/utils/authGuard";
import { ApiError } from "@/utils/apiError";

const prisma = new PrismaClient();

export const GET = authGuard(
  catchAsync(async (request: Request) => {
    const user = request.user;

    if (!user?.id || !user?.email) {
      return ApiError(401, "Unauthorized: No token provided.");
    }

    const blogs = await prisma.blog.findMany({
      where: {
        userId: user.id,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });

    return sendResponse({
      status: 200,
      message: "Successfully created a blog.",
      success: true,
      meta: {
        total: blogs.length,
      },
      data: blogs,
    });
  }),
);
