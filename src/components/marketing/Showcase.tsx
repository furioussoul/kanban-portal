"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { SHOWCASE_CONTENT } from "@/lib/constants/marketing";

export function Showcase() {
  return (
    <section className="container mx-auto px-4 py-24 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex-1 space-y-8"
        >
          <div className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
            {SHOWCASE_CONTENT.badge}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            {SHOWCASE_CONTENT.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {SHOWCASE_CONTENT.description}
          </p>
          <ul className="space-y-4">
            {SHOWCASE_CONTENT.features.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex-1 relative"
        >
          <div className="relative z-10 rounded-2xl border border-border bg-card shadow-2xl p-2">
            <Image
              src="/assets/f0ee0931-69e9-41d8-b91b-ae56b7eabfd0.png"
              alt="AI Kanban Interaction"
              width={800}
              height={500}
              className="rounded-xl"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
