'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
}

interface DataPacket {
  fromIndex: number
  toIndex: number
  progress: number
  speed: number
}

const MeshBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateSize()
    window.addEventListener('resize', updateSize)

    // Create static grid nodes
    const nodeCount = 25
    const nodes: Node[] = []
    const connectionDistance = 300
    
    // Create evenly distributed grid
    const cols = 5
    const rows = 5
    const marginX = canvas.width * 0.1
    const marginY = canvas.height * 0.15 // Increased top margin for navbar
    const spacingX = (canvas.width - marginX * 2) / (cols - 1)
    const spacingY = (canvas.height - marginY * 2) / (rows - 1)

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        nodes.push({
          x: marginX + j * spacingX,
          y: marginY + i * spacingY
        })
      }
    }

    // Data packets for transmission animation
    const dataPackets: DataPacket[] = []

    // Create data packet
    const createDataPacket = () => {
      const fromIndex = Math.floor(Math.random() * nodes.length)
      let toIndex = Math.floor(Math.random() * nodes.length)
      
      while (toIndex === fromIndex) {
        toIndex = Math.floor(Math.random() * nodes.length)
      }

      const from = nodes[fromIndex]
      const to = nodes[toIndex]
      const distance = Math.hypot(to.x - from.x, to.y - from.y)

      if (distance < connectionDistance) {
        dataPackets.push({
          fromIndex,
          toIndex,
          progress: 0,
          speed: 0.008
        })
      }
    }

    // Create packets periodically
    const packetInterval = setInterval(() => {
      if (dataPackets.length < 4) {
        createDataPacket()
      }
    }, 1500)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x
          const dy = nodes[j].y - nodes[i].y
          const distance = Math.hypot(dx, dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)'
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Update and draw data packets
      for (let i = dataPackets.length - 1; i >= 0; i--) {
        const packet = dataPackets[i]
        packet.progress += packet.speed

        if (packet.progress >= 1) {
          dataPackets.splice(i, 1)
          continue
        }

        const from = nodes[packet.fromIndex]
        const to = nodes[packet.toIndex]

        const x = from.x + (to.x - from.x) * packet.progress
        const y = from.y + (to.y - from.y) * packet.progress

        // Simple glowing dot
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8)
        gradient.addColorStop(0, '#06b6d4')
        gradient.addColorStop(1, 'rgba(6, 182, 212, 0)')

        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      // Draw simple nodes
      nodes.forEach(node => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(6, 182, 212, 0.4)'
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateSize)
      clearInterval(packetInterval)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-30 pointer-events-none"
    />
  )
}

export default MeshBackground
