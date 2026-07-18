import { HealthCheckBand, HealthCheckOption, HealthCheckQuestion, StabilizationPlan, StabilizationRule } from "./types";

// Each option carries partial-credit scores (0-4) across 5 dimensions. Higher = healthier.
function opt(key: "A" | "B" | "C" | "D", text: string, scores: HealthCheckOption["scores"]): HealthCheckOption {
  return { key, text, scores };
}

export const healthCheckQuestions: HealthCheckQuestion[] = [
  {
    id: "q1",
    question: "Which style of trading do you like the most?",
    options: [
      opt("A", "Intraday / session trading", { risk: 2, consistency: 2, process: 2, emotionalControl: 2, edgeClarity: 2 }),
      opt("B", "Position trading, holding trades for months", { risk: 2, consistency: 2, process: 2, emotionalControl: 2, edgeClarity: 2 }),
      opt("C", "Swing trading", { risk: 2, consistency: 2, process: 2, emotionalControl: 2, edgeClarity: 2 }),
      opt("D", "A mix, depending on setup", { risk: 2, consistency: 2, process: 2, emotionalControl: 2, edgeClarity: 2 }),
    ],
  },
  {
    id: "q2",
    question: "Over the last 3-6 months, which description fits your overall trading result?",
    options: [
      opt("A", "I've blown or nearly blown multiple account challenges. I don't have a clear proven plan yet.", { risk: 0, consistency: 0, process: 0, emotionalControl: 0, edgeClarity: 0 }),
      opt("B", "I've had profitable months and good phases, but I can't honestly call myself consistently profitable yet.", { risk: 2, consistency: 2, process: 2, emotionalControl: 2, edgeClarity: 2 }),
      opt("C", "Some months are green, some are red — overall roughly flat or slightly down.", { risk: 1, consistency: 1, process: 1, emotionalControl: 1, edgeClarity: 1 }),
      opt("D", "I'm roughly break-even or slightly profitable, but I lose consistency when risk or size goes up.", { risk: 2, consistency: 3, process: 2, emotionalControl: 1, edgeClarity: 3 }),
    ],
  },
  {
    id: "q3",
    question: "Thinking about the last 6-12 months, how often have you changed the way you trade (strategy, timeframe, style)?",
    options: [
      opt("A", "Every few days or weeks — I'm still trying lots of different things.", { risk: 0, consistency: 0, process: 0, emotionalControl: 1, edgeClarity: 0 }),
      opt("B", "I've stuck to one main approach and only made small refinements.", { risk: 3, consistency: 4, process: 4, emotionalControl: 3, edgeClarity: 4 }),
      opt("C", "I've made 1-2 big changes, but mostly traded the same core idea.", { risk: 2, consistency: 3, process: 3, emotionalControl: 2, edgeClarity: 3 }),
      opt("D", "Every 1-2 months, when things stop working.", { risk: 1, consistency: 1, process: 1, emotionalControl: 1, edgeClarity: 1 }),
    ],
  },
  {
    id: "q4",
    question: "Which of these mostly sounds like how you choose confluences for your entries?",
    options: [
      opt("A", "I use a short checklist centered on higher-timeframe structure, inducements, low-timeframe confirmations, and session timings.", { risk: 3, consistency: 3, process: 4, emotionalControl: 2, edgeClarity: 3 }),
      opt("B", "I trade SMC mostly and consider the rest of confluences as noise.", { risk: 2, consistency: 2, process: 2, emotionalControl: 2, edgeClarity: 2 }),
      opt("C", "I mainly focus on higher-timeframe structure and key levels, and sometimes consider liquidity or time of day.", { risk: 2, consistency: 2, process: 2, emotionalControl: 2, edgeClarity: 2 }),
      opt("D", "I mostly take trades when price looks good based on support/resistance, indicators and patterns like head and shoulders.", { risk: 0, consistency: 1, process: 0, emotionalControl: 1, edgeClarity: 0 }),
    ],
  },
  {
    id: "q5",
    question: "Once you're in a live trade and price starts moving, what tends to happen to your plan?",
    options: [
      opt("A", "I mostly keep my SL and TP fixed, but occasionally may override my rules on a weak setup.", { risk: 3, consistency: 3, process: 3, emotionalControl: 2, edgeClarity: 2 }),
      opt("B", "I move my SL to breakeven or my target, sometimes closing early to secure the profit I made.", { risk: 2, consistency: 1, process: 1, emotionalControl: 1, edgeClarity: 2 }),
      opt("C", "I continue analysing price action in real time, tweaking things mid-trade.", { risk: 1, consistency: 1, process: 0, emotionalControl: 0, edgeClarity: 1 }),
      opt("D", "I usually walk away from my device after doing my analysis — I don't like subjecting myself to intense emotions.", { risk: 3, consistency: 3, process: 3, emotionalControl: 4, edgeClarity: 2 }),
    ],
  },
  {
    id: "q6",
    question: "In your last 20 trades, how often did price stop you out before going in the direction you predicted?",
    options: [
      opt("A", "5-10 times", { risk: 1, consistency: 1, process: 1, emotionalControl: 1, edgeClarity: 1 }),
      opt("B", "0-2 times", { risk: 3, consistency: 3, process: 3, emotionalControl: 3, edgeClarity: 4 }),
      opt("C", "11+ times", { risk: 0, consistency: 0, process: 0, emotionalControl: 0, edgeClarity: 0 }),
      opt("D", "2-5 times", { risk: 2, consistency: 2, process: 2, emotionalControl: 2, edgeClarity: 3 }),
    ],
  },
  {
    id: "q7",
    question: "If someone asked you what exactly gives you an edge over other traders, how confident are you in your answer?",
    options: [
      opt("A", "Not one particular element — it's all collectively working together.", { risk: 1, consistency: 1, process: 1, emotionalControl: 1, edgeClarity: 1 }),
      opt("B", "I have data before and after adding each confluence, showing which lead to the biggest jump in profitability.", { risk: 3, consistency: 3, process: 4, emotionalControl: 2, edgeClarity: 4 }),
      opt("C", "I've tested a few variables independently within my strategy and have a decent idea which carry more weight.", { risk: 2, consistency: 2, process: 3, emotionalControl: 2, edgeClarity: 3 }),
      opt("D", "I have a few examples from recent memory to roughly explain how.", { risk: 0, consistency: 0, process: 0, emotionalControl: 0, edgeClarity: 0 }),
    ],
  },
  {
    id: "q8",
    question: "How long does it take you on average to update your trading plan/rules (your DP)?",
    options: [
      opt("A", "1-2 days", { risk: 1, consistency: 1, process: 1, emotionalControl: 1, edgeClarity: 1 }),
      opt("B", "A few weeks on average", { risk: 3, consistency: 3, process: 3, emotionalControl: 2, edgeClarity: 3 }),
      opt("C", "Less than a week", { risk: 1, consistency: 1, process: 1, emotionalControl: 1, edgeClarity: 1 }),
      opt("D", "A few hours at most", { risk: 0, consistency: 0, process: 0, emotionalControl: 0, edgeClarity: 0 }),
    ],
  },
  {
    id: "q9",
    question: "If you had to guide someone else to trade on your behalf tomorrow, what would that look like?",
    options: [
      opt("A", "I could describe some guidelines, but a lot of it is still in my head or based on feel — hard to put into words.", { risk: 1, consistency: 1, process: 1, emotionalControl: 1, edgeClarity: 1 }),
      opt("B", "I mostly trade what looks good in the moment.", { risk: 0, consistency: 0, process: 0, emotionalControl: 0, edgeClarity: 0 }),
      opt("C", "I would write a checklist for them, but there will always be room for intuition.", { risk: 2, consistency: 2, process: 2, emotionalControl: 2, edgeClarity: 2 }),
      opt("D", "I would write a checklist with protocols on how to manage the trade once I'm in.", { risk: 4, consistency: 4, process: 4, emotionalControl: 3, edgeClarity: 4 }),
    ],
  },
];

export const healthCheckBands: HealthCheckBand[] = [
  {
    id: "high-risk",
    title: "High-Risk, Not Yet Proven",
    percentileLabel: "You're earlier in the process than most traders who've taken this check.",
    diagnosis: [
      "Your process changes too often for an edge to compound.",
      "Risk control breaks down as soon as pressure shows up.",
      "The priority right now is survival and repetition, not optimization.",
    ],
  },
  {
    id: "fragile-executor",
    title: "Almost-There, Fragile Executor",
    percentileLabel: "You're ahead of 50-70% of traders who've taken this health check.",
    diagnosis: [
      "Your system works on paper and in good periods.",
      "But one bad week, tilt or over-trading can wipe months of progress.",
      "Your problem is no longer edge discovery. It's execution stability and framing the day.",
    ],
  },
  {
    id: "consistent-unoptimized",
    title: "Consistent but Unoptimized",
    percentileLabel: "You're ahead of 70-85% of traders who've taken this health check.",
    diagnosis: [
      "Your process discipline holds up under most conditions.",
      "You're leaving edge on the table by not isolating which confluences actually drive your results.",
      "The priority now is measurement, not more discipline.",
    ],
  },
  {
    id: "disciplined-executor",
    title: "Disciplined Executor",
    percentileLabel: "You're ahead of 85%+ of traders who've taken this health check.",
    diagnosis: [
      "Process, risk and emotional control are all holding together under pressure.",
      "Your edge is documented well enough to hand to someone else.",
      "The priority now is scaling size and refining execution at the margins.",
    ],
  },
];

const RULE_LIBRARY = {
  process: {
    title: "Rule - Frame the day before you trade",
    body: "Every session, answer in your journal before placing a trade: What is today's likely direction (bullish / bearish / choppy)? Which trade model am I hunting (London continuation, London reversal, NY continuation, NY reversal)?",
  },
  window: {
    title: "Rule - Only trade in key windows",
    body: "You may only take trades in defined time windows (e.g. London open: first 2 hours, New York open: first 2 hours). No random mid-session entries.",
  },
  inducement: {
    title: "Rule - Wait for inducement + strong push",
    body: "If you enter and price moves in slow motion with short candles, you likely entered on the wrong inducement. For 30 days, only enter after you see liquidity taken and a decisive shift in your direction.",
  },
  stops: {
    title: "Rule - Tighten stops via LTF",
    body: "Before confirming your entry, refine on M1/M5 to place a tight, logical stop, not a random buffer. This boosts RR without needing more trades.",
  },
  review: {
    title: "Rule - Weekly execution review",
    body: "Once per week, review all trades and tag them: correct model / wrong model / off-model. The goal is to reduce off-model trades to near zero.",
  },
  riskUnit: {
    title: "Rule - Fix your risk unit first",
    body: "Before touching entries again, set one fixed risk % per trade and do not vary it by conviction. Position size swings are usually the single biggest cause of blown accounts, not entry quality.",
  },
  singleStrategy: {
    title: "Rule - Freeze the strategy for 30 days",
    body: "Pick the one approach you already half-trust and do not change timeframe, model or style for 30 days, even after a losing week. Switching resets the sample size you need to know if anything works.",
  },
  edgeLog: {
    title: "Rule - Log confluences separately",
    body: "For every trade, tag which confluences were present. After 20 trades, compare win rate with vs. without each confluence to find out which ones are actually carrying your edge.",
  },
  handoffDoc: {
    title: "Rule - Write the handoff checklist",
    body: "Write your entry and trade-management rules as if handing your account to someone else tomorrow. Anything you can't write down in a step is still a feeling, not a rule.",
  },
} as const;

function totalScore(scores: HealthCheckOption["scores"]): number {
  return scores.risk + scores.consistency + scores.process + scores.emotionalControl + scores.edgeClarity;
}

export function scoreHealthCheck(answers: Record<string, HealthCheckOption["key"]>): StabilizationPlan {
  const dims = { risk: 0, consistency: 0, process: 0, emotionalControl: 0, edgeClarity: 0 };
  let total = 0;
  let answered = 0;

  for (const q of healthCheckQuestions) {
    const key = answers[q.id];
    if (!key) continue;
    const option = q.options.find((o) => o.key === key);
    if (!option) continue;
    dims.risk += option.scores.risk;
    dims.consistency += option.scores.consistency;
    dims.process += option.scores.process;
    dims.emotionalControl += option.scores.emotionalControl;
    dims.edgeClarity += option.scores.edgeClarity;
    total += totalScore(option.scores);
    answered += 1;
  }

  const maxPossible = answered * 20; // 5 dims x max 4 each
  const pct = maxPossible > 0 ? total / maxPossible : 0;

  const band =
    pct >= 0.8
      ? healthCheckBands[3]
      : pct >= 0.6
      ? healthCheckBands[2]
      : pct >= 0.35
      ? healthCheckBands[1]
      : healthCheckBands[0];

  // Pick the two weakest dimensions to prioritize rules for.
  const weakest = (Object.entries(dims) as [keyof typeof dims, number][]).sort((a, b) => a[1] - b[1]);

  const rules: StabilizationRule[] = [
    RULE_LIBRARY.process,
    RULE_LIBRARY.window,
    RULE_LIBRARY.inducement,
    RULE_LIBRARY.stops,
    RULE_LIBRARY.review,
  ];

  if (weakest[0][0] === "risk") rules[0] = RULE_LIBRARY.riskUnit;
  if (weakest[0][0] === "consistency" || weakest[1][0] === "consistency") rules[1] = RULE_LIBRARY.singleStrategy;
  if (weakest[0][0] === "edgeClarity" || weakest[1][0] === "edgeClarity") rules[3] = RULE_LIBRARY.edgeLog;
  if (band.id === "disciplined-executor" || band.id === "consistent-unoptimized") rules[4] = RULE_LIBRARY.handoffDoc;

  return {
    band,
    rules,
    willNotSolve: [
      "Guarantee a perfect month with no drawdown",
      "Turn you into a robot who never feels emotion",
      "Replace the need for deeper trade-model work and risk optimization",
    ],
    will: [
      "Align your trading with clear daily framing",
      "Cut down early, low-quality entries",
      "Turn your existing edge into something you can trust under pressure",
    ],
  };
}
