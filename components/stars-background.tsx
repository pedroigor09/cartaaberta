'use client'

import { useEffect, useState } from 'react'

interface Star {
  left: string
  top: string
  animationDelay: string
  animationDuration: string
}

export function StarsBackground() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // Gera as estrelas apenas no cliente
    const generatedStars = Array.from({ length: 50 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 3}s`
    }))
    setStars(generatedStars)
  }, [])

  return (
    <>
      <div className="stars-container">
        {stars.map((star, i) => (
          <div key={i} className="star" style={star} />
        ))}
      </div>

      <style jsx>{`
        .stars-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }

        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: twinkle linear infinite;
          box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        .star:nth-child(3n) {
          width: 3px;
          height: 3px;
        }

        .star:nth-child(5n) {
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.9);
        }

        .star:nth-child(7n) {
          animation-duration: 4s !important;
        }
      `}</style>
    </>
  )
}
