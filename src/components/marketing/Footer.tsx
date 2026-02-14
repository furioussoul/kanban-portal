import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white text-xl">
                K
              </div>
              <span className="text-xl font-bold tracking-tight">AI Kanban</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              The next-generation project management tool. Powered by AI agents to help you build faster and smarter.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#features" className="hover:text-foreground">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-foreground">Pricing</Link></li>
              <li><Link href="https://docs.aikanban.com" className="hover:text-foreground">Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Community</h4>
            <div className="flex gap-4">
              <Link href="https://github.com/furioussoul/kanban-portal" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5 text-sm text-muted-foreground">
          <p>© 2026 AI Kanban. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Built with Next.js 16, React 19, Tailwind CSS 4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
