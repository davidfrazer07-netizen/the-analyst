"use client";

import { GhostButton } from "./ui";
import CryptoPaymentInfo from "./CryptoPaymentInfo";

// Real payment isn't wired up — unlocking is manual: the user messages Dave
// on WhatsApp, pays, and Dave confirms by granting the row in
// `user_premium` directly (the client has no way to grant itself premium,
// see src/lib/premium.ts). Until a number is configured, show a plain
// "coming soon" state instead of a broken/fake unlock button.
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export default function PremiumUnlockCTA() {
  if (!WHATSAPP_NUMBER) {
    return <p className="mt-4 text-xs text-muted">Premium sign-up is coming soon — check back shortly.</p>;
  }

  const message = encodeURIComponent("Hi, I'd like to unlock The Analyst Premium ($8/mo).");
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <div className="mt-4">
      <GhostButton accent onClick={() => window.open(href, "_blank", "noopener,noreferrer")}>
        Get Premium via WhatsApp
      </GhostButton>
      <p className="mt-2 text-[11px] text-muted">
        Message Dave to pay — he&apos;ll confirm and unlock it on your account.
      </p>
      <CryptoPaymentInfo />
    </div>
  );
}
