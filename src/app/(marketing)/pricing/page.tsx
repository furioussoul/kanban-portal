import { PricingTable } from "@/components/marketing/PricingTable";

export const metadata = {
  title: "Pricing | AI Kanban",
  description: "Simple and transparent pricing for individuals and teams.",
};

export default function PricingPage() {
  return (
    <div className="py-20">
      <PricingTable />
    </div>
  );
}
