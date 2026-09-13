# 贡献指南 · Contributing

感谢你帮助读者把论证理解得更准确。可贡献内容纠错、双语编辑、来源补充、练习或网站修复。先用 [Issue 模板](https://github.com/Horace-Maxwell/logic-wiki/issues/new/choose)说明具体问题；小幅纠错也可直接提交 PR。

Contributions can correct content, improve either language, add sources or exercises, or fix the website. Describe the problem using an issue template; small corrections can also go directly into a pull request.

## 提交之前 · Before you start

阅读 [行为准则](CODE_OF_CONDUCT.md)、[AGENTS.md](AGENTS.md) 和 [wiki-editor](skills/wiki-editor/SKILL.md)。核对 [内容地图](docs/CONTENT-MAP.md)，避免把别名或同一问题重复收录。较大的分类与结构调整先开 Issue 讨论。

Read the code of conduct, project instructions, and editing skill linked above. Check the content map for overlapping entries and aliases. Open an issue before making substantial taxonomy or structural changes.

```sh
npm ci
npm run dev
```

Node 版本见 [.nvmrc](.nvmrc)，完整启动方式见 [README](README.md#quick-start)。从 `main` 创建描述清楚的分支；代理创建的分支使用 `codex/` 前缀。

The Node version is recorded in `.nvmrc`; see the README for startup instructions. Branch from `main` with a descriptive name; agent-created branches use the `codex/` prefix.

## 内容变更 · Content changes

| 要求 · Requirement | 提交时说明 · What to include |
| :--- | :--- |
| 双语完整 / Both languages | 同一稳定 ID 下更新中文、英文、章节和练习；核对否定、量词、条件与证据强度。<br />Update both languages, sections, and exercises under the same stable ID; compare negation, quantifiers, conditions, and evidential strength. |
| 来源可查 / Traceable sources | 给出原文链接、版本、页码或章节、实际查阅范围与许可；未读正文的材料只列为延伸阅读。<br />Provide the URL, version, page or section, access scope, and license. Material not read in the original belongs in further reading. |
| 边界明确 / Clear boundaries | 原创例子标为教学例子；真实案例区分原话、转述和本站判断。不得编造引语。<br />Label original teaching examples; distinguish quotations, paraphrases, and analysis in real cases. Do not invent quotations. |
| 练习可解释 / Explained exercises | 保留稳定题目与答案 ID；说明答案成立的条件，必要时允许信息不足或多种解释。<br />Keep stable exercise and answer IDs, explain the conditions for an answer, and allow insufficient information or multiple interpretations where warranted. |

## 编辑与审校 · Editing and review

先执行对应语言的固定 Humanizer 规则，再单独核对语义与中英对应。具体步骤见 [编辑维护说明](docs/EDITORIAL.md)。AI 辅助写作应说明所用工具与实际核查范围；代理审校如实标为 `agent`，不得写成独立专家审稿。

Apply the pinned Humanizer rules for each language, then separately check meaning and bilingual equivalence. Follow the editorial guide. Disclose AI assistance and what was actually checked; agent review must be recorded as `agent`, not as independent expert review.

知识单元与站内文案使用现有审校工具：

For knowledge units and site copy, use the existing review tool:

```sh
npm run review -- --worksheet /tmp/logic-review.json
# 只保留实际复核的记录并填写发现 / Keep only reviewed records and document findings.
npm run review -- --record /tmp/logic-review.json
```

仓库元文件由另一份记录覆盖：

Repository metadata has a separate review record:

```sh
npm run review:repository -- --worksheet /tmp/logic-repository-review.json
# 完成双语编辑、语义与链接检查后填写 / Complete editing, semantic, and link checks first.
npm run review:repository -- --record /tmp/logic-repository-review.json
```

命令只保存声明，不执行审校。不要仅刷新哈希来通过构建。规则或第三方文件升级须保留许可证，并记录差异及受影响范围。

These commands store declarations; they do not perform review. Do not refresh hashes merely to pass a build. Preserve licenses and document differences and affected scope when updating rules or third-party files.

## 验证与 PR · Validation and pull requests

```sh
npm run content:check
npm test
npm run check
npm run build
```

界面变更还需在实际 Preview 测试中文、英文与对照模式，检查相关交互、窄屏和键盘操作。PR 中说明触发问题、修改后的行为、验证结果与仍存在的限制。不要提交凭据、`node_modules/`、`dist/` 或无关文件。

For interface changes, also test Chinese, English, and parallel views in the actual preview, including affected interactions, narrow layouts, and keyboard use. Explain the problem, resulting behavior, validation, and remaining limitations in the PR. Exclude credentials, dependencies, build output, and unrelated files.

贡献的授权范围见 [许可说明](LICENSING.md)；只能提交你有权提供的内容。上游文献与引用不因收录而改变许可。

See the licensing guide for contribution terms. Submit only material you have the right to provide; inclusion does not change the licenses of upstream sources or quotations.
