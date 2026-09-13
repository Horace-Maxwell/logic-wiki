# Logic Wiki · 逻辑学知识库

中英双语逻辑学网站：40 篇导读、100 个谬误及相关推理问题词条、30 篇真实案例。每个词条包含两个原创教学案例、一个非谬误对照和至少两道带解析的自测。自测使用区别于已解案例的新情境；两种语言和练习不重复计入知识单元数量。

99 条来源记录分为学术参考、开放教材、书籍、原始材料、通俗阅读、课程和 GitHub 资源。查阅范围分别标为正文、相关章节、摘要、节选、概述或书目。案例重构是本站分析；代理审校不等于独立专家审稿。

## 本地运行

需要 Node.js 22.12+；本次使用 Node 26.7.0，CI 配置 Node 24。先执行 `npm ci`，再执行：

```sh
npm run dev
```

开发地址为 `http://127.0.0.1:4321/zh/`。Astro 7 会报告服务 PID；可以用 `npx astro dev stop` 停止对应开发服务。完整的 Pagefind 全文搜索由生产构建生成，开发模式仍可按中英名称、别名和摘要搜索。

```sh
npm test
npm run check
npm run build
npm run preview -- --port 4322
```

生产预览地址为 `http://127.0.0.1:4322/zh/`，静态产物在 `dist/`。项目通过 GitHub 源码仓库公开，网站仅在本地运行，不部署公网服务。若日后发布，使用真实域名设置 `SITE_URL` 后重建站点地图；当前默认地图使用本地开发地址。

## 阅读功能

- `/zh/` 与 `/en/`：语言切换保留词条、查询和章节位置，并记住主动选择。
- `/zh/bilingual/<id>/`：逐节对照；桌面双栏、手机按节堆叠。
- `/zh/search/`：中英文名称、别名与全文检索，按知识类型筛选。
- `/zh/compare/`：六组易混概念对照；`/zh/glossary/`：双语术语。
- `/zh/sources/`：可检索的分层书目与查阅范围。
- 202 道选择题按稳定题目 ID 保存答案；同一题的双语内容或答案变更后，旧作答自动失效。对照页两种语言同步作答；数据保存在当前浏览器。
- 110 道分步解答题：40 篇导读各 2 道，30 篇案例各 1 道；答案按需展开。
- 真值表、有限反模型、原文展开、案例分步阅读、反向链接和打印样式。

## 内容与维护

核心内容在 `src/data/`；同一稳定 ID 下保存两种语言及共享事实、公式、来源和答案。MDX 用于编辑说明；Astro 生成静态阅读页，React 仅用于交互，KaTeX 输出数学公式与 MathML。

`/api/index.json` 提供 170 个单元的双语标题、别名、章节、反向链接及题目索引。构建同时生成 340 份单语言 JSON 文件，路径为 `/api/zh/<id>.json` 与 `/api/en/<id>.json`。文件包含稳定 ID、双语版本哈希和中文依据版本，供其他阅读器或导出工具使用。无需运行时数据库。

编辑前阅读 [AGENTS.md](AGENTS.md) 和 [项目编辑技能](skills/wiki-editor/SKILL.md)。流程详见 [编辑维护说明](docs/EDITORIAL.md)；来源矩阵与目录见 [内容地图](docs/CONTENT-MAP.md)。

Humanizer 上游文件与许可证保存在 `vendor/humanizer/`，固定为英文 3.0.0 与中文 2.9.1-zh.2。构建不更新或远程调用规则。版本升级须比较差异、重跑回归并重新编辑受影响内容。

## 校验范围

`content:check` 校验数量、双语完整性、引用、交叉链接、案例、公式、上游规则哈希和审校记录。`npm test` 检验形式反例、概率计算及审校失效机制。构建后检查全部静态链接、锚点、语言导出和练习组件。

全部 170 个单元已完成本轮中文编辑、英文编辑与语义自校；内容或依据变化后，失效的记录仍会阻止生产构建。实际验收范围见 [深化审计](docs/EXPANSION-AUDIT.md)。

这些检查不能自动证明自然语言论证正确、译文等值或文风自然。具体代理复核发现及浏览器验证范围见 [首版审校说明](docs/REVIEW-NOTES.md)。

## 公开仓库 / Public repository

[Horace-Maxwell/logic-wiki](https://github.com/Horace-Maxwell/logic-wiki) 保存源码、双语内容、文献登记、固定 Humanizer 规则与许可证、测试和审校记录。依赖、构建产物及本地凭据不纳入版本控制；下载后按上面的命令运行。

The repository contains the source, bilingual content, bibliography, pinned Humanizer rules and licenses, tests, and review records. Dependencies, build output, and local credentials are excluded. Run the site locally using the commands above; no public website is deployed.
