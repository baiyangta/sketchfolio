import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { seoFallbackHtml, seoMeta } from './seo-fallback.js'

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/**
 * 两件事：
 * 1. 把静态正文塞进 #root，让不跑 JS 的抓取器也能读到内容
 * 2. 把 <title> 和各处 description 从 content.js 生成，改文案时不会漏
 */
function seoPlugin() {
  return {
    name: 'seo',
    transformIndexHtml(html) {
      const { title, description } = seoMeta()

      return html
        .replaceAll('%PAGE_TITLE%', esc(title))
        .replaceAll('%PAGE_DESC%', esc(description))
        .replaceAll('%OG_IMAGE%', esc(ogImage))
        .replace(
          '<div id="root"></div>',
          `<div id="root">${seoFallbackHtml()}</div>`,
        )
    },
  }
}

// GitHub Pages 的项目站部署在 /<仓库名>/ 下面，资源路径要带上这个前缀。
// Actions 里会自动有 GITHUB_REPOSITORY（owner/repo），本地开发时为空 → base 为 '/'。
// 仓库名叫 <用户名>.github.io 时是根路径，不用前缀。
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const base = repoName && !repoName.endsWith('.github.io') ? `/${repoName}/` : '/'

// 分享图必须是绝对地址。GitHub Pages 的地址是能算出来的，CI 里自动填对；
// 以后换成自己的域名，改这里就行。
const [repoOwner, repo] = (process.env.GITHUB_REPOSITORY ?? '').split('/')
const siteOrigin = repo
  ? repo.endsWith('.github.io')
    ? `https://${repo}`
    : `https://${repoOwner}.github.io/${repo}`
  : ''
const ogImage = siteOrigin ? `${siteOrigin}/og.png` : 'https://your-domain.com/og.png'

export default defineConfig(({ mode }) => {
  // 交作业用：单独出一个「双击就能开」的版本（相对路径 + CSS/JS 内联）
  const single = mode === 'single'

  return {
    base: single ? './' : base,
    build: single
      ? { outDir: 'dist-single', modulePreload: false }
      : undefined,
    plugins: [react(), seoPlugin()],
    server: {
      host: '127.0.0.1',
      port: 5178,
      strictPort: true,
    },
  }
})
