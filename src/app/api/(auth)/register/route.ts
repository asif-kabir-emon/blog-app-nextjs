import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { sendResponse } from "@/utils/sendResponse";
import { ApiError } from "@/utils/apiError";
import { catchAsync } from "@/utils/handleApi";
import { createToken } from "@/utils/jwtToken";

const prisma = new PrismaClient();

export const POST = catchAsync(async (request: Request) => {
  const { email, password, name } = await request.json();

  if (!email || !password || !name) {
    return ApiError(400, "Invalid payload!");
  }

  if (password.length < 8) {
    return ApiError(400, "Password must be at least 8 characters long!");
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (isUserExist) {
    return ApiError(404, "Already have an account with this email!");
  }

  const hashed_password = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS),
  );

  const newUser = await prisma.$transaction(
    async (tsc: Prisma.TransactionClient) => {
      const createdUser = await tsc.user.create({
        data: {
          email,
          password: hashed_password,
        },
      });

      console.log(email, password, name);

      const createdProfile = await tsc.profile.create({
        data: {
          name,
          userId: createdUser.id,
        },
      });

      return createdUser;
    },
  );

  if (!newUser) {
    return ApiError(400, "Failed to create user!");
  }

  const payload = { id: newUser.id, email: newUser.email };
  const jwtSecret = String(process.env.JWT_SECRET) || "";
  const jwtExpiresIn = String(process.env.JWT_EXPIRES_IN) || "1h";
  const token = createToken(payload, jwtSecret, { expiresIn: jwtExpiresIn });

  if (!token) {
    return ApiError(500, "Internal Server Error!");
  }

  return sendResponse({
    status: 200,
    message: "Successfully Created an account.",
    success: true,
    data: {
      accessToken: token,
    },
  });
});
