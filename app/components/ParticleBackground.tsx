'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  size: number
  speedX: number
  speedY: number
  speedZ: number
  opacity: number
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Create particles with 3D perspective
    const particleCount = 100
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        speedZ: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3
      })
    }

    // Grid settings
    const gridSize = 50
    const gridDepth = 500
    let gridOffset = 0

    // Animation loop
    const animate = () => {
      // Clear canvas with slight fade for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw animated grid/mesh
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)'
      ctx.lineWidth = 1

      // Vertical lines (moving forward in Z-space)
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let z = 0; z < gridDepth; z += gridSize) {
          const depth = (z + gridOffset) % gridDepth
          const scale = 1 - depth / gridDepth
          const alpha = scale * 0.3

          if (scale > 0.1) {
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`
            const startY = canvas.height / 2 - (depth * 0.5)
            const endY = canvas.height / 2 + (depth * 0.5)
            const offsetX = (x - canvas.width / 2) * scale + canvas.width / 2

            ctx.beginPath()
            ctx.moveTo(offsetX, startY)
            ctx.lineTo(offsetX, endY)
            ctx.stroke()
          }
        }
      }

      // Horizontal lines (moving forward in Z-space)
      for (let y = 0; y < canvas.height; y += gridSize) {
        for (let z = 0; z < gridDepth; z += gridSize) {
          const depth = (z + gridOffset) % gridDepth
          const scale = 1 - depth / gridDepth
          const alpha = scale * 0.3

          if (scale > 0.1) {
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`
            const offsetY = (y - canvas.height / 2) * scale + canvas.height / 2
            const startX = canvas.width / 2 - (canvas.width / 2) * scale
            const endX = canvas.width / 2 + (canvas.width / 2) * scale

            ctx.beginPath()
            ctx.moveTo(startX, offsetY)
            ctx.lineTo(endX, offsetY)
            ctx.stroke()
          }
        }
      }

      // Update grid offset for animation
      gridOffset = (gridOffset + 1.5) % gridDepth

      // Draw particles with 3D depth
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.z -= particle.speedZ

        // Reset particle if it goes too close
        if (particle.z < 1) {
          particle.z = 1000
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
        }

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Calculate 3D perspective
        const scale = 1000 / (1000 + particle.z)
        const x2d = (particle.x - canvas.width / 2) * scale + canvas.width / 2
        const y2d = (particle.y - canvas.height / 2) * scale + canvas.height / 2
        const size = particle.size * scale

        // Draw particle
        ctx.beginPath()
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity * scale})`
        ctx.fill()

        // Draw connections between close particles
        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const dz = particle.z - otherParticle.z
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (distance < 150) {
            const otherScale = 1000 / (1000 + otherParticle.z)
            const otherX2d = (otherParticle.x - canvas.width / 2) * otherScale + canvas.width / 2
            const otherY2d = (otherParticle.y - canvas.height / 2) * otherScale + canvas.height / 2

            ctx.beginPath()
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 * (1 - distance / 150) * scale})`
            ctx.lineWidth = 0.5
            ctx.moveTo(x2d, y2d)
            ctx.lineTo(otherX2d, otherY2d)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  )
}

export default ParticleBackground
