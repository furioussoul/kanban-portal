# AI Kanban 架构设计文档

## 文档信息

| 属性 | 值 |
|------|-----|
| 文档版本 | 3.1 |
| 创建日期 | 2026-02-11 |
| 更新日期 | 2026-02-14 |
| 作者 | 架构师 Agent |
| 状态 | 已审核 |

---

## 1. 技术选型

### 1.1 技术栈总览

| 层级 | 技术 | 版本 | 选型理由 |
|------|------|------|----------|
| 前端框架 | Next.js | 16.x | App Router、RSC支持、已有基础 |
| UI框架 | React | 19.x | 生态成熟、团队熟悉 |
| 样式方案 | Tailwind CSS | 4.x | 原子化CSS、快速开发 |
| 组件库 | Radix UI | latest | 无障碍、无样式、可定制 |
| 拖拽库 | @dnd-kit | 6.x | 现代化、性能好、已集成 |
| 后端框架 | Next.js API Routes | - | 全栈统一、部署简单 |
| ORM | Prisma | 6.x | 类型安全、迁移管理、已集成 |
| 数据库 | PostgreSQL (Neon) | - | Serverless、已配置 |
| 认证 | Auth.js | 5.x | OAuth支持、已集成 |
| AI 框架 | OpenAgent | 自研 | 基于 AI SDK、支持多模型、工具调用 |
| 代码托管 | GitHub API | - | 仓库克隆、身份配置 |
| 代码执行 | Vercel Sandbox | 1.x | 隔离环境、已集成 |
| 支付系统 | LemonSqueezy | - | 支持国际支付、订阅管理 |

### 1.2 核心依赖

```json
{
  "dependencies": {
    "ai": "^4.3.0",
    "@ai-sdk/anthropic": "^1.0.0",
    "@ai-sdk/openai": "^1.0.0",
    "@ai-sdk/google": "^1.0.0",
    "@vercel/sandbox": "^1.0.0"
  }
}
```

---

## 2. 系统架构

### 2.1 分层架构图

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Presentation Layer                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │ 看板页面     │  │ Agent 对话  │  │ 设置页面    │  │ 计费设置            │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              API Layer                                       │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │  API Wrappers: withAuth / withApiKey / withAuthOrApiKey                 ││
│  │  统一认证、错误处理、请求上下文                                            ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│  ┌───────────┐  ┌───────────┐  ┌────────────┐  ┌───────────┐  ┌───────────┐│
│  │ /api/tasks│  │/api/agent │  │/api/billing│  │/api/integ │  │/api/notify││
│  └───────────┘  └───────────┘  └────────────┘  └───────────┘  └───────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Business Logic Layer                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │  OpenAgent   │  │   Billing    │  │   MCP        │  │   Notifications  │ │
│  │  Core/Tools  │  │   Service    │  │   Manager    │  │   Service        │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────────┘ │
│  ┌──────────────┐  ┌──────────────┐                                         │
│  │   GitHub     │  │   Realtime   │                                         │
│  │   Service    │  │   Manager    │                                         │
│  └──────────────┘  └──────────────┘                                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Data Access Layer                                  │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                        Prisma ORM                                     │   │
│  │   Models: User, Project, Task, Comment, Subscription, AgentSession   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          External Services                                   │
│  ┌───────────┐  ┌───────────┐  ┌────────────┐  ┌───────────┐  ┌───────────┐│
│  │ PostgreSQL│  │  GitHub   │  │LemonSqueezy│  │ Vercel    │  │ AI Models ││
│  │  (Neon)   │  │   API     │  │   API      │  │ Sandbox   │  │ (Claude)  ││
│  └───────────┘  └───────────┘  └────────────┘  └───────────┘  └───────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 模块划分

| 模块 | 职责 | 主要文件 |
|------|------|----------|
| 认证模块 | 用户登录、会话管理 | `src/lib/auth.ts`, `src/lib/api-auth.ts` |
| 任务模块 | 任务CRUD、状态流转 | `src/app/api/tasks/` |
| 评论模块 | 评论CRUD、嵌套回复 | `src/app/api/comments/` |
| OpenAgent | AI Agent 核心框架 | `src/openagent/` |
| 通知模块 | 站内通知、实时推送 | `src/app/api/notifications/` |
| 计费模块 | 订阅、Credit、支付 | `src/lib/billing.ts`, `src/app/api/billing/` |
| 配置模块 | 项目配置管理 | `src/app/api/projects/[id]/config/` |
| 集成模块 | GitHub 等外部集成 | `src/app/api/integrations/`, `src/lib/github.ts` |

---

## 3. OpenAgent 架构

### 3.1 核心组件

```
src/openagent/
├── types.ts                 # 核心类型定义
│   ├── AgentMode           # plan | build 模式类型
│   ├── TOOL_PERMISSIONS    # 工具权限分类 (readonly/write)
│   ├── getAllowedToolsForMode()  # 获取模式允许的工具
│   ├── isToolAllowedInMode()     # 检查工具权限
│   └── getModeChangePrompt()     # 模式切换 System Prompt
├── core/                    # 核心运行时
│   ├── processor.ts        # Agent Loop 处理器 (支持 mode)
│   ├── agent.ts            # Agent 定义管理
│   ├── llm.ts              # LLM 调用封装
│   ├── session.ts          # 会话管理 (含 mode 字段)
│   ├── context.ts          # 上下文管理
│   ├── compaction.ts       # 上下文压缩
│   └── pruning.ts          # 消息修剪
├── tool/                    # 工具系统
│   ├── define.ts           # 工具定义 DSL
│   ├── registry.ts         # 工具注册中心 (支持 mode 过滤)
│   ├── router.ts           # 本地/Sandbox 路由
│   ├── constants.ts        # 常量和 helper 函数
│   ├── builtin/            # 内置工具 (20+)
│   │   ├── read.ts         # 文件读取
│   │   ├── write.ts        # 文件写入
│   │   ├── edit.ts         # 精确编辑
│   │   ├── bash.ts         # 命令执行
│   │   ├── glob.ts         # 文件搜索
│   │   ├── grep.ts         # 内容搜索
│   │   ├── list.ts         # 目录列表
│   │   ├── task.ts         # 子 Agent 调度 (支持 mode 参数)
│   │   ├── question.ts     # 用户询问
│   │   ├── webfetch.ts     # 网页获取
│   │   ├── websearch.ts    # 网页搜索
│   │   ├── codesearch.ts   # 代码搜索
│   │   ├── skill.ts        # 技能加载
│   │   ├── todoread.ts     # 读取待办
│   │   ├── todowrite.ts    # 写入待办
│   │   ├── read-tool-output.ts  # 读取工具输出
│   │   ├── sandbox-create.ts    # 创建沙箱
│   │   ├── sandbox-status.ts    # 沙箱状态
│   │   ├── sandbox-stop.ts      # 停止沙箱
│   │   ├── batch.ts             # 并行批量执行
│   │   └── index.ts        # 工具导出
│   └── sandbox/            # Sandbox 执行器
├── mcp/                     # MCP 协议支持
│   ├── manager.ts          # MCP 服务器管理
│   └── index.ts
├── skill/                   # 技能系统
│   └── index.ts            # 技能加载器
├── provider/               # AI 模型提供者
│   └── registry.ts         # 模型注册
└── utils/                  # 工具函数
    ├── token.ts            # Token 计算
    ├── truncation.ts       # 输出截断
    ├── error.ts            # 错误处理
    ├── id.ts               # ID 生成
    └── log.ts              # 日志
```

### 3.2 Tool 抽象层

```typescript
// 工具定义使用 defineTool DSL
export const readTool = defineTool({
  id: 'read',
  description: '...',
  parameters: z.object({ ... }),
  execute: async (args, ctx) => {
    // 自动路由到本地或 Sandbox
    return routeRead(args, ctx, localExecutor, ctx.projectId)
  },
})

// Task 工具支持 mode 参数，用于控制子 Agent 模式
export const taskTool = defineTool({
  id: 'task',
  description: '...',
  parameters: z.object({
    prompt: z.string(),
    description: z.string(),
    role: z.enum(['REQUIREMENTS', 'PROTOTYPE', 'ARCHITECTURE', 'DEVELOPMENT', 'TESTING']),
    mode: z.enum(['plan', 'build']).optional(),  // 可选：指定子 Agent 模式
  }),
  execute: async (args, ctx) => {
    // 获取父会话 mode，应用安全约束（plan 不能升级到 build）
    const parentMode = currentSession.mode
    let childMode = args.mode ?? parentMode
    if (parentMode === 'plan' && childMode === 'build') {
      childMode = 'plan'  // 强制降级
    }
    // 创建子会话并执行...
  },
})

// 通用 helper 函数 (constants.ts)
- getErrorMessage(error)      // 提取错误消息
- successResult(title, output, metadata)  // 成功结果
- errorResult(operation, error, metadata) // 错误结果
- noSandboxResult(operation)  // 无沙盒错误
- collectWithLimits(items, formatter, max) // 带限制的收集
- truncationMessage(displayed, total, max) // 截断提示
```

### 3.3 Router 设计

```
Agent 调用 Tool
       │
       ▼
   Tool Router
       │
       ├──▶ 有 Sandbox? ──▶ Sandbox 执行器
       │
       └──▶ 无 Sandbox? ──▶ 返回错误，提示创建 Sandbox
```

- **透明路由**: Agent 只看到统一的工具接口
- **动态切换**: 根据 `ctx.sandboxId` 自动路由
- **安全隔离**: 所有代码执行在 Sandbox 中进行

### 3.4 Agent Mode 系统

OpenAgent 支持两种操作模式，参考 OpenCode 的 Plan/Build 模式设计：

#### 模式定义

| 模式 | 描述 | 适用场景 |
|------|------|----------|
| `plan` | 只读模式 | 代码分析、需求探索、方案规划 |
| `build` | 执行模式 | 代码实现、文件修改、命令执行 |

#### 工具权限分类

```typescript
// src/openagent/types.ts
export const TOOL_PERMISSIONS = {
  // Plan 模式允许的只读工具
  readonly: [
    'read',           // 文件读取
    'glob',           // 文件搜索
    'grep',           // 内容搜索
    'list',           // 目录列表
    'bash',           // Shell 命令 (仅限只读命令)
    'webfetch',       // 网页获取
    'websearch',      // 网页搜索
    'codesearch',     // 代码搜索
    'read_tool_output', // 读取工具输出
    'sandbox_status', // 沙箱状态
    'get_preview_url', // 预览 URL
  ],
  // Build 模式额外允许的写操作工具
  write: [
    'write',          // 文件写入
    'edit',           // 文件编辑
    'todowrite',      // 待办写入
    'task',           // 子 Agent 调度
    'question',       // 用户询问
    'skill',          // 技能加载
    'sandbox_create', // 创建沙箱
    'sandbox_stop',   // 停止沙箱
  ],
}
```

#### 模式切换机制

```
┌─────────────────────────────────────────────────────────────┐
│                     UI ModeSelector                          │
│                    (输入框 Footer)                            │
│                                                             │
│              ┌─────────┐    ┌─────────┐                     │
│              │  Plan   │    │  Build  │                     │
│              │   👁    │    │   🔨    │                     │
│              └────┬────┘    └────┬────┘                     │
└───────────────────┼──────────────┼──────────────────────────┘
                    │              │
                    ▼              ▼
              ┌─────────────────────────┐
              │   processor.prompt()    │
              │   mode: AgentMode       │
              └───────────┬─────────────┘
                          │
                          ▼
              ┌─────────────────────────┐
              │  Mode Change Detected?  │
              └───────────┬─────────────┘
                          │ Yes
                          ▼
              ┌─────────────────────────┐
              │  Inject System Prompt   │
              │  getModeChangePrompt()  │
              └───────────┬─────────────┘
                          │
                          ▼
              ┌─────────────────────────┐
              │  Filter Tools by Mode   │
              │  getToolsForMode()      │
              └─────────────────────────┘
```

#### 子 Agent Mode 继承规则

Task 工具支持 `mode` 参数，用于控制子 Agent 的操作模式：

| 父 Mode | 请求 Mode | 实际 Mode | 说明 |
|---------|-----------|-----------|------|
| `build` | 不传 | `build` | 继承父模式 |
| `build` | `plan` | `plan` | 允许降级 |
| `build` | `build` | `build` | 保持 |
| `plan` | 不传 | `plan` | 继承父模式 |
| `plan` | `plan` | `plan` | 保持 |
| `plan` | `build` | `plan` | **强制降级**（安全约束）|

```typescript
// src/openagent/tool/builtin/task.ts
parameters: z.object({
  prompt: z.string(),
  description: z.string(),
  role: z.enum(['REQUIREMENTS', 'PROTOTYPE', 'ARCHITECTURE', 'DEVELOPMENT', 'TESTING']),
  mode: z.enum(['plan', 'build']).optional(),  // 可选的模式参数
})
```

#### System Prompt 注入

模式切换时自动注入提醒：

```typescript
// Plan → Build
<system-reminder>
Your operational mode has changed from plan to build.
You are permitted to make file changes and run shell commands.
</system-reminder>

// Build → Plan
<system-reminder>
Your operational mode has changed from build to plan.
You MUST NOT make any file edits or run commands with side effects.
Focus on analysis, exploration, and planning.
</system-reminder>
```

### 3.5 Batch 工具 - 并行执行

OpenAgent 提供 `batch` 工具支持并行执行多个独立的工具调用：

```typescript
// 使用示例：同时读取 3 个文件
{
  "tool": "batch",
  "input": {
    "calls": [
      { "tool": "read", "input": { "filePath": "/path/to/file1.ts" } },
      { "tool": "read", "input": { "filePath": "/path/to/file2.ts" } },
      { "tool": "read", "input": { "filePath": "/path/to/file3.ts" } }
    ],
    "description": "Read multiple source files"
  }
}
```

#### 特性

| 特性 | 说明 |
|------|------|
| 并行执行 | 使用 `Promise.all` 并行启动所有调用 |
| 批量大小 | 1-25 个工具调用每批 |
| 错误隔离 | 部分失败不影响其他调用 |
| 结果汇总 | 返回每个调用的成功/失败状态 |

#### 限制

不能批量执行的工具：
- `batch`: 不能嵌套 batch（防止无限递归）
- `task`: 子 Agent 应该顺序执行
- `question`: 需要用户交互

#### System Prompt 自动注入

所有 Agent 的 system prompt 中自动注入工具使用指导，引导 LLM 使用 batch 工具进行并行操作。

### 3.6 安全机制

OpenAgent 实现了多层安全机制来保护系统免受滥用：

#### 工具输出截断

**位置**: `src/openagent/core/processor.ts`

所有工具输出在存入数据库前统一截断，防止超长文本导致的存储和性能问题：

```typescript
import { truncateToBytes, MAX_OUTPUT_BYTES } from '../tool/constants'

case 'tool-result':
  const rawOutput = typeof event.result === 'string' 
    ? event.result 
    : JSON.stringify(event.result)
  
  // 统一截断：50KB 限制
  const { text: toolOutput, truncated } = truncateToBytes(rawOutput, MAX_OUTPUT_BYTES)
  
  if (truncated) {
    log.warn('Tool output truncated', { 
      toolCallId, toolName, originalBytes, truncatedTo: MAX_OUTPUT_BYTES 
    })
  }
```

**保护效果**:

| 来源 | 保护机制 |
|------|----------|
| 内置工具 | 双重保护（工具层 + Processor 层）|
| MCP 工具 | Processor 层统一截断 |
| Sandbox 工具 | 双重保护 |
| 数据库存储 | 保证所有工具输出 ≤50KB |

#### 其他安全措施

| 机制 | 位置 | 说明 |
|------|------|------|
| Session 并发控制 | `processor.ts` | 同一 Session 不能并发执行 |
| 工具执行超时 | `bash.ts` | 默认 2 分钟超时 |
| maxSteps 限制 | `processor.ts` | 最多 20 步工具调用，防止无限循环 |
| AI 上下文截断 | `llm.ts` | 传给 AI 的内容限制 10000 token |
| Abort/Cancel | `processor.ts` | 支持取消正在执行的会话 |
| Mode 权限控制 | `types.ts` | Plan 模式限制写操作工具 |

---

## 4. API 层设计

### 4.1 API Wrapper

```typescript
// src/lib/api-auth.ts

// 基础 Session 认证
export function withAuth<T>(handler: AuthenticatedApiHandler<T>): ApiHandler<T>

// API Key 认证
export function withApiKey<T>(handler: ApiKeyAuthenticatedHandler<T>): ApiHandler<T>

// 混合认证 (Session 或 API Key)
export function withAuthOrApiKey<T>(handler: AuthenticatedApiHandler<T>): ApiHandler<T>

// 使用示例
export const GET = withAuth(async (_request, { session }) => {
  const data = await getData(session.user.id)
  return NextResponse.json(data)
})
```

### 4.2 错误处理

```typescript
// 统一的 ApiError 类
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string
  ) { ... }
}

// 在 handler 中抛出错误
throw new ApiError(400, 'INVALID_INPUT', 'Title is required')

// wrapper 自动捕获并返回标准响应
{ "error": "Title is required", "code": "INVALID_INPUT" }
```

### 4.3 API 路由

| 模块 | 路由 | 描述 |
|------|------|------|
| Tasks | `/api/tasks` | 任务 CRUD |
| Tasks | `/api/tasks/[id]/transition` | 状态流转 |
| Comments | `/api/tasks/[id]/comments` | 评论管理 |
| OpenAgent | `/api/openagent/stream` | Agent 对话流 |
| OpenAgent | `/api/openagent/config` | Provider/MCP 配置 |
| Billing | `/api/billing/summary` | 计费摘要 |
| Billing | `/api/billing/checkout` | 创建支付 |
| Billing | `/api/billing/subscription` | 订阅管理 |
| Billing | `/api/billing/webhook` | LemonSqueezy 回调 |
| Notifications | `/api/notifications` | 通知 CRUD |
| Integrations | `/api/integrations/github` | GitHub 集成 |

---

## 5. 计费系统

### 5.1 计费模型

```
┌──────────────────────────────────────────────────────────────────┐
│                         Billing System                            │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ Subscription│  │CreditBalance│  │   CreditTransaction     │  │
│  │             │  │             │  │                         │  │
│  │ plan        │  │ balance     │  │ type: GRANT/USAGE/etc   │  │
│  │ status      │  │ userId      │  │ amount                  │  │
│  │ periodEnd   │  │             │  │ metadata (model, tokens)│  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

### 5.2 Plan 定价

| Plan | 月费 | Credits | 特点 |
|------|------|---------|------|
| FREE | $0 | 100 | 基础体验 |
| STARTER | $19 | 1,000 | 个人开发者 |
| PRO | $49 | 5,000 | 专业用户 |
| TEAM | $149 | 20,000 | 团队协作 |
| ENTERPRISE | 定制 | 无限 | 企业级 |
| ADMIN | - | 正常扣费 | 管理员测试 |

### 5.3 Credit 消耗

```typescript
// Token → Credit 转换
const CREDIT_PER_1K_TOKENS = {
  input: {
    'claude-3-5-sonnet': 0.3,
    'claude-opus-4': 1.5,
    'gpt-4o': 0.25,
    // ...
  },
  output: {
    'claude-3-5-sonnet': 1.5,
    'claude-opus-4': 7.5,
    // ...
  }
}
```

---

## 6. 数据模型

### 6.1 核心模型关系

```
User ──1:N──▶ Project ──1:N──▶ Task ──1:N──▶ Comment
  │              │              │
  │              │              └──1:N──▶ Document
  │              │
  │              └──1:1──▶ ProjectConfig
  │
  ├──1:1──▶ Subscription
  ├──1:1──▶ CreditBalance
  └──1:N──▶ CreditTransaction
```

### 6.2 新增 Billing 模型

```prisma
enum PlanType {
  FREE
  STARTER
  PRO
  TEAM
  ENTERPRISE
  ADMIN
}

model Subscription {
  id                  String    @id @default(cuid())
  userId              String    @unique
  plan                PlanType  @default(FREE)
  status              String    @default("active")
  lsSubscriptionId    String?
  currentPeriodStart  DateTime?
  currentPeriodEnd    DateTime?
  cancelAtPeriodEnd   Boolean   @default(false)
}

model CreditBalance {
  id        String @id @default(cuid())
  userId    String @unique
  balance   Int    @default(0)
}

model CreditTransaction {
  id          String   @id @default(cuid())
  userId      String
  type        String   // GRANT, USAGE, REFUND, PURCHASE, BONUS
  amount      Int
  description String?
  metadata    Json?
  createdAt   DateTime @default(now())
}

model AgentSession {
  id          String              @id @default(cuid())
  projectId   String?
  taskId      String?
  parentId    String?             // 父会话 ID (子 Agent)
  agent       String
  mode        AgentMode           @default(build)  // 操作模式
  status      AgentSessionStatus  @default(IDLE)
  title       String?
  summary     String?
  totalCost   Float               @default(0)
  createdAt   DateTime            @default(now())
  updatedAt   DateTime            @updatedAt
}

enum AgentSessionStatus {
  IDLE
  BUSY
  COMPLETED
  FAILED
  CANCELLED
}

enum AgentMode {
  plan   // 只读模式
  build  // 执行模式
}
```

---

## 7. 客户端状态管理 (Core Architecture)

### 7.1 架构概述

采用 **单例 + Manager 分层** 模式管理客户端状态，参考 OpenCut 项目设计：

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              AppCore (Singleton)                             │
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │ CommandMgr  │  │  TaskMgr    │  │ ProjectMgr  │  │     BoardMgr        │ │
│  │ undo/redo   │  │ CRUD/query  │  │ CRUD/select │  │ UI state/filters   │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  SyncMgr    │  │ CommentMgr  │  │ RealtimeMgr │  │  NotificationMgr   │ │
│  │ debounce    │  │ nested tree │  │ SSE/polling │  │  unread count      │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                              useSyncExternalStore
                                      │
                                      ▼
                              React Components
```

### 7.2 核心设计原则

| 原则 | 描述 |
|------|------|
| **单一状态源** | AppCore 单例持有所有客户端状态 |
| **Manager 分层** | 每个领域有独立的 Manager，职责清晰 |
| **响应式更新** | 使用 `useSyncExternalStore` 实现高效的 React 集成 |
| **乐观更新** | UI 立即响应，后台异步同步到服务器 |
| **命令模式** | 支持撤销/重做的操作通过 Command 执行 |
| **延迟同步** | 1 秒 debounce，减少服务器请求 |

### 7.3 AppCore 单例

```typescript
// src/core/index.ts
export class AppCore {
  private static instance: AppCore | null = null

  // Managers
  public readonly command: CommandManager
  public readonly task: TaskManager
  public readonly project: ProjectManager
  public readonly board: BoardManager
  public readonly sync: SyncManager
  public readonly notification: NotificationManager
  public readonly comment: CommentManager
  public readonly realtime: RealtimeManager

  private constructor() {
    this.command = new CommandManager()
    this.task = new TaskManager(this)
    this.project = new ProjectManager(this)
    this.board = new BoardManager(this)
    this.sync = new SyncManager(this)
    this.notification = new NotificationManager(this)
    this.comment = new CommentManager(this)
    this.realtime = new RealtimeManager(this)
    this.sync.start()
  }

  static getInstance(): AppCore {
    if (!AppCore.instance) {
      AppCore.instance = new AppCore()
    }
    return AppCore.instance
  }

  static reset(): void {
    if (AppCore.instance) {
      AppCore.instance.sync.stop()
      AppCore.instance = null
    }
  }
}
```

### 7.4 BaseManager 抽象

```typescript
// src/core/managers/base-manager.ts
export abstract class BaseManager<TState extends object = object> {
  protected listeners = new Set<() => void>()
  protected state: TState

  constructor(protected core: AppCore, initialState: TState) {
    this.state = initialState
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  protected notify(): void {
    this.listeners.forEach(fn => fn())
  }

  getState(): Readonly<TState> {
    return this.state
  }
}
```

### 7.5 useApp Hook

```typescript
// src/hooks/use-app.ts
export function useApp(): AppCore {
  const app = useMemo(() => AppCore.getInstance(), [])
  const versionRef = useRef(0)

  const subscribe = useCallback((onStoreChange: () => void) => {
    const handleStoreChange = () => {
      versionRef.current += 1
      onStoreChange()
    }

    const unsubscribers = [
      app.command.subscribe(handleStoreChange),
      app.task.subscribe(handleStoreChange),
      app.project.subscribe(handleStoreChange),
      // ... 其他 managers
    ]

    return () => unsubscribers.forEach(unsub => unsub())
  }, [app])

  useSyncExternalStore(subscribe, () => versionRef.current, () => versionRef.current)
  return app
}
```

### 7.6 Command 模式

```typescript
// src/lib/commands/base-command.ts
export abstract class Command {
  abstract execute(): void | Promise<void>

  undo(): void | Promise<void> {
    throw new Error('Undo not implemented')
  }

  redo(): void | Promise<void> {
    return this.execute()
  }

  getDescription(): string {
    return this.constructor.name
  }

  canMergeWith(_previous: Command): boolean {
    return false
  }

  mergeWith(_previous: Command): Command {
    return this
  }
}

// 使用示例: MoveTaskCommand
export class MoveTaskCommand extends Command {
  private previousStatus: TaskStatus | null = null

  constructor(private taskId: string, private newStatus: TaskStatus) {
    super()
  }

  execute(): void {
    const app = AppCore.getInstance()
    const task = app.task.getTaskById(this.taskId)
    if (!task) throw new Error('Task not found')

    this.previousStatus = task.status
    app.task._setTask({ ...task, status: this.newStatus })
    app.sync.queueSync({ type: 'task', id: this.taskId, action: 'update', data: { status: this.newStatus } })
  }

  undo(): void {
    if (!this.previousStatus) return
    const app = AppCore.getInstance()
    const task = app.task.getTaskById(this.taskId)
    if (task) {
      app.task._setTask({ ...task, status: this.previousStatus })
      app.sync.queueSync({ type: 'task', id: this.taskId, action: 'update', data: { status: this.previousStatus } })
    }
  }
}
```

### 7.7 Actions 系统

Actions 将用户意图与实现解耦：

```typescript
// src/lib/actions/definitions.ts
export const ACTIONS = {
  'task:create': {
    description: 'Create a new task',
    category: 'task',
    defaultShortcuts: ['ctrl+n', 'cmd+n'],
  },
  'task:delete': {
    description: 'Delete selected task',
    category: 'task',
    defaultShortcuts: ['delete', 'backspace'],
  },
  'history:undo': {
    description: 'Undo last action',
    category: 'history',
    defaultShortcuts: ['ctrl+z', 'cmd+z'],
  },
  // ...
} as const

// src/lib/actions/registry.ts
export function bindAction(action: Action, handler: ActionHandler): void
export function unbindAction(action: Action, handler: ActionHandler): void
export function invokeAction(action: Action, trigger?: InvocationTrigger): void

// src/hooks/actions/use-action-handler.ts
export function useActionHandler(
  action: Action,
  handler: (trigger?: InvocationTrigger) => void,
  deps?: React.DependencyList
): void
```

### 7.8 SyncManager 同步策略

```typescript
// 同步策略
- 乐观更新: UI 立即响应
- Debounce: 1 秒延迟，合并多次操作
- 队列合并:
  - create + update → create (合并数据)
  - create + delete → 移除 (不发送请求)
  - update + update → 最新 update
  - update + delete → delete

// API 端点映射
const endpoints = {
  task: '/api/tasks',
  project: '/api/projects',
  comment: '/api/comments',
  document: '/api/documents',
}
```

### 7.9 组件使用示例

```typescript
// 在组件中使用 AppCore
function KanbanBoardView({ project, tasks: initialTasks }) {
  const app = useApp()

  // 初始化数据到 AppCore
  useEffect(() => {
    app.project.setCurrentProject(project.id)
    app.task._setTasks(initialTasks)
  }, [app, project, initialTasks])

  // 从 AppCore 获取状态（响应式）
  const tasks = app.task.getTasksByProject(project.id)
  const filters = app.board.getFilters()

  // 操作通过 Manager 执行
  const handleDragEnd = (event) => {
    const { active, over } = event
    if (over) {
      app.task.moveTask(active.id, over.id)  // 自动乐观更新 + 同步
    }
  }

  const handleAddTask = async (status) => {
    await app.task.createTaskDirect({
      title: 'New Task',
      status,
      projectId: project.id,
    })
  }

  // ...
}
```

---

## 8. 目录结构

```
src/
├── app/
│   ├── (dashboard)/
│   │   ├── projects/[id]/page.tsx    # 看板页
│   │   ├── settings/
│   │   │   ├── page.tsx              # 设置页
│   │   │   └── billing/page.tsx      # 计费设置
│   │   └── ...
│   ├── api/
│   │   ├── tasks/                    # 任务 API
│   │   ├── openagent/                # Agent API
│   │   ├── billing/                  # 计费 API
│   │   ├── integrations/             # 外部集成 API
│   │   └── notifications/            # 通知 API
│   ├── pricing/page.tsx              # 定价页
│   └── login/page.tsx
├── core/                              # 客户端状态管理核心
│   ├── index.ts                      # AppCore 单例
│   ├── types.ts                      # 核心类型定义
│   └── managers/                     # 领域 Manager
│       ├── base-manager.ts           # Manager 基类
│       ├── command-manager.ts        # 撤销/重做
│       ├── task-manager.ts           # 任务管理
│       ├── project-manager.ts        # 项目管理
│       ├── board-manager.ts          # 看板 UI 状态
│       ├── sync-manager.ts           # 服务器同步
│       ├── comment-manager.ts        # 评论管理
│       ├── realtime-manager.ts       # 实时更新 (SSE)
│       └── notification-manager.ts   # 通知管理
├── components/
│   ├── ui/                           # 基础 UI
│   ├── kanban/                       # 看板组件
│   ├── agent/                        # Agent 对话组件
│   ├── comment/                      # 评论组件
│   ├── notification/                 # 通知组件
│   └── AppProvider.tsx               # 应用级 Provider
├── lib/
│   ├── auth.ts                       # Auth.js 配置
│   ├── api-auth.ts                   # API wrapper
│   ├── prisma.ts                     # Prisma 客户端
│   ├── billing.ts                    # 计费服务
│   ├── credits.ts                    # Credit 计算
│   ├── lemonsqueezy.ts               # 支付集成
│   ├── github.ts                     # GitHub 集成
│   ├── error-utils.ts                # 错误处理工具
│   ├── actions/                      # Actions 系统
│   │   ├── definitions.ts            # 动作定义
│   │   └── registry.ts               # 动作注册
│   ├── commands/                     # Command 模式
│   │   ├── base-command.ts           # 命令基类
│   │   ├── task/                     # 任务命令
│   │   │   ├── create-task.ts
│   │   │   ├── update-task.ts
│   │   │   ├── move-task.ts
│   │   │   └── delete-task.ts
│   │   └── comment/                  # 评论命令
│   └── utils.ts                      # 通用工具
├── openagent/                        # AI Agent 框架
│   ├── core/                         # 核心运行时
│   │   ├── processor.ts              # Agent Loop 处理器
│   │   ├── agent.ts                  # Agent 定义
│   │   ├── llm.ts                    # LLM 调用封装
│   │   ├── session.ts                # 会话管理
│   │   ├── context.ts                # 上下文管理
│   │   ├── compaction.ts             # 上下文压缩
│   │   └── pruning.ts                # 消息修剪
│   ├── tool/                         # 工具系统
│   │   ├── define.ts                 # 工具定义 DSL
│   │   ├── registry.ts               # 工具注册
│   │   ├── router.ts                 # 路由
│   │   ├── constants.ts              # 常量和截断函数
│   │   ├── builtin/                  # 内置工具 (20+)
│   │   └── sandbox/                  # Sandbox 执行器
│   ├── mcp/                          # MCP 支持
│   │   ├── manager.ts                # MCP 服务器管理
│   │   └── index.ts
│   ├── skill/                        # 技能系统
│   │   └── index.ts
│   ├── provider/                     # 模型提供者
│   │   └── registry.ts
│   ├── utils/                        # 工具函数
│   │   ├── token.ts                  # Token 计算
│   │   ├── truncation.ts             # 输出截断
│   │   ├── error.ts                  # 错误类
│   │   ├── id.ts                     # ID 生成
│   │   └── log.ts                    # 日志
│   ├── init.ts                       # 初始化配置
│   ├── types.ts                      # 类型定义
│   └── index.ts                      # 导出入口
├── hooks/                            # React Hooks
│   ├── use-app.ts                    # AppCore 桥接 Hook
│   ├── actions/                      # Actions Hooks
│   │   ├── use-action-handler.ts
│   │   └── use-app-actions.ts
│   ├── useOpenAgentStream.ts
│   └── ...
└── types/
    └── index.ts
```

---

## 9. 部署架构

### 8.1 部署环境

| 组件 | 平台 | 说明 |
|------|------|------|
| 前端+API | Vercel | Next.js 全栈部署 |
| 数据库 | Neon | Serverless PostgreSQL |
| Sandbox | Vercel Sandbox | 隔离代码执行 |
| 支付 | LemonSqueezy | 订阅和一次性支付 |
| AI 模型 | Anthropic/OpenAI | Claude, GPT-4 |

### 9.2 环境变量

```env
# Database
DATABASE_URL=

# Auth
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# AI
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=

# Sandbox
VERCEL_SANDBOX_TOKEN=

# Billing (LemonSqueezy)
LEMON_SQUEEZY_API_KEY=
LEMON_SQUEEZY_STORE_ID=
LEMON_SQUEEZY_WEBHOOK_SECRET=

# GitHub (可选，用于仓库克隆)
# 通过 SystemConfig 配置，无需环境变量
```

---

## 10. 变更日志

### v3.2 (2026-02-14)
- 新增 Batch 工具支持并行执行
  - `batch` 工具：1-25 个工具调用并行执行
  - 使用 `Promise.all` 实现真正的并行
  - 部分失败不影响其他调用
  - 不允许嵌套 batch、task、question
- System Prompt 自动注入工具使用指导
  - 引导 LLM 使用 batch 进行并行操作
  - 添加 `TOOL_USAGE_GUIDELINES` 常量
- 移除 Notion 集成，新增 GitHub 集成
  - 移除 `@notionhq/client` 依赖
  - 移除文档模块 (`/api/documents`)
  - 新增 `src/lib/github.ts` GitHub 工具
  - 新增 `/api/integrations/github` API
- 新增安全机制章节 (3.6)
  - 工具输出统一截断 (50KB 限制)
  - 防止超长文本存入数据库
  - MCP 工具现在也受保护
- 更新 AppCore Manager 列表
  - 移除 `DocumentManager`
  - 新增 `RealtimeManager` (SSE/polling)
- 更新目录结构，添加 OpenAgent 详细目录
- 更新环境变量，移除 Notion 相关配置

### v3.1 (2026-02-14)
- 新增 Agent Mode 系统 (Plan/Build 模式切换)
  - `plan` 模式：只读模式，限制写操作工具
  - `build` 模式：执行模式，允许所有工具
  - 工具权限分类：`TOOL_PERMISSIONS` (readonly/write)
  - 模式切换时注入 System Prompt (`getModeChangePrompt`)
- Task 工具支持 `mode` 参数
  - 允许主 Agent 指定子 Agent 的操作模式
  - 安全约束：plan 模式下的子 Agent 不能升级到 build
- AgentSession 新增 `mode` 字段，支持 `AgentMode` 枚举
- Stream Event 新增：
  - `session-start` 事件包含 `mode` 字段
  - 新增 `mode-change` 事件通知模式切换
- UI: ModeSelector 下拉选择器组件（输入框 Footer 左侧）
- 更新 OpenAgent 目录结构文档，完善内置工具列表

### v3.0 (2026-02-14)
- 新增客户端状态管理架构 (Core Architecture)
  - AppCore 单例模式
  - Manager 分层设计 (Task, Project, Board, Sync, Comment, Document, Notification)
  - BaseManager 抽象类，提供 subscribe/notify 机制
  - Command 模式支持撤销/重做
  - Actions 系统，用户意图与实现解耦
  - SyncManager 乐观更新 + 延迟同步策略
- 新增 useApp Hook，使用 useSyncExternalStore 实现响应式更新
- 重构组件使用 AppCore：KanbanBoardView, TaskDetailPanel, CommentThread, DocumentList
- 新增 AppProvider 组件集成到 Dashboard layout
- 更新目录结构，添加 core/ 和 commands/ 目录说明

### v2.0 (2026-02-14)
- 新增 OpenAgent 自研 AI 框架（替代 OpenCode SDK）
- 新增 LemonSqueezy 计费系统
- 新增 API wrapper 统一认证层
- 新增 Tool helper 函数减少代码重复
- 新增 ADMIN 计划类型
- 更新分层架构图

### v1.0 (2026-02-11)
- 初始架构设计
