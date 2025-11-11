'use client'

import { useEffect, useRef } from 'react'

interface City {
  name: string
  lat: number
  lon: number
  color: string
}

const RotatingGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size (larger for zoom effect)
    const size = 800
    canvas.width = size
    canvas.height = size

    const centerX = size / 2
    const centerY = size / 2
    const radius = 300 // Increased radius for zoom

    let rotation = 0

    // Major cities for data points
    const cities: City[] = [
      { name: 'Tokyo', lat: 35.6762, lon: 139.6503, color: '#06b6d4' },
      { name: 'New York', lat: 40.7128, lon: -74.0060, color: '#a855f7' },
      { name: 'London', lat: 51.5074, lon: -0.1278, color: '#06b6d4' },
      { name: 'Singapore', lat: 1.3521, lon: 103.8198, color: '#ec4899' },
      { name: 'San Francisco', lat: 37.7749, lon: -122.4194, color: '#8b5cf6' },
      { name: 'Sydney', lat: -33.8688, lon: 151.2093, color: '#06b6d4' },
      { name: 'Berlin', lat: 52.5200, lon: 13.4050, color: '#a855f7' },
      { name: 'Dubai', lat: 25.2048, lon: 55.2708, color: '#ec4899' },
    ]

    // Data connections between cities
    const connections = [
      [0, 1], // Tokyo - New York
      [0, 3], // Tokyo - Singapore
      [1, 2], // New York - London
      [2, 6], // London - Berlin
      [3, 5], // Singapore - Sydney
      [4, 1], // San Francisco - New York
      [7, 2], // Dubai - London
    ]

    let animationProgress = 0

    const latLonToRadians = (lat: number, lon: number) => ({
      lat: (lat * Math.PI) / 180,
      lon: (lon * Math.PI) / 180
    })

    const projectPoint = (lat: number, lon: number, rot: number) => {
      const adjustedLon = lon + rot

      const x = radius * Math.cos(lat) * Math.sin(adjustedLon)
      const y = radius * Math.sin(lat)
      const z = radius * Math.cos(lat) * Math.cos(adjustedLon)

      const scale = 400 / (400 + z)
      
      return {
        x: centerX + x * scale,
        y: centerY - y * scale,
        z: z,
        scale: scale,
        visible: z > -50 // Show only front half (adjusted threshold)
      }
    }

    const drawCurvedConnection = (city1: City, city2: City, progress: number) => {
      const pos1Rad = latLonToRadians(city1.lat, city1.lon)
      const pos2Rad = latLonToRadians(city2.lat, city2.lon)
      
      const point1 = projectPoint(pos1Rad.lat, pos1Rad.lon, rotation)
      const point2 = projectPoint(pos2Rad.lat, pos2Rad.lon, rotation)

      // Only draw if both points are visible on front half
      if (!point1.visible || !point2.visible) return

      // Draw curved path
      const steps = 30
      ctx.beginPath()
      
      for (let i = 0; i <= steps; i++) {
        const t = i / steps
        
        // Interpolate between cities using great circle
        const latMid = pos1Rad.lat + (pos2Rad.lat - pos1Rad.lat) * t
        const lonMid = pos1Rad.lon + (pos2Rad.lon - pos1Rad.lon) * t
        
        // Add arc height
        const height = Math.sin(t * Math.PI) * 0.3
        const radWithHeight = radius * (1 + height)
        
        const x = radWithHeight * Math.cos(latMid) * Math.sin(lonMid + rotation)
        const y = radWithHeight * Math.sin(latMid)
        const z = radWithHeight * Math.cos(latMid) * Math.cos(lonMid + rotation)
        
        const scale = 400 / (400 + z)
        const px = centerX + x * scale
        const py = centerY - y * scale
        
        if (i === 0) {
          ctx.moveTo(px, py)
        } else {
          ctx.lineTo(px, py)
        }
      }
      
      ctx.strokeStyle = `rgba(6, 182, 212, 0.3)`
      ctx.lineWidth = 1
      ctx.stroke()

      // Animated data packet
      if (progress < 1) {
        const t = progress
        const latMid = pos1Rad.lat + (pos2Rad.lat - pos1Rad.lat) * t
        const lonMid = pos1Rad.lon + (pos2Rad.lon - pos1Rad.lon) * t
        const height = Math.sin(t * Math.PI) * 0.3
        const radWithHeight = radius * (1 + height)
        
        const point = projectPoint(latMid, lonMid, 0)
        
        // Draw glowing packet
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 8)
        gradient.addColorStop(0, 'rgba(6, 182, 212, 1)')
        gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.5)')
        gradient.addColorStop(1, 'rgba(6, 182, 212, 0)')
        
        ctx.beginPath()
        ctx.arc(point.x, point.y, 8, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
      ctx.fillRect(0, 0, size, size)

      rotation += 0.003
      animationProgress = (animationProgress + 0.008) % 1

      // Draw latitude lines (thinner, more lines)
      for (let i = 0; i <= 30; i++) {
        const lat = (Math.PI * i) / 30 - Math.PI / 2
        ctx.beginPath()
        
        let hasVisiblePoint = false
        for (let j = 0; j <= 60; j++) {
          const lon = (2 * Math.PI * j) / 60
          const point = projectPoint(lat, lon, rotation)
          
          if (point.visible) {
            hasVisiblePoint = true
            if (j === 0 || !hasVisiblePoint) {
              ctx.moveTo(point.x, point.y)
            } else {
              ctx.lineTo(point.x, point.y)
            }
          } else if (hasVisiblePoint) {
            // Break the line when transitioning to invisible
            ctx.stroke()
            ctx.beginPath()
            hasVisiblePoint = false
          }
        }
        
        const alpha = 0.15 + Math.abs(Math.sin(lat)) * 0.1
        ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Draw longitude lines
      for (let i = 0; i <= 30; i++) {
        const lon = (2 * Math.PI * i) / 30
        ctx.beginPath()
        
        let hasVisiblePoint = false
        for (let j = 0; j <= 60; j++) {
          const lat = (Math.PI * j) / 60 - Math.PI / 2
          const point = projectPoint(lat, lon, rotation)
          
          if (point.visible) {
            hasVisiblePoint = true
            if (j === 0 || !hasVisiblePoint) {
              ctx.moveTo(point.x, point.y)
            } else {
              ctx.lineTo(point.x, point.y)
            }
          } else if (hasVisiblePoint) {
            ctx.stroke()
            ctx.beginPath()
            hasVisiblePoint = false
          }
        }
        
        ctx.strokeStyle = `rgba(168, 85, 247, 0.15)`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Draw data connections
      connections.forEach((connection, index) => {
        const delay = index * 0.15
        const adjustedProgress = ((animationProgress - delay + 1) % 1)
        drawCurvedConnection(cities[connection[0]], cities[connection[1]], adjustedProgress)
      })

      // Draw cities
      cities.forEach(city => {
        const pos = latLonToRadians(city.lat, city.lon)
        const point = projectPoint(pos.lat, pos.lon, rotation)
        
        if (point.visible) {
          // Outer glow
          const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 12)
          gradient.addColorStop(0, city.color + 'ff')
          gradient.addColorStop(0.5, city.color + '88')
          gradient.addColorStop(1, city.color + '00')
          
          ctx.beginPath()
          ctx.arc(point.x, point.y, 12, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
          
          // Inner dot
          ctx.beginPath()
          ctx.arc(point.x, point.y, 3, 0, Math.PI * 2)
          ctx.fillStyle = city.color
          ctx.fill()
          
          // Pulsing ring
          ctx.beginPath()
          ctx.arc(point.x, point.y, 6 + Math.sin(Date.now() / 500 + cities.indexOf(city)) * 2, 0, Math.PI * 2)
          ctx.strokeStyle = city.color + '66'
          ctx.lineWidth = 1.5
          ctx.stroke()
        }
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-1/2 right-[-100px] -translate-y-1/2 opacity-40 pointer-events-none"
      style={{ width: '800px', height: '800px' }}
    />
  )
}

export default RotatingGlobe
