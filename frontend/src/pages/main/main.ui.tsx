import ShopCategoriesListWidget from '@/widgets/shop-categories-list'
import ShopHeader from '@/widgets/shop-header'
import ShopProductsListWidget from '@/widgets/shop-products-list'

function MainPage() {
  return (
    <div className="min-h-screen bg-[#faca9d] flex flex-col md:pt-4 sm:pt-6 lg:pt-10">
      <div className="mx-auto w-full max-w-7xl bg-white rounded-md flex-1 pb-4 sm:pb-6 lg:pb-10 flex flex-col">
        <ShopHeader />
        <div className="px-4 sm:px-6 lg:px-8 flex flex-col gap-7">
          <ShopCategoriesListWidget />
          <ShopProductsListWidget />
        </div>
      </div>
    </div>
  )
}

export default MainPage
