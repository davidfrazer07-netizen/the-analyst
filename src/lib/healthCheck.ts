import { HealthCheckBand, HealthCheckOption, HealthCheckQuestion, StabilizationPlan, StabilizationRule } from "./types";

export const healthCheckQuestions: HealthCheckQuestion[] = [
  {
    id: "q1",
    question: "Which style of trading do you like the most?",
    options: [
      { key: "A", text: "Intraday / session trading", scores: { risk: 2, consistency: 2, process: 2, emotionalControl: 2, edgeClarity: 2 } },
      { key: "B", text: "Position trading, holding trades for months", scores: { risk: 2, consistency: 2, process: 2, emotionalControl: 2, edgeClarity: 2 } },
      { key: "C", text: "Swing trading", scores: { risk: 2, consistency: 2, process: 2, emotionalControl: 2, edgeClarity: 2 } },
      { key: "D", text: "A mix, depending on setup", scores: { risk: 2, consistency: 2, process: 2, emotionalControl: 2, edgeClarity: 2 } },
    ],
  },
  {
    id: "q2",
    question: "Over the last 3-6 months, which description fits your overall trading result?",
    options: [
      { key: "A", text: "I've blown or nearly blown multiple account challenges. I don't have a clear proven plan yet.", scores: { risk: 0, consistency: 0, process: 1, emotionalControl: 0, edgeClarity: 0 } },
      { key: "B", text: "I've had profitable months and good phases, but I can't honestly call myself consistently profitable yet.", scores: { risk: 2, consistency: 3, process: 3, emotionalControl: 2, edgeClarity: 3 } },
      { key: "C", text: "Some months are green, some are red — overall roughly flat or slightly down.", scores: { risk: 2, consistency: 1, process: 2, emotionalControl: 2, edgeClarity: 2 } },
      { key: "D", text: "I'm roughly break-even or slightly profitable, but I lose consistency when risk or size goes up.", scores: { risk: 1, consistency: 3, process: 3, emotionalControl: 3, edgeClarity: 3 } },
    ],
  },
  {
    id: "q3",
    question: "Thinking about the last 6-12 months, how often have you changed the way you trade?",
    options: [
      { key: "A", text: "Every few days or weeks — I'm still trying lots of different things.", scores: { risk: 1, consistency: 0, process: 0, emotionalControl: 1, edgeClarity: 0 } },
      { key: "B", text: "I've stuck to one main approach and only made small refinements.", scores: { risk: 3, consistency: 4, process: 4, emotionalControl: 3, edgeClarity: 4 } },
      { key: "C", text: "I've made 1-2 big changes, but mostly traded the same core idea.", scores: { risk: 2, consistency: 3, process: 3, emotionalControl: 2, edgeClarity: 3 } },
      { key: "D", text: "Every 1-2 months, when things stop working.", scores: { risk: 2, consistency: 1, process: 2, emotionalControl: 2, edgeClarity: 1 } },
    ],
  },
  {
    id: "q4",
    question: "Which of these mostly sounds like how you choose confluences for your entries?",
    options: [
      { key: "A", text: "I use a short checklist centered on higher-timeframe structure, inducements, low-timeframe confirmations, and session timings.", scores: { risk: 3, consistency: 3, process: 4, emotionalControl: 2, edgeClarity: 4 } },
      { key: "B", text: "I trade SMC mostly and consider the rest of confluences as noise.", scores: { risk: 2, consistency: 2, process: 2, emotionalControl: 2, edgeClarity: 1 } },
      { key: "C", text: "I mainly focus on higher-timeframe structure and key levels, and I sometimes consider liquidity or time of the day when entering.", scores: { risk: 2, consistency: 2, process: 3, emotionalControl: 2, edgeClarity: 3 } },
      { key: "D", text: "I mostly take trades when price looks good based on support/resistance, indicators and patterns like head and shoulders.", scores: { risk: 1, consistency: 1, process: 1, emotionalControl: 1, edgeClarity: 1 } },
    ],
  },
  {
    id: "q5",
    question: "Once you're in a live trade and price starts moving, what tends to happen to your plan?",
    options: [
      { key: "A", text: "I mostly keep my SL and TP fixed, but occasionally may override my rules on a weak setup.", scores: { risk: 3, consistency: 3, process: 3, emotionalControl: 3, edgeClarity: 2 } },
      { key: "B", text: "I move my SL to breakeven or my target, sometimes closing early to secure the profit I made.", scores: { risk: 2, consistency: 1, process: 2, emotionalControl: 1, edgeClarity: 2 } },
      { key: "C", text: "I continue analysing price action in real time, tweaking things mid-trade.", scores: { risk: 1, consistency: 0, process: 0, emotionalControl: 0, edgeClarity: 1 } },
      { key: "D", text: "I usually walk away from my device after doing my analysis — I don't like subjecting myself to intense emotions.", scores: { risk: 3, consistency: 2, process: 2, emotionalControl: 4, edgeClarity: 2 } },
    ],
  },
  {
    id: "q6",
    question: "In your last 20 trades, how often did price stop you out before going in the direction you predicted?",
    options: [
      { key: "A", text: "5-10 times", scores: { risk: 2, consistency: 2, process: 2, emotionalControl: 2, edgeClarity: 2 } },
      { key: "B", text: "0-2 times", scores: { risk: 4, consistency: 4, process: 4, emotionalControl: 3, edgeClarity: 4 } },
      { key: "C", text: "11+ times", scores: { risk: 0, consistency: 0, process: 1, emotionalControl: 1, edgeClarity: 0 } },
      { key: "D", text: "2-5 times", scores: { risk: 3, consistency: 3, process: 3, emotionalControl: 3, edgeClarity: 3 } },
    ],
  },
  {
    id: "q7",
    question: "If someone asked you what exactly gives you an edge over other traders, how confident are you in your answer?",
    options: [
      { key: "A", text: "Not one particular element — it's all collectively working together.", scores: { risk: 2, consistency: 2, process: 2, emotionalControl: 2, edgeClarity: 1 } },
      { key: "B", text: "I have data before and after adding each confluence, showing which lead to the biggest jump in profitability.", scores: { risk: 4, consistency: 4, process: 4, emotionalControl: 3, edgeClarity: 4 } },
      { key: "C", text: "I've tested a few variables independently within my strategy and have a decent idea which carry more weight.", scores: { risk: 3, consistency: 3, process: 3, emotionalControl: 2, edgeClarity: 3 } },
      { key: "D", text: "I have a few examples from recent memory to roughly explain how.", scores: { risk: 1, consistency: 1, process: 1, emotionalControl: 1, edgeClarity: 0 } },
    ],
  },
  {
    id: "q8",
    question: "How long does it take you on average to update your trading plan/rules (your DP)?",
    options: [
      { key: "A", text: "1-2 days", scores: { risk: 2, consistency: 2, process: 2, emotionalControl: 2, edgeClarity: 2 } },
      { key: "B", text: "A few weeks on average", scores: { risk: 4, consistency: 4, process: 4, emotionalControl: 3, edgeClarity: 4 } },
      { key: "C", text: "Less than a week", scores: { risk: 2, consistency: 1, process: 1, emotionalControl: 2, edgeClarity: 1 } },
      { key: "D", text: "A few hours at most", scores: { risk: 0, consistency: 0, process: 0, emotionalControl: 1, edgeClarity: 0 } },
    ],
  },
  {
    id: "q9",
    question: "If you had to guide someone else to trade on your behalf tomorrow, what would that look like?",
    options: [
      { key: "A", text: "I could describe some guidelines, but a lot of it is still in my head or based on feel — hard to put into words.", scores: { risk: 2, consistency: 2, process: 2, emotionalControl: 2, edgeClarity: 1 } },
      { key: "B", text: "I mostly trade what looks good in the moment.", scores: { risk: 0, consistency: 0, process: 0, emotionalControl: 1, edgeClarity: 0 } },
      { key: "C", text: "I would write a checklist for them, but there will always be room for intuition.", scores: { risk: 3, consistency: 3, process: 3, emotionalControl: 2, edgeClarity: 3 } },
      { key: "D", text: "I would write a checklist with protocols on how to manage the trade once I'm in.", scores: { risk: 4, consistency: 4, process: 4, emotionalControl: 4, edgeClarity: 4 } },
    ],
  },
];

export const healthCheckBands: HealthCheckBand[] = [
  {
    id: "blown-account",
    title: "Account Rescue Required",
    percentileLabel: "Bottom 10% of traders who've taken this health check.",
    diagnosis: [
      "You've blown or nearly blown multiple challenges and are operating without a proven, repeatable plan.",
      "Risk control is effectively absent — emotional reactions dictate most trade decisions under pressure.",
      "No identifiable edge exists yet. Right now this is closer to speculation than systematic trading.",
    ],
  },
  {
    id: "treading-water",
    title: "Treading Water",
    percentileLabel: "You're in the 20th-35th percentile of traders who've taken this health check.",
    diagnosis: [
      "You have real trading knowledge, but your equity curve is flat or slightly down from noise and split focus.",
      "Consistency is your weakest link — you're spread across too many models instead of one core process.",
      "Edge clarity is blurry because you haven't committed to replicating a single approach before iterating on it.",
    ],
  },
  {
    id: "fragile-executor",
    title: "Almost-There, Fragile Executor",
    percentileLabel: "You're ahead of 50-70% of traders who've taken this health check.",
    diagnosis: [
      "Your system works on paper and in good periods, but one bad week, tilt, or over-trading can wipe months of progress.",
      "Emotional control breaks down when a sequence goes wrong, leading to size or frequency violations.",
      "Your problem is no longer edge discovery. It's execution stability and framing the day.",
    ],
  },
  {
    id: "developing-edge",
    title: "Developing Edge",
    percentileLabel: "You're ahead of roughly 60-72% of traders who've taken this health check.",
    diagnosis: [
      "You hold one core idea and a written plan, but haven't proven it across a large enough trade sample yet.",
      "Process is solid, but edge clarity is still forming — you rely more on collective feel than isolated data.",
      "Consistency holds in calm conditions but wobbles once you widen risk or trade outside your usual session.",
    ],
  },
  {
    id: "consistent-unoptimized",
    title: "Consistent but Unoptimized",
    percentileLabel: "You're ahead of roughly 75-88% of traders who've taken this health check.",
    diagnosis: [
      "Discipline and risk framing are reliable, giving you a stable but not yet exceptional result profile.",
      "You haven't isolated which confluences actually drive your edge versus which ones are just noise.",
      "Your handoff material is partial — someone else running your system would still need to guess in places.",
    ],
  },
  {
    id: "disciplined-executor",
    title: "Disciplined Executor",
    percentileLabel: "You're in the top 10% of traders who've taken this health check.",
    diagnosis: [
      "Process, risk, and emotional control all hold under pressure across different market conditions.",
      "You can show, with data, which parts of your confluence stack actually create the profitability jump.",
      "A trainee could run your system tomorrow from a written checklist without needing you in the room.",
    ],
  },
];

const RULE_LIBRARY: StabilizationRule[] = [
  { title: "Frame the Day Before Trading", body: "Each morning before the session, write down the bias, key levels, and the exact conditions under which you're allowed to trade. No trading until this is done." },
  { title: "Trade Only in Defined Windows", body: "Restrict active trading to 1-2 pre-committed session windows (e.g. London open, NY open, first 2 hours). Outside those windows, no new positions regardless of what you're seeing." },
  { title: "Wait for Inducement or Liquidity Sweep", body: "Don't enter on first contact with a level. Require a liquidity sweep or clear inducement, followed by a lower-timeframe reversal confirmation, before you commit." },
  { title: "Tighten Stops via LTF Confirmation", body: "After entry confirmation on a lower timeframe, place your initial stop beyond the immediate structural invalidation, not a round-number guess." },
  { title: "Weekly Execution Review", body: "Every week, tag each trade as Correct Model, Wrong Model, or Off-Model. Off-Model trades count as failures even when they're profitable." },
  { title: "Fix One Risk Percent Per Trade", body: "Choose a single risk percentage (e.g. 0.5%) and lock it in. No exceptions for 'high conviction' setups or recovery trades after a loss." },
  { title: "Freeze the Strategy for 30 Days", body: "For 30 calendar days, trade only your current defined model. No adding, removing, or swapping components under result pressure, win or lose." },
  { title: "Log Confluences Separately", body: "Record every confluence present on each trade in its own column, so you can later isolate which ones actually correlate with net profit." },
  { title: "Write a Handoff Checklist", body: "Document your full trading protocol as if training a replacement who can't ask you questions — entry, management, and abort rules, all written down." },
  { title: "Cap Trades Per Day", body: "Set a hard maximum of 2-3 trades per day. Once you hit it, the session is closed regardless of what setups show up afterward." },
  { title: "Journal Entry Reasons in 1-3 Sentences", body: "Before every entry, write 1-3 sentences stating exactly why this trade fits your model. No entry without the note saved first." },
];

type Dim = keyof HealthCheckOption["scores"];
const DIMS: Dim[] = ["risk", "consistency", "process", "emotionalControl", "edgeClarity"];

function getWeakDimensions(totals: Record<Dim, number>, maxPerDim: number): Dim[] {
  const ranked = DIMS.map((d) => ({ d, v: maxPerDim > 0 ? totals[d] / maxPerDim : 0 }));
  ranked.sort((a, b) => a.v - b.v);
  return ranked.slice(0, 3).map((x) => x.d);
}

function selectRules(weak: Dim[]): StabilizationRule[] {
  const want = new Set<string>();
  if (weak.includes("risk")) {
    want.add("Fix One Risk Percent Per Trade");
    want.add("Cap Trades Per Day");
  }
  if (weak.includes("consistency")) {
    want.add("Freeze the Strategy for 30 Days");
    want.add("Weekly Execution Review");
  }
  if (weak.includes("process")) {
    want.add("Write a Handoff Checklist");
    want.add("Journal Entry Reasons in 1-3 Sentences");
  }
  if (weak.includes("emotionalControl")) {
    want.add("Frame the Day Before Trading");
    want.add("Trade Only in Defined Windows");
  }
  if (weak.includes("edgeClarity")) {
    want.add("Log Confluences Separately");
    want.add("Wait for Inducement or Liquidity Sweep");
  }
  if (want.size < 5) want.add("Tighten Stops via LTF Confirmation");

  const picked = RULE_LIBRARY.filter((r) => want.has(r.title));
  const fallback = RULE_LIBRARY.filter((r) => !picked.includes(r));
  while (picked.length < 5 && fallback.length) {
    picked.push(fallback.shift()!);
  }
  return picked.slice(0, 5);
}

export function scoreHealthCheck(answers: Record<string, HealthCheckOption["key"]>): StabilizationPlan {
  const totals: Record<Dim, number> = { risk: 0, consistency: 0, process: 0, emotionalControl: 0, edgeClarity: 0 };
  let answered = 0;

  for (const q of healthCheckQuestions) {
    const ans = answers[q.id];
    if (!ans) continue;
    const opt = q.options.find((o) => o.key === ans);
    if (!opt) continue;
    for (const d of DIMS) totals[d] += opt.scores[d];
    answered += 1;
  }

  const maxPerDim = answered * 4;
  const maxPossible = maxPerDim * DIMS.length;
  const sum = DIMS.reduce((s, d) => s + totals[d], 0);
  const pct = maxPossible === 0 ? 0 : (sum / maxPossible) * 100;

  let band: HealthCheckBand;
  if (pct < 18) band = healthCheckBands[0];
  else if (pct < 38) band = healthCheckBands[1];
  else if (pct < 58) band = healthCheckBands[2];
  else if (pct < 74) band = healthCheckBands[3];
  else if (pct < 90) band = healthCheckBands[4];
  else band = healthCheckBands[5];

  const weak = getWeakDimensions(totals, maxPerDim);
  const rules = selectRules(weak);

  return {
    band,
    rules,
    willNotSolve: [
      "Replace the need for personal accountability in actually following the written plan.",
      "Guarantee immediate profitability if the underlying edge is still unproven.",
      "Remove all emotional discomfort during a losing streak.",
    ],
    will: [
      "Give you a concrete structure that cuts down random, in-the-moment decisions.",
      "Surface which specific weakness is costing you the most consistency right now.",
      "Build a repeatable baseline you can later optimize with real data instead of feel.",
    ],
  };
}
