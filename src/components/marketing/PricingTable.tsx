import { PRICING_TIERS, PRICING_HEADER } from "@/lib/constants/pricing";
import { APP_URL } from "@/lib/constants/marketing";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function PricingTable() {
  return (
    <section id="pricing" className="container mx-auto px-4 py-24">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">{PRICING_HEADER.title}</h2>
        <p className="text-lg text-muted-foreground">
          {PRICING_HEADER.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-6">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "relative flex flex-col rounded-3xl border p-8 transition-all duration-300",
              tier.highlight 
                ? "bg-primary/5 border-primary shadow-lg scale-105 z-10" 
                : "bg-card border-border hover:border-muted-foreground/30"
            )}
          >
            {tier.highlight && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                RECOMMENDED
              </span>
            )}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-muted-foreground mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">{tier.price}</span>
                {tier.price !== "Custom" && <span className="text-sm text-muted-foreground">/mo</span>}
              </div>
              <p className="text-sm font-semibold text-primary mt-2">{tier.credits}</p>
            </div>
            
            <p className="text-sm text-muted-foreground mb-8 min-h-[40px]">
              {tier.description}
            </p>

            <ul className="space-y-4 mb-8 flex-grow">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link href={APP_URL} className="w-full">
              <Button 
                variant={tier.highlight ? "default" : "outline"}
                className={cn("w-full h-11 rounded-xl font-bold")}
              >
                {tier.name === "ENTERPRISE" ? "Contact Sales" : "Get Started"}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
