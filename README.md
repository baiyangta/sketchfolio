# sketchfolio

手绘风格的滚动叙事个人主页。参考 [ITomPoland/portfolio-itom](https://github.com/ITomPoland/portfolio-itom) 的视觉气质，
但**没有走可走动的 3D 空间**这条路——全部用手绘 SVG、纸张质感 CSS 和 GSAP 滚动动画实现，
零图片资源、零 3D 模型，构建产物只有几十 KB。

## 跑起来

```bash
pnpm install
pnpm dev        # 开发，默认 http://127.0.0.1:5178
pnpm build      # 产出 dist/
pnpm preview    # 本地预览生产构建
```

需要 Node.js 20+。

> 仓库里带了 `pnpm-workspace.yaml` 和 `.npmrc`：pnpm 11 起 `nodeLinker: hoisted` 这类设置
> 只能在 `pnpm-workspace.yaml` 里写，`.npmrc` 里的同名项会被忽略。如果你用 npm 或 yarn，删掉这两个文件即可。

## 改内容

**所有文字都在 `src/data/content.js` 一个文件里**，改完刷新即可：

| 变量 | 管什么 |
|---|---|
| `profile` | 名字、身份、一句话总结 |
| `nav` | 顶部导航项 |
| `about` | 关于我的正文、「档案卡」四条信息、右侧便签 |
| `projects` | 三个项目卡片（标题、年份、描述、标签、链接、缩略图样式） |
| `skills` | 三组技能清单 |
| `contact` | 邮箱、外链、落款 |
| `footer` | 版权行 |

带 `←` 的注释标出了必须替换成你自己内容的地方。

## 入场：两扇纸门

打开页面先是两扇纸门，点「推门进去」（或按回车/空格、滚一下）门就向外打开，后面才是首页。

- 门开着的时候锁住滚动，门打开后自动解锁
- **7 秒没人动会自动开门**，不让访客卡在门上
- 首屏的字和那个手绘圈要等门开始打开之后才动，避免在门后面白演一遍
- 关闭动画偏好的人完全看不到门，直接进内容
- URL 上加 `#content` 也能跳过门，方便调试或分享直达

想调节奏就改这几处：

| 想改什么 | 改哪里 |
|---|---|
| 门的转动速度 | `src/styles/door.css` 的 `.door__leaf { transition: transform 1.55s ... }` |
| 什么时候开始显字 | `DoorIntro.jsx` 的 `onOpen` 延时（320ms） |
| 什么时候拆掉门 | `DoorIntro.jsx` 的 `onDone` 延时（1850ms） |
| 整页淡入速度 | `src/styles/base.css` 的 `.page { transition: opacity 1.1s ... }` |
| 名字逐字出现 | `sections.css` 的 `.hero.is-entered .hero__char`（1.1s / 每字错开 0.08s） |
| 对焦虚化 | `sections.css` 的 `name-focus` 关键帧（6px → 0，1.9s） |
| 手绘圈画的快慢 | `Hero.jsx` 里 `gsap.to(paths, { duration, delay, stagger })` |

整条时间线大约是：点门 → 0.32s 页面开始淡入、名字开始长出来 → 1.42s 整页清晰 → 1.62s 门转完、页面已完全露出 → 2.9s 手绘圈画完。

> ⚠️ `.door` 容器上**不要加不透明底色**。门扇转开后容器还留在屏上，
> 一层底色会把首页盖成一片空白，等门被移除时才突然露出来。

## 改配色

颜色全部是 `src/styles/base.css` 顶部的 CSS 变量，想整体偏冷、偏白、偏灰都只改这几行：

```css
--paper: #f1f0eb;      /* 纸的底色 */
--paper-deep: #e7e5de; /* 门板、暗部 */
--ink: #23231f;        /* 正文 */
--accent: #ad4a2a;     /* 铁锈红：手绘圈、链接、勾 */
--accent-2: #33607d;   /* 蓝灰：标签、便签横线 */
```

（当前这套是中性偏冷，只留一点点暖。想要更白就把 `--paper` 提到 `#f7f6f2`，想要更冷就往 `#eef0f1` 走。）

## 结构

```
src/
├── App.jsx                 组装页面 + 门开后挂载滚动入场 + hash 直达
├── data/content.js         全站文案（只改这里）
├── components/
│   ├── SiteNav.jsx         顶部导航
│   ├── ScrollPencilLine.jsx 左侧随滚动绘制的铅笔线
│   ├── DoorIntro.jsx       入场：两扇纸门
│   ├── Hero.jsx            首屏：名字 + 手绘圈 + 逐字显现
│   ├── About.jsx           关于（纸片 + 胶带 + 便签）
│   ├── Gallery.jsx         画廊：挂画墙 + 横向拖动 + 详情卡片
│   ├── Skills.jsx          技能清单（勾随滚动画出来）
│   ├── Contact.jsx         联系 + 页脚
│   └── ui/
│       ├── SectionTitle.jsx 区块标题 + 手绘下划线
│       ├── SketchThumb.jsx  项目缩略图（纯 SVG 涂鸦，3 种）
│       ├── Skyline.jsx      程序化生成的手绘天际线
│       └── Tape.jsx         胶带
├── hooks/
│   ├── useDrawIn.js        把 [data-draw] 的 path 变成随滚动画线
│   └── useDragScroll.js    鼠标拖拽横向滚动
└── styles/
    ├── base.css            设计变量、纸张、排版、通用纸片
    ├── sections.css        各区块样式
    ├── door.css            入场门
    └── gallery.css         画廊与详情卡片
```

## 画廊

「关于我」下面是一面挂画墙：

- **横向滑动**：鼠标拖、触控板滑、或者 Tab 到墙上后用左右方向键。用浏览器原生横向滚动，不劫持页面滚动。
- **惯性**：鼠标拖拽松手后按甩出的速度继续滑一段，逐渐减速（`.95` 衰减）。触屏不接管，交给系统原生惯性。
- **无缝循环**：整排画被渲染 3 份，滚过一份就瞬间平移一份的距离。三份内容完全一样，跳的瞬间看不出来，
  所以能一直往两边滚下去。只有中间那份对屏幕阅读器和 Tab 键可见（另外两份 `aria-hidden` + `tabIndex={-1}`）。
- **点任意一幅** → 墙面变暗虚化，中间弹出一张纸质详情卡（标题 / 年份·角色 / 大图 / 描述 / 技术栈 / 打开项目）
- 详情卡：`Esc` 或点背景关闭，打开时锁页面滚动，关闭后焦点回到原来那幅画
- **敬请期待**：`gallery.coming` 里每一项会渲染成一个虚线空画框，带一个大问号和可选的 `note`（比如"在做一个音乐可视化"）。
  它们不可点击，纯占位。
- 天际线是 `Skyline.jsx` 里用固定种子的伪随机生成的，每次刷新都一样，改种子就换一座城市

### 加一幅画 / 换成真图

改 `src/data/content.js` 的 `gallery.items`：

```js
{
  title: '项目名',
  year: '2026',
  role: '独立完成',
  summary: '详情卡里的长描述',
  tags: ['React', 'GSAP'],
  link: 'https://…',
  linkLabel: '打开项目',
  variant: 'web',            // 没有图片时画的涂鸦：web / mobile / chart
  image: '/shots/xxx.png',   // 有真图就填这个，放 public/ 下，优先于涂鸦
}
```

占位画框在 `gallery.coming` 里，加一条就多一个空画框：

```js
coming: [
  { note: '在做一个音乐可视化' },   // note 可以省略
  { note: '' },
]
```

> 两处都改完不用动别的：循环是 3 份副本，一份里有几幅画由数据算出来。

## 手绘感是怎么来的

没有用任何图片或手绘素材包，全部是代码生成的：

- **纸张颗粒**：`feTurbulence` 生成噪点，一层粗一层细，`mix-blend-mode: multiply`
- **「描了两遍」的边框**：主边框 + 一层错位 0.4 度、更淡的伪元素边框
- **手绘下划线 / 椭圆 / 勾**：手写的 SVG path，配合 `stroke-dashoffset` 随滚动画出来
- **歪斜感**：卡片各自旋转 -0.9°~0.6°，胶带再歪一点
- **字体**：英文标题走 Caveat，中文回落到系统楷体 `KaiTi / STKaiti`

## 字体、图标、分享图

- **字体本地托管**：`public/fonts/caveat-latin.woff2`（75 KB，可变字重 400–700，只带 latin 子集）。
  不再请求 `fonts.googleapis.com`，国内访问不会卡在等字体上；中文本来就用系统楷体，不用下几 MB 的字体。
- **favicon**：`public/favicon.svg`（手绘圆圈 + Y），`public/apple-touch-icon.png` 180×180 给 iOS。
- **分享图**：`public/og.png` 1200×630，用同一套手绘语言画的。
  ⚠️ `index.html` 里的 `og:image` 写的是 `https://your-domain.com/og.png`，**部署后要改成你的真实域名**，
  微信/Twitter 只认绝对地址。

## SEO：给不跑 JS 的抓取器看的那份内容

`index.html` 里 `<div id="root">` 不是空的——构建时会由 `seo-fallback.js` 生成一份**静态正文**塞进去：
标题、关于我、六个项目、技能、邮箱，全是纯文本。

机制很简单：

1. `<head>` 里一行内联脚本给 `<html>` 加 `.js`
2. CSS 里写 `.js #seo-fallback { display: none }`
3. React 挂载时把 `#root` 的内容整个替换掉

所以：**有 JS 的人第一帧就看不到这段**（不会闪），**不跑 JS 的抓取器能读到全文**（百度、微信分享、各种 SEO 工具）。
内容从 `src/data/content.js` 自动生成，改文案不用同步两处。

> 想要更彻底的服务端渲染（首屏就是完整 HTML、无客户端渲染），可以再上 SSR/prerender，
> 但对一个个人站来说这份静态兜底已经够用，而且零依赖、不会在构建时炸。

## 已经处理好的

- `prefers-reduced-motion`：关掉动画偏好时，所有入场元素直接可见，不做位移
- 键盘可访问：跳转链接、`:focus-visible` 虚线焦点框、画廊可用方向键、详情卡焦点管理
- 语义结构：`header / main / section / article / footer`，标题层级完整
- 移动端：< 860px 收起侧栏铅笔线，< 720px 画框变宽，< 560px 调整字号与间距

## 还没做（下一步）

- [ ] 换成你的真实项目、真实链接、真实邮箱（现在全是占位，链接都指向 `#`）
- [ ] 部署后把 `og:image` 换成你的域名
- [ ] 作品真截图：`gallery.items` 里加 `image: '/shots/xxx.png'`
- [ ] 如果想要更强的质感：给边框加 `feDisplacementMap` 抖动滤镜、给标题做逐笔书写动画
