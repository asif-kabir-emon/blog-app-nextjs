import jwt from "jsonwebtoken";

export function createToken(
  payload: {
    id: string;
    email: string;
  },
  secret: string,
  options: any = {},
) {
  if (!secret) {
    throw new Error("A secret key is required to generate the token.");
  }

  return jwt.sign(payload, secret, options);
}
