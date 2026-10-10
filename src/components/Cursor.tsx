import { useEffect, useState } from 'react'; import { motion, useMotionValue, useSpring } from 'framer-motion'
export default function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100); const sx = useSpring(x, { stiffness: 500, damping: 40 }), sy = useSpring(y, { stiffness: 500, damping: 40 })
  const [on, setOn] = useState(false); const [big, setBig] = useState(false)
  useEffect(() => {
    if (!matchMedia('(pointer:fine)').matches || matchMedia('(prefers-reduced-motion:reduce)').matches) return
    setOn(true); const m = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); setBig(!!(e.target as HTMLElement).closest('a,button,summary,input,select,textarea,label')) }
    window.addEventListener('mousemove', m); return () => window.removeEventListener('mousemove', m) }, [x, y])
  return on ? <><motion.div aria-hidden style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[90]"><div className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-saffron"/></motion.div><motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[90]"><motion.div animate={{ scale: big ? 2.4 : 1 }} className="-ml-2 -mt-2 h-4 w-4 rounded-full border border-saffron bg-saffron/10"/></motion.div></> : null
}
