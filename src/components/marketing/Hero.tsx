import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
            New: OpenAgent Integration is now in Beta
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            让 AI 成为你的看板协作者
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            集成 OpenAgent 智能代理，不仅追踪任务，更能在安全沙箱中帮你克隆代码、运行测试、搜索方案。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button size="lg" className="h-12 px-8 text-base bg-primary hover:bg-primary/90">
              立即免费试用 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base">
              查看演示
            </Button>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto animate-in fade-in zoom-in duration-1000 delay-300">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
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
          
          {/* Decorative elements */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
}
