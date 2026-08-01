# Leizhen Wang — Personal Homepage

个人主页 · Personal homepage: **https://georgewanglz2019.github.io/**

一套内容、多种风格。主页默认为黑客终端（Hacker Terminal）风格，右下角 **Styles** 面板可随时切换；画廊对比页在 [`/lab/`](https://georgewanglz2019.github.io/lab/)。

One source of content, multiple switchable styles. The homepage defaults to the Hacker Terminal style; use the floating **Styles** panel (bottom-right) to switch, or compare all styles in the [`/lab/`](https://georgewanglz2019.github.io/lab/) gallery.

---

# 中文教程

## 一、最重要的原则：内容只有一份

**所有文字内容都在 [`lab/content.json`](lab/content.json) 这一个文件里。** 修改它，主页和全部 5 种风格会自动同步更新——不需要改任何 HTML/CSS。

- `en` 节点：英文内容（默认）
- `zh` 节点：中文内容（页面右上角 中文/EN 按钮切换）

改完提交推送，1–2 分钟后线上生效：

```bash
git add -A
git commit -m "Update content"
git push
```

## 二、content.json 字段对照表

| 字段 | 含义 | 示例 |
|---|---|---|
| `siteName` | 导航栏左上角的名字 | `"Leizhen Wang"` |
| `status` | Hero 顶部状态徽章 | `"Open to Opportunities · 2026"` |
| `seekingIntro` | 求职引导段落（status 下方） | 一句话说明毕业时间 + 求职意向 |
| `seekingCta` | 求职区按钮文字 | `"Get in Touch"` |
| `seekingRoles` | 求职方向关键词（数组） | `["Agentic LLMs", "Reinforcement Learning", ...]` |
| `heroTitleA` / `heroName` / `heroNameCn` | 大标题前缀 / 姓名 / 括号名 | `"Hi, I'm"` / `"Leizhen Wang"` / `"(王雷震)"` |
| `heroSub` | 标题下方的研究方向一句话 | `"LLM Agents · Reinforcement Learning · ..."` |
| `heroBio` | 个人简介段落 | 2–4 句 |
| `ctaPubs` | 主按钮文字（指向论文区） | `"View Publications"` |
| `tags` | 研究兴趣标签（数组，宜 5–7 个） | `["Agentic LLMs", ...]` |
| `skills` | 工程技能关键词（数组） | `["Python", "PyTorch", ...]` |
| `pubs` | 论文卡片列表（数组） | 见下 |
| `experience` | 工作经历时间线（数组） | `date` / `role` / `points[]` |
| `education` | 教育经历（数组） | `school` / `degree` / `year` / `note` |
| `extras` | 专利、学术服务、语言（3 个小卡片） | `title` / `text` |
| `contactText` | 底部联系区文字 | — |
| `email` | 邮箱 | — |
| `badge1` / `badge2` | 照片下方两张信息卡 | `["Monash University", "PhD · AI · 2022–2026"]` |
| `social` | 社交链接（数组，[名字, 链接]） | `[["GitHub", "https://..."]]` |

### 论文卡片（`pubs` 数组中的一项）

```json
{
  "venue": "TR-C · 2025",          // 期刊/年份标签；review=true 时显示"在审"配色
  "review": false,
  "title": "论文标题",
  "authors": "L Wang, P Duan, ...",
  "journal": "期刊全名（可留空 \"\"）",
  "note": "一句话亮点：方法 → 量化结果（可留空）",
  "tags": ["LLM Agents", "Route Choice"],
  "links": [["Paper", "https://..."], ["Code", "https://..."]]
}
```

新增论文：在 `pubs` 数组里复制一项改写即可（中英文两个语言节点各加一份）。删除则整项移除。

## 三、换照片

照片文件放在 [`images/`](images/) 目录，渲染器统一引用 `/images/Leizhen_Spain.jpg`。想换照片：把新图放进 `images/`，然后全局替换 `lab/render.js` 中的 `img.src = "/images/Leizhen_Spain.jpg"` 一行即可。

## 四、风格管理

当前保留 5 种风格：Hacker Terminal / Swiss International / Chinese Ink Wash / Academic Rigour / Editorial Magazine。

每种风格 = 两个文件 + 两处注册：

- `lab/<风格名>.html`（页面壳，仅十几行）
- `lab/s/<风格名>.css`（样式）

**删除一个风格**：删掉上述两个文件，并从两处注册表移除对应行——
1. `lab/render.js` 顶部的 `STYLES` 数组
2. `lab/index.html`（画廊）里的 `STYLES` 数组

**新增一个风格**：仿照现有壳新建 `lab/xxx.html`（改 `data-style="xxx"` 和 css 引用），新建 `lab/s/xxx.css`，再在两处 `STYLES` 数组各加一行 `["xxx", "English Name", "中文名"]`。

**修改默认主页风格**：根目录 `index.html` 是主页壳，改其中的 `data-style="terminal"` 和对应的 css 引用即可（例如换成 `swiss`）。

## 五、本地预览

无需 Jekyll。在项目根目录起一个静态服务器即可：

```bash
python -m http.server 8000
# 打开 http://localhost:8000/index.html（主页）
# 打开 http://localhost:8000/lab/index.html（画廊）
```

## 六、注意事项

- 本项目是**完全自包含的纯静态站点**——无构建步骤、不依赖 Jekyll，GitHub Pages 直接按原样发布。
- `.workbuddy/` 已被 gitignore，是本机工作区，不会上传。
- 页面结构：`index.html`（主页壳，默认终端风格）+ `lab/`（内容源、渲染器、5 种风格、画廊）+ `images/`（照片素材）。

---

# English Guide

## 1. The golden rule: one content source

**All text lives in a single file: [`lab/content.json`](lab/content.json).** Edit it once and the homepage plus all 5 styles update automatically — no HTML/CSS changes needed.

- `en`: English content (default)
- `zh`: Chinese content (toggled via the 中文/EN button, top-right)

Commit and push; the live site updates in 1–2 minutes:

```bash
git add -A
git commit -m "Update content"
git push
```

## 2. Field reference

| Field | Purpose |
|---|---|
| `siteName` | Name in the top-left nav |
| `status` | Status badge at the top of the hero |
| `seekingIntro` | Job-seeking paragraph right under the badge |
| `seekingCta` | Label of the job-seeking button |
| `seekingRoles` | Target-role keywords (array) |
| `heroTitleA` / `heroName` / `heroNameCn` | Heading prefix / name / name in parentheses |
| `heroSub` | One-line research statement under the heading |
| `heroBio` | Short bio (2–4 sentences) |
| `ctaPubs` | Primary button label (scrolls to publications) |
| `tags` | Research-interest tags (keep 5–7) |
| `skills` | Engineering-skill keywords |
| `pubs` | Publication cards (array; see below) |
| `experience` | Timeline entries: `date` / `role` / `points[]` |
| `education` | `school` / `degree` / `year` / `note` |
| `extras` | Three mini cards (patents, service, languages) |
| `contactText`, `email` | Contact section |
| `badge1` / `badge2` | Two info cards under the photo |
| `social` | `[label, url]` pairs |

### A publication entry

```json
{
  "venue": "TR-C · 2025",
  "review": false,
  "title": "Paper title",
  "authors": "L Wang, P Duan, ...",
  "journal": "Full journal name (may be \"\")",
  "note": "One-line highlight: method → quantified result (may be \"\")",
  "tags": ["LLM Agents", "Route Choice"],
  "links": [["Paper", "https://..."], ["Code", "https://..."]]
}
```

To add a paper, copy an entry inside `pubs` (in both `en` and `zh`) and edit it. To remove one, delete the entry.

## 3. Changing the photo

Put the new image into `images/`, then update the single line `img.src = "/images/Leizhen_Spain.jpg"` in `lab/render.js`.

## 4. Managing styles

Each style = two files + two registry entries:

- `lab/<style>.html` (a ~15-line shell)
- `lab/s/<style>.css`

**Delete a style**: remove those two files and its line in both `STYLES` arrays (`lab/render.js` and `lab/index.html`).

**Add a style**: copy an existing shell, set `data-style`, create its CSS, and register it in both arrays.

**Change the default homepage style**: edit `data-style="terminal"` and the CSS link in the root `index.html`.

## 5. Local preview

No Jekyll needed — serve the repo root statically:

```bash
python -m http.server 8000
# http://localhost:8000/index.html       (homepage)
# http://localhost:8000/lab/index.html   (gallery)
```

## 6. Notes

- Fully self-contained static site — **no build step, no Jekyll**; GitHub Pages serves the files as-is.
- `.workbuddy/` is git-ignored (local workspace only).
- Structure: `index.html` (homepage shell, terminal style by default) + `lab/` (content source, renderer, 5 styles, gallery) + `images/` (photos).
