'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Sidebar } from './sidebar'
import { Session } from 'next-auth'

interface MobileMenuProps {
  session: Session
}

export function MobileMenu({ session }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      {/* Botão hambúrguer */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-40 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all"
        aria-label="Abrir menu"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 animate-fadeIn"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar mobile */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="relative h-full">
          {/* Botão de fechar */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          <Sidebar session={session} />
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
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}
