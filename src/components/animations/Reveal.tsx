import { motion } from 'framer-motion'; import type { ReactNode } from 'react'
export const Rv = ({ children, d = 0, className = '' }: { children: ReactNode; d?: number; className?: string }) =>
  <motion.div className={className} initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .7, delay: d, ease: [.22, 1, .36, 1] }}>{children}</motion.div>
export const Heading = ({ children, className = '' }: { children: string; className?: string }) => (
  <h2 className={className} aria-label={children}>{children.split(' ').map((w, i) => <span key={i} aria-hidden className="inline-block overflow-hidden pb-1 align-bottom"><motion.span className="inline-block" initial={{ y: '110%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: .7, delay: i * .06, ease: [.22, 1, .36, 1] }}>{w}&nbsp;</motion.span></span>)}</h2>)
