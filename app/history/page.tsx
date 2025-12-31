import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Sidebar } from '@/components/sidebar'
import { MobileMenu } from '@/components/mobile-menu'
import { getUserLetters } from '@/app/actions/letter'
import { StarsBackground } from '@/components/stars-background'
import { DeleteLetterButton } from '@/components/delete-letter-button'
import Link from 'next/link'
import { Eye, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function HistoryPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/login')
  }

  const letters = await getUserLetters()

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ 
      background: 'linear-gradient(32deg, hsl(193 6 76), hsl(196 9 69) 50%)',
      fontFamily: "'Poppins', sans-serif"
    }}>
      <StarsBackground />
      
      <MobileMenu session={session} />
      
      <div className="hidden md:block">
        <Sidebar session={session} />
      </div>
      
      <main className="flex-1 relative z-10 p-4 sm:p-6 md:p-8 md:ml-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Histórico de Cartas</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Gerencie suas cartas abertas
            </p>
          </div>

          {letters.length === 0 ? (
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="py-8 sm:py-12 text-center">
                <p className="text-gray-500 text-base sm:text-lg">
                  Você ainda não criou nenhuma carta.
                </p>
                <Link 
                  href="/create"
                  className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Criar primeira carta
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {letters.map((letter) => (
                <Card key={letter.id} className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl line-clamp-2">
                      <Link href={`/letter/${letter.shareId}`} className="hover:text-blue-600 transition-colors">
                        {letter.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 text-sm mt-2">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {letter.views} visualizações
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(letter.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center">
                    <Link 
                      href={`/letter/${letter.shareId}`}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Ver carta
                    </Link>
                    <DeleteLetterButton 
                      letterId={letter.id} 
                      letterTitle={letter.title}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
