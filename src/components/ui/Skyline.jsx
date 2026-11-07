import { useMemo } from 'react'

/* 固定种子的伪随机，保证每次刷新天际线一模一样 */
function mulberry32(a) {
  return function next() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * 生成一条手画的楼房天际线：一栋接一栋，楼顶偶尔冒个天线。
 * 顶点带一点随机抖动，所以线不是尺子画的。
 */
function buildSkyline(seed, { width, base, minW, maxW, minH, maxH }) {
  const rnd = mulberry32(seed)
  const j = (k = 1.6) => (rnd() - 0.5) * k
  let d = ''
  let x = -12

  d += `M ${x} ${base} `

  while (x < width + 12) {
    const w = minW + rnd() * (maxW - minW)
    const h = minH + rnd() * (maxH - minH)
    const top = base - h

    // 左侧墙体
    d += `L ${(x + j()).toFixed(1)} ${top.toFixed(1)} `

    // 偶尔来个屋顶小凸起
    if (rnd() > 0.62) {
      const bw = 6 + rnd() * 12
      d += `L ${(x + bw * 0.35 + j(1)).toFixed(1)} ${(top - 5 - rnd() * 9).toFixed(1)} `
      d += `L ${(x + bw + j(1)).toFixed(1)} ${top.toFixed(1)} `
    }

    // 右侧墙体
    d += `L ${(x + w + j()).toFixed(1)} ${top.toFixed(1)} `
    d += `L ${(x + w + j()).toFixed(1)} ${base} `

    x += w
  }

  d += `L ${width + 12} ${base}`
  return d
}

/* 楼上的小窗户：一堆短竖线 */
function buildWindows(seed, { width, base, count }) {
  const rnd = mulberry32(seed)
  let d = ''
  for (let i = 0; i < count; i += 1) {
    const x = rnd() * width
    const y = base - rnd() * 70
    d += `M ${x.toFixed(1)} ${y.toFixed(1)} l 0 ${(3 + rnd() * 4).toFixed(1)} `
  }
  return d
}

export default function Skyline() {
  const far = useMemo(
    () =>
      buildSkyline(17, {
        width: 1600,
        base: 170,
        minW: 30,
        maxW: 78,
        minH: 26,
        maxH: 86,
      }),
    [],
  )

  const near = useMemo(
    () =>
      buildSkyline(93, {
        width: 1600,
        base: 178,
        minW: 46,
        maxW: 118,
        minH: 40,
        maxH: 130,
      }),
    [],
  )

  const windows = useMemo(
    () => buildWindows(41, { width: 1600, base: 168, count: 90 }),
    [],
  )

  return (
    <svg
      className="wall__sky"
      viewBox="0 0 1600 180"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <path className="sky-far" d={far} />
      <path className="sky-far" d={windows} strokeWidth="1" />
      <path className="sky-near" d={near} />
      <path className="sky-far" d={windows} strokeWidth="1" />
    </svg>
  )
}
