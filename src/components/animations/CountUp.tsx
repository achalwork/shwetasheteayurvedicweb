import { useEffect, useRef, useState } from 'react'; import { animate, useInView, useReducedMotion } from 'framer-motion'
export default function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null); const inView = useInView(ref, { once: true }); const reduce = useReducedMotion(); const [n, setN] = useState(reduce ? to : 0)
  useEffect(() => { if (!inView || reduce) return; const c = animate(0, to, { duration: 1.6, ease: [.22, 1, .36, 1], onUpdate: v => setN(Math.round(v)) }); return () => c.stop() }, [inView, to, reduce])
  return <span ref={ref}>{n}</span>
}
