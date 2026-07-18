"use client";

import { useEffect, useState } from "react";
import WireframeGlobe from "./Globe";

export default function IntroSplash({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1800);
    const doneTimer = setTimeout(onDone, 2400);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg transition-opacity duration-600 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <WireframeGlobe size={220} opacity={0.9} speed={0.12} />
      <div className="wordmark mt-6 text-2xl">THE ANALYST</div>
    </div>
  );
}
