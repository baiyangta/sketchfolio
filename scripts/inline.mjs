import { readFile, writeFile, rm } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * 把 dist-single 里的 CSS 和 JS 内联进 index.html。
 *
 * 为什么需要：浏览器的 file:// 协议会拦掉 <script type="module" src="..."> 的加载
 * （CORS，origin 是 null），所以交作业的版本必须把所有代码塞进 HTML 本身。
 * 内联的 module 脚本不经过网络请求，可以正常执行。
 */
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'dist-single')
const indexPath = join(outDir, 'index.html')

let html = await readFile(indexPath, 'utf8')

const readLocal = (p) => readFile(join(outDir, p.replace(/^\.?\//, '')), 'utf8')

// 1) <link rel="stylesheet" href="..."> → <style>...</style>
for (const m of [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)]) {
  const tag = m[0]
  const href = tag.match(/href="([^"]+)"/)?.[1]
  if (!href) continue
  // CSS 里的 url(../fonts/x) 是相对 assets/ 目录的；内联进根目录的 index.html 之后
  // 要改成 ./fonts/x，否则会跑到站点目录外面去
  const css = (await readLocal(href)).replace(/url\(\.\.\//g, 'url(./')
  // 用函数做替换：字符串里的 $& / $' 会被当成占位符，把标签又插一遍
  html = html.replace(tag, () => `<style>\n${css}\n</style>`)
}

// 2) <script type="module" src="..."></script> → <script type="module">...</script>
for (const m of [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/g)]) {
  const tag = m[0]
  const src = m[1]
  // 代码里的 </script> 会提前结束标签，转义掉
  const js = (await readLocal(src)).replace(/<\/script>/gi, '<\\/script>')
  html = html.replace(tag, () => `<script type="module">\n${js}\n</script>`)
}

// 3) 清掉用不上的 modulepreload / crossorigin
html = html
  .replace(/<link\b[^>]*rel="modulepreload"[^>]*>\s*/g, '')
  .replace(/\scrossorigin(="[^"]*")?/g, '')

await writeFile(indexPath, html, 'utf8')
await rm(join(outDir, 'assets'), { recursive: true, force: true })

console.log('[inline] 完成，index.html 现在 ' + (html.length / 1024).toFixed(0) + ' KB')
