"use client"

// sounds removed; provide empty stubs to avoid import errors if any remain
export function useMarioSounds() {}

export function useMarioSoundEffect() {
  const playSound = (_type: 'coin' | 'jump' | 'powerup' | 'pipe' | 'button' | 'lottery') => {}
  return { playSound }
}
