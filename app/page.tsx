"use client"

import HeroLogo from "@/components/hero-logo"
import { motion, useScroll, useTransform, useViewportScroll } from "framer-motion"
import { useEffect } from "react"

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  useEffect(() => {
    const c = document.getElementById("snap-container")
    if (c) c.scrollTo({ top: 0 })
  }, [])
  
  return (
    <>
      <div id="snap-container" className="h-[calc(100dvh-64px)] overflow-y-auto snap-y snap-mandatory scroll-smooth">
      <HeroLogo />
      
      {/* Project-Centric Learning Cycle - Mario Level 1 */}
      <section className="relative flex h-[calc(100dvh-64px)] items-center justify-center overflow-hidden bg-background snap-start">
        {/* Mario-style clouds */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute top-20 left-10 w-16 h-8 bg-white rounded-full"
          />
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute top-32 left-32 w-20 h-10 bg-white rounded-full"
          />
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute top-16 right-20 w-12 h-6 bg-white rounded-full"
          />
        </div>

        {/* Floating code blocks */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-1/4 left-1/4 w-8 h-8 bg-yellow-400 rounded transform rotate-45"
          />
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute top-1/3 right-1/3 w-6 h-6 bg-red-500 rounded transform rotate-45"
          />
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute top-1/2 left-1/5 w-10 h-10 bg-green-500 rounded transform rotate-45"
          />
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold md:text-6xl"
          >
            Project-Centric Learning Cycle
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl"
          >
            Every 3–4 months, teams of four students pick a domain — AI & Data Science, Robotics & Automation, Web/App Development, Mechatronics, Research & Innovation, or Entrepreneurship — and build a real-world project from scratch.
          </motion.p>
        </div>
      </section>

      {/* Mentorship - Mario Level 2 */}
      <section className="relative flex h-[calc(100dvh-64px)] items-center justify-center overflow-hidden bg-background snap-start">
        {/* Floating coins */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 360, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-1/4 left-1/4 w-6 h-6 bg-yellow-400 rounded-full border-2 border-yellow-300"
          />
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, -360, 0]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute top-1/3 right-1/4 w-5 h-5 bg-yellow-400 rounded-full border-2 border-yellow-300"
          />
          <motion.div
            animate={{ 
              y: [0, -25, 0],
              rotate: [0, 360, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-1/2 left-1/3 w-7 h-7 bg-yellow-400 rounded-full border-2 border-yellow-300"
          />
        </div>

        {/* Bouncing stars */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              y: [0, -30, 0],
              x: [0, 10, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-1/5 left-1/5 w-4 h-4 bg-white transform rotate-45"
          />
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              x: [0, -15, 0],
              rotate: [0, -180, -360]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 0.8
            }}
            className="absolute top-1/6 right-1/5 w-3 h-3 bg-white transform rotate-45"
          />
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold md:text-6xl"
          >
            Mentorship from Industry-Recognized Experts
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl"
          >
            BuildIt connects students with mentors who have real-world experience — including those placed in Google Summer of Code (GSoC), JPMC (J.P. Morgan Chase), and other reputed tech organizations.
          </motion.p>
          </div>
      </section>

      {/* Integrated Digital Ecosystem - Mario Level 3 */}
      <section className="relative flex h-[calc(100dvh-64px)] items-center justify-center overflow-hidden bg-background snap-start">
        {/* Moving pipes/platforms */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              x: [0, 20, 0],
              y: [0, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute bottom-1/4 left-1/4 w-16 h-20 bg-green-600 rounded-t-lg"
          />
          <motion.div
            animate={{ 
              x: [0, -15, 0],
              y: [0, 5, 0]
            }}
            transition={{ 
              duration: 3.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-1/3 right-1/4 w-12 h-16 bg-green-600 rounded-t-lg"
          />
          <motion.div
            animate={{ 
              x: [0, 25, 0],
              y: [0, -8, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute bottom-1/5 left-1/2 w-14 h-18 bg-green-600 rounded-t-lg"
          />
        </div>

        {/* Floating power-ups */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 360, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-1/3 left-1/5 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
          >
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </motion.div>
          <motion.div
            animate={{ 
              y: [0, -25, 0],
              rotate: [0, -360, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 0.8
            }}
            className="absolute top-1/4 right-1/5 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
          >
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </motion.div>
          <motion.div
            animate={{ 
              y: [0, -35, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.15, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1.2
            }}
            className="absolute top-1/2 left-1/3 w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center"
          >
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </motion.div>
        </div>

        {/* Floating question blocks */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-1/5 left-1/6 w-6 h-6 bg-yellow-400 border-2 border-yellow-600 rounded"
          />
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute top-1/6 right-1/6 w-5 h-5 bg-yellow-400 border-2 border-yellow-600 rounded"
          />
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold md:text-6xl"
          >
            Integrated Digital Ecosystem
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl"
          >
            The BuildIt web platform serves as the central hub for all operations and engagement.
          </motion.p>
        </div>
      </section>
      </div>
    </>
  )
}
