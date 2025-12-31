import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { MobileMenu } from '@/components/mobile-menu'
import { CreateLetterForm } from '@/components/create-letter-form'
import { StarsBackground } from '@/components/stars-background'

export default async function CreatePage() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

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
      
      <main className="flex-1 p-4 sm:p-6 md:p-8 relative z-10 md:ml-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Criar Nova Carta
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Expresse seus pensamentos e compartilhe com o mundo
            </p>
          </div>

          <CreateLetterForm />
        </div>
      </main>
    </div>
  )
}
