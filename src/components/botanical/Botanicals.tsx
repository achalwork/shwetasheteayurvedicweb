import type { SVGProps } from 'react'

/** Hand-built botanical line art. Colours follow `currentColor` so each placement can tint it. */

/** A vertical sprig: central stem with paired leaves that taper toward the tip. */
export function Sprig({ leaves = 8, filled = true, ...p }: SVGProps<SVGSVGElement> & { leaves?: number; filled?: boolean }) {
  const parts = []
  const step = 340 / leaves
  for (let i = 0; i < leaves; i++) {
    const y = 380 - i * step
    const s = 1 - i / (leaves * 1.6)
    const w = 52 * s, h = 62 * s
    for (const side of [-1, 1]) {
      const x = 60
      const tipX = x + side * w, tipY = y - h
      const d = `M${x} ${y} Q${x + side * w * 1.05} ${y - h * 0.15} ${tipX} ${tipY} Q${x + side * w * 0.05} ${y - h * 0.75} ${x} ${y}Z`
      parts.push(<path key={`${i}${side}`} d={d} fill={filled ? 'currentColor' : 'none'} fillOpacity={filled ? 0.1 : 0} />)
      parts.push(<path key={`v${i}${side}`} d={`M${x} ${y} L${x + side * w * 0.8} ${y - h * 0.8}`} strokeOpacity={0.5} />)
    }
  }
  return (
    <svg viewBox="0 0 120 400" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M60 396C58 300 63 190 60 28" />
      <path d={`M60 28 Q${60 + 10} 10 ${60} 4 Q${60 - 10} 10 60 28Z`} fill="currentColor" fillOpacity=".15" />
      {parts}
    </svg>
  )
}

/** Lotus: two rows of petals around a base point. */
export function Lotus(p: SVGProps<SVGSVGElement>) {
  const petal = (a: number, sc: number, op: number) => (
    <path
      key={`${a}-${sc}`}
      d="M100 118C78 92 80 48 100 10C120 48 122 92 100 118Z"
      transform={`translate(100 118) rotate(${a}) scale(${sc}) translate(-100 -118)`}
      fill="currentColor" fillOpacity={op}
    />
  )
  return (
    <svg viewBox="0 0 200 130" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true" {...p}>
      <g>{[-72, -48, 48, 72].map(a => petal(a, 0.9, 0.06))}</g>
      <g>{[-24, 24].map(a => petal(a, 1, 0.1))}</g>
      {petal(0, 1, 0.14)}
      <path d="M40 122Q100 112 160 122" strokeOpacity=".6" />
    </svg>
  )
}

/** Mandala-like ring of petals — used as a slow-rotating backdrop. */
export function Mandala({ petals = 24, ...p }: SVGProps<SVGSVGElement> & { petals?: number }) {
  const items = []
  for (let i = 0; i < petals; i++) {
    const a = (360 / petals) * i
    items.push(<path key={i} d="M200 200C190 160 190 110 200 62C210 110 210 160 200 200Z" transform={`rotate(${a} 200 200)`} />)
  }
  return (
    <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" {...p}>
      {items}
      {[196, 150, 104, 40].map(r => <circle key={r} cx="200" cy="200" r={r} strokeOpacity={r === 196 ? 0.5 : 0.7} strokeDasharray={r === 150 ? '2 6' : undefined} />)}
      <g strokeOpacity=".6">{Array.from({ length: 12 }, (_, i) => <path key={i} d="M200 160C206 176 206 190 200 204C194 190 194 176 200 160Z" transform={`rotate(${i * 30} 200 200)`} />)}</g>
    </svg>
  )
}

/** Single leaf with veins. */
export function Leaf(p: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 160" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true" {...p}>
      <path d="M50 155C8 120 6 50 50 5C94 50 92 120 50 155Z" fill="currentColor" fillOpacity=".08" />
      <path d="M50 155V12" />
      {[30, 55, 80, 105].map(y => <g key={y}><path d={`M50 ${y + 22}Q36 ${y + 10} 24 ${y - 2}`} strokeOpacity=".6" /><path d={`M50 ${y + 22}Q64 ${y + 10} 76 ${y - 2}`} strokeOpacity=".6" /></g>)}
    </svg>
  )
}

/** Divider: thin line with a small lotus-bud ornament in the centre. */
export function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 text-gold ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-current opacity-50" />
      <svg width="34" height="22" viewBox="0 0 34 22" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M17 20C11 15 11 7 17 1C23 7 23 15 17 20Z" fill="currentColor" fillOpacity=".15" />
        <path d="M17 20C8 18 3 12 2 7C8 8 13 12 17 20Z" /><path d="M17 20C26 18 31 12 32 7C26 8 21 12 17 20Z" />
      </svg>
      <span className="h-px flex-1 bg-current opacity-50" />
    </div>
  )
}

/** Brand mark for the navbar. */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" strokeOpacity=".5" />
      <path d="M20 30C14 26 14 17 20 9C26 17 26 26 20 30Z" fill="currentColor" fillOpacity=".15" />
      <path d="M20 30C12 29 8 24 7.5 19C13 19.5 17 23 20 30Z" /><path d="M20 30C28 29 32 24 32.5 19C27 19.5 23 23 20 30Z" />
    </svg>
  )
}
