import { NextRequest } from "next/server";

export const runtime = "nodejs";

const ALLOWED_HOSTS = new Set(["images.pexels.com"]);

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");
  if (!rawUrl) {
    return new Response("Missing image URL", { status: 400 });
  }

  let imageUrl: URL;
  try {
    imageUrl = new URL(rawUrl);
  } catch {
    return new Response("Invalid image URL", { status: 400 });
  }

  if (imageUrl.protocol !== "https:" || !ALLOWED_HOSTS.has(imageUrl.hostname)) {
    return new Response("Image host not allowed", { status: 403 });
  }

  try {
    const upstream = await fetch(imageUrl.toString(), {
      headers: { "User-Agent": "WorkTomorrowImageProxy/1.0" },
      signal: AbortSignal.timeout(8000),
      cache: "force-cache",
    });

    if (!upstream.ok) {
      return new Response("Image unavailable", {
        status: upstream.status === 404 ? 404 : 502,
        headers: { "Cache-Control": "public, max-age=60" },
      });
    }

    const contentType = upstream.headers.get("content-type") ?? "image/jpeg";
    if (!contentType.startsWith("image/")) {
      return new Response("Invalid image response", { status: 502 });
    }

    return new Response(upstream.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Image temporarily unavailable", {
      status: 502,
      headers: { "Cache-Control": "public, max-age=60" },
    });
  }
}
