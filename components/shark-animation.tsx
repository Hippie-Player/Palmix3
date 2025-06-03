"use client"

import { useEffect, useRef } from "react"

export function SharkAnimation() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    let position = -50
    let animationFrameId

    const drawShark = (x) => {
      ctx.clearRect(0, 0, width, height)
      ctx.beginPath()

      // Shark body
      ctx.moveTo(x, height / 2)
      ctx.quadraticCurveTo(x + 30, height / 2 - 20, x + 60, height / 2)
      ctx.quadraticCurveTo(x + 30, height / 2 + 20, x, height / 2)

      // Shark fin
      ctx.moveTo(x + 30, height / 2 - 20)
      ctx.lineTo(x + 40, height / 2 - 40)
      ctx.lineTo(x + 50, height / 2 - 20)

      // Shark tail
      ctx.moveTo(x, height / 2)
      ctx.lineTo(x - 20, height / 2 - 15)
      ctx.lineTo(x - 20, height / 2 + 15)
      ctx.lineTo(x, height / 2)

      ctx.strokeStyle = "#333"
      ctx.lineWidth = 2
      ctx.stroke()

      // Shark eye
      ctx.beginPath()
      ctx.arc(x + 45, height / 2 - 5, 2, 0, Math.PI * 2)
      ctx.fillStyle = "#333"
      ctx.fill()
    }

    const animate = () => {
      position += 5
      drawShark(position)

      if (position < width + 50) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
      <canvas ref={canvasRef} width={300} height={150} />
    </div>
  )
}
