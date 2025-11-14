import OrderCardWidget from '@/widgets/order-card'
import OrdersListWidget from '@/widgets/orders-list'

function OrdersPage() {
  return (
    <div className="w-full items-stretch p-4">
      <div className="flex flex-wrap gap-5">
        <OrdersListWidget />
        <OrderCardWidget />
      </div>
    </div>
  )
}

export default OrdersPage
