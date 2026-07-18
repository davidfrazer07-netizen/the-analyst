"use client";

import { useState } from "react";
import HUDBackground from "@/components/HUDBackground";
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import IntroSplash from "@/components/IntroSplash";
import FundamentalsTab from "@/components/tabs/FundamentalsTab";
import TechnicalsTab from "@/components/tabs/TechnicalsTab";
import JournalTab from "@/components/tabs/JournalTab";
import CoachTab from "@/components/tabs/CoachTab";
import ProfileTab, { PaywallCard } from "@/components/tabs/ProfileTab";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [tab, setTab] = useState("fundamentals");
  const [isPremium, setIsPremium] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col">
      {showIntro && <IntroSplash onDone={() => setShowIntro(false)} />}
      <HUDBackground showGlobe={tab !== "profile"} />
      <Header />
      <main className="mx-auto w-full max-w-md flex-1 px-4 pt-2">
        {tab === "fundamentals" && <FundamentalsTab />}
        {tab === "technicals" && <TechnicalsTab />}
        {tab === "journal" && <JournalTab />}
        {tab === "coach" && <CoachTab />}
        {tab === "profile" && (isPremium ? <ProfileTab /> : <PaywallCard onUnlock={() => setIsPremium(true)} />)}
      </main>
      <TabBar active={tab} onChange={setTab} />
    </div>
  );
}
