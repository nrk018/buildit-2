"use client"

import { motion, useScroll, useTransform } from "framer-motion"

export default function SimpleScrollIndicator() {
  const { scrollYProgress } = useScroll()
  
  return (
    <div className="fixed top-1/2 right-6 z-50 h-40 w-2 -translate-y-1/2 rounded-full bg-muted/30 overflow-hidden">
      <motion.div
        className="w-full bg-[color:var(--brand-yellow)]"
        style={{ scaleY: scrollYProgress }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: scrollYProgress }}
        transition={{ duration: 0.1 }}
      />
    </div>
  )
}
