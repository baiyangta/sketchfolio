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
  intro: '这世上本没有画廊，不知怎么招就有了',
  items: [
    {
      title: '游戏小资历',
      year: '2026',
      role: '独立完成',
      summary:
        '原神剧情向玩家，不喜欢跑图却有一大堆跑图角色；王者刚上非凡王者；我的世界会玩一些远古整合包，前不久喜欢玩slg游戏；恶魔轮盘被舍友打成孙子；玩天际线迫害市民。',
      tags: ['yuanshen', 'wangzhe', 'tianjixian'],
      link: 'https://ys.mihoyo.com/cloud/#/',
      linkLabel: '原神启动！',
      variant: 'web',
      image: "/shots/genshin.jpg",
    },
    {
      title: '迫害AI者',
      year: '2026',
      role: 'AI受害者',
      summary:
        '喜欢压力豆包，关键问题还要靠gpt和ds,万恶的计概上机离不开ds,肥鱼虽然吃白饭，但偶尔很可爱，养了条会看B站的鱼，平时逗一逗，挺有趣。',
      tags: ['蠢豆包', '计概', 'token'],
      link: 'https://www.deepseek.com/',
      linkLabel: '打开项目',
      variant: 'mobile',
      image: "/shots/fish.jpg",
    },
    {
      title: '看星星',
      year: '2026',
      role: 'viewer',
      summary:
        '刚加入青天会（某祈雨司分司），参加过一次例行观测，两次户外观测一次没抢到，看到过海王星，以及月亮的麻子脸。',
      tags: ['fly me to the moon', 'Earth', 'Neptune'],
      link: 'https://stellarium.org',
      linkLabel: '打开项目',
      variant: 'chart',
      image: "/shots/moon.jpg",
    },
    {
      title: '这个网站',
      year: '2026',
      role: '设计 ',
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
      title: '水獭',
      year: '2026',
      role: '独立发现',
      summary:
        '喜欢动植物，国庆刚去过动物园，独立观测到水獭，尝试过养花，但无一例外以失败告终。',
      tags: ['otter', 'zoo'],
      link: 'https://www.bilibili.com/bangumi/play/ss20302',
      linkLabel: '地球脉动',
      variant: 'web',
      image: "/shots/otter.jpg",
    },
    {
      // ← 示例项目，换成你自己的
      title: '赛里木湖',
      year: '2026',
      role: 'viewer',
      summary:
        '暑假去了新疆，到了国境线不远处的赛里木湖',
      tags: ['赛里木湖', '丁达尔效应', '雨'],
      link: '#',
      linkLabel: '打开项目',
      variant: 'mobile',
      image: "/shots/sayram.jpg",
    },
  ],
  /* 墙尾那几幅空画框。note 可以不写 */
  coming: [
    { note: '在听音乐' },
    { note: '' },
    { note: 'eva' },
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
