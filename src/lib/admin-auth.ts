import { jwtVerify, SignJWT } from "jose";

const getSecret = () => {
  const secret = process.env.ADMIN_JWT_SECRET || "kaaj_fallback_secret_for_jwt_auth_123456";
  return new TextEncoder().encode(secret);
};

export async function signAdminToken() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
  return token;
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.role === "admin";
  } catch (err) {
    return false;
  }
}
