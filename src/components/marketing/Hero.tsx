"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { HERO_CONTENT, APP_URL } from "@/lib/constants/marketing";

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
            {HERO_CONTENT.badge}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            {HERO_CONTENT.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {HERO_CONTENT.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link href={APP_URL}>
              <Button size="lg" className="h-12 px-8 text-base bg-primary hover:bg-primary/90">
                {HERO_CONTENT.ctaPrimary} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href={APP_URL}>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                {HERO_CONTENT.ctaSecondary}
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-25"></div>
          <div className="relative rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
            <Image
              src="/assets/a9514bf9-c435-4cc0-84a1-fd0e282b18e8.png"
              alt="AI Kanban Dashboard"
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />
          </div>
          
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
