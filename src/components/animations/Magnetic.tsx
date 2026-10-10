import { motion, useMotionValue, useSpring } from 'framer-motion'; import type { ReactNode } from 'react'
export default function Magnetic({ children }: { children: ReactNode }) {
  const x = useMotionValue(0), y = useMotionValue(0); const sx = useSpring(x, { stiffness: 200, damping: 18 }), sy = useSpring(y, { stiffness: 200, damping: 18 })
  return <motion.div className="inline-block" style={{ x: sx, y: sy }} onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * .2); y.set((e.clientY - r.top - r.height / 2) * .2) }} onMouseLeave={() => { x.set(0); y.set(0) }}>{children}</motion.div>
}
