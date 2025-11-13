import { priceFormatter } from '@/shared/lib/utils'

import { Badge, Card, CardContent } from '@/shared/ui'

import type { Props } from './types'

function ProductCard(props: Props) {
  const { data } = props
  return (
    <Card key={data.id} className="overflow-hidden p-0">
      <img
        src={data.image}
        alt={data.name}
        className="h-40 w-full object-cover"
        loading="lazy"
      />
      <CardContent className="py-4 pt-0">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="font-medium">{data.name}</span>
          <Badge variant="secondary">{data.category}</Badge>
        </div>
        <div className="mb-2 ">
          <span className="text-[13px] text-[#989898]">{data.description}</span>
        </div>
        <div className="text-muted-foreground mt-auto">
          {priceFormatter.format(Number(data.price))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
