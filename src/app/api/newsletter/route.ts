import { registerNewsletter } from "@/lib/articles";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    const result = await registerNewsletter(email);
    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch {
    return NextResponse.json(
      { success: false, message: "درخواست نامعتبر است." },
      { status: 400 }
    );
  }
}
