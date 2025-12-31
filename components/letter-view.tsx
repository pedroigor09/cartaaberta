'use client'

import { useState } from 'react'
import { Typewriter } from './typewriter'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Share2, Check, Eye } from 'lucide-react'
import { ShareModal } from './share-modal'

interface LetterViewProps {
  title: string
  content: string
  authorName: string | null
  authorImage: string | null
  views: number
  shareId: string
}

export function LetterView({ 
  title, 
  content, 
  authorName, 
  authorImage, 
  views, 
  shareId 
}: LetterViewProps) {
  const [showShareButton, setShowShareButton] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/letter/${shareId}`

  async function handleShare() {
    setShowShareModal(true)
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {authorImage && (
                <img 
                  src={authorImage} 
                  alt={authorName || 'Autor'} 
                  className="w-10 h-10 rounded-full"
                />
              )}
              <div>
                <p className="text-sm text-muted-foreground">De</p>
                <p className="font-semibold">{authorName || 'Anônimo'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span>{views} visualizações</span>
            </div>
          </div>
          <CardTitle className="text-3xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <Typewriter 
              text={content} 
              speed={30}
              onComplete={() => setShowShareButton(true)}
            />
          </div>

          {showShareButton && (
            <div className="flex justify-center animate-in fade-in duration-500">
              <Button 
                onClick={handleShare}
                size="lg"
                className="gap-2"
              >
                <Share2 className="w-4 h-4" />
                Compartilhar Carta
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {showShareModal && (
        <ShareModal
          title={title}
          authorName={authorName || 'Anônimo'}
          authorImage={authorImage}
          shareUrl={shareUrl}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  )
}
