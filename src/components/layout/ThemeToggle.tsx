import { useSyncExternalStore } from 'react'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

function subscribe() {
  return () => {}
}

function getClientSnapshot() {
  return true
}

function getServerSnapshot() {
  return false
}

export function ThemeToggle() {
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
  const { resolvedTheme, setTheme } = useTheme()

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="size-9 shrink-0" disabled aria-hidden>
        <span className="size-4" />
      </Button>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-9 shrink-0"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}
