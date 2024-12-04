import { authKey } from "@/constants";
import { validateToken } from "./validateToken";
import Cookies from "js-cookie";

export const isUserLoggedIn = async (req?: any): Promise<boolean> => {
  try {
    const token = Cookies.get(authKey);

    if (!token) {
      return false;
    } else {
      return true;
    }

    const isValid = await validateToken(
      token || "",
      process.env.JWT_SECRET as string,
    );

    return isValid;
  } catch (err: any) {
    console.error("Token validation error:", err.message);
    return false;
  }
};
