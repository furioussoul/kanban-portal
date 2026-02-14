import { Hero } from "@/components/marketing/Hero";
import { Features } from "@/components/marketing/Features";
import { Showcase } from "@/components/marketing/Showcase";
import { PricingTable } from "@/components/marketing/PricingTable";

export default function Home() {
  return (
    <div className="flex flex-col pb-20">
      <Hero />
      <Features />
      <Showcase />
      <PricingTable />
    </div>
  );
}
