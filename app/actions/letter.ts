'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'
import { revalidatePath } from 'next/cache'

export async function createLetter(formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error('Você precisa estar autenticado para criar uma carta')
  }

  const title = formData.get('title') as string
  const content = formData.get('content') as string

  if (!title || !content) {
    throw new Error('Título e conteúdo são obrigatórios')
  }

  if (content.length > 5000) {
    throw new Error('A carta não pode ter mais de 5000 caracteres')
  }

  const shareId = nanoid(10)

  const letter = await prisma.letter.create({
    data: {
      title,
      content,
      shareId,
      authorId: session.user.id,
    },
  })

  revalidatePath('/')
  
  return { success: true, letterId: letter.id, shareId: letter.shareId }
}

export async function getLetterByShareId(shareId: string) {
  const letter = await prisma.letter.findUnique({
    where: { shareId },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  })

  if (!letter) {
    return null
  }

  // Incrementar views
  await prisma.letter.update({
    where: { id: letter.id },
    data: { views: { increment: 1 } },
  })

  return letter
}

export async function getUserLetters() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return []
  }

  const letters = await prisma.letter.findMany({
    where: { authorId: session.user.id },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      shareId: true,
      views: true,
      createdAt: true,
    },
  })

  return letters
}

export async function deleteLetter(letterId: string) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  // Verifica se a carta pertence ao usuário
  const letter = await prisma.letter.findUnique({
    where: { id: letterId },
    select: { authorId: true }
  })

  if (!letter || letter.authorId !== session.user.id) {
    throw new Error('Unauthorized')
  }

  await prisma.letter.delete({
    where: { id: letterId }
  })

  revalidatePath('/')
  revalidatePath('/history')
}

export async function getAllLetters() {
  const letters = await prisma.letter.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      shareId: true,
      views: true,
      createdAt: true,
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  })

  return letters
}
