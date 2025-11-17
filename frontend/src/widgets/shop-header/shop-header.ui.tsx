import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

import ShopProductsSearchFeature from '@/features/shop-products-search'

import { ROUTES } from '@/shared/lib/config'

import { Button } from '@/shared/ui'

function ShopHeader() {
  return (
    <div className="bg-white border-b border-[#e0e0e0] mb-7 px-4 sm:px-6 lg:px-8 py-4 rounded-t-md">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center text-2xl shadow-sm rounded-full">
            🍽️
          </div>

          <div className="flex flex-col">
            <h1>Закажи здесь и сейчас</h1>
            <p className="text-slate-500 text-xs">
              Самая лучшая еда только у нас
            </p>
          </div>
        </div>

        <div className="min-w-xl ml-10">
          <ShopProductsSearchFeature />
        </div>

        <div className="ml-auto">
          <Link to={ROUTES.CART}>
            <Button>
              Корзина | <ShoppingCart /> 3
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ShopHeader
