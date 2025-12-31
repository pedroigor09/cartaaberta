'use client'

import { useState } from 'react'
import { Onboarding } from './onboarding'
import { markOnboardingAsSeen } from '@/app/actions/onboarding'
import { useRouter } from 'next/navigation'

export function OnboardingWrapper() {
  const [show, setShow] = useState(true)
  const router = useRouter()

  const handleComplete = async () => {
    setShow(false)
    await markOnboardingAsSeen()
    router.refresh()
  }

  if (!show) return null

  return <Onboarding onComplete={handleComplete} />
}
