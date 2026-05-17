import { Link, Outlet } from 'react-router-dom'

import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { Button } from '@/components/ui/button'

export function AppShellLayout() {
  return (
    <div className="flex min-h-dvh min-w-0 max-w-full flex-col overflow-x-hidden bg-background">
      <header className="border-b border-border/80 bg-background/80 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
          <Button variant="ghost" className="h-auto min-w-0 flex-1 justify-start px-2 py-1.5" asChild>
            <Link to="/">
              <div className="min-w-0 text-left">
                <p className="truncate text-sm font-medium tracking-tight text-foreground">
                  Formora
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  템플릿 선택 → 편집 → 정적 보내기 (MVP)
                </p>
              </div>
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto flex w-full min-w-0 max-w-5xl flex-1 flex-col overflow-x-hidden px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}
