import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "فردای کار؛ آیندهٔ کار، منابع انسانی و هوش مصنوعی";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 76px",
          color: "#F8FAFC",
          background:
            "radial-gradient(circle at 18% 15%, rgba(20,184,166,0.28), transparent 34%), radial-gradient(circle at 86% 82%, rgba(34,211,238,0.20), transparent 30%), linear-gradient(135deg, #071426 0%, #0B132B 55%, #10283B 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-90px",
            top: "-150px",
            width: "560px",
            height: "560px",
            border: "1px solid rgba(94,234,212,0.22)",
            borderRadius: "50%",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "20px",
            top: "-60px",
            width: "380px",
            height: "380px",
            border: "1px solid rgba(103,232,249,0.18)",
            borderRadius: "50%",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "54px",
              height: "54px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #2DD4BF, #67E8F9)",
              color: "#071426",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 900,
            }}
          >
            F
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "22px", letterSpacing: "5px", fontWeight: 800 }}>
              FARDAYE KAR
            </div>
            <div style={{ marginTop: "7px", fontSize: "16px", color: "#99F6E4" }}>
              THE FUTURE OF WORK
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: "880px" }}>
          <div
            style={{
              fontSize: "64px",
              lineHeight: 1.2,
              fontWeight: 800,
              letterSpacing: "-1px",
              display: "flex",
            }}
          >
            Work is changing.
          </div>
          <div
            style={{
              marginTop: "12px",
              fontSize: "64px",
              lineHeight: 1.2,
              fontWeight: 800,
              color: "#5EEAD4",
              display: "flex",
            }}
          >
            Understand what comes next.
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "25px",
              lineHeight: 1.5,
              color: "#CBD5E1",
              display: "flex",
            }}
          >
            Ideas and insights on AI, people, and the changing world of work.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ width: "120px", height: "5px", borderRadius: "4px", background: "#2DD4BF" }} />
          <div style={{ fontSize: "18px", color: "#94A3B8" }}>future-of-work-media-site.vercel.app</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
