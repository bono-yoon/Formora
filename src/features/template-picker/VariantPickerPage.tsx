import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getCategory } from '@/templates/catalog'
import { isTemplateCategoryId } from '@/templates/catalog'

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export function VariantPickerPage() {
  const { categoryId = '' } = useParams<{ categoryId: string }>()
  const cat = isTemplateCategoryId(categoryId) ? getCategory(categoryId) : undefined

  if (!cat) {
    return (
      <div className="rounded-xl border border-border p-6 text-sm text-muted-foreground">
        카테고리를 찾을 수 없습니다. <Link to="/" className="font-medium text-foreground underline">홈으로</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">
          <Link to="/" className="font-medium text-foreground hover:underline">
            ← 모든 카테고리
          </Link>
        </p>
        <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">{cat.title}</h1>
        <p className="max-w-prose text-pretty text-sm text-muted-foreground sm:text-base">{cat.description}</p>
        <p className="text-sm text-muted-foreground">디자인 변형을 선택한 뒤 내용을 채웁니다.</p>
      </div>

      <motion.ul
        className="grid gap-4 sm:grid-cols-2"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06 } },
        }}
      >
        {cat.variants.map((v) => (
          <motion.li key={v.id} variants={cardVariants} transition={{ type: 'spring', stiffness: 400, damping: 28 }}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-base">{v.title}</CardTitle>
                <CardDescription className="text-pretty">{v.description}</CardDescription>
              </CardHeader>
              <CardFooter className="border-t-0 pt-0">
                <Button className="w-full" asChild>
                  <Link to={`/build/${cat.id}/${v.id}`}>이 디자인으로 시작</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}
