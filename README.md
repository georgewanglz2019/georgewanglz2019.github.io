# Terminal-Style Personal Homepage Template

一套内容、五种风格的个人主页模板。**纯静态、零构建**——不依赖 Jekyll 或任何框架，GitHub Pages 直接发布。

One content source, five switchable styles. **Fully static, zero build** — no Jekyll or frameworks; GitHub Pages serves it as-is.

- 在线演示 Live demo: **https://georgewanglz2019.github.io/**
- 风格画廊 Style gallery: **https://georgewanglz2019.github.io/lab/**

---

## 展示效果 · Showcase

默认主页为**黑客终端风**（多色终端配色、打字机开场、扫描线背景），右下角 **◧ Styles** 面板可随时切换到其余风格，画廊页可一屏对比全部效果：

| 风格 | 特点 |
|---|---|
| Hacker Terminal 黑客终端 | 绿/青/琥珀多色命令行美学，打字机特效 |
| Swiss International 瑞士国际主义 | 黑白红网格排版，Helvetica 大标题 |
| Chinese Ink Wash 中国水墨 | 宣纸底色、楷体、朱砂印章 |
| Academic Rigour 学术严谨 | LaTeX 论文式排版、编号文献 |
| Editorial Magazine 杂志风尚 | 衬线大标题、首字下沉、编辑排版 |

**核心特性**：统一内容源（改一个 JSON 全站同步）· 中英文一键切换 · 风格切换面板 · 求职引导区 · 响应式布局 · 无需任何构建步骤。

---

# 中文教程

## 一、用这个模板创建你自己的主页（5 分钟）

GitHub 个人主页的规则：**仓库名为 `你的用户名.github.io`，就会自动发布到 `https://你的用户名.github.io/`**。所以目标就是把这个项目的代码放进你自己的同名仓库。三种方式任选：

> ⚠️ **「你的用户名」指什么？**
> 指的是你 **GitHub 账号的登录用户名**——不是你的昵称，也不是你想给网站起的名字，更不能随便写。
> 打开 GitHub 网页右上角头像，"Signed in as xxx" 里的 `xxx` 就是。
>
> 举例：本模板作者的 GitHub 用户名是 `georgewanglz2019`，所以仓库名必须是 `georgewanglz2019.github.io`，主页网址就是 `https://georgewanglz2019.github.io/`。
> 如果你的 GitHub 用户名是 `zhangsan2024`，那么你的仓库就必须叫 `zhangsan2024.github.io`，网址就是 `https://zhangsan2024.github.io/`。**名字对不上，主页就打不开。**

### 方式 A：Fork 后改名（保留对原项目的致谢链接，推荐）

1. 打开本项目页面，点右上角 **Fork**，把仓库 fork 到你自己的账号；
2. 进入你 fork 的仓库 → **Settings → General → Repository name**，把名字改成 **`你的用户名.github.io`** → Rename；
3. 等 1–2 分钟，访问 `https://你的用户名.github.io/` 即可看到效果。

### 方式 B：下载 ZIP 上传（最简单，不用 git）

1. 本项目页面 → **Code → Download ZIP**，解压；
2. 在你的账号新建仓库：右上角 **+ → New repository** → 名字填 **`你的用户名.github.io`** → Public → 创建；
3. 在新仓库页面点 **uploading an existing file**，把解压出的**全部文件**拖进去 → Commit；
4. 等 1–2 分钟，访问 `https://你的用户名.github.io/`。

### 方式 C：git 命令行

```bash
git clone https://github.com/georgewanglz2019/georgewanglz2019.github.io.git my-homepage
cd my-homepage
rm -rf .git                      # 去掉原仓库历史（Windows 用 rmdir /s /q .git）
git init && git add -A && git commit -m "My personal homepage"
# 在你的账号新建名为 你的用户名.github.io 的空仓库后：
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
git push -u origin main          # 若本地分支叫 master 就推 master
```

## 二、必改的 3 个地方

| 位置 | 改什么 |
|---|---|
| **`lab/content.json`** | 全部文字内容：姓名、简介、求职意向、论文、经历、教育、社交链接（`en` 英文 / `zh` 中文两个节点） |
| **`images/`** | 换成你的照片，并修改 `lab/render.js` 中 `img.src = "/images/Leizhen_Spain.jpg"` 一行的文件名 |
| **`index.html`** | `<title>` 和 `<meta name="description">` 改成你的信息 |

改完推送，1–2 分钟后线上生效：

```bash
git add -A && git commit -m "Update my info" && git push
```

## 三、content.json 常用字段

| 字段 | 含义 |
|---|---|
| `siteName` | 导航栏左上角名字 |
| `status` | Hero 顶部状态徽章（如 "Open to Opportunities · 2026"） |
| `seekingIntro` / `seekingCta` / `seekingRoles` | 求职引导段落 / 按钮文字 / 方向关键词 |
| `heroTitleA` / `heroName` / `heroNameCn` | 大标题前缀 / 姓名 / 括号名 |
| `heroSub` / `heroBio` | 研究方向一句话 / 个人简介 |
| `tags` / `skills` | 研究兴趣标签（宜 5–7 个）/ 技能关键词 |
| `pubs` | 论文卡片数组：`venue` `title` `authors` `journal` `note` `tags` `links`（新增论文复制一段改） |
| `experience` / `education` / `extras` | 经历时间线 / 教育 / 专利服务语言小卡片 |
| `contactText` / `email` / `social` | 联系区文字 / 邮箱 / 社交链接 `[名字, 网址]` |
| `badge1` / `badge2` | 照片下方两张信息卡 |

## 四、常用自定义

- **改默认风格**：根目录 `index.html` 中 `data-style="terminal"` 与 `terminal.css` 换成 `swiss / ink / academic / magazine` 之一。
- **增删风格**：每种风格 = `lab/<名>.html` + `lab/s/<名>.css` 两个文件，并在 `lab/render.js` 和 `lab/index.html` 的 `STYLES` 数组各增删一行。
- **本地预览**（可选）：项目根目录运行 `python -m http.server 8000`，打开 `http://localhost:8000/index.html`。

## 五、注意事项

- 纯静态：GitHub Pages 按文件原样发布，**没有构建环节**，推送即上线。
- 照片等静态资源一律放 `images/`，用绝对路径 `/images/xxx` 引用。
- 遇到问题先看本文件，或到原项目提 Issue。

---

# English Guide

## 1. Create your own homepage in 5 minutes

GitHub rule: **a repo named `<your-username>.github.io` is auto-published to `https://<your-username>.github.io/`**. So the goal is simply to get this project's files into your own repo with that name. Pick one of three ways:

> ⚠️ **What exactly is `<your-username>`?**
> It is your **GitHub account login name** — not your display name, not a name you invent for the site. Click your avatar (top-right on GitHub): it says "Signed in as xxx" — that `xxx` is your username.
>
> Example: this template's author uses the GitHub username `georgewanglz2019`, so the repo must be named `georgewanglz2019.github.io` and the site lives at `https://georgewanglz2019.github.io/`.
> If your GitHub username is `janesmith42`, your repo must be named `janesmith42.github.io` and your URL will be `https://janesmith42.github.io/`. **If the name doesn't match your username exactly, the site won't work.**

### Option A: Fork + rename (keeps a credit link, recommended)

1. Click **Fork** (top-right) on this repo;
2. In your fork: **Settings → General → Repository name** → rename it to **`<your-username>.github.io`**;
3. Wait 1–2 minutes, then visit `https://<your-username>.github.io/`.

### Option B: Download ZIP + upload (no git)

1. **Code → Download ZIP**, unzip;
2. Create a new repo named **`<your-username>.github.io`** (Public);
3. On the repo page click **uploading an existing file**, drag in **all** unzipped files, commit;
4. Wait 1–2 minutes and visit your site.

### Option C: git CLI

```bash
git clone https://github.com/georgewanglz2019/georgewanglz2019.github.io.git my-homepage
cd my-homepage
rm -rf .git                      # drop original history (Windows: rmdir /s /q .git)
git init && git add -A && git commit -m "My personal homepage"
# after creating an empty repo named <your-username>.github.io:
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin main          # or "master" if that is your local branch
```

## 2. Three must-edit spots

| Where | What |
|---|---|
| **`lab/content.json`** | All text: name, bio, job-seeking info, publications, experience, education, social links (`en` / `zh` nodes) |
| **`images/`** | Replace with your photo, then update `img.src = "/images/Leizhen_Spain.jpg"` in `lab/render.js` |
| **`index.html`** | Update `<title>` and `<meta name="description">` |

Then `git add -A && git commit && git push` — live in 1–2 minutes.

## 3. Key content.json fields

`siteName` · `status` · `seekingIntro/seekingCta/seekingRoles` · `heroTitleA/heroName/heroNameCn` · `heroSub/heroBio` · `tags` (5–7) · `skills` · `pubs` (array; copy an entry to add a paper: `venue title authors journal note tags links`) · `experience` · `education` · `extras` · `contactText/email/social` · `badge1/badge2`.

## 4. Common customizations

- **Default style**: in root `index.html`, change `data-style="terminal"` and the `terminal.css` link to `swiss / ink / academic / magazine`.
- **Add/remove styles**: one style = `lab/<name>.html` + `lab/s/<name>.css`, plus one line in the `STYLES` arrays of `lab/render.js` and `lab/index.html`.
- **Local preview** (optional): run `python -m http.server 8000` in the project root, open `http://localhost:8000/index.html`.

## 5. Notes

- Fully static: GitHub Pages serves the files as-is — **no build step**; push to publish.
- Static assets (photos, etc.) go in `images/` and are referenced as `/images/xxx`.
- Questions? Read this file or open an Issue in the original repo.
