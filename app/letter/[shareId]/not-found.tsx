import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        <Mail className="w-16 h-16 text-orange-600 mx-auto" />
        <h1 className="text-4xl font-bold text-gray-900">Carta não encontrada</h1>
        <p className="text-xl text-gray-600">
          A carta que você está procurando não existe ou foi removida.
        </p>
        <Link href="/">
          <Button size="lg">Voltar para o início</Button>
        </Link>
      </div>
    </div>
  )
}
