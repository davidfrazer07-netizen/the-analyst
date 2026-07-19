"use client";

import WireframeGlobe from "./Globe";

export default function HUDBackground({ showGlobe = true }: { showGlobe?: boolean }) {
  return (
    // fixed + full-viewport sized: since this never scrolls with page content,
    // the globe must cover the whole viewport (not just the top), otherwise
    // content further down the page has nothing behind it to show through.
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div
        className="absolute left-1/2 top-1/2 h-[100vh] w-[100vh] min-h-[700px] min-w-[700px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)",
        }}
      />
      {showGlobe && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <WireframeGlobe size={900} opacity={0.95} speed={0.05} />
        </div>
      )}
    </div>
  );
}
