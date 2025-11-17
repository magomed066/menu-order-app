import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

import ShopProductsSearchFeature from '@/features/shop-products-search'

import { ROUTES } from '@/shared/lib/config'

import { Button } from '@/shared/ui'

function ShopHeader() {
  return (
    <div className="bg-white border-b border-[#e0e0e0] mb-7 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-t-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center text-xl sm:text-2xl shadow-sm rounded-full">
            🍽️
          </div>

          <div className="flex flex-col">
            <h1 className="text-base sm:text-lg lg:text-xl font-semibold">
              Закажи здесь и сейчас
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm">
              Самая лучшая еда только у нас
            </p>
          </div>
        </div>

        <div className="w-full sm:max-w-md lg:max-w-xl sm:ml-6 lg:ml-10">
          <ShopProductsSearchFeature />
        </div>

        <div className="sm:ml-auto">
          <Link to={ROUTES.CART}>
            <Button className="w-full sm:w-auto justify-center gap-2">
              <span>Корзина</span> | <ShoppingCart /> 3
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ShopHeader
