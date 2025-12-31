'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createLetter } from '@/app/actions/letter'

export function CreateLetterForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const formData = new FormData(e.currentTarget)
      const result = await createLetter(formData)
      
      if (result.success) {
        router.push(`/letter/${result.shareId}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar carta')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
            Título da Carta
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Ex: Uma reflexão sobre..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={100}
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all text-gray-800 placeholder-gray-400"
          />
          <p className="text-xs text-gray-500">
            {title.length}/100 caracteres
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-semibold text-gray-700">
            Sua Mensagem
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="Escreva sua carta aqui... Deixe seus pensamentos fluírem livremente."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all resize-none text-gray-800 placeholder-gray-400 min-h-[350px] font-mono leading-relaxed"
            required
            maxLength={5000}
            disabled={isSubmitting}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{content.length}/5000 caracteres</span>
            <span className={content.length > 4500 ? 'text-orange-500 font-semibold' : ''}>
              {content.length > 4500 && `${5000 - content.length} restantes`}
            </span>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
            <p className="text-sm text-red-600 font-medium">{error}</p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.push('/')}
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !title.trim() || !content.trim()}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Criando...
              </span>
            ) : (
              'Criar Carta'
            )}
          </button>
        </div>
      </form>

      {/* Preview indicator */}
      {content && (
        <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
          <p className="text-sm text-blue-700 font-medium mb-2">
            ✨ Prévia do efeito typewriter
          </p>
          <p className="text-xs text-blue-600">
            Sua carta será exibida com um efeito de máquina de escrever quando compartilhada!
          </p>
        </div>
      )}
    </div>
  )
}
