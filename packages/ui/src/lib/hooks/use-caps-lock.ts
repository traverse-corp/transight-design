import { useState, useEffect } from 'react'

/**
 * Caps Lock 상태를 감지하는 훅
 * document 레벨의 keydown/keyup 이벤트를 통해 Caps Lock 여부를 추적한다.
 * 사용자가 아무 키나 누르면 즉시 상태가 갱신된다.
 *
 * @returns isCapsLockOn - Caps Lock이 켜져 있으면 true
 */
export const useCapsLock = () => {
  const [isCapsLockOn, setIsCapsLockOn] = useState(false)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (typeof e.getModifierState === 'function') {
        setIsCapsLockOn(e.getModifierState('CapsLock'))
      }
    }

    document.addEventListener('keydown', handleKey)
    document.addEventListener('keyup', handleKey)

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('keyup', handleKey)
    }
  }, [])

  return isCapsLockOn
}
