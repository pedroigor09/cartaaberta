'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createLetter } from '@/app/actions/letter'

export function LetterForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

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
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Escreva sua Carta Aberta</CardTitle>
        <CardDescription>
          Expresse seus pensamentos e compartilhe com o mundo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              name="title"
              placeholder="Ex: Para quem sempre acreditou em mim..."
              required
              maxLength={100}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Sua mensagem</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Escreva sua carta aqui..."
              className="min-h-[300px] resize-none"
              required
              maxLength={5000}
              disabled={isSubmitting}
            />
            <p className="text-sm text-muted-foreground">
              Máximo de 5000 caracteres
            </p>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Criando...' : 'Criar Carta'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
