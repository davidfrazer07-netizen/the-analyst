import {
  CurrencyFundamental,
  EducationTopic,
  Journal,
  LeaderboardEntry,
  P2POffer,
  StrategyQuestion,
} from "./types";

// Placeholder content — swap for the live Google Doc sync once the doc is shared.
export const analystDocStatus = {
  connected: false,
  sourceLabel: "Google Doc sync (not yet connected)",
  lastSynced: null as string | null,
};

export const fundamentals: CurrencyFundamental[] = [
  {
    currency: "USD",
    bias: "bull",
    headline: "Fed holding higher-for-longer, dollar broadly supported",
    summary:
      "Rate-cut pricing has been pushed further out after two consecutive hot core-inflation prints. Real yields remain the dominant pull factor for USD longs across G10.",
    drivers: [
      {
        label: "Fed rate path",
        detail: "Market now prices first cut in Q1 next year vs. this quarter three months ago.",
        impact: "high",
        vsHistory: "Hawkish repricing is the sharpest in 8 months",
      },
      {
        label: "Labor market",
        detail: "NFP prints have beaten consensus 3 of the last 4 releases; wage growth sticky.",
        impact: "medium",
        vsHistory: "In line with the last 12-month trend",
      },
      {
        label: "Risk sentiment",
        detail: "Broad risk-off flows have added a safe-haven bid on top of the rate story.",
        impact: "low",
        vsHistory: "Weaker contribution than the March risk-off episode",
      },
    ],
    updatedAt: "placeholder",
  },
  {
    currency: "EUR",
    bias: "bear",
    headline: "ECB cutting into a weakening growth picture",
    summary:
      "Eurozone PMIs remain below 50 with Germany the weak link. ECB easing is running ahead of the Fed, widening the rate differential against EUR.",
    drivers: [
      {
        label: "ECB policy",
        detail: "Two cuts delivered this year already, more flagged if growth data stays soft.",
        impact: "high",
        vsHistory: "Easing pace faster than the 2019 cycle",
      },
      {
        label: "German industrial data",
        detail: "Manufacturing PMI has printed sub-45 for three straight months.",
        impact: "medium",
        vsHistory: "Weakest stretch since the 2022 energy shock",
      },
    ],
    updatedAt: "placeholder",
  },
  {
    currency: "GBP",
    bias: "neutral",
    headline: "BoE stuck between sticky services inflation and soft growth",
    summary:
      "Bank of England is split, services inflation keeps cuts slow while growth data argues for easing. Positioning is unusually flat.",
    drivers: [
      {
        label: "BoE MPC votes",
        detail: "Last vote split 5-4 in favor of holding; a genuine swing meeting.",
        impact: "high",
        vsHistory: "Closest vote split in over a year",
      },
      {
        label: "Services inflation",
        detail: "Still running near 5%, the BoE's key sticking point.",
        impact: "medium",
        vsHistory: "Elevated but decelerating slowly",
      },
    ],
    updatedAt: "placeholder",
  },
  {
    currency: "JPY",
    bias: "bull",
    headline: "BoJ normalization narrative building against a dovish world",
    summary:
      "With most G10 central banks cutting, the BoJ's slow hiking path is closing the yield gap that has driven JPY weakness for two years.",
    drivers: [
      {
        label: "BoJ policy normalization",
        detail: "Second hike this cycle now live; further guidance leans hawkish.",
        impact: "high",
        vsHistory: "First sustained hiking cycle since 2007",
      },
      {
        label: "Intervention risk",
        detail: "MoF verbal intervention has stepped up as USDJPY approached prior highs.",
        impact: "medium",
        vsHistory: "Similar rhetoric intensity to last year's intervention episode",
      },
    ],
    updatedAt: "placeholder",
  },
  {
    currency: "AUD",
    bias: "neutral",
    headline: "China demand and RBA hold keep AUD range-bound",
    summary:
      "RBA is on hold with an easing bias, while commodity demand from China remains the key swing factor for AUD's next directional move.",
    drivers: [
      {
        label: "China demand data",
        detail: "Iron ore demand signals have been mixed, no clear trend either way.",
        impact: "medium",
        vsHistory: "Choppier than the smoother trend seen last year",
      },
      {
        label: "RBA rate hold",
        detail: "RBA has held for four straight meetings, guidance stayed balanced.",
        impact: "low",
        vsHistory: "Longest hold streak in the current cycle",
      },
    ],
    updatedAt: "placeholder",
  },
];

export const strategyQuestions: StrategyQuestion[] = [
  { id: "q1", question: "Did you wait for your full confluence checklist before entering?", category: "process" },
  { id: "q2", question: "Was your position size calculated from a fixed risk %, or picked on feel?", category: "risk" },
  { id: "q3", question: "Did you move your stop-loss after entry?", category: "risk" },
  { id: "q4", question: "Did you close the trade early out of fear, before it hit SL or TP?", category: "psychology" },
  { id: "q5", question: "Are you trading a session/instrument outside your defined strategy rules?", category: "process" },
  { id: "q6", question: "How many trades have you taken today outside your plan?", category: "psychology" },
];

export const educationTopics: EducationTopic[] = [
  { id: "e1", title: "What is support and resistance?", description: "How to mark levels that actually matter and avoid over-drawing your chart." },
  { id: "e2", title: "Reading a delivery profile", description: "How Tara's session profile schematic maps price behavior to a repeatable pattern." },
  { id: "e3", title: "Position sizing from risk %", description: "Turning your stop-loss distance into a lot size that respects your account risk limit." },
  { id: "e4", title: "Why moving your stop-loss kills your edge", description: "The math behind why discretionary SL moves erode expectancy over a large sample." },
];

export const journal: Journal = {
  account: "MT5 - 51234908",
  insights: {
    followedWinRate: 68,
    notFollowedWinRate: 31,
    closedEarly: 4,
    leftMoneyOnTable: 6,
    dodgedBullets: 2,
    noStop: 1,
    winRate: 57,
    wins: 24,
    losses: 18,
    highestWin: 842.5,
    biggestLoss: -410.2,
    winStreak: 5,
    loseStreak: 3,
  },
  trades: [
    {
      ticket: 100234,
      symbol: "XAUUSD",
      side: "buy",
      volume: 0.5,
      entryTime: "2026-07-17T08:12:00Z",
      entryPrice: 2412.4,
      exitTime: "2026-07-17T10:44:00Z",
      exitPrice: 2426.8,
      sl: 2405.0,
      tp: 2430.0,
      profit: 720.0,
      realisedR: 1.94,
      plannedR: 2.0,
      closedEarly: false,
      strategyMatch: true,
      confluences: ["London sweep", "OB retest", "HTF bias align"],
      won: true,
    },
    {
      ticket: 100241,
      symbol: "XAUUSD",
      side: "sell",
      volume: 0.75,
      entryTime: "2026-07-17T13:05:00Z",
      entryPrice: 2429.1,
      exitTime: "2026-07-17T13:40:00Z",
      exitPrice: 2433.6,
      sl: 2435.0,
      tp: 2418.0,
      profit: -337.5,
      realisedR: -0.76,
      plannedR: -1.0,
      closedEarly: false,
      strategyMatch: true,
      confluences: ["NY AM reversal"],
      won: false,
    },
    {
      ticket: 100256,
      symbol: "XAUUSD",
      side: "buy",
      volume: 1.0,
      entryTime: "2026-07-16T09:30:00Z",
      entryPrice: 2398.0,
      exitTime: "2026-07-16T09:52:00Z",
      exitPrice: 2401.2,
      sl: null,
      tp: 2412.0,
      profit: 320.0,
      realisedR: null,
      plannedR: null,
      closedEarly: true,
      strategyMatch: false,
      confluences: [],
      won: true,
    },
  ],
};

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, handle: "@goldrunner", winRate: 71, trustScore: 98, verified: true },
  { rank: 2, handle: "@fxdisciple", winRate: 66, trustScore: 95, verified: true },
  { rank: 3, handle: "@londonopen", winRate: 64, trustScore: 91, verified: true },
  { rank: 4, handle: "@crt_dave", winRate: 61, trustScore: 88, verified: false },
  { rank: 5, handle: "@nyamscalp", winRate: 58, trustScore: 84, verified: true },
];

export const p2pOffers: P2POffer[] = [
  { id: "p1", handle: "@goldrunner", side: "sell", amountUSDT: 500, pricePerUSDT: 1.001, trustScore: 98, completedTrades: 214 },
  { id: "p2", handle: "@fxdisciple", side: "buy", amountUSDT: 1200, pricePerUSDT: 0.998, trustScore: 95, completedTrades: 156 },
  { id: "p3", handle: "@londonopen", side: "sell", amountUSDT: 300, pricePerUSDT: 1.002, trustScore: 91, completedTrades: 88 },
];
