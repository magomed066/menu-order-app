import CategoriesListWidget from '@/widgets/categories-list'

import { Card, CardContent, Input } from '@/shared/ui'

const menuItems = [
  {
    id: '1',
    name: 'Duck Salad',
    category: 'Pizza',
    price: 35.0,
    image:
      'https://images.unsplash.com/photo-1735353783469-52314e87dd3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    name: 'Breakfast board',
    category: 'Taco',
    price: 14.0,
    image:
      'https://plus.unsplash.com/premium_photo-1692394935733-b51d960e1256?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QnJlYWtmYXN0JTIwYm9hcmR8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '3',
    name: 'Hummus',
    category: 'Sandwich',
    price: 24.0,
    image:
      'https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtbXVzfGVufDB8fDB8fHww',
  },
  {
    id: '4',
    name: 'Roast beef',
    category: 'Kebab',
    price: 17.5,
    image:
      'https://plus.unsplash.com/premium_photo-1726863084475-e9169bb95b7a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Um9hc3QlMjBiZWVmfGVufDB8fDB8fHww',
  },
  {
    id: '5',
    name: 'Tuna salad',
    category: 'Popcorn',
    price: 35.0,
    image:
      'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VHVuYSUyMHNhbGFkfGVufDB8fDB8fHww',
  },
  {
    id: '6',
    name: 'Salmon',
    category: 'Burger',
    price: 48.0,
    image:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U2FsbW9ufGVufDB8fDB8fHww',
  },
  {
    id: '7',
    name: 'California roll',
    category: 'Taco',
    price: 74.0,
    image:
      'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2FsaWZvcm5pYSUyMHJvbGx8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: '8',
    name: 'Sashimi',
    category: 'Burrito',
    price: 74.0,
    image:
      'https://images.unsplash.com/photo-1638866381709-071747b518c8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FzaGltaXxlbnwwfHwwfHx8MA%3D%3D',
  },
]

function MenuPage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex items-start flex-wrap md:flex-nowrap justify-between gap-10">
        <CategoriesListWidget />

        <div className="w-full md:max-w-[300px]">
          <Input placeholder="Search" />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {menuItems.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer transition-shadow hover:shadow-lg p-0"
            >
              <CardContent className="p-0">
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-1 font-semibold">{item.name}</h3>
                  <p className="text-muted-foreground mb-2 text-sm">
                    {item.category}
                  </p>
                  <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>

    // <div className="max-w-[1200px] w-full">
    //   <h2>Menu Page</h2>
    // </div>
  )
}

export default MenuPage
