import { PackageOpen } from 'lucide-react'

function ProductsEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border p-8 text-center">
      <div className="mb-3 text-muted-foreground">
        <PackageOpen className="h-8 w-8" />
      </div>
      <p className="font-medium">Нет продуктов</p>
      <p className="text-muted-foreground text-sm">
        Добавьте продукт, чтобы он появился здесь.
      </p>
    </div>
  )
}

export default ProductsEmpty
