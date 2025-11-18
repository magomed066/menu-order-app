import { priceFormatter } from '@/shared/lib/utils'

import { Badge, Card, CardContent } from '@/shared/ui'

import type { Props } from './types'

function ProductCard(props: Props) {
  const { data } = props
  return (
    <Card
      key={data.id}
      className="group overflow-hidden rounded-2xl border p-0 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
    >
      <div className="relative">
        <img
          src={data.image}
          alt={data.name}
          className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute right-2 top-2 rounded-full bg-background/90 px-2 py-1 text-[12px] font-semibold shadow">
          {priceFormatter.format(Number(data.price))}
        </div>
      </div>
      <CardContent className="space-y-2 py-4">
        <div className="flex items-center justify-between gap-2">
          <span className="line-clamp-1 font-medium tracking-tight">
            {data.name}
          </span>
          <Badge variant="secondary" className="shrink-0">
            {data.category}
          </Badge>
        </div>
        {data.description ? (
          <p className="line-clamp-2 text-[13px] text-muted-foreground">
            {data.description}
          </p>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default ProductCard
