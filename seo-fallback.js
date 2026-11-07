import { profile, about, gallery, skills, contact, footer } from './src/data/content.js'

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/**
 * 标题和描述也从 content.js 生成，避免改了文案忘了改 <title>。
 * 返回纯文本，由 vite.config 负责转义和注入。
 */
export function seoMeta() {
  return {
    title: `${profile.name} · ${profile.role}`,
    description: about.lead,
  }
}

/**
 * 构建时生成的一段静态 HTML，塞进 <div id="root"> 里。
 *
 * 目的：不执行 JS 的抓取器（百度、微信/QQ 的分享预览、各种 SEO 工具）
 * 也能读到真实正文，而不是一个空的 #root。
 *
 * 有 JS 的浏览器：<head> 里那行脚本给 <html> 加了 .js，
 * #seo-fallback 立刻 display:none，React 挂载时连同容器内容一起替换掉，
 * 所以用户看不到这段东西。
 */
export function seoFallbackHtml() {
  const items = gallery.items
    .map(
      (item) => `
      <li>
        <h3>${esc(item.title)}（${esc(item.year)}）</h3>
        <p>${esc(item.summary)}</p>
        <p>技术栈：${esc(item.tags.join('、'))}</p>
        <p>${esc(item.role)}　<a href="${esc(item.link)}">${esc(item.linkLabel)}</a></p>
      </li>`,
    )
    .join('')

  const skillGroups = skills
    .map(
      (g) => `
      <h3>${esc(g.group)}</h3>
      <ul>${g.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`,
    )
    .join('')

  return `
  <div id="seo-fallback">
    <h1>${esc(profile.name)}</h1>
    <p>${esc(profile.role)}</p>
    <p>${esc(profile.tagline)}</p>

    <h2>关于我</h2>
    <p>${esc(about.lead)}</p>
    ${about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}
    <ul>${about.facts.map((f) => `<li>${esc(f.label)}：${esc(f.value)}</li>`).join('')}</ul>

    <h2>画廊</h2>
    <p>${esc(gallery.intro)}</p>
    <ul>${items}</ul>

    <h2>会什么</h2>
    ${skillGroups}

    <h2>联系我</h2>
    <p>${esc(contact.lead)}</p>
    <p>邮箱：<a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></p>
    <ul>${contact.links.map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`).join('')}</ul>
    <p>© ${esc(footer.year)} ${esc(footer.copyright)}</p>
  </div>`
}
