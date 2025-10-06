"use client"

import { useEffect } from "react"

// Mario sound effects using Web Audio API
export function useMarioSounds() {
  useEffect(() => {
    const playMarioSound = (type: 'coin' | 'jump' | 'powerup' | 'pipe' | 'button') => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      
      const createTone = (frequency: number, duration: number, type: OscillatorType = 'square') => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
        oscillator.type = type
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration)
      }
      
      switch (type) {
        case 'coin':
          // Coin sound - quick ascending notes
          createTone(800, 0.1, 'square')
          setTimeout(() => createTone(1000, 0.1, 'square'), 50)
          setTimeout(() => createTone(1200, 0.1, 'square'), 100)
          break
          
        case 'jump':
          // Jump sound - quick descending note
          createTone(400, 0.15, 'square')
          break
          
        case 'powerup':
          // Power-up sound - ascending scale
          createTone(200, 0.1, 'square')
          setTimeout(() => createTone(300, 0.1, 'square'), 50)
          setTimeout(() => createTone(400, 0.1, 'square'), 100)
          setTimeout(() => createTone(500, 0.1, 'square'), 150)
          break
          
        case 'pipe':
          // Pipe sound - low descending tone
          createTone(150, 0.3, 'sawtooth')
          break
          
        case 'button':
          // Button click sound - short beep
          createTone(600, 0.1, 'square')
          break
      }
    }
    
    // Add click sound to all buttons and links
    const addClickSounds = () => {
      const buttons = document.querySelectorAll('button, a, [role="button"]')
      
      buttons.forEach(button => {
        button.addEventListener('click', (e) => {
          const target = e.target as HTMLElement
          
          // Different sounds for different elements
          if (target.closest('nav') || target.closest('[role="navigation"]')) {
            playMarioSound('jump') // Navigation sounds like jumping
          } else if (target.textContent?.includes('Start') || target.textContent?.includes('Build')) {
            playMarioSound('powerup') // CTA buttons sound like power-ups
          } else if (target.closest('footer')) {
            playMarioSound('pipe') // Footer links sound like pipes
          } else {
            playMarioSound('button') // Default button sound
          }
        })
      })
    }
    
    // Initialize sounds (clicks only)
    addClickSounds()
    
    // Re-add click sounds when DOM changes (for dynamic content)
    const observer = new MutationObserver(() => {
      addClickSounds()
    })
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
    
    return () => {
      observer.disconnect()
    }
  }, [])
}

// Hook for playing specific Mario sounds
export function useMarioSoundEffect() {
  const playSound = (type: 'coin' | 'jump' | 'powerup' | 'pipe' | 'button' | 'lottery') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    
    const createTone = (frequency: number, duration: number, type: OscillatorType = 'square') => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
      oscillator.type = type
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration)
    }
    
    switch (type) {
      case 'coin':
        createTone(800, 0.1, 'square')
        setTimeout(() => createTone(1000, 0.1, 'square'), 50)
        setTimeout(() => createTone(1200, 0.1, 'square'), 100)
        break
        
      case 'jump':
        createTone(400, 0.15, 'square')
        break
        
      case 'powerup':
        createTone(200, 0.1, 'square')
        setTimeout(() => createTone(300, 0.1, 'square'), 50)
        setTimeout(() => createTone(400, 0.1, 'square'), 100)
        setTimeout(() => createTone(500, 0.1, 'square'), 150)
        break
        
      case 'pipe':
        createTone(150, 0.3, 'sawtooth')
        break
        
      case 'button':
        createTone(600, 0.1, 'square')
        break
      case 'lottery':
        // Lottery ticket jingle: quick bright arpeggio
        createTone(700, 0.08, 'square')
        setTimeout(() => createTone(850, 0.08, 'square'), 60)
        setTimeout(() => createTone(1000, 0.08, 'square'), 120)
        setTimeout(() => createTone(1200, 0.08, 'square'), 180)
        setTimeout(() => createTone(1450, 0.12, 'square'), 260)
        break
    }
  }
  
  return { playSound }
}
