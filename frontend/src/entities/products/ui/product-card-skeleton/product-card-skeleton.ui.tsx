import { Card, CardContent, Skeleton } from '@/shared/ui'

function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-2xl p-0">
      <Skeleton className="h-44 w-full" />
      <CardContent className="space-y-2 py-4">
        <div className="mb-1 flex items-center justify-between gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  )
}

export default ProductCardSkeleton
