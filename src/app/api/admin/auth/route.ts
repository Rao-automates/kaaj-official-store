import { NextResponse } from "next/server";
import { signAdminToken } from "@/lib/admin-auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.ADMIN_PASSWORD || "kaajadmin123";

    if (password !== correctPassword) {
      return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
    }

    const token = await signAdminToken();
    const cookieStore = await cookies();
    cookieStore.set("kaaj_admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Auth failed" }, { status: 500 });
  }
}
