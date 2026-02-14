"use client";

import { FEATURES } from "@/lib/constants/marketing";
import { Brain, Layout, Github } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const ICON_MAP = {
  Brain: Brain,
  Layout: Layout,
  Github: Github,
};

export function Features() {
  return (
    <section id="features" className="container mx-auto px-4 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-20"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6">为开发者而生</h2>
        <p className="text-lg text-muted-foreground">
          超越传统看板，我们将 AI 深度集成到你的开发工作流中。
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Feature - Agent */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-8 group relative overflow-hidden rounded-3xl border border-border bg-card p-8 hover:shadow-2xl transition-all duration-500"
        >
          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{FEATURES[0].title}</h3>
            <p className="text-muted-foreground mb-8 max-w-md">
              {FEATURES[0].description}
            </p>
            <div className="mt-auto relative rounded-xl border border-border bg-background overflow-hidden shadow-sm">
              <Image
                src="/assets/cfae25d5-7183-4479-afa7-6030b03668ee.png"
                alt="OpenAgent Integration"
                width={800}
                height={450}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors" />
        </motion.div>

        {/* Feature 2 - Kanban */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-4 group relative overflow-hidden rounded-3xl border border-border bg-card p-8 hover:shadow-2xl transition-all duration-500"
        >
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Layout className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold mb-4">{FEATURES[1].title}</h3>
          <p className="text-muted-foreground">
            {FEATURES[1].description}
          </p>
          <div className="mt-12 p-4 rounded-xl border border-dashed border-border flex items-center justify-center h-48 bg-muted/20">
            <span className="text-sm text-muted-foreground italic">Interactive UI Preview</span>
          </div>
        </motion.div>

        {/* Feature 3 - Ecosystem */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:col-span-6 group relative overflow-hidden rounded-3xl border border-border bg-card p-8 hover:shadow-2xl transition-all duration-500"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-foreground">
                <Github className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{FEATURES[2].title}</h3>
              <p className="text-muted-foreground">
                {FEATURES[2].description}
              </p>
            </div>
            <div className="flex-1 w-full bg-slate-900 rounded-xl p-4 border border-border">
              <pre className="text-xs text-blue-400 font-mono">
                {`$ aikanban init
$ aikanban connect repo
> Analyzing codebase...
> Found 5 tasks
> Generating PRs...`}
              </pre>
            </div>
          </div>
        </motion.div>

        {/* Additional card - Vercel Sandbox */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-6 group relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-accent/10 p-8 hover:shadow-2xl transition-all duration-500"
        >
          <div className="flex flex-col h-full justify-center text-center">
            <h3 className="text-2xl font-bold mb-4">Vercel Sandbox 安全运行</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              每一行 AI 生成的代码都在隔离的沙箱中执行，确保你的主机环境绝对安全。
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <div className="h-2 w-24 rounded-full bg-primary/40 animate-pulse" />
              <div className="h-2 w-24 rounded-full bg-accent/40 animate-pulse delay-150" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
