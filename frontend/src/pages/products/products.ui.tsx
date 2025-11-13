import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'

import { ProductCard } from '@/entities/products'

import ProductsActionsFeature from '@/features/products-actions'

import CategoriesListWidget from '@/widgets/categories-list'

import { Button, Input } from '@/shared/ui'

const menuItems = [
  {
    id: 1,
    name: 'Duck Salad',
    category: 'Pizza',
    price: 35.0,
    image:
      'https://images.unsplash.com/photo-1735353783469-52314e87dd3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Breakfast board',
    category: 'Taco',
    price: 14.0,
    image:
      'https://plus.unsplash.com/premium_photo-1692394935733-b51d960e1256?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QnJlYWtmYXN0JTIwYm9hcmR8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 3,
    name: 'Hummus',
    category: 'Sandwich',
    price: 24.0,
    image:
      'https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtbXVzfGVufDB8fDB8fHww',
  },
  {
    id: 4,
    name: 'Roast beef',
    category: 'Kebab',
    price: 17.5,
    image:
      'https://plus.unsplash.com/premium_photo-1726863084475-e9169bb95b7a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Um9hc3QlMjBiZWVmfGVufDB8fDB8fHww',
  },
  {
    id: 5,
    name: 'Tuna salad',
    category: 'Popcorn',
    price: 35.0,
    image:
      'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VHVuYSUyMHNhbGFkfGVufDB8fDB8fHww',
  },
  {
    id: 6,
    name: 'Salmon',
    category: 'Burger',
    price: 48.0,
    image:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U2FsbW9ufGVufDB8fDB8fHww',
  },
  {
    id: 7,
    name: 'California roll',
    category: 'Taco',
    price: 74.0,
    image:
      'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2FsaWZvcm5pYSUyMHJvbGx8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 8,
    name: 'Sashimi',
    category: 'Burrito',
    price: 74.0,
    image:
      'https://images.unsplash.com/photo-1638866381709-071747b518c8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FzaGltaXxlbnwwfHwwfHx8MA%3D%3D',
  },
]

function ProductsPage() {
  const [query] = useState('')
  const [category, setCategory] = useState<string | null>(null)

  const categories = useMemo(
    () => Array.from(new Set(menuItems.map((i) => i.category))),
    []
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return menuItems.filter((item) => {
      const byCategory = category ? item.category === category : true
      const byQuery = q
        ? [item.name, item.category].some((v) => v.toLowerCase().includes(q))
        : true
      return byCategory && byQuery
    })
  }, [category, query])

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <ProductsActionsFeature />

      <CategoriesListWidget
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item) => (
          <ProductCard data={item} />
        ))}
        {filtered.length === 0 && (
          <div className="text-muted-foreground col-span-full py-10 text-center">
            Ничего не найдено
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
