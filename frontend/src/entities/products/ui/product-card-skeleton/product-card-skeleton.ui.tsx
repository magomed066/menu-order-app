import { Card, CardContent, Skeleton } from '@/shared/ui'

function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden p-0">
      <Skeleton className="h-40 w-full" />
      <CardContent className="py-4 pt-0">
        <div className="mb-2 flex items-center justify-between gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-4 w-24" />
      </CardContent>
    </Card>
  )
}

export default ProductCardSkeleton
