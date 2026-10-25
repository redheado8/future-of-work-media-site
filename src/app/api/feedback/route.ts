import { recordArticleFeedback } from "@/lib/articles";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { articleSlug, isHelpful } = await req.json();
    if (!articleSlug || typeof isHelpful !== "boolean") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const result = await recordArticleFeedback(articleSlug, isHelpful);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
