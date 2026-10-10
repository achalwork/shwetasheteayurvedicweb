import { motion } from 'framer-motion'
import photo from '../../assets/portrait.webp'

export default function Portrait() {
  return (
    <motion.figure
      className="relative"
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
    >
      <div
        aria-hidden
        className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] border-2 border-saffron"
      />
      <motion.div
        className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] bg-mint shadow-[0_20px_60px_-20px_rgba(6,35,31,.6)]"
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={{ clipPath: 'inset(0% 0 0 0)' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={photo}
          alt="Dr. Shweta Sanjay Shete in a white coat"
          width={720}
          height={900}
          fetchPriority="high"
          className="h-full w-full object-cover object-top"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </motion.figure>
  )
}
