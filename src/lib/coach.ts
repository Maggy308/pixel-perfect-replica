import type { ReviewItem, QuizSettings } from "@/lib/quiz";

export interface CoachTip {
  topic: string;
  category: string;
  missed: number;
  asked: number;
  suggestion: string;
}

export type CoachAdvice =
  | { kind: "revise"; tips: CoachTip[] }
  | { kind: "challenge"; message: string }
  | { kind: "empty" };

// Hand-written, rule-based study suggestions per topic. No AI involved.
const TIPS: Record<string, string> = {
  "Cloud computing basics": "Explain cloud computing to a friend in one sentence: renting IT over the internet, paying for what you use.",
  "Cloud service models": "Draw three boxes — IaaS, PaaS, SaaS — and list who manages the OS and the app in each. Less to manage as you move right.",
  "Cloud deployment models": "Match each model to a real case: public (shared provider), private (yours only), hybrid (both connected).",
  "Scalability": "Contrast scaling up (bigger machine) with scaling out (more machines), then link elasticity to automatic scaling.",
  "Shared responsibility & security": "Remember: the provider secures the datacenter; you always own your data, accounts, and devices.",
  "Azure regions": "Picture a region as a city with datacenters. Pick regions close to users and consider data residency rules.",
  "Availability zones": "Zones are separate datacenters within one region. Spreading across them protects against one site failing.",
  "Virtual machines": "VMs are IaaS: full control of the OS. Ask yourself, 'Do I need to manage the server?' If yes, think VM.",
  "Serverless compute": "Serverless means event-driven code with no servers to manage. Think 'run code when something happens'.",
  "Storage": "Blob Storage is for unstructured files like images, videos, and backups. Review the other storage types too.",
  "Storage redundancy": "Order them by reach: LRS (one datacenter) → ZRS (across zones) → GRS (another region).",
  "Networking": "A virtual network connects Azure resources privately; a VPN Gateway links it securely to your office.",
  "Identity & security": "Review MFA (extra proof of identity) and RBAC (least-privilege roles). Use the revision cards for both.",
  "Governance & policy": "Policy enforces rules (like allowed regions); resource locks prevent accidental deletion.",
  "Cost management": "Pricing Calculator estimates before you deploy; budgets alert you after. Practice telling them apart.",
  "Resource organization": "Resource groups are folders for related resources; tags are labels for tracking and costs.",
};

export function tipFor(topic: string): string {
  return TIPS[topic] ?? "Re-read the explanation for this question, then try a short quiz on just this topic.";
}

export function coachAdvice(review: ReviewItem[], settings?: QuizSettings): CoachAdvice {
  if (review.length === 0) return { kind: "empty" };
  const stats = new Map<string, CoachTip>();
  review.forEach((r) => {
    const s = stats.get(r.topic) ?? { topic: r.topic, category: r.category, missed: 0, asked: 0, suggestion: tipFor(r.topic) };
    s.asked++;
    if (!r.correct) s.missed++;
    stats.set(r.topic, s);
  });
  const tips = [...stats.values()]
    .filter((s) => s.missed > 0)
    .sort((a, b) => b.missed - a.missed || b.missed / b.asked - a.missed / a.asked || a.topic.localeCompare(b.topic))
    .slice(0, 3);
  if (tips.length > 0) return { kind: "revise", tips };

  let message = "Perfect score! Challenge yourself with a 20-question quiz across All Topics.";
  if (settings?.difficulty !== "Intermediate") message = "Perfect score! Step it up: try an Intermediate quiz next.";
  else if (settings?.topic !== "All Topics") message = "Perfect score! Try Intermediate questions across All Topics for a bigger challenge.";
  return { kind: "challenge", message };
}
