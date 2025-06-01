'use client'

import { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Enhanced particle system with larger and brighter particles
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 4 + 2, // Increased size from 2+1 to 4+2
      opacity: Math.random() * 0.8 + 0.4, // Increased opacity from 0.6+0.2 to 0.8+0.4
    })

    // Increased particle count for more visual impact
    for (let i = 0; i < 80; i++) { // Increased from 60 to 80
      particles.push(createParticle())
    }

    let lastTime = 0
    const targetFPS = 30 // Maintained FPS for performance

    const animate = (currentTime: number) => {
      if (currentTime - lastTime < 1000 / targetFPS) {
        requestAnimationFrame(animate)
        return
      }

      lastTime = currentTime

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles with enhanced colors
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle with enhanced colors and glow
        ctx.save()
        ctx.globalAlpha = particle.opacity
        
        // Add glow effect
        ctx.shadowColor = '#3b82f6'
        ctx.shadowBlur = 10
        
        // Use brighter color variations
        const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981']
        const colorIndex = Math.floor((particle.x + particle.y) / 200) % colors.length
        ctx.fillStyle = colors[colorIndex]
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-80"
      style={{ background: 'linear-gradient(45deg, #0f0f23, #1a1a2e, #16213e)' }}
    />
  )
} 