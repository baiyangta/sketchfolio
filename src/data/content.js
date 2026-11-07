/**
 * ─────────────────────────────────────────────────────────────
 *  全站内容都在这一个文件里。想改文字，只改这里就够了。
 *  以「←」开头的注释标出了必须替换成你自己内容的地方。
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  // ← 换成你的名字（英文名或中文名都行，中文字体回落到楷体）
  name: 'Yangh',
  // ← 一行身份描述
  role: '求知拜客 · 摸鱼逮虾',
  // ← 一句自我总结，短、具体、别喊口号
  tagline: '慢工出烂活，欲速则一坨',
}

export const nav = [
  { label: '关于', href: '#about' },
  { label: '画廊', href: '#gallery' },
  { label: '会什么', href: '#skills' },
  { label: '联系', href: '#contact' },
]

export const about = {
  lead: '你好，我是 Yangh。一个还在读书、正在把「稀里糊涂」变成「清清楚楚」的人。',
  paragraphs: [
    '我不知道该怎么自我介绍，估计也很少人会留意这页内容。不过既然您已经读到这句话了，我就简单列几句：INTP，宅，喜欢发呆，在上电影史和现代天文学的课，偶尔散个步，其余时间在椅子上，喜欢动物，对地质感兴趣。',
    '现在我在做的事是：应付一些早八，完成一些作业，写一些论文，压力一些AI。',
    '如果你在找一个喜欢胡思乱想，偶尔灵机一动，有时莫名其妙的ren，可以往下看看。',
  ],
  // ← 左边这张「档案卡」的四条信息
  facts: [
    { label: '现在', value: '在读，2026 届' },
    { label: '方向', value: '药学 / 暂无' },
    { label: '状态', value: '大一求生' },
    { label: '坐标', value: '银河 ·太阳 · 地球 ' },
  ],
  // ← 便签上那句话
  quote: '与其担心明天的早八，不如享受今晚的自由',
  quoteNote: '—— 沃兹基索德',
}

/**
 * ← 画廊：挂在墙上的一排画，点开看详情。
 *   每个都要能说清：解决了什么问题、你做了什么、卡在哪。
 *   variant 决定缩略图的画法，可选：web / mobile / chart
 *   想放真图就写 image: '/xxx.png'（图片放 public 目录），会自动替换掉涂鸦
 */
export const gallery = {
  intro: '挂着我做过的东西。左右拖一下，点开看细节。',
  items: [
    {
      title: '课表小工具',
      year: '2026',
      role: '独立完成',
      summary:
        '把学校教务系统里那张只能截图的课表，变成可以搜索、可以导出、手机上也能看的页面。顺手做了周视图切换，一门课一个配色。踩得最深的坑是教务系统返回的表格 colspan 全是乱的。',
      tags: ['React', 'IndexedDB', 'CSS Grid'],
      link: '#',
      linkLabel: '打开项目',
      variant: 'web',
      image: null,
    },
    {
      title: '单词本',
      year: '2026',
      role: '独立完成',
      summary:
        '一个极简的背单词 PWA：离线可用、间隔重复、没有社交、没有打卡。做它是为了治自己开 App 先刷十分钟的毛病。离线缓存走 Service Worker，数据全在本地，卸载重装也不丢。',
      tags: ['TypeScript', 'PWA', 'localStorage'],
      link: '#',
      linkLabel: '打开项目',
      variant: 'mobile',
      image: null,
    },
    {
      title: '实验室数据看板',
      year: '2025',
      role: '三个人，我负责前端',
      summary:
        '帮实验室把散在几十个 Excel 里的实验记录汇总成一块看板。第一次真正踩到「数据脏」和「需求每周都变」这两件事——同一个指标，三个人有三种算法。最后是靠一份写死的字段说明表收场的。',
      tags: ['Node.js', 'ECharts', 'SQLite'],
      link: '#',
      linkLabel: '打开项目',
      variant: 'chart',
      image: null,
    },
    {
      title: '这个网站',
      year: '2026',
      role: '设计 + 开发',
      summary:
        '你现在看的这个东西。手绘质感全部由 SVG 和 CSS 生成，没有一张图片素材，也没用任何模板。开门是 CSS 3D transform，滚动动画是 GSAP ScrollTrigger，文案全集中在 data/content.js 一个文件里。',
      tags: ['React', 'GSAP', 'Vite'],
      link: '#',
      linkLabel: '看源码',
      variant: 'web',
      image: null,
    },
    {
      // ← 示例项目，换成你自己的
      title: '课堂提问板',
      year: '2025',
      role: '独立完成',
      summary:
        '给学院老师做的一个随机点名 + 提问记录的小板子。本来只想解决「抽人回答问题」这一件事，结果被追加了记录、导出、分组、避免连续抽到同一个人。做这个才明白，需求不是一开始就有的，是一边用一边长出来的。',
      tags: ['React', 'IndexedDB'],
      link: '#',
      linkLabel: '打开项目',
      variant: 'web',
      image: null,
    },
    {
      // ← 示例项目，换成你自己的
      title: '配速器',
      year: '2025',
      role: '独立完成',
      summary:
        '跑步时用的极简配速器：一个大数字、两个按钮、没有账号没有社区。做它的原因是市面上的跑步 App 都太重，我只想知道现在这个速度能不能撑完全程。全程离线，装上就能用。',
      tags: ['React', 'Web Audio', 'PWA'],
      link: '#',
      linkLabel: '打开项目',
      variant: 'mobile',
      image: null,
    },
  ],
  /* 墙尾那几幅空画框。note 可以不写 */
  coming: [
    { note: '在做一个音乐可视化' },
    { note: '' },
    { note: '想试试 WebGL' },
    { note: '' },
  ],
}

/**
 * ← 技能清单。别列成「精通一切」，写你被问到能接住的程度。
 */
export const skills = [
  {
    group: '生存',
    items: ['会自己吃饭', '大小便能控制', '认识男女厕所', '会上网', '会算账'],
  },
  {
    group: '享福',
    items: ['玩原神', '美团常客', '饮料不断货', '晚睡晚起者'],
  },
  {
    group: '还在学',
    items: ['高数', '也够计概', '外卖领卷法则', '早八消失大法'],
  },
]

export const contact = {
  // ← 换成你的真实邮箱
  email: '18338556692@qq.com',
  lead: '找发呆搭子，干饭搭子，或者单纯无聊，都可以直接写信给我。',
  // ← 换成你的真实链接
  links: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: '简历 PDF', href: '#' },
    { label: '博客', href: '#' },
  ],
  signNote: '本站手写风格由 SVG 与 CSS 生成，没有用任何现成模板。',
}

export const footer = {
  // ← 也可以写你的英文名拼音
  copyright: 'Yangh',
  year: 2026,
}
