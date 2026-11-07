/**
 * 项目缩略图：纯手绘 SVG 涂鸦，没有图片资源。
 * variant: 'web' | 'mobile' | 'chart'
 */
export default function SketchThumb({ variant = 'web' }) {
  return (
    <svg className="thumb" viewBox="0 0 320 180" role="img" aria-label="项目示意图">
      {variant === 'web' && <WebDoodle />}
      {variant === 'mobile' && <MobileDoodle />}
      {variant === 'chart' && <ChartDoodle />}
      {!['web', 'mobile', 'chart'].includes(variant) && <WebDoodle />}
    </svg>
  )
}

function WebDoodle() {
  return (
    <g>
      {/* 窗口 */}
      <rect x="18" y="20" width="284" height="140" rx="3" />
      <line x1="18" y1="42" x2="302" y2="42" />
      <circle cx="31" cy="31" r="2.6" />
      <circle cx="41" cy="31" r="2.6" />
      <circle cx="51" cy="31" r="2.6" />

      {/* 左侧文字块 */}
      <rect className="ink-fill" x="34" y="58" width="96" height="16" rx="2" />
      <line x1="34" y1="90" x2="140" y2="90" />
      <line x1="34" y1="102" x2="124" y2="102" />
      <line x1="34" y1="114" x2="134" y2="114" />
      <rect
        className="ink-accent dash-draw"
        x="34"
        y="128"
        width="62"
        height="17"
        rx="8.5"
        strokeDasharray="9 7"
      />

      {/* 右侧图块 */}
      <rect className="ink-fill" x="166" y="58" width="120" height="86" rx="3" />
      <line x1="166" y1="122" x2="286" y2="122" />
      <line x1="196" y1="58" x2="196" y2="144" />
    </g>
  )
}

function MobileDoodle() {
  return (
    <g>
      <rect x="126" y="14" width="68" height="152" rx="11" />
      <line x1="150" y1="24" x2="170" y2="24" />

      <rect className="ink-fill" x="138" y="38" width="44" height="12" rx="2" />
      <line x1="138" y1="62" x2="182" y2="62" />
      <line x1="138" y1="73" x2="170" y2="73" />
      <line x1="138" y1="84" x2="178" y2="84" />
      <line x1="138" y1="95" x2="162" y2="95" />
      <line x1="138" y1="106" x2="176" y2="106" />

      <rect
        className="ink-accent dash-draw"
        x="138"
        y="120"
        width="44"
        height="16"
        rx="8"
        strokeDasharray="8 6"
      />
      <circle cx="160" cy="151" r="4.5" />

      {/* 旁边的装饰箭头，暗示手机上能点 */}
      <path className="ink-accent" d="M206 62 C 218 58, 224 68, 216 76 C 210 82, 200 80, 198 72" />
      <line className="ink-accent" x1="198" y1="72" x2="204" y2="68" />
      <line className="ink-accent" x1="198" y1="72" x2="205" y2="76" />
    </g>
  )
}

function ChartDoodle() {
  return (
    <g>
      <line x1="40" y1="22" x2="40" y2="150" />
      <line x1="40" y1="150" x2="292" y2="150" />

      <line x1="40" y1="116" x2="292" y2="116" strokeDasharray="3 6" opacity="0.6" />
      <line x1="40" y1="82" x2="292" y2="82" strokeDasharray="3 6" opacity="0.6" />

      <rect x="66" y="96" width="20" height="54" />
      <rect className="ink-fill" x="102" y="72" width="20" height="78" />
      <rect x="138" y="104" width="20" height="46" />
      <rect className="ink-fill" x="174" y="56" width="20" height="94" />
      <rect x="210" y="86" width="20" height="64" />

      <path
        className="ink-accent dash-draw"
        d="M58 108 C 86 100, 100 70, 128 84 C 156 98, 168 52, 196 48 C 224 44, 246 66, 272 60"
        strokeDasharray="10 8"
      />
      <circle className="ink-accent" cx="272" cy="60" r="3.4" />
    </g>
  )
}
