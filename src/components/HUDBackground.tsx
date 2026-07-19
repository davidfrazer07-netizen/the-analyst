"use client";

import { useEffect, useState } from "react";
import WireframeGlobe from "./Globe";

// The app's content column is capped at max-w-md (448px) — that's the
// actual "phone frame" the user sees, even in a wider browser window,
// since <main> centers within that max width. Match the globe's diameter
// to it (and to the real viewport width below that) so it never spills
// past the left/right edges of the frame.
function useFrameWidth() {
  const [width, setWidth] = useState(380);
  useEffect(() => {
    const update = () => setWidth(Math.min(window.innerWidth, 448));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
}

// The globe is `position: fixed`, so as content scrolls, whatever card is
// currently in its on-screen band covers it — with cards centered on the
// same horizontal axis and close to the same width as a small globe, a
// small circle ends up almost fully covered nearly all the time, only
// showing in the thin gaps between cards. Sized to the frame width (not
// smaller) so its dot texture has real presence across those gaps.
//
// z-0, not a negative z-index: verified empirically (live DOM patch +
// screenshot) that with <body> as a flex container, a negative z-index
// here made this entire layer paint invisibly behind the page — even
// though the canvas was provably drawing correct pixel content the whole
// time. z-0 plus normal DOM order (this renders before the app content
// in page.tsx) achieves the same "behind everything" effect correctly.
export default function HUDBackground({ showGlobe = true }: { showGlobe?: boolean }) {
  const size = useFrameWidth();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-bg">
      <div
        className="absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "radial-gradient(circle at top, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)",
        }}
      />
      {showGlobe && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <WireframeGlobe size={size} opacity={0.85} speed={0.05} />
        </div>
      )}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background: "linear-gradient(to top, color-mix(in srgb, var(--bg) 60%, transparent), transparent)",
        }}
      />
    </div>
  );
}
