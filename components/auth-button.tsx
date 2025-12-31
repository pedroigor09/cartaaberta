'use client'

import { signIn, signOut } from 'next-auth/react'
import { Button } from './ui/button'
import { LogOut, Mail } from 'lucide-react'
import { Session } from 'next-auth'

interface AuthButtonProps {
  session: Session | null
}

export function AuthButton({ session }: AuthButtonProps) {
  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {session.user.image && (
            <img 
              src={session.user.image} 
              alt={session.user.name || 'Usuário'} 
              className="w-8 h-8 rounded-full"
            />
          )}
          <span className="text-sm font-medium">{session.user.name}</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => signOut()}
          className="gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </Button>
      </div>
    )
  }

  return (
    <Button 
      onClick={() => signIn('google')}
      className="gap-2"
    >
      <Mail className="w-4 h-4" />
      Entrar com Google
    </Button>
  )
}
