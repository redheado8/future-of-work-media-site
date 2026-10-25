import { getPollData, recordPollVote } from "@/lib/articles";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const pollKey = req.nextUrl.searchParams.get("pollKey") || "workplace-transformation";
  const data = await getPollData(pollKey);
  return NextResponse.json({ ok: true, data });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pollKey = "workplace-transformation", optionKey } = body;

    if (!optionKey) {
      return NextResponse.json({ ok: false, message: "گزینه انتخاب نشده است." }, { status: 400 });
    }

    await recordPollVote(pollKey, optionKey);
    const updated = await getPollData(pollKey);
    return NextResponse.json({ ok: true, data: updated });
  } catch {
    return NextResponse.json({ ok: false, message: "خطا در ثبت رأی" }, { status: 500 });
  }
}
