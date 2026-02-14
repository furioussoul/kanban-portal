# AI Kanban 官网落地页 - PRD v1

| 属性 | 值 |
| :--- | :--- |
| **文档版本** | v1.0 |
| **创建日期** | 2026-02-14 |
| **状态** | 已发布 |
| **产品名称** | AI Kanban |

## 1. 产品愿景
打造一个“懂代码、能执行”的 AI 看板官网，通过直观的视觉展示和清晰的价值主张，吸引开发者和团队从传统看板迁移到 AI 驱动的协作平台。

## 2. 目标受众
*   **独立开发者**：寻求提高个人生产力的工具。
*   **专业开发团队**：需要深度集成 GitHub、自动化任务执行的团队。
*   **初创公司**：需要快速迭代且对 AI 原生工具有高接受度的组织。

## 3. 页面结构设计 (Landing Page Sections)

### 3.1 导航栏 (Header)
*   **Logo**: AI Kanban 文字 + 简约图标。
*   **菜单**: 产品特性 (Features)、定价 (Pricing)、文档 (Docs)。
*   **动作**: 登录 (Login)、免费开始使用 (Get Started - 突出显示)。

### 3.2 英雄区 (Hero Section)
*   **主标题**: 让 AI 成为你的看板协作者。 (AI-Powered Kanban that Builds with You.)
*   **副标题**: 集成 OpenAgent 智能代理，不仅追踪任务，更能在安全沙箱中帮你克隆代码、运行测试、搜索方案。
*   **CTA 按钮**: 立即免费试用 (无需信用卡)。
*   **视觉展示**: 放置看板主界面截图 (`assets/a9514bf9-c435-4cc0-84a1-fd0e282b18e8.png`)，配以动态光效暗示 AI 正在处理任务。

### 3.3 产品核心特性 (Core Features)
采用三栏或交错布局，展示产品核心能力：
1.  **智能代理 (OpenAgent)**: 
    *   展示对话界面截图 (`assets/cfae25d5-7183-4479-afa7-6030b03668ee.png`)。
    *   强调 `Plan` 与 `Build` 模式切换，以及 Vercel Sandbox 安全隔离环境。
2.  **开发者优先的看板**:
    *   毫秒级同步、乐观更新、全键盘快捷键支持、撤销/重做系统。
3.  **深度生态集成**:
    *   一键连接 GitHub 仓库，AI 自动分析需求并生成任务。

### 3.4 交互式预览 (Product Showcase)
*   展示看板拖拽、AI 生成任务、代码编辑等核心流程的动图或精修截图。

### 3.5 定价方案 (Pricing Table)
根据 `ARCHITECTURE.md` 的数据展示：
*   **FREE**: $0/月 (100 Credits) - 基础体验。
*   **STARTER**: $19/月 (1,000 Credits) - 个人开发者。
*   **PRO**: $49/月 (5,000 Credits) - 专业用户 (推荐)。
*   **TEAM**: $149/月 (20,000 Credits) - 团队协作。
*   **ENTERPRISE**: 定制 - 企业级支持。

### 3.6 底部 (Footer)
*   版权信息、社交链接（GitHub, Twitter）。
*   技术栈说明（Next.js 16, React 19, Tailwind CSS 4）。

## 4. 非功能性需求
*   **性能**: 首页 LCP (Largest Contentful Paint) 小于 1.2s。
*   **响应式**: 完美适配桌面端、平板和移动端。
*   **SEO**: 优化关键词 “AI Kanban”, “AI Agent Project Management”, “Next.js Kanban”。
*   **技术栈一致性**: 必须使用仓库已有的架构方案（Tailwind 4, Radix UI）。

## 5. 成功指标
*   首页至注册页的转化率 (Conversion Rate) > 10%。
*   页面加载性能评分 (Lighthouse) > 95。
