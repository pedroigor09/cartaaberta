import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getAllLetters } from './actions/letter'
import { Sidebar } from '@/components/sidebar'
import { MobileMenu } from '@/components/mobile-menu'
import Link from 'next/link'
import { Eye, Calendar } from 'lucide-react'

export default async function Home() {
  const session = await auth()
  
  if (!session) {
    redirect('/login')
  }
  
  const letters = await getAllLetters()

  return (
    <div className="min-h-screen flex" style={{ 
      background: 'linear-gradient(32deg, hsl(193 6 76), hsl(196 9 69) 50%)',
      fontFamily: "'Poppins', sans-serif"
    }}>
      <MobileMenu session={session} />
      
      <div className="hidden md:block">
        <Sidebar session={session} />
      </div>
      
      <main className="flex-1 p-4 sm:p-6 md:p-8 md:ml-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Bem-vindo, {session.user?.name}!
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Todas as cartas abertas
            </p>
          </div>

          {letters.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 md:p-12 text-center shadow-lg">
              <div className="max-w-md mx-auto">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
                  Nenhuma carta ainda
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6">
                  Seja o primeiro a compartilhar seus pensamentos criando uma carta aberta
                </p>
                <Link 
                  href="/create"
                  className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors text-sm sm:text-base"
                >
                  Criar Primeira Carta
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-3 sm:gap-4">
              {letters.map((letter: { id: string; shareId: string; title: string; views: number; createdAt: Date; author: { name: string | null; image: string | null } }) => (
                <Link 
                  key={letter.id} 
                  href={`/letter/${letter.shareId}`}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-3 mb-3">
                    {letter.author.image && (
                      <img 
                        src={letter.author.image} 
                        alt={letter.author.name || 'Autor'}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-600">
                        {letter.author.name || 'Anônimo'}
                      </p>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-2">
                        {letter.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">
                        {new Date(letter.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="sm:hidden">
                        {new Date(letter.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      {letter.views} visualizações
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
