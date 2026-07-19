"use client";

import WireframeGlobe from "./Globe";

// Mirrors Tara-iOS's HUDBackground (Theme.swift): near-black base, a top
// radial accent glow, a fixed 380px globe, and a bottom vignette fading
// back to the base color. The globe is fixed-size rather than scaled to
// the viewport — a much larger canvas (previously 900px) crops to a
// sparse, illegible arc of dots on a phone-width screen instead of
// reading as a legible rotating planet.
export default function HUDBackground({ showGlobe = true }: { showGlobe?: boolean }) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div
        className="absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "radial-gradient(circle at top, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)",
        }}
      />
      {showGlobe && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <WireframeGlobe size={380} opacity={0.8} speed={0.05} />
        </div>
      )}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background: "linear-gradient(to top, color-mix(in srgb, var(--bg) 85%, transparent), transparent)",
        }}
      />
    </div>
  );
}
