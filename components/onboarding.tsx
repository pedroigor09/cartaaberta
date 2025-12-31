'use client'

import { useState, useEffect } from 'react'
import { StarsBackground } from './stars-background'

interface OnboardingProps {
  onComplete: () => void
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentText, setCurrentText] = useState('')
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const [isTyping, setIsTyping] = useState(true)

  const lines = [
    "Bem-vindo à Carta Aberta...",
    "Um lugar onde palavras ganham vida.",
    "Aqui, você pode expressar o que sente,",
    "compartilhar o que pensa,",
    "e deixar suas palavras voarem pelo mundo.",
    "Cada carta é única.",
    "Cada palavra, especial.",
    "Pronto para escrever sua história?"
  ]

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setShowButton(true)
      return
    }

    const currentLine = lines[currentLineIndex]
    let charIndex = 0
    setCurrentText('')
    setIsTyping(true)

    const typingInterval = setInterval(() => {
      if (charIndex < currentLine.length) {
        setCurrentText(currentLine.substring(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
        
        // Aguarda 1.5s e vai pra próxima linha
        setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1)
        }, 1500)
      }
    }, 60)

    return () => clearInterval(typingInterval)
  }, [currentLineIndex])

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <StarsBackground />
      
      {/* Botão Skip */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 z-20 text-white/60 hover:text-white text-sm font-medium transition-colors"
      >
        Pular →
      </button>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="mb-12 h-[200px] flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-light text-white leading-relaxed font-['Poppins',sans-serif]">
            {currentText}
            {isTyping && <span className="animate-pulse ml-1">|</span>}
          </h1>
        </div>

        {showButton && (
          <button
            onClick={onComplete}
            className="animate-fadeIn px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 text-lg font-bold rounded-full hover:scale-105 transition-transform hover:shadow-[0_0_30px_rgba(234,179,8,0.6)]"
          >
            Começar
          </button>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  )
}
