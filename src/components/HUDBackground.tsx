"use client";

import WireframeGlobe from "./Globe";

export default function HUDBackground({ showGlobe = true }: { showGlobe?: boolean }) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div
        className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)",
        }}
      />
      {showGlobe && (
        <div className="absolute left-1/2 top-[-40px] -translate-x-1/2">
          <WireframeGlobe size={620} opacity={0.95} speed={0.05} />
        </div>
      )}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "linear-gradient(to top, color-mix(in srgb, var(--bg) 85%, transparent), transparent)",
        }}
      />
    </div>
  );
}
