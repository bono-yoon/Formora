import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CATALOG_ICONS } from '@/templates/catalog/icons'
import { TEMPLATE_CATALOG } from '@/templates/catalog'

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
}

export function TemplatePickerPage() {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          카테고리 선택
        </h1>
        <p className="max-w-prose text-pretty text-sm text-muted-foreground sm:text-base">
          용도에 맞는 템플릿 카테고리를 고른 뒤, 다음 화면에서 <strong>디자인 변형</strong>을 고르고 내용을 입력합니다.
        </p>
      </motion.div>

      <motion.ul
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={listVariants}
        initial="hidden"
        animate="show"
      >
        {TEMPLATE_CATALOG.map((item) => {
          const Icon = CATALOG_ICONS[item.icon]
          return (
            <motion.li
              key={item.id}
              variants={cardVariants}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="h-full"
            >
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader className="space-y-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-5 text-foreground" aria-hidden />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="text-pretty">{item.description}</CardDescription>
                  {item.previewMobileOnly ? (
                    <p className="text-xs text-muted-foreground">미리보기: 모바일 전용</p>
                  ) : (
                    <p className="text-xs text-muted-foreground">변형 {item.variants.length}종</p>
                  )}
                </CardHeader>
                <CardFooter className="border-t-0 pt-0">
                  <Button className="w-full" asChild>
                    <Link to={`/templates/${item.id}`}>디자인 변형 보기</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.li>
          )
        })}
      </motion.ul>
    </div>
  )
}
