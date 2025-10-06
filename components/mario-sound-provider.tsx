"use client"

import { useMarioSounds } from "./mario-sounds"

export default function MarioSoundProvider({ children }: { children: React.ReactNode }) {
  useMarioSounds()
  return <>{children}</>
}
