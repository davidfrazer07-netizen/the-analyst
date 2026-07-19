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

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [tab, setTab] = useState("fundamentals");
  const [isPremium, setIsPremium] = useState(false);
  const unlock = () => setIsPremium(true);

  const { status, news, lastError, refresh } = useTaraFeed();

  return (
    <AuthGate>
      <div className="relative flex min-h-screen flex-col">
        {showIntro && <IntroSplash onDone={() => setShowIntro(false)} />}
        <HUDBackground />
        <Header status={status} lastError={lastError} refresh={refresh} />
        <main className="mx-auto w-full max-w-md flex-1 px-4 pt-2">
          {tab === "fundamentals" && <FundamentalsTab news={news} />}
          {tab === "technicals" && <TechnicalsTab isPremium={isPremium} onUnlock={unlock} />}
          {tab === "journal" && <JournalTab />}
          {tab === "coach" && <CoachTab />}
          {tab === "profile" && <ProfileTab isPremium={isPremium} onUnlock={unlock} />}
        </main>
        <TabBar active={tab} onChange={setTab} />
      </div>
    </AuthGate>
  );
}
