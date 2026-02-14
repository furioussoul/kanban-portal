import Image from "next/image";

export function Showcase() {
  return (
    <section className="container mx-auto px-4 py-24 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <div className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
            Seamless Workflow
          </div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            从想法到代码，<br />
            只需在看板上拖拽。
          </h2>
          <p className="text-lg text-muted-foreground">
            AI Kanban 不仅仅是一个展示板。当你将任务从“待办”拖到“进行中”时，我们的 AI 代理会自动开始工作：分析上下文、建议实现方案，甚至在你的许可下直接生成代码。
          </p>
          <ul className="space-y-4">
            {[
              "自动化代码分析与任务拆解",
              "与 GitHub Pull Requests 深度集成",
              "实时协作，毫秒级状态同步",
              "完全可自定义的工作流"
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex-1 relative">
          <div className="relative z-10 rounded-2xl border border-border bg-card shadow-2xl p-2 animate-in slide-in-from-right-8 duration-1000">
            <Image
              src="/assets/f0ee0931-69e9-41d8-b91b-ae56b7eabfd0.png"
              alt="AI Kanban Interaction"
              width={800}
              height={500}
              className="rounded-xl"
            />
          </div>
          
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
}
