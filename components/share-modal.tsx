'use client'

import { useState, useEffect } from 'react'
import { X, Copy, Check, Twitter, MessageCircle, Facebook, Send, MessageSquare, Instagram } from 'lucide-react'

interface ShareModalProps {
  title: string
  authorName: string
  authorImage: string | null
  shareUrl: string
  onClose: () => void
}

export function ShareModal({ title, authorName, authorImage, shareUrl, onClose }: ShareModalProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  
  const getRandomWritImage = () => {
    const images = ['writ1.jpg', 'writ2.jpg', 'writ3.jpg']
    return `/` + images[Math.floor(Math.random() * images.length)]
  }
  
  const [writImage] = useState(getRandomWritImage())

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const generateImage = async (): Promise<Blob | null> => {
    setIsGenerating(true)
    try {
      const canvas = document.createElement('canvas')
      canvas.width = 1000
      canvas.height = 1000
      const ctx = canvas.getContext('2d')
      
      if (!ctx) return null

      // Frases aleatórias para cada compartilhamento
      const frases = [
        'Nem tudo é dito em voz alta.',
        'Algumas verdades só sabem existir no papel.',
        'Escrevi para não me perder.',
        'O silêncio também escreve.',
        'O que doeu, virou texto.',
        'Entre linhas, deixei quem eu sou.',
        'Nem tudo foi dito — então foi escrito.',
        'Palavras que não pediram permissão.',
        'Um texto nascido do que ficou.',
        'Escrevi o que senti, não o que pensei.',
        'Quando falar não bastou.',
        'Algumas coisas só se resolvem escrevendo.',
        'O que não coube em mim, coube aqui.',
        'Transformei sentimento em palavra.',
        'Um texto para quem soube sentir.',
        'Escrever também é sobreviver.',
        'O papel ouviu o que ninguém ouviu.',
        'Entre o sentir e o dizer, escolhi escrever.',
        'Palavras deixadas sem defesa.',
        'O que foi vivido, agora é texto.',
        'Carta aberta, coração exposto.'
      ]
      
      const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)]

      // Fundo preto sólido
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, 1000, 1000)

      // Carregar e desenhar imagem
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = writImage
      })

      // Desenhar imagem principal com cantos arredondados
      ctx.save()
      ctx.beginPath()
      const imgX = 80
      const imgY = 80
      const imgWidth = 840
      const imgHeight = 560
      const radius = 16
      
      ctx.moveTo(imgX + radius, imgY)
      ctx.lineTo(imgX + imgWidth - radius, imgY)
      ctx.quadraticCurveTo(imgX + imgWidth, imgY, imgX + imgWidth, imgY + radius)
      ctx.lineTo(imgX + imgWidth, imgY + imgHeight - radius)
      ctx.quadraticCurveTo(imgX + imgWidth, imgY + imgHeight, imgX + imgWidth - radius, imgY + imgHeight)
      ctx.lineTo(imgX + radius, imgY + imgHeight)
      ctx.quadraticCurveTo(imgX, imgY + imgHeight, imgX, imgY + imgHeight - radius)
      ctx.lineTo(imgX, imgY + radius)
      ctx.quadraticCurveTo(imgX, imgY, imgX + radius, imgY)
      ctx.closePath()
      ctx.clip()
      
      const scale = Math.max(imgWidth / img.width, imgHeight / img.height)
      const x = imgX + (imgWidth - img.width * scale) / 2
      const y = imgY + (imgHeight - img.height * scale) / 2
      
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
      ctx.restore()

      // Overlay glassmorphism embaixo da imagem
      const overlayY = 660
      const overlayHeight = 280
      
      // Fundo amarelo claro
      ctx.fillStyle = '#FFF9E6'
      ctx.fillRect(0, overlayY, 1000, overlayHeight)
      
      // Borda superior sutil
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, overlayY)
      ctx.lineTo(1000, overlayY)
      ctx.stroke()

      // Título da carta (preto)
      ctx.fillStyle = '#000000'
      ctx.font = '600 42px Arial, sans-serif'
      const titleText = title.length > 35 ? title.substring(0, 35) + '...' : title
      ctx.fillText(titleText, 80, 730)

      // Autor (cinza escuro)
      ctx.fillStyle = '#666666'
      ctx.font = '400 28px Arial, sans-serif'
      ctx.fillText(authorName, 80, 770)

      // "CARTA ABERTA" - Verde grande e impactante
      ctx.fillStyle = '#1DB954'
      ctx.font = 'bold 48px Arial, sans-serif'
      ctx.fillText('CARTA ABERTA', 80, 840)

      // Frase impactante (muda a cada compartilhamento)
      ctx.fillStyle = '#000000'
      ctx.font = 'bold 36px Arial, sans-serif'
      ctx.fillText(fraseAleatoria, 80, 895)

      // Logo (círculo verde pequeno no canto)
      ctx.fillStyle = '#1DB954'
      ctx.beginPath()
      ctx.arc(920, 880, 20, 0, Math.PI * 2)
      ctx.fill()

      return new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/png')
      })
    } catch (error) {
      console.error('Erro ao gerar imagem:', error)
      return null
    } finally {
      setIsGenerating(false)
    }
  }

  const handleShare = async (platform: string) => {
    const blob = await generateImage()
    if (!blob) return

    const file = new File([blob], 'carta-aberta.png', { type: 'image/png' })

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          title: 'Veja minha carta!',
          text: 'Veja minha carta!',
          url: shareUrl,
          files: [file]
        })
        onClose()
      } catch (error) {
        console.log('Compartilhamento cancelado')
      }
    } else {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'carta-aberta.png'
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const socialNetworks = [
    { 
      name: 'Twitter', 
      icon: Twitter, 
      bg: '#e8f6fe', 
      color: '#1DA1F2' 
    },
    { 
      name: 'WhatsApp', 
      icon: MessageCircle, 
      bg: '#e9fbf0', 
      color: '#25D366' 
    },
    { 
      name: 'Facebook', 
      icon: Facebook, 
      bg: '#e8f1fe', 
      color: '#1877F2' 
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      bg: '#fde8f5', 
      color: '#E4405F' 
    },
    { 
      name: 'Reddit', 
      icon: MessageSquare, 
      bg: '#ffece6', 
      color: '#FF4500' 
    },
    { 
      name: 'Telegram', 
      icon: Send, 
      bg: '#e6f3fa', 
      color: '#0088cc' 
    },
  ]

  return (
    <>
      {/* Modal overlay */}
      <div 
        className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      >
        {/* Modal content */}
        <div 
          className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-white md:rounded-2xl rounded-t-[1.3rem] w-full md:w-[28rem] md:h-[30rem] shadow-2xl overflow-hidden animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 md:p-10 flex flex-col gap-10">
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-xl md:text-2xl font-semibold text-gray-800 capitalize">
                Compartilhar
              </span>
              <button
                onClick={onClose}
                className="text-gray-800 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Social networks grid */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-4">
              {socialNetworks.map((social) => {
                const IconComponent = social.icon
                return (
                  <button
                    key={social.name}
                    onClick={() => handleShare(social.name.toLowerCase())}
                    disabled={isGenerating}
                    className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity disabled:opacity-50"
                  >
                    <div 
                      className="w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center"
                      style={{ backgroundColor: social.bg }}
                    >
                      <IconComponent 
                        className="w-8 h-8" 
                        style={{ color: social.color }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-800 capitalize">
                      {social.name}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Copy link section */}
            <div className="flex flex-col gap-4">
              <span className="font-medium text-base text-gray-800 capitalize">
                Link da página
              </span>
              <div className="relative">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="w-full bg-gray-50 px-4 py-3 rounded-lg border-none outline-none text-sm pr-12"
                />
                <button
                  onClick={copyLink}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-800 hover:text-gray-600 transition-colors"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {isGenerating && (
              <p className="text-gray-600 text-center text-sm">
                Gerando imagem...
              </p>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
