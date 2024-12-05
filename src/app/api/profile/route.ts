import { PrismaClient } from "@prisma/client";
import { sendResponse } from "@/utils/sendResponse";
import { ApiError } from "@/utils/apiError";
import { catchAsync } from "@/utils/handleApi";
import { authGuard } from "@/utils/authGuard";

const prisma = new PrismaClient();

export const PATCH = authGuard(
  catchAsync(async (request: Request) => {
    const user = request.user;
    const { name, bio } = await request.json();

    if (!user?.id || !user?.email) {
      return ApiError(401, "Unauthorized: No token provided.");
    }

    const isProfileExist = await prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!isProfileExist) {
      return ApiError(404, "Unauthorized: Profile not found.");
    }

    const updatedProfile = await prisma.profile.update({
      where: {
        userId: user.id,
      },
      data: {
        name: name || isProfileExist.name,
        bio: bio || isProfileExist.bio,
      },
    });

    if (!updatedProfile) {
      return ApiError(400, "Failed to update profile!");
    }

    return sendResponse({
      status: 200,
      success: true,
      message: "Successfully updated profile.",
      data: updatedProfile,
    });
  }),
);

export const GET = authGuard(
  catchAsync(async (request: Request) => {
    const user = request.user;

    if (!user?.id || !user?.email) {
      return ApiError(401, "Unauthorized: No token provided.");
    }

    const profile = await prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!profile) {
      return ApiError(404, "Profile not found!");
    }

    return sendResponse({
      status: 200,
      success: true,
      message: "Successfully fetched profile.",
      data: profile,
    });
  }),
);
