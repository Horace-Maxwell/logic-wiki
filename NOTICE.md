# 第三方材料与署名 · Third-party notices

项目区分网站代码、原创教学内容、引用材料与外部依赖。引用和链接不表示相关作者参与本项目，也不表示其认可本站判断。

The project distinguishes website code, original teaching content, quoted material, and external dependencies. A citation or link does not imply that its author contributes to this project or endorses its analysis.

## 随仓库保存的规则 · Vendored rules

| 组件 · Component | 来源与版本 · Source and version | 许可 · License |
| :--- | :--- | :--- |
| English Humanizer | [blader/humanizer](https://github.com/blader/humanizer), 3.0.0 | [MIT 原文 / MIT text](vendor/humanizer/en/LICENSE) |
| 中文 Humanizer | [holygeek00/humanizer-zh-cn](https://github.com/holygeek00/humanizer-zh-cn), 2.9.1-zh.2 | [MIT 原文 / MIT text](vendor/humanizer/zh/LICENSE) |

两份随附许可证均保留 `Copyright (c) 2025 Siqi Chen`。具体固定提交、文件与哈希见 [lock.json](vendor/humanizer/lock.json)；中文规则的上游来源与改编说明见其 [SKILL.md](vendor/humanizer/zh/SKILL.md)。分发这些文件时保留原许可及署名。

Both included licenses retain `Copyright (c) 2025 Siqi Chen`. The lock file records pinned commits, files, and hashes; the Chinese skill documents its upstream source and adaptation. Preserve the original licenses and attribution when distributing these files.

## 教材、论文与原始材料 · Textbooks, papers, and primary documents

[来源登记](src/data/sources.mjs)与[延伸阅读](src/data/reading.mjs)记录各项材料的作者、链接、许可与实际查阅范围。`Reference only` 表示该记录仅作参考，不是对原材料的再分发授权。

The source register and further-reading records list authors, links, licenses, and actual access scope. `Reference only` identifies a reference record, not permission to redistribute its source.

*forall x: Calgary*、Open Logic Project 与登记的 Van Cleave 教材版本在来源表中标为 CC BY 4.0。其他书籍、论文、图片与案例原文按其各自条款处理，不适用 Humanizer 的 MIT 许可。改编时应注明原作者、材料定位和修改情况。

The source register identifies *forall x: Calgary*, the Open Logic Project, and the listed Van Cleave textbook edition as CC BY 4.0. Other books, papers, images, and case passages retain their respective terms; the Humanizer MIT license does not apply to them. Identify original authors, source locations, and changes when adapting material.

## 依赖与展示素材 · Dependencies and presentation assets

`package-lock.json` 固定 npm 依赖。依赖的许可证保留在各自包中；分发打包产物时应核对实际包含的第三方代码及其通知要求。仓库截图展示本项目的本地界面；README 的状态徽章来自 GitHub Actions 与 Shields.io。

The lockfile pins npm dependencies. Their licenses remain in their respective packages; check notices for the third-party code actually included when distributing a bundle. Repository screenshots show this project's local interface; README status badges come from GitHub Actions and Shields.io.

项目自身的授权范围见 [LICENSING.md](LICENSING.md)。本文不能替代任何第三方许可证原文。

See the licensing guide for this project's own terms. This notice does not replace any third-party license text.
