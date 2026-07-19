export type Bias = "bull" | "bear" | "neutral";

// --- Journal (ported from Tara's Models.swift: Journal / JMatrix / JInsights / JTrade)

export interface JInsights {
  followedWinRate: number;
  notFollowedWinRate: number;
  closedEarly: number;
  leftMoneyOnTable: number;
  dodgedBullets: number;
  noStop: number;
  winRate: number;
  wins: number;
  losses: number;
  highestWin: number;
  biggestLoss: number;
  winStreak: number;
  loseStreak: number;
}

export interface JTrade {
  ticket: number;
  symbol: string;
  side: "buy" | "sell";
  volume: number;
  entryTime: string;
  entryPrice: number;
  exitTime: string;
  exitPrice: number;
  sl: number | null;
  tp: number | null;
  profit: number;
  realisedR: number | null;
  plannedR: number | null;
  closedEarly: boolean;
  strategyMatch: boolean;
  confluences: string[];
  won: boolean;
}

export interface Journal {
  account: string;
  insights: JInsights;
  trades: JTrade[];
}

// --- Fundamentals ("The Analyst" tab)

export interface FundamentalDriver {
  label: string;
  detail: string;
  impact: "high" | "medium" | "low";
  vsHistory: string; // e.g. "Stronger pull than the last 6 months' average"
}

export interface CurrencyFundamental {
  currency: string;
  bias: Bias;
  headline: string;
  summary: string;
  drivers: FundamentalDriver[];
  updatedAt: string;
}

// --- Technicals

export interface StrategyQuestion {
  id: string;
  question: string;
  category: "risk" | "process" | "psychology";
}

export interface EducationTopic {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
}

// --- Coach / Community

export interface LeaderboardEntry {
  rank: number;
  handle: string;
  winRate: number;
  trustScore: number;
  verified: boolean;
}

export interface P2POffer {
  id: string;
  handle: string;
  side: "buy" | "sell";
  amountUSDT: number;
  pricePerUSDT: number;
  trustScore: number;
  completedTrades: number;
}

// --- News Feed (matches Tara's today.json worldNews[] schema exactly)

export type NewsRegion = "North America" | "South America" | "Europe" | "Asia" | "Middle East";
export type NewsImpact = "positive" | "negative" | "neutral";

export interface NewsItem {
  region: NewsRegion;
  currency: string;
  headline: string;
  detail: string;
  source: string;
  url: string;
  hot: boolean;
  impact: NewsImpact;
  impactNote: string;
  strength: number; // 1-5, drives the 5-dot impact meter
  firstSeen: string;
}

// --- Delivery Profiles (tradersfeed.pro, matches Tara's profiles.json schema)

export interface DeliveryProfile {
  id: string;
  num: number;
  title: string;
  marketConditions: string[];
  keyCharacteristics: string[];
  traderFocus: string[];
}

export interface ProfileWindowSet {
  label: string;
  windows: string[];
  profiles: DeliveryProfile[];
}

export interface DeliveryProfiles {
  am: ProfileWindowSet;
  pm: ProfileWindowSet;
}

// --- Trading System Health Check (Journal tab)

export interface HealthCheckOption {
  key: "A" | "B" | "C" | "D";
  text: string;
  scores: {
    risk: number;
    consistency: number;
    process: number;
    emotionalControl: number;
    edgeClarity: number;
  };
}

export interface HealthCheckQuestion {
  id: string;
  question: string;
  options: HealthCheckOption[];
}

export interface HealthCheckBand {
  id: string;
  title: string;
  percentileLabel: string;
  diagnosis: string[];
}

export interface StabilizationRule {
  title: string;
  body: string;
}

export interface StabilizationPlan {
  band: HealthCheckBand;
  rules: StabilizationRule[];
  willNotSolve: string[];
  will: string[];
}
