import { ArrowLeft, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

import CartListFeature from '@/features/cart-list'
import CheckoutOrderFeature from '@/features/checkout-order'

import { ROUTES } from '@/shared/lib/config'
import { useAppTranslation } from '@/shared/lib/hooks'

function CartPage() {
  const { t } = useAppTranslation()

  return (
    <div className="min-h-screen bg-[#faca9d] flex flex-col pt-4 sm:pt-6 lg:pt-10">
      <div className="mx-auto w-full max-w-7xl bg-white rounded-md flex-1 pb-4 sm:pb-6 lg:pb-10 flex flex-col">
        <div className="bg-white border-b border-[#e0e0e0] mb-7 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-t-md">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              to={ROUTES.MAIN}
              className="flex items-center gap-2 text-sm text-slate-900 hover:text-slate-600"
            >
              <ArrowLeft />
              <span>Назад</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3 sm:ml-auto text-lg sm:text-xl font-semibold">
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
              <span>{t('pages:cartTitle')}</span>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 flex flex-col gap-5 sm:gap-7 pb-4">
          <div className="grid gap-6 md:grid-cols-[1.6fr_1fr]">
            <CartListFeature />

            <CheckoutOrderFeature />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
