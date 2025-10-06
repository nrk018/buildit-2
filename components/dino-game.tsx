"use client"

import { useEffect, useRef, useState } from "react"

type V = { x: number; y: number; w: number; h: number; vx?: number; vy?: number }

export default function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [running, setRunning] = useState(true)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    let raf = 0
    let last = performance.now()
    const gravity = 1800
    const groundY = 140
    const dino: V = { x: 40, y: groundY - 40, w: 36, h: 40, vy: 0 }
    const cactus: V = { x: 360, y: groundY - 36, w: 16, h: 36, vx: -300 }
    const clouds: V[] = [
      { x: 120, y: -10, w: 60, h: 24, vx: -30 },
      { x: 280, y: -30, w: 80, h: 30, vx: -20 },
    ]

    function restart() {
      dino.y = groundY - dino.h
      dino.vy = 0
      cactus.x = canvas.width + 40
      setScore(0)
      setRunning(true)
    }

    function jump() {
      if (Math.abs(dino.y - (groundY - dino.h)) < 1) {
        dino.vy = -650
      }
    }

    function onKey(e: KeyboardEvent) {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault()
        jump()
      }
      if (e.code === "KeyR") restart()
      if (e.code === "KeyP") setRunning((r) => !r)
    }
    window.addEventListener("keydown", onKey)

    function update(dt: number) {
      if (!running) return
      dino.vy! += gravity * dt
      dino.y += dino.vy! * dt
      if (dino.y > groundY - dino.h) {
        dino.y = groundY - dino.h
        dino.vy = 0
      }
      cactus.x += cactus.vx! * dt
      if (cactus.x + cactus.w < 0) {
        cactus.x = canvas.width + 60 + Math.random() * 120
        setScore((s) => s + 1)
      }
      for (const c of clouds) {
        c.x += (c.vx || -20) * dt
        if (c.x + c.w < 0) c.x = canvas.width + Math.random() * 120
      }
      // collision AABB
      if (
        dino.x < cactus.x + cactus.w &&
        dino.x + dino.w > cactus.x &&
        dino.y < cactus.y + cactus.h &&
        dino.y + dino.h > cactus.y
      ) {
        setRunning(false)
      }
    }

    function draw() {
      const fg = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim() || "#eef0f3"
      const border = "rgba(255,255,255,0.2)"
      const brand = getComputedStyle(document.documentElement).getPropertyValue("--brand-yellow").trim() || "#f5d10a"

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Keep canvas completely transparent

      // ground line - subtle background element
      ctx.strokeStyle = border
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, groundY + 2)
      ctx.lineTo(canvas.width, groundY + 2)
      ctx.stroke()

      // clouds - very subtle background
      ctx.fillStyle = "rgba(255,255,255,0.05)"
      for (const c of clouds) {
        ctx.beginPath()
        ;(ctx as any).roundRect?.(c.x, c.y + 40, c.w, c.h, 8)
        ctx.fill()
      }

      // cactus - subtle background element
      ctx.fillStyle = brand + "40" // Add transparency
      ctx.fillRect(cactus.x, cactus.y, cactus.w, cactus.h)

      // dino - subtle background element
      ctx.fillStyle = fg + "60" // Add transparency
      ctx.beginPath()
      ;(ctx as any).roundRect?.(dino.x, dino.y, dino.w, dino.h, 6)
      ctx.fill()

      // score + hint - subtle for background
      ctx.fillStyle = fg + "40"
      ctx.font = "500 10px ui-sans-serif"
      ctx.fillText(`Score: ${score}`, canvas.width - 90, 18)
      if (!running) {
        ctx.fillStyle = brand + "60"
        ctx.font = "600 12px ui-sans-serif"
        ctx.fillText("Game Over - press R to restart", 20, 20)
      }
    }

    function loop(now: number) {
      const dt = Math.min(0.033, (now - last) / 1000)
      last = now
      update(dt)
      draw()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("keydown", onKey)
    }
  }, [running])

  return (
    <div className="absolute bottom-0 left-0 right-0 z-0 w-full h-32 pointer-events-none">
      <div className="absolute top-1 left-4 right-4 flex items-center justify-between pointer-events-auto">
        <h3 className="text-xs tracking-wide text-foreground/40">Dino Run</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground/30">
          <span>Space/↑: Jump</span>
          <span>P: Pause</span>
          <span>R: Restart</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24">
        <canvas ref={canvasRef} width={420} height={180} className="w-full h-full object-cover" />
      </div>
    </div>
  )
}
