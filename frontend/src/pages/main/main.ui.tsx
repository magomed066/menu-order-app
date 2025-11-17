import ShopCategoriesListWidget from '@/widgets/shop-categories-list'
import ShopHeader from '@/widgets/shop-header'
import ShopProductsListWidget from '@/widgets/shop-products-list'

function MainPage() {
  return (
    <div className="flex-1 bg-[#faca9d] min-h-screen pt-[40px]">
      <div className="mx-auto w-full max-w-7xl bg-white rounded-md h-full pb-[40px]">
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
