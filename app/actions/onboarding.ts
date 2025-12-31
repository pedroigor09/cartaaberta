'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function markOnboardingAsSeen() {
  const session = await auth()
  
  if (!session?.user?.email) {
    throw new Error('Não autenticado')
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data: { hasSeenOnboarding: true }
  })

  revalidatePath('/')
}

export async function checkHasSeenOnboarding() {
  const session = await auth()
  
  if (!session?.user?.email) {
    return true // Se não está logado, não mostra onboarding
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { hasSeenOnboarding: true }
  })

  return user?.hasSeenOnboarding ?? false
}
