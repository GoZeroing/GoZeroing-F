import { useRef, useEffect } from 'react'
import styled from 'styled-components'

interface AudioWaveformProps {
  isActive: boolean
  frequency: number[]
  volume: number
}

const WaveformContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`

const WaveformCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
`

export default function AudioWaveform({ isActive, frequency, volume }: AudioWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) * 0.8

    let angle = 0

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (isActive && frequency.length > 0) {
        // Draw frequency-based waveform
        ctx.strokeStyle = `rgba(0, 255, 136, ${Math.max(0.3, volume / 255)})`
        ctx.lineWidth = 2
        ctx.beginPath()

        const segments = 128
        for (let i = 0; i < segments; i++) {
          const freqIndex = Math.floor((i / segments) * frequency.length)
          const amplitude = (frequency[freqIndex] / 255) * 50
          const waveAngle = (i / segments) * Math.PI * 2 + angle

          const x = centerX + Math.cos(waveAngle) * (radius + amplitude)
          const y = centerY + Math.sin(waveAngle) * (radius + amplitude)

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.closePath()
        ctx.stroke()

        // Draw inner waveform
        ctx.strokeStyle = `rgba(102, 126, 234, ${Math.max(0.5, volume / 200)})`
        ctx.lineWidth = 1
        ctx.beginPath()

        for (let i = 0; i < segments; i++) {
          const freqIndex = Math.floor((i / segments) * frequency.length)
          const amplitude = (frequency[freqIndex] / 255) * 30
          const waveAngle = (i / segments) * Math.PI * 2 + angle * 0.5

          const x = centerX + Math.cos(waveAngle) * (radius - amplitude)
          const y = centerY + Math.sin(waveAngle) * (radius - amplitude)

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.closePath()
        ctx.stroke()

        // Draw center pulse
        const pulseRadius = (volume / 255) * radius * 0.3
        ctx.beginPath()
        ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 136, ${Math.max(0.1, volume / 500)})`
        ctx.fill()
      }

      // Rotate the waveform slowly
      angle += 0.01

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive, frequency, volume])

  return (
    <WaveformContainer>
      <WaveformCanvas
        ref={canvasRef}
        width={800}
        height={600}
      />
    </WaveformContainer>
  )
}
