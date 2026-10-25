import { getAllArticles } from "@/lib/articles";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined;

    const list = await getAllArticles({ category, search, limit });
    return NextResponse.json({ ok: true, articles: list });
  } catch (err) {
    console.error("API articles error:", err);
    return NextResponse.json({ ok: false, error: "Failed to fetch articles" }, { status: 500 });
  }
}
