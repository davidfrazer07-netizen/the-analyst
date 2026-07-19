"use client";

import { useState } from "react";
import HUDBackground from "@/components/HUDBackground";
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import IntroSplash from "@/components/IntroSplash";
import AuthGate from "@/components/AuthGate";
import FundamentalsTab from "@/components/tabs/FundamentalsTab";
import TechnicalsTab from "@/components/tabs/TechnicalsTab";
import JournalTab from "@/components/tabs/JournalTab";
import CoachTab from "@/components/tabs/CoachTab";
import ProfileTab from "@/components/tabs/ProfileTab";
import { useTaraFeed } from "@/lib/taraFeed";
import { usePremium } from "@/lib/premium";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [tab, setTab] = useState("fundamentals");

  const { status, news, fundamentals, lastError, refresh } = useTaraFeed();
  const { isPremium } = usePremium();

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Rendered outside AuthGate so the globe/HUD is visible behind the
          sign-in screen too, not just the authenticated app — AuthGate
          replaces its children entirely with the login UI until a session
          exists, so anything meant to show pre-auth can't live inside it. */}
      <HUDBackground />
      <AuthGate>
        {showIntro && <IntroSplash onDone={() => setShowIntro(false)} />}
        <Header status={status} lastError={lastError} refresh={refresh} />
        <main className="mx-auto w-full max-w-md flex-1 px-4 pt-2">
          {tab === "fundamentals" && <FundamentalsTab news={news} liveFundamentals={fundamentals} />}
          {tab === "technicals" && <TechnicalsTab isPremium={isPremium} />}
          {tab === "journal" && <JournalTab />}
          {tab === "coach" && <CoachTab />}
          {tab === "profile" && <ProfileTab isPremium={isPremium} />}
        </main>
        <TabBar active={tab} onChange={setTab} />
      </AuthGate>
    </div>
  );
}
