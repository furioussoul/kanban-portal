export const PRICING_HEADER = {
  title: "Transparent Pricing",
  description: "Choose the right plan based on your needs, all plans include core Kanban features.",
};

export const PRICING_TIERS = [
  {
    name: "FREE",
    price: "$0",
    credits: "100 Credits",
    description: "Perfect for exploring the power of AI Kanban.",
    features: ["Basic Kanban", "Limited AI interactions", "Community support"],
  },
  {
    name: "STARTER",
    price: "$19",
    credits: "1,000 Credits",
    description: "For individual developers looking to boost productivity.",
    features: ["Full Kanban access", "1,000 AI Credits/mo", "Priority support"],
  },
  {
    name: "PRO",
    price: "$49",
    credits: "5,000 Credits",
    description: "The most popular choice for power users.",
    features: ["Everything in Starter", "5,000 AI Credits/mo", "Advanced AI Agent features", "Private Sandbox"],
    highlight: true,
  },
  {
    name: "TEAM",
    price: "$149",
    credits: "20,000 Credits",
    description: "Built for high-performance engineering teams.",
    features: ["Everything in Pro", "20,000 AI Credits/mo", "Team collaboration tools", "Custom integrations"],
  },
  {
    name: "ENTERPRISE",
    price: "Custom",
    credits: "Unlimited",
    description: "Enterprise-grade security and scale.",
    features: ["Dedicated support", "On-premise options", "SLA guarantees"],
  },
];
