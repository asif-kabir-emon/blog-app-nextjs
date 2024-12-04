import { PrismaClient } from "@prisma/client";
import { ApiError } from "@/utils/apiError";
import { jwtVerify } from "jose";

const prisma = new PrismaClient();

export const authGuard = (handler: Function) => {
  return async (request: Request, context: any) => {
    try {
      // Extract the token from the Authorization header
      const authorization = request.headers.get("authorization");
      if (!authorization || !authorization.startsWith("Bearer ")) {
        return ApiError(401, "Unauthorized: No token provided.");
      }

      const token = authorization.split(" ")[1];
      const jwtSecret = String(process.env.JWT_SECRET);

      // Verify the token
      const decoded = await jwtVerify(
        token,
        new TextEncoder().encode(jwtSecret),
      );

      if (!decoded) {
        return ApiError(401, "Unauthorized: Invalid or expired token.");
      }

      const payload = decoded.payload as jwtPayload;

      // Check if the user exists in the database
      const user = await prisma.user.findUnique({
        where: { id: payload.id, email: payload.email },
      });

      if (!user) {
        return ApiError(404, "Unauthorized: User not found in the database.");
      }

      // Attach the user to the request object for further use
      (request as any).user = {
        id: user.id,
        email: user.email,
      };

      // Proceed to the original handler
      return handler(request, context);
    } catch (error) {
      return ApiError(401, "Unauthorized: Invalid or expired token.");
    }
  };
};
