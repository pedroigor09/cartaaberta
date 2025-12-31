import { getLetterByShareId } from '@/app/actions/letter'
import { LetterView } from '@/components/letter-view'
import { notFound } from 'next/navigation'
import { StarsBackground } from '@/components/stars-background'
import { Home, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ shareId: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { shareId } = await params
  const letter = await getLetterByShareId(shareId)

  if (!letter) {
    return {
      title: 'Carta não encontrada',
    }
  }

  return {
    title: `${letter.title} - Carta Aberta`,
    description: `${letter.content.substring(0, 150)}...`,
    openGraph: {
      title: letter.title,
      description: `Carta de ${letter.author.name}`,
    },
  }
}

export default async function LetterPage({ params }: PageProps) {
  const { shareId } = await params
  const letter = await getLetterByShareId(shareId)

  if (!letter) {
    notFound()
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ 
      background: 'linear-gradient(32deg, hsl(193 6 76), hsl(196 9 69) 50%)',
      fontFamily: "'Poppins', sans-serif"
    }}>
      <StarsBackground />
      
      {/* Botão de voltar */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all text-gray-700 hover:text-gray-900 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </Link>
      </div>
      
      <main className="relative z-10 container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <LetterView
          title={letter.title}
          content={letter.content}
          authorName={letter.author.name}
          authorImage={letter.author.image}
          views={letter.views}
          shareId={letter.shareId}
        />
      </main>
    </div>
  )
}
