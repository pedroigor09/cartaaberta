'use client'

import { useState, useEffect } from 'react'

interface TypewriterProps {
  text: string
  speed?: number
  onComplete?: () => void
}

export function Typewriter({ text, speed = 50, onComplete }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (onComplete && currentIndex === text.length) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  return (
    <div className="font-mono text-lg leading-relaxed whitespace-pre-wrap">
      {displayedText}
      {currentIndex < text.length && (
        <span className="inline-block w-0.5 h-5 bg-current animate-pulse ml-0.5" />
      )}
    </div>
  )
}
