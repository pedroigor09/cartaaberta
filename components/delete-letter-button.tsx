'use client'

import { useState } from 'react'
import { Trash2, AlertTriangle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteLetter } from '@/app/actions/letter'
import { useRouter } from 'next/navigation'

interface DeleteLetterButtonProps {
  letterId: string
  letterTitle: string
}

export function DeleteLetterButton({ letterId, letterTitle }: DeleteLetterButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteLetter(letterId)
      setShowModal(false)
      router.refresh()
    } catch (error) {
      console.error('Erro ao excluir carta:', error)
      alert('Erro ao excluir a carta. Tente novamente.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowModal(true)}
        disabled={isDeleting}
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 className="w-4 h-4" />
        {isDeleting ? 'Excluindo...' : 'Excluir'}
      </Button>

      {/* Modal com overlay e animação */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)'
          }}
          onClick={() => !isDeleting && setShowModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-bounceIn relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão de fechar */}
            <button
              onClick={() => !isDeleting && setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isDeleting}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Ícone de alerta */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>

            {/* Título */}
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Excluir carta?
            </h2>

            {/* Descrição */}
            <p className="text-gray-600 text-center mb-2">
              Você deseja de fato excluir a carta
            </p>
            <p className="text-gray-900 font-semibold text-center mb-4">
              "{letterTitle}"?
            </p>
            
            {/* Aviso */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
              <p className="text-red-800 text-sm text-center font-medium">
                ⚠️ Esta ação é irreversível
              </p>
            </div>

            {/* Botões */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-11 text-base"
                onClick={() => setShowModal(false)}
                disabled={isDeleting}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 h-11 text-base bg-red-600 hover:bg-red-700 text-white"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Excluindo...' : 'Sim, excluir'}
              </Button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(-100px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-bounceIn {
          animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </>
  )
}
