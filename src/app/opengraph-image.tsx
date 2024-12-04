import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "ありがとう、技術ブログ";
const description = "私の課題を解決してくれたブログに感謝を";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          {alt}
        </div>
        <div
          style={{
            fontSize: 32,
            marginBottom: 40,
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          {description}
        </div>
        <div
          style={{
            width: 120,
            height: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://thanks-tech-blog.vercel.app/android-chrome-192x192.png"
            alt="ロゴ"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
